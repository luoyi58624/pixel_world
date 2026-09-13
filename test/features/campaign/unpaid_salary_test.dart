import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:json5/json5.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';

import '../../support/assault_fixture.dart';

final _catalog = decodeRomHeroes(
  File('assets/data/heroes.json5').readAsStringSync(),
);

CampaignState _game({
  List<int> sourceHeroes = const [0, 2, 18, 19],
  List<int> targetHeroes = const [26],
  int targetLevel = 1,
  Map<int, Map<String, Object>> heroOverrides = const {},
}) {
  final template = assaultCampaign(
    sourceHeroes: sourceHeroes,
    targetHeroes: targetHeroes,
    targetLevel: targetLevel,
  );
  final data = json5Decode(File('assets/data/heroes.json5').readAsStringSync());
  for (final row in data['heroes']) {
    row.addAll(heroOverrides[row['id']] ?? <String, Object>{});
  }
  final c = CampaignState.fromRom(
    template.world,
    decodeRomHeroes(jsonEncode(data)),
    aiEnabled: false,
    countryConfigs: {
      0: const CountryConfig(initialGold: 1000),
      1: const CountryConfig(initialGold: 1000),
      2: const CountryConfig(initialGold: 0),
    },
  );
  template.dispose();
  c.settledMonths = 36;
  c.countryTroops[1] = CountryTroops();
  c.countryTroops[2] = CountryTroops(reserveSoldiers: 4);
  return c;
}

Map<String, dynamic> _save(CampaignState c) =>
    jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;

CampaignState _restore(CampaignState original, Map<String, dynamic> saved) {
  final c = CampaignSnapshots.restore(saved, original.world, _catalog);
  addTearDown(c.dispose);
  return c;
}

CampaignState _month(CampaignState original, {Map<int, int> gold = const {}}) {
  final saved = _save(original);
  saved['time'][1] = 60 - 1 / 60;
  for (final entry in gold.entries) {
    saved['gold']['${entry.key}'] = entry.value;
  }
  final c = _restore(original, saved);
  c.advance(1 / 60);
  expect(c.settledMonths, original.settledMonths + 1);
  return c;
}

List<GameEvent> _departures(CampaignState c) => c.events.retainedEvents
    .where((e) => e.kind == GameEventKind.heroDeparted)
    .toList();

CityBattle _attack(CampaignState c, {int heroId = 0}) {
  final hero = scenarioHero(c, heroId);
  final march = c.dispatch(hero, c.world.cities[2], countryId: 1)!;
  march.position = march.destination;
  c.advance(1 / 60);
  expect(c.battles[2], isNotNull);
  return c.battles[2]!;
}

void _until(CampaignState c, bool Function() done) {
  for (var i = 0; i < 600 && !done(); i++) {
    c.advance(1 / 60);
  }
  expect(done(), isTrue);
}

