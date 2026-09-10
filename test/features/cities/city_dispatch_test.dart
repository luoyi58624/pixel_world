import '../../support/ongoing_fixture.dart';

import 'package:pixel_world/core/geometry/flutter_geometry.dart';
import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/countries/presentation/country_flag.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

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
  c.campaigns[0] = ongoingCampaign(
    CampaignState.fromRom(
      aiEnabled: false,
      c.world,
      painter.assets.heroCatalog,
      startingGold: startingGold,
    ),
    stock: 10,
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
  await tester.tapAt(canvas + (c.camera.toScreen(city.bounds.center)).toUi);
  await tester.pump();
}

void main() {
  testWidgets('一级城连续派出全部三位将领，面板只留驻军，回城后重新出现', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    final home = c.world.cities.first;
    final heroes = c.campaign.garrisonAt(home.id).toList();
    final salary = c.campaign.salaryAt(home.id);
    expect(heroes.length, 3);
    expect(c.campaign.cities[home.id]!.level, 1);
    for (var i = 0; i < heroes.length; i++) {
      await _tapCity(tester, c, home);
      for (var j = 0; j < heroes.length; j++) {
        expect(
          find.byKey(ValueKey('dispatch-hero-${heroes[j].id}')),
          j < i ? findsNothing : findsOneWidget,
        );
      }
      final choice = find.byKey(ValueKey('dispatch-hero-${heroes[i].id}'));
      await tester.ensureVisible(choice);
      await tester.tap(choice);
      await tester.pump();
      await tester.tap(find.byKey(const ValueKey('dispatch-confirm')));
      await tester.pump();
      expect(c.pendingHero, same(heroes[i]));
      c.confirmPosition(c.heroPosition + GamePoint(100 + i * 32, 48 + i * 16));
      await tester.pump();
      expect(c.campaign.marches.length, i + 1);
      expect(c.campaign.soldiersAt(home.id), [6, 2, 0][i]);
      expect(heroes[i].soldiers, [4, 4, 2][i]);
    }
    await _tapCity(tester, c, home);
    expect(find.text('城中暂无驻守英雄'), findsOneWidget);
    expect(find.byKey(const ValueKey('hero-hp')), findsNothing);
    expect(c.selectedHero, isNull);
    expect(
      tester
          .widget<FilledButton>(find.byKey(const ValueKey('dispatch-confirm')))
          .onPressed,
      isNull,
    );
    expect(c.campaign.heroesAt(home.id), containsAll(heroes));
    expect(c.campaign.salaryAt(home.id), salary);
    expect(
      c.campaign.marches.values
          .map((march) => march.destination)
          .toSet()
          .length,
      3,
    );
    for (final hero in heroes) {
      expect(c.campaign.dispatchTo(hero, c.heroPosition), isNull);
      c.selectHero(hero.id);
      expect(c.selectedHero, isNull);
    }
    final destinations = c.campaign.marches.values
        .map((m) => m.destination)
        .toList();
    final positions = c.campaign.marches.values.map((m) => m.position).toList();
    c.tick(0.25);
    expect(
      c.campaign.marches.values.map((m) => m.position).toList(),
      isNot(positions),
    );
    expect(
      c.campaign.marches.values.map((m) => m.destination).toList(),
      destinations,
    );
    c.campaign.moveTo(heroes.first.id, c.campaign.cityBounds(home).center);
    for (
      var i = 0;
      i < 120 && c.campaign.marches.containsKey(heroes.first.id);
      i++
    ) {
      c.tick(1 / 60);
    }
    await _tapCity(tester, c, home);
    expect(
      find.byKey(ValueKey('dispatch-hero-${heroes.first.id}')),
      findsOneWidget,
    );
    for (final hero in heroes.skip(1)) {
      expect(find.byKey(ValueKey('dispatch-hero-${hero.id}')), findsNothing);
    }
    expect(c.campaign.garrisonAt(home.id), [heroes.first]);
    expect(c.campaign.soldiersAt(home.id), 4);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  for (final size in [const Size(375, 812), const Size(1280, 720)]) {
    testWidgets('敌方驻军可切换查看完整属性，不能派遣或经营，出征者从列表移除 $size', (tester) async {
      final c = await _load(tester, size);
      final city = c.world.cities[1];
      final heroes = c.campaign.garrisonAt(city.id).toList();
      await _tapCity(tester, c, city);
      expect(find.text('驻守英雄'), findsOneWidget);
      for (final hero in heroes) {
        final choice = find.byKey(ValueKey('dispatch-hero-${hero.id}'));
        expect(choice, findsOneWidget);
        await tester.tap(choice);
        await tester.pump();
        expect(c.selectedHero, same(hero));
        expect(
          tester.widget<Text>(find.byKey(const ValueKey('hero-hp'))).data,
          '${hero.health.label} / ${hero.maxHp}',
        );
        expect(
          find.descendant(
            of: find.byKey(const ValueKey('city-stat-战斗')),
            matching: find.text('${hero.combat}'),
          ),
          findsOneWidget,
        );
        expect(find.byKey(const ValueKey('dispatch-confirm')), findsNothing);
        for (final key in ['city-upgrade', 'buy-reserves', 'draw-hero']) {
          expect(
            tester.widget<OutlinedButton>(find.byKey(ValueKey(key))).onPressed,
            isNull,
          );
        }
        final gold = c.campaign.goldFor(hero.countryId);
        c.prepareDispatch();
        expect(c.pendingHero, isNull);
        expect(c.campaign.marches, isEmpty);
        expect(c.campaign.goldFor(hero.countryId), gold);
      }
      for (final hero in heroes) {
        expect(
          c.campaign.dispatch(
            hero,
            c.world.cities[2],
            countryId: hero.countryId,
          ),
          isNotNull,
        );
        c.refreshUi();
        await tester.pump();
        expect(find.byKey(ValueKey('dispatch-hero-${hero.id}')), findsNothing);
      }
      expect(find.text('守城部队'), findsNothing);
      expect(find.byKey(const ValueKey('city-economy')), findsNothing);
      expect(c.campaign.garrisonAt(city.id), isEmpty);
      expect(c.campaign.heroesAt(city.id), heroes);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }

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
    expect(find.text('${c.world.countryName(4)}国'), findsOneWidget);
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
    await tester.tapAt(tester.getTopLeft(upgrade) + const Offset(14, 18));
    await tester.pump();
    expect(c.campaign.cities[0]!.level, 2);
    expect(c.campaign.gold, 5);
    expect(
      find.descendant(
        of: find.byKey(const ValueKey('city-upgrade')),
        matching: find.text('2 级'),
      ),
      findsOneWidget,
    );
    expect(tester.widget<OutlinedButton>(upgrade).onPressed, isNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('更换将领即时更新升级优惠，离城后的旧选择不能升级', (tester) async {
    final c = await _load(tester, const Size(375, 812));
    await _tapCity(tester, c, c.world.cities.first);
    final quote = find.byKey(const ValueKey('city-upgrade-quote'));
    final upgrade = find.byKey(const ValueKey('city-upgrade'));
    expect(tester.widget<Text>(quote).data, contains('15金币'));
    final choice = find.byKey(const ValueKey('dispatch-hero-rom-2'));
    await tester.ensureVisible(choice);
    await tester.tap(choice);
    await tester.pump();
    expect(tester.widget<Text>(quote).data, contains('27金币'));
    await tester.ensureVisible(upgrade);
    await tester.tap(upgrade);
    await tester.pump();
    expect(c.campaign.gold, 273);
    expect(tester.widget<Text>(quote).data, contains('57金币'));
    c.campaign.dispatch(c.selectedHero!, c.world.cities[1]);
    c.refreshUi();
    await tester.pump();
    expect(quote, findsNothing);
    expect(tester.widget<OutlinedButton>(upgrade).onPressed, isNull);
    expect(find.textContaining('基础 80'), findsNothing);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  test('直接查看城池和选择英雄，关闭或取消选目标均不扣兵', () {
    final c = ongoingController(
      WorldController(
        _worlds(),
        heroCatalog: _heroCatalog(),
        startingGold: 300,
      ),
    );
    expect(c.campaign.buySoldiers(0, 12), isTrue);
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
    final c = ongoingController(
      WorldController(
        _worlds(),
        heroCatalog: _heroCatalog(),
        startingGold: 300,
      ),
    );
    expect(c.campaign.buySoldiers(0, 12), isTrue);
    final home = c.world.cities.first;
    final target = c.world.cities[1];
    _prepare(c, 'rom-40');
    c.confirmPosition(const GamePoint(-1, -1));
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

  test('一级城可让不同英雄独立出征，地图点击不会改写已有命令', () {
    final c = ongoingController(
      WorldController(
        _worlds(),
        heroCatalog: _heroCatalog(),
        startingGold: 300,
      ),
    );
    expect(c.campaign.buySoldiers(0, 12), isTrue);
    expect(c.campaign.cities[0]!.level, 1);
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
    final c = ongoingController(
      WorldController(
        _worlds(),
        heroCatalog: _heroCatalog(),
        startingGold: 300,
      ),
    );
    expect(c.campaign.buySoldiers(0, 12), isTrue);
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
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 0);
    c.switchWorld(0);
    expect(c.campaign.marches['rom-40']!.position, position);
    expect(c.campaign.soldiersAt(c.world.cities.first.id), 8);
    c.dispose();
  });

  testWidgets('点击我方城池直接选英雄，解雇在左出击在右，选目标可无损返回', (tester) async {
    final c = await _load(tester, const Size(1280, 720));
    await _tapCity(tester, c, c.world.cities.first);
    expect(find.byKey(const ValueKey('city-sortie')), findsNothing);
    expect(find.byKey(const ValueKey('city-information')), findsNothing);
    expect(find.byKey(const ValueKey('dispatch-hero-rom-0')), findsOneWidget);
    expect(find.text('月收入'), findsNothing);
    expect(find.text('士兵数量'), findsOneWidget);
    expect(find.text('士兵'), findsNothing);
    expect(find.text('王牌'), findsNothing);
    final cancel = find.byKey(const ValueKey('city-dismiss'));
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
    expect(c.campaign.buySoldiers(1, 2, countryId: 1), isTrue);
    await _tapCity(tester, c, c.world.cities[1]);
    expect(find.text('奥尔梅国'), findsOneWidget);
    expect(find.text('金币 298'), findsOneWidget);
    for (final key in ['city-upgrade', 'buy-reserves', 'draw-hero']) {
      expect(
        tester.widget<OutlinedButton>(find.byKey(ValueKey(key))).onPressed,
        isNull,
      );
    }
    expect(find.text('城池情况'), findsOneWidget);
    expect(find.text('经济情况'), findsNothing);
    expect(find.text('守城部队'), findsNothing);
    expect(
      find.descendant(
        of: find.byKey(const ValueKey('city-upgrade')),
        matching: find.text('2 级'),
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

  testWidgets('小窗口已出征英雄移出城内面板，其余英雄仍可出击', (tester) async {
    final c = await _load(tester, const Size(600, 360));
    await _tapCity(tester, c, c.world.cities.first);
    await tester.pump();
    expect(tester.takeException(), isNull);
    final confirm = find.byKey(const ValueKey('dispatch-confirm'));
    final cancel = find.byKey(const ValueKey('city-dismiss'));
    expect(confirm.hitTestable(), findsOneWidget);
    expect(cancel.hitTestable(), findsOneWidget);
    await tester.tap(confirm);
    await tester.pump();
    await _tapCity(tester, c, c.world.cities[1]);
    await _tapCity(tester, c, c.world.cities.first);
    await tester.pump();
    expect(find.byKey(const ValueKey('dispatch-hero-rom-40')), findsNothing);
    expect(find.byKey(const ValueKey('dispatch-hero-rom-0')), findsOneWidget);
    expect(tester.widget<FilledButton>(confirm).onPressed, isNotNull);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
