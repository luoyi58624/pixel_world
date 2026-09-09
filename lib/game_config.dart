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

  /// 其他国家是否自动经营和出征，玩家国家仍由玩家操作。
  static const countryAiEnabled = true;

  /// 开局后首次国家决策的等待秒数。
  static const countryAiInitialDelay = 8.0;

  /// 国家经营和出征决策间隔，避免逐帧扫描招募和购买。
  static const countryAiInterval = 5.0;

  /// 自动出征至少携带的小兵数，默认配满四兵再出发。
  static const countryAiMinimumSoldiers = 4;

  /// 每城每月最多抽三次，放弃消耗次数，签约成功后当月停止招募。
  static const heroDrawsPerCityPerMonth = 3;

  /// 一级城的招募人数门槛，只统计驻城英雄，不限制进城与开局名单。
  static const cityRecruitCapacityBase = 2;

  /// 每次升级增加的招募名额。
  static const cityRecruitCapacityPerLevel = 1;

  /// 每位在外将领支付一金币粮草所需的行军或交战秒数。
  static const fieldSupplySecondsPerGold = 10.0;

  /// 扎营的粮草消耗倍率，一半消耗即二十秒一金币。
  static const campSupplyRate = 0.5;

  /// 电脑在已预留粮草和月俸之外保留的应急金币。
  static const countryAiEmergencyGold = 5;

  /// 预算至少覆盖一个月再加这段时间，避免刚结算就再次花空国库。
  static const countryAiSupplySafetySeconds = 30.0;

  /// 每位守将预留的交战时间，与行军时间一起计入出征粮草预算。
  static const countryAiBattleBudgetSeconds = 30.0;

  /// 进攻目标的距离衰减尺度，单位秒；越小越偏向短途进攻。
  static const countryAiTargetTravelScale = 30.0;

  /// 行军时间的权重衰减指数，设为零可关闭额外的近邻偏好。
  static const countryAiTargetDistancePower = 2.0;

  /// 目标国每多占一城增加的目标权重，零表示关闭额外的大国倾向。
  static const countryAiTerritoryWeightPerCity = 0.5;

  /// 领地规模最多提供的权重倍率，避免大国完全挤掉其他目标。
  static const countryAiTerritoryWeightCap = 6.0;

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

  /// 解雇高级将领的基础返还金币，实际金额再加该将领内政。
  static const advancedDismissalGold = 10;

  /// 解雇普通将领的基础返还金币，实际金额再加该将领内政。
  static const normalDismissalGold = 5;

  /// 城池最高等级；现有原版建筑支持 1 到 5 级。
  static const maxCityLevel = 5;

  /// 依次为一升二、二升三、三升四、四升五的基础费用，实付再扣将领内政。
  static const List<int> cityUpgradeCosts = [30, 80, 150, 300];

  /// 每一级城防贡献给全国兵员上限的容量，一级四人、二级八人。
  static const cityReserveCapacityPerLevel = 4;

  /// 每名本国存活英雄贡献的全国容量，出征和同国转城不影响计数。
  static const cityReserveCapacityPerHero = 4;

  /// 简化地图每座城的开局兵员贡献，正式开局汇总各城 JSON 配置至国家库存。
  static const initialCityReserves = 0;

  /// 征募一个储备兵员的价格。
  static const soldierRecruitCost = 1;

  /// 城池面板每次点击最多征募的人数，实际数量受储备容量和金币限制。
  static const soldierRecruitBatchSize = 10;

  /// 每名英雄最多随行四兵，当前战场提供四个固定站位。
  static const heroSoldierLimit = 4;

  /// 驻城英雄不预占兵员，确认出征或守城开战时才从城内调拨。
  static const initialHeroSoldiers = 0;

  /// 新签约英雄的初始随行兵数，正式离城时自动从城池储备补齐。
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
  static const cityDefenseAttackPerLevel = 4;

  /// 新游戏一级城市的守方攻击加成，之后每级再增加四点。
  static const cityDefenseBaseAttack = 4;

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

  /// 地图步行动画每帧持续的秒数，独立于行军速度和地形倍率。
  static const heroWalkFrameSeconds = 0.2;

  /// 草地、树林和土路的行军倍率。
  static const grassSpeedFactor = 0.75;

  /// 山地行军倍率。
  static const mountainSpeedFactor = 0.2;

  /// 河流行军倍率。
  static const waterSpeedFactor = 0.4;

  /// 原版进入提示 20 帧及介绍等待 143 帧。
  static const battleFormationFrames = 163;

  /// 整场未攻下的城池，进攻方每赢一轮独立触发一次降级的概率。
  static const cityDamageChancePerVictory = 0.5;
}

/// 从玩法 JSON 读取的国家开局经济。
class CountryConfig {
  /// 配置该国初始资金，留守人数由各城初始等级决定。
  const CountryConfig({this.initialGold = GameConfig.initialGold})
    : assert(initialGold >= 0);

  /// 国家初始金币，多座城共用同一个国库。
  final int initialGold;
}
