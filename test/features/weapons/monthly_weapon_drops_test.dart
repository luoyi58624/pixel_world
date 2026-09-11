import 'dart:io';
import 'dart:math' as math;
import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/core/persistence/state_random.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class Rolls implements math.Random {
  Rolls(this.values);
  final List<int> values;
  int calls = 0;
  @override
  int nextInt(int max) {
    expect(max, 100);
    return values[calls++ % values.length];
  }

  @override
  bool nextBool() => throw UnsupportedError('不用布尔抽取');
  @override
  double nextDouble() => throw UnsupportedError('使用整数百分比边界');
}

final catalog = WeaponCatalog.decode(
  File('assets/data/rom_weapons.json').readAsStringSync(),
);
CampaignState campaign(
  int owned,
  math.Random random, {
  int total = 8,
  WeaponCatalog? weapons,
}) {
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 40,
      'height': 40,
      'tiles': List.filled(1600, 0),
      'cities': [
        for (var i = 0; i < total; i++)
          {
            'id': i,
            'name': '城$i',
            'initialOwnerId': i < owned ? 0 : 1,
            'x': 2 + i % 7 * 4,
            'y': 2 + i ~/ 7 * 10,
            'width': 1,
            'height': 1,
            'shape': [3],
            'unitIds': <int>[],
          },
      ],
    },
    [0, 1, 2, 3],
  );
  return CampaignState.fromRom(
    world,
    [],
    aiEnabled: false,
    startingGold: 1000,
    weaponCatalog: weapons ?? catalog,
    weaponDropRandom: random,
  );
}

void main() {
  test('概率数组可以调整，零关闭掉落、一百必定掉落', () {
    expect(catalog.monthlyDropPercents, [25, 5, 5]);
    final data = jsonDecode(
      File('assets/data/rom_weapons.json').readAsStringSync(),
    ) as Map<String, dynamic>;
    data['monthlyDropPercents'] = [100, 0, 100];
    final adjusted = WeaponCatalog.decode(jsonEncode(data));
    final random = Rolls([99]), c = campaign(7, random, weapons: adjusted);
    addTearDown(c.dispose);
    c.advance(GameConfig.secondsPerMonth);
    expect(c.weaponInventoryFor(0), {12: 1, 14: 1});
    expect(random.calls, 2);
    expect(adjusted.weapons[12]!.dropHint, contains('100%'));
  });
  test('概率数组校验长度和百分比范围', () {
    final data = jsonDecode(
      File('assets/data/rom_weapons.json').readAsStringSync(),
    ) as Map<String, dynamic>;
    for (final values in [
      [],
      [25, 5],
      [25, 5, 5, 5],
      [-1, 5, 5],
      [101, 5, 5],
      ['25', 5, 5],
    ]) {
      data['monthlyDropPercents'] = values;
      expect(
        () => WeaponCatalog.decode(jsonEncode(data)),
        throwsFormatException,
      );
    }
  });
  for (final count in [4, 5, 6, 7, 8]) {
    test('占领$count座城按至少5、6、7门槛掉落，不受第五年限制', () {
      final random = Rolls([0]), c = campaign(count, random);
      addTearDown(c.dispose);
      c.advance(GameConfig.secondsPerMonth);
      for (var i = 0; i < 3; i++) {
        expect(c.weaponStockFor(0, 12 + i), count >= 5 + i ? 1 : 0);
      }
      expect(random.calls, count < 5 ? 0 : math.min(3, count - 4));
      expect(c.settledMonths, 1);
    });
  }
  test('25%、5%、5%边界独立判定，同月可以同时掉落', () {
    final random = Rolls([25, 5, 5, 24, 4, 4]), c = campaign(7, random);
    addTearDown(c.dispose);
    c.advance(GameConfig.secondsPerMonth);
    expect(c.weaponInventoryFor(0), isEmpty);
    c.advance(GameConfig.secondsPerMonth);
    expect(c.weaponInventoryFor(0), {12: 1, 13: 1, 14: 1});
    expect(random.calls, 6);
    expect(
      c.events
          .forCountry(0)
          .timeline()
          .where((e) => e.kind == GameEventKind.weaponDropped),
      hasLength(3),
    );
  });
  test('玩家和其他国家遵循同样规则，暂停不抽取、失去领土立即失去资格', () {
    final random = Rolls([0]), c = campaign(7, random, total: 14);
    addTearDown(c.dispose);
    c.setPaused(true);
    c.advance(GameConfig.secondsPerMonth * 5);
    expect(random.calls, 0);
    c.setPaused(false);
    c.advance(GameConfig.secondsPerMonth);
    expect(c.weaponInventoryFor(0), {12: 1, 13: 1, 14: 1});
    expect(c.weaponInventoryFor(1), {12: 1, 13: 1, 14: 1});
    for (var i = 0; i < 3; i++) {
      c.cities[i]!.ownerCountryId = 1;
    }
    c.advance(GameConfig.secondsPerMonth);
    expect(c.weaponInventoryFor(0), {12: 1, 13: 1, 14: 1});
    expect(c.weaponInventoryFor(1), {12: 2, 13: 2, 14: 2});
  });
  test('三种武器任何年份都不能购买，AI规则也不允许采购', () {
    final c = campaign(7, Rolls([0]))..settledMonths = 120;
    addTearDown(c.dispose);
    final gold = c.gold;
    for (final id in [12, 13, 14]) {
      expect(c.buyWeapon(id), isFalse);
      expect(c.weaponPurchaseBlockReason(id), contains('随机掉落'));
      expect(c.aiRulesForTesting().weapons[id]!.shopEnabled, isFalse);
    }
    expect(c.gold, gold);
    expect(c.weaponInventoryFor(0), isEmpty);
  });
  test('掉落随机源随存档恢复，读档不改变后续掉落或收成', () {
    final c = campaign(7, StateRandom(912));
    addTearDown(c.dispose);
    c.advance(GameConfig.secondsPerMonth * 2);
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    final restored = CampaignSnapshots.restore(saved, c.world, [], catalog);
    addTearDown(restored.dispose);
    for (var month = 0; month < 12; month++) {
      c.advance(GameConfig.secondsPerMonth);
      restored.advance(GameConfig.secondsPerMonth);
      expect(restored.weaponInventoryFor(0), c.weaponInventoryFor(0));
      expect(restored.gold, c.gold);
    }
  });
}
