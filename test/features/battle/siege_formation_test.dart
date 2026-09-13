import 'dart:math' as math;
import 'dart:io';
import 'dart:convert';

import 'package:json5/json5.dart';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/core/geometry/siege_rings.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/cities/domain/city_contact.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/geometry.dart';

import '../../support/assault_fixture.dart';
import '../../support/national_ai_fixture.dart' show ManualAiWorker;

CampaignState _pairCampaign() {
  final template = assaultCampaign(sourceHeroes: [0, 2], targetHeroes: [7, 8]);
  final world = template.world;
  template.dispose();
  return CampaignState.fromRom(
    world,
    decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
    aiEnabled: false,
    startingGold: 1000,
  );
}

CampaignState _crowd() {
  final template = assaultCampaign(
    sourceHeroes: List.generate(38, (i) => i),
    targetHeroes: [38, 39],
  );
  final world = template.world;
  template.dispose();
  final data = json5Decode(File('assets/data/heroes.json5').readAsStringSync());
  for (final h in data['heroes'] as List) {
    h['maxHp'] = 255;
    h['combat'] = 10;
    h['salary'] = 0;
  }
  final c = CampaignState.fromRom(
    world,
    decodeRomHeroes(jsonEncode(data)),
    aiEnabled: false,
    startingGold: 1000,
  );
  c.settledMonths = 36;
  return c;
}

({HeroMarch attacker, List<HeroMarch> waiting, SiegeRings rings}) _surround(
  CampaignState c,
) {
  final city = c.world.cities[2], bounds = c.cityBounds(c.world.cities[2]);
  final contact = CityContact.forAppearance(
    city.appearanceAt(c.cities[2]!.level),
  );
  final rings = SiegeRings(
    contact.outline.fold<double>(
      0,
      (r, p) => math.max(r, (bounds.topLeft + p - bounds.center).distance),
    ),
  );
  final attacker = c.dispatch(scenarioHero(c, 0), city, countryId: 1)!;
  attacker.position = attacker.destination;
  c.advance(1 / 60);
  expect(attacker.phase, MarchPhase.fighting);
  final waiting = <HeroMarch>[];
  for (var i = 1; i < 38; i++) {
    final m = c.dispatch(scenarioHero(c, i), city, countryId: 1)!;
    // 多支部队从同一侧陆续到达，实际步行绕城展开，不能直接摆到圆环上。
    m.position =
        bounds.center + GamePoint(-125 - (i % 10) * 24, (i ~/ 10 - 1.5) * 26);
    m.moveTo(m.destination, city: city);
    waiting.add(m);
  }
  return (attacker: attacker, waiting: waiting, rings: rings);
}

void _advance(
  CampaignState c,
  double seconds, {
  void Function()? check,
  bool keepBattleAlive = false,
}) {
  for (var i = 0; i < seconds * 60; i++) {
    if (keepBattleAlive) {
      for (final b in c.battles.values.where((b) => b.isActive)) {
        b.attacker.hp = b.attacker.maxHp;
        b.defender.hp = b.defender.maxHp;
      }
    }
    c.advance(1 / 60);
    check?.call();
  }
}

