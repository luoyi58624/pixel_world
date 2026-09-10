import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

void main() {
  final heroes = decodeRomHeroes(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  );
  final worlds = decodeWorlds(
    File('assets/maps/worlds.json').readAsStringSync(),
    setup: CampaignSetup.decode(
      File('assets/data/campaign_config.json').readAsStringSync(),
    ),
  );
  final weapons = WeaponCatalog.decode(
    File('assets/data/rom_weapons.json').readAsStringSync(),
  );
  Map<String, dynamic> jsonState(CampaignState c) =>
      jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;

  test('完整快照恢复后经济随机流与时间零头连续，连续推进仍得到同一结果', () {
    final original = CampaignState.fromRom(
      worlds.first,
      heroes,
      aiEnabled: false,
      weaponCatalog: weapons,
    );
    addTearDown(original.dispose);
    original.advance(2.345);
    final data = jsonState(original);
    final restored = CampaignSnapshots.restore(
      data,
      worlds.first,
      heroes,
      weapons,
    );
    addTearDown(restored.dispose);
    expect(jsonState(restored), data);
    for (var i = 0; i < 1200; i++) {
      original.advance(1 / 60);
      restored.advance(1 / 60);
    }
    expect(jsonState(restored), jsonState(original));
  });

  test('攻城中途恢复共享生命与排队状态，后续战果完全一致', () {
    final original = CampaignState.fromRom(
      worlds.first,
      heroes,
      aiEnabled: false,
      weaponCatalog: weapons,
      startingGold: 10000,
    );
    addTearDown(original.dispose);
    final hero = original.heroes.firstWhere((h) => h.isPlayer);
    final target = worlds.first.cities.firstWhere(
      (city) => original.cities[city.id]!.ownerCountryId != 0,
    );
    final march = original.dispatch(hero, target)!;
    march.position = march.destination;
    for (var i = 0; i < 400 && original.battles.isEmpty; i++) {
      original.advance(1 / 60);
    }
    expect(original.battles, isNotEmpty);
    for (var i = 0; i < 100; i++) {
      original.advance(1 / 60);
    }
    final restored = CampaignSnapshots.restore(
      jsonState(original),
      worlds.first,
      heroes,
      weapons,
    );
    addTearDown(restored.dispose);
    expect(
      identical(
        restored.battles[target.id]!.attacker.health,
        restored.battles[target.id]!.simulation.attacker.general,
      ),
      isTrue,
    );
    expect(jsonState(restored), jsonState(original));
    for (var i = 0; i < 600; i++) {
      original.advance(1 / 60);
      restored.advance(1 / 60);
    }
    expect(jsonState(restored), jsonState(original));
  });
}
