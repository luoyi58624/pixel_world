import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/foundation.dart';

import 'campaign.dart';
import 'hero_sprite.dart';
import 'rom_hero.dart';
import 'world_camera.dart';
import 'world_data.dart';
import 'world_movement.dart';
import 'world_markers.dart';

/// 城池入口、情况和出击面板，英雄详情始终与选择列表处于同一页。
enum CityPanelPage {
  /// 点击城池后的选项。
  actions,

  /// 城池情况。
  information,

  /// 选择出征英雄。
  dispatch,
}

/// 管理探索状态；连续动画只触发绘制，界面文字仅在状态变化时更新。
class WorldController extends ChangeNotifier {
  /// 使用已加载地图创建探索会话。
  WorldController(this.worlds, {List<RomHeroDefinition> heroCatalog = const []})
    : camera = WorldCamera(worlds.first.pixelSize),
      campaigns = worlds
          .map((world) => CampaignState.fromRom(world, heroCatalog))
          .toList() {
    switchWorld(0);
  }

  /// 可切换的场景。
  final List<WorldDefinition> worlds;

  /// 当前镜头。
  final WorldCamera camera;

  /// 各场景的独立玩法状态，切换地图不重置出征记录。
  final List<CampaignState> campaigns;

  /// 当前场景的城池与部队状态。
  CampaignState get campaign => campaigns[index];

  /// 城池面板当前页面。
  CityPanelPage cityPage = CityPanelPage.actions;

  /// 选择面板中的英雄编号。
  String? selectedHeroId;

  /// 已点出击、尚未在地图上确认敌城的英雄。
  CampaignHero? pendingHero;

  /// 当前选中的英雄详情。
  CampaignHero? get selectedHero =>
      campaign.heroes.where((hero) => hero.id == selectedHeroId).firstOrNull;

  /// 用于低频界面更新的版本号。
  final ValueNotifier<int> uiRevision = ValueNotifier(0);

  /// 当前场景索引。
  int index = 0;

  /// 当前地图。
  WorldDefinition get world => worlds[index];

  /// 当前选中的城池。
  CityDefinition? selectedCity;

  /// 鼠标或触摸指示的格子。
  TileCoord? cursor;

  /// 角色当前的世界位置。
  Offset heroPosition = Offset.zero;

  /// 角色当前所在的格子，行军过程中也持续更新。
  TileCoord heroCell = const TileCoord(0, 0);

  /// 正在行走的路径。
  List<TileCoord> route = [];

  /// 当前路径中的目标节点。
  int routeStep = 0;

  /// 是否在移动。
  bool get walking => routeStep < route.length;

  /// 累计动画时间，单位秒。
  double time = 0;

  /// 角色当前实际行军的八方向朝向。
  HeroDirection direction = HeroDirection.south;

  /// 当前使用的英雄图集。
  HeroAppearance appearance = HeroAppearance.protagonist;

  /// 当前行程已走过的像素距离，用于使步频随地形减速。
  double walkDistance = 0;

  /// 角色脚下的行军地形。
  MovementTerrain get movementTerrain => world.movementTerrainAt(heroCell);

  /// 同一方向的两帧步行动画索引，静止时保持站立帧。
  int get animationStep => walking ? (walkDistance / 6).floor() % 2 : 0;

  /// 平地行军速度，单位为原生地图像素每秒。
  static const double baseMovementSpeed = plainMovementSpeed;

  /// 是否显示格子边界。
  bool showGrid = false;

  /// 是否让镜头跟随行走角色。
  bool followHero = false;

  /// 界面操作提示。
  String message = '点击地面行走，拖动地图探索';

  /// 由按键输入设置的镜头运动方向。
  Offset keyboardDirection = Offset.zero;

  /// 按下加速键时提高镜头移动速度。
  bool fastPan = false;

  /// 切换地图并重置探索位置。
  void switchWorld(int value) {
    index = value;
    selectedCity = null;
    selectedHeroId = null;
    pendingHero = null;
    cityPage = CityPanelPage.actions;
    cursor = null;
    route = [];
    routeStep = 0;
    heroCell = world.nearestWalkable(world.cities.first.entrance);
    heroPosition = heroCell.center;
    direction = HeroDirection.south;
    walkDistance = 0;
    camera.worldSize = world.pixelSize;
    camera.scale = 3;
    camera.center = world.cities.first.bounds.center;
    camera.constrain();
    message = '点击地面行走，拖动地图探索';
    refreshUi();
  }

