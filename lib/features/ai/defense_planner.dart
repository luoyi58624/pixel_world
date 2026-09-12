import 'dart:math' as math;

import 'budget.dart';
import 'combat_assessment.dart';
import 'observation.dart';
import 'operations.dart';
import 'protocol.dart';
import 'rules_data.dart';
import 'threats.dart';
import 'work_budget.dart';
import 'offensive_focus.dart';

/// 一项完整防御候选，包含确定动作次序及未能解决的风险。
class DefenseCandidate {
  /// 创建候选。
  const DefenseCandidate(
    this.ledger,
    this.groups,
    this.score, {
    this.unresolved = false,
    this.note = '',
    this.response = 'local',
  });

  /// 资源状态、动作组、相对价值及失败解释。
  final AiLedger ledger;
  final List<AiCommandGroup> groups;
  final double score;
  final bool unresolved;
  final String note;

  /// 本地抵抗、召回远征或迁移，避免回防固定加分压过原有防线。
  final String response;
}

/// 有界比较升级、解雇、调防、全国回援、在途截击及安全转移。
class DefensePlanner {
  /// 使用同一观察和国家账本，禁止各城独立重复分配援军。
  DefensePlanner(
    this.request,
    this.rules,
    this.work,
    this.assessor,
    this.operations,
    this.reports,
  );

  /// 只读输入和有界服务。
  final AiRequest request;
  final AiRules rules;
  final AiWorkBudget work;
  final CombatAssessor assessor;
  final OperationPlanner operations;
  final Map<int, CityDefenseReport> reports;
  AiObservation get _view => request.observation;

  /// 返回完整候选；无合法解时显式保留不可挽救状态，不修改游戏规则。
  Iterable<DefenseCandidate> candidates(
    CityDefenseReport report,
    AiLedger base,
  ) sync* {
    final currentRisk = _risk(report, base);
    final overflow = base.occupancy(report.city.id) > base.slots(report.city);
    if (!overflow &&
        !report.protagonistInDanger &&
        report.incoming.isNotEmpty &&
        report.incoming.every((enemy) => _interceptionPending(enemy, base)) &&
        !base.tasks.values.any(
          (t) =>
              t.attrition && report.incoming.any((e) => e.hero.id == t.enemy),
        )) {
      yield DefenseCandidate(
        base,
        [],
        _quality(report, base),
        note: '已有截击部队能及时接敌，等待执行结果，不重复派出第二支部队',
        response: 'hold',
      );
      return;
    }
    if (!overflow &&
        !report.protagonistInDanger &&
        currentRisk?.advantage == CombatAdvantage.favorable) {
      yield DefenseCandidate(
        base,
        [],
        _quality(report, base),
        note: '城防与现有守将足以应对可见来敌，维持远征，不召回将领',
        response: 'hold',
      );
      return;
    }
    final choices = _allCandidates(report, base).toList();
    // 优先采用能解决险情的本地动作；明显改善防线时也先让真实结果落地。
    final local = choices
        .where(
          (c) =>
              c.response == 'local' &&
              c.groups.isNotEmpty &&
              c.groups.any(
                (g) => g.actions.any(
                  (a) =>
                      a.kind == AiActionKind.upgrade ||
                      a.kind == AiActionKind.dismiss ||
                      a.kind == AiActionKind.soldiers ||
                      a.kind == AiActionKind.dispatch,
                ),
              ) &&
              c.ledger.occupancy(report.city.id) <=
                  c.ledger.slots(report.city) &&
              (_risk(report, c.ledger)?.upper ?? -1) >=
                  -rules.tuning.recallCriticalMargin &&
              ((_risk(report, c.ledger)?.lower ?? -1) >
                      (currentRisk?.lower ?? -1) + .04 ||
                  c.groups.any(
                    (g) => g.tasks.any((t) => t.role == 'intercept'),
                  )) &&
              c.score > _quality(report, base),
        )
        .toList();
    if (local.isNotEmpty) {
      yield* local;
      return;
    }
    // 招募结果未知，不将未知英雄算成确定战力；先执行可支付的本地补强，再复核。
    if (!overflow && base.occupancy(report.city.id) < base.slots(report.city)) {
      final recruited = base.copy();
      if (recruited.recruit(report.city, emergency: true) &&
          recruited.gold >= recruited.cash(emergency: true).reserve) {
        yield _simple(report, base, recruited, [
          AiAction(AiActionKind.recruit, city: report.city.id),
        ], '本地仍有迎战名额，先招募补强，再按实际到任属性复核，暂不召回远征');
        return;
      }
    }
    // 能守住城的方案优先；安全撤走英雄不等于保住了受袭城。
    final canDefend = choices.any(
      (c) => c.response != 'relocation' && !c.unresolved,
    );
    yield* choices.where((c) => !canDefend || c.response != 'relocation');
  }

