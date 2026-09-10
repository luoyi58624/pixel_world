import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/battle/domain/combat_rules.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class _Roll implements math.Random {
  const _Roll(this.value);
  final double value;
  @override
  double nextDouble() => value;
  @override
  int nextInt(int max) => (value * max).floor().clamp(0, max - 1);
  @override
  bool nextBool() => value >= .5;
}

CampaignState fresh({double harvest = 0, double siege = 0}) =>
    CampaignState.fromRom(
      decodeWorlds(
        File('assets/maps/worlds.json').readAsStringSync(),
        setup: CampaignSetup.decode(
          File('assets/data/campaign_config.json').readAsStringSync(),
        ),
      ).first,
      decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
      weaponCatalog: WeaponCatalog.decode(
        File('assets/data/rom_weapons.json').readAsStringSync(),
      ),
      aiEnabled: false,
      economyRandom: _Roll(harvest),
      siegeRandom: _Roll(siege),
    );

void main() {
  test('所有国家从首月即可招将，逐次支付实际抽取与签约费用', () {
    final c = fresh();
    addTearDown(c.dispose);
    for (final city in c.world.cities) {
      final country = c.cities[city.id]!.ownerCountryId;
      final before = c.goldFor(country);
      final offer = c.drawHero(city.id, countryId: country);
      expect(offer, isNotNull);
      if (country == 0) expect(c.signHero(offer!), isNotNull);
      expect(c.goldFor(country), before - 5 - offer!.initialSalary);
      expect(c.settledMonths, 0);
    }
  });

  test('开局满编，解锁后资金充足可连续升至五级，不生成免费士兵', () {
    final c = fresh();
    addTearDown(c.dispose);
    for (final country
        in c.cities.values.map((s) => s.ownerCountryId).toSet()) {
      expect(c.reserveSoldiersFor(country), c.reserveCapacityFor(country));
    }
    final hero = c.garrisonAt(0).last, governor = c.garrisonAt(0).first;
    final stock = c.reserveSoldiersFor(0);
    // 先积累资金，再连续升级；下面四次之间不推进任何月份。
    c.advance(1440);
    for (var level = 2; level <= 5; level++) {
      final before = c.gold, cost = c.upgradeCostFor(0, governor)!;
      expect(c.upgradeCity(0, hero: governor), isTrue);
      expect(c.cities[0]!.level, level);
      expect(c.gold, before - cost);
      expect(c.reserveSoldiersFor(0), stock);
    }
    final gold = c.gold;
    expect(c.upgradeCity(0, hero: governor), isFalse);
    expect(c.gold, gold);
    expect(
      c.dispatchTo(
        hero,
        c.cityBounds(c.world.cities[0]).center + const GamePoint(80, 0),
      ),
      isNotNull,
    );
    expect(hero.soldiers, 4);
    expect(c.reserveSoldiersFor(0), stock - 4);
    expect(c.buySoldiers(0, 1), isTrue);
    expect(c.buySoldiers(0, 1), isTrue);
    expect(c.gold, gold - 2);
  });

  test('一级城超员仍可同月连续签约，候选锁定与首月月俸逐次生效', () {
    final c = fresh();
    addTearDown(c.dispose);
    expect(c.cities[0]!.level, 1);
    final initial = c.garrisonAt(0).length;
    for (var n = 0; n < 2; n++) {
      final before = c.gold, offer = c.drawHero(0)!;
      expect(c.drawHero(0), isNull);
      expect(c.signHero(offer), isNotNull);
      expect(c.gold, before - 5 - offer.initialSalary);
      expect(c.signHero(offer), isNull);
    }
    expect(c.garrisonAt(0).length, initial + 2);
    expect(c.settledMonths, 0);
  });

  test('多次升级始终校验余额，失败不扣钱也不增加城防', () {
    final c = fresh();
    c.settledMonths = 24;
    addTearDown(c.dispose);
    final governor = c.garrisonAt(0).first;
    while (c.upgradeBlockReason(0, governor) == null) {
      expect(c.upgradeCity(0, hero: governor), isTrue);
    }
    final gold = c.gold, level = c.cities[0]!.level;
    expect(c.upgradeCity(0, hero: governor), isFalse);
    expect(c.gold, gold);
    expect(c.cities[0]!.level, level);
    expect(c.upgradeWindowBlockReason(0), isNull);
  });

  for (final (roll, adjustment) in [(0.0, 0), (.5, -20), (.75, 10)]) {
    test('全国固定收入与收成只结算一次：$adjustment', () {
      final c = fresh(harvest: roll);
      addTearDown(c.dispose);
      c.cities[1]!.ownerCountryId = 0;
      expect(c.cities[1]!.income, 10);
      expect(c.cities[1]!.reserveCapacity, 4);
      expect(c.reserveCapacityFor(0), 20);
      final gold = c.gold, salary = c.salaryCost;
      c.advance(60);
      final report = c.lastSettlementFor(0)!;
      expect(report.baseIncome, 30 + 10 + 10);
      expect(report.adjustment, adjustment);
      expect(report.garrisonUpkeep, 3);
      expect(c.gold, gold + 50 + adjustment - salary - 3);
      expect(c.aiBudgetFor(0).minimumMonthlyIncome, 30);
    });
  }

  test('商店第一行按现有价格顺序开放，之后每年增加一行', () {
    final c = fresh();
    addTearDown(c.dispose);
    List<int> available() => c.weaponCatalog.shopWeapons
        .where((w) => c.weaponUnlocked(0, w))
        .map((w) => w.id)
        .toList();
    expect(available(), [0, 9, 1]);
    expect(c.buyWeapon(14), isFalse);
    c.advance(11 * 60);
    expect(c.year, 1);
    expect(available().length, 3);
    c.advance(60);
    expect(c.year, 2);
    expect(available().length, 6);
    c.advance(12 * 60);
    expect(c.year, 3);
    expect(available().length, 9);
    c.advance(12 * 60);
    expect(c.year, 4);
    expect(available().length, 12);
  });

  test('唯一武器使用后换守将也不会重新补装', () {
    final c = fresh();
    addTearDown(c.dispose);
    for (var i = 0; i < 3; i++) {
      expect(c.buyWeapon(0), isTrue);
    }
    final hero = c.garrisonAt(0).last;
    final march = c.dispatch(
      hero,
      c.world.cities[1],
      weaponSlots: {0: 0},
    )!;
    march.position = march.destination;
    c.advance(3);
    final battle = c.battles[1]!;
    expect(hero.weaponIds, isEmpty);
    for (var i = 0; i < 180; i++) {
      c.advance(1 / 60);
    }
    expect(hero.weaponIds, isEmpty);
    expect(c.useWeapon(hero, 0), isFalse);
    battle.defender.hp = 0;
    for (var i = 0; i < 3000 && battle.wave == 1; i++) {
      c.advance(1 / 60);
    }
    expect(battle.wave, 2);
    c.advance(3);
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponStockFor(0, 0), 2);
  });

  test('撤退概率按缺兵与每四分之一失血分档', () {
    expect(CombatRules.retreatSuccess(100, 100, 4), closeTo(.9, 1e-9));
    expect(CombatRules.retreatSuccess(100, 100, 3), closeTo(.8, 1e-9));
    expect(CombatRules.retreatSuccess(76, 100, 4), closeTo(.9, 1e-9));
    expect(CombatRules.retreatSuccess(75, 100, 4), closeTo(.8, 1e-9));
    expect(CombatRules.retreatSuccess(50, 100, 2), closeTo(.5, 1e-9));
    expect(CombatRules.retreatSuccess(1, 100, 0), closeTo(.2, 1e-9));
  });

  test('守城失败必定降级，不受随机值影响', () {
    for (final roll in [0.0, .79, .8, .999999]) {
      final c = fresh(siege: roll);
      addTearDown(c.dispose);
      final hero = c.garrisonAt(1).last;
      c.defeatHero(hero.id, winnerCountryId: 0, defendedCityId: 1);
      expect(c.cities[1]!.level, 1);
    }
  });
}