  /// 更新动画与键盘镜头移动。
  void tick(double elapsed) {
    // 暂停由界面生命周期控制；保留真实帧间隔，避免低帧率让行军额外变慢。
    final dt = elapsed.isFinite ? math.max(0.0, elapsed) : 0.0;
    time += dt;
    if (keyboardDirection != Offset.zero) {
      camera.pan(
        -keyboardDirection /
            keyboardDirection.distance *
            dt *
            (fastPan ? 900 : 420),
      );
      followHero = false;
    }
    if (walking && !campaign.hasDispatched) {
      final oldTerrain = movementTerrain;
      var remainingTime = dt;
      while (walking && remainingTime > 1e-9) {
        final target = route[routeStep].center;
        final delta = target - heroPosition;
        final distance = delta.distance;
        if (distance < 1e-8) {
          heroPosition = target;
          routeStep++;
          continue;
        }
        direction = HeroDirection.fromVector(delta);
        final result = advanceToward(
          world,
          heroPosition,
          target,
          remainingTime,
        );
        heroPosition = result.position;
        walkDistance += result.distance;
        remainingTime = result.remainingTime;
        if (heroPosition == target) {
          routeStep++;
        }
      }
      heroCell = cellAt(world, heroPosition);
      if (followHero) {
        camera.center = heroPosition;
        camera.constrain();
      }
      if (!walking) {
        message = '已到达 (${heroCell.x}, ${heroCell.y})';
        refreshUi();
      } else if (movementTerrain != oldTerrain) {
        refreshUi();
      }
    }
    if (campaign.advance(dt)) {
      if (campaign.lastEvent.isNotEmpty) message = campaign.lastEvent;
      if (pendingHero != null && !campaign.canDispatch(pendingHero!)) {
        pendingHero = null;
      }
      refreshUi();
    }
    if (followHero && campaign.marches.isNotEmpty) {
      camera.center = campaign.marches.values.last.position;
      camera.constrain();
    }
    notifyListeners();
  }

  /// 选中城池，或向所点击的地面发出行走指令。
  void tap(Offset local) {
    final point = camera.toWorld(local);
    final cell = TileCoord((point.dx / 16).floor(), (point.dy / 16).floor());
    final city =
        world.cities
            .where((city) => cityFlagRect(camera, city).contains(local))
            .firstOrNull ??
        world.cityAt(point);
    if (!world.contains(cell) && city == null) return;
    cursor = world.contains(cell) ? cell : null;
    if (pendingHero != null) {
      if (city == null || campaign.cities[city.id]!.isPlayer) {
        message = '请选择一座敌方城池作为进攻目标';
        refreshUi();
      } else {
        confirmTarget(city);
      }
    } else if (city != null) {
      openCity(city);
    } else {
      selectedCity = null;
      walkTo(cell);
    }
  }

  /// 从当前精确位置直线前往目标，途中改点时立即转向。
  void walkTo(TileCoord destination) {
    if (campaign.hasDispatched) {
      message = '点击我方城池查看情况或派遣英雄';
      refreshUi();
      return;
    }
    final path = findRoute(world, heroCell, destination);
    if (path == null) {
      message = '目标超出地图范围';
      refreshUi();
      return;
    }
    if (!walking) walkDistance = 0;
    final delta = destination.center - heroPosition;
    route = delta.distance < 1e-8 ? [] : [path.last];
    routeStep = 0;
    if (walking) direction = HeroDirection.fromVector(delta);
    message = walking
        ? '行军中 · 目的地 (${destination.x}, ${destination.y})'
        : '角色已经在这里';
    refreshUi();
  }

  /// 向选中城池附近行军。
  void visitCity() {
    final city = selectedCity;
    if (city != null) walkTo(world.nearestWalkable(city.entrance));
  }

  /// 展开城池选项，尚未进入英雄选择。
  void openCity(CityDefinition city) {
    if (!world.cities.contains(city) || pendingHero != null) return;
    selectedCity = city;
    cityPage = CityPanelPage.actions;
    final heroes = campaign.heroesAt(city.id);
    selectedHeroId =
        (heroes.where(campaign.canDispatch).firstOrNull ?? heroes.firstOrNull)
            ?.id;
    message = '已选中${city.label}';
    refreshUi();
  }

  /// 从城池选项进入情况或英雄选择。
  void showCityPage(CityPanelPage page) {
    if (selectedCity == null) return;
    if (page == CityPanelPage.dispatch &&
        !campaign.cities[selectedCity!.id]!.isPlayer) {
      return;
    }
    cityPage = page;
    refreshUi();
  }

