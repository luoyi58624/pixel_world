import 'dart:math' as math;
import 'dart:ui';

import '../game_config.dart';

import 'battle_simulation.dart';
import 'hero_sprite.dart';
import 'rom_hero.dart';
import 'world_data.dart';
import 'world_movement.dart';
import 'economy.dart';
import 'recruitment.dart';
import 'field_terrain.dart';

part 'country_ai.dart';
part 'field_battles.dart';
part 'siege_battles.dart';

/// 新游戏的城池状态，经济和等级规则独立于原 ROM。
class CitySituation {
  /// 按配置初始化；countOwnedHeroes 实时统计该城所属国的存活将领，含出征部队。
  CitySituation({
    required this._ownerCountryId,
    required this.defense,
    required this.baseIncome,
    required int initialLevel,
    int initialReserveSoldiers = GameConfig.initialCityReserves,
    this._countOwnedHeroes,
  }) : _level = initialLevel {
    if (initialLevel < 1 || initialLevel > maxLevel) {
      throw ArgumentError.value(initialLevel, 'initialLevel', '等级必须为 1 到 5');
    }
    if (initialReserveSoldiers < 0 ||
        initialReserveSoldiers > reserveCapacity) {
      throw ArgumentError.value(
        initialReserveSoldiers,
        'initialReserveSoldiers',
        '初始储备超过城防等级与所属英雄提供的容量',
      );
    }
    _reserveSoldiers = initialReserveSoldiers;
  }

  /// 易主时重置一级和十名储备兵，同国重复进驻不刷新等级或储备。
  int get ownerCountryId => _ownerCountryId;
  set ownerCountryId(int value) {
    if (value == _ownerCountryId) return;
    _ownerCountryId = value;
    _level = 1;
    _reserveSoldiers = GameConfig.capturedCityReserves;
  }

  int _ownerCountryId;
  final int Function(int countryId)? _countOwnedHeroes;

  /// 编号 0 是玩家国家。
  bool get isPlayer => ownerCountryId == 0;

  /// 基础城防，用于界面展示。
  final int defense;

  /// 一级城市的基础月收入。
  final int baseIncome;
  int _level;

  /// 当前等级，始终处于 1 到 5。
  int get level => _level;

  /// 月收入随等级线性增长。
  int get income => baseIncome + (level - 1) * GameConfig.cityIncomePerLevel;

  /// 扣除将领内政前的升级基础费，满级后为空。
  int? get baseUpgradeCost =>
      level < maxLevel ? GameConfig.cityUpgradeCosts[level - 1] : null;

  /// 城池最高等级。
  static const maxLevel = GameConfig.maxCityLevel;

  int _reserveSoldiers = GameConfig.initialCityReserves;
  int _recruitmentMonth = -1;
  int _recruitmentDraws = 0;
  int _recruitmentSignedMonth = -1;

  /// 独立储备兵员，不包含英雄已经携带的士兵。
  int get reserveSoldiers => _reserveSoldiers;

  /// 动态征兵上限：城防等级乘四加所属存活英雄数乘四，出征不减少名额。
  /// 降级、失去英雄或占领奖励产生的超额兵员保留，消耗到上限以下才能再征兵。
  int get reserveCapacity =>
      level * GameConfig.cityReserveCapacityPerLevel +
      (_countOwnedHeroes?.call(ownerCountryId) ?? 0) *
          GameConfig.cityReserveCapacityPerHero;
}

/// 带有身份、所属城池及可变生命值的英雄，静态数值来自提取目录。
class CampaignHero {
  /// 新游戏给驻军配满士兵；原版开局驻城兵力为零，二者有意分开。
  CampaignHero.fromRom(
    RomHeroDefinition definition, {
    required this.cityId,
    required this.countryId,
    int initialSoldiers = GameConfig.initialHeroSoldiers,
  }) : sourceId = definition.id,
       id = 'rom-${definition.id}',
       name = definition.name ?? '主角',
       type = definition.type,
       health = BattleHealth(definition.maxHp),
       combat = definition.combat,
       politics = definition.politics,
       salary = salaryFor(definition),
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

  /// 按 ROM 名单编号排序：高级 0–9、普通 10–39、主角 40，供驻军展示和接战共用。
  static int compareRosterOrder(CampaignHero a, CampaignHero b) =>
      a.sourceId.compareTo(b.sourceId);

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

  /// 内政能力。
  final int politics;

