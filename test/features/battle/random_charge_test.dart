import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

NesBattleKernel _kernel(int seed, {int morale = 50, int city = 0}) =>
    NesBattleKernel(
      attack: [15, 15 + city],
      hp: [95, 95],
      initialMorale: [morale, morale],
      slots: [
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
      seed: seed,
      defenderCityAttackBonus: city,
      cityDefenseRecoilScale: 0.25,
      recoilDifferenceScale: 0.25,
      wallDamageScale: 0.5,
      randomChargeEnabled: true,
      moraleEnabled: true,
      moralePowerScale: 6,
      moraleDrainPerSecond: 12,
      moraleDrainRandomRange: 4,
    );

void main() {
  test('冲锋途中双方随机蓄力，充足士气支持更多积累且单次强度有上限', () {
    var low = 0, high = 0;
    final outcomes = <String>{};
    for (var seed = 1; seed <= 64; seed++) {
      for (final morale in [1, 100]) {
        final k = _kernel(seed * 1009, morale: morale);
        while (k.clashes == 0 && k.frames < 1000) {
          k.step(autoCharge: true);
        }
        expect(k.clashes, 1);
        final total = k.committed[0] + k.committed[1];
        if (morale == 1) {
          low += total;
        } else {
          high += total;
        }
        outcomes.add('${k.committed}');
        for (final side in [0, 1]) {
          final bar = BattleMorale(morale, powerScale: 6)
            ..accumulated = k.committed[side];
          expect(bar.bonus, inInclusiveRange(0, 24));
          expect(k.ram[0x15 + side] - (15 + 4), bar.bonus);
        }
      }
    }
    expect(high, greaterThan(low));
    expect(outcomes.length, greaterThan(8));
  });

  test('没有士气不能蓄力，城防不提高首轮冲锋速度', () {
    final field = _kernel(123, morale: 0);
    final castle = _kernel(123, morale: 0, city: 5);
    for (var i = 0; i < 30; i++) {
      field.step(autoCharge: true);
      castle.step(autoCharge: true);
      expect(castle.ram.sublist(0x80, 0x88), field.ram.sublist(0x80, 0x88));
      expect(castle.ram[0x0f], 0);
      expect(castle.ram[0x19], 0);
    }
  });

  test('蓄力中保存恢复后，随机结果、士气和战斗每帧一致', () {
    final k = _kernel(456);
    for (var i = 0; i < 55; i++) {
      k.step(autoCharge: true);
    }
    final restored = _kernel(1)
      ..restoreState(jsonDecode(jsonEncode(k.saveState())));
    for (var i = 0; i < 1200; i++) {
      k.step(autoCharge: true);
      restored.step(autoCharge: true);
      expect(restored.snapshot(), k.snapshot());
    }
  });

  test('旧城防存档恢复后使用当前城防攻击，已扣血和士气不会重置', () {
    final old = _kernel(456, city: 10)..applyArmyDamage(1, 25);
    final restored = _kernel(1, city: 5)
      ..restoreState(jsonDecode(jsonEncode(old.saveState())));
    expect(restored.ram[0x1b], 20);
    expect(restored.ram[0x1d], 23);
    expect(restored.ram[0x13], old.ram[0x13]);
    expect(restored.ram[0xaf], old.ram[0xaf]);
  });
}
