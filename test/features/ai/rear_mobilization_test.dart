import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

import '../../support/national_ai_fixture.dart';

AiLedger _ledger(CampaignState c) {
  final rules = c.aiRulesForTesting();
  return AiLedger(
    c.aiObservationFor(1),
    rules,
    AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
  );
}

CountryPlan _plan(CampaignState c, AiDecisionStage stage) {
  final ledger = _ledger(c), rules = ledger.rules, map = ledger.routes.map;
  final brain = CountryBrain(
    rules,
    map,
    AiRequest(
      session: 'rear',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: ledger.view,
      deadlineTick: 6000,
      stage: stage,
    ),
  );
  for (final _ in brain.steps()) {}
  return brain.result!;
}

PlannedOperation? _moveToFront(CampaignState c) {
  final ledger = _ledger(c), view = ledger.view, rules = ledger.rules;
  final hero = view.garrison(1).first, front = view.city(3)!;
  final planner = OperationPlanner(
    AiRequest(
      session: 'rear',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: ledger.routes.map.version,
      observation: view,
      deadlineTick: 6000,
    ),
    rules,
    ledger.routes,
  );
  return planner.send(
    ledger,
    hero,
    ledger.routes.to(hero, front.center, view, target: front, safe: true),
    role: 'transfer',
    target: front,
    arrival: true,
    rearSafe: true,
    reason: '安全后方全部前移',
  );
}

