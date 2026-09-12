import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/ai/rules_data.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('评估重复执行不改变真实 HP、金币、兵员或随机流', () {
    final c = nationalScenario(ai: false);
    approaching(c);
    final before = jsonEncode(c.aiObservationFor(1).toJson());
    for (var i = 0; i < 10; i++) {
      planFor(c);
    }
    expect(jsonEncode(c.aiObservationFor(1).toJson()), before);
  });
  test('守城超额士气保留；增加真实攻击不会降低静态优势', () {
    final c = nationalScenario(ai: false),
        rules = c.aiRulesForTesting(),
        view = c.aiObservationFor(1);
    final hero = view.hero('rom-0')!, enemy = view.hero('rom-2')!;
    final evaluator = CombatAssessor(rules, AiWorkBudget(rules.tuning));
    final disabled = AiRules.fromJson({
      ...rules.toJson(),
      'values': {...rules.values, 'useMorale': 0},
    });
    expect(disabled.morale(50, defenseLevel: 5), 0);
    final enabled = AiRules.fromJson({
      ...rules.toJson(),
      'values': {...rules.values, 'useMorale': 1, 'cityMoraleBonus5': 25},
    });
    expect(enabled.morale(50, defenseLevel: 5), 75);
    expect(enabled.morale(95, defenseLevel: 5), 120);
    expect(enabled.morale(50), 50);
    final bare = evaluator.compare(
      hero,
      enemy,
      ownDefense: 1,
      ownSoldiers: 4,
      enemySoldiers: 4,
    );
    expect(
      evaluator
          .compare(hero, enemy, ownDefense: 5, ownSoldiers: 4, enemySoldiers: 4)
          .lower,
      greaterThan(bare.lower),
    );
  });

  test('序列化保持当前小兵血量，各种野战环境均不削弱将领攻击', () {
    final c = nationalScenario(ai: false), r = c.aiRulesForTesting();
    final h = AiHero(
      id: 'x',
      country: 1,
      city: 1,
      order: 0,
      type: 1,
      hp: 20,
      maxHp: 95,
      combat: 20,
      politics: 10,
      salary: 0,
      position: const AiPoint(0, 0),
      soldiers: [20, 5],
    );
    final restored = AiHero.fromJson(jsonDecode(jsonEncode(h.toJson())));
    expect(restored.health, 45);
    expect(restored.soldierCount, 2);
    for (final terrain in [0, 1, 2, 3]) {
      expect(r.attack(20, terrain: terrain), 20);
    }
    expect(r.attack(20, terrain: 2, defenseLevel: 3, field: false), 25);
  });
}
