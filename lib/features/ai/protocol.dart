import 'geometry.dart';
import 'observation.dart';

/// 消息协议版本；改变格式必须同时重建 UI 与 Worker。
const aiProtocolVersion = 1;

/// 正式调度按资源、防守、进攻串行执行；完整周期供独立评估测试使用。
enum AiDecisionStage { full, resources, defense, attack }

/// 玩家与电脑都能执行的命令类别，不包含修改生命或强制脱战。
enum AiActionKind {
  upgrade,
  dismiss,
  recruit,
  soldiers,
  buyWeapon,
  dispatch,
  move,
  camp,
  retreat,
}

/// 一条建议，实际执行仍调用战役的合法命令。
class AiAction {
  /// 创建建议。
  const AiAction(
    this.kind, {
    this.hero,
    this.city,
    this.point,
    this.amount = 0,
    this.weaponIds = const [],
  });

  /// 指令类型与参数。
  final AiActionKind kind;
  final String? hero;
  final int? city;
  final AiPoint? point;
  final int amount;
  final List<int> weaponIds;

  /// 跨平台命令记录。
  Map<String, Object?> toJson() => {
    'kind': kind.index,
    'hero': hero,
    'city': city,
    'point': point?.toJson(),
    'amount': amount,
    'weapons': weaponIds,
  };

  /// 解码建议。
  factory AiAction.fromJson(Map<String, dynamic> d) => AiAction(
    AiActionKind.values[d['kind']],
    hero: d['hero'],
    city: d['city'],
    point: d['point'] == null ? null : AiPoint.fromJson(d['point']),
    amount: d['amount'],
    weaponIds: List<int>.from(d['weapons']),
  );
}

/// 将领的持续任务，移动目的地只是其中一个阶段。
class ArmyTask {
  /// 创建任务及不可重复承诺的资源。
  ArmyTask({
    required this.hero,
    required this.role,
    required this.deadlineTick,
    required this.committedUntil,
    this.city,
    this.enemy,
    this.points = const [],
    this.leg = 0,
    this.gold = 0,
    this.arrivalSlot = false,
    this.rearStaging = false,
    this.reason = '',
    this.expectedOrderRevision = 0,
    this.targetCountry,
    this.attrition = false,
  });

  /// 所属英雄、任务角色与意图。
  final String hero, role, reason;

  /// 目标城市或可见敌军。
  final int? city;

  /// 上次评估的目标国家，城池易主时重新评估进攻而非直接返程。
  final int? targetCountry;

  /// 消耗行动只承诺削弱来敌或突破前排，不能据此宣布已经守住或攻下城池。
  final bool attrition;
  final String? enemy;

  /// 合法分段路线及当前路段。
  final List<AiPoint> points;
  final int leg;

  /// 截止时间、普通改令承诺期与预留路费。
  final int deadlineTick, committedUntil, gold;

  /// 是否预留入城名额及接管时的己方命令版本。
  final bool arrivalSlot;

  /// 规划已核算和平时期的临时整备名额，实际入城仍须复查威胁和容量。
  final bool rearStaging;
  final int expectedOrderRevision;

  /// 推进路段时保留全部其他任务属性。
  ArmyTask withLeg(int next, int revision) => ArmyTask(
    hero: hero,
    role: role,
    deadlineTick: deadlineTick,
    committedUntil: committedUntil,
    city: city,
    enemy: enemy,
    points: points,
    leg: next,
    gold: gold,
    arrivalSlot: arrivalSlot,
    rearStaging: rearStaging,
    reason: reason,
    expectedOrderRevision: revision,
    targetCountry: targetCountry,
    attrition: attrition,
  );

  /// 跨平台任务记录。
  Map<String, Object?> toJson() => {
    'hero': hero,
    'role': role,
    'deadline': deadlineTick,
    'commit': committedUntil,
    'city': city,
    'enemy': enemy,
    'points': [for (final p in points) p.toJson()],
    'leg': leg,
    'gold': gold,
    'slot': arrivalSlot,
    'rearStaging': rearStaging,
    'reason': reason,
    'order': expectedOrderRevision,
    'targetCountry': targetCountry,
    'attrition': attrition,
  };

