import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_painter.dart';

class _RandomValue implements math.Random {
  int value = 0;
  @override
  int nextInt(int max) => value % max;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0;
}

Future<WorldController> _load(
  WidgetTester tester,
  Size size,
  _RandomValue random,
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
    aiEnabled: false,
    c.world,
    painter.assets.heroCatalog,
    economyRandom: _RandomValue(),
    recruitmentRandom: random,
  );
  c.openCity(c.world.cities.first);
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
  testWidgets('同一城池面板征兵并补充选中英雄，年月在面板打开时继续推进', (tester) async {
    final c = await _load(tester, const Size(375, 812), _RandomValue());
    expect(c.campaign.gold, 50);
    expect(find.text('1年1月 · 金币 50'), findsOneWidget);
    final hero = c.selectedHero!;
    hero.squad[0].hp = 0;
    hero.squad[1].hp = 0;
    c.refreshUi();
    await tester.pump();
    for (var i = 0; i < 3; i++) {
      await _tap(tester, 'reserve-plus');
    }
    expect(find.text('征兵 4 人 · 4 金币'), findsOneWidget);
    await _tap(tester, 'buy-reserves');
    expect(c.campaign.cities[0]!.reserveSoldiers, 4);
    expect(c.campaign.gold, 46);
    await _tap(tester, 'reinforce-hero');
    expect(hero.soldiers, 4);
    expect(c.campaign.cities[0]!.reserveSoldiers, 2);
    expect(c.campaign.gold, 46);
    expect(
      tester
          .widget<OutlinedButton>(find.byKey(const ValueKey('reinforce-hero')))
          .onPressed,
      isNull,
    );
    await tester.pump(const Duration(seconds: 60));
    expect(find.text('1年2月 · 金币 52'), findsOneWidget);
    expect(find.byKey(const ValueKey('city-panel')), findsOneWidget);
    expect(find.byKey(const ValueKey('city-monthly-report')), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('放弃后本月抽取按钮禁用，关面板不重置，下月自动恢复', (tester) async {
    final c = await _load(tester, const Size(375, 812), _RandomValue());
    await _tap(tester, 'draw-hero');
    await _tap(tester, 'decline-recruit');
    final draw = find.byKey(const ValueKey('draw-hero'));
    expect(tester.widget<FilledButton>(draw).onPressed, isNull);
    expect(find.textContaining('本月可抽 0 次'), findsOneWidget);
    await tester.tap(find.byTooltip('关闭城池信息'));
    await tester.pump();
    c.openCity(c.world.cities.first);
    await tester.pump();
    expect(tester.widget<FilledButton>(draw).onPressed, isNull);
    await tester.pump(const Duration(seconds: 60));
    expect(tester.widget<FilledButton>(draw).onPressed, isNotNull);
    expect(find.textContaining('本月可抽 1 次'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('打开城池面板时各国仍然行动，敌军只能查看并能进入NPC间的战斗', (tester) async {
    final c = await _load(tester, const Size(375, 812), _RandomValue());
    final painter =
        tester
                .widget<CustomPaint>(find.byKey(const ValueKey('world-canvas')))
                .painter!
            as WorldPainter;
    c.campaigns[0] = CampaignState.fromRom(
      c.world,
      painter.assets.heroCatalog,
      aiRandom: math.Random(3),
      recruitmentRandom: math.Random(7),
    );
    c.refreshUi();
    await tester.pump(const Duration(seconds: 8));
    expect(find.byKey(const ValueKey('city-panel')), findsOneWidget);
    expect(
      c.campaign.marches.values.any((march) => !march.hero.isPlayer),
      isTrue,
    );
    expect(c.previewHero, isNotNull);
    // 让一支仍可出征的非玩家部队抵达敌国，使用真实后台交战入口。
    final hero = c.campaign.heroes.firstWhere(
      (hero) =>
          !hero.isPlayer &&
          c.campaign.canDispatch(hero, countryId: hero.countryId),
    );
    final target = c.world.cities.firstWhere(
      (city) =>
          c.campaign.cities[city.id]!.ownerCountryId != hero.countryId &&
          !c.campaign.cities[city.id]!.isPlayer &&
          c.campaign.garrisonAt(city.id).isNotEmpty,
    );
    final march = c.campaign.dispatch(hero, target, countryId: hero.countryId)!;
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
    march.position = march.destination;
    c.tick(0.02);
    final battle = c.campaign.battles[target.id]!;
    c.watchBattle(battle);
    await tester.pump();
    expect(find.byKey(const ValueKey('battle-scene')), findsOneWidget);
    expect(
      tester
          .widget<Text>(find.byKey(const ValueKey('battle-defense-bonus')))
          .data,
      '城防加成 · 攻击 +${battle.simulation.defenderAttackBonus} · 初始士气 +${battle.simulation.defenderMoraleBonus}',
    );
    expect(
      find.textContaining('${c.world.countryName(hero.countryId)}国 · 进攻'),
      findsOneWidget,
    );
    final elapsed = battle.simulation.elapsed;
    await tester.pump(const Duration(seconds: 1));
    expect(battle.simulation.elapsed, greaterThan(elapsed));
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  for (final type in [HeroType.advanced, HeroType.normal]) {
    testWidgets('${type.label}签约直接在城池面板完成，关面板不重复扣费或抽取', (tester) async {
      final random = _RandomValue();
      final c = await _load(
        tester,
        type == HeroType.normal ? const Size(375, 812) : const Size(1280, 720),
        random,
      );
      if (!c.campaign.recruitPool.any((hero) => hero.type == type)) {
        final available = c.campaign.heroes.firstWhere(
          (hero) => hero.type == type,
        );
        c.campaign.defeatHero(
          available.id,
          winnerCountryId: available.countryId == 0 ? 1 : 0,
        );
      }
      random.value = c.campaign.recruitPool.indexWhere(
        (hero) => hero.type == type,
      );
      c.refreshUi();
      await tester.pump();
      await _tap(tester, 'draw-hero');
      final offer = c.campaign.recruitmentOffer!;
      expect(offer.hero.type, type);
      expect(c.campaign.gold, 45);
      expect(find.byKey(const ValueKey('recruit-offer-name')), findsOneWidget);
      await tester.tap(find.byTooltip('关闭城池信息'));
      await tester.pump();
      c.openCity(c.world.cities.first);
      await tester.pump();
      expect(c.campaign.recruitmentOffer, same(offer));
      expect(c.campaign.gold, 45);
      expect(
        find.text(type == HeroType.normal ? '免费签约' : '签约 · 10 金币'),
        findsOneWidget,
      );
      await _tap(tester, 'sign-recruit');
      expect(c.selectedHero!.sourceId, offer.hero.id);
      expect(c.campaign.gold, type == HeroType.normal ? 45 : 35);
      expect(c.campaign.recruitmentOffer, isNull);
      expect(c.selectedHero!.soldiers, 0);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
