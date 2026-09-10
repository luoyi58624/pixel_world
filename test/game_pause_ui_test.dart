import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/world_painter.dart';

void main() {
  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('暂停按钮和 P 键冻结时钟、屏蔽操作，恢复不补算停顿 $size', (tester) async {
      rootBundle.clear();
      tester.view.physicalSize = size;
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const PixelWorldApp());
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
      await tester.pump(const Duration(milliseconds: 100));
      await tester.tap(find.byKey(const ValueKey('game-pause')));
      await tester.pump();
      expect(find.byKey(const ValueKey('game-paused')), findsOneWidget);
      expect(c.isPaused, isTrue);
      final time = c.time,
          gold = c.campaign.gold,
          month = c.campaign.settledMonths;
      await tester.pump(const Duration(minutes: 3));
      await tester.sendKeyEvent(LogicalKeyboardKey.digit2);
      await tester.tapAt(tester.getCenter(find.byKey(const ValueKey('map-1'))));
      expect(c.index, 0);
      expect(c.time, time);
      expect(c.campaign.gold, gold);
      expect(c.campaign.settledMonths, month);
      expect(tester.takeException(), isNull);
      await tester.tap(find.byKey(const ValueKey('game-resume')));
      await tester.pump();
      expect(c.isPaused, isFalse);
      expect(c.time, time);
      await tester.pump(const Duration(milliseconds: 100));
      expect(c.time, closeTo(time + .1, 1e-8));
      await tester.sendKeyDownEvent(LogicalKeyboardKey.keyP);
      await tester.sendKeyRepeatEvent(LogicalKeyboardKey.keyP);
      await tester.sendKeyUpEvent(LogicalKeyboardKey.keyP);
      await tester.pump();
      expect(c.isPaused, isTrue, reason: '按住 P 不能反复切换');
      await tester.sendKeyEvent(LogicalKeyboardKey.keyP);
      await tester.pump();
      expect(c.isPaused, isFalse);
      expect(find.byKey(const ValueKey('game-paused')), findsNothing);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
