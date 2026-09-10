import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/rules_data.dart';
import 'package:pixel_world/features/ai/runtime/build_stamp.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('导出同一纯 Dart 请求和期望结果，供真实浏览器 Worker 对照', () {
    final c = nationalScenario(ai: false);
    approaching(c);
    c.advance(1 / 60);
    final raw = jsonDecode(
      jsonEncode(c.aiRulesForTesting().toJson()),
    ) as Map<String, dynamic>;
    raw['tuning']['slice'] = 1;
    raw['version'] = '${raw['version']}:browser';
    final rules = AiRules.fromJson(raw), map = c.aiMapForTesting();
    final request = AiRequest(
      session: 'browser-check',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: c.aiObservationFor(1),
      deadlineTick: 1000,
    );
    final brain = CountryBrain(rules, map, request);
    for (final _ in brain.steps()) {}
    expect(brain.result!.groups, isNotEmpty);
    final cases = [
      for (final stage in AiDecisionStage.values)
        (() {
          final staged = AiRequest.fromJson({
            ...request.toJson(),
            'stage': stage.name,
          });
          final planner = CountryBrain(rules, map, staged);
          for (final _ in planner.steps()) {}
          return {
            'request': staged.toJson(),
            'expected': planner.result!.toJson(),
          };
        })(),
    ];
    Directory('build/national_ai').createSync(recursive: true);
    File('build/national_ai/worker_fixture.json').writeAsStringSync(
      jsonEncode({
        'build': aiBuildStamp,
        'rules': rules.toJson(),
        'map': map.toJson(),
        'request': request.toJson(),
        'expected': brain.result!.toJson(),
        'cases': cases,
      }),
    );
  });
}
