import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/world_assets.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_painter.dart';

void main() {
  testWidgets('地图绘制不会清除画布上方的工具栏', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
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
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
