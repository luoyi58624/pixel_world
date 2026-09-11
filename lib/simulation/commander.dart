import 'dart:math' as math;

import '../core/config/game_config.dart';
import '../core/geometry/geometry.dart';
import '../features/campaign/domain/campaign.dart';
import '../features/heroes/data/rom_hero.dart';
import '../features/world_map/domain/world_data.dart';
import '../features/ai/geometry.dart';
import '../features/ai/routes.dart';
import '../features/ai/work_budget.dart';
import 'player_commander.dart';

/// 无界面玩家：只经正式购买、签约、升级和行军接口下令，不改存档或窥探随机源。
class SimulationCommander implements PlayerCommander {
  int? _objective;
  final _waypoints = <String, List<AiPoint>>{};

  /// 已执行的玩家命令，用于复核征服过程。
  @override
  final List<Map<String, Object?>> commands = [];

  void _record(int second, String action, Map<String, Object?> data) {
    commands.add({'second': second, 'action': action, ...data});
  }

  /// 每五秒依据可见城池、守军和己方资源制定一次玩家操作。
  @override
  void decide(CampaignState c, int second) {
    if (c.defeated || c.isPaused) return;
    final owned = c.world.cities
        .where((d) => c.cities[d.id]!.isPlayer)
        .toList();
    var view = c.aiObservationFor(0);
    final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
    if (_objective != null && c.cities[_objective]?.isPlayer == true) {
      _objective = null;
    }
    if (owned.isEmpty) return;
    final mine = c.heroes.where((h) => h.isPlayer && h.health.alive).toList();
    final outside = c.marches.values.where((m) => m.hero.isPlayer).toList();
    final reserve = math.max(12, c.salaryCost);
    final desired = math.min(c.reserveCapacityFor(0), (mine.length + 1) * 4);
    final count = math.min(
      desired - c.reserveSoldiersFor(0),
      math.max(0, c.gold - reserve),
    );
    if (count > 0 && c.buySoldiers(owned.first.id, count)) {
      _record(second, '补充全国兵员', {'count': count});
    }

    for (final city in owned) {
      final local = c.garrisonAt(city.id);
      if (local.isEmpty) continue;
      final governor = local.reduce((a, b) => a.politics > b.politics ? a : b);
      final level = c.cities[city.id]!.level;
      final danger = view.heroes.any(
        (h) =>
            h.country != 0 &&
            !h.stationed &&
            (h.regionCity == city.id ||
                h.position.distance(view.city(city.id)!.center) < 100),
      );
      final cost = c.upgradeCostFor(city.id, governor);
      if (cost != null &&
          c.upgradeWindowBlockReason(city.id) == null &&
          c.gold - cost >= reserve + 10 &&
          (level < 2 ||
              local.length > level ||
              danger && level < 3 ||
              c.gold > reserve + cost + 130)) {
        if (c.upgradeCity(city.id, hero: governor)) {
          _record(second, '升级城防', {'city': city.id, 'cost': cost});
        }
      }
      if (danger && local.length > c.cities[city.id]!.level) {
        final excess =
            local
                .where(
                  (h) =>
                      h.type != HeroType.protagonist &&
                      c.dismissalBlockReason(h) == null,
                )
                .toList()
              ..sort(
                (a, b) => (a.combat * 5 + a.hp).compareTo(b.combat * 5 + b.hp),
              );
        if (excess.isNotEmpty) {
          final gold = c.dismissHero(excess.first);
          if (gold != null) {
            _record(second, '紧急腾出迎战名额', {
              'hero': excess.first.name,
              'gold': gold,
            });
          }
        }
      }
      // 两人守家且主角不出征时，还必须招募机动部队，否则一次阵亡就永远停战。
      if (local.length < math.max(3, math.min(4, c.cities[city.id]!.level)) &&
          mine.length < owned.length * 2 + 4 &&
          c.gold >= reserve + 15 &&
          c.recruitmentBlockReason(city.id) == null) {
        final offer = c.drawHero(city.id);
        if (offer != null) {
          // 高级将领与可用于留守的普通将领都可签约，弱将不反复抽卖套取金币。
          if ((offer.hero.combat >= 8 || local.length < 2) &&
              c.salaryCost + offer.initialSalary <= c.grossIncome * .5) {
            final hero = c.signHero(offer);
            if (hero != null) {
              _record(second, '签约将领', {'city': city.id, 'hero': hero.name});
            }
          } else {
            c.declineHero(offer);
            _record(second, '放弃低战力将领', {
              'city': city.id,
              'hero': offer.hero.name,
            });
          }
        }
      }
    }

    for (final march in outside) {
      if (c.moveBlockReason(march.hero.id) != null) continue;
      final remaining = _waypoints[march.hero.id];
      if (march.phase == MarchPhase.camped &&
          remaining != null &&
          remaining.isNotEmpty &&
          march.hero.hp >= march.hero.maxHp * .55 &&
          !march.supplyHalted) {
        final next = remaining.removeAt(0);
        c.moveTo(march.hero.id, GamePoint(next.x, next.y));
        _record(second, '沿绕行路段前进', {'hero': march.hero.name});
        continue;
      }
      if (march.supplyHalted ||
          march.hero.hp < march.hero.maxHp * .55 ||
          march.phase == MarchPhase.camped) {
        final home = owned.reduce(
          (a, b) =>
              (c.cityBounds(a).center - march.position).distance <
                  (c.cityBounds(b).center - march.position).distance
              ? a
              : b,
        );
        if (march.target?.id != home.id &&
            c.moveTo(march.hero.id, c.cityBounds(home).center)) {
          _waypoints.remove(march.hero.id);
          _record(second, '回城整备', {'hero': march.hero.name, 'city': home.id});
        }
      }
    }

    view = c.aiObservationFor(0);
    final heroes =
        c.heroes
            .where(
              (h) =>
                  h.isPlayer &&
                  c.canDispatch(h) &&
                  h.type != HeroType.protagonist,
            )
            .toList()
          ..sort(
            (a, b) => (b.combat * 6 + b.hp).compareTo(a.combat * 6 + a.hp),
          );
    for (final hero in heroes) {
      final local = c.garrisonAt(hero.cityId);
      if (local.length <= 1 ||
          c.reserveSoldiersFor(0) < 4 ||
          c.gold < reserve + 8) {
        continue;
      }
      // 首都留守人数不超过城防可迎战轮数，避免一级城弱将先败导致主角一并消失。
      if (local.any((h) => h.type == HeroType.protagonist) &&
          local.length <= math.min(2, c.cities[hero.cityId]!.level)) {
        continue;
      }
      final homeDanger = view.heroes.any(
        (h) =>
            h.country != 0 &&
            !h.stationed &&
            (h.regionCity == hero.cityId ||
                h.position.distance(view.city(hero.cityId)!.center) < 100),
      );
      if (homeDanger &&
          local.length <= math.min(2, c.cities[hero.cityId]!.level)) {
        continue;
      }
      CityDefinition? best;
      List<AiPoint> bestRoute = [];
      var bestScore = double.infinity, bestSeconds = 0.0;
      final routes = AiRoutes(map, rules, AiWorkBudget(rules.tuning));
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
        final guards = c.garrisonAt(target.id);
        final queued = c.marches.values
            .where((m) => m.hero.isPlayer && m.target?.id == target.id)
            .length;
        if (queued >= math.min(3, math.max(1, guards.length))) continue;
        final travel = route.seconds;
        final level = c.cities[target.id]!.level;
        final power = guards
            .take(level)
            .fold<double>(0, (n, h) => n + h.hp * .25 + h.combat * 3);
        final score =
            travel +
            power +
            level * 25 +
            queued * 35 -
            (target.id == _objective ? 20 : 0);
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
      if (best == null || bestSeconds > 150) continue;
      final guards = c.garrisonAt(best.id), level = c.cities[best.id]!.level;
      final keepGold = reserve;
      if (c.gold < keepGold + 6) continue;
      final needWeapons =
          guards.isNotEmpty &&
          (guards.length > 1 ||
              hero.combat <
                  guards.last.combat +
                      GameConfig.cityDefenseAttackBonusFor(level) +
                      4);
      final slots = <int, int>{};
      if (needWeapons) {
        final budget = c.gold - keepGold;
        final choices =
            c.weaponCatalog.weapons.values
                .where(
                  (w) =>
                      c.weaponUnlocked(0, w) &&
                      w.selfDamage == 0 &&
                      w.price * c.weaponCatalog.carryLimit <= budget,
                )
                .toList()
              ..sort((a, b) => b.damage.compareTo(a.damage));
        if (choices.isEmpty) continue;
        final weapon = choices.first;
        final guard = guards.last;
        final ownPower = hero.combat + 8;
        final enemyPower =
            guard.combat + GameConfig.cityDefenseAttackBonusFor(level) + 8;
        final enemyHealth =
            guard.hp + math.min(4, c.reserveSoldiersFor(guard.countryId)) * 20;
        // 只按当前可见属性核算静态余量，后两件武器不视为必定释放。
        if ((hero.hp + 80) * ownPower <
            math.max(0, enemyHealth - weapon.damage * 1.5) * enemyPower * 1.2) {
          continue;
        }
        for (var slot = 0; slot < c.weaponCatalog.carryLimit; slot++) {
          if (c.weaponStockFor(0, weapon.id) == 0 && c.buyWeapon(weapon.id)) {
            _record(second, '购买出征武器', {
              'weapon': weapon.name,
              'price': weapon.price,
            });
          }
          if (c.weaponStockFor(0, weapon.id) >
              slots.values.where((id) => id == weapon.id).length) {
            slots[slot] = weapon.id;
          } else if (c.buyWeapon(weapon.id)) {
            slots[slot] = weapon.id;
            _record(second, '购买出征武器', {
              'weapon': weapon.name,
              'price': weapon.price,
            });
          }
        }
      }
      final first = bestRoute.first;
      if (c.dispatchTo(hero, GamePoint(first.x, first.y), weaponSlots: slots) !=
          null) {
        _objective = best.id;
        _waypoints[hero.id] = bestRoute.skip(1).toList();
        _record(second, '出征', {
          'hero': hero.name,
          'city': best.id,
          'travelSeconds': bestSeconds,
          'weapons': slots.values.toList(),
        });
      }
    }
  }
}
