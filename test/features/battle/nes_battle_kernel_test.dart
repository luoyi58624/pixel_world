import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

void main() {
  final reference = jsonDecode(
    File('test/fixtures/nes_battle_frames.json').readAsStringSync(),
  ) as Map;
  for (final scenario in reference['cases'] as List) {
    test('原始 6502 逐帧一致：${scenario['name']}（位置、速度、随机数、伤害、阵亡）', () {
      final kernel = NesBattleKernel(
        originalSoldierRules: true,
        attack: List<int>.from(scenario['attack']),
        hp: List<int>.from(scenario['hp']),
        slots: [
          for (final count in scenario['soldiers'])
            List<int>.generate(count as int, (i) => i),
        ],
        seed: scenario['seed'] as int,
      );
      final frames = scenario['frames'] as List;
      for (var frame = 0; frame < frames.length; frame++) {
        final held =
            scenario['input'] == 'held' ||
            scenario['input'] == 'pulse' &&
                frame % 5 == 0 &&
                kernel.velocity(0) < 0;
        kernel.step(chargeHeld: held);
        expect(kernel.snapshot(), frames[frame], reason: 'frame $frame');
      }
    });
  }
}
