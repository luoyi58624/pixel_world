import '../../support/ongoing_fixture.dart';

import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/fixed_siege_random.dart';

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

CampaignState _campaign(_Rolls rolls) => ongoingCampaign(
  CampaignState.fromRom(
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
    retreatRandom: const FixedSiegeRandom(.9),
  ),
  stock: 0,
  year: 1,
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
  test('三级城临时加成为6、4、2，真实攻击同步递减，第三胜占领', () {
    final rolls = _Rolls([0]);
    final c = _campaign(rolls);
    final battle = _start(c);
    final remaining = c.garrisonAt(1).map((hero) => hero.id).toSet();
    for (var wave = 1; wave <= 3; wave++) {
      expect(battle.wave, wave);
      final bonus = [6, 4, 2][wave - 1];
      expect(battle.simulation.defenderAttackBonus, bonus);
      expect(
        battle.simulation.basePower(BattleSide.defender),
        battle.defender.combat + bonus + battle.defender.soldiers * 2,
      );
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
    ([0.1, 0.9], 1),
    ([0.499, 0.01], 1),
    ([0.8, 0.99], 1),
  ]) {
    test('两胜后进攻失败必降两级，随机值 $values 不影响结算', () {
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
      expect(rolls.calls, 0);
      expect(c.cities[0]!.level, 1);
      c.advance(120);
      expect(rolls.calls, 0);
      expect(c.cities[1]!.level, expected);
    });
  }

  test('一胜后主动撤离必降一级，重新指令不重复结算', () {
    final rolls = _Rolls([0.49]);
    final c = _campaign(rolls);
    final battle = _start(c);
    _win(c, battle);
    _until(c, () => battle.wave == 2);
    expect(c.retreatHero(battle.attacker.id), isTrue);
    _until(c, () => !battle.isActive);
    expect(battle.isActive, isFalse);
    expect(c.cities[1]!.level, 2);
    expect(rolls.calls, 0);
    expect(c.retreatHero(battle.attacker.id), isNull);
    c.advance(2);
    expect(rolls.calls, 0);
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
    c.settledMonths = 24;
    c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1);
    expect(c.cities[1]!.level, 4);
    expect(battle.simulation.defenderAttackBonus, 4);
    expect(battle.initialCityLevel, 3);
    expect(c.retreatHero(battle.attacker.id), isTrue);
    _until(c, () => !battle.isActive);
    expect(c.cities[1]!.level, 3);
    expect(rolls.calls, 0);
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
    expect(rolls.calls, 0);
  });

  test('先胜一轮再互刺只结算先前胜轮，不把互刺当成占城胜利', () {
    final rolls = _Rolls([.99]);
    final c = _campaign(rolls);
    addTearDown(c.dispose);
    final battle = _start(c);
    _win(c, battle);
    _until(c, () => battle.wave == 2);
    final attacker = battle.attacker, defender = battle.defender;
    attacker.hp = 0;
    defender.hp = 0;
    _until(c, () => !battle.isActive);
    expect(battle.simulation.result, BattleResult.draw);
    expect(battle.victories, 1);
    expect(battle.defenseLoss, 1);
    expect(c.cities[1]!.level, 2);
    expect(c.cities[1]!.ownerCountryId, 1);
    expect(c.heroes, isNot(contains(attacker)));
    expect(c.heroes, isNot(contains(defender)));
    c.advance(3);
    expect(c.cities[1]!.level, 2);
    expect(rolls.calls, 0);
  });

  test('一级城最后守将与攻将互刺，不降级也不占领', () {
    final c = _campaign(_Rolls([0]));
    addTearDown(c.dispose);
    c.cities[1] = CitySituation(
      ownerCountryId: 1,
      defense: 100,
      baseIncome: 10,
      initialLevel: 1,
    );
    final guards = c.garrisonAt(1);
    for (final hero in guards.skip(1)) {
      c.dismissHero(hero, countryId: 1);
    }
    final battle = _start(c);
    battle.attacker.hp = 0;
    battle.defender.hp = 0;
    _until(c, () => !battle.isActive);
    expect(c.garrisonAt(1), isEmpty);
    expect(battle.victories, 0);
    expect(battle.defenseLoss, 0);
    expect(c.cities[1]!.level, 1);
    expect(c.cities[1]!.ownerCountryId, 1);
  });
}
