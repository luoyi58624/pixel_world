import 'dart:math' as math;

import '../../../core/config/game_config.dart';

/// 每个有城国家每月独立抽取一次收成，正常五成，丰欠收各二成五。
enum Harvest {
  /// 国家正常收入。
  normal('正常营收'),

  /// 国家本月收入随机减少五至十金币。
  poor('欠收'),

  /// 国家本月收入随机增加五至十金币。
  abundant('丰收');

  const Harvest(this.label);

  /// 对玩家显示的收成名称。
  final String label;

  /// 抽取本国本月的实际增减额，正常月份不消耗幅度随机数。
  int drawAdjustment(math.Random random) {
    if (this == Harvest.normal) return 0;
    final amount =
        GameConfig.harvestAdjustmentMin +
        random.nextInt(
          GameConfig.harvestAdjustmentMax - GameConfig.harvestAdjustmentMin + 1,
        );
    return this == Harvest.poor ? -amount : amount;
  }

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

/// 冻结单座城池一次真实月结，后续升级或易主不改变历史账单。
class CityIncomeSettlement {
  /// 保存本城结算时的等级、收成和已抽取金额。
  const CityIncomeSettlement({
    required this.cityId,
    required this.level,
    required this.harvest,
    required this.baseIncome,
    required this.adjustment,
  });

  /// 结算时的城池身份、等级、正常产出与本次随机增减。
  final int cityId, level, baseIncome, adjustment;

  /// 旧档的逐城收成；新账单固定正常，随机增减记在国家月结中。
  final Harvest harvest;

  /// 本城实际收入，欠收时允许为负。
  int get income => baseIncome + adjustment;

  /// 供日志与存档共用的逐城账目。
  Map<String, Object> toJson() => {
    'id': cityId,
    'level': level,
    'harvest': harvest.name,
    'baseIncome': baseIncome,
    'adjustment': adjustment,
    'income': income,
  };

  /// 恢复已经发生的结算，不重新抽取收成。
  factory CityIncomeSettlement.fromJson(Map<String, dynamic> data) =>
      CityIncomeSettlement(
        cityId: data['id'],
        level: data['level'],
        harvest: Harvest.values.byName(data['harvest']),
        baseIncome: data['baseIncome'],
        adjustment: data['adjustment'],
      );
}

/// 某国家刚结算月份的完整收支，国库允许负数。
class MonthlySettlement {
  /// 保存结算时的城池数和薪酬，不随下月城池变动而改变。
  MonthlySettlement({
    required this.year,
    required this.month,
    required this.harvest,
    required this.cityCount,
    required this.baseIncome,
    required this.adjustment,
    required this.salary,
    this.garrisonUpkeep = 0,
    required this.goldBefore,
    required this.goldAfter,
    this.fixedIncome = 0,
    List<CityIncomeSettlement> cityIncomes = const [],
  }) : cityIncomes = List.unmodifiable(cityIncomes);

  /// 已结算的年份。
  final int year;

  /// 已结算的月份。
  final int month;

  /// 本国当月统一收成；旧版各城收成不同时为空，保留历史显示。
  final Harvest? harvest;

  /// 不把混合收成误标为全国正常或全国丰收。
  String get harvestLabel =>
      cityCount == 0 ? '无城池' : harvest?.label ?? '各城收成不同';

  /// 本月国家固定保底，不随城池数量重复发放。
  final int fixedIncome;

  /// 城池基础收入明细；旧账单仍保留当时逐城计算的收成。
  final List<CityIncomeSettlement> cityIncomes;

  /// 本月结算时实际拥有的城池数。
  final int cityCount;

  /// 国家保底与所有城池正常产出的合计，未计收成增减。
  final int baseIncome;

  /// 本月英雄报酬。
  final int salary;

  /// 本月实际驻城时间累积的额外军费，与将领个人月俸分列。
  final int garrisonUpkeep;

  /// 结算前的金币。
  final int goldBefore;

  /// 扣除支出后的金币，允许透支为负。
  final int goldAfter;

  /// 收成带来的额外收支。
  final int adjustment;

  /// 应结算净收入，允许负值。
  int get netIncome => baseIncome + adjustment - salary - garrisonUpkeep;

  /// 国库实际变化，收入、工资与透支完整计入。
  int get actualChange => goldAfter - goldBefore;
}
