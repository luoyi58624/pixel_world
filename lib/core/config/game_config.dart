import 'package:json5/json5.dart';

import '../../features/ai/config.dart';

/// 游戏数值集中配置；正式运行前由 `assets/data/game_config.json` 初始化。
abstract final class GameConfig {
  static final Map<String, Object?> _defaults = {
    'initialYear': 1,
    'initialMonth': 1,
    'secondsPerMonth': 60.0,
    'initialGold': 50,
    'countryAiEnabled': true,
    'countryAiInitialDelay': 0.0,
    'countryAiInterval': 5.0,
    'countryAiMinimumSoldiers': 4,
    'heroOfferValidMonths': 2,
    'aiDepartureInterval': 2.0,
    'countryAiEmergencyGold': 5,
    'countryAiBudgetSafetySeconds': 30.0,
    'countryAiBattleBudgetSeconds': 30.0,
    'countryAiTargetTravelScale': 30.0,
    'countryAiTargetDistancePower': 2.0,
    'countryAiStrengthScale': 80.0,
    'countryAiWeaknessPower': 2.0,
    'countryHatredPerAttack': 20,
    'countryHatredMaximum': 100,
    'countryHatredWeightPerPoint': 0.02,
    'normalHarvestWeight': 2,
    'poorHarvestWeight': 1,
    'abundantHarvestWeight': 1,
    'cityBaseIncome': 20,
    'cityIncomePerLevel': 0,
    'countryMonthlyIncome': 10,
    'foreignCityYieldFactor': 1.0,
    'retreatBaseSuccessChance': 0.9,
    'retreatConditionPenalty': 0.1,
    'retreatExitSeconds': 1.2,
    'retreatResultSeconds': 0.6,
    'aiRetreatMinimumClashes': 2,
    'aiRetreatSurvivalRatio': 0.6,
    'aiRetreatHealthRatio': 0.25,
    'aiThreatDistance': 320.0,
    'aiMaximumRaidHeroes': 4,
    'aiTargetShortlist': 3,
    'aiTravelCacheSize': 256,
    'aiRaidRetrySeconds': 15.0,
    'harvestAdjustmentMin': 5,
    'harvestAdjustmentMax': 10,
    'chargeHeroSalary': true,
    'freeGarrisonHeroes': 2,
    'garrisonUpkeepFactor': 0,
    'maxCityLevel': 5,
    'firstYearCityUpgradeLimit': 3,
    'cityUpgradeLevelsPerYear': 1,
    'cityUpgradeCosts': [30, 40, 50, 60],
    'cityReserveCapacityPerLevel': 4,
    'initialSoldiersPerHero': 4,
    'soldierRecruitCost': 1,
    'soldierRecruitBatchSize': 10,
    'heroSoldierLimit': 4,
    'initialHeroSoldiers': 0,
    'recruitedHeroSoldiers': 0,
    'heroDrawCost': 5,
    'recycleDefeatedHeroes': true,
    'cityDefenseAttackBonuses': [1, 3, 5, 8, 10],
    'cityDefenseMoraleBonuses': [5, 10, 15, 20, 25],
    'battleRecoilDifferenceScale': 0.25,
    'cityDefenseRecoilScale': 0.0,
    'battleMoralePowerScale': 6,
    'battleUseMorale': true,
    'battleMoraleDrainPerSecond': 12.0,
    'battleMoraleDrainRandomRange': 4.0,
    'battleWallDamageScale': 0.5,
    'fieldEncounterDistance': 16.0,
    'mountainHeroAttackFactor': 1.0,
    'riverHeroAttackFactor': 1.0,
    'grassHeroAttackFactor': 1.0,
    'fieldBattleHistoryLimit': 16,
    'baseMarchSpeed': 22.0,
    'heroWalkFrameSeconds': 0.2,
    'grassSpeedFactor': 0.75,
    'mountainSpeedFactor': 0.2,
    'waterSpeedFactor': 0.4,
    'battleFormationFrames': 163,
    'cityDamageChancePerVictory': 1.0,
    'nationalAi': const AiTuning().toJson(),
  };

  static Map<String, Object?> _values = _cloneMap(_defaults);
  static AiTuning _nationalAi = const AiTuning();

  /// 从 JSON5 文本加载全局规则，并在加载完成前保持旧配置不变。
  static void loadJson(String source) {
    final decoded = json5Decode(source);
    if (decoded is! Map) {
      throw const FormatException('game_config.json 顶层必须是对象');
    }
    loadMap(Map<String, dynamic>.from(decoded));
  }

