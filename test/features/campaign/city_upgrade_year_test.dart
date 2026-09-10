import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/rules_data.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('同月连续升级遵守逐年上限：第一年三级、第二年四级、第三年五级', () {
    final c = nationalScenario(ai: false, level: 1, gold: 10000);
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    c.settledMonths = 0;
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isTrue);
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isTrue);
    expect(c.cities[1]!.level, 3);
    final balance = c.goldFor(1), capacity = c.reserveCapacityFor(1);
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isFalse);
    expect(c.goldFor(1), balance);
    expect(c.reserveCapacityFor(1), capacity);
    expect(c.upgradeWindowBlockReason(1), '第 2 年可升至 4 级');
    c.settledMonths = 11;
    c.advance(59.99);
    expect(c.year, 1);
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isFalse);
    c.advance(.01);
    expect(c.year, 2);
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isTrue);
    expect(c.cities[1]!.level, 4);
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isFalse);
    c.settledMonths = 24;
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isTrue);
    expect(c.cities[1]!.level, 5);
    c.settledMonths = 120;
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isFalse);
  });

  test('初始四级城不降级，也不能在第三年前继续升五级', () {
    final c = nationalScenario(ai: false, level: 4, gold: 10000);
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    for (final month in [0, 12]) {
      c.settledMonths = month;
      expect(c.cities[1]!.level, 4);
      expect(c.upgradeCity(1, hero: hero, countryId: 1), isFalse);
    }
    c.settledMonths = 24;
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isTrue);
  });

  test('AI 序列化规则和候选账本同样限制连续升级，不能用多条命令突破年限', () {
    final c = nationalScenario(ai: false, level: 1, gold: 10000);
    addTearDown(c.dispose);
    final rules = AiRules.fromJson(c.aiRulesForTesting().toJson());
    for (final (year, limit) in [(1, 3), (2, 4), (3, 5), (10, 5)]) {
      c.settledMonths = (year - 1) * 12;
      final view = c.aiObservationFor(1), city = c.aiObservationFor(1).city(1)!;
      final ledger = AiLedger(
        view,
        rules,
        AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      );
      expect(rules.cityUpgradeLimit(year), c.cityUpgradeLevelLimit);
      final hero = view.garrison(1).first;
      for (var n = 1; n < limit; n++) {
        expect(ledger.upgrade(city, hero), isTrue);
      }
      final balance = ledger.gold;
      expect(ledger.upgrade(city, hero), isFalse);
      expect(ledger.gold, balance);
      expect(ledger.levels[1], limit);
    }
  });
}
