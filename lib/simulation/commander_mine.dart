import 'dart:math' as math;

import '../core/config/game_config.dart';
import '../core/geometry/geometry.dart';
import '../features/ai/geometry.dart';
import '../features/ai/routes.dart';
import '../features/ai/work_budget.dart';
import '../features/campaign/domain/campaign.dart';
import '../features/heroes/data/rom_hero.dart';
import '../features/world_map/domain/world_data.dart';
import 'player_commander.dart';

/// 对抗基线 [SimulationCommander] 的另一套玩家策略。
///
/// 与基线共用同一套公开命令接口，不读存档、不采样随机源、不看敌方隐藏目的地。
/// 差异集中在三处取舍：
///   1. 容量优先——先升满本国城池等级，再谈扩张；
///   2. 留守名额=城防等级——不把可迎战的将领抽空；
///   3. 单将打单城——一次只推进一路，避免部队在敌城下排队耗粮。
class MineCommander implements PlayerCommander {
  final _waypoints = <String, List<AiPoint>>{};

  /// 已执行的命令，用于复核。
  @override
  final List<Map<String, Object?>> commands = [];

  void _record(int second, String action, Map<String, Object?> data) {
    commands.add({'second': second, 'action': action, ...data});
  }

  /// 每五秒决策一次，只走正式玩法接口。
  @override
  void decide(CampaignState c, int second) {
    if (c.defeated || c.isPaused) return;
    if (c.cities.values.every((city) => !city.isPlayer)) return;

    _recallAndRegroup(c, second);
    _growEconomy(c, second);
    _dispatchOne(c, second);
  }

  /// 断粮或重伤的部队回最近的友城；顺路清掉失效的绕行路段。
  void _recallAndRegroup(CampaignState c, int second) {
    final owned = c.world.cities
        .where((d) => c.cities[d.id]!.isPlayer)
        .toList();
    if (owned.isEmpty) return;
    for (final march
        in c.marches.values.where((m) => m.hero.isPlayer).toList()) {
      if (c.moveBlockReason(march.hero.id) != null) continue;
      final remaining = _waypoints[march.hero.id];
      if (march.phase == MarchPhase.camped &&
          remaining != null &&
          remaining.isNotEmpty &&
          !march.supplyHalted &&
          march.hero.hp >= march.hero.maxHp * .6) {
        final next = remaining.removeAt(0);
        if (c.moveTo(march.hero.id, GamePoint(next.x, next.y))) {
          _record(second, '续行绕行路段', {'hero': march.hero.name});
        }
        continue;
      }
      // 只有真的断粮或重伤才回城，避免来回折腾。
      final mustReturn =
          march.supplyHalted ||
          march.hero.hp < march.hero.maxHp * .45 ||
          march.phase == MarchPhase.camped;
      if (!mustReturn) continue;
      if (march.target != null && c.cities[march.target!.id]!.isPlayer) {
        continue; // 已经在回友城路上
      }
      final home = owned.reduce((a, b) {
        final da = (c.cityBounds(a).center - march.position).distance;
        final db = (c.cityBounds(b).center - march.position).distance;
        return da < db ? a : b;
      });
      if (c.moveTo(march.hero.id, c.cityBounds(home).center)) {
        _waypoints.remove(march.hero.id);
        _record(second, '回城整备', {'hero': march.hero.name, 'city': home.id});
      }
    }
  }

  /// 容量和兵员是国家实力的上限：先补兵，再优先把低等级城升级。
  void _growEconomy(CampaignState c, int second) {
    final owned = c.world.cities
        .where((d) => c.cities[d.id]!.isPlayer)
        .toList();
    if (owned.isEmpty) return;

    // 月俸的保守预留：不预支未来占城收益。
    final reserve = math.max(12, c.salaryCost);

    final capacity = c.reserveCapacityFor(0);
    final reserveNow = c.reserveSoldiersFor(0);
    final want = math.min(capacity, math.max(0, c.gold - reserve));
    if (want > reserveNow) {
      if (c.buySoldiers(owned.first.id, want - reserveNow)) {
        _record(second, '补充全国兵员', {'count': want - reserveNow});
      }
    }

    // 升级：等级 1 的城优先，因为它同时抬高收入和兵员容量。
    final upgradable = owned.where((d) => c.cities[d.id]!.level < 3).toList()
      ..sort((a, b) => c.cities[a.id]!.level.compareTo(c.cities[b.id]!.level));
    for (final city in upgradable) {
      final local = c.garrisonAt(city.id);
      if (local.isEmpty) continue;
      final governor = local.reduce((a, b) => a.politics >= b.politics ? a : b);
      final cost = c.upgradeCostFor(city.id, governor);
      if (cost == null) continue;
      if (c.upgradeWindowBlockReason(city.id) != null) continue;
      // 升满等级 2 是硬优先级；等级 3 要留出更多缓冲。
      final buffer = c.cities[city.id]!.level < 2 ? reserve + 5 : reserve + 60;
      if (c.gold - cost < buffer) continue;
      if (c.upgradeCity(city.id, hero: governor)) {
        _record(second, '升级城防', {
          'city': city.id,
          'cost': cost,
          'level': c.cities[city.id]!.level,
        });
      }
    }

    // 每个城补到「城防等级」名守将，上限三级避免月俸失控。
    for (final city in owned) {
      final local = c.garrisonAt(city.id);
      final level = c.cities[city.id]!.level;
      if (local.isEmpty) {
        if (c.gold >= reserve + 12 &&
            c.recruitmentBlockReason(city.id) == null) {
          final offer = c.drawHero(city.id);
          if (offer != null) {
            final hero = c.signHero(offer);
            if (hero != null) {
              _record(second, '签约将领', {'city': city.id, 'hero': hero.name});
            } else {
              c.declineHero(offer);
            }
          }
        }
        continue;
      }
      if (local.length < math.min(level, 3) &&
          c.gold >= reserve + 12 &&
          c.recruitmentBlockReason(city.id) == null) {
        final offer = c.drawHero(city.id);
        if (offer != null) {
          final hero = c.signHero(offer);
          if (hero != null) {
            _record(second, '签约将领', {'city': city.id, 'hero': hero.name});
          } else {
            c.declineHero(offer);
          }
        }
      }
    }

    // 将领总数上限：不超过「城池数 × 3 + 2」，避免月俸失控。
    final total = c.heroes.where((h) => h.isPlayer && h.health.alive).length;
    final cap = owned.length * 3 + 2;
    if (total > cap) {
      final extra =
          c.heroes
              .where(
                (h) =>
                    h.isPlayer &&
                    h.health.alive &&
                    h.type != HeroType.protagonist &&
                    c.dismissalBlockReason(h) == null &&
                    c.marches.values.every((m) => m.hero != h),
              )
              .toList()
            ..sort(
              (a, b) => (a.combat * 4 + a.hp).compareTo(b.combat * 4 + b.hp),
            );
      for (final hero in extra.take(total - cap)) {
        final gold = c.dismissHero(hero);
        if (gold != null) {
          _record(second, '解雇冗余将领', {'hero': hero.name, 'gold': gold});
        }
      }
    }
  }

