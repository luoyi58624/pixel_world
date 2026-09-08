import 'dart:ui' as ui;

import 'package:flutter/services.dart';

import 'world_data.dart';

/// 共享纹理及由地图数据生成的绘制缓存。
class WorldAssets {
  WorldAssets._(
    this.worlds,
    this.terrain,
    this.hero,
    this.water,
    this.scenes,
    this.minimaps,
  );

  /// 三个场景的独立地图定义。
  final List<WorldDefinition> worlds;

  /// 地形组合图块集。
  final ui.Image terrain;

  /// 角色动作图块集。
  final ui.Image hero;

  /// 水面动画图块集。
  final ui.Image water;

  /// 一次拼接生成的地图缓存，避免每帧重复提交静态图块。
  final List<ui.Image> scenes;

  /// 小地图缩略图。
  final List<ui.Image> minimaps;

  /// 加载资源并在内存中拼接地图，保留 JSON 作为地图定义。
  static Future<WorldAssets> load() async {
    final worlds = decodeWorlds(
      await rootBundle.loadString('assets/maps/worlds.json'),
    );
    final textures = await Future.wait(
      [
        'terrain',
        'hero',
        'water',
        'minimap_0',
        'minimap_1',
        'minimap_2',
      ].map(_image),
    );
    final scenes = <ui.Image>[];
    final paint = ui.Paint()
      ..filterQuality = ui.FilterQuality.none
      ..isAntiAlias = false;
    for (final world in worlds) {
      final recorder = ui.PictureRecorder();
      final canvas = ui.Canvas(recorder);
      for (var n = 0; n < world.displayTiles.length; n++) {
        final tile = world.displayTiles[n];
        canvas.drawImageRect(
          textures[0],
          ui.Rect.fromLTWH((tile % 16) * 16, (tile ~/ 16) * 16, 16, 16),
          ui.Rect.fromLTWH(
            (n % world.width) * 16,
            (n ~/ world.width) * 16,
            16,
            16,
          ),
          paint,
        );
      }
      final picture = recorder.endRecording();
      scenes.add(await picture.toImage(world.width * 16, world.height * 16));
      picture.dispose();
    }
    return WorldAssets._(
      worlds,
      textures[0],
      textures[1],
      textures[2],
      scenes,
      textures.sublist(3),
    );
  }

  static Future<ui.Image> _image(String name) async {
    final data = await rootBundle.load('assets/images/$name.png');
    final codec = await ui.instantiateImageCodec(data.buffer.asUint8List());
    final frame = await codec.getNextFrame();
    codec.dispose();
    return frame.image;
  }

  /// 释放本界面持有的图形资源。
  void dispose() {
    for (final image in [terrain, hero, water, ...scenes, ...minimaps]) {
      image.dispose();
    }
  }
}
