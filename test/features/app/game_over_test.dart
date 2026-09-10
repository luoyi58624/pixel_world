import 'package:pixel_world/core/geometry/geometry.dart';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

import '../../support/fixed_siege_random.dart';

CampaignState _campaign() => CampaignState.fromRom(
  aiEnabled: false,
  siegeRandom: const FixedSiegeRandom(),
  decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()).first,
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
  startingGold: 10000,
);

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

void _makeVulnerable(CampaignHero hero) {
  hero.hp = 1;
  for (final soldier in hero.squad) {
    soldier.hp = 0;
  }
}

void _fightUntilRemoved(CampaignState c, CampaignHero hero) {
  final march = c.dispatch(hero, c.world.cities[1])!;
  march.position = march.destination;
  for (var i = 0; i < 1200 && c.heroes.contains(hero); i++) {
    c.advance(1 / 60);
  }
  expect(c.heroes, isNot(contains(hero)));
}

Future<WorldController> _load(WidgetTester tester, Size size) async {
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
  expect(
    canvas,
    findsOneWidget,
    reason: tester
        .widgetList<Text>(find.byType(Text))
        .map((text) => text.data)
        .join('\n'),
  );
  return (tester.widget<CustomPaint>(canvas).painter! as WorldPainter)
      .controller;
}

