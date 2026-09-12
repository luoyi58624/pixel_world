import 'geometry.dart';

/// 显式可见状态，不携带战斗内存或敌军隐藏命令。
enum AiArmyState {
  garrison,
  marching,
  camped,
  queue,
  attacking,
  defending,
  field,
  retreating,
}

/// 一名可观察英雄及其合法操作快照。
class AiHero {
  /// 由观察适配器创建。
  AiHero({
    required this.id,
    required this.country,
    required this.city,
    required this.order,
    required this.type,
    required this.hp,
    required this.maxHp,
    required this.combat,
    required this.politics,
    required this.salary,
    required this.position,
    this.velocity = const AiPoint(0, 0),
    this.state = AiArmyState.garrison,
    List<double> soldiers = const [],
    this.morale = 0,
    this.destination,
    this.targetCity,
    this.returnSeconds = 0,
    this.canDispatch = false,
    this.canMove = false,
    this.canDismiss = false,
    this.canUpgrade = false,
    this.canRetreat = false,
    this.marked = false,
    this.revision = '',
    this.orderRevision = 0,
    this.opponent,
    this.clashes = 0,
    this.received = 0,
    this.dealt = 0,
    this.returnPath = const [],
    this.regionCity,
    this.salaryPaidMonth = -1,
    this.movementPending = false,
  }) : soldiers = List.unmodifiable(soldiers);

  /// 解码不含领域对象的记录。
  factory AiHero.fromJson(Map<String, dynamic> d) => AiHero(
    id: d['id'],
    country: d['c'],
    city: d['home'],
    order: d['o'],
    type: d['t'],
    hp: (d['hp'] as num).toDouble(),
    maxHp: d['max'],
    combat: d['a'],
    politics: d['p'],
    salary: d['pay'],
    position: AiPoint.fromJson(d['xy']),
    velocity: AiPoint.fromJson(d['v']),
    state: AiArmyState.values[d['s']],
    soldiers: [for (final n in d['troops'] as List) (n as num).toDouble()],

    morale: (d['m'] as num).toDouble(),
    destination: d['to'] == null ? null : AiPoint.fromJson(d['to']),
    targetCity: d['target'],
    returnSeconds: (d['return'] as num).toDouble(),
    canDispatch: d['dispatch'],
    canMove: d['move'],
    canDismiss: d['dismiss'],
    canUpgrade: d['upgrade'],
    canRetreat: d['retreat'],
    marked: d['marked'],
    revision: d['rev'],
    orderRevision: d['orderRev'],
    opponent: d['opponent'],
    clashes: d['clashes'],
    received: (d['received'] as num).toDouble(),
    dealt: (d['dealt'] as num).toDouble(),

    returnPath: [for (final p in d['returnPath']) AiPoint.fromJson(p)],
    regionCity: d['regionCity'] as int?,
    salaryPaidMonth: d['salaryPaidMonth'] as int? ?? -1,
    movementPending: d['movementPending'] as bool? ?? false,
  );

  /// 身份、国家、所属城、显示顺序与类型；类型 0/1/2 为普通/高级/主角。
  final String id;
  final int country, city, order, type;

  /// 当前生命、初始生命与战斗/内政/月俸。
  final double hp;
  final int maxHp, combat, politics, salary;

  /// 公开位置和最近观察到的移动速度。
  final AiPoint position, velocity;

  /// 当前实际状态。
  final AiArmyState state;

  final List<double> soldiers;

  /// 已显示的士气。
  final double morale;

  /// 只允许己方携带的命令终点和目标城；敌方必须为空。
  final AiPoint? destination;
  final int? targetCity;

  /// 己方已锁定撤退的保守返程秒数。
  final double returnSeconds;

  /// 主环境按真实命令生成的权限。
  final bool canDispatch, canMove, canDismiss, canUpgrade, canRetreat, marked;

  /// 与普通坐标变化分开的实体及指令版本。
  final String revision;
  final int orderRevision;

  /// 已公开的对手、碰撞及上次伤害，不包含未来结果。
  final String? opponent;
  final int clashes;
  final double received, dealt;