  /// 适配新金币体系后的月报酬，原 ROM 属性单独保存在目录中。
  final int salary;

  /// 把原版报酬换算成当前月俸，主角始终免费。
  static int salaryFor(RomHeroDefinition definition) =>
      definition.type == HeroType.protagonist
      ? 0
      : (definition.salary + GameConfig.heroSalaryDivisor - 1) ~/
            GameConfig.heroSalaryDivisor;

  /// 保留每个对位槽的小兵生命，阵亡后不自动补兵。
  final List<BattleHealth> squad;

  /// 当前存活的随行士兵数量。
  int get soldiers => squad.where((soldier) => soldier.alive).length;

  /// 将现有属性和生命交给战场，不创建第二份可变状态。
  BattleArmy get battleArmy => BattleArmy(
    id: id,
    name: name,
    general: health,
    attack: combat,
    soldiers: squad,
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
  /// 从所属城门出发。
  HeroMarch({
    required this.hero,
    this.target,
    required this.position,
    required this.destination,
  }) : direction = destination == position
           ? HeroDirection.south
           : HeroDirection.fromVector(destination - position);

  /// 带队英雄。
  final CampaignHero hero;

  /// 目标城池；自由行军时为空。
  CityDefinition? target;

  /// 任意地图位置，选中城池时使用城门位置。
  Offset destination;

  /// 精确世界坐标。
  Offset position;

  /// 行军朝向。
  HeroDirection direction;

  /// 实际行军距离。
  double walkDistance = 0;
  final _walkAnimation = HeroWalkAnimation();

  /// 当前阶段。
  MarchPhase phase = MarchPhase.marching;

  // 抵达城下后持有顺序号；暂时转入野战不丢失原来的等候顺序。
  ({int cityId, int order})? _siegeArrival;

  /// 地图步态按固定时间换帧，地形只改变实际位移。
  int get animationStep =>
      phase == MarchPhase.marching ? _walkAnimation.step : 0;

  /// 从当前位置改道，保留连续位置和步行动画进度。
  void moveTo(Offset point, {CityDefinition? city}) {
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
    _walkAnimation.reset();
    _siegeArrival = null;
    target = null;
    destination = position;
    phase = MarchPhase.camped;
  }

  void _resumeToward(Offset point, {CityDefinition? city}) {
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

  /// 战斗记录，用于显示过程与结果。
  final List<String> events = [];

  /// 当前已发生的碰撞次数。
  int get rounds => simulation.clashes;

  /// 是否仍在后台交战。
  bool get isActive => outcome == null;

  /// 观战标题中的地点。
  String get locationLabel;

  /// 地图战斗标记的世界位置。
  Offset markerPosition(CampaignState campaign);

  /// 保留有限条战斗记录。
  void record(String event) {
    events.add(event);
    if (events.length > 6) events.removeAt(0);
  }
}

/// 一支进攻部队与城池守军的连续交战。
class CityBattle extends WorldBattle {
  /// 按当前城池等级记录一支部队与当前守将的交战。
  CityBattle(
    this.city,
    CampaignHero attacker,
    CampaignHero defender, {
    required int cityLevel,
    int seed = 1,
  }) : _seed = seed,
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
           seed: seed,
         ),
       );

  /// 战斗所在城池。
  final CityDefinition city;

  @override
  String get locationLabel => '${city.label}国';

  @override
  Offset markerPosition(CampaignState campaign) =>
      campaign.cityBounds(city).topCenter;

  /// 当前迎战的守将次序。
  int wave = 1;

  /// 更换守将前的短暂结果展示时间。
  double nextWaveIn = 0;
  final int _seed;

