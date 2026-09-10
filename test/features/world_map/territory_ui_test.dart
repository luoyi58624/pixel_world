import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

void main() {
  testWidgets('设置中的边界开关默认关闭，切换不暂停游戏', (tester) async {
    tester.view.physicalSize = const Size(1000, 750);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(const PixelWorldApp(persistenceEnabled: false));
    await tester.ensureVisible(find.byKey(const ValueKey('start-game')));
    await tester.tap(find.byKey(const ValueKey('start-game')));
    await tester.pump();
    final canvas = find.byKey(const ValueKey('world-canvas'));
    for (var n = 0; n < 200 && canvas.evaluate().isEmpty; n++) {
      await tester.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 25)),
      );
      await tester.pump();
    }
    final c = (tester.widget<CustomPaint>(canvas).painter! as WorldPainter)
        .controller;
    expect(c.showTerritoryBorders, isFalse);
    await tester.tap(find.byKey(const ValueKey('game-settings')));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 250));
    await tester.tap(find.byKey(const ValueKey('territory-border-switch')));
    await tester.pump();
    expect(c.showTerritoryBorders, isTrue);
    expect(c.isPaused, isFalse);
    await tester.tap(find.text('关闭'));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 250));
    expect(tester.takeException(), isNull);
    final assets =
        (tester.widget<CustomPaint>(canvas).painter! as WorldPainter).assets;
    await tester.runAsync(() async {
      for (var i = 0; i < c.worlds.length; i++) {
        c.switchWorld(i);
        c.camera.viewport = const GameSize(1000, 700);
        c.camera.overview();
        final recorder = ui.PictureRecorder();
        WorldPainter(c, assets).paint(Canvas(recorder), const Size(1000, 700));
        final picture = recorder.endRecording();
        final image = await picture.toImage(1000, 700);
        final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
        final file = File('build/simulations/territory_map$i.png');
        file.parent.createSync(recursive: true);
        file.writeAsBytesSync(bytes!.buffer.asUint8List());
        image.dispose();
        picture.dispose();
      }
    });
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
