import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

void main() {
  // 固定零士气影响的对照条件；运行时胜率用离线审计工具测量，避免调参破坏回归测试。
  final random = math.Random(20260923);
  final seeds = List.generate(64, (_) => random.nextInt(1 << 24));
  for (final mode in [-3, -2, -1, 1, 2, 3, 4, 5]) {
    test('固定样本$mode关闭士气：同属性野战同归于尽、城防获得优势', () {
      final attack = mode < 0 ? [14, 11, 8][-mode - 1] : 15;
      final bonus = mode > 0 ? [1, 3, 5, 8, 12][mode - 1] : 0;
      final morale = mode > 0 ? [5, 15, 25, 35, 45][mode - 1] : 0;
      var wins = 0, draws = 0;
      for (final seed in seeds) {
        final k = NesBattleKernel(
          attack: [attack, attack + bonus],
          hp: [95, 95],
          initialMorale: [50, (50 + morale).clamp(0, 100)],
          slots: [
            [0, 1, 2, 3],
            [0, 1, 2, 3],
          ],
          seed: seed,
          recoilDifferenceScale: 0.25,
          wallDamageScale: 0.5,
          defenderCityAttackBonus: bonus,
          cityDefenseRecoilScale: 0.25,
          randomChargeEnabled: true,
          moraleEnabled: false,
          moraleDrainPerSecond: 12,
          moraleDrainRandomRange: 4,
          moralePowerScale: 6,
        );
        while (k.generalsAlive && k.frames < 18000) {
          k.step(autoCharge: true);
        }
        expect(k.generalsAlive, isFalse, reason: '不能靠超时制造低胜率');
        if (k.ram[0x7451] > 0) wins++;
        if (k.ram[0x7451] == 0 && k.ram[0x7452] == 0) draws++;
      }
      expect(wins, 0, reason: '零运气基线中，同属性进攻不应击败额外获得城防的对手');
      if (mode < 0) expect(draws, seeds.length, reason: '同属性野战必须自然同归于尽');
    });
  }
}
