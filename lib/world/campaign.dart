import 'dart:math' as math;
import 'dart:ui';

import 'hero_sprite.dart';
import 'rom_hero.dart';
import 'world_data.dart';
import 'world_movement.dart';

/// 新游戏的城池状态，经济和等级规则独立于原 ROM。
class CitySituation {
  /// 按原始等级创建城池及其基础产出。
  CitySituation({
    required this.ownerCountryId,
    required this.defense,
    required this.baseIncome,
    required int initialLevel,
  }) : _level = initialLevel {
    if (initialLevel < 1 || initialLevel > maxLevel) {
      throw ArgumentError.value(initialLevel, 'initialLevel', '等级必须为 1 到 5');
    }
  }

  /// 当前占领国家，决定国旗；城池的固定名称不随之变化。
  int ownerCountryId;

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
       maxHp = definition.maxHp,
       hp = definition.maxHp,
       combat = definition.combat,
       politics = definition.politics,
       salary = definition.salary,
       soldiers = definition.soldierLimit,
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
  final int maxHp;

  /// 当前生命值。
  int hp;

  /// 战斗能力。
  final int combat;

  /// 内政能力。
  final int politics;

  /// 每回合报酬。
  final int salary;

  /// 随行士兵数量，本阶段战损由英雄生命值表示。
  final int soldiers;

  /// 开局没有王牌库存，召唤蛋不冒充王牌道具。
  String get ace => '无';

  /// 是否具备召唤蛋能力，召唤战斗尚未接入。
  final bool hasEgg;
}

/// 部队从行军进入排队待战或交战。
enum MarchPhase {
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
    required this.target,
    required this.position,
    required this.destination,
  }) : direction = HeroDirection.fromVector(destination - position);

  /// 带队英雄。
  final CampaignHero hero;

  /// 目标城池。
  final CityDefinition target;

  /// 目标城门。
  final Offset destination;

  /// 精确世界坐标。
  Offset position;

  /// 行军朝向。
  final HeroDirection direction;

  /// 实际行军距离。
  double walkDistance = 0;

  /// 当前阶段。
  MarchPhase phase = MarchPhase.marching;

  /// 动画步频随移动速度变化。
  int get animationStep =>
      phase == MarchPhase.marching ? (walkDistance / 6).floor() % 2 : 0;

  /// 推进行军，抵达后由战役规则决定何时交战。
  bool tick(WorldDefinition world, double elapsed) {
    if (phase != MarchPhase.marching) return false;
    final result = advanceToward(world, position, destination, elapsed);
    position = result.position;
    walkDistance += result.distance;
    if (position == destination) {
      phase = MarchPhase.awaitingBattle;
      return true;
    }
    return false;
  }
}

/// 一次战败的城池影响，重复处理已消失英雄不会重复降级。
typedef DefeatResult = ({
  int cityId,
  int oldLevel,
  int newLevel,
  bool captured,
  List<String> removedHeroIds,
});

/// 管理一张地图的经济、出征及战败规则，未显示的场景暂停推进。
class CampaignState {
  CampaignState._(this.world, this.cities, this.heroes, this._gold);

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

  /// 仍存在的英雄，战败或失城移除时不保留幽灵驻军。
  final List<CampaignHero> heroes;

  /// 已出征部队。
  final Map<String, HeroMarch> marches = {};

  /// 派兵后即使部队全灭，也不重新生成探索人物。
  bool hasDispatched = false;
  int _gold;

  /// 当前金币。
  int get gold => _gold;

  /// 已完成的经济结算次数。
  int settledTurns = 0;
  double _secondFraction = 0;
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

