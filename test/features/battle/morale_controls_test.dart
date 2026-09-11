import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

// 测试显式注入固定样本，正式游戏以后调参不会改变这里的验收条件。
NesBattleKernel _battle(
  int seed, {
  bool enabled = true,
  double rate = 12,
  double range = 0,
  bool endurance = false,
}) => NesBattleKernel(
  attack: endurance ? [0, 0] : [15, 15],
  hp: endurance ? [255, 255] : [95, 95],
  initialMorale: [100, 100],
  slots: endurance
      ? [[], []]
      : [
          [0, 1, 2, 3],
          [0, 1, 2, 3],
        ],
  seed: seed,
  recoilDifferenceScale: 0.25,
  wallDamageScale: 0.5,
  randomChargeEnabled: true,
  moraleEnabled: enabled,
  moraleDrainPerSecond: rate,
  moraleDrainRandomRange: range,
  moralePowerScale: endurance ? 1 : 6,
);

int _health(NesBattleKernel k, int side) =>
    k.ram[0x12 + side] + k.ram[0x7451 + side];

void _advance(NesBattleKernel k, int frames, {bool held = false}) {
  for (var i = 0; i < frames; i++) {
    expect(k.generalsAlive, isTrue, reason: '速率测试必须保证双方存活，不能因战斗结束停止计时');
    k.step(autoCharge: true, chargeHeld: held);
  }
}

