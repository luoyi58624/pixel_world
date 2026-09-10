import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';
import 'package:pixel_world/features/world_map/presentation/world_screen.dart';

void main() {
  for (var index = 0; index < 3; index++) {
    testWidgets('选中地图 $index 后点击开始才进入对应战役', (tester) async {
      rootBundle.clear();
      await tester.pumpWidget(const PixelWorldApp());
      expect(find.text('燃烧的热情'), findsOneWidget);
      expect(find.text('辽阔的土地'), findsOneWidget);
      expect(find.text('抵上命也***'), findsOneWidget);
      expect(find.byType(WorldScreen), findsNothing);
      await tester.tap(find.byKey(ValueKey('start-map-$index')));
      await tester.pump();
      expect(find.byType(WorldScreen), findsNothing);
      await tester.ensureVisible(find.byKey(const ValueKey('start-game')));
      await tester.tap(find.byKey(const ValueKey('start-game')));
      await tester.pump();
      final canvas = find.byKey(const ValueKey('world-canvas'));
      for (var i = 0; i < 200 && canvas.evaluate().isEmpty; i++) {
        await tester.runAsync(
          () => Future<void>.delayed(const Duration(milliseconds: 25)),
        );
        await tester.pump(const Duration(milliseconds: 16));
      }
      expect(canvas, findsOneWidget);
      final controller =
          (tester.widget<CustomPaint>(canvas).painter! as WorldPainter)
              .controller;
      expect(controller.index, index);
      expect(controller.campaign.world.id, index);
      expect(find.byKey(const ValueKey('map-0')), findsNothing);
      expect(
        find.byKey(const ValueKey('compact-world-selector')),
        findsNothing,
      );
      for (final key in [
        LogicalKeyboardKey.digit1,
        LogicalKeyboardKey.digit2,
        LogicalKeyboardKey.digit3,
      ]) {
        await tester.sendKeyEvent(key);
        expect(controller.index, index);
      }
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }

  testWidgets('窄屏和大字号下可以滚动选择地图并开始', (tester) async {
    tester.view.physicalSize = const Size(320, 568);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    tester.platformDispatcher.textScaleFactorTestValue = 1.5;
    addTearDown(tester.platformDispatcher.clearTextScaleFactorTestValue);
    await tester.pumpWidget(const PixelWorldApp());
    final third = find.byKey(const ValueKey('start-map-2'));
    await tester.ensureVisible(third);
    await tester.tap(third);
    await tester.pump();
    final start = find.byKey(const ValueKey('start-game'));
    await tester.ensureVisible(start);
    expect(tester.widget<FilledButton>(start).onPressed, isNotNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
