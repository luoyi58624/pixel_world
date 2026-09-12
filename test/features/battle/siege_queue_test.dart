import '../../support/ongoing_fixture.dart';

import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/fixed_siege_random.dart';

WorldDefinition _world() => WorldDefinition.fromJson(
  {
    'id': 0,
    'width': 80,
    'height': 32,
    'tiles': List.filled(80 * 32, 0),
    'cities': [
      for (final (id, x, y, country, heroes) in [
        (0, 5, 15, 0, [40, 0, 1, 2]),
        (1, 40, 15, 1, [3, 4, 6]),
        (2, 70, 15, 2, [7, 8]),
        (3, 40, 2, 1, [9, 10]),
      ])
        {
          'id': id,
          'name': '测试城',
          'x': x,
          'y': y,
          'width': 2,
          'height': 2,
          'shape': [3, 3, 3, 3],
          'initialOwnerId': country,
          'initialLevel': 3,
          'unitIds': heroes,
        },
    ],
  },
  [0, 1, 2, 3],
);

CampaignState _campaign({WorldDefinition? world, double retreatRoll = .9}) =>
    ongoingCampaign(
      CampaignState.fromRom(
        world ?? _world(),
        decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
        aiEnabled: false,
        siegeRandom: const FixedSiegeRandom(),
        retreatRandom: FixedSiegeRandom(retreatRoll),
        startingGold: 1000,
      ),

      year: 1,
    );

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

HeroMarch _dispatch(CampaignState c, int id, {int city = 1}) {
  final hero = _hero(c, id);
  return c.dispatch(hero, c.world.cities[city], countryId: hero.countryId)!;
}

void _arrive(CampaignState c, HeroMarch march) {
  march.position = march.destination;
  c.advance(1 / 60);
}

HeroMarch _attack(CampaignState c, {int id = 0, int city = 1}) {
  final march = _dispatch(c, id, city: city);
  _arrive(c, march);
  expect(march.phase, MarchPhase.fighting);
  return march;
}

void _until(CampaignState c, bool Function() done) {
  for (var i = 0; i < 1800 && !done(); i++) {
    c.advance(1 / 60);
  }
  expect(done(), isTrue);
}

void _kill(CampaignHero hero) {
  hero.hp = 0;
  for (final soldier in hero.squad) {
    soldier.hp = 0;
  }
}

void _withdraw(CampaignState c, HeroMarch march) {
  final battle = c.activeBattleForHero(march.hero.id);
  if (battle == null) return;
  // 排队期间可能已经产生胜败，结果过场不能再用撤退改判。
  _until(c, () => !battle.isActive || battle.simulation.canRetreat);
  if (battle.isActive) {
    expect(
      c.retreatHero(march.hero.id, countryId: march.hero.countryId),
      isTrue,
    );
    _until(c, () => !battle.isActive);
  }
  // 撤退者远离测试城下，避免参与接下来的野战。
  march.position = const GamePoint(100, 100);
  march.camp();
}

