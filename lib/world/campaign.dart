import 'dart:math' as math;
import 'dart:ui';

import 'battle_simulation.dart';
import 'hero_sprite.dart';
import 'rom_hero.dart';
import 'world_data.dart';
import 'world_movement.dart';

/// 新游戏的城池状态，经济和等级规则独立于原 ROM。
class CitySituation {
  /// 按原始等级创建城池及其基础产出。
  CitySituation({
    required this._ownerCountryId,
    required this.defense,
    required this.baseIncome,
    required int initialLevel,
  }) : _level = initialLevel {
    if (initialLevel < 1 || initialLevel > maxLevel) {
      throw ArgumentError.value(initialLevel, 'initialLevel', '等级必须为 1 到 5');
    }
  }

  /// 当前占领国家；易主时统一重置为一级，同一国家重复进驻不会降级。
  int get ownerCountryId => _ownerCountryId;
  set ownerCountryId(int value) {
    if (value == _ownerCountryId) return;
    _ownerCountryId = value;
    _level = 1;
  }

  int _ownerCountryId;

  /// 编号 0 是玩家国家。
  bool get isPlayer => ownerCountryId == 0;

  /// 基础城防，用于界面展示。
  final int defense;

  /// 一级城市每回合产出。
  final int baseIncome;
  int _level;

  /// 当前等级，始终处于 1 到 5。
  int get level => _level;

  /// 每升级一级增加一份基础产出。
  int get income => baseIncome * level;

  /// 升级所需金币，满级后为空。
  int? get upgradeCost => level < maxLevel ? level * 200 : null;

  /// 城池最高等级。
  static const maxLevel = 5;
}

/// 带有身份、所属城池及可变生命值的英雄，静态数值来自提取目录。
class CampaignHero {
  /// 新游戏给驻军配满士兵；原版开局驻城兵力为零，二者有意分开。
  CampaignHero.fromRom(
    RomHeroDefinition definition, {
    required this.cityId,
    required this.countryId,
  }) : sourceId = definition.id,
       id = 'rom-${definition.id}',
       name = definition.name ?? '主角',
       type = definition.type,
       health = BattleHealth(definition.maxHp),
       combat = definition.combat,
       politics = definition.politics,
       salary = definition.salary,
       squad = List.generate(
         definition.soldierLimit,
         (_) => BattleHealth(BattleSimulation.soldierHp),
       ),
       hasEgg = definition.eggCapable,
       appearance = switch (definition.type) {
         HeroType.advanced => HeroAppearance.advanced,
         HeroType.normal => HeroAppearance.normal,
         HeroType.protagonist => HeroAppearance.protagonist,
       };

  /// 本场景内唯一标识。
  final String id;

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

  /// 每回合报酬。
  final int salary;

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

  /// 开局没有王牌库存，召唤蛋不冒充王牌道具。
  String get ace => '无';

  /// 是否具备召唤蛋能力，召唤战斗尚未接入。
  final bool hasEgg;
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

  /// 当前阶段。
  MarchPhase phase = MarchPhase.marching;

  /// 动画步频随移动速度变化。
  int get animationStep =>
      phase == MarchPhase.marching ? (walkDistance / 6).floor() % 2 : 0;

  /// 从当前位置改道，保留连续位置和步行动画进度。
  void moveTo(Offset point, {CityDefinition? city}) {
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
    target = null;
    destination = position;
    phase = MarchPhase.camped;
  }

  /// 推进行军，抵达后由战役规则决定何时交战。
  bool tick(WorldDefinition world, double elapsed) {
    if (phase != MarchPhase.marching) return false;
    final result = advanceToward(world, position, destination, elapsed);
    position = result.position;
    walkDistance += result.distance;
    if (position == destination) {
      phase = target == null ? MarchPhase.camped : MarchPhase.awaitingBattle;
      return true;
    }
    return false;
  }
}

/// 后台交战的实时记录，观战只读取这份状态，不另起战斗时钟。
class CityBattle {
  /// 记录一支部队与当前守将的交战。
  CityBattle(this.city, this.attacker, this.defender, {int seed = 1})
    : _seed = seed,
      simulation = BattleSimulation(
        attacker: attacker.battleArmy,
        defender: defender.battleArmy,
        seed: seed,
      );

  /// 战斗所在城池。
  final CityDefinition city;

