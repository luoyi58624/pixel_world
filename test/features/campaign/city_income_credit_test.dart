import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/core/persistence/state_random.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/economy/domain/economy.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/simulation/defensive_commander.dart';

class _Sequence implements Random {
  _Sequence(this.values);
  final List<int> values;
  int index = 0;
  final bounds = <int>[];
  @override
  int nextInt(int max) {
    bounds.add(max);
    final n = index < values.length ? values[index++] : 0;
    if (n < 0 || n >= max) throw StateError('非法随机夹具 $n / $max');
    return n;
  }

  @override
  double nextDouble() => 0;
  @override
  bool nextBool() => false;
}

final _heroes = decodeRomHeroes(
  File('assets/data/rom_heroes.json').readAsStringSync(),
);
final _weapons = WeaponCatalog.decode(
  File('assets/data/rom_weapons.json').readAsStringSync(),
);

CampaignState _game({
  int cities = 1,
  int gold = 100,
  int base = 10,
  Random? random,
  bool ai = false,
}) {
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 128,
      'height': 40,
      'tiles': List.filled(128 * 40, 0),
      'cities': [
        for (var id = 0; id <= cities; id++)
          {
            'id': id,
            'name': '城$id',
            'x': id == cities ? 100 : 5 + id * 8,
            'y': 15,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialLevel': 1,
            'initialOwnerId': id == cities ? 1 : 0,
            'unitIds': id == 0
                ? [40, 0, 2]
                : id == cities
                ? [1]
                : <int>[],
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final c = CampaignState.fromRom(
    world,
    _heroes,
    weaponCatalog: _weapons,
    aiEnabled: ai,
    aiControlsPlayer: ai,
    aiWorkerFactory: SynchronousAiWorker.new,
    economyRandom: random,
    countryConfigs: {
      0: CountryConfig(initialGold: gold, monthlyBaseIncome: base),
      1: const CountryConfig(initialGold: 100, monthlyBaseIncome: 30),
    },
  );
  addTearDown(c.dispose);
  return c;
}

void main() {
  test('正常50%、丰欠收各25%，随机增减包含5和30，正常不抽幅度', () {
    final counts = {for (final h in Harvest.values) h: 0};
    for (var i = 0; i < 100; i++) {
      counts.update(Harvest.draw(_Sequence([i % 4])), (n) => n + 1);
    }
    expect(counts, {
      Harvest.normal: 50,
      Harvest.poor: 25,
      Harvest.abundant: 25,
    });
    final normal = _Sequence([]);
    expect(Harvest.normal.drawAdjustment(normal), 0);
    expect(normal.bounds, isEmpty);
    for (var value = 0; value < 26; value++) {
      expect(Harvest.abundant.drawAdjustment(_Sequence([value])), 5 + value);
      expect(Harvest.poor.drawAdjustment(_Sequence([value])), -5 - value);
    }
  });

  test('正式JSON逐国配置10至30保底，阿尔玛为10，一级城市产出20', () {
    final raw = jsonDecode(
      File('assets/data/campaign_config.json').readAsStringSync(),
    );
    final setup = CampaignSetup.decode(jsonEncode(raw));
    expect(setup.countries[0]!.monthlyBaseIncome, 10);
    expect(
      setup.countries.values.every(
        (c) => c.monthlyBaseIncome >= 10 && c.monthlyBaseIncome <= 30,
      ),
      isTrue,
    );
    expect(setup.cities.values.every((c) => c.baseIncome == 20), isTrue);
    for (final bad in [9, 31, 10.5, '20', null]) {
      final copy = jsonDecode(jsonEncode(raw));
      copy['countries'][0]['monthlyBaseIncome'] = bad;
      expect(
        () => CampaignSetup.decode(jsonEncode(copy)),
        throwsFormatException,
      );
    }
  });

  test('同国三城独立收成，国家保底只发一次，逐城账目与日志可对账', () {
    final random = _Sequence([0, 3, 0, 2, 25, 0]);
    final c = _game(cities: 3, random: random);
    c.advance(60);
    final bill = c.lastSettlementFor(0)!;
    expect(bill.fixedIncome, 10);
    expect(bill.baseIncome, 70);
    expect(bill.adjustment, -25);
    expect(bill.harvest, isNull);
    expect(bill.harvestLabel, '各城收成不同');
    expect(bill.cityIncomes.map((b) => b.harvest), [
      Harvest.normal,
      Harvest.abundant,
      Harvest.poor,
    ]);
    expect(bill.cityIncomes.map((b) => b.income), [20, 25, -10]);
    expect(c.gold, 100 + 45 - 15);
    expect(random.bounds, [4, 4, 26, 4, 26, 4]);
    final event = c.events
        .forCountry(0)
        .query()
        .lastWhere((e) => e.kind == GameEventKind.monthSettled);
    expect(event.data['cities'], [
      for (final city in bill.cityIncomes) city.toJson(),
    ]);
    expect(event.data['fixedIncome'], 10);
    expect(event.data['income'], 45);
    expect(c.aiObservationFor(0).nation.baseIncome, 10);
    expect(c.aiBudgetFor(0).minimumMonthlyIncome, -20);
  });

  test('升级每级增加5，极端欠收不截断城池负收入，预算不抽取随机数', () {
    final random = _Sequence([]);
    final c = _game(gold: 1000, random: random)..settledMonths = 24;
    final governor = c.garrisonAt(0).first;
    for (var level = 1; level <= 5; level++) {
      if (level > 1) expect(c.upgradeCity(0, hero: governor), isTrue);
      final city = c.cities[0]!;
      expect(city.income, 20 + (level - 1) * 5);
      expect(city.incomeFor(Harvest.poor), city.income - 30);
      expect(c.grossIncome, 10 + city.income);
      expect(c.aiBudgetFor(0).minimumMonthlyIncome, 10 + city.income - 30);
    }
    expect(random.bounds, isEmpty);
  });

  test('欠收抵扣保底及工资可令国库为负，不因为欠款触发游戏失败', () {
    final c = _game(gold: 1, random: _Sequence([2, 25, 0]));
    c.advance(60);
    expect(c.lastSettlementFor(0)!.cityIncomes.single.income, -10);
    expect(c.lastSettlementFor(0)!.netIncome, -15);
    expect(c.gold, -14);
    expect(c.defeated, isFalse);
  });

  test('补兵允许透支、行军扎营免费，但招将武器及升级不允许透支', () {
    final c = _game(gold: 1, random: _Sequence([]));
    c.countryTroops[0] = CountryTroops();
    expect(c.buySoldiers(0, 4), isTrue);
    expect(c.gold, -3);
    expect(c.maxSoldierPurchase(0), c.reserveCapacityFor(0) - 4);
    expect(c.buyWeapon(0), isFalse);
    expect(c.drawHero(0), isNull);
    final hero = c.garrisonAt(0).first;
    expect(c.upgradeCity(0, hero: hero), isFalse);
    final march = c.dispatchTo(hero, const GamePoint(1900, 200))!;
    final start = march.position;
    c.advance(10);
    expect(c.gold, -3);
    expect(march.position, isNot(start));
    expect(march.phase, MarchPhase.marching);
    expect(march.supplyHalted, isFalse);
    expect(c.camp(hero.id), isTrue);
    final camp = march.position;
    c.advance(10);
    expect(c.gold, -3);
    expect(march.position, camp);
    expect(c.moveTo(hero.id, const GamePoint(1800, 200)), isTrue);
    c.advance(1);
    expect(march.position, isNot(camp));
  });

  test('旧存档粮草欠账不补扣、断粮标记不阻止恢复行军', () {
    final c = _game(gold: 0);
    final march = c.dispatchTo(
      c.garrisonAt(0).first,
      const GamePoint(1900, 200),
    )!;
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    for (final hero in saved['people'] as List) {
      hero['supply'] = 99.9;
    }
    final old = (saved['marches'] as List).single;
    old['halted'] = true;
    old['phase'] = MarchPhase.camped.index;
    final copy = CampaignSnapshots.restore(saved, c.world, _heroes, _weapons);
    addTearDown(copy.dispose);
    final restored = copy.marches[march.hero.id]!;
    final origin = restored.position;
    copy.advance(20);
    expect(copy.gold, 0);
    expect(restored.supplyHalted, isFalse);
    expect(restored.position, isNot(origin));
    expect(
      copy.events
          .forCountry(0)
          .query()
          .where((e) => e.kind == GameEventKind.supplyPaid),
      isEmpty,
    );
  });

  test('AI资源计划可在负国库补已有守军，不额外招将或买武器', () {
    final c = _game(gold: 0, ai: true, random: _Sequence([]));
    c.countryTroops[0] = CountryTroops();
    expect(c.buySoldiers(0, 1), isTrue);
    for (var n = 0; n < 6; n++) {
      c.advance(1);
    }
    expect(c.reserveSoldiersFor(0), greaterThan(1));
    expect(c.gold, lessThan(-1));
    final events = c.events.forCountry(0).query();
    expect(
      events.where(
        (e) =>
            e.kind == GameEventKind.heroSigned ||
            e.kind == GameEventKind.weaponPurchased,
      ),
      isEmpty,
    );
  });

  test('只防守的验收玩家也可透支补兵，不因此出击或多招将', () {
    final c = _game(gold: 0, random: _Sequence([]));
    c.countryTroops[0] = CountryTroops();
    final count = c.heroes.length;
    DefensiveCommander().decide(c, 0);
    expect(c.reserveSoldiersFor(0), 12);
    expect(c.gold, -12);
    expect(c.heroes.length, count);
    expect(c.marches, isEmpty);
  });

  test('不同国家保底与逐城账单在存档恢复后保持，跨月不重抽旧收成', () {
    final c = _game(base: 13)..advance(60);
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    final copy = CampaignSnapshots.restore(saved, c.world, _heroes, _weapons);
    addTearDown(copy.dispose);
    expect(copy.configFor(0).monthlyBaseIncome, 13);
    expect(
      copy.lastSettlementFor(0)!.cityIncomes.map((s) => s.toJson()),
      c.lastSettlementFor(0)!.cityIncomes.map((s) => s.toJson()),
    );
    c.advance(120);
    copy.advance(120);
    expect(copy.gold, c.gold);
    expect(
      copy.lastSettlementFor(0)!.cityIncomes.map((s) => s.toJson()),
      c.lastSettlementFor(0)!.cityIncomes.map((s) => s.toJson()),
    );
  });

  test('混合收成快照保留空的全国收成标签与所有逐城历史', () {
    final c = _game(cities: 3, random: StateRandom(42));
    for (var month = 0; month < 12; month++) {
      c.advance(60);
      if (c.lastSettlementFor(0)!.harvest == null) break;
    }
    expect(c.lastSettlementFor(0)!.harvest, isNull);
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    final restored = CampaignSnapshots.restore(
      saved,
      c.world,
      _heroes,
      _weapons,
    );
    addTearDown(restored.dispose);
    expect(restored.lastSettlementFor(0)!.harvest, isNull);
    expect(jsonDecode(jsonEncode(restored.saveState())), saved);
  });

  test('无城国家不再领取月保底或生成虚构城池收成', () {
    final random = _Sequence([]);
    final c = _game(random: random);
    c.cities[1]!.ownerCountryId = 0;
    c.heroes.removeWhere((h) => h.countryId == 1);
    c.advance(60);
    final bill = c.lastSettlementFor(1)!;
    expect(bill.cityCount, 0);
    expect(bill.fixedIncome, 0);
    expect(bill.baseIncome, 0);
    expect(bill.adjustment, 0);
    expect(bill.cityIncomes, isEmpty);
    expect(c.goldFor(1), 100);
    expect(random.bounds, [4, 4]);
  });
}
