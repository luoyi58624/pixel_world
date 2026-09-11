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

  test('新ID库存与随军装备存取后仍对应同名武器', () {
    final data = jsonDecode(
      File('assets/data/rom_weapons.json').readAsStringSync(),
    ) as Map<String, dynamic>;
    data['initialCountryStock'] = {
      '0': {'12': 1, '13': 1, '14': 1},
    };
    final original = CampaignState.fromRom(
      worlds.first,
      heroes,
      aiEnabled: false,
      weaponCatalog: WeaponCatalog.decode(jsonEncode(data)),
      startingGold: 1000,
    )..settledMonths = 48;
    addTearDown(original.dispose);
    for (var id = 0; id < 12; id++) {
      expect(original.buyWeapon(id), isTrue);
    }
    final hero = original.garrisonAt(0).first;
    expect(
      original.dispatch(hero, worlds.first.cities[1], weaponSlots: {0: 1}),
      isNotNull,
    );
    final saved = jsonState(original);
    final restored = CampaignSnapshots.restore(
      saved,
      worlds.first,
      heroes,
      weapons,
    );
    addTearDown(restored.dispose);
    expect(jsonState(restored), saved);
    expect(restored.weaponCatalog.weapons[1]!.name, '斧');
    expect(restored.heroes.firstWhere((h) => h.id == hero.id).weaponIds, [1]);
    expect(restored.weaponStockFor(0, 1), 0);
    expect(restored.weaponStockFor(0, 14), 1);
    expect(restored.weaponCatalog.weapons[14]!.name, '死枪');
  });

  test('旧档续玩采用新月俸且取消旧驻军账单，回放不改历史数值', () {
    final original = CampaignState.fromRom(
      worlds.first,
      heroes,
      aiEnabled: false,
      weaponCatalog: weapons,
    );
    addTearDown(original.dispose);
    final data = jsonState(original)..remove('payrollVersion');
    for (final h in data['people']) h['salary'] = 0;
    data['garrisonBills'] = {'0': 12.5};
    final gold = original.gold;
    final restored = CampaignSnapshots.restore(
      data,
      worlds.first,
      heroes,
      weapons,
    );
    final replay = CampaignSnapshots.restore(
      data,
      worlds.first,
      heroes,
      weapons,
      replay: true,
    );
    addTearDown(restored.dispose);
    addTearDown(replay.dispose);
    for (final h in restored.heroes) {
      expect(h.salary, heroes.firstWhere((d) => d.id == h.sourceId).salary);
    }
    expect(restored.gold, gold, reason: '不追扣历史月俸');
    expect(restored.garrisonUpkeepAccruedFor(0), 0);
    expect(replay.heroes.every((h) => h.salary == 0), isTrue);
    expect(replay.garrisonUpkeepAccruedFor(0), 12.5);
    restored.advance(60);
    expect(restored.lastSettlementFor(0)!.salary, restored.salaryCost);
    expect(restored.lastSettlementFor(0)!.garrisonUpkeep, 0);
  });

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