  void _nextDefender(CampaignHero hero, int cityLevel) {
    defender = hero;
    wave++;
    nextWaveIn = 0;
    _settled = false;
    simulation = BattleSimulation(
      attacker: attacker.battleArmy,
      defender: hero.battleArmy,
      resultPerspective: hero.isPlayer
          ? BattleSide.defender
          : BattleSide.attacker,
      defenderCityLevel: cityLevel,
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
    this.aiEnabled,
    this.countryConfigs,
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
  int _siegeArrivalSerial = 0;

  /// 是否运行非玩家国家的自动经营；测试可以单独关闭以隔离原有规则。
  final bool aiEnabled;

  /// 本局国家配置快照，未配置的国家采用默认值。
  final Map<int, CountryConfig> countryConfigs;
  final Map<int, RecruitmentOffer> _recruitmentOffers = {};
  double _aiUntilDecision = GameConfig.countryAiInitialDelay;

  /// 读取国家的资金和留守策略。
  CountryConfig configFor(int countryId) =>
      countryConfigs[countryId] ?? const CountryConfig();

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
            countOwnedHeroes: (countryId) => heroes
                .where(
                  (hero) =>
                      hero.cityId == city.id &&
                      hero.countryId == countryId &&
                      hero.health.alive,
                )
                .length,
            defense: city.id == home ? 100 : 80 + city.id % 3 * 20,
            baseIncome:
                world.setup.cities[(world.id, city.id)]?.baseIncome ??
                GameConfig.cityBaseIncome,
            initialLevel:
                world.setup.cities[(world.id, city.id)]?.initialLevel ??
                city.initialLevel,
            initialReserveSoldiers:
                world
                    .setup
                    .cities[(world.id, city.id)]
                    ?.initialReserveSoldiers ??
                GameConfig.initialCityReserves,
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
      economyRandom ?? math.Random(),
      recruitmentRandom ?? math.Random(),
      aiRandom ?? math.Random(),
      aiEnabled,
      Map.unmodifiable(resolvedCountries),
    );
    for (final hero in catalog) {
      if (hero.type != HeroType.protagonist &&
          !heroes.any((active) => active.sourceId == hero.id)) {
        campaign._heroPool[hero.id] = hero;
      }
    }
    return campaign;
  }

  /// 静态地图。
  final WorldDefinition world;

  /// 城池玩法状态。
  final Map<int, CitySituation> cities;

  /// 建筑外观、点击及部队接触共用当前等级范围，左下基座保持在原地图位置。
  Rect cityBounds(CityDefinition city) {
    final appearance = city.appearanceAt(cities[city.id]!.level);
    final width = appearance.width * 16.0;
    final height = appearance.height * 16.0;
    return Rect.fromLTWH(
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
  CityDefinition? cityAt(Offset point) => world.cities
      .where((city) => cityBounds(city).contains(point))
      .firstOrNull;

  /// 仍存在的英雄，战败或失城移除时不保留幽灵驻军。
  final List<CampaignHero> heroes;

  /// 已出征部队。
  final Map<String, HeroMarch> marches = {};

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

  /// 尚未处理的签约结果。
  RecruitmentOffer? get recruitmentOffer => recruitmentOfferFor(0);

  /// 读取指定国家的临时预留，非玩家国家抽取后会同步签约并清除预留。
  RecruitmentOffer? recruitmentOfferFor(int countryId) =>
      _recruitmentOffers[countryId];

  /// 本月可继续抽取的次数，成功签约后归零，易主不重置限制。
  int remainingHeroDraws(int cityId) {
    final city = cities[cityId];
    if (city == null || city._recruitmentSignedMonth == settledMonths) return 0;
    return math.max(
      0,
      GameConfig.heroDrawsPerCityPerMonth -
          (city._recruitmentMonth == settledMonths
              ? city._recruitmentDraws
              : 0),
    );
  }

  /// 已完成的经济结算次数。
  int get settledTurns => settledMonths;

  /// 已经结束并完成结算的月份数。
  int settledMonths = 0;

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
      .fold(0, (sum, city) => sum + city.income);

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
    for (final countryId in _recruitmentOffers.keys.toList()) {
      _releaseOffer(countryId);
    }
    _simulationFraction = 0;
    for (final battle in allBattles) {
      if (_hasDisbandingArmy(battle)) continue;
      battle.outcome ??= '游戏结束 · ${reason.label}';
      if (battle is CityBattle) battle.nextWaveIn = 0;
      battle.simulation.stop();
    }
    _record('游戏结束 · ${reason.label}');
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

  /// 尚未出征的守军，沿用原 ROM 名单顺序，重新招募或进驻不会插到队尾。
  List<CampaignHero> garrisonAt(int cityId) =>
      heroesAt(cityId).where((hero) => !marches.containsKey(hero.id)).toList();

  /// 驻兵合计。
  int soldiersAt(int cityId) =>
      garrisonAt(cityId).fold(0, (sum, hero) => sum + hero.soldiers);

  /// 本城英雄报酬。
  int salaryAt(int cityId) => GameConfig.chargeHeroSalary
      ? heroesAt(cityId).fold(0, (sum, hero) => sum + hero.salary)
      : 0;

  /// 可购买的储备兵数量，同时受容量、国库和城池归属限制。
  int maxSoldierPurchase(int cityId, {int countryId = 0}) {
    final city = cities[cityId];
    if (defeated || city == null || city.ownerCountryId != countryId) return 0;
    return math.max(
      0,
      math.min(
        city.reserveCapacity - city.reserveSoldiers,
        goldFor(countryId) ~/ GameConfig.soldierRecruitCost,
      ),
    );
  }

  /// 当前一次点击能征募的人数，不超过配置批量、容量和可支付人数。
  int soldierPurchaseBatch(int cityId, {int countryId = 0}) => math.min(
    GameConfig.soldierRecruitBatchSize,
    maxSoldierPurchase(cityId, countryId: countryId),
  );

  /// 购买城池储备兵员，一次操作统一验证并扣款，不接受超额或负数。
  bool buySoldiers(int cityId, int count, {int countryId = 0}) {
    if (count <= 0 ||
        count > maxSoldierPurchase(cityId, countryId: countryId)) {
      return false;
    }
    final cost = count * GameConfig.soldierRecruitCost;
    _countryGold[countryId] = goldFor(countryId) - cost;
    cities[cityId]!._reserveSoldiers += count;
    _record('${_cityName(cityId)}征募 $count 名储备兵，花费 $cost 金币');
    return true;
  }

  /// 当前可以从本城储备给这名驻城英雄补充的人数，交战与出征中均不可补兵。
  int reinforcementCount(CampaignHero hero, {int countryId = 0}) {
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
      city.reserveSoldiers,
      hero.squad.where((soldier) => !soldier.alive).length,
    );
  }

  /// 只补充阵亡槽位，不把受伤士兵或英雄免费治疗为满血。
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
    cities[hero.cityId]!._reserveSoldiers -= count;
    _record('${hero.name}补充 $count 名士兵');
    return count;
  }

