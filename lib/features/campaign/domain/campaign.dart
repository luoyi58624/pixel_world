import 'dart:math' as math;
import 'dart:convert';

import '../../../core/geometry/geometry.dart';

import '../../../core/config/game_config.dart';
import '../../../core/persistence/state_random.dart';

import '../../battle/domain/battle_simulation.dart';
import '../../battle/domain/combat_rules.dart';
import '../../cities/domain/city_contact.dart';
import '../../heroes/domain/hero_sprite.dart';
import '../../heroes/data/rom_hero.dart';
import '../../world_map/domain/world_data.dart';
import '../../world_map/domain/world_movement.dart';
import '../../world_map/domain/territory.dart';
import '../../economy/domain/economy.dart';
import '../../economy/domain/military_upkeep.dart';
import '../../heroes/domain/recruitment.dart';
import '../../battle/domain/field_terrain.dart';
import '../../weapons/domain/weapon.dart';
import '../../events/domain/game_events.dart';
import '../../ai/geometry.dart';
import '../../ai/threat_geometry.dart';
import '../../ai/rear_safety.dart';
import '../../ai/observation.dart';
import '../../ai/protocol.dart';
import '../../ai/rules_data.dart';
import '../../ai/budget.dart';
import '../../ai/routes.dart';
import '../../ai/work_budget.dart';
import '../../ai/schedule.dart';
import '../../ai/runtime/worker.dart';
import '../../ai/runtime/build_stamp.dart';

part 'economy/country_ai_budget.dart';
part 'battles/field_battles.dart';
part 'battles/siege_battles.dart';
part 'march_traffic.dart';
part 'economy/garrison_upkeep.dart';
part 'economy/country_troops.dart';
part 'economy/war_spoils.dart';
part 'battles/battle_retreat.dart';
part 'economy/campaign_weapons.dart';
part 'countries/country_strategy.dart';
part 'countries/country_relations.dart';
part 'countries/territory_defense.dart';
part 'ai/ai_observation_bridge.dart';
part 'ai/ai_executor.dart';
part 'ai/ai_runtime_bridge.dart';
part 'ai/ai_march_recovery.dart';
part 'events/campaign_events.dart';
part 'campaign_snapshot.dart';

/// 新游戏的城池状态，经济和等级规则独立于原 ROM。
class CitySituation {
  /// 按配置初始化城防与收入，兵员由国家统一管理。
  CitySituation({
    required this._ownerCountryId,
    required this.defense,
    required this.baseIncome,
    required this.initialLevel,
    int? nativeCountryId,
  }) : nativeCountryId = nativeCountryId ?? _ownerCountryId,
       _level = initialLevel {
    if (initialLevel < 1 || initialLevel > maxLevel) {
      throw ArgumentError.value(initialLevel, 'initialLevel', '等级必须为 1 到 5');
    }
  }

  /// 易主时城防重置一级；国家兵员的容量变化由战役统一结算。
  int get ownerCountryId => _ownerCountryId;
  set ownerCountryId(int value) {
    if (value == _ownerCountryId) return;
    _ownerCountryId = value;
    _level = 1;
  }

  int _ownerCountryId;

  /// 城池开局所属国家，易主及显示名称改变都不会改变本土归属。
  final int nativeCountryId;

  /// 当前占领者是否为城池原属国家。
  bool get isNative => ownerCountryId == nativeCountryId;

  double get _yieldFactor => isNative ? 1 : GameConfig.foreignCityYieldFactor;

  /// 编号 0 是玩家国家。
  bool get isPlayer => ownerCountryId == 0;

  /// 基础城防，用于界面展示。
  final int defense;

  /// 一级城池正常产出，实际月收入另加每级增长。
  final int baseIncome;
  int _level;

  /// 当前等级，始终处于 1 到 5。
  int get level => _level;

  /// 开局配置等级，AI 留守人数另按当前威胁动态判断。
  final int initialLevel;

  /// AI 后方部队分布参考值，不限制招募或玩家驻军。
  int get rearStagingCapacity => level + 1;

  /// 城池正常产出，按当前等级计算，占领地与本土同额。
  int get income =>
      ((baseIncome + (level - 1) * GameConfig.cityIncomePerLevel) *
              _yieldFactor)
          .floor();

  /// 本城贡献给全国的兵员容量，英雄提供的容量由国家另行统计。
  int get reserveCapacity =>
      (level * GameConfig.cityReserveCapacityPerLevel * _yieldFactor).floor();

  /// 扣除将领内政前的升级基础费，满级后为空。
  int? get baseUpgradeCost =>
      level < maxLevel ? GameConfig.cityUpgradeCosts[level - 1] : null;

  /// 城池最高等级。
  static const maxLevel = GameConfig.maxCityLevel;
}

/// 带有身份、所属城池及可变生命值的英雄，静态数值来自提取目录。
class CampaignHero {
  CampaignHero._saved({
    required this.id,
    required this.rosterOrder,
    required this.sourceId,
    required this.name,
    required this.type,
    required this.appearance,
    required this.cityId,
    required this.countryId,
    required this.health,
    required this.combat,
    required this.morale,
    required this.politics,
    required this.salary,
    required this.squad,
  });

  /// 驻城将领默认不占兵，兵员由国家库存统一管理。
  CampaignHero.fromRom(
    RomHeroDefinition definition, {
    required this.cityId,
    required this.countryId,
    int initialSoldiers = GameConfig.initialHeroSoldiers,
  }) : sourceId = definition.id,
       rosterOrder = definition.rosterOrder,
       id = 'rom-${definition.id}',
       name = definition.name ?? '主角',
       type = definition.type,
       health = BattleHealth(definition.maxHp),
       combat = definition.combat,
       morale = definition.morale,
       politics = definition.politics,
       salary = definition.salaryFor(countryId),
       squad = List.generate(
         math.min(definition.soldierLimit, GameConfig.heroSoldierLimit),
         (slot) => BattleHealth(
           BattleSimulation.soldierHp,
           hp: slot < initialSoldiers ? BattleSimulation.soldierHp : 0,
         ),
       ),
       appearance = switch (definition.type) {
         HeroType.advanced => HeroAppearance.advanced,
         HeroType.normal => HeroAppearance.normal,
         HeroType.protagonist => HeroAppearance.protagonist,
       };

  /// 本场景内唯一标识。
  final String id;

  /// 主角优先，其余按英雄 JSON 的文件顺序排列，身份编号只用于资源关联。
  static int compareRosterOrder(CampaignHero a, CampaignHero b) {
    if (a.type != b.type) {
      if (a.type == HeroType.protagonist) return -1;
      if (b.type == HeroType.protagonist) return 1;
    }
    return a.rosterOrder.compareTo(b.rosterOrder);
  }

  /// 初次加载的英雄文件顺序，招募与进驻后仍使用同一优先级。
  final int rosterOrder;

  /// 原 ROM 英雄编号。
  final int sourceId;

  /// 汉化姓名，玩家主角暂用“主角”作为显示名。
  final String name;

  /// 明确记录高级、普通及主角类型，界面与行军外观共用。
  final HeroType type;

  /// 行军外观与英雄身份分开。
  final HeroAppearance appearance;

  /// 当前所属城池，进驻新占领城池后更新。
  int cityId;

  /// 英雄阵营不会因出发城失守而自动改变。
  final int countryId;

  /// 英雄是否属于玩家国家。
  bool get isPlayer => countryId == 0;

  /// 生命上限。
  int get maxHp => health.maxHp;

  /// 当前生命值。
  double get hp => health.hp;
  set hp(num value) => health.hp = value;

  /// 将领生命在地图与战场中共用。
  final BattleHealth health;

  /// 战斗能力。
  final int combat;

  /// 每轮对阵重新填充的英雄士气，独立于攻击力和生命。
  final int morale;
  int _salaryPaidMonth = -1;

  /// 内政能力。
  final int politics;

  /// 开局或签约时读取的 JSON 月俸，原 ROM 报酬单独保存在提取目录中。
  final int salary;

  /// 出征或当前守城战携带的小兵，空闲驻城时兵员归入城市。
  final List<BattleHealth> squad;
  final List<int> _weaponIds = [];

  /// 将领出征携带的武器，回城归库，守城禁用，上限读取武器目录。
  List<int> get weaponIds => List.unmodifiable(_weaponIds);

  /// 当前存活的随行士兵数量。
  int get soldiers => squad.where((soldier) => soldier.alive).length;

  /// 将现有属性和生命交给战场，不创建第二份可变状态。
  BattleArmy get battleArmy => BattleArmy(
    id: id,
    name: name,
    general: health,
    attack: combat,
    morale: morale,
    // 固定本场槽位引用，归营后重新领兵不会改写旧战斗的伤亡记录。
    soldiers: List.of(squad),
  );
}

/// 部队从行军进入排队待战或交战。
enum MarchPhase {
  /// 原地扎营，保留在地图上并继续结算所属城池经济。
  camped,

  /// 前往目标。
  marching,

  /// 等待同一城池的前一场交战结束。
  awaitingBattle,

  /// 正与守城英雄交战。
  fighting,

  /// 与野外遭遇的敌军决战，结束前不能改道或扎营。
  dueling,
}

/// 一支已确认出发的部队，地图移动与战斗保留同一英雄身份。
class HeroMarch {
  HeroMarch._saved({
    required this.hero,
    required this.departureCityId,
    required this.position,
    required this.destination,
    required this.direction,
  }) : _outboundRoute = [];

  /// 从所属城门出发。
  HeroMarch({
    required this.hero,
    this.target,
    required this.position,
    required this.destination,
  }) : departureCityId = hero.cityId,
       _outboundRoute = [position],
       direction = destination == position
           ? HeroDirection.south
           : HeroDirection.fromVector(destination - position);

  /// 带队英雄。
  final CampaignHero hero;

  /// 本次离城的出发城，撤退不会被途中改令改成新的起点。
  final int departureCityId;
  final List<GamePoint> _outboundRoute;
  final List<GamePoint> _returnRoute = [];
  bool _returningFromRetreat = false;
  final Set<int> _provokedCountries = {};

  /// 撤退后默认沿来路返城，手动移动可结束自动返程。
  bool get returningFromRetreat => _returningFromRetreat;

  /// 进入城堡交战的进攻军在地图上隐藏，排队和野战部队仍可见。
  bool get visibleOnMap => !_departurePending && phase != MarchPhase.fighting;

  /// 已承诺出征、正在城内等候安全放行，不参与地图碰撞。
  bool get waitingForDeparture => _departurePending;
  bool _departurePending = false;
  double _departureAt = 0;
  bool _trafficBlocked = false;
  bool _arrivalWaitLogged = false;

  /// 暂时避让时仍保留原行军任务，不能当作主动扎营或抵达目的地。
  bool get waitingForTraffic => _trafficBlocked;
  final List<GamePoint> _trafficRoute = [];

  void _rememberPosition() {
    if (!_returningFromRetreat && _outboundRoute.last != position) {
      _outboundRoute.add(position);
    }
  }

  /// 目标城池；自由行军时为空。
  CityDefinition? target;

  /// 任意地图位置，选中城池时使用城门位置。
  GamePoint destination;

  /// 精确世界坐标。
  GamePoint position;

  /// 行军朝向。
  HeroDirection direction;

  /// 实际行军距离。
  double walkDistance = 0;
  final _walkAnimation = HeroWalkAnimation();

  /// 当前阶段。
  MarchPhase phase = MarchPhase.marching;

  /// 兼容旧界面的只读标记；粮草机制已取消，部队不会因断粮停止。
  bool get supplyHalted => false;

