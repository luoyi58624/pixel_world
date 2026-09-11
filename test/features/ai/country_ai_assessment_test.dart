import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('评估重复执行不改变真实 HP、金币、装备、兵员或随机流', () {
    final c = nationalScenario(ai: false);
    approaching(c);
    final before = jsonEncode(c.aiObservationFor(1).toJson());
    for (var i = 0; i < 10; i++) {
      planFor(c);
    }
    expect(jsonEncode(c.aiObservationFor(1).toJson()), before);
  });
  test('守城不计武器，城防不抬高士气；增加真实攻击不会降低静态优势', () {
    final c = nationalScenario(ai: false),
        rules = c.aiRulesForTesting(),
        view = c.aiObservationFor(1);
    final hero = view.hero('rom-0')!, enemy = view.hero('rom-2')!;
    final evaluator = CombatAssessor(rules, AiWorkBudget(rules.tuning));
    final bare = evaluator.compare(
      hero,
      enemy,
      ownDefense: 1,
      ownSoldiers: 4,
      enemySoldiers: 4,
    );
    final equipped = evaluator.compare(
      hero,
      enemy,
      ownDefense: 1,
      ownSoldiers: 4,
      enemySoldiers: 4,
      loadout: [14, 13, 12],
    );
    expect(equipped.lower, bare.lower);
    expect(equipped.ownWeaponUpper, 0);
    expect(
      evaluator
          .compare(hero, enemy, ownDefense: 5, ownSoldiers: 4, enemySoldiers: 4)
          .lower,
      greaterThan(bare.lower),
    );
  });
  test('每轮只计一件武器，已使用后不再预支伤害，死枪自伤不视为确定获胜', () {
    final c = nationalScenario(ai: false, originalWeapons: true),
        r = c.aiRulesForTesting(),
        v = c.aiObservationFor(1);
    final evaluator = CombatAssessor(r, AiWorkBudget(r.tuning));
    final a = v.hero('rom-0')!, b = v.hero('rom-2')!;
    final arrows = evaluator.compare(
      a,
      b,
      loadout: [0, 0, 0],
      enemyDefense: 1,
      ownSoldiers: 4,
      enemySoldiers: 4,
    );
    expect(arrows.ownWeaponLower, 20);
    expect(arrows.ownWeaponUpper, 20);
    final later = evaluator.compare(
      a,
      b,
      loadout: [0, 0, 0],
      enemyDefense: 1,
      ownOpening: false,
    );
    expect(later.ownWeaponLower, 0);
    final suicidal = evaluator.compare(a, b, loadout: [8], enemyDefense: 1);
    expect(suicidal.releaseRisk, isTrue);
    expect(suicidal.advantage, CombatAdvantage.unknown);
  });
  test('序列化保持当前小兵血量，地形只修正将领部分', () {
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
    expect(r.attack(20, terrain: 2), 10);
    expect(r.attack(20, terrain: 1), 14);
    expect(r.attack(20, terrain: 2, defenseLevel: 3, field: false), 25);
  });
}
