import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/raid_assessment.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/threat_geometry.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('三位守将不能反复借用同一份满血与满兵', () {
    final c = nationalScenario(
      ai: false,
      guards: [18, 19, 20],
      level: 3,
      attackerCombat: 18,
      overrides: {
        for (final id in [18, 19, 20]) id: {'combat': 11, 'maxHp': 65},
      },
    );
    final view = c.aiObservationFor(0), rules = c.aiRulesForTesting();
    final result = assessRaid(
      view.hero('rom-40')!,
      view.city(1)!,
      view,
      rules,
      CombatAssessor(rules, AiWorkBudget(rules.tuning)),
    );
    expect(result.teamSize, greaterThan(1));
    c.dispose();
  });
  test('占领地留守一将，不照搬原国首都的两将配置', () {
    final c = nationalScenario(ai: false);
    c.cities[2]!.ownerCountryId = 1;
    final view = c.aiObservationFor(1);

    expect(view.city(2)!.country, 1);
    expect(view.city(1)!.country, 1);
    c.dispose();
  });
  test('附近山地来敌按真实抵达时间判断，规划与执行共用窗口', () {
    final outline = AiOutline([
      const AiPoint(0, 0),
      const AiPoint(20, 0),
      const AiPoint(20, 20),
      const AiPoint(0, 20),
    ]);
    double? window(double travel) => incomingSeconds(
      position: const AiPoint(70, 10),
      velocity: const AiPoint(-1, 0),
      center: const AiPoint(10, 10),
      outline: outline,
      marchSpeed: 10,
      horizon: 24,
      travelSeconds: (_, _) => travel,
    );
    expect(window(35), isNull);
    expect(window(15), 15);
  });
}
