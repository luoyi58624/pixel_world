import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;
import 'package:json5/json5.dart';

import 'package:pixel_world/core/config/game_config.dart';

import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

/// 两国从相反方向面对同一扩张国，额外城市远离主城，排除距离与守将强弱混淆。
CampaignState coalitionCampaign({
  int enemyCities = 5,
  int gold = 1000,
  int year = 4,
  int homeLevel = 3,
  int defenders = 1,
  bool ai = false,
}) {
  final records = [
    (0, 120, 58, 0, 5, [40]),
    (1, 10, 25, 1, homeLevel, [0, 4, 5, 18]),
    (2, 30, 25, 2, defenders, [19, if (defenders > 1) 20]),
    (3, 50, 25, 3, homeLevel, [6, 7, 8, 21]),
    for (var i = 1; i < enemyCities; i++)
      (3 + i, 110, 3 + i * 7, 2, 1, <int>[]),
  ];
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 128,
      'height': 64,
      'tiles': List.filled(8192, 0),
      'cities': [
        for (final row in records)
          {
            'id': row.$1,
            'name': '城${row.$1}',
            'x': row.$2,
            'y': row.$3,
            'initialOwnerId': row.$4,
            'initialLevel': row.$5,
            'unitIds': row.$6,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final catalog = json5Decode(
    File('assets/data/heroes.json5').readAsStringSync(),
  );
  final ids = records.expand((row) => row.$6).toSet();
  for (final row in catalog['heroes']) {
    row['salary'] = 0;
    if ([0, 4, 5, 6, 7, 8].contains(row['id'])) row['combat'] = 25;
    if ([19, 20].contains(row['id'])) {
      row['combat'] = 9;
      row['maxHp'] = 58;
      row['morale'] = 60;
    }
  }
  return CampaignState.fromRom(
    world,
    decodeRomHeroes(jsonEncode(catalog))
        .where((h) => ids.contains(h.id))
        .toList(),

    countryConfigs: {
      0: const CountryConfig(initialGold: 0),
      1: CountryConfig(initialGold: gold),
      2: const CountryConfig(initialGold: 0),
      3: CountryConfig(initialGold: gold),
    },
    aiEnabled: ai,
    aiWorkerFactory: SynchronousAiWorker.new,
    economyRandom: math.Random(11),
    recruitmentRandom: math.Random(7),
    siegeRandom: math.Random(3),
  )..settledMonths = (year - 1) * 12;
}

/// 对当前公开观察生成指定阶段的计划，不执行或预演战斗。
CountryPlan coalitionPlan(
  CampaignState c, {
  int country = 1,
  AiDecisionStage stage = AiDecisionStage.resources,
  int? targetCountry,
  int? targetCity,
  List<ArmyTask> tasks = const [],
}) {
  final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
  final brain = CountryBrain(
    rules,
    map,
    AiRequest(
      session: 'coalition-test',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: c.aiObservationFor(country),
      deadlineTick: 999999,
      stage: stage,
      offensiveCountry: targetCountry,
      offensiveCity: targetCity,
      tasks: tasks,
    ),
  );
  for (final _ in brain.steps()) {}
  return brain.result!;
}
