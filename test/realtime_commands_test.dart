import 'dart:io';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/hero_sprite.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';
import 'package:pixel_world/world/world_painter.dart';

WorldController _controller() => WorldController(
  decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()),
  heroCatalog: decodeRomHeroes(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  ),
);

Future<WorldController> _load(WidgetTester tester, Size size) async {
  rootBundle.evict('assets/maps/worlds.json');
  rootBundle.evict('assets/data/rom_heroes.json');
  tester.view.physicalSize = size;
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(const PixelWorldApp());
  for (
    var i = 0;
    i < 200 && find.byKey(const ValueKey('world-canvas')).evaluate().isEmpty;
    i++
  ) {
    await tester.runAsync(
      () => Future<void>.delayed(const Duration(milliseconds: 25)),
    );
    await tester.pump();
  }
  return (tester
              .widget<CustomPaint>(find.byKey(const ValueKey('world-canvas')))
              .painter!
          as WorldPainter)
      .controller;
}

void main() {
  test('任意空地出击、到达驻留、重新指定目标与扎营保留同一英雄身份', () {
    final c = _controller();
    addTearDown(c.dispose);
    final hero = c.previewHero!;
    final point = c.heroPosition + const Offset(80, 32);
    c.openUnit(hero.id);
    expect(c.selectedMapHero, same(hero));
    c.prepareMove();
    expect(c.choosingTarget, isTrue);
    expect(c.campaign.soldiersAt(0), 12);
    c.confirmPosition(point);
    final unit = c.campaign.marches[hero.id]!;
    expect(unit.target, isNull);
    expect(c.campaign.soldiersAt(0), 8);
    c.tick(12);
    expect(unit.position, point);
    expect(unit.phase, MarchPhase.camped);
    expect(c.campaign.marches[hero.id]!.hero, same(hero));
    c.openUnit(hero.id);
    c.prepareMove();
    c.confirmPosition(point - const Offset(0, 64));
    expect(unit.direction, HeroDirection.north);
    c.tick(0.1);
    c.openUnit(hero.id);
    c.campSelected();
    final stopped = unit.position;
    final hp = hero.hp;
    c.tick(30);
    expect(unit.position, stopped);
    expect(unit.destination, stopped);
    expect(hero.hp, hp);
    expect(unit.phase, MarchPhase.camped);
    expect(c.campaign.settledTurns, 1);
  });

  test('选点和取消不打断原行军，两个英雄的命令互不影响', () {
    final c = _controller();
    addTearDown(c.dispose);
    c.campaign.upgradeCity(0);
    final heroes = c.campaign.garrisonAt(0);
    final first = c.campaign.dispatchTo(
      heroes[0],
      c.heroPosition + const Offset(180, 16),
    )!;
    final second = c.campaign.dispatchTo(
      heroes[1],
      c.heroPosition + const Offset(120, 48),
    )!;
    c.openUnit(first.hero.id);
    c.prepareMove();
    final oldTarget = first.destination;
    final before = first.position;
    c.tick(0.5);
    expect(first.position, isNot(before));
    c.cancelCityAction();
    expect(first.destination, oldTarget);
    expect(c.selectedUnit, first);
    c.campSelected();
    final otherBefore = second.position;
    c.tick(0.5);
    expect(first.phase, MarchPhase.camped);
    expect(second.position, isNot(otherBefore));
    expect(c.campaign.marches.length, 2);
  });

  test('移动可以选择我方城池，进驻后恢复驻军且不生成第二个英雄', () {
    final c = _controller();
    addTearDown(c.dispose);
    final hero = c.previewHero!;
    final unit = c.campaign.dispatchTo(
      hero,
      c.heroPosition + const Offset(48, 16),
    )!;
    c.tick(3);
    c.campaign.moveTo(hero.id, c.world.cities.first.bounds.center);
    c.tick(3);
    expect(c.campaign.marches, isEmpty);
    expect(c.campaign.soldiersAt(0), 12);
    expect(
      c.campaign.heroes.where((h) => h.id == hero.id).single,
      same(unit.hero),
    );
  });

  test('自由行军线段进入敌城会拦下交战，撤离不会立刻被同一城重新吸回', () {
    final c = _controller();
    addTearDown(c.dispose);
    final city = c.world.cities[1];
    final start = city.bounds.centerLeft - const Offset(10, 0);
    final end = city.bounds.centerRight + const Offset(48, 0);
    final unit = c.campaign.dispatchTo(c.previewHero!, end)!;
    unit.position = start;
    c.campaign.moveTo(unit.hero.id, end);
    c.tick(0.2);
    expect(unit.target, city);
    expect(unit.position.dx, closeTo(city.bounds.left - 8, 0.001));
    expect(unit.phase, MarchPhase.fighting);
    final battle = c.campaign.battles[city.id]!;
    expect(battle.isActive, isTrue);
    c.campaign.moveTo(unit.hero.id, start - const Offset(32, 0));
    c.tick(0.3);
    expect(unit.position.dx, lessThan(city.bounds.left));
    expect(unit.phase, MarchPhase.marching);
    expect(battle.isActive, isFalse);
  });

  test('同城先到者先交战，插入顺序靠前的后到者不会抢占或产生双倍伤害', () {
    final c = _controller();
    addTearDown(c.dispose);
    c.campaign.upgradeCity(0);
    final heroes = c.campaign.garrisonAt(0);
    final city = c.world.cities[1];
    final first = c.campaign.dispatch(heroes[0], city)!;
    final second = c.campaign.dispatch(heroes[1], city)!;
    second.position = second.destination;
    c.tick(0.1);
    expect(c.campaign.battles[city.id]!.attacker, second.hero);
    first.position = first.destination;
    c.tick(0.9);
    expect(first.phase, MarchPhase.awaitingBattle);
    expect(c.campaign.battles[city.id]!.rounds, 0);
    expect(c.campaign.battles[city.id]!.attacker, second.hero);
    c.tick(4);
    expect(c.campaign.battles[city.id]!.rounds, greaterThan(0));
    c.campaign.camp(second.hero.id);
    c.tick(1);
    expect(c.campaign.battles[city.id]!.attacker, first.hero);
    expect(c.campaign.battles[city.id]!.rounds, 0);
  });

  test('观战与关闭面板不改变后台交战结果，已结束战斗保留结果', () {
    WorldController battleController() {
      final c = _controller();
      final unit = c.campaign.dispatch(
        c.campaign.heroes.firstWhere((hero) => hero.sourceId == 0),
        c.world.cities[1],
      )!;
      unit.position = unit.destination;
      c.tick(0.02);
      return c;
    }

    final watched = battleController();
    final hidden = battleController();
    addTearDown(watched.dispose);
    addTearDown(hidden.dispose);
    final battle = watched.campaign.battles[1]!;
    watched.watchBattle(battle);
    watched.tick(5);
    hidden.tick(5);
    expect(battle.rounds, greaterThan(0));
    expect(battle.attacker.hp, hidden.campaign.battles[1]!.attacker.hp);
    watched.cancelCityAction();
    watched.tick(90);
    hidden.tick(90);
    expect(battle.outcome, hidden.campaign.battles[1]!.outcome);
    expect(watched.campaign.cities[0]!.level, hidden.campaign.cities[0]!.level);
    expect(battle.isActive, isFalse);
    watched.watchBattle(battle);
    expect(watched.watchedBattle, same(battle));
  });

  test('鼠标停在地图四边或角落不再移动镜头，后台时间照常推进', () {
    final c = _controller();
    addTearDown(c.dispose);
    c.camera.resize(const Size(800, 600));
    c.camera.center = c.world.pixelSize.center(Offset.zero);
    final before = c.camera.center;
    for (final point in [
      const Offset(1, 1),
      const Offset(799, 599),
      const Offset(400, 1),
      const Offset(1, 300),
    ]) {
      c.hover(point);
      c.tick(0.5);
      expect(c.camera.center, before);
    }
    c.leaveMap();
    c.tick(30);
    expect(c.camera.center, before);
    expect(c.campaign.settledTurns, greaterThan(0));
  });

  test('选点期间英雄战败会清除过期命令，不会出现幽灵部队', () {
    final c = _controller();
    addTearDown(c.dispose);
    final hero = c.previewHero!;
    c.campaign.dispatch(hero, c.world.cities[1]);
    c.openUnit(hero.id);
    c.prepareMove();
    c.campaign.defeatHero(hero.id, winnerCountryId: 1);
    c.tick(1);
    c.confirmPosition(c.heroPosition + const Offset(80, 0));
    expect(c.choosingTarget, isFalse);
    expect(c.campaign.marches, isEmpty);
  });

  testWidgets('角色点击、选点光标、情况、移动取消和扎营均在同一张地图完成', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    final canvas = find.byKey(const ValueKey('world-canvas'));
    final origin = tester.getTopLeft(canvas);
    await tester.tapAt(origin + c.camera.toScreen(c.heroPosition));
    await tester.pump();
    expect(find.byKey(const ValueKey('unit-panel')), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('unit-info')));
    await tester.pump();
    expect(find.text('王牌'), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('unit-move')));
    await tester.pump();
    expect(c.choosingTarget, isTrue);
    final region = find
        .ancestor(of: canvas, matching: find.byType(MouseRegion))
        .first;
    expect(
      tester.widget<MouseRegion>(region).cursor,
      SystemMouseCursors.precise,
    );
    final point = c.heroPosition + const Offset(80, 32);
    await tester.tapAt(origin + c.camera.toScreen(point));
    await tester.pump(const Duration(milliseconds: 300));
    final unit = c.campaign.marches.values.single;
    expect(unit.destination, point);
    await tester.tapAt(origin + c.camera.toScreen(unit.position));
    await tester.pump();
    await tester.tap(find.byKey(const ValueKey('unit-move')));
    await tester.pump();
    final before = unit.position;
    await tester.pump(const Duration(milliseconds: 300));
    expect(unit.position, isNot(before));
    await tester.sendKeyEvent(LogicalKeyboardKey.escape);
    await tester.pump();
    expect(find.byKey(const ValueKey('unit-panel')), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('unit-camp')));
    await tester.pump();
    final stopped = unit.position;
    await tester.pump(const Duration(seconds: 31));
    expect(unit.position, stopped);
    expect(find.textContaining('扎营中'), findsOneWidget);
    expect(c.campaign.settledTurns, greaterThan(0));
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('边缘悬停与面板悬停均不移动镜头，按住拖拽仍可平移', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    final origin = tester.getTopLeft(
      find.byKey(const ValueKey('world-canvas')),
    );
    c.openUnit(c.previewHero!.id);
    await tester.pump();
    final mouse = await tester.createGesture(kind: PointerDeviceKind.mouse);
    await mouse.addPointer(location: origin + const Offset(900, 300));
    await mouse.moveTo(origin + const Offset(1278, 300));
    await tester.pump();
    final before = c.camera.center;
    await tester.pump(const Duration(milliseconds: 200));
    expect(c.camera.center, before);
    await mouse.moveTo(origin + const Offset(22, 200));
    await tester.pump();
    final blocked = c.camera.center;
    await tester.pump(const Duration(milliseconds: 200));
    expect(c.camera.center, blocked);
    await mouse.moveTo(origin + const Offset(1278, 300));
    await mouse.down(origin + const Offset(1278, 300));
    await tester.pump();
    final pressed = c.camera.center;
    await tester.pump(const Duration(milliseconds: 200));
    expect(c.camera.center, pressed);
    await mouse.moveBy(const Offset(-100, 0));
    await mouse.moveBy(const Offset(-50, 0));
    await tester.pump();
    expect(c.camera.center.dx, greaterThan(pressed.dx));
    await mouse.up();
    await mouse.removePointer();
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('地图与战场的鼠标拖拽都有短惯性，再次按住可立即截停', (tester) async {
    final c = await _load(tester, const Size(1000, 700));
    final march = c.campaign.dispatch(c.previewHero!, c.world.cities[1])!;
    march.position = march.destination;
    c.tick(0.02);
    final battle = c.campaign.battles[1]!;
    for (final watching in [false, true]) {
      if (watching) c.watchBattle(battle);
      await tester.pump();
      final camera = c.activeCamera;
      camera.zoomTo(watching ? 6 : 3, camera.viewport.center(Offset.zero));
      camera.center = camera.worldSize.center(Offset.zero);
      c.refreshUi();
      await tester.pump();
      final canvas = find.byKey(
        ValueKey(watching ? 'battle-canvas' : 'world-canvas'),
      );
      final mouse = await tester.createGesture(kind: PointerDeviceKind.mouse);
      await mouse.addPointer(
        location: tester.getTopLeft(canvas) + const Offset(1, 20),
      );
      final hoverCenter = camera.center;
      await tester.pump(const Duration(milliseconds: 200));
      expect(camera.center, hoverCenter);
      await mouse.removePointer();
      await tester.fling(
        canvas,
        const Offset(-100, 0),
        1000,
        deviceKind: PointerDeviceKind.mouse,
      );
      expect(camera.coasting, isTrue);
      final released = camera.center;
      await tester.pump(const Duration(milliseconds: 16));
      expect(camera.center.dx, greaterThan(released.dx));
      await tester.pump(const Duration(milliseconds: 200));
      expect(camera.coasting, isFalse);
      expect((camera.center - released).distance * camera.scale, lessThan(50));
      await tester.fling(
        canvas,
        const Offset(100, 0),
        1000,
        deviceKind: PointerDeviceKind.mouse,
      );
      expect(camera.coasting, isTrue);
      final press = await tester.startGesture(
        tester.getCenter(canvas),
        kind: PointerDeviceKind.mouse,
      );
      final held = camera.center;
      await tester.pump(const Duration(milliseconds: 200));
      expect(camera.center, held);
      await press.up();
      await press.removePointer();
    }
    c.cancelCityAction();
    expect(c.camera.coasting, isFalse);
    expect(c.battleCamera.coasting, isFalse);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('战场可以缩放拖动，后台部队继续行军，返回和重进不重置战斗', (tester) async {
    final c = await _load(tester, const Size(1000, 700));
    c.campaign.upgradeCity(0);
    final hero = c.previewHero!;
    final march = c.campaign.dispatch(hero, c.world.cities[1])!;
    final other = c.campaign.dispatchTo(
      c.campaign.garrisonAt(0).first,
      c.heroPosition + const Offset(200, 48),
    )!;
    march.position = march.destination;
    c.tick(0.02);
    final battle = c.campaign.battles[1]!;
    final simulation = battle.simulation;
    final mapCenter = c.camera.center;
    c.watchBattle(battle);
    await tester.pump();
    final canvas = find.byKey(const ValueKey('battle-canvas'));
    expect(canvas, findsOneWidget);
    // 两名将领的血条加两军士气条；不再逐兵展示血条和血量格。
    expect(find.byType(LinearProgressIndicator), findsNWidgets(4));
    expect(find.text('1 · 20'), findsNothing);
    expect(find.byKey(const ValueKey('world-canvas')), findsNothing);
    expect(
      find.byKey(const ValueKey('battle-attacker-morale')),
      findsOneWidget,
    );
    await tester.tap(find.byKey(const ValueKey('battle-zoom-in')));
    await tester.pump();
    expect(c.battleCamera.scale, greaterThan(c.battleCamera.minScale));
    c.battleCamera.zoomTo(4, c.battleCamera.viewport.center(Offset.zero));
    c.refreshUi();
    await tester.pump();
    final cameraBefore = c.battleCamera.center;
    await tester.drag(canvas, const Offset(-80, 35));
    await tester.pump();
    expect(c.battleCamera.center, isNot(cameraBefore));
    expect(c.camera.center, mapCenter);
    final otherBefore = other.position;
    await tester.pump(const Duration(seconds: 2));
    expect(other.position, isNot(otherBefore));
    final elapsed = simulation.elapsed;
    final morale = simulation.attackerMorale.remaining;
    await tester.tap(find.byKey(const ValueKey('battle-return')));
    await tester.pump();
    expect(find.byKey(const ValueKey('world-canvas')), findsOneWidget);
    expect(c.camera.center, mapCenter);
    c.watchBattle(battle);
    await tester.pump();
    expect(battle.simulation, same(simulation));
    expect(simulation.elapsed, greaterThanOrEqualTo(elapsed));
    expect(simulation.attackerMorale.remaining, lessThanOrEqualTo(morale));
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('小窗口点击城上刀剑打开观战，面板开启时战斗持续并保留结束结果', (tester) async {
    final c = await _load(tester, const Size(600, 360));
    final unit = c.campaign.dispatch(
      c.campaign.heroes.firstWhere((hero) => hero.sourceId == 0),
      c.world.cities[1],
    )!;
    unit.position = unit.destination;
    c.tick(0.02);
    final battle = c.campaign.battles[1]!;
    c.camera.center = battle.city.bounds.topCenter;
    c.camera.constrain();
    c.refreshUi();
    await tester.pump();
    final origin = tester.getTopLeft(
      find.byKey(const ValueKey('world-canvas')),
    );
    await tester.tapAt(origin + c.battleMarkerBounds(battle).center);
    await tester.pump();
    expect(find.byKey(const ValueKey('battle-scene')), findsOneWidget);
    expect(
      find.byKey(const ValueKey('battle-return')).hitTestable(),
      findsOneWidget,
    );
    await tester.pump(const Duration(seconds: 4));
    expect(battle.rounds, greaterThan(0));
    expect(
      battle.simulation.units.any(
        (unit) => !unit.isGeneral && unit.health.hp < 20,
      ),
      isTrue,
    );
    await tester.pump(const Duration(seconds: 90));
    expect(battle.outcome, isNotNull);
    expect(find.text(battle.outcome!), findsOneWidget);
    expect(c.watchedBattle, same(battle));
    await tester.tap(find.byKey(const ValueKey('battle-return')));
    await tester.pump();
    expect(c.watchedBattle, isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