  Iterable<DefenseCandidate> _allCandidates(
    CityDefenseReport report,
    AiLedger base,
  ) sync* {
    final city = report.city;
    final overflow = base.occupancy(city.id) > base.slots(city);
    yield DefenseCandidate(
      base,
      [],
      _quality(report, base),
      unresolved:
          overflow ||
          _risk(report, base)?.advantage != CombatAdvantage.favorable,
      note: overflow
          ? 'unsalvageableDefense：当前安全名额 ${base.slots(city)}，驻军 ${base.occupancy(city.id)}，等待合法修复'
          : '保持可出场守军，继续监控全部来敌',
    );
    if (!work.candidate()) return;

    final supplied = base.copy();
    final count = supplied.stockUpSoldiers();
    if (count > 0) {
      yield _simple(report, base, supplied, [
        AiAction(AiActionKind.soldiers, city: city.id, amount: count),
      ], '优先用国库补满全国兵员容量，再判断是否需要外援');
    }

    if (city.initialBattleLevel == null) {
      final upgraded = base.copy(), actions = <AiAction>[];
      final governors =
          upgraded.garrison(city.id).where((h) => h.canUpgrade).toList()
            ..sort((a, b) => b.politics.compareTo(a.politics));
      if (governors.isNotEmpty) {
        final governor = governors.first;
        for (
          var steps = 0;
          steps < 4 && upgraded.levels[city.id]! < rules.integer('maxLevel');
          steps++
        ) {
          if (!upgraded.upgrade(city, governor) ||
              upgraded.gold < upgraded.cash(emergency: true).reserve) {
            break;
          }
          actions.add(
            AiAction(AiActionKind.upgrade, hero: governor.id, city: city.id),
          );
          if (upgraded.occupancy(city.id) <= upgraded.slots(city)) {
            yield _simple(
              report,
              base,
              upgraded,
              actions,
              '优先由高内政将领升级，保护真实迎战名额',
            );
            if (_risk(report, upgraded)?.advantage ==
                    CombatAdvantage.favorable ||
                overflow) {
              break;
            }
          }
        }
      }
    }

    // 每个候选只解雇最少的可操作低价值挡位者；同时比较筹款后升级。
    if (overflow) {
      final disposable =
          base
              .garrison(city.id)
              .where((h) => h.canDismiss && h.type != 2)
              .toList()
            ..sort(
              (a, b) => heroStrategicValue(a).compareTo(heroStrategicValue(b)),
            );
      for (final first in disposable.take(3)) {
        if (!work.candidate()) break;
        final ledger = base.copy(), actions = <AiAction>[];
        final order = [first, ...disposable.where((h) => h != first)];
        for (final hero in order) {
          if (ledger.occupancy(city.id) <= ledger.slots(city)) break;
          if (!ledger.dismiss(hero)) continue;
          actions.add(AiAction(AiActionKind.dismiss, hero: hero.id));
          if (city.initialBattleLevel == null) {
            final financed = ledger.copy(),
                combined = List<AiAction>.of(actions);
            final governors =
                financed.garrison(city.id).where((h) => h.canUpgrade).toList()
                  ..sort((a, b) => b.politics.compareTo(a.politics));
            if (governors.isNotEmpty) {
              for (
                var n = 0;
                n < 3 && financed.occupancy(city.id) > financed.slots(city);
                n++
              ) {
                if (!financed.upgrade(city, governors.first)) break;
                combined.add(
                  AiAction(
                    AiActionKind.upgrade,
                    hero: governors.first.id,
                    city: city.id,
                  ),
                );
              }
              if (financed.occupancy(city.id) <= financed.slots(city) &&
                  financed.gold >= financed.cash(emergency: true).reserve) {
                yield _simple(
                  report,
                  base,
                  financed,
                  combined,
                  '先解雇低交换价值挡位者筹资，保留主持者完成救城升级',
                );
              }
            }
          }
        }
        if (ledger.occupancy(city.id) <= ledger.slots(city)) {
          yield _simple(
            report,
            base,
            ledger,
            actions,
            '没有可支付且及时的升级方案，清出挡位守将并保留核心出场',
          );
        }
      }
    }

    // 先判断现有核心能否抵抗，不能把被弱将挡住名额误判为应该放弃城池。
    final abandonCity = _shouldAbandonCity(report, base);
    // 安全转移必须在旧城危险窗口前真正入城，单纯走出城门不算保住英雄。
    final mobile =
        base
            .garrison(city.id)
            .where((h) => h.canDispatch && !base.reservedHeroes.contains(h.id))
            .toList()
          ..sort((a, b) {
            if (abandonCity) {
              return heroStrategicValue(b).compareTo(heroStrategicValue(a));
            }
            final strength =
                heroDefenseValue(
                  a,
                  rules,
                  base.slots(city),
                  rules.integer('soldierLimit'),
                ).compareTo(
                  heroDefenseValue(
                    b,
                    rules,
                    base.slots(city),
                    rules.integer('soldierLimit'),
                  ),
                );
            return strength != 0
                ? strength
                : heroStrategicValue(a).compareTo(heroStrategicValue(b));
          });
    if ((overflow || abandonCity) && _view.owned.length > 1) {
      var moved = base.copy();
      if (abandonCity) {
        moved.abandoned.add(city.id);
      }
      final groups = <AiCommandGroup>[];
      final targets = _view.owned.where((c) => c.id != city.id).toList()
        ..sort(
          (a, b) => a.center
              .distance(city.center)
              .compareTo(b.center.distance(city.center)),
        );
      for (final hero in mobile.take(rules.tuning.maxTeam)) {
        if (!work.candidate()) break;
        PlannedOperation? best;
        for (final target in targets.take(4)) {
          final danger = reports[target.id];
          if (danger?.threatened == true &&
              danger?.risk?.advantage != CombatAdvantage.favorable) {
            continue;
          }
          if (moved.occupancy(target.id) >= moved.slots(target)) continue;
          final route = operations.routes.to(
            hero,
            target.center,
            _view,
            target: target,
            safe: true,
          );
          final option = operations.send(
            moved,
            hero,
            route,
            role: abandonCity ? 'evacuate' : 'transfer',
            reason: abandonCity
                ? '现有核心也明确处于劣势，在危险窗口前转移保全将领，原城风险仍未解决'
                : '转移多余的弱将，为强将保留本城迎战名额',
            target: target,
            arrival: true,
            emergency: true,
            deadline: report.deadline,
          );
          if (option != null &&
              (best == null || option.ledger.gold > best.ledger.gold)) {
            best = option;
          }
        }
        if (best == null) continue;
        moved = best.ledger;
        groups.add(best.group);
        if (moved.occupancy(city.id) <= moved.slots(city)) {
          final saved = groups
              .expand((g) => g.tasks)
              .fold(0.0, (n, t) => n + heroStrategicValue(_view.hero(t.hero)!));
          yield DefenseCandidate(
            moved.copy(),
            List.of(groups),
            _quality(report, moved) + saved * .65,
            note: _noteForTransfer(report),
            unresolved:
                _risk(report, moved)?.advantage != CombatAdvantage.favorable,
            response: abandonCity ? 'relocation' : 'local',
          );
          if (overflow) break;
        }
      }
    }

    // 领土预警并不等于城池将失守；已承担任务的远征只在极端救城时考虑召回。
    final critical = _criticalRecall(report, base);
    bool engaged(AiHero h) =>
        assaultTarget(h, _view, base) != null ||
        base.tasks[h.id]?.role == 'intercept' &&
            (_view.hero(base.tasks[h.id]?.enemy)?.hp ?? 0) > 0;
    // 一个合适援军已经足够时，不把其余远征一起召回。
    final reinforcements =
        _view.heroes
            .where(
              (h) =>
                  h.country == _view.country &&
                  (h.canMove ||
                      h.canDispatch && base.safeRear(_view.city(h.city)!)) &&
                  !h.marked &&
                  base.tasks[h.id]?.arrivalSlot != true &&
                  !base.reservedHeroes.contains(h.id) &&
                  (!engaged(h) || critical),
            )
            .toList()
          ..sort((a, b) {
            if (engaged(a) != engaged(b)) return engaged(a) ? 1 : -1;
            return a.position
                .distance(city.center)
                .compareTo(b.position.distance(city.center));
          });
    for (final hero in reinforcements.take(
      report.incoming.isEmpty ? 0 : rules.tuning.maxTeam,
    )) {
      if (!work.candidate()) break;
      final sourceThreat = reports[hero.city];
      final safeDeadline = math.min(
        report.deadline,
        sourceThreat?.threatened == true
            ? sourceThreat!.deadline
            : double.infinity,
      );
      if ((!engaged(hero) || critical) &&
          _risk(report, base)?.advantage != CombatAdvantage.favorable &&
          base.occupancy(city.id) < base.slots(city)) {
        final enemy = report.incoming
            .map((e) => e.hero)
            .reduce(
              (a, b) =>
                  heroCombatValue(a, rules) > heroCombatValue(b, rules) ? a : b,
            );
        final score = assessor.compare(
          hero,
          enemy,
          ownDefense: base.slots(city),
          ownSoldiers: math.min(
            rules.integer('soldierLimit'),
            base.reserves + hero.soldierCount,
          ),
        );
        if (score.lower > (report.risk?.lower ?? -1) + .05) {
          final route = operations.routes.to(
            hero,
            city.center,
            _view,
            target: city,
            safe: true,
          );
          final option = operations.send(
            base,
            hero,
            route,
            role: 'rescue',
            reason:
                '本地抵抗仍有缺口（城防${base.slots(city)}级，防守余量${((_risk(report, base)?.lower ?? -1) * 100).round()}点），援军约${route.seconds.toStringAsFixed(1)}秒到达，危险窗口${safeDeadline.toStringAsFixed(1)}秒，预留入城名额',
            target: city,
            arrival: true,
            emergency: true,
            deadline: safeDeadline,
          );
          if (option != null &&
              _risk(report, option.ledger)?.advantage ==
                  CombatAdvantage.favorable) {
            yield DefenseCandidate(
              option.ledger,
              [option.group],
              _quality(report, option.ledger) - heroStrategicValue(hero) * .08,
              response: 'recall',
            );
          }
        }
      }
      for (final incoming in report.incoming.take(2)) {
        if (!hero.canMove) break;
        final continuing =
            base.tasks[hero.id]?.role == 'intercept' &&
            base.tasks[hero.id]?.enemy == incoming.hero.id;
        if (engaged(hero) && !critical && !continuing) continue;
        if (hero.city != city.id &&
            sourceThreat?.threatened == true &&
            sourceThreat?.risk?.advantage != CombatAdvantage.favorable) {
          continue;
        }
        final route = operations.intercept(hero, incoming.hero, base);
        final score = assessor.compare(
          hero,
          incoming.hero,
          terrain: operations.routes.map.at(incoming.hero.position),
        );
        if (score.advantage != CombatAdvantage.favorable) continue;
        final option = operations.send(
          base,
          hero,
          route,
          role: 'intercept',
          reason: engaged(hero)
              ? '本地手段无法抵挡明确来袭，紧急截击预计${route.seconds.toStringAsFixed(1)}秒，早于敌军${incoming.seconds.toStringAsFixed(1)}秒抵城；最后才改派远征'
              : '动用附近闲置部队截击来敌，不打断主攻任务',
          target: city,
          enemy: incoming.hero,
          emergency: true,
          deadline: incoming.seconds,
        );
        if (option != null) {
          yield DefenseCandidate(
            option.ledger,
            [option.group],
            _quality(report, option.ledger) +
                80 -
                heroStrategicValue(hero) * .08,
            unresolved: overflow,
            response: 'recall',
          );
        }
      }
    }

    // 只有无安全友城且能在时限内完成进驻，才把夺取新据点当作救援方案。
    if (_view.owned.length == 1 &&
        report.risk?.advantage == CombatAdvantage.unfavorable &&
        mobile.length > 1) {
      for (final target
          in _view.cities
              .where(
                (c) =>
                    c.country != _view.country && _view.garrison(c.id).isEmpty,
              )
              .take(3)) {
        if (!work.candidate()) break;
        final hero = mobile.reduce(
          (a, b) => heroStrategicValue(a) >= heroStrategicValue(b) ? a : b,
        );
        final route = operations.routes.to(
          hero,
          target.center,
          _view,
          target: target,
          safe: true,
        );
        final option = operations.send(
          base,
          hero,
          route,
          role: 'newBase',
          reason: '保留原城守军拖延，核心在危险窗口前夺取空城建立新据点',
          target: target,
          emergency: true,
          deadline: report.deadline,
        );
        if (option != null) {
          yield DefenseCandidate(
            option.ledger,
            [option.group],
            _quality(report, option.ledger) + heroStrategicValue(hero) * 1.2,
            unresolved:
                option.ledger.occupancy(city.id) > option.ledger.slots(city),
            response: 'relocation',
          );
        }
      }
    }
  }

