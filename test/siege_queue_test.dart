import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

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

CampaignState _campaign({WorldDefinition? world}) => CampaignState.fromRom(
  world ?? _world(),
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  aiEnabled: false,
  startingGold: 1000,
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
  expect(c.camp(march.hero.id), isTrue);
  // 撤退者远离测试城下，避免参与接下来的野战。
  march.position = const Offset(100, 100);
  march.camp();
}

void main() {
  test('驻军展示与接战共用原ROM名单，高级在前，不受加入列表的先后影响', () {
    final c = _campaign();
    final first = _hero(c, 6);
    c.heroes.remove(first);
    c.heroes.insert(0, first);
    _hero(c, 10).cityId = 1;
    final roster = c.garrisonAt(1).toList();
    expect(roster.map((hero) => hero.sourceId), [3, 4, 6, 10]);
    expect(roster.last.type, HeroType.normal);
    expect(roster.first.type, HeroType.advanced);
    c.upgradeCity(1, hero: first, countryId: 1);
    final active = _attack(c);
    final battle = c.battles[1]!;
    for (var i = 0; i < roster.length; i++) {
      expect(battle.defender, same(roster[i]));
      if (i == roster.length - 1) break;
      _kill(battle.defender);
      _until(c, () => battle.wave == i + 2);
    }
    expect(active.phase, MarchPhase.fighting);
    expect(c.defeated, isFalse);
  });

  test('我方城市也由当前驻军名单的第一位接战', () {
    final c = _campaign();
    final expected = c.garrisonAt(0).first;
    _attack(c, id: 7, city: 0);
    expect(c.battles[0]!.defender, same(expected));
  });

  test('新增驻军不会顶替当前守将，下一场继续沿用剩余名单顺序', () {
    final c = _campaign();
    final third = _hero(c, 6);
    c.heroes.remove(third);
    c.heroes.insert(0, third);
    _attack(c);
    final battle = c.battles[1]!;
    expect(battle.defender, same(_hero(c, 3)));
    final lower = _hero(c, 10)..cityId = 1;
    expect(lower.type, HeroType.normal);
    final waiter = _dispatch(c, 1);
    _arrive(c, waiter);
    c.advance(0.5);
    expect(c.battles[1], same(battle));
    expect(battle.defender, same(_hero(c, 3)));
    _kill(battle.defender);
    _until(c, () => battle.wave == 2);
    expect(battle.defender, same(_hero(c, 4)));
    expect(waiter.phase, MarchPhase.awaitingBattle);
  });

  test('跳过出征或阵亡将领，别城驻军不会被选为守将', () {
    final c = _campaign();
    _hero(c, 10).cityId = 1;
    _hero(c, 9).cityId = 1;
    _kill(_hero(c, 10));
    c.dispatchTo(_hero(c, 3), const Offset(900, 100), countryId: 1);
    _kill(_hero(c, 4));
    _attack(c);
    expect(c.battles[1]!.defender.sourceId, 6);
  });

  test('同城按抵达顺序逐支接战，同国等待者保持原位', () {
    final c = _campaign();
    final active = _attack(c);
    final laterArrival = _dispatch(c, 1);
    final earlierArrival = _dispatch(c, 2);
    _arrive(c, earlierArrival);
    _arrive(c, laterArrival);
    final positions = [earlierArrival.position, laterArrival.position];
    c.advance(0.5);
    expect([earlierArrival.position, laterArrival.position], positions);
    expect(c.fieldBattles, isEmpty);
    _withdraw(c, active);
    c.advance(1 / 60);
    expect(c.battles[1]!.attacker, same(earlierArrival.hero));
    expect(laterArrival.phase, MarchPhase.awaitingBattle);
    _withdraw(c, earlierArrival);
    c.advance(1 / 60);
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
    expect(battle.defender.sourceId, 3);
    final waiter = _dispatch(c, 1);
    _arrive(c, waiter);
    final position = waiter.position;
    _kill(battle.defender);
    _until(c, () => battle.nextWaveIn > 0);
    expect(waiter.phase, MarchPhase.awaitingBattle);
    expect(c.cities[1]!.ownerCountryId, 1);
    c.advance(0.5);
    expect(c.battles[1], same(battle));
    expect(waiter.position, position);
    _until(c, () => battle.wave == 2);
    expect(battle.defender.sourceId, 4);
    expect(waiter.phase, MarchPhase.awaitingBattle);
  });

  test('排队者遭遇敌军进行野战，城内攻守双方不会卷入且战斗继续', () {
    final c = _campaign();
    final active = _attack(c);
    final siege = c.battles[1]!;
    final waiter = _dispatch(c, 1);
    _arrive(c, waiter);
    final raider = c.dispatchTo(_hero(c, 7), waiter.position, countryId: 2)!;
    raider.position = waiter.position - const Offset(17, 0);
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
    expect(later.phase, MarchPhase.awaitingBattle);
    _kill(enemy.hero);
    _until(c, () => !field.isActive);
    expect(c.marches.containsKey(enemy.hero.id), isFalse);
    expect(first.target, same(c.world.cities[1]));
    expect(first.phase, MarchPhase.awaitingBattle);
    expect(c.cities[2]!.level, 3);
    _withdraw(c, active);
    c.advance(1 / 60);
    expect(c.battles[1]!.attacker, same(first.hero));
    expect(later.phase, MarchPhase.awaitingBattle);
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
    expect(c.battles[1]!.attacker, same(later.hero));
    expect(first.phase, MarchPhase.dueling);
    _kill(first.hero);
    _until(c, () => !field.isActive);
    expect(c.marches.containsKey(first.hero.id), isFalse);
    expect(enemy.phase, MarchPhase.awaitingBattle);
    expect(c.cities[0]!.level, 3);
    _withdraw(c, later);
    c.advance(1 / 60);
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
        c.dispatchTo(hero, const Offset(800, 100), countryId: 1),
        isNotNull,
      );
    }
    _until(c, () => !battle.isActive);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.garrisonAt(1), contains(active.hero));
    expect(c.cities[1]!.reserveSoldiers, 10);
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
    first.position = c.cityBounds(city).topCenter - const Offset(0, 8);
    first.moveTo(first.position, city: city);
    c.advance(1 / 60);
    final later = c.dispatch(others[1], city)!;
    _arrive(c, later);
    final oldPosition = first.position;
    _kill(c.battles[1]!.defender);
    _until(c, () => c.battles[1]!.nextWaveIn > 0);
    expect(c.cities[1]!.level, 3);
    expect(first.position, oldPosition);
    _withdraw(c, active);
    c.advance(1 / 60);
    expect(first.position, oldPosition);
    expect(first.phase, MarchPhase.marching);
    expect(later.phase, MarchPhase.awaitingBattle);
    _until(c, () => c.battles[1]!.isActive);
    expect(c.battles[1]!.attacker, same(first.hero));
    expect(first.position, isNot(oldPosition));
    expect(later.phase, MarchPhase.awaitingBattle);
  });
}
