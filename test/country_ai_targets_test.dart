import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

// 均匀扫描随机分位点，验证真正的出征结果，避免统计测试偶发失败。
class _Roll implements math.Random {
  _Roll(this.value);
  final double value;
  @override
  double nextDouble() => value;
  @override
  int nextInt(int max) => 0;
  @override
  bool nextBool() => false;
}

final _heroes = decodeRomHeroes(
  File('assets/data/rom_heroes.json').readAsStringSync(),
).where((hero) => {40, 0, 2, 18}.contains(hero.id)).toList();

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
          (0, left, 30, 0, [40]),
          (1, 50, 30, attacker, [0, 2]),
          (2, right, 30, 2, [18]),
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
    aiRandom: _Roll(roll),
    economyRandom: _Roll(0),
    recruitmentRandom: _Roll(0),
  );
  c.cities[1] = CitySituation(
    ownerCountryId: attacker,
    defense: 100,
    baseIncome: 10,
    initialLevel: 2,
    initialReserveSoldiers: 4,
    countOwnedHeroes: (owner) => c.heroes
        .where((hero) => hero.cityId == 1 && hero.countryId == owner)
        .length,
  );
  if (transferExtrasTo != null) {
    for (var id = 3; id < 3 + extras; id++) {
      c.cities[id]!.ownerCountryId = transferExtrasTo;
    }
  }
  return c;
}

Map<int, int> _draws({
  int samples = 360,
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
        const Offset(640, 496),
        countryId: attacker,
      )!;
      march.position = const Offset(640, 496);
      c.buySoldiers(1, 1, countryId: attacker);
      c.advance(1 / 60);
      expect(march.supplyHalted, isTrue);
      c.dismissHero(
        c.heroes.firstWhere((hero) => hero.sourceId == 2),
        countryId: attacker,
      );
      c.advance(GameConfig.countryAiInitialDelay - 1 / 60);
    } else {
      c.advance(GameConfig.countryAiInitialDelay);
    }
    final march = c.marches.values.single;
    final target = march.target!;
    expect(c.cities[target.id]!.ownerCountryId, isNot(attacker));
    counts.update(target.id, (count) => count + 1, ifAbsent: () => 1);
  }
  return counts;
}

void main() {
  test('近邻有明显更高进攻概率，远处仍有机会，不变成固定选择最近城', () {
    final counts = _draws(left: 60, right: 110);
    expect(counts[0], greaterThan(4 * counts[2]!));
    expect(counts[2], greaterThan(0));
  });

  test('相同国力和相同行军成本时机会均等，不对玩家阵营额外优待或仇视', () {
    final counts = _draws();
    expect(counts[0], 180);
    expect(counts[2], 180);
  });

  test('隔山的近城更费粮草时，会倾向实际更省钱的稍远目标', () {
    final counts = _draws(left: 35, right: 75, mountainsOnLeft: true);
    expect(counts[2], greaterThan(1.8 * counts[0]!));
    expect(counts[0], greaterThan(0));
  });

  test('多个独立国家都会优先压制领地更多的对手，不仅是多城多几个候选名额', () {
    for (final attacker in [1, 3]) {
      final counts = _draws(extras: 2, attacker: attacker);
      // 比较两座路程相同的主城，额外城池自身的选中次数不算入比较。
      expect(counts[2], greaterThan(1.8 * counts[0]!));
      expect(counts[0], greaterThan(0));
    }
  });

  test('城市易主后立即按新领地计数，玩家扩张同样引发围攻倾向', () {
    final counts = _draws(extras: 2, transferExtrasTo: 0);
    expect(counts[0], greaterThan(1.8 * counts[2]!));
    expect(counts[2], greaterThan(0));
  });

  test('目标国再大也不能越过补给预算，负担不起的远征不会抽中', () {
    final counts = _draws(
      samples: 60,
      left: 60,
      right: 110,
      extras: 4,
      gold: 12,
    );
    expect(counts, {0: 60});
  });

  test('营地恢复进攻也按部队当前位置加权，沿用同一套目标策略', () {
    final counts = _draws(samples: 180, recovering: true);
    expect(counts[0], greaterThan(2 * counts[2]!));
    expect(counts[2], greaterThan(0));
  });
}
