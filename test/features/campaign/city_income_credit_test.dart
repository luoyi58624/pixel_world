import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/core/persistence/state_random.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
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
  int? regularSalary,
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
  var catalog = _heroes;
  if (regularSalary != null) {
    final data = jsonDecode(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    for (final row in data['heroes']) {
      if (row['type'] != 'protagonist') row['salary'] = regularSalary;
    }
    catalog = decodeRomHeroes(jsonEncode(data));
  }
  final c = CampaignState.fromRom(
    world,
    catalog,
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
  test('正常50%、丰欠收各25%，丰欠收幅度均包含5至10，正常不抽幅度', () {
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
    for (var value = 0; value < 6; value++) {
      final abundant = _Sequence([value]), poor = _Sequence([value]);
      expect(Harvest.abundant.drawAdjustment(abundant), 5 + value);
      expect(Harvest.poor.drawAdjustment(poor), -5 - value);
      expect(abundant.bounds, [6]);
      expect(poor.bounds, [6]);
    }
  });

  test('正式JSON逐国配置10至30保底，阿尔玛为10，一级城市产出20', () {
    final raw = jsonDecode(
      File('assets/data/campaign_config.json5').readAsStringSync(),
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

  test('同国三城统一丰收一次，另一国家独立欠收，明细与日志可对账', () {
    final random = _Sequence([3, 5, 2, 0]);
    final c = _game(cities: 3, random: random);
    c.advance(60);
    final bill = c.lastSettlementFor(0)!;
    expect(bill.fixedIncome, 10);
    expect(bill.baseIncome, 70);
    expect(bill.adjustment, 10);
    expect(bill.harvest, Harvest.abundant);
    expect(bill.harvestLabel, '丰收');
    expect(bill.cityIncomes.map((b) => b.harvest), [
      Harvest.normal,
      Harvest.normal,
      Harvest.normal,
    ]);
    expect(bill.cityIncomes.map((b) => b.income), [20, 20, 20]);
    expect(c.gold, 100 + 80 - c.salaryCost);
    expect(c.lastSettlementFor(1)!.harvest, Harvest.poor);
    expect(c.lastSettlementFor(1)!.adjustment, -5);
    expect(random.bounds, [4, 6, 4, 6]);
    final event = c.events
        .forCountry(0)
        .query()
        .lastWhere((e) => e.kind == GameEventKind.monthSettled);
    expect(event.data['cities'], [
      for (final city in bill.cityIncomes) city.toJson(),
    ]);
    expect(event.data['fixedIncome'], 10);
    expect(event.data['income'], 80);
    expect(event.data['adjustment'], 10);
    expect(event.data['harvestScope'], 'country');
    expect(event.data['economyVersion'], 3);
    expect(c.aiObservationFor(0).nation.baseIncome, 10);
    expect(c.aiBudgetFor(0).minimumMonthlyIncome, 60);
    expect(c.aiObservationFor(0).nation.poorIncome, 60);
  });

  test('城池数量不放大丰欠收，AI 不对已放弃或无城国家重复扣欠收', () {
    for (final count in [1, 3, 8]) {
      for (final (roll, adjustment) in [(0, 0), (2, -10), (3, 10)]) {
        final random = _Sequence(roll == 0 ? [0, 0] : [roll, 5, 0]);
        final c = _game(cities: count, random: random);
        final rules = c.aiRulesForTesting(), view = c.aiObservationFor(0);
        final ledger = AiLedger(
          view,
          rules,
          AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
        );
        expect(ledger.cash().poorIncome, 20 * count);
        expect(view.nation.poorIncome, 20 * count);
        ledger.abandoned.add(0);
        expect(ledger.cash().poorIncome, 20 * (count - 1));
        ledger.abandoned.addAll(view.owned.map((city) => city.id));
        expect(ledger.cash().poorIncome, 0);
        expect(random.bounds, isEmpty);
        c.advance(60);
        expect(c.lastSettlementFor(0)!.adjustment, adjustment);
        expect(c.lastSettlementFor(0)!.baseIncome, 10 + 20 * count);
        expect(random.bounds, roll == 0 ? [4, 4] : [4, 6, 4]);
      }
    }
  });

  test('升级不增加产出，国家欠收最多扣10，预算不抽取随机数', () {
    final random = _Sequence([]);
    final c = _game(gold: 1000, random: random)..settledMonths = 24;
    final governor = c.garrisonAt(0).first;
    for (var level = 1; level <= 5; level++) {
      c.settledMonths++;
      if (level > 1) expect(c.upgradeCity(0, hero: governor), isTrue);
      final city = c.cities[0]!;
      expect(city.income, 20);
      expect(c.grossIncome, 10 + city.income);
      expect(c.aiBudgetFor(0).minimumMonthlyIncome, 20);
    }
    expect(random.bounds, isEmpty);
  });

  test('欠收抵扣保底及工资可令国库为负，不因为欠款触发游戏失败', () {
    final c = _game(gold: 1, regularSalary: 12, random: _Sequence([2, 5, 0]));
    c.advance(60);
    expect(c.lastSettlementFor(0)!.cityIncomes.single.income, 20);
    expect(c.lastSettlementFor(0)!.adjustment, -10);
    expect(c.lastSettlementFor(0)!.netIncome, 20 - c.salaryCost);
    expect(c.gold, 21 - c.salaryCost);
    expect(c.gold, isNegative);
    expect(c.defeated, isFalse);
  });

  test('补兵最多花完余额，零余额不能购买，行军扎营仍免费', () {
    final c = _game(gold: 1, random: _Sequence([]));
    c.countryTroops[0] = CountryTroops();
    expect(c.maxSoldierPurchase(0), 1);
    expect(c.buySoldiers(0, 4), isFalse);
    expect(c.gold, 1);
    expect(c.reserveSoldiersFor(0), 0);
    expect(c.buySoldiers(0, 1), isTrue);
    expect(c.gold, 0);
    expect(c.maxSoldierPurchase(0), 0);
    expect(c.buySoldiers(0, 1), isFalse);
    expect(c.buyWeapon(0), isFalse);
    expect(c.drawHero(0), isNull);
    final hero = c.garrisonAt(0).first;
    expect(c.upgradeCity(0, hero: hero), isFalse);
    final march = c.dispatchTo(hero, const GamePoint(1900, 200))!;
    final start = march.position;
    c.advance(10);
    expect(c.gold, 0);
    expect(march.position, isNot(start));
    expect(march.phase, MarchPhase.marching);
    expect(march.supplyHalted, isFalse);
    expect(c.camp(hero.id), isTrue);
    final camp = march.position;
    c.advance(10);
    expect(c.gold, 0);
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

  test('月结负债后所有购买停止，但已有军队可继续行军', () {
    final c = _game(gold: 0, regularSalary: 12, random: _Sequence([2, 5, 0]));
    c.advance(60);
    expect(c.gold, 20 - c.salaryCost);
    expect(c.gold, isNegative);
    final soldiers = c.reserveSoldiersFor(0), people = c.heroes.length;
    final hero = c.garrisonAt(0).first;
    expect(c.maxSoldierPurchase(0), 0);
    expect(c.buySoldiers(0, 1), isFalse);
    expect(c.buyWeapon(0), isFalse);
    expect(c.drawHero(0), isNull);
    expect(c.upgradeCity(0, hero: hero), isFalse);
    expect(c.gold, 20 - c.salaryCost);
    expect(c.reserveSoldiersFor(0), soldiers);
    expect(c.heroes.length, people);
    final march = c.dispatchTo(hero, const GamePoint(1900, 200))!;
    final start = march.position;
    c.advance(10);
    expect(march.position, isNot(start));
    expect(c.gold, 20 - c.salaryCost);
  });

  test('抽将后余额不足不能签约，候选与国库保持原状', () {
    final c = _game(gold: 5, random: _Sequence([]));
    final offer = c.drawHero(0)!;
    expect(c.gold, 0);
    expect(c.canSignHero(offer), isFalse);
    expect(c.signHero(offer), isNull);
    expect(c.recruitmentOffer, same(offer));
    expect(c.gold, 0);
  });

  test('AI零余额不补兵、不招将也不买武器', () {
    final c = _game(gold: 0, ai: true, random: _Sequence([]));
    c.countryTroops[0] = CountryTroops();
    expect(c.buySoldiers(0, 1), isFalse);
    for (var n = 0; n < 6; n++) {
      c.advance(1);
    }
    expect(c.reserveSoldiersFor(0), 0);
    expect(c.gold, 0);
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

  test('只防守的验收玩家只补买得起的士兵，不透支或改变军队规模', () {
    final c = _game(gold: 2, random: _Sequence([]));
    c.countryTroops[0] = CountryTroops();
    final count = c.heroes.length;
    DefensiveCommander().decide(c, 0);
    expect(c.reserveSoldiersFor(0), 2);
    expect(c.gold, 0);
    DefensiveCommander().decide(c, 5);
    expect(c.reserveSoldiersFor(0), 2);
    expect(c.gold, 0);
    expect(c.heroes.length, count);
    expect(c.marches, isEmpty);
  });

  test('最近版本旧档更新指定月俸，不追扣历史工资，回放保留旧值', () {
    final c = _game(gold: 77);
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    saved['payrollVersion'] = 1;
    for (final hero in saved['people'] as List) {
      hero['salary'] = 5;
    }
    final copy = CampaignSnapshots.restore(saved, c.world, _heroes, _weapons);
    final replay = CampaignSnapshots.restore(
      saved,
      c.world,
      _heroes,
      _weapons,
      replay: true,
    );
    addTearDown(copy.dispose);
    addTearDown(replay.dispose);
    for (final entry in {
      for (final h in _heroes.where((h) => [40, 0, 2, 1].contains(h.id)))
        h.id: h.salary,
    }.entries) {
      expect(
        copy.heroes.firstWhere((h) => h.sourceId == entry.key).salary,
        entry.value,
      );
      expect(
        replay.heroes.firstWhere((h) => h.sourceId == entry.key).salary,
        5,
      );
    }
    expect(copy.salaryCost, c.salaryCost);
    expect(copy.gold, 77);
    expect(copy.saveState()['payrollVersion'], 2);
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

  test('旧版混合收成历史原样恢复，下次月结使用国家统一收成', () {
    final c = _game(cities: 3, random: StateRandom(42));
    c.advance(60);
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    final history = saved['settlements']['0'] as List;
    history[2] = null;
    history[5] = -25;
    history[9] = history[8] + history[4] - 25 - history[6] - history[7];
    saved['gold']['0'] = history[9];
    final cities = history[11] as List;
    cities[1].addAll({'harvest': 'abundant', 'adjustment': 5, 'income': 25});
    cities[2].addAll({'harvest': 'poor', 'adjustment': -30, 'income': -10});
    final restored = CampaignSnapshots.restore(
      saved,
      c.world,
      _heroes,
      _weapons,
    );
    addTearDown(restored.dispose);
    expect(restored.lastSettlementFor(0)!.harvest, isNull);
    expect(jsonDecode(jsonEncode(restored.saveState())), saved);
    restored.advance(60);
    expect(restored.lastSettlementFor(0)!.harvest, isNotNull);
    expect(
      restored.lastSettlementFor(0)!.adjustment,
      inInclusiveRange(-10, 10),
    );
    expect(
      restored
          .lastSettlementFor(0)!
          .cityIncomes
          .every((city) => city.adjustment == 0),
      isTrue,
    );
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
    expect(random.bounds, [4]);
  });
}
