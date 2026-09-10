import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/world_map/domain/territory.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/threats.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('三图每座城属于自身辖区，格子全部覆盖且同图缓存复用', () {
    for (final world in decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
    )) {
      final map = TerritoryMap(world);
      expect(TerritoryMap(world), same(map));
      for (final city in world.cities) {
        expect(
          map.regionAt(
            GamePoint(
              (city.x + city.width ~/ 2) * 16.0 + 8,
              (city.y + city.height ~/ 2) * 16.0 + 8,
            ),
          ),
          city.id,
        );
      }
      final ids = world.cities.map((c) => c.id).toSet();
      for (var y = 0; y < world.height; y++) {
        for (var x = 0; x < world.width; x++) {
          expect(
            ids.contains(map.regionAt(GamePoint(x * 16.0 + 8, y * 16.0 + 8))),
            isTrue,
          );
        }
      }
      expect(map.regionAt(const GamePoint(-1, 0)), isNull);
      final borders = map.borders({
        for (final c in world.cities) c.id: c.initialOwnerId,
      });
      expect(borders, isNotEmpty);
      expect(map.borders({for (final c in world.cities) c.id: 0}), isEmpty);
    }
  });

  test('越境即触发本国事件和防守观察，在辖区停留不会每帧重复记录', () {
    final c = nationalScenario(ai: false, guards: [0, 18], level: 2);
    addTearDown(c.dispose);
    final attacker = c.heroes.firstWhere((h) => h.sourceId == 40);
    final city = c.world.cities[1];
    final point = c.cityBounds(city).center + const GamePoint(140, 0);
    expect(c.territoryOwnerAt(point), 1);
    final march = c.dispatchTo(attacker, point)!;
    march.position = point;
    march.camp();
    c.advance(1 / 60);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final work = AiWorkBudget(rules.tuning);
    final report = ThreatAnalyzer(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, work),
      CombatAssessor(rules, work),
    ).report(view.city(1)!);
    expect(report.threatened, isTrue);
    expect(report.incoming.any((a) => a.hero.id == attacker.id), isTrue);
    c.advance(1);
    expect(
      c.events.retainedEvents
          .where(
            (e) =>
                e.kind == GameEventKind.territoryEntered &&
                e.countryId == 1 &&
                e.heroId == attacker.id,
          )
          .length,
      1,
    );
    c.cities[1]!.ownerCountryId = 2;
    expect(c.territoryOwnerAt(point), 2);
    c.advance(1 / 60);
    expect(
      c.events.retainedEvents
          .where(
            (e) =>
                e.kind == GameEventKind.territoryEntered &&
                e.countryId == 2 &&
                e.heroId == attacker.id,
          )
          .length,
      1,
    );
  });
}
