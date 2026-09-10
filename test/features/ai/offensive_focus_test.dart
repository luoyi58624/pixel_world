import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/offensive_focus.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

import '../../support/national_ai_fixture.dart';

OffensiveFocus _focus(
  CampaignState c,
  List<ArmyTask> tasks, {
  int? country,
  int? city,
}) {
  final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
  final ledger = AiLedger(
    view,
    rules,
    AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
    tasks: tasks,
  );
  return OffensiveFocus(
    view,
    ledger,
    rules,
    targetCountry: country,
    targetCity: city,
  );
}

void main() {
  test('首年强到可碾压也只集中一个战线，次年才允许明显优势下分兵', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 4, 5, 18],
      level: 3,
      attackerCombat: 1,
    );
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    c.dispatch(hero, c.world.cities[2], countryId: 1);
    final task = ArmyTask(
      hero: hero.id,
      role: 'expedition',
      city: 2,
      deadlineTick: 99999,
      committedUntil: 600,
      expectedOrderRevision: 1,
    );
    c.settledMonths = 0;
    final early = _focus(c, [task]);
    expect(early.primary, 2);
    expect(early.coverage(2), greaterThanOrEqualTo(2.25));
    expect(early.allows(c.aiObservationFor(1).city(0)!), isFalse);
    c.settledMonths = 12;
    expect(_focus(c, [task]).mayOpenFront, isTrue);
  });

  test('兵力不占绝对优势时已有攻城队伍阻止另开战线', () {
    final c = nationalScenario(
      ai: false,
      guards: [18, 19],
      level: 2,
      attackerCombat: 30,
    );
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    c.dispatch(hero, c.world.cities[2], countryId: 1);
    final task = ArmyTask(
      hero: hero.id,
      role: 'expedition',
      city: 2,
      deadlineTick: 99999,
      committedUntil: 600,
    );
    final focus = _focus(c, [task]);
    expect(focus.mayOpenFront, isFalse);
    expect(focus.allows(c.aiObservationFor(1).city(2)!), isTrue);
  });

  test('打下一城后锁定同国剩余领土，灭国后解除国家目标', () {
    final c = nationalScenario(ai: false);
    addTearDown(c.dispose);
    c.cities[0]!.ownerCountryId = 2;
    c.cities[2]!.ownerCountryId = 1;
    var focus = _focus(c, [], country: 2, city: 2);
    expect(focus.objectiveCountry, 2);
    expect(focus.preferredCity, isNull);
    expect(focus.allows(c.aiObservationFor(1).city(0)!), isTrue);
    c.cities[0]!.ownerCountryId = 1;
    focus = _focus(c, [], country: 2, city: 2);
    expect(focus.objectiveCountry, isNull);
  });

  test('真实计划将普通优势编成同目标队伍，预算不足不会只派第一位', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 4, 5, 18],
      level: 3,
      gold: 1000,
      overrides: {
        0: {'combat': 20},
        4: {'combat': 20},
        5: {'combat': 20},
      },
    );
    addTearDown(c.dispose);
    c.settledMonths = 0;
    final plan = planFor(c);
    final tasks = plan.groups
        .expand((g) => g.tasks)
        .where((t) => t.role == 'expedition')
        .toList();
    expect(tasks, isNotEmpty, reason: plan.toJson().toString());
    expect(tasks.map((t) => t.city).toSet().length, 1);
    expect(c.aiObservationFor(1).hero(tasks.first.hero)!.type, 1);
    for (final group in plan.groups.where(
      (g) => g.tasks.any((t) => t.role == 'expedition'),
    )) {
      expect(group.tasks.length, greaterThanOrEqualTo(2));
      expect(
        group.actions.where((a) => a.kind == AiActionKind.dispatch).length,
        group.tasks.length,
      );
    }
    final poor = nationalScenario(
      ai: false,
      guards: [0, 4, 5, 18],
      level: 3,
      gold: 1,
    );
    addTearDown(poor.dispose);
    expect(
      planFor(poor).groups
          .expand((g) => g.tasks)
          .where((t) => t.role == 'expedition'),
      isEmpty,
    );
  });
}
