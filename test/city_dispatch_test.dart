import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';
import 'package:pixel_world/world/world_painter.dart';

List<WorldDefinition> _worlds() =>
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync());

void _prepare(WorldController c, String heroId) {
  c.openCity(c.world.cities.first);
  c.showCityPage(CityPanelPage.dispatch);
  c.selectHero(heroId);
  c.prepareDispatch();
}

Future<WorldController> _load(WidgetTester tester, Size size) async {
  // 每个 widget 测试使用独立时钟，不能复用上个测试时钟下缓存的资源 Future。
  rootBundle.evict('assets/maps/worlds.json');
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(const PixelWorldApp());
  for (
    var n = 0;
    n < 200 && find.byKey(const ValueKey('world-canvas')).evaluate().isEmpty;
    n++
  ) {
    await tester.runAsync(
      () => Future<void>.delayed(const Duration(milliseconds: 25)),
    );
    await tester.pump();
  }
  if (find.byKey(const ValueKey('world-canvas')).evaluate().isEmpty) {
    throw StateError(
      tester
          .widgetList<Text>(find.byType(Text))
          .map((text) => text.data)
          .join(' | '),
    );
  }
  final painter =
      tester
              .widget<CustomPaint>(find.byKey(const ValueKey('world-canvas')))
              .painter!
          as WorldPainter;
  return painter.controller;
}

Future<void> _tapCity(
  WidgetTester tester,
  WorldController c,
  CityDefinition city,
) async {
  c.camera.center = city.bounds.center;
  c.camera.constrain();
  c.refreshUi();
  await tester.pump();
  final canvas = tester.getTopLeft(find.byKey(const ValueKey('world-canvas')));
  await tester.tapAt(canvas + c.camera.toScreen(city.bounds.center));
  await tester.pump();
}

