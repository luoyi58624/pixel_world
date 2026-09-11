import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

// 算法验收全部使用固定输入，不读取游戏配置。
NesBattleKernel _duel(int attack) => NesBattleKernel(
  attack: [attack, attack],
  hp: [255, 255],
  initialMorale: [100, 100],
  slots: [[], []],
  seed: 919,
  randomChargeEnabled: true,
  moraleEnabled: false,
  moralePowerScale: 6,
  moraleDrainPerSecond: 12,
  moraleDrainRandomRange: 0,
  recoilDifferenceScale: 0.25,
  cityDefenseRecoilScale: 0,
  wallDamageScale: 0.5,
);

void _clashes(NesBattleKernel k, int count) {
  while (k.clashes < count && k.generalsAlive && k.frames < 18000) {
    k.step(autoCharge: true);
  }
  expect(k.clashes, count);
  expect(k.wallHits, [0, 0]);
}

void main() {
  test('15、16、17攻击连续八次分别造成53、56、59伤害，小幅加攻不再丢失', () {
    for (final (attack, expected) in [(15, 53), (16, 56), (17, 59)]) {
      final k = _duel(attack);
      _clashes(k, 8);
      expect(255 - k.ram[0x7451], expected);
      expect(255 - k.ram[0x7452], expected);
      expect(k.saveState()['damageEighths'], [0, 0]);
    }
  });

  test('整个攻击范围每增加一点，八次拼杀的累计伤害严格增加三点', () {
    int? previous;
    for (var attack = 0; attack <= 63; attack++) {
      final k = _duel(attack);
      // 固定接触距离，避免低攻击的慢回冲产生撞墙伤害，单独校验普通拼杀精度。
      for (var clash = 1; clash <= 8; clash++) {
        k.advanceWithdrawal([136, 100]);
        _clashes(k, clash);
      }
      final damage = 255 - k.ram[0x7451];
      if (previous != null) expect(damage - previous, 3);
      expect(k.ram[0x7451], k.ram[0x7452]);
      previous = damage;
    }
  });

  test('伤害小数随存档恢复，旧存档从零余量开始', () {
    final k = _duel(15);
    _clashes(k, 1);
    final state = jsonDecode(jsonEncode(k.saveState())) as Map<String, dynamic>;
    expect(state['damageEighths'], [5, 5]);
    final restored = _duel(15)..restoreState(state);
    for (var frame = 0; frame < 500; frame++) {
      k.step(autoCharge: true);
      restored.step(autoCharge: true);
      expect(restored.snapshot(), k.snapshot());
    }
    expect(restored.saveState(), k.saveState());
    state.remove('damageEighths');
    final legacy = _duel(15)..restoreState(state);
    expect(legacy.saveState()['damageEighths'], [0, 0]);
  });

  test('80点武器直伤保持精确，不消费或累加普通伤害的小数', () {
    final k = _duel(15);
    _clashes(k, 1);
    final before = k.ram[0x7452];
    final carry = k.saveState()['damageEighths'];
    k.applyWeaponDamage(1, 80);
    expect(before - k.ram[0x7452], 80);
    expect(k.saveState()['damageEighths'], carry);
  });

  test('零随机满士气一级城：额外两点攻击与首轮五点士气使守方获胜', () {
    for (var seed = 1; seed <= 64; seed++) {
      final k = NesBattleKernel(
        attack: [15, 17],
        hp: [95, 95],
        initialMorale: [100, 105],
        slots: [
          [0, 1, 2, 3],
          [0, 1, 2, 3],
        ],
        seed: seed * 1009,
        randomChargeEnabled: true,
        moraleEnabled: true,
        moralePowerScale: 6,
        moraleDrainPerSecond: 12,
        moraleDrainRandomRange: 0,
        recoilDifferenceScale: 0.25,
        defenderCityAttackBonus: 2,
        cityDefenseRecoilScale: 0,
        wallDamageScale: 0.5,
      );
      while (k.generalsAlive && k.frames < 18000) {
        k.step(autoCharge: true);
      }
      expect(k.generalsAlive, isFalse);
      expect(k.ram[0x7451], 0);
      expect(k.ram[0x7452], greaterThan(0));
    }
  });
}
