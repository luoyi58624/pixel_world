import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/raid_assessment.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  final originalConfig = GameConfig.toJson();
  setUp(
    () => GameConfig.loadJson(
      File('assets/data/game_config.json5').readAsStringSync(),
    ),
  );
  tearDown(() => GameConfig.loadMap(Map<String, dynamic>.from(originalConfig)));

  test('九城二十七将可以组队进攻，不能要求每个人都能单挑五级城', () {
    final c = nationalScenario(ai: false, guards: [0, 4, 5], gold: 600);
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final home = original.city(1)!, target = original.city(2)!;
    final cities = <AiCity>[];
    final heroes = <AiHero>[];
    for (var n = 0; n < 9; n++) {
      final point = AiPoint(120.0 + (n % 3) * 320, 100.0 + (n ~/ 3) * 220);
      final delta = AiPoint(point.x - home.center.x, point.y - home.center.y);
      final city = AiCity.fromJson({
        ...home.toJson(),
        'id': 10 + n,
        'level': 5,
        'xy': point.toJson(),
        'outline': [
          for (final p in home.outline.points)
            p.translated(delta.x, delta.y).toJson(),
        ],
      });
      cities.add(city);
      for (var h = 0; h < 3; h++) {
        heroes.add(
          AiHero.fromJson({
            ...original.garrison(1)[h].toJson(),
            'id': 'empire-$n-$h',
            'home': city.id,
            'xy': point.toJson(),
            'hp': 95.0,
            'max': 95,
            'a': 15,
            'p': 0,
            'pay': 0,
          }),
        );
      }
    }
    final enemy = AiCity.fromJson({...target.toJson(), 'level': 5});
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'cities': [...cities.map((c) => c.toJson()), enemy.toJson()],
      'heroes': [
        ...heroes.map((h) => h.toJson()),
        {
          ...original.garrison(2).first.toJson(),
          'hp': 95.0,
          'max': 95,
          'a': 15,
        },
      ],
      'countries': [
        for (final nation in original.countries)
          {
            ...nation.toJson(),
            if (nation.id == 1) 'reserves': 120,
            if (nation.id == 1) 'capacity': 240,
          },
      ],
    });
    final brain = CountryBrain(
      rules,
      c.aiMapForTesting(),
      AiRequest(
        session: 'empire',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: c.aiMapForTesting().version,
        observation: view,
        deadlineTick: 999999,
        stage: AiDecisionStage.attack,
      ),
    );
    for (final _ in brain.steps()) {}
    final tasks = brain.result!.groups
        .expand((g) => g.tasks)
        .where((t) => t.role == 'expedition')
        .toList();
    expect(
      tasks.length,
      greaterThanOrEqualTo(2),
      reason: brain.result!.toJson().toString(),
    );
    expect(tasks.map((t) => t.hero).toSet().length, tasks.length);
    expect(tasks.every((t) => t.city == enemy.id), isTrue);
  });

  test('单将处于劣势时仍能估算整队需求，悬殊到四将也不够则拒绝', () {
    final c = nationalScenario(ai: false, guards: [0, 4, 5]);
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final map = c.aiMapForTesting();
    final original = view.garrison(1).first;
    final hero = AiHero.fromJson({
      ...original.toJson(),
      'a': 15,
      'hp': 95.0,
      'max': 95,
    });
    final target = AiCity.fromJson({...view.city(2)!.toJson(), 'level': 5});
    final modified = AiObservation.fromJson({
      ...view.toJson(),
      'cities': [
        for (final city in view.cities)
          city.id == target.id ? target.toJson() : city.toJson(),
      ],
    });
    final work = AiWorkBudget(rules.tuning);
    final risk = assessRaid(
      hero,
      target,
      modified,
      rules,
      CombatAssessor(rules, work),
    );
    expect(risk.teamSize, inInclusiveRange(2, rules.tuning.maxTeam));
    final weak = AiHero.fromJson({
      ...hero.toJson(),
      'a': 1,
      'hp': 10.0,
      'max': 10,
    });
    expect(
      assessRaid(
        weak,
        target,
        modified,
        rules,
        CombatAssessor(rules, work),
      ).teamSize,
      0,
    );
    final ledger = AiLedger(modified, rules, AiRoutes(map, rules, work));
    expect(ledger.gold, greaterThan(0));
  });
}