  /// 解释不能抽取英雄的原因，失败不扣钱、不消耗本月次数。
  String? recruitmentBlockReason(int cityId, {int countryId = 0}) {
    if (defeated) return '游戏已结束';
    if (cities[cityId]?.ownerCountryId != countryId) return '只能在本国城池招募';
    if (_recruitmentOffers.containsKey(countryId)) return '请先签约或放弃当前抽到的英雄';
    if (cities[cityId]!._recruitmentSignedMonth == settledMonths) {
      return '本城本月已签约，下月可再次招募';
    }
    if (remainingHeroDraws(cityId) == 0) return '本城本月抽取次数已用完，下月可再次招募';
    if (_heroPool.isEmpty) return '回收池暂时没有可招募英雄';
    final budget =
        GameConfig.heroDrawCost +
        (countryId == 0
            ? 0
            : _heroPool.values.map(_signingFee).reduce(math.max));
    if (goldFor(countryId) < budget) {
      return countryId == 0 ? '金币不足' : '抽取及签约资金不足，需要 $budget 金币';
    }
    return null;
  }

  int _signingFee(RomHeroDefinition hero) => hero.type == HeroType.advanced
      ? GameConfig.advancedSigningFee
      : GameConfig.normalSigningFee;

  /// 从全国家共享池预留英雄；玩家等待签约，其他国家同次调用立即签约归队。
  RecruitmentOffer? drawHero(int cityId, {int countryId = 0}) {
    if (recruitmentBlockReason(cityId, countryId: countryId) != null) {
      return null;
    }
    final choices = _heroPool.values.toList();
    final hero = choices[_recruitmentRandom.nextInt(choices.length)];
    _heroPool.remove(hero.id);
    _countryGold[countryId] = goldFor(countryId) - GameConfig.heroDrawCost;
    final city = cities[cityId]!;
    if (city._recruitmentMonth != settledMonths) {
      city._recruitmentMonth = settledMonths;
      city._recruitmentDraws = 0;
    }
    city._recruitmentDraws++;
    final offer = RecruitmentOffer(
      hero: hero,
      cityId: cityId,
      countryId: countryId,
      signingFee: _signingFee(hero),
    );
    _recruitmentOffers[countryId] = offer;
    // 所有操作同步完成，抽取前已备足最高签约费，中途不会被其他国家抽走。
    if (countryId == 0) {
      _record('${_cityName(cityId)}抽到${hero.name}，等待签约');
    } else {
      signHero(offer, countryId: countryId);
    }
    return offer;
  }

