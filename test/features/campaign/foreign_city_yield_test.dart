import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class _HarvestRoll implements math.Random {
  _HarvestRoll(this.roll);
  final int roll;
  @override
  int nextInt(int max) => max == 4 ? [0, 2, 3][roll] : max - 1;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => roll / 100;
}

CampaignState _campaign({int harvestRoll = 0}) {
  final records = [
    (0, 0, 1, [40]),
    (1, 1, 3, [3]),
    (2, 0, 2, [0]),
    (3, 2, 2, [4]),
  ];
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 100,
      'height': 40,
      'tiles': List.filled(4000, 0),
      'cities': [
        for (final row in records)
          {
            'id': row.$1,
            'name': '原城${row.$1}',
            'x': 10 + row.$1 * 20,
            'y': 15,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialOwnerId': row.$2,
            'initialLevel': row.$3,
            'unitIds': row.$4,
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final c = CampaignState.fromRom(
    world,
    decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
    startingGold: 1000,
    aiEnabled: false,
    economyRandom: _HarvestRoll(harvestRoll),
  );
  c.cities[1] = CitySituation(
    ownerCountryId: 1,
    defense: 100,
    baseIncome: 21,
    initialLevel: 3,
  );
  return c;
}

void main() {
  test('各级外国城收入与城防容量全额，防守和招募等级保持原规则', () {
    for (var level = 1; level <= 5; level++) {
      final city = CitySituation(
        ownerCountryId: 0,
        nativeCountryId: 1,
        defense: 100,
        baseIncome: 21,
        initialLevel: level,
      );
      expect(city.income, 21 + (level - 1) * 5);
      expect(city.reserveCapacity, level * 4);
      expect(city.level, level);
      expect(city.defense, 100);
      expect(city.rearStagingCapacity, level + 1);
    }
  });

  test('原属国家不随改名或再次易主改变，夺回本土恢复全额', () {
    final c = _campaign();
    final city = c.cities[1]!;
    expect(city.nativeCountryId, 1);
    expect(city.isNative, isTrue);
    expect(city.income, 31);
    city.ownerCountryId = 0;
    expect(c.cityName(1), c.world.countryName(0));
    expect(city.level, 1);
    expect(city.income, 21);
    expect(city.reserveCapacity, 4);
    city.ownerCountryId = 2;
    expect(city.nativeCountryId, 1);
    expect(city.income, 21);
    expect(city.reserveCapacity, 4);
    city.ownerCountryId = 1;
    expect(city.isNative, isTrue);
    expect(city.income, 21);
    expect(city.reserveCapacity, 4);
  });

  for (final (roll, income, adjustment) in [
    (0, 86, 0),
    (1, -4, -90),
    (2, 176, 90),
  ]) {
    test('收成 $roll：本土和占领地同额结算，月结、记录与AI保守收入一致', () {
      final c = _campaign(harvestRoll: roll);
      c.cities[1]!.ownerCountryId = 0;
      expect(c.cities[1]!.income, 21);
      expect(c.aiBudgetFor(0).minimumMonthlyIncome, -4);
      c.advance(60);
      final report = c.lastSettlementFor(0)!;
      expect(report.cityCount, 3);
      expect(report.baseIncome, 86);
      expect(report.adjustment, adjustment);
      expect(report.salary, c.salaryCost);
      expect(report.netIncome, income - c.salaryCost);
      expect(c.gold, 1000 + income - c.salaryCost);
    });
  }

  test('NPC占据玩家本土同样全额，计算收益不按玩家身份特判', () {
    final c = _campaign(harvestRoll: 1);
    c.cities[2]!.ownerCountryId = 1;
    expect(c.cities[2]!.nativeCountryId, 0);
    expect(c.cities[2]!.income, 20);
    expect(c.reserveCapacityFor(1), 20);
    expect(c.aiBudgetFor(1).minimumMonthlyIncome, 11);
    c.advance(60);
    expect(c.lastSettlementFor(1)!.baseIncome, 71);
    expect(c.lastSettlementFor(1)!.adjustment, -60);
    expect(c.goldFor(1), 1000 + 11 - c.lastSettlementFor(1)!.salary);
  });

  test('占城及升级仅增加折算后的国家容量，英雄容量与现有库存不减半', () {
    final c = _campaign();
    expect(c.reserveCapacityFor(0), 20);
    c.settledMonths = 1;
    expect(c.reserveSoldiersFor(0), 20);
    c.heroes.removeWhere((h) => h.cityId == 1);
    final hero = c.heroes.firstWhere((h) => h.sourceId == 0);
    final march = c.dispatch(hero, c.world.cities[1])!;
    expect(c.reserveSoldiersFor(0), 16);
    march.position = march.destination;
    c.advance(1 / 60);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.cities[1]!.nativeCountryId, 1);
    expect(hero.cityId, 1);
    expect(c.reserveCapacityFor(0), 24);
    expect(c.reserveSoldiersFor(0), 20);
    expect(c.soldiersAt(1), c.soldiersAt(0));
    c.upgradeCity(1, hero: hero);
    expect(c.cities[1]!.level, 2);
    expect(c.cities[1]!.income, 26);
    expect(c.reserveCapacityFor(0), 28);
    expect(c.reserveSoldiersFor(0), 20);
    expect(c.buySoldiers(1, 9), isFalse);
    expect(c.buySoldiers(1, 4), isTrue);
    expect(c.reserveSoldiersFor(0), 24);
  });

  test('单城只提供基础收入，不再单独计算丰欠收', () {
    final city = CitySituation(
      ownerCountryId: 0,
      nativeCountryId: 1,
      defense: 100,
      baseIncome: 21,
      initialLevel: 1,
    );
    expect(city.income, 21);
  });
}
