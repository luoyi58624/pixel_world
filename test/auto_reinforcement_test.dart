import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';

List<WorldDefinition> _worlds() =>
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync());
List<RomHeroDefinition> _heroes() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());
CampaignState _campaign({int gold = 50}) => CampaignState.fromRom(
  _worlds().first,
  _heroes(),
  startingGold: gold,
  aiEnabled: false,
);

void _emptySquad(CampaignHero hero) {
  for (final soldier in hero.squad) {
    soldier.hp = 0;
  }
}

void main() {
  for (final country in [0, 1]) {
    for (final stock in [0, 2, 10]) {
      test('国家 $country 储备 $stock 人时离城自动尽量补满四兵且不额外扣金币', () {
        final c = _campaign();
        final hero = c.garrisonAt(country).first;
        _emptySquad(hero);
        hero.hp = 7;
        if (stock > 0) {
          expect(c.buySoldiers(country, stock, countryId: country), isTrue);
        }
        final gold = c.goldFor(country);
        final target = c.world.cities[country == 0 ? 1 : 0];
        final march = c.dispatch(hero, target, countryId: country)!;
        final expected = stock.clamp(0, 4);
        expect(hero.soldiers, expected);
        expect(hero.hp, 7);
        expect(c.cities[country]!.reserveSoldiers, stock - expected);
        expect(c.goldFor(country), gold);
        expect(c.garrisonAt(country), isNot(contains(hero)));
        expect(c.dispatch(hero, target, countryId: country), isNull);
        expect(c.cities[country]!.reserveSoldiers, stock - expected);
        march.moveTo(march.position + const Offset(32, 0));
        c.advance(0.02);
        expect(c.cities[country]!.reserveSoldiers, stock - expected);
      });
    }
  }

  test('只补阵亡兵位，保留伤兵和将领血量，并替换旧生命对象', () {
    final c = _campaign();
    final hero = c.garrisonAt(0).first..hp = 9;
    hero.squad[0].hp = 0;
    hero.squad[1].hp = 5;
    final fallen = hero.squad[0], wounded = hero.squad[1];
    c.buySoldiers(0, 10);
    c.dispatch(hero, c.world.cities[1]);
    expect(hero.soldiers, 4);
    expect(hero.squad[0], isNot(same(fallen)));
    expect(fallen.hp, 0);
    expect(hero.squad[1], same(wounded));
    expect(wounded.hp, 5);
    expect(hero.hp, 9);
    expect(c.cities[0]!.reserveSoldiers, 9);
  });

  test('多英雄连续离城共享同一库存，后出发者带走剩余兵员', () {
    final c = _campaign();
    final heroes = c.garrisonAt(0).toList();
    for (final hero in heroes) {
      _emptySquad(hero);
    }
    c.buySoldiers(0, 6);
    for (final hero in heroes) {
      c.dispatch(hero, c.world.cities[1]);
    }
    expect(heroes.map((hero) => hero.soldiers), [4, 2, 0]);
    expect(c.cities[0]!.reserveSoldiers, 0);
    expect(c.marches.length, 3);
  });

  test('查看、切换、取消、无效目的地均不提前扣兵，确认有效目的地才自动补兵', () {
    final c = WorldController(
      _worlds(),
      heroCatalog: _heroes(),
      aiEnabled: false,
    );
    addTearDown(c.dispose);
    c.campaigns[0] = _campaign();
    c.campaign.buySoldiers(0, 2);
    final hero = c.campaign.garrisonAt(0).first;
    _emptySquad(hero);
    c.openCity(c.world.cities[0]);
    c.selectHero(hero.id);
    c.prepareDispatch();
    expect(hero.soldiers, 0);
    c.cancelCityAction();
    expect(c.campaign.cities[0]!.reserveSoldiers, 2);
    c.prepareDispatch();
    c.confirmPosition(const Offset(-1, -1));
    c.confirmPosition(c.campaign.cityBounds(c.world.cities[0]).center);
    expect(c.pendingHero, same(hero));
    expect(hero.soldiers, 0);
    expect(c.campaign.cities[0]!.reserveSoldiers, 2);
    c.confirmTarget(c.world.cities[1]);
    expect(hero.soldiers, 2);
    expect(c.campaign.cities[0]!.reserveSoldiers, 0);
    expect(c.campaign.marches.length, 1);
    c.confirmTarget(c.world.cities[1]);
    expect(c.campaign.marches.length, 1);
  });

  test('征兵每次最多十人，同时受余额和容量限制，点击时重新计算人数', () {
    final c = WorldController(
      _worlds(),
      heroCatalog: _heroes(),
      aiEnabled: false,
    );
    addTearDown(c.dispose);
    c.campaigns[0] = _campaign(gold: 7);
    c.openCity(c.world.cities[0]);
    expect(c.campaign.soldierPurchaseBatch(0), 7);
    // 按钮展示后国库发生消费，实际点击不能沿用过期报价。
    c.campaign.buySoldiers(0, 2);
    c.buyCitySoldiers();
    expect(c.campaign.cities[0]!.reserveSoldiers, 7);
    expect(c.campaign.gold, 0);
    c.buyCitySoldiers();
    expect(c.campaign.cities[0]!.reserveSoldiers, 7);
    final rich = _campaign(gold: 1000);
    final hero = rich.garrisonAt(0).first;
    rich.upgradeCity(0, hero: hero);
    expect(rich.soldierPurchaseBatch(0), 10);
    rich.buySoldiers(0, 10);
    expect(rich.soldierPurchaseBatch(0), 10);
    rich.buySoldiers(0, 10);
    expect(rich.soldierPurchaseBatch(0), 0);
    expect(rich.soldierPurchaseBatch(1), 0);
  });
}