  /// 仅己方撤退的已走过路线。
  final List<AiPoint> returnPath;

  /// 当前位置的地理辖区，属于公开地图信息，不包含敌军目的地。
  final int? regionCity;

  /// 招募时已经预付工资的月份，用于避免月末重复计费。
  final int salaryPaidMonth;

  /// 仅己方可见的出城排队或避让等待，原移动指令尚未结束。
  final bool movementPending;

  /// 是否占据城内迎战名额。
  bool get stationed =>
      state == AiArmyState.garrison || state == AiArmyState.defending;

  /// 与战役守城名单保持一致：内政、攻击降序，再按主角及固定名册顺序排列。
  static int compareDefenseOrder(AiHero a, AiHero b) {
    final politics = b.politics.compareTo(a.politics);
    if (politics != 0) return politics;
    final combat = b.combat.compareTo(a.combat);
    if (combat != 0) return combat;
    if ((a.type == 2) != (b.type == 2)) return a.type == 2 ? -1 : 1;
    return a.order.compareTo(b.order);
  }

  /// 活着的小兵数量。
  int get soldierCount => soldiers.where((n) => n > 0).length;

  /// 总体当前承伤资源。
  double get health => hp + soldiers.fold(0.0, (a, b) => a + b);

  /// 跨平台记录。
  Map<String, Object?> toJson() => {
    'id': id,
    'c': country,
    'home': city,
    'o': order,
    't': type,
    'hp': hp,
    'max': maxHp,
    'a': combat,
    'p': politics,
    'pay': salary,
    'xy': position.toJson(),
    'v': velocity.toJson(),
    's': state.index,
    'troops': soldiers,
    'm': morale,
    'to': destination?.toJson(),
    'target': targetCity,
    'return': returnSeconds,
    'dispatch': canDispatch,
    'move': canMove,
    'dismiss': canDismiss,
    'upgrade': canUpgrade,
    'retreat': canRetreat,
    'marked': marked,
    'rev': revision,
    'orderRev': orderRevision,
    'opponent': opponent,
    'clashes': clashes,
    'received': received,
    'dealt': dealt,
    'returnPath': [for (final p in returnPath) p.toJson()],
    'regionCity': regionCity,
    'salaryPaidMonth': salaryPaidMonth,
    'movementPending': movementPending,
  };
}

/// 城池公开状态，安全名额不随本场中途升级增加。
class AiCity {
  /// 创建城池视图。
  AiCity({
    required this.id,
    required this.country,
    required this.nativeCountry,
    required this.level,
    required this.center,
    required this.outline,
    required this.income,
    required this.poorIncome,
    required this.capacityContribution,
    required this.rearStagingCapacity,
    required this.recruitAllowed,
    required this.revision,
    this.neighborCities,
    this.baseIncome = 10,
    this.upgradeAllowed = true,
    this.initialBattleLevel,
    this.victories = 0,
    this.attacker,
    this.defender,
    this.battleStage = '',
    this.nextWaveSeconds = 0,
    this.defenderFallen = false,
    this.dangerSeconds = 0,
  });

  /// 解码城市记录。
  factory AiCity.fromJson(Map<String, dynamic> d) => AiCity(
    id: d['id'],
    country: d['c'],
    nativeCountry: d['native'],
    level: d['level'],
    center: AiPoint.fromJson(d['xy']),
    outline: AiOutline([
      for (final p in d['outline'] as List) AiPoint.fromJson(p),
    ]),
    income: d['income'],
    poorIncome: d['poor'],
    capacityContribution: d['cap'],
    rearStagingCapacity: d['recruitCap'],
    neighborCities: (d['neighbors'] as List?)?.cast<int>(),
    recruitAllowed: d['recruit'],
    upgradeAllowed: d['upgrade'] as bool? ?? true,
    revision: d['rev'],
    baseIncome: d['baseIncome'],
    initialBattleLevel: d['initial'],
    victories: d['wins'],
    attacker: d['attacker'],
    defender: d['defender'],
    battleStage: d['stage'],
    nextWaveSeconds: (d['next'] as num).toDouble(),
    defenderFallen: d['fallen'] as bool? ?? false,
    dangerSeconds: (d['danger'] as num).toDouble(),
  );

