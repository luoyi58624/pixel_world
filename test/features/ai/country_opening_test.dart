import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/core/geometry/geometry.dart';

import '../../support/national_ai_fixture.dart' show advanceAi;

import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

CampaignState _game({
  bool ai = true,
  int guards = 2,
  int level = 2,
  int gold = 1000,
  bool largeArmy = false,
}) {
  final records = [
    (0, 90, 65, [40]),
    (
      1,
      10,
      20,
      [
        0,
        2,
        3,
        4,
        if (largeArmy) ...[9, 10, 11],
      ],
    ),
    (2, 70, 20, [5, 6, 7, 8]),
    (3, 20, 50, [18]),
    (4, 65, 50, [19]),
  ];
  final setup = CampaignSetup.decode(
    jsonEncode({
      'version': 1,
      'countries': [
        for (var id = 0; id < 5; id++)
          {'id': id, 'initialGold': id == 1 || id == 2 ? gold : 0},
      ],
      'worlds': [
        {
          'id': 0,
          'cities': [
            for (final row in records)
              {
                'id': row.$1,
                'initialLevel': row.$1 == 1
                    ? level
                    : row.$1 < 3
                    ? 2
                    : 1,
                'baseIncome': 10,
                'initialReserveSoldiers': row.$1 == 1 || row.$1 == 2 ? 12 : 4,
                'requiredGarrison': row.$1 == 1 ? guards : 2,
              },
          ],
        },
      ],
    }),
  );
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 110,
      'height': 85,
      'tiles': List.filled(9350, 0),
      'cities': [
        for (final row in records)
          {
            'id': row.$1,
            'x': row.$2,
            'y': row.$3,
            'initialOwnerId': row.$1,
            'initialLevel': 2,
            'unitIds': row.$4,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
          },
      ],
    },
    [0, 1, 2, 3],
    setup: setup,
  );
  final ids = records.expand((r) => r.$4).toSet();
  return CampaignState.fromRom(
    world,
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync())
        .where((h) => ids.contains(h.id))
        .toList(),
    weaponCatalog: WeaponCatalog.decode(
      File('assets/data/rom_weapons.json').readAsStringSync(),
    ),
    aiEnabled: ai,
    aiWorkerFactory: SynchronousAiWorker.new,
    aiRandom: math.Random(7),
    economyRandom: math.Random(11),
  );
}

void main() {
  test('第一帧立即规划，各国按实际战力出征并保留最低驻军', () {
    final c = _game();
    expect(c.marches, isEmpty);
    c.advance(1 / 60);
    expect(c.aiStrategicDecisions, 1);
    expect(c.marches, isEmpty);
    advanceAi(c, .5);
    expect(c.marches.values.where((m) => m.hero.countryId == 1).length, 1);
    expect(c.garrisonAt(1).length, 3);
    for (var i = 0; i < 4; i++) {
      final before = c.aiStrategicDecisions;
      c.advance(1 / 60);
      expect(c.aiStrategicDecisions - before, lessThanOrEqualTo(1));
    }
    expect(c.marches.values.where((m) => m.hero.countryId == 2).length, 2);
    expect(c.garrisonAt(2).length, 2);
    expect(c.marches.values.any((m) => m.hero.countryId == 0), isFalse);
    expect(c.marches.values.map((m) => m.target!.id).toSet(), {3, 4});
    for (final country in [1, 2]) {
      expect(
        c.goldFor(country),
        greaterThanOrEqualTo(c.aiBudgetFor(country).reserveGold),
      );
    }
  });

  test('留守按当前局势计算，不再受固定人数配置限制', () {
    final c = _game(level: 5, guards: 1, largeArmy: true);
    advanceAi(c, .5);

    expect(c.garrisonAt(1).length, 6);
    expect(c.marches.values.where((m) => m.hero.countryId == 1).length, 1);
    c.cities[1]!.ownerCountryId = 2;
    expect(c.cities[1]!.level, 1);
  });

  test('没有粮草不强行出征或购置，国库不会被全面进攻花空', () {
    final c = _game(gold: 1);
    c.advance(.2);
    expect(c.marches, isEmpty);
    expect(c.goldFor(1), 1);
    expect(c.goldFor(2), 1);
  });

  test('抵达城下按每支部队记录受袭仇恨，排队及每帧不重复增加，记录有方向', () {
    final c = _game(ai: false);
    final before = c.targetPreferenceFor(3, 1);
    for (final hero in c.garrisonAt(1).take(2).toList()) {
      final m = c.dispatch(hero, c.world.cities[3], countryId: 1)!;
      expect(c.hatredFor(3, 1), 0);
      m.position = m.destination;
    }
    c.advance(1 / 60);
    expect(c.hatredFor(3, 1), 40);
    expect(c.targetPreferenceFor(3, 1), greaterThan(before));
    expect(c.hatredFor(1, 3), 0);
    c.advance(.5);
    expect(c.hatredFor(3, 1), 40);
    expect(c.battles[3], isNotNull);
  });

  test('野战双方各自记录受袭，仇恨不跨国家串用', () {
    final c = _game(ai: false);
    for (final country in [1, 2]) {
      final m = c.dispatchTo(
        c.garrisonAt(country).first,
        const GamePoint(720, 1000),
        countryId: country,
      )!;
      m.position = m.destination;
    }
    c.advance(1 / 60);
    expect(c.fieldBattles.length, 1);
    expect(c.hatredFor(1, 2), 20);
    expect(c.hatredFor(2, 1), 20);
    expect(c.hatredFor(0, 1), 0);
    c.advance(.5);
    expect(c.hatredFor(1, 2), 20);
  });

  test('多支军队围攻仇恨最多一百，换地图重新开局没有旧仇恨', () {
    final c = _game(ai: false, largeArmy: true);
    for (final h in c.garrisonAt(1).toList()) {
      final m = c.dispatch(h, c.world.cities[3], countryId: 1)!;
      m.position = m.destination;
    }
    c.advance(1 / 60);
    expect(c.hatredFor(3, 1), 100);
    expect(_game(ai: false).hatredFor(3, 1), 0);
  });
}