void main() {
  test('普通英雄真实进攻失败只损失出征者，一至三级出发城均不降级或减产', () {
    for (final level in [1, 2, 3]) {
      final c = _campaign();
      while (c.cities[0]!.level < level) {
        c.upgradeCity(0, hero: c.garrisonAt(0).first);
      }
      final attacker = _hero(c, 0);
      _makeVulnerable(attacker);
      final remainingIds = c.heroes
          .where((hero) => hero != attacker)
          .map((hero) => hero.id)
          .toList();
      final income = c.cities[0]!.income;
      _fightUntilRemoved(c, attacker);
      expect(c.cities[0]!.level, level);
      expect(c.cities[0]!.income, income);
      expect(c.cities[0]!.ownerCountryId, 0);
      expect(c.heroes.map((hero) => hero.id), remainingIds);
      expect(c.marches.containsKey(attacker.id), isFalse);
      expect(c.defeated, isFalse);
      expect(c.canDispatch(_hero(c, 2)), isTrue);
    }
  });

  test('进攻英雄不能被错误标记成出发城守将', () {
    final c = _campaign();
    final attacker = _hero(c, 0);
    c.dispatch(attacker, c.world.cities[1]);
    expect(
      c.defeatHero(attacker.id, winnerCountryId: 1, defendedCityId: 0),
      isNull,
    );
    expect(attacker.health.alive, isTrue);
    expect(c.cities[0]!.ownerCountryId, 0);
  });

  test('主角死亡即结束，即使仍有多座城、驻军和其他行军部队', () {
    final c = _campaign();
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    c.cities[2]!.ownerCountryId = 0;
    final other = c.dispatchTo(_hero(c, 0), const GamePoint(16, 900))!;
    final protagonist = _hero(c, 40);
    _makeVulnerable(protagonist);
    _fightUntilRemoved(c, protagonist);
    expect(c.defeatReason, CampaignDefeatReason.protagonistFallen);
    expect(c.cities.values.where((city) => city.isPlayer).length, 2);
    expect(c.cities[0]!.level, 2);
    final stoppedAt = other.position;
    final gold = c.gold;
    final turn = c.settledTurns;
    final journal = c.journal.toList();
    final battleTime = c.battles[1]!.simulation.elapsed;
    c.advance(300);
    expect(other.position, stoppedAt);
    expect(c.gold, gold);
    expect(c.settledTurns, turn);
    expect(c.journal, journal);
    expect(c.battles[1]!.simulation.elapsed, battleTime);
    expect(c.moveTo(other.hero.id, const GamePoint(200, 200)), isFalse);
    expect(c.camp(other.hero.id), isFalse);
    expect(c.upgradeCity(0, hero: c.garrisonAt(0).first), isFalse);
    expect(c.dispatch(_hero(c, 2), c.world.cities[1]), isNull);
  });

  test('最后一城失守清除在外行军主角，不能继续移动', () {
    final c = _campaign();
    final protagonist = _hero(c, 40);
    final march = c.dispatchTo(protagonist, const GamePoint(16, 900))!;
    c.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
    expect(protagonist.health.alive, isFalse);
    expect(c.marches.containsKey(protagonist.id), isFalse);
    expect(c.defeatReason, CampaignDefeatReason.protagonistFallen);
    final position = march.position;
    c.advance(30);
    expect(march.position, position);
    expect(c.cities.values.any((city) => city.isPlayer), isFalse);
  });

  test('未出征也会判无城失败；结束后恢复城池数据不能悄悄复活本局', () {
    final c = _campaign();
    expect(c.hasDispatched, isFalse);
    c.cities[0]!.ownerCountryId = 1;
    expect(c.advance(0), isTrue);
    expect(c.defeatReason, CampaignDefeatReason.noCities);
    c.cities[0]!.ownerCountryId = 0;
    expect(c.defeated, isTrue);
    expect(c.canDispatch(_hero(c, 40)), isFalse);
  });

  test('主角守城阵亡，单场结束命中降级后结束本局', () {
    final c = _campaign();
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    final result = c.defeatHero(
      'rom-40',
      winnerCountryId: 1,
      defendedCityId: 0,
    )!;
    expect(result.newLevel, 1);
    expect(result.captured, isFalse);
    expect(c.defeatReason, CampaignDefeatReason.protagonistFallen);
    expect(c.heroesAt(0).map((hero) => hero.sourceId), [0, 2]);
  });

  test('同轮双方阵亡分别结算，未取得胜轮不造成城防降级', () {
    final c = _campaign();
    final attacker = _hero(c, 0);
    final defender = c.garrisonAt(1).last;
    _makeVulnerable(attacker);
    _makeVulnerable(defender);
    _fightUntilRemoved(c, attacker);
    expect(c.heroes, isNot(contains(defender)));
    expect(c.cities[0]!.level, 1);
    expect(c.cities[0]!.isPlayer, isTrue);
    expect(c.cities[1]!.level, 2);
    expect(c.cities[1]!.isPlayer, isFalse);
    expect(c.battles[1]!.outcome, '双方将领阵亡');
    expect(c.defeated, isFalse);
  });

  for (final reason in CampaignDefeatReason.values) {
    testWidgets('结束面板显示${reason.label}，阻止旧指令和切图，重开恢复本局', (tester) async {
      final c = await _load(
        tester,
        reason == CampaignDefeatReason.noCities
            ? const Size(375, 500)
            : const Size(1000, 700),
      );
      final previous = c.campaign;
      if (reason == CampaignDefeatReason.protagonistFallen) {
        previous.defeatHero('rom-40', winnerCountryId: 1);
      } else {
        previous.cities[0]!.ownerCountryId = 1;
      }
      c.tick(0.02);
      await tester.pump();
      expect(find.byKey(const ValueKey('game-over-panel')), findsOneWidget);
      expect(find.text('游戏结束'), findsOneWidget);
      expect(find.text(reason.label), findsOneWidget);
      final gold = previous.gold;
      await tester.sendKeyEvent(LogicalKeyboardKey.escape);
      await tester.sendKeyEvent(LogicalKeyboardKey.digit2);
      c.switchWorld(1);
      expect(c.index, 0);
      expect(c.campaign, same(previous));
      await tester.pump(const Duration(seconds: 60));
      expect(previous.gold, gold);
      expect(find.byKey(const ValueKey('game-over-panel')), findsOneWidget);
      await tester.tap(find.byKey(const ValueKey('game-restart')));
      await tester.pump();
      expect(find.byKey(const ValueKey('game-over-panel')), findsNothing);
      expect(c.campaign, isNot(same(previous)));
      expect(c.campaign.defeated, isFalse);
      expect(c.campaign.gold, 50);
      expect(c.campaign.cities[0]!.isPlayer, isTrue);
      expect(
        c.campaign.heroes.firstWhere((hero) => hero.sourceId == 40).hp,
        99,
      );
      expect(c.campaign.battles, isEmpty);
      expect(c.campaign.marches, isEmpty);
      expect(tester.takeException(), isNull);
      await tester.pumpWidget(const SizedBox.shrink());
    });
  }
}
