import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

int victories({
  required int attack,
  required int defense,
  required double recoil,
  required double wall,
}) {
  var wins = 0;
  for (var seed = 1; seed <= 64; seed++) {
    final k = NesBattleKernel(
      attack: [attack, 11 + defense],
      moraleAttack: [attack, 11],
      hp: [95, 65],
      slots: [
        [0, 1, 2],
        [0, 1, 2, 3],
      ],
      seed: seed * 1009,
      recoilDifferenceScale: recoil,
      wallDamageScale: wall,
    );
    while (k.generalsAlive && k.frames < 12000) {
      k.step(autoCharge: true);
    }
    expect(k.frames, lessThan(12000), reason: '不能因平滑反弹而永久停战');
    if (k.ram[0x7451] > 0 && k.ram[0x7452] == 0) wins++;
  }
  return wins;
}

void main() {
  test('少一兵的强将不再被普通二级守将全样本碾压', () {
    expect(victories(attack: 15, defense: 4, recoil: 1, wall: 1), 0);
    final unchangedHero = victories(
      attack: 15,
      defense: 2,
      recoil: GameConfig.battleRecoilDifferenceScale,
      wall: GameConfig.battleWallDamageScale,
    );
    expect(unchangedHero, inInclusiveRange(35, 63));
    expect(
      victories(
        attack: 18,
        defense: 2,
        recoil: GameConfig.battleRecoilDifferenceScale,
        wall: GameConfig.battleWallDamageScale,
      ),
      greaterThanOrEqualTo(58),
    );
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
