import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:math' as math;
import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';

import '../../support/weapon_strategy_fixture.dart';

class _Roll implements math.Random {
  _Roll(this.value);
  final double value;
  int calls = 0;
  @override
  double nextDouble() {
    calls++;
    return value;
  }

  @override
  int nextInt(int max) => (nextDouble() * max).floor();
  @override
  bool nextBool() => nextDouble() < .5;
}

(CampaignState, CityBattle) _battle(_Roll random) {
  final c = weaponStrategyCampaign(
    targetLevel: 5,
    targetHeroes: [3],
    weaponRandom: random,
  );
  final hero = weaponHero(c, 40);
  for (var i = 0; i < 3; i++) {
    c.buyWeapon(0);
  }
  final march = c.dispatch(
    hero,
    c.world.cities[2],
    weaponSlots: {0: 0, 1: 0, 2: 0},
  )!;
  march.position = march.destination;
  c.advance(1 / 60);
  return (c, c.battles[2]!);
}

void _until(CampaignState c, bool Function() done) {
  for (var i = 0; i < 5000 && !done(); i++) {
    c.advance(1 / 60);
  }
  expect(done(), isTrue);
}

void main() {
  test('野外双方开场依次自动用武器，左军镜像演员保持自身生存槽位', () {
    final random = _Roll(.99);
    final c = weaponStrategyCampaign(weaponRandom: random);
    final a = weaponHero(c, 40), b = weaponHero(c, 0);
    expect(c.buyWeapon(0), isTrue);
    expect(c.buyWeapon(0, countryId: b.countryId), isTrue);
    final right = c.dispatchTo(
      a,
      const GamePoint(280, 300),
      weaponSlots: {0: 0},
    )!;
    final left = c.dispatchTo(
      b,
      const GamePoint(360, 300),
      countryId: b.countryId,
      weaponSlots: {0: 0},
    )!;
    right.position = const GamePoint(350, 300);
    left.position = const GamePoint(300, 300);
    _until(c, () => c.fieldBattles.isNotEmpty);
    final sim = c.fieldBattles.values.single.simulation;
    _until(c, () => sim.weaponStrike != null);
    expect(sim.weaponStrike!.attackingSide, isTrue);
    _until(c, () => sim.weaponStrike?.attackingSide == false);
    expect(a.weaponIds, isEmpty);
    expect(b.weaponIds, isEmpty);
    // 右军第一发箭清掉左军一兵，左军演出不能把这个阵亡槽重新画出来。
    final visible = sim.weaponStrike!.visibleActors;
    expect(
      [
        for (var i = 0; i < 4; i++)
          if (visible & (1 << i) != 0) i,
      ].length,
      3,
    );
    expect(sim.clashes, 0);
    expect(random.calls, 0);
  });

  test('连续对阵新守将时重新执行开场规则，每个对阵只消耗一件', () {
    final data = jsonDecode(
      File('assets/data/rom_weapons.json').readAsStringSync(),
    );
    data['weapons'][0]['damage'] = 255;
    final random = _Roll(.99);
    final c = weaponStrategyCampaign(
      targetLevel: 3,
      targetHeroes: [3, 4, 6],
      catalog: WeaponCatalog.decode(jsonEncode(data)),
      weaponRandom: random,
    );
    final hero = weaponHero(c, 40);
    for (var i = 0; i < 3; i++) {
      expect(c.buyWeapon(0), isTrue);
    }
    final march = c.dispatch(
      hero,
      c.world.cities[2],
      weaponSlots: {0: 0, 1: 0, 2: 0},
    )!;
    march.position = march.destination;
    c.advance(1 / 60);
    final battle = c.battles[2]!;
    for (var wave = 1; wave <= 3; wave++) {
      _until(
        c,
        () => battle.wave == wave && battle.simulation.weaponStrike != null,
      );
      expect(hero.weaponIds.length, 3 - wave);
      expect(battle.simulation.clashes, 0);
      _until(c, () => battle.simulation.weaponStrike == null);
    }
    _until(c, () => c.cities[2]!.ownerCountryId == 0);
    expect(random.calls, 0);
  });

  for (final value in [.499999, .5, .99]) {
    test('玩家开场自动消耗一件，碰撞分位 $value 仅判定一次，空余帧不重复掷骰', () {
      final random = _Roll(value);
      final (c, battle) = _battle(random);
      expect(battle.attacker.weaponIds.length, 3);
      _until(c, () => battle.simulation.weaponStrike != null);
      expect(battle.attacker.weaponIds.length, 2);
      expect(battle.simulation.clashes, 0);
      expect(random.calls, 0);
      c.advance(.5);
      expect(battle.attacker.weaponIds.length, 2);
      expect(random.calls, 0);
      _until(c, () => battle.simulation.weaponStrike == null);
      expect(battle.attacker.weaponIds.length, 2);
      _until(c, () => battle.simulation.clashes == 1);
      expect(random.calls, 1);
      expect(battle.attacker.weaponIds.length, value < .5 ? 1 : 2);
      c.advance(.1);
      expect(random.calls, 1);
      expect(battle.attacker.weaponIds.length, value < .5 ? 1 : 2);
    });
  }

  test('固定概率下只用完实际三件，帧长改变不改变武器、生命或判定次数', () {
    final ra = _Roll(.1), rb = _Roll(.1);
    final (a, ba) = _battle(ra);
    final (b, bb) = _battle(rb);
    a.advance(20);
    for (var i = 0; i < 1200; i++) {
      b.advance(1 / 60);
    }
    expect(ba.attacker.weaponIds, bb.attacker.weaponIds);
    expect(ba.attacker.weaponIds, isEmpty);
    expect(ra.calls, 2);
    expect(rb.calls, ra.calls);
    expect(ba.attacker.hp, bb.attacker.hp);
    expect(ba.defender.hp, bb.defender.hp);
    expect(ba.simulation.clashes, bb.simulation.clashes);
    expect(
      ba.simulation.weaponStrike?.frame,
      bb.simulation.weaponStrike?.frame,
    );
  });
}
