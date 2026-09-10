import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/rules_data.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/coalition_fixture.dart';

void main() {
  test('同样距离的平原可进攻，山路超出单程预算则不参与围攻', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final map = c.aiMapForTesting(), hero = view.garrison(1).first;
    final target = view.city(2)!;
    for (final terrain in [0, 2]) {
      final terrainMap = AiMap(
        map.version,
        map.width,
        map.height,
        List.filled(map.width * map.height, terrain),
      );
      final routes = AiRoutes(terrainMap, rules, AiWorkBudget(rules.tuning));
      final request = AiRequest(
        session: 'terrain',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: view,
        deadlineTick: 999999,
      );
      final planner = OperationPlanner(request, rules, routes);
      final route = routes.to(hero, target.center, view, target: target);
      expect(route.complete, isTrue);
      expect(planner.hasCoalitionFront(target), terrain == 0);
      expect(planner.canRaidFrom(hero, target), terrain == 0);
      final operation = planner.send(
        AiLedger(view, rules, routes),
        hero,
        route,
        role: 'expedition',
        reason: '验证真实地形路费',
        target: target,
      );
      expect(operation != null, terrain == 0);
    }
  });

  test('路线积分配额耗尽时不把未知远征当作可达', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    final originalRules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    final rules = AiRules.fromJson({
      ...originalRules.toJson(),
      'tuning': {...originalRules.tuning.toJson(), 'routes': 1},
    });
    final work = AiWorkBudget(rules.tuning);
    final routes = AiRoutes(c.aiMapForTesting(), rules, work);
    final planner = OperationPlanner(
      AiRequest(
        session: 'limited',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: routes.map.version,
        observation: view,
        deadlineTick: 999999,
      ),
      rules,
      routes,
    );
    expect(planner.canRaidFrom(view.garrison(1).first, view.city(2)!), isFalse);
    expect(work.limited, isTrue);
  });
}