  // 抵达城下后持有顺序号；暂时转入野战不丢失原来的等候顺序。
  ({int cityId, int order})? _siegeArrival;

  /// 地图步态按固定时间换帧，地形只改变实际位移。
  int get animationStep =>
      phase == MarchPhase.marching ? _walkAnimation.step : 0;

  /// 从当前位置改道，保留连续位置和步行动画进度。
  void moveTo(GamePoint point, {CityDefinition? city}) {
    _arrivalWaitLogged = false;
    _trafficBlocked = false;
    _trafficRoute.clear();
    _rememberPosition();
    if (phase != MarchPhase.marching) _walkAnimation.reset();
    _siegeArrival = null;
    target = city;
    destination = point;
    if (point != position) {
      direction = HeroDirection.fromVector(point - position);
    }
    phase = point == position
        ? (city == null ? MarchPhase.camped : MarchPhase.awaitingBattle)
        : MarchPhase.marching;
  }

  /// 立即停止当前行程，不回城、不回血，也不影响其他部队。
  void camp() {
    _trafficBlocked = false;
    _trafficRoute.clear();
    _rememberPosition();
    _walkAnimation.reset();
    _siegeArrival = null;
    target = null;
    destination = position;
    phase = MarchPhase.camped;
  }

  void _resumeToward(GamePoint point, {CityDefinition? city}) {
    final arrival = _siegeArrival;
    moveTo(point, city: city);
    if (arrival?.cityId == city?.id) _siegeArrival = arrival;
  }

  /// 推进行军，抵达后由战役规则决定何时交战。
  bool tick(WorldDefinition world, double elapsed) {
    if (phase != MarchPhase.marching) return false;
    final result = advanceToward(world, position, destination, elapsed);
    _walkAnimation.advance(elapsed);
    position = result.position;
    walkDistance += result.distance;
    if (position == destination) {
      phase = target == null ? MarchPhase.camped : MarchPhase.awaitingBattle;
      return true;
    }
    return false;
  }
}

/// 城池战和野战共用的后台记录，观战不创建额外时钟。
abstract class WorldBattle {
  /// 引用真实将领及其生命对象。
  WorldBattle(this.attacker, this.defender, {required this.simulation});

  /// 右侧参战将领，野战中不享有先手优势。
  final CampaignHero attacker;

  /// 左侧参战将领，城池战可在战败后更换。
  CampaignHero defender;

  /// 当前双方的共享战斗状态。
  BattleSimulation simulation;

  /// 最近一次战斗结果，为空表示交战中。
  String? outcome;
  bool _settled = false;
  int _aiNoticedClashes = -1;
  int _aiNoticedTroops = -1, _aiNoticedWeapons = -1;
  double _aiNoticedAttackerHp = -1, _aiNoticedDefenderHp = -1;
  final Set<String> _weaponOpeningDone = {};

  /// 战斗记录，用于显示过程与结果。
  final List<String> events = [];

  /// 当前已发生的碰撞次数。
  int get rounds => simulation.clashes;

  /// 是否仍在后台交战。
  bool get isActive => outcome == null;

  /// 观战标题中的地点。
  String get locationLabel;

  /// 地图战斗标记的世界位置。
  GamePoint markerPosition(CampaignState campaign);

  /// 保留有限条战斗记录。
  void record(String event) {
    events.add(event);
    if (events.length > 6) events.removeAt(0);
  }
}

/// 一支进攻部队与城池守军的连续交战。
class CityBattle extends WorldBattle {
  CityBattle._saved(
    this.city,
    super.attacker,
    super.defender, {
    required super.simulation,
    required this.initialCityLevel,
    required this.defendingCountryId,
    required this._seed,
    this._locationName,
  });

  /// 按当前城池等级记录一支部队与当前守将的交战。
  CityBattle(
    this.city,
    CampaignHero attacker,
    CampaignHero defender, {
    required int cityLevel,
    int seed = 1,
    this._locationName,
  }) : _seed = seed,
       initialCityLevel = cityLevel,
       defendingCountryId = defender.countryId,
       super(
         attacker,
         defender,
         simulation: BattleSimulation(
           attacker: attacker.battleArmy,
           defender: defender.battleArmy,
           resultPerspective: defender.isPlayer
               ? BattleSide.defender
               : BattleSide.attacker,
           defenderCityLevel: cityLevel,
           cityAppearanceLevel: cityLevel,
           seed: seed,
         ),
       );

  /// 战斗所在城池。
  final CityDefinition city;
  final String Function()? _locationName;

  /// 本场开打时的城防等级，同时决定连续获胜多少轮可以占领。
  final int initialCityLevel;

  /// 开战时的守方国家，结束时不把损伤结算给已易主的城市。
  final int defendingCountryId;

  /// 本场进攻军已经击败的守将数，双方同归于尽不计为胜利。
  int victories = 0;

  /// 当前轮次使用的临时城防等级，真实城池等级等整场结束后再结算。
  int get effectiveDefenseLevel => math.max(1, initialCityLevel - victories);

  /// 整场结束后实际降低的城防等级，未触发或已占领时为零。
  int defenseLoss = 0;
  bool _damageSettled = false;

  @override
  String get locationLabel => '${_locationName?.call() ?? city.label}国';

  @override
  GamePoint markerPosition(CampaignState campaign) =>
      campaign.cityBounds(city).topCenter;

  /// 当前迎战的守将次序。
  int wave = 1;

  /// 更换守将前的短暂结果展示时间。
  double nextWaveIn = 0;
  final int _seed;

  void _nextDefender(CampaignHero hero) {
    defender = hero;
    wave++;
    nextWaveIn = 0;
    _settled = false;
    _weaponOpeningDone.clear();
    simulation = BattleSimulation(
      attacker: attacker.battleArmy,
      defender: hero.battleArmy,
      resultPerspective: hero.isPlayer
          ? BattleSide.defender
          : BattleSide.attacker,
      defenderCityLevel: effectiveDefenseLevel,
      cityAppearanceLevel: initialCityLevel,
      seed: _seed + wave,
    );
    record('${hero.name}接替守城');
  }
}

/// 本局失败条件，任意一项满足即结束战役。
enum CampaignDefeatReason {
  /// 主角阵亡或在城池失守时被移除。
  protagonistFallen('主角阵亡'),

  /// 玩家已不再拥有任何城池，在外英雄不能继续作战。
  noCities('全部城池失守');

  const CampaignDefeatReason(this.label);

  /// 结束界面显示的原因。
  final String label;
}

/// 一次战败的城池影响；进攻方阵亡不改变出发城。
typedef DefeatResult = ({
  int cityId,
  int oldLevel,
  int newLevel,
  bool captured,
  List<String> removedHeroIds,
});

/// 管理一张地图的经济、出征及战败规则，未显示的场景暂停推进。
class CampaignState {
  CampaignState._(
    this.world,
    this.cities,
    this.heroes,
    this._countryGold,
    this._catalog,
    this._economyRandom,
    this._recruitmentRandom,
    this._aiRandom,
    this._siegeRandom,
    this._retreatRandom,
    this.aiEnabled,
    this.countryConfigs,
    this.weaponCatalog,
    this._weaponDropRandom,
  ) : _protagonist = heroes
          .where((hero) => hero.isPlayer && hero.type == HeroType.protagonist)
          .firstOrNull;

  final CampaignHero? _protagonist;
  CampaignDefeatReason? _defeatReason;
  final Map<int, RomHeroDefinition> _catalog;
  final math.Random _economyRandom;
  final math.Random _recruitmentRandom;
  final Map<int, RomHeroDefinition> _heroPool = {};
  final math.Random _aiRandom;
  final math.Random _siegeRandom;
  final math.Random _retreatRandom;
  final math.Random _weaponDropRandom;
  // 成功脱战的双方在拉开接触距离前不重复开打，其他敌军仍可拦截。
  final Set<(String, String)> _retreatSeparations = {};
  int _siegeArrivalSerial = 0;

  /// 是否运行非玩家国家的自动经营；测试可以单独关闭以隔离原有规则。
  final bool aiEnabled;

  /// 本局国家配置快照，未配置的国家采用默认值。
  final Map<int, CountryConfig> countryConfigs;

  /// 已加载的静态武器目录，各国适用相同的价格与效果。
  final WeaponCatalog weaponCatalog;
  final Map<int, Map<int, int>> _weaponStock = {};
  final Map<int, RecruitmentOffer> _recruitmentOffers = {};
  double _strategyTime = 0;
  final Map<int, Map<int, int>> _countryHatred = {};
  final Map<int, CountryWarPlan> _warPlans = {};
  _AiCoordinator? _ai;
  final Map<String, int> _aiOrderVersions = {};
  final Map<String, CampaignHero> _aiKnownHeroes = {};
  final Map<String, int> _aiLifeVersions = {};
  final Map<String, GamePoint> _aiVelocity = {};
  final Map<int, double> _aiRearDeadlines = {};
  final _emptyAiDiagnostics = NationalAiDiagnostics();
  CampaignEvents? _eventLog;
  ({int countryId, String decisionId, String reason})? _eventContext;

  /// 各国独立的操作及决策日志，观察功能不参与游戏规则。
  CampaignEvents get events => _eventLog ??= CampaignEvents(worldId: world.id);
  bool _paused = false;

  /// 暂停时冻结本图全部计时、资源结算和游戏指令。
  bool get isPaused => _paused;

  /// 保留逻辑时钟的零头，关闭旧 AI 会话，恢复后从下一帧重新规划。
  void setPaused(bool value) {
    if (_paused == value) return;
    _paused = value;
    if (value) pauseAi();
    _emitEvent(
      value ? GameEventKind.gamePaused : GameEventKind.gameResumed,
      value ? '玩家暂停游戏' : '玩家继续游戏',
      countryId: 0,
      source: GameEventSource.player,
    );
  }

  /// 离线对抗测试可让玩家国家也使用 AI；正式游戏默认关闭。
  bool aiControlsPlayer = false;

  /// 离线对抗测试可继续观察玩家失败后的国家战争，正式游戏仍立即结束。
  bool endOnPlayerDefeat = true;
  int _aiRouteEstimates = 0;
  int _aiStrategicDecisions = 0;

  /// 已执行的单国战略决策次数，用于验证错峰调度，不影响游戏规则。
  int get aiStrategicDecisions => _aiStrategicDecisions;

  /// 后台路线积分的地形段总数，便于检查每个请求的工作配额。
  int get aiRouteEstimates => _aiRouteEstimates;

  /// 查看电脑当前的目标与筹备状态，不改变其决策时钟。
  CountryWarPlan? warPlanFor(int countryId) => _warPlans[countryId];

  /// 读取国家的初始资金配置。
  CountryConfig configFor(int countryId) =>
      countryConfigs[countryId] ?? const CountryConfig();

  /// 当前国家的保守经营预算，仅预留月俸和应急资金。
  CountryAiBudget aiBudgetFor(int countryId) => _planAiBudget(countryId);

  /// 读取本国视角的冻结观察，敌方隐藏命令不在其中。
  AiObservation aiObservationFor(int countryId) => _observeAi(countryId);

  /// 导出与真实游戏一致的纯规则，便于跨后端验证。
  AiRules aiRulesForTesting() => _createAiRules();

  /// 导出只含地形的地图，不传递图片或战斗对象。
  AiMap aiMapForTesting() => _createAiMap();

  /// 后台状态与有限诊断信息。
  NationalAiDiagnostics get aiDiagnostics =>
      _ai?.diagnostics ?? _emptyAiDiagnostics;

