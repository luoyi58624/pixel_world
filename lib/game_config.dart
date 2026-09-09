/// 游戏数值集中配置；修改后热重启，以便当前战役重新按配置初始化。
abstract final class GameConfig {
  /// 初始年份。
  static const initialYear = 1;

  /// 初始月份，范围为 1 到 12。
  static const initialMonth = 1;

  /// 每月持续的真实秒数。
  static const secondsPerMonth = 60.0;

  /// 未单独配置的国家使用的初始金币。
  static const initialGold = 50;

  /// 各国开局资金与每城留守人数；资金为新游戏平衡配置，不是 ROM 提取值。
  static const countries = <int, CountryConfig>{
    0: CountryConfig(initialGold: 50, garrisonHeroes: 1), // 阿尔马（玩家）
    1: CountryConfig(initialGold: 70, garrisonHeroes: 2), // 奥尔梅
    2: CountryConfig(initialGold: 60, garrisonHeroes: 1), // 马易
    3: CountryConfig(initialGold: 80, garrisonHeroes: 2), // 鲍罗布
    4: CountryConfig(initialGold: 45, garrisonHeroes: 1), // 墨尔
    5: CountryConfig(initialGold: 55, garrisonHeroes: 1), // 托洛诺
    6: CountryConfig(initialGold: 40, garrisonHeroes: 1), // 列穆
    7: CountryConfig(initialGold: 50, garrisonHeroes: 1), // 迪麦
    8: CountryConfig(initialGold: 45, garrisonHeroes: 1), // 索朗
    9: CountryConfig(initialGold: 80, garrisonHeroes: 2), // 本塔
    10: CountryConfig(initialGold: 65, garrisonHeroes: 1), // 洛埃
    11: CountryConfig(initialGold: 60, garrisonHeroes: 1), // 贝尔
    12: CountryConfig(initialGold: 40, garrisonHeroes: 1), // 艾布林
    13: CountryConfig(initialGold: 40, garrisonHeroes: 1), // 格商尔
    14: CountryConfig(initialGold: 40, garrisonHeroes: 1), // 格林福
    15: CountryConfig(initialGold: 40, garrisonHeroes: 1), // 沃塔
  };

  /// 其他国家是否自动经营和出征，玩家国家仍由玩家操作。
  static const countryAiEnabled = true;

  /// 开局后首次国家决策的等待秒数。
  static const countryAiInitialDelay = 8.0;

  /// 国家经营和出征决策间隔，避免逐帧扫描招募和购买。
  static const countryAiInterval = 5.0;

  /// 自动出征至少携带的小兵数，默认配满四兵再出发。
  static const countryAiMinimumSoldiers = 4;

  /// 每座城每月可抽取将领的次数，易主和放弃签约均不重置次数。
  static const heroDrawsPerCityPerMonth = 1;

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

  /// 一级升二级的基础费用，实际支付再扣主持将领的内政。
  static const cityUpgradeBaseCost = 30;

  /// 城池每高一级，升级基础费用增加的金币。
  static const cityUpgradeCostPerLevel = 10;

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

  /// 守城方从二级起，每级增加的整队基础攻击力。
  static const cityDefenseAttackPerLevel = 2;

  /// 原版一级城已有两点战斗修正，二级合计四点；设为零可恢复旧城防平衡。
  static const cityDefenseBaseAttack = 2;

  /// 敌对部队中心相距一个人物宽度时触发野战，单位为地图原生像素。
  static const fieldEncounterDistance = 16.0;

  /// 山地野战中双方将领攻击保留的比例。
  static const mountainHeroAttackFactor = 0.5;

  /// 河流野战中双方将领攻击保留的比例。
  static const riverHeroAttackFactor = 0.7;

  /// 草地野战中双方将领攻击保留的比例。
  static const grassHeroAttackFactor = 0.9;

  /// 地图保留最近结束的野战记录数，进行中的战斗不受此限制。
  static const fieldBattleHistoryLimit = 16;

  /// 地图基础行军速度，单位为原生像素每秒。
  static const baseMarchSpeed = 22.0;

  /// 草地、树林和土路的行军倍率。
  static const grassSpeedFactor = 0.75;

  /// 山地行军倍率。
  static const mountainSpeedFactor = 0.2;

  /// 河流行军倍率。
  static const waterSpeedFactor = 0.4;

  /// 原版进入提示 20 帧及介绍等待 143 帧。
  static const battleFormationFrames = 163;

  /// 自动观战时每五帧在反弹阶段代按一次 A。
  static const battleAutoChargePulseFrames = 5;
}

/// 国家的开局经济与自动出征策略，城池等级和初始英雄仍由地图数据提供。
class CountryConfig {
  /// 配置该国初始资金和每座城至少留下的将领人数。
  const CountryConfig({
    this.initialGold = GameConfig.initialGold,
    this.garrisonHeroes = 1,
  }) : assert(initialGold >= 0),
       assert(garrisonHeroes >= 0);

  /// 国家初始金币，多座城共用同一个国库。
  final int initialGold;

  /// 自动出征后每座城至少保留的存活将领数。
  final int garrisonHeroes;
}
