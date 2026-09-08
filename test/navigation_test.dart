import 'dart:io';
import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/world_camera.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';

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
  [0, 1, 2],
);

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

  test('路线绕过水域并且每步只移动一格', () {
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
    expect(path.length, 7);
    expect(path.every(world.isWalkable), isTrue);
    for (var n = 1; n < path.length; n++) {
      expect(
        (path[n].x - path[n - 1].x).abs() + (path[n].y - path[n - 1].y).abs(),
        1,
      );
    }
    expect(
      findRoute(world, const TileCoord(1, 0), const TileCoord(2, 0)),
      isNull,
    );
    expect(
      findRoute(world, const TileCoord(1, 0), const TileCoord(-1, 0)),
      isNull,
    );
  });

  test('无法到达的另一岸不产生路线', () {
    final world = _fixture(List.generate(25, (n) => n % 5 == 2 ? 1 : 0));
    expect(
      findRoute(world, const TileCoord(0, 1), const TileCoord(4, 1)),
      isNull,
    );
  });

  test('缩放保持鼠标锚点处的世界位置不动', () {
    final camera = WorldCamera(const Size(1024, 960))
      ..center = const Offset(400, 400);
    camera.resize(const Size(800, 600));
    const anchor = Offset(620, 230);
    final before = camera.toWorld(anchor);
    camera.zoomTo(4.5, anchor);
    expect((camera.toWorld(anchor) - before).distance, lessThan(0.00001));
    expect((camera.toScreen(before) - anchor).distance, lessThan(0.00001));
  });

  test('镜头越界时约束到边缘，全图模式居中', () {
    final camera = WorldCamera(const Size(1024, 960))
      ..center = const Offset(-10000, 10000);
    camera.resize(const Size(800, 600));
    expect(camera.visibleWorld.left, closeTo(0, 0.0001));
    expect(camera.visibleWorld.bottom, closeTo(960, 0.0001));
    camera.overview();
    expect(camera.center, const Offset(512, 480));
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
}