  /// 一次只派一位将领打一座城，且必须先满足静态余量和经营预算。
  void _dispatchOne(CampaignState c, int second) {
    final owned = c.world.cities
        .where((d) => c.cities[d.id]!.isPlayer)
        .toList();
    if (owned.isEmpty) return;

    // 已经有部队在外面就不再加派，集中兵力逐个消化。
    final abroad = c.marches.values.where((m) => m.hero.isPlayer).toList();
    // 同时在外的部队上限 = 城池数，既不抽空守军也不无限铺开。
    final busy = abroad.where((m) {
      final t = m.target;
      return t != null && !c.cities[t.id]!.isPlayer;
    }).length;
    if (busy >= owned.length) return;

    final view = c.aiObservationFor(0);
    final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
    final routes = AiRoutes(map, rules, AiWorkBudget(rules.tuning));

    final candidates =
        c.heroes
            .where(
              (h) =>
                  h.isPlayer &&
                  h.health.alive &&
                  h.type != HeroType.protagonist &&
                  c.canDispatch(h),
            )
            .toList()
          ..sort(
            (a, b) => (b.combat * 6 + b.hp).compareTo(a.combat * 6 + a.hp),
          );
    if (candidates.isEmpty) return;

    for (final hero in candidates) {
      // 至少留一位守将；本城只剩自己时不出征。
      final local = c.garrisonAt(hero.cityId);
      if (local.length <= 1) continue;
      // 本城有主角时多留一位，避免主角随城陷落。
      if (local.length <= 2 &&
          local.any((h) => h.type == HeroType.protagonist)) {
        continue;
      }

      CityDefinition? best;
      var bestScore = double.infinity;
      var bestSeconds = 0.0;
      List<AiPoint> bestRoute = [];
      for (final target in c.world.cities.where(
        (d) => !c.cities[d.id]!.isPlayer,
      )) {
        final route = routes.to(
          view.hero(hero.id)!,
          view.city(target.id)!.center,
          view,
          target: view.city(target.id),
          safe: true,
        );
        if (!route.complete) continue;
        // 已在别处排队的城不再加人，避免城下拥堵耗粮。
        if (c.marches.values.any(
          (m) => m.hero.isPlayer && m.target?.id == target.id,
        )) {
          continue;
        }
        final guards = c.garrisonAt(target.id);
        final level = c.cities[target.id]!.level;
        final travel = route.seconds;
        if (travel > 120) continue;
        // 静态风险：只打明显有余量的目标，不做胜率承诺。
        final enemy = guards.isEmpty
            ? 0.0
            : guards
                  .take(level)
                  .fold<double>(0, (n, h) => n + h.hp * .25 + h.combat * 3);
        final own = hero.hp * .25 + hero.combat * 3 + 4 * 4;
        final defense = GameConfig.cityDefenseAttackBonusFor(level) * 3;
        final margin = own - enemy - defense;
        if (margin < 2) continue;
        final score = travel + level * 30 + enemy * .5 - margin * 2;
        if (score < bestScore) {
          best = target;
          bestScore = score;
          bestSeconds = travel;
          bestRoute = [
            ...route.points.take(route.points.length - 1),
            view.city(target.id)!.center,
          ];
        }
      }
      if (best == null) continue;

      // 行军免费，只保留既有的经营周转金。
      const keep = 20;
      if (c.gold < keep + 8) continue;

      final first = bestRoute.first;
      if (c.dispatchTo(hero, GamePoint(first.x, first.y)) != null) {
        _waypoints[hero.id] = bestRoute.skip(1).toList();
        _record(second, '单将出征', {
          'hero': hero.name,
          'city': best.id,
          'travelSeconds': bestSeconds,
          'margin': bestScore.toStringAsFixed(1),
        });
        return; // 一次只推进一路
      }
    }
  }
}
