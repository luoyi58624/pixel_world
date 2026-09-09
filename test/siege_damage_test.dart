import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

class _Rolls implements math.Random {
  _Rolls(this.values);
  final List<double> values;
  int calls = 0;
  @override
  double nextDouble() => values[(calls++) % values.length];
  @override
  int nextInt(int max) => (nextDouble() * max).floor();
  @override
  bool nextBool() => nextDouble() < 0.5;
}

CampaignState _campaign(_Rolls rolls) => CampaignState.fromRom(
  WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 80,
      'height': 32,
      'tiles': List.filled(80 * 32, 0),
      'cities': [
        for (final (id, x, level, country, units) in [
          (0, 8, 1, 0, [40, 0, 1, 2]),
          (1, 40, 3, 1, [3, 4, 5, 6, 7]),
          (2, 70, 1, 0, [8]),
        ])
          {
            'id': id,
            'name': '测试城',
            'x': x,
            'y': 15,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialLevel': level,
            'initialOwnerId': country,
            'unitIds': units,
          },
      ],
    },
    [0, 1, 2, 3],
  ),
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  aiEnabled: false,
  startingGold: 10000,
  siegeRandom: rolls,
);

CityBattle _start(CampaignState c) {
  final hero = c.heroes.firstWhere((hero) => hero.sourceId == 0);
  final march = c.dispatch(hero, c.world.cities[1])!;
  march.position = march.destination;
  c.advance(1 / 60);
  return c.battles[1]!;
}

void _until(CampaignState c, bool Function() predicate) {
  for (var i = 0; i < 4000 && !predicate(); i++) {
    c.advance(1 / 60);
  }
  expect(predicate(), isTrue);
}

void _win(CampaignState c, CityBattle battle) {
  final wins = battle.victories;
  battle.defender.hp = 0;
  _until(c, () => battle.victories == wins + 1);
}

void main() {
  test('三级城临时加成为12、8、4，前三胜不提前改实际等级，第三胜直接占领', () {
    final rolls = _Rolls([0]);
    final c = _campaign(rolls);
    final battle = _start(c);
    final remaining = c.garrisonAt(1).map((hero) => hero.id).toSet();
    for (var wave = 1; wave <= 3; wave++) {
      expect(battle.wave, wave);
      expect(battle.simulation.defenderAttackBonus, 16 - wave * 4);
      expect(battle.simulation.cityAppearanceLevel, 3);
      expect(c.cities[1]!.level, 3);
      expect(rolls.calls, 0);
      remaining.remove(battle.defender.id);
      _win(c, battle);
      if (wave < 3) {
        expect(c.cities[1]!.level, 3);
        expect(rolls.calls, 0);
        _until(c, () => battle.wave == wave + 1);
      }
    }
    expect(battle.isActive, isFalse);
    expect(battle.victories, 3);
    expect(c.cities[1]!.ownerCountryId, 0);
    expect(c.cities[1]!.level, 1);
    expect(remaining.length, 2);
    expect(c.heroes.any((hero) => remaining.contains(hero.id)), isFalse);
    expect(rolls.calls, 0);
  });

  for (final (values, expected) in [
    ([0.1, 0.9], 2),
    ([0.499, 0.01], 1),
    ([0.5, 0.99], 3),
  ]) {
    test('两胜后进攻失败，每轮独立判定 $values，结束后城防为 $expected 级', () {
      final rolls = _Rolls(values);
      final c = _campaign(rolls);
      final battle = _start(c);
      _win(c, battle);
      _until(c, () => battle.wave == 2);
      _win(c, battle);
      _until(c, () => battle.wave == 3);
      expect(c.cities[1]!.level, 3);
      expect(rolls.calls, 0);
      battle.attacker.hp = 0;
      _until(c, () => battle.simulation.stage == BattleStage.ending);
      expect(c.cities[1]!.level, 3);
      expect(rolls.calls, 0);
      _until(c, () => !battle.isActive);
      expect(c.cities[1]!.ownerCountryId, 1);
      expect(c.cities[1]!.level, expected);
      expect(battle.defenseLoss, 3 - expected);
      expect(rolls.calls, 2);
      expect(c.cities[0]!.level, 1);
      c.advance(120);
      expect(rolls.calls, 2);
      expect(c.cities[1]!.level, expected);
    });
  }

  test('一胜后主动撤离也在整场结束时判定一次，重新指令不重复结算', () {
    final rolls = _Rolls([0.49]);
    final c = _campaign(rolls);
    final battle = _start(c);
    _win(c, battle);
    _until(c, () => battle.wave == 2);
    c.camp(battle.attacker.id);
    expect(battle.isActive, isFalse);
    expect(c.cities[1]!.level, 2);
    expect(rolls.calls, 1);
    c.camp(battle.attacker.id);
    c.advance(2);
    expect(rolls.calls, 1);
  });

  test('零胜或本轮双方阵亡不增加胜轮，不凭空降级', () {
    final rolls = _Rolls([0]);
    final c = _campaign(rolls);
    final battle = _start(c);
    battle.attacker.hp = 0;
    battle.defender.hp = 0;
    _until(c, () => !battle.isActive);
    expect(battle.simulation.result, BattleResult.draw);
    expect(battle.victories, 0);
    expect(rolls.calls, 0);
    expect(c.cities[1]!.level, 3);
    expect(c.cities[1]!.ownerCountryId, 1);
  });

  test('途中升级不改变本场临时加成，结束损伤从当前真实等级扣除', () {
    final rolls = _Rolls([0]);
    final c = _campaign(rolls);
    final battle = _start(c);
    _win(c, battle);
    _until(c, () => battle.wave == 2);
    c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1);
    expect(c.cities[1]!.level, 4);
    expect(battle.simulation.defenderAttackBonus, 8);
    expect(battle.initialCityLevel, 3);
    c.camp(battle.attacker.id);
    expect(c.cities[1]!.level, 3);
    expect(rolls.calls, 1);
  });

  test('出发城失守的部队打完后消失，并结算这一场已获得的胜轮', () {
    final rolls = _Rolls([0]);
    final c = _campaign(rolls);
    c.heroes.firstWhere((hero) => hero.sourceId == 40).cityId = 2;
    final battle = _start(c);
    c.defeatHero(
      c.garrisonAt(0).first.id,
      winnerCountryId: 2,
      defendedCityId: 0,
    );
    expect(c.defeated, isFalse);
    _win(c, battle);
    expect(battle.isActive, isFalse);
    expect(c.heroes, isNot(contains(battle.attacker)));
    expect(c.cities[1]!.level, 2);
    expect(rolls.calls, 1);
  });
}
