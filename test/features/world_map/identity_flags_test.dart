import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/domain/hero_sprite.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

List<RomHeroDefinition> _heroes() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());
List<WorldDefinition> _worlds() =>
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync());

void main() {
  test('希列洛及其之前的十名英雄是高级将领，后续普通，主角单列', () {
    final heroes = _heroes();
    expect(heroes[10].name, '希列洛');
    expect(
      heroes.skip(1).take(10).every((hero) => hero.type == HeroType.advanced),
      isTrue,
    );
    expect(
      heroes.skip(11).take(30).every((hero) => hero.type == HeroType.normal),
      isTrue,
    );
    expect(heroes.first.type, HeroType.protagonist);
    for (final definition in heroes) {
      final hero = CampaignHero.fromRom(definition, cityId: 0, countryId: 0);
      expect(hero.type, definition.type);
      expect(hero.appearance, switch (definition.type) {
        HeroType.normal => HeroAppearance.normal,
        HeroType.advanced => HeroAppearance.advanced,
        HeroType.protagonist => HeroAppearance.protagonist,
      });
    }
  });

  test('三张地图都有原版城名及初始国家，国旗目录包含特殊地点标记', () {
    for (final world in _worlds()) {
      expect(world.cities.take(3).map((city) => city.name), [
        '阿尔马',
        '奥尔梅',
        '马易',
      ]);
      expect(world.countries.length, 16);
      expect(
        world.countries.map((country) => country.flagIndex),
        List.generate(16, (i) => i),
      );
      for (final city in world.cities) {
        expect(city.label, world.countryName(city.initialOwnerId));
        expect(city.label, isNot(startsWith('城池 ')));
      }
    }
    expect(_worlds()[2].cities.last.label, '贝尔');
  });

  test('进攻马易失败不改变阿尔马城的归属、国旗和城名', () {
    final world = _worlds().first;
    final campaign = CampaignState.fromRom(world, _heroes(), aiEnabled: false);
    final hero = campaign.heroes.firstWhere((hero) => hero.sourceId == 40)
      ..hp = 1;
    for (final soldier in hero.squad) {
      soldier.hp = 0;
    }
    final march = campaign.dispatch(hero, world.cities[2])!;
    march.position = march.destination;
    march.phase = MarchPhase.awaitingBattle;
    for (var i = 0; i < 1200 && campaign.marches.isNotEmpty; i++) {
      campaign.advance(0.05);
    }
    expect(campaign.cities[0]!.ownerCountryId, 0);
    expect(campaign.cities[0]!.isPlayer, isTrue);
    expect(world.countryName(campaign.cities[0]!.ownerCountryId), '阿尔马');
    expect(world.cities[0].label, '阿尔马');
  });

  test('占领后改挂玩家国旗，保留原城名，其他国家旗帜不变', () {
    final world = _worlds().first;
    final campaign = CampaignState.fromRom(world, _heroes(), aiEnabled: false);
    final hero = campaign.heroes.firstWhere((hero) => hero.sourceId == 40);
    final march = campaign.dispatch(hero, world.cities[2])!;
    march.position = march.destination;
    for (var i = 0; i < 7200 && !campaign.cities[2]!.isPlayer; i++) {
      final battle = campaign.battles[2];
      if (battle != null && battle.isActive) battle.defender.hp = 0;
      campaign.advance(1 / 60);
    }
    expect(campaign.cities[2]!.level, 1);
    expect(campaign.cities[2]!.ownerCountryId, 0);
    expect(world.cities[2].label, '马易');
    expect(campaign.cities[1]!.ownerCountryId, 1);
    expect(hero.countryId, 0);
  });

  test('原悬浮国旗位置不再拦截点击，点击城堡本体仍能选城与出击', () {
    final c = WorldController(_worlds(), heroCatalog: _heroes());
    c.camera.resize(const GameSize(800, 600));
    final home = c.world.cities.first;
    c.tap(c.camera.toScreen(home.bounds.topCenter) - const GamePoint(0, 15));
    expect(c.selectedCity, isNull);
    c.tap(c.camera.toScreen(home.bounds.center));
    expect(c.selectedCity, home);
    c.prepareDispatch();
    final enemy = c.world.cities[2];
    c.camera.center = enemy.bounds.center;
    c.camera.constrain();
    c.tap(c.camera.toScreen(enemy.bounds.topCenter) - const GamePoint(0, 15));
    expect(c.pendingHero, isNull);
    expect(c.campaign.marches.values.single.target, isNull);
    c.openUnit(c.campaign.marches.keys.single);
    c.prepareMove();
    c.tap(c.camera.toScreen(enemy.bounds.center));
    expect(c.pendingHero, isNull);
    expect(c.campaign.marches.values.single.target, enemy);
    c.dispose();
  });
}
