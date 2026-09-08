import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/foundation.dart';

import 'hero_sprite.dart';
import 'world_camera.dart';
import 'world_data.dart';

/// 管理探索状态；连续动画只触发绘制，界面文字仅在状态变化时更新。
class WorldController extends ChangeNotifier {
  /// 使用已加载地图创建探索会话。
  WorldController(this.worlds) : camera = WorldCamera(worlds.first.pixelSize) {
    switchWorld(0);
  }

  /// 可切换的场景。
  final List<WorldDefinition> worlds;

  /// 当前镜头。
  final WorldCamera camera;

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
  HeroAppearance appearance = HeroAppearance.advanced;

  /// 当前行程已走过的像素距离，用于使步频随地形减速。
  double walkDistance = 0;

  /// 角色脚下的行军地形。
  MovementTerrain get movementTerrain => world.movementTerrainAt(heroCell);

  /// 同一方向的两帧步行动画索引，静止时保持站立帧。
  int get animationStep => walking ? (walkDistance / 6).floor() % 2 : 0;

  /// 平地行军速度，单位为原生地图像素每秒。
  static const double baseMovementSpeed = 44;

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
    if (walking) {
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
        final unit = delta / distance;
        // 在格子边界处分段积分，避免一帧跨过河岸时仍沿用上一格的速度。
        final sample = heroPosition + unit * 1e-7;
        final cell = _cellAt(sample);
        final factor = world.movementTerrainAt(cell).speedFactor;
        final speed = baseMovementSpeed * factor;
        final toBoundary = math.min(
          _distanceToBoundary(heroPosition.dx, unit.dx, cell.x),
          _distanceToBoundary(heroPosition.dy, unit.dy, cell.y),
        );
        final travel = math.min(
          distance,
          math.min(toBoundary, speed * remainingTime),
        );
        heroPosition += unit * travel;
        walkDistance += travel;
        remainingTime = math.max(0, remainingTime - travel / speed);
        if (distance - travel < 1e-8) {
          heroPosition = target;
          routeStep++;
        }
      }
      heroCell = _cellAt(heroPosition);
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
    notifyListeners();
  }

  TileCoord _cellAt(Offset position) => TileCoord(
    (position.dx / 16).floor().clamp(0, world.width - 1),
    (position.dy / 16).floor().clamp(0, world.height - 1),
  );

  double _distanceToBoundary(double value, double velocity, int cell) {
    if (velocity.abs() < 1e-12) return double.infinity;
    final boundary = (velocity > 0 ? cell + 1 : cell) * 16.0;
    return math.max(1e-8, (boundary - value) / velocity);
  }

  /// 选中城池，或向所点击的地面发出行走指令。
  void tap(Offset local) {
    final point = camera.toWorld(local);
    final cell = TileCoord((point.dx / 16).floor(), (point.dy / 16).floor());
    if (!world.contains(cell)) return;
    cursor = cell;
    selectedCity = world.cityAt(point);
    if (selectedCity != null) {
      message = '已选中${selectedCity!.label}';
      refreshUi();
    } else {
      walkTo(cell);
    }
  }

  /// 从当前精确位置直线前往目标，途中改点时立即转向。
  void walkTo(TileCoord destination) {
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
