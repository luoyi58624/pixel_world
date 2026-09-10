import '../../features/ai/config.dart';

/// 游戏数值集中配置；修改后热重启，以便当前战役重新按配置初始化。
abstract final class GameConfig {
  /// 国家 AI 的反应、工作量和风险预算；不改变实际战斗规则。
  static const nationalAi = AiTuning();

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

  /// 开局即开始决策，首次各国依次占用一个逻辑帧。
  static const countryAiInitialDelay = 0.0;

  /// 国家经营和出征决策间隔，避免逐帧扫描招募和购买。
  static const countryAiInterval = 5.0;

  /// 自动出征至少携带的小兵数，默认配满四兵再出发。
  static const countryAiMinimumSoldiers = 4;

  /// 待签约结果包含抽取当月在内保留两个月，第三个月开始时回到共享池。
  static const heroOfferValidMonths = 2;

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

  /// 国家军力的比较尺度，结合城防、存活将领和全国兵员。
  static const countryAiStrengthScale = 80.0;

  /// 弱国优先权重，越大越倾向先扩张容易攻下的领土。
  static const countryAiWeaknessPower = 2.0;

  /// 每支敌军实际抵达城下，或每场野战引起的仇恨增量。
  static const countryHatredPerAttack = 20;

  /// 两国之间的仇恨上限，避免无限累积压过所有战略因素。
  static const countryHatredMaximum = 100;

  /// 每点仇恨增加的反击目标权重，满值提供三倍权重。
  static const countryHatredWeightPerPoint = 0.02;

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

  /// 仍拥有城池的国家每月获得一次固定收入。
  static const countryMonthlyIncome = 30;

  /// 外国城池的收入及城防兵员容量倍率，以开局归属判断，逐城向下取整。
  static const foreignCityYieldFactor = 1.0;

  /// 满生命、满兵力时的撤退成功率。
  static const retreatBaseSuccessChance = 0.9;

  /// 每少一名士兵，以及每损失四分之一将领生命，各扣除此成功率。
  static const retreatConditionPenalty = 0.1;

  /// 发起撤退后双方从当前位置退回开场位置的秒数。
  static const retreatExitSeconds = 1.2;

  /// 双方回到起点后，成功结果停留的秒数，随后沿地图来路回城。
  static const retreatResultSeconds = 0.6;

  /// 高级电脑将领至少观察的碰撞轮数，避免刚列阵就逃跑。
  static const aiRetreatMinimumClashes = 2;

  /// 预计自身可承受轮数低于敌方此比例时才考虑撤退。
  static const aiRetreatSurvivalRatio = 0.6;

  /// 生命严格低于四分之一且胜算渺茫时，高级电脑将领才考虑撤退。
  static const aiRetreatHealthRatio = 0.25;

  /// 已接近本国城池的敌军警戒距离，单位为地图原生像素。
  static const aiThreatDistance = 320.0;

  /// 一次轮攻最多投入的将领数，始终先扣除各城留守名额。
  static const aiMaximumRaidHeroes = 4;

  /// 每次选择目标最多精算的路线数，其余先用距离与守军做粗筛。
  static const aiTargetShortlist = 3;

  /// 路线估时缓存上限，长时间运行不会无限增长。
  static const aiTravelCacheSize = 256;

  /// 失败远征后重新筹备的间隔，避免立刻重复派兵送死。
  static const aiRaidRetrySeconds = 15.0;

  /// 丰收时整个国家额外增加一次的收入。
  static const abundantHarvestBonus = 30;

  /// 欠收时整个国家额外减少一次的收入。
  static const poorHarvestPenalty = 30;

  /// 月末是否继续扣除存活英雄的报酬。
  static const chargeHeroSalary = true;

  /// 城池最高等级；现有原版建筑支持 1 到 5 级。
  static const maxCityLevel = 5;

  /// 第一年可通过升级达到的最高城防，初始高等级城池不降级。
  static const firstYearCityUpgradeLimit = 3;

  /// 每过一年新增的可升级城防等级。
  static const cityUpgradeLevelsPerYear = 1;

  /// 当前年份的升级上限，封顶五级。
  static int cityUpgradeLimitForYear(int year) =>
      (firstYearCityUpgradeLimit +
              (year - initialYear).clamp(0, maxCityLevel) *
                  cityUpgradeLevelsPerYear)
          .clamp(1, maxCityLevel);

  /// 依次为一升二、二升三、三升四、四升五的基础费用，实付再扣将领内政。
  static const List<int> cityUpgradeCosts = [30, 60, 100, 160];

  /// 每一级城防贡献给全国兵员上限的容量，一级四人、二级八人。
  static const cityReserveCapacityPerLevel = 4;

  /// 开局每位实际登场将领贡献四兵，重复初始化记录不重复计算。
  static const initialSoldiersPerHero = 4;

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

  /// 阵亡、失城被移除的非主角英雄是否回到回收池。
  static const recycleDefeatedHeroes = true;

  /// 守城方从二级起，每级增加的整队基础攻击力。
  static const cityDefenseAttackPerLevel = 1;

  /// 一级城市增加一点攻击，之后每级再增加一点，不增加士气。
  static const cityDefenseBaseAttack = 1;

  /// 缩小碰撞强度差对击退速度的影响，避免少一个兵立即变成持续撞墙。
  static const battleRecoilDifferenceScale = 0.25;

  /// 原版撞墙使用双倍攻击强度，折半后按普通攻击强度追加一次伤害。
  static const battleWallDamageScale = 0.5;

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
  static const cityDamageChancePerVictory = 0.8;
}

/// 从玩法 JSON 读取的国家开局经济。
class CountryConfig {
  /// 配置该国初始资金，留守人数读取各城独立配置。
  const CountryConfig({this.initialGold = GameConfig.initialGold})
    : assert(initialGold >= 0);

  /// 国家初始金币，多座城共用同一个国库。
  final int initialGold;
}
