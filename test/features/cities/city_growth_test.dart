import 'package:pixel_world/core/geometry/flutter_geometry.dart';
import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/cities/domain/city_appearance.dart';
import 'package:pixel_world/features/cities/domain/city_contact.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/data/world_assets.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

import '../../support/fixed_siege_random.dart';

CampaignState _campaign([int map = 0]) => CampaignState.fromRom(
  aiEnabled: false,
  decodeWorlds(File('assets/maps/worlds.json').readAsStringSync())[map],
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  startingGold: 10000,
  siegeRandom: const FixedSiegeRandom(),
  retreatRandom: const FixedSiegeRandom(.9),
);

void main() {
  test('任意国家易主都重置一级、产出和升级费用，同国赋值不降级', () {
    final city = CitySituation(
      ownerCountryId: 1,
      defense: 100,
      baseIncome: 86,
      initialLevel: 5,
    );
    city.ownerCountryId = 1;
    expect(city.level, 5);
    city.ownerCountryId = 0;
    expect(city.level, 1);
    expect(city.income, 43);
    expect(city.baseUpgradeCost, 30);
    final c = _campaign();
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    c.cities[0]!.ownerCountryId = 0;
    expect(c.cities[0]!.level, 3);
    c.cities[0]!.ownerCountryId = 2;
    expect(c.cities[0]!.level, 1);
  });

  test('直接占领没有守将的四级城，也重置一级并保留胜利英雄', () {
    final c = _campaign(2);
    final city = c.world.cities[1];
    expect(c.cities[1]!.level, 4);
    c.heroes.removeWhere((hero) => hero.cityId == 1);
    final hero = c.heroes.firstWhere((hero) => hero.sourceId == 40);
    final march = c.dispatch(hero, city)!;
    march.position = march.destination;
    c.advance(0.02);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.cities[1]!.level, 1);
    expect(c.cities[1]!.income, c.cities[1]!.baseIncome ~/ 2);
    expect(c.cityBounds(city).size, const ui.Size(32, 48));
    expect(hero.cityId, 1);
    expect(c.garrisonAt(1), [hero]);
  });

  test('升级扩建后点击和出城使用新范围，友军进驻不重置等级', () {
    final c = _campaign();
    final home = c.world.cities.first;
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    final expanded = c.cityBounds(home);
    expect(expanded.size, const ui.Size(48, 48));
    expect(expanded.bottomLeft, home.bounds.bottomLeft);
    final addedWing = ui.Offset(home.bounds.right + 8, home.bounds.bottom - 8);
    expect(home.bounds.contains((addedWing).toGame), isFalse);
    expect(c.cityAt((addedWing).toGame), home);
    final hero = c.heroes.firstWhere((hero) => hero.sourceId == 0);
    final march = c.dispatchTo(
      hero,
      expanded.centerRight + (const ui.Offset(80, 0)).toGame,
    )!;
    expect(march.position.dx, expanded.right + 8);
    march.position += (const ui.Offset(32, 0)).toGame;
    c.moveTo(hero.id, expanded.center);
    march.position = march.destination;
    c.advance(0.02);
    expect(c.marches.containsKey(hero.id), isFalse);
    expect(c.cities[0]!.level, 3);
  });

  test('行军目标扩建时更新接触点，抵达后不会钻进旧城堡范围', () {
    final c = _campaign();
    final city = c.world.cities[1];
    c.cities[1]!.ownerCountryId = 0;
    final governor = c.heroes.firstWhere((hero) => hero.sourceId == 0)
      ..cityId = 1;
    final small = c.cityBounds(city);
    final hero = c.heroes.firstWhere((hero) => hero.sourceId == 40);
    final march = c.dispatch(hero, city)!;
    march.position = small.centerRight + (const ui.Offset(30, 0)).toGame;
    c.upgradeCity(1, hero: governor);
    c.upgradeCity(1, hero: governor);
    expect(march.destination.dx, c.cityBounds(city).right + 8);
    c.advance(1);
    expect(c.marches.containsKey(hero.id), isFalse);
    expect(hero.cityId, 1);
    expect(c.cities[1]!.level, 3);
  });

  test('连续交战不缩小建筑，进攻结束后才按判定降级并同步接触位置', () {
    final c = _campaign(2);
    final city = c.world.cities[1];
    final defender = c.garrisonAt(1).last..hp = 1;
    for (final soldier in defender.squad) {
      soldier.hp = 0;
    }
    final hero = c.heroes.firstWhere((hero) => hero.sourceId == 40);
    final march = c.dispatch(hero, city)!;
    march.position = march.destination;
    c.advance(0.02);
    final battle = c.battles[1]!;
    for (var i = 0; i < 1200 && battle.nextWaveIn == 0; i++) {
      c.advance(1 / 60);
    }
    expect(c.cities[1]!.level, 4);
    expect(c.cityBounds(city).size, const ui.Size(48, 64));
    for (var i = 0; i < 120 && !battle.simulation.canRetreat; i++) {
      c.advance(1 / 60);
    }
    final simulation = battle.simulation;
    expect(c.retreatHero(hero.id), isTrue);
    for (var i = 0; i < 180 && battle.isActive; i++) {
      c.advance(1 / 60);
    }
    expect(c.cities[1]!.level, 3);
    expect(c.cityBounds(city).size, const ui.Size(48, 48));
    final contact = CityContact.forAppearance(city.appearanceAt(3));
    final localPosition = march.position - c.cityBounds(city).topLeft;
    expect(
      (contact.nearest(localPosition) - localPosition).distance,
      lessThan(1e-7),
    );
    expect(battle.simulation, same(simulation));
    expect(battle.nextWaveIn, 0);
    expect(battle.isActive, isFalse);
  });

  testWidgets('五级原版建筑各不相同，降级和易主还原画面且不残留旧城堡', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final c = WorldController(assets.worlds, heroCatalog: assets.heroCatalog);
      c.campaigns[0] = CampaignState.fromRom(
        aiEnabled: false,
        siegeRandom: const FixedSiegeRandom(),
        c.world,
        assets.heroCatalog,
        startingGold: 10000,
      )..hasDispatched = true;
      final city = c.world.cities.first;
      c.camera.resize((const ui.Size(240, 240)).toGame);
      c.camera.center = city.bounds.bottomLeft + (const ui.Offset(24, -32)).toGame;
      final terrain = assets.scenes[0];
      Future<List<int>> render() async {
        final recorder = ui.PictureRecorder();
        WorldPainter(
          c,
          assets,
        ).paint(ui.Canvas(recorder), const ui.Size(240, 240));
        final picture = recorder.endRecording();
        final image = await picture.toImage(240, 240);
        final pixels = (await image.toByteData())!.buffer
            .asUint8List()
            .toList();
        image.dispose();
        picture.dispose();
        return pixels;
      }

      final frames = <List<int>>[];
      for (var level = 1; level <= 5; level++) {
        if (level > 1) {
          c.campaign.upgradeCity(0, hero: c.campaign.garrisonAt(0).first);
        }
        final image = assets.cityImage(city, level);
        expect(image.width, cityAppearances[level]!.width * 16);
        expect(image.height, cityAppearances[level]!.height * 16);
        expect(assets.cityImage(c.world.cities[1], level), same(image));
        final pixels = await render();
        for (final previous in frames) {
          expect(pixels, isNot(previous));
        }
        frames.add(pixels);
        expect(assets.scenes[0], same(terrain));
      }
      c.campaign.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
      expect(c.campaign.cities[0]!.level, 4);
      expect(await render(), frames[3]);
      c.campaign.cities[0]!.ownerCountryId = 1;
      expect(c.campaign.cities[0]!.level, 1);
      expect(await render(), frames[0]);
      expect(
        c.campaign.cityAt(city.bounds.bottomRight + (const ui.Offset(8, -8)).toGame),
        isNull,
      );
      c.dispose();
      assets.dispose();
    });
  });
}
