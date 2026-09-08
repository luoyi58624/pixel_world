import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/foundation.dart';

import 'campaign.dart';
import 'hero_sprite.dart';
import 'rom_hero.dart';
import 'world_camera.dart';
import 'world_data.dart';
import 'world_movement.dart';

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

  /// 选择面板中的英雄编号。
  String? selectedHeroId;

  /// 已点出击、尚未在地图上确认位置的英雄。
  CampaignHero? pendingHero;

  /// 正等待重新指定目的地的在外英雄。
  String? movingHeroId;

  /// 地图角色面板当前选择的英雄。
  String? selectedUnitId;

  /// 是否展开角色的完整属性。
  bool showUnitDetails = false;

  /// 正在查看的实时交战记录，结束后仍保留结果。
  CityBattle? watchedBattle;

  /// 是否处于选点模式，此时地图点击只用于提交目标。
  bool get choosingTarget => pendingHero != null || movingHeroId != null;

  /// 当前选点指令的英雄名称。
  String get commandHeroName =>
      pendingHero?.name ?? campaign.marches[movingHeroId]?.hero.name ?? '';

  /// 已选中的在外部队。
  HeroMarch? get selectedUnit => campaign.marches[selectedUnitId];

  /// 已选中地图人物的实际英雄资料。
  CampaignHero? get selectedMapHero =>
      campaign.heroes.where((hero) => hero.id == selectedUnitId).firstOrNull;

  /// 首次派兵前，城门人物代表实际驻城主角。
  CampaignHero? get previewHero => campaign.hasDispatched
      ? null
      : campaign.heroes.where((hero) => hero.isPlayer).firstOrNull;

  /// 角色可以接收行军指令，已经在外的部队允许中途改道。
  bool get canMoveSelected =>
      selectedUnit != null ||
      (selectedMapHero != null && campaign.canDispatch(selectedMapHero!));

  String? _targetReturnUnitId;
  Offset? _pointer;

  /// 拖动地图时暂时停止边缘滚屏，避免两种输入相互抢镜头。
  bool dragging = false;

  /// 鼠标所在位置是否可打开角色、城池或交战面板。
  bool get pointerInteractive {
    final local = _pointer;
    if (local == null) return false;
    final point = camera.toWorld(local);
    return _heroAt(point) != null ||
        world.cityAt(point) != null ||
        _battleAt(local) != null;
  }

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
    movingHeroId = null;
    selectedUnitId = null;
    watchedBattle = null;
    _targetReturnUnitId = null;
    _pointer = null;
    dragging = false;
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
    message = '点击角色下达指令，拖拽或靠近画面边缘移动镜头';
    refreshUi();
  }

  /// 更新动画与键盘镜头移动。
  void tick(double elapsed) {
    // 所有面板共用这一时钟；保留真实帧间隔，低帧率不让行军额外变慢。
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
    } else if (!dragging && _pointer != null) {
      final pan = _edgeDirection(_pointer!);
      if (pan != Offset.zero) {
        camera.pan(-pan * dt * 420);
        followHero = false;
      }
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
    var changed = campaign.advance(dt);
    if (changed) {
      if (campaign.lastEvent.isNotEmpty) message = campaign.lastEvent;
    }
    if (pendingHero != null && !campaign.canDispatch(pendingHero!)) {
      pendingHero = null;
      _targetReturnUnitId = null;
      changed = true;
    }
    if (movingHeroId != null && !campaign.marches.containsKey(movingHeroId)) {
      movingHeroId = null;
      _targetReturnUnitId = null;
      message = '该英雄已结束行军，请重新选择';
      changed = true;
    }
    if (selectedUnitId != null &&
        selectedUnit == null &&
        previewHero?.id != selectedUnitId) {
      selectedUnitId = null;
      changed = true;
    }
    if (changed) refreshUi();
    if (followHero && campaign.marches.isNotEmpty) {
      camera.center = focusPosition;
      camera.constrain();
    }
    if (_pointer != null) _updateCursor(_pointer!);
    notifyListeners();
  }

  /// 选点指令优先，其余点击按交战标记、角色、城池依次命中。
  void tap(Offset local) {
    final point = camera.toWorld(local);
    final cell = TileCoord((point.dx / 16).floor(), (point.dy / 16).floor());
    final city = world.cityAt(point);
    if (choosingTarget) {
      if (!world.contains(cell)) return;
      confirmPosition(city?.bounds.center ?? cell.center);
      return;
    }
    final battle = _battleAt(local);
    if (battle != null) {
      watchBattle(battle);
      return;
    }
    if (!world.contains(cell) && city == null) return;
    cursor = world.contains(cell) ? cell : null;
    final hero = _heroAt(point);
    if (hero != null) {
      openUnit(hero.id);
    } else if (city != null) {
      openCity(city);
    } else {
      selectedCity = null;
      selectedUnitId = null;
      watchedBattle = null;
      if (campaign.heroes.isEmpty && !campaign.hasDispatched) {
        walkTo(cell);
      } else {
        refreshUi();
      }
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

  /// 直接展开城池详情，我方城池同时提供英雄选择。
  void openCity(CityDefinition city) {
    if (!world.cities.contains(city) || choosingTarget) return;
    selectedUnitId = null;
    watchedBattle = null;
    selectedCity = city;
    final heroes = campaign.heroesAt(city.id);
    selectedHeroId =
        (heroes.where(campaign.canDispatch).firstOrNull ?? heroes.firstOrNull)
            ?.id;
    message = '已选中${city.label}';
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

  /// 确认英雄后进入地图选点模式，真正选定目标才扣除城内驻兵。
  void prepareDispatch() {
    final hero = selectedHero;
    if (selectedCity == null || hero == null || !campaign.canDispatch(hero)) {
      return;
    }
    pendingHero = hero;
    movingHeroId = null;
    _targetReturnUnitId = null;
    selectedUnitId = null;
    watchedBattle = null;
    selectedCity = null;
    message = '为${hero.name}选择目的地 · 点击地图任意位置';
    refreshUi();
  }

  /// 提交目标后从出发城门生成部队，不影响其他英雄的行军。
  void confirmTarget(CityDefinition target) {
    if (!world.cities.contains(target)) return;
    confirmPosition(target.bounds.center);
  }

  /// 将光标所指位置提交给指定英雄，不影响其他部队当前命令。
  void confirmPosition(Offset point) {
    if (!(Offset.zero & world.pixelSize).contains(point)) return;
    final hero = pendingHero ?? campaign.marches[movingHeroId]?.hero;
    if (hero == null) return;
    final accepted = pendingHero != null
        ? campaign.dispatchTo(hero, point) != null
        : campaign.moveTo(hero.id, point);
    if (!accepted) return;
    pendingHero = null;
    movingHeroId = null;
    _targetReturnUnitId = null;
    selectedCity = null;
    route = [];
    routeStep = 0;
    final city = world.cityAt(point);
    message =
        '${hero.name}率 ${hero.soldiers} 名士兵前往 '
        '${city?.label ?? '(${(point.dx / 16).floor()}, ${(point.dy / 16).floor()})'}';
    refreshUi();
  }

  /// 取消选目标时回到原城池面板，面板内取消则直接关闭。
  void cancelCityAction() {
    if (choosingTarget && _targetReturnUnitId != null) {
      selectedUnitId = _targetReturnUnitId;
      pendingHero = null;
      movingHeroId = null;
      _targetReturnUnitId = null;
      message = '已取消选点，原指令继续执行';
    } else if (pendingHero case final hero?) {
      pendingHero = null;
      selectedCity = world.cities.firstWhere((city) => city.id == hero.cityId);
      message = '已取消选择进攻目标';
    } else {
      selectedCity = null;
      selectedUnitId = null;
      watchedBattle = null;
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
      selectedUnit?.position ??
      campaign.marches.values.lastOrNull?.position ??
      heroPosition;

  /// 地图底部的行军说明，只在界面状态变化时重建。
  String get statusMessage {
    if (campaign.defeated) return '城池已失守，本场景没有存活英雄';
    final battle = campaign.marches.values
        .where((march) => march.phase == MarchPhase.fighting)
        .firstOrNull;
    if (battle != null && pendingHero == null && selectedCity == null) {
      return '${battle.hero.name}正在进攻${battle.target!.label} · HP ${battle.hero.hp}/${battle.hero.maxHp}';
    }
    final march = campaign.marches.values
        .where((march) => march.phase == MarchPhase.marching)
        .lastOrNull;
    if (choosingTarget || selectedCity != null || selectedUnitId != null) {
      return message;
    }
    if (march != null) {
      final terrain = world.movementTerrainAt(cellAt(world, march.position));
      return '${march.hero.name} → ${march.target?.label ?? '目的地'} · ${terrain.label} ${(terrain.speedFactor * 100).round()}%速度';
    }
    return walking
        ? '$message · ${movementTerrain.label} ${(movementTerrain.speedFactor * 100).round()}%速度'
        : message;
  }

  /// 更新悬停选框。
  void hover(Offset local) {
    final interactive = pointerInteractive;
    _pointer = local;
    _updateCursor(local);
    if (interactive != pointerInteractive) uiRevision.value++;
  }

  /// 离开地图、进入面板或窗口失焦时停止边缘滚屏。
  void leaveMap() {
    _pointer = null;
    cursor = null;
    notifyListeners();
  }

  Offset _edgeDirection(Offset point) {
    final size = camera.viewport;
    if (!(Offset.zero & size).contains(point)) return Offset.zero;
    const edge = 28.0;
    double axis(double value, double length) => value < edge
        ? -(1 - value / edge)
        : value > length - edge
        ? 1 - (length - value) / edge
        : 0;
    final direction = Offset(
      axis(point.dx, size.width),
      axis(point.dy, size.height),
    );
    return direction.distance > 1 ? direction / direction.distance : direction;
  }

  void _updateCursor(Offset local) {
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

  CampaignHero? _heroAt(Offset point) {
    final units = campaign.marches.values.toList()
      ..sort((a, b) => b.position.dy.compareTo(a.position.dy));
    final radius = math.max(8.0, 12 / camera.scale);
    for (final unit in units) {
      if (Rect.fromCenter(
        center: unit.position,
        width: radius * 2,
        height: radius * 2,
      ).contains(point)) {
        return unit.hero;
      }
    }
    if (previewHero != null &&
        Rect.fromCenter(
          center: heroPosition,
          width: radius * 2,
          height: radius * 2,
        ).contains(point)) {
      return previewHero;
    }
    return null;
  }

  /// 战斗标记的位置和点击区域共用屏幕坐标，不受地图缩放影响。
  Rect battleMarkerBounds(CityBattle battle) => Rect.fromCenter(
    center: camera.toScreen(battle.city.bounds.topCenter) - const Offset(0, 22),
    width: 40,
    height: 36,
  );

  CityBattle? _battleAt(Offset local) => campaign.battles.values
      .where(
        (battle) =>
            battle.isActive && battleMarkerBounds(battle).contains(local),
      )
      .firstOrNull;

  /// 打开角色操作面板，不停止正在执行的行军或交战。
  void openUnit(String id) {
    if (choosingTarget ||
        (!campaign.marches.containsKey(id) && previewHero?.id != id)) {
      return;
    }
    selectedUnitId = id;
    selectedCity = null;
    watchedBattle = null;
    showUnitDetails = false;
    message = '已选中${selectedMapHero!.name}';
    refreshUi();
  }

  /// 等待新的位置，确认前继续执行原来的行军指令。
  void prepareMove() {
    final hero = selectedMapHero;
    if (hero == null || !canMoveSelected) return;
    _targetReturnUnitId = hero.id;
    if (selectedUnit != null) {
      movingHeroId = hero.id;
    } else {
      pendingHero = hero;
    }
    selectedUnitId = null;
    message = '为${hero.name}选择目的地 · 点击地图任意位置';
    refreshUi();
  }

  /// 仅让当前角色原地扎营，地图时间与其他单位保持运行。
  void campSelected() {
    if (selectedUnitId == null) return;
    if (selectedUnit != null) campaign.camp(selectedUnitId!);
    message = '${selectedMapHero?.name ?? '英雄'}已原地扎营';
    refreshUi();
  }

  /// 展开同一角色面板中的详细属性。
  void inspectUnit() {
    showUnitDetails = !showUnitDetails;
    refreshUi();
  }

  /// 查看后台正在运行的战斗，不创建新战斗或暂停时间。
  void watchBattle(CityBattle battle) {
    watchedBattle = battle;
    selectedUnitId = null;
    selectedCity = null;
    refreshUi();
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
