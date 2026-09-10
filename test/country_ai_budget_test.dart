import 'support/national_ai_fixture.dart' show advanceAi;

import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/ai/runtime/testing_worker.dart';
import 'package:pixel_world/world/campaign_setup.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';
import 'package:pixel_world/world/world_movement.dart';
import 'package:pixel_world/world/weapon.dart';

class _Poor implements math.Random {
  int calls = 0;
  @override
  int nextInt(int max) {
    calls++;
    return 50 % max;
  }

  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0.5;
}

CampaignState _campaign({
  int gold = 50,
  int income = 10,
  int level = 2,
  int stock = 12,
  int salary = 0,
  int hireSalary = 0,
  int terrain = 0,
  bool ai = true,
  bool recruitment = false,
  bool secondCity = false,
  math.Random? economy,
}) {
  final data = jsonDecode(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  );
  final initialIds = {40, 0, 2, 18, 19, if (secondCity) 3};
  for (final row in data['heroes'] as List) {
    row['salary'] = row['id'] == 40
        ? 0
        : initialIds.contains(row['id'])
        ? salary
        : hireSalary;
  }
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 128,
      'height': 48,
      'tiles': List.filled(128 * 48, terrain),
      'cities': [
        for (final (id, x, y, owner, units) in [
          (0, 115, 10, 0, [40]),
          (1, 10, 30, 1, [0, 2, 18]),
          (2, 105, 38, 2, [19]),
          if (secondCity) (3, 30, 5, 1, [3]),
        ])
          {
            'id': id,
            'name': '测试城$id',
            'x': x,
            'y': y,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialLevel': owner == 1 ? level : 1,
            'initialOwnerId': owner,
            'unitIds': units,
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final c = CampaignState.fromRom(
    world,
    decodeRomHeroes(jsonEncode(data))
        .where((hero) => recruitment || initialIds.contains(hero.id))
        .toList(),
    aiEnabled: ai,
    countryConfigs: {
      0: const CountryConfig(initialGold: 100),
      1: CountryConfig(initialGold: gold),
      2: const CountryConfig(initialGold: 0),
    },
    economyRandom: economy ?? _Poor(),
    recruitmentRandom: math.Random(3),
    aiWorkerFactory: SynchronousAiWorker.new,
    aiRandom: math.Random(7),
    retreatRandom: math.Random(31),
  );
  var initialTroops = 0;
  for (final id in [1, if (secondCity) 3]) {
    initialTroops += math.min(stock, level * 4 + c.heroesAt(id).length * 4);
    c.cities[id] = CitySituation(
      ownerCountryId: 1,
      defense: 100,
      baseIncome: income,
      initialLevel: level,
    );
  }
  c.countryTroops[1] = CountryTroops(reserveSoldiers: initialTroops);
  return c;
}

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

void main() {
  test('正式三张地图连续运行三分钟，有真实出征且不会因经营花空国库而停营', () {
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: CampaignSetup.decode(
        File('assets/data/campaign_config.json').readAsStringSync(),
      ),
    );
    final heroes = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    for (final world in worlds) {
      final c = CampaignState.fromRom(
        world,
        heroes,
        weaponCatalog: WeaponCatalog.decode(
          File('assets/data/rom_weapons.json').readAsStringSync(),
        ),
        economyRandom: math.Random(17),
        aiWorkerFactory: SynchronousAiWorker.new,
        aiRandom: math.Random(7),
        retreatRandom: math.Random(31),
        recruitmentRandom: math.Random(11),
        siegeRandom: math.Random(23),
      );
      var deployments = 0;
      for (var second = 0; second < 180 && !c.defeated; second++) {
        advanceAi(c, 1);
        final units = c.marches.values.where((march) => !march.hero.isPlayer);
        deployments += units.length;
        for (final unit in units) {
          expect(
            c.goldFor(unit.hero.countryId),
            greaterThan(0),
            reason: '地图${world.id} 第$second秒，${unit.hero.name}的国家断粮',
          );
        }
      }
      expect(deployments, greaterThan(0));
    }
  });

  test('只剩一金币时不征兵、不升级、不新增远征，即使已有充足士兵', () {
    final c = _campaign(gold: 1, recruitment: true);
    final count = c.heroes.length;
    advanceAi(c, 8);
    expect(c.goldFor(1), 1);
    expect(c.marches, isEmpty);
    expect(c.soldiersAt(1), 12);
    expect(c.cities[1]!.level, 2);
    expect(c.heroes.length, count);
    expect(c.remainingHeroDraws(1), 3);
  });

  test('全国在外部队按数量和状态预留粮草，同时覆盖欠收与月俸', () {
    final c = _campaign(gold: 100, level: 1, salary: 2, ai: false);
    final a = c.dispatchTo(_hero(c, 0), const Offset(1900, 30), countryId: 1)!;
    final b = c.dispatchTo(_hero(c, 2), const Offset(1900, 30), countryId: 1)!;
    a.position = const Offset(200, 30);
    b.position = const Offset(220, 30);
    final moving = c.aiBudgetFor(1);
    expect(moving.planningSeconds, closeTo(1700 / (22 * .75), .01));
    expect(moving.minimumMonthlyIncome, 0);
    expect(moving.monthlySalary, 6);
    expect(moving.reserveGold, 31); // 两队完整行军约 103 秒各付十金币，加月俸六金币与应急五金币。
    b.camp();
    expect(c.aiBudgetFor(1).reserveGold, 26);
    expect(c.aiBudgetFor(0).reserveGold, 5);
    c.advance(59.9);
    expect(c.aiBudgetFor(1).reserveGold, greaterThan(25)); // 预测期内新增一次月结。
  });

  test('收入尚未到账时仍保护月结前现金，读预算不会提前抽取收成', () {
    final random = _Poor();
    final c = _campaign(
      gold: 100,
      income: 50,
      level: 1,
      ai: false,
      economy: random,
    );
    c.dispatchTo(_hero(c, 0), const Offset(1900, 30), countryId: 1);
    for (var n = 0; n < 50; n++) {
      expect(c.aiBudgetFor(1).reserveGold, 11);
    }
    expect(random.calls, 0);
  });

  test('长途山路需要更多粮草，行军时间估算使用实际地形速度', () {
    final plain = _campaign(gold: 100, level: 1, income: 0, ai: false);
    final mountain = _campaign(
      gold: 100,
      level: 1,
      income: 0,
      terrain: 2,
      ai: false,
    );
    for (final c in [plain, mountain]) {
      c.dispatch(_hero(c, 0), c.world.cities[0], countryId: 1);
    }
    expect(
      mountain.aiBudgetFor(1).planningSeconds,
      greaterThan(plain.aiBudgetFor(1).planningSeconds),
    );
    expect(
      mountain.aiBudgetFor(1).reserveGold,
      greaterThan(plain.aiBudgetFor(1).reserveGold),
    );
    final world = WorldDefinition.fromJson(
      {
        'id': 0,
        'width': 10,
        'height': 2,
        'tiles': [
          for (var row = 0; row < 2; row++) ...[0, 0, 0, 1, 1, 1, 1, 1, 2, 2],
        ],
        'cities': [],
      },
      [0, 1, 2, 3],
    );
    final seconds = estimateMarchSeconds(
      world,
      const Offset(0, 8),
      const Offset(160, 8),
    );
    expect(
      seconds,
      closeTo(48 / (22 * .75) + 80 / (22 * .4) + 32 / (22 * .2), 1e-6),
    );
    expect(
      advanceToward(
        world,
        const Offset(0, 8),
        const Offset(160, 8),
        seconds + 1e-6,
      ).position,
      const Offset(160, 8),
    );
  });

  test('先保护既有远征，连续经营经过欠收月结仍有粮草，资金充足也确实派兵', () {
    final c = _campaign(salary: 2);
    advanceAi(c, 8);
    expect(c.marches.length, 1);
    expect(c.garrisonAt(1).length, 2);
    for (var second = 0; second < 60; second++) {
      advanceAi(c, 1);
      expect(
        c.goldFor(1),
        greaterThanOrEqualTo(GameConfig.countryAiEmergencyGold),
      );
      expect(
        c.marches.values
            .where((march) => march.hero.countryId == 1)
            .any((march) => march.supplyHalted),
        isFalse,
      );
    }
    expect(c.lastSettlementFor(1)!.harvest.name, 'poor');
    expect(c.goldFor(0), 100); // 玩家国库只受自己的月结影响。
  });

  test('新招募将领的后续月俸也占预算，不能只判断抽取和签约费', () {
    final expensive = _campaign(
      gold: 50,
      stock: 0,
      recruitment: true,
      hireSalary: 60,
      level: 4,
    );
    final cheap = _campaign(gold: 50, stock: 0, recruitment: true, level: 4);
    final count = expensive.heroes.length;
    for (var i = 0; i < 1920; i++) {
      expensive.advance(1 / 60);
      cheap.advance(1 / 60);
    }
    expect(expensive.remainingHeroDraws(1), 3);
    expect(expensive.heroes.length, count);
    expect(cheap.remainingHeroDraws(1), 0);
    expect(cheap.heroes.length, count + 1);
  });

  test('资金不足的旧营地优先分批回城，不用刚恢复的零钱再发起远征', () {
    final c = _campaign(gold: 2, income: 0, stock: 0);
    final a = c.dispatchTo(_hero(c, 0), const Offset(1900, 30), countryId: 1)!;
    final b = c.dispatchTo(_hero(c, 2), const Offset(1900, 30), countryId: 1)!;
    a.position =
        c.cityBounds(c.world.cities[1]).centerRight + const Offset(15, 0);
    b.position = a.position + const Offset(0, 5);
    c.buySoldiers(1, 2, countryId: 1);
    c.advance(.1);
    expect(a.supplyHalted, isTrue);
    expect(b.supplyHalted, isTrue);
    c.dismissHero(_hero(c, 18), countryId: 1);
    for (var i = 0; i < 600; i++) {
      c.advance(1 / 60);
    }
    expect(c.marches, isEmpty);
    expect(c.garrisonAt(1).length, 2);
    expect(c.goldFor(1), greaterThan(0));
  });

  test('多城共用同一份国库预算，支出后即时重算，不把预留重复花掉', () {
    final c = _campaign(
      gold: 45,
      secondCity: true,
      recruitment: true,
      stock: 0,
      salary: 1,
    );
    advanceAi(c, 8);
    final budget = c.aiBudgetFor(1);
    expect(c.goldFor(1), greaterThanOrEqualTo(budget.reserveGold));
    expect(c.goldFor(1), lessThan(45));
    expect(
      budget.monthlySalary,
      c.heroes
          .where((hero) => hero.countryId == 1)
          .fold<int>(0, (sum, hero) => sum + hero.salary),
    );
    expect(c.goldFor(0), 100);
  });
}
