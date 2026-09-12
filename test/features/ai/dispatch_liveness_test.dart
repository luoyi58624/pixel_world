import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/offensive_focus.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('后方多名弱将也全部前移，不因单将不足以攻城而留在后城', () {
    final c = nationalScenario(
      ai: false,
      rearEmpire: true,
      guards: [18, 19, 20, 21, 22, 23],
      friendHeroes: [0],
      reserves: 32,
    );
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1),
        rules = c.aiRulesForTesting(),
        map = c.aiMapForTesting();
    final brain = CountryBrain(
      rules,
      map,
      AiRequest(
        session: 'mobilize',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: view,
        deadlineTick: 99999,
        stage: AiDecisionStage.attack,
      ),
    );
    for (final _ in brain.steps()) {}
    final tasks = brain.result!.groups.expand((g) => g.tasks).toList();
    for (final hero in view.garrison(1)) {
      final task = tasks.where((t) => t.hero == hero.id).single;
      expect(['expedition', 'staging'], contains(task.role));
      expect(view.city(task.city)!.country, isNot(1));
    }
  });

  test('外围集结目标已被本国攻下或被第三国占领时同样重新规划', () {
    final task = ArmyTask(
      hero: 'unit',
      role: 'staging',
      city: 2,
      targetCountry: 2,
      deadlineTick: 9999,
      committedUntil: 0,
    );
    expect(task.needsTargetReview(1, 1), isTrue);
    expect(task.needsTargetReview(3, 1), isTrue);
    expect(task.needsTargetReview(2, 1), isFalse);
  });
  for (final attrition in [false, true]) {
    test('消耗战受损后仍持续施压：attrition=$attrition', () {
      final c = nationalScenario(ai: false, guards: [0, 18]);
      addTearDown(c.dispose);
      final original = c.aiObservationFor(1),
          rules = c.aiRulesForTesting(),
          map = c.aiMapForTesting();
      final lead = original.garrison(1).first,
          enemy = original.garrison(2).first;
      final view = AiObservation.fromJson({
        ...original.toJson(),
        'heroes': [
          for (final h in original.heroes)
            {
              ...h.toJson(),
              if (h.id == lead.id) ...{
                's': AiArmyState.attacking.index,
                'hp': 90.0,
                'max': 100,
                'a': 15,
                'troops': [0.0, 0.0, 0.0, 0.0],
                'target': 2,
                'opponent': enemy.id,
                'retreat': true,
                'dispatch': false,
                'move': false,
              },
              if (h.id == enemy.id) ...{
                'a': 15,
                'troops': [20.0, 20.0, 20.0, 20.0],
              },
            },
        ],
      });
      final task = ArmyTask(
        hero: lead.id,
        role: 'expedition',
        city: 2,
        targetCountry: 2,
        attrition: attrition,
        deadlineTick: 99999,
        committedUntil: 600,
        expectedOrderRevision: lead.orderRevision,
      );
      final brain = CountryBrain(
        rules,
        map,
        AiRequest(
          session: 'attrition',
          id: 1,
          rulesVersion: rules.version,
          mapVersion: map.version,
          observation: view,
          deadlineTick: 99999,
          stage: AiDecisionStage.defense,
          tasks: [task],
        ),
      );
      for (final _ in brain.steps()) {}
      expect(
        brain.result!.groups
            .expand((g) => g.actions)
            .any((a) => a.kind == AiActionKind.retreat && a.hero == lead.id),
        !attrition,
      );
    });
  }

  test('返城满员且旧任务已失效，仍改往有空位的友城整备', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 18],
      friendly: true,
      friendHeroes: [19],
    );
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1),
        rules = c.aiRulesForTesting(),
        map = c.aiMapForTesting();
    final hero = original.garrison(1).first, home = original.city(1)!;
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {
            ...h.toJson(),
            if (h.id == hero.id) ...{
              's': AiArmyState.retreating.index,
              'xy': home.center.toJson(),
              'to': home.center.toJson(),
              'returnPath': [home.center.toJson()],
              'target': 1,
              'move': true,
              'dispatch': false,
            },
          },
        for (var i = 0; i < 8; i++)
          {...original.garrison(1).last.toJson(), 'id': 'crowded-$i'},
      ],
    });
    final brain = CountryBrain(
      rules,
      map,
      AiRequest(
        session: 'return',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: view,
        deadlineTick: 99999,
        stage: AiDecisionStage.defense,
      ),
    );
    for (final _ in brain.steps()) {}
    final task = brain.result!.groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == hero.id)
        .single;
    expect(task.role, 'regroup');
    expect(task.city, 3);
  });

  test('过期远征不能占着攻城编队名额阻止后续出兵', () {
    final c = nationalScenario(ai: false, guards: [0, 18]);
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    c.dispatch(hero, c.world.cities[2], countryId: 1);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      tasks: [
        ArmyTask(
          hero: hero.id,
          role: 'expedition',
          city: 2,
          targetCountry: 2,
          deadlineTick: -1,
          committedUntil: -1,
        ),
      ],
    );
    expect(OffensiveFocus(view, ledger, rules).assignedTo(2), 0);
  });
}
