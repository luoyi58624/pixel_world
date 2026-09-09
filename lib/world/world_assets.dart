import 'dart:ui' as ui;

import 'package:flutter/services.dart';

import 'hero_sprite.dart';
import 'rom_hero.dart';
import 'world_data.dart';

/// 共享纹理及由地图数据生成的绘制缓存。
class WorldAssets {
  WorldAssets._(
    this.worlds,
    this.terrain,
    this.heroes,
    this.water,
    this.scenes,
    this.minimaps,
    this.heroCatalog,
    this.flags,
    this.friendlyHeroes,
    this.battleSprites,
    this.battleScenes,
  );

  /// 三个场景的独立地图定义。
  final List<WorldDefinition> worlds;

  /// 从 ROM 提取的正式英雄静态目录。
  final List<RomHeroDefinition> heroCatalog;

  /// 原版 8×8 国旗和特殊地点标记图集。
  final ui.Image flags;

  /// 地形组合图块集。
  final ui.Image terrain;

  /// 高级将领、普通将领和主角各自的六帧动作图集。
  final Map<HeroAppearance, ui.Image> heroes;

  /// 我方将领使用参考图的红褐配色，主角保留独立图集。
  final Map<HeroAppearance, ui.Image> friendlyHeroes;

  /// 从战斗拼接表提取的角色：两个侧面步态和一帧拼杀动作。
  final Map<String, ui.Image> battleSprites;

  /// 原 ROM 城内背景，编号 3、4、5 对应不同城池等级。
  final Map<int, ui.Image> battleScenes;

  /// 按实际阵营读取地图或面板人物，避免我方仍使用敌方蓝色。
  ui.Image heroImage(HeroAppearance appearance, {bool friendly = false}) =>
      (friendly ? friendlyHeroes : heroes)[appearance]!;

  /// 水面动画图块集。
  final ui.Image water;

  /// 一次拼接生成的地图缓存，避免每帧重复提交静态图块。
  final List<ui.Image> scenes;

  /// 小地图缩略图。
  final List<ui.Image> minimaps;

  int? _heroFrameSize;
  final _heroFrames = <(HeroAppearance, bool, int), ui.Image>{};

  /// 按当前物理尺寸缓存动画帧，平移时直接贴图，避免非整数放大的重复采样抖动。
  ui.Image heroFrame(
    HeroAppearance appearance,
    int frame,
    int pixelSize, {
    bool friendly = false,
  }) {
    if (_heroFrameSize != pixelSize) {
      for (final image in _heroFrames.values) {
        image.dispose();
      }
      _heroFrames.clear();
      _heroFrameSize = pixelSize;
    }
    return _heroFrames.putIfAbsent((appearance, friendly, frame), () {
      final recorder = ui.PictureRecorder();
      ui.Canvas(recorder).drawImageRect(
        heroImage(appearance, friendly: friendly),
        ui.Rect.fromLTWH(frame * 16, 0, 16, 16),
        ui.Rect.fromLTWH(0, 0, pixelSize.toDouble(), pixelSize.toDouble()),
        ui.Paint()
          ..filterQuality = ui.FilterQuality.none
          ..isAntiAlias = false,
      );
      final picture = recorder.endRecording();
      final image = picture.toImageSync(pixelSize, pixelSize);
      picture.dispose();
      return image;
    });
  }

  /// 加载资源并在内存中拼接地图，保留 JSON 作为地图定义。
  static Future<WorldAssets> load() async {
    final worlds = decodeWorlds(
      await rootBundle.loadString('assets/maps/worlds.json'),
    );
    final heroCatalog = decodeRomHeroes(
      await rootBundle.loadString('assets/data/rom_heroes.json'),
    );
    const battleNames = [
      'soldier_red',
      'soldier_blue',
      'advanced_red',
      'advanced_blue',
      'normal_red',
      'normal_blue',
      'protagonist_red',
      'protagonist_blue',
    ];
    final textures = await Future.wait(
      [
        'terrain',
        'hero/advanced',
        'hero/normal',
        'water',
        'minimap_0',
        'minimap_1',
        'minimap_2',
        'flags',
        'hero/protagonist',
        'hero/advanced_red',
        'hero/normal_red',
        ...battleNames.map((name) => 'battle/$name'),
        'battle/stage_3',
        'battle/stage_4',
        'battle/stage_5',
      ].map(_image),
    );
    for (final hero in [
      textures[1],
      textures[2],
      textures[8],
      textures[9],
      textures[10],
    ]) {
      if (hero.width != 96 || hero.height != 16) {
        throw const FormatException('英雄图集必须为六帧横排的 96×16 图片');
      }
    }
    for (final sprite in textures.sublist(11, 19)) {
      if (sprite.width != 96 || sprite.height != 32) {
        throw const FormatException('战斗图集必须为三帧横排的 96×32 图片');
      }
    }
    if (textures[7].width != 128 || textures[7].height != 8) {
      throw const FormatException('国旗图集必须为十六帧横排的 128×8 图片');
    }
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
      Map.unmodifiable({
        HeroAppearance.advanced: textures[1],
        HeroAppearance.normal: textures[2],
        HeroAppearance.protagonist: textures[8],
      }),
      textures[3],
      scenes,
      textures.sublist(4, 7),
      heroCatalog,
      textures[7],
      Map.unmodifiable({
        HeroAppearance.advanced: textures[9],
        HeroAppearance.normal: textures[10],
        HeroAppearance.protagonist: textures[8],
      }),
      {
        for (var n = 0; n < battleNames.length; n++)
          battleNames[n]: textures[11 + n],
      },
      {3: textures[19], 4: textures[20], 5: textures[21]},
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
    for (final image in <ui.Image>{
      terrain,
      ...heroes.values,
      ...friendlyHeroes.values,
      ...battleSprites.values,
      ...battleScenes.values,
      water,
      ...scenes,
      ...minimaps,
      ..._heroFrames.values,
      flags,
    }) {
      image.dispose();
    }
  }
}
