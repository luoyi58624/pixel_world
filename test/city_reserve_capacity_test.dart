import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

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
    );

void main() {
  test('城防每级四兵，加每位所属英雄四兵，二级三将上限二十', () {
    final c = _campaign();
    final city = c.cities[0]!;
    expect(city.level, 2);
    expect(c.heroesAt(0).length, 3);
    expect(city.reserveCapacity, 20);
    for (var level = 3; level <= 5; level++) {
      expect(c.upgradeCity(0, hero: c.garrisonAt(0).first), isTrue);
      expect(city.reserveCapacity, level * 4 + 12);
      expect(city.reserveSoldiers, 0); // 扩容不等于免费生成新兵。
    }
    for (var level = 1; level <= 5; level++) {
      final empty = CitySituation(
        ownerCountryId: 0,
        defense: 100,
        baseIncome: 10,
        initialLevel: level,
      );
      expect(empty.reserveCapacity, level * 4);
    }
  });

  test('多城容量分别计算，国家合计只把城防和每名英雄计入一次', () {
    final c = _campaign();
    expect(c.cities[0]!.reserveCapacity, 20);
    expect(c.cities[2]!.reserveCapacity, 16);
    expect(
      c.cities.values
          .where((city) => city.isPlayer)
          .fold<int>(0, (n, city) => n + city.reserveCapacity),
      36,
    );
    expect(c.cities[1]!.reserveCapacity, 16);
    final duplicate = _campaign(duplicatePlacement: true);
    expect(duplicate.heroes.where((hero) => hero.sourceId == 2).length, 1);
    expect(duplicate.cities[0]!.reserveCapacity, 16);
    expect(duplicate.cities[2]!.reserveCapacity, 20);
  });

  test('出征和扎营不减容量，进驻另一座本国城池后名额随英雄转移', () {
    final c = _campaign();
    final hero = c.garrisonAt(0).first;
    c.buySoldiers(0, 20);
    final march = c.dispatch(hero, c.world.cities[1])!;
    expect(c.garrisonAt(0).length, 2);
    expect(c.cities[0]!.reserveCapacity, 20);
    c.camp(hero.id);
    expect(c.cities[0]!.reserveCapacity, 20);
    expect(c.moveTo(hero.id, c.cityBounds(c.world.cities[2]).center), isTrue);
    march.position = march.destination;
    c.advance(1 / 60);
    expect(hero.cityId, 2);
    expect(c.cities[0]!.reserveCapacity, 16);
    expect(c.cities[2]!.reserveCapacity, 20);
    expect(c.cities[0]!.reserveSoldiers, 20);
    expect(c.maxSoldierPurchase(0), 0);
  });

  test('预留和放弃不扩容，签约增加四个名额，阵亡减少名额但不扣已有兵员', () {
    final c = _campaign();
    c.buySoldiers(0, 20);
    final declined = c.drawHero(0)!;
    expect(c.cities[0]!.reserveCapacity, 20);
    c.declineHero(declined);
    expect(c.cities[0]!.reserveCapacity, 20);
    final hero = c.signHero(c.drawHero(0)!)!;
    expect(c.cities[0]!.reserveCapacity, 24);
    expect(c.cities[0]!.reserveSoldiers, 20);
    expect(c.buySoldiers(0, 5), isFalse);
    expect(c.buySoldiers(0, 4), isTrue);
    c.defeatHero(hero.id, winnerCountryId: 1);
    expect(c.cities[0]!.level, 2);
    expect(c.cities[0]!.reserveCapacity, 20);
    expect(c.cities[0]!.reserveSoldiers, 24);
    expect(c.maxSoldierPurchase(0), 0);
  });

  test('守将战败同时减一级城防和一名英雄容量，超额兵不随之消失', () {
    final c = _campaign();
    c.buySoldiers(0, 20);
    c.defeatHero(
      c.garrisonAt(0).first.id,
      winnerCountryId: 1,
      defendedCityId: 0,
    );
    expect(c.cities[0]!.level, 1);
    expect(c.cities[0]!.reserveCapacity, 12);
    expect(c.cities[0]!.reserveSoldiers, 20);
    expect(c.maxSoldierPurchase(0), 0);
  });

  test('占城保留十兵奖励，一级一将上限八，消耗到上限以下才能再买', () {
    final c = _campaign();
    c.heroes.removeWhere((hero) => hero.cityId == 1);
    final hero = c.garrisonAt(0).first;
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(1 / 60);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.cities[1]!.level, 1);
    expect(hero.cityId, 1);
    expect(c.cities[1]!.reserveCapacity, 8);
    expect(c.cities[1]!.reserveSoldiers, 10);
    expect(c.maxSoldierPurchase(1), 0);
    for (final soldier in hero.squad.take(3)) {
      soldier.hp = 0;
    }
    c.reinforceHero(hero);
    expect(c.cities[1]!.reserveSoldiers, 7);
    expect(c.maxSoldierPurchase(1), 1);
    expect(c.buySoldiers(1, 2), isFalse);
    expect(c.buySoldiers(1, 1), isTrue);
    expect(c.cities[1]!.reserveSoldiers, 8);
  });
}
