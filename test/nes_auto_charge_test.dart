import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/nes_battle_kernel.dart';

void main() {
  final fixture = jsonDecode(
    File('test/fixtures/nes_auto_charge_frames.json').readAsStringSync(),
  ) as Map<String, dynamic>;
  for (final entry in fixture['cases'] as List) {
    test('双方自动士气与 py65 原始指令逐帧一致：${entry['name']}', () {
      final kernel = NesBattleKernel(
        attack: (entry['attack'] as List).cast<int>(),
        hp: (entry['hp'] as List).cast<int>(),
        slots: [
          for (final count in entry['soldiers'] as List)
            List.generate(count as int, (i) => i),
        ],
        seed: entry['seed'] as int,
      );
      final initial = [kernel.ram[0xae], kernel.ram[0xaf]];
      var sawBoost = false;
      final frames = entry['frames'] as List;
      for (var i = 0; i < frames.length; i++) {
        kernel.step(autoCharge: true);
        expect(
          kernel.snapshot(),
          (frames[i] as List).cast<int>(),
          reason: 'frame $i',
        );
        expect(kernel.ram[0x42], 0);
        sawBoost |= kernel.ram[0x0f] > 0 || kernel.ram[0x19] > 0;
      }
      expect(kernel.ram[0xae], lessThan(initial[0]));
      expect(kernel.ram[0xaf], lessThan(initial[1]));
      expect(sawBoost, isTrue);
    });
  }
}
