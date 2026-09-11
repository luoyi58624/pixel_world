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
  test('配置ID按数组连续排列，动画效果保持对应', () {
    final rows =
        jsonDecode(
              File('assets/data/rom_weapons.json').readAsStringSync(),
            )['weapons']
            as List;
    final current = testWeaponCatalog(),
        original = testWeaponCatalog(original: true);
    expect(rows.map((r) => r['id']), List.generate(15, (i) => i));
    for (final row in rows) {
      final w = current.weapons[row['id']]!,
          rom = original.weapons.values.singleWhere(
            (w) => w.name == row['name'],
          );
      expect(w.name, rom.name);
      expect(w.effectId, rom.effectId);
      expect(w.selfDamage, rom.selfDamage);
    }
    expect(current.weapons[1]!.name, '斧');
    expect(current.weapons[1]!.effectId, 9);
    expect(current.weapons[14]!.name, '死枪');
    expect(current.weapons[14]!.effectId, 8);
  });

  test('商店顺序价格从2逐件加1，伤害从20逐件加5，死枪保留互刺', () {
    final catalog = testWeaponCatalog();
    expect(catalog.weapons.length, 15);
    expect(catalog.carryLimit, 1);
    expect(
      catalog.shopWeapons.map((w) => w.price),
      List.generate(15, (i) => i + 2),
    );
    expect(catalog.shopWeapons.map((w) => w.id), List.generate(15, (i) => i));
    expect(catalog.shopWeapons.map((w) => w.damage), [
      ...List.generate(14, (i) => 20 + i * 5),
      255,
    ]);
    expect(catalog.weapons.values.where((w) => w.shopEnabled).length, 15);
    expect(catalog.weapons[0]!.name, '箭');
    expect(catalog.weapons[0]!.price, 2);
    expect(catalog.shopWeapons.skip(12).map((w) => w.id), [12, 13, 14]);
    expect(catalog.shopWeapons.skip(12).map((w) => w.damage), [80, 85, 255]);
    expect(catalog.shopWeapons.skip(12).map((w) => w.selfDamage), [0, 0, 255]);
    expect(catalog.weapons[14]!.effectLabel, contains('同归于尽'));
    expect(
      catalog.weapons.values.every(
        (w) => w.unlockYear >= 1 && w.unlockYear <= 5,
      ),
      isTrue,
    );
  });

  test('两金币的箭恰好清掉一名满血小兵，不伤将领', () {
    final arrow = testWeaponCatalog().weapons[0]!;
    final sim = BattleSimulation(
      attacker: _army('a'),
      defender: _army('b'),
      seed: 17,
      defenderCityLevel: 5,
    );
    expect(arrow.price, 2);
    expect(GameConfig.soldierRecruitCost, 1);
    sim.advance(GameConfig.battleFormationFrames / 60 + 1 / 60);
    expect(sim.useWeapon(BattleSide.attacker, arrow), isTrue);
    while (sim.weaponStrike != null) {
      sim.advance(1 / 60);
    }
    expect(sim.clashes, 0);
    expect(sim.defender.soldiers.where((s) => s.alive).length, 3);
    expect(sim.defender.soldiers.fold<double>(0, (n, s) => n + s.hp), 60);
    expect(sim.defender.general.hp, 95);
  });

  test('第五年武器仍按原年份开放，真实支付新价格且仍只能携带一件', () {
    final c = weaponStrategyCampaign(gold: 1000);
    addTearDown(c.dispose);
    for (final id in [12, 13, 14]) {
      expect(c.buyWeapon(id, countryId: 1), isFalse);
    }
    c.settledMonths = 48;
    for (final id in [12, 13, 14]) {
      final before = c.goldFor(1), price = c.weaponCatalog.weapons[id]!.price;
      expect(c.buyWeapon(id, countryId: 1), isTrue);
      expect(c.goldFor(1), before - price);
      expect(c.weaponStockFor(1, id), 1);
    }
    final hero = weaponHero(c, 0);
    expect(
      c.dispatch(
        hero,
        c.world.cities[2],
        countryId: 1,
        weaponSlots: {0: 12, 1: 13},
      ),
      isNull,
    );
    expect(c.weaponStockFor(1, 12), 1);
    final march = c.dispatch(
      hero,
      c.world.cities[2],
      countryId: 1,
      weaponSlots: {0: 13},
    );
    expect(march, isNotNull);
    expect(hero.weaponIds, [13]);
    expect(c.weaponStockFor(1, 13), 0);
  });

  test('正式死枪同归于尽，不占领也不降低本轮城防', () {
    final c = weaponStrategyCampaign(
      gold: 1000,
      targetLevel: 5,
      targetHeroes: [3],
    );
    addTearDown(c.dispose);
    c.settledMonths = 48;
    expect(c.buyWeapon(14, countryId: 1), isTrue);
    final hero = weaponHero(c, 0);
    final march = c.dispatch(
      hero,
      c.world.cities[2],
      countryId: 1,
      weaponSlots: {0: 14},
    )!;
    march.position = march.destination;
    c.advance(1 / 60);
    final battle = c.battles[2]!;
    for (var n = 0; n < 3000 && battle.isActive; n++) {
      c.advance(1 / 60);
    }
    expect(battle.isActive, isFalse);
    expect(battle.simulation.result, BattleResult.draw);
    expect(battle.attacker.health.alive, isFalse);
    expect(battle.defender.health.alive, isFalse);
    expect(c.cities[2]!.ownerCountryId, 2);
    expect(c.cities[2]!.level, 5);
    expect(c.weaponStockFor(1, 14), 0);
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
    expect(c.buyWeapon(2, countryId: 1), isTrue);
    expect(c.buyWeapon(12, countryId: 1), isFalse);
    for (var i = 0; i < 12; i++) {
      expect(c.buyWeapon(0, countryId: 1), isTrue);
    }
    expect(c.goldFor(1), 72); // 一件矛4金币，十二件箭各2金币。
    expect(c.weaponInventoryFor(1), {2: 1, 0: 12});
    expect(c.weaponStorageUsed(1), 13);
    expect(a.weaponIds, isEmpty);
    expect(c.weaponStorageUsed(0), 0);
    expect(c.buyWeapon(0, countryId: 9), isFalse);
    c.cities[2]!.ownerCountryId = 1;
    expect(c.buyWeapon(2, countryId: 1), isTrue);
    expect(c.goldFor(1), 68);
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
    expect(c.dispatch(a, target, countryId: 1, weaponSlots: {0: 1}), isNull);
    expect(
      c.dispatch(a, c.world.cities[1], countryId: 1, weaponSlots: {0: 0}),
      isNull,
    );
    expect(c.dispatch(a, target, countryId: 1, weaponSlots: {2: 0}), isNull);
    expect(c.dispatch(a, target, weaponSlots: {0: 0}), isNull);
    expect(c.weaponStockFor(1, 0), 3);
    expect(c.reserveSoldiersFor(1), troops);
    expect(c.dispatch(a, target, countryId: 1, weaponSlots: {0: 0}), isNotNull);
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
      before - 20,
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
        '1': {'2': 1, '0': 2},
      },
    );
    final c = weaponStrategyCampaign(catalog: catalog),
        other = weaponStrategyCampaign(catalog: catalog);
    final hero = weaponHero(c, 0);
    var march = c.dispatchTo(
      hero,
      const GamePoint(380, 340),
      countryId: 1,
      weaponSlots: {0: 2},
    )!;
    expect(other.weaponStockFor(1, 2), 1);
    for (var i = 0; i < 8; i++) {
      c.buyWeapon(1, countryId: 1);
    }
    final source = c.world.cities[1];
    march.moveTo(c.cityBounds(source).center, city: source);
    for (var i = 0; i < 1200 && c.marches.containsKey(hero.id); i++) {
      c.advance(1 / 60);
    }
    expect(c.marches[hero.id], isNull);
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponInventoryFor(1), {2: 1, 0: 2, 1: 8});
    march = c.dispatchTo(
      hero,
      const GamePoint(380, 340),
      countryId: 1,
      weaponSlots: {0: 1},
    )!;
    expect(hero.weaponIds, [1]);
    expect(c.weaponInventoryFor(1), {2: 1, 0: 2, 1: 7});
    march.moveTo(c.cityBounds(source).center, city: source);
    for (var i = 0; i < 1200 && c.marches.containsKey(hero.id); i++) {
      c.advance(1 / 60);
    }
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponInventoryFor(1), {2: 1, 0: 2, 1: 8});
    c.dispatchTo(
      hero,
      const GamePoint(380, 340),
      countryId: 1,
      weaponSlots: {0: 1},
    );
    expect(hero.weaponIds, [1]);
    c.defeatHero(hero.id, winnerCountryId: 2);
    expect(hero.weaponIds, isEmpty);
    expect(c.weaponInventoryFor(1), {2: 1, 0: 2, 1: 7});
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
