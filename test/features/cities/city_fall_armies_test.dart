import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import 'package:pixel_world/features/world_map/presentation/world_controller.dart';

CampaignState campaign({bool spareCapital = true}) {
  final c = CampaignState.fromRom(
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()).first,
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
    aiEnabled: false,
  );
  // 只为用例安排一级城市，捕获事件仍通过真实守将战败入口触发。
  for (final id in [0, 1, 2]) {
    final owner = c.cities[id]!.ownerCountryId;
    c.cities[id]!.ownerCountryId = 15;
    c.cities[id]!.ownerCountryId = owner;
  }
  if (spareCapital) {
    c.cities[9]!.ownerCountryId = 0;
    c.heroes.firstWhere((h) => h.sourceId == 40).cityId = 9;
  }
  return c;
}

void capture(CampaignState c, int city) {
  final guard = c.garrisonAt(city).first;
  final result = c.defeatHero(
    guard.id,
    winnerCountryId: 3,
    defendedCityId: city,
  );
  expect(result!.captured, isTrue);
}

GamePoint field(CampaignState c) {
  for (var y = 5; y < c.world.height - 5; y++) {
    for (var x = 5; x < c.world.width - 5; x++) {
      final point = TileCoord(x, y).center;
      if (c.world.cities.every(
        (city) => !c.cityBounds(city).inflate(80).contains(point),
      )) {
        return point;
      }
    }
  }
  throw StateError('无可用野战位置');
}

void finish(CampaignState c, WorldBattle battle) {
  for (var i = 0; i < 6000 && battle.isActive; i++) {
    c.advance(1 / 60);
  }
  expect(battle.isActive, isFalse);
}

