import 'dart:math' as math;

import 'support/recruitment_fixture.dart';

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
  _RandomValue random, {
  int? startingGold,
}) async {
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
    startingGold: startingGold,
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
  if (key == 'draw-hero') {
    await tester.tapAt(tester.getTopLeft(finder) + const Offset(14, 18));
  } else {
    await tester.tap(finder);
  }
  await tester.pump();
}

void main() {
  for (final size in [const Size(320, 720), const Size(1280, 720)]) {
    testWidgets('解雇在 $size 使用错误色并返款，城内选择与野外面板同步清理', (tester) async {
      final c = await _load(tester, size, _RandomValue());
      Finder button(String key) => find.descendant(
        of: find.byKey(ValueKey(key)),
        matching: find.byType(OutlinedButton),
      );
      final main = c.campaign.garrisonAt(0).first;
      expect(main.sourceId, 40);
      expect(
        tester.widget<OutlinedButton>(button('city-dismiss')).onPressed,
        isNull,
      );
      await _tap(tester, 'dispatch-hero-rom-0');
      final dismiss = button('city-dismiss');
      final error = Theme.of(tester.element(dismiss)).colorScheme.error;
      final style = tester.widget<OutlinedButton>(dismiss).style!;
      expect(style.foregroundColor!.resolve({}), error);
      expect(find.text('解雇 · +25金币'), findsOneWidget);
      final before = c.campaign.gold;
      final soldierCount = c.campaign.soldiersAt(0);
      await tester.tap(dismiss);
      await tester.pump();
      expect(c.campaign.gold, before + 25);
      expect(c.campaign.soldiersAt(0), soldierCount);
      expect(c.selectedHeroId, main.id);
      expect(find.byKey(const ValueKey('dispatch-hero-rom-0')), findsNothing);
      expect(c.campaign.recruitPool.any((hero) => hero.id == 0), isTrue);
      final hero = c.campaign.garrisonAt(0).last;
      c.campaign.dispatch(hero, c.world.cities[1]);
      c.openUnit(hero.id);
      await tester.pump();
      final fieldBefore = c.campaign.gold;
      final reward = c.campaign.dismissalGold(hero);
      await tester.tap(button('unit-dismiss'));
      await tester.pump();
      expect(c.campaign.gold, fieldBefore + reward);
      expect(c.selectedUnitId, isNull);
      expect(find.byKey(const ValueKey('unit-panel')), findsNothing);
      expect(c.campaign.marches.containsKey(hero.id), isFalse);
      final enemy = c.campaign.garrisonAt(1).first;
      c.campaign.dispatch(enemy, c.world.cities[2], countryId: 1);
      c.openUnit(enemy.id);
      await tester.pump();
      expect(find.byKey(const ValueKey('unit-dismiss')), findsNothing);
      expect(find.byKey(const ValueKey('unit-close')), findsOneWidget);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }

  testWidgets('满员招募变灰，出城启用，签约前回城再次禁用但保留抽取结果', (tester) async {
    final c = await _load(tester, const Size(375, 812), _RandomValue());
    final draw = find.byKey(const ValueKey('draw-hero'));
    expect(tester.widget<OutlinedButton>(draw).onPressed, isNull);
    final departures = <HeroMarch>[];
    for (final hero in c.campaign.garrisonAt(0).skip(1).toList()) {
      departures.add(c.campaign.dispatch(hero, c.world.cities[1])!);
      c.campaign.camp(hero.id);
    }
    c.refreshUi();
    await tester.pump();
    expect(tester.widget<OutlinedButton>(draw).onPressed, isNotNull);
    await _tap(tester, 'draw-hero');
    final sign = find.byKey(const ValueKey('sign-recruit'));
    expect(tester.widget<FilledButton>(sign).onPressed, isNotNull);
    final offer = c.campaign.recruitmentOffer;
    final returning = departures.first;
    c.campaign.moveTo(
      returning.hero.id,
      c.campaign.cityBounds(c.world.cities.first).center,
    );
    returning.position = returning.destination;
    c.tick(0.02);
    await tester.pump();
    expect(c.campaign.garrisonAt(0).length, 2);
    expect(c.campaign.recruitmentOffer, same(offer));
    expect(tester.widget<FilledButton>(sign).onPressed, isNull);
    expect(find.text('驻城英雄已满，升级或派出英雄后可签约。'), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  for (final size in [
    const Size(320, 720),
    const Size(375, 812),
    const Size(1280, 720),
  ]) {
    testWidgets(
      '城池、英雄和属性方块在 $size 共用字号、间距与高度',
      (tester) async {
        final c = await _load(tester, size, _RandomValue());
        final services = [
          'city-upgrade',
          'buy-reserves',
          'draw-hero',
        ].map((key) => find.byKey(ValueKey(key))).toList();
        final choices = c.campaign
            .garrisonAt(0)
            .map((hero) => find.byKey(ValueKey('dispatch-hero-${hero.id}')))
            .toList();
        expect(c.campaign.garrisonAt(0).map((hero) => hero.sourceId), [
          40,
          0,
          2,
        ]);
        final serviceRects = services.map(tester.getRect).toList();
        final heroRects = choices.map(tester.getRect).toList();
        for (var i = 0; i < 3; i++) {
          expect(heroRects[i].width, closeTo(serviceRects[i].width, 0.01));
          expect(heroRects[i].height, serviceRects[i].height);
          expect(heroRects[i].top, heroRects[0].top);
          // 测量实际渲染位置，桌面 compact 密度曾让声明的 padding 被吃掉。
          for (final card in [services[i], choices[i]]) {
            final texts = find.descendant(
              of: card,
              matching: find.byType(Text),
            );
            final content = tester
                .getRect(texts.first)
                .expandToInclude(tester.getRect(texts.last));
            expect(content.center.dy, closeTo(tester.getCenter(card).dy, 0.01));
            expect(
              content.top - tester.getTopLeft(card).dy,
              greaterThanOrEqualTo(8),
            );
          }
          final service = tester.widget<OutlinedButton>(services[i]);
          final choice = tester.widget<OutlinedButton>(choices[i]);
          expect(
            choice.style!.padding!.resolve({}),
            service.style!.padding!.resolve({}),
          );
          if (i > 0) {
            expect(
              heroRects[i].left - heroRects[i - 1].right,
              closeTo(serviceRects[i].left - serviceRects[i - 1].right, 0.01),
            );
          }
        }
        expect(
          serviceRects[0].top - tester.getBottomLeft(find.text('城池情况')).dy,
          closeTo(
            heroRects[0].top - tester.getBottomLeft(find.text('驻守英雄')).dy,
            0.01,
          ),
        );
        final infoText = tester
            .widget<Text>(find.byKey(const ValueKey('city-reserves')))
            .style!;
        for (final finder in [
          ...choices,
          find.byKey(const ValueKey('city-stat-战斗')),
          find.byKey(const ValueKey('city-stat-月收入')),
        ]) {
          for (final text in tester.widgetList<Text>(
            find.descendant(of: finder, matching: find.byType(Text)),
          )) {
            expect(text.style!.fontSize, infoText.fontSize);
            expect(text.style!.fontWeight, infoText.fontWeight);
            expect(text.style!.height, infoText.height);
          }
          for (final element
              in find
                  .descendant(of: finder, matching: find.byType(Text))
                  .evaluate()) {
            expect(
              DefaultTextStyle.of(element).style.fontFamily,
              Theme.of(element).textTheme.bodyMedium!.fontFamily,
            );
          }
        }
        expect(tester.takeException(), isNull);
        await tester.pumpWidget(const SizedBox.shrink());
      },
      variant: const TargetPlatformVariant({
        TargetPlatform.android,
        TargetPlatform.windows,
      }),
    );
  }

  testWidgets('金币紧邻国名，整块征兵并在出击时自动补兵，面板不暂停月份', (tester) async {
    final c = await _load(tester, const Size(375, 812), _RandomValue());
    final hero = c.selectedHero!;
    hero.squad[0].hp = 0;
    hero.squad[1].hp = 0;
    c.refreshUi();
    await tester.pump();
    final treasury = find.byKey(const ValueKey('city-treasury'));
    expect(find.text('金币 50'), findsOneWidget);
    expect(
      tester.getCenter(treasury).dy,
      closeTo(tester.getCenter(find.text('阿尔马国')).dy, 2),
    );
    expect(
      tester.getTopLeft(treasury).dx,
      greaterThan(tester.getBottomRight(find.text('阿尔马国')).dx),
    );
    for (final key in ['reinforce-hero', 'reserve-plus', 'reserve-minus']) {
      expect(find.byKey(ValueKey(key)), findsNothing);
    }
    for (final label in ['王牌', '召唤蛋', '最近记录', '守城部队']) {
      expect(find.text(label), findsNothing);
    }
    expect(find.text('城防等级'), findsOneWidget);
    final cards = [
      'city-upgrade',
      'buy-reserves',
      'draw-hero',
    ].map((key) => tester.getRect(find.byKey(ValueKey(key)))).toList();
    expect(cards[0].top, cards[1].top);
    expect(cards[1].top, cards[2].top);
    expect(cards[0].right, lessThan(cards[1].left));
    expect(cards[1].right, lessThan(cards[2].left));
    expect(
      cards[0].height,
      closeTo(
        tester.getSize(find.byKey(const ValueKey('city-stat-战斗'))).height,
        0.01,
      ),
    );
    expect(find.text('回收池'), findsNothing);
    expect(find.textContaining('内政 −'), findsNothing);
    expect(find.text('招募英雄'), findsOneWidget);
    expect(find.text('已满'), findsNothing);
    expect(
      tester.widget<Text>(find.byKey(const ValueKey('city-reserves'))).data,
      '10/16',
    );
    expect(
      tester.widget<Text>(find.byKey(const ValueKey('city-recruit-pool'))).data,
      endsWith('位'),
    );
    for (final key in ['city-upgrade', 'buy-reserves', 'draw-hero']) {
      final texts = tester
          .widgetList<Text>(
            find.descendant(
              of: find.byKey(ValueKey(key)),
              matching: find.byType(Text),
            ),
          )
          .toList();
      expect(texts[1].style!.fontSize, texts[2].style!.fontSize);
      expect(texts[1].style!.fontWeight, texts[2].style!.fontWeight);
    }
    expect(
      tester
          .widget<OutlinedButton>(find.byKey(const ValueKey('buy-reserves')))
          .onPressed,
      isNotNull,
    );
    expect(hero.soldiers, 0);
    expect(find.byKey(const ValueKey('city-stat-士兵')), findsNothing);
    expect(find.byKey(const ValueKey('hero-auto-reinforcement')), findsNothing);
    await _tap(tester, 'dispatch-confirm');
    expect(hero.soldiers, 0);
    c.confirmTarget(c.world.cities[1]);
    expect(hero.soldiers, 4);
    expect(c.campaign.cities[0]!.reserveSoldiers, 6);
    expect(c.campaign.gold, 50);
    c.campaign.camp(hero.id);
    c.openCity(c.world.cities[0]);
    await tester.pump();
    expect(
      find.descendant(
        of: find.byKey(const ValueKey('buy-reserves')),
        matching: find.text('10金币'),
      ),
      findsOneWidget,
    );
    final card = find.byKey(const ValueKey('buy-reserves'));
    await tester.ensureVisible(card);
    await tester.tapAt(tester.getTopLeft(card) + const Offset(14, 18));
    await tester.pump();
    expect(c.campaign.cities[0]!.reserveSoldiers, 16);
    expect(c.campaign.gold, 40);
    expect(find.text('已满'), findsOneWidget);
    await tester.pump(const Duration(seconds: 60));
    // 一位将领扎营满一分钟，额外支付三金币粮草。
    expect(find.text('1年2月 · 金币 41'), findsOneWidget);
    expect(find.byKey(const ValueKey('city-monthly-report')), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('征兵方块按当前金币显示能招募的人数', (tester) async {
    final c = await _load(
      tester,
      const Size(375, 812),
      _RandomValue(),
      startingGold: 90,
    );
    final hero = c.selectedHero!;
    c.campaign.upgradeCity(0, hero: hero);
    c.campaign.upgradeCity(0, hero: hero);
    expect(c.campaign.gold, 10);
    c.refreshUi();
    await tester.pump();
    // 花五金币抽英雄，余额不足十人时自动显示五人。
    await _tap(tester, 'draw-hero');
    expect(c.campaign.gold, 5);
    expect(
      find.descendant(
        of: find.byKey(const ValueKey('buy-reserves')),
        matching: find.text('5金币'),
      ),
      findsOneWidget,
    );
    await _tap(tester, 'buy-reserves');
    expect(c.campaign.cities[0]!.reserveSoldiers, 15);
    expect(c.campaign.gold, 0);
    expect(
      tester
          .widget<OutlinedButton>(find.byKey(const ValueKey('buy-reserves')))
          .onPressed,
      isNull,
    );
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
  });

  testWidgets('放弃后可继续抽满三次，关面板不重置，下月自动恢复', (tester) async {
    final c = await _load(tester, const Size(375, 812), _RandomValue());
    prepareRecruitmentCity(c.campaign, 0);
    c.refreshUi();
    await tester.pump();
    for (var attempt = 0; attempt < 3; attempt++) {
      await _tap(tester, 'draw-hero');
      await _tap(tester, 'decline-recruit');
      expect(
        tester
            .widget<OutlinedButton>(find.byKey(const ValueKey('draw-hero')))
            .onPressed,
        attempt < 2 ? isNotNull : isNull,
      );
    }
    final draw = find.byKey(const ValueKey('draw-hero'));
    expect(tester.widget<OutlinedButton>(draw).onPressed, isNull);
    expect(
      tester
          .widget<Text>(find.byKey(const ValueKey('city-recruit-quota')))
          .style!
          .color,
      const Color(0xffa7b5a4),
    );
    expect(
      find.descendant(of: draw, matching: find.text('5金币')),
      findsOneWidget,
    );
    await tester.tap(find.byTooltip('关闭城池信息'));
    await tester.pump();
    c.openCity(c.world.cities.first);
    await tester.pump();
    expect(tester.widget<OutlinedButton>(draw).onPressed, isNull);
    await tester.pump(const Duration(seconds: 60));
    expect(tester.widget<OutlinedButton>(draw).onPressed, isNotNull);
    expect(
      tester
          .widget<Text>(find.byKey(const ValueKey('city-recruit-quota')))
          .style!
          .color,
      const Color(0xffd6bd7c),
    );
    expect(
      find.descendant(of: draw, matching: find.text('5金币')),
      findsOneWidget,
    );
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
    expect(c.campaign.garrisonAt(0), isNotEmpty);
    // 自动经营已经验证；观战入口单独安排交战，避免其他随机行军抢先触发野战。
    c.campaigns[0] = CampaignState.fromRom(
      c.world,
      painter.assets.heroCatalog,
      aiEnabled: false,
    );
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
    expect(find.byKey(const ValueKey('unit-move')), findsNothing);
    expect(find.byKey(const ValueKey('unit-camp')), findsNothing);
    march.position = march.destination;
    c.tick(0.02);
    final battle = c.campaign.battles[target.id]!;
    c.watchBattle(battle);
    await tester.pump();
    expect(find.byKey(const ValueKey('battle-scene')), findsOneWidget);
    expect(find.byKey(const ValueKey('battle-canvas')), findsOneWidget);
    expect(
      battle.simulation.defenderCityLevel,
      c.campaign.cities[target.id]!.level,
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
      prepareRecruitmentCity(c.campaign, 0);
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
      final draw = find.byKey(const ValueKey('draw-hero'));
      expect(tester.widget<OutlinedButton>(draw).onPressed, isNull);
      expect(
        tester
            .widget<Text>(find.byKey(const ValueKey('city-recruit-quota')))
            .style!
            .color,
        const Color(0xffa7b5a4),
      );
      await tester.pump(const Duration(seconds: 60));
      expect(tester.widget<OutlinedButton>(draw).onPressed, isNotNull);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
