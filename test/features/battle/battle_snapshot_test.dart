import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';

Map<String, dynamic> snapshot(BattleSimulation sim) {
  final health = <BattleHealth>[];
  int id(BattleHealth value) {
    var index = health.indexOf(value);
    if (index < 0) {
      index = health.length;
      health.add(value);
    }
    return index;
  }

  final state = sim.saveState(id);
  return jsonDecode(
    jsonEncode({
      'sim': state,
      'health': [
        for (final h in health) [h.maxHp, h.hp],
      ],
    }),
  );
}

void main() {
  final weapons = WeaponCatalog.decode(
    File('assets/data/rom_weapons.json').readAsStringSync(),
  );
  BattleArmy army(String id) => BattleArmy(
    id: id,
    name: id,
    general: BattleHealth(100),
    attack: 20,
    morale: 50,
    soldiers: List.generate(4, (_) => BattleHealth(20)),
  );
  for (final mode in ['weapon', 'retreat', 'ending']) {
    test('保存 $mode 动画中途，恢复后每一帧的内核与血量一致', () {
      final sim = BattleSimulation(
        attacker: army('a'),
        defender: army('d'),
        seed: 22,
      );
      while (sim.stage != BattleStage.fighting) {
        sim.advance(1 / 60);
      }
      if (mode == 'weapon') {
        expect(sim.useWeapon(BattleSide.attacker, weapons.weapons[0]!), isTrue);
      }
      if (mode == 'retreat') {
        expect(sim.beginRetreat(BattleSide.attacker, succeeded: false), isTrue);
      }
      if (mode == 'ending') {
        while (!sim.finished &&
            sim.stage != BattleStage.victory &&
            sim.stage != BattleStage.ending) {
          sim.advance(1 / 60);
        }
      }
      for (var i = 0; i < 8; i++) {
        sim.advance(1 / 60);
      }
      final saved = snapshot(sim);
      final restored = BattleSnapshots.restore(
        Map<String, dynamic>.from(saved['sim']),
        [for (final h in saved['health']) BattleHealth(h[0], hp: h[1])],
        weapons,
      );
      expect(snapshot(restored), saved);
      for (var i = 0; i < 240; i++) {
        sim.advance(1 / 60);
        restored.advance(1 / 60);
      }
      expect(snapshot(restored), snapshot(sim));
    });
  }
}