  /// 无界面验收可等待真实后台完成，避免把机器运算速度当作游戏时间。
  int get pendingAiRequests => _ai?.worker?.pendingCount ?? 0;

  /// 本国正在执行的持续任务，外部不能修改任务表。
  Map<String, ArmyTask> get aiTasks =>
      Map.unmodifiable(_ai?.tasks ?? <String, ArmyTask>{});

  /// 地图暂停或销毁时结束工作环境并使旧请求失效；下次推进会重新连接。
  void pauseAi() => _ai?.pause();

  /// 释放当前战役持有的后台端口。
  void dispose() => pauseAi();

  /// 按 ROM 城池关联编号配置驻军，重复编号采用最后一次初始化位置。
  factory CampaignState.fromRom(
    WorldDefinition world,
    List<RomHeroDefinition> catalog, {
    int? startingGold,
    Map<int, CountryConfig>? countryConfigs,
    bool aiEnabled = GameConfig.countryAiEnabled,
    math.Random? economyRandom,
    math.Random? recruitmentRandom,
    math.Random? aiRandom,
    math.Random? siegeRandom,
    math.Random? retreatRandom,
    math.Random? weaponRandom,
    math.Random? weaponDropRandom,
    AiWorker Function()? aiWorkerFactory,
    bool aiControlsPlayer = false,
    bool endOnPlayerDefeat = true,
    CampaignEvents? eventLog,
    WeaponCatalog weaponCatalog = WeaponCatalog.empty,
  }) {
    final home = world.cities.first.id;
    final resolvedCountries = {...world.setup.countries, ...?countryConfigs};
    final placement = <int, int>{};
    for (final city in world.cities) {
      for (final id in city.unitIds) {
        placement[id] = city.id;
      }
    }
    final heroes = [
      for (final definition in catalog)
        if (placement.containsKey(definition.id))
          CampaignHero.fromRom(
            definition,
            cityId: placement[definition.id]!,
            countryId: world.cities
                .firstWhere((city) => city.id == placement[definition.id])
                .initialOwnerId,
          ),
    ]..sort(CampaignHero.compareRosterOrder);
    final campaign = CampaignState._(
      world,
      {
        for (final city in world.cities)
          city.id: CitySituation(
            ownerCountryId: city.initialOwnerId,
            defense: city.id == home ? 100 : 80 + city.id % 3 * 20,
            baseIncome:
                world.setup.cities[(world.id, city.id)]?.baseIncome ??
                GameConfig.cityBaseIncome,
            initialLevel:
                world.setup.cities[(world.id, city.id)]?.initialLevel ??
                city.initialLevel,
          ),
      },
      heroes,
      {
        for (final id in {
          0,
          ...world.countries.map((country) => country.id),
          ...world.cities.map((city) => city.initialOwnerId),
        })
          id: math.max(
            0,
            startingGold ??
                resolvedCountries[id]?.initialGold ??
                GameConfig.initialGold,
          ),
      },
      {for (final hero in catalog) hero.id: hero},
      economyRandom ?? StateRandom(),
      recruitmentRandom ?? StateRandom(),
      aiRandom ?? StateRandom(),
      siegeRandom ?? StateRandom(),
      retreatRandom ?? StateRandom(),
      aiEnabled,
      Map.unmodifiable(resolvedCountries),
      weaponCatalog,
      weaponDropRandom ?? StateRandom(),
    );
    for (final entry in weaponCatalog.initialCountryStock.entries) {
      campaign._weaponStock[entry.key] = Map.of(entry.value);
    }
    for (final owner
        in campaign.cities.values.map((city) => city.ownerCountryId).toSet()) {
      final initial =
          heroes.where((h) => h.countryId == owner).length *
          GameConfig.initialSoldiersPerHero;
      campaign._initialTroopCapacity[owner] = initial;
      campaign.countryTroops[owner] = CountryTroops(
        reserveSoldiers: campaign.reserveCapacityFor(owner),
      );
    }
    for (final entry in campaign.countryTroops.entries) {
      if (entry.value.reserveSoldiers < 0 ||
          entry.value.reserveSoldiers >
              campaign.reserveCapacityFor(entry.key)) {
        throw ArgumentError('国家 ${entry.key} 的初始兵员超过全国兵力上限');
      }
    }
    for (final hero in catalog) {
      if (hero.type != HeroType.protagonist &&
          !heroes.any((active) => active.sourceId == hero.id)) {
        campaign._heroPool[hero.id] = hero;
      }
    }
    campaign.aiControlsPlayer = aiControlsPlayer;
    campaign.endOnPlayerDefeat = endOnPlayerDefeat;
    if (eventLog != null && eventLog.worldId != world.id) {
      throw ArgumentError('事件日志的地图不匹配');
    }
    campaign._eventLog = eventLog;
    if (aiEnabled) {
      campaign._ai = _AiCoordinator(
        campaign,
        aiWorkerFactory ?? createAiWorker,
      );
    }
    for (final country in campaign._countryGold.keys) {
      campaign._emitEvent(
        GameEventKind.sessionStarted,
        '${world.countryName(country)}国建立开局记录',
        countryId: country,
        source: GameEventSource.system,
        data: {
          'resources': campaign._eventResources(country),
          'cities': [
            for (final e in campaign.cities.entries)
              if (e.value.ownerCountryId == country)
                {'id': e.key, 'level': e.value.level, 'income': e.value.income},
          ],
          'heroes': [
            for (final h in heroes)
              if (h.countryId == country) campaign._eventHero(h),
          ],
        },
      );
    }
    return campaign;
  }

  /// 静态地图。
  final WorldDefinition world;

  /// 城池玩法状态。
  final Map<int, CitySituation> cities;

  /// 城池辖区固定，国家边界随当前占领关系即时变化。
  late final territories = TerritoryMap(world);
  final _lastTerritoryOwner = <String, int>{};

  /// 建筑绘制与点击共用当前等级图块范围，左下基座保持在原地图位置。
  GameRect cityBounds(CityDefinition city) {
    final appearance = city.appearanceAt(cities[city.id]!.level);
    final width = appearance.width * 16.0;
    final height = appearance.height * 16.0;
    return GameRect.fromLTWH(
      city.bounds.left.clamp(0.0, math.max(0.0, world.pixelSize.width - width)),
      (city.bounds.bottom - height).clamp(
        0.0,
        math.max(0.0, world.pixelSize.height - height),
      ),
      width,
      height,
    );
  }

  /// 按当前建筑大小命中城池，不使用开局时的旧尺寸。
  CityDefinition? cityAt(GamePoint point) => world.cities
      .where((city) => cityBounds(city).contains(point))
      .firstOrNull;

  /// 仍存在的英雄，战败或失城移除时不保留幽灵驻军。
  final List<CampaignHero> heroes;

  /// 已出征部队。
  final Map<String, HeroMarch> marches = {};
  final Map<int, double> _nextAiDeparture = {};

  // 出发城失守是不可撤回的标记，交战结束后即使已进驻另一城也要清除。
  final Set<String> _disbandAfterBattle = {};

  /// 各城最近一场交战，结束后保留结果直到下次交战。
  final Map<int, CityBattle> battles = {};

  /// 野战记录，进行中的场次全部保留，结束后限制历史数量。
  final Map<int, FieldBattle> fieldBattles = {};

  /// 地图和观战共用的全部战斗。
  Iterable<WorldBattle> get allBattles sync* {
    yield* battles.values;
    yield* fieldBattles.values;
  }

  /// 查找将领正在参与的战斗，避免一人同时参与多场。
  WorldBattle? activeBattleForHero(String heroId) => allBattles
      .where(
        (battle) =>
            battle.isActive &&
            (battle.attacker.id == heroId || battle.defender.id == heroId),
      )
      .firstOrNull;

  /// 派兵后即使部队全灭，也不重新生成探索人物。
  bool hasDispatched = false;
  final Map<int, int> _countryGold;

  /// 每国只有一份库存，同国城池共用，不随某座城池易主而转送敌军。
  final Map<int, CountryTroops> countryTroops = {};
  final Map<int, int> _initialTroopCapacity = {};

  /// 初始将领贡献的固定底线，之后招募、阵亡或解雇不改变它。
  int initialHeroSoldierCapacityFor(int countryId) =>
      _initialTroopCapacity[countryId] ?? 0;

  /// 全国可调拨的士兵，不包含在外或正迎战的随军兵员。
  int reserveSoldiersFor(int countryId) =>
      countryTroops[countryId]?.reserveSoldiers ?? 0;

  /// 固定初始将领基数加全国当前城防容量，城池部分实时增减；灭国清零。
  int reserveCapacityFor(int countryId) {
    final owned = cities.values.where(
      (city) => city.ownerCountryId == countryId,
    );
    if (owned.isEmpty) return 0;
    return initialHeroSoldierCapacityFor(countryId) +
        owned.fold<int>(0, (n, city) => n + city.reserveCapacity);
  }

  final Map<int, MonthlySettlement> _settlements = {};

  /// 当前金币。
  int get gold => goldFor(0);

  /// 读取指定国家的国库，城池易主不转移国库金币。
  int goldFor(int countryId) =>
      _countryGold[countryId] ?? configFor(countryId).initialGold;

  /// 该国最近一次完整的月结记录。
  MonthlySettlement? lastSettlementFor(int countryId) =>
      _settlements[countryId];

  /// 当前可抽取的英雄，已经在场或待签约的英雄不重复进入池子。
  List<RomHeroDefinition> get recruitPool =>
      List.unmodifiable(_heroPool.values);

  /// 招募预览和签约共用 JSON 月俸，本国将领同样付薪。
  int salaryFor(RomHeroDefinition hero, {int countryId = 0}) =>
      hero.salaryFor(countryId);

  /// 解雇返还价按类型基础金额加内政计算，主角没有解雇价。
  int dismissalGold(CampaignHero hero) =>
      hero.type == HeroType.protagonist ? 0 : hero.politics;

  /// 解雇只适用于本国存活将领，正在拼杀或等待收尾者必须先结束战斗。
  String? dismissalBlockReason(CampaignHero? hero, {int countryId = 0}) {
    if (isPaused) return '游戏已暂停';
    if (defeated) return '游戏已结束';
    if (hero == null) return '请选择将领';
    if (!heroes.contains(hero) || !hero.health.alive) return '这位将领已离队';
    if (hero.countryId != countryId) return '只能解雇本国将领';
    if (hero.type == HeroType.protagonist) return '主角不可解雇';
    if (activeBattleForHero(hero.id) != null ||
        _disbandAfterBattle.contains(hero.id)) {
      return '交战结束后才能解雇';
    }
    if (cities[hero.cityId]?.ownerCountryId != countryId) return '所属城池已失守';
    return null;
  }

  /// 将领离队后回到共享池并返还金币，重复或过期操作不产生收益。
  int? dismissHero(CampaignHero hero, {int countryId = 0}) {
    final problem = dismissalBlockReason(hero, countryId: countryId);
    if (problem != null) {
      _rejectEvent(
        GameEventKind.heroDismissed,
        problem,
        countryId: countryId,
        hero: hero,
      );
      return null;
    }
    final before = _eventResources(countryId);
    final reward = dismissalGold(hero);
    // 城内配兵先归还，野外随军直接离队；都不凭空生成新的兵员。
    if (!marches.containsKey(hero.id)) {
      _returnSoldiers(hero);
      _returnWeapons(hero);
    }
    marches.remove(hero.id);
    heroes.remove(hero);
    hero.hp = 0;
    _clearSquad(hero);
    _trimCountryTroops(hero.countryId);
    _recycleHero(hero, dismissed: true);
    _countryGold[countryId] = goldFor(countryId) + reward;
    _ai?.urgent(countryId);
    _record(
      '已解雇${hero.name}，获得 $reward 金币',
      kind: GameEventKind.heroDismissed,
      countryId: countryId,
      hero: hero,
      cityId: hero.cityId,
      data: {
        'reward': reward,
        'before': before,
        'after': _eventResources(countryId),
      },
    );
    return reward;
  }