  /// 按预留费用从所属国库签约，旧按钮和其他国家不能领取该英雄。
  CampaignHero? signHero(RecruitmentOffer offer, {int countryId = 0}) {
    if (defeated ||
        offer.countryId != countryId ||
        !identical(_recruitmentOffers[countryId], offer) ||
        cities[offer.cityId]?.ownerCountryId != countryId ||
        cities[offer.cityId]!._recruitmentSignedMonth == settledMonths ||
        goldFor(countryId) < offer.signingFee ||
        heroes.any((hero) => hero.sourceId == offer.hero.id)) {
      return null;
    }
    _countryGold[countryId] = goldFor(countryId) - offer.signingFee;
    final hero = CampaignHero.fromRom(
      offer.hero,
      cityId: offer.cityId,
      countryId: countryId,
      initialSoldiers: GameConfig.recruitedHeroSoldiers,
    );
    heroes.add(hero);
    // 跨月保留的抽取结果在实际签约月份占名额，失败或放弃不占签约名额。
    cities[offer.cityId]!._recruitmentSignedMonth = settledMonths;
    _recruitmentOffers.remove(countryId);
    _record(
      '${hero.name}已签约${_cityName(offer.cityId)}，签约费 ${offer.signingFee} 金币',
    );
    return hero;
  }

  /// 放弃签约返还英雄，但不退抽取费或本月次数。
  bool declineHero(RecruitmentOffer offer, {int countryId = 0}) {
    if (defeated ||
        offer.countryId != countryId ||
        !identical(_recruitmentOffers[countryId], offer)) {
      return false;
    }
    _releaseOffer(countryId);
    _record('已放弃与${offer.hero.name}签约');
    return true;
  }

  void _releaseOffer(int countryId) {
    final offer = _recruitmentOffers.remove(countryId);
    if (offer == null) return;
    if (!heroes.any((hero) => hero.sourceId == offer.hero.id)) {
      _heroPool[offer.hero.id] = offer.hero;
    }
  }

  void _recycleHero(CampaignHero hero) {
    _disbandAfterBattle.remove(hero.id);
    final definition = _catalog[hero.sourceId];
    if (GameConfig.recycleDefeatedHeroes &&
        hero.type != HeroType.protagonist &&
        definition != null &&
        !heroes.any((active) => active.sourceId == hero.sourceId)) {
      _heroPool[hero.sourceId] = definition;
    }
  }

  void _settleMonth() {
    for (final id in _countryGold.keys.toList()..sort()) {
      final owned = cities.values
          .where((city) => city.ownerCountryId == id)
          .toList();
      final harvest = owned.isEmpty
          ? Harvest.normal
          : Harvest.draw(_economyRandom);
      final base = owned.fold(0, (sum, city) => sum + city.income);
      final salary = GameConfig.chargeHeroSalary
          ? heroes
                .where((hero) => hero.countryId == id && hero.health.alive)
                .fold(0, (sum, hero) => sum + hero.salary)
          : 0;
      final before = goldFor(id);
      final after = math.max(
        0,
        before + base + harvest.perCityAdjustment * owned.length - salary,
      );
      _countryGold[id] = after;
      final report = MonthlySettlement(
        year: year,
        month: month,
        harvest: harvest,
        cityCount: owned.length,
        baseIncome: base,
        salary: salary,
        goldBefore: before,
        goldAfter: after,
      );
      _settlements[id] = report;
      if (id == 0) {
        _record(
          '$dateLabel结算 · ${harvest.label} · 收入 $base，收成 ${report.adjustment >= 0 ? '+' : ''}${report.adjustment}，月俸 -$salary，国库 ${report.actualChange >= 0 ? '+' : ''}${report.actualChange}',
        );
      }
    }
    settledMonths++;
  }

