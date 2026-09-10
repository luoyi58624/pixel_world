/// 国家规划的工作量、反应和风险配置，不改变双方真实游戏规则。
class AiTuning {
  /// 默认预算限制每次候选展开与路线积分，普通改令保留承诺期。
  const AiTuning({
    this.intervalSeconds = 8,
    this.resourceIntervalSeconds = 30,
    this.resourceCashBuffer = 12,
    this.maxPayrollIncomeRatio = .5,
    this.threatSeconds = 24,
    this.urgentSeconds = 6,
    this.reactionMargin = 1.5,
    this.commitmentSeconds = 10,
    this.rearStagingExtra = 1,
    this.maxCandidates = 96,
    this.maxAssessments = 160,
    this.maxRouteSteps = 6000,
    this.maxPlans = 8,
    this.maxCommands = 24,
    this.maxTeam = 4,
    this.maxOffensiveFronts = 2,
    this.singleFrontMonths = 12,
    this.splitForceRatio = 2.25,
    this.splitAdvantageMargin = .3,
    this.raidArrivalSpread = 20,
    this.maxExpeditionSeconds = 900,
    this.assaultCommitDistance = 64,
    this.recallCriticalMargin = .25,
    this.attritionCombatCeiling = 8,
    this.attritionMinImprovement = .06,
    this.maxTargets = 6,
    this.maxSliceSteps = 8,
    this.advantageMargin = .12,
    this.expansionMargin = .05,
    this.laterWeaponCredit = .35,
    this.maximumRequestAge = 3,
    this.workerTimeoutMs = 2500,
    this.maxRestarts = 2,
    this.stagnationSeconds = 60,
  });

  /// 决策间隔、观察窗口、紧急窗口及反应安全余量。
  final double intervalSeconds, threatSeconds, urgentSeconds, reactionMargin;

  /// 全国资源整理频率和常规采购后保留的最低流动金币。
  final double resourceIntervalSeconds;
  final int resourceCashBuffer;

  /// AI 外聘月俸最多占正常月收入的一半，为征兵、兵器和粮草留出长期现金流。
  final double maxPayrollIncomeRatio;

  /// 普通任务承诺期与最大观察年龄。
  final double commitmentSeconds, maximumRequestAge;

  /// 和平后方整备时，招募容量之外暂存的额外将领数；到期必须疏散。
  final int rearStagingExtra;

  /// 每个请求的候选、属性评估、地形步、完整方案与命令上限。
  final int maxCandidates, maxAssessments, maxRouteSteps, maxPlans, maxCommands;

  /// 编队、候选目标和每次让出后台事件循环的步骤数。
  final int maxTeam, maxTargets, maxSliceSteps;

  /// 同时进攻的战线数，以及允许分兵时主战线的最低静态战力倍数。
  final int maxOffensiveFronts;

  /// 开局前多少个月只保留一条主攻战线。
  final int singleFrontMonths;
  final double splitForceRatio;

  /// 第二路必须独立达到的保守优势，编队最早与最晚抵达相差的秒数。
  final double splitAdvantageMargin, raidArrivalSpread;

  /// 覆盖四将轮攻五级城的保守排队预算，现金预测采用相同上限。
  final double maxExpeditionSeconds;

  /// 临敌城保护距离；召回远征要求连最有利的守城评估也明显落后。
  final double assaultCommitDistance, recallCriticalMargin;

  /// 按实际攻击力筛选消耗将领，并要求武器能明显改善接下来的守城余量。
  final int attritionCombatCeiling;
  final double attritionMinImprovement;

  /// 明显优势门槛与后续概率武器的保守折算，不代表统计胜率。
  final double advantageMargin, laterWeaponCredit;

  /// 低城防单守将的普通扩张允许有限风险，仍要求保守余量为正。
  final double expansionMargin;

  /// 后端超时与最大重启次数。
  final int workerTimeoutMs, maxRestarts;

  /// 无实质进展的诊断时间。
  final double stagnationSeconds;

