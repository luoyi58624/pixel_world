import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/raid_assessment.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/target_priority.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/coalition_fixture.dart';

Map<String, Object?> _shift(AiCity city, double dx, {int? country}) => {
  ...city.toJson(),
  'c': country ?? city.country,
  'xy': city.center.translated(dx, 0).toJson(),
  'outline': [
    for (final p in city.outline.points) p.translated(dx, 0).toJson(),
  ],
};

void main() {
  test('远方危险国家不占围攻军费，满仇恨也不覆盖距离限制', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'cities': [
        for (final city in original.cities)
          city.id == 2 ? _shift(city, 1200) : city.toJson(),
      ],
      'countries': [
        for (final n in original.countries)
          {
            ...n.toJson(),
            if (n.id == 1) 'hate': {'2': 100},
          },
      ],
    });
    final request = AiRequest(
      session: 'far',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: c.aiMapForTesting().version,
      observation: view,
      deadlineTick: 999999,
      stage: AiDecisionStage.resources,
      offensiveCountry: 2,
      offensiveCity: 2,
    );
    final routes = AiRoutes(
      c.aiMapForTesting(),
      rules,
      AiWorkBudget(rules.tuning),
    );
    final operations = OperationPlanner(request, rules, routes);
    expect(operations.hasCoalitionFront(view.city(2)!), isFalse);
    expect(
      operations.canRaidFrom(view.garrison(1).first, view.city(2)!),
      isFalse,
    );
    final brain = CountryBrain(rules, c.aiMapForTesting(), request);
    for (final _ in brain.steps()) {}
    expect(brain.result!.notes.any((n) => n.contains('追加进攻预算')), isFalse);
    expect(brain.result!.targetCity, isNot(2));
  });

  test('近目标优先，同距离下仇恨与危险规模提高选择权重', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final h = view.garrison(1).first, target = view.city(2)!;
    final neutral = AiCity.fromJson({...target.toJson(), 'c': 3});
    final near = targetPriority(neutral, h, view, rules, 1, travelSeconds: 10);
    expect(
      near,
      greaterThan(targetPriority(target, h, view, rules, 1, travelSeconds: 60)),
    );
    expect(
      targetPriority(target, h, view, rules, 1, travelSeconds: 10),
      greaterThan(near),
    );
    final angry = AiObservation.fromJson({
      ...view.toJson(),
      'countries': [
        for (final n in view.countries)
          {
            ...n.toJson(),
            if (n.id == 1) 'hate': {'3': 100},
          },
      ],
    });
    expect(
      targetPriority(neutral, h, angry, rules, 1, travelSeconds: 10),
      greaterThan(near),
    );
  });

  test('远方危险目标不可出击时允许改攻其他目标或安全前移', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'cities': [
        for (final city in original.cities)
          city.id == 2
              ? _shift(city, 1200)
              : city.id == 3
              ? _shift(city, 600, country: 1)
              : city.toJson(),
      ],
      'heroes': [
        for (final h in original.heroes)
          if (h.country != 3) h.toJson(),
      ],
    });
    final brain = CountryBrain(
      rules,
      c.aiMapForTesting(),
      AiRequest(
        session: 'stage',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: c.aiMapForTesting().version,
        observation: view,
        deadlineTick: 999999,
        stage: AiDecisionStage.attack,
        offensiveCountry: 2,
        offensiveCity: 2,
      ),
    );
    for (final _ in brain.steps()) {}
    final tasks = brain.result!.groups.expand((g) => g.tasks).toList();
    expect(tasks, isNotEmpty);
    expect(tasks.where((t) => t.role == 'expedition' && t.city == 2), isEmpty);
    for (final task in tasks.where((t) => t.role == 'transfer')) {
      expect(task.city, 3);
      expect(task.arrivalSlot, isTrue);
    }
  });

  test('首轮允许交换就先派单将突破，无需装备或凑齐全队', () {
    final c = coalitionCampaign(defenders: 2);
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {
            ...h.toJson(),
            if (h.id == 'rom-19') ...{'a': 40, 'hp': 200.0, 'max': 200},
            if (h.id == 'rom-20') ...{'a': 5, 'hp': 50.0, 'max': 50},
          },
      ],
    });
    final assessor = CombatAssessor(rules, AiWorkBudget(rules.tuning));
    final h = view.garrison(1).first, city = view.city(2)!;
    final armed = assessRaid(h, city, view, rules, assessor, [14]);
    expect(armed.breakthrough, isTrue);
    expect(armed.teamSize, 1);
    expect(assessRaid(h, city, view, rules, assessor, []).teamSize, 1);
    final injured = AiHero.fromJson({...h.toJson(), 'hp': 10.0});
    expect(assessRaid(injured, city, view, rules, assessor, [14]).teamSize, 0);
  });

  test('调走驻军只降低未来费用，已发生军费仍计入最低现金', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    AiLedger ledger(double bill) {
      final view = AiObservation.fromJson({
        ...original.toJson(),
        'countries': [
          for (final n in original.countries)
            {...n.toJson(), if (n.id == 1) 'garrisonAccrued': bill},
        ],
      });
      return AiLedger(
        view,
        rules,
        AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      )..departed.addAll(view.garrison(1).map((h) => h.id));
    }

    expect(ledger(0).monthlyGarrisonUpkeep, 0);
    expect(ledger(100).cash().reserve, greaterThan(ledger(0).cash().reserve));
  });

  test('短时避让保留远征任务，不把未抵达的军队召回', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final h = original.garrison(1).first;
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final hero in original.heroes)
          {
            ...hero.toJson(),
            if (hero.id == h.id) ...{
              's': AiArmyState.camped.index,
              'movementPending': true,
              'dispatch': false,
              'move': true,
              'target': 2,
              'to': original.city(2)!.center.toJson(),
            },
          },
      ],
    });
    final brain = CountryBrain(
      rules,
      c.aiMapForTesting(),
      AiRequest(
        session: 'traffic',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: c.aiMapForTesting().version,
        observation: view,
        deadlineTick: 999999,
        stage: AiDecisionStage.defense,
        tasks: [
          ArmyTask(
            hero: h.id,
            role: 'expedition',
            city: 2,
            targetCountry: 2,
            deadlineTick: 999999,
            committedUntil: 600,
            expectedOrderRevision: h.orderRevision,
            points: [original.city(2)!.center],
          ),
        ],
      ),
    );
    for (final _ in brain.steps()) {}
    expect(
      brain.result!.groups
          .expand((g) => g.actions)
          .where((a) => a.hero == h.id),
      isEmpty,
    );
  });
}