void main() {
  setUp(
    () => GameConfig.loadMap({
      'normalHarvestWeight': 1,
      'poorHarvestWeight': 0,
      'abundantHarvestWeight': 0,
    }),
  );
  tearDown(() => GameConfig.loadMap({}));

  for (final country in [0, 1]) {
    test('国家$country先收收入再按战斗力发俸，离职内政收入立即供后续发俸', () {
      var original = _game(
        heroOverrides: {
          0: {'combat': 5, 'salary': 12, 'politics': 2},
          2: {'combat': 20, 'salary': 10, 'politics': 7},
          18: {'combat': 30, 'salary': 12, 'politics': 3},
          19: {'combat': 10, 'salary': 6, 'politics': 4},
        },
      );
      addTearDown(original.dispose);
      if (country == 0) {
        final saved = _save(original);
        for (final hero in saved['people']) {
          if (hero['country'] != 1) continue;
          hero['country'] = 0;
          hero['city'] = 0;
        }
        original = _restore(original, saved);
      }
      final c = _month(original, gold: {country: 0});
      expect(
        _departures(c)
            .where((e) => e.countryId == country)
            .map((e) => e.heroId),
        ['rom-2', 'rom-0'],
      );
      expect(c.heroes.any((h) => h.sourceId == 18), isTrue);
      expect(c.heroes.any((h) => h.sourceId == 19), isTrue);
      final bill = c.lastSettlementFor(country)!;
      expect(bill.baseIncome, 20);
      expect(bill.salaryDue, 40);
      expect(bill.salary, 18);
      expect(bill.departureIncome, 9);
      expect(bill.departedHeroes, 2);
      expect(bill.goldAfter, 11);
      expect(bill.netIncome, bill.actualChange);
      expect(_departures(c).every((e) => e.isVisibleInCountryLog), isTrue);
      final departed = _departures(c).firstWhere((e) => e.countryId == country);
      expect((departed.data['before'] as Map)['gold'], 8);
      expect((departed.data['after'] as Map)['gold'], 15);
    });
  }

  test('余额刚好够的将领留下，第二个月再次正常付俸', () {
    final original = _game(
      sourceHeroes: [0],
      heroOverrides: {
        0: {'salary': 20},
      },
    );
    addTearDown(original.dispose);
    final c = _month(original, gold: {1: 0});
    expect(c.goldFor(1), 0);
    expect(c.lastSettlementFor(1)!.salary, 20);
    expect(_departures(c), isEmpty);
    c.advance(60);
    expect(c.heroes.any((h) => h.sourceId == 0), isTrue);
    expect(c.lastSettlementFor(1)!.salary, 20);
    expect(c.goldFor(1), 0);
  });

  test('负余额不会让零月俸角色离职，旧存档中的主角非零月俸被归零', () {
    final original = _game(
      sourceHeroes: [0],
      heroOverrides: {
        0: {'salary': 0},
      },
    );
    addTearDown(original.dispose);
    final saved = _save(original);
    for (final h in saved['people']) {
      if (h['source'] == 40) h['salary'] = 99;
    }
    final legacy = _restore(original, saved);
    final c = _month(legacy, gold: {0: -50, 1: -50});
    expect(scenarioHero(c, 40).salary, 0);
    expect(scenarioHero(c, 40).health.alive, isTrue);
    expect(scenarioHero(c, 0).health.alive, isTrue);
    expect(c.goldFor(0), -30);
    expect(c.goldFor(1), -30);
    expect(c.lastSettlementFor(0)!.salary, 0);
    expect(_departures(c), isEmpty);
  });

  test('关闭月俸时不扣款也不离职', () {
    GameConfig.loadMap({
      'chargeHeroSalary': false,
      'normalHarvestWeight': 1,
      'poorHarvestWeight': 0,
      'abundantHarvestWeight': 0,
    });
    final original = _game(
      sourceHeroes: [0],
      heroOverrides: {
        0: {'salary': 100},
      },
    );
    addTearDown(original.dispose);
    final c = _month(original, gold: {1: 0});
    expect(c.goldFor(1), 20);
    expect(c.lastSettlementFor(1)!.salaryDue, 0);
    expect(scenarioHero(c, 0).health.alive, isTrue);
    expect(_departures(c), isEmpty);
  });

  test('同战斗力按满血生命、士气、名册顺序稳定发俸，不因受伤颠倒强弱', () {
    final original = _game(
      heroOverrides: {
        0: {
          'combat': 15,
          'maxHp': 96,
          'morale': 100,
          'salary': 10,
          'politics': 0,
        },
        2: {
          'combat': 15,
          'maxHp': 128,
          'morale': 80,
          'salary': 10,
          'politics': 0,
        },
        18: {
          'combat': 15,
          'maxHp': 128,
          'morale': 90,
          'salary': 10,
          'politics': 0,
        },
        19: {
          'combat': 15,
          'maxHp': 128,
          'morale': 90,
          'salary': 10,
          'politics': 0,
        },
      },
    );
    addTearDown(original.dispose);
    scenarioHero(original, 18).hp = 1;
    final c = _month(original, gold: {1: -10});
    expect(c.heroes.where((h) => h.countryId == 1).map((h) => h.sourceId), [
      18,
    ]);
    expect(_departures(c).map((e) => e.heroId), ['rom-19', 'rom-2', 'rom-0']);
  });

  test('存档保留离职账单，续玩不重复发俸或返还内政，旧账单仍可恢复', () {
    final original = _game(
      sourceHeroes: [0],
      heroOverrides: {
        0: {'salary': 100, 'politics': 15},
      },
    );
    addTearDown(original.dispose);
    final c = _month(original, gold: {1: 0});
    final saved = _save(c), restored = _restore(c, _save(c));
    expect(restored.lastSettlementFor(1)!.departureIncome, 15);
    expect(restored.lastSettlementFor(1)!.salaryDue, 100);
    expect(restored.lastSettlementFor(1)!.departedHeroes, 1);
    expect(restored.recruitPool.where((h) => h.id == 0), hasLength(1));
    expect(restored.heroes.any((h) => h.sourceId == 0), isFalse);
    final before = restored.goldFor(1);
    restored.advance(1);
    expect(restored.goldFor(1), before);
    restored.advance(59);
    expect(restored.lastSettlementFor(1)!.departureIncome, 0);
    expect(restored.lastSettlementFor(1)!.salaryDue, 0);
    expect(restored.goldFor(1), before + 20);
    for (final bill in (saved['settlements'] as Map).values) {
      (bill as List).removeRange(12, bill.length);
    }
    final legacy = _restore(c, saved).lastSettlementFor(1)!;
    expect(legacy.salaryDue, legacy.salary);
    expect(legacy.departureIncome, 0);
  });

  test('进攻将领欠薪离职释放战斗，城下候战部队继续进攻且没有虚假战败收益', () {
    final original = _game(
      sourceHeroes: [0, 2],
      targetLevel: 3,
      heroOverrides: {
        0: {'salary': 100, 'politics': 7},
        2: {'salary': 0},
        26: {'salary': 0},
      },
    );
    addTearDown(original.dispose);
    _attack(original);
    final queued = original.dispatch(
      scenarioHero(original, 2),
      original.world.cities[2],
      countryId: 1,
    )!;
    queued.position = queued.destination;
    original.advance(1 / 60);
    final c = _month(original, gold: {1: 0});
    expect(c.marches.containsKey('rom-0'), isFalse);
    expect(c.activeBattleForHero('rom-0'), isNull);
    expect(c.goldFor(1), 27);
    expect(c.lastSettlementFor(2)!.goldAfter, 20);
    expect(c.cities[2]!.level, 3);
    expect(
      c.events.retainedEvents.where((e) => e.kind == GameEventKind.heroDied),
      isEmpty,
    );
    _until(c, () => c.activeBattleForHero('rom-2') is CityBattle);
  });

  test('守将欠薪离职由下一名守将接替，不额外计算胜场或降低城防', () {
    final original = _game(
      sourceHeroes: [0],
      targetHeroes: [26, 27],
      targetLevel: 3,
      heroOverrides: {
        0: {'salary': 0},
        26: {'salary': 100, 'politics': 15, 'combat': 30},
        27: {'salary': 0, 'politics': 16, 'combat': 1},
      },
    );
    addTearDown(original.dispose);
    expect(_attack(original).defender.sourceId, 26);
    final c = _month(original, gold: {2: 0});
    final battle = c.battles[2]!;
    expect(battle.isActive, isTrue);
    expect(battle.victories, 0);
    expect(c.lastSettlementFor(2)!.departureIncome, 15);
    expect(c.lastSettlementFor(2)!.cityCount, 1);
    final resumed = _restore(c, _save(c));
    resumed.advance(1 / 60);
    expect(resumed.battles[2]!.defender.sourceId, 27);
    expect(resumed.battles[2]!.victories, 0);
    expect(resumed.battles[2]!.simulation.finished, isFalse);
    expect(resumed.cities[2]!.level, 3);
  });

  test('最后一名守将离职后空城可占领，双方当月收入先按原归属结算', () {
    final original = _game(
      sourceHeroes: [0],
      targetLevel: 3,
      heroOverrides: {
        0: {'salary': 0},
        26: {'salary': 100, 'politics': 2},
      },
    );
    addTearDown(original.dispose);
    _attack(original);
    final c = _month(original, gold: {2: 0});
    expect(c.lastSettlementFor(1)!.cityCount, 1);
    expect(c.lastSettlementFor(2)!.cityCount, 1);
    expect(c.lastSettlementFor(2)!.goldAfter, 22);
    _until(c, () => c.cities[2]!.ownerCountryId == 1);
    expect(c.activeBattleForHero('rom-0'), isNull);
    expect(scenarioHero(c, 0).cityId, 2);
    final clearing = c.events
        .forCountry(2)
        .query()
        .singleWhere((e) => e.kind == GameEventKind.treasuryCleared);
    expect(clearing.data, {'goldBefore': 22, 'goldAfter': 0});
  });

  test('交战双方同月离职，清理攻城占位且不产生幽灵占城', () {
    final original = _game(
      sourceHeroes: [0],
      targetLevel: 3,
      heroOverrides: {
        0: {'salary': 100, 'politics': 0},
        26: {'salary': 100, 'politics': 0},
      },
    );
    addTearDown(original.dispose);
    _attack(original);
    final c = _month(original, gold: {1: 0, 2: 0});
    expect(c.battles[2]!.isActive, isFalse);
    expect(c.marches, isEmpty);
    expect(_departures(c), hasLength(2));
    c.advance(2);
    expect(c.cities[2]!.ownerCountryId, 2);
    expect(c.cities[2]!.level, 3);
  });

  test('野战一方欠薪离职，另一方恢复行军，无重复死亡奖励和战斗锁', () {
    final original = _game(
      sourceHeroes: [0],
      heroOverrides: {
        0: {'salary': 100, 'politics': 5},
        26: {'salary': 0},
      },
    );
    addTearDown(original.dispose);
    final a = original.dispatchTo(
      scenarioHero(original, 0),
      const GamePoint(600, 40),
      countryId: 1,
    )!;
    final b = original.dispatchTo(
      scenarioHero(original, 26),
      const GamePoint(100, 40),
      countryId: 2,
    )!;
    a.position = const GamePoint(450, 40);
    b.position = const GamePoint(460, 40);
    original.advance(1 / 60);
    expect(original.fieldBattles.values.single.isActive, isTrue);
    final c = _month(original, gold: {1: 0});
    expect(c.fieldBattles.values.single.isActive, isFalse);
    expect(c.activeBattleForHero('rom-26'), isNull);
    expect(c.marches['rom-26']!.phase, MarchPhase.marching);
    final position = c.marches['rom-26']!.position;
    c.advance(.1);
    expect(c.marches['rom-26'], isNotNull, reason: c.journal.join('\n'));
    expect(c.marches['rom-26']!.position, isNot(position));
    expect(c.goldFor(1), 25);
    expect(
      c.events.retainedEvents.where((e) => e.kind == GameEventKind.heroDied),
      isEmpty,
    );
  });

  test('行军将领离职立即移除后台任务，归还名额且在存档中只保留一次离职记录', () {
    final original = _game(
      sourceHeroes: [0],
      heroOverrides: {
        0: {'salary': 100, 'politics': 5},
      },
    );
    addTearDown(original.dispose);
    final hero = scenarioHero(original, 0);
    original.dispatch(hero, original.world.cities[2], countryId: 1);
    final saved = _save(original);
    saved['aiEnabled'] = true;
    saved['time'][1] = 60 - 1 / 60;
    saved['gold']['1'] = 0;
    saved['ai'] = {
      'tasks': {
        hero.id: ArmyTask(
          hero: hero.id,
          role: 'expedition',
          city: 2,
          targetCountry: 2,
          deadlineTick: 999999999,
          committedUntil: 999999999,
          expectedOrderRevision: saved['orderVersions'][hero.id],
        ).toJson(),
      },
      'owners': {hero.id: 1},
      'names': {hero.id: hero.name},
      'decisions': {hero.id: 'payroll-fixture'},
      'idle': {},
      'seeds': {},
      'threats': {},
      'changedOwners': {},
      'schedules': {},
    };
    final worker = SynchronousAiWorker()..paused = true;
    final c = CampaignSnapshots.restore(
      saved,
      original.world,
      _catalog,
      aiWorkerFactory: () => worker,
    );
    addTearDown(c.dispose);
    expect(c.aiTasks, contains(hero.id));
    c.advance(1 / 60);
    expect(c.marches, isNot(contains(hero.id)));
    expect(c.aiTasks, isNot(contains(hero.id)));
    final ended = c.events
        .forCountry(1)
        .query()
        .singleWhere(
          (e) => e.kind == GameEventKind.taskEnded && e.heroId == hero.id,
        );
    expect(ended.reason, '月俸不足，将领离职');
    expect(_save(c)['ai']['owners'], isNot(contains(hero.id)));
    expect(_departures(c).where((e) => e.heroId == hero.id), hasLength(1));
  });

  test('驻城将领欠薪离职返还实际随军兵员，野外离职不凭空补入国家库存', () {
    for (final outside in [false, true]) {
      final original = _game(
        sourceHeroes: [0],
        heroOverrides: {
          0: {'salary': 100, 'politics': 5},
        },
      );
      addTearDown(original.dispose);
      original.countryTroops[1] = CountryTroops(reserveSoldiers: 4);
      final hero = scenarioHero(original, 0);
      original.reinforceHero(hero, countryId: 1);
      if (outside) {
        original.dispatchTo(hero, const GamePoint(500, 40), countryId: 1);
      }
      final c = _month(original, gold: {1: 0});
      expect(c.reserveSoldiersFor(1), outside ? 0 : 4);
      expect(c.heroes.any((h) => h.id == hero.id), isFalse);
      expect(c.recruitPool.where((h) => h.id == hero.sourceId), hasLength(1));
    }
  });
}
