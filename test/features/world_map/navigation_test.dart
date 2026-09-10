import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/heroes/domain/hero_sprite.dart';
import 'package:pixel_world/features/world_map/presentation/world_camera.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

WorldDefinition _fixture(List<int> tiles) => WorldDefinition.fromJson(
  {
    'id': 0,
    'width': 5,
    'height': 5,
    'tiles': tiles,
    'cities': [
      {
        'id': 0,
        'x': 0,
        'y': 0,
        'width': 1,
        'height': 1,
        'shape': [0],
        'unitIds': [0],
      },
    ],
  },
  [0, 1, 2, 3],
);

void _advance(WorldController controller, int frames, [double dt = 0.05]) {
  for (var n = 0; n < frames; n++) {
    controller.tick(dt);
  }
}

void main() {
  test('三张真实地图的尺寸、城池配置和出生点有效', () {
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
    );
    expect(worlds.map((world) => world.cities.length), [10, 11, 12]);
    for (final world in worlds) {
      expect(world.terrain.length, 3840);
      expect(
        world.displayTiles.every((tile) => tile >= 0 && tile < 128),
        isTrue,
      );
      final spawn = world.nearestWalkable(world.cities.first.entrance);
      expect(world.isWalkable(spawn), isTrue);
      expect(
        world.cityAt(world.cities.first.bounds.center),
        world.cities.first,
      );
    }
    expect(worlds.first.cities.first.x, 15);
    expect(worlds.first.cities.first.y, 47);
  });

  test('路线直接连接目标，水域和山地都可以穿越', () {
    final world = _fixture([
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
    ]);
    final path = findRoute(
      world,
      const TileCoord(1, 0),
      const TileCoord(3, 0),
    )!;
    expect(path, [const TileCoord(1, 0), const TileCoord(3, 0)]);
    expect(path.every(world.isWalkable), isTrue);
    expect(
      findRoute(world, const TileCoord(1, 0), const TileCoord(2, 0)),
      isNotNull,
    );
    expect(
      findRoute(world, const TileCoord(1, 0), const TileCoord(-1, 0)),
      isNull,
    );
  });

  test('隔着河流也选择最短直线', () {
    final world = _fixture(List.generate(25, (n) => n % 5 == 2 ? 1 : 0));
    expect(findRoute(world, const TileCoord(0, 1), const TileCoord(4, 1)), [
      const TileCoord(0, 1),
      const TileCoord(4, 1),
    ]);
  });

  test('缩放保持鼠标锚点处的世界位置不动', () {
    final camera = WorldCamera(const GameSize(1024, 960))
      ..center = const GamePoint(400, 400);
    camera.resize(const GameSize(800, 600));
    const anchor = GamePoint(620, 230);
    final before = camera.toWorld(anchor);
    camera.zoomTo(4.5, anchor);
    expect((camera.toWorld(anchor) - before).distance, lessThan(0.00001));
    expect((camera.toScreen(before) - anchor).distance, lessThan(0.00001));
  });

  test('镜头越界时约束到边缘，全图模式居中', () {
    final camera = WorldCamera(const GameSize(1024, 960))
      ..center = const GamePoint(-10000, 10000);
    camera.resize(const GameSize(800, 600));
    expect(camera.visibleWorld.left, closeTo(0, 0.0001));
    expect(camera.visibleWorld.bottom, closeTo(960, 0.0001));
    camera.overview();
    expect(camera.center, const GamePoint(512, 480));
    expect(camera.scale, closeTo(0.625, 0.00001));
  });

  test('行军中重新选点不会瞬移，角色最终到达新目标', () {
    final controller = WorldController([_fixture(List.filled(25, 0))]);
    controller.walkTo(const TileCoord(4, 1));
    controller.tick(0.05);
    final before = controller.heroPosition;
    controller.walkTo(const TileCoord(1, 4));
    expect(controller.heroPosition, before);
    for (var n = 0; n < 200; n++) {
      controller.tick(0.05);
    }
    expect(controller.heroCell, const TileCoord(1, 4));
    expect(controller.walking, isFalse);
    controller.dispose();
  });

  test('斜向和水平行军具有相同的实际速度', () {
    final world = _fixture(List.filled(25, 0));
    final horizontal = WorldController([world]);
    final diagonal = WorldController([world]);
    final start = horizontal.heroPosition;
    horizontal.walkTo(const TileCoord(4, 1));
    diagonal.walkTo(const TileCoord(4, 4));
    _advance(horizontal, 20);
    _advance(diagonal, 20);
    expect((horizontal.heroPosition - start).distance, closeTo(16.5, 1e-8));
    expect((diagonal.heroPosition - start).distance, closeTo(16.5, 1e-8));
    expect(diagonal.direction, HeroDirection.southEast);
    final moved = diagonal.heroPosition - start;
    expect(moved.dx * 48 - moved.dy * 64, closeTo(0, 1e-8));
    horizontal.dispose();
    diagonal.dispose();
  });

  test('基础速度减半，草地0.75、河流0.4、山地0.2，桥梁和建筑保留基础速度', () {
    expect(WorldController.baseMovementSpeed, 22);
    for (final entry in {0: 0.75, 1: 0.4, 2: 0.2, 3: 1.0}.entries) {
      final controller = WorldController([
        _fixture(List.filled(25, entry.key)),
      ]);
      final start = controller.heroPosition;
      controller.walkTo(const TileCoord(4, 1));
      _advance(controller, 20);
      expect(
        (controller.heroPosition - start).distance,
        closeTo(22 * entry.value, 1e-8),
      );
      _advance(controller, 400);
      expect(controller.heroPosition, const TileCoord(4, 1).center);
      expect(controller.walking, isFalse);
      controller.dispose();
    }
  });

  test('跨越河岸时按各段地形计算时间，结果不依赖帧长', () {
    final world = _fixture(List.generate(25, (n) => n % 5 >= 2 ? 1 : 0));
    for (final frames in [1, 5, 20, 100]) {
      final controller = WorldController([world]);
      controller.walkTo(const TileCoord(4, 1));
      _advance(controller, frames, 3 / frames);
      // 前 24 像素按 16.5/s，剩余时间按水速 8.8/s，三秒到 x=45.6。
      expect(controller.heroPosition.dx, closeTo(45.6, 1e-8));
      expect(controller.heroPosition.dy, 24);
      expect(controller.movementTerrain, MovementTerrain.water);
      controller.dispose();
    }
  });

  test('反向跨越河岸后立即恢复平地速度', () {
    final world = _fixture(List.generate(25, (n) => n % 5 >= 2 ? 1 : 0));
    final controller = WorldController([world]);
    controller.heroPosition = const GamePoint(56, 24);
    controller.heroCell = const TileCoord(3, 1);
    controller.walkTo(const TileCoord(0, 1));
    _advance(controller, 80);
    expect(controller.heroPosition.dx, closeTo(11, 1e-8));
    expect(controller.movementTerrain, MovementTerrain.plain);
    expect(controller.direction, HeroDirection.west);
    controller.dispose();
  });

  test('途中改点从当前像素位置立刻转向，不走完旧格子', () {
    final controller = WorldController([_fixture(List.filled(25, 0))]);
    controller.walkTo(const TileCoord(4, 1));
    _advance(controller, 5);
    final before = controller.heroPosition;
    final target = const TileCoord(0, 4).center;
    controller.walkTo(const TileCoord(0, 4));
    expect(controller.heroPosition, before);
    controller.tick(0.05);
    expect(controller.heroPosition.dx, lessThan(before.dx));
    expect(controller.heroPosition.dy, greaterThan(before.dy));
    final moved = controller.heroPosition - before;
    final remaining = target - before;
    expect(moved.dx * remaining.dy - moved.dy * remaining.dx, closeTo(0, 1e-8));
    controller.dispose();
  });

  test('切换角色外观不改变位置、朝向和目的地', () {
    final controller = WorldController([_fixture(List.filled(25, 0))]);
    controller.walkTo(const TileCoord(4, 4));
    controller.tick(0.05);
    final before = controller.heroPosition;
    controller.appearance = HeroAppearance.normal;
    expect(controller.heroPosition, before);
    expect(controller.direction, HeroDirection.southEast);
    expect(controller.route.last, const TileCoord(4, 4));
    controller.dispose();
  });
}