  /// 解码任务。
  factory ArmyTask.fromJson(Map<String, dynamic> d) => ArmyTask(
    hero: d['hero'],
    role: d['role'],
    deadlineTick: d['deadline'],
    committedUntil: d['commit'],
    city: d['city'],
    enemy: d['enemy'],
    points: [for (final p in d['points']) AiPoint.fromJson(p)],
    leg: d['leg'],
    gold: d['gold'],
    arrivalSlot: d['slot'],
    rearStaging: d['rearStaging'] as bool? ?? false,
    reason: d['reason'],
    expectedOrderRevision: d['order'],
    targetCountry: d['targetCountry'] as int?,
    attrition: d['attrition'] as bool? ?? false,
  );
}

/// 原子命令阶段中的复合操作，任一步失败停止其后续依赖。
class AiCommandGroup {
  /// 记录依赖实体、保底现金与成功后建立的任务。
  AiCommandGroup({
    required this.reason,
    required this.actions,
    this.dependencies = const {},
    this.tasks = const [],
    this.minimumGold = 0,
    this.emergency = false,
  });

  /// 动作次序、版本前提、任务及理由。
  final String reason;
  final List<AiAction> actions;
  final Map<String, String> dependencies;
  final List<ArmyTask> tasks;

  /// 整组执行后必须保留的现金；应急允许动用普通缓冲。
  final int minimumGold;
  final bool emergency;

  /// 跨平台操作组。
  Map<String, Object?> toJson() => {
    'reason': reason,
    'actions': [for (final a in actions) a.toJson()],
    'deps': dependencies,
    'tasks': [for (final t in tasks) t.toJson()],
    'floor': minimumGold,
    'emergency': emergency,
  };

  /// 解码操作组。
  factory AiCommandGroup.fromJson(Map<String, dynamic> d) => AiCommandGroup(
    reason: d['reason'],
    actions: [
      for (final a in d['actions'])
        AiAction.fromJson(Map<String, dynamic>.from(a)),
    ],
    dependencies: Map<String, String>.from(d['deps']),
    tasks: [
      for (final t in d['tasks'])
        ArmyTask.fromJson(Map<String, dynamic>.from(t)),
    ],
    minimumGold: d['floor'],
    emergency: d['emergency'],
  );
}

/// 一国的完整建议；风险描述不是试打胜率。
class CountryPlan {
  /// 创建有界计划。
  CountryPlan({
    this.phase = 'preparing',
    this.targetCity,
    this.requiredGold = 0,
    this.requiredHeroes = 1,
    this.groups = const [],
    this.notes = const [],
    this.budgetLimited = false,
    this.assessments = 0,
    this.routeSteps = 0,
    this.expansions = 0,
  });

  /// 战略方向、目标和筹备条件。
  final String phase;
  final int? targetCity;
  final int requiredGold, requiredHeroes;

  /// 经过资源账本核算的操作及解释。
  final List<AiCommandGroup> groups;
  final List<String> notes;

  /// 工作量及预算截断标记。
  final bool budgetLimited;
  final int assessments, routeSteps, expansions;

  /// 跨平台计划。
  Map<String, Object?> toJson() => {
    'phase': phase,
    'target': targetCity,
    'gold': requiredGold,
    'heroes': requiredHeroes,
    'groups': [for (final g in groups) g.toJson()],
    'notes': notes,
    'limited': budgetLimited,
    'assessments': assessments,
    'routeSteps': routeSteps,
    'expansions': expansions,
  };

  /// 解码计划。
  factory CountryPlan.fromJson(Map<String, dynamic> d) => CountryPlan(
    phase: d['phase'],
    targetCity: d['target'],
    requiredGold: d['gold'],
    requiredHeroes: d['heroes'],
    groups: [
      for (final g in d['groups'])
        AiCommandGroup.fromJson(Map<String, dynamic>.from(g)),
    ],
    notes: List<String>.from(d['notes']),
    budgetLimited: d['limited'],
    assessments: d['assessments'],
    routeSteps: d['routeSteps'],
    expansions: d['expansions'],
  );
}

/// 一次国家决策请求；只包含冻结观察及本国已知任务。
class AiRequest {
  /// 创建带会话、规则和截止时间的请求。
  AiRequest({
    required this.session,
    required this.id,
    required this.rulesVersion,
    required this.mapVersion,
    required this.observation,
    required this.deadlineTick,
    this.tasks = const [],
    this.seed = 0,
    this.priority = 0,
    this.idleCycles = 0,
    this.stage = AiDecisionStage.full,
    this.offensiveCountry,
    this.offensiveCity,
  });

