import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

void main() {
  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('右下角全局商店无需选城，按年份购买且不暂停 $size', (tester) async {
      tester.view.physicalSize = size;
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
      rootBundle.evict('assets/maps/worlds.json');
      rootBundle.evict('assets/data/rom_heroes.json');
      await tester.pumpWidget(const PixelWorldApp());
      final canvas = find.byKey(const ValueKey('world-canvas'));
      for (var n = 0; n < 200 && canvas.evaluate().isEmpty; n++) {
        await tester.runAsync(
          () => Future<void>.delayed(const Duration(milliseconds: 25)),
        );
        await tester.pump();
      }
      final painter =
          tester.widget<CustomPaint>(canvas).painter! as WorldPainter;
      final c = painter.controller;
      c.campaigns[0] = CampaignState.fromRom(
        c.world,
        painter.assets.heroCatalog,
        weaponCatalog: painter.assets.weaponCatalog,
        aiEnabled: false,
      );
      final gold = c.campaign.gold, stock = c.campaign.weaponStockFor(0, 0);
      expect(c.selectedCity, isNull);
      await tester.tap(find.byKey(const ValueKey('weapon-shop-open')));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 250));
      final buy = find.byKey(const ValueKey('buy-weapon-0'));
      await tester.tap(buy);
      await tester.pump();
      expect(
        c.campaign.gold,
        gold - c.campaign.weaponCatalog.weapons[0]!.price,
      );
      expect(c.campaign.weaponStockFor(0, 0), stock + 1);
      expect(
        tester
            .widget<OutlinedButton>(find.byKey(const ValueKey('buy-weapon-14')))
            .onPressed,
        isNull,
      );
      expect(c.isPaused, isFalse);
      final before = c.campaign.aiObservationFor(0).tick;
      c.tick(1);
      expect(c.campaign.aiObservationFor(0).tick, greaterThan(before));
      await tester.tap(find.text('关闭'));
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 250));
      c.openCity(c.world.cities.first);
      await tester.pump();
      expect(find.byKey(const ValueKey('city-economy')), findsNothing);
      expect(find.text('士气'), findsOneWidget);
      expect(find.byKey(const ValueKey('weapon-library')), findsOneWidget);
      expect(find.byKey(const ValueKey('weapon-shop-toggle')), findsNothing);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
