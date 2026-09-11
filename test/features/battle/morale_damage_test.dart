import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

void main() {
  // 显式固定输入与边界期望，调节游戏配置不会改变此处的伤害公式验收。
  for (final (charge, bonus, damage) in [
    (0, 0, 8),
    (1, 6, 10),
    (3, 6, 10),
    (4, 12, 12),
    (7, 12, 12),
    (8, 18, 14),
    (11, 18, 14),
    (12, 24, 17),
    (20, 24, 17),
  ]) {
    test('本轮积累$charge点士气：攻击加成$bonus，19点基础强度造成$damage点伤害', () {
      final k = NesBattleKernel(
        attack: [15, 15],
        hp: [95, 95],
        initialMorale: [50, 50],
        slots: [
          [0, 1, 2, 3],
          [0, 1, 2, 3],
        ],
        seed: 919,
        randomChargeEnabled: true,
        moraleEnabled: true,
        moralePowerScale: 6,
        moraleDrainPerSecond: 0,
        moraleDrainRandomRange: 0,
        recoilDifferenceScale: 0.25,
        wallDamageScale: 0.5,
      );
      // 固定本轮已有积累，让真实碰撞执行伤害换算，隔离随机消耗速度。
      k.ram[0x0f] = charge;
      k.ram[0x19] = charge;
      while (k.clashes == 0 && k.frames < 1000) {
        k.step(autoCharge: true);
      }
      expect(k.clashes, 1);
      expect(k.wallHits, [0, 0]);
      expect(k.committed, [charge, charge]);
      expect(k.ram[0x15], 19 + bonus);
      expect(k.ram[0x16], 19 + bonus);
      for (var side = 0; side < 2; side++) {
        expect(175 - k.ram[0x12 + side] - k.ram[0x7451 + side], damage);
      }
      expect(k.ram[0x0f], 0);
      expect(k.ram[0x19], 0);
    });
  }
}
