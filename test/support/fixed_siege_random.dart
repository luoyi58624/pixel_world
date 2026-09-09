import 'dart:math' as math;

/// 固定战后损伤抽样，其他规则测试不依赖系统随机结果。
class FixedSiegeRandom implements math.Random {
  /// 默认命中降级，可显式传入未命中区间的数值。
  const FixedSiegeRandom([this.value = 0]);

  /// 每次返回的区间内数值。
  final double value;

  @override
  double nextDouble() => value;

  @override
  bool nextBool() => value < 0.5;

  @override
  int nextInt(int max) => (value * max).floor();
}