  /// 失去所有城池且没有我方英雄时，本场景战役结束。
  bool get defeated =>
      hasDispatched &&
      !cities.values.any((city) => city.isPlayer) &&
      !heroes.any((hero) => hero.isPlayer);

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
    if (!heroes.contains(hero) || hero.hp <= 0) return '这位英雄已不存在';
    if (!hero.isPlayer || cities[hero.cityId]?.isPlayer != true) {
      return '英雄不在我方城池中';
    }
    if (marches.containsKey(hero.id)) return '这位英雄已经出征';
    if (hero.soldiers <= 0) return '没有可随行的士兵';
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
    final city = cities[cityId];
    final cost = city?.upgradeCost;
    if (city == null || !city.isPlayer || cost == null || _gold < cost) {
      return false;
    }
    _gold -= cost;
    city._level++;
    _record('${_cityName(cityId)}升至 ${city.level} 级，每回合产出 ${city.income}');
    return true;
  }

  /// 提交合法目标，取消选目标不会创建这条记录。
  HeroMarch? dispatch(CampaignHero hero, CityDefinition target) {
    if (!canDispatch(hero) ||
        !world.cities.contains(target) ||
        cities[target.id]!.isPlayer) {
      return null;
    }
    final source = world.cities.firstWhere((city) => city.id == hero.cityId);
    final start = world.nearestWalkable(source.entrance).center;
    final end = world.nearestWalkable(target.entrance).center;
    if (start == end) return null;
    final march = HeroMarch(
      hero: hero,
      target: target,
      position: start,
      destination: end,
    );
    marches[hero.id] = march;
    hasDispatched = true;
    return march;
  }

  /// 英雄战败降一级；一级城易主，只清除该城未出征的败方英雄。
  DefeatResult? defeatHero(String heroId, {required int winnerCountryId}) {
    final hero = heroes.where((hero) => hero.id == heroId).firstOrNull;
    if (hero == null ||
        hero.countryId == winnerCountryId ||
        winnerCountryId < 0 ||
        winnerCountryId >= 16) {
      return null;
    }
    final city = cities[hero.cityId]!;
    final oldLevel = city.level;
    final removed = <String>[hero.id];
    hero.hp = 0;
    marches.remove(hero.id);
    heroes.remove(hero);
    var captured = false;
    // 已在外的英雄阵亡时，不再次削弱先前占领出发城的敌方。
    if (city.ownerCountryId == hero.countryId) {
      if (city.level > 1) {
        city._level--;
      } else {
        captured = true;
        removed.addAll(_captureCity(hero.cityId, winnerCountryId));
      }
    }
    _record(
      captured
          ? '${hero.name}战败，${_cityName(hero.cityId)}失守，未出战英雄已移除'
          : '${hero.name}战败，${_cityName(hero.cityId)}现为 ${city.level} 级',
    );
    return (
      cityId: hero.cityId,
      oldLevel: oldLevel,
      newLevel: city.level,
      captured: captured,
      removedHeroIds: List.unmodifiable(removed),
    );
  }

  /// 按一秒边界交战、每三十秒结算经济，帧率不改变伤害或产出次数。
  bool advance(double elapsed) {
    var remaining = elapsed.isFinite ? math.max(0.0, elapsed) : 0.0;
    var changed = false;
    while (remaining > 1e-9) {
      final dt = math.min(remaining, 1 - _secondFraction);
      for (final march in marches.values) {
        final terrain = world.movementTerrainAt(cellAt(world, march.position));
        changed = march.tick(world, dt) || changed;
        changed =
            terrain != world.movementTerrainAt(cellAt(world, march.position)) ||
            changed;
      }
      remaining -= dt;
      _secondFraction += dt;
      if (_secondFraction >= 1 - 1e-9) {
        _secondFraction = 0;
        changed = _combatRound() || changed;
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

  bool _combatRound() {
    var changed = false;
    final engagedCities = <int>{};
    for (final march in marches.values.toList()) {
      if (!marches.containsKey(march.hero.id) ||
          march.phase == MarchPhase.marching) {
        continue;
      }
      final target = cities[march.target.id]!;
      if (target.ownerCountryId == march.hero.countryId) {
        _station(march);
        changed = true;
        continue;
      }
      if (!engagedCities.add(march.target.id)) continue;
      final defender = garrisonAt(march.target.id).firstOrNull;
      if (defender == null) {
        _captureCity(march.target.id, march.hero.countryId);
        _station(march);
        changed = true;
        continue;
      }
      march.phase = MarchPhase.fighting;
      // 新原型的顺序交战公式，不作为 NES 原版算法。
      final attack = math.max(
        1,
        march.hero.combat + march.hero.soldiers * 2 - target.level * 2,
      );
      defender.hp = math.max(0, defender.hp - attack);
      if (defender.hp == 0) {
        defeatHero(defender.id, winnerCountryId: march.hero.countryId);
        if (target.ownerCountryId == march.hero.countryId ||
            garrisonAt(march.target.id).isEmpty) {
          _captureCity(march.target.id, march.hero.countryId);
          _station(march);
        }
      } else {
        final homeLevel = cities[march.hero.cityId]!.level;
        final retaliation = math.max(
          1,
          defender.combat +
              defender.soldiers * 2 +
              target.level * 4 -
              homeLevel * 2,
        );
        march.hero.hp = math.max(0, march.hero.hp - retaliation);
        if (march.hero.hp == 0) {
          defeatHero(march.hero.id, winnerCountryId: defender.countryId);
        }
      }
      changed = true;
    }
    return changed;
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
    return removed;
  }

  void _station(HeroMarch march) {
    marches.remove(march.hero.id);
    march.hero.cityId = march.target.id;
    _record('${march.hero.name}已进驻${march.target.label}');
  }

  String _cityName(int id) =>
      world.cities.firstWhere((city) => city.id == id).label;
  void _record(String event) {
    lastEvent = event;
    journal.add(event);
    if (journal.length > 8) journal.removeAt(0);
  }
}