  DefenseCandidate _simple(
    CityDefenseReport report,
    AiLedger before,
    AiLedger after,
    List<AiAction> actions,
    String reason,
  ) {
    final supplied = after.copy();
    final topUp = actions.any((a) => a.kind == AiActionKind.upgrade)
        ? supplied.stockUpSoldiers()
        : 0;
    final heroes = actions.map((a) => _view.hero(a.hero)).whereType<AiHero>();
    final losses = after.removed
        .difference(before.removed)
        .fold(0.0, (n, id) => n + heroStrategicValue(_view.hero(id)!));
    return DefenseCandidate(
      supplied,
      [
        AiCommandGroup(
          reason: reason,
          actions: List.of(actions),
          dependencies: operations.dependencies(
            [...heroes, ...report.incoming.map((e) => e.hero)],
            [report.city],
          ),
          minimumGold: after.cash(emergency: true).reserve,
          emergency: true,
        ),
        if (topUp > 0)
          AiCommandGroup(
            reason: '城防升级后在同一次补兵窗口内尽量补满全国兵员容量',
            actions: [
              AiAction(
                AiActionKind.soldiers,
                city: report.city.id,
                amount: topUp,
              ),
            ],
            dependencies: operations.dependencies([], [report.city]),
            emergency: true,
          ),
      ],
      _quality(report, supplied) -
          losses * .65 -
          math.max(0, before.gold - supplied.gold) * .2,
      unresolved:
          supplied.occupancy(report.city.id) > supplied.slots(report.city) ||
          _risk(report, supplied)?.advantage != CombatAdvantage.favorable,
    );
  }

