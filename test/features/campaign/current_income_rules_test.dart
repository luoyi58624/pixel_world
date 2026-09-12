import 'dart:io';
import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/economy/domain/economy.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class _Pick implements Random {
  _Pick(this.value);
  final int value;
  final bounds = <int>[];
  @override
  int nextInt(int max) {
    bounds.add(max);
    return value;
  }

  @override
  double nextDouble() => 0;
  @override
  bool nextBool() => false;
}

class _PoorMaximum implements Random {
  @override
  int nextInt(int max) => max == 4 ? 2 : max - 1;
  @override
  double nextDouble() => .5;
  @override
  bool nextBool() => false;
}

final _heroes = decodeRomHeroes(
  File('assets/data/heroes.json5').readAsStringSync(),
);

CampaignState _game({Random? random}) {
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 100,
      'height': 40,
      'tiles': List.filled(4000, 0),
      'cities': [
        for (var id = 0; id < 4; id++)
          {
            'id': id,
            'name': '城$id',
            'x': 10 + id * 20,
            'y': 20,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialOwnerId': id == 3 ? 1 : 0,
            'initialLevel': 1,
            'unitIds': id == 0
                ? [40, 0, 2]
                : id == 3
                ? [1]
                : <int>[],
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final c = CampaignState.fromRom(
    world,
    _heroes,
    startingGold: 1000,
    aiEnabled: false,
    economyRandom: random,
  );
  addTearDown(c.dispose);
  return c;
}

void main() {
  test('欠收包含10至20，丰收保持5至10，正常不抽取金额', () {
    for (var i = 0; i <= 10; i++) {
      final random = _Pick(i);
      expect(Harvest.poor.drawAdjustment(random), -10 - i);
      expect(random.bounds, [11]);
    }
    for (var i = 0; i <= 5; i++) {
      final random = _Pick(i);
      expect(Harvest.abundant.drawAdjustment(random), 5 + i);
      expect(random.bounds, [6]);
    }
    final normal = _Pick(0);
    expect(Harvest.normal.drawAdjustment(normal), 0);
    expect(normal.bounds, isEmpty);
  });

  test('三座城月产30，欠收全国只扣20，实际结算与 AI 预算一致', () {
    final c = _game(random: _PoorMaximum());
    expect(c.aiBudgetFor(0).minimumMonthlyIncome, 20);
    expect(c.aiObservationFor(0).nation.poorIncome, 20);
    c.advance(60);
    final bill = c.lastSettlementFor(0)!;
    expect(bill.cityCount, 3);
    expect(bill.baseIncome, 40); // 三城各10，另有国家固定收入10。
    expect(bill.adjustment, -20);
    expect(bill.goldAfter, bill.goldBefore + 20 - bill.salary);
    expect(c.lastSettlementFor(1)!.adjustment, -20);
  });

  test('正式三张地图的每座城月收入为10，升级不增加收入', () {
    final setup = CampaignSetup.decode(
      File('assets/data/campaign_config.json5').readAsStringSync(),
    );
    expect(setup.cities.values.every((c) => c.baseIncome == 10), isTrue);
    expect(GameConfig.cityBaseIncome, 10);
    final c = _game();
    expect(c.upgradeCity(0, hero: c.garrisonAt(0).first), isTrue);
    expect(c.cities[0]!.income, 10);
  });

  test('旧档续玩采用新的城池收入，历史金币和回放收入不被改写', () {
    final c = _game();
    final saved = c.saveState()..remove('cityIncomeVersion');
    for (final city in (saved['cities'] as Map).values) {
      city[2] = 20;
    }
    final resumed = CampaignSnapshots.restore(saved, c.world, _heroes);
    final replay = CampaignSnapshots.restore(
      saved,
      c.world,
      _heroes,
      replay: true,
    );
    addTearDown(resumed.dispose);
    addTearDown(replay.dispose);
    expect(resumed.cities.values.every((city) => city.income == 10), isTrue);
    expect(replay.cities.values.every((city) => city.income == 20), isTrue);
    expect(resumed.gold, c.gold);
  });
}