  /// 按单个英雄验证出击，不以城池等级限制同时出征的将领数量。
  String? dispatchBlockReason(CampaignHero hero, {int countryId = 0}) {
    if (defeated) return '游戏已结束，请重新开始';
    if (!heroes.contains(hero) || hero.hp <= 0) return '这位英雄已不存在';
    if (hero.countryId != countryId ||
        cities[hero.cityId]?.ownerCountryId != countryId) {
      return '英雄不在本国城池中';
    }
    if (marches.containsKey(hero.id)) return '这位英雄已经出征';
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

  /// 返回当前不能升级的原因，和实际扣款共用参与者及余额校验。
  String? upgradeBlockReason(
    int cityId,
    CampaignHero? hero, {
    int countryId = 0,
  }) {
    final problem = _upgradeParticipantProblem(cityId, hero, countryId);
    if (problem != null) return problem;
    final cost = upgradeCostFor(cityId, hero, countryId: countryId)!;
    return goldFor(countryId) < cost ? '金币不足，需要 $cost 金币' : null;
  }

  /// 由指定驻城将领主持升级，费用减去其内政，最低为零；将领不被消耗。
  bool upgradeCity(
    int cityId, {
    required CampaignHero? hero,
    int countryId = 0,
  }) {
    if (upgradeBlockReason(cityId, hero, countryId: countryId) != null) {
      return false;
    }
    final city = cities[cityId]!;
    final cost = upgradeCostFor(cityId, hero, countryId: countryId)!;
    _countryGold[countryId] = goldFor(countryId) - cost;
    city._level++;
    _refreshCityApproaches(cityId);
    _record(
      '${hero!.name}主持${_cityName(cityId)}升至 ${city.level} 级，花费 $cost 金币，每月收入 ${city.income}',
    );
    return true;
  }

  /// 提交合法目标，取消选目标不会创建这条记录。
  HeroMarch? dispatch(
    CampaignHero hero,
    CityDefinition target, {
    int countryId = 0,
  }) {
    if (!world.cities.contains(target)) return null;
    return dispatchTo(hero, cityBounds(target).center, countryId: countryId);
  }

  /// 确认有效目的地后自动从本城储备补兵并离城，选点取消和无效指令不扣兵。
  HeroMarch? dispatchTo(CampaignHero hero, Offset point, {int countryId = 0}) {
    if (!canDispatch(hero, countryId: countryId) || !_containsPoint(point)) {
      return null;
    }
    final target = cityAt(point);
    final source = world.cities.firstWhere((city) => city.id == hero.cityId);
    if (target == source) return null;
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
    if (hero.isPlayer) hasDispatched = true;
    return march;
  }

  /// 为已出征的我方英雄重新指定目的地。
  bool moveTo(String heroId, Offset point) {
    if (defeated) return false;
    final march = marches[heroId];
    if (march?.phase == MarchPhase.dueling) return false;
    if (march == null || !march.hero.isPlayer || !_containsPoint(point)) {
      return false;
    }
    final city = cityAt(point);
    if (city != null &&
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
    march.moveTo(
      city == null ? point : _contactPoint(march.position, point, city),
      city: city,
    );
    return true;
  }

  /// 命令一支部队原地扎营，其他行军和交战照常推进。
  bool camp(String heroId) {
    if (defeated) return false;
    final march = marches[heroId];
    if (march?.phase == MarchPhase.dueling) return false;
    if (march == null || !march.hero.isPlayer) return false;
    _endBattle(march, '${march.hero.name}已停止进攻');
    if (_disbandAfterBattle.contains(heroId)) {
      _disbandHero(march.hero);
      return false;
    }
    march.camp();
    _record('${march.hero.name}已原地扎营');
    return true;
  }

  bool _containsPoint(Offset point) =>
      point.dx.isFinite &&
      point.dy.isFinite &&
      (Offset.zero & world.pixelSize).contains(point);

  // 地图人物本体为 16×16，中心距城池边缘八像素时即贴城。
  Offset _departurePoint(CityDefinition source, Offset toward) {
    final rect = cityBounds(source).inflate(8);
    final delta = toward - rect.center;
    if (delta.distance < 1e-9) return rect.centerRight;
    final factor = math.min(
      delta.dx.abs() < 1e-9 ? double.infinity : rect.width / 2 / delta.dx.abs(),
      delta.dy.abs() < 1e-9
          ? double.infinity
          : rect.height / 2 / delta.dy.abs(),
    );
    final point = rect.center + delta * factor;
    return Offset(
      point.dx.clamp(8.0, world.pixelSize.width - 8),
      point.dy.clamp(8.0, world.pixelSize.height - 8),
    );
  }

  Offset _contactPoint(Offset from, Offset aim, CityDefinition city) {
    final rect = cityBounds(city).inflate(8);
    final fraction = _entryFraction(from, aim, rect);
    return fraction == null
        ? _nearestEdge(from, rect)
        : from + (aim - from) * fraction;
  }

  Offset _nearestEdge(Offset from, Rect rect) {
    final point = Offset(
      from.dx.clamp(rect.left, rect.right),
      from.dy.clamp(rect.top, rect.bottom),
    );
    final edges = [
      Offset(rect.left, point.dy),
      Offset(rect.right, point.dy),
      Offset(point.dx, rect.top),
      Offset(point.dx, rect.bottom),
    ];
    edges.sort(
      (a, b) =>
          (a - from).distanceSquared.compareTo((b - from).distanceSquared),
    );
    return edges.first;
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
      if (march.phase == MarchPhase.marching) {
        final point = _contactPoint(
          march.position,
          cityBounds(target).center,
          target,
        );
        march._resumeToward(point, city: target);
      } else {
        final rect = cityBounds(target).inflate(8);
        march.position = _nearestEdge(march.position, rect);
        march.destination = march.position;
      }
    }
  }

  void _endBattle(HeroMarch march, String outcome) {
    final battle = battles[march.target?.id];
    if (battle != null && battle.isActive && battle.attacker == march.hero) {
      battle.outcome = outcome;
      battle.simulation.stop();
    }
  }

  /// 移除战败英雄；只有明确指定其实际守城时，才降低该城等级或令其易主。
  DefeatResult? defeatHero(
    String heroId, {
    required int winnerCountryId,
    int? defendedCityId,
  }) {
    if (_defeatReason != null) return null;
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
    final removed = <String>[hero.id];
    final march = marches[hero.id];
    if (march != null) _endBattle(march, '${hero.name}战败');
    hero.hp = 0;
    marches.remove(hero.id);
    heroes.remove(hero);
    _recycleHero(hero);
    var captured = false;
    if (defendedCityId != null) {
      if (city.level > 1) {
        city._level--;
        _refreshCityApproaches(hero.cityId);
      } else {
        captured = true;
        removed.addAll(_captureCity(hero.cityId, winnerCountryId));
      }
    }
    _record(
      captured
          ? '${hero.name}战败，${_cityName(hero.cityId)}失守，未出战英雄已移除'
          : defendedCityId != null
          ? '${hero.name}守城战败，${_cityName(hero.cityId)}降至 ${city.level} 级'
          : '${hero.name}进攻战败，出征部队已损失',
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
      final previousPositions = {
        for (final march in marches.values) march.hero.id: march.position,
      };
      for (final march in marches.values) {
        final terrain = world.movementTerrainAt(cellAt(world, march.position));
        final previous = march.position;
        changed = march.tick(world, dt) || changed;
        // 检查实际走过的线段，避免低帧率或远距离指令穿过敌城而不交战。
        if (previous != march.position) {
          CityDefinition? encountered;
          var nearest = 2.0;
          for (final city in world.cities) {
            if (cities[city.id]!.ownerCountryId == march.hero.countryId) {
              continue;
            }
            final fraction = _entryFraction(
              previous,
              march.position,
              cityBounds(city).inflate(8),
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
            march.phase = MarchPhase.awaitingBattle;
            changed = true;
          }
        }
        changed =
            terrain != world.movementTerrainAt(cellAt(world, march.position)) ||
            changed;
      }
      _markSiegeArrivals();
      changed = _resolveFieldEncounters(previousPositions) || changed;
      changed = _resolveArrivals() || changed;
      if (_finishDefeat() || defeated) return true;
      changed = _advanceBattles(dt) || changed;
      if (_finishDefeat() || defeated) return true;
      _monthSeconds += dt;
      if (_monthSeconds >= GameConfig.secondsPerMonth - 1e-9) {
        _monthSeconds = math.max(0, _monthSeconds - GameConfig.secondsPerMonth);
        _settleMonth();
        changed = true;
      }
      if (aiEnabled) {
        _aiUntilDecision -= dt;
        if (_aiUntilDecision <= 1e-9) {
          _aiUntilDecision += math.max(dt, GameConfig.countryAiInterval);
          changed = _runCountryDecisions() || changed;
        }
      }
    }
    return changed;
  }

  bool _advanceBattles(double dt, {bool closingOnly = false}) {
    var changed = false;
    for (final battle in allBattles.toList()) {
      if (closingOnly && !_hasDisbandingArmy(battle)) continue;
      changed = battle.simulation.advance(dt) || changed;
      if (!battle.isActive) continue;
      if (battle.simulation.result != null && !battle._settled) {
        battle._settled = true;
        if (battle is FieldBattle) {
          _settleFieldBattle(battle);
        } else {
          _settleBattle(battle as CityBattle);
        }
        _disbandFinishedArmies(battle);
        changed = true;
        if (!closingOnly && (_finishDefeat() || defeated)) break;
      } else if (battle is CityBattle && battle.nextWaveIn > 0) {
        battle.nextWaveIn = math.max(0, battle.nextWaveIn - dt);
        if (battle.nextWaveIn == 0) {
          final next = _pickDefender(battle.city.id);
          if (next != null) {
            battle._nextDefender(next, cities[battle.city.id]!.level);
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
    if (lostAttacker) {
      _removeDefeatedHero(attacker.id, winnerCountryId: defender.countryId);
    }
    if (lostDefender) {
      _removeDefeatedHero(
        defender.id,
        winnerCountryId: attacker.countryId,
        defendedCityId: battle.city.id,
      );
      battle.record('${defender.name}战败');
    }
    if (lostAttacker) {
      battle.outcome = lostDefender ? '双方将领阵亡' : '${attacker.name}战败';
      // 守城胜利与攻城后进驻一样恢复将领 HP，保留实际兵损及伤兵生命。
      if (!lostDefender) defender.hp = defender.maxHp;
      battle.simulation.stop();
      return;
    }
    final city = cities[battle.city.id]!;
    if (city.ownerCountryId == attacker.countryId ||
        !garrisonAt(battle.city.id).any((hero) => hero.health.alive)) {
      _finishOccupation(battle);
    } else {
      battle.nextWaveIn = 1.2;
    }
  }

  List<String> _captureCity(int cityId, int winnerCountryId) {
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
      _recycleHero(hero);
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
    for (final offer in _recruitmentOffers.values.toList()) {
      if (offer.cityId == cityId && offer.countryId != winnerCountryId) {
        _releaseOffer(offer.countryId);
      }
    }
    _refreshCityApproaches(cityId);
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
    if (battle is CityBattle) battle.nextWaveIn = 0;
    battle.outcome =
        '${battle.outcome ?? '交战结束'} · 出发城失守，${marked.map((hero) => hero.name).join('、')}部队已消失';
    battle.simulation.stop();
  }

  void _disbandHero(CampaignHero hero, {bool endBattle = true}) {
    if (endBattle) {
      // 换守将的间隙已经结束上一场拼杀，不能让失城部队继续进入下一轮。
      final battle = activeBattleForHero(hero.id);
      if (battle != null) {
        battle.outcome = '${hero.name}的出发城已失守，部队消失';
        if (battle is CityBattle) battle.nextWaveIn = 0;
        battle.simulation.stop();
      }
    }
    hero.hp = 0;
    marches.remove(hero.id);
    heroes.remove(hero);
    _recycleHero(hero);
    _record('${hero.name}的出发城已失守，部队消失');
  }

  void _station(HeroMarch march) {
    _endBattle(march, '${march.hero.name}已进驻${march.target!.label}');
    marches.remove(march.hero.id);
    march.hero.cityId = march.target!.id;
    march.hero.hp = march.hero.maxHp;
    _record('${march.hero.name}已进驻${march.target!.label}');
  }

  // 只拦截从城外进入的线段；已在城边的部队可以接收撤离指令。
  double? _entryFraction(Offset start, Offset end, Rect bounds) {
    if (bounds.inflate(0.001).contains(start)) return null;
    var enter = 0.0;
    var leave = 1.0;
    final delta = end - start;
    for (final axis in [
      (start.dx, delta.dx, bounds.left, bounds.right),
      (start.dy, delta.dy, bounds.top, bounds.bottom),
    ]) {
      if (axis.$2.abs() < 1e-9) {
        if (axis.$1 < axis.$3 || axis.$1 > axis.$4) return null;
      } else {
        final a = (axis.$3 - axis.$1) / axis.$2;
        final b = (axis.$4 - axis.$1) / axis.$2;
        enter = math.max(enter, math.min(a, b));
        leave = math.min(leave, math.max(a, b));
        if (enter > leave) return null;
      }
    }
    return enter;
  }

  String _cityName(int id) =>
      world.cities.firstWhere((city) => city.id == id).label;
  void _record(String event) {
    lastEvent = event;
    journal.add(event);
    if (journal.length > 8) journal.removeAt(0);
  }
}
