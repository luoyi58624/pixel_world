import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/weapon_strategy_fixture.dart';

void main() {
  test('主力选择强击手而非死枪，整队预算也按实际配装报价', () {
    final c = weaponStrategyCampaign(
      gold: 500,
      sourceLevel: 5,
      sourceHeroes: [0, 2, 3, 4, 5, 18],
      targetLevel: 5,
      targetHeroes: [24, 26],
    );
    addTearDown(c.dispose);
    c.settledMonths = 48;
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    expect(rules.weapons[13]!.price, 15);
    expect(rules.weapons[13]!.damage, 85);
    expect(rules.weapons[14]!.price, 16);
    final work = AiWorkBudget(rules.tuning),
        routes = AiRoutes(
          c.aiMapForTesting(),
          rules,
          AiWorkBudget(rules.tuning),
        );
    final ledger = AiLedger(view, rules, routes);
    final request = AiRequest(
      session: 'siege-weapons',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: routes.map.version,
      observation: view,
      deadlineTick: 6000,
    );
    final planner = OperationPlanner(request, rules, routes);
    expect(
      planner.raidLoadouts(
        view.hero('rom-2')!,
        ledger,
        view.city(2)!,
        CombatAssessor(rules, work),
      ),
      [
        [13],
      ],
    );
    expect(
      planner.raidTeamSize(1, view.city(2)!, ledger),
      4,
      reason: '单件强击手降至15金币，同样国库可负担原有四将编队上限',
    );
    expect(planner.desiredAssaultHeroes(ledger), 4);
  });

  test('资源决策真实购买第五年强击手，不给攻城高级将领买同归于尽武器', () {
    final c = weaponStrategyCampaign(
      gold: 2000,
      sourceLevel: 5,
      sourceHeroes: [0, 2, 3, 4, 5, 18],
      targetLevel: 5,
      targetHeroes: [24, 26],
    );
    addTearDown(c.dispose);
    c.settledMonths = 48;
    final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
    final brain = CountryBrain(
      rules,
      map,
      AiRequest(
        session: 'purchase',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: c.aiObservationFor(1),
        stage: AiDecisionStage.resources,
        deadlineTick: 6000,
      ),
    );
    for (final _ in brain.steps()) {}
    final purchases = brain.result!.groups
        .expand((g) => g.actions)
        .where((a) => a.kind == AiActionKind.buyWeapon);
    expect(
      purchases.any((a) => a.amount == 13),
      isTrue,
      reason: brain.result!.toJson().toString(),
    );
    expect(purchases.any((a) => a.amount == 14), isFalse);
  });
}