  bool _interceptionPending(IncomingArmy incoming, AiLedger ledger) {
    for (final task in ledger.tasks.values) {
      if (task.role != 'intercept' ||
          task.enemy != incoming.hero.id ||
          task.deadlineTick <= _view.tick) {
        continue;
      }
      final hero = _view.hero(task.hero);
      if (hero == null ||
          hero.hp <= 0 ||
          hero.marked ||
          ledger.removed.contains(hero.id)) {
        continue;
      }
      if (hero.opponent == incoming.hero.id) return true;
      if (!hero.canMove || task.committedUntil <= _view.tick) continue;
      final route = operations.intercept(hero, incoming.hero, ledger);
      if (route.complete &&
          route.seconds + rules.tuning.reactionMargin < incoming.seconds) {
        return true;
      }
    }
    return false;
  }

  bool _criticalRecall(CityDefenseReport report, AiLedger ledger) {
    // 配额耗尽只是未知，不能把没算完误当作已经没有其他办法。
    if (work.limited) return false;
    final attacking =
        report.city.initialBattleLevel != null ||
        report.incoming.any(
          (army) =>
              army.hero.state == AiArmyState.queue ||
              army.confidence >= .9 &&
                  army.hero.state != AiArmyState.camped &&
                  (army.hero.velocity.x.abs() + army.hero.velocity.y.abs()) >
                      .01,
        );
    if (!attacking) return false;
    if (report.protagonistInDanger) return true;
    if (ledger.garrison(report.city.id).isEmpty) return true;
    final risk = _risk(report, ledger);
    return risk != null && risk.upper < -rules.tuning.recallCriticalMargin;
  }

