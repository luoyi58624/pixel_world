import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

Future<WorldController> _load(WidgetTester tester, Size size) async {
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  rootBundle.evict('assets/maps/worlds.json');
  rootBundle.evict('assets/data/rom_heroes.json');
  rootBundle.evict('assets/data/weapon_animations.json');
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
  expect(
    canvas,
    findsOneWidget,
    reason: tester
        .widgetList<Text>(find.byType(Text))
        .map((t) => t.data)
        .join(' | '),
  );
  final painter = tester.widget<CustomPaint>(canvas).painter! as WorldPainter;
  final c = painter.controller;
  c.campaigns[0] = CampaignState.fromRom(
    c.world,
    painter.assets.heroCatalog,
    weaponCatalog: painter.assets.weaponCatalog,
    aiEnabled: false,
  );
  c.campaign.settledMonths = 36;
  c.openCity(c.world.cities.first);
  c.selectHero('rom-0');
  await tester.pump();
  return c;
}

Future<void> _tap(WidgetTester tester, String key) async {
  final finder = find.byKey(ValueKey(key));
  await tester.ensureVisible(finder);
  await tester.pump();
  await tester.tap(finder);
  await tester.pump();
}

void main() {
  for (final size in [
    const Size(375, 812),
    const Size(812, 375),
    const Size(1280, 720),
  ]) {
    testWidgets('城池武器库内购买和携带分离，无地图商店入口 $size', (tester) async {
      final c = await _load(tester, size);
      final hero = c.selectedHero!;
      expect(find.byKey(const ValueKey('weapon-shop-open')), findsNothing);
      expect(find.byKey(const ValueKey('weapon-library')), findsOneWidget);
      expect(find.byKey(const ValueKey('warehouse-weapon-14')), findsOneWidget);
      final before = c.campaign.gold;
      await _tap(tester, 'buy-weapon-0');
      expect(c.campaign.gold, before - 5);
      expect(c.campaign.weaponStockFor(0, 0), 1);
      expect(c.selectedWeaponCount, 0);
      expect(hero.weaponIds, isEmpty);
      await _tap(tester, 'buy-weapon-9');
      await _tap(tester, 'carry-weapon-0');
      expect(c.selectedWeaponCount, 1);
      expect(c.campaign.weaponStockFor(0, 0), 1);
      expect(
        tester
            .widget<IconButton>(find.byKey(const ValueKey('carry-weapon-9')))
            .onPressed,
        isNotNull,
      );
      await _tap(tester, 'carry-weapon-9');
      expect(c.selectedWeaponCount, 1);
      expect(c.selectedWeaponCountFor(0), 0);
      expect(c.selectedWeaponCountFor(9), 1);
      expect(c.campaign.weaponInventoryFor(0), {0: 1, 9: 1});
      await _tap(tester, 'carry-weapon-0');
      expect(c.selectedWeaponCountFor(0), 1);
      expect(c.selectedWeaponCountFor(9), 0);
      await _tap(tester, 'carry-weapon-0');
      expect(c.selectedWeaponCount, 0);
      await _tap(tester, 'carry-weapon-9');
      expect(c.selectedWeaponCountFor(9), 1);
      c.prepareDispatch();
      c.cancelCityAction();
      expect(c.campaign.weaponInventoryFor(0), {0: 1, 9: 1});
      expect(c.selectedWeaponCount, 0);
      c.selectWeapon(0);
      c.prepareDispatch();
      c.confirmTarget(c.world.cities[1]);
      expect(hero.weaponIds, [0]);
      expect(c.campaign.weaponStockFor(0, 0), 0);
      c.openUnit(hero.id);
      await tester.pump();
      expect(find.byKey(const ValueKey('weapon-slot-0')), findsOneWidget);
      expect(find.byKey(const ValueKey('weapon-slot-1')), findsNothing);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }

  testWidgets('解锁年份与库存控制两个按钮，城池切换清除选择', (tester) async {
    final c = await _load(tester, const Size(375, 812));
    c.campaign.settledMonths = 0;
    c.refreshUi();
    await tester.pump();
    expect(
      tester
          .widget<IconButton>(find.byKey(const ValueKey('buy-weapon-14')))
          .onPressed,
      isNull,
    );
    expect(
      tester
          .widget<IconButton>(find.byKey(const ValueKey('carry-weapon-0')))
          .onPressed,
      isNull,
    );
    await _tap(tester, 'buy-weapon-0');
    await _tap(tester, 'carry-weapon-0');
    c.openCity(c.world.cities[1]);
    await tester.pump();
    expect(c.selectedWeaponCount, 0);
    expect(find.byKey(const ValueKey('weapon-library')), findsNothing);
    expect(c.isPaused, isFalse);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
