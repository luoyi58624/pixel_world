import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/campaign_setup.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_assets.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';

Map<String, dynamic> configJson() =>
    jsonDecode(File('assets/data/campaign_config.json').readAsStringSync())
        as Map<String, dynamic>;
String mapJson() => File('assets/maps/worlds.json').readAsStringSync();
List<RomHeroDefinition> heroes() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());
Map<String, dynamic> city(
  Map<String, dynamic> data, {
  int map = 0,
  int index = 0,
}) => data['worlds'][map]['cities'][index] as Map<String, dynamic>;

class _Normal implements math.Random {
  @override
  int nextInt(int max) => 0;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0;
}

void main() {
  test('正式JSON覆盖每张地图每座城与所有国家，月产出和储备独立配置', () {
    final setup = CampaignSetup.decode(jsonEncode(configJson()));
    final worlds = decodeWorlds(mapJson(), setup: setup);
    expect(setup.countries.length, 16);
    expect(
      setup.cities.length,
      worlds.fold<int>(0, (n, world) => n + world.cities.length),
    );
    for (final world in worlds) {
      final c = CampaignState.fromRom(world, heroes(), aiEnabled: false);
      expect(c.gold, 50);
      expect(c.goldFor(1), 70);
      expect(c.configFor(1).garrisonHeroes, 2);
      expect(c.cities[0]!.baseIncome, 10);
      expect(c.cities[1]!.baseIncome, 20);
      for (final item in world.cities) {
        final initial = setup.cities[(world.id, item.id)]!;
        expect(
          c.cities[item.id]!.reserveSoldiers,
          initial.initialReserveSoldiers,
        );
        expect(c.cities[item.id]!.level, initial.initialLevel);
        expect(
          c.cities[item.id]!.income,
          initial.baseIncome + (initial.initialLevel - 1) * 5,
        );
      }
    }
  });

  test('修改JSON改变开局、建筑和实际月结，切图独立，重新开始仍用当前配置', () {
    final data = configJson();
    data['countries'][0]['initialGold'] = 123;
    data['countries'][0]['garrisonHeroes'] = 3;
    city(data).addAll({
      'baseIncome': 27,
      'initialLevel': 3,
      'initialReserveSoldiers': 17,
    });
    city(data, map: 1).addAll({
      'baseIncome': 31,
      'initialLevel': 5,
      'initialReserveSoldiers': 30,
    });
    final setup = CampaignSetup.decode(jsonEncode(data));
    final worlds = decodeWorlds(mapJson(), setup: setup);
    final controller = WorldController(
      worlds,
      heroCatalog: heroes(),
      aiEnabled: false,
    );
    addTearDown(controller.dispose);
    final c = controller.campaign;
    expect(c.gold, 123);
    expect(c.cities[0]!.income, 37);
    expect(c.cities[0]!.level, 3);
    expect(c.cities[0]!.reserveSoldiers, 17);
    expect(c.cityBounds(c.world.cities.first).width, 48);
    expect(c.world.cities.first.initialLevel, 1);
    final monthly = CampaignState.fromRom(
      worlds.first,
      heroes(),
      aiEnabled: false,
      economyRandom: _Normal(),
    );
    monthly.advance(60);
    expect(monthly.gold, 123 + 37 - monthly.salaryCost);
    expect(monthly.lastSettlementFor(0)!.baseIncome, 37);
    controller.switchWorld(1);
    expect(controller.campaign.cities[0]!.level, 5);
    expect(controller.campaign.cities[0]!.reserveSoldiers, 30);
    expect(controller.campaign.cities[0]!.income, 51);
    controller.campaign.heroes.firstWhere((hero) => hero.sourceId == 40).hp = 0;
    controller.tick(0.02);
    controller.restartCampaign();
    expect(controller.campaign.gold, 123);
    expect(controller.campaign.cities[0]!.level, 5);
    expect(controller.campaign.cities[0]!.reserveSoldiers, 30);
  });

  test('国家初始货币不按拥有城数重复累加，显式测试覆盖不改写JSON配置', () {
    final data = configJson();
    data['countries'][0]['initialGold'] = 123;
    final map = jsonDecode(mapJson()) as Map<String, dynamic>;
    map['worlds'][0]['cities'][1]['initialOwnerId'] = 0;
    final world = decodeWorlds(
      jsonEncode(map),
      setup: CampaignSetup.decode(jsonEncode(data)),
    ).first;
    final c = CampaignState.fromRom(world, heroes(), aiEnabled: false);
    expect(c.cities.values.where((city) => city.isPlayer).length, 2);
    expect(c.gold, 123);
    final override = CampaignState.fromRom(
      world,
      heroes(),
      aiEnabled: false,
      countryConfigs: {
        0: const CountryConfig(initialGold: 88, garrisonHeroes: 2),
      },
    );
    expect(override.gold, 88);
    expect(override.goldFor(1), 70);
    expect(world.setup.countries[0]!.initialGold, 123);
  });

  testWidgets('正式资源加载将玩法JSON接入控制器，未传额外参数也会生效', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final controller = WorldController(
        assets.worlds,
        heroCatalog: assets.heroCatalog,
        aiEnabled: false,
      );
      expect(controller.campaign.cities[1]!.baseIncome, 20);
      expect(controller.campaign.cities[1]!.income, 25);
      expect(controller.campaign.cities[0]!.reserveSoldiers, 10);
      expect(controller.campaign.goldFor(3), 80);
      controller.dispose();
      assets.dispose();
    });
  });

  test('零产出零兵员零资金合法，读取后配置不可变', () {
    final data = configJson();
    city(data).addAll({'baseIncome': 0, 'initialReserveSoldiers': 0});
    data['countries'][0]['initialGold'] = 0;
    final setup = CampaignSetup.decode(jsonEncode(data));
    final c = CampaignState.fromRom(
      decodeWorlds(mapJson(), setup: setup).first,
      heroes(),
      aiEnabled: false,
    );
    expect(c.gold, 0);
    expect(c.cities[0]!.income, 0);
    expect(c.cities[0]!.reserveSoldiers, 0);
    expect(() => setup.countries.clear(), throwsUnsupportedError);
    expect(() => setup.cities.clear(), throwsUnsupportedError);
  });

  test('错误类型、负数、等级越界和重复编号明确报错', () {
    final edits = <void Function(Map<String, dynamic>)>[
      (data) => city(data)['initialLevel'] = 0,
      (data) => city(data)['initialLevel'] = 6,
      (data) => city(data)['initialReserveSoldiers'] = -1,
      (data) => city(data)['baseIncome'] = -1,
      (data) => city(data)['baseIncome'] = '20',
      (data) => city(data)['baseIncome'] = 2.5,
      (data) => city(data)['baseincome'] = 10,
      (data) => data['countries'][0]['initialGold'] = -1,
      (data) => data['countries'][0]['garrisonHeroes'] = -1,
      (data) => data['countries'].add(data['countries'][0]),
      (data) => data['worlds'].add(data['worlds'][0]),
      (data) => data['worlds'][0]['cities'].add(data['worlds'][0]['cities'][0]),
    ];
    for (final edit in edits) {
      final data = configJson();
      edit(data);
      expect(
        () => CampaignSetup.decode(jsonEncode(data)),
        throwsFormatException,
      );
    }
  });

  test('配置指向不存在的地图或城池时不能悄悄使用默认值', () {
    for (final edit in <void Function(Map<String, dynamic>)>[
      (data) => city(data)['id'] = 999,
      (data) => data['worlds'][0]['id'] = 99,
      (data) => data['worlds'].add({'id': 99, 'cities': []}),
    ]) {
      final data = configJson();
      edit(data);
      final setup = CampaignSetup.decode(jsonEncode(data));
      expect(
        () => decodeWorlds(mapJson(), setup: setup),
        throwsFormatException,
      );
    }
  });

  test('初始兵员按实际英雄计算容量，一级三将允许十六兵，超过时在创建战役时报错', () {
    final data = configJson();
    city(data)['initialReserveSoldiers'] = 16;
    final setup = CampaignSetup.decode(jsonEncode(data));
    final c = CampaignState.fromRom(
      decodeWorlds(mapJson(), setup: setup).first,
      heroes(),
    );
    expect(c.cities[0]!.reserveSoldiers, 16);
    expect(c.cities[0]!.reserveCapacity, 16);
    city(data)['initialReserveSoldiers'] = 17;
    final invalid = CampaignSetup.decode(jsonEncode(data));
    expect(
      () => CampaignState.fromRom(
        decodeWorlds(mapJson(), setup: invalid).first,
        heroes(),
      ),
      throwsArgumentError,
    );
  });
}
