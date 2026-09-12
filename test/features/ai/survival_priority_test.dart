import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

import '../../support/national_ai_fixture.dart';

CountryPlan _plan(CampaignState c, AiObservation view, AiDecisionStage stage) {
  final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
  final brain = CountryBrain(
    rules,
    map,
    AiRequest(
      session: 'survival-test',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: view,
      deadlineTick: 99999,
      stage: stage,
    ),
  );
  for (final _ in brain.steps()) {}
  return brain.result!;
}

void main() {
  test('即使有强将和充足军费，也不派驻城将领出城截击', () {
    final c = nationalScenario(
      ai: false,
      gold: 200,
      level: 2,
      guards: [0, 4],
      attackerCombat: 15,

      overrides: {
        0: {'combat': 15, 'maxHp': 99},
        4: {'combat': 25, 'maxHp': 140},
      },
    );
    addTearDown(c.dispose);
    final enemy = approaching(c, distance: 140).hero;
    final original = c.aiObservationFor(1);
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {
            ...h.toJson(),
            if (h.id == 'rom-0') 't': 2,
            if (h.id == enemy.id) ...{
              'v': [-20.0, 0.0],
              'w': [11],
            },
          },
      ],
    });
    final plan = _plan(c, view, AiDecisionStage.defense);
    expect(
      plan.groups
          .expand((g) => g.tasks)
          .any((t) => view.hero(t.hero)!.stationed && t.role == 'intercept'),
      isFalse,
      reason: plan.toJson().toString(),
    );
  });

  test('主角城实际保留两名守军，派出一人后不能再把剩下的护卫派空', () {
    final c = nationalScenario(
      ai: false,
      level: 3,
      guards: [0, 18, 19],
      overrides: {
        18: {'combat': 2, 'maxHp': 23},
      },
    );
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {...h.toJson(), if (h.id == 'rom-0') 't': 2},
      ],
    });
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
    );
    expect(ledger.defendersToKeep(view.city(1)!), 2);
    final spare = view.garrison(1).where(ledger.canSpareForOffense).toList();
    expect(spare.length, 1);
    expect(spare.single.id, 'rom-18', reason: '保留生命更高的护卫，不能只留下最弱将领');
    expect(
      ledger.depart(
        spare.single,
        ArmyTask(
          hero: spare.single.id,
          role: 'expedition',
          city: 2,
          deadlineTick: 99999,
          committedUntil: 600,
        ),
      ),
      isTrue,
    );
    expect(ledger.garrison(1).where(ledger.canSpareForOffense), isEmpty);
    expect(ledger.garrison(1).any((h) => h.type == 2), isTrue);
  });

  test('首年现金充足且扩军后收入仍覆盖月俸时允许补员，长期入不敷出则拒绝', () {
    final c = nationalScenario(
      ai: false,
      gold: 100,
      level: 3,
      guards: [0, 18],
      recruitment: true,
    )..settledMonths = 0;
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    for (final salary in [7, 16]) {
      final view = AiObservation.fromJson({
        ...original.toJson(),
        'salary': 8,
        'heroes': [
          for (final h in original.heroes)
            {...h.toJson(), if (h.country == 1) 'pay': salary},
        ],
      });
      final ledger = AiLedger(
        view,
        rules,
        AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      );
      expect(ledger.recruit(view.city(1)!), salary == 7);
      expect(ledger.gold, salary == 7 ? 100 - rules.integer('drawCost') : 100);
      expect(
        ledger.extraSalary,
        salary == 7 ? 8 : 0,
        reason: '月俸预留到下次结算，不在招募时重复预付',
      );
    }
  });

  test('没有眼前来敌时也用余钱维护主角城防，提前建立守城余量', () {
    final c = nationalScenario(
      ai: false,
      gold: 1000,
      level: 3,
      guards: [0, 18],
    );
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1);
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {...h.toJson(), if (h.id == 'rom-0') 't': 2},
      ],
    });
    final plan = _plan(c, view, AiDecisionStage.resources);
    expect(
      plan.groups
          .expand((g) => g.actions)
          .any((a) => a.kind == AiActionKind.upgrade && a.city == 1),
      isTrue,
      reason: plan.toJson().toString(),
    );
  });

  test('主角有明确险情时，远处安全城也不启动新远征；普通局部威胁不冻结全国进攻', () {
    final c = nationalScenario(
      ai: false,
      gold: 1000,
      level: 2,
      reserves: 32,
      guards: [0, 18],
      friendly: true,
      rearEmpire: true,
      friendHeroes: [3, 5],
      attackerCombat: 40,
    );
    addTearDown(c.dispose);
    final enemy = approaching(c, distance: 65).hero;
    final original = c.aiObservationFor(1);
    AiObservation view(bool protagonist) => AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {
            ...h.toJson(),
            if (h.id == 'rom-0') 't': protagonist ? 2 : 1,
            if (h.id == enemy.id) 'v': [-30.0, 0.0],
          },
      ],
    });
    final protected = _plan(c, view(true), AiDecisionStage.attack);
    expect(protected.phase, 'defending');
    expect(protected.groups, isEmpty);
    expect(protected.notes.any((n) => n.contains('主角')), isTrue);
    final ordinary = _plan(c, view(false), AiDecisionStage.attack);
    expect(
      ordinary.groups.expand((g) => g.tasks).any((t) => t.role == 'expedition'),
      isTrue,
      reason: ordinary.toJson().toString(),
    );
    final resources = _plan(c, view(true), AiDecisionStage.resources);
    expect(resources.phase, 'defending');
  });

  test('没有明确来袭且主角安全时，保留现有进攻能力', () {
    final c = nationalScenario(
      ai: false,
      gold: 1000,
      friendly: true,
      friendHeroes: [4, 5],
    );
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1);
    final view = AiObservation.fromJson({
      ...original.toJson(),
      'heroes': [
        for (final h in original.heroes)
          {...h.toJson(), if (h.id == 'rom-0') 't': 2},
      ],
    });
    final plan = _plan(c, view, AiDecisionStage.resources);
    expect(plan.notes.any((n) => n.contains('主角所在城存在明确风险')), isFalse);
  });

  test('高级将领兵力耗尽后可提前撤退，兵力完整则不触发', () {
    final c = nationalScenario(ai: false, guards: [0, 18], attackerCombat: 25);
    addTearDown(c.dispose);
    final original = c.aiObservationFor(1);
    AiObservation view({List<double> troops = const []}) =>
        AiObservation.fromJson({
          ...original.toJson(),
          'heroes': [
            for (final h in original.heroes)
              {
                ...h.toJson(),
                if (h.id == 'rom-0') ...{
                  's': AiArmyState.attacking.index,
                  'hp': 70.0,
                  'a': 15,
                  'troops': troops,
                  'retreat': true,
                  'dispatch': false,
                  'move': false,
                  'target': 2,
                  'opponent': 'rom-2',
                  'clashes': 0,
                  'received': 0.0,
                  'dealt': 0.0,
                },
                if (h.id == 'rom-2') 'troops': [20.0, 20.0, 20.0, 20.0],
              },
          ],
        });
    final exhausted = _plan(c, view(), AiDecisionStage.defense);
    expect(
      exhausted.groups
          .expand((g) => g.actions)
          .any((a) => a.hero == 'rom-0' && a.kind == AiActionKind.retreat),
      isTrue,
    );
    for (final ready in [
      view(troops: [20, 20, 20, 20]),
    ]) {
      final plan = _plan(c, ready, AiDecisionStage.defense);
      expect(
        plan.groups
            .expand((g) => g.actions)
            .where((a) => a.kind == AiActionKind.retreat),
        isEmpty,
      );
    }
  });
}
