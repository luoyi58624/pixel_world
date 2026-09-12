import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  for (final (label, guards, gold, enemyAttack) in [
    ('没有多余将领', [33], 200, 32),
    ('城内防线能够抵挡', [33, 34], 200, 1),
    ('国库资金不足', [33, 34], 10, 32),
    ('没有低攻击余将', [34, 35], 200, 32),
  ]) {
    test('$label时不派城内将领去做消耗截击', () {
      final c = nationalScenario(
        ai: false,
        guards: guards,
        gold: gold,
        level: 4,
        reserves: 12,
        attackerCombat: enemyAttack,
        overrides: {
          33: {'combat': 2, 'maxHp': 35, 'morale': 30, 'politics': 0},
          34: {'combat': 14, 'maxHp': 60, 'morale': 100},
          35: {'combat': 12, 'maxHp': 60, 'morale': 80},
        },
      );
      addTearDown(c.dispose);
      approaching(c, distance: 140);
      c.advance(1 / 60);
      final plan = planFor(c);
      expect(
        plan.groups.expand((g) => g.tasks).where((t) => t.role == 'intercept'),
        isEmpty,
        reason: plan.toJson().toString(),
      );
    });
  }
  test('即使低攻击余将和军费齐备，也不再安排出城消耗', () {
    final c = nationalScenario(
      ai: false,
      guards: [33, 34],
      level: 4,
      reserves: 12,
      gold: 200,
      attackerCombat: 32,
      overrides: {
        33: {'combat': 2, 'maxHp': 35, 'morale': 30, 'politics': 0},
        34: {'combat': 14, 'maxHp': 60, 'morale': 100},
      },
    );
    addTearDown(c.dispose);
    approaching(c, distance: 140);
    c.advance(1 / 60);
    final plan = planFor(c);
    final groups = plan.groups
        .where((g) => g.tasks.any((t) => t.attrition))
        .toList();
    expect(groups, isEmpty, reason: plan.toJson().toString());
    expect(
      plan.groups.expand((g) => g.tasks).where((t) => t.role == 'intercept'),
      isEmpty,
    );
    expect(
      plan.groups
          .expand((g) => g.actions)
          .any(
            (a) =>
                a.hero == 'rom-34' &&
                [AiActionKind.dispatch, AiActionKind.dismiss].contains(a.kind),
          ),
      isFalse,
    );
    expect(c.aiObservationFor(1).hero('rom-34')!.type, 0);
  });

  test('高攻击普通将领的城防价值可以高于低攻击高级将领', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 34],
      level: 5,
      overrides: {
        0: {'combat': 9, 'maxHp': 95},
        34: {'combat': 14, 'maxHp': 99},
      },
    );
    addTearDown(c.dispose);
    final v = c.aiObservationFor(1), r = c.aiRulesForTesting();
    expect(
      heroDefenseValue(v.hero('rom-34')!, r, 5, 4),
      greaterThan(heroDefenseValue(v.hero('rom-0')!, r, 5, 4)),
    );
  });

  test('静态评估可重复，增加实际兵员能够改善当前战力判断', () {
    final c = nationalScenario(ai: false, guards: [34], level: 5);
    addTearDown(c.dispose);
    final v = c.aiObservationFor(1), r = c.aiRulesForTesting();
    final assessor = CombatAssessor(r, AiWorkBudget(r.tuning));
    final hero = v.hero('rom-34')!, enemy = v.hero('rom-2')!;
    final a = assessor.compare(
      hero,
      enemy,
      ownDefense: 5,
      ownSoldiers: 2,
      enemySoldiers: 4,
    );
    final b = assessor.compare(
      hero,
      enemy,
      ownDefense: 5,
      ownSoldiers: 2,
      enemySoldiers: 4,
    );
    final stronger = assessor.compare(
      hero,
      enemy,
      ownDefense: 5,
      ownSoldiers: 4,
      enemySoldiers: 4,
    );
    expect(a.lower, b.lower);
    expect(stronger.lower, greaterThan(a.lower));
  });
}
