import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

// 固定样本直接传入内核，游戏配置调整不会改变首轮士气规则的验收。
NesBattleKernel _battle(
  List<int> morale, {
  bool enabled = true,
  double rate = 12,
}) => NesBattleKernel(
  attack: [15, 15],
  hp: [255, 255],
  initialMorale: morale,
  slots: [
    [0, 1, 2, 3],
    [0, 1, 2, 3],
  ],
  seed: 919,
  recoilDifferenceScale: 0.25,
  wallDamageScale: 0.5,
  randomChargeEnabled: true,
  moraleEnabled: enabled,
  moralePowerScale: 6,
  moraleDrainPerSecond: rate,
  moraleDrainRandomRange: 0,
);

void _nextClash(NesBattleKernel k) {
  final next = k.clashes + 1;
  while (k.clashes < next && k.frames < 5000 && k.generalsAlive) {
    k.step(autoCharge: true);
  }
  expect(k.clashes, next);
}

void main() {
  test('超额初始化进入第一轮，首撞使用超额加正常消耗，红条同时正常下降', () {
    final k = _battle([125, 125]);
    expect(k.ram.sublist(0xae, 0xb0), [100, 100]);
    expect([k.accumulatedMorale(0), k.accumulatedMorale(1)], [25, 25]);
    _nextClash(k);
    final spent = 100 - k.ram[0xae];
    expect(spent, greaterThan(0));
    expect(k.ram[0xaf], 100 - spent);
    expect(k.committed, [25 + spent, 25 + spent]);
    expect(k.accumulatedMorale(0), 0);
    expect(k.accumulatedMorale(1), 0);
    final remaining = k.ram[0xae];
    _nextClash(k);
    expect(k.committed[0], inInclusiveRange(0, remaining - k.ram[0xae]));
    expect(k.committed[1], inInclusiveRange(0, remaining - k.ram[0xaf]));
  });

  test('仅有超额时第一撞立即生效，第二撞不再重复，超过字节范围也保留完整积累', () {
    for (final extra in [5, 25, 300]) {
      final k = _battle([100, 100 + extra], rate: 0);
      expect(k.accumulatedMorale(0), 0);
      expect(k.accumulatedMorale(1), extra);
      _nextClash(k);
      expect(k.committed, [0, extra]);
      expect(k.ram[0x15], 19);
      expect(k.ram[0x16], extra == 5 ? 31 : 43);
      expect(k.ram.sublist(0xae, 0xb0), [100, 100]);
      _nextClash(k);
      expect(k.committed, [0, 0]);
    }
  });

  test('低于100不补满，关闭士气时超额也不参与碰撞', () {
    final low = _battle([50, 75]);
    expect(low.ram.sublist(0xae, 0xb0), [50, 75]);
    expect([low.accumulatedMorale(0), low.accumulatedMorale(1)], [0, 0]);
    final disabled = _battle([100, 125], enabled: false);
    expect(disabled.accumulatedMorale(1), 0);
    _nextClash(disabled);
    expect(disabled.committed, [0, 0]);
    expect(disabled.ram.sublist(0xae, 0xb0), [100, 100]);
  });

  test('首次碰撞前后存档恢复，超额不会丢失或重复发放', () {
    for (final afterFirst in [false, true]) {
      final k = _battle([400, 400]);
      if (afterFirst) _nextClash(k);
      final restored = _battle([400, 400])
        ..restoreState(jsonDecode(jsonEncode(k.saveState())));
      for (var frame = 0; frame < 300; frame++) {
        k.step(autoCharge: true);
        restored.step(autoCharge: true);
        expect(restored.snapshot(), k.snapshot());
        expect(restored.accumulatedMorale(0), k.accumulatedMorale(0));
        expect(restored.accumulatedMorale(1), k.accumulatedMorale(1));
      }
      expect(restored.saveState(), k.saveState());
    }
  });
}
