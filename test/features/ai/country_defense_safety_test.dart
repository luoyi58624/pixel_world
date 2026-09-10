import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/ai/protocol.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('D01/D04 有钱可连续升级，先用城防解决迎战名额不足', () {
    final c = nationalScenario();
    addTearDown(c.dispose);
    approaching(c);
    final plan = planFor(c);
    expect(
      plan.groups
          .expand((g) => g.actions)
          .where((a) => a.kind == AiActionKind.upgrade),
      isNotEmpty,
    );
    advanceAi(c, .6);
    expect(c.cities[1]!.level, 3);
    expect(c.garrisonAt(1).length, lessThanOrEqualTo(3));
    expect(c.heroes.any((h) => h.sourceId == 0), isTrue);
  });
  test('D02/D03/D08 无资金时合法清理挡位者，留守偏好不覆盖一级城安全名额', () {
    final c = nationalScenario(
      gold: 0,
      overrides: {
        0: {'politics': 0},
        18: {'politics': 0},
        19: {'politics': 0},
      },
    );
    addTearDown(c.dispose);
    approaching(c, distance: 45);
    advanceAi(c, .2);
    expect(c.garrisonAt(1).length, lessThanOrEqualTo(c.cities[1]!.level));
    expect(c.heroes.any((h) => h.sourceId == 0), isTrue);
    expect(c.goldFor(1), greaterThanOrEqualTo(0));
    expect(c.marches.values.any((m) => m.hero.countryId == 1), isFalse);
  });
  test('D05 五级六将不升级到六级，执行合法名额修复', () {
    final c = nationalScenario(
      level: 5,
      guards: [0, 3, 4, 18, 19, 20],
      reserves: 24,
    );
    addTearDown(c.dispose);
    approaching(c, distance: 45);
    advanceAi(c, .2);
    expect(c.cities[1]!.level, 5);
    expect(c.garrisonAt(1).length, lessThanOrEqualTo(5));
  });
  test('D06/D07 本场名额取开场等级减胜轮，中途建筑三级不能增加一级场次名额', () {
    final c = nationalScenario(ai: false, level: 3);
    final attacker = approaching(c);
    final guard = c.garrisonAt(1).last;
    final battle = CityBattle(
      c.world.cities[1],
      attacker.hero,
      guard,
      cityLevel: 1,
      seed: 1,
    );
    c.battles[1] = battle;
    attacker.phase = MarchPhase.fighting;
    final city = c.aiObservationFor(1).city(1)!;
    expect(city.level, 3);
    expect(city.safeSlots, 1);
    final other = CityBattle(
      c.world.cities[1],
      attacker.hero,
      guard,
      cityLevel: 3,
      seed: 2,
    )..victories = 2;
    c.battles[1] = other;
    expect(c.aiObservationFor(1).city(1)!.safeSlots, 1);
    expect(c.aiObservationFor(1).hero(guard.id)!.canDispatch, isFalse);
    expect(c.aiObservationFor(1).hero(guard.id)!.canDismiss, isFalse);
  });
  test('D09 AI 不在安全名额已满的城市招募；玩家原招募规则不变', () {
    final c = nationalScenario(
      level: 1,
      guards: [0],
      reserves: 4,
      recruitment: true,
    );
    addTearDown(c.dispose);
    approaching(c);
    expect(
      planFor(c).groups
          .expand((g) => g.actions)
          .any((a) => a.kind == AiActionKind.recruit),
      isFalse,
    );
    expect(c.recruitmentBlockReason(1, countryId: 1), isNull);
    expect(c.recruitmentBlockReason(0), isNull);
  });
}
