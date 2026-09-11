import 'package:flutter_test/flutter_test.dart';

import 'dart:math' as math;

import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

void main() {
  test('四类同属性将领中城防保留优势，五级城仍有进攻获胜样本', () {
    final random = math.Random(20260912);
    final seeds = List.generate(128, (_) => random.nextInt(1 << 24));
    final guardWins = <int>[];
    for (final level in [1, 5]) {
      var attacks = 0, defenses = 0;
      for (final h in [
        [10, 50, 60],
        [12, 65, 75],
        [15, 95, 50],
        [18, 95, 100],
      ]) {
        var typeWins = 0;
        for (final seed in seeds) {
          final bonus = GameConfig.cityDefenseAttackBonusFor(level);
          final k = NesBattleKernel(
            attack: [h[0], h[0] + bonus],
            hp: [h[1], h[1]],
            initialMorale: [h[2], h[2]],
            slots: [
              [0, 1, 2, 3],
              [0, 1, 2, 3],
            ],
            seed: seed,
            recoilDifferenceScale: GameConfig.battleRecoilDifferenceScale,
            wallDamageScale: GameConfig.battleWallDamageScale,
            defenderCityAttackBonus: bonus,
            cityDefenseRecoilScale: GameConfig.cityDefenseRecoilScale,
            randomChargeEnabled: true,
            moralePowerScale: GameConfig.battleMoralePowerScale,
            chargeIntervalFrames: GameConfig.battleChargeIntervalFrames,
          );
          while (k.generalsAlive && k.frames < 18000) {
            k.step(autoCharge: true);
          }
          expect(k.generalsAlive, isFalse);
          if (k.ram[0x7451] > 0) {
            attacks++;
            typeWins++;
          }
          if (k.ram[0x7452] > 0) defenses++;
        }
        expect(typeWins, greaterThan(6), reason: '每类将领都必须保留攻城机会');
      }
      expect(defenses, greaterThan(attacks));
      expect(defenses, lessThan(512 * .9));
      guardWins.add(defenses);
    }
    expect(guardWins.last, greaterThan(guardWins.first));
  });

  test('撞墙只降低追加伤害，仍推进原反弹动作', () {
    double firstWall(double scale) {
      final k = NesBattleKernel(
        attack: [10, 25],
        hp: [255, 255],
        slots: [
          [0, 1, 2, 3],
          [0, 1, 2, 3],
        ],
        seed: 919,
        wallDamageScale: scale,
      );
      for (var frame = 0; frame < 6000; frame++) {
        final before = k.ram[0x12] + k.ram[0x7451];
        k.step(autoCharge: true);
        if (k.wallHits[0] > 0) {
          return (before - k.ram[0x12] - k.ram[0x7451]).toDouble();
        }
      }
      fail('强弱对阵应发生撞墙');
    }

    expect(firstWall(.5), lessThan(firstWall(1)));
  });
}
