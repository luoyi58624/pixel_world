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
import 'offensive_focus.dart';
import 'coalition_policy.dart';

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
    final protectProtagonist = _reports.values.any(
      (r) => r.protagonistInDanger,
    );
    if (request.stage == AiDecisionStage.attack && protectProtagonist) {
      result = CountryPlan(
        phase: 'defending',
        notes: ['主角所在城尚有明确生命风险，暂停新远征，优先完成防守调度'],
        budgetLimited: work.limited,
        assessments: work.assessments,
        routeSteps: work.routeSteps,
      );
      return;
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
        if (a.protagonistInDanger != b.protagonistInDanger) {
          return a.protagonistInDanger ? -1 : 1;
        }
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
    if (request.stage != AiDecisionStage.attack) {
      final repair = _reinforceEmptyCities(ledger);
      if (repair != null) {
        ledger = repair.ledger;
        groups.add(repair.group);
        notes.add('空城优先接防，其他安全城池继续组织进攻');
      }
    }
    yield 2;

    // 撤退只参考已发生的碰撞与当前生命，不额外抽样未来伤害。
    for (final hero
        in _view.heroes
            .where(
              (h) => h.country == _view.country && !h.marked && h.canRetreat,
            )
            .where((_) => request.stage != AiDecisionStage.attack)) {
      if (hero.type != 1) continue;
      final other = _view.hero(hero.opponent);
      if (other == null) continue;
      final target = _view.city(hero.targetCity);
      final exhausted =
          hero.state == AiArmyState.attacking &&
          target != null &&
          hero.soldierCount < other.soldierCount &&
          assessor.compare(hero, other, enemyDefense: target.safeSlots).upper <
              0;
      final dying =
          hero.hp < hero.maxHp * .25 &&
          hero.clashes >= 2 &&
          hero.received > 0 &&
          hero.health / hero.received <
              other.health /
                  math.max(1, hero.dealt) *
                  rules.number('retreatSurvivalRatio');
      if (!exhausted && !dying) continue;
      if (ledger.reservedHeroes.contains(hero.id)) continue;
      ledger.reservedHeroes.add(hero.id);
      groups.add(
        AiCommandGroup(
          reason: exhausted
              ? '高级将领兵力落后，当前属性已不适合继续攻城，趁仍有生命申请合法撤退整备'
              : '高级将领生命低于四分之一，已发生的伤害显示胜望渺茫，申请有风险的合法撤退',
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
      if (ledger.reservedHeroes.contains(hero.id)) continue;
      final task = ledger.tasks[hero.id];
      final needsRecovery = _needsAssaultRecovery(hero, task);
      final expired = task != null && task.deadlineTick < _view.tick;
      final changedOwner =
          task?.needsTargetReview(
            _view.city(task.city)?.country,
            _view.country,
          ) ??
          false;
      final stopped =
          task != null &&
          hero.state == AiArmyState.camped &&
          !hero.movementPending &&
          task.leg + 1 >= task.points.length;
      final idle =
          hero.state == AiArmyState.camped &&
          !hero.movementPending &&
          (task == null ||
              expired ||
              stopped && ['intercept', 'standby'].contains(task.role));
      final reconsider = changedOwner || stopped || idle || needsRecovery;
      if (!protectProtagonist &&
          (changedOwner || stopped && task.role == 'expedition' || idle) &&
          hero.hp >= hero.maxHp * .65) {
        final attack = _redirectFieldAttack(ledger, hero, task);
        if (attack != null) {
          ledger = attack.ledger;
          groups.add(attack.group);
          continue;
        }
        // 配额不足可以稍后重算，但失效的远征必须先停下，不能继续冲向已占领的城。
        if (work.limited && !changedOwner) continue;
      }
      if (task?.arrivalSlot == true &&
          hero.targetCity == task?.city &&
          !expired &&
          !reconsider) {
        continue;
      }
      final completedIntercept =
          task?.role == 'intercept' &&
          (_view.hero(task?.enemy) == null ||
              _reports[task?.city]?.threatened != true);
      if (!reconsider &&
          completedIntercept &&
          task!.committedUntil > _view.tick &&
          hero.hp >= hero.maxHp * .65) {
        continue;
      }
      if (task != null &&
          !reconsider &&
          !expired &&
          !completedIntercept &&
          task.committedUntil > _view.tick &&
          !assaultIsCommitted(hero, _view, ledger, rules) &&
          hero.hp >= hero.maxHp * .5) {
        continue;
      }
      if (hero.movementPending &&
          task != null &&
          !expired &&
          !needsRecovery &&
          !changedOwner) {
        continue;
      }
      final assault = assaultTarget(hero, _view, ledger);
      if (!reconsider &&
          assaultIsCommitted(hero, _view, ledger, rules) &&
          (hero.hp >= hero.maxHp * .25 ||
              _view.garrison(assault!.id).isEmpty)) {
        notes.add('${hero.id}已临近主攻目标，保持进攻，不因普通预警或整备预算折返');
        continue;
      }
      // 分段行军在路点会短暂停靠，下一段仍由原任务推进，不能误判为闲置营地。
      if (task?.role == 'expedition' &&
          !reconsider &&
          !expired &&
          hero.hp >= hero.maxHp * .65 &&
          task!.leg + 1 < task.points.length) {
        continue;
      }
      if (!reconsider &&
          !completedIntercept &&
          !expired &&
          hero.hp >= hero.maxHp * .65 &&
          hero.state != AiArmyState.camped) {
        continue;
      }
      final candidates =
          _view.owned
              .where(
                (c) =>
                    ledger.occupancy(c.id) -
                            (!expired &&
                                    task?.arrivalSlot == true &&
                                    task?.city == c.id
                                ? 1
                                : 0) <
                        (_reports[c.id]?.threatened == true
                            ? ledger.slots(c)
                            : math.max(
                                ledger.slots(c),
                                c.rearStagingCapacity +
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
          reason: needsRecovery
              ? '当前随军兵力不足以安全继续，回城补兵后重新组织进攻'
              : hero.hp < hero.maxHp * .65
              ? '将领受伤，回城恢复生命后再战'
              : changedOwner
              ? '目标易主后原城与附近敌城均不适合继续进攻，回城整备'
              : stopped
              ? '原路线持续受阻，重新选择有安全名额的城池整备'
              : expired
              ? '原任务已超过执行时限，回城重新整备'
              : completedIntercept
              ? '截击目标已消失，回城结束本次任务'
              : '野外指令已完成，回城等待新任务',
          target: city,
          arrival: true,
          emergency: true,
          // 回城名额与危险窗口属于目的城，不应被另一座出发城的即时战斗锁死。
          deadline: _reports[city.id]?.threatened == true
              ? _reports[city.id]!.deadline
              : double.infinity,
        );
        if (option != null) {
          ledger = option.ledger;
          groups.add(option.group);
          break;
        }
      }
      if ((idle || needsRecovery || changedOwner) &&
          !ledger.reservedHeroes.contains(hero.id)) {
        final reason = needsRecovery
            ? '随军兵力不足且暂无安全整备地点，停止推进并等待重新调度'
            : changedOwner
            ? '原进攻目标已经易主，暂无合适的新目标或安全入城方案，停止旧远征并继续复查'
            : '当前没有合适的截击或进攻目标，友城也没有安全入城方案，暂时待命并继续复查';
        notes.add('${hero.id}：$reason');
        if (task?.role != 'standby' || expired) {
          final mustCamp =
              (needsRecovery || changedOwner) &&
              (hero.state != AiArmyState.camped || hero.movementPending);
          final standby = ArmyTask(
            hero: hero.id,
            role: 'standby',
            city: hero.city,
            points: [hero.position],
            committedUntil: _view.tick,
            deadlineTick:
                _view.tick + (rules.tuning.stagnationSeconds * 60).round(),
            expectedOrderRevision: hero.orderRevision + (mustCamp ? 1 : 0),
            reason: reason,
          );
          ledger.tasks[hero.id] = standby;
          groups.add(
            AiCommandGroup(
              reason: reason,
              actions: [
                if (mustCamp) AiAction(AiActionKind.camp, hero: hero.id),
              ],
              tasks: [standby],
              dependencies: operations.dependencies(
                [hero],
                [_view.city(hero.city)!],
              ),
            ),
          );
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
                  ledger.canSpareForOffense(h) &&
                  !protectProtagonist &&
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
                      _view.city(b.city)!.level <
                      rules.cityUpgradeLimit(_view.year),
                ).compareTo(
                  heroDeploymentValue(
                    a,
                    preserveGovernor:
                        _view.city(a.city)!.level <
                        rules.cityUpgradeLimit(_view.year),
                  ),
                ),
          );
    final openingFocus = OffensiveFocus(
      _view,
      ledger,
      rules,
      targetCountry: request.offensiveCountry,
      targetCity: request.offensiveCity,
    );
    final assigned = {
      for (final id in openingFocus.armies.keys)
        id: openingFocus.assignedTo(id),
    };
    targetCity = openingFocus.primary ?? openingFocus.preferredCity;
    if (openingFocus.primary != null && urgent.isEmpty) phase = 'attacking';
    var launched = false;
    for (final hero in spare) {
      // 每城独立校验余下守军，不让其他城市未解决的威胁冻结全国进攻。
      if (ledger.reservedHeroes.contains(hero.id) ||
          ledger.removed.contains(hero.id)) {
        continue;
      }
      final home = _view.city(hero.city)!;
      final report = _reports[home.id];
      if (report?.threatened == true &&
          report?.risk?.advantage != CombatAdvantage.favorable) {
        continue;
      }
      final keep = report?.threatened == true
          ? math.min(ledger.defendersToKeep(home), ledger.slots(home))
          : ledger.defendersToKeep(home);
      if (ledger.garrison(home.id).length <= keep) continue;
      if (report?.threatened == true &&
          !_remainingDefenseSafe(home, hero, ledger)) {
        continue;
      }

      final focus = OffensiveFocus(
        _view,
        ledger,
        rules,
        targetCountry: request.offensiveCountry,
        targetCity: request.offensiveCity,
      );
      final targets =
          _view.cities
              .where(
                (c) =>
                    c.country != _view.country &&
                    focus.allows(c) &&
                    operations.canRaidFrom(hero, c) &&
                    (assigned[c.id] ?? 0) < rules.tuning.maxTeam,
              )
              .toList()
            ..sort(
              (a, b) => a.id == focus.primary
                  ? -1
                  : b.id == focus.primary
                  ? 1
                  : _targetScore(b, hero).compareTo(_targetScore(a, hero)),
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
        final route = routes.to(hero, target.center, _view, target: target);
        if (!route.complete) continue;
        final readiness = assessRaid(
          hero,
          target,
          _view,
          rules,
          assessor,
          slack:
              request.idleCycles >
                      rules.tuning.stagnationSeconds /
                          rules.tuning.intervalSeconds &&
                  ledger.gold > 100
              ? .05
              : 0,
        );
        final lower = readiness.lower;
        final neededTeam = operations.raidTeamSize(
          readiness.teamSize,
          target,
          ledger,
          lead: hero,
        );
        if (neededTeam == 0) {
          if (targetCity == null) {
            targetCity = target.id;
            requiredHeroes = math.max(
              1,
              math.min(rules.tuning.maxTeam, guards.length),
            );
          }
          yield 5;
          continue;
        }
        final secondary = focus.primary != null && target.id != focus.primary;
        if (secondary &&
            (neededTeam != 1 || lower < rules.tuning.splitAdvantageMargin)) {
          continue;
        }
        final queued = assigned[target.id] ?? 0;
        final reinforcements = neededTeam - queued;
        if (reinforcements <= 0) continue;
        requiredHeroes = math.max(requiredHeroes, neededTeam);
        final option = _prepareRaid(
          ledger,
          hero,
          target,
          reinforcements,
          queued,
          breakthrough: readiness.breakthrough,
        );
        if (option == null) {
          final quote = ledger.copy();
          quote.gold = 1000000; // 只求静态报价；此账本绝不提交给真实世界。
          final quoted = _prepareRaid(
            quote,
            hero,
            target,
            reinforcements,
            queued,
            breakthrough: readiness.breakthrough,
          );
          if (quoted != null) {
            phase = urgent.isEmpty ? 'saving' : phase;
            final total =
                quote.gold - quoted.ledger.gold + quoted.ledger.cash().reserve;
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
            _targetScore(target, hero, travelSeconds: route.seconds) -
            route.seconds * .4 -
            (ledger.gold - option.ledger.gold) * .5 +
            lower * 30;
        if (score > selectedScore) {
          selected = option;
          selectedTarget = target;
          selectedScore = score;
          requiredHeroes = option.group.tasks.length;
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

    if (!launched &&
        !protectProtagonist &&
        beam.first.unresolved == 0 &&
        request.stage != AiDecisionStage.defense) {
      final staging = _stageFrontier(ledger, openingFocus);
      if (staging != null) {
        ledger = staging.ledger;
        groups.add(staging.group);
        phase = 'preparing';
      }
    }

    // 无可执行远征时整理城防和编制，补兵以全国容量为目标。
    if (request.stage == AiDecisionStage.full &&
        !protectProtagonist &&
        !launched &&
        groups.fold(0, (n, g) => n + g.actions.length) <
            rules.tuning.maxCommands - 3) {
      final recruitmentFronts = ledger.recruitmentFronts(
        _view.cities.where(
          (c) =>
              c.country != _view.country &&
              openingFocus.allows(c) &&
              operations.hasCoalitionFront(c),
        ),
      );
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
            recruitmentFronts.contains(city.id) &&
            _view.cities.any((c) => c.country != _view.country) &&
            (local.isEmpty ||
                ledger.assignedHeroCount(city.id) <
                    ledger.defendersToKeep(city) + requiredHeroes);
        if (governors.isNotEmpty &&
            (local.length >= ledger.slots(city) ||
                needHero && local.length >= city.rearStagingCapacity)) {
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
            final count = next.stockUpSoldiers();
            if (count > 0) {
              groups.add(
                AiCommandGroup(
                  reason: '城防升级后在同一次补兵窗口内尽量补满全国兵员容量',
                  actions: [
                    AiAction(
                      AiActionKind.soldiers,
                      city: city.id,
                      amount: count,
                    ),
                  ],
                  dependencies: operations.dependencies([], [city]),
                ),
              );
            }
            break;
          }
        }
        if (needHero &&
            next.recruit(
              city,
              offensiveCountry: _view.city(targetCity)?.country,
            ) &&
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
        final supply = ledger.copy();
        final count = supply.stockUpSoldiers();
        if (count > 0) {
          ledger = supply;
          groups.add(
            AiCommandGroup(
              reason: '优先补满全国兵员容量，资金不足时买得起多少补多少，不透支',
              actions: [
                AiAction(AiActionKind.soldiers, city: city.id, amount: count),
              ],
              dependencies: operations.dependencies([], [city]),
              minimumGold: supply.cash().reserve,
            ),
          );
          break;
        }
        yield 7;
      }
    }
    if (launched) phase = urgent.isEmpty ? 'attacking' : 'defending';
    final coalitionTarget = _view.city(targetCity);
    if (coalitionTarget != null) {
      final policy = CoalitionPolicy(coalitionTarget.country, _view, rules);
      if (policy.dangerous) notes.add(policy.decisionNote);
    }
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

  // 前线空城需要接防，安全后方允许保持空城；不改令任何在途军队。
  PlannedOperation? _reinforceEmptyCities(AiLedger ledger) {
    for (final city in _view.owned) {
      if (ledger.garrison(city.id).isNotEmpty ||
          ledger.safeRear(city) ||
          ledger.occupancy(city.id) > 0 ||
          ledger.abandoned.contains(city.id)) {
        continue;
      }
      final donors =
          _view.heroes
              .where(
                (h) =>
                    h.country == _view.country &&
                    h.canDispatch &&
                    ledger.canSpareForOffense(h) &&
                    !ledger.reservedHeroes.contains(h.id) &&
                    _reports[h.city]?.threatened != true,
              )
              .toList()
            ..sort(
              (a, b) => a.position
                  .distance(city.center)
                  .compareTo(b.position.distance(city.center)),
            );
      for (final hero in donors.take(4)) {
        if (!work.candidate()) return null;
        final route = routes.to(
          hero,
          city.center,
          _view,
          target: city,
          safe: true,
        );
        final operation = operations.send(
          ledger,
          hero,
          route,
          role: 'transfer',
          reason: '前线空城优先接防，安全后方无需为留守牵制部队',
          target: city,
          arrival: true,
          emergency: true,
          deadline: _reports[city.id]?.deadline ?? double.infinity,
        );
        if (operation != null) return operation;
      }
    }
    return null;
  }

  // 野战损失兵员后复核眼前防线，原行军承诺不能把残部锁在失去条件的攻势里。
  bool _needsAssaultRecovery(AiHero hero, ArmyTask? task) {
    if (task?.role != 'expedition' ||
        hero.soldierCount >= rules.integer('soldierLimit')) {
      return false;
    }
    final city = _view.city(task?.city);
    if (city == null || city.country == _view.country) return false;
    final guard = _view
        .garrison(city.id)
        .reversed
        .take(city.safeSlots)
        .firstOrNull;
    if (guard == null) return false;
    final reserves = _view.countries
        .firstWhere((n) => n.id == city.country)
        .reserves;
    final risk = assessor.compare(
      hero,
      guard,
      enemyDefense: city.safeSlots,
      enemySoldiers: math.min(
        rules.integer('soldierLimit'),
        guard.soldierCount + reserves,
      ),
    );
    if (work.limited) return false;
    // 消耗攻击的准入和继续条件相同，避免同一支残部在进攻与待命间反复切换。
    if (task!.attrition) {
      return risk.upper <= 0 || risk.lower < rules.tuning.breakthroughMargin;
    }
    return risk.advantage != CombatAdvantage.favorable;
  }

  // 易主后用真实随身兵力重新选敌城，已经占领的城池不会继续作为进攻目标。
  PlannedOperation? _redirectFieldAttack(
    AiLedger ledger,
    AiHero hero,
    ArmyTask? task,
  ) {
    final previousTarget = task?.role == 'expedition' ? task?.city : null;
    final targets =
        _view.cities.where((c) => c.country != _view.country).toList()
          ..sort((a, b) {
            if ((a.id == previousTarget) != (b.id == previousTarget)) {
              return a.id == previousTarget ? -1 : 1;
            }
            return _targetScore(b, hero).compareTo(_targetScore(a, hero));
          });
    for (final city in targets.take(rules.tuning.maxTargets)) {
      if (!work.candidate()) return null;
      if (!operations.canRaidFrom(hero, city)) continue;
      final assigned = ledger.tasks.values
          .where(
            (t) =>
                t.hero != hero.id &&
                t.role == 'expedition' &&
                t.city == city.id &&
                _view.hero(t.hero)?.marked == false,
          )
          .length;
      if (assigned >= rules.tuning.maxTeam) continue;
      final guard = _view
          .garrison(city.id)
          .reversed
          .take(city.safeSlots)
          .firstOrNull;
      if (guard != null) {
        final reserve = _view.countries
            .firstWhere((c) => c.id == city.country)
            .reserves;
        final risk = assessor.compare(
          hero,
          guard,
          enemyDefense: city.safeSlots,
          enemySoldiers: math.min(
            rules.integer('soldierLimit'),
            guard.soldierCount + reserve,
          ),
        );
        if (risk.upper <= 0 || risk.lower < rules.tuning.breakthroughMargin) {
          continue;
        }
      }
      final route = routes.to(hero, city.center, _view, target: city);
      final operation = operations.send(
        ledger,
        hero,
        route,
        role: 'expedition',
        target: city,
        emergency: true,
        queueIndex: assigned,
        attrition: guard != null,
        reason: task == null || task.role != 'expedition'
            ? '野外任务结束后利用现有随身兵力，转攻可以形成有效交换的敌城'
            : city.id == previousTarget
            ? '重新核对当前守军与路线后，继续进攻原目标'
            : '原目标不再适合进攻，转向附近可形成有效交换的敌城',
      );
      if (operation != null) return operation;
    }
    return null;
  }

  PlannedOperation? _stageFrontier(AiLedger ledger, OffensiveFocus focus) {
    final fronts = _view.owned
        .where((c) => _reports[c.id]?.threatened != true)
        .toList();
    if (fronts.length < 2) return null;
    final enemies = _view.cities
        .where((c) => c.country != _view.country && focus.allows(c))
        .toList();
    final costs = <int, double>{};
    for (final city in fronts) {
      enemies.sort(
        (a, b) => a.center
            .distance(city.center)
            .compareTo(b.center.distance(city.center)),
      );
      costs[city.id] = enemies
          .take(rules.tuning.maxTargets)
          .fold<double>(
            double.infinity,
            (n, enemy) => math.min(
              n,
              routes.seconds(city.center, enemy.outline.nearest(city.center)),
            ),
          );
    }
    fronts.sort((a, b) => costs[a.id]!.compareTo(costs[b.id]!));
    for (final front in fronts.take(2)) {
      if (costs[front.id]! > rules.tuning.coalitionMaxTravelSeconds) continue;
      for (final rear in fronts.reversed) {
        if (costs[rear.id]! < costs[front.id]! + 10) continue;
        final local = ledger.garrison(rear.id);
        if (local.length <= ledger.defendersToKeep(rear)) continue;
        final spare =
            local
                .where(
                  (h) =>
                      h.canDispatch &&
                      h.type != 2 &&
                      !ledger.reservedHeroes.contains(h.id),
                )
                .toList()
              ..sort(
                (a, b) =>
                    heroDeploymentValue(b).compareTo(heroDeploymentValue(a)),
              );
        for (final hero in spare.take(2)) {
          // 主力不靠转驻缩短账面距离；只调遣确实能提升前线建设效率的内政将领。
          if (!valuableGovernor(hero) ||
              front.level >= rules.cityUpgradeLimit(_view.year) ||
              rear.level < rules.cityUpgradeLimit(_view.year) ||
              ledger
                  .garrison(front.id)
                  .any((h) => h.politics >= hero.politics)) {
            continue;
          }
          if (!work.candidate()) return null;
          final route = routes.to(
            hero,
            front.center,
            _view,
            target: front,
            safe: true,
          );
          final option = operations.send(
            ledger,
            hero,
            route,
            role: 'transfer',
            target: front,
            arrival: true,
            rearSafe: true,
            reason: '后方建设已完成，安全转移高内政将领主持前线城防建设',
          );
          if (option != null) return option;
        }
      }
    }
    return null;
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

  // 整队兵员与队列后勤全部可支付后，才返回一个可提交的复合命令。
  PlannedOperation? _prepareRaid(
    AiLedger base,
    AiHero lead,
    AiCity target,
    int count,
    int queued, {
    bool breakthrough = false,
  }) {
    final available = <AiHero>[];
    for (final city in _view.owned) {
      if (_reports[city.id]?.threatened == true && city.id != lead.city) {
        continue;
      }
      final keep = base.defendersToKeep(city);
      final room = math.max(0, base.garrison(city.id).length - keep);
      final free =
          base
              .garrison(city.id)
              .where(
                (h) =>
                    h.canDispatch &&
                    !base.reservedHeroes.contains(h.id) &&
                    base.canSpareForOffense(h) &&
                    operations.canRaidFrom(h, target),
              )
              .toList()
            ..sort(
              (a, b) =>
                  heroDeploymentValue(
                    b,
                    preserveGovernor:
                        _view.city(b.city)!.level <
                        rules.cityUpgradeLimit(_view.year),
                  ).compareTo(
                    heroDeploymentValue(
                      a,
                      preserveGovernor:
                          _view.city(a.city)!.level <
                          rules.cityUpgradeLimit(_view.year),
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
                  _view.city(b.city)!.level <
                  rules.cityUpgradeLimit(_view.year),
            ).compareTo(
              heroDeploymentValue(
                a,
                preserveGovernor:
                    _view.city(a.city)!.level <
                    rules.cityUpgradeLimit(_view.year),
              ),
            ),
      );
    final firstRoute = routes.to(lead, target.center, _view, target: target);
    if (!firstRoute.complete) return null;
    final team = [lead], teamRoutes = <String, AiRoute>{lead.id: firstRoute};
    var earliest = firstRoute.seconds, latest = firstRoute.seconds;
    // 只考察有限候补，以真实路程约束抵达间隔，避免前队打光、后队还在远方。
    for (final h in available.take(rules.tuning.maxTeam * 2)) {
      if (team.length >= count) break;
      final readiness = assessRaid(h, target, _view, rules, assessor);
      if (readiness.teamSize == 0 || readiness.teamSize > count + queued) {
        continue;
      }
      final route = routes.to(h, target.center, _view, target: target);
      if (!route.complete) continue;
      final nextEarly = math.min(earliest, route.seconds),
          nextLate = math.max(latest, route.seconds);
      if (nextLate - nextEarly > rules.tuning.raidArrivalSpread) continue;
      team.add(h);
      teamRoutes[h.id] = route;
      earliest = nextEarly;
      latest = nextLate;
    }
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
      final route = teamRoutes[hero.id]!;
      PlannedOperation? chosen;

      // 候补已按同一整队需求筛选；不能在这里再用单将优势否决整个编队。
      var protection = 0;
      for (final city in _view.owned) {
        final remaining =
            ledger.garrison(city.id).length - (city.id == hero.city ? 1 : 0);
        protection +=
            math.min(math.max(0, remaining), ledger.defendersToKeep(city)) *
            rules.integer('soldierLimit');
      }
      chosen = operations.send(
        ledger,
        hero,
        route,
        role: 'expedition',
        reason: count == 1
            ? '围绕主攻目标投入足够战力，保留其他方向兵力'
            : '集中优势编队轮攻同一座城，抵达间隔不超过${rules.tuning.raidArrivalSpread.toInt()}秒',
        target: target,

        protectSoldiers: math.min(
          protection,
          math.max(0, ledger.capacity - rules.integer('soldierLimit')),
        ),
        queueIndex: queued + index,
        attrition: breakthrough,
      );

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
        reason: breakthrough
            ? '先派可形成有效交换的将领进攻前排，持续轮攻并补充战损'
            : count == 1
            ? '执行静态优势明确、可以供养的扩张'
            : '整队后勤准备完成，按真实排队规则轮攻；不预演未来伤亡',
        actions: actions,
        dependencies: deps,
        tasks: tasks,
        minimumGold: ledger.cash().reserve,
      ),
    );
  }

  double _targetScore(AiCity city, AiHero hero, {double? travelSeconds}) =>
      targetPriority(
        city,
        hero,
        _view,
        rules,
        request.seed,
        travelSeconds: travelSeconds,
      );
}