  /// 从已解码对象加载全局规则，缺失字段使用内置兼容默认值。
  static void loadMap(Map<String, dynamic> source) {
    final merged = _cloneMap(_defaults);
    for (final entry in source.entries) {
      if (entry.key == 'nationalAi' && entry.value is Map) {
        merged[entry.key] = {
          ...(_cloneMap(_defaults['nationalAi'] as Map)),
          ..._cloneMap(entry.value as Map),
        };
      } else {
        merged[entry.key] = _clone(entry.value);
      }
    }
    _validate(merged);
    _values = Map.unmodifiable(merged);
    _nationalAi = AiTuning.fromJson(
      Map<String, dynamic>.from(_map('nationalAi')),
    );
  }

  /// 导出当前配置，用于存档签名和 AI Worker 初始化。
  static Map<String, Object?> toJson() => _cloneMap(_values);

  /// 国家 AI 的反应、工作量和风险预算；不改变实际战斗规则。
  static AiTuning get nationalAi => _nationalAi;

  /// 初始年份。
  static int get initialYear => _int('initialYear');

  /// 初始月份，范围为 1 到 12。
  static int get initialMonth => _int('initialMonth');

  /// 每月持续的真实秒数。
  static double get secondsPerMonth => _double('secondsPerMonth');

  /// 未单独配置的国家使用的初始金币。
  static int get initialGold => _int('initialGold');

  /// 其他国家是否自动经营和出征，玩家国家仍由玩家操作。
  static bool get countryAiEnabled => _bool('countryAiEnabled');

  /// 开局即开始决策，首次各国依次占用一个逻辑帧。
  static double get countryAiInitialDelay => _double('countryAiInitialDelay');

  /// 国家经营和出征决策间隔，避免逐帧扫描招募和购买。
  static double get countryAiInterval => _double('countryAiInterval');

  /// 自动出征至少携带的小兵数，默认配满四兵再出发。
  static int get countryAiMinimumSoldiers => _int('countryAiMinimumSoldiers');

  /// 待签约结果保留的月数。
  static int get heroOfferValidMonths => _int('heroOfferValidMonths');

  /// 同国 AI 将领实际离城的最短间隔，单位为游戏秒。
  static double get aiDepartureInterval => _double('aiDepartureInterval');

  /// 电脑在已预留月俸之外保留的应急金币。
  static int get countryAiEmergencyGold => _int('countryAiEmergencyGold');

  /// 预算至少覆盖一个月再加这段时间。
  static double get countryAiBudgetSafetySeconds =>
      _double('countryAiBudgetSafetySeconds');

  /// 每位守将预估的交战时间，用于任务时限。
  static double get countryAiBattleBudgetSeconds =>
      _double('countryAiBattleBudgetSeconds');

  /// 进攻目标的距离衰减尺度，单位秒。
  static double get countryAiTargetTravelScale =>
      _double('countryAiTargetTravelScale');

  /// 行军时间的权重衰减指数。
  static double get countryAiTargetDistancePower =>
      _double('countryAiTargetDistancePower');

  /// 国家军力的比较尺度。
  static double get countryAiStrengthScale => _double('countryAiStrengthScale');

  /// 弱国优先权重。
  static double get countryAiWeaknessPower => _double('countryAiWeaknessPower');

  /// 每支敌军实际抵达城下或每场野战引起的仇恨增量。
  static int get countryHatredPerAttack => _int('countryHatredPerAttack');

  /// 两国之间的仇恨上限。
  static int get countryHatredMaximum => _int('countryHatredMaximum');

  /// 每点仇恨增加的反击目标权重。
  static double get countryHatredWeightPerPoint =>
      _double('countryHatredWeightPerPoint');

  /// 正常、欠收、丰收的概率权重。
  static int get normalHarvestWeight => _int('normalHarvestWeight');
  static int get poorHarvestWeight => _int('poorHarvestWeight');
  static int get abundantHarvestWeight => _int('abundantHarvestWeight');

  /// 正式地图一级城池的正常月产出。
  static int get cityBaseIncome => _int('cityBaseIncome');

  /// 城防升级带来的月收入增量。
  static int get cityIncomePerLevel => _int('cityIncomePerLevel');

  /// 未单独配置国家时的月保底。
  static int get countryMonthlyIncome => _int('countryMonthlyIncome');

  /// 外国城池的收入及城防兵员容量倍率。
  static double get foreignCityYieldFactor => _double('foreignCityYieldFactor');

  /// 满生命、满兵力时的撤退成功率。
  static double get retreatBaseSuccessChance =>
      _double('retreatBaseSuccessChance');

  /// 每少一名士兵或每损失四分之一生命扣除的撤退成功率。
  static double get retreatConditionPenalty =>
      _double('retreatConditionPenalty');

  /// 发起撤退后双方退回开场位置的秒数。
  static double get retreatExitSeconds => _double('retreatExitSeconds');

  /// 双方回到起点后，成功结果停留的秒数。
  static double get retreatResultSeconds => _double('retreatResultSeconds');

  /// 高级电脑将领至少观察的碰撞轮数。
  static int get aiRetreatMinimumClashes => _int('aiRetreatMinimumClashes');

