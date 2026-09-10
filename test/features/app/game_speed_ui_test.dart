import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

void main() {
  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('倍速选择、暂停和镜头采用独立时钟 $size', (tester) async {
      rootBundle.clear();
      tester.view.physicalSize = size;
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const PixelWorldApp());
      await tester.ensureVisible(find.byKey(const ValueKey('start-game')));
      await tester.tap(find.byKey(const ValueKey('start-game')));
      await tester.pump();
      final canvas = find.byKey(const ValueKey('world-canvas'));
      for (var i = 0; i < 200 && canvas.evaluate().isEmpty; i++) {
        await tester.runAsync(
          () => Future<void>.delayed(const Duration(milliseconds: 25)),
        );
        await tester.pump();
      }
      expect(canvas, findsOneWidget);
      final c = (tester.widget<CustomPaint>(canvas).painter! as WorldPainter)
          .controller;
      await tester.tap(find.byKey(const ValueKey('game-speed')));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 250));
      expect(find.text('16×'), findsOneWidget);
      await tester.tap(find.text('16×'));
      await tester.pump();
      expect(c.gameSpeed, 16);
      final before = c.time;
      c.tick(1 / 60);
      expect(c.time - before, closeTo(16 / 60, 1e-8));
      c.setPaused(true);
      final paused = c.time;
      c.tick(60);
      expect(c.time, paused);
      c.setPaused(false);
      c.tick(1 / 60);
      expect(c.time - paused, closeTo(16 / 60, 1e-8));
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
