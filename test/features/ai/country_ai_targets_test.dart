import 'package:pixel_world/core/geometry/geometry.dart';
import 'dart:io';
import 'dart:convert';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

// 扫描独立偏好种子，验证真实目标选择；不采样任何战斗。
class _Roll implements math.Random {
  _Roll(this.value);
  final double value;
  @override
  double nextDouble() => value;
  @override
  int nextInt(int max) => (value * max).floor();
  @override
  bool nextBool() => false;
}

// 两侧使用相同属性的普通守将，单独检验距离和领地权重，不混入守军强弱偏好。
final _heroes = (() {
  final data = jsonDecode(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  );
  final a = (data['heroes'] as List).firstWhere((h) => h['id'] == 18);
  final b = (data['heroes'] as List).firstWhere((h) => h['id'] == 19);
  b['combat'] = a['combat'];
  b['maxHp'] = a['maxHp'];
  return decodeRomHeroes(jsonEncode(data))
      .where((hero) => {0, 2, 18, 19}.contains(hero.id))
      .toList();
})();

CampaignState _campaign(
  double roll, {
  int left = 30,
  int right = 70,
  int extras = 0,
  int extraOwner = 2,
  int attacker = 1,
  int gold = 1000,
  bool mountainsOnLeft = false,
  int? transferExtrasTo,
}) {
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 128,
      'height': 64,
      'tiles': [
        for (var y = 0; y < 64; y++)
          for (var x = 0; x < 128; x++) mountainsOnLeft && x < 50 ? 2 : 0,
      ],
      'cities': [
        for (final (id, x, y, owner, units) in [
          (0, left, 30, 0, [18]),
          (1, 50, 30, attacker, [0, 2]),
          (2, right, 30, 2, [19]),
          for (var i = 0; i < extras; i++)
            (i + 3, 120, 3 + i * 6, extraOwner, <int>[]),
        ])
          {
            'id': id,
            'name': '测试城$id',
            'x': x,
            'y': y,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialOwnerId': owner,
            'initialLevel': id == 1 ? 2 : 1,
            'unitIds': units,
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final c = CampaignState.fromRom(
    world,
    _heroes,
    countryConfigs: {
      0: const CountryConfig(initialGold: 0),
      2: const CountryConfig(initialGold: 0),
      attacker: CountryConfig(initialGold: gold),
    },
    aiWorkerFactory: SynchronousAiWorker.new,
    aiRandom: _Roll(roll),
    economyRandom: _Roll(0),
    recruitmentRandom: _Roll(0),
  );
  c.cities[1] = CitySituation(
    ownerCountryId: attacker,
    defense: 100,
    baseIncome: 10,
    initialLevel: 2,
    requiredGarrison: 1,
  );
  c.countryTroops[attacker] = CountryTroops(reserveSoldiers: 4);
  if (transferExtrasTo != null) {
    for (var id = 3; id < 3 + extras; id++) {
      c.cities[id]!.ownerCountryId = transferExtrasTo;
    }
  }
  return c;
}

Map<int, int> _draws({
  int samples = 64,
  int left = 30,
  int right = 70,
  int extras = 0,
  int extraOwner = 2,
  int attacker = 1,
  int gold = 1000,
  bool mountainsOnLeft = false,
  int? transferExtrasTo,
  bool recovering = false,
}) {
  final counts = <int, int>{};
  for (var i = 0; i < samples; i++) {
    final c = _campaign(
      (i + .5) / samples,
      left: left,
      right: right,
      extras: extras,
      extraOwner: extraOwner,
      attacker: attacker,
      gold: recovering ? 1 : gold,
      mountainsOnLeft: mountainsOnLeft,
      transferExtrasTo: transferExtrasTo,
    );
    if (recovering) {
      final hero = c.heroes.firstWhere((hero) => hero.sourceId == 0);
      final march = c.dispatchTo(
        hero,
        const GamePoint(640, 496),
        countryId: attacker,
      )!;
      march.position = const GamePoint(640, 496);
      c.buySoldiers(1, 1, countryId: attacker);
      c.advance(1 / 60);
      expect(march.supplyHalted, isTrue);
      c.dismissHero(
        c.heroes.firstWhere((hero) => hero.sourceId == 2),
        countryId: attacker,
      );
      advanceAiForSentinel(c);
    } else {
      for (var tick = 0; tick < 6; tick++) {
        c.advance(1 / 60);
      }
    }
    final march = c.marches.values.single;
    final target = march.target!;
    expect(
      c.cities[target.id]!.ownerCountryId,
      recovering ? attacker : isNot(attacker),
    );
    counts.update(target.id, (count) => count + 1, ifAbsent: () => 1);
  }
  return counts;
}

// 防守周期内逐帧等待真实调度，不用一次大步跳过资源、防守、进攻的交接。
void advanceAiForSentinel(CampaignState c) {
  for (var i = 0; i < (GameConfig.nationalAi.intervalSeconds + .5) * 60; i++) {
    c.advance(1 / 60);
  }
}

void main() {
  test('静态收益更好的邻城优先，不为随机性选择明显更差的远征', () {
    final counts = _draws(left: 60, right: 110);
    expect(counts[0], 64);
    expect(counts[2] ?? 0, 0);
  });

  test('相同国力和相同行军成本时机会均等，不对玩家阵营额外优待或仇视', () {
    final counts = _draws();
    expect(counts[0], inInclusiveRange(20, 44));
    expect(counts[2], inInclusiveRange(20, 44));
  });

  test('隔山的近城更费粮草时，会倾向实际更省钱的稍远目标', () {
    final counts = _draws(left: 35, right: 75, mountainsOnLeft: true);
    expect(counts[2], 64);
    expect(counts[0] ?? 0, 0);
  });

  test('对局条件相同且一国领土已占多数时，允许优先压制扩张大国', () {
    for (final attacker in [1, 3]) {
      final counts = _draws(extras: 2, attacker: attacker);
      // 比较两座路程相同的主城，额外城池自身的选中次数不算入比较。
      expect(counts[2], 64);
    }
  });

  test('城市易主后重算领土压力，同一规则也适用于玩家国家', () {
    final counts = _draws(extras: 2, transferExtrasTo: 0);
    expect(counts[0], 64);
  });

  test('目标国再大也不能越过补给预算，负担不起的远征不会抽中', () {
    final counts = _draws(
      samples: 32,
      left: 60,
      right: 110,
      extras: 4,
      gold: 25,
    );
    expect(counts, {0: 32});
  });

  test('营地恢复补给后先返回友城整备，不立即再次盲目进攻', () {
    final counts = _draws(samples: 32, recovering: true);
    expect(counts, {1: 32});
  });
}
