import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/campaign_setup.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

CampaignState campaign([int map = 0]) => CampaignState.fromRom(
  decodeWorlds(
    File('assets/maps/worlds.json').readAsStringSync(),
    setup: CampaignSetup.decode(
      File('assets/data/campaign_config.json').readAsStringSync(),
    ),
  )[map],
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  startingGold: 10000,
  aiEnabled: false,
);

void finish(CampaignState c, WorldBattle battle) {
  for (var i = 0; i < 3000 && battle.isActive; i++) {
    c.advance(1 / 60);
  }
  expect(battle.isActive, isFalse);
}

void main() {
  for (final country in [0, 1]) {
    test('${country == 0 ? '玩家' : 'NPC'}将领回城立即满血，生还者归入库存并清空随军', () {
      final c = campaign();
      final home = c.world.cities[country];
      final hero = c.garrisonAt(home.id).first..hp = 3;
      final health = hero.health;
      final reserves = c.soldiersAt(home.id);
      final march = c.dispatchTo(
        hero,
        c.cityBounds(home).centerRight + const Offset(100, 0),
        countryId: country,
      )!;
      expect(hero.soldiers, 4);
      expect(c.soldiersAt(home.id), reserves - 4);
      hero.squad.first.hp = 5;
      hero.squad.last.hp = 0; // 一兵阵亡，只归还三名生还者。
      // NPC 与玩家使用同一到达处理，直接把最后一段路线落到本国城池边缘。
      march.moveTo(march.position, city: home);
      c.advance(0.02);
      expect(c.marches, isNot(contains(hero.id)));
      expect(hero.health, same(health));
      expect(hero.hp, hero.maxHp);
      expect(hero.soldiers, 0);
      expect(c.soldiersAt(home.id), reserves - 1);
    });
  }

  test('靠近敌城开始攻城不治疗，反复到达检查不会无限回血', () {
    final c = campaign();
    final hero = c.heroes.firstWhere((h) => h.sourceId == 0)..hp = 19;
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    expect(march.phase, MarchPhase.fighting);
    expect(hero.hp, 19);
    c.advance(1);
    expect(hero.hp, 19);
    expect(c.cities[1]!.ownerCountryId, 1);
  });

  test('占领只归还随军生还者，援军按实际人数入库，重复进驻不刷兵', () {
    final c = campaign(2);
    final target = c.world.cities[1];
    final stock = c.cities[1]!;
    expect(stock.level, 4);
    expect(
      c.buySoldiers(1, c.soldierCapacityAt(1) - c.soldiersAt(1), countryId: 1),
      isTrue,
    );
    expect(c.soldiersAt(1), c.soldierCapacityAt(1));
    c.heroes.removeWhere((hero) => hero.cityId == 1);
    final hero = c.garrisonAt(0).first..hp = 7;
    hero.squad.first.hp = 0;
    final march = c.dispatch(hero, target)!;
    hero.squad.first.hp = 0; // 自动补兵发生在离城，单独验证入城不刷新随行兵。
    march.position = march.destination;
    c.advance(0.02);
    expect(stock.ownerCountryId, 0);
    expect(stock.level, 1);
    expect(c.soldiersAt(1), 9);
    expect(hero.hp, hero.maxHp);
    expect(hero.cityId, target.id);
    expect(hero.soldiers, 0);
    final reinforcement = c.garrisonAt(0).first..hp = 1;
    final second = c.dispatch(reinforcement, target)!;
    second.position = second.destination;
    c.advance(0.02);
    expect(reinforcement.hp, reinforcement.maxHp);
    expect(c.soldiersAt(1), 9);
    stock.ownerCountryId = 0;
    expect(c.soldiersAt(1), 9);
  });

  test('实际打下一级城后满血，只接收战斗生还兵员，重复结算不重复入库', () {
    final c = campaign();
    final target = c.world.cities[1];
    c.cities[1]!.ownerCountryId = 2;
    c.cities[1]!.ownerCountryId = 1;
    c.countryTroops[1] = CountryTroops();
    final guard = c.garrisonAt(1).last..hp = 1;
    for (final soldier in guard.squad) {
      soldier.hp = 0;
    }
    final hero = c.heroes.firstWhere((h) => h.sourceId == 0)..hp = 11;
    final march = c.dispatch(hero, target)!;
    march.position = march.destination;
    c.advance(0.02);
    final battle = c.battles[1]!;
    finish(c, battle);
    expect(battle.simulation.result, BattleResult.attackerWon);
    expect(hero.hp, hero.maxHp);
    final survivors = battle.simulation.survivors(BattleSide.attacker);
    expect(c.soldiersAt(1), 6 + survivors);
    expect(hero.soldiers, 0);
    c.advance(1);
    expect(c.soldiersAt(1), 6 + survivors);
  });

  test('守城胜利也恢复将领满血，进攻方阵亡不会复活', () {
    final c = campaign();
    final target = c.world.cities[1];
    final guard = c.garrisonAt(1).last..hp = 20;
    final hero = c.heroes.firstWhere((h) => h.sourceId == 0)..hp = 1;
    for (final soldier in hero.squad) {
      soldier.hp = 0;
    }
    final march = c.dispatch(hero, target)!;
    march.position = march.destination;
    c.advance(0.02);
    finish(c, c.battles[1]!);
    expect(hero.hp, 0);
    expect(guard.hp, guard.maxHp);
  });

  for (final home in [0, 1]) {
    test('国家 $home 守城结束恢复将领 HP，生还兵归营，战斗记录保留实际兵损', () {
      final c = campaign();
      final target = c.world.cities[home];
      final guard = c.garrisonAt(home).last..hp = 30;
      final reserve = c.soldiersAt(home);
      guard.squad.last.hp = 0;
      final attacker = c
          .garrisonAt(home == 0 ? 1 : 0)
          .firstWhere((hero) => hero.sourceId != 40);
      final march = c.dispatch(
        attacker,
        target,
        countryId: attacker.countryId,
      )!;
      // 自动补兵已经完成，在进入战场前安排残血进攻方。
      attacker.hp = 1;
      for (final soldier in attacker.squad) {
        soldier.hp = 0;
      }
      march.position = march.destination;
      c.advance(0.02);
      final battle = c.battles[home]!;
      for (var i = 0; i < 3000 && attacker.health.alive; i++) {
        c.advance(1 / 60);
      }
      final remaining = guard.squad.map((soldier) => soldier.hp).toList();
      final health = guard.health;
      finish(c, battle);
      expect(battle.simulation.result, BattleResult.defenderWon);
      expect(guard.hp, guard.maxHp);
      expect(guard.health, same(health));
      expect(guard.soldiers, 0);
      expect(
        battle.simulation.defender.soldiers.map((soldier) => soldier.hp),
        remaining,
      );
      expect(
        c.soldiersAt(home),
        reserve - 4 + remaining.where((hp) => hp > 0).length,
      );
      expect(attacker.hp, 0);
      expect(c.heroes, isNot(contains(attacker)));
    });
  }
}
