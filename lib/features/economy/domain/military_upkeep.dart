import 'dart:math' as math;

/// 冗余驻军的公开维持费规则，战役与后台预算共用，不修改个人月俸。
abstract final class MilitaryUpkeep {
  /// 按同城超额人数平方收费，实际按驻城时间累计。
  static int monthlyCost(
    int heroes, {
    required int freeHeroes,
    required int factor,
  }) {
    final excess = math.max(0, heroes - freeHeroes);
    return excess * excess * factor;
  }
}
