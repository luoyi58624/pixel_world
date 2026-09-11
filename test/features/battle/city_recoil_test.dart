import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
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
      recoilDifferenceScale: GameConfig.battleRecoilDifferenceScale,
      wallDamageScale: GameConfig.battleWallDamageScale,
      defenderCityAttackBonus: bonus,
      cityDefenseRecoilScale: scale,
    );

void main() {
  test('城防击退减弱但首次碰撞伤害、基础攻击和士气不变', () {
    final before = _kernel(1);
    final after = _kernel(GameConfig.cityDefenseRecoilScale);
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
    final after = _kernel(GameConfig.cityDefenseRecoilScale, bonus: 0);
    for (var i = 0; i < 1200; i++) {
      before.step(autoCharge: true);
      after.step(autoCharge: true);
      expect(after.snapshot(), before.snapshot());
    }
  });
}