  /// 进攻英雄，战败后仍保留本场结果供查看。
  final CampaignHero attacker;

  /// 当前守将，每轮从存活驻军中更新。
  CampaignHero defender;

  /// 当前守将这一场的独立小兵、位置与伤害状态。
  BattleSimulation simulation;

  /// 已执行的拼杀次数。
  int get rounds => simulation.clashes;

  /// 当前迎战的守将次序。
  int wave = 1;

  /// 更换守将前的短暂结果展示时间。
  double nextWaveIn = 0;
  bool _settled = false;
  final int _seed;

  /// 战斗结果，为空表示仍在交战。
  String? outcome;

  /// 最近的伤害与战败记录。
  final List<String> events = [];

  /// 是否仍在后台交战。
  bool get isActive => outcome == null;

  /// 添加有限数量的战斗记录。
  void record(String event) {
    events.add(event);
    if (events.length > 6) events.removeAt(0);
  }

  void _nextDefender(CampaignHero hero) {
    defender = hero;
    wave++;
    nextWaveIn = 0;
    _settled = false;
    simulation = BattleSimulation(
      attacker: attacker.battleArmy,
      defender: hero.battleArmy,
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
  CampaignState._(this.world, this.cities, this.heroes, this._gold)
    : _protagonist = heroes
          .where((hero) => hero.isPlayer && hero.type == HeroType.protagonist)
          .firstOrNull;

  final CampaignHero? _protagonist;
  CampaignDefeatReason? _defeatReason;

  /// 按 ROM 城池关联编号配置驻军，重复编号采用最后一次初始化位置。
  factory CampaignState.fromRom(
    WorldDefinition world,
    List<RomHeroDefinition> catalog, {
    int startingGold = 300,
  }) {
    final home = world.cities.first.id;
    final placement = <int, int>{};
    for (final city in world.cities) {
      for (final id in city.unitIds) {
        placement[id] = city.id;
      }
    }
    final heroes =
        [
          for (final definition in catalog)
            if (placement.containsKey(definition.id))
              CampaignHero.fromRom(
                definition,
                cityId: placement[definition.id]!,
                countryId: world.cities
                    .firstWhere((city) => city.id == placement[definition.id])
                    .initialOwnerId,
              ),
        ]..sort(
          (a, b) => (a.sourceId == 40 ? -1 : a.sourceId).compareTo(
            b.sourceId == 40 ? -1 : b.sourceId,
          ),
        );
    return CampaignState._(
      world,
      {
        for (final city in world.cities)
          city.id: CitySituation(
            ownerCountryId: city.initialOwnerId,
            defense: city.id == home ? 100 : 80 + city.id % 3 * 20,
            baseIncome: city.id == home ? 126 : 80 + city.id * 6,
            initialLevel: city.initialLevel,
          ),
      },
      heroes,
      math.max(0, startingGold),
    );
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

  /// 各城最近一场交战，结束后保留结果直到下次交战。
  final Map<int, CityBattle> battles = {};

  /// 派兵后即使部队全灭，也不重新生成探索人物。
  bool hasDispatched = false;
  int _gold;

  /// 当前金币。
  int get gold => _gold;

  /// 已完成的经济结算次数。
  int settledTurns = 0;
  double _secondFraction = 0;
  double _simulationFraction = 0;
  int _battleSerial = 0;
  int _economySeconds = 0;

  /// 最近一条反馈。
  String lastEvent = '';

  /// 最近八条记录。
  final List<String> journal = [];

  /// 我方城池总产出。
  int get grossIncome => cities.values
      .where((city) => city.isPlayer)
      .fold(0, (sum, city) => sum + city.income);

  /// 存活我方英雄的报酬，包括已出征部队。
  int get salaryCost => heroes
      .where((hero) => hero.isPlayer)
      .fold(0, (sum, hero) => sum + hero.salary);

  /// 下一次结算净收入。
  int get netIncome => grossIncome - salaryCost;

  /// 主角阵亡或失去全部城池即失败，不要求先出征或全军覆没。
  bool get defeated => defeatReason != null;

  /// 失败后固定保留原因，不因迟到的指令或数据更新恢复游戏。
  CampaignDefeatReason? get defeatReason => _defeatReason ?? _detectDefeat();

  CampaignDefeatReason? _detectDefeat() {
    if (_protagonist != null && !_protagonist.health.alive) {
      return CampaignDefeatReason.protagonistFallen;
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
    _simulationFraction = 0;
    for (final battle in battles.values) {
      battle.outcome ??= '游戏结束 · ${reason.label}';
      battle.nextWaveIn = 0;
      battle.simulation.stop();
    }
    _record('游戏结束 · ${reason.label}');
    return true;
  }

  /// 本城所属英雄；失城后已出征的原阵营英雄不列入新驻军。
  List<CampaignHero> heroesAt(int cityId) => heroes
      .where(
        (hero) =>
            hero.cityId == cityId &&
            hero.countryId == cities[cityId]!.ownerCountryId,
      )
      .toList();

  /// 尚未出征的守军。
  List<CampaignHero> garrisonAt(int cityId) =>
      heroesAt(cityId).where((hero) => !marches.containsKey(hero.id)).toList();

  /// 驻兵合计。
  int soldiersAt(int cityId) =>
      garrisonAt(cityId).fold(0, (sum, hero) => sum + hero.soldiers);

  /// 本城英雄报酬。
  int salaryAt(int cityId) =>
      heroesAt(cityId).fold(0, (sum, hero) => sum + hero.salary);

  /// 无法出击时给出原因，一级城只允许同时派出一位英雄。
  String? dispatchBlockReason(CampaignHero hero) {
    if (defeated) return '游戏已结束，请重新开始';
    if (!heroes.contains(hero) || hero.hp <= 0) return '这位英雄已不存在';
    if (!hero.isPlayer || cities[hero.cityId]?.isPlayer != true) {
      return '英雄不在我方城池中';
    }
    if (marches.containsKey(hero.id)) return '这位英雄已经出征';
    if (battles.values.any(
      (battle) => battle.isActive && battle.defender == hero,
    )) {
      return '这位英雄正在守城交战';
    }
    if (cities[hero.cityId]!.level == 1 &&
        marches.values.any((march) => march.hero.cityId == hero.cityId)) {
      return '一级城池只能同时派出一位英雄，升级后可继续出击';
    }
    return null;
  }

  /// 是否允许出击。
  bool canDispatch(CampaignHero hero) => dispatchBlockReason(hero) == null;

  /// 升级我方城池，满级或余额不足时不扣款。
  bool upgradeCity(int cityId) {
    if (defeated) return false;
    final city = cities[cityId];
    final cost = city?.upgradeCost;
    if (city == null || !city.isPlayer || cost == null || _gold < cost) {
      return false;
    }
    _gold -= cost;
    city._level++;
    _refreshCityApproaches(cityId);
    _record('${_cityName(cityId)}升至 ${city.level} 级，每回合产出 ${city.income}');
    return true;
  }

  /// 提交合法目标，取消选目标不会创建这条记录。
  HeroMarch? dispatch(CampaignHero hero, CityDefinition target) {
    if (!world.cities.contains(target)) return null;
    return dispatchTo(hero, cityBounds(target).center);
  }

  /// 确认任意地图位置后派兵，选城则在抵达后进驻或自动交战。
  HeroMarch? dispatchTo(CampaignHero hero, Offset point) {
    if (!canDispatch(hero) || !_containsPoint(point)) return null;
    final target = cityAt(point);
    final source = world.cities.firstWhere((city) => city.id == hero.cityId);
    if (target == source) return null;
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
    hasDispatched = true;
    return march;
  }

  /// 为已出征的我方英雄重新指定目的地。
  bool moveTo(String heroId, Offset point) {
    if (defeated) return false;
    final march = marches[heroId];
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
    if (march == null || !march.hero.isPlayer) return false;
    _endBattle(march, '${march.hero.name}已停止进攻');
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
      final target = march.target!;
      if (march.phase == MarchPhase.marching) {
        final point = _contactPoint(
          march.position,
          cityBounds(target).center,
          target,
        );
        march.moveTo(point, city: target);
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

  /// 固定步长推进行军和拼杀，每三十秒结算经济；观战不参与计时。
  bool advance(double elapsed) {
    if (_finishDefeat()) return true;
    if (defeated) return false;
    _simulationFraction += elapsed.isFinite ? math.max(0.0, elapsed) : 0.0;
    var changed = false;
    const dt = BattleSimulation.fixedStep;
    while (_simulationFraction >= dt - 1e-9) {
      _simulationFraction = math.max(0, _simulationFraction - dt);
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
      changed = _resolveArrivals() || changed;
      if (_finishDefeat() || defeated) return true;
      changed = _advanceBattles(dt) || changed;
      if (_finishDefeat() || defeated) return true;
      _secondFraction += dt;
      if (_secondFraction >= 1 - 1e-9) {
        _secondFraction = 0;
        _economySeconds++;
        if (_economySeconds == 30) {
          _economySeconds = 0;
          final income = netIncome;
          _gold = math.max(0, _gold + income);
          settledTurns++;
          _record('第 $settledTurns 次结算：${income >= 0 ? '+' : ''}$income 金币');
          changed = true;
        }
      }
    }
    return changed;
  }

  bool _resolveArrivals() {
    var changed = false;
    for (final march in marches.values.toList()) {
      if (!marches.containsKey(march.hero.id) ||
          march.target == null ||
          (march.phase != MarchPhase.awaitingBattle &&
              march.phase != MarchPhase.fighting)) {
        continue;
      }
      final city = march.target!;
      final target = cities[city.id]!;
      if (target.ownerCountryId == march.hero.countryId) {
        _station(march);
        changed = true;
        continue;
      }
      final active = battles[city.id];
      if (active != null && active.isActive && active.attacker != march.hero) {
        continue;
      }
      final defender = garrisonAt(city.id).firstOrNull;
      if (defender == null) {
        _captureCity(city.id, march.hero.countryId);
        _station(march);
        changed = true;
        if (defeated) break;
        continue;
      }
      final wasFighting = march.phase == MarchPhase.fighting;
      _beginBattle(march);
      changed = !wasFighting && march.phase == MarchPhase.fighting || changed;
    }
    return changed;
  }

  bool _advanceBattles(double dt) {
    var changed = false;
    for (final battle in battles.values.toList()) {
      changed = battle.simulation.advance(dt) || changed;
      if (!battle.isActive) continue;
      if (battle.simulation.result != null && !battle._settled) {
        battle._settled = true;
        _settleBattle(battle);
        changed = true;
        if (_finishDefeat() || defeated) break;
      } else if (battle.nextWaveIn > 0) {
        battle.nextWaveIn = math.max(0, battle.nextWaveIn - dt);
        if (battle.nextWaveIn == 0) {
          final next = garrisonAt(battle.city.id).firstOrNull;
          if (next != null) battle._nextDefender(next);
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
      battle.simulation.stop();
      return;
    }
    final city = cities[battle.city.id]!;
    if (city.ownerCountryId == attacker.countryId ||
        garrisonAt(battle.city.id).isEmpty) {
      _captureCity(battle.city.id, attacker.countryId);
      final march = marches[attacker.id];
      if (march != null) _station(march);
    } else {
      battle.nextWaveIn = 1.2;
    }
  }

  List<String> _captureCity(int cityId, int winnerCountryId) {
    final removed = heroes
        .where(
          (hero) =>
              hero.cityId == cityId &&
              hero.countryId != winnerCountryId &&
              !marches.containsKey(hero.id),
        )
        .map((hero) => hero.id)
        .toList();
    heroes.removeWhere((hero) => removed.contains(hero.id));
    cities[cityId]!.ownerCountryId = winnerCountryId;
    _refreshCityApproaches(cityId);
    return removed;
  }

  void _station(HeroMarch march) {
    _endBattle(march, '${march.hero.name}已进驻${march.target!.label}');
    marches.remove(march.hero.id);
    march.hero.cityId = march.target!.id;
    _record('${march.hero.name}已进驻${march.target!.label}');
  }

  CityBattle? _beginBattle(HeroMarch march) {
    final city = march.target;
    if (city == null ||
        cities[city.id]!.ownerCountryId == march.hero.countryId) {
      return null;
    }
    final defender = garrisonAt(city.id).firstOrNull;
    if (defender == null) return null;
    final existing = battles[city.id];
    if (existing != null && existing.isActive) {
      return existing.attacker == march.hero ? existing : null;
    }
    march.phase = MarchPhase.fighting;
    return battles[city.id] = CityBattle(
      city,
      march.hero,
      defender,
      seed: (++_battleSerial * 1009) + city.id * 41 + march.hero.sourceId,
    );
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
