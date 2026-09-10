import 'dart:math' as math;

import 'budget.dart';
import 'combat_assessment.dart';
import 'defense_planner.dart';
import 'observation.dart';
import 'operations.dart';
import 'protocol.dart';
import 'routes.dart';
import 'rules_data.dart';
import 'threats.dart';
import 'work_budget.dart';
import 'resource_planner.dart';
import 'target_priority.dart';
import 'raid_assessment.dart';

class _NationCandidate {
  _NationCandidate(
    this.ledger,
    this.groups,
    this.notes,
    this.score,
    this.unresolved,
  );
  final AiLedger ledger;
  final List<AiCommandGroup> groups;
  final List<String> notes;
  final double score;
  final int unresolved;
}

/// 同一纯 Dart 国家规划器，按有限步骤让出控制权，不调用任何战斗执行器。
class CountryBrain {
  /// 绑定初始化规则与一份冻结请求。
  CountryBrain(this.rules, this.map, this.request)
    : work = AiWorkBudget(rules.tuning) {
    routes = AiRoutes(map, rules, work);
    assessor = CombatAssessor(rules, work);
    operations = OperationPlanner(request, rules, routes);
  }

  /// 只读输入和工作配额。
  final AiRules rules;
  final AiMap map;
  final AiRequest request;
  final AiWorkBudget work;

  /// 路线、评估和动作生成服务。
  late final AiRoutes routes;
  late final CombatAssessor assessor;
  late final OperationPlanner operations;

  /// 步进结束后的建议。
  CountryPlan? result;
  AiObservation get _view => request.observation;
  final _reports = <int, CityDefenseReport>{};

