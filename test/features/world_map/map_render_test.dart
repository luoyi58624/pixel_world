import 'package:pixel_world/core/geometry/flutter_geometry.dart';
import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/domain/hero_sprite.dart';
import 'package:pixel_world/features/world_map/data/world_assets.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

Future<List<Offset>> _heroPixels(
  WorldController controller,
  WorldAssets assets,
  double ratio,
) async {
  const size = Size(160, 160);
  final recorder = ui.PictureRecorder();
  final canvas = Canvas(recorder)..scale(ratio);
  WorldPainter(controller, assets, devicePixelRatio: ratio).paint(canvas, size);
  final picture = recorder.endRecording();
  final width = (size.width * ratio).round();
  final image = await picture.toImage(width, width);
  final bytes = (await image.toByteData())!;
  final pixels = <Offset>[];
  final color = controller.appearance == HeroAppearance.protagonist
      ? [234, 158, 34]
      : [66, 64, 255];
  // 当前测试位置没有同色地形或旗帜，可用衣帽主色直接比较真实栅格结果。
  for (var y = 0; y < width; y++) {
    for (var x = 0; x < width; x++) {
      final index = (y * width + x) * 4;
      if (bytes.getUint8(index) == color[0] &&
          bytes.getUint8(index + 1) == color[1] &&
          bytes.getUint8(index + 2) == color[2]) {
        pixels.add(Offset(x.toDouble(), y.toDouble()));
      }
    }
  }
  image.dispose();
  picture.dispose();
  expect(pixels, isNotEmpty);
  return pixels;
}

Offset _topLeft(List<Offset> pixels) => Offset(
  pixels.map((p) => p.dx).reduce((a, b) => a < b ? a : b),
  pixels.map((p) => p.dy).reduce((a, b) => a < b ? a : b),
);

