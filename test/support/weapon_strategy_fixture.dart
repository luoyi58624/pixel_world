import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/weapon.dart';
import 'package:pixel_world/world/world_data.dart';

import 'fixed_siege_random.dart';

/// 加载原版武器目录，可给指定国家设置可复核的测试库存。
WeaponCatalog testWeaponCatalog({Map<String, dynamic> stock = const {}}) {
  final data = jsonDecode(
    File('assets/data/rom_weapons.json').readAsStringSync(),
  );
  data['initialCountryStock'] = stock;
  return WeaponCatalog.decode(jsonEncode(data));
}

/// 隔离其他国家的购买行为，构造可调整防守强度与兵力的战略地图。
CampaignState weaponStrategyCampaign({
  int gold = 1000,
  bool ai = false,
  int targetLevel = 1,
  List<int> targetHeroes = const [26],
  int enemyStock = 4,
  List<int> sourceHeroes = const [0, 2, 18, 19],
  int sourceLevel = 2,
  bool easyNeighbor = false,
  bool recruitment = false,
  bool fortifiedCapital = false,
  WeaponCatalog? catalog,
  math.Random? weaponRandom,
}) {
  final records = [
    (0, 75, 42, 0, 5, [40]),
    (1, 18, 16, 1, sourceLevel, sourceHeroes),
    (2, 39, 16, 2, targetLevel, targetHeroes),
    if (easyNeighbor) (3, 18, 34, 3, 1, <int>[]),
  ];
  final ids = records.expand((r) => r.$6).toSet();
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 80,
      'height': 48,
      'tiles': List.filled(3840, 0),
      'cities': [
        for (final r in records)
          {
            'id': r.$1,
            'name': '测试城${r.$1}',
            'x': r.$2,
            'y': r.$3,
            'initialOwnerId': r.$4,
            'initialLevel': r.$5,
            'unitIds': r.$6,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final heroData = jsonDecode(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  );
  if (fortifiedCapital) {
    final capitalHero = (heroData['heroes'] as List).firstWhere(
      (h) => h['id'] == 40,
    );
    capitalHero['combat'] = 63;
    capitalHero['maxHp'] = 255;
  }
  final c = CampaignState.fromRom(
    world,
    decodeRomHeroes(jsonEncode(heroData))
        .where((h) => recruitment || ids.contains(h.id))
        .toList(),
    weaponCatalog: catalog ?? testWeaponCatalog(),
    weaponRandom: weaponRandom,
    aiEnabled: ai,
    countryConfigs: {
      0: const CountryConfig(initialGold: 1000),
      1: CountryConfig(initialGold: gold),
      2: const CountryConfig(initialGold: 0),
      3: const CountryConfig(initialGold: 0),
    },
    aiRandom: math.Random(7),
    recruitmentRandom: const FixedSiegeRandom(),
    economyRandom: const FixedSiegeRandom(),
    siegeRandom: const FixedSiegeRandom(),
    retreatRandom: const FixedSiegeRandom(.9),
  );
  c.countryTroops[2] = CountryTroops(reserveSoldiers: enemyStock);
  c.countryTroops[0] = CountryTroops(reserveSoldiers: 4);
  return c;
}

/// 按原编号取得将领。
CampaignHero weaponHero(CampaignState c, int id) =>
    c.heroes.firstWhere((h) => h.sourceId == id);
