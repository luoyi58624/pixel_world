import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/field_terrain.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

WorldDefinition _world([int terrain = 0]) => WorldDefinition.fromJson(
  {
    'id': 0,
    'width': 40,
    'height': 20,
    'tiles': List.filled(800, terrain),
    'cities': [
      {
        'id': 0,
        'name': '本城',
        'x': 1,
        'y': 1,
        'width': 1,
        'height': 1,
        'shape': [3],
        'initialOwnerId': 0,
        'initialLevel': 3,
        'unitIds': [40, 0, 2],
      },
      {
        'id': 1,
        'name': '敌城',
        'x': 36,
        'y': 16,
        'width': 1,
        'height': 1,
        'shape': [3],
        'initialOwnerId': 1,
        'initialLevel': 4,
        'unitIds': [3, 4],
      },
      {
        'id': 2,
        'name': '第三城',
        'x': 35,
        'y': 1,
        'width': 1,
        'height': 1,
        'shape': [3],
        'initialOwnerId': 2,
        'initialLevel': 2,
        'unitIds': [6],
      },
    ],
  },
  [0, 1, 2, 3],
);

CampaignState _campaign([int terrain = 0]) => CampaignState.fromRom(
  _world(terrain),
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  startingGold: 1000,
  aiEnabled: false,
);

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

(HeroMarch, HeroMarch) _approach(
  CampaignState c, {
  int first = 0,
  int second = 3,
}) {
  final a = _hero(c, first), b = _hero(c, second);
  final left = c.dispatchTo(a, const Offset(320, 160), countryId: a.countryId)!;
  final right = c.dispatchTo(b, const Offset(80, 160), countryId: b.countryId)!;
  left.position = const Offset(150, 160);
  right.position = const Offset(200, 160);
  return (left, right);
}

FieldBattle _meet(CampaignState c) {
  for (var i = 0; i < 1200 && c.fieldBattles.isEmpty; i++) {
    c.advance(1 / 60);
  }
  return c.fieldBattles.values.single;
}

void _finish(CampaignState c, FieldBattle battle) {
  for (var i = 0; i < 6000 && battle.isActive; i++) {
    c.advance(1 / 60);
  }
  expect(battle.isActive, isFalse);
}

