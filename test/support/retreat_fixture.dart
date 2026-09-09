import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/ai/runtime/testing_worker.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

import 'fixed_siege_random.dart';

final _setupWorkers = <CampaignState, SynchronousAiWorker>{};

/// 可计数的撤退随机源，用于检查概率边界与重复点击。
class RetreatRoll implements math.Random {
  /// 固定到指定概率分位。
  RetreatRoll(this.value);
  final double value;
  int calls = 0;
  @override
  double nextDouble() {
    calls++;
    return value;
  }

  @override
  int nextInt(int max) => (nextDouble() * max).floor();
  @override
  bool nextBool() => nextDouble() < .5;
}

/// 固定地形和队伍的三国地图，隔离随机经济及额外招募。
CampaignState retreatCampaign({
  RetreatRoll? random,
  bool ai = false,
  bool weakNpc = false,
  int gold = 1000,
}) {
  final data = jsonDecode(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  );
  if (weakNpc) {
    for (final row in data['heroes'] as List) {
      if (row['id'] == 3) row['combat'] = 1;
    }
  }
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 80,
      'height': 40,
      'tiles': List.filled(3200, 0),
      'cities': [
        for (final (id, x, y, units) in [
          (0, 6, 8, [40, 0, 2]),
          (1, 55, 8, [3, 18]),
          (2, 6, 32, [4]),
        ])
          {
            'id': id,
            'name': '测试城$id',
            'x': x,
            'y': y,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialLevel': 3,
            'initialOwnerId': id,
            'unitIds': units,
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final worker = SynchronousAiWorker();
  final campaign = CampaignState.fromRom(
    world,
    decodeRomHeroes(jsonEncode(data))
        .where((hero) => {40, 0, 2, 3, 18, 4}.contains(hero.id))
        .toList(),
    startingGold: gold,
    aiEnabled: ai,
    retreatRandom: random ?? RetreatRoll(.9),
    siegeRandom: const FixedSiegeRandom(),
    economyRandom: const FixedSiegeRandom(),
    aiWorkerFactory: () => worker,
    aiRandom: math.Random(7),
  );
  _setupWorkers[campaign] = worker;
  return campaign;
}

/// 从测试名单取得实际将领对象。
CampaignHero retreatHeroById(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

/// 经过正式出征与接触结算创建一场攻城。
CityBattle startRetreatSiege(
  CampaignState c, {
  int heroId = 0,
  int target = 1,
}) {
  final hero = retreatHeroById(c, heroId);
  final march = c.dispatch(
    hero,
    c.world.cities[target],
    countryId: hero.countryId,
  )!;
  march.position = march.destination;
  _setupWorkers[c]?.paused = true;
  c.advance(1 / 60);
  _setupWorkers[c]?.paused = false;
  return c.battles[target]!;
}

/// 按真实帧推进到状态变化，失败时给出明确测试断言。
void advanceRetreatUntil(
  CampaignState c,
  bool Function() done, {
  int frames = 12000,
}) {
  for (var i = 0; i < frames && !done(); i++) {
    c.advance(1 / 60);
  }
  expect(done(), isTrue);
}
