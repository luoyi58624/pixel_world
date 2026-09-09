import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/ai/combat_assessment.dart';
import 'package:pixel_world/world/ai/country_brain.dart';
import 'package:pixel_world/world/ai/geometry.dart';
import 'package:pixel_world/world/ai/protocol.dart';
import 'package:pixel_world/world/ai/routes.dart';
import 'package:pixel_world/world/ai/rules_data.dart';
import 'package:pixel_world/world/ai/threats.dart';
import 'package:pixel_world/world/ai/work_budget.dart';

import 'support/national_ai_fixture.dart';

void main() {
  test('D12 名额合法但守军明显打不过时，报告仍为劣势', () {
    final c = nationalScenario(
      ai: false,
      guards: [19],
      reserves: 4,
      level: 1,
      attackerCombat: 63,
    );
    approaching(c);
    final rules = c.aiRulesForTesting(),
        work = AiWorkBudget(c.aiRulesForTesting().tuning);
    final view = c.aiObservationFor(1);
    final analyzer = ThreatAnalyzer(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, work),
      CombatAssessor(rules, work),
    );
    final report = analyzer.report(view.city(1)!);
    expect(report.overflow, 0);
    expect(report.risk!.advantage, CombatAdvantage.unfavorable);
  });
  test('T12 到达友军区域的路线不穿过中途敌城，并计入绕行耗时', () {
    final c = nationalScenario(ai: false);
    final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    final routes = AiRoutes(
      c.aiMapForTesting(),
      rules,
      AiWorkBudget(rules.tuning),
    );
    final hero = view.hero('rom-0')!, enemyCity = view.city(2)!;
    final end = AiPoint(enemyCity.center.x + 180, enemyCity.center.y);
    final route = routes.to(hero, end, view, safe: true);
    expect(route.complete, isTrue);
    expect(route.points.length, greaterThan(1));
    var from = view.city(1)!.outline.departure(view.city(1)!.center, end);
    final direct = routes.seconds(from, end);
    for (final point in route.points) {
      expect(enemyCity.outline.entry(from, point), isNull);
      from = point;
    }
    expect(route.seconds, greaterThan(direct));
  });
  test('小工作配额明确标记截断，输出保留完整动作组且不超命令数', () {
    final c = nationalScenario(ai: false);
    approaching(c);
    final data = c.aiRulesForTesting().toJson();
    final tuning = Map<String, dynamic>.from(data['tuning'] as Map)
      ..['candidates'] = 1
      ..['commands'] = 1
      ..['assessments'] = 1
      ..['routes'] = 20;
    data['tuning'] = tuning;
    final rules = AiRules.fromJson(data), map = c.aiMapForTesting();
    final request = AiRequest(
      session: 'bounded',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: c.aiObservationFor(1),
      deadlineTick: 300,
    );
    final brain = CountryBrain(rules, map, request);
    for (final _ in brain.steps()) {}
    expect(brain.result!.budgetLimited, isTrue);
    expect(
      brain.result!.groups.fold(0, (n, g) => n + g.actions.length),
      lessThanOrEqualTo(1),
    );
    expect(brain.result!.routeSteps, lessThanOrEqualTo(20));
    expect(brain.result!.assessments, lessThanOrEqualTo(1));
  });
}
