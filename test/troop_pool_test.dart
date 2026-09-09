import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

CampaignState _campaign({
  int level = 2,
  int homeStock = 10,
  int enemyStock = 10,
}) {
  final json = jsonDecode(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  ) as Map<String, dynamic>;
  // 用低攻击守军构造可稳定观察到兵员耗尽、将领仍存活的真实战斗。
  for (final row in json['heroes'] as List) {
    if (row['id'] == 18 || row['id'] == 19) row['combat'] = 1;
  }
  final world = WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 80,
      'height': 32,
      'tiles': List.filled(80 * 32, 0),
      'cities': [
        for (final (id, x, country, units) in [
          (0, 10, 0, [40, 0, 2]),
          (1, 45, 1, [18, 19]),
          (2, 65, 0, [3]),
        ])
          {
            'id': id,
            'name': '测试城',
            'x': x,
            'y': 15,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialLevel': level,
            'initialOwnerId': country,
            'unitIds': units,
          },
      ],
    },
    [0, 1, 2, 3],
  );
  final c = CampaignState.fromRom(
    world,
    decodeRomHeroes(jsonEncode(json)),
    aiEnabled: false,
    startingGold: 10000,
  );
  if (homeStock > 0) expect(c.buySoldiers(0, homeStock), isTrue);
  if (enemyStock > 0) {
    expect(c.buySoldiers(1, enemyStock, countryId: 1), isTrue);
  }
  return c;
}

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((h) => h.sourceId == id);

HeroMarch _leave(CampaignState c, CampaignHero hero, {int target = 1}) =>
    c.dispatch(hero, c.world.cities[target], countryId: hero.countryId)!;

void _arrive(CampaignState c, HeroMarch march) {
  march.position = march.destination;
  c.advance(1 / 60);
}

void _return(CampaignState c, HeroMarch march, int cityId) {
  final city = c.world.cities[cityId];
  // 测试地图是矩形建筑，抵达边缘后仍走正式的进驻结算入口。
  final point = c.cityBounds(city).centerLeft - const Offset(8, 0);
  march.position = point;
  march.moveTo(point, city: city);
  c.advance(1 / 60);
  expect(c.marches.containsKey(march.hero.id), isFalse);
}

void _until(CampaignState c, bool Function() done) {
  for (var i = 0; i < 4000 && !done(); i++) {
    c.advance(1 / 60);
  }
  expect(done(), isTrue);
}

