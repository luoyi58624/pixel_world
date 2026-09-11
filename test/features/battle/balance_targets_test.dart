import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/battle/domain/combat_rules.dart';
import 'package:pixel_world/features/battle/domain/field_terrain.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

void main() {
  // 使用独立于参数扫描和大样本验收的种子，避免只通过挑选过的对局。
  final random = math.Random(20260923);
  final seeds = List.generate(1024, (_) => random.nextInt(1 << 24));
  for (final mode in [-3, -2, -1, 1, 2, 3, 4, 5]) {
    final terrain = mode < 0 ? FieldTerrain.values[-mode - 1] : null;
    test('${terrain?.label ?? '$mode级城'}同属性无武器胜率符合目标', () {
      final attack = CombatRules.heroAttack(15, terrain?.heroAttackFactor ?? 1);
      final bonus = mode > 0 ? GameConfig.cityDefenseAttackBonusFor(mode) : 0;
      final morale = mode > 0 ? GameConfig.cityDefenseMoraleBonusFor(mode) : 0;
      var wins = 0;
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
        expect(k.generalsAlive, isFalse, reason: '不能靠超时制造低胜率');
        if (k.ram[0x7451] > 0) wins++;
      }
      final rate = wins / seeds.length;
      if (mode < 0) {
        expect(rate, inInclusiveRange(.45, .55));
      } else if (mode == 1) {
        expect(rate, inInclusiveRange(.25, .35));
      } else if (mode == 2) {
        expect(rate, lessThan(.05));
      } else {
        expect(wins, 0);
      }
    });
  }
}
