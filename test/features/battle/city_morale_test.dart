import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/battle/domain/field_terrain.dart';

BattleArmy _army(String id, int morale) => BattleArmy(
  id: id,
  name: id,
  general: BattleHealth(95),
  attack: 15,
  morale: morale,
  soldiers: List.generate(4, (_) => BattleHealth(20)),
);

BattleSimulation _battle(int level, {int morale = 50, bool field = false}) =>
    BattleSimulation(
      attacker: _army('a', morale),
      defender: _army('d', morale),
      seed: 456,
      defenderCityLevel: level,
      useMorale: true,
      fieldTerrain: field ? FieldTerrain.grass : null,
    );

void main() {
  test('守城开场士气按等级增加，进攻方与将领原属性不变', () {
    for (var level = 1; level <= 5; level++) {
      final sim = _battle(level);
      expect(sim.defenderMorale.remaining, [55, 60, 65, 70, 75][level - 1]);
      expect(sim.attackerMorale.remaining, 50);
      expect(sim.defender.morale, 50);
    }
  });

  test('红条最多显示100，守城超额初始化到第一轮，野战没有城防加成', () {
    final city = _battle(5, morale: 95);
    expect(city.defenderMorale.initial, 120);
    expect(city.defenderMorale.remaining, 100);
    expect(city.defenderMorale.accumulated, 20);
    final field = _battle(5, morale: 95, field: true);
    expect(field.defenderMoraleBonus, 0);
    expect(field.defenderMorale.remaining, 95);
    expect(field.attackerMorale.remaining, 95);
  });

  test('保存恢复不重复发放守城士气，后续随机蓄力与伤亡一致', () {
    final sim = _battle(5, morale: 95);
    final initialMorale = sim.defenderMorale.remaining;
    for (
      var i = 0;
      i < 1000 && sim.defenderMorale.remaining == initialMorale;
      i++
    ) {
      sim.advance(1 / 60);
    }
    expect(sim.defenderMorale.remaining, lessThan(initialMorale));
    expect(sim.clashes, 0);
    final health = [
      sim.attacker.general,
      ...sim.attacker.soldiers,
      sim.defender.general,
      ...sim.defender.soldiers,
    ];
    final saved = jsonDecode(
      jsonEncode(sim.saveState(health.indexOf)),
    ) as Map<String, dynamic>;
    final restoredHealth = [
      for (final h in health) BattleHealth(h.maxHp, hp: h.hp),
    ];
    final restored = BattleSnapshots.restore(saved, restoredHealth);
    expect(restored.defenderMorale.remaining, sim.defenderMorale.remaining);
    for (var i = 0; i < 240; i++) {
      sim.advance(1 / 60);
      restored.advance(1 / 60);
    }
    expect(
      jsonEncode(restored.saveState(restoredHealth.indexOf)),
      jsonEncode(sim.saveState(health.indexOf)),
    );
  });
}
