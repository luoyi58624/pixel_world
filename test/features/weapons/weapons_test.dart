import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/battle/domain/field_terrain.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';

import '../../support/weapon_strategy_fixture.dart';

BattleArmy _army(String id) => BattleArmy(
  id: id,
  name: id,
  general: BattleHealth(95),
  attack: 15,
  soldiers: List.generate(4, (_) => BattleHealth(20)),
);

void main() {
  test('十二种商店武器全部开放，台风、强击手和死枪不进入游戏目录', () {
    final catalog = testWeaponCatalog();
    final evidence = jsonDecode(
      File('docs/nes_weapons_evidence.json').readAsStringSync(),
    );
    expect(catalog.weapons.length, 12);
    expect(catalog.carryLimit, 1);
    expect(catalog.shopWeapons.map((w) => w.price),
        List.generate(12, (i) => (i + 1) * 5));
    expect(catalog.weapons.values.where((w) => w.shopEnabled).length, 12);
    for (final row in evidence['examples']) {
      if ([6, 7, 8].contains(row['id'])) continue;
      expect(catalog.weapons[row['id']]!.damage, (row['damage'] as int) + 5);
    }
    expect(catalog.weapons[0]!.name, '箭');
    expect(catalog.weapons[0]!.price, 5);
    expect(catalog.weapons.keys, isNot(contains(anyOf(6, 7, 8))));
    expect(
      catalog.weapons.values.every(
        (w) => w.unlockYear >= 1 && w.unlockYear <= 4,
      ),
      isTrue,
    );
  });

  for (final side in BattleSide.values) {
    test('全部武器对$side使用原E40C结算，先伤兵再伤将，连续帧不重复命中', () {
      for (final w in testWeaponCatalog().weapons.values) {
        final sim = BattleSimulation(
          attacker: _army('a'),
          defender: _army('b'),
          seed: 17,
          defenderCityLevel: 5,
          fieldTerrain: side == BattleSide.defender ? FieldTerrain.grass : null,
        );
        expect(sim.useWeapon(side, w), isFalse);
        sim.advance(GameConfig.battleFormationFrames / 60 + 1 / 60);
        final target = side == BattleSide.attacker
            ? sim.defender
            : sim.attacker;
        final source = side == BattleSide.attacker
            ? sim.attacker
            : sim.defender;
        expect(sim.useWeapon(side, w), isTrue);
        expect(sim.useWeapon(side, w), isFalse);
        expect(sim.canRetreat, isFalse);
        while (sim.weaponStrike!.frame < 0) {
          sim.advance(1 / 60);
        }
        sim.advance(w.animationFrames / 60 - .02);
        expect(target.general.hp, 95);
        sim.advance(.02);
        final pool = target.soldiers.fold<double>(0, (n, s) => n + s.hp);
        expect(pool + target.general.hp, (175 - w.damage).clamp(0, 175));
        final remaining = target.general.hp;
        sim.advance(.1);
        expect(target.general.hp, remaining);
        if (w.selfDamage > 0) {
          expect(source.general.hp, 0);
        } else {
          expect(source.general.hp, 95);
        }
      }
    });
  }

  test('武器直接伤害不会被五级城防抵消，死枪正确触发双方阵亡结果', () {
    final w = testWeaponCatalog(original: true).weapons[8]!;
    final sim = BattleSimulation(
      attacker: _army('a'),
      defender: _army('b'),
      seed: 17,
    );
    sim.advance(3);
    sim.useWeapon(BattleSide.attacker, w);
    for (var i = 0; i < 1200 && !sim.finished; i++) {
      sim.advance(1 / 60);
    }
    expect(sim.result, BattleResult.draw);
  });

  test('全国仓库无限叠加，购买不自动装备；解锁、余额及国家互相独立', () {
    final c = weaponStrategyCampaign(gold: 100);
    final a = weaponHero(c, 0);
    expect(c.buyWeapon(1, countryId: 1), isTrue);
    expect(c.buyWeapon(6, countryId: 1), isFalse);
    for (var i = 0; i < 12; i++) {
      expect(c.buyWeapon(0, countryId: 1), isTrue);
    }
    expect(c.goldFor(1), 25);
    expect(c.weaponInventoryFor(1), {1: 1, 0: 12});
    expect(c.weaponStorageUsed(1), 13);
    expect(a.weaponIds, isEmpty);
    expect(c.weaponStorageUsed(0), 0);
    expect(c.buyWeapon(0, countryId: 9), isFalse);
    c.cities[2]!.ownerCountryId = 1;
    expect(c.buyWeapon(1, countryId: 1), isTrue);
    expect(c.goldFor(1), 10);
    expect(() => c.weaponInventoryFor(1)[0] = 99, throwsUnsupportedError);
    final stocked = weaponStrategyCampaign(
      catalog: testWeaponCatalog(
        stock: {
          '1': {'0': 10000},
        },
      ),
    );
    expect(stocked.weaponInventoryFor(1), {0: 10000});
    expect(stocked.buyWeapon(0, countryId: 1), isTrue);
    expect(stocked.weaponStockFor(1, 0), 10001);
  });

  test('出征只带一件，非法目标、超一件、重复命令均不扣库存或兵员', () {
    final c = weaponStrategyCampaign();
    final a = weaponHero(c, 0), b = weaponHero(c, 2);
    for (var i = 0; i < 3; i++) {
      c.buyWeapon(0, countryId: 1);
    }
    final target = c.world.cities[2], troops = c.reserveSoldiersFor(1);
    expect(
      c.dispatch(
        a,
        target,
        countryId: 1,
        weaponSlots: {0: 0, 1: 0, 2: 0, 3: 0},
      ),
      isNull,
    );
    expect(c.dispatch(a, target, countryId: 1, weaponSlots: {0: 9}), isNull);
    expect(
      c.dispatch(a, c.world.cities[1], countryId: 1, weaponSlots: {0: 0}),
      isNull,
    );
    expect(c.dispatch(a, target, countryId: 1, weaponSlots: {2: 0}), isNull);
    expect(c.dispatch(a, target, weaponSlots: {0: 0}), isNull);
    expect(c.weaponStockFor(1, 0), 3);
    expect(c.reserveSoldiersFor(1), troops);
    expect(
      c.dispatch(a, target, countryId: 1, weaponSlots: {0: 0}),
      isNotNull,
    );
    expect(a.weaponIds, [0]);
    expect(
      c.dispatch(b, target, countryId: 1, weaponSlots: {0: 0, 1: 0}),
      isNull,
    );
    expect(c.weaponStockFor(1, 0), 2);
    expect(c.dispatch(b, target, countryId: 1, weaponSlots: {0: 0}), isNotNull);
    expect(c.weaponInventoryFor(1), {0: 1});
    expect(c.dispatch(a, target, countryId: 1, weaponSlots: {0: 0}), isNull);
    expect(c.buyWeapon(0, countryId: 1), isTrue);
    expect(a.weaponIds, [0]);
  });

  test('武器锁定动作即消耗一次，守城模型拒绝使用，野战双方仍可使用', () {
    final c = weaponStrategyCampaign();
    final hero = weaponHero(c, 0);
    c.buyWeapon(0, countryId: 1);
    c.buyWeapon(0, countryId: 1);
    final march = c.dispatch(
      hero,
      c.world.cities[2],
      countryId: 1,
      weaponSlots: {0: 0},
    )!;
    march.position = march.destination;
    c.advance(.02);
    expect(c.useWeapon(hero, 0, countryId: 1), isFalse);
    c.advance(2.8);
    final battle = c.battles[2]!;
    expect(battle.simulation.weaponStrike, isNotNull);
    expect(c.useWeapon(hero, 0, countryId: 1), isFalse);
    expect(c.useWeapon(hero, 0), isFalse);
    final before = battle.defender.squad.fold<double>(0, (n, s) => n + s.hp);
    while (battle.simulation.weaponStrike != null) {
      c.advance(1 / 60);
    }
    expect(
      battle.defender.squad.fold<double>(0, (n, s) => n + s.hp),
      before - 25,
    );
    expect(hero.weaponIds, isEmpty);
    final sim = BattleSimulation(
      attacker: _army('a'),
      defender: _army('b'),
      seed: 17,
    );
    sim.advance(3);
    expect(sim.canUseWeaponFor(BattleSide.defender), isFalse);
    expect(
      sim.useWeapon(BattleSide.defender, c.weaponCatalog.weapons[0]!),
      isFalse,
    );
    expect(sim.weaponStrike, isNull);
    expect(
      sim.useWeapon(BattleSide.attacker, c.weaponCatalog.weapons[0]!),
      isTrue,
    );
  });

  test('回城卸下全部剩余武器并合并库存，下次只带新选择，战败装备不入库', () {
    final catalog = testWeaponCatalog(
      stock: {
        '1': {'1': 1, '0': 2},
      },
    );
    final c = weaponStrategyCampaign(catalog: catalog),
        other = weaponStrategyCampaign(catalog: catalog);
    final hero = weaponHero(c, 0);
    var march = c.dispatchTo(
      hero,
      const GamePoint(380, 340),
      countryId: 1,
      weaponSlots: {0: 1},
    )!;
    expect(other.weaponStockFor(1, 1), 1);
    for (var i = 0; i < 8; i++) {
      c.buyWeapon(9, countryId: 1);
    }
    final source = c.world.cities[1];
    march.moveTo(c.cityBounds(source).center, city: source);
    for (var i = 0; i < 1200 && c.marches.containsKey(hero.id); i++) {
      c.advance(1 / 60);
    }
    expect(c.marches[hero.id], isNull);
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponInventoryFor(1), {1: 1, 0: 2, 9: 8});
    march = c.dispatchTo(
      hero,
      const GamePoint(380, 340),
      countryId: 1,
      weaponSlots: {0: 9},
    )!;
    expect(hero.weaponIds, [9]);
    expect(c.weaponInventoryFor(1), {1: 1, 0: 2, 9: 7});
    march.moveTo(c.cityBounds(source).center, city: source);
    for (var i = 0; i < 1200 && c.marches.containsKey(hero.id); i++) {
      c.advance(1 / 60);
    }
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponInventoryFor(1), {1: 1, 0: 2, 9: 8});
    c.dispatchTo(
      hero,
      const GamePoint(380, 340),
      countryId: 1,
      weaponSlots: {0: 9},
    );
    expect(hero.weaponIds, [9]);
    c.defeatHero(hero.id, winnerCountryId: 2);
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponInventoryFor(1), {1: 1, 0: 2, 9: 7});
  });

  test('回城武器进入国家库，守将不能从仓库取武器迎战', () {
    final c = weaponStrategyCampaign(
      sourceHeroes: [0],
      catalog: testWeaponCatalog(
        stock: {
          '1': {'0': 1},
        },
      ),
    );
    final guard = weaponHero(c, 0), source = c.world.cities[1];
    final march = c.dispatchTo(
      guard,
      const GamePoint(380, 340),
      countryId: 1,
      weaponSlots: {0: 0},
    )!;
    march.moveTo(c.cityBounds(source).center, city: source);
    march.position = march.destination;
    for (var i = 0; i < 1200 && c.marches.containsKey(guard.id); i++) {
      c.advance(1 / 60);
    }
    expect(c.marches.containsKey(guard.id), isFalse);
    expect(guard.weaponIds, isEmpty);
    expect(c.weaponStockFor(1, 0), 1);
    final raid = c.dispatch(weaponHero(c, 40), source)!;
    raid.position = raid.destination;
    c.advance(.02);
    c.advance(2.8);
    expect(c.battles[source.id]!.defender, guard);
    expect(c.canUseWeapon(guard, 0, countryId: 1), isFalse);
    expect(c.useWeapon(guard, 0, countryId: 1), isFalse);
    expect(guard.weaponIds, isEmpty);
    expect(c.weaponStockFor(1, 0), 1);
  });

  test('武器JSON拒绝重复编号、越界伤害、非法携带量和无效库存', () {
    for (final mutate in <void Function(Map<String, dynamic>)>[
      (d) => d['carryLimit'] = 4,
      (d) => d['weapons'][0]['damage'] = 256,
      (d) => d['weapons'][1]['id'] = 0,
      (d) => d['initialCountryStock'] = {
        '1': {'99': 1},
      },
    ]) {
      final data = jsonDecode(
        File('assets/data/rom_weapons.json').readAsStringSync(),
      ) as Map<String, dynamic>;
      mutate(data);
      expect(
        () => WeaponCatalog.decode(jsonEncode(data)),
        throwsFormatException,
      );
    }
  });
}
