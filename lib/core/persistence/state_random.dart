import 'dart:math';

/// 可保存内部状态的随机源，读档不会重复抽取已消费的随机序列。
class StateRandom implements Random {
  /// 创建独立随机流，零种子映射到一个非零状态。
  StateRandom([int? seed])
    : state = (seed ?? Random().nextInt(0x7fffffff)) & 0xffffffff {
    if (state == 0) state = 0x6d2b79f5;
  }

  /// 当前无符号 32 位状态。
  int state;

  int _next() {
    var x = state;
    x ^= (x << 13) & 0xffffffff;
    x ^= x >>> 17;
    x ^= (x << 5) & 0xffffffff;
    return state = x & 0xffffffff;
  }

  @override
  int nextInt(int max) {
    if (max <= 0 || max > 0x100000000) {
      throw RangeError.range(max, 1, 0x100000000);
    }
    final bound = 0x100000000 - 0x100000000 % max;
    var value = _next();
    while (value >= bound) {
      value = _next();
    }
    return value % max;
  }

  @override
  bool nextBool() => nextInt(2) == 1;

  @override
  double nextDouble() => _next() / 0x100000000;
}