  /// 每次产出表示一个有界阶段完成；工作后端在阶段之间处理取消和新消息。
  Iterable<int> steps() sync* {
    if (request.rulesVersion != rules.version ||
        request.mapVersion != map.version) {
      throw const FormatException('国家规划静态版本不匹配');
    }
    if (_view.cities.length > 64 ||
        _view.heroes.length > 256 ||
        _view.countries.length > 32) {
      throw const FormatException('国家观察超出协议容量');
    }
    final analyzer = ThreatAnalyzer(_view, rules, routes, assessor);
    for (final city in _view.owned) {
      _reports[city.id] = analyzer.report(city);
      yield 0;
    }
    var ledger = AiLedger(
      _view,
      rules,
      routes,
      tasks: request.tasks.where((t) {
        final h = _view.hero(t.hero);
        return h != null &&
            h.country == _view.country &&
            !h.marked &&
            h.hp > 0 &&
            !h.stationed &&
            h.orderRevision == t.expectedOrderRevision;
      }).toList(),
    );
    if (request.stage == AiDecisionStage.resources) {
      result = ResourcePlanner(
        request,
        rules,
        operations,
        assessor,
        _reports,
      ).plan(ledger);
      yield 1;
      return;
    }
    final groups = <AiCommandGroup>[], notes = <String>[];
    var phase = 'preparing';
    int? targetCity;
    var requiredGold = 0, requiredHeroes = 1;
    final defense = DefensePlanner(
      request,
      rules,
      work,
      assessor,
      operations,
      _reports,
    );
    final urgent = _reports.values.where((r) => r.threatened).toList()
      ..sort((a, b) {
        final time = a.deadline.compareTo(b.deadline);
        return time != 0
            ? time
            : (b.linkedValue + b.city.income * 4).compareTo(
                a.linkedValue + a.city.income * 4,
              );
      });
    var beam = [_NationCandidate(ledger, [], [], 0, 0)];
    for (final report
        in request.stage == AiDecisionStage.attack
            ? <CityDefenseReport>[]
            : urgent) {
      final next = <_NationCandidate>[];
      for (final state in beam) {
        for (final choice in defense.candidates(report, state.ledger)) {
          final commands = [...state.groups, ...choice.groups];
          if (commands.fold(0, (n, g) => n + g.actions.length) >
              rules.tuning.maxCommands) {
            work.limited = true;
            continue;
          }
          next.add(
            _NationCandidate(
              choice.ledger,
              commands,
              [...state.notes, if (choice.note.isNotEmpty) choice.note],
              state.score + choice.score,
              state.unresolved + (choice.unresolved ? 1 : 0),
            ),
          );
          yield 1;
        }
      }
      if (next.isNotEmpty) {
        next.sort(
          (a, b) => a.unresolved != b.unresolved
              ? a.unresolved.compareTo(b.unresolved)
              : b.score.compareTo(a.score),
        );
        beam = next.take(math.min(4, rules.tuning.maxPlans)).toList();
      }
    }
    if (urgent.isNotEmpty && request.stage != AiDecisionStage.attack) {
      final chosen = beam.first;
      ledger = chosen.ledger;
      groups.addAll(chosen.groups);
      notes.addAll(chosen.notes);
      phase = 'defending';
      if (chosen.unresolved > 0) {
        notes.add(
          work.limited
              ? '规划配额已用尽：${chosen.unresolved} 座城尚未找到完整方案，不能据此断定无法挽救'
              : 'unsalvageableDefense：${chosen.unresolved} 座城在当前锁定、资金或时限下未找到完整修复方案',
        );
      }
    }
    if (urgent.isNotEmpty) phase = 'defending';
    yield 2;

    // 撤退只参考已发生的碰撞与当前生命，不额外抽样未来伤害。
    for (final hero
        in _view.heroes
            .where(
              (h) => h.country == _view.country && !h.marked && h.canRetreat,
            )
            .where((_) => request.stage != AiDecisionStage.attack)) {
      if (hero.type != 1 ||
          hero.hp >= hero.maxHp * .25 ||
          hero.clashes < 2 ||
          hero.received <= 0 ||
          hero.weapons.any((id) => rules.weapons[id]?.selfDamage == 0)) {
        continue;
      }
      final other = _view.hero(hero.opponent);
      if (other == null ||
          hero.health / hero.received >=
              other.health /
                  math.max(1, hero.dealt) *
                  rules.number('retreatSurvivalRatio')) {
        continue;
      }
      if (ledger.reservedHeroes.contains(hero.id)) continue;
      ledger.reservedHeroes.add(hero.id);
      groups.add(
        AiCommandGroup(
          reason: '高级将领生命低于四分之一，已发生的伤害显示胜望渺茫，申请有风险的合法撤退',
          actions: [AiAction(AiActionKind.retreat, hero: hero.id)],
          dependencies: operations.dependencies(
            [hero, other],
            [_view.city(hero.city)!],
          ),
          emergency: true,
        ),
      );
    }
    yield 3;

    final availableField = _view.heroes
        .where(
          (h) =>
              h.country == _view.country &&
              h.canMove &&
              request.stage != AiDecisionStage.attack &&
              !h.marked &&
              !ledger.reservedHeroes.contains(h.id),
        )
        .toList();
    for (final hero in availableField) {
      final task = ledger.tasks[hero.id];
      final lowFunds = ledger.gold < ledger.cash().reserve;
      if (task?.arrivalSlot == true &&
          hero.targetCity == task?.city &&
          !lowFunds) {
        continue;
      }
      final completedIntercept =
          task?.role == 'intercept' &&
          (_view.hero(task?.enemy) == null ||
              _reports[task?.city]?.threatened != true);
      if (completedIntercept &&
          !lowFunds &&
          task!.committedUntil > _view.tick &&
          hero.hp >= hero.maxHp * .65) {
        continue;
      }
      final expired = task != null && task.deadlineTick < _view.tick;
      if (!lowFunds &&
          !completedIntercept &&
          !expired &&
          hero.hp >= hero.maxHp * .65 &&
          hero.state != AiArmyState.camped) {
        continue;
      }
      final ownDanger = _reports[hero.city];
      final candidates =
          _view.owned
              .where(
                (c) =>
                    ledger.occupancy(c.id) <
                        (_reports[c.id]?.threatened == true
                            ? ledger.slots(c)
                            : math.max(
                                ledger.slots(c),
                                c.recruitCapacity +
                                    rules.tuning.rearStagingExtra,
                              )) &&
                    (_reports[c.id]?.threatened != true ||
                        _reports[c.id]?.risk?.advantage ==
                            CombatAdvantage.favorable),
              )
              .toList()
            ..sort(
              (a, b) => a.center
                  .distance(hero.position)
                  .compareTo(b.center.distance(hero.position)),
            );
      for (final city in candidates.take(3)) {
        if (!work.candidate()) break;
        final route = routes.to(
          hero,
          city.center,
          _view,
          target: city,
          safe: true,
        );
        final option = operations.send(
          ledger,
          hero,
          route,
          role: 'regroup',
          rearSafe: _reports[city.id]?.threatened != true,
          reason: lowFunds ? '回安全友城缩减粮草支出，保留其他有效远征' : '结束旧截击或整备残血部队，进城补给后重评估目标',
          target: city,
          arrival: true,
          emergency: true,
          deadline: ownDanger?.threatened == true
              ? ownDanger!.deadline
              : double.infinity,
        );
        if (option != null) {
          ledger = option.ledger;
          groups.add(option.group);
          break;
        }
      }
      yield 4;
    }

    // 局部防御完成后，剩余资源仍可执行不抢救援名额的扩张。
    final spare =
        _view.heroes
            .where(
              (h) =>
                  h.country == _view.country &&
                  h.canDispatch &&
                  request.stage != AiDecisionStage.defense &&
                  !h.marked &&
                  !ledger.removed.contains(h.id),
            )
            .toList()
          ..sort(
            (a, b) =>
                heroDeploymentValue(
                  b,
                  preserveGovernor:
                      _view.city(b.city)!.level < rules.integer('maxLevel'),
                ).compareTo(
                  heroDeploymentValue(
                    a,
                    preserveGovernor:
                        _view.city(a.city)!.level < rules.integer('maxLevel'),
                  ),
                ),
          );
    final assigned = <int, int>{};
    for (final task in ledger.tasks.values.where(
      (t) => t.role == 'expedition' && t.city != null,
    )) {
      assigned.update(task.city!, (n) => n + 1, ifAbsent: () => 1);
    }
    final threatsResolved =
        beam.first.unresolved == 0 &&
        (request.stage != AiDecisionStage.attack ||
            urgent.every(
              (r) =>
                  r.overflow == 0 &&
                  r.risk?.advantage == CombatAdvantage.favorable,
            ));
    var launched = false;
    for (final hero in spare) {
      if (!threatsResolved ||
          ledger.reservedHeroes.contains(hero.id) ||
          ledger.removed.contains(hero.id)) {
        continue;
      }
      final home = _view.city(hero.city)!;
      final report = _reports[home.id];
      if (report?.threatened == true &&
          report?.risk?.advantage != CombatAdvantage.favorable) {
        continue;
      }
      final keep = math.max(
        1,
        report?.threatened == true
            ? math.min(home.requiredGarrison, ledger.slots(home))
            : home.requiredGarrison,
      );
      if (ledger.garrison(home.id).length <= keep) continue;
      if (report?.threatened == true &&
          !_remainingDefenseSafe(home, hero, ledger)) {
        continue;
      }

      final targets =
          _view.cities
              .where(
                (c) =>
                    c.country != _view.country &&
                    (assigned[c.id] ?? 0) < rules.tuning.maxTeam,
              )
              .toList()
            ..sort(
              (a, b) => _targetScore(b, hero).compareTo(_targetScore(a, hero)),
            );
      PlannedOperation? selected;
      AiCity? selectedTarget;
      var selectedScore = -double.infinity;
      for (final target in targets.take(rules.tuning.maxTargets)) {
        if (!work.candidate()) break;
        final guards = _view
            .garrison(target.id)
            .reversed
            .take(target.safeSlots)
            .toList();
        // 单一目标达到保守编队名额后，不因仍有闲将无限增加攻城队列。
        final teamNeed = math.max(
          1,
          math.min(rules.tuning.maxTeam, (guards.length / 2).ceil()),
        );
        if ((assigned[target.id] ?? 0) >= teamNeed) continue;
        final route = routes.to(hero, target.center, _view, target: target);
        if (!route.complete) continue;
        final equipment = operations.loadouts(hero, ledger);
        var acceptable = false;
        for (final gear in equipment) {
          final readiness = assessRaid(
            hero,
            target,
            _view,
            rules,
            assessor,
            gear,
            slack:
                request.idleCycles >
                        rules.tuning.stagnationSeconds /
                            rules.tuning.intervalSeconds &&
                    ledger.gold > 100
                ? .05
                : 0,
          );
          final lower = readiness.lower;
          final neededTeam = readiness.teamSize;
          acceptable = neededTeam > 0;
          if (!acceptable) continue;
          requiredHeroes = math.max(requiredHeroes, neededTeam);
          final option = _prepareRaid(
            ledger,
            hero,
            target,
            gear,
            neededTeam,
            assigned[target.id] ?? 0,
          );
          if (option == null) {
            final quote = ledger.copy();
            quote.gold = 1000000; // 只求静态报价；此账本绝不提交给真实世界。
            final quoted = _prepareRaid(
              quote,
              hero,
              target,
              gear,
              neededTeam,
              assigned[target.id] ?? 0,
            );
            if (quoted != null) {
              phase = urgent.isEmpty ? 'saving' : phase;
              final total =
                  quote.gold -
                  quoted.ledger.gold +
                  quoted.ledger.cash().reserve;
              requiredGold = requiredGold == 0
                  ? total
                  : math.min(requiredGold, total);
              targetCity ??= target.id;
            } else {
              phase = urgent.isEmpty ? 'preparing' : phase;
            }
            continue;
          }
          final score =
              _targetScore(target, hero) -
              route.seconds * .4 -
              (ledger.gold - option.ledger.gold) * .5 +
              lower * 30 +
              gear
                      .skip(1)
                      .fold<int>(
                        0,
                        (n, id) =>
                            n +
                            math.max(
                              0,
                              (rules.weapons[id]?.damage ?? 0) -
                                  (rules.weapons[id]?.selfDamage ?? 0),
                            ),
                      ) *
                  rules.tuning.laterWeaponCredit *
                  rules.number('weaponChance') *
                  .02;
          if (score > selectedScore) {
            selected = option;
            selectedTarget = target;
            selectedScore = score;
            requiredHeroes = option.group.tasks.length;
          }
          break;
        }
        if (!acceptable && targetCity == null) {
          targetCity = target.id;
          requiredHeroes = math.max(
            1,
            math.min(rules.tuning.maxTeam, guards.length),
          );
        }
        yield 5;
      }
      if (selected != null &&
          groups.fold(0, (n, g) => n + g.actions.length) +
                  selected.group.actions.length <=
              rules.tuning.maxCommands) {
        ledger = selected.ledger;
        groups.add(selected.group);
        targetCity = selectedTarget!.id;
        assigned.update(
          targetCity,
          (n) => n + selected!.group.tasks.length,
          ifAbsent: () => selected!.group.tasks.length,
        );
        launched = true;
      }
      yield 6;
    }

    // 无可执行远征时再为明确缺口整备，禁止边境危险溢员和无任务采购。
    if (request.stage == AiDecisionStage.full &&
        !launched &&
        groups.fold(0, (n, g) => n + g.actions.length) <
            rules.tuning.maxCommands - 3) {
      for (final city in _view.owned) {
        if (_reports[city.id]?.threatened == true) continue;
        if (!work.candidate()) break;
        final local = ledger.garrison(city.id), next = ledger.copy();
        final governors =
            local
                .where(
                  (h) => h.canUpgrade && !ledger.reservedHeroes.contains(h.id),
                )
                .toList()
              ..sort((a, b) => b.politics.compareTo(a.politics));
        final needHero =
            _view.cities.any((c) => c.country != _view.country) &&
            local.length < math.max(1, city.requiredGarrison) + requiredHeroes;
        if (governors.isNotEmpty &&
            (local.length >= ledger.slots(city) ||
                needHero && local.length >= city.recruitCapacity)) {
          if (next.upgrade(city, governors.first) &&
              next.gold >= next.cash().reserve) {
            ledger = next;
            groups.add(
              AiCommandGroup(
                reason: '先扩充安全迎战名额和兵员容量，再考虑招将与远征',
                actions: [
                  AiAction(
                    AiActionKind.upgrade,
                    city: city.id,
                    hero: governors.first.id,
                  ),
                ],
                dependencies: operations.dependencies(
                  [governors.first],
                  [city],
                ),
                minimumGold: next.cash().reserve,
              ),
            );
            break;
          }
        }
        if (needHero &&
            local.length < ledger.slots(city) &&
            next.recruit(city) &&
            next.gold >= next.cash().reserve) {
          ledger = next;
          groups.add(
            AiCommandGroup(
              reason: '为留守与远征的真实缺口抽取英雄，预留最高手续费和月俸',
              actions: [AiAction(AiActionKind.recruit, city: city.id)],
              dependencies: operations.dependencies([], [city]),
              minimumGold: next.cash().reserve,
            ),
          );
          break;
        }
        final need =
            math.min(
              ledger.capacity,
              local.length * rules.integer('soldierLimit'),
            ) -
            ledger.reserves;
        if (need > 0) {
          final supply = ledger.copy(),
              count = math.min(rules.integer('soldierBatch'), need);
          if (supply.buySoldiers(count) &&
              supply.gold >= supply.cash().reserve) {
            ledger = supply;
            groups.add(
              AiCommandGroup(
                reason: '补充近期守城和出征所需兵员，不填满没有任务的全国容量',
                actions: [
                  AiAction(AiActionKind.soldiers, city: city.id, amount: count),
                ],
                dependencies: operations.dependencies([], [city]),
                minimumGold: supply.cash().reserve,
              ),
            );
            break;
          }
        }
        yield 7;
      }
    }
    if (launched) phase = urgent.isEmpty ? 'attacking' : 'defending';
    if (groups.isEmpty) {
      notes.add(
        ledger.gold < ledger.cash().reserve
            ? '资金不足以覆盖现有部队和欠收月俸，等待整备'
            : '没有满足守城、时限及静态风险约束的新增行动，保持已有任务',
      );
    }
    if (request.idleCycles >
        rules.tuning.stagnationSeconds / rules.tuning.intervalSeconds) {
      notes.add(
        '停滞诊断：${phase == 'saving' ? '缺少整队后勤资金' : '缺少可安全执行的扩张条件'}，不通过无限招募或自杀出击打破等待',
      );
    }
    final boundedGroups = <AiCommandGroup>[];
    var commandCount = 0;
    for (final group in groups) {
      if (commandCount + group.actions.length > rules.tuning.maxCommands) {
        work.limited = true;
        notes.add('命令配额到达，只提交前面完整的动作组，后续留待下一次规划');
        break;
      }
      commandCount += group.actions.length;
      boundedGroups.add(group);
    }
    result = CountryPlan(
      phase: phase,
      targetCity: targetCity,
      requiredGold: requiredGold,
      requiredHeroes: requiredHeroes,
      groups: boundedGroups,
      notes: notes.take(12).toList(),
      budgetLimited: work.limited,
      assessments: work.assessments,
      routeSteps: work.routeSteps,
      expansions: work.candidates,
    );
  }

