import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/battle/domain/combat_rules.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
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
          File('assets/data/campaign_config.json5').readAsStringSync(),
        ),
      ).first,
      decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),

      aiEnabled: false,
      economyRandom: _Roll(harvest),
      siegeRandom: _Roll(siege),
    );

void main() {
  test('所有国家首月即可招将，只支付抽取费且同月不能重复', () {
    final c = fresh();
    addTearDown(c.dispose);
    for (final city in c.world.cities) {
      final country = c.cities[city.id]!.ownerCountryId;
      final before = c.goldFor(country);
      final offer = c.drawHero(city.id, countryId: country);
      expect(offer, isNotNull);
      if (country == 0) expect(c.signHero(offer!), isNotNull);
      expect(c.goldFor(country), before - 5);
      expect(c.drawHero(city.id, countryId: country), isNull);
      expect(c.settledMonths, 0);
    }
  });

  test('开局满编，跨月逐级升级不生成免费士兵，征兵受国家月度机会限制', () {
    final c = fresh();
    addTearDown(c.dispose);
    for (final country
        in c.cities.values.map((s) => s.ownerCountryId).toSet()) {
      expect(c.reserveSoldiersFor(country), c.reserveCapacityFor(country));
    }
    final hero = c.garrisonAt(0).last, governor = c.garrisonAt(0).first;
    final stock = c.reserveSoldiersFor(0);
    // 先积累资金，达到年份上限后仍只能每城每月升级一次。
    c.advance(1440);
    for (var level = c.cities[0]!.level + 1; level <= 5; level++) {
      final before = c.gold, cost = c.upgradeCostFor(0, governor)!;
      expect(c.upgradeCity(0, hero: governor), isTrue);
      expect(c.cities[0]!.level, level);
      expect(c.gold, before - cost);
      expect(c.reserveSoldiersFor(0), stock);
      expect(c.upgradeCity(0, hero: governor), isFalse);
      if (level < 5) c.advance(60);
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
    expect(c.buySoldiers(0, 1), isFalse);
    expect(c.gold, gold - 1);
  });

  test('一级城超员仍能按月签约，候选锁定且签约不预付月俸', () {
    final c = fresh();
    addTearDown(c.dispose);
    c.cities[0] = CitySituation(
      ownerCountryId: 0,
      defense: 100,
      baseIncome: 10,
      initialLevel: 1,
    );
    final initial = c.garrisonAt(0).length;
    for (var n = 0; n < 2; n++) {
      final before = c.gold, offer = c.drawHero(0)!;
      expect(c.drawHero(0), isNull);
      expect(c.signHero(offer), isNotNull);
      expect(c.gold, before - 5);
      expect(c.signHero(offer), isNull);
      expect(c.drawHero(0), isNull);
      if (n == 0) c.advance(60);
    }
    expect(c.garrisonAt(0).length, initial + 2);
    expect(c.settledMonths, 1);
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
    expect(c.upgradeWindowBlockReason(0), contains('本月'));
  });

  for (final (roll, adjustment) in [(0.0, 0), (.5, -15), (.75, 9)]) {
    test('国家保底和全国收成只结算一次，多城基础收入合计：$adjustment', () {
      final c = fresh(harvest: roll);
      addTearDown(c.dispose);
      c.cities[1]!.ownerCountryId = 0;
      expect(c.cities[1]!.income, 10);
      expect(c.cities[1]!.reserveCapacity, 4);
      expect(c.reserveCapacityFor(0), 28);
      final gold = c.gold, salary = c.salaryCost;
      c.advance(60);
      final report = c.lastSettlementFor(0)!;
      expect(report.baseIncome, 10 + 10 + 10);
      expect(report.adjustment, adjustment);
      expect(report.garrisonUpkeep, 0);
      expect(c.gold, gold + 30 + adjustment - salary);
      expect(c.aiBudgetFor(0).minimumMonthlyIncome, 10);
    });
  }

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
