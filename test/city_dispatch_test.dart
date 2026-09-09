import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/ui/country_flag.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';
import 'package:pixel_world/world/world_painter.dart';

List<WorldDefinition> _worlds() =>
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync());

List<RomHeroDefinition> _heroCatalog() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());

void _prepare(WorldController c, String heroId) {
  c.openCity(c.world.cities.first);
  c.selectHero(heroId);
  c.prepareDispatch();
}

Future<WorldController> _load(
  WidgetTester tester,
  Size size, {
  int startingGold = 300,
}) async {
  // 每个 widget 测试使用独立时钟，不能复用上个测试时钟下缓存的资源 Future。
  rootBundle.evict('assets/maps/worlds.json');
  rootBundle.evict('assets/data/rom_heroes.json');
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
  final c = painter.controller;
  c.campaigns[0] = CampaignState.fromRom(
    c.world,
    painter.assets.heroCatalog,
    startingGold: startingGold,
  );
  return c;
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
  testWidgets('城池面板显示真实城名、国家国旗和高级将领类型', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    await _tapCity(tester, c, c.world.cities.first);
    expect(find.text('阿尔马国'), findsOneWidget);
    final flag = find.byKey(const ValueKey('city-country-flag'));
    expect(tester.widget<CountryFlag>(flag).countryId, 0);
    await tester.pump();
    await tester.tap(find.byKey(const ValueKey('dispatch-hero-rom-0')));
    await tester.pump();
    expect(find.text('泽拉斯 · 高级将领'), findsOneWidget);
    c.campaign.cities[2]!.ownerCountryId = 0;
    c.campaign.heroes.firstWhere((hero) => hero.sourceId == 40).cityId = 2;
    c.campaign.defeatHero('rom-2', winnerCountryId: 4, defendedCityId: 0);
    c.refreshUi();
    await tester.pump();
    expect(tester.widget<CountryFlag>(flag).countryId, 4);
    expect(find.text('阿尔马国'), findsOneWidget);
    expect(find.textContaining('Lv.'), findsNothing);
    expect(find.textContaining('敌方'), findsNothing);
    expect(find.byKey(const ValueKey('dispatch-confirm')), findsNothing);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('经济面板升级后立即更新产出和国库，金币不足时禁用升级', (tester) async {
    final c = await _load(tester, const Size(375, 812), startingGold: 20);
    await _tapCity(tester, c, c.world.cities.first);
    await tester.pump();
    final upgrade = find.byKey(const ValueKey('city-upgrade'));
    await tester.ensureVisible(upgrade);
    await tester.tap(upgrade);
    await tester.pump();
    expect(c.campaign.cities[0]!.level, 2);
    expect(c.campaign.gold, 5);
    expect(
      find.descendant(
        of: find.byKey(const ValueKey('city-stat-月收入')),
        matching: find.text('15'),
      ),
      findsOneWidget,
    );
    expect(tester.widget<FilledButton>(upgrade).onPressed, isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('更换将领即时更新升级优惠，离城后的旧选择不能升级', (tester) async {
    final c = await _load(tester, const Size(375, 812));
    await _tapCity(tester, c, c.world.cities.first);
    final quote = find.byKey(const ValueKey('city-upgrade-quote'));
    final upgrade = find.byKey(const ValueKey('city-upgrade'));
    expect(tester.widget<Text>(quote).data, contains('内政 15 · 实付 15 金币'));
    final choice = find.byKey(const ValueKey('dispatch-hero-rom-2'));
    await tester.ensureVisible(choice);
    await tester.tap(choice);
    await tester.pump();
    expect(tester.widget<Text>(quote).data, contains('威拉斯主持'));
    expect(tester.widget<Text>(quote).data, contains('内政 3 · 实付 27 金币'));
    await tester.ensureVisible(upgrade);
    await tester.tap(upgrade);
    await tester.pump();
    expect(c.campaign.gold, 273);
    expect(
      tester.widget<Text>(quote).data,
      contains('基础 40 − 内政 3 · 实付 37 金币'),
    );
    c.campaign.dispatch(c.selectedHero!, c.world.cities[1]);
    c.refreshUi();
    await tester.pump();
    expect(quote, findsNothing);
    expect(tester.widget<FilledButton>(upgrade).onPressed, isNull);
    expect(find.byKey(const ValueKey('city-upgrade-blocked')), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  test('直接查看城池和选择英雄，关闭或取消选目标均不扣兵', () {
    final c = WorldController(
      _worlds(),
      heroCatalog: _heroCatalog(),
      startingGold: 300,
    );
    c.openCity(c.world.cities.first);
    expect(c.selectedCity, c.world.cities.first);
    _prepare(c, 'rom-0');
    expect(c.pendingHero!.id, 'rom-0');
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 12);
    expect(c.campaign.marches, isEmpty);
    c.cancelCityAction();
    expect(c.pendingHero, isNull);
    expect(c.selectedCity, c.world.cities.first);
    expect(c.selectedHeroId, 'rom-0');
    c.cancelCityAction();
    expect(c.selectedCity, isNull);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 12);
    c.dispose();
  });

  test('有效位置确认后英雄才离城，越界或重复确认不会重复扣兵', () {
    final c = WorldController(
      _worlds(),
      heroCatalog: _heroCatalog(),
      startingGold: 300,
    );
    final home = c.world.cities.first;
    final target = c.world.cities[1];
    _prepare(c, 'rom-40');
    c.confirmPosition(const Offset(-1, -1));
    expect(c.pendingHero, isNotNull);
    expect(c.campaign.marches, isEmpty);
    c.confirmTarget(target);
    c.confirmTarget(target);
    expect(c.campaign.marches.length, 1);
    expect(c.campaign.soldiersAt(home.id), 8);
    final march = c.campaign.marches['rom-40']!;
    expect(home.bounds.contains(march.position), isFalse);
    final direction = target.bounds.center - home.bounds.center;
    final departure = march.position - home.bounds.center;
    expect(
      departure.dx * direction.dx + departure.dy * direction.dy,
      greaterThan(0),
    );
    expect(march.target, target);
    expect(c.campaign.dispatch(march.hero, target), isNull);
    expect(
      c.campaign.dispatch(c.campaign.heroes.last, c.worlds[1].cities[1]),
      isNull,
    );
    c.dispose();
  });

  test('升级后可让不同英雄独立出征，地图点击不会改写进攻命令', () {
    final c = WorldController(
      _worlds(),
      heroCatalog: _heroCatalog(),
      startingGold: 300,
    );
    expect(
      c.campaign.upgradeCity(
        c.world.cities.first.id,
        hero: c.campaign.garrisonAt(c.world.cities.first.id).first,
      ),
      isTrue,
    );
    _prepare(c, 'rom-40');
    c.confirmTarget(c.world.cities[1]);
    c.tick(1);
    final first = c.campaign.marches['rom-40']!;
    final position = first.position;
    _prepare(c, 'rom-0');
    c.confirmTarget(c.world.cities[2]);
    expect(first.position, position);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 4);
    c.tick(1);
    expect(first.position, isNot(position));
    expect(c.campaign.marches['rom-0']!.walkDistance, greaterThan(0));
    c.walkTo(const TileCoord(0, 0));
    expect(first.target, c.world.cities[1]);
    c.dispose();
  });

  test('切换地图保留各自出征记录，取消选目标不带到另一张地图', () {
    final c = WorldController(
      _worlds(),
      heroCatalog: _heroCatalog(),
      startingGold: 300,
    );
    c.campaign.upgradeCity(
      c.world.cities.first.id,
      hero: c.campaign.garrisonAt(c.world.cities.first.id).first,
    );
    _prepare(c, 'rom-40');
    c.confirmTarget(c.world.cities[1]);
    c.tick(0.5);
    final position = c.campaign.marches['rom-40']!.position;
    _prepare(c, 'rom-0');
    c.switchWorld(1);
    expect(c.pendingHero, isNull);
    expect(c.campaign.marches, isEmpty);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 12);
    c.switchWorld(0);
    expect(c.campaign.marches['rom-40']!.position, position);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 8);
    c.dispose();
  });

  testWidgets('点击我方城池直接选英雄，取消在左出击在右，选目标可无损返回', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    await _tapCity(tester, c, c.world.cities.first);
    expect(find.byKey(const ValueKey('city-sortie')), findsNothing);
    expect(find.byKey(const ValueKey('city-information')), findsNothing);
    expect(find.byKey(const ValueKey('dispatch-hero-rom-0')), findsOneWidget);
    expect(find.text('月收入'), findsOneWidget);
    expect(find.text('驻守士兵'), findsOneWidget);
    expect(find.text('士兵'), findsOneWidget);
    expect(find.text('王牌'), findsOneWidget);
    final cancel = find.byKey(const ValueKey('city-cancel'));
    final sortie = find.byKey(const ValueKey('dispatch-confirm'));
    expect(tester.getCenter(cancel).dx, lessThan(tester.getCenter(sortie).dx));
    await tester.tap(find.byKey(const ValueKey('dispatch-hero-rom-0')));
    await tester.pump();
    expect(find.text('95 / 95'), findsOneWidget);
    await tester.tap(sortie);
    await tester.pump();
    expect(c.pendingHero!.id, 'rom-0');
    expect(find.byKey(const ValueKey('city-panel')), findsNothing);
    await tester.tap(find.byKey(const ValueKey('cancel-target')));
    await tester.pump();
    expect(c.pendingHero, isNull);
    expect(c.selectedHeroId, 'rom-0');
    expect(c.campaign.marches, isEmpty);
    await tester.tap(sortie);
    await tester.pump();
    await _tapCity(tester, c, c.world.cities[1]);
    expect(c.campaign.marches['rom-0']!.hero.name, '泽拉斯');
    expect(c.pendingHero, isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('敌城点击直接显示详情，标题只留国名，取消直接关闭', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    await _tapCity(tester, c, c.world.cities[1]);
    expect(find.text('奥尔梅国'), findsOneWidget);
    expect(find.text('城池情况'), findsOneWidget);
    expect(find.text('经济情况'), findsOneWidget);
    expect(find.text('守城部队'), findsOneWidget);
    expect(
      find.descendant(
        of: find.byKey(const ValueKey('city-stat-月收入')),
        matching: find.text('15'),
      ),
      findsOneWidget,
    );
    expect(find.textContaining('Lv.'), findsNothing);
    expect(find.textContaining('敌方'), findsNothing);
    expect(find.byKey(const ValueKey('city-sortie')), findsNothing);
    expect(find.byKey(const ValueKey('city-information')), findsNothing);
    expect(find.byKey(const ValueKey('dispatch-confirm')), findsNothing);
    await tester.tap(find.byKey(const ValueKey('city-cancel')));
    await tester.pump();
    expect(c.selectedCity, isNull);
    expect(find.byKey(const ValueKey('city-panel')), findsNothing);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('小窗口中详情可滚动，出击取消按钮始终可见且已出征英雄不能重复出击', (tester) async {
    final c = await _load(tester, const Size(600, 360));
    await _tapCity(tester, c, c.world.cities.first);
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
    await tester.pump();
    final unavailable = find.byKey(const ValueKey('dispatch-hero-rom-40'));
    await tester.ensureVisible(unavailable);
    await tester.tap(unavailable);
    await tester.pump();
    expect(tester.widget<FilledButton>(confirm).onPressed, isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