  /// 尚未处理的签约结果。
  RecruitmentOffer? get recruitmentOffer => recruitmentOfferFor(0);

  /// 读取指定国家的临时预留，非玩家国家抽取后会同步签约并清除预留。
  RecruitmentOffer? recruitmentOfferFor(int countryId) =>
      _recruitmentOffers[countryId];

  /// 本城本月剩余签约次数，抽取后放弃或签约失败不消耗次数。
  int remainingHeroDraws(int cityId) =>
      cities.containsKey(cityId) &&
          _cityRecruitmentMonths[cityId] != settledMonths
      ? 1
      : 0;

  // 次数跟随城池，防止读档或易主后在同一个月重复购买。
  final Map<int, int> _cityRecruitmentMonths = {}, _cityUpgradeMonths = {};

  /// 已完成的经济结算次数。
  int get settledTurns => settledMonths;

  /// 已经结束并完成结算的月份数。
  int settledMonths = 0;

  final Map<int, double> _garrisonBills = {};

  /// 本月已经发生的驻军维持费，出征或解雇不会抹掉此前费用。
  double garrisonUpkeepAccruedFor(int countryId) =>
      _garrisonBills[countryId] ?? 0;

  /// 按当前驻军人数计算的月费，用于国库规划与模拟诊断。
  int garrisonUpkeepFor(int countryId) =>
      _garrisonMonthlyCosts()[countryId] ?? 0;

  /// 当前游戏年份。
  int get year =>
      GameConfig.initialYear +
      (GameConfig.initialMonth - 1 + settledMonths) ~/ 12;

  /// 当前游戏月份。
  int get month => (GameConfig.initialMonth - 1 + settledMonths) % 12 + 1;

  /// 顶栏显示的年月。
  String get dateLabel => '$year年$month月';
  double _monthSeconds = 0;
  double _simulationFraction = 0;
  int _battleSerial = 0;

  /// 最近一条反馈。
  String lastEvent = '';

  /// 最近八条记录。
  final List<String> journal = [];

  /// 我方城池总产出。
  int get grossIncome => cities.values
      .where((city) => city.isPlayer)
      .fold(
        cities.values.any((city) => city.isPlayer)
            ? configFor(0).monthlyBaseIncome
            : 0,
        (sum, city) => sum + city.income,
      );

  /// 存活我方英雄的报酬，包括已出征部队。
  int get salaryCost => GameConfig.chargeHeroSalary
      ? heroes
            .where((hero) => hero.isPlayer)
            .fold(0, (sum, hero) => sum + hero.salary)
      : 0;

  /// 下一次结算净收入。
  int get netIncome => grossIncome - salaryCost;

  /// 主角阵亡或失去全部城池即失败，不要求先出征或全军覆没。
  bool get defeated => defeatReason != null;

  /// 失败后固定保留原因，不因迟到的指令或数据更新恢复游戏。
  CampaignDefeatReason? get defeatReason => _defeatReason ?? _detectDefeat();

  CampaignDefeatReason? _detectDefeat() {
    if (!endOnPlayerDefeat) return null;
    if (_protagonist != null && !_protagonist.health.alive) {
      // 原版先播完阵亡和胜方过场；战役结算后再覆盖游戏结束界面。
      final showingDefeat = allBattles.any(
        (battle) =>
            (battle.attacker == _protagonist ||
                battle.defender == _protagonist) &&
            !battle.simulation.finished,
      );
      if (!showingDefeat) return CampaignDefeatReason.protagonistFallen;
    }
    if (!cities.values.any((city) => city.isPlayer)) {
      return CampaignDefeatReason.noCities;
    }
    if (_protagonist != null && !heroes.contains(_protagonist)) {
      return CampaignDefeatReason.protagonistFallen;
    }
    return null;
  }

  bool _finishDefeat() {
    if (_defeatReason != null) return false;
    final reason = _detectDefeat();
    if (reason == null) return false;
    _defeatReason = reason;
    pauseAi();
    for (final countryId in _recruitmentOffers.keys.toList()) {
      _releaseOffer(countryId);
    }
    _simulationFraction = 0;
    for (final battle in allBattles) {
      if (_hasDisbandingArmy(battle)) continue;
      battle.outcome ??= '游戏结束 · ${reason.label}';
      if (battle is CityBattle) {
        battle.nextWaveIn = 0;
        _releaseDefender(battle);
        _settleSiegeDamage(battle);
      }
      battle.simulation.stop();
    }
    _record(
      '游戏结束 · ${reason.label}',
      kind: GameEventKind.gameEnded,
      countryId: 0,
      source: GameEventSource.system,
      reason: reason.label,
    );
    return true;
  }

  /// 归属本城的英雄，包含在外部队以继续计算月俸；驻城名单使用 garrisonAt。
  List<CampaignHero> heroesAt(int cityId) =>
      heroes
          .where(
            (hero) =>
                hero.cityId == cityId &&
                hero.countryId == cities[cityId]!.ownerCountryId,
          )
          .toList()
        ..sort(CampaignHero.compareRosterOrder);

  /// 尚未出征的守军按配置从高到低展示，重新招募或进驻仍回到对应位置。
  List<CampaignHero> garrisonAt(int cityId) =>
      heroesAt(cityId).where((hero) => !marches.containsKey(hero.id)).toList();

  /// 当前城池所属国家可调拨的兵员，同国所有城池读取同一库存。
  int soldiersAt(int cityId) => cities[cityId] == null
      ? 0
      : reserveSoldiersFor(cities[cityId]!.ownerCountryId);

  /// 当前城池所属国家的兵员上限。
  int soldierCapacityAt(int cityId) => cities[cityId] == null
      ? 0
      : reserveCapacityFor(cities[cityId]!.ownerCountryId);

  /// 本城英雄报酬。
  int salaryAt(int cityId) => GameConfig.chargeHeroSalary
      ? heroesAt(cityId).fold(0, (sum, hero) => sum + hero.salary)
      : 0;

  /// 补兵必须付现，数量同时受国库余额、全国容量和城池归属限制。
  int maxSoldierPurchase(int cityId, {int countryId = 0}) {
    if (isPaused) return 0;
    final city = cities[cityId];
    if (defeated || city == null || city.ownerCountryId != countryId) return 0;
    return math.min(
      math.max(0, goldFor(countryId) ~/ GameConfig.soldierRecruitCost),
      math.max(
        0,
        reserveCapacityFor(countryId) - reserveSoldiersFor(countryId),
      ),
    );
  }

  /// 当前一次点击能征募的人数，不超过配置批量、容量和可支付人数。
  int soldierPurchaseBatch(int cityId, {int countryId = 0}) => math.min(
    GameConfig.soldierRecruitBatchSize,
    maxSoldierPurchase(cityId, countryId: countryId),
  );

  /// 在本国城池征兵，统一扣国库并加入全国储备，不接受超额或负数。
  bool buySoldiers(int cityId, int count, {int countryId = 0}) {
    if (count <= 0 ||
        count > maxSoldierPurchase(cityId, countryId: countryId)) {
      _rejectEvent(
        GameEventKind.soldiersRecruited,
        '数量、金币、容量或城池状态不允许征募',
        countryId: countryId,
        cityId: cityId,
        data: {'count': count},
      );
      return false;
    }
    final before = _eventResources(countryId);
    final cost = count * GameConfig.soldierRecruitCost;
    _countryGold[countryId] = goldFor(countryId) - cost;
    countryTroops
            .putIfAbsent(countryId, () => CountryTroops())
            ._reserveSoldiers +=
        count;
    _record(
      '${_cityName(cityId)}征募 $count 名储备兵，花费 $cost 金币',
      kind: GameEventKind.soldiersRecruited,
      countryId: countryId,
      cityId: cityId,
      data: {
        'count': count,
        'cost': cost,
        'before': before,
        'after': _eventResources(countryId),
      },
    );
    return true;
  }

  /// 即将出征或迎战的本城将领最多可领取多少人，已在外或交战中不能远程补兵。
  int reinforcementCount(CampaignHero hero, {int countryId = 0}) {
    if (isPaused) return 0;
    final city = cities[hero.cityId];
    if (defeated ||
        !heroes.contains(hero) ||
        hero.countryId != countryId ||
        !hero.health.alive ||
        city == null ||
        city.ownerCountryId != countryId ||
        marches.containsKey(hero.id) ||
        battles.values.any(
          (battle) => battle.isActive && battle.defender == hero,
        )) {
      return 0;
    }
    return math.min(
      reserveSoldiersFor(countryId),
      hero.squad.where((soldier) => !soldier.alive).length,
    );
  }

  /// 从全国储备调拨新兵填充空槽，只在确认出征或守城开战前调用。
  int reinforceHero(CampaignHero hero, {int countryId = 0}) {
    final count = reinforcementCount(hero, countryId: countryId);
    if (count == 0) return 0;
    var remaining = count;
    for (var slot = 0; slot < hero.squad.length; slot++) {
      if (remaining == 0) break;
      if (!hero.squad[slot].alive) {
        // 新兵使用新生命对象，避免让旧战斗记录中的阵亡士兵复活。
        hero.squad[slot] = BattleHealth(BattleSimulation.soldierHp);
        remaining--;
      }
    }
    countryTroops[countryId]!._reserveSoldiers -= count;
    _record(
      '${hero.name}补充 $count 名士兵',
      kind: GameEventKind.soldiersAssigned,
      countryId: countryId,
      hero: hero,
      cityId: hero.cityId,
      source: GameEventSource.system,
      data: {
        'count': count,
        'reserveAfter': reserveSoldiersFor(countryId),
        'soldiersAfter': hero.soldiers,
      },
    );
    return count;
  }

  void _clearSquad(CampaignHero hero) {
    for (var slot = 0; slot < hero.squad.length; slot++) {
      hero.squad[slot] = BattleHealth(BattleSimulation.soldierHp, hp: 0);
    }
  }

  // 先清空随军记录保证幂等，再把实际生还者归入国家储备；超员永久丢弃。
  int _returnSoldiers(CampaignHero hero) {
    final count = hero.soldiers;
    _clearSquad(hero);
    final city = cities[hero.cityId];
    if (!hero.health.alive ||
        !heroes.contains(hero) ||
        _disbandAfterBattle.contains(hero.id) ||
        city == null ||
        city.ownerCountryId != hero.countryId) {
      return 0;
    }
    _trimCountryTroops(hero.countryId);
    final returned = math.min(
      count,
      reserveCapacityFor(hero.countryId) - reserveSoldiersFor(hero.countryId),
    );
    countryTroops
            .putIfAbsent(hero.countryId, () => CountryTroops())
            ._reserveSoldiers +=
        returned;
    return returned;
  }

  void _releaseDefender(CityBattle battle) {
    if (!battle.defender.health.alive) return;
    _returnSoldiers(battle.defender);
    if (cities[battle.city.id]!.ownerCountryId == battle.defender.countryId &&
        heroes.contains(battle.defender)) {
      battle.defender.hp = battle.defender.maxHp;
    }
  }