void main() {
  test('敌对行军相遇后锁定双方，第三支队伍继续前进，原目的地保持', () {
    final c = _campaign();
    final (a, b) = _approach(c);
    final original = a.destination;
    final unrelated = c.dispatchTo(_hero(c, 2), const Offset(400, 40))!;
    unrelated.position = const Offset(100, 40);
    final battle = _meet(c);
    expect((a.position - b.position).distance, closeTo(16, 1e-6));
    expect(a.phase, MarchPhase.dueling);
    expect(b.phase, MarchPhase.dueling);
    expect(a.destination, original);
    expect(c.battles, isEmpty);
    expect(c.activeBattleForHero(a.hero.id), same(battle));
    expect(c.activeBattleForHero(b.hero.id), same(battle));
    final positions = [a.position, b.position];
    final otherPosition = unrelated.position;
    expect(c.moveTo(a.hero.id, const Offset(20, 100)), isFalse);
    expect(c.camp(a.hero.id), isFalse);
    c.advance(0.5);
    expect([a.position, b.position], positions);
    expect(unrelated.position, isNot(otherPosition));
    expect(c.fieldBattles.length, 1);
  });

  test('三种地形只降低双方将领攻击，小兵攻击、最大生命和士气规则不变', () {
    for (final entry in {
      0: FieldTerrain.grass,
      1: FieldTerrain.river,
      2: FieldTerrain.mountain,
    }.entries) {
      final c = _campaign(entry.key);
      final (a, b) = _approach(c);
      final battle = _meet(c);
      final sim = battle.simulation;
      expect(battle.terrain, entry.value);
      expect(
        sim.basePower(BattleSide.attacker),
        closeTo(
          a.hero.soldiers * 2 +
              (a.hero.combat * entry.value.heroAttackFactor).floor(),
          1e-9,
        ),
      );
      expect(
        sim.basePower(BattleSide.defender),
        closeTo(
          b.hero.soldiers * 2 +
              (b.hero.combat * entry.value.heroAttackFactor).floor(),
          1e-9,
        ),
      );
      expect(sim.defenderAttackBonus, 0);
      expect(sim.defenderMoraleBonus, 0);
      expect(
        sim.units
            .where((unit) => !unit.isGeneral)
            .every((unit) => unit.attack == 2),
        isTrue,
      );
      expect(
        sim.attackerMorale.maximum,
        (((a.hero.combat * entry.value.heroAttackFactor).floor() + 1) * 4 - 1)
            .clamp(0, 63),
      );
      expect(
        sim.defenderMorale.maximum,
        (((b.hero.combat * entry.value.heroAttackFactor).floor() + 1) * 4 - 1)
            .clamp(0, 63),
      );
    }
  });

  test('野战同属性双方伤害范围相同，五级城参数不提供守城特权', () {
    for (final terrain in FieldTerrain.values) {
      BattleArmy army(String id) => BattleArmy(
        id: id,
        name: id,
        general: BattleHealth(95),
        attack: 15,
        soldiers: List.generate(4, (_) => BattleHealth(20)),
      );
      final sim = BattleSimulation(
        attacker: army('a'),
        defender: army('b'),
        seed: 1,
        fieldTerrain: terrain,
        defenderCityLevel: 5,
      );
      for (var i = 0; i < 1000 && sim.clashes == 0; i++) {
        sim.advance(1 / 60);
      }
      final power = 8 + (15 * terrain.heroAttackFactor).floor();
      final q = (power + 2) ~/ 4;
      expect(sim.basePower(BattleSide.attacker), power);
      expect(sim.basePower(BattleSide.defender), power);
      expect(sim.lastClash!.attackerDamage, inInclusiveRange(q + 1, q * 2 + 1));
      expect(sim.lastClash!.defenderDamage, inInclusiveRange(q + 1, q * 2 + 1));
      expect(
        sim.defenderMorale.maximum,
        (((15 * terrain.heroAttackFactor).floor() + 1) * 4 - 1).clamp(0, 63),
      );
    }
  });

  test('同国部队相遇不交战，斜向相交的大步进也不会错过敌军', () {
    final allies = _campaign();
    _approach(allies, second: 2);
    allies.advance(8);
    expect(allies.fieldBattles, isEmpty);
    final c = _campaign();
    final (a, b) = _approach(c);
    a.position = const Offset(150, 100);
    a.moveTo(const Offset(250, 200));
    b.position = const Offset(250, 100);
    b.moveTo(const Offset(150, 200));
    c.advance(6);
    expect(c.fieldBattles.length, 1);
    expect(a.phase, MarchPhase.dueling);
    expect(b.phase, MarchPhase.dueling);
  });

  test('三国同时相遇每位将领只参加一场决战', () {
    final c = _campaign();
    final (a, b) = _approach(c);
    final third = c.dispatchTo(
      _hero(c, 6),
      const Offset(80, 160),
      countryId: 2,
    )!;
    a.position = const Offset(160, 160);
    b.position = const Offset(175, 160);
    third.position = const Offset(180, 160);
    c.advance(0.02);
    expect(c.fieldBattles.length, 1);
    final active = c.allBattles.where((battle) => battle.isActive);
    final ids = [
      for (final battle in active) ...[battle.attacker.id, battle.defender.id],
    ];
    expect(ids.length, ids.toSet().length);
  });

  test('败方被回收但不影响城池，胜方带着伤势继续原路线', () {
    final c = _campaign();
    final (a, b) = _approach(c);
    a.hero.hp = 20;
    a.hero.squad.first.hp = 7;
    b.hero.hp = 1;
    for (final soldier in b.hero.squad) {
      soldier.hp = 0;
    }
    final target = a.destination;
    final battle = _meet(c);
    _finish(c, battle);
    expect(c.heroes, contains(a.hero));
    expect(c.heroes, isNot(contains(b.hero)));
    expect(c.recruitPool.any((hero) => hero.id == b.hero.sourceId), isTrue);
    expect(c.cities[0]!.level, 3);
    expect(c.cities[1]!.level, 4);
    expect(c.cities[0]!.ownerCountryId, 0);
    expect(c.cities[1]!.ownerCountryId, 1);
    expect(a.hero.hp, 20);
    expect(
      a.hero.squad.fold<double>(0, (sum, soldier) => sum + soldier.hp),
      lessThan(80),
    );
    expect(a.phase, MarchPhase.marching);
    expect(a.destination, target);
    final previous = a.position;
    c.advance(0.2);
    expect(a.position, isNot(previous));
  });

  test('野外驻扎也能遭遇敌军，胜利后继续驻扎', () {
    final c = _campaign();
    final (a, b) = _approach(c);
    c.camp(a.hero.id);
    b.position = const Offset(165, 160);
    b.hero.hp = 1;
    for (final soldier in b.hero.squad) {
      soldier.hp = 0;
    }
    final battle = _meet(c);
    _finish(c, battle);
    expect(a.phase, MarchPhase.camped);
    final position = a.position;
    c.advance(5);
    expect(a.position, position);
  });

  test('同轮双方阵亡分别回收，两座城不降级', () {
    final c = _campaign();
    final (a, b) = _approach(c);
    for (final hero in [a.hero, b.hero]) {
      hero.hp = 1;
      for (final soldier in hero.squad) {
        soldier.hp = 0;
      }
    }
    final battle = _meet(c);
    _finish(c, battle);
    expect(c.heroes, isNot(contains(a.hero)));
    expect(c.heroes, isNot(contains(b.hero)));
    expect(c.cities[0]!.level, 3);
    expect(c.cities[1]!.level, 4);
    expect(c.defeated, isFalse);
    expect(battle.outcome, contains('双方将领阵亡'));
  });

  test('主角野战阵亡结束游戏，其他部队和月份停止，城池等级保持', () {
    final c = _campaign();
    final (a, b) = _approach(c, first: 40);
    a.hero.hp = 1;
    for (final soldier in a.hero.squad) {
      soldier.hp = 0;
    }
    final battle = _meet(c);
    _finish(c, battle);
    expect(c.defeatReason, CampaignDefeatReason.protagonistFallen);
    expect(c.cities[0]!.level, 3);
    final time = battle.simulation.elapsed,
        month = c.settledMonths,
        position = b.position;
    c.advance(120);
    expect(battle.simulation.elapsed, time);
    expect(c.settledMonths, month);
    expect(b.position, position);
  });

  test('野战中原目标城池升级不会把部队拖到城门', () {
    final c = _campaign();
    final (a, b) = _approach(c);
    a.moveTo(c.cityBounds(c.world.cities[1]).center, city: c.world.cities[1]);
    b.position = a.position + const Offset(15, 0);
    final battle = _meet(c);
    final position = a.position;
    expect(c.upgradeCity(1, hero: _hero(c, 4), countryId: 1), isTrue);
    expect(a.position, position);
    expect(a.phase, MarchPhase.dueling);
    expect(c.activeBattleForHero(a.hero.id), same(battle));
  });
}
