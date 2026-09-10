import 'package:pixel_world/core/geometry/geometry.dart';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/fixed_siege_random.dart';

CampaignState _campaign({bool duplicatePlacement = false}) =>
    CampaignState.fromRom(
      WorldDefinition.fromJson(
        {
          'id': 0,
          'width': 40,
          'height': 20,
          'tiles': List.filled(800, 0),
          'cities': [
            for (final (id, x, y, level, country, units) in [
              (0, 2, 10, 2, 0, [40, 0, 2]),
              (1, 30, 10, 2, 1, [3, 4]),
              (2, 2, 2, 3, 0, [7, if (duplicatePlacement) 2]),
            ])
              {
                'id': id,
                'name': '测试城',
                'x': x,
                'y': y,
                'width': 1,
                'height': 1,
                'shape': [3],
                'initialOwnerId': country,
                'initialLevel': level,
                'unitIds': units,
              },
          ],
        },
        [0, 1, 2, 3],
      ),
      decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
      startingGold: 1000,
      aiEnabled: false,
      siegeRandom: const FixedSiegeRandom(),
    );

void main() {
  test('全国上限汇总所有城防和将领，升级只扩容不生成士兵', () {
    final c = _campaign();
    expect(c.reserveCapacityFor(0), 36);
    for (var level = 3; level <= 5; level++) {
      expect(c.upgradeCity(0, hero: c.garrisonAt(0).first), isTrue);
      expect(c.reserveCapacityFor(0), (level + 3) * 4 + 16);
      expect(c.soldiersAt(0), 0);
      expect(c.soldierCapacityAt(2), c.soldierCapacityAt(0));
    }
    c.heroes.removeWhere((hero) => hero.countryId == 1);
    expect(c.reserveCapacityFor(1), 8);
  });

  test('同国两城读取同一库存与上限，重复英雄归属不重复提供容量', () {
    final c = _campaign();
    expect(c.soldierCapacityAt(0), 36);
    expect(c.soldierCapacityAt(2), 36);
    expect(c.reserveCapacityFor(1), 16);
    c.buySoldiers(0, 20);
    expect(c.soldiersAt(0), 20);
    expect(c.soldiersAt(2), 20);
    expect(c.reserveSoldiersFor(0), 20);
    final duplicate = _campaign(duplicatePlacement: true);
    expect(duplicate.heroes.where((hero) => hero.sourceId == 2).length, 1);
    expect(duplicate.reserveCapacityFor(0), 36);
  });

  test('出征扣全国库存，跨城返回恢复同一库存，转城不减少全国上限', () {
    final c = _campaign();
    final hero = c.garrisonAt(0).first;
    c.buySoldiers(0, 36);
    final march = c.dispatch(hero, c.world.cities[1])!;
    expect(c.soldiersAt(0), 32);
    expect(c.soldiersAt(2), 32);
    c.camp(hero.id);
    expect(c.reserveCapacityFor(0), 36);
    c.moveTo(hero.id, c.cityBounds(c.world.cities[2]).center);
    march.position = march.destination;
    c.advance(1 / 60);
    expect(hero.cityId, 2);
    expect(c.reserveCapacityFor(0), 36);
    expect(c.soldiersAt(0), 36);
    expect(c.soldiersAt(2), 36);
    expect(c.maxSoldierPurchase(0), 0);
  });

  test('签约给国家增加四兵容量，阵亡后裁掉超额库存', () {
    final c = _campaign();
    c.dispatchTo(c.garrisonAt(0).last, const GamePoint(300, 40))!.camp();
    c.buySoldiers(0, 36);
    final declined = c.drawHero(0)!;
    expect(c.reserveCapacityFor(0), 36);
    c.declineHero(declined);
    final hero = c.signHero(c.drawHero(0)!)!;
    expect(c.reserveCapacityFor(0), 40);
    expect(c.soldiersAt(2), 36);
    expect(c.buySoldiers(2, 5), isFalse);
    expect(c.buySoldiers(2, 4), isTrue);
    c.defeatHero(hero.id, winnerCountryId: 1);
    expect(c.cities[0]!.level, 2);
    expect(c.reserveCapacityFor(0), 36);
    expect(c.reserveSoldiersFor(0), 36);
  });

  test('守将战败按全国容量裁减，仍由所有友城共同使用', () {
    final c = _campaign();
    c.buySoldiers(0, 36);
    c.defeatHero(
      c.garrisonAt(0).last.id,
      winnerCountryId: 1,
      defendedCityId: 0,
    );
    expect(c.cities[0]!.level, 1);
    expect(c.reserveCapacityFor(0), 28);
    expect(c.soldiersAt(0), 28);
    expect(c.soldiersAt(2), 28);
  });

  test('占领空城只扩全国容量，不接收敌国库存、不生成奖励兵', () {
    final c = _campaign();
    c.buySoldiers(0, 8);
    c.buySoldiers(1, 16, countryId: 1);
    c.heroes.removeWhere((hero) => hero.cityId == 1);
    final hero = c.garrisonAt(0).first;
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(1 / 60);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.cities[1]!.level, 1);
    expect(c.reserveCapacityFor(0), 38);
    expect(c.soldiersAt(0), 8);
    expect(c.soldiersAt(1), 8);
    expect(c.soldiersAt(2), 8);
    expect(c.reserveSoldiersFor(1), 0);
    expect(c.reserveCapacityFor(1), 0);
  });
}