void main() {
  test('城内兵员只存一份，驻军不私有免费兵，出征按实际人数扣除', () {
    final c = _campaign(homeStock: 6);
    expect(c.garrisonAt(0).every((hero) => hero.soldiers == 0), isTrue);
    expect(c.soldiersAt(0), 6);
    final a = _leave(c, _hero(c, 0)), b = _leave(c, _hero(c, 2));
    expect(a.hero.soldiers, 4);
    expect(b.hero.soldiers, 2);
    expect(c.soldiersAt(0), 0);
    expect(c.cities[0]!.reserveCapacity, 20);
    expect(c.dispatch(a.hero, c.world.cities[1]), isNull);
    expect(c.soldiersAt(0), 0);
  });

  for (final country in [0, 1]) {
    test('国家 $country 生还三兵回城只返还三人，重复进驻不重复计数', () {
      final c = _campaign();
      final hero = c.garrisonAt(country).first;
      final march = _leave(c, hero, target: country == 0 ? 1 : 0);
      expect(c.soldiersAt(country), 6);
      hero.squad.first.hp = 0;
      hero.squad.last.hp = 3;
      hero.hp = 3;
      _return(c, march, country);
      expect(hero.hp, hero.maxHp);
      expect(hero.soldiers, 0);
      expect(c.soldiersAt(country), 9);
      c.advance(1);
      expect(c.soldiersAt(country), 9);
      final again = _leave(c, hero, target: country == 0 ? 1 : 0);
      expect(again.hero.soldiers, 4);
      expect(c.soldiersAt(country), 5);
    });
  }

  test('出征后补满库存，回城超额兵员永久舍弃，不会在再次出征时恢复', () {
    final c = _campaign();
    final hero = _hero(c, 0);
    final march = _leave(c, hero);
    final capacity = c.cities[0]!.reserveCapacity;
    c.buySoldiers(0, capacity - c.soldiersAt(0));
    hero.squad.first.hp = 0;
    _return(c, march, 0);
    expect(c.soldiersAt(0), capacity);
    expect(hero.soldiers, 0);
    final next = _leave(c, hero);
    expect(c.soldiersAt(0), capacity - 4);
    for (final soldier in hero.squad) {
      soldier.hp = 0;
    }
    _return(c, next, 0);
    expect(c.soldiersAt(0), capacity - 4);
  });

  test('守军耗尽四兵后胜利，库存仍有六兵，下一支敌军到达时重新领满四兵', () {
    final c = _campaign(level: 1);
    final first = _leave(c, _hero(c, 0));
    _arrive(c, first);
    final battle = c.battles[1]!;
    final guard = battle.defender;
    expect(guard.soldiers, 4);
    expect(c.soldiersAt(1), 6);
    _until(
      c,
      () =>
          guard.soldiers == 0 ||
          !guard.health.alive ||
          !first.hero.health.alive,
    );
    expect(guard.health.alive, isTrue);
    expect(guard.soldiers, 0);
    first.hero.hp = 0;
    _until(c, () => !battle.isActive);
    expect(guard.hp, guard.maxHp);
    expect(guard.soldiers, 0);
    expect(c.soldiersAt(1), 6);
    final oldSoldiers = battle.simulation.defender.soldiers.toList();
    final second = _leave(c, _hero(c, 2));
    _arrive(c, second);
    expect(c.battles[1]!.defender, same(guard));
    expect(guard.soldiers, 4);
    expect(c.soldiersAt(1), 2);
    expect(oldSoldiers.every((soldier) => !soldier.alive), isTrue);
    expect(identical(oldSoldiers.first, guard.squad.first), isFalse);
  });

  test('同一场连续攻城换守将时也要领兵，出城进攻军不会从家里远程补兵', () {
    final c = _campaign();
    final march = _leave(c, _hero(c, 0));
    march.hero.squad.first.hp = 0;
    _arrive(c, march);
    final battle = c.battles[1]!;
    final first = battle.defender;
    expect(c.soldiersAt(1), 6);
    expect(march.hero.soldiers, 3);
    first.hp = 0;
    _until(c, () => battle.wave == 2);
    expect(battle.defender, isNot(same(first)));
    expect(battle.defender.soldiers, 4);
    expect(c.soldiersAt(1), 2);
    expect(c.soldiersAt(0), 6);
    expect(march.hero.soldiers, 3);
  });

  test('进攻者主动撤离也释放守军，旧战斗快照不被归营和下一次领兵改写', () {
    final c = _campaign();
    final march = _leave(c, _hero(c, 0));
    _arrive(c, march);
    final battle = c.battles[1]!;
    final guard = battle.defender;
    final oldArmy = battle.simulation.defender.soldiers;
    c.camp(march.hero.id);
    expect(battle.isActive, isFalse);
    expect(guard.soldiers, 0);
    expect(c.soldiersAt(1), 10);
    expect(oldArmy.where((s) => s.alive).length, 4);
    expect(march.hero.soldiers, 4);
    c.camp(march.hero.id);
    expect(c.soldiersAt(1), 10);
  });

  test('占领清空旧守军库存，只接收随军三名生还者；升级只扩容不赠兵', () {
    final c = _campaign();
    c.heroes.removeWhere((hero) => hero.cityId == 1);
    final hero = _hero(c, 0);
    final march = _leave(c, hero);
    hero.squad.first.hp = 0;
    _arrive(c, march);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.cities[1]!.level, 1);
    expect(c.soldiersAt(1), 3);
    expect(hero.soldiers, 0);
    expect(c.soldiersAt(0), 6);
    final capacity = c.cities[1]!.reserveCapacity;
    c.upgradeCity(1, hero: hero);
    expect(c.cities[1]!.reserveCapacity, capacity + 4);
    expect(c.soldiersAt(1), 3);
    c.cities[1]!.ownerCountryId = 0;
    expect(c.soldiersAt(1), 3);
  });

  test('转城、阵亡及降级降低容量时立即舍弃超额库存', () {
    final c = _campaign();
    final hero = _hero(c, 0);
    final march = _leave(c, hero, target: 2);
    c.buySoldiers(0, c.cities[0]!.reserveCapacity - c.soldiersAt(0));
    _return(c, march, 2);
    expect(c.cities[0]!.reserveCapacity, 16);
    expect(c.soldiersAt(0), 16);
    expect(c.soldiersAt(2), 4);
    c.defeatHero(_hero(c, 2).id, winnerCountryId: 1, defendedCityId: 0);
    expect(c.cities[0]!.reserveCapacity, 8);
    expect(c.soldiersAt(0), 8);
  });
}
