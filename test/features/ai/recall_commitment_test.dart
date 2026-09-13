import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

import '../../support/national_ai_fixture.dart';

(CampaignState, HeroMarch, ArmyTask) _front({
  bool nearEnemy = true,
  bool campedEnemy = false,
  int gold = 20,
  int guardAttack = 3,
  int enemyAttack = 25,
}) {
  final c = nationalScenario(
    ai: false,
    gold: gold,
    level: 2,
    guards: [0, 18],
    reserves: 12,
    attackerCombat: enemyAttack,
    overrides: {
      0: {'combat': 60},
      18: {'combat': guardAttack},
    },
  );
  final march = c.dispatch(
    c.garrisonAt(1).first,
    c.world.cities[2],
    countryId: 1,
  )!;
  final home = c.cityBounds(c.world.cities[1]).center;
  final target = c.cityBounds(c.world.cities[2]).center;
  march.position = nearEnemy
      ? target - const GamePoint(50, 0)
      : home + const GamePoint(15, -60);
  final enemy = approaching(c, distance: 140);
  if (campedEnemy) c.camp(enemy.hero.id, countryId: 2);
  c.advance(1 / 60);
  final h = c.aiObservationFor(1).hero(march.hero.id)!;
  final task = ArmyTask(
    hero: h.id,
    role: 'expedition',
    city: 2,
    targetCountry: 2,
    deadlineTick: 99999,
    committedUntil: 600,
    points: [AiPoint(target.dx, target.dy)],
    expectedOrderRevision: h.orderRevision,
  );
  return (c, march, task);
}

void main() {
  test('兵临敌城，国境内扎营的敌军不触发召回或整备折返', () {
    final (c, march, task) = _front(campedEnemy: true, gold: 10);
    addTearDown(c.dispose);
    final plan = planFor(c, tasks: [task]);
    expect(
      plan.groups
          .expand((g) => g.actions)
          .where((a) => a.hero == march.hero.id),
      isEmpty,
      reason: plan.toJson().toString(),
    );
    expect(march.target?.id, 2);
    expect(
      march.siegeQueueOrder != null || march.phase == MarchPhase.fighting,
      isTrue,
    );
    expect(c.aiObservationFor(1).hero(march.hero.id)!.canMove, isFalse);
  });

  test('中途路点短暂停靠，有后续行军段时继续原远征', () {
    final (c, march, old) = _front(campedEnemy: true, gold: 200);
    addTearDown(c.dispose);
    march.position = const GamePoint(410, 180);
    c.camp(march.hero.id, countryId: 1);
    final task = ArmyTask(
      hero: old.hero,
      role: old.role,
      city: old.city,
      targetCountry: 2,
      deadlineTick: old.deadlineTick,
      committedUntil: 600,
      points: [const AiPoint(410, 180), ...old.points],
      expectedOrderRevision: c
          .aiObservationFor(1)
          .hero(old.hero)!
          .orderRevision,
    );
    final plan = planFor(c, tasks: [task]);
    expect(
      plan.groups
          .expand((g) => g.actions)
          .where((a) => a.hero == march.hero.id),
      isEmpty,
      reason: plan.toJson().toString(),
    );
  });

  test('已明确守不住，但远征赶不回来，仍保持攻城任务', () {
    final (c, march, task) = _front();
    addTearDown(c.dispose);
    final plan = planFor(c, tasks: [task]);
    expect(
      plan.groups.expand((g) => g.tasks).where((t) => t.hero == march.hero.id),
      isEmpty,
      reason: plan.toJson().toString(),
    );
  });

  test('本地无法补救且及时回援能解决险情，才允许改派远征', () {
    final (c, march, task) = _front(nearEnemy: false);
    addTearDown(c.dispose);
    final plan = planFor(c, tasks: [task]);
    final rescue = plan.groups
        .expand((g) => g.tasks)
        .where(
          (t) =>
              t.hero == march.hero.id &&
              ['rescue', 'intercept'].contains(t.role),
        );
    expect(rescue, isNotEmpty, reason: plan.toJson().toString());
    expect(rescue.length, 1);
  });

  test('本月一次升级仍挡不住来敌时，即使有钱也及时召回能救城的远征', () {
    final (c, march, task) = _front(nearEnemy: false, gold: 200);
    addTearDown(c.dispose);
    final plan = planFor(c, tasks: [task]);
    expect(
      plan.groups
          .expand((g) => g.tasks)
          .any((t) => t.hero == march.hero.id && t.role == 'rescue'),
      isTrue,
      reason: plan.toJson().toString(),
    );
  });

  test('现有守军加城防足以抵抗，邻近远征也不召回', () {
    final (c, march, task) = _front(
      nearEnemy: false,
      guardAttack: 40,
      enemyAttack: 8,
    );
    addTearDown(c.dispose);
    final plan = planFor(c, tasks: [task]);
    expect(
      plan.groups.expand((g) => g.tasks).where((t) => t.hero == march.hero.id),
      isEmpty,
      reason: plan.toJson().toString(),
    );
  });
}
