import 'dart:math' as math;
import 'dart:ui';

import 'package:flutter/foundation.dart';

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

  /// 已完成的格子位置，重新规划从当前运动段的终点继续。
  TileCoord heroCell = const TileCoord(0, 0);

  /// 正在行走的路径。
  List<TileCoord> route = [];

  /// 当前路径中的目标节点。
  int routeStep = 0;

  /// 是否在移动。
  bool get walking => routeStep < route.length;

  /// 累计动画时间，单位秒。
  double time = 0;

  /// 角色方向：右、下、上、左。
  int direction = 1;

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
    camera.worldSize = world.pixelSize;
    camera.scale = 3;
    camera.center = world.cities.first.bounds.center;
    camera.constrain();
    message = '点击地面行走，拖动地图探索';
    refreshUi();
  }

  /// 更新动画与键盘镜头移动。
  void tick(double elapsed) {
    final dt = elapsed.clamp(0.0, 0.05);
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
      var budget = dt * 44;
      while (walking && budget > 0) {
        final target = route[routeStep].center;
        final delta = target - heroPosition;
        if (delta.distance > 0.01) {
          direction = delta.dx.abs() > delta.dy.abs()
              ? (delta.dx > 0 ? 0 : 3)
              : (delta.dy > 0 ? 1 : 2);
        }
        if (delta.distance <= budget) {
          heroPosition = target;
          heroCell = route[routeStep++];
          budget -= delta.distance;
        } else {
          heroPosition += delta / delta.distance * budget;
          budget = 0;
        }
      }
      if (followHero) {
        camera.center = heroPosition;
        camera.constrain();
      }
      if (!walking) {
        message = '已到达 (${heroCell.x}, ${heroCell.y})';
        refreshUi();
      }
    }
    notifyListeners();
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

  /// 规划行走路径，失败时保留角色现有位置和行动。
  void walkTo(TileCoord destination) {
    // 行军途中重规划先走完当前段，防止角色跳回上一格或斜穿障碍。
    final start = walking ? route[routeStep] : heroCell;
    final path = findRoute(world, start, destination);
    if (path == null) {
      message = world.isWalkable(destination)
          ? '暂时无法到达这里，试试附近的桥梁'
          : '这里是水域或山地，请选择可通行的地面';
      refreshUi();
      return;
    }
    route = walking ? path : path.skip(1).toList();
    routeStep = 0;
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