void main() {
  testWidgets('开局主图和小地图没有城外预览人物，出征再回城后恢复相同画面', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final c = WorldController(
        assets.worlds,
        heroCatalog: assets.heroCatalog,
        aiEnabled: false,
      );
      c.camera.resize(const GameSize(400, 400));
      Future<List<int>> render({bool minimap = false}) async {
        final recorder = ui.PictureRecorder();
        final canvas = Canvas(recorder);
        final size = minimap ? const Size(180, 160) : const Size(400, 400);
        if (minimap) {
          MinimapPainter(c, assets).paint(canvas, size);
        } else {
          WorldPainter(c, assets).paint(canvas, size);
        }
        final picture = recorder.endRecording();
        final image = await picture.toImage(
          size.width.toInt(),
          size.height.toInt(),
        );
        final bytes = (await image.toByteData())!.buffer.asUint8List().toList();
        image.dispose();
        picture.dispose();
        return bytes;
      }

      for (var index = 0; index < c.worlds.length; index++) {
        c.switchWorld(index);
        final home = c.world.cities.first;
        final hero = c.campaign.garrisonAt(home.id).first;
        expect(c.campaign.marches, isEmpty);
        c.openUnit(hero.id);
        expect(c.selectedUnitId, isNull);
        c.tap(c.camera.toScreen(c.heroPosition));
        expect(c.selectedUnitId, isNull);
        expect(c.campaign.marches, isEmpty);
        final initialMap = await render();
        final initialMinimap = await render(minimap: true);
        c.campaign.dispatchTo(hero, c.heroPosition + const GamePoint(80, 32));
        expect(await render(), isNot(initialMap));
        expect(c.campaign.garrisonAt(home.id), isNot(contains(hero)));
        c.campaign.moveTo(hero.id, c.campaign.cityBounds(home).center);
        c.tick(0.05);
        expect(c.campaign.marches, isEmpty);
        expect(c.campaign.garrisonAt(home.id), contains(hero));
        expect(
          await render(),
          initialMap,
          reason: '地图 $index：回城前后都只有城池，没有额外人物',
        );
        expect(await render(minimap: true), initialMinimap);
      }
      c.dispose();
      assets.dispose();
    });
  });

  testWidgets('鼠标悬停、选城和更换行军目标不再画出方框、路线或目的地标记', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final c = WorldController(assets.worlds, heroCatalog: assets.heroCatalog);
      c.camera.resize(const GameSize(400, 400));
      final march = c.campaign.dispatchTo(
        c.campaign.garrisonAt(0).first,
        c.heroPosition + const GamePoint(80, 32),
      )!;
      Future<List<int>> render() async {
        final recorder = ui.PictureRecorder();
        WorldPainter(c, assets).paint(Canvas(recorder), const Size(400, 400));
        final picture = recorder.endRecording();
        final image = await picture.toImage(400, 400);
        final bytes = (await image.toByteData())!.buffer.asUint8List().toList();
        image.dispose();
        picture.dispose();
        return bytes;
      }

      final baseline = await render();
      c.cursor = const TileCoord(15, 45);
      c.selectedCity = c.world.cities.first;
      c.selectedUnitId = march.hero.id;
      c.pendingHero = c.campaign.garrisonAt(0).first;
      march.destination += const GamePoint(60, -32);
      expect(await render(), baseline);
      c.dispose();
      assets.dispose();
    });
  });

  testWidgets('野外驻守显示居中的橙顶小屋，点击仍选中英雄，重新移动恢复人物', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final c = WorldController(assets.worlds, heroCatalog: assets.heroCatalog);
      c.camera.resize(const GameSize(160, 160));
      c.camera.scale = 3;
      final hero = c.campaign.garrisonAt(0).first;
      final unit = c.campaign.dispatchTo(hero, c.heroPosition)!;
      expect(c.campaign.camp(hero.id), isTrue);
      c.camera.center = unit.position;
      expect(unit.phase, MarchPhase.camped);
      for (final ratio in [1.0, 1.75, 2.0]) {
        final pixels = await _heroPixels(c, assets, ratio);
        // 屋顶宽 14 格、高 7 格，另有两根各高 4 格的门柱；全按参考图主色着色。
        final minimum = _topLeft(pixels);
        expect(minimum.dx, closeTo((80 - 7 * 3) * ratio, 1));
        expect(minimum.dy, closeTo((80 - 7 * 3) * ratio, 1));
        expect(pixels.length, closeTo((14 * 7 + 8) * 9 * ratio * ratio, 80));
      }
      c.tap(c.camera.toScreen(unit.position));
      expect(c.selectedUnit, same(unit));
      final roof = await _heroPixels(c, assets, 1);
      c.prepareMove();
      c.confirmPosition(unit.position + const GamePoint(48, 0));
      expect(unit.phase, MarchPhase.marching);
      expect(await _heroPixels(c, assets, 1), isNot(roof));
      c.dispose();
      assets.dispose();
    });
  });

  testWidgets('人物完整帧以所在格子中心定位，不再向上偏移三个原生像素', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final c = WorldController(
        assets.worlds,
        heroCatalog: assets.heroCatalog,
        aiEnabled: false,
      );
      final unit = c.campaign.dispatch(
        c.campaign.garrisonAt(0).first,
        c.world.cities[1],
      )!..phase = MarchPhase.awaitingBattle;
      c.camera.resize(const GameSize(160, 160));
      unit.position = const GamePoint(248, 808);
      c.camera.center = unit.position;
      c.camera.scale = 3;
      unit.direction = HeroDirection.south;
      for (final ratio in [1.0, 1.75, 2.0]) {
        final side = (16 * 3 * ratio).round();
        final frame = assets.heroFrame(c.appearance, 0, side);
        final bytes = (await frame.toByteData())!;
        final topLeft = Offset(
          (80 * ratio - side / 2).roundToDouble(),
          (80 * ratio - side / 2).roundToDouble(),
        );
        final expected = <Offset>[];
        for (var y = 0; y < side; y++) {
          for (var x = 0; x < side; x++) {
            final i = (y * side + x) * 4;
            if (bytes.getUint8(i) == 234 &&
                bytes.getUint8(i + 1) == 158 &&
                bytes.getUint8(i + 2) == 34) {
              expected.add(topLeft + Offset(x.toDouble(), y.toDouble()));
            }
          }
        }
        expect(
          await _heroPixels(c, assets, ratio),
          expected,
          reason: 'DPR=$ratio',
        );
      }
      c.dispose();
      assets.dispose();
    });
  });

  testWidgets('斜向跟随时人物锚点及像素形状稳定，包括 175% 屏幕缩放', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final controller = WorldController(
        assets.worlds,
        heroCatalog: assets.heroCatalog,
        aiEnabled: false,
      );
      final unit = controller.campaign.dispatch(
        controller.campaign.garrisonAt(0).first,
        controller.world.cities[1],
      )!..phase = MarchPhase.awaitingBattle;
      controller.camera.resize(const GameSize(160, 160));
      for (final ratio in [1.0, 1.75, 2.0]) {
        for (final scale in [2.37, 3.0]) {
          controller.camera.scale = scale;
          for (final direction in [
            HeroDirection.northEast,
            HeroDirection.northWest,
          ]) {
            unit.direction = direction;
            List<Offset>? first;
            for (var frame = 0; frame < 8; frame++) {
              unit.position = GamePoint(
                248 + frame * 0.17,
                808 + frame * 0.113,
              );
              controller.camera.center = unit.position;
              final pixels = await _heroPixels(controller, assets, ratio);
              first ??= pixels;
              expect(
                pixels,
                first,
                reason: 'DPR=$ratio 倍率=$scale 朝向=$direction 帧=$frame',
              );
            }
          }
        }
      }
      controller.dispose();
      assets.dispose();
    });
  });

  testWidgets('固定镜头斜走按物理像素平移，图案不变形且没有地图像素级跳动', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final controller = WorldController(
        assets.worlds,
        heroCatalog: assets.heroCatalog,
        aiEnabled: false,
      );
      final unit = controller.campaign.dispatch(
        controller.campaign.garrisonAt(0).first,
        controller.world.cities[1],
      )!..phase = MarchPhase.awaitingBattle;
      controller.camera.resize(const GameSize(160, 160));
      controller.camera.center = const GamePoint(248, 808);
      unit.direction = HeroDirection.southEast;
      for (final ratio in [1.0, 1.75, 2.0]) {
        for (final scale in [2.37, 3.0]) {
          controller.camera.scale = scale;
          List<Offset>? shape;
          Offset? origin;
          for (var frame = 0; frame < 8; frame++) {
            final travel = Offset(frame * 0.17, frame * 0.113);
            unit.position = const GamePoint(248, 808) + (travel).toGame;
            final pixels = await _heroPixels(controller, assets, ratio);
            final topLeft = _topLeft(pixels);
            final normalized = pixels.map((p) => p - topLeft).toList();
            shape ??= normalized;
            origin ??= topLeft;
            expect(normalized, shape, reason: 'DPR=$ratio 倍率=$scale 帧=$frame');
            final error = topLeft - origin - travel * scale * ratio;
            expect(error.dx.abs(), lessThanOrEqualTo(1.00001));
            expect(error.dy.abs(), lessThanOrEqualTo(1.00001));
          }
        }
      }
      controller.dispose();
      assets.dispose();
    });
  });

  testWidgets('地图绘制不会清除画布上方的工具栏', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      expect(assets.heroes.length, 3);
      expect(assets.flags.width, 128);
      expect(assets.flags.height, 8);
      for (final image in assets.heroes.values) {
        expect(image.width, 96);
        expect(image.height, 16);
      }
      final controller = WorldController(
        assets.worlds,
        heroCatalog: assets.heroCatalog,
        aiEnabled: false,
      );
      controller.camera.resize((const ui.Size(30, 30)).toGame);
      final recorder = ui.PictureRecorder();
      final canvas = ui.Canvas(recorder);
      canvas.drawRect(
        const ui.Rect.fromLTWH(0, 0, 40, 50),
        ui.Paint()..color = const ui.Color(0xffff0000),
      );
      canvas.save();
      canvas.translate(0, 10);
      WorldPainter(controller, assets).paint(canvas, const ui.Size(30, 30));
      canvas.restore();
      final picture = recorder.endRecording();
      final image = await picture.toImage(40, 50);
      final bytes = (await image.toByteData())!;
      final offset = (5 * 40 + 5) * 4;
      expect(
        [
          bytes.getUint8(offset),
          bytes.getUint8(offset + 1),
          bytes.getUint8(offset + 2),
        ],
        [255, 0, 0],
      );
      image.dispose();
      picture.dispose();
      controller.dispose();
      assets.dispose();
    });
  });

  testWidgets('窄屏下工具栏和地图无布局溢出', (tester) async {
    tester.view.physicalSize = const Size(375, 812);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(const PixelWorldApp(persistenceEnabled: false));
    await tester.ensureVisible(find.byKey(const ValueKey('start-game')));
    await tester.tap(find.byKey(const ValueKey('start-game')));
    await tester.pump();
    for (
      var n = 0;
      n < 80 && find.byKey(const ValueKey('world-canvas')).evaluate().isEmpty;
      n++
    ) {
      await tester.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 25)),
      );
      await tester.pump();
    }
    expect(find.byKey(const ValueKey('world-canvas')), findsOneWidget);
    expect(tester.takeException(), isNull);
    expect(find.byKey(const ValueKey('map-1')), findsNothing);
    expect(find.byKey(const ValueKey('compact-world-selector')), findsNothing);
    final painter =
        tester
                .widget<CustomPaint>(find.byKey(const ValueKey('world-canvas')))
                .painter!
            as WorldPainter;
    expect(painter.controller.index, 0);
    expect(find.text('长河之境'), findsNothing);
    expect(tester.takeException(), isNull);
    expect(find.byKey(const ValueKey('hero-picker')), findsNothing);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