  /// 城市身份、归属、原生国家与建筑等级。
  final int id, country, nativeCountry, level;

  /// 实际国土网格中接壤的城池；旧观察没有此字段时不推断为安全后方。
  final List<int>? neighborCities;

  /// 实际中心及接触轮廓。
  final AiPoint center;
  final AiOutline outline;

  /// 城池月收入及容量；poorIncome 兼容旧协议，现等于 income，国家统一扣欠收。
  final int income, poorIncome, capacityContribution, rearStagingCapacity;

  /// 未折算的一级基础产出，避免外国城市升级时的取整误差。
  final int baseIncome;

  /// 当前真实规则是否允许抽取。
  final bool recruitAllowed;

  /// 本城当月升级额度和年度上限是否允许升级，费用及主持将领另行校验。
  final bool upgradeAllowed;

  /// 归属、等级和本场守军序列的版本。
  final String revision;

  /// 进行中攻城开场等级；为空表示当前没有攻城。
  final int? initialBattleLevel;

  /// 进攻方本场已赢的守将数。
  final int victories;

  /// 正在对阵的英雄及公开过场。
  final String? attacker, defender;
  final String battleStage;
  final double nextWaveSeconds;

  /// 已阵亡守将仍在播放结束动画时，AI 不再把其占用的胜轮当成空闲名额。
  final bool defenderFallen;

  /// 只由公开的当前准备动画得出的最早结算下界，未知时为零。
  final double dangerSeconds;

  /// 当前仍可能迎战的真实名额。
  int get safeSlots => initialBattleLevel == null
      ? level
      : (initialBattleLevel! - victories - (defenderFallen ? 1 : 0)).clamp(
          0,
          5,
        );

  /// 跨平台记录。
  Map<String, Object?> toJson() => {
    'id': id,
    'c': country,
    'native': nativeCountry,
    'level': level,
    'xy': center.toJson(),
    'outline': [for (final p in outline.points) p.toJson()],
    'income': income,
    'baseIncome': baseIncome,
    'poor': poorIncome,
    'cap': capacityContribution,
    'recruitCap': rearStagingCapacity,
    'neighbors': neighborCities,
    'recruit': recruitAllowed,
    'upgrade': upgradeAllowed,
    'rev': revision,
    'initial': initialBattleLevel,
    'wins': victories,
    'attacker': attacker,
    'defender': defender,
    'stage': battleStage,
    'next': nextWaveSeconds,
    'fallen': defenderFallen,
    'danger': dangerSeconds,
  };
}

/// 全国资源及公开经济数据。
class AiCountry {
  /// 创建国库视图。
  AiCountry(
    this.id,
    this.gold,
    this.reserves,
    this.capacity,
    this.salary,
    this.poorIncome, {
    this.baseIncome,
    this.garrisonAccrued = 0,
    this.soldierRecruitmentAllowed = true,
    Map<int, int> hatred = const {},
  }) : hatred = Map.unmodifiable(hatred);

  /// 解码资源记录。
  factory AiCountry.fromJson(Map<String, dynamic> d) => AiCountry(
    d['id'],
    d['gold'],
    d['reserves'],
    d['capacity'],
    d['salary'],
    d['poor'],
    baseIncome: d['baseIncome'] as int?,
    garrisonAccrued: (d['garrisonAccrued'] as num? ?? 0).toDouble(),
    soldierRecruitmentAllowed: d['soldierRecruitmentAllowed'] as bool? ?? true,

    hatred: {
      for (final e in (d['hate'] as Map).entries)
        int.parse(e.key): e.value as int,
    },
  );

  /// 国家身份、现金、兵员、上限、月俸及欠收收入。
  final int id, gold, reserves, capacity, salary, poorIncome;