  // 只有明确来袭且所有现有守将都明显落后才考虑弃城；接近或未知均继续守备。
  bool _shouldAbandonCity(CityDefenseReport report, AiLedger ledger) {
    if (!_criticalRecall(report, ledger)) return false;
    final guards = ledger.garrison(report.city.id);
    if (guards.isEmpty) return false;
    for (final hero in guards) {
      CombatAssessment? worst;
      for (final army in report.incoming) {
        final pair = assessor.compare(
          hero,
          army.hero,
          ownDefense: math.max(1, ledger.slots(report.city)),
          ownSoldiers:
              hero.soldierCount +
              (hero.state == AiArmyState.defending
                  ? 0
                  : math.min(
                      ledger.reserves,
                      rules.integer('soldierLimit') - hero.soldierCount,
                    )),
        );
        if (pair.advantage == CombatAdvantage.unknown || work.limited) {
          return false;
        }
        if (worst == null || pair.lower < worst.lower) worst = pair;
      }
      if (worst == null || worst.upper >= -rules.tuning.recallCriticalMargin) {
        return false;
      }
    }
    return true;
  }

  CombatAssessment? _risk(CityDefenseReport r, AiLedger l) {
    if (r.incoming.isEmpty) return null;
    final all = l.garrison(r.city.id);
    var reserve = l.reserves;
    // 已接受且能及时到达的援军参与评估，不能每次扫描都当作援军不存在。
    for (final task in l.tasks.values) {
      if (!task.arrivalSlot ||
          task.city != r.city.id ||
          task.deadlineTick < _view.tick) {
        continue;
      }
      final hero = _view.hero(task.hero);
      if (hero == null ||
          hero.marked ||
          hero.opponent != null ||
          hero.hp <= 0 ||
          l.removed.contains(hero.id) ||
          all.any((h) => h.id == hero.id)) {
        continue;
      }
      var from = hero.position, seconds = 0.0;
      for (final point in task.points.skip(task.leg)) {
        seconds += operations.routes.seconds(from, point);
        from = point;
      }
      if (!seconds.isFinite ||
          seconds + rules.tuning.reactionMargin >= r.deadline) {
        continue;
      }
      reserve = math.min(l.capacity, reserve + hero.soldierCount);
      all.add(
        AiHero.fromJson(
          Map<String, dynamic>.from(hero.toJson())
            ..['hp'] = hero.maxHp.toDouble()
            ..['troops'] = <double>[]
            ..['s'] = AiArmyState.garrison.index,
        ),
      );
    }
    all.sort(AiHero.compareDefenseOrder);
    final current = all.where((h) => h.id == r.city.defender).firstOrNull;
    final guards = [
      ?current,
      ...all.reversed.where((h) => h != current),
    ].take(l.slots(r.city)).toList();
    if (guards.isEmpty) return null;
    CombatAssessment? best;
    for (var i = 0; i < guards.length; i++) {
      final hero = guards[i];
      final add = hero.state == AiArmyState.defending
          ? 0
          : math.min(
              reserve,
              rules.integer('soldierLimit') - hero.soldierCount,
            );
      reserve -= add;
      CombatAssessment? worst;
      for (final army in r.incoming) {
        final pair = assessor.compare(
          hero,
          army.hero,
          ownDefense: math.max(1, l.slots(r.city) - i),
          ownSoldiers: hero.soldierCount + add,
        );
        if (worst == null || pair.lower < worst.lower) worst = pair;
      }
      if (hero.type == 2 && hero.id == r.city.defender) return worst;
      if (best == null || worst!.lower > best.lower) best = worst;
    }
    return best;
  }

  double _quality(CityDefenseReport r, AiLedger l) {
    final count = l.occupancy(r.city.id),
        overflow = math.max(0, count - l.slots(r.city));
    final value =
        150 +
        r.city.income * 4 +
        r.linkedValue * .5 +
        l
            .garrison(r.city.id)
            .where((h) => h.type == 2)
            .fold(0.0, (n, h) => n + heroStrategicValue(h)) +
        (_view.owned.length == 1 ? 400 : 0);
    final risk = _risk(r, l);
    return -overflow * 5000 -
        (count == 0 ? value * 2 : 0) +
        (risk?.lower ?? -.8) * value;
  }

  String _noteForTransfer(CityDefenseReport r) =>
      r.deadline.isFinite ? '安全判断以实际进驻友城为准，途中原城失守仍会清除部队' : '转移到安全后方整备';
}
