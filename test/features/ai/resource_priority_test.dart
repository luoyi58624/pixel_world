import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/coalition_fixture.dart';
import '../../support/national_ai_fixture.dart';

void main() {
  test('日常先补满补将，余钱升级后在同窗口补齐新增兵员容量', () {
    final c = nationalScenario(
      ai: false,
      gold: 1000,
      level: 1,
      reserves: 0,
      recruitment: true,
      // 本例验证采购顺序，弱守军确保存在可执行的进攻兵员需求。
      attackerCombat: 5,
    );
    addTearDown(c.dispose);
    final plan = coalitionPlan(c);
    final actions = plan.groups.expand((g) => g.actions).toList();
    final kinds = actions.map((a) => a.kind).toList();
    expect(kinds.first, AiActionKind.soldiers);
    expect(
      kinds,
      contains(AiActionKind.recruit),
      reason: plan.toJson().toString(),
    );
    expect(
      kinds,
      contains(AiActionKind.soldiers),
      reason: plan.toJson().toString(),
    );
    expect(
      kinds.indexOf(AiActionKind.recruit),
      greaterThan(kinds.indexOf(AiActionKind.soldiers)),
    );
    expect(
      kinds,
      contains(AiActionKind.upgrade),
      reason: plan.toJson().toString(),
    );
    expect(
      kinds.indexOf(AiActionKind.upgrade),
      greaterThan(kinds.indexOf(AiActionKind.recruit)),
    );
    expect(kinds.last, AiActionKind.soldiers);
  });

  test('跨城优先补空缺守将，不用后方扩军抢前线守城预算', () {
    final c = nationalScenario(
      ai: false,
      gold: 1000,
      level: 3,
      friendly: true,
      friendHeroes: [],
      reserves: 0,
      recruitment: true,
    );
    addTearDown(c.dispose);
    final plan = coalitionPlan(c);
    final recruits = plan.groups
        .expand((g) => g.actions)
        .where((a) => a.kind == AiActionKind.recruit)
        .toList();
    expect(recruits, isNotEmpty, reason: plan.toJson().toString());
    expect(recruits.first.city, 3);
  });

  test('余额不足时优先补兵，不将剩余零钱用于城防升级', () {
    final c = nationalScenario(
      ai: false,
      gold: 14,
      level: 1,
      guards: [0, 18],
      friendly: true,
      friendHeroes: [],
      reserves: 12,
      recruitment: true,
    )..settledMonths = 0;
    addTearDown(c.dispose);
    final plan = coalitionPlan(c);
    final actions = plan.groups.expand((g) => g.actions).toList();
    expect(
      actions.where((a) => a.kind == AiActionKind.upgrade),
      isEmpty,
      reason: plan.toJson().toString(),
    );
    expect(actions.where((a) => a.kind == AiActionKind.soldiers), isNotEmpty);
  });

  test('补兵可用最后余额但不能透支，不让招将升级抢钱', () {
    final c = nationalScenario(
      ai: false,
      gold: 1,
      level: 1,
      reserves: 0,
      recruitment: true,
    );
    addTearDown(c.dispose);
    final actions = coalitionPlan(c).groups.expand((g) => g.actions).toList();
    expect(actions, isNotEmpty);
    expect(actions.every((a) => a.kind == AiActionKind.soldiers), isTrue);
    expect(actions.first.amount, 1);
  });

  test('升级恰好花光国库时不通过，有余额才允许升级', () {
    final c = nationalScenario(ai: false, gold: 10, level: 1);
    addTearDown(c.dispose);
    final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    final routes = AiRoutes(
      c.aiMapForTesting(),
      rules,
      AiWorkBudget(rules.tuning),
    );
    final ledger = AiLedger(view, rules, routes), city = view.city(1)!;
    final governor = view.hero('rom-0')!;
    expect(rules.upgradeCost(1, governor.politics), 10);
    expect(ledger.upgrade(city, governor), isFalse);
    ledger.gold = 11;
    expect(ledger.upgrade(city, governor), isTrue);
    expect(ledger.gold, 1);
  });

  test('受防御策略影响的紧急升级可优先于日常招将', () {
    final c = nationalScenario(
      ai: false,
      gold: 1000,
      level: 1,
      reserves: 0,
      recruitment: true,
    );
    addTearDown(c.dispose);
    approaching(c, distance: 60);
    final plan = coalitionPlan(c);
    final kinds = plan.groups
        .expand((g) => g.actions)
        .map((a) => a.kind)
        .toList();
    expect(kinds.take(2), [
      AiActionKind.soldiers,
      AiActionKind.upgrade,
    ], reason: plan.toJson().toString());
  });

  test('零或负国库不限制无采购的出征、途中改令', () {
    final c = nationalScenario(ai: false, gold: 0, level: 3);
    addTearDown(c.dispose);
    final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
    final view = c.aiObservationFor(1);
    final request = AiRequest(
      session: 'free-march',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: view,
      seed: 1,
      deadlineTick: 99999,
    );
    final routes = AiRoutes(map, rules, AiWorkBudget(rules.tuning));
    final ledger = AiLedger(view, rules, routes)..gold = -10;
    final hero = view.hero('rom-0')!, target = view.city(2)!;
    final option = OperationPlanner(request, rules, routes).send(
      ledger,
      hero,
      routes.to(hero, target.center, view, target: target),
      role: 'expedition',
      reason: '验证免费行军',
      target: target,
    );
    expect(option, isNotNull);
    expect(option!.ledger.gold, -10);
    expect(option.group.tasks.single.gold, 0);
    expect(option.group.actions.map((a) => a.kind), [AiActionKind.dispatch]);

    final march = c.dispatchTo(
      c.garrisonAt(1).first,
      const GamePoint(700, 600),
      countryId: 1,
    )!;
    final movingView = c.aiObservationFor(1);
    final movingLedger = AiLedger(movingView, rules, routes)..gold = -10;
    expect(
      movingLedger.redirect(
        movingView.hero(march.hero.id)!,
        ArmyTask(
          hero: march.hero.id,
          role: 'regroup',
          deadlineTick: 99999,
          committedUntil: 0,
        ),
      ),
      isTrue,
    );
    expect(movingLedger.gold, -10);
  });
}
