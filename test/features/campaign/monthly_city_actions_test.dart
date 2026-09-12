import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/national_ai_fixture.dart';

CampaignState _game() {
  final c = nationalScenario(
    ai: false,
    gold: 10000,
    friendly: true,
    friendlyLevel: 1,
    friendHeroes: [4],
    recruitment: true,
  );
  addTearDown(c.dispose);
  return c;
}

AiLedger _ledger(CampaignState c) {
  final rules = c.aiRulesForTesting();
  return AiLedger(
    AiObservation.fromJson(c.aiObservationFor(1).toJson()),
    rules,
    AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
  );
}

void main() {
  test('同国各城独立招募和升级，签约后当月不能重复购买', () {
    final c = _game();
    for (final city in [1, 3]) {
      final governor = c.garrisonAt(city).first;
      expect(c.drawHero(city, countryId: 1), isNotNull);
      expect(c.remainingHeroDraws(city), 0);
      expect(c.upgradeCity(city, hero: governor, countryId: 1), isTrue);
      final gold = c.goldFor(1), count = c.heroes.length;
      expect(c.drawHero(city, countryId: 1), isNull);
      expect(c.upgradeCity(city, hero: governor, countryId: 1), isFalse);
      expect(c.goldFor(1), gold);
      expect(c.heroes.length, count);
      expect(c.recruitmentBlockReason(city, countryId: 1), contains('本月'));
      expect(c.upgradeWindowBlockReason(city), contains('本月'));
    }
  });

  test('玩家失败或放弃不耗签约次数，成功签约只扣一次', () {
    final c = _game();
    final declined = c.drawHero(0)!;
    expect(c.declineHero(declined), isTrue);
    expect(c.remainingHeroDraws(0), 1);
    final offer = c.drawHero(0)!;
    expect(c.signHero(offer, countryId: 1), isNull);
    expect(c.remainingHeroDraws(0), 1);
    expect(c.signHero(offer), isNotNull);
    final gold = c.gold, count = c.heroes.length;
    expect(c.signHero(offer), isNull);
    expect(c.drawHero(0), isNull);
    expect(c.gold, gold);
    expect(c.heroes.length, count);
    expect(c.remainingHeroDraws(0), 0);
  });

  test('升级失败不耗次数，同城另一名将领也不能重复升级', () {
    final c = _game();
    expect(
      c.upgradeCity(1, hero: c.garrisonAt(3).first, countryId: 1),
      isFalse,
    );
    expect(c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1), isTrue);
    expect(c.upgradeCity(1, hero: c.garrisonAt(1).last, countryId: 1), isFalse);
    expect(c.cities[1]!.level, 2);
  });

  test('实际跨月含跨年重置两项次数，月结前最后一帧仍受限制', () {
    final c = _game()..settledMonths = 11;
    final governor = c.garrisonAt(1).first;
    expect(c.drawHero(1, countryId: 1), isNotNull);
    expect(c.upgradeCity(1, hero: governor, countryId: 1), isTrue);
    c.advance(59.98);
    expect(c.remainingHeroDraws(1), 0);
    expect(c.upgradeWindowBlockReason(1), contains('本月'));
    c.advance(.02);
    expect(c.year, 2);
    expect(c.month, 1);
    expect(c.drawHero(1, countryId: 1), isNotNull);
    expect(c.upgradeCity(1, hero: governor, countryId: 1), isTrue);
  });

  test('候选跨月签约占用签约月份的次数', () {
    final c = _game();
    final offer = c.drawHero(0)!;
    c.advance(60);
    expect(c.signHero(offer), isNotNull);
    expect(c.remainingHeroDraws(0), 0);
    expect(c.drawHero(0), isNull);
  });

  test('城池易主不会刷新当月两项次数', () {
    final c = _game();
    expect(c.drawHero(1, countryId: 1), isNotNull);
    expect(c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1), isTrue);
    c.cities[1]!.ownerCountryId = 0;
    expect(c.drawHero(1), isNull);
    expect(c.upgradeWindowBlockReason(1), contains('本月'));
    c.advance(60);
    expect(c.remainingHeroDraws(1), 1);
    expect(c.upgradeWindowBlockReason(1), isNull);
  });

  test('序列化续玩保留已用次数，旧档缺少次数字段仍能读取', () {
    final fixture = _game();
    final catalog = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    final c = CampaignState.fromRom(fixture.world, catalog, aiEnabled: false);
    addTearDown(c.dispose);
    c.drawHero(1, countryId: 1);
    c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1);
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    final restored = CampaignSnapshots.restore(
      saved,
      c.world,
      catalog,
      c.weaponCatalog,
    );
    addTearDown(restored.dispose);
    expect(restored.remainingHeroDraws(1), 0);
    expect(restored.upgradeWindowBlockReason(1), contains('本月'));
    expect(restored.remainingHeroDraws(3), 1);
    restored.advance(60);
    expect(restored.remainingHeroDraws(1), 1);
    expect(restored.upgradeWindowBlockReason(1), isNull);
    saved.remove('cityRecruitmentMonths');
    saved.remove('cityUpgradeMonths');
    final legacy = CampaignSnapshots.restore(
      saved,
      c.world,
      catalog,
      c.weaponCatalog,
    );
    addTearDown(legacy.dispose);
    expect(legacy.remainingHeroDraws(1), 1);
  });

  test('AI 规划与复制账本不能重复升级或招募，后续请求读取真实额度', () {
    final c = _game();
    final ledger = _ledger(c), city = c.aiObservationFor(1).city(1)!;
    final governor = ledger.view.garrison(1).first;
    expect(ledger.upgrade(city, governor), isTrue);
    expect(ledger.recruit(city, emergency: true), isTrue);
    final copy = ledger.copy(), gold = copy.gold;
    expect(copy.upgrade(city, governor), isFalse);
    expect(copy.recruit(city, emergency: true), isFalse);
    expect(copy.gold, gold);
    expect(
      copy.upgrade(copy.view.city(3)!, copy.view.garrison(3).first),
      isTrue,
    );
    c.drawHero(1, countryId: 1);
    c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1);
    final next = _ledger(c), updated = next.view.city(1)!;
    expect(updated.recruitAllowed, isFalse);
    expect(updated.upgradeAllowed, isFalse);
    expect(next.upgrade(updated, next.view.garrison(1).first), isFalse);
    expect(next.recruit(updated, emergency: true), isFalse);
  });

  test('三张地图全部敌国固定收入为10，实际月结和 AI 预算一致', () {
    final setup = CampaignSetup.decode(
      File('assets/data/campaign_config.json5').readAsStringSync(),
    );
    expect(
      setup.countries.values.every(
        (country) => country.monthlyBaseIncome == 10,
      ),
      isTrue,
    );
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: setup,
    );
    final catalog = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    for (final world in worlds) {
      final c = CampaignState.fromRom(world, catalog, aiEnabled: false);
      addTearDown(c.dispose);
      final countries = c.cities.values
          .map((city) => city.ownerCountryId)
          .toSet();
      c.advance(60);
      for (final country in countries) {
        final bill = c.lastSettlementFor(country)!;
        expect(bill.fixedIncome, 10);
        expect(c.aiObservationFor(country).nation.baseIncome, 10);
        expect(
          bill.goldAfter,
          bill.goldBefore +
              bill.baseIncome +
              bill.adjustment -
              bill.salary -
              bill.garrisonUpkeep,
        );
      }
      final saved =
          jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
      saved.remove('fixedIncomeVersion');
      for (final entry in (saved['countryConfigs'] as Map).entries) {
        if (entry.key != '0') entry.value[1] = 20;
      }
      final restored = CampaignSnapshots.restore(
        saved,
        world,
        catalog,
        c.weaponCatalog,
      );
      final replay = CampaignSnapshots.restore(
        saved,
        world,
        catalog,
        c.weaponCatalog,
        replay: true,
      );
      addTearDown(restored.dispose);
      addTearDown(replay.dispose);
      for (final country in countries.where((id) => id != 0)) {
        expect(restored.configFor(country).monthlyBaseIncome, 10);
        expect(replay.configFor(country).monthlyBaseIncome, 20);
        expect(restored.goldFor(country), c.goldFor(country));
      }
    }
  });

  test('一至五级城池收入相同，升级提升容量但不增加 AI 预测收入', () {
    final c = _game();
    final governor = c.garrisonAt(1).first;
    for (var level = 1; level <= 5; level++) {
      c.settledMonths = 24 + level;
      expect(c.cities[1]!.level, level);
      expect(c.cities[1]!.income, 20);
      expect(c.aiObservationFor(1).city(1)!.income, 20);
      final ledger = _ledger(c);
      final income = ledger.cash().poorIncome, capacity = ledger.capacity;
      if (level < 5) {
        expect(
          ledger.upgrade(ledger.view.city(1)!, ledger.view.hero(governor.id)!),
          isTrue,
        );
        expect(ledger.cash().poorIncome, income);
        expect(ledger.capacity, greaterThan(capacity));
        expect(c.upgradeCity(1, hero: governor, countryId: 1), isTrue);
      }
      c.advance(60);
      expect(c.lastSettlementFor(1)!.baseIncome, 50);
    }
  });
}
