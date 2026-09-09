import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/ui/hero_retreat_button.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_painter.dart';

import 'support/retreat_fixture.dart';

Future<WorldController> _load(
  WidgetTester tester,
  Size size,
  RetreatRoll random,
) async {
  rootBundle.evict('assets/maps/worlds.json');
  rootBundle.evict('assets/data/rom_heroes.json');
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
  final painter = tester.widget<CustomPaint>(canvas).painter! as WorldPainter;
  final c = painter.controller;
  c.campaigns[0] = CampaignState.fromRom(
    c.world,
    painter.assets.heroCatalog,
    aiEnabled: false,
    startingGold: 1000,
    retreatRandom: random,
  );
  return c;
}

CityBattle _siege(
  WorldController c, {
  bool defending = false,
  bool npcOnly = false,
}) {
  final cityId = defending ? 0 : 1;
  final sourceId = defending
      ? 1
      : npcOnly
      ? 2
      : 0;
  final hero = sourceId == 0
      ? c.campaign.heroes.firstWhere((h) => h.sourceId == 0)
      : c.campaign.garrisonAt(sourceId).first;
  final march = c.campaign.dispatch(
    hero,
    c.world.cities[cityId],
    countryId: hero.countryId,
  )!;
  march.position = march.destination;
  c.tick(1 / 60);
  final battle = c.campaign.battles[cityId]!;
  c.watchBattle(battle);
  return battle;
}

void main() {
  testWidgets('攻城部队在大地图与小地图隐藏且无残留点击区，撤退后重新出现', (tester) async {
    final c = await _load(tester, const Size(1280, 720), RetreatRoll(.9));
    final assets =
        (tester
                    .widget<CustomPaint>(
                      find.byKey(const ValueKey('world-canvas')),
                    )
                    .painter!
                as WorldPainter)
            .assets;
    final battle = _siege(c);
    c.cancelCityAction();
    final march = c.campaign.marches[battle.attacker.id]!;
    expect(march.visibleOnMap, isFalse);
    c.camera.viewport = const Size(400, 300);
    c.camera.center = march.position;
    Future<List<int>> render(CustomPainter painter, Size size) async {
      final recorder = ui.PictureRecorder();
      painter.paint(Canvas(recorder), size);
      final picture = recorder.endRecording();
      final image = picture.toImageSync(
        size.width.toInt(),
        size.height.toInt(),
      );
      final data = await tester.runAsync(() => image.toByteData());
      final result = data!.buffer.asUint8List().toList();
      image.dispose();
      picture.dispose();
      return result;
    }

    for (final (painter, size) in [
      (WorldPainter(c, assets), const Size(400, 300)),
      (MinimapPainter(c, assets), const Size(200, 160)),
    ]) {
      final visible = await render(painter, size);
      c.campaign.marches.remove(march.hero.id);
      final removed = await render(painter, size);
      c.campaign.marches[march.hero.id] = march;
      expect(
        listEquals(visible, removed),
        isTrue,
        reason: '隐藏将领不能残留人物、影子或小地图光点',
      );
    }
    c.tap(c.camera.toScreen(march.position));
    expect(c.selectedUnitId, isNull);
    expect(c.campaign.retreatHero(march.hero.id), isTrue);
    c.tick(1.81);
    expect(march.visibleOnMap, isTrue);
    expect(march.returningFromRetreat, isTrue);
    c.cancelCityAction();
    c.tap(c.camera.toScreen(march.position));
    expect(c.selectedUnitId, march.hero.id);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  for (final size in [
    const Size(375, 812),
    const Size(812, 375),
    const Size(1280, 720),
  ]) {
    testWidgets('观战撤退显示风险，返回地图不等于撤退，结束动画后自动退出 $size', (tester) async {
      final random = RetreatRoll(.9);
      final c = await _load(tester, size, random);
      final battle = _siege(c);
      await tester.pump();
      expect(find.text('撤退 · 60% 失败即阵亡'), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('battle-return')));
      await tester.pump();
      expect(random.calls, 0);
      expect(battle.isActive, isTrue);
      c.watchBattle(battle);
      await tester.pump();
      final height = tester
          .getSize(find.byKey(const ValueKey('battle-canvas')))
          .height;
      await tester.tap(find.byKey(const ValueKey('battle-retreat')));
      await tester.pump();
      expect(random.calls, 1);
      expect(
        find.byKey(const ValueKey('battle-retreat-result')),
        findsOneWidget,
      );
      expect(c.watchedBattle, same(battle));
      expect(find.byKey(const ValueKey('battle-retreat')), findsNothing);
      expect(
        tester.getSize(find.byKey(const ValueKey('battle-canvas'))).height,
        height,
      );
      c.tick(.5);
      await tester.pump();
      expect(c.watchedBattle, same(battle));
      c.tick(1.3);
      await tester.pump();
      expect(c.watchedBattle, isNull);
      expect(find.byKey(const ValueKey('battle-scene')), findsNothing);
      expect(
        c.campaign.marches[battle.attacker.id]!.returningFromRetreat,
        isTrue,
      );
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }

  testWidgets('人物面板交战时禁止免费移动扎营，撤退入口共用一次概率判定', (tester) async {
    final random = RetreatRoll(.1);
    final c = await _load(tester, const Size(375, 812), random);
    final battle = _siege(c);
    c.cancelCityAction();
    c.openUnit(battle.attacker.id);
    await tester.pump();
    for (final key in ['unit-move', 'unit-camp']) {
      expect(
        tester.widget<OutlinedButton>(find.byKey(ValueKey(key))).onPressed,
        isNull,
      );
    }
    expect(find.byType(HeroRetreatButton), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('unit-retreat')));
    await tester.pump();
    expect(battle.attacker.hp, greaterThan(0));
    expect(random.calls, 1);
    expect(c.campaign.retreatHero(battle.attacker.id), isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  for (final defending in [true, false]) {
    testWidgets('${defending ? '我方守城' : 'NPC间交战'}不显示可操控的撤退按钮', (tester) async {
      final random = RetreatRoll(.9);
      final c = await _load(tester, const Size(375, 812), random);
      _siege(c, defending: defending, npcOnly: !defending);
      await tester.pump();
      expect(find.byKey(const ValueKey('battle-retreat')), findsNothing);
      expect(random.calls, 0);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
