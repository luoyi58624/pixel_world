/// 国家规划的工作量、反应和风险配置，不改变双方真实游戏规则。
class AiTuning {
  /// 默认预算限制每次候选展开与路线积分，普通改令保留承诺期。
  const AiTuning({
    this.intervalSeconds = 8,
    this.resourceIntervalSeconds = 30,
    this.resourceCashBuffer = 12,
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

  /// 普通任务承诺期与最大观察年龄。
  final double commitmentSeconds, maximumRequestAge;

  /// 和平后方整备时，招募容量之外暂存的额外将领数；到期必须疏散。
  final int rearStagingExtra;

  /// 每个请求的候选、属性评估、地形步、完整方案与命令上限。
  final int maxCandidates, maxAssessments, maxRouteSteps, maxPlans, maxCommands;

  /// 编队、候选目标和每次让出后台事件循环的步骤数。
  final int maxTeam, maxTargets, maxSliceSteps;

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