void main() {
  for (final rate in [8.0, 12.0, 16.0]) {
    test('固定每秒$rate点：逐帧累计、整秒准确，100点按时耗尽', () {
      final k = _battle(123, rate: rate, endurance: true);
      final emptyAt = (100 * 60 / rate).ceil();
      for (var frame = 1; frame <= emptyAt; frame++) {
        _advance(k, 1, held: true);
        final expected = (100 - (frame * rate / 60).floor()).clamp(0, 100);
        expect(k.ram[0xae], expected, reason: '第$frame帧');
        expect(k.ram[0xaf], expected, reason: '第$frame帧双方应同步');
        if (frame < emptyAt) expect(k.ram[0xae], greaterThan(0));
      }
      _advance(k, 120);
      expect(k.ram[0xae], 0);
      expect(k.ram[0xaf], 0);
    });
  }

  test('7.5点每秒的小数跨秒保留，不能每秒舍弃半点', () {
    final k = _battle(123, rate: 7.5, endurance: true);
    for (final remaining in [93, 85, 78, 70]) {
      _advance(k, 60);
      expect(k.ram[0xae], remaining);
      expect(k.ram[0xaf], remaining);
    }
  });

  test('每秒8到16点：256个种子逐秒范围正确，100点在6.25到12.5秒内耗尽', () {
    final firstSecondCosts = <int>{};
    final emptyFrames = <int>[];
    var firstSecondTotal = 0;
    for (var seed = 1; seed <= 256; seed++) {
      final k = _battle(seed * 1009, range: 4, endurance: true);
      final emptied = [false, false];
      while (k.ram[0xae] > 0 || k.ram[0xaf] > 0) {
        expect(k.frames, lessThan(750));
        final before = [k.ram[0xae], k.ram[0xaf]];
        for (var i = 0; i < 60; i++) {
          _advance(k, 1);
          for (var side = 0; side < 2; side++) {
            if (!emptied[side] && k.ram[0xae + side] == 0) {
              emptyFrames.add(k.frames);
              emptied[side] = true;
            }
          }
        }
        for (var side = 0; side < 2; side++) {
          final spent = before[side] - k.ram[0xae + side];
          if (before[side] >= 16) {
            expect(spent, inInclusiveRange(8, 16));
          } else {
            expect(spent, inInclusiveRange(0, before[side]));
          }
          if (k.frames == 60) {
            firstSecondCosts.add(spent);
            firstSecondTotal += spent;
          }
        }
      }
    }
    expect(firstSecondCosts.length, greaterThanOrEqualTo(6));
    expect(emptyFrames, everyElement(inInclusiveRange(375, 750)));
    emptyFrames.sort();
    // 输出实测区间，供调参查看；验收不锁死随机均值。
    // ignore: avoid_print
    print(
      '士气速率：512个样本首秒平均扣${firstSecondTotal / 512}点；'
      '100点实际耗尽范围${emptyFrames.first / 60}～${emptyFrames.last / 60}秒',
    );
  });

  test('双方每60帧各抽一次速度，零幅度固定同速', () {
    final k = _battle(919, range: 4, endurance: true);
    final rates = <String>{};
    for (var second = 0; second < 5; second++) {
      _advance(k, 1);
      final current = k.saveState()['moraleDrainRates'];
      expect(current, everyElement(inInclusiveRange(8, 16)));
      rates.add('$current');
      _advance(k, 59);
      expect(k.saveState()['moraleDrainRates'], current);
    }
    expect(rates.length, greaterThan(1));
    final fixed = _battle(919, endurance: true);
    _advance(fixed, 180);
    expect(fixed.saveState()['moraleDrainRates'], [12.0, 12.0]);
  });

  test('关闭士气或基础消耗为零时，按键也不能产生额外扣除', () {
    for (final k in [
      _battle(123, enabled: false, range: 4, endurance: true),
      _battle(123, rate: 0, endurance: true),
    ]) {
      _advance(k, 600, held: true);
      expect(k.ram[0xae], 100);
      expect(k.ram[0xaf], 100);
      expect(k.ram[0x0f], 0);
      expect(k.ram[0x19], 0);
    }
  });

  for (final enabled in [false, true]) {
    test('士气开关$enabled、零随机：同属性双方逐帧等血且自然同归于尽', () {
      for (var seed = 1; seed <= 64; seed++) {
        final k = _battle(seed * 1009, enabled: enabled);
        while (k.generalsAlive && k.frames < 18000) {
          k.step(autoCharge: true, chargeHeld: !enabled);
          expect(_health(k, 0), _health(k, 1));
          expect(k.ram[0xae], k.ram[0xaf]);
          if (!enabled) {
            expect(k.ram[0xae], 100);
            expect(k.ram[0x0f], 0);
            expect(k.ram[0x19], 0);
          }
        }
        expect(k.generalsAlive, isFalse);
        expect(k.ram[0x7451], 0);
        expect(k.ram[0x7452], 0);
      }
    });
  }

  test('开关、速度、计时周期和小数余量随存档恢复，跨秒后逐帧一致', () {
    for (final enabled in [false, true]) {
      final k = _battle(919, enabled: enabled, range: 4, endurance: true);
      _advance(k, 47);
      final restored = _battle(1, enabled: !enabled, rate: 1, endurance: true)
        ..restoreState(jsonDecode(jsonEncode(k.saveState())));
      expect(restored.moraleEnabled, enabled);
      expect(restored.moraleDrainPerSecond, 12);
      expect(restored.moraleDrainRandomRange, 4);
      for (var i = 0; i < 700; i++) {
        k.step(autoCharge: true);
        restored.step(autoCharge: true);
        expect(restored.snapshot(), k.snapshot());
      }
      expect(restored.saveState(), k.saveState());
    }
  });

  test('旧存档保留剩余士气，从新速率的完整一秒开始消耗', () {
    final k = _battle(919, endurance: true);
    _advance(k, 47);
    final state = jsonDecode(jsonEncode(k.saveState())) as Map<String, dynamic>;
    for (final key in [
      'moraleDrainPerSecond',
      'moraleDrainRandomRange',
      'moraleDrainFrames',
      'moraleDrainRates',
      'moraleDrainCarry',
    ]) {
      state.remove(key);
    }
    state['moraleCostPerCharge'] = 5;
    state['chargeCarry'] = [0.2, 0.8, 0.3, 0.7];
    final restored = _battle(1, endurance: true)..restoreState(state);
    expect(restored.ram[0xae], k.ram[0xae]);
    _advance(restored, 60);
    expect(restored.ram[0xae], k.ram[0xae] - 12);
    expect(restored.ram[0xaf], k.ram[0xaf] - 12);
  });

  test('消耗与随机幅度拒绝负数、非有限数和超过基础值的幅度', () {
    for (final (rate, range) in [
      (-1.0, 0.0),
      (12.0, -1.0),
      (12.0, 13.0),
      (double.nan, 0.0),
      (12.0, double.infinity),
    ]) {
      expect(() => _battle(1, rate: rate, range: range), throwsArgumentError);
    }
  });
}
