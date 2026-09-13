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

  test('远方危险目标不可出击时不为缩短账面距离而无意义转驻友城', () {
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
    expect(tasks.where((t) => t.role == 'expedition' && t.city == 2), isEmpty);
    expect(tasks.where((t) => t.role == 'transfer'), isEmpty);
  });

  test('完整轮攻可行时不被首轮单将消耗提前截断', () {
    final c = coalitionCampaign(defenders: 2, enemyCities: 1, year: 1);
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {
            ...h.toJson(),
            if (h.country == 1) ...{'a': 15, 'hp': 95.0, 'max': 95},
            if (h.country == 2) ...{'a': 12, 'hp': 95.0, 'max': 95},
          },
      ],
    });
    final result = assessRaid(
      view.garrison(1).first,
      view.city(2)!,
      view,
      rules,
      CombatAssessor(rules, AiWorkBudget(rules.tuning)),
    );
    expect(result.breakthrough, isFalse);
    expect(result.teamSize, greaterThan(1));
  });

  test('完整攻势不可行时评估首轮交换，伤重者先整备', () {
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
    final raid = assessRaid(h, city, view, rules, assessor);
    expect(raid.breakthrough, isTrue);
    expect(raid.teamSize, 1);
    final injured = AiHero.fromJson({...h.toJson(), 'hp': 10.0});
    expect(assessRaid(injured, city, view, rules, assessor).teamSize, 0);
  });

  test('调走驻军更新费用诊断，历史账单不抬高十金币周转线', () {
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
    expect(ledger(100).cash().reserve, 10);
    expect(ledger(0).cash().reserve, 10);
  });

  for (final situation in ['兵员完整', '兵员耗尽', '目标空城', '无处整备', '现有兵力占优']) {
    test('短时避让或行军承诺期间：$situation', () {
      final c = coalitionCampaign(homeLevel: situation == '无处整备' ? 1 : 3);
      addTearDown(c.dispose);
      final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
      final h = original.garrison(1).first;
      final view = AiObservation.fromJson({
        ...original.toJson(),
        'heroes': [
          for (final hero in original.heroes)
            if (situation != '目标空城' || hero.country != 2)
              {
                ...hero.toJson(),
                if (hero.id == h.id) ...{
                  's': AiArmyState.camped.index,
                  'movementPending': true,
                  'dispatch': false,
                  'move': true,
                  'target': 2,
                  'to': original.city(2)!.center.toJson(),
                  'troops': situation == '兵员完整'
                      ? [20.0, 20.0, 20.0, 20.0]
                      : <double>[],
                  if (situation == '现有兵力占优') 'troops': [20.0, 20.0, 20.0, 20.0],
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
      final actions = brain.result!.groups
          .expand((g) => g.actions)
          .where((a) => a.hero == h.id);
      if (situation == '兵员耗尽' || situation == '无处整备') {
        expect(actions, isNotEmpty);
        final task = brain.result!.groups
            .expand((g) => g.tasks)
            .singleWhere((t) => t.hero == h.id);
        if (situation == '兵员耗尽') {
          expect(task.role, 'regroup');
          expect(task.reason, contains('回城补兵'));
        } else {
          expect(task.role, 'standby');
          expect(actions.single.kind, AiActionKind.camp);
          expect(task.expectedOrderRevision, h.orderRevision + 1);
        }
      } else {
        expect(actions, isEmpty);
      }
    });
  }
}