  /// 解释不能抽取英雄的原因，失败不扣钱。
  String? recruitmentBlockReason(int cityId, {int countryId = 0}) {
    if (isPaused) return '游戏已暂停';
    if (defeated) return '游戏已结束';
    if (cities[cityId]?.ownerCountryId != countryId) return '只能在本国城池招募';
    if (_recruitmentOffers.containsKey(countryId)) return '请先签约或放弃当前抽到的英雄';
    if (remainingHeroDraws(cityId) == 0) return '本城本月已招募，下月可再次招募';
    if (_heroPool.isEmpty) return '回收池暂时没有可招募英雄';
    final budget =
        GameConfig.heroDrawCost +
        (countryId == 0
            ? 0
            : math.max(
                1,
                _heroPool.values
                    .map((h) => h.salaryFor(countryId))
                    .reduce(math.max),
              ));
    if (goldFor(countryId) <= 0 || goldFor(countryId) < budget) {
      return countryId == 0 ? '金币不足' : '抽取及签约资金不足，需要 $budget 金币';
    }
    return null;
  }

  /// 从全国家共享池预留英雄；玩家等待签约，其他国家同次调用立即签约归队。
  RecruitmentOffer? drawHero(int cityId, {int countryId = 0}) {
    final problem = recruitmentBlockReason(cityId, countryId: countryId);
    if (problem != null) {
      _rejectEvent(
        GameEventKind.heroDrawn,
        problem,
        countryId: countryId,
        cityId: cityId,
      );
      return null;
    }
    final goldBefore = goldFor(countryId);
    final choices = _heroPool.values.toList();
    final hero = choices[_recruitmentRandom.nextInt(choices.length)];
    _heroPool.remove(hero.id);
    _countryGold[countryId] = goldFor(countryId) - GameConfig.heroDrawCost;
    final offer = RecruitmentOffer(
      hero: hero,
      cityId: cityId,
      countryId: countryId,
      initialSalary: hero.salaryFor(countryId),
      drawnMonth: settledMonths,
    );
    _recruitmentOffers[countryId] = offer;
    _emitEvent(
      GameEventKind.heroDrawn,
      '抽到${hero.name}，支付 ${GameConfig.heroDrawCost} 金币；将领已锁定，等待签约',
      countryId: countryId,
      cityId: cityId,
      data: {
        'sourceHeroId': hero.id,
        'heroName': hero.name,
        'goldBefore': goldBefore,
        'goldAfter': goldFor(countryId),
        'initialSalary': offer.initialSalary,
        'poolRemaining': recruitPool.length,
      },
    );
    // 所有操作同步完成，抽取前已备足最高签约费，中途不会被其他国家抽走。
    if (countryId == 0) {
      _record('${_cityName(cityId)}抽到${hero.name}，等待签约', log: false);
    } else {
      signHero(offer, countryId: countryId);
    }
    return offer;
  }

  /// 检查签约归属、候选有效期和费用，供界面与实际签约共用。
  bool canSignHero(RecruitmentOffer offer, {int countryId = 0}) =>
      !isPaused &&
      !defeated &&
      !offer.isExpired(settledMonths) &&
      offer.countryId == countryId &&
      identical(_recruitmentOffers[countryId], offer) &&
      cities[offer.cityId]?.ownerCountryId == countryId &&
      remainingHeroDraws(offer.cityId) > 0 &&
      goldFor(countryId) > 0 &&
      goldFor(countryId) >= offer.initialSalary &&
      !heroes.any((hero) => hero.sourceId == offer.hero.id);

  /// 合法城池不再限制招募人数，保留此查询供旧界面调用。
  bool recruitmentFull(int cityId) => cities[cityId] == null;

  /// 签约时重新验证候选、归属与首月月俸，人数不受城防限制。
  CampaignHero? signHero(RecruitmentOffer offer, {int countryId = 0}) {
    if (!canSignHero(offer, countryId: countryId)) {
      _rejectEvent(
        GameEventKind.heroSigned,
        '签约结果、归属、金币或游戏状态已变化',
        countryId: countryId,
        cityId: offer.cityId,
        data: {'sourceHeroId': offer.hero.id},
      );
      return null;
    }
    final goldBefore = goldFor(countryId);
    _countryGold[countryId] = goldFor(countryId) - offer.initialSalary;
    final hero = CampaignHero.fromRom(
      offer.hero,
      cityId: offer.cityId,
      countryId: countryId,
      initialSoldiers: GameConfig.recruitedHeroSoldiers,
    );
    hero._salaryPaidMonth = settledMonths;
    heroes.add(hero);
    _cityRecruitmentMonths[offer.cityId] = settledMonths;
    _recruitmentOffers.remove(countryId);
    _record(
      '${hero.name}已签约${_cityName(offer.cityId)}，首月月俸 ${offer.initialSalary} 金币',
      kind: GameEventKind.heroSigned,
      countryId: countryId,
      hero: hero,
      cityId: offer.cityId,
      data: {
        'cost': offer.initialSalary,
        'goldBefore': goldBefore,
        'goldAfter': goldFor(countryId),
      },
    );
    return hero;
  }

  /// 放弃签约返还英雄，但不退抽取费。
  bool declineHero(RecruitmentOffer offer, {int countryId = 0}) {
    if (isPaused ||
        defeated ||
        offer.isExpired(settledMonths) ||
        offer.countryId != countryId ||
        !identical(_recruitmentOffers[countryId], offer)) {
      _rejectEvent(
        GameEventKind.heroDeclined,
        '签约结果已失效或游戏暂停',
        countryId: countryId,
        cityId: offer.cityId,
        data: {'sourceHeroId': offer.hero.id},
      );
      return false;
    }
    _releaseOffer(countryId);
    _record(
      '已放弃与${offer.hero.name}签约',
      kind: GameEventKind.heroDeclined,
      countryId: countryId,
      cityId: offer.cityId,
      data: {
        'sourceHeroId': offer.hero.id,
        'heroName': offer.hero.name,
        'poolRemaining': recruitPool.length,
      },
    );
    return true;
  }

  void _releaseOffer(int countryId) {
    final offer = _recruitmentOffers.remove(countryId);
    if (offer == null) return;
    if (!heroes.any((hero) => hero.sourceId == offer.hero.id)) {
      _heroPool[offer.hero.id] = offer.hero;
    }
  }

  void _recycleHero(CampaignHero hero, {bool dismissed = false}) {
    hero._weaponIds.clear();
    _disbandAfterBattle.remove(hero.id);
    final definition = _catalog[hero.sourceId];
    if ((dismissed || GameConfig.recycleDefeatedHeroes) &&
        hero.type != HeroType.protagonist &&
        definition != null &&
        !heroes.any((active) => active.sourceId == hero.sourceId)) {
      _heroPool[hero.sourceId] = definition;
    }
  }

  void _settleMonth() {
    for (final id in _countryGold.keys.toList()..sort()) {
      final owned =
          cities.entries
              .where((entry) => entry.value.ownerCountryId == id)
              .toList()
            ..sort((a, b) => a.key.compareTo(b.key));
      final fixed = owned.isEmpty ? 0 : configFor(id).monthlyBaseIncome;
      // 无城国家不抽收成；有城国家只抽一次，城池数量不放大随机金额。
      final harvest = owned.isEmpty
          ? Harvest.normal
          : Harvest.draw(_economyRandom);
      final adjustment = harvest.drawAdjustment(_economyRandom);
      final cityIncomes = <CityIncomeSettlement>[];
      for (final entry in owned) {
        cityIncomes.add(
          CityIncomeSettlement(
            cityId: entry.key,
            level: entry.value.level,
            harvest: Harvest.normal,
            baseIncome: entry.value.income,
            adjustment: 0,
          ),
        );
      }
      final base = cityIncomes.fold(
        fixed,
        (sum, city) => sum + city.baseIncome,
      );
      final income = base + adjustment;
      final salary = GameConfig.chargeHeroSalary
          ? heroes
                .where(
                  (hero) =>
                      hero.countryId == id &&
                      hero.health.alive &&
                      hero._salaryPaidMonth != settledMonths,
                )
                .fold(0, (sum, hero) => sum + hero.salary)
          : 0;
      final before = goldFor(id);
      final accrued = owned.isEmpty || GameConfig.garrisonUpkeepFactor == 0
          ? 0.0
          : garrisonUpkeepAccruedFor(id);
      final upkeep = (accrued + 1e-9).floor();
      if (GameConfig.garrisonUpkeepFactor == 0) {
        _garrisonBills.remove(id); // 零驻军费不生成空账单，保持保存与恢复后的状态一致。
      } else {
        _garrisonBills[id] = math.max(0, accrued - upkeep);
      }
      final after = before + income - salary - upkeep;
      _countryGold[id] = after;
      final report = MonthlySettlement(
        year: year,
        month: month,
        harvest: harvest,
        cityCount: owned.length,
        baseIncome: base,
        adjustment: income - base,
        salary: salary,
        garrisonUpkeep: upkeep,
        goldBefore: before,
        goldAfter: after,
        fixedIncome: fixed,
        cityIncomes: cityIncomes,
      );
      _settlements[id] = report;
      _rollMonthlyWeaponDrops(id, owned.length);
      _emitEvent(
        GameEventKind.monthSettled,
        '${world.countryName(id)}国 $dateLabel ${report.harvestLabel}，收入 $income，月俸 $salary${upkeep > 0 ? '，驻军维持费 $upkeep' : ''}，国库 $before → $after',
        countryId: id,
        source: GameEventSource.system,
        data: {
          'baseIncome': base,
          'economyVersion': 3,
          'harvestScope': 'country',
          'adjustment': adjustment,
          'fixedIncome': fixed,
          'cities': [for (final city in cityIncomes) city.toJson()],
          'income': income,
          'salary': salary,
          'garrisonUpkeep': upkeep,
          'harvest': harvest.name,
          'cityCount': owned.length,
          'goldBefore': before,
          'goldAfter': after,
        },
      );
      if (id == 0) {
        _record(
          '$dateLabel结算 · ${report.harvestLabel} · 正常收入 $base，收成 ${report.adjustment >= 0 ? '+' : ''}${report.adjustment}，月俸 -$salary，军费 -$upkeep，国库 ${report.actualChange >= 0 ? '+' : ''}${report.actualChange}',
          log: false,
        );
      }
    }
    settledMonths++;
    for (final offer in _recruitmentOffers.values.toList()) {
      if (!offer.isExpired(settledMonths)) continue;
      _releaseOffer(offer.countryId);
      _record(
        '${offer.hero.name}签约期限已过，返回招募池',
        kind: GameEventKind.heroOfferExpired,
        countryId: offer.countryId,
        cityId: offer.cityId,
        source: GameEventSource.system,
        data: {'sourceHeroId': offer.hero.id, 'heroName': offer.hero.name},
      );
    }
  }

  /// 按单个英雄验证出击，不以城池等级限制同时出征的将领数量。
  String? dispatchBlockReason(CampaignHero hero, {int countryId = 0}) =>
      _dispatchProblem(hero, countryId);

  String? _dispatchProblem(CampaignHero hero, int countryId) {
    if (isPaused) return '游戏已暂停';
    if (defeated) return '游戏已结束，请重新开始';
    if (!heroes.contains(hero) || hero.hp <= 0) return '这位英雄已不存在';
    if (hero.countryId != countryId ||
        cities[hero.cityId]?.ownerCountryId != countryId) {
      return '英雄不在本国城池中';
    }
    if (marches.containsKey(hero.id)) return '这位英雄已经出征';
    if (_disbandAfterBattle.contains(hero.id)) return '所属城池已失守';
    if (battles.values.any(
      (battle) => battle.isActive && battle.defender == hero,
    )) {
      return '这位英雄正在守城交战';
    }
    return null;
  }

