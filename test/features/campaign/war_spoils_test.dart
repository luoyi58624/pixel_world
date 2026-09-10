import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';

import '../../support/fixed_siege_random.dart';

/// 四城三国的独立结算场景，不依赖随机对局胜负。
CampaignState spoilsCampaign() => CampaignState.fromRom(
  WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 80,
      'height': 30,
      'tiles': List.filled(2400, 0),
      'cities': [
        for (final (id, owner, level, units) in [
          (0, 0, 1, [40, 0, 2]),
          (1, 1, 1, [3]),
          (2, 1, 2, [4]),
          (3, 2, 1, [5]),
        ])
          {
            'id': id,
            'name': '城$id',
            'x': 5 + id * 20,
            'y': 15,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialOwnerId': owner,
            'initialLevel': level,
            'unitIds': units,
          },
      ],
    },
    [0, 1, 2, 3],
  ),
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  weaponCatalog: WeaponCatalog.decode(
    File('assets/data/rom_weapons.json').readAsStringSync(),
  ),
  aiEnabled: false,
  startingGold: 1000,
  siegeRandom: const FixedSiegeRandom(),
);

void main() {
  for (final winner in [0, 2]) {
    test('最后攻下的国家 $winner 接管剩余金币及武器，部分占领不转交', () {
      final c = spoilsCampaign();
      addTearDown(c.dispose);
      c.buyWeapon(0, countryId: 1);
      c.buyWeapon(0, countryId: 1);
      c.buyWeapon(0, countryId: winner);
      final defeatedGold = c.goldFor(1), winnerGold = c.goldFor(winner);
      c.defeatHero('rom-3', winnerCountryId: 0, defendedCityId: 1);
      expect(c.goldFor(1), defeatedGold);
      expect(c.weaponStockFor(1, 0), 2);
      expect(c.events.forCountry(1).timeline(), isEmpty);
      c.defeatHero('rom-4', winnerCountryId: winner, defendedCityId: 2);
      expect(c.goldFor(1), 0);
      expect(c.goldFor(winner), winnerGold + defeatedGold);
      expect(c.weaponInventoryFor(1), isEmpty);
      expect(c.weaponStockFor(winner, 0), 3);
      expect(c.reserveCapacityFor(1), 0);
      expect(c.reserveSoldiersFor(1), 0);
      final event = c.events.forCountry(winner).timeline().single;
      expect(event.kind, GameEventKind.treasuryCaptured);
      expect(event.data['gold'], defeatedGold);
      expect(event.data['weapons'], [
        {'id': 0, 'name': '箭', 'quantity': 2},
      ]);
      expect(
        c.defeatHero('rom-4', winnerCountryId: winner, defendedCityId: 2),
        isNull,
      );
      expect(c.goldFor(winner), winnerGold + defeatedGold);
      expect(c.weaponStockFor(winner, 0), 3);
      expect(c.events.forCountry(winner).timeline().length, 1);
    });
  }

  test('招募和解雇不再扩大或缩小初始将领兵力基数', () {
    final c = spoilsCampaign();
    addTearDown(c.dispose);
    expect(c.initialHeroSoldierCapacityFor(0), 12);
    expect(c.reserveCapacityFor(0), 16);
    expect(c.reserveSoldiersFor(0), 16);
    final offer = c.drawHero(0)!;
    final hired = c.signHero(offer)!;
    expect(c.garrisonAt(0).length, 4);
    expect(c.reserveCapacityFor(0), 16);
    c.dismissHero(hired);
    c.defeatHero('rom-0', winnerCountryId: 1);
    expect(c.reserveCapacityFor(0), 16);
    expect(c.initialHeroSoldierCapacityFor(0), 12);
  });

  test('升级每级扩四兵，降级和失城扣回城防贡献，保留初始将领基数', () {
    final c = spoilsCampaign();
    addTearDown(c.dispose);
    final governor = c.garrisonAt(0).first;
    c.upgradeCity(0, hero: governor);
    expect(c.reserveCapacityFor(0), 20);
    expect(c.reserveSoldiersFor(0), 16);
    c.advance(60);
    c.upgradeCity(0, hero: governor);
    expect(c.reserveCapacityFor(0), 24);
    expect(c.buySoldiers(0, 8), isTrue);
    c.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
    expect(c.cities[0]!.level, 2);
    expect(c.reserveCapacityFor(0), 20);
    expect(c.reserveSoldiersFor(0), 20);
    c.defeatHero('rom-3', winnerCountryId: 0, defendedCityId: 1);
    expect(c.reserveCapacityFor(0), 24);
    expect(c.reserveSoldiersFor(0), 20);
    // 城池部分从当前归属和等级读取，调试转移也不会永久保留已失去的城防额度。
    c.cities[0]!.ownerCountryId = 2;
    expect(c.reserveCapacityFor(0), 16);
    c.cities[1]!.ownerCountryId = 2;
    expect(c.reserveCapacityFor(0), 0);
  });
}
