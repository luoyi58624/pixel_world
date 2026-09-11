part of '../campaign.dart';

/// 国家战略阶段，筹备不等于已经向目标派兵。
enum CountryWarPhase { defending, preparing, saving, attacking }

/// 一个国家锁定的作战计划，各城共用，不分别向不同强城盲目出兵。
class CountryWarPlan {
  CountryWarPlan._();

  /// 当前目标，防御或没有可选目标时可能为空。
  int? targetCityId;

  /// 锁定时的目标归属，用于在易主后重新评估。
  int? targetCountryId;

  /// 持续灭国目标不被临时防守或单座城池易主清空。
  int? offensiveCountryId, offensiveCityId;

  /// 当前正在守家、筹备、积蓄资金或执行进攻。
  CountryWarPhase phase = CountryWarPhase.preparing;

  /// 本次计划需要出征的将领数量。
  int requiredHeroes = 1;

  /// 配齐武器、兵力并预留月俸后的最低国库要求。
  int requiredGold = 0;
}
