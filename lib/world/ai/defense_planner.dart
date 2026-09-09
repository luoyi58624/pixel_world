import 'dart:math' as math;

import 'budget.dart';
import 'combat_assessment.dart';
import 'observation.dart';
import 'operations.dart';
import 'protocol.dart';
import 'rules_data.dart';
import 'threats.dart';
import 'work_budget.dart';

/// 一项完整防御候选，包含确定动作次序及未能解决的风险。
class DefenseCandidate {
  /// 创建候选。
  const DefenseCandidate(
    this.ledger,
    this.groups,
    this.score, {
    this.unresolved = false,
    this.note = '',
  });

  /// 资源状态、动作组、相对价值及失败解释。
  final AiLedger ledger;
  final List<AiCommandGroup> groups;
  final double score;
  final bool unresolved;
  final String note;
}

/// 有界比较升级、解雇、调防、全国回援、武器截击及安全转移。
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
    final city = report.city;
    final overflow = base.occupancy(city.id) > base.slots(city);
    yield DefenseCandidate(
      base,
      [],
      _quality(report, base),
      unresolved: overflow,
      note: overflow
          ? 'unsalvageableDefense：当前安全名额 ${base.slots(city)}，驻军 ${base.occupancy(city.id)}，等待合法修复'
          : '保持可出场守军，继续监控全部来敌',
    );
    if (!work.candidate()) return;

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

    // 安全转移必须在旧城危险窗口前真正入城，单纯走出城门不算保住英雄。
    final mobile =
        base
            .garrison(city.id)
            .where((h) => h.canDispatch && !base.reservedHeroes.contains(h.id))
            .toList()
          ..sort(
            (a, b) => heroStrategicValue(b).compareTo(heroStrategicValue(a)),
          );
    if ((overflow || report.risk?.advantage != CombatAdvantage.favorable) &&
        _view.owned.length > 1) {
      var moved = base.copy();
      if (report.risk?.advantage == CombatAdvantage.unfavorable) {
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
            role: overflow ? 'transfer' : 'evacuate',
            reason: '在原城危险窗口前进驻安全友城，改变所属城以保全将领',
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
          );
          if (overflow) break;
        }
      }
    }

    // 一个合适援军已经足够时，不把其余远征一起召回。
    final reinforcements =
        _view.heroes
            .where(
              (h) =>
                  h.country == _view.country &&
                  h.canMove &&
                  !h.marked &&
                  !base.reservedHeroes.contains(h.id),
            )
            .toList()
          ..sort(
            (a, b) => a.position
                .distance(city.center)
                .compareTo(b.position.distance(city.center)),
          );
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
      if (base.occupancy(city.id) < base.slots(city)) {
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
            reason: '召回能及时增强防线的在外将领，并预留入城名额',
            target: city,
            arrival: true,
            emergency: true,
            deadline: safeDeadline,
          );
          if (option != null) {
            yield DefenseCandidate(
              option.ledger,
              [option.group],
              _quality(report, option.ledger) +
                  200 +
                  heroStrategicValue(hero) * .25,
            );
          }
        }
      }
      for (final incoming in report.incoming.take(2)) {
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
          ownOpening: hero.openingAvailable,
          enemyOpening: incoming.hero.openingAvailable,
        );
        if (score.advantage != CombatAdvantage.favorable) continue;
        final option = operations.send(
          base,
          hero,
          route,
          role: 'intercept',
          reason: '回援采取城外截击，避免入城挤占安全名额',
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
                180 +
                heroStrategicValue(incoming.hero) * .3,
            unresolved: overflow,
          );
        }
      }
    }

    for (final incoming in report.incoming.take(2)) {
      if (incoming.hero.opponent != null) continue;
      for (final hero in mobile.take(4)) {
        if (!work.candidate()) break;
        final left = base.garrison(city.id).where((h) => h != hero).toList();
        final core = left.isEmpty
            ? null
            : left.reduce(
                (a, b) => heroCombatValue(a, rules) > heroCombatValue(b, rules)
                    ? a
                    : b,
              );
        final route = operations.intercept(hero, incoming.hero, base);
        if (!route.complete ||
            route.seconds + rules.tuning.reactionMargin >= incoming.seconds) {
          continue;
        }
        final financing = <(AiLedger, List<AiAction>, List<AiHero>)>[
          (base, [], []),
        ];
        if (overflow && base.gold < rules.integer('emergencyGold') + 4) {
          final fundraiser =
              left
                  .where((h) => h != core && h.canDismiss && h.type != 2)
                  .toList()
                ..sort(
                  (a, b) =>
                      heroStrategicValue(a).compareTo(heroStrategicValue(b)),
                );
          if (fundraiser.isNotEmpty && work.candidate()) {
            final financed = base.copy();
            if (financed.dismiss(fundraiser.first)) {
              financing.add((
                financed,
                [AiAction(AiActionKind.dismiss, hero: fundraiser.first.id)],
                [fundraiser.first],
              ));
            }
          }
        }
        for (final finance in financing) {
          final funded = finance.$1;
          for (final gear in operations.loadouts(hero, funded)) {
            final score = assessor.compare(
              hero,
              incoming.hero,
              terrain: operations.routes.map.at(incoming.hero.position),
              ownSoldiers: math.min(
                rules.integer('soldierLimit'),
                funded.reserves,
              ),
              loadout: gear,
              ownOpening: true,
              enemyOpening: incoming.hero.openingAvailable,
            );
            var useful = score.advantage == CombatAdvantage.favorable;
            var improvement = 0.0;
            if (!useful &&
                core != null &&
                score.ownWeaponLower > 0 &&
                score.enemyWeaponUpper <
                    hero.hp +
                        math.min(
                              rules.integer('soldierLimit'),
                              funded.reserves,
                            ) *
                            rules.integer('soldierHp')) {
              final preserved = math.max(
                0,
                funded.reserves - rules.integer('soldierLimit'),
              );
              final before = assessor.compare(
                core,
                incoming.hero,
                ownDefense: funded.slots(city),
                ownSoldiers: math.min(rules.integer('soldierLimit'), preserved),
              );
              final after = assessor.compare(
                core,
                incoming.hero,
                ownDefense: funded.slots(city),
                ownSoldiers: math.min(rules.integer('soldierLimit'), preserved),
                enemyPressure: score.ownWeaponLower,
              );
              improvement = after.lower - before.lower;
              useful =
                  after.advantage == CombatAdvantage.favorable &&
                  improvement > .12;
            }
            if (!useful) continue;
            if (left.isEmpty &&
                (report.incoming.length > 1 ||
                    score.advantage != CombatAdvantage.favorable)) {
              continue;
            }
            final option = operations.send(
              funded,
              hero,
              route,
              role: 'intercept',
              reason: improvement > 0
                  ? '配备可兑现的首件武器截击，保留核心守军兵员并改善防御余量'
                  : '核心将领在武器和地形有利的城外迎战，监控绕过截击的来敌',
              target: city,
              enemy: incoming.hero,
              gear: gear,
              emergency: true,
              deadline: incoming.seconds,
              protectSoldiers: core == null
                  ? 0
                  : math.min(rules.integer('soldierLimit'), funded.reserves),
            );
            if (option == null) continue;
            final remaining = option.ledger.occupancy(city.id);
            yield DefenseCandidate(
              option.ledger,
              [
                AiCommandGroup(
                  reason: option.group.reason,
                  actions: [...finance.$2, ...option.group.actions],
                  dependencies: {
                    ...option.group.dependencies,
                    ...operations.dependencies(finance.$3, []),
                  },
                  tasks: option.group.tasks,
                  minimumGold: option.group.minimumGold,
                  emergency: true,
                ),
              ],
              _quality(report, option.ledger) +
                  200 +
                  improvement * 500 -
                  (improvement > 0 ? heroStrategicValue(hero) * .5 : 0) -
                  finance.$3.fold(
                    0.0,
                    (n, h) => n + heroStrategicValue(h) * .65,
                  ),
              unresolved: remaining > option.ledger.slots(city),
            );
            break;
          }
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
        final hero = mobile.first;
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
    final heroes = actions.map((a) => _view.hero(a.hero)).whereType<AiHero>();
    final losses = after.removed
        .difference(before.removed)
        .fold(0.0, (n, id) => n + heroStrategicValue(_view.hero(id)!));
    return DefenseCandidate(
      after.copy(),
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
      ],
      _quality(report, after) -
          losses * .65 -
          math.max(0, before.gold - after.gold) * .2,
    );
  }

  CombatAssessment? _risk(CityDefenseReport r, AiLedger l) {
    if (r.incoming.isEmpty) return null;
    final guards = l
        .garrison(r.city.id)
        .reversed
        .take(l.slots(r.city))
        .toList();
    if (guards.isEmpty) return null;
    final hero = guards.reduce(
      (a, b) => heroCombatValue(a, rules) > heroCombatValue(b, rules) ? a : b,
    );
    final enemy = r.incoming
        .map((e) => e.hero)
        .reduce(
          (a, b) =>
              heroCombatValue(a, rules) > heroCombatValue(b, rules) ? a : b,
        );
    return assessor.compare(
      hero,
      enemy,
      ownDefense: math.max(1, l.slots(r.city) - guards.indexOf(hero)),
      ownSoldiers: math.min(
        rules.integer('soldierLimit'),
        l.reserves + hero.soldierCount,
      ),
      ownOpening: false,
      enemyOpening: enemy.openingAvailable,
    );
  }

  double _quality(CityDefenseReport r, AiLedger l) {
    final count = l.occupancy(r.city.id),
        overflow = math.max(0, count - l.slots(r.city));
    final value =
        150 +
        r.city.income * 4 +
        r.linkedValue * .5 +
        (_view.owned.length == 1 ? 400 : 0);
    final risk = _risk(r, l);
    return -overflow * 5000 -
        (count == 0 ? value * 2 : 0) +
        (risk?.lower ?? -.8) * value;
  }

  String _noteForTransfer(CityDefenseReport r) =>
      r.deadline.isFinite ? '安全判断以实际进驻友城为准，途中原城失守仍会清除部队' : '转移到安全后方整备';
}
