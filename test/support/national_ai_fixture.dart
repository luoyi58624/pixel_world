import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/rules_data.dart';
import 'package:pixel_world/features/ai/runtime/worker.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';

/// 可控制延迟、乱序和重复回复的测试后端，不用于正式游戏。
class ManualAiWorker implements AiWorker {
  @override
  AiWorkerStatus status = AiWorkerStatus.idle;
  @override
  final metrics = AiWorkerMetrics('test-manual');
  @override
  bool get synchronous => true;
  @override
  int get pendingCount => requests.length;
  late AiRules rules;
  late AiMap map;
  final requests = <AiRequest>[], replies = <AiReply>[];
  @override
  void initialize(AiRules r, AiMap m) {
    rules = r;
    map = m;
    status = AiWorkerStatus.ready;
  }

  @override
  void submit(AiRequest request) => requests.add(request);
  @override
  void pump(int tick) {}
  @override
  List<AiReply> takeReplies() {
    final result = List.of(replies);
    replies.clear();
    return result;
  }

  @override
  void close() {
    status = AiWorkerStatus.closed;
  }

  /// 对已经冻结的请求生成结果，由测试决定何时送回。
  AiReply solve(AiRequest request) {
    final brain = CountryBrain(rules, map, request);
    for (final _ in brain.steps()) {}
    return AiReply.forRequest(request, brain.result!);
  }
}

/// 固定地图上的国家、防御与回援场景，公开属性可独立调整。
CampaignState nationalScenario({
  int gold = 200,
  int level = 1,
  List<int> guards = const [0, 18, 19],
  int reserves = 16,
  int required = 2,
  bool ai = true,
  bool friendly = false,
  int friendlyLevel = 3,
  List<int> friendHeroes = const [],
  bool recruitment = false,
  int attackerCombat = 15,
  Map<int, Map<String, Object>> overrides = const {},
  AiWorker Function()? workerFactory,
  Map<String, dynamic> stock = const {},
  int terrain = 0,
  bool originalWeapons = false,
}) {
  final records = [
    (0, 110, 48, 0, [40], 5),
    (1, 10, 20, 1, guards, level),
    (2, 50, 20, 2, [2], 2),
    if (friendly) (3, 16, 30, 1, friendHeroes, friendlyLevel),
  ];
  final setup = CampaignSetup.decode(
    jsonEncode({
      'version': 1,
      'countries': [
        {'id': 0, 'initialGold': 1000},
        {'id': 1, 'initialGold': gold},
        {'id': 2, 'initialGold': 100},
      ],
      'worlds': [
        {
          'id': 0,
          'cities': [
            for (final c in records)
              {
                'id': c.$1,
                'initialLevel': c.$6,
                'baseIncome': 20,
                'initialReserveSoldiers': c.$1 == 1 ? reserves : 0,
                'requiredGarrison': required,
              },
          ],
        },
      ],
    }),
  );
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 128,
      'height': 64,
      'tiles': List.filled(8192, terrain),
      'cities': [
        for (final c in records)
          {
            'id': c.$1,
            'name': '场景${c.$1}',
            'x': c.$2,
            'y': c.$3,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialOwnerId': c.$4,
            'initialLevel': c.$6,
            'unitIds': c.$5,
          },
      ],
    },
    [0, 1, 2, 3],
    setup: setup,
  );
  final data = jsonDecode(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  );
  for (final row in data['heroes'] as List) {
    row['salary'] = 0;
    if (row['id'] == 0) {
      row['combat'] = 25;
      row['politics'] = 20;
    }
    if (row['id'] == 2) {
      row['combat'] = attackerCombat;
    }
    row.addAll(overrides[row['id']] ?? <String, Object>{});
  }
  final ids = records.expand((r) => r.$5).toSet();
  final weapons = jsonDecode(
    File(
      originalWeapons
          ? 'docs/reference/rom_weapons_original.json'
          : 'assets/data/rom_weapons.json',
    ).readAsStringSync(),
  );
  weapons['initialCountryStock'] = stock;
  return CampaignState.fromRom(
    world,
    decodeRomHeroes(jsonEncode(data))
        .where((h) => recruitment || ids.contains(h.id))
        .toList(),
    aiEnabled: ai,
    aiWorkerFactory: workerFactory ?? SynchronousAiWorker.new,
    weaponCatalog: WeaponCatalog.decode(jsonEncode(weapons)),
    economyRandom: math.Random(11),
    recruitmentRandom: math.Random(7),
    siegeRandom: math.Random(3),
    retreatRandom: math.Random(5),
    weaponRandom: math.Random(17),
  );
}

/// 放置已经可观察的接近部队，不让它瞬移进入战斗。
HeroMarch approaching(CampaignState c, {double distance = 60, int city = 1}) {
  final hero = c.heroes.firstWhere((h) => h.sourceId == 2);
  c.countryTroops[2] = CountryTroops(reserveSoldiers: 4);
  final march = c.dispatch(
    hero,
    c.world.cities.firstWhere((v) => v.id == city),
    countryId: 2,
  )!;
  march.position =
      c.cityBounds(c.world.cities.firstWhere((v) => v.id == city)).center +
      GamePoint(distance, 0);
  return march;
}

/// 明确按逻辑帧驱动同步后端，而非一次补跑历史决策。
void advanceAi(CampaignState c, double seconds) {
  for (var i = 0; i < (seconds * 60).ceil(); i++) {
    c.advance(1 / 60);
  }
}

/// 在纯工作环境中为当前观察生成一份可检查的计划。
CountryPlan planFor(
  CampaignState c, {
  int country = 1,
  List<ArmyTask> tasks = const [],
}) {
  final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
  final request = AiRequest(
    session: 'test',
    id: 1,
    rulesVersion: rules.version,
    mapVersion: map.version,
    observation: c.aiObservationFor(country),
    deadlineTick: 600,
    tasks: tasks,
  );
  final brain = CountryBrain(rules, map, request);
  for (final _ in brain.steps()) {}
  return brain.result!;
}
