import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_painter.dart';

Future<WorldController> _load(WidgetTester tester, Size size) async {
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  rootBundle.evict('assets/maps/worlds.json');
  rootBundle.evict('assets/data/rom_heroes.json');
  await tester.pumpWidget(const PixelWorldApp());
  final canvas = find.byKey(const ValueKey('world-canvas'));
  for (var i = 0; i < 200 && canvas.evaluate().isEmpty; i++) {
    await tester.runAsync(
      () => Future<void>.delayed(const Duration(milliseconds: 25)),
    );
    await tester.pump();
  }
  final painter = tester.widget<CustomPaint>(canvas).painter! as WorldPainter;
  final c = painter.controller;
  c.campaigns[0] = CampaignState.fromRom(
    c.world,
    painter.assets.heroCatalog,
    weaponCatalog: painter.assets.weaponCatalog,
    aiEnabled: false,
  );
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
  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('城内军械库原地展开、同规格三槽配装、战斗中使用且不暂停其他部队 $size', (tester) async {
      final c = await _load(tester, size);
      final hero = c.selectedHero!;
      await _tap(tester, 'weapon-shop-toggle');
      expect(find.text('事件武器'), findsNWidgets(3));
      expect(
        tester
            .widget<OutlinedButton>(
              find.byKey(const ValueKey('equip-weapon-1')),
            )
            .onPressed,
        isNull,
      );
      for (var i = 0; i < 3; i++) {
        await _tap(tester, 'equip-weapon-0');
      }
      expect(c.campaign.gold, 41);
      expect(hero.weaponIds, [0, 0, 0]);
      expect(
        tester
            .widget<OutlinedButton>(
              find.byKey(const ValueKey('equip-weapon-0')),
            )
            .onPressed,
        isNull,
      );
      final slots = [
        for (var i = 0; i < 3; i++)
          tester.getRect(find.byKey(ValueKey('weapon-slot-$i'))),
      ];
      expect(slots[0].height, slots[1].height);
      expect(slots[1].width, closeTo(slots[2].width, .01));
      await _tap(tester, 'weapon-slot-1');
      expect(c.campaign.weaponStockFor(0, 0), 1);
      await _tap(tester, 'equip-weapon-0');
      expect(c.campaign.gold, 41);
      c.cancelCityAction();
      final march = c.campaign.dispatch(hero, c.world.cities[1])!;
      march.position = march.destination;
      c.tick(.02);
      final battle = c.campaign.battles[1]!;
      c.watchBattle(battle);
      await tester.pump();
      expect(
        tester
            .widget<OutlinedButton>(
              find.byKey(const ValueKey('battle-weapon-0')),
            )
            .onPressed,
        isNull,
      );
      final other = c.campaign.garrisonAt(0).first;
      final walking = c.campaign.dispatchTo(
        other,
        c.campaign.cityBounds(c.world.cities[0]).center + const Offset(-80, 80),
      )!;
      c.tick(3);
      await tester.pump();
      final before = walking.position;
      final pool = battle.defender.squad.fold<double>(0, (n, s) => n + s.hp);
      await _tap(tester, 'battle-weapon-0');
      expect(hero.weaponIds.length, 2);
      expect(battle.simulation.weaponStrike, isNotNull);
      c.tick(.6);
      await tester.pump();
      expect(walking.position, isNot(before));
      expect(
        battle.defender.squad.fold<double>(0, (n, s) => n + s.hp),
        pool - 20,
      );
      expect(c.campaign.gold, 41);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }

  testWidgets('敌将配装只读，不能通过军械库操作其他国家', (tester) async {
    final c = await _load(tester, const Size(375, 812));
    final enemy = c.campaign.garrisonAt(1).first;
    c.campaign.equipWeapon(enemy, 0, countryId: 1);
    c.openCity(c.world.cities[1]);
    c.selectHero(enemy.id);
    await tester.pump();
    expect(find.byKey(const ValueKey('weapon-shop-toggle')), findsNothing);
    expect(
      tester
          .widget<OutlinedButton>(find.byKey(const ValueKey('weapon-slot-0')))
          .onPressed,
      isNull,
    );
    expect(c.campaign.equipWeapon(enemy, 0), isFalse);
    expect(enemy.weaponIds, [0]);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