  /// 本国固定月保底；旧观察未提供时由规则默认值兼容。
  final int? baseIncome;

  /// 本国已累计、将于月底支付的驻军军费，不能因重新分配任务消失。
  final double garrisonAccrued;

  /// 本国本月是否还可以开始一次补兵，已使用后不再规划额外采购。
  final bool soldierRecruitmentAllowed;

  /// 有方向的本国仇恨。
  final Map<int, int> hatred;

  /// 跨平台记录。
  Map<String, Object?> toJson() => {
    'id': id,
    'gold': gold,
    'reserves': reserves,
    'capacity': capacity,
    'salary': salary,
    'poor': poorIncome,
    'baseIncome': baseIncome,
    'garrisonAccrued': garrisonAccrued,
    'soldierRecruitmentAllowed': soldierRecruitmentAllowed,
    'hate': {for (final e in hatred.entries) '${e.key}': e.value},
  };
}

/// 同一时刻冻结的公平观察；不包含真实随机序列或敌国任务。
class AiObservation {
  /// 创建不可变快照。
  AiObservation({
    required this.country,
    required this.tick,
    required this.monthRemaining,
    required List<AiCity> cities,
    required List<AiHero> heroes,
    required List<AiCountry> countries,
    this.poolCount = 0,
    this.maximumSalary = 3,
    this.year = 1,
    this.monthIndex = 0,
  }) : cities = List.unmodifiable(cities),
       heroes = List.unmodifiable(heroes),
       countries = List.unmodifiable(countries);

  /// 解码观察。
  factory AiObservation.fromJson(Map<String, dynamic> d) => AiObservation(
    country: d['country'],
    tick: d['tick'],
    monthRemaining: (d['month'] as num).toDouble(),
    cities: [
      for (final v in d['cities'])
        AiCity.fromJson(Map<String, dynamic>.from(v)),
    ],
    heroes: [
      for (final v in d['heroes'])
        AiHero.fromJson(Map<String, dynamic>.from(v)),
    ],
    countries: [
      for (final v in d['countries'])
        AiCountry.fromJson(Map<String, dynamic>.from(v)),
    ],
    poolCount: d['pool'],
    maximumSalary: d['salary'],
    year: d['year'] as int? ?? 1,
    monthIndex: d['monthIndex'] as int? ?? 0,
  );

  /// 当前决策国与逻辑时刻。
  final int country, tick;

  /// 当前年份和已结算月份，用于经营时机判断。
  final int year, monthIndex;

  /// 本月剩余时间。
  final double monthRemaining;

  /// 当前允许观察的实体。
  final List<AiCity> cities;
  final List<AiHero> heroes;
  final List<AiCountry> countries;

  /// 公开池数量与目录最大月俸，用于保守招募预算。
  final int poolCount, maximumSalary;

  /// 本国国库。
  AiCountry get nation => countries.firstWhere((c) => c.id == country);

  /// 本国现有城池。
  Iterable<AiCity> get owned => cities.where((c) => c.country == country);

  /// 当前城内守军，包含已锁定守将，按真实显示顺序排列。
  List<AiHero> garrison(int city) =>
      heroes
          .where(
            (h) =>
                h.city == city &&
                h.stationed &&
                h.hp > 0 &&
                h.country == cities.firstWhere((c) => c.id == city).country,
          )
          .toList()
        ..sort(AiHero.compareDefenseOrder);

  /// 查找英雄。
  AiHero? hero(String? id) => heroes.where((h) => h.id == id).firstOrNull;

  /// 查找城池。
  AiCity? city(int? id) => cities.where((c) => c.id == id).firstOrNull;

  /// 跨平台记录。
  Map<String, Object?> toJson() => {
    'country': country,
    'tick': tick,
    'month': monthRemaining,
    'cities': [for (final c in cities) c.toJson()],
    'heroes': [for (final h in heroes) h.toJson()],
    'countries': [for (final c in countries) c.toJson()],
    'pool': poolCount,
    'salary': maximumSalary,
    'year': year,
    'monthIndex': monthIndex,
  };
}
