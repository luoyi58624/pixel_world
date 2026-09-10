import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

void main() {
  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('国家面板标签只显示本国事件，同国城池共享日志且页面实时刷新 $size', (tester) async {
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
      final painter =
              tester.widget<CustomPaint>(canvas).painter! as WorldPainter,
          c = painter.controller;
      c.campaign.dispose();
      c.campaigns[0] = CampaignState.fromRom(
        c.world,
        painter.assets.heroCatalog,
        weaponCatalog: painter.assets.weaponCatalog,
        startingGold: 1000,
        aiEnabled: false,
      );
      void note(
        int country,
        String summary, {
        GameEventKind kind = GameEventKind.decisionFinalized,
      }) => c.campaign.events.record(
        tick: 10,
        year: 1,
        month: 1,
        kind: kind,
        source: GameEventSource.ai,
        phase: GameEventPhase.planned,
        summary: summary,
        countryId: country,
        countryName: '国家$country',
        decisionId: 'country-$country/request-1',
      );
      note(0, '本国准备出征');
      note(1, '敌国决定守家');
      note(0, '本国排队噪音', kind: GameEventKind.workerQueue);
      note(1, '敌国提案噪音', kind: GameEventKind.planProposed);
      c.openCity(c.world.cities.first);
      await tester.pump();
      expect(find.byKey(const ValueKey('country-info-tab')), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('country-events-tab')));
      await tester.pump();
      expect(find.text('本国准备出征'), findsOneWidget);
      expect(find.text('敌国决定守家'), findsNothing);
      expect(find.text('本国排队噪音'), findsNothing);
      expect(find.text('决策与收支 1 条'), findsOneWidget);
      expect(find.byKey(const ValueKey('dispatch-confirm')), findsNothing);
      final before = c.time;
      await tester.pump(const Duration(milliseconds: 100));
      expect(c.time, greaterThan(before));
      note(0, '本国发现城池有危险');
      await tester.pump();
      expect(find.text('本国发现城池有危险'), findsOneWidget);
      expect(find.text('决策与收支 2 条'), findsOneWidget);
      c.openCity(c.world.cities[1]);
      await tester.pump();
      expect(find.text('敌国决定守家'), findsOneWidget);
      expect(find.text('本国准备出征'), findsNothing);
      expect(find.text('敌国提案噪音'), findsNothing);
      expect(find.text('决策与收支 1 条'), findsOneWidget);
      String? copied;
      tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(
        SystemChannels.platform,
        (call) async {
          if (call.method == 'Clipboard.setData') {
            copied = (call.arguments as Map)['text'] as String;
          }
          return null;
        },
      );
      addTearDown(
        () => tester.binding.defaultBinaryMessenger.setMockMethodCallHandler(
          SystemChannels.platform,
          null,
        ),
      );
      await tester.tap(find.byKey(const ValueKey('copy-country-events')));
      await tester.pump();
      expect(copied, contains('敌国决定守家'));
      expect(copied, isNot(contains('本国准备出征')));
      expect(copied, isNot(contains('敌国提案噪音')));
      expect(copied, isNot(contains('planProposed')));
      c.campaign.cities[c.world.cities[2].id]!.ownerCountryId = 1;
      c.openCity(c.world.cities[2]);
      await tester.pump();
      expect(find.text('敌国决定守家'), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('country-info-tab')));
      await tester.pump();
      expect(find.byKey(const ValueKey('city-economy')), findsNothing);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
