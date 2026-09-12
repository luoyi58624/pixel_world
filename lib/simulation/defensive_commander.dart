import 'dart:math' as math;

import '../core/config/game_config.dart';
import '../features/campaign/domain/campaign.dart';
import 'player_commander.dart';

/// 纯防守玩家：正常补兵、补将和升级城防，永不派遣或移动。
class DefensiveCommander implements PlayerCommander {
  @override
  final List<Map<String, Object?>> commands = [];

  void _record(int second, String action, Map<String, Object?> data) =>
      commands.add({'second': second, 'action': action, ...data});

  /// 只通过公开命令操作，保留工资与流动资金，战中按本场剩余迎战名额补将。
  @override
  void decide(CampaignState c, int second) {
    if (c.defeated || c.isPaused) return;
    final owned = c.world.cities
        .where((d) => c.cities[d.id]!.isPlayer)
        .toList();
    if (owned.isEmpty) return;
    final buffer = math.max(12, c.salaryCost);
    final guards = c.heroes.where((h) => h.isPlayer && h.health.alive).toList();
    final targetReserve = math.min(
      c.reserveCapacityFor(0),
      guards.fold<int>(
        0,
        (n, h) => n + math.max(0, GameConfig.heroSoldierLimit - h.soldiers),
      ),
    );
    final missing = math.max(0, targetReserve - c.reserveSoldiersFor(0));
    // 与玩家和国家 AI 一致，补兵优先但只能购买现有余额付得起的数量。
    final soldiers = math.min(missing, c.maxSoldierPurchase(owned.first.id));
    if (soldiers > 0 && c.buySoldiers(owned.first.id, soldiers)) {
      _record(second, '补充守城兵员', {'count': soldiers});
    }
    for (final city in owned) {
      final local = c.garrisonAt(city.id).where((h) => h.health.alive).toList()
        ..sort((a, b) => b.politics.compareTo(a.politics));
      final governor = local
          .where((h) => c.upgradeBlockReason(city.id, h) == null)
          .firstOrNull;
      if (governor != null) {
        final cost = c.upgradeCostFor(city.id, governor)!;
        if (c.gold - cost >= buffer && c.upgradeCity(city.id, hero: governor)) {
          _record(second, '升级城防', {
            'city': city.id,
            'level': c.cities[city.id]!.level,
            'cost': cost,
          });
        }
      }
      final battle = c.battles[city.id];
      final slots = battle?.isActive == true
          ? math.max(
              0,
              battle!.initialCityLevel -
                  battle.victories -
                  (battle.nextWaveIn == 0 &&
                          c.heroes.contains(battle.defender) &&
                          !battle.defender.health.alive &&
                          battle.attacker.health.alive
                      ? 1
                      : 0),
            )
          : c.cities[city.id]!.level;
      if (local.length >= slots ||
          c.recruitmentBlockReason(city.id) != null ||
          c.gold < buffer + GameConfig.heroDrawCost + 10) {
        continue;
      }
      final offer = c.drawHero(city.id);
      if (offer == null) continue;
      _record(second, '抽取守城将领', {'city': city.id, 'name': offer.hero.name});
      if (c.gold - offer.initialSalary >= buffer &&
          c.salaryCost + offer.initialSalary + c.garrisonUpkeepFor(0) <=
              c.grossIncome - 12) {
        final hero = c.signHero(offer);
        if (hero != null) {
          _record(second, '签约守城将领', {'city': city.id, 'hero': hero.name});
          continue;
        }
      }
      c.declineHero(offer);
      _record(second, '放弃超预算签约', {'city': city.id, 'name': offer.hero.name});
    }
  }
}