  bool _remainingDefenseSafe(AiCity city, AiHero departing, AiLedger ledger) {
    final enemies = _reports[city.id]?.incoming ?? [];
    if (enemies.isEmpty) return true;
    final guards = ledger
        .garrison(city.id)
        .where((h) => h != departing)
        .toList()
        .reversed
        .take(ledger.slots(city))
        .toList();
    if (guards.isEmpty) return false;
    return enemies.every(
      (enemy) => guards.any(
        (guard) =>
            assessor
                .compare(
                  guard,
                  enemy.hero,
                  ownDefense: ledger.slots(city),
                  ownSoldiers: math.min(
                    rules.integer('soldierLimit'),
                    math.max(
                      0,
                      ledger.reserves - rules.integer('soldierLimit'),
                    ),
                  ),
                )
                .advantage ==
            CombatAdvantage.favorable,
      ),
    );
  }

  // 整队装备、兵员、队列后勤全部可支付后，才返回一个可提交的复合命令。
  PlannedOperation? _prepareRaid(
    AiLedger base,
    AiHero lead,
    AiCity target,
    List<int> leadGear,
    int count,
    int queued,
  ) {
    final available = <AiHero>[];
    for (final city in _view.owned) {
      if (_reports[city.id]?.threatened == true && city.id != lead.city) {
        continue;
      }
      final keep = math.max(1, city.requiredGarrison);
      final room = math.max(0, base.garrison(city.id).length - keep);
      final free =
          base
              .garrison(city.id)
              .where(
                (h) => h.canDispatch && !base.reservedHeroes.contains(h.id),
              )
              .toList()
            ..sort(
              (a, b) =>
                  heroDeploymentValue(
                    b,
                    preserveGovernor:
                        _view.city(b.city)!.level < rules.integer('maxLevel'),
                  ).compareTo(
                    heroDeploymentValue(
                      a,
                      preserveGovernor:
                          _view.city(a.city)!.level < rules.integer('maxLevel'),
                    ),
                  ),
            );
      available.addAll(free.take(room));
    }
    if (!available.contains(lead)) return null;
    available
      ..remove(lead)
      ..sort(
        (a, b) =>
            heroDeploymentValue(
              b,
              preserveGovernor:
                  _view.city(b.city)!.level < rules.integer('maxLevel'),
            ).compareTo(
              heroDeploymentValue(
                a,
                preserveGovernor:
                    _view.city(a.city)!.level < rules.integer('maxLevel'),
              ),
            ),
      );
    final team = [lead, ...available.take(count - 1)];
    if (team.length < count) return null;
    var ledger = base;
    final actions = <AiAction>[],
        tasks = <ArmyTask>[],
        deps = <String, String>{};
    final guards = _view
        .garrison(target.id)
        .reversed
        .take(target.safeSlots)
        .toList();
    for (var index = 0; index < team.length; index++) {
      final hero = team[index];
      if (_reports[hero.city]?.threatened == true &&
          !_remainingDefenseSafe(_view.city(hero.city)!, hero, ledger)) {
        return null;
      }
      final route = routes.to(hero, target.center, _view, target: target);
      PlannedOperation? chosen;
      for (final gear
          in index == 0 ? [leadGear] : operations.loadouts(hero, ledger)) {
        if (index > 0 &&
            guards.any((guard) {
              final score = assessor.compare(
                hero,
                guard,
                enemyDefense: target.safeSlots,
                ownSoldiers: rules.integer('soldierLimit'),
                enemySoldiers: math.min(
                  rules.integer('soldierLimit'),
                  _view.countries
                      .firstWhere((c) => c.id == target.country)
                      .reserves,
                ),
                loadout: gear,
              );
              return score.releaseRisk ||
                  score.upper <= rules.tuning.advantageMargin ||
                  score.lower < -.12;
            })) {
          continue;
        }
        var protection = 0;
        for (final city in _view.owned) {
          final remaining =
              ledger.garrison(city.id).length - (city.id == hero.city ? 1 : 0);
          protection +=
              math.min(
                math.max(0, remaining),
                math.max(1, city.requiredGarrison),
              ) *
              rules.integer('soldierLimit');
        }
        chosen = operations.send(
          ledger,
          hero,
          route,
          role: 'expedition',
          reason: count == 1 ? '高级战力优先进攻可供养的弱城' : '全队完成装备、兵员与队列粮草准备后协同轮攻',
          target: target,
          gear: gear,
          protectSoldiers: math.min(
            protection,
            math.max(0, ledger.capacity - rules.integer('soldierLimit')),
          ),
          queueIndex: queued + index,
        );
        if (chosen != null) break;
      }
      if (chosen == null) return null;
      ledger = chosen.ledger;
      actions.addAll(chosen.group.actions);
      tasks.addAll(chosen.group.tasks);
      deps.addAll(chosen.group.dependencies);
      if (actions.length > rules.tuning.maxCommands) {
        work.limited = true;
        return null;
      }
    }
    deps.addAll(operations.dependencies(guards, []));
    return PlannedOperation(
      ledger,
      AiCommandGroup(
        reason: count == 1 ? '执行静态优势明确、可以供养的扩张' : '整队后勤准备完成，按真实排队规则轮攻；不预演未来伤亡',
        actions: actions,
        dependencies: deps,
        tasks: tasks,
        minimumGold: ledger.cash().reserve,
      ),
    );
  }

  double _targetScore(AiCity city, AiHero hero) =>
      targetPriority(city, hero, _view, rules, request.seed);
}
