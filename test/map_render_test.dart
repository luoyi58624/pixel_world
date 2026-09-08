import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/hero_sprite.dart';
import 'package:pixel_world/world/world_assets.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_painter.dart';

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
  // 该蓝色仅出现在英雄身上，可排除地图和阴影，直接比较真实栅格结果。
  for (var y = 0; y < width; y++) {
    for (var x = 0; x < width; x++) {
      final index = (y * width + x) * 4;
      if (bytes.getUint8(index) == 66 &&
          bytes.getUint8(index + 1) == 64 &&
          bytes.getUint8(index + 2) == 255) {
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
  testWidgets('斜向跟随时人物锚点及像素形状稳定，包括 175% 屏幕缩放', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final controller = WorldController(assets.worlds);
      controller.camera.resize(const Size(160, 160));
      for (final ratio in [1.0, 1.75, 2.0]) {
        for (final scale in [2.37, 3.0]) {
          controller.camera.scale = scale;
          for (final direction in [
            HeroDirection.northEast,
            HeroDirection.northWest,
          ]) {
            controller.direction = direction;
            List<Offset>? first;
            for (var frame = 0; frame < 8; frame++) {
              controller.heroPosition = Offset(
                248 + frame * 0.17,
                808 + frame * 0.113,
              );
              controller.camera.center = controller.heroPosition;
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
      final controller = WorldController(assets.worlds);
      controller.camera.resize(const Size(160, 160));
      controller.camera.center = const Offset(248, 808);
      controller.direction = HeroDirection.southEast;
      for (final ratio in [1.0, 1.75, 2.0]) {
        for (final scale in [2.37, 3.0]) {
          controller.camera.scale = scale;
          List<Offset>? shape;
          Offset? origin;
          for (var frame = 0; frame < 8; frame++) {
            final travel = Offset(frame * 0.17, frame * 0.113);
            controller.heroPosition = const Offset(248, 808) + travel;
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
      expect(assets.heroes.length, 2);
      for (final image in assets.heroes.values) {
        expect(image.width, 96);
        expect(image.height, 16);
      }
      final controller = WorldController(assets.worlds);
      controller.camera.resize(const ui.Size(30, 30));
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
    await tester.pumpWidget(const PixelWorldApp());
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
    await tester.tap(find.byKey(const ValueKey('map-1')));
    await tester.pump();
    expect(find.text('长河之境'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.tap(find.byKey(const ValueKey('hero-picker')));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));
    await tester.tap(find.text('普通英雄').last);
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));
    expect(find.byTooltip('选择英雄：普通英雄'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
