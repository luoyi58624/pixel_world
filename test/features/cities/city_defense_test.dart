import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/ai/rules_data.dart';

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
  test('城防按配置增加攻击，AI与实际战斗一致且不改基础属性', () {
    final c = _campaign();
    addTearDown(c.dispose);
    final rules = AiRules.fromJson(c.aiRulesForTesting().toJson());
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
      expect(sim.basePower(BattleSide.attacker), 13);
      final bonus = [2, 4, 6, 10, 15][level - 1];
      expect(sim.basePower(BattleSide.defender), 13 + bonus);
      expect(rules.integer('soldierPower'), 1);
      expect(rules.attack(10, defenseLevel: level, field: false), 10 + bonus);
      expect(sim.attackerMorale.maximum, 100);
      expect(sim.defenderMorale.maximum, 100);
      expect(sim.defenderMorale.remaining, 50 + [5, 10, 15, 20, 25][level - 1]);
      expect(
        rules.morale(50, defenseLevel: level),
        GameConfig.battleUseMorale ? sim.defenderMorale.remaining : 0,
      );
      expect(defender.attack, 10);
      expect(defender.general.hp, 20);
      expect(defender.soldiers[1].hp, 20);
    }
  });

  test('红条由独立士气决定，上限100，受伤不影响初始值', () {
    for (final hp in [95, 99, 1000]) {
      final sim = BattleSimulation(
        attacker: _army('a', hp: hp),
        defender: _army('d', hp: hp),
        seed: 2,
        defenderCityLevel: 5,
      );
      expect(sim.attackerMorale.maximum, 100);
      expect(sim.defenderMorale.maximum, 100);
      expect(sim.defenderMorale.remaining, 75);
      expect(sim.defender.general.hp, 20);
    }
  });

  test('城防攻击只加一次，隔离士气后实际拼杀按伤害扣兵', () {
    final sim = BattleSimulation(
      attacker: _army('a', hp: 95, attack: 15),
      defender: _army('d', hp: 95, attack: 15),
      seed: 3,
      defenderCityLevel: 5,
      autoCharge: false,
      useMorale: false,
    );
    for (var i = 0; i < 1000 && sim.clashes == 0; i++) {
      sim.advance(1 / 60);
    }
    expect(sim.basePower(BattleSide.attacker), 19);
    expect(sim.basePower(BattleSide.defender), 34);
    expect(sim.lastClash!.attackerDamage, greaterThan(0));
    expect(sim.lastClash!.defenderDamage, greaterThan(0));
    expect(
      sim.attacker.soldiers.fold<double>(0, (sum, s) => sum + s.hp),
      80 - sim.lastClash!.defenderDamage,
    );
  });

  test('换守将只降低本场临时等级并重填士气，真实城防暂不变化', () {
    final c = _campaign();
    c.settledMonths = 1;
    c.countryTroops[1] = CountryTroops();
    final attacker = c.garrisonAt(0).first;
    final firstDefender = c.garrisonAt(1).last..hp = 1;
    for (final soldier in firstDefender.squad) {
      soldier.hp = 0;
    }
    final march = c.dispatch(attacker, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    final battle = c.battles[1]!;
    expect(battle.simulation.defenderCityLevel, 2);
    expect(battle.simulation.defenderAttackBonus, 4);
    expect(battle.simulation.defenderMoraleBonus, 10);
    for (var i = 0; i < 1000 && battle.nextWaveIn == 0; i++) {
      c.advance(0.02);
    }
    expect(c.cities[1]!.level, 2);
    c.advance(1.25);
    expect(battle.wave, 2);
    expect(battle.simulation.defenderCityLevel, 1);
    expect(battle.simulation.defenderAttackBonus, 2);
    expect(battle.simulation.defenderMoraleBonus, 5);
    expect(
      battle.simulation.defenderMorale.remaining,
      (battle.defender.morale + 5).clamp(0, 100),
    );
    expect(battle.simulation.defender.attack, battle.defender.combat);
  });

  test('我方被NPC进攻也获得当前城防加成，中途升级不重开战斗或补充士气', () {
    final c = _campaign();
    c.settledMonths = 1;
    c.countryTroops[1] = CountryTroops();
    c.settledMonths = 24;
    final governor = c.garrisonAt(0).first;
    c.settledMonths++;
    c.upgradeCity(0, hero: governor);
    c.settledMonths++;
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
      sim.basePower(BattleSide.defender),
      battle.defender.combat + battle.defender.soldiers + 6,
    );
    expect(
      sim.basePower(BattleSide.attacker),
      battle.attacker.combat + battle.attacker.soldiers,
    );
    final idle = c.garrisonAt(0).firstWhere((hero) => hero != governor);
    c.settledMonths++;
    expect(c.upgradeCity(0, hero: idle), isTrue);
    expect(c.cities[0]!.level, 4);
    expect(battle.simulation, same(sim));
    expect(sim.defenderCityLevel, 3);
    expect(sim.defenderMorale.remaining, remaining);
  });

  test('易主重置后的城池使用实际一级，不沿用原始地图的二级加成', () {
    final c = _campaign();
    c.settledMonths = 1;
    c.countryTroops[1] = CountryTroops();
    c.cities[1]!.ownerCountryId = 2;
    c.cities[1]!.ownerCountryId = 1;
    final march = c.dispatch(c.garrisonAt(0).first, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(0.02);
    expect(c.world.cities[1].initialLevel, 2);
    final sim = c.battles[1]!.simulation;
    expect(sim.defenderCityLevel, 1);
    expect(sim.defenderAttackBonus, 2);
    expect(sim.defenderMoraleBonus, 5);
  });
}
