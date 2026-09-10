import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/fixed_siege_random.dart';

CampaignState _campaign({int firstStock = 20, int secondStock = 2}) {
  final records = [
    (0, 10, 0, 1, [40], firstStock),
    (1, 38, 1, 2, [3, 4], 5),
    (2, 20, 0, 2, [0, 2], secondStock),
    (3, 60, 1, 1, [5], 0),
    (4, 80, 2, 1, [6], 4),
  ];
  final setup = CampaignSetup.decode(
    jsonEncode({
      'version': 1,
      'countries': [],
      'worlds': [
        {
          'id': 0,
          'cities': [
            for (final row in records)
              {
                'id': row.$1,
                'baseIncome': 10,
                'initialLevel': row.$4,
                'initialReserveSoldiers': row.$6,
              },
          ],
        },
      ],
    }),
  );
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 100,
      'height': 40,
      'tiles': List.filled(4000, 0),
      'cities': [
        for (final row in records)
          {
            'id': row.$1,
            'name': row.$1 == 1 ? '奥尔梅' : '原城${row.$1}',
            'x': row.$2,
            'y': 15,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialOwnerId': row.$3,
            'initialLevel': row.$4,
            'unitIds': row.$5,
          },
      ],
    },
    [0, 1, 2, 3],
    setup: setup,
    countries: [
      for (final (id, name) in [(0, '阿尔马'), (1, '奥尔梅'), (2, '迪麦')])
        CountryDefinition.fromJson({'id': id, 'name': name, 'flagIndex': id}),
    ],
  );
  return CampaignState.fromRom(
    world,
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
    startingGold: 1000,
    aiEnabled: false,
    siegeRandom: const FixedSiegeRandom(),
  );
}

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((h) => h.sourceId == id);

void _return(CampaignState c, HeroMarch march, int cityId) {
  expect(
    c.moveTo(march.hero.id, c.cityBounds(c.world.cities[cityId]).center),
    isTrue,
  );
  march.position = march.destination;
  c.advance(1 / 60);
  expect(c.marches.containsKey(march.hero.id), isFalse);
}

void main() {
  test('开局兵力按初始将领与城防满编，不采用旧逐城兵员配置', () {
    final c = _campaign();
    expect(c.reserveCapacityFor(0), 24);
    expect(c.reserveSoldiersFor(0), 24);
    expect(c.soldiersAt(0), 24);
    expect(c.soldiersAt(2), 24);
    expect(c.reserveSoldiersFor(1), 24);
    expect(c.reserveSoldiersFor(2), 8);
    expect(_campaign(secondStock: 5).reserveSoldiersFor(0), 24);
    expect(() => CountryTroops(reserveSoldiers: -1), throwsArgumentError);
  });

  test('任意友城征兵和出征都操作全国同一份库存，跨城归还不会重复加兵', () {
    final c = _campaign();
    c.countryTroops[0] = CountryTroops(reserveSoldiers: 22);
    final gold = c.gold;
    expect(c.buySoldiers(2, 2), isTrue);
    expect(c.gold, gold - 2);
    expect(c.soldiersAt(0), 24);
    expect(c.soldiersAt(2), 24);
    expect(c.buySoldiers(0, 1), isFalse);
    final a = c.dispatch(_hero(c, 0), c.world.cities[1])!;
    final b = c.dispatch(_hero(c, 2), c.world.cities[1])!;
    expect(c.soldiersAt(0), 16);
    expect(c.soldiersAt(2), 16);
    a.hero.squad.first.hp = 0;
    a.hero.hp = 1;
    _return(c, a, 0);
    expect(a.hero.hp, a.hero.maxHp);
    expect(c.reserveSoldiersFor(0), 19);
    _return(c, b, 2);
    expect(c.reserveSoldiersFor(0), 23);
    c.advance(1);
    expect(c.reserveSoldiersFor(0), 23);
    expect(c.reserveSoldiersFor(1), 24);
  });

  test('两座城同时守卫也从全国顺序领兵，总共六兵不能领成两队四兵', () {
    final c = _campaign();
    c.countryTroops[0] = CountryTroops(reserveSoldiers: 6);
    c.countryTroops[1] = CountryTroops(reserveSoldiers: 8);
    final a = c.dispatch(_hero(c, 3), c.world.cities[0], countryId: 1)!;
    final b = c.dispatch(_hero(c, 4), c.world.cities[2], countryId: 1)!;
    a.position = a.destination;
    b.position = b.destination;
    c.advance(1 / 60);
    expect(c.battles[0]!.defender.soldiers, 4);
    expect(c.battles[2]!.defender.soldiers, 2);
    expect(c.soldiersAt(0), 0);
    expect(c.soldiersAt(2), 0);
    expect(c.reserveSoldiersFor(1), 0);
  });

  test('失去一城保留敌国余下库存，灭国才清零；易主立即改名且可连续改名', () {
    final c = _campaign();
    c.heroes.removeWhere((hero) => hero.cityId == 1);
    final hero = _hero(c, 0);
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(1 / 60);
    expect(c.cityName(1), '阿尔马');
    expect(c.world.cities[1].label, '奥尔梅'); // 原地图资料不被战役改写。
    expect(c.cities[3]!.ownerCountryId, 1);
    expect(c.reserveSoldiersFor(1), 16);
    expect(c.reserveCapacityFor(1), 16);
    expect(c.reserveSoldiersFor(0), 24);
    expect(c.reserveCapacityFor(0), 28);
    expect(c.soldiersAt(1), 24);
    c.defeatHero(hero.id, winnerCountryId: 2, defendedCityId: 1);
    expect(c.cityName(1), '迪麦');
    expect(c.soldiersAt(1), 8);
    expect(c.reserveSoldiersFor(0), 24); // 失去一城、一将后按全国上限裁减。
    c.defeatHero(_hero(c, 5).id, winnerCountryId: 2, defendedCityId: 3);
    expect(c.cityName(3), '迪麦');
    expect(c.reserveSoldiersFor(1), 0);
    expect(c.reserveCapacityFor(1), 0);
    expect(c.reserveSoldiersFor(2), 8);
  });

  test('实际攻城结束后观战地点与城池名同步变更，兵员不会因占领复制', () {
    final c = _campaign();
    final march = c.dispatch(_hero(c, 0), c.world.cities[1])!;
    march.position = march.destination;
    c.advance(1 / 60);
    final battle = c.battles[1]!;
    expect(battle.locationLabel, '奥尔梅国');
    for (var i = 0; i < 7200 && battle.isActive; i++) {
      battle.defender.hp = 0;
      c.advance(1 / 60);
    }
    expect(battle.isActive, isFalse);
    expect(battle.locationLabel, '阿尔马国');
    expect(c.cityName(1), '阿尔马');
    expect(c.reserveSoldiersFor(0), 24);
    expect(c.soldiersAt(0), c.soldiersAt(1));
  });
}