void main() {
  test('同国强将晚到仍先上场，弱将保持外围候战', () {
    final c = _campaign(retreatRoll: .99);
    addTearDown(c.dispose);
    final active = _attack(c);
    _hero(c, 1).hp = 10;
    final weak = _dispatch(c, 1), strong = _dispatch(c, 2);
    _arrive(c, weak);
    _arrive(c, strong);
    _withdraw(c, active);
    _until(
      c,
      () => c.battles[1]!.isActive && c.battles[1]!.attacker == strong.hero,
    );
    expect(c.activeBattleForHero(weak.hero.id), isNull);
    expect(weak.target?.id, 1);
  });

  test('成功撤退可穿过围攻通路返城，不被候战队友堵成扎营', () {
    final c = _campaign(retreatRoll: .99);
    addTearDown(c.dispose);
    final active = _attack(c);
    final first = _dispatch(c, 1), second = _dispatch(c, 2);
    _arrive(c, first);
    _arrive(c, second);
    _until(c, () => c.battles[1]!.simulation.canRetreat);
    expect(c.retreatHero(active.hero.id), isTrue);
    var returning = false;
    for (
      var tick = 0;
      tick < 3600 && c.marches.containsKey(active.hero.id);
      tick++
    ) {
      c.advance(1 / 60);
      if (!active.returningFromRetreat) continue;
      returning = true;
      expect(active.phase, isNot(MarchPhase.camped));
    }
    expect(returning, isTrue);
    expect(c.marches.containsKey(active.hero.id), isFalse);
    expect(c.garrisonAt(0), contains(active.hero));
  });

  test('原版驻军按目录以主角开头，扩展将领不改变原身份编号', () {
    final catalog = decodeRomHeroes(
      File('assets/data/heroes.json5').readAsStringSync(),
    );
    final heroes =
        catalog
            .where((hero) => hero.id <= 40)
            .toList()
            .reversed
            .map((hero) => CampaignHero.fromRom(hero, cityId: 0, countryId: 0))
            .toList()
          ..sort(CampaignHero.compareRosterOrder);
    expect(heroes.take(5).map((hero) => hero.name), [
      '主角',
      '泽拉斯',
      '亚彭龙',
      '威拉斯',
      '波塞伊',
    ]);
    expect(heroes.take(5).map((hero) => hero.sourceId), [40, 0, 1, 2, 3]);
    expect(
      heroes.skip(1).take(10).every((hero) => hero.type == HeroType.advanced),
      isTrue,
    );
    expect(
      heroes.skip(11).every((hero) => hero.type == HeroType.normal),
      isTrue,
    );
    expect(heroes.map((hero) => hero.sourceId).toSet(), {
      for (var id = 0; id <= 40; id++) id,
    });
    expect(heroes.length, 41);
    expect(catalog.map((hero) => hero.id).toSet().length, catalog.length);
  });

  test('驻军按内政和攻击力从高到低展示、迎战从末位向前', () {
    final c = _campaign();
    final first = _hero(c, 6);
    c.heroes.remove(first);
    c.heroes.insert(0, first);
    _hero(c, 10).cityId = 1;
    final roster = c.garrisonAt(1).toList();
    expect(roster.map((hero) => hero.sourceId), [4, 10, 3, 6]);
    expect(roster.map((hero) => hero.politics), [13, 13, 10, 5]);
    expect(roster.map((hero) => hero.combat), [15, 13, 15, 14]);
    c.settledMonths = 12;
    expect(c.upgradeCity(1, hero: first, countryId: 1), isTrue);
    final active = _attack(c);
    final battle = c.battles[1]!;
    final defenseOrder = roster.reversed.toList();
    for (var i = 0; i < roster.length; i++) {
      expect(battle.defender, same(defenseOrder[i]));
      if (i == roster.length - 1) break;
      _kill(battle.defender);
      _until(c, () => battle.wave == i + 2);
    }
    expect(active.phase, MarchPhase.fighting);
    expect(c.defeated, isFalse);
  });

  test('我方城市从驻军末位接战，主角留到最后', () {
    final c = _campaign();
    expect(c.garrisonAt(0).first.sourceId, 40);
    final expected = c.garrisonAt(0).last;
    _attack(c, id: 7, city: 0);
    expect(c.battles[0]!.defender, same(expected));
  });

  test('新增驻军不会顶替当前守将，下一场继续沿用剩余属性顺序', () {
    final c = _campaign();
    final third = _hero(c, 6);
    c.heroes.remove(third);
    c.heroes.insert(0, third);
    _attack(c);
    final battle = c.battles[1]!;
    expect(battle.defender, same(_hero(c, 6)));
    final lower = _hero(c, 10)..cityId = 1;
    expect(lower.type, HeroType.normal);
    final waiter = _dispatch(c, 1);
    _arrive(c, waiter);
    c.advance(0.5);
    expect(c.battles[1], same(battle));
    expect(battle.defender, same(_hero(c, 6)));
    _kill(battle.defender);
    _until(c, () => battle.wave == 2);
    expect(battle.defender, same(_hero(c, 3)));
    expect(waiter.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
  });

  test('跳过出征或阵亡将领，别城驻军不会被选为守将', () {
    final c = _campaign();
    _hero(c, 10).cityId = 1;
    _hero(c, 9).cityId = 1;
    _kill(_hero(c, 10));
    c.dispatchTo(_hero(c, 3), const GamePoint(900, 100), countryId: 1);
    _kill(_hero(c, 4));
    _attack(c);
    expect(c.battles[1]!.defender.sourceId, 6);
  });

  test('同战力按抵达顺序逐支接战，同国等待者向外围分散', () {
    final c = _campaign();
    final active = _attack(c);
    final laterArrival = _dispatch(c, 1);
    final earlierArrival = _dispatch(c, 2);
    _arrive(c, earlierArrival);
    _arrive(c, laterArrival);
    final positions = [earlierArrival.position, laterArrival.position];
    c.advance(0.5);
    expect([earlierArrival.position, laterArrival.position], isNot(positions));
    expect(earlierArrival.target, laterArrival.target);
    expect(c.fieldBattles, isEmpty);
    _withdraw(c, active);
    c.advance(1 / 60);
    _until(
      c,
      () =>
          c.battles[1]!.isActive &&
          c.battles[1]!.attacker == earlierArrival.hero,
    );
    expect(c.battles[1]!.attacker, same(earlierArrival.hero));
    expect(
      laterArrival.phase,
      anyOf(MarchPhase.awaitingBattle, MarchPhase.marching),
    );
    _withdraw(c, earlierArrival);
    c.advance(1 / 60);
    _until(
      c,
      () =>
          c.battles[1]!.isActive && c.battles[1]!.attacker == laterArrival.hero,
    );
    expect(c.battles[1]!.attacker, same(laterArrival.hero));
  });

  test('同一国家不同城池各自接战，不共用一个攻城名额', () {
    final c = _campaign();
    final first = _attack(c);
    final second = _attack(c, id: 1, city: 3);
    expect(c.battles.values.where((b) => b.isActive).length, 2);
    expect([first.phase, second.phase], everyElement(MarchPhase.fighting));
  });

  test('换守将仍锁定城池，下一位按名单顺序上场', () {
    final c = _campaign();
    _attack(c);
    final battle = c.battles[1]!;
    expect(battle.defender.sourceId, 6);
    final waiter = _dispatch(c, 1);
    _arrive(c, waiter);
    final position = waiter.position;
    _kill(battle.defender);
    _until(c, () => battle.nextWaveIn > 0);
    expect(waiter.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
    expect(c.cities[1]!.ownerCountryId, 1);
    c.advance(0.5);
    expect(c.battles[1], same(battle));
    expect(
      (waiter.position - position).distance,
      lessThanOrEqualTo(waiter.walkDistance + 1),
    );
    _until(c, () => battle.wave == 2);
    expect(battle.defender.sourceId, 3);
    expect(waiter.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
  });

  test('排队者遭遇敌军进行野战，城内攻守双方不会卷入且战斗继续', () {
    final c = _campaign();
    final active = _attack(c);
    final siege = c.battles[1]!;
    final waiter = _dispatch(c, 1);
    _arrive(c, waiter);
    final raider = c.dispatchTo(_hero(c, 7), waiter.position, countryId: 2)!;
    raider.position = waiter.position - const GamePoint(17, 0);
    final time = siege.simulation.elapsed;
    _until(c, () => c.fieldBattles.isNotEmpty);
    final field = c.fieldBattles.values.single;
    expect(
      {field.attacker.id, field.defender.id},
      {waiter.hero.id, raider.hero.id},
    );
    expect(active.phase, MarchPhase.fighting);
    expect(waiter.phase, MarchPhase.dueling);
    expect(c.activeBattleForHero(active.hero.id), same(siege));
    expect(c.activeBattleForHero(siege.defender.id), same(siege));
    expect(siege.simulation.elapsed, greaterThan(time));
    final waitPosition = waiter.position;
    c.advance(0.5);
    expect(waiter.position, waitPosition);
    expect(c.fieldBattles.length, 1);
  });

  test('不同国家的两支待战队伍相遇也能野战，胜者保留原目标和顺序', () {
    final c = _campaign();
    final active = _attack(c);
    final first = _dispatch(c, 1);
    _arrive(c, first);
    final enemy = _dispatch(c, 7);
    enemy.position = first.position;
    enemy.moveTo(enemy.position, city: c.world.cities[1]);
    c.advance(1 / 60);
    final field = c.fieldBattles.values.single;
    expect(first.phase, MarchPhase.dueling);
    expect(enemy.phase, MarchPhase.dueling);
    final later = _dispatch(c, 2);
    _arrive(c, later);
    expect(later.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
    _kill(enemy.hero);
    _until(c, () => !field.isActive);
    expect(c.marches.containsKey(enemy.hero.id), isFalse);
    expect(first.target, same(c.world.cities[1]));
    expect(first.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
    expect(c.cities[2]!.level, 3);
    _withdraw(c, active);
    c.advance(1 / 60);
    _until(
      c,
      () => c.battles[1]!.isActive && c.battles[1]!.attacker == first.hero,
    );
    expect(c.battles[1]!.attacker, same(first.hero));
    expect(later.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
  });

  test('队首正在野战时让下一支攻城，败方被清除后队列仍能推进', () {
    final c = _campaign();
    final active = _attack(c);
    final first = _dispatch(c, 1);
    _arrive(c, first);
    final enemy = _dispatch(c, 7);
    enemy.position = first.position;
    enemy.moveTo(enemy.position, city: c.world.cities[1]);
    c.advance(1 / 60);
    final field = c.fieldBattles.values.single;
    final later = _dispatch(c, 2);
    _arrive(c, later);
    _withdraw(c, active);
    c.advance(1 / 60);
    _until(
      c,
      () => c.battles[1]!.isActive && c.battles[1]!.attacker == later.hero,
    );
    expect(c.battles[1]!.attacker, same(later.hero));
    expect(first.phase, MarchPhase.dueling);
    _kill(first.hero);
    _until(c, () => !field.isActive);
    expect(c.marches.containsKey(first.hero.id), isFalse);
    expect(enemy.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
    expect(c.cities[0]!.level, 3);
    _withdraw(c, later);
    c.advance(1 / 60);
    _until(
      c,
      () => c.battles[1]!.isActive && c.battles[1]!.attacker == enemy.hero,
    );
    expect(c.battles[1]!.attacker, same(enemy.hero));
  });

  test('主动改道后重新到达必须重新排队', () {
    final c = _campaign();
    final active = _attack(c);
    final first = _dispatch(c, 1);
    final later = _dispatch(c, 2);
    _arrive(c, first);
    _arrive(c, later);
    expect(c.camp(first.hero.id), isTrue);
    expect(
      c.moveTo(first.hero.id, c.cityBounds(c.world.cities[1]).center),
      isTrue,
    );
    c.advance(1 / 60);
    _withdraw(c, active);
    c.advance(1 / 60);
    _until(
      c,
      () => c.battles[1]!.isActive && c.battles[1]!.attacker == later.hero,
    );
    expect(c.battles[1]!.attacker, same(later.hero));
  });

  test('换守将间隙驻军全数离城会结算占领，不会一直等不存在的守将', () {
    final c = _campaign();
    final active = _attack(c);
    final battle = c.battles[1]!;
    _kill(battle.defender);
    _until(c, () => battle.nextWaveIn > 0);
    for (final hero in c.garrisonAt(1).toList()) {
      expect(
        c.dispatchTo(hero, const GamePoint(800, 100), countryId: 1),
        isNotNull,
      );
    }
    _until(c, () => !battle.isActive);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.garrisonAt(1), contains(active.hero));
    expect(c.soldiersAt(1), 0);
  });

  test('城堡降级时等待者不瞬移，到轮次后步行贴城且不会被插队', () {
    final world = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
    )[2];
    final c = _campaign(world: world);
    final active = _attack(c);
    final others = c.garrisonAt(0).toList();
    final city = c.world.cities[1];
    final first = c.dispatch(others[0], city)!;
    first.position = c.cityBounds(city).topCenter - const GamePoint(0, 8);
    first.moveTo(first.position, city: city);
    c.advance(1 / 60);
    final later = c.dispatch(others[1], city)!;
    _arrive(c, later);
    final oldPosition = first.position;
    _kill(c.battles[1]!.defender);
    _until(c, () => c.battles[1]!.nextWaveIn > 0);
    expect(c.cities[1]!.level, 4);
    expect(
      (first.position - oldPosition).distance,
      lessThanOrEqualTo(first.walkDistance + 1),
    );
    _withdraw(c, active);
    expect(c.cities[1]!.level, 3);
    c.advance(1 / 60);
    expect(
      (first.position - oldPosition).distance,
      lessThanOrEqualTo(first.walkDistance + 1),
    );
    expect(first.phase, MarchPhase.marching);
    expect(later.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
    _until(c, () => c.battles[1]!.isActive);
    _until(
      c,
      () => c.battles[1]!.isActive && c.battles[1]!.attacker == first.hero,
    );
    expect(c.battles[1]!.attacker, same(first.hero));
    expect(first.position, isNot(oldPosition));
    expect(later.phase, anyOf(MarchPhase.awaitingBattle, MarchPhase.marching));
  });
}
