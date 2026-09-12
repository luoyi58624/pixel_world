import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

CampaignState fixture() => CampaignState.fromRom(
  WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 64,
      'height': 40,
      'tiles': List.filled(2560, 0),
      'cities': [
        for (final (id, x, units) in [
          (0, 2, [40, 0, 2]),
          (1, 55, [3, 4]),
        ])
          {
            'id': id,
            'x': x,
            'y': 2,
            'width': 1,
            'height': 1,
            'shape': [0],
            'initialOwnerId': id,
            'initialLevel': 1,
            'unitIds': units,
          },
      ],
    },
    [0],
  ),
  decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
  aiEnabled: false,
  startingGold: 1000,
);

HeroMarch send(
  CampaignState c,
  int id,
  GamePoint target, {
  bool stagger = false,
}) {
  final hero = c.heroes.firstWhere((h) => h.sourceId == id);
  return c.dispatchTo(
    hero,
    target,
    countryId: hero.countryId,
    staggerDeparture: stagger,
  )!;
}

void main() {
  test('多将自然抵达同一城池，进堡者不再占用外部通路', () {
    final c = fixture();
    addTearDown(c.dispose);
    final city = c.world.cities[1];
    final a = c.dispatch(c.heroes.firstWhere((h) => h.sourceId == 0), city)!;
    final b = c.dispatch(c.heroes.firstWhere((h) => h.sourceId == 2), city)!;
    for (var n = 0; n < 3600 && !c.battles.containsKey(1); n++) {
      c.advance(1 / 60);
    }
    expect(c.battles[1]?.isActive, isTrue);
    for (var n = 0; n < 600 && b.phase != MarchPhase.awaitingBattle; n++) {
      c.advance(1 / 60);
    }
    expect(a.phase, MarchPhase.fighting);
    expect(b.phase, MarchPhase.awaitingBattle);
    expect(b.waitingForTraffic, isFalse);
  });

  test('城池升级不把远处避让营地吸到城墙上', () {
    final c = fixture();
    addTearDown(c.dispose);
    final city = c.world.cities[1];
    final march = c.dispatch(
      c.heroes.firstWhere((h) => h.sourceId == 0),
      city,
    )!;
    march.position = const GamePoint(250, 200);
    march.camp();
    final before = march.position;
    expect(c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1), isTrue);
    expect(march.position, before);
    expect(march.phase, MarchPhase.camped);
  });

  test('同国错峰实际离城保持两秒，等待期间不显示、不走动', () {
    final c = fixture();
    addTearDown(c.dispose);
    final a = send(c, 0, const GamePoint(500, 40), stagger: true);
    final b = send(c, 2, const GamePoint(500, 40), stagger: true);
    final start = b.position;
    c.advance(1);
    expect(a.waitingForDeparture, isFalse);
    expect(b.waitingForDeparture, isTrue);
    expect(b.visibleOnMap, isFalse);
    expect(b.position, start);
    c.advance(1.1);
    expect(b.waitingForDeparture, isFalse);
    expect(b.position, isNot(start));
  });

  test('绕过同国扎营将领并继续朝原目标前进，全程不重叠', () {
    final c = fixture();
    addTearDown(c.dispose);
    final front = send(c, 0, const GamePoint(500, 200));
    front.position = const GamePoint(200, 200);
    front.camp();
    final rear = send(c, 2, const GamePoint(500, 200));
    rear.position = const GamePoint(140, 200);
    var detoured = false;
    for (var i = 0; i < 1600 && rear.position.dx < 250; i++) {
      c.advance(1 / 60);
      detoured |= (rear.position.dy - 200).abs() > 10;
      expect(
        (rear.position.dx - front.position.dx).abs() >= 16 - 1e-5 ||
            (rear.position.dy - front.position.dy).abs() >= 16 - 1e-5,
        isTrue,
      );
    }
    expect(detoured, isTrue);
    expect(rear.position.dx, greaterThan(250));
    expect(rear.destination, const GamePoint(500, 200));
    expect(front.phase, MarchPhase.camped);
  });

  test('目标被占用时自动扎营，通路清空后恢复原目标', () {
    final c = fixture();
    addTearDown(c.dispose);
    final front = send(c, 0, const GamePoint(200, 200));
    front.position = const GamePoint(200, 200);
    front.camp();
    final rear = send(c, 2, const GamePoint(200, 200));
    rear.position = const GamePoint(170, 200);
    c.advance(.1);
    expect(rear.phase, MarchPhase.camped);
    expect(rear.destination, const GamePoint(200, 200));
    expect(rear.position, const GamePoint(170, 200));
    front.position = const GamePoint(200, 250);
    c.advance(.1);
    expect(rear.phase, MarchPhase.marching);
    expect(rear.position.dx, greaterThan(170));
  });

  test('免费行军规则下主动扎营不扣金币，也不会自行解除', () {
    final c = fixture();
    addTearDown(c.dispose);
    final march = send(c, 0, const GamePoint(500, 200));
    march.camp();
    final gold = c.gold;
    c.advance(10);
    expect(c.gold, gold);
    expect(march.phase, MarchPhase.camped);
  });

  test('原出口被驻留部队占住时改从空闲墙面出城，不永久候发或重叠', () {
    final c = fixture();
    addTearDown(c.dispose);
    final blocker = send(c, 0, const GamePoint(500, 200));
    blocker.camp();
    final original = blocker.position;
    final pending = send(c, 2, const GamePoint(500, 200), stagger: true);
    expect(pending.waitingForDeparture, isTrue);
    c.advance(.1);
    expect(pending.waitingForDeparture, isFalse);
    expect(pending.visibleOnMap, isTrue);
    expect(pending.destination, const GamePoint(500, 200));
    expect(blocker.position, original);
    expect(
      (pending.position.dx - blocker.position.dx).abs() >= 16 ||
          (pending.position.dy - blocker.position.dy).abs() >= 16,
      isTrue,
    );
    for (var i = 0; i < 120; i++) {
      c.advance(1 / 60);
    }
    expect(pending.walkDistance, greaterThan(10));
  });

  test('绕过前方野战占位，不加入已有战斗且保留目标', () {
    final c = fixture();
    addTearDown(c.dispose);
    final front = send(c, 0, const GamePoint(500, 200));
    front.position = const GamePoint(200, 200);
    final enemy = send(c, 3, const GamePoint(100, 200));
    enemy.position = const GamePoint(212, 200);
    c.advance(1 / 60);
    expect(c.activeBattleForHero(front.hero.id), isNotNull);
    final rear = send(c, 2, const GamePoint(500, 200));
    rear.position = const GamePoint(170, 200);
    c.advance(.5);
    expect(rear.position.dy, isNot(200));
    expect(c.activeBattleForHero(rear.hero.id), isNull);
    expect(rear.destination, const GamePoint(500, 200));
  });
}