  /// 只切换详情，不提前改变驻军或地图上的角色。
  void selectHero(String id) {
    if (selectedCity == null ||
        !campaign.heroesAt(selectedCity!.id).any((hero) => hero.id == id)) {
      return;
    }
    selectedHeroId = id;
    refreshUi();
  }

  /// 确认英雄后进入地图选敌城模式，真正选定目标才扣除城内驻兵。
  void prepareDispatch() {
    final hero = selectedHero;
    if (cityPage != CityPanelPage.dispatch ||
        hero == null ||
        !campaign.canDispatch(hero)) {
      return;
    }
    pendingHero = hero;
    selectedCity = null;
    message = '为${hero.name}选择进攻目标 · 点击敌方城池';
    refreshUi();
  }

  /// 提交目标后从出发城门生成部队，不影响其他英雄的行军。
  void confirmTarget(CityDefinition target) {
    final hero = pendingHero;
    if (hero == null) return;
    final march = campaign.dispatch(hero, target);
    if (march == null) return;
    pendingHero = null;
    selectedCity = null;
    route = [];
    routeStep = 0;
    message = '${hero.name}率 ${hero.soldiers} 名士兵出击 → ${target.label}';
    refreshUi();
  }

  /// 取消选目标时回到英雄面板，取消详情时回到城池选项。
  void cancelCityAction() {
    if (pendingHero case final hero?) {
      pendingHero = null;
      selectedCity = world.cities.firstWhere((city) => city.id == hero.cityId);
      cityPage = CityPanelPage.dispatch;
      message = '已取消选择进攻目标';
    } else if (selectedCity != null && cityPage != CityPanelPage.actions) {
      cityPage = CityPanelPage.actions;
    } else {
      selectedCity = null;
    }
    refreshUi();
  }

  /// 关闭城池面板，不改变任何已出征部队。
  void closeCity() {
    selectedCity = null;
    refreshUi();
  }

  /// 升级当前城池，失败时说明满级或金币不足，不改变余额。
  void upgradeSelectedCity() {
    final city = selectedCity;
    if (city == null) return;
    if (campaign.upgradeCity(city.id)) {
      message = campaign.lastEvent;
    } else {
      message = campaign.cities[city.id]!.level == CitySituation.maxLevel
          ? '城池已达到最高五级'
          : '金币不足，暂时无法升级';
    }
    refreshUi();
  }

  /// 镜头跟随最近派出的部队，尚未派兵时跟随探索角色。
  Offset get focusPosition =>
      campaign.marches.values.lastOrNull?.position ?? heroPosition;

  /// 地图底部的行军说明，只在界面状态变化时重建。
  String get statusMessage {
    if (campaign.defeated) return '城池已失守，本场景没有存活英雄';
    final battle = campaign.marches.values
        .where((march) => march.phase == MarchPhase.fighting)
        .firstOrNull;
    if (battle != null && pendingHero == null && selectedCity == null) {
      return '${battle.hero.name}正在进攻${battle.target.label} · HP ${battle.hero.hp}/${battle.hero.maxHp}';
    }
    final march = campaign.marches.values
        .where((march) => march.phase == MarchPhase.marching)
        .lastOrNull;
    if (pendingHero != null || selectedCity != null) return message;
    if (march != null) {
      final terrain = world.movementTerrainAt(cellAt(world, march.position));
      return '${march.hero.name} → ${march.target.label} · ${terrain.label} ${(terrain.speedFactor * 100).round()}%速度';
    }
    return walking
        ? '$message · ${movementTerrain.label} ${(movementTerrain.speedFactor * 100).round()}%速度'
        : message;
  }

  /// 更新悬停选框。
  void hover(Offset local) {
    final point = camera.toWorld(local);
    final candidate = TileCoord(
      (point.dx / 16).floor(),
      (point.dy / 16).floor(),
    );
    final next = world.contains(candidate) ? candidate : null;
    if (cursor != next) {
      cursor = next;
      notifyListeners();
    }
  }

  /// 回到初始据点。
  void home() {
    camera.scale = math.max(3, camera.minScale);
    camera.center = world.cities.first.bounds.center;
    camera.constrain();
    followHero = false;
    refreshUi();
  }

  /// 通知文字界面和绘制层读取新状态。
  void refreshUi() {
    uiRevision.value++;
    notifyListeners();
  }

  @override
  void dispose() {
    uiRevision.dispose();
    super.dispose();
  }
}