void main() {
  test('点击城池先显示选项，选择和取消均不扣兵或生成行军', () {
    final c = WorldController(_worlds());
    c.openCity(c.world.cities.first);
    expect(c.cityPage, CityPanelPage.actions);
    _prepare(c, 'guardian');
    expect(c.pendingHero!.id, 'guardian');
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 8);
    expect(c.campaign.marches, isEmpty);
    c.cancelCityAction();
    expect(c.pendingHero, isNull);
    expect(c.cityPage, CityPanelPage.dispatch);
    expect(c.selectedHeroId, 'guardian');
    c.cancelCityAction();
    expect(c.cityPage, CityPanelPage.actions);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 8);
    c.dispose();
  });

  test('有效敌城确认后英雄才离城，重复确认不会重复扣兵', () {
    final c = WorldController(_worlds());
    final home = c.world.cities.first;
    final target = c.world.cities[1];
    _prepare(c, 'vanguard');
    c.confirmTarget(home);
    expect(c.pendingHero, isNotNull);
    expect(c.campaign.marches, isEmpty);
    c.confirmTarget(target);
    c.confirmTarget(target);
    expect(c.campaign.marches.length, 1);
    expect(c.campaign.soldiersAt(home.id), 4);
    final march = c.campaign.marches['vanguard']!;
    expect(march.position, home.entrance.center);
    expect(march.target, target);
    expect(c.campaign.dispatch(march.hero, target), isNull);
    expect(
      c.campaign.dispatch(c.campaign.heroes.last, c.worlds[1].cities[1]),
      isNull,
    );
    c.dispose();
  });

  test('两位英雄独立行军，抵达城下待战，城池归属和属性不被伪造修改', () {
    final c = WorldController(_worlds());
    _prepare(c, 'vanguard');
    c.confirmTarget(c.world.cities[1]);
    c.tick(1);
    final first = c.campaign.marches['vanguard']!;
    final position = first.position;
    _prepare(c, 'guardian');
    c.confirmTarget(c.world.cities[2]);
    expect(first.position, position);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 0);
    c.tick(1);
    expect(first.position, isNot(position));
    final second = c.campaign.marches['guardian']!;
    expect(second.walkDistance, greaterThan(0));
    // 普通地图点击不能覆盖已确认的出征命令。
    c.walkTo(const TileCoord(0, 0));
    expect(first.target, c.world.cities[1]);
    c.tick(1000);
    for (final march in c.campaign.marches.values) {
      expect(march.phase, MarchPhase.awaitingBattle);
      expect(march.position, march.destination);
      expect(march.animationStep, 0);
      expect(c.campaign.cities[march.target.id]!.isPlayer, isFalse);
      expect(march.hero.soldiers, 4);
    }
    c.dispose();
  });

  test('切换地图保留各自出征记录，取消选目标不带到另一张地图', () {
    final c = WorldController(_worlds());
    _prepare(c, 'vanguard');
    c.confirmTarget(c.world.cities[1]);
    c.tick(0.5);
    final position = c.campaign.marches['vanguard']!.position;
    _prepare(c, 'guardian');
    c.switchWorld(1);
    expect(c.pendingHero, isNull);
    expect(c.campaign.marches, isEmpty);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 8);
    c.switchWorld(0);
    expect(c.campaign.marches['vanguard']!.position, position);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 4);
    c.dispose();
  });

  testWidgets('城池选项到英雄选择在同一面板完成，包含士兵、王牌和取消回退', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    await _tapCity(tester, c, c.world.cities.first);
    expect(find.byKey(const ValueKey('city-sortie')), findsOneWidget);
    expect(find.byKey(const ValueKey('dispatch-hero-guardian')), findsNothing);
    await tester.tap(find.byKey(const ValueKey('city-information')));
    await tester.pump();
    expect(find.text('收入 / 回合'), findsOneWidget);
    expect(find.text('驻守士兵'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('city-cancel')));
    await tester.pump();
    await tester.tap(find.byKey(const ValueKey('city-sortie')));
    await tester.pump();
    expect(find.byKey(const ValueKey('city-panel')), findsOneWidget);
    expect(find.text('士兵'), findsOneWidget);
    expect(find.text('王牌'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('dispatch-hero-guardian')));
    await tester.pump();
    expect(find.text('84 / 84'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('dispatch-confirm')));
    await tester.pump();
    expect(c.pendingHero!.id, 'guardian');
    expect(find.byKey(const ValueKey('city-panel')), findsNothing);
    await tester.tap(find.byKey(const ValueKey('cancel-target')));
    await tester.pump();
    expect(c.pendingHero, isNull);
    expect(c.campaign.marches, isEmpty);
    await tester.tap(find.byKey(const ValueKey('dispatch-confirm')));
    await tester.pump();
    await _tapCity(tester, c, c.world.cities[1]);
    expect(c.campaign.marches['guardian']!.hero.name, '艾琳');
    expect(c.pendingHero, isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('小窗口中详情可滚动，出击取消按钮始终可见且已出征英雄不能重复出击', (tester) async {
    final c = await _load(tester, const Size(600, 360));
    await _tapCity(tester, c, c.world.cities.first);
    await tester.tap(find.byKey(const ValueKey('city-sortie')));
    await tester.pump();
    expect(tester.takeException(), isNull);
    final confirm = find.byKey(const ValueKey('dispatch-confirm'));
    final cancel = find.byKey(const ValueKey('city-cancel'));
    expect(confirm.hitTestable(), findsOneWidget);
    expect(cancel.hitTestable(), findsOneWidget);
    await tester.tap(confirm);
    await tester.pump();
    await _tapCity(tester, c, c.world.cities[1]);
    await _tapCity(tester, c, c.world.cities.first);
    await tester.tap(find.byKey(const ValueKey('city-sortie')));
    await tester.pump();
    final unavailable = find.byKey(const ValueKey('dispatch-hero-vanguard'));
    await tester.ensureVisible(unavailable);
    await tester.tap(unavailable);
    await tester.pump();
    expect(tester.widget<FilledButton>(confirm).onPressed, isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
