import '../../support/ongoing_fixture.dart';

import 'package:pixel_world/core/geometry/flutter_geometry.dart';

import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/cities/domain/city_contact.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/fixed_siege_random.dart';

CampaignState _campaign([int map = 0]) => ongoingCampaign(
  CampaignState.fromRom(
    aiEnabled: false,
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync())[map],
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
    startingGold: 10000,
    siegeRandom: const FixedSiegeRandom(),
    retreatRandom: const FixedSiegeRandom(.9),
  ),
  stock: 0,
  year: 3,
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
    expect(city.income, 86);
    expect(city.baseUpgradeCost, 30);
    final c = _campaign();
    c.settledMonths++;
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    c.settledMonths++;
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
    expect(c.cities[1]!.income, c.cities[1]!.baseIncome);
    expect(c.cityBounds(city).size.toUi, const ui.Size(32, 48));
    expect(hero.cityId, 1);
    expect(c.garrisonAt(1), [hero]);
  });

  test('升级扩建后点击和出城使用新范围，友军进驻不重置等级', () {
    final c = _campaign();
    final home = c.world.cities.first;
    c.settledMonths++;
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    c.settledMonths++;
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    final expanded = c.cityBounds(home);
    expect(expanded.size.toUi, const ui.Size(48, 48));
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
    c.settledMonths++;
    c.upgradeCity(1, hero: governor);
    c.settledMonths++;
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
    expect(c.cityBounds(city).size.toUi, const ui.Size(48, 64));
    for (var i = 0; i < 120 && !battle.simulation.canRetreat; i++) {
      c.advance(1 / 60);
    }
    final simulation = battle.simulation;
    expect(c.retreatHero(hero.id), isTrue);
    for (var i = 0; i < 180 && battle.isActive; i++) {
      c.advance(1 / 60);
    }
    expect(c.cities[1]!.level, 3);
    expect(c.cityBounds(city).size.toUi, const ui.Size(48, 48));
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
}
