import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/campaign_setup.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

import 'support/first_random.dart';

CampaignState campaign([int map = 0]) => CampaignState.fromRom(
  defenderRandom: FirstRandom(),
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
    test('${country == 0 ? '玩家' : 'NPC'}将领回到本国城池立即满血，不刷新已有储备或补齐随行兵', () {
      final c = campaign();
      final home = c.world.cities[country];
      final hero = c.garrisonAt(home.id).first..hp = 3;
      hero.squad.first.hp = 5;
      hero.squad.last.hp = 0;
      final health = hero.health;
      final reserves = c.cities[home.id]!.reserveSoldiers;
      final march = c.dispatchTo(
        hero,
        c.cityBounds(home).centerRight + const Offset(100, 0),
        countryId: country,
      )!;
      // NPC 与玩家使用同一到达处理，直接把最后一段路线落到本国城池边缘。
      march.moveTo(march.position, city: home);
      c.advance(0.02);
      expect(c.marches, isNot(contains(hero.id)));
      expect(hero.health, same(health));
      expect(hero.hp, hero.maxHp);
      expect(hero.squad.first.hp, 5);
      expect(hero.soldiers, 3);
      expect(c.cities[home.id]!.reserveSoldiers, reserves);
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

  test('占领无守军高级城后储备重置为10并满血，援军及重复进驻不会刷兵', () {
    final c = campaign(2);
    final target = c.world.cities[1];
    final stock = c.cities[1]!;
    expect(stock.level, 4);
    expect(
      c.buySoldiers(
        1,
        stock.reserveCapacity - stock.reserveSoldiers,
        countryId: 1,
      ),
      isTrue,
    );
    expect(stock.reserveSoldiers, 25);
    c.heroes.removeWhere((hero) => hero.cityId == 1);
    final hero = c.garrisonAt(0).first..hp = 7;
    hero.squad.first.hp = 0;
    final march = c.dispatch(hero, target)!;
    march.position = march.destination;
    c.advance(0.02);
    expect(stock.ownerCountryId, 0);
    expect(stock.level, 1);
    expect(stock.reserveSoldiers, 10);
    expect(hero.hp, hero.maxHp);
    expect(hero.cityId, target.id);
    expect(hero.soldiers, 3);
    expect(c.reinforceHero(hero), 1);
    expect(stock.reserveSoldiers, 9);
    final reinforcement = c.garrisonAt(0).first..hp = 1;
    final second = c.dispatch(reinforcement, target)!;
    second.position = second.destination;
    c.advance(0.02);
    expect(reinforcement.hp, reinforcement.maxHp);
    expect(stock.reserveSoldiers, 9);
    stock.ownerCountryId = 0;
    expect(stock.reserveSoldiers, 9);
  });

  test('实际打下一座一级城后满血并刷新10储备，重复结算不再赠送', () {
    final c = campaign();
    final target = c.world.cities[1];
    c.cities[1]!.ownerCountryId = 2;
    c.cities[1]!.ownerCountryId = 1;
    final guard = c.garrisonAt(1).first..hp = 1;
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
    expect(c.cities[1]!.reserveSoldiers, 10);
    hero.squad.last.hp = 0;
    c.reinforceHero(hero);
    expect(c.cities[1]!.reserveSoldiers, 9);
    c.advance(1);
    expect(c.cities[1]!.reserveSoldiers, 9);
  });

  test('守城存活不是重新入城，不会在普通结算时自动恢复血量', () {
    final c = campaign();
    final target = c.world.cities[1];
    final guard = c.garrisonAt(1).first..hp = 20;
    final hero = c.heroes.firstWhere((h) => h.sourceId == 0)..hp = 1;
    for (final soldier in hero.squad) {
      soldier.hp = 0;
    }
    final march = c.dispatch(hero, target)!;
    march.position = march.destination;
    c.advance(0.02);
    finish(c, c.battles[1]!);
    expect(hero.hp, 0);
    expect(guard.hp, 20);
  });
}