  /// 序列化策略参数。
  Map<String, Object?> toJson() => {
    'interval': intervalSeconds,
    'resourceInterval': resourceIntervalSeconds,
    'cashBuffer': resourceCashBuffer,
    'payrollRatio': maxPayrollIncomeRatio,
    'threat': threatSeconds,
    'urgent': urgentSeconds,
    'margin': reactionMargin,
    'commit': commitmentSeconds,
    'rearExtra': rearStagingExtra,
    'candidates': maxCandidates,
    'assessments': maxAssessments,
    'routes': maxRouteSteps,
    'plans': maxPlans,
    'commands': maxCommands,
    'team': maxTeam,
    'fronts': maxOffensiveFronts,
    'singleFrontMonths': singleFrontMonths,
    'splitForce': splitForceRatio,
    'splitAdvantage': splitAdvantageMargin,
    'arrivalSpread': raidArrivalSpread,
    'expeditionSeconds': maxExpeditionSeconds,
    'assaultCommitDistance': assaultCommitDistance,
    'recallCriticalMargin': recallCriticalMargin,
    'attritionCombat': attritionCombatCeiling,
    'attritionGain': attritionMinImprovement,
    'targets': maxTargets,
    'slice': maxSliceSteps,
    'advantage': advantageMargin,
    'expansion': expansionMargin,
    'credit': laterWeaponCredit,
    'age': maximumRequestAge,
    'timeout': workerTimeoutMs,
    'restarts': maxRestarts,
    'stagnation': stagnationSeconds,
  };

  /// 解码初始化时下发的策略参数。
  factory AiTuning.fromJson(Map<String, dynamic> d) => AiTuning(
    intervalSeconds: (d['interval'] as num).toDouble(),
    resourceIntervalSeconds: (d['resourceInterval'] as num? ?? 30).toDouble(),
    resourceCashBuffer: d['cashBuffer'] as int? ?? 12,
    maxPayrollIncomeRatio: (d['payrollRatio'] as num? ?? .5).toDouble(),
    threatSeconds: (d['threat'] as num).toDouble(),
    urgentSeconds: (d['urgent'] as num).toDouble(),
    reactionMargin: (d['margin'] as num).toDouble(),
    commitmentSeconds: (d['commit'] as num).toDouble(),
    rearStagingExtra: d['rearExtra'] as int? ?? 1,
    maxCandidates: d['candidates'],
    maxAssessments: d['assessments'],
    maxRouteSteps: d['routes'],
    maxPlans: d['plans'],
    maxCommands: d['commands'],
    maxTeam: d['team'],
    maxOffensiveFronts: d['fronts'] as int? ?? 2,
    singleFrontMonths: d['singleFrontMonths'] as int? ?? 12,
    splitForceRatio: (d['splitForce'] as num? ?? 2.25).toDouble(),
    splitAdvantageMargin: (d['splitAdvantage'] as num? ?? .3).toDouble(),
    raidArrivalSpread: (d['arrivalSpread'] as num? ?? 20).toDouble(),
    maxExpeditionSeconds: (d['expeditionSeconds'] as num? ?? 900).toDouble(),
    assaultCommitDistance: (d['assaultCommitDistance'] as num? ?? 64)
        .toDouble(),
    recallCriticalMargin: (d['recallCriticalMargin'] as num? ?? .25).toDouble(),
    attritionCombatCeiling: d['attritionCombat'] as int? ?? 8,
    attritionMinImprovement: (d['attritionGain'] as num? ?? .06).toDouble(),
    maxTargets: d['targets'],
    maxSliceSteps: d['slice'],
    advantageMargin: (d['advantage'] as num).toDouble(),
    expansionMargin: (d['expansion'] as num).toDouble(),
    laterWeaponCredit: (d['credit'] as num).toDouble(),
    maximumRequestAge: (d['age'] as num).toDouble(),
    workerTimeoutMs: d['timeout'],
    maxRestarts: d['restarts'],
    stagnationSeconds: (d['stagnation'] as num).toDouble(),
  );
}
