import 'dart:math' as math;

/// 固定守将用于隔离其他规则的回归测试，随机抽选另有专门用例。
class FirstRandom implements math.Random {
  @override
  int nextInt(int max) => 0;

  @override
  bool nextBool() => false;

  @override
  double nextDouble() => 0;
}
