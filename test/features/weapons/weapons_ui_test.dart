import 'package:pixel_world/core/geometry/geometry.dart';
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
  if (key == 'weapon-shop-toggle') {
    if (find.byType(AlertDialog).evaluate().isNotEmpty) {
      await tester.tap(find.text('关闭'));
    } else {
      await tester.tap(find.byKey(const ValueKey('weapon-shop-open')));
    }
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 250));
    return;
  }
  final finder = find.byKey(ValueKey(key));
  await tester.ensureVisible(finder);
  await tester.pump();
  await tester.tap(finder);
  await tester.pump();
}

void main() {
  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('国家库一行三格、无限堆叠；选择三件出征，取消无扣除，战斗不暂停 $size', (tester) async {
      final c = await _load(tester, size);
      final hero = c.selectedHero!;
      expect(find.byKey(const ValueKey('hero-weapons')), findsNothing);
      expect(find.byKey(const ValueKey('warehouse-empty-0')), findsOneWidget);
      expect(find.byKey(const ValueKey('warehouse-empty-2')), findsOneWidget);
      expect(find.byKey(const ValueKey('warehouse-empty-3')), findsNothing);
      await _tap(tester, 'weapon-shop-toggle');
      expect(find.text('事件武器'), findsNothing);
      for (final id in [6, 7, 8]) {
        expect(find.byKey(ValueKey('buy-weapon-$id')), findsNothing);
      }
      expect(
        tester
            .widget<OutlinedButton>(find.byKey(const ValueKey('buy-weapon-1')))
            .onPressed,
        isNotNull,
      );
      for (var i = 0; i < 7; i++) {
        await _tap(tester, 'buy-weapon-0');
      }
      await _tap(tester, 'buy-weapon-9');
      expect(c.campaign.gold, 54);
      expect(c.campaign.weaponInventoryFor(0), {0: 7, 9: 1});
      expect(hero.weaponIds, isEmpty);
      await _tap(tester, 'weapon-shop-toggle');
      final slotRects = [
        'warehouse-weapon-0',
        'warehouse-weapon-9',
        'warehouse-empty-2',
      ].map((key) => tester.getRect(find.byKey(ValueKey(key)))).toList();
      expect(slotRects[0].height, 52);
      expect(slotRects[1].height, slotRects[0].height);
      expect(slotRects[1].width, closeTo(slotRects[2].width, .01));
      expect(slotRects.map((r) => r.top).toSet().length, 1);
      for (var i = 0; i < 3; i++) {
        await _tap(tester, 'warehouse-weapon-0');
      }
      expect(c.selectedWeaponCount, 3);
      expect(
        tester
            .widget<OutlinedButton>(
              find.byKey(const ValueKey('warehouse-weapon-9')),
            )
            .onPressed,
        isNull,
      );
      await _tap(tester, 'deselect-weapon-0');
      expect(c.selectedWeaponCount, 2);
      await _tap(tester, 'warehouse-weapon-9');
      expect(c.selectedWeaponCount, 3);
      c.closeCity();
      expect(c.selectedWeaponCount, 0);
      expect(c.campaign.weaponInventoryFor(0), {0: 7, 9: 1});
      c.openCity(c.world.cities[0]);
      c.selectHero(hero.id);
      c.selectWeapon(0);
      c.prepareDispatch();
      expect(c.selectedWeaponCount, 0);
      c.cancelCityAction();
      expect(c.selectedWeaponCount, 0);
      expect(c.campaign.weaponStockFor(0, 0), 7);
      // 取消后再次出征不会继承上次的武器选择。
      c.prepareDispatch();
      c.cancelCityAction();
      for (var i = 0; i < 3; i++) {
        c.selectWeapon(0);
      }
      c.prepareDispatch();
      c.confirmTarget(c.world.cities[1]);
      expect(c.selectedWeaponCount, 0);
      expect(hero.weaponIds, [0, 0, 0]);
      expect(c.campaign.weaponStockFor(0, 0), 4);
      final march = c.campaign.marches[hero.id]!;
      c.openUnit(hero.id);
      await tester.pump();
      expect(find.byKey(const ValueKey('hero-weapons')), findsOneWidget);
      expect(find.byKey(const ValueKey('weapon-slot-2')), findsOneWidget);
      expect(find.byKey(const ValueKey('weapon-library')), findsNothing);
      march.position = march.destination;
      c.tick(.02);
      final battle = c.campaign.battles[1]!;
      c.watchBattle(battle);
      await tester.pump();
      expect(find.byKey(const ValueKey('battle-weapons')), findsNothing);
      expect(find.byKey(const ValueKey('battle-weapon-0')), findsNothing);
      final other = c.campaign.garrisonAt(0).first;
      final walking = c.campaign.dispatchTo(
        other,
        c.campaign.cityBounds(c.world.cities[0]).center +
            const GamePoint(-80, 80),
      )!;
      for (var i = 0; i < 180; i++) {
        c.tick(1 / 60);
      }
      await tester.pump();
      final before = walking.position;
      final pool = battle.defender.squad.fold<double>(0, (n, s) => n + s.hp);
      expect(battle.simulation.weaponStrike, isNotNull);
      expect(hero.weaponIds.length, 2);
      while (battle.simulation.weaponStrike != null) {
        c.tick(1 / 60);
      }
      await tester.pump();
      expect(walking.position, isNot(before));
      expect(
        battle.defender.squad.fold<double>(0, (n, s) => n + s.hp),
        pool - 20,
      );
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }

  testWidgets('新类型扩展第二行，友城共享库存；关闭、切将、切图都清空选择，敌城不提供武器库', (tester) async {
    final c = await _load(tester, const Size(375, 812));
    final enemy = c.campaign.garrisonAt(1).first;
    c.campaign.cities[2]!.ownerCountryId = 0;
    for (final id in [0, 9, 1, 10]) {
      expect(c.campaign.buyWeapon(id), isTrue);
    }
    c.selectWeapon(0);
    expect(c.selectedWeaponCount, 1);
    final other = c.campaign
        .garrisonAt(0)
        .where((h) => h != c.selectedHero)
        .first;
    c.selectHero(other.id);
    expect(c.selectedWeaponCount, 0);
    c.selectWeapon(0);
    c.openCity(c.world.cities[2]);
    expect(c.selectedWeaponCount, 0);
    await tester.pump();
    final first = tester.getRect(
      find.byKey(const ValueKey('warehouse-weapon-0')),
    );
    final fourth = tester.getRect(
      find.byKey(const ValueKey('warehouse-weapon-10')),
    );
    expect(fourth.top, closeTo(first.top + 60, .01));
    expect(find.byKey(const ValueKey('warehouse-empty-5')), findsOneWidget);
    expect(find.byKey(const ValueKey('warehouse-empty-6')), findsNothing);
    c.openCity(c.world.cities[0]);
    c.selectWeapon(0);
    c.openCity(c.world.cities[1]);
    c.selectHero(enemy.id);
    expect(c.selectedWeaponCount, 0);
    await tester.pump();
    expect(find.byKey(const ValueKey('weapon-library')), findsNothing);
    expect(find.byKey(const ValueKey('hero-weapons')), findsNothing);
    c.selectWeapon(0);
    expect(c.selectedWeaponCount, 0);
    c.openCity(c.world.cities[0]);
    c.selectWeapon(0);
    c.switchWorld(1);
    expect(c.selectedWeaponCount, 0);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
