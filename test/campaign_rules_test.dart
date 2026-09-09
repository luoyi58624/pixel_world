import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

List<RomHeroDefinition> _catalog() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());
List<WorldDefinition> _worlds() =>
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync());
CampaignState _campaign({int gold = 300}) => CampaignState.fromRom(
  aiEnabled: false,
  _worlds().first,
  _catalog(),
  startingGold: gold,
  economyRandom: _NormalRandom(),
);

class _NormalRandom implements math.Random {
  @override
  int nextInt(int max) => 0;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0;
}

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

void main() {
  test('初始等级按各图 ROM 城池记录加载，奥尔梅分别为二、三、四级', () {
    final worlds = _worlds();
    for (var index = 0; index < worlds.length; index++) {
      final world = worlds[index];
      final c = CampaignState.fromRom(world, _catalog());
      expect(world.cities[1].initialLevel, index + 2);
      expect(c.cities[1]!.level, index + 2);
      expect(c.cities[1]!.income, 10 + 5 * (index + 1));
      for (final city in world.cities) {
        expect(c.cities[city.id]!.level, city.initialLevel);
      }
    }
  });

  test('读取 41 位正式英雄，主角姓名与固定汉化姓名区分', () {
    final heroes = _catalog();
    expect(heroes.length, 41);
    expect(heroes[0].name, '泽拉斯');
    expect(
      [heroes[0].maxHp, heroes[0].combat, heroes[0].politics, heroes[0].salary],
      [95, 15, 15, 8],
    );
    expect(heroes[2].name, '威拉斯');
    expect(
      [heroes[2].maxHp, heroes[2].politics, heroes[2].salary],
      [94, 3, 10],
    );
    expect(heroes[40].name, isNull);
    expect(
      [
        heroes[40].maxHp,
        heroes[40].combat,
        heroes[40].politics,
        heroes[40].salary,
      ],
      [99, 15, 15, 0],
    );
    final c = _campaign();
    expect(c.heroesAt(0).map((hero) => hero.sourceId), [40, 0, 2]);
    expect(c.soldiersAt(0), 12);
  });

  test('重复初始化编号采用最后所属城池，不复制英雄身份', () {
    final c = CampaignState.fromRom(_worlds()[2], _catalog());
    expect(c.heroes.where((hero) => hero.sourceId == 11).length, 1);
    expect(_hero(c, 11).cityId, 5);
  });

  test('最高五级、每次增产，满级与余额不足均不扣款', () {
    final c = _campaign(gold: 10000);
    for (var level = 2; level <= 5; level++) {
      final before = c.gold;
      expect(c.upgradeCity(0, hero: _hero(c, 40)), isTrue);
      expect(c.cities[0]!.level, level);
      expect(c.cities[0]!.income, 10 + 5 * (level - 1));
      expect(before - c.gold, [15, 65, 135, 285][level - 2]);
    }
    final balance = c.gold;
    expect(c.upgradeCity(0, hero: _hero(c, 40)), isFalse);
    expect(c.upgradeCity(1, hero: _hero(c, 40)), isFalse);
    expect(c.gold, balance);
    expect(c.cities[0]!.baseUpgradeCost, isNull);
    final poor = _campaign(gold: 14);
    expect(poor.upgradeCity(0, hero: _hero(poor, 40)), isFalse);
    expect(poor.gold, 14);
    expect(poor.cities[0]!.level, 1);
  });

  test('每60秒按现有等级月结并扣缩减后的月俸，结果与帧长一致', () {
    for (final frames in [1, 60, 1200]) {
      final c = _campaign();
      expect(c.salaryCost, 4);
      expect(c.netIncome, 6);
      for (var n = 0; n < frames; n++) {
        c.advance(120 / frames);
      }
      expect(c.settledTurns, 2);
      expect(c.gold, 312);
    }
    final c = _campaign();
    c.upgradeCity(0, hero: _hero(c, 40));
    c.advance(59.9);
    expect(c.gold, 285);
    c.advance(0.1);
    expect(c.gold, 296);
  });

  test('守将阵亡降一级且立即减产，同一战败不能重复降级', () {
    final c = _campaign(gold: 2000);
    c.upgradeCity(0, hero: _hero(c, 40));
    c.upgradeCity(0, hero: _hero(c, 40));
    final result = c.defeatHero(
      'rom-0',
      winnerCountryId: 1,
      defendedCityId: 0,
    )!;
    expect(result.oldLevel, 3);
    expect(result.newLevel, 2);
    expect(result.captured, isFalse);
    expect(result.removedHeroIds, ['rom-0']);
    expect(c.cities[0]!.income, 15);
    expect(c.cities[0]!.isPlayer, isTrue);
    expect(c.heroesAt(0).length, 2);
    expect(
      c.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0),
      isNull,
    );
    expect(c.cities[0]!.level, 2);
  });

  test('一级城失守清除本城在外主角，其他城市英雄不受清除影响', () {
    final c = _campaign();
    final away = _hero(c, 0)..cityId = 2;
    c.cities[2]!.ownerCountryId = 0;
    final enemyIds = c.heroes
        .where((hero) => !hero.isPlayer)
        .map((hero) => hero.id)
        .toList();
    c.dispatch(_hero(c, 40), c.world.cities[1]);
    expect(c.canDispatch(_hero(c, 2)), isTrue);
    final result = c.defeatHero(
      'rom-2',
      winnerCountryId: 1,
      defendedCityId: 0,
    )!;
    expect(result.captured, isTrue);
    expect(result.removedHeroIds, ['rom-2', 'rom-40']);
    expect(c.cities[0]!.level, 1);
    expect(c.cities[0]!.isPlayer, isFalse);
    expect(c.heroes, contains(away));
    expect(
      c.heroes.where((hero) => !hero.isPlayer).map((hero) => hero.id),
      enemyIds,
    );
    expect(c.marches.containsKey('rom-40'), isFalse);
    expect(c.defeated, isTrue);
    expect(c.hasDispatched, isTrue);
  });

  test('升级允许继续出征，最后一城失守清除行军主角并结束本局', () {
    final c = _campaign();
    c.upgradeCity(0, hero: _hero(c, 40));
    c.dispatch(_hero(c, 40), c.world.cities[1]);
    expect(c.canDispatch(_hero(c, 0)), isTrue);
    c.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
    expect(c.cities[0]!.level, 1);
    c.defeatHero('rom-2', winnerCountryId: 1, defendedCityId: 0);
    expect(c.cities[0]!.isPlayer, isFalse);
    expect(c.marches.containsKey('rom-40'), isFalse);
    expect(c.heroes.any((hero) => hero.sourceId == 40), isFalse);
    expect(c.defeatReason, CampaignDefeatReason.protagonistFallen);
  });

  test('连续迎战保留兵数和将领伤势，换守将按战斗属性重新初始化红条', () {
    final c = _campaign();
    final hero = _hero(c, 40)..hp = 20;
    hero.squad[0].hp = 0;
    hero.squad[1].hp = 7;
    final defender = c.garrisonAt(1).last..hp = 1;
    for (final soldier in defender.squad) {
      soldier.hp = 0;
    }
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    for (var i = 0; i < 1200 && c.cities[1]!.level == 2; i++) {
      c.advance(0.05);
    }
    final battle = c.battles[1]!;
    expect(battle.nextWaveIn, greaterThan(0));
    final hp = hero.hp;
    final soldiers = hero.squad.map((soldier) => soldier.hp).toList();
    c.advance(1.25);
    expect(battle.wave, 2);
    expect(hero.hp, hp);
    expect(
      hero.squad.map((soldier) => soldier.hp),
      soldiers.map((hp) => hp > 0 ? 20.0 : 0.0),
    );
    expect(
      battle.simulation.attackerMorale.maximum,
      ((hero.combat + 1) * 4 - 1).clamp(0, 63),
    );
    expect(
      battle.simulation.attackerMorale.remaining,
      ((hero.combat + 1) * 4 - 1).clamp(0, 63),
    );
  });

  test('主角进攻战败立即结束，出发城和未出战英雄保留', () {
    final c = _campaign();
    final hero = _hero(c, 40)..hp = 1;
    for (final soldier in hero.squad) {
      soldier.hp = 0;
    }
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    march.phase = MarchPhase.awaitingBattle;
    for (var i = 0; i < 1200 && c.marches.isNotEmpty; i++) {
      c.advance(0.05);
    }
    expect(c.cities[0]!.isPlayer, isTrue);
    expect(c.cities[0]!.level, 1);
    expect(c.heroesAt(0).map((hero) => hero.sourceId), [0, 2]);
    expect(c.marches, isEmpty);
    expect(c.defeated, isTrue);
    expect(c.defeatReason, CampaignDefeatReason.protagonistFallen);
    expect(c.journal.last, contains('游戏结束'));
  });

  test('二级城首位守将战败只降级，再次战败才占领并清除剩余守将', () {
    final c = _campaign();
    final defenderIds = c.garrisonAt(1).map((hero) => hero.id).toList();
    c.garrisonAt(1).last.hp = 1;
    for (final soldier in c.garrisonAt(1).last.squad) {
      soldier.hp = 0;
    }
    final hero = _hero(c, 40);
    final march = c.dispatch(hero, c.world.cities[1])!;
    march.position = march.destination;
    march.phase = MarchPhase.awaitingBattle;
    for (var i = 0; i < 1200 && c.cities[1]!.level == 2; i++) {
      c.advance(0.05);
    }
    expect(c.cities[1]!.level, 1);
    expect(c.cities[1]!.isPlayer, isFalse);
    expect(c.garrisonAt(1).length, defenderIds.length - 1);
    c.garrisonAt(1).last.hp = 1;
    for (final soldier in c.garrisonAt(1).last.squad) {
      soldier.hp = 0;
    }
    for (var i = 0; i < 1200 && !c.cities[1]!.isPlayer; i++) {
      c.advance(0.05);
    }
    expect(c.cities[1]!.isPlayer, isTrue);
    expect(hero.cityId, 1);
    expect(c.heroes.any((hero) => defenderIds.contains(hero.id)), isFalse);
    expect(c.marches, isEmpty);
    expect(c.garrisonAt(1), [hero]);
    expect(c.grossIncome, 20);
  });
}
