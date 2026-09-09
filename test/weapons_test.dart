import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/weapon.dart';

import 'support/weapon_strategy_fixture.dart';

BattleArmy _army(String id) => BattleArmy(
  id: id,
  name: id,
  general: BattleHealth(95),
  attack: 15,
  soldiers: List.generate(4, (_) => BattleHealth(20)),
);

void main() {
  test('十五种武器与原始字节证据一致，普通商店十二种，事件专属三种', () {
    final catalog = testWeaponCatalog();
    final evidence = jsonDecode(
      File('docs/nes_weapons_evidence.json').readAsStringSync(),
    );
    expect(catalog.weapons.length, 15);
    expect(catalog.carryLimit, 3);
    expect(catalog.weapons.values.where((w) => w.shopEnabled).length, 12);
    for (final row in evidence['examples']) {
      expect(catalog.weapons[row['id']]!.damage, row['damage']);
    }
    expect(catalog.weapons[0]!.name, '箭');
    expect(catalog.weapons[0]!.price, 3);
    expect(catalog.weapons[8]!.selfDamage, 255);
  });

  for (final side in BattleSide.values) {
    test('全部武器对$side使用原E40C结算，先伤兵再伤将，连续帧不重复命中', () {
      for (final w in testWeaponCatalog().weapons.values) {
        final sim = BattleSimulation(
          attacker: _army('a'),
          defender: _army('b'),
          seed: 17,
          defenderCityLevel: 5,
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
        sim.advance(GameConfig.weaponImpactSeconds - .02);
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
    final w = testWeaponCatalog().weapons[8]!;
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

  test('价格、城数解锁、三件上限和全国库存共享，不退钱或重复生成', () {
    final c = weaponStrategyCampaign(gold: 30);
    final a = weaponHero(c, 0), b = weaponHero(c, 2);
    expect(c.equipWeapon(a, 1, countryId: 1), isFalse);
    expect(c.equipWeapon(a, 6, countryId: 1), isFalse);
    for (var i = 0; i < 3; i++) {
      expect(c.equipWeapon(a, 0, countryId: 1), isTrue);
    }
    expect(c.goldFor(1), 21);
    expect(c.equipWeapon(a, 0, countryId: 1), isFalse);
    expect(c.unequipWeapon(a, 1, countryId: 1), isTrue);
    expect(c.weaponStockFor(1, 0), 1);
    expect(c.weaponEquipCost(1, 0), 0);
    expect(c.equipWeapon(b, 0, countryId: 1), isTrue);
    expect(c.goldFor(1), 21);
    expect(c.weaponStockFor(1, 0), 0);
    expect(c.equipWeapon(a, 0), isFalse);
    expect(c.unequipWeapon(a, 9, countryId: 1), isFalse);
    c.cities[2]!.ownerCountryId = 1;
    expect(c.equipWeapon(a, 1, countryId: 1), isTrue);
    expect(c.goldFor(1), 14);
  });

  test('出城不能远程购买，使用立即扣一件，未命中前连续点击不再扣', () {
    final c = weaponStrategyCampaign();
    final hero = weaponHero(c, 0);
    c.equipWeapon(hero, 0, countryId: 1);
    c.equipWeapon(hero, 0, countryId: 1);
    final march = c.dispatch(hero, c.world.cities[2], countryId: 1)!;
    expect(c.equipWeapon(hero, 0, countryId: 1), isFalse);
    expect(c.unequipWeapon(hero, 0, countryId: 1), isFalse);
    march.position = march.destination;
    c.advance(.02);
    expect(c.useWeapon(hero, 0, countryId: 1), isFalse);
    c.advance(2.8);
    final battle = c.battles[2]!;
    expect(c.useWeapon(hero, 0, countryId: 1), isTrue);
    expect(hero.weaponIds, [0]);
    expect(c.useWeapon(hero, 0, countryId: 1), isFalse);
    expect(c.useWeapon(hero, 0), isFalse);
    final before = battle.defender.squad.fold<double>(0, (n, s) => n + s.hp);
    c.advance(.6);
    expect(
      battle.defender.squad.fold<double>(0, (n, s) => n + s.hp),
      before - 20,
    );
    expect(hero.weaponIds, [0]);
  });

  test('回城归还未使用武器，死亡的装备丢失，各地图库存互不共享', () {
    final catalog = testWeaponCatalog(
      stock: {
        '1': {'6': 1},
      },
    );
    final c = weaponStrategyCampaign(catalog: catalog),
        other = weaponStrategyCampaign(catalog: catalog);
    final hero = weaponHero(c, 0);
    c.equipWeapon(hero, 6, countryId: 1);
    expect(other.weaponStockFor(1, 6), 1);
    final march = c.dispatchTo(hero, const Offset(380, 340), countryId: 1)!;
    final source = c.world.cities[1];
    march.moveTo(c.cityBounds(source).center, city: source);
    for (var i = 0; i < 1200 && c.marches.containsKey(hero.id); i++) {
      c.advance(1 / 60);
    }
    expect(c.marches[hero.id], isNull);
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponStockFor(1, 6), 1);
    c.equipWeapon(hero, 6, countryId: 1);
    c.defeatHero(hero.id, winnerCountryId: 2);
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponStockFor(1, 6), 0);
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
