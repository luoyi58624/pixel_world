import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

NesBattleKernel _kernel(double scale, {int bonus = 10, int seed = 1009}) =>
    NesBattleKernel(
      attack: [15, 15 + bonus],
      moraleAttack: [15, 15],
      initialMorale: [0, 0],
      hp: [95, 95],
      slots: [
        [0, 1, 2, 3],
        [0, 1, 2, 3],
      ],
      seed: seed,
      recoilDifferenceScale: 0.25,
      wallDamageScale: 0.5,
      defenderCityAttackBonus: bonus,
      cityDefenseRecoilScale: scale,
      randomChargeEnabled: true,
      moraleEnabled: false,
      moralePowerScale: 6,
      moraleDrainPerSecond: 12,
      moraleDrainRandomRange: 4,
    );

void main() {
  test('关闭城防击退贡献后，首次碰撞伤害、基础攻击和士气不变', () {
    final before = _kernel(1);
    final after = _kernel(0);
    for (final k in [before, after]) {
      while (k.clashes == 0 && k.frames < 1000) {
        k.step();
      }
      expect(k.clashes, 1);
    }
    expect(after.ram.sublist(0x12, 0x14), before.ram.sublist(0x12, 0x14));
    expect(after.ram.sublist(0x1c, 0x1e), before.ram.sublist(0x1c, 0x1e));
    expect(after.ram.sublist(0xae, 0xb0), before.ram.sublist(0xae, 0xb0));
    expect(after.velocity(0).abs(), lessThan(before.velocity(0).abs()));
  });

  test('没有城防时新比例不影响任何战斗帧', () {
    final before = _kernel(1, bonus: 0);
    final after = _kernel(0, bonus: 0);
    for (var i = 0; i < 1200; i++) {
      before.step(autoCharge: true);
      after.step(autoCharge: true);
      expect(after.snapshot(), before.snapshot());
    }
  });

  test('去掉城防攻击后击退速度与无城防相同，完整伤害仍生效', () {
    for (final bonus in [2, 4, 6, 10, 15]) {
      final field = _kernel(0, bonus: 0);
      final city = _kernel(0, bonus: bonus);
      for (final k in [field, city]) {
        while (k.clashes == 0 && k.frames < 1000) {
          k.step(autoCharge: true);
        }
        expect(k.clashes, 1);
      }
      expect(city.frames, field.frames);
      expect(city.velocity(0), field.velocity(0));
      expect(city.velocity(1), field.velocity(1));
      expect(city.ram[0x16], 19 + bonus);
      expect(city.ram[0x12], lessThanOrEqualTo(field.ram[0x12]));
      // +2攻击仍落在同一整数伤害档，更高的固定样本必须保留伤害提升。
      if (bonus >= 4) expect(city.ram[0x12], lessThan(field.ram[0x12]));
    }
  });
}
