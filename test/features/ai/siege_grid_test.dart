import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('建筑格子穿过后台协议保持原样，集结可以抵达紧贴墙面的相邻格', () {
    final c = nationalScenario(ai: false);
    addTearDown(c.dispose);
    final view = AiObservation.fromJson(c.aiObservationFor(1).toJson());
    final target = view.city(2)!;
    final actual = c.world.cities[2].appearanceAt(c.cities[2]!.level);
    expect(target.gridWidth, actual.width);
    expect(target.gridHeight, actual.height);
    expect(target.gridTiles, actual.tiles);
    final hero = view.garrison(1).first, rings = target.siegeRings;
    final candidates =
        [
          for (var i = 0; i < rings.slots(0); i++)
            target.center.translated(
              rings.offset(0, i).x,
              rings.offset(0, i).y,
            ),
        ]..sort(
          (a, b) =>
              a.distance(hero.position).compareTo(b.distance(hero.position)),
        );
    final point = candidates.first;
    final rules = c.aiRulesForTesting();
    final routes = AiRoutes(
      c.aiMapForTesting(),
      rules,
      AiWorkBudget(rules.tuning),
    );
    final route = routes.to(hero, point, view, stagingTarget: target);
    expect(route.complete, isTrue);
    expect(route.points.last.toJson(), point.toJson());
    final forbidden = routes.to(
      hero,
      target.center,
      view,
      stagingTarget: target,
    );
    expect(forbidden.complete, isFalse, reason: '允许终点贴墙不等于允许穿进建筑');
  });
}