  /// 是否允许出击。
  bool canDispatch(CampaignHero hero, {int countryId = 0}) =>
      dispatchBlockReason(hero, countryId: countryId) == null;

  String? _upgradeParticipantProblem(
    int cityId,
    CampaignHero? hero,
    int countryId,
  ) {
    if (isPaused) return '游戏已暂停';
    if (defeated) return '游戏已结束，请重新开始';
    final city = cities[cityId];
    if (city == null || city.ownerCountryId != countryId) return '只能升级本国城池';
    if (city.baseUpgradeCost == null) return '城池已达到最高等级';
    if (hero == null || !heroes.contains(hero) || !hero.health.alive) {
      return '请先选择一位城内将领';
    }
    if (hero.countryId != countryId || hero.cityId != cityId) {
      return '请选择本城的本国将领';
    }
    if (marches.containsKey(hero.id)) return '出征或扎营中的将领不能主持升级';
    if (battles.values.any(
      (battle) =>
          battle.isActive &&
          (battle.attacker == hero || battle.defender == hero),
    )) {
      return '正在交战的将领不能主持升级';
    }
    return null;
  }

  /// 根据指定驻城将领计算实际升级费；参与者不合法或城池满级时不报价。
  int? upgradeCostFor(int cityId, CampaignHero? hero, {int countryId = 0}) {
    if (_upgradeParticipantProblem(cityId, hero, countryId) != null) {
      return null;
    }
    return math.max(
      0,
      cities[cityId]!.baseUpgradeCost! - math.max(0, hero!.politics),
    );
  }

  /// 当前年份允许升级到的城防等级，不影响开局已有等级。
  int get cityUpgradeLevelLimit => GameConfig.cityUpgradeLimitForYear(year);

  /// 每城每月只能升级一次，同时遵守本年度城防上限。
  String? upgradeWindowBlockReason(int cityId) {
    if (_cityUpgradeMonths[cityId] == settledMonths) {
      return '本城本月已升级，下月可再次升级';
    }
    final level = cities[cityId]?.level;
    if (level == null ||
        level >= GameConfig.maxCityLevel ||
        level < cityUpgradeLevelLimit) {
      return null;
    }
    final availableYear =
        GameConfig.initialYear +
        ((level + 1 - GameConfig.firstYearCityUpgradeLimit) /
                GameConfig.cityUpgradeLevelsPerYear)
            .ceil();
    return '第 $availableYear 年可升至 ${level + 1} 级';
  }

  /// 统一检查主持将领、城防上限与金币。
  String? upgradeBlockReason(
    int cityId,
    CampaignHero? hero, {
    int countryId = 0,
  }) {
    final problem = _upgradeParticipantProblem(cityId, hero, countryId);
    if (problem != null) return problem;
    final window = upgradeWindowBlockReason(cityId);
    if (window != null) return window;
    final cost = upgradeCostFor(cityId, hero, countryId: countryId)!;
    return goldFor(countryId) <= 0 || goldFor(countryId) < cost
        ? '金币不足，需要 $cost 金币'
        : null;
  }

  /// 由指定驻城将领主持升级，费用减去其内政，最低为零；将领不被消耗。
  bool upgradeCity(
    int cityId, {
    required CampaignHero? hero,
    int countryId = 0,
  }) {
    final problem = upgradeBlockReason(cityId, hero, countryId: countryId);
    if (problem != null) {
      _rejectEvent(
        GameEventKind.cityUpgraded,
        problem,
        countryId: countryId,
        hero: hero,
        cityId: cityId,
      );
      return false;
    }
    final city = cities[cityId]!;
    final before = _eventResources(countryId), oldLevel = city.level;
    final cost = upgradeCostFor(cityId, hero, countryId: countryId)!;
    _countryGold[countryId] = goldFor(countryId) - cost;
    city._level++;
    _cityUpgradeMonths[cityId] = settledMonths;
    _refreshCityApproaches(cityId);
    _record(
      '${hero!.name}主持${_cityName(cityId)}升至 ${city.level} 级，花费 $cost 金币，每月收入 ${city.income}',
      kind: GameEventKind.cityUpgraded,
      countryId: countryId,
      hero: hero,
      cityId: cityId,
      data: {
        'levelBefore': oldLevel,
        'levelAfter': city.level,
        'politics': hero.politics,
        'cost': cost,
        'before': before,
        'after': _eventResources(countryId),
      },
    );
    return true;
  }

  /// 提交合法目标；weaponSlots 指定英雄槽位对应的库存武器编号，确认前不扣兵器。
  HeroMarch? dispatch(
    CampaignHero hero,
    CityDefinition target, {
    int countryId = 0,
    Map<int, int> weaponSlots = const {},
  }) {
    if (!world.cities.contains(target)) return null;
    return dispatchTo(
      hero,
      cityBounds(target).center,
      countryId: countryId,
      weaponSlots: weaponSlots,
    );
  }

  /// 确认目标后预留兵器与兵员，staggerDeparture 使同国出征至少间隔两秒。
  HeroMarch? dispatchTo(
    CampaignHero hero,
    GamePoint point, {
    int countryId = 0,
    Map<int, int> weaponSlots = const {},
    bool staggerDeparture = false,
  }) {
    final problem = dispatchBlockReason(hero, countryId: countryId);
    if (problem != null || !_containsPoint(point)) {
      _rejectEvent(
        GameEventKind.heroDispatched,
        problem ?? '目标不在地图内',
        countryId: countryId,
        hero: hero,
        data: {
          'target': [point.dx, point.dy],
        },
      );
      return null;
    }
    final target = cityAt(point);
    final source = world.cities.firstWhere((city) => city.id == hero.cityId);
    if (target == source || !_validWeaponSelection(hero, weaponSlots)) {
      _rejectEvent(
        GameEventKind.heroDispatched,
        target == source ? '目标仍是出发城' : '装备选择已失效',
        countryId: countryId,
        hero: hero,
        cityId: target?.id,
      );
      return null;
    }
    final before = _eventResources(countryId);
    _loadDispatchWeapons(hero, weaponSlots);
    reinforceHero(hero, countryId: countryId);
    final start = _departurePoint(source, point);
    final end = target == null ? point : _contactPoint(start, point, target);
    final march = HeroMarch(
      hero: hero,
      target: target,
      position: start,
      destination: end,
    );
    marches[hero.id] = march;
    march.moveTo(end, city: target);
    // 同点派遣先在城内候发，避免出城瞬间生成重叠人物。
    march._departurePending = _trafficOccupied(start, except: march);
    if (staggerDeparture) _scheduleDeparture(march);
    _aiOrderVersions.update(hero.id, (n) => n + 1, ifAbsent: () => 1);
    if (hero.isPlayer) hasDispatched = true;
    _emitEvent(
      GameEventKind.heroDispatched,
      '命令${hero.name}出征${target == null ? '指定位置' : '${cityName(target.id)}国城池'}',
      countryId: countryId,
      hero: hero,
      cityId: source.id,
      targetCountryId: target == null
          ? null
          : cities[target.id]!.ownerCountryId,
      data: {
        'targetCityId': target?.id,
        'before': before,
        'after': _eventResources(countryId),
        'hero': _eventHero(hero),
      },
    );
    return march;
  }

  /// 玩家和 AI 共用改令权限，交战及撤退过场不能免费脱离。
  String? moveBlockReason(String heroId, {int countryId = 0}) =>
      _moveProblem(heroId, countryId);

  String? _moveProblem(String heroId, int countryId) {
    if (isPaused) return '游戏已暂停';
    if (defeated) return '游戏已结束';
    final march = marches[heroId];
    if (march == null ||
        !heroes.contains(march.hero) ||
        !march.hero.health.alive) {
      return '英雄已不在野外';
    }
    if (march.waitingForDeparture) return '将领正在等待离城';
    if (march.hero.countryId != countryId) return '只能指挥本国将领';
    if (_disbandAfterBattle.contains(heroId) ||
        cities[march.hero.cityId]?.ownerCountryId != countryId) {
      return '所属城池已失守';
    }
    if (activeBattleForHero(heroId) != null) {
      return '交战或撤退过场中无法改令';
    }
    return null;
  }

  /// 为本国已经出征的英雄重新指定目的地，默认仍为玩家国家。
  bool moveTo(String heroId, GamePoint point, {int countryId = 0}) {
    final problem = moveBlockReason(heroId, countryId: countryId);
    if (problem != null) {
      _rejectEvent(
        GameEventKind.heroMoved,
        problem,
        countryId: countryId,
        hero: marches[heroId]?.hero,
        data: {'heroId': heroId},
      );
      return false;
    }
    final march = marches[heroId];
    if (activeBattleForHero(heroId) != null) {
      return false;
    }
    if (march == null || !_containsPoint(point)) {
      _rejectEvent(
        GameEventKind.heroMoved,
        '目标不在地图内',
        countryId: countryId,
        hero: march?.hero,
      );
      return false;
    }
    final before = _eventHero(march.hero);
    final city = cityAt(point);
    if (city != null &&
        !march.returningFromRetreat &&
        city == march.target &&
        (march.phase == MarchPhase.fighting ||
            march.phase == MarchPhase.awaitingBattle)) {
      return true;
    }
    _endBattle(march, '${march.hero.name}已撤离');
    if (_disbandAfterBattle.contains(heroId)) {
      _disbandHero(march.hero);
      return false;
    }
    // 仅在合法手动改令落实时取消返程；无效点击不丢失原路。
    march._returningFromRetreat = false;
    march._returnRoute.clear();
    march.moveTo(
      city == null ? point : _contactPoint(march.position, point, city),
      city: city,
    );
    _aiOrderVersions.update(heroId, (n) => n + 1, ifAbsent: () => 1);
    _emitEvent(
      GameEventKind.heroMoved,
      '命令${march.hero.name}改变行军目标',
      countryId: countryId,
      hero: march.hero,
      cityId: city?.id,
      data: {'before': before, 'after': _eventHero(march.hero)},
    );
    return true;
  }

  /// 扎营权限与改令共用锁定规则，零金币仍允许停止。
  String? campBlockReason(String heroId, {int countryId = 0}) {
    final problem = _moveProblem(heroId, countryId);
    if (problem != null) return problem;
    return marches[heroId]?.returningFromRetreat == true
        ? '撤退返程中请先指定移动目标'
        : null;
  }

  /// 命令一支部队原地扎营，其他行军和交战照常推进。
  bool camp(String heroId, {int countryId = 0}) {
    final problem = campBlockReason(heroId, countryId: countryId);
    if (problem != null) {
      _rejectEvent(
        GameEventKind.heroCamped,
        problem,
        countryId: countryId,
        hero: marches[heroId]?.hero,
        data: {'heroId': heroId},
      );
      return false;
    }
    final march = marches[heroId];
    if (activeBattleForHero(heroId) != null ||
        march?.returningFromRetreat == true) {
      return false;
    }
    if (march == null) return false;
    _endBattle(march, '${march.hero.name}已停止进攻');
    if (_disbandAfterBattle.contains(heroId)) {
      _disbandHero(march.hero);
      return false;
    }
    march.camp();
    _aiOrderVersions.update(heroId, (n) => n + 1, ifAbsent: () => 1);
    _record(
      '${march.hero.name}已原地扎营',
      kind: GameEventKind.heroCamped,
      countryId: countryId,
      hero: march.hero,
      data: {'hero': _eventHero(march.hero)},
    );
    return true;
  }

