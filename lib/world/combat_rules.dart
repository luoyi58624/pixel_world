/// 真实战斗与静态评估共用的确定性属性修正；不执行拼杀或随机判定。
abstract final class CombatRules {
  /// 地形只修正将领攻击，按原内核输入范围取整。
  static int heroAttack(num combat, double factor) =>
      (combat * factor).floor().clamp(0, 63);

  /// 城防只增加攻击，野战没有城防加成。
  static int defenseBonus(
    int level,
    int base,
    int perLevel, {
    bool field = false,
  }) => field ? 0 : base + (level - 1) * perLevel;
}
