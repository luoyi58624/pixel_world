import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('四档城防基础费用为30、60、80、100，实付继续扣除内政', () {
    final c = nationalScenario(
      ai: false,
      level: 1,
      gold: 1000,
      overrides: {
        0: {'politics': 15},
      },
    );
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).firstWhere((h) => h.sourceId == 0);
    final rules = c.aiRulesForTesting();
    const costs = [30, 60, 80, 100];
    expect(GameConfig.cityUpgradeCosts, costs);
    expect(rules.upgradeCosts, costs);
    for (var level = 1; level <= 4; level++) {
      final cost = costs[level - 1] - hero.politics;
      expect(c.cities[1]!.baseUpgradeCost, costs[level - 1]);
      expect(c.upgradeCostFor(1, hero, countryId: 1), cost);
      expect(rules.upgradeCost(level, hero.politics), cost);
      final before = c.goldFor(1);
      expect(c.upgradeCity(1, hero: hero, countryId: 1), isTrue);
      expect(c.goldFor(1), before - cost);
      expect(c.cities[1]!.level, level + 1);
    }
    expect(c.goldFor(1), 790);
    expect(c.cities[1]!.baseUpgradeCost, isNull);
    expect(c.cities[1]!.income, 40);
    expect(c.upgradeCity(1, hero: hero, countryId: 1), isFalse);
  });

  test('每档AI升级都必须在支付新费用后仍有余额', () {
    for (var level = 1; level <= 4; level++) {
      final c = nationalScenario(
        ai: false,
        level: level,
        gold: 1000,
        overrides: {
          0: {'politics': 15},
        },
      );
      addTearDown(c.dispose);
      final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
      final ledger = AiLedger(
        view,
        rules,
        AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      );
      final city = view.city(1)!, governor = view.hero('rom-0')!;
      final cost = [15, 45, 65, 85][level - 1];
      ledger.gold = cost;
      expect(ledger.upgrade(city, governor), isFalse);
      expect(ledger.gold, cost);
      ledger.gold = cost + 1;
      expect(ledger.upgrade(city, governor), isTrue);
      expect(ledger.gold, 1);
    }
  });
}
