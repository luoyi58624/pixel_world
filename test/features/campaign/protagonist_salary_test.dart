import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class _Normal implements Random {
  @override
  int nextInt(int max) => 0;
  @override
  double nextDouble() => 0;
  @override
  bool nextBool() => false;
}

void main() {
  final source = File('assets/data/rom_heroes.json').readAsStringSync();
  final heroes = decodeRomHeroes(source);
  final worlds = decodeWorlds(
    File('assets/maps/worlds.json').readAsStringSync(),
    setup: CampaignSetup.decode(
      File('assets/data/campaign_config.json').readAsStringSync(),
    ),
  );
  final weapons = WeaponCatalog.decode(
    File('assets/data/rom_weapons.json').readAsStringSync(),
  );

  test('主角按角色类型免月俸，旧目录中的非零配置不生效，其他将领照常付薪', () {
    final data = jsonDecode(source);
    for (final row in data['heroes']) {
      if (row['type'] == 'protagonist') row['salary'] = 8;
    }
    final catalog = decodeRomHeroes(jsonEncode(data));
    final protagonist = catalog.firstWhere(
      (h) => h.type == HeroType.protagonist,
    );
    expect(protagonist.salary, 0);
    for (var country = 0; country < 16; country++) {
      expect(protagonist.salaryFor(country), 0);
      expect(
        CampaignHero.fromRom(protagonist, cityId: 0, countryId: country).salary,
        0,
      );
    }
    for (final h in catalog.where((h) => h.type != HeroType.protagonist)) {
      final configured = (data['heroes'] as List).firstWhere(
        (row) => row['id'] == h.id,
      )['salary'];
      expect(h.salary, configured);
      expect(h.salaryFor(h.nativeCountryId ?? 0), configured);
    }
  });

  test('三张地图开局月俸15，正常月结净增15，AI 预算同步免除主角费用', () {
    for (final world in worlds) {
      final c = CampaignState.fromRom(
        world,
        heroes,
        aiEnabled: false,
        economyRandom: _Normal(),
      );
      addTearDown(c.dispose);
      expect(
        c.heroes.firstWhere((h) => h.type == HeroType.protagonist).salary,
        0,
      );
      expect(c.salaryCost, 15);
      expect(c.netIncome, 15);
      expect(c.aiObservationFor(0).nation.salary, 15);
      expect(c.aiBudgetFor(0).monthlySalary, 15);
      c.advance(60);
      expect(c.lastSettlementFor(0)!.salary, 15);
      expect(c.lastSettlementFor(0)!.actualChange, 15);
      expect(c.gold, 95);
    }
  });

  for (final version in [1, 2]) {
    test('月俸版本$version旧存档续玩免主角工资，历史回放保留旧工资', () {
      final c = CampaignState.fromRom(
        worlds.first,
        heroes,
        aiEnabled: false,
        weaponCatalog: weapons,
      );
      addTearDown(c.dispose);
      final saved =
          jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
      saved['payrollVersion'] = version;
      for (final h in saved['people']) {
        if (h['type'] == HeroType.protagonist.index) h['salary'] = 8;
        if (h['source'] == 0) h['salary'] = 17;
      }
      final restored = CampaignSnapshots.restore(
        saved,
        worlds.first,
        heroes,
        weapons,
      );
      final replay = CampaignSnapshots.restore(
        saved,
        worlds.first,
        heroes,
        weapons,
        replay: true,
      );
      addTearDown(restored.dispose);
      addTearDown(replay.dispose);
      expect(restored.gold, c.gold);
      expect(restored.heroes.firstWhere((h) => h.sourceId == 40).salary, 0);
      expect(replay.heroes.firstWhere((h) => h.sourceId == 40).salary, 8);
      expect(
        restored.heroes.firstWhere((h) => h.sourceId == 0).salary,
        version == 1 ? 8 : 17,
      );
      expect(replay.heroes.firstWhere((h) => h.sourceId == 0).salary, 17);
      expect(restored.aiObservationFor(0).nation.salary, restored.salaryCost);
      restored.advance(60);
      expect(restored.lastSettlementFor(0)!.salary, restored.salaryCost);
    });
  }
}
