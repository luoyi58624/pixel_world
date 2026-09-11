import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/ongoing_fixture.dart';

import 'package:pixel_world/core/geometry/geometry.dart';

import '../../support/national_ai_fixture.dart' show advanceAi;

import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/world_map/domain/world_movement.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';

class _Poor implements math.Random {
  int calls = 0;
  @override
  int nextInt(int max) {
    calls++;
    return max == 4 ? 2 : max - 1;
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
    row['nativeCountryId'] = null;
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
  final c = ongoingCampaign(
    CampaignState.fromRom(
      world,
      decodeRomHeroes(jsonEncode(data))
          .where((hero) => recruitment || initialIds.contains(hero.id))
          .toList(),
      weaponCatalog: WeaponCatalog.decode(
        File('assets/data/rom_weapons.json').readAsStringSync(),
      ),
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
    ),
    stock: 0,
    year: 1,
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
  test('正式三张地图连续运行三分钟，有真实出征且采购不透支、部队不停营', () {
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
      final c = ongoingCampaign(
        CampaignState.fromRom(
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
        ),
        stock: 0,
        year: 1,
      );
      var deployments = 0;
      final checkedEvents = <int, int>{};
      for (var second = 0; second < 180 && !c.defeated; second++) {
        advanceAi(c, 1);
        final units = c.marches.values.where((march) => !march.hero.isPlayer);
        deployments += units.length;
        for (final unit in units) {
          expect(
            unit.supplyHalted,
            isFalse,
            reason: '地图${world.id} 第$second秒，${unit.hero.name}发生停营',
          );
          final country = unit.hero.countryId;
          // 已有征兵规则允许恰好花完余额；按真实采购检查透支，不把零金币当成断粮。
          for (final event
              in c.events
                  .forCountry(country)
                  .query(afterSequence: checkedEvents[country] ?? 0)) {
            checkedEvents[country] = event.sequence;
            if (event.kind.name != 'commandApplied') continue;
            final before = (event.data['before'] as Map)['gold'] as num;
            final after = (event.data['after'] as Map)['gold'] as num;
            if (after < before) {
              expect(
                after,
                greaterThanOrEqualTo(0),
                reason: event.toJsonLine(),
              );
            }
          }
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
    expect(c.remainingHeroDraws(1), isNull);
  });

  test('全国在外部队只预留欠收与月俸，不再按距离或扎营增加费用', () {
    final c = _campaign(gold: 100, level: 1, salary: 2, ai: false);
    final a = c.dispatchTo(
      _hero(c, 0),
      const GamePoint(1900, 30),
      countryId: 1,
    )!;
    final b = c.dispatchTo(
      _hero(c, 2),
      const GamePoint(1900, 30),
      countryId: 1,
    )!;
    a.position = const GamePoint(200, 30);
    b.position = const GamePoint(220, 30);
    final moving = c.aiBudgetFor(1);
    expect(moving.planningSeconds, 90);
    expect(moving.minimumMonthlyIncome, 0);
    expect(
      moving.monthlySalary,
      c.heroes.where((h) => h.countryId == 1).fold(0, (n, h) => n + h.salary),
    );
    expect(moving.reserveGold, 11); // 欠收无净产出，只预留六金币月俸和五金币应急金。
    b.camp();
    expect(c.aiBudgetFor(1).reserveGold, moving.reserveGold);
    expect(c.aiBudgetFor(0).reserveGold, 5);
    c.advance(59.9);
    expect(
      c.aiBudgetFor(1).reserveGold,
      greaterThanOrEqualTo(5),
    ); // 预测期内新增一次月结。
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
    c.dispatchTo(_hero(c, 0), const GamePoint(1900, 30), countryId: 1);
    for (var n = 0; n < 50; n++) {
      expect(c.aiBudgetFor(1).reserveGold, 5);
    }
    expect(random.calls, 0);
  });

  test('长途山路只增加时间、不增加费用，行军仍使用实际地形速度', () {
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
      plain.aiBudgetFor(1).planningSeconds,
    );
    expect(
      mountain.aiBudgetFor(1).reserveGold,
      plain.aiBudgetFor(1).reserveGold,
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
      const GamePoint(0, 8),
      const GamePoint(160, 8),
    );
    expect(
      seconds,
      closeTo(48 / (22 * .75) + 80 / (22 * .4) + 32 / (22 * .2), 1e-6),
    );
    expect(
      advanceToward(
        world,
        const GamePoint(0, 8),
        const GamePoint(160, 8),
        seconds + 1e-6,
      ).position,
      const GamePoint(160, 8),
    );
  });

  test('先保护既有远征，连续经营经过欠收月结仍有粮草，资金充足也确实派兵', () {
    final c = _campaign(salary: 2, gold: 500);
    advanceAi(c, 8);
    expect(c.marches, isNotEmpty);
    expect(c.garrisonAt(1), isNotEmpty);
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
    expect(c.lastSettlementFor(1)!.harvest?.name, 'poor');
    expect(c.goldFor(0), 110); // 单城欠收产出十金币，玩家国库不受敌国经营影响。
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
    for (final c in [expensive, cheap]) {
      final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
      final ledger = AiLedger(
        view,
        rules,
        AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      );
      final before = ledger.gold;
      expect(ledger.recruit(view.city(1)!), identical(c, cheap));
      expect(ledger.gold, before - (identical(c, cheap) ? 5 : 0));
    }
  });

  test('资金不足也不为节省已取消的粮草而召回正常行军部队', () {
    final c = _campaign(gold: 2, income: 0, stock: 0);
    final a = c.dispatchTo(
      _hero(c, 0),
      const GamePoint(400, 100),
      countryId: 1,
    )!;
    final b = c.dispatchTo(
      _hero(c, 2),
      const GamePoint(1900, 30),
      countryId: 1,
    )!;
    a.position =
        c.cityBounds(c.world.cities[1]).centerRight + const GamePoint(15, 0);
    b.position = a.position + const GamePoint(0, 5);
    c.buySoldiers(1, 2, countryId: 1);
    c.advance(.1);
    expect(a.supplyHalted, isFalse);
    expect(b.supplyHalted, isFalse);
    c.dismissHero(_hero(c, 18), countryId: 1);
    for (var i = 0; i < 600; i++) {
      c.advance(1 / 60);
    }
    expect(c.marches[a.hero.id], same(a));
    expect(c.marches[b.hero.id], same(b));
    expect(a.destination, const GamePoint(400, 100));
    expect(b.destination, const GamePoint(1900, 30));
    expect(a.phase, MarchPhase.marching);
    expect(b.phase, MarchPhase.marching);
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