  /// 预计自身可承受轮数低于敌方此比例时考虑撤退。
  static double get aiRetreatSurvivalRatio => _double('aiRetreatSurvivalRatio');

  /// 生命严格低于此比例且胜算渺茫时考虑撤退。
  static double get aiRetreatHealthRatio => _double('aiRetreatHealthRatio');

  /// 已接近本国城池的敌军警戒距离。
  static double get aiThreatDistance => _double('aiThreatDistance');

  /// 一次轮攻最多投入的将领数。
  static int get aiMaximumRaidHeroes => _int('aiMaximumRaidHeroes');

  /// 每次选择目标最多精算的路线数。
  static int get aiTargetShortlist => _int('aiTargetShortlist');

  /// 路线估时缓存上限。
  static int get aiTravelCacheSize => _int('aiTravelCacheSize');

  /// 失败远征后重新筹备的间隔。
  static double get aiRaidRetrySeconds => _double('aiRaidRetrySeconds');

  /// 国家每月丰欠收随机增减额的下限和上限。
  static int get harvestAdjustmentMin => _int('harvestAdjustmentMin');
  static int get harvestAdjustmentMax => _int('harvestAdjustmentMax');

  /// 月末是否继续扣除存活英雄的报酬。
  static bool get chargeHeroSalary => _bool('chargeHeroSalary');

  /// 每座城免维持费的驻军人数。
  static int get freeGarrisonHeroes => _int('freeGarrisonHeroes');

  /// 额外驻军费系数。
  static int get garrisonUpkeepFactor => _int('garrisonUpkeepFactor');

  /// 城池最高等级。
  static int get maxCityLevel => _int('maxCityLevel');

  /// 第一年可通过升级达到的最高城防。
  static int get firstYearCityUpgradeLimit => _int('firstYearCityUpgradeLimit');

  /// 每过一年新增的可升级城防等级。
  static int get cityUpgradeLevelsPerYear => _int('cityUpgradeLevelsPerYear');

  /// 依次为一升二至四升五的基础费用。
  static List<int> get cityUpgradeCosts => _ints('cityUpgradeCosts');

  /// 每一级城防贡献给全国兵员上限的容量。
  static int get cityReserveCapacityPerLevel =>
      _int('cityReserveCapacityPerLevel');

  /// 开局每位实际登场将领贡献的兵员数。
  static int get initialSoldiersPerHero => _int('initialSoldiersPerHero');

  /// 征募一个储备兵员的价格。
  static int get soldierRecruitCost => _int('soldierRecruitCost');

  /// 城池面板每次点击最多征募的人数。
  static int get soldierRecruitBatchSize => _int('soldierRecruitBatchSize');

  /// 每名英雄最多随行的兵员数。
  static int get heroSoldierLimit => _int('heroSoldierLimit');

  /// 驻城英雄的初始随行兵数。
  static int get initialHeroSoldiers => _int('initialHeroSoldiers');

  /// 新签约英雄的初始随行兵数。
  static int get recruitedHeroSoldiers => _int('recruitedHeroSoldiers');

  /// 每次抽取英雄的费用。
  static int get heroDrawCost => _int('heroDrawCost');

  /// 阵亡、失城被移除的非主角英雄是否回到回收池。
  static bool get recycleDefeatedHeroes => _bool('recycleDefeatedHeroes');

  /// 一至五级城防攻击加成。
  static List<int> get cityDefenseAttackBonuses =>
      _ints('cityDefenseAttackBonuses');

  /// 一至五级城防士气加成。
  static List<int> get cityDefenseMoraleBonuses =>
      _ints('cityDefenseMoraleBonuses');

  /// 按有效城防等级读取守城士气。
  static int cityDefenseMoraleBonusFor(int level) =>
      cityDefenseMoraleBonuses[(level - 1).clamp(
        0,
        cityDefenseMoraleBonuses.length - 1,
      )];

  /// 按有效城防等级读取城防攻击加成。
  static int cityDefenseAttackBonusFor(int level) =>
      cityDefenseAttackBonuses[(level - 1).clamp(
        0,
        cityDefenseAttackBonuses.length - 1,
      )];

  /// 缩小碰撞强度差对击退速度的影响。
  static double get battleRecoilDifferenceScale =>
      _double('battleRecoilDifferenceScale');

  /// 城防攻击参与击退差值的倍率。
  static double get cityDefenseRecoilScale => _double('cityDefenseRecoilScale');

  /// 随机蓄力的碰撞强度倍率。
  static int get battleMoralePowerScale => _int('battleMoralePowerScale');

  /// 是否启用士气消耗、蓄力与冲击加成。
  static bool get battleUseMorale => _bool('battleUseMorale');