void main() {
  for (final hasTarget in [false, true]) {
    test('外圈集结完成即纳入队列并向内补位，不能因距离内圈太远永远扎营：$hasTarget', () {
      final c = _pairCampaign();
      addTearDown(c.dispose);
      final city = c.world.cities[2],
          center = c.cityBounds(c.world.cities[2]).center;
      final first = c.dispatch(scenarioHero(c, 0), city, countryId: 1)!;
      first.position = first.destination;
      c.advance(1 / 60);
      final point = center + const GamePoint(-160, 0);
      final second = c.dispatchTo(scenarioHero(c, 2), point, countryId: 1)!;
      second.position = point;
      second.camp();
      if (hasTarget) second.target = city;
      final saved = c.saveState();
      saved['aiEnabled'] = true;
      saved['ai'] = {
        'tasks': {
          second.hero.id: ArmyTask(
            hero: second.hero.id,
            role: 'staging',
            city: city.id,
            targetCountry: 2,
            points: [AiPoint(point.dx, point.dy)],
            deadlineTick: 999999,
            committedUntil: 0,
            expectedOrderRevision: c
                .aiObservationFor(1)
                .hero(second.hero.id)!
                .orderRevision,
          ).toJson(),
        },
        'owners': {second.hero.id: 1},
        'decisions': <String, String>{},
        'names': <String, String>{},
        'idle': {},
        'seeds': {},
        'threats': {},
        'changedOwners': {},
        'schedules': {},
      };
      final restored = CampaignSnapshots.restore(
        saved,
        c.world,
        decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
        aiWorkerFactory: ManualAiWorker.new,
      );
      addTearDown(restored.dispose);
      restored.advance(1 / 60);
      final copy = restored.marches[second.hero.id]!;
      expect(copy.siegeQueueOrder, isNotNull);
      expect(copy.siegeRing, 0);
      expect(copy.phase, MarchPhase.marching);
      expect(copy.destination.dx, greaterThan(point.dx));
      _advance(restored, 10);
      expect((copy.position - copy.destination).distance, lessThan(1));
    });
  }

  test('两将从原城正常行军，第二将就近候战，不绕到敌城另一侧', () {
    final c = _pairCampaign();
    addTearDown(c.dispose);
    final city = c.world.cities[2],
        center = c.cityBounds(c.world.cities[2]).center;
    final first = c.dispatch(scenarioHero(c, 0), city, countryId: 1)!;
    _advance(c, 2);
    final second = c.dispatch(scenarioHero(c, 2), city, countryId: 1)!;
    var waited = false, reached = false;
    for (var i = 0; i < 60 * 60; i++) {
      final before = second.position;
      c.advance(1 / 60);
      if (!second.waitingForSiegePosition) continue;
      if (!waited) {
        waited = true;
        expect(first.target, city);
        expect(second.destination.dx, lessThan(center.dx));
        expect((second.destination - before).distance, lessThan(40));
      }
      if ((second.position - second.destination).distance < 1) {
        reached = true;
        break;
      }
    }
    expect(waited, isTrue);
    expect(reached, isTrue);
  });

  test('各方向来的单名候战者均选身边空位，旧存档重新排位但保留先后顺序', () {
    for (final direction in [
      const GamePoint(-1, 0),
      const GamePoint(0, -1),
      const GamePoint(1, 0),
      const GamePoint(0, 1),
    ]) {
      final c = _pairCampaign();
      addTearDown(c.dispose);
      final city = c.world.cities[2], bounds = c.cityBounds(c.world.cities[2]);
      final first = c.dispatch(scenarioHero(c, 0), city, countryId: 1)!;
      first.position = first.destination;
      c.advance(1 / 60);
      final second = c.dispatch(scenarioHero(c, 2), city, countryId: 1)!;
      second.position = bounds.center + direction * 80;
      c.advance(1 / 60);
      expect(second.waitingForSiegePosition, isTrue);
      final offset = second.destination - bounds.center;
      expect(
        offset.dx * direction.dx + offset.dy * direction.dy,
        greaterThan(0),
      );
      expect((second.destination - second.position).distance, lessThan(40));
      final saved = c.saveState()..remove('siegeFormationVersion');
      final marches = saved['marches'] as List;
      final waiting = marches.firstWhere((m) => m['arrival'] != null);
      waiting['siegeSlot'] = [0, 0];
      final restored = CampaignSnapshots.restore(
        saved,
        c.world,
        decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
      );
      addTearDown(restored.dispose);
      restored.advance(1 / 60);
      final copy = restored.marches[second.hero.id]!;
      expect(copy.siegeQueueOrder, second.siegeQueueOrder);
      expect(copy.destination, second.destination);
    }
  });

  test('同侧大军步行围成多圈，完整包围才禁撤退，缺口由最近外圈补齐', () {
    final c = _crowd();
    addTearDown(c.dispose);
    final group = _surround(c), city = c.world.cities[2];
    final contact = CityContact.forAppearance(
      city.appearanceAt(c.cities[2]!.level),
    );
    final origin = c.cityBounds(city).topLeft;
    expect(c.isCityEncircled(2, countryId: 1), isFalse);
    _advance(
      c,
      180,
      keepBattleAlive: true,
      check: () {
        final visible = c.marches.values.where((m) => m.visibleOnMap).toList();
        for (final m in visible.where((m) => m.waitingForSiegePosition)) {
          expect(
            contact.contains(m.position - origin),
            isFalse,
            reason: '${m.hero.id}围城换位不能穿城',
          );
        }
        for (var i = 0; i < visible.length; i++) {
          for (var j = i + 1; j < visible.length; j++) {
            final d = visible[i].position - visible[j].position;
            expect(
              d.dx.abs() >= 16 - 1e-6 || d.dy.abs() >= 16 - 1e-6,
              isTrue,
              reason: '${visible[i].hero.id}与${visible[j].hero.id}不能重叠',
            );
          }
        }
      },
    );
    expect(c.isCityEncircled(2, countryId: 1), isTrue);
    expect(
      c.aiObservationFor(1).hero(group.attacker.hero.id)!.canRetreat,
      isFalse,
    );
    expect(
      group.waiting.where((m) => m.siegeRing == 0).length,
      group.rings.slots(0),
    );
    expect(group.waiting.any((m) => m.siegeRing == 2), isTrue);
    expect(
      c.retreatBlockReason(group.attacker.hero.id, countryId: 1),
      contains('完整包围'),
    );
    expect(c.retreatHero(group.attacker.hero.id, countryId: 1), isNull);

    final removed = group.waiting.firstWhere((m) => m.siegeRing == 0);
    expect(
      c.isCityEncircled(2, countryId: 0),
      isFalse,
      reason: '其他国家的包围不能当成本国的包围',
    );
    final hole = removed.destination, holeIndex = removed.siegeSlotIndex;
    final nextRing = group.waiting.where((m) => m.siegeRing == 1).toList()
      ..sort(
        (a, b) => (a.position - hole).distanceSquared.compareTo(
          (b.position - hole).distanceSquared,
        ),
      );
    final nearest = nextRing.first;
    // 一名围城者失去战斗力，实到位置与预定位置之间必须有真实补位过程。
    removed.hero.hp = 0;
    expect(c.isCityEncircled(2, countryId: 1), isFalse);
    expect(c.retreatBlockReason(group.attacker.hero.id, countryId: 1), isNull);
    final before = nearest.position;
    c.advance(1 / 60);
    expect(nearest.siegeRing, 0);
    expect(nearest.siegeSlotIndex, holeIndex);
    expect(nearest.position, before);
    expect(nearest.destination, hole);
    _advance(c, 20, keepBattleAlive: true);
    expect(c.isCityEncircled(2, countryId: 1), isTrue);
  });

  test('多圈站位与先后顺序读档保留，进场后外圈逐层补位', () {
    final c = _crowd();
    addTearDown(c.dispose);
    final group = _surround(c);
    _advance(c, 180, keepBattleAlive: true);
    final data = c.saveState();
    final restored = CampaignSnapshots.restore(
      data,
      c.world,
      decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
    );
    addTearDown(restored.dispose);
    expect(restored.isCityEncircled(2, countryId: 1), isTrue);
    for (final m in group.waiting) {
      final copy = restored.marches[m.hero.id]!;
      expect(
        (copy.siegeRing, copy.siegeSlotIndex, copy.siegeQueueOrder),
        (m.siegeRing, m.siegeSlotIndex, m.siegeQueueOrder),
      );
    }
    final order =
        restored.marches.values.where((m) => m.siegeQueueOrder != null).toList()
          ..sort((a, b) => a.siegeQueueOrder!.compareTo(b.siegeQueueOrder!));
    final oldest = order.first;
    restored.battles[2]!.attacker.hp = 0;
    _advance(restored, 20);
    expect(restored.battles[2]!.attacker, oldest.hero);
    expect(restored.battles[2]!.isActive, isTrue);
    expect(
      restored.marches.values.where((m) => m.siegeRing == 0).length,
      group.rings.slots(0),
    );
    // 解除测试用的生命维持，让多圈军队按实际战斗结果连续接战直至占城。
    for (
      var n = 0;
      n < 600 * 60 && restored.cities[2]!.ownerCountryId != 1;
      n++
    ) {
      restored.advance(1 / 60);
    }
    expect(restored.cities[2]!.ownerCountryId, 1);
    expect(restored.isCityEncircled(2, countryId: 1), isFalse);
  });
}
