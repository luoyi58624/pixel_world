/// 游戏数值集中配置；修改后热重启，以便当前战役重新按配置初始化。
abstract final class GameConfig {
  /// 初始年份。
  static const initialYear = 1;

  /// 初始月份，范围为 1 到 12。
  static const initialMonth = 1;

  /// 每月持续的真实秒数。
  static const secondsPerMonth = 60.0;

  /// 每个国家的初始金币。
  static const initialGold = 50;

  /// 正常、欠收、丰收的相对权重，默认对应 50%、25%、25%。
  static const normalHarvestWeight = 50;

  /// 欠收概率权重。
  static const poorHarvestWeight = 25;

  /// 丰收概率权重。
  static const abundantHarvestWeight = 25;

  /// 一级城每月基础收入。
  static const cityBaseIncome = 10;

  /// 每提升一级增加的月收入。
  static const cityIncomePerLevel = 5;

  /// 丰收时每座城额外增加的收入。
  static const abundantBonusPerCity = 5;

  /// 欠收时每座城额外减少的收入。
  static const poorPenaltyPerCity = 10;

  /// 月末是否继续扣除存活英雄的报酬。
  static const chargeHeroSalary = true;

  /// 原版报酬除以此数后向上取整，原值为零时仍为零。
  static const heroSalaryDivisor = 5;

  /// 城池最高等级；现有原版建筑支持 1 到 5 级。
  static const maxCityLevel = 5;

  /// 升级费用为当前等级乘此数，保留已有升级价格。
  static const cityUpgradeCostPerLevel = 200;

  /// 一级城的储备兵员容量。
  static const cityBaseReserveCapacity = 10;

  /// 每提升一级增加的储备容量。
  static const cityReserveCapacityPerLevel = 5;

  /// 每座城开局的储备兵员，与英雄随行兵分开。
  static const initialCityReserves = 0;

  /// 征募一个储备兵员的价格。
  static const soldierRecruitCost = 1;

  /// 每名英雄最多随行四兵，当前战场提供四个固定站位。
  static const heroSoldierLimit = 4;

  /// 原始驻城英雄的初始随行兵数。
  static const initialHeroSoldiers = 4;

  /// 新签约英雄的初始随行兵数，默认需要从城池储备配兵。
  static const recruitedHeroSoldiers = 0;

  /// 每次抽取英雄的费用，放弃签约不退还抽取费。
  static const heroDrawCost = 5;

  /// 高级将领的额外签约费。
  static const advancedSigningFee = 10;

  /// 普通将领的额外签约费。
  static const normalSigningFee = 0;

  /// 阵亡、失城被移除的非主角英雄是否回到回收池。
  static const recycleDefeatedHeroes = true;

  /// 小兵满血值。
  static const soldierHp = 20;

  /// 小兵对整队伤害的贡献。
  static const soldierAttack = 1;

  /// 地图基础行军速度，单位为原生像素每秒。
  static const baseMarchSpeed = 22.0;

  /// 草地、树林和土路的行军倍率。
  static const grassSpeedFactor = 0.75;

  /// 山地行军倍率。
  static const mountainSpeedFactor = 0.2;

  /// 河流行军倍率。
  static const waterSpeedFactor = 0.4;

  /// 基础冲锋速度。
  static const baseChargeSpeed = 120.0;

  /// 最近一次每消耗一点士气增加的冲锋速度。
  static const chargeSpeedPerMorale = 18.0;

  /// 士气投入间隔，单位秒。
  static const moraleInterval = 0.5;

  /// 每次消耗剩余士气的最低整数百分比。
  static const moraleMinPercent = 5;

  /// 每次消耗剩余士气的最高整数百分比。
  static const moraleMaxPercent = 10;

  /// 整个战场对应的后退距离点数。
  static const battlefieldPoints = 50.0;

  /// 每轮拼杀的最短间隔。
  static const clashInterval = 1.0;

  /// 退步终点的准备时间。
  static const chargePreparationTime = 0.22;
}