void main() {
  for (final home in [0, 1]) {
    for (final camped in [false, true]) {
      test(
        '${home == 0 ? '玩家' : 'NPC'}城池失守立即清除${camped ? '扎营' : '行军'}部队，不清除其他城市部队',
        () {
          final c = campaign();
          final hero = c.garrisonAt(home).first;
          final other = c.heroes.firstWhere((h) => h.sourceId == 40);
          final march = c.dispatchTo(
            hero,
            field(c),
            countryId: hero.countryId,
          )!;
          if (camped) march.camp();
          capture(c, home);
          expect(hero.hp, 0);
          expect(c.heroes, isNot(contains(hero)));
          expect(c.marches, isNot(contains(hero.id)));
          expect(c.recruitPool.where((h) => h.id == hero.sourceId).length, 1);
          expect(c.heroes, contains(other));
          expect(c.cities[9]!.ownerCountryId, 0);
        },
      );
    }
    for (final wins in [false, true]) {
      test(
        '${home == 0 ? '玩家' : 'NPC'}出发城失守不打断攻城，${wins ? '胜利进驻' : '战败'}后将领仍消失',
        () {
          final c = campaign();
          final hero = c.garrisonAt(home).first;
          final target = home == 0 ? 1 : 2;
          final defender = c.garrisonAt(target).last;
          final vulnerable = wins ? defender : hero;
          vulnerable.hp = 1;
          for (final soldier in vulnerable.squad) {
            soldier.hp = 0;
          }
          final march = c.dispatch(
            hero,
            c.world.cities[target],
            countryId: hero.countryId,
          )!;
          march.position = march.destination;
          c.advance(0.02);
          final battle = c.battles[target]!;
          capture(c, home);
          expect(c.heroes, contains(hero));
          expect(hero.health.alive, isTrue);
          expect(battle.simulation.stopped, isFalse);
          expect(c.recruitPool.any((h) => h.id == hero.sourceId), isFalse);
          finish(c, battle);
          expect(
            battle.simulation.result,
            wins ? BattleResult.attackerWon : BattleResult.defenderWon,
          );
          expect(c.heroes, isNot(contains(hero)));
          expect(c.marches, isNot(contains(hero.id)));
          expect(c.recruitPool.where((h) => h.id == hero.sourceId).length, 1);
          expect(battle.nextWaveIn, 0);
          expect(c.cities[home]!.level, 1);
        },
      );
    }
  }

  test('野战双方的出发城同时失守，战斗继续，胜败双方最终都清除', () {
    final c = campaign();
    final a = c.garrisonAt(0).first, b = c.garrisonAt(1).first;
    final point = field(c);
    final am = c.dispatchTo(a, point + const GamePoint(80, 0))!;
    final bm = c.dispatchTo(
      b,
      point - const GamePoint(80, 0),
      countryId: b.countryId,
    )!;
    am.position = point - const GamePoint(8, 0);
    bm.position = point + const GamePoint(8, 0);
    c.advance(0.02);
    final battle = c.fieldBattles.values.single;
    capture(c, 0);
    capture(c, 1);
    expect(c.heroes, containsAll([a, b]));
    expect(battle.simulation.stopped, isFalse);
    finish(c, battle);
    expect(c.heroes, isNot(contains(a)));
    expect(c.heroes, isNot(contains(b)));
    expect(c.marches.keys, isNot(contains(a.id)));
    expect(c.marches.keys, isNot(contains(b.id)));
  });

  test('失城后不能借移动或撤退保住部队，打完后按原规则消失', () {
    final c = campaign();
    final hero = c.garrisonAt(0).first;
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    capture(c, 0);
    expect(c.moveTo(hero.id, field(c)), isFalse);
    expect(c.retreatHero(hero.id), isNull);
    expect(c.heroes, contains(hero));
    finish(c, c.battles[1]!);
    expect(c.heroes, isNot(contains(hero)));
    expect(c.marches, isNot(contains(hero.id)));
    expect(c.battles[1]!.isActive, isFalse);
  });

  test('游戏结束冻结世界，但已开打的失城部队仍在后台打完并消失', () {
    final c = campaign(spareCapital: false);
    final hero = c.garrisonAt(0).firstWhere((h) => h.sourceId != 40);
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    final battle = c.battles[1]!;
    capture(c, 0);
    expect(c.defeated, isTrue);
    expect(c.heroes, contains(hero));
    expect(battle.simulation.stopped, isFalse);
    final gold = c.gold, month = c.settledTurns;
    finish(c, battle);
    expect(c.heroes, isNot(contains(hero)));
    expect(c.gold, gold + 50); // 最后一城的战利品仍按本场已经发生的胜负结算。
    expect(c.settledTurns, month);
    expect(c.defeated, isTrue);
  });

  test('连续守将之间不退出，整场攻城结束后自动返回地图', () {
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
    );
    final catalog = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    final c = WorldController(worlds, heroCatalog: catalog, aiEnabled: false);
    c.campaigns[0] = CampaignState.fromRom(
      worlds.first,
      catalog,
      aiEnabled: false,
    );
    final a = c.campaign.heroes.firstWhere((h) => h.sourceId == 0);
    final d = c.campaign.garrisonAt(1).last;
    d.hp = 1;
    for (final s in d.squad) {
      s.hp = 0;
    }
    final march = c.campaign.dispatch(a, c.world.cities[1])!;
    march.position = march.destination;
    c.tick(0.02);
    final battle = c.campaign.battles[1]!;
    c.watchBattle(battle);
    for (
      var i = 0;
      i < 3000 && battle.simulation.stage != BattleStage.ending;
      i++
    ) {
      c.tick(1 / 60);
    }
    expect(battle.simulation.stage, BattleStage.ending);
    final levelBeforeResult = c.campaign.cities[1]!.level;
    for (var i = 0; i < 60; i++) {
      c.tick(1 / 60);
    }
    expect(c.watchedBattle, same(battle));
    expect(battle.wave, 1);
    expect(battle.nextWaveIn, greaterThan(0));
    expect(c.campaign.cities[1]!.level, levelBeforeResult);
    expect(c.campaign.heroes, isNot(contains(d)));
    for (var i = 0; i < 3000 && battle.wave == 1; i++) {
      c.tick(1 / 60);
    }
    expect(battle.wave, 2);
    expect(c.watchedBattle, same(battle));
    for (var i = 0; i < 6000 && battle.isActive; i++) {
      c.tick(1 / 60);
    }
    expect(battle.isActive, isFalse);
    expect(c.watchedBattle, isNull);
    c.dispose();
  });

  test('换守将间隙失城立即清除，不启动下一位守将的幽灵战斗', () {
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
    );
    final catalog = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    final c = CampaignState.fromRom(worlds.first, catalog, aiEnabled: false);
    c.cities[9]!.ownerCountryId = 0;
    c.heroes.firstWhere((hero) => hero.sourceId == 40).cityId = 9;
    final hero = c.garrisonAt(0).first;
    final guard = c.garrisonAt(1).last..hp = 1;
    for (final soldier in guard.squad) {
      soldier.hp = 0;
    }
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    final battle = c.battles[1]!;
    for (var i = 0; i < 3000 && battle.nextWaveIn == 0; i++) {
      c.advance(1 / 60);
    }
    expect(battle.nextWaveIn, greaterThan(0));
    capture(c, 0);
    expect(c.heroes, isNot(contains(hero)));
    expect(battle.isActive, isFalse);
    expect(battle.nextWaveIn, 0);
    c.advance(3);
    expect(battle.wave, 1);
  });
}
