import 'dart:math' as math;

import '../game_config.dart';

/// 国家每个月独立抽取的收成。
enum Harvest {
  /// 基础城池收入。
  normal('正常营收', 0),

  /// 按城池数扣减收入。
  poor('欠收', -GameConfig.poorPenaltyPerCity),

  /// 按城池数追加收入。
  abundant('丰收', GameConfig.abundantBonusPerCity);

  const Harvest(this.label, this.perCityAdjustment);

  /// 对玩家显示的收成名称。
  final String label;

  /// 每座城的额外收入或扣减。
  final int perCityAdjustment;

  /// 按配置权重抽取，经济随机源与战斗、抽将分开。
  static Harvest draw(math.Random random) {
    final roll = random.nextInt(
      GameConfig.normalHarvestWeight +
          GameConfig.poorHarvestWeight +
          GameConfig.abundantHarvestWeight,
    );
    if (roll < GameConfig.normalHarvestWeight) return normal;
    if (roll < GameConfig.normalHarvestWeight + GameConfig.poorHarvestWeight) {
      return poor;
    }
    return abundant;
  }
}

/// 某国家刚结算月份的完整收支，实际金币最低为零。
class MonthlySettlement {
  /// 保存结算时的城池数和薪酬，不随下月城池变动而改变。
  const MonthlySettlement({
    required this.year,
    required this.month,
    required this.harvest,
    required this.cityCount,
    required this.baseIncome,
    required this.salary,
    required this.goldBefore,
    required this.goldAfter,
  });

  /// 已结算的年份。
  final int year;

  /// 已结算的月份。
  final int month;

  /// 本次收成。
  final Harvest harvest;

  /// 本月结算时实际拥有的城池数。
  final int cityCount;

  /// 所有城池的基础收入合计。
  final int baseIncome;

  /// 本月英雄报酬。
  final int salary;

  /// 结算前的金币。
  final int goldBefore;

  /// 扣除支出且限制最低为零后的金币。
  final int goldAfter;

  /// 收成带来的额外收支。
  int get adjustment => harvest.perCityAdjustment * cityCount;

  /// 应结算净收入，允许负值。
  int get netIncome => baseIncome + adjustment - salary;

  /// 国库实际变化，金币不足时不产生负债。
  int get actualChange => goldAfter - goldBefore;
}
