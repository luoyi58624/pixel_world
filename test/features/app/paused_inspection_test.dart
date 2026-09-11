import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/core/geometry/flutter_geometry.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/battle/domain/field_terrain.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

void main() {
  for (final size in [const Size(812, 375), const Size(1280, 720)]) {
    testWidgets('暂停时拖拽缩放并查看城池、部队与战斗，模拟保持冻结 $size', (tester) async {
      rootBundle.clear();
      tester.view.physicalSize = size;
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      await tester.pumpWidget(const PixelWorldApp(persistenceEnabled: false));
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
      c.setPaused(true);
      final time = c.time,
          gold = c.campaign.gold,
          month = c.campaign.settledMonths;
      c.camera.center = c.world.pixelSize.center(GamePoint.zero);
      c.refreshUi();
      await tester.pump();
      final before = c.camera.center;
      await tester.dragFrom(tester.getCenter(canvas), const Offset(-80, -30));
      for (var i = 0; i < 20; i++) {
        await tester.pump(const Duration(milliseconds: 16));
      }
      expect(c.camera.center, isNot(before));
      expect(c.camera.coasting, isFalse);
      expect(c.time, time);

      final center = tester.getCenter(canvas);
      final oldScale = c.camera.scale;
      await tester.sendEventToBinding(
        PointerScrollEvent(
          position: center,
          scrollDelta: const Offset(0, -100),
        ),
      );
      await tester.pump();
      expect(c.camera.scale, greaterThan(oldScale));

      // 点击实际目标坐标，覆盖暂停前端输入和控制器命中链路。
      Future<void> inspect(GamePoint point) async {
        c.camera.center = point;
        c.camera.constrain();
        c.refreshUi();
        await tester.pump();
        await tester.tapAt(
          tester.getTopLeft(canvas) + c.camera.toScreen(point).toUi,
        );
        await tester.pump();
      }

      final city = c.world.cities[1];
      c.pendingHero = c.campaign.heroes.firstWhere((h) => h.isPlayer);
      final marchesBefore = c.campaign.marches.length;
      await inspect(c.campaign.cityBounds(city).center);
      expect(c.selectedCity, city);
      expect(c.pendingHero, isNull);
      expect(c.campaign.marches.length, marchesBefore);
      expect(find.byKey(const ValueKey('city-panel')), findsOneWidget);
      await tester.tap(find.byTooltip('关闭城池信息'));
      await tester.pump();
      expect(c.selectedCity, isNull);

      final enemy = c.campaign.heroes.firstWhere((h) => !h.isPlayer);
      final hero = c.campaign.heroes.firstWhere((h) => h.isPlayer);
      final point = c.world.pixelSize.center(GamePoint.zero);
      final enemyMarch = HeroMarch(
        hero: enemy,
        position: point,
        destination: point,
      );
      c.campaign.marches[enemy.id] = enemyMarch;
      await inspect(point);
      expect(c.selectedUnitId, enemy.id);
      expect(find.byKey(const ValueKey('unit-panel')), findsOneWidget);
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pump();
      expect(c.selectedUnitId, isNull);
      final heroMarch = HeroMarch(
        hero: hero,
        position: point,
        destination: point,
      );
      c.campaign.marches.remove(enemy.id);
      c.campaign.marches[hero.id] = heroMarch;
      await inspect(point);
      expect(c.selectedUnitId, hero.id);
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pump();

      final battle = FieldBattle(
        id: 999,
        position: point,
        terrain: FieldTerrain.values.first,
        first: heroMarch,
        second: enemyMarch,
        seed: 7,
      );
      c.campaign.fieldBattles[battle.id] = battle;
      c.camera.center = point;
      c.refreshUi();
      await tester.pump();
      await tester.tapAt(
        tester.getTopLeft(canvas) + c.battleMarkerBounds(battle).center.toUi,
      );
      await tester.pump();
      expect(c.watchedBattle, same(battle));
      expect(find.byKey(const ValueKey('battle-canvas')), findsOneWidget);
      final elapsed = battle.simulation.elapsed;
      c.battleCamera.scale = 6;
      c.battleCamera.center = const GamePoint(128, 104);
      c.refreshUi();
      await tester.pump();
      final battleCenter = c.battleCamera.center;
      await tester.dragFrom(
        tester.getCenter(find.byKey(const ValueKey('battle-canvas'))),
        const Offset(-40, 0),
      );
      for (var i = 0; i < 20; i++) {
        await tester.pump(const Duration(milliseconds: 16));
      }
      expect(c.battleCamera.center, isNot(battleCenter));
      await tester.pump(const Duration(seconds: 5));
      expect(battle.simulation.elapsed, elapsed);
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.pump();
      expect(c.watchedBattle, isNull);
      expect(c.time, time);
      expect(c.campaign.gold, gold);
      expect(c.campaign.settledMonths, month);
      expect(c.isPaused, isTrue);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
