import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

void main() {
  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('暂停按钮和 P 键冻结时钟、屏蔽操作，恢复不补算停顿 $size', (tester) async {
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
      expect(find.byKey(const ValueKey('map-1')), findsNothing);
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
      // 模拟旧热重载实例：暂停标记已生效，但尚未通知停止原来的 Ticker。
      c.campaign.setPaused(true);
      expect(tester.binding.transientCallbackCount, greaterThan(0));
      final reloadTime = c.time;
      final reloading = tester.binding.reassembleApplication();
      await tester.pump();
      await reloading;
      await tester.pump(const Duration(seconds: 2));
      expect(c.time, reloadTime);
      expect(tester.binding.transientCallbackCount, 0);
      expect(find.byKey(const ValueKey('game-paused')), findsOneWidget);
      // 多次热重载不得重复绑定，也不能让暂停画面继续调度帧。
      final reloadingAgain = tester.binding.reassembleApplication();
      await tester.pump();
      await reloadingAgain;
      expect(tester.binding.transientCallbackCount, 0);
      await tester.tap(find.byKey(const ValueKey('game-resume')));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 100));
      expect(c.time, closeTo(reloadTime + .1, 1e-8));
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