  /// 每秒基础士气消耗。
  static double get battleMoraleDrainPerSecond =>
      _double('battleMoraleDrainPerSecond');

  /// 每秒士气消耗的随机幅度。
  static double get battleMoraleDrainRandomRange =>
      _double('battleMoraleDrainRandomRange');

  /// 撞墙伤害相对普通攻击强度的倍率。
  static double get battleWallDamageScale => _double('battleWallDamageScale');

  /// 敌对部队中心相距一个人物宽度时触发野战。
  static double get fieldEncounterDistance => _double('fieldEncounterDistance');

  /// 山地野战中的将领攻击倍率。
  static double get mountainHeroAttackFactor =>
      _double('mountainHeroAttackFactor');

  /// 河流野战中的将领攻击倍率。
  static double get riverHeroAttackFactor => _double('riverHeroAttackFactor');

  /// 草地野战中的将领攻击倍率。
  static double get grassHeroAttackFactor => _double('grassHeroAttackFactor');

  /// 地图保留的最近野战记录数。
  static int get fieldBattleHistoryLimit => _int('fieldBattleHistoryLimit');

  /// 地图基础行军速度。
  static double get baseMarchSpeed => _double('baseMarchSpeed');

  /// 地图步行动画每帧持续的秒数。
  static double get heroWalkFrameSeconds => _double('heroWalkFrameSeconds');

  /// 草地、树林和土路的行军倍率。
  static double get grassSpeedFactor => _double('grassSpeedFactor');

  /// 山地行军倍率。
  static double get mountainSpeedFactor => _double('mountainSpeedFactor');

  /// 河流行军倍率。
  static double get waterSpeedFactor => _double('waterSpeedFactor');

  /// 原版进入提示及介绍等待的逻辑帧数。
  static int get battleFormationFrames => _int('battleFormationFrames');

  /// 每个非互刺胜轮降低实际城防的概率。
  static double get cityDamageChancePerVictory =>
      _double('cityDamageChancePerVictory');

  /// 当前年份的升级上限，封顶于配置的最高等级。
  static int cityUpgradeLimitForYear(int year) =>
      (firstYearCityUpgradeLimit +
              (year - initialYear).clamp(0, maxCityLevel) *
                  cityUpgradeLevelsPerYear)
          .clamp(1, maxCityLevel);

  static int _int(String key) => _value(key) as int;
  static double _double(String key) => (_value(key) as num).toDouble();
  static bool _bool(String key) => _value(key) as bool;
  static List<int> _ints(String key) =>
      List<int>.unmodifiable((_value(key) as List).cast<int>());
  static Map<String, Object?> _map(String key) =>
      Map<String, Object?>.from(_value(key) as Map);
  static Object? _value(String key) => _values[key];

  static void _validate(Map<String, Object?> values) {
    final costs = values['cityUpgradeCosts'];
    final attack = values['cityDefenseAttackBonuses'];
    final morale = values['cityDefenseMoraleBonuses'];
    if (costs is! List ||
        costs.length != 4 ||
        attack is! List ||
        attack.length != 5 ||
        morale is! List ||
        morale.length != 5) {
      throw const FormatException('game_config.json 的城池数组长度不正确');
    }
    if ((values['maxCityLevel'] as int) != attack.length ||
        (values['maxCityLevel'] as int) != morale.length) {
      throw const FormatException('最高城池等级必须与城防加成数组长度一致');
    }
    if ((values['initialMonth'] as int) < 1 ||
        (values['initialMonth'] as int) > 12 ||
        (values['secondsPerMonth'] as num) <= 0 ||
        (values['maxCityLevel'] as int) < 1) {
      throw const FormatException('game_config.json 包含非法的时间或城池等级');
    }
  }

  static Map<String, Object?> _cloneMap(Map source) => {
    for (final entry in source.entries)
      entry.key.toString(): _clone(entry.value),
  };

  static Object? _clone(Object? value) => switch (value) {
    Map() => _cloneMap(value),
    List() => [for (final item in value) _clone(item)],
    _ => value,
  };
}

/// 从玩法 JSON 读取的国家开局资金与每月保底。
class CountryConfig {
  /// 创建国家资金配置；显式传入的值优先于全局默认值。
  const CountryConfig({this.initialGold = 50, this.monthlyBaseIncome = 10})
    : assert(initialGold >= 0),
      assert(monthlyBaseIncome >= 10 && monthlyBaseIncome <= 30);

  /// 按当前 `GameConfig` 创建国家默认资金配置。
  factory CountryConfig.fromGameConfig() => CountryConfig(
    initialGold: GameConfig.initialGold,
    monthlyBaseIncome: GameConfig.countryMonthlyIncome,
  );

  /// 国家初始金币，多座城共用同一个国库。
  final int initialGold;

  /// 该国每月固定收入，JSON 可配置为十至三十金币。
  final int monthlyBaseIncome;
}