  bool _containsPoint(GamePoint point) =>
      point.dx.isFinite &&
      point.dy.isFinite &&
      (GamePoint.zero & world.pixelSize).contains(point);

  CityContact _cityContact(CityDefinition city) =>
      CityContact.forAppearance(city.appearanceAt(cities[city.id]!.level));

  // 绘制图块中包含旗杆和草地，行军必须使用实体轮廓而非点击外框。
  GamePoint _departurePoint(CityDefinition source, GamePoint toward) {
    final rect = cityBounds(source);
    final point =
        rect.topLeft +
        _cityContact(source)
            .departure(rect.size.center(GamePoint.zero), toward - rect.topLeft);
    return GamePoint(
      point.dx.clamp(8.0, world.pixelSize.width - 8),
      point.dy.clamp(8.0, world.pixelSize.height - 8),
    );
  }

  GamePoint _contactPoint(GamePoint from, GamePoint aim, CityDefinition city) {
    final origin = cityBounds(city).topLeft;
    return origin + _cityContact(city).approach(from - origin, aim - origin);
  }

  // 建筑变化时更新在途目标；已经交战的部队只调整贴城位置，不重开战斗。
  void _refreshCityApproaches(int cityId) {
    for (final march in marches.values.where(
      (march) => march.target?.id == cityId,
    )) {
      if (march.phase == MarchPhase.dueling ||
          march.phase == MarchPhase.awaitingBattle) {
        continue;
      }
      final target = march.target!;
      if (march.phase == MarchPhase.camped || march.waitingForDeparture) {
        // 断粮返程仍保留目标城，城堡变化只能更新终点，不能把远处营地吸到城边。
        march.destination = _contactPoint(
          march.position,
          cityBounds(target).center,
          target,
        );
        march._trafficRoute.clear();
        continue;
      }
      if (march.phase == MarchPhase.marching) {
        final point = _contactPoint(
          march.position,
          cityBounds(target).center,
          target,
        );
        march._resumeToward(point, city: target);
      } else {
        final origin = cityBounds(target).topLeft;
        march.position =
            origin + _cityContact(target).nearest(march.position - origin);
        march.destination = march.position;
      }
    }
  }

  void _endBattle(HeroMarch march, String outcome) {
    final battle = battles[march.target?.id];
    if (battle != null && battle.isActive && battle.attacker == march.hero) {
      battle.outcome = outcome;
      battle.nextWaveIn = 0;
      battle.simulation.stop();
      _releaseDefender(battle);
      _settleSiegeDamage(battle);
      _battleEvent(GameEventKind.battleEnded, battle, outcome);
    }
  }

  // 胜轮必定降级时不消费随机数；互刺不增加胜轮，之前的胜轮仍正常结算。
  int _damageCity(int cityId, int victories) {
    var damage = 0;
    for (var round = 0; round < victories; round++) {
      if (GameConfig.cityDamageChancePerVictory >= 1 ||
          _siegeRandom.nextDouble() < GameConfig.cityDamageChancePerVictory) {
        damage++;
      }
    }
    final city = cities[cityId]!;
    final before = city.level;
    city._level = math.max(1, before - damage);
    _trimCountryTroops(city.ownerCountryId);
    if (city.level != before) _refreshCityApproaches(cityId);
    _emitEvent(
      GameEventKind.cityDamaged,
      '攻城结算：城防 $before → ${city.level} 级',
      countryId: city.ownerCountryId,
      cityId: cityId,
      source: GameEventSource.system,
      data: {
        'victories': victories,
        'levelBefore': before,
        'levelAfter': city.level,
        'reserveAfter': reserveSoldiersFor(city.ownerCountryId),
      },
    );
    return before - city.level;
  }

  void _settleSiegeDamage(CityBattle battle) {
    if (battle._damageSettled) return;
    battle._damageSettled = true;
    if (cities[battle.city.id]!.ownerCountryId != battle.defendingCountryId ||
        battle.victories == 0) {
      return;
    }
    battle.defenseLoss = _damageCity(battle.city.id, battle.victories);
    final message = battle.defenseLoss == 0
        ? '${cityName(battle.city.id)}攻城结束，城防保持 ${cities[battle.city.id]!.level} 级'
        : '${cityName(battle.city.id)}攻城结束，城防降低 ${battle.defenseLoss} 级';
    battle.record(message);
    _record(message);
  }

  /// 单次已结束的战败事件；守城失败按一次胜轮结算破坏，一级城则失守。
  DefeatResult? defeatHero(
    String heroId, {
    required int winnerCountryId,
    int? defendedCityId,
  }) {
    if (isPaused || _defeatReason != null) return null;
    final result = _removeDefeatedHero(
      heroId,
      winnerCountryId: winnerCountryId,
      defendedCityId: defendedCityId,
    );
    if (result != null) _finishDefeat();
    return result;
  }

  DefeatResult? _removeDefeatedHero(
    String heroId, {
    required int winnerCountryId,
    int? defendedCityId,
    bool settleCityDefense = true,
    bool endBattle = true,
  }) {
    final hero = heroes.where((hero) => hero.id == heroId).firstOrNull;
    if (hero == null ||
        hero.countryId == winnerCountryId ||
        winnerCountryId < 0 ||
        winnerCountryId >= 16) {
      return null;
    }
    // 守城影响必须显式指向当前城池，出征英雄不能冒充出发城守将。
    if (defendedCityId != null &&
        (defendedCityId != hero.cityId ||
            cities[defendedCityId]?.ownerCountryId != hero.countryId ||
            marches.containsKey(hero.id))) {
      return null;
    }
    final city = cities[hero.cityId]!;
    final oldLevel = city.level;
    final previousName = cityName(hero.cityId);
    final removed = <String>[hero.id];
    final march = marches[hero.id];
    if (march != null && endBattle) _endBattle(march, '${hero.name}战败');
    hero.hp = 0;
    marches.remove(hero.id);
    heroes.remove(hero);
    _clearSquad(hero);
    _recycleHero(hero);
    var captured = false;
    if (defendedCityId != null && settleCityDefense) {
      if (city.level == 1 ||
          !garrisonAt(hero.cityId).any((h) => h.health.alive)) {
        captured = true;
        removed.addAll(_captureCity(hero.cityId, winnerCountryId));
      } else {
        _damageCity(hero.cityId, 1);
      }
    }
    _trimCountryTroops(hero.countryId);
    _record(
      captured
          ? '${hero.name}战败，$previousName失守，未出战英雄已移除'
          : defendedCityId != null
          ? '${hero.name}守城战败'
          : '${hero.name}进攻战败，出征部队已损失',
      kind: GameEventKind.heroDied,
      hero: hero,
      cityId: hero.cityId,
      targetCountryId: winnerCountryId,
      source: GameEventSource.system,
      data: {
        'defendedCityId': defendedCityId,
        'captured': captured,
        'removedHeroIds': removed,
      },
    );
    return (
      cityId: hero.cityId,
      oldLevel: oldLevel,
      newLevel: city.level,
      captured: captured,
      removedHeroIds: List.unmodifiable(removed),
    );
  }

  /// 固定步长推进行军和拼杀，满一个月结算各国经济；观战不参与计时。
  bool advance(double elapsed) {
    if (isPaused) return false;
    _ai?.diagnostics.beginFrame();
    final justDefeated = _finishDefeat();
    if (defeated) {
      // 世界结束后不经营或行军，只让失城时已经开打的部队完成交战再消失。
      return _advanceBattles(elapsed, closingOnly: true) || justDefeated;
    }
    _simulationFraction += elapsed.isFinite ? math.max(0.0, elapsed) : 0.0;
    var changed = false;
    for (final offer in _recruitmentOffers.values.toList()) {
      if (cities[offer.cityId]?.ownerCountryId != offer.countryId) {
        _releaseOffer(offer.countryId);
        _record('招募城池已易主，待签约英雄返回回收池');
        changed = true;
      }
    }
    const dt = BattleSimulation.fixedStep;
    while (_simulationFraction >= dt - 1e-9) {
      _simulationFraction = math.max(0, _simulationFraction - dt);
      _strategyTime += dt;
      changed = (_ai?.commitAndTasks() ?? false) || changed;
      _accrueGarrisonUpkeep(dt);
      changed = _advanceRetreatReturns() || changed;
      final previousPositions = {
        for (final march in marches.values) march.hero.id: march.position,
      };
      for (final march in marches.values) {
        final terrain = world.movementTerrainAt(cellAt(world, march.position));
        final previous = march.position;
        changed = _advanceMarchTraffic(march, dt) || changed;
        if (march.returningFromRetreat &&
            march.phase == MarchPhase.camped &&
            march.target == null &&
            !march.supplyHalted) {
          _nextRetreatLeg(march);
        }
        // 检查实际走过的线段，避免低帧率或远距离指令穿过敌城而不交战。
        if (!march.waitingForDeparture &&
            !march.returningFromRetreat &&
            (previous != march.position ||
                march.phase == MarchPhase.marching ||
                march._trafficBlocked)) {
          CityDefinition? encountered;
          var nearest = 2.0;
          for (final city in world.cities) {
            if (cities[city.id]!.ownerCountryId == march.hero.countryId) {
              continue;
            }
            final origin = cityBounds(city).topLeft;
            final contact = _cityContact(city);
            // 已贴城时也必须拦截，不能利用起点在轮廓内的线段跳过城战。
            final fraction = contact.contains(previous - origin)
                ? 0.0
                : contact.entryFraction(
                    previous - origin,
                    march.position - origin,
                  );
            if (fraction != null && fraction < nearest) {
              nearest = fraction;
              encountered = city;
            }
          }
          if (encountered != null) {
            final entry = previous + (march.position - previous) * nearest;
            march.walkDistance -= (march.position - entry).distance;
            march.position = entry;
            march.destination = entry;
            march.target = encountered;
            march._trafficBlocked = false;
            march._trafficRoute.clear();
            march.phase = MarchPhase.awaitingBattle;
            changed = true;
          }
        }
        changed =
            terrain != world.movementTerrainAt(cellAt(world, march.position)) ||
            changed;
      }
      _markSiegeArrivals();
      for (final entry in previousPositions.entries) {
        final march = marches[entry.key];
        if (march != null) {
          _aiVelocity[entry.key] = (march.position - entry.value) / dt;
        }
      }
      changed = _resolveFieldEncounters(previousPositions) || changed;
      _scanTerritoryEntries();
      changed = _resolveArrivals() || changed;
      if (_finishDefeat() || defeated) return true;
      changed = _advanceBattles(dt) || changed;
      // 战斗中的阵亡也会降低容量，不能把超额库存留到下一次招兵时再处理。
      for (final country in countryTroops.keys.toList()) {
        _trimCountryTroops(country);
      }
      if (_finishDefeat() || defeated) return true;
      _monthSeconds += dt;
      if (_monthSeconds >= GameConfig.secondsPerMonth - 1e-9) {
        _monthSeconds = math.max(0, _monthSeconds - GameConfig.secondsPerMonth);
        _settleMonth();
        for (final id in cities.values.map((c) => c.ownerCountryId).toSet()) {
          _ai?.urgent(id, reason: '完成月度结算');
        }
        changed = true;
      }
    }
    // 一次补帧只提交最新观察；后台结果在后续固定命令阶段落地。
    if (elapsed.isFinite && elapsed > 0) {
      _ai?.requestLatest();
      if (_ai?.worker?.synchronous == true) {
        changed = (_ai?.commitAndTasks() ?? false) || changed;
      }
    }
    _ai?.diagnostics.endFrame();
    return changed;
  }

