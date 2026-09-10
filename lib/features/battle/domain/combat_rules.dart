/// 真实战斗与静态评估共用的确定性属性修正；不执行拼杀或随机判定。
abstract final class CombatRules {
  /// 缺兵逐人扣分，生命每完整损失四分之一扣分；满状态默认九成成功。
  static double retreatSuccess(
    num hp,
    int maxHp,
    int soldiers, {
    int soldierLimit = 4,
    double base = .9,
    double penalty = .1,
  }) {
    if (maxHp <= 0 || hp <= 0) return 0;
    final missing = (soldierLimit - soldiers).clamp(0, soldierLimit);
    final wounds = ((1 - hp / maxHp).clamp(0.0, 1.0) * 4 + 1e-9).floor();
    return (base - (missing + wounds) * penalty).clamp(0.0, 1.0);
  }

  /// 地形只修正将领攻击，按原内核输入范围取整。
  static int heroAttack(num combat, double factor) =>
      (combat * factor).floor().clamp(0, 63);

  /// 城防只增加攻击，野战没有城防加成。
  static int defenseBonus(
    int level,
    List<int> bonuses, {
    bool field = false,
  }) => field ? 0 : bonuses[(level - 1).clamp(0, bonuses.length - 1)];
}
