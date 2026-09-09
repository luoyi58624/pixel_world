import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

BattleArmy _army(String id, {int hp = 60, int attack = 10}) => BattleArmy(
  id: id,
  name: id,
  general: BattleHealth(hp, hp: 20),
  attack: attack,
  soldiers: List.generate(4, (_) => BattleHealth(20)),
);

CampaignState _campaign() => CampaignState.fromRom(
  decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()).first,
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  aiEnabled: false,
  startingGold: 1000,
);

void main() {
  test('一至五级只给守方整队加攻击和初始士气，不治疗伤势或修改将领属性', () {
    for (var level = 1; level <= 5; level++) {
      final attacker = _army('a')..soldiers.first.hp = 0;
      final defender = _army('d')..soldiers.first.hp = 0;
      defender.soldiers[1].hp = 7;
      final sim = BattleSimulation(
        attacker: attacker,
        defender: defender,
        seed: 1,
        defenderCityLevel: level,
      );
      expect(sim.baseDamage(BattleSide.attacker), 13);
      expect(sim.baseDamage(BattleSide.defender), 13 + (level - 1) * 2);
      expect(sim.attackerMorale.maximum, 63);
      expect(sim.defenderMorale.maximum, 63 + (level - 1) * 5);
      expect(sim.defenderMorale.remaining, sim.defenderMorale.maximum);
      expect(defender.attack, 10);
      expect(defender.general.hp, 20);
      expect(defender.soldiers[1].hp, 7);
    }
  });

  test('双方士气均封顶100，加成后超过上限也不按受伤后的血量计算', () {
    for (final hp in [95, 99, 1000]) {
      final sim = BattleSimulation(
        attacker: _army('a', hp: hp),
        defender: _army('d', hp: hp),
        seed: 2,
        defenderCityLevel: 5,
      );
      expect(sim.attackerMorale.maximum, (hp + 4).clamp(0, 100));
      expect(sim.defenderMorale.maximum, 100);
      expect(sim.defenderMorale.remaining, 100);
      expect(sim.defender.general.hp, 20);
    }
  });

  test('城防攻击只加一次并参与士气增伤，实际拼杀按加成后的伤害扣兵', () {
    final sim = BattleSimulation(
      attacker: _army('a', hp: 95, attack: 15),
      defender: _army('d', hp: 95, attack: 15),
      seed: 3,
      defenderCityLevel: 5,
    );
    sim.attackerMorale.remaining = 0;
    sim.defenderMorale.remaining = 0;
    sim.attackerMorale.accumulated = 15;
    sim.defenderMorale.accumulated = 20;
    for (var i = 0; i < 1000 && sim.clashes == 0; i++) {
      sim.advance(1 / 60);
    }
    expect(sim.clashes, 1);
    expect(sim.lastClash!.attackerDamage, 19);
    expect(sim.lastClash!.defenderDamage, closeTo((19 + 8) * 1.05, 1e-9));
    expect(
      sim.attacker.soldiers.fold<double>(0, (hp, soldier) => hp + soldier.hp),
      closeTo(80 - 27 * 1.05, 1e-9),
    );
  });

  test('守将战败降级，下一位上场时按新等级重算加成并重填士气', () {
    final c = _campaign();
    final attacker = c.garrisonAt(0).first;
    final firstDefender = c.garrisonAt(1).first..hp = 1;
    for (final soldier in firstDefender.squad) {
      soldier.hp = 0;
    }
    final march = c.dispatch(attacker, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    final battle = c.battles[1]!;
    expect(battle.simulation.defenderCityLevel, 2);
    expect(battle.simulation.defenderAttackBonus, 2);
    expect(battle.simulation.defenderMoraleBonus, 5);
    for (var i = 0; i < 1000 && battle.nextWaveIn == 0; i++) {
      c.advance(0.02);
    }
    expect(c.cities[1]!.level, 1);
    c.advance(1.25);
    expect(battle.wave, 2);
    expect(battle.simulation.defenderCityLevel, 1);
    expect(battle.simulation.defenderAttackBonus, 0);
    expect(battle.simulation.defenderMoraleBonus, 0);
    expect(
      battle.simulation.defenderMorale.remaining,
      (battle.defender.maxHp + battle.defender.soldiers).clamp(0, 100),
    );
    expect(battle.simulation.defender.attack, battle.defender.combat);
  });

  test('我方被NPC进攻也获得当前城防加成，中途升级不重开战斗或补充士气', () {
    final c = _campaign();
    final governor = c.garrisonAt(0).first;
    c.upgradeCity(0, hero: governor);
    c.upgradeCity(0, hero: governor);
    final march = c.dispatch(
      c.garrisonAt(1).first,
      c.world.cities[0],
      countryId: 1,
    )!;
    march.position = march.destination;
    c.advance(0.6);
    final battle = c.battles[0]!;
    final sim = battle.simulation;
    final remaining = sim.defenderMorale.remaining;
    expect(sim.defenderCityLevel, 3);
    expect(
      sim.baseDamage(BattleSide.defender),
      governor.combat + governor.soldiers + 4,
    );
    expect(
      sim.baseDamage(BattleSide.attacker),
      battle.attacker.combat + battle.attacker.soldiers,
    );
    final idle = c.garrisonAt(0).firstWhere((hero) => hero != governor);
    expect(c.upgradeCity(0, hero: idle), isTrue);
    expect(c.cities[0]!.level, 4);
    expect(battle.simulation, same(sim));
    expect(sim.defenderCityLevel, 3);
    expect(sim.defenderMorale.remaining, remaining);
  });

  test('易主重置后的城池使用实际一级，不沿用原始地图的二级加成', () {
    final c = _campaign();
    c.cities[1]!.ownerCountryId = 2;
    c.cities[1]!.ownerCountryId = 1;
    final march = c.dispatch(c.garrisonAt(0).first, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    expect(c.world.cities[1].initialLevel, 2);
    final sim = c.battles[1]!.simulation;
    expect(sim.defenderCityLevel, 1);
    expect(sim.defenderAttackBonus, 0);
    expect(sim.defenderMoraleBonus, 0);
  });
}