  bool _advanceBattles(double dt, {bool closingOnly = false}) {
    var changed = false;
    for (final battle in allBattles.toList()) {
      if (closingOnly && !_hasDisbandingArmy(battle)) continue;
      changed = battle.simulation.advance(dt) || changed;
      final troopCount = battle.attacker.soldiers + battle.defender.soldiers,
          weaponCount =
              battle.attacker.weaponIds.length +
              battle.defender.weaponIds.length;
      if (battle._aiNoticedClashes != battle.rounds ||
          battle._aiNoticedAttackerHp != battle.attacker.hp ||
          battle._aiNoticedDefenderHp != battle.defender.hp ||
          battle._aiNoticedTroops != troopCount ||
          battle._aiNoticedWeapons != weaponCount) {
        battle._aiNoticedTroops = troopCount;
        battle._aiNoticedWeapons = weaponCount;
        battle._aiNoticedClashes = battle.rounds;
        battle._aiNoticedAttackerHp = battle.attacker.hp;
        battle._aiNoticedDefenderHp = battle.defender.hp;
        _ai?.urgent(battle.attacker.countryId, reason: '战况、兵力或武器发生变化');
        _ai?.urgent(battle.defender.countryId, reason: '战况、兵力或武器发生变化');
      }
      if (!battle.isActive) continue;
      if (!closingOnly) changed = _tryAutomaticWeapons(battle) || changed;
      if (battle.simulation.result != null && !battle._settled) {
        battle._settled = true;
        if (battle.simulation.retreat?.succeeded == true) {
          _settleSuccessfulRetreat(battle);
        } else if (battle is FieldBattle) {
          _settleFieldBattle(battle);
        } else {
          _settleBattle(battle as CityBattle);
        }
        if (battle.simulation.retreat?.succeeded == false) {
          battle.outcome = battle.simulation.retreatMessage;
          battle.record(battle.outcome!);
          _record(battle.outcome!);
          _battleEvent(
            GameEventKind.retreatResolved,
            battle,
            battle.outcome!,
            data: {'succeeded': false},
          );
        }
        _disbandFinishedArmies(battle);
        if (battle is CityBattle && !battle.isActive) {
          _settleSiegeDamage(battle);
        }
        changed = true;
        if (!closingOnly && (_finishDefeat() || defeated)) break;
      } else if (battle is CityBattle && battle.nextWaveIn > 0) {
        battle.nextWaveIn = math.max(0, battle.nextWaveIn - dt);
        if (battle.nextWaveIn == 0) {
          changed = _protectAiCity(battle.city.id, force: true) || changed;
          final next = _pickDefender(battle.city.id);
          if (next != null) {
            reinforceHero(next, countryId: next.countryId);
            battle._nextDefender(next);
            _battleEvent(
              GameEventKind.battleStarted,
              battle,
              '下一轮攻城：${next.name}迎战',
              data: {'effectiveDefenseLevel': battle.effectiveDefenseLevel},
            );
          } else if (!garrisonAt(battle.city.id)
              .any((hero) => hero.health.alive)) {
            _finishOccupation(battle);
          } else {
            battle.nextWaveIn = BattleSimulation.fixedStep;
          }
          changed = true;
        }
      }
    }
    return changed;
  }

  void _settleBattle(CityBattle battle) {
    final attacker = battle.attacker;
    final defender = battle.defender;
    final lostAttacker = !attacker.health.alive;
    final lostDefender = !defender.health.alive;
    _battleEvent(
      GameEventKind.battleWaveEnded,
      battle,
      '本轮对阵结束：${lostAttacker ? '攻方战败' : '攻方存活'}，${lostDefender ? '守方战败' : '守方存活'}',
      data: {'lostAttacker': lostAttacker, 'lostDefender': lostDefender},
    );
    if (lostDefender && !lostAttacker) battle.victories++;
    if (lostAttacker) {
      // 先清理本轮全部伤亡，再统一结束；死亡清理不能提前发布不完整或重复战报。
      _removeDefeatedHero(
        attacker.id,
        winnerCountryId: defender.countryId,
        endBattle: false,
      );
    }
    if (lostDefender) {
      _removeDefeatedHero(
        defender.id,
        winnerCountryId: attacker.countryId,
        defendedCityId: battle.city.id,
        settleCityDefense: false,
      );
      battle.record('${defender.name}战败');
    }
    if (lostAttacker) {
      battle.outcome = lostDefender ? '双方将领阵亡' : '${attacker.name}战败';
      if (!lostDefender) _releaseDefender(battle);
      battle.simulation.stop();
      _battleEvent(GameEventKind.battleEnded, battle, battle.outcome!);
      return;
    }
    final city = cities[battle.city.id]!;
    if (battle.victories >= battle.initialCityLevel ||
        city.ownerCountryId == attacker.countryId ||
        !garrisonAt(battle.city.id).any((hero) => hero.health.alive)) {
      _finishOccupation(battle);
    } else {
      battle.nextWaveIn = 1.2;
    }
  }

  List<String> _captureCity(int cityId, int winnerCountryId) {
    final previousOwner = cities[cityId]!.ownerCountryId;
    final oldLevel = cities[cityId]!.level;
    final departed = heroes
        .where(
          (hero) =>
              hero.cityId == cityId &&
              hero.countryId != winnerCountryId &&
              marches.containsKey(hero.id),
        )
        .toList();
    final removedHeroes = heroes
        .where(
          (hero) =>
              hero.cityId == cityId &&
              hero.countryId != winnerCountryId &&
              !marches.containsKey(hero.id),
        )
        .toList();
    final removed = removedHeroes.map((hero) => hero.id).toList();
    heroes.removeWhere((hero) => removed.contains(hero.id));
    for (final hero in removedHeroes) {
      hero.hp = 0;
      _clearSquad(hero);
      _recycleHero(hero);
      _emitEvent(
        GameEventKind.heroDisbanded,
        '城池失守，未出战的${hero.name}离队',
        hero: hero,
        cityId: cityId,
        targetCountryId: winnerCountryId,
        source: GameEventSource.system,
      );
    }
    for (final hero in departed) {
      final battle = activeBattleForHero(hero.id);
      if (battle != null && !battle.simulation.finished) {
        _disbandAfterBattle.add(hero.id);
      } else {
        _disbandHero(hero);
        removed.add(hero.id);
      }
    }
    cities[cityId]!.ownerCountryId = winnerCountryId;
    _clearDefeatedTreasury(previousOwner);
    _ai?.urgent(previousOwner, reason: '本国城池失守');
    _ai?.urgent(winnerCountryId, reason: '占领新城，需要重新安排资源');
    _trimCountryTroops(previousOwner);
    _trimCountryTroops(winnerCountryId);
    for (final offer in _recruitmentOffers.values.toList()) {
      if (offer.cityId == cityId && offer.countryId != winnerCountryId) {
        _releaseOffer(offer.countryId);
      }
    }
    _refreshCityApproaches(cityId);
    final captureData = <String, Object?>{
      'previousOwner': previousOwner,
      'newOwner': winnerCountryId,
      'levelBefore': oldLevel,
      'levelAfter': cities[cityId]!.level,
      'removedHeroIds': List.of(removed),
      'disbandAfterBattle': [
        for (final h in departed)
          if (_disbandAfterBattle.contains(h.id)) h.id,
      ],
    };
    _emitEvent(
      GameEventKind.cityCaptured,
      '攻下${world.countryName(previousOwner)}国城池，城防重置为一级',
      countryId: winnerCountryId,
      targetCountryId: previousOwner,
      cityId: cityId,
      source: GameEventSource.system,
      data: captureData,
    );
    _emitEvent(
      GameEventKind.cityLost,
      '城池被${world.countryName(winnerCountryId)}国占领，重新判断国家存续',
      countryId: previousOwner,
      targetCountryId: winnerCountryId,
      cityId: cityId,
      source: GameEventSource.system,
      data: captureData,
    );
    return removed;
  }

  bool _hasDisbandingArmy(WorldBattle battle) =>
      _disbandAfterBattle.contains(battle.attacker.id) ||
      _disbandAfterBattle.contains(battle.defender.id);

  void _disbandFinishedArmies(WorldBattle battle) {
    final marked = [
      battle.attacker,
      battle.defender,
    ].where((hero) => _disbandAfterBattle.contains(hero.id)).toList();
    if (marked.isEmpty) return;
    for (final hero in marked) {
      _disbandHero(hero, endBattle: false);
    }
    if (battle is CityBattle) {
      battle.nextWaveIn = 0;
      _releaseDefender(battle);
    }
    battle.outcome =
        '${battle.outcome ?? '交战结束'} · 出发城失守，${marked.map((hero) => hero.name).join('、')}部队已消失';
    battle.simulation.stop();
    if (battle is CityBattle) _settleSiegeDamage(battle);
  }

  void _disbandHero(CampaignHero hero, {bool endBattle = true}) {
    if (endBattle) {
      // 换守将的间隙已经结束上一场拼杀，不能让失城部队继续进入下一轮。
      final battle = activeBattleForHero(hero.id);
      if (battle != null) {
        battle.outcome = '${hero.name}的出发城已失守，部队消失';
        if (battle is CityBattle) {
          battle.nextWaveIn = 0;
          _releaseDefender(battle);
          _settleSiegeDamage(battle);
        }
        battle.simulation.stop();
      }
    }
    hero.hp = 0;
    marches.remove(hero.id);
    heroes.remove(hero);
    _clearSquad(hero);
    _trimCountryTroops(hero.countryId);
    _recycleHero(hero);
    _record(
      '${hero.name}的出发城已失守，部队消失',
      kind: GameEventKind.heroDisbanded,
      hero: hero,
      cityId: hero.cityId,
      source: GameEventSource.system,
    );
  }

  void _station(HeroMarch march) {
    final previousCity = march.hero.cityId,
        before = _eventResources(march.hero.countryId);
    _endBattle(march, '${march.hero.name}已进驻${cityName(march.target!.id)}');
    marches.remove(march.hero.id);
    march.hero.cityId = march.target!.id;
    _aiOrderVersions.update(march.hero.id, (n) => n + 1, ifAbsent: () => 1);
    march.hero.hp = march.hero.maxHp;
    final returned = _returnSoldiers(march.hero);
    _returnWeapons(march.hero);
    _record(
      '${march.hero.name}已进驻${cityName(march.target!.id)}，$returned 名士兵归营',
      kind: GameEventKind.heroStationed,
      hero: march.hero,
      cityId: march.target!.id,
      source: GameEventSource.system,
      data: {
        'previousCityId': previousCity,
        'returnedSoldiers': returned,
        'before': before,
        'after': _eventResources(march.hero.countryId),
        'hero': _eventHero(march.hero),
      },
    );
  }

  /// 城池展示所属国家名称，易主立即更新，静态地图名仅保留作来源记录。
  String cityName(int id) => world.countryName(cities[id]!.ownerCountryId);

  String _cityName(int id) => cityName(id);
  void _record(
    String event, {
    GameEventKind kind = GameEventKind.message,
    int? countryId,
    int? targetCountryId,
    CampaignHero? hero,
    int? cityId,
    GameEventSource? source,
    GameEventPhase phase = GameEventPhase.applied,
    String? reason,
    Map<String, Object?> data = const {},
    bool log = true,
  }) {
    lastEvent = event;
    journal.add(event);
    if (journal.length > 8) journal.removeAt(0);
    if (log) {
      _emitEvent(
        kind,
        event,
        countryId: countryId,
        targetCountryId: targetCountryId,
        hero: hero,
        cityId: cityId,
        source: source,
        phase: phase,
        reason: reason,
        data: data,
      );
    }
  }
}
