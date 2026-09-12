import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

NesBattleKernel _kernel({List<List<int>>? slots}) => NesBattleKernel(
  attack: [15, 25],
  moraleAttack: [15, 15],
  initialMorale: [100, 100],
  hp: [95, 95],
  slots:
      slots ??
      [
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
  seed: 1009,
);

void main() {
  test('每兵一点，逐人减员立即扣强度，城防和士气保持独立', () {
    final k = _kernel();
    expect(k.ram.sublist(0x1c, 0x1e), [19, 29]);
    for (final side in [0, 1]) {
      final base = side == 0 ? 15 : 25;
      for (var alive = 3; alive >= 0; alive--) {
        k.applyArmyDamage(side, 20);
        expect(k.ram[0x702f + side], alive);
        expect(k.ram[0x1c + side], base + alive);
        expect(k.ram[0x7451 + side], 95);
        expect(k.ram[0xae + side], 100);
      }
    }
  });

  test('清掉四兵后的强度与开局无兵一致，重复伤害不会多扣基础攻击', () {
    final killed = _kernel()..applyArmyDamage(1, 80);
    final empty = _kernel(
      slots: [
        [0, 1, 2, 3],
        [],
      ],
    );
    expect(killed.ram[0x1d], empty.ram[0x1d]);
    killed.applyArmyDamage(1, 10);
    expect(killed.ram[0x1d], 25);
    expect(killed.ram[0x7452], 85);
  });

  test('普通碰撞和撞墙减员后每帧强度与实际存活兵数一致', () {
    final k = _kernel();
    var sawLoss = false;
    for (var frame = 0; frame < 10000 && k.generalsAlive; frame++) {
      k.step(autoCharge: true);
      for (final side in [0, 1]) {
        final alive = [
          for (var slot = 0; slot < 4; slot++)
            if (k.ram[0x570 + side * 5 + slot] & 128 != 0) slot,
        ].length;
        sawLoss |= alive < 4;
        expect(k.ram[0x702f + side], alive);
        expect(k.ram[0x1c + side], (side == 0 ? 15 : 25) + alive);
      }
    }
    expect(sawLoss, isTrue);
    expect(k.clashes, greaterThan(0));
    expect(k.wallHits.reduce((a, b) => a + b), greaterThan(0));
  });

  test('旧战斗存档恢复时清除已阵亡兵员的残留加成，之后逐帧一致', () {
    final k = _kernel()..applyArmyDamage(1, 80);
    final saved = jsonDecode(jsonEncode(k.saveState())) as Map<String, dynamic>;
    saved['ram']['28'] = 23;
    saved['ram']['29'] = 33;
    final restored = _kernel()..restoreState(saved);
    expect(restored.ram.sublist(0x1c, 0x1e), [19, 25]);
    for (var i = 0; i < 600; i++) {
      k.step(autoCharge: true);
      restored.step(autoCharge: true);
      expect(restored.snapshot(), k.snapshot());
    }
  });
}