void main() {
  test('后期后方主力直接进攻敌城，不因超过45秒路程而先转驻友城', () {
    final c = nationalScenario(
      ai: false,
      rearEmpire: true,
      hostileEmpire: true,
      guards: [0],
      friendHeroes: [18],
      gold: 2000,
      stock: {
        '1': {'14': 4},
      },
    );
    addTearDown(c.dispose);
    final ledger = _ledger(c), view = ledger.view, rules = ledger.rules;
    final hero = view.hero('rom-0')!, target = view.city(2)!;
    final planner = OperationPlanner(
      AiRequest(
        session: 'direct',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: ledger.routes.map.version,
        observation: view,
        deadlineTick: 6000,
      ),
      rules,
      ledger.routes,
    );
    final route = ledger.routes.to(hero, target.center, view, target: target);
    expect(route.seconds, greaterThan(rules.tuning.coalitionMaxTravelSeconds));
    expect(planner.canRaidFrom(hero, target), isTrue);
    expect(
      planner.send(
        ledger,
        hero,
        route,
        role: 'expedition',
        reason: '直接远征',
        target: target,
        gear: [14],
      ),
      isNotNull,
    );
    final plan = _plan(c, AiDecisionStage.full);
    final tasks = plan.groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == 'rom-0')
        .toList();
    expect(tasks, isNotEmpty, reason: plan.toJson().toString());
    expect(
      tasks.every(
        (t) => t.role == 'expedition' && view.city(t.city)!.country != 1,
      ),
      isTrue,
    );
  });

  test('常规补员集中目标附近，不在有闲钱的远方后城继续抽将', () {
    final c = nationalScenario(
      ai: false,
      rearEmpire: true,
      hostileEmpire: true,
      guards: [18],
      friendHeroes: [],
      recruitment: true,
      gold: 2000,
      level: 3,
    );
    addTearDown(c.dispose);
    final ledger = _ledger(c);
    final fronts = ledger.recruitmentFronts(
      ledger.view.cities.where((c) => c.country != 1),
    );
    expect(fronts, isNot(contains(1)));
    expect(fronts, contains(3));
    final plan = _plan(c, AiDecisionStage.resources);
    final recruit = plan.groups
        .expand((g) => g.actions)
        .where((a) => a.kind == AiActionKind.recruit)
        .toList();
    expect(
      recruit.map((a) => a.city),
      contains(3),
      reason: plan.toJson().toString(),
    );
    expect(recruit.every((a) => a.city != 1), isTrue);
  });

  test('远近部队不被强塞成同一轮攻队伍，能有效攻击的本地一波先出发', () {
    final c = nationalScenario(
      ai: false,
      rearEmpire: true,
      hostileEmpire: true,
      guards: [0],
      friendHeroes: [18, 3],
      gold: 2000,
      overrides: {
        3: {'combat': 25},
        4: {'combat': 25},
      },
    );
    addTearDown(c.dispose);
    final original = _ledger(c), rules = original.rules;
    final view = AiObservation.fromJson({
      ...original.view.toJson(),
      'cities': [
        for (final city in original.view.cities)
          {...city.toJson(), if (city.id == 2) 'level': 5},
      ],
      'heroes': [
        for (final h in original.view.heroes) h.toJson(),
        {
          ...original.view.hero('rom-2')!.toJson(),
          'id': 'second-guard',
          'o': 99,
        },
      ],
    });
    final ledger = AiLedger(view, rules, original.routes);
    final planner = OperationPlanner(
      AiRequest(
        session: 'waves',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: ledger.routes.map.version,
        observation: view,
        deadlineTick: 6000,
      ),
      rules,
      ledger.routes,
    );
    final target = view.city(2)!;
    // 三名强将分布很远，不能强行要求后方将领凑齐同一批次才准出发。
    expect(planner.raidTeamSize(1, target, ledger), 2);
    expect(
      planner.raidTeamSize(1, target, ledger, lead: view.hero('rom-0')),
      1,
    );
  });

  test('多城安全后方释放最后一名主力，前线仍保留守将', () {
    final c = nationalScenario(
      ai: false,
      rearEmpire: true,
      guards: [0],
      friendHeroes: [18],
      gold: 1000,
    );
    addTearDown(c.dispose);
    final ledger = _ledger(c);
    expect(ledger.safeRear(ledger.view.city(1)!), isTrue);
    expect(ledger.defendersToKeep(ledger.view.city(1)!), 0);
    expect(ledger.canSpareForOffense(ledger.view.hero('rom-0')!), isTrue);
    expect(ledger.safeRear(ledger.view.city(3)!), isFalse);
    expect(ledger.defendersToKeep(ledger.view.city(3)!), 1);
    expect(ledger.canSpareForOffense(ledger.view.hero('rom-18')!), isFalse);
    expect(_moveToFront(c), isNotNull);
  });

  test('只有一两座城时不能借安全后方规则派空最后守将', () {
    final c = nationalScenario(
      ai: false,
      friendly: true,
      guards: [0],
      gold: 1000,
    );
    addTearDown(c.dispose);
    expect(_ledger(c).defendersToKeep(_ledger(c).view.city(1)!), 1);
    expect(_moveToFront(c), isNull);
  });

  for (final invader in [false, true]) {
    test('执行前复查后方：${invader ? '敌军出现拒绝过时调动' : '允许真实派空而非只在规划中通过'}', () {
      final worker = ManualAiWorker();
      final c = nationalScenario(
        rearEmpire: true,
        guards: [0],
        gold: 1000,
        friendHeroes: [18],
        workerFactory: () => worker,
      );
      addTearDown(c.dispose);
      for (
        var n = 0;
        n < 120 && !worker.requests.any((r) => r.country == 1);
        n++
      ) {
        c.advance(1 / 60);
      }
      final request = worker.requests.lastWhere((r) => r.country == 1);
      final group = _moveToFront(c)!.group;
      if (invader) approaching(c, distance: 500);
      worker.replies.add(
        AiReply.forRequest(request, CountryPlan(groups: [group])),
      );
      c.advance(1 / 60);
      expect(
        c.garrisonAt(1).isEmpty,
        !invader,
        reason: c.aiDiagnostics.events.toString(),
      );
      expect(c.marches.containsKey('rom-0'), !invader);
      expect(c.aiDiagnostics.rejected, invader ? greaterThan(0) : 0);
    });
  }

  test('安全空城不招募也不把前线军队调回，威胁出现立即恢复招募', () {
    final c = nationalScenario(
      ai: false,
      rearEmpire: true,
      guards: [],
      level: 3,
      friendHeroes: [18, 19],
      gold: 1000,
      recruitment: true,
    );
    addTearDown(c.dispose);
    for (final stage in [AiDecisionStage.resources, AiDecisionStage.full]) {
      final plan = _plan(c, stage);
      expect(
        plan.groups
            .expand((g) => g.actions)
            .where((a) => a.kind == AiActionKind.recruit && a.city == 1),
        isEmpty,
      );
      expect(
        plan.groups
            .expand((g) => g.tasks)
            .where((t) => t.city == 1 && t.arrivalSlot),
        isEmpty,
      );
    }
    approaching(c, distance: 100);
    final ledger = _ledger(c);
    expect(ledger.safeRear(ledger.view.city(1)!), isFalse);
    final defense = _plan(c, AiDecisionStage.defense);
    expect(
      defense.groups
          .expand((g) => g.actions)
          .any((a) => a.kind == AiActionKind.recruit && a.city == 1),
      isTrue,
      reason: defense.toJson().toString(),
    );
  });

  test('安全后方也不把低攻击高内政将领当攻城或解雇耗材', () {
    final c = nationalScenario(
      ai: false,
      rearEmpire: true,
      guards: [0],
      overrides: {
        0: {'combat': 5, 'politics': 20},
      },
    );
    addTearDown(c.dispose);
    final ledger = _ledger(c), hero = ledger.view.hero('rom-0')!;
    expect(ledger.safeRear(ledger.view.city(1)!), isTrue);
    expect(ledger.canSpareForOffense(hero), isFalse);
    expect(ledger.dismiss(hero), isFalse);
    expect(_moveToFront(c), isNotNull, reason: '可沿安全路线转移去建设前线');
  });

  test('后期积蓄允许突破僵硬月俸比例扩军，资金不足则拒绝', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 18, 19],
      gold: 1000,
      level: 1,
      recruitment: true,
      overrides: {
        0: {'salary': 25},
        18: {'salary': 25},
        19: {'salary': 25},
      },
    );
    addTearDown(c.dispose);
    final ledger = _ledger(c), city = ledger.view.city(1)!;
    expect(ledger.recruit(city), isTrue);
    expect(ledger.gold, greaterThanOrEqualTo(ledger.cash().reserve));
    final poor = _ledger(c)..gold = 30;
    expect(poor.recruit(city), isFalse);
    expect(poor.gold, 30);
    c.settledMonths = 0;
    final opening = _ledger(c);
    expect(
      opening.recruit(opening.view.city(1)!),
      isFalse,
      reason: '开局平时不按后期扩军规则超额招募',
    );
  });

  test('后方敌军即使静止或向外走，也不能将它当作无威胁派空城', () {
    final c = nationalScenario(ai: false, rearEmpire: true, guards: [0]);
    addTearDown(c.dispose);
    final enemy = approaching(c, distance: 400);
    enemy.moveTo(enemy.position + const GamePoint(200, 0));
    final ledger = _ledger(c);
    expect(ledger.safeRear(ledger.view.city(1)!), isFalse);
    expect(_moveToFront(c), isNull);
  });
}
