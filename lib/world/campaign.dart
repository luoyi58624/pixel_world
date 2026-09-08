import 'dart:ui';

import 'hero_sprite.dart';
import 'world_data.dart';
import 'world_movement.dart';

/// 新游戏的城池情况，数值由原型配置提供，不解释 ROM 的未知字段。
class CitySituation {
  /// 创建城池的归属和展示数值。
  const CitySituation({
    required this.isPlayer,
    required this.defense,
    required this.income,
    this.level = 1,
    this.enemySoldiers = 12,
  });

  /// 是否属于玩家。
  final bool isPlayer;

  /// 当前城防。
  final int defense;

  /// 每回合收入，经济回合尚未运行。
  final int income;

  /// 城池等级。
  final int level;

  /// 敌城驻兵配置。
  final int enemySoldiers;
}

/// 一位英雄的身份、属性和随行部队，外观与英雄身份分开。
class CampaignHero {
  /// 创建可独立派遣的英雄。
  const CampaignHero({
    required this.id,
    required this.name,
    required this.appearance,
    required this.cityId,
    required this.hp,
    required this.combat,
    required this.politics,
    required this.salary,
    required this.soldiers,
    required this.ace,
    required this.hasEgg,
  });

  /// 本场景内唯一的英雄编号。
  final String id;

  /// 英雄名称。
  final String name;

  /// 所用的六帧角色图集。
  final HeroAppearance appearance;

  /// 英雄所属的出发城池。
  final int cityId;

  /// 当前和初始生命值，本阶段尚无战斗损耗。
  final int hp;

  /// 战斗能力。
  final int combat;

  /// 内政能力。
  final int politics;

  /// 每回合报酬。
  final int salary;

  /// 英雄携带的士兵数量。
  final int soldiers;

  /// 王牌的显示名称。
  final String ace;

  /// 是否持有召唤蛋。
  final bool hasEgg;
}

/// 出征状态先覆盖行军和抵达待战，不在界面阶段推断战斗胜负。
enum MarchPhase {
  /// 前往目标城池。
  marching,

  /// 已在目标城下等待战斗。
  awaitingBattle,
}

/// 一支已经确认出发的部队，取消选目标不会创建该记录。
class HeroMarch {
  /// 从所属城池城门开始行军。
  HeroMarch({
    required this.hero,
    required this.target,
    required this.position,
    required this.destination,
  }) : direction = HeroDirection.fromVector(destination - position);

  /// 统率这支部队的英雄。
  final CampaignHero hero;

  /// 本次进攻的敌城。
  final CityDefinition target;

  /// 目标城门的世界坐标。
  final Offset destination;

  /// 部队精确位置。
  Offset position;

  /// 当前行军朝向。
  final HeroDirection direction;

  /// 已走过的距离，用于地形减速时同步降低步频。
  double walkDistance = 0;

  /// 当前出征阶段。
  MarchPhase phase = MarchPhase.marching;

  /// 行走时播放两帧，抵达后保持站立帧。
  int get animationStep =>
      phase == MarchPhase.marching ? (walkDistance / 6).floor() % 2 : 0;

  /// 推进行军，返回此次是否刚刚抵达。
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

/// 每张地图独立保留城池、英雄和出征记录，静态地形数据保持不变。
class CampaignState {
  CampaignState._(this.world, this.cities, this.heroes);

  /// 使用明确的演示配置创建新游戏，数值和名称均可在此调整。
  factory CampaignState.prototype(WorldDefinition world) {
    final home = world.cities.first.id;
    return CampaignState._(
      world,
      {
        for (final city in world.cities)
          city.id: CitySituation(
            isPlayer: city.id == home,
            defense: city.id == home ? 100 : 80 + city.id % 3 * 20,
            income: city.id == home ? 126 : 80 + city.id * 6,
          ),
      },
      [
        CampaignHero(
          id: 'vanguard',
          name: '雷恩',
          appearance: HeroAppearance.advanced,
          cityId: home,
          hp: 99,
          combat: 15,
          politics: 15,
          salary: 0,
          soldiers: 4,
          ace: '烈焰召唤',
          hasEgg: true,
        ),
        CampaignHero(
          id: 'guardian',
          name: '艾琳',
          appearance: HeroAppearance.normal,
          cityId: home,
          hp: 84,
          combat: 12,
          politics: 18,
          salary: 2,
          soldiers: 4,
          ace: '无',
          hasEgg: false,
        ),
      ],
    );
  }

  /// 所属的静态地图。
  final WorldDefinition world;

  /// 以城池编号索引的玩法配置。
  final Map<int, CitySituation> cities;

  /// 玩家可查看和派遣的英雄。
  final List<CampaignHero> heroes;

  /// 已出征的英雄，防止同一英雄被重复派遣。
  final Map<String, HeroMarch> marches = {};

  /// 查询城池所属的英雄，已出征的仍可查看详情。
  List<CampaignHero> heroesAt(int cityId) =>
      heroes.where((hero) => hero.cityId == cityId).toList();

  /// 查询城中尚未出征的驻守士兵。
  int soldiersAt(int cityId) => cities[cityId]!.isPlayer
      ? heroesAt(cityId)
            .where((hero) => !marches.containsKey(hero.id))
            .fold(0, (sum, hero) => sum + hero.soldiers)
      : cities[cityId]!.enemySoldiers;

  /// 英雄必须仍在我方城内且有兵力，才能创建出征命令。
  bool canDispatch(CampaignHero hero) =>
      heroes.contains(hero) &&
      cities[hero.cityId]?.isPlayer == true &&
      hero.hp > 0 &&
      hero.soldiers > 0 &&
      !marches.containsKey(hero.id);

  /// 原子提交一次出征，只接受当前场景中的敌城。
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
    return march;
  }
}