  /// 会话及静态数据版本。
  final String session, rulesVersion, mapVersion;

  /// 请求编号、截止时刻、独立偏好种子、优先级与停滞周期。
  final int id, deadlineTick, seed, priority, idleCycles;

  /// 当前国家本轮允许执行的调度阶段。
  final AiDecisionStage stage;

  /// 持续灭国目标独立于临时防守，原目标灭国后才释放锁定。
  final int? offensiveCountry, offensiveCity;

  /// 一致观察及已执行的持续任务。
  final AiObservation observation;
  final List<ArmyTask> tasks;

  /// 决策国。
  int get country => observation.country;

  /// 序列化请求。
  Map<String, Object?> toJson() => {
    'protocol': aiProtocolVersion,
    'session': session,
    'id': id,
    'rules': rulesVersion,
    'map': mapVersion,
    'observation': observation.toJson(),
    'deadline': deadlineTick,
    'tasks': [for (final t in tasks) t.toJson()],
    'seed': seed,
    'priority': priority,
    'idle': idleCycles,
    'stage': stage.name,
    'offensiveCountry': offensiveCountry,
    'offensiveCity': offensiveCity,
  };

  /// 解码请求并检查协议。
  factory AiRequest.fromJson(Map<String, dynamic> d) {
    if (d['protocol'] != aiProtocolVersion) {
      throw const FormatException('AI 协议版本不匹配');
    }
    return AiRequest(
      session: d['session'],
      id: d['id'],
      rulesVersion: d['rules'],
      mapVersion: d['map'],
      observation: AiObservation.fromJson(
        Map<String, dynamic>.from(d['observation']),
      ),
      deadlineTick: d['deadline'],
      tasks: [
        for (final t in d['tasks'])
          ArmyTask.fromJson(Map<String, dynamic>.from(t)),
      ],
      seed: d['seed'],
      priority: d['priority'],
      idleCycles: d['idle'],
      stage: AiDecisionStage.values.byName(d['stage'] as String? ?? 'full'),
      offensiveCountry: d['offensiveCountry'] as int?,
      offensiveCity: d['offensiveCity'] as int?,
    );
  }
}

/// 无需携带原世界快照的异步回复。
class AiReply {
  /// 将请求身份绑定到计划。
  AiReply.forRequest(
    AiRequest r,
    this.plan, {
    this.planningMicros = 0,
    this.error,
  }) : session = r.session,
       id = r.id,
       country = r.country,
       rulesVersion = r.rulesVersion,
       mapVersion = r.mapVersion,
       observedTick = r.observation.tick,
       deadlineTick = r.deadlineTick;
  AiReply._(
    this.session,
    this.id,
    this.country,
    this.rulesVersion,
    this.mapVersion,
    this.observedTick,
    this.deadlineTick,
    this.plan,
    this.planningMicros,
    this.error,
  );

  /// 会话、版本、请求及时间身份。
  final String session, rulesVersion, mapVersion;
  final int id, country, observedTick, deadlineTick, planningMicros;

  /// 有界计划或明确失败原因。
  final CountryPlan plan;
  final String? error;

  /// 序列化回复。
  Map<String, Object?> toJson() => {
    'protocol': aiProtocolVersion,
    'session': session,
    'id': id,
    'country': country,
    'rules': rulesVersion,
    'map': mapVersion,
    'tick': observedTick,
    'deadline': deadlineTick,
    'plan': plan.toJson(),
    'micros': planningMicros,
    'error': error,
  };

  /// 解码回复并检查协议。
  factory AiReply.fromJson(Map<String, dynamic> d) {
    if (d['protocol'] != aiProtocolVersion) {
      throw const FormatException('AI 回复协议不匹配');
    }
    return AiReply._(
      d['session'],
      d['id'],
      d['country'],
      d['rules'],
      d['map'],
      d['tick'],
      d['deadline'],
      CountryPlan.fromJson(Map<String, dynamic>.from(d['plan'])),
      d['micros'],
      d['error'],
    );
  }
}
