import 'dart:ui' as ui;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/field_terrain.dart';
import 'package:pixel_world/world/world_data.dart';
import 'package:pixel_world/world/world_painter.dart';

void main() {
  for (final terrain in FieldTerrain.values) {
    testWidgets('${terrain.label}野战显示独立背景、双方减益，刀剑与角色入口共享战斗', (tester) async {
      rootBundle.evict('assets/maps/worlds.json');
      rootBundle.evict('assets/data/rom_heroes.json');
      tester.view.physicalSize = terrain == FieldTerrain.river
          ? const Size(1280, 800)
          : const Size(375, 812);
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
      final painter =
          tester.widget<CustomPaint>(canvas).painter! as WorldPainter;
      final c = painter.controller;
      c.campaigns[0] = CampaignState.fromRom(
        c.world,
        painter.assets.heroCatalog,
        aiEnabled: false,
      );
      final image = painter.assets.fieldScenes[terrain]!;
      expect(image.width, 256);
      expect(image.height, 144);
      expect(painter.assets.fieldScenes.values.toSet().length, 3);
      Offset? site;
      for (var y = 4; y < c.world.height - 4 && site == null; y++) {
        for (var x = 4; x < c.world.width - 4; x++) {
          final cell = TileCoord(x, y);
          if (FieldTerrain.fromMovement(c.world.movementTerrainAt(cell)) ==
                  terrain &&
              c.world.cities.every(
                (city) => !c.campaign
                    .cityBounds(city)
                    .inflate(60)
                    .contains(cell.center),
              )) {
            site = cell.center;
            break;
          }
        }
      }
      expect(site, isNotNull);
      final point = site!;
      final hero = c.campaign.heroes.firstWhere((hero) => hero.sourceId == 0);
      final enemy = c.campaign.garrisonAt(1).first;
      final a = c.campaign.dispatchTo(hero, point + const Offset(40, 0))!;
      final b = c.campaign.dispatchTo(
        enemy,
        point - const Offset(40, 0),
        countryId: 1,
      )!;
      a.position = point - const Offset(8, 0);
      b.position = point + const Offset(8, 0);
      c.tick(0.02);
      final battle = c.campaign.fieldBattles.values.single;
      c.camera.center = point;
      c.camera.constrain();
      c.refreshUi();
      await tester.pump();
      final marker = c.battleMarkerBounds(battle).center;
      await tester.tapAt(tester.getTopLeft(canvas) + marker);
      await tester.pump();
      expect(c.watchedBattle, same(battle));
      expect(find.text('${terrain.label}野战 · 观战'), findsOneWidget);
      expect(find.byKey(const ValueKey('battle-defense-bonus')), findsNothing);
      expect(
        find.byKey(const ValueKey('battle-attacker-terrain')),
        findsOneWidget,
      );
      expect(
        find.byKey(const ValueKey('battle-defender-terrain')),
        findsOneWidget,
      );
      final snapshot = battle.simulation;
      final before = snapshot.elapsed;
      await tester.pump(const Duration(milliseconds: 300));
      expect(snapshot.elapsed, greaterThan(before));
      await tester.tap(find.byKey(const ValueKey('battle-return')));
      await tester.pump();
      c.openUnit(hero.id);
      await tester.pump();
      expect(
        tester
            .widget<OutlinedButton>(find.byKey(const ValueKey('unit-move')))
            .onPressed,
        isNull,
      );
      expect(
        tester
            .widget<OutlinedButton>(find.byKey(const ValueKey('unit-camp')))
            .onPressed,
        isNull,
      );
      final watch = find.byKey(const ValueKey('unit-watch-battle'));
      await tester.ensureVisible(watch);
      await tester.tap(watch);
      await tester.pump();
      expect(c.watchedBattle, same(battle));
      expect(battle.simulation, same(snapshot));
      // 背景来自已加载的独立纹理，解码后存在可用像素。
      await tester.runAsync(() async {
        final bytes = await image.toByteData(
          format: ui.ImageByteFormat.rawRgba,
        );
        expect(bytes!.lengthInBytes, 256 * 144 * 4);
      });
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
