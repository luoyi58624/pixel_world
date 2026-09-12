import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/cities/domain/city_contact.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';

import '../../support/national_ai_fixture.dart';
import '../../support/fixed_siege_random.dart';

void _assign(CampaignState c, ManualAiWorker worker, AiCommandGroup group) {
  for (var n = 0; n < 120 && !worker.requests.any((r) => r.country == 1); n++) {
    c.advance(1 / 60);
  }
  final request = worker.requests.lastWhere((r) => r.country == 1);
  worker.replies.add(AiReply.forRequest(request, CountryPlan(groups: [group])));
  c.advance(1 / 60);
  expect(c.aiDiagnostics.rejected, 0);
}

PlannedOperation? _transfer(CampaignState c) {
  final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
  final routes = AiRoutes(
    c.aiMapForTesting(),
    rules,
    AiWorkBudget(rules.tuning),
  );
  final request = AiRequest(
    session: 'test',
    id: 1,
    rulesVersion: rules.version,
    mapVersion: routes.map.version,
    observation: view,
    deadlineTick: 6000,
  );
  final hero = view.hero(c.garrisonAt(1).first.id)!, city = view.city(3)!;
  return OperationPlanner(request, rules, routes).send(
    AiLedger(view, rules, routes),
    hero,
    routes.to(hero, city.center, view, target: city, safe: true),
    role: 'transfer',
    reason: '前沿临时整备',
    target: city,
    arrival: true,
    rearSafe: true,
  );
}

List<GameEvent> _recoveries(CampaignState c, String hero) => c.events
    .forCountry(1)
    .query()
    .where((e) => e.heroId == hero && e.summary.contains('启动行军恢复'))
    .toList();

void main() {
  test('撤退返程到满员战城等待，不强行入城挤掉下一场守军', () {
    final c = nationalScenario(
      workerFactory: ManualAiWorker.new,
      gold: 1000,
      guards: [0, 18],
      level: 1,
      retreatRandom: const FixedSiegeRandom(.99),
    );
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    final march = c.dispatch(hero, c.world.cities[2], countryId: 1)!;
    march.position = march.destination;
    c.advance(1 / 60);
    final original = c.battles[2]!;
    expect(c.retreatHero(hero.id, countryId: 1), isTrue);
    for (var n = 0; n < 600 && original.isActive; n++) {
      c.advance(1 / 60);
    }
    expect(march.returningFromRetreat, isTrue);
    final invader = c.dispatch(
      c.garrisonAt(2).first,
      c.world.cities[1],
      countryId: 2,
    )!;
    invader.position = invader.destination;
    c.advance(1 / 60);
    final defense = c.battles[1]!;
    march.position = c.cityBounds(c.world.cities[1]).center;
    march.moveTo(march.position, city: c.world.cities[1]);
    c.advance(.1);
    expect(c.marches[hero.id], same(march));
    expect(march.phase, MarchPhase.awaitingBattle);
    expect(march.returningFromRetreat, isTrue);
    expect(c.garrisonAt(1), [defense.defender]);
    defense.attacker.hp = 0;
    for (var n = 0; n < 1200 && c.marches.containsKey(hero.id); n++) {
      c.advance(1 / 60);
    }
    expect(c.garrisonAt(1), contains(hero));
    expect(c.garrisonAt(1), contains(defense.defender));
  });

  test('出发城正在交战不阻止伤员转入另一座安全友城', () {
    final c = nationalScenario(
      ai: false,
      level: 1,
      guards: [0, 18],
      gold: 500,
      friendly: true,
      friendHeroes: [19],
    );
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    final march = c.dispatchTo(hero, const GamePoint(400, 500), countryId: 1)!;
    march.position = const GamePoint(400, 500);
    march.camp();
    hero.hp = hero.maxHp * .4;
    approaching(c, distance: 0);
    c.advance(1 / 60);
    expect(c.battles[1]?.isActive, isTrue);
    final plan = planFor(c);
    final task = plan.groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == hero.id)
        .singleOrNull;
    expect(task?.role, 'regroup', reason: plan.toJson().toString());
    expect(task?.city, 3);
  });

  test('确无安全行动时明确待命，局势解除后立即重新评估回城', () {
    final c = nationalScenario(ai: false, level: 1, guards: [0, 18], gold: 500);
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    final march = c.dispatchTo(hero, const GamePoint(400, 500), countryId: 1)!;
    march.position = const GamePoint(400, 500);
    march.camp();
    hero.hp = hero.maxHp * .4;
    final enemy = approaching(c, distance: 0);
    c.advance(1 / 60);
    final waiting = planFor(c);
    final standby = waiting.groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == hero.id)
        .single;
    expect(standby.role, 'standby');
    expect(standby.reason, contains('继续复查'));
    final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    final routes = AiRoutes(
      c.aiMapForTesting(),
      rules,
      AiWorkBudget(rules.tuning),
    );
    expect(
      AiLedger(view, rules, routes, tasks: [standby]).cash().reserve,
      AiLedger(view, rules, routes).cash().reserve,
      reason: '待命与其他行军状态采用相同的月俸预算',
    );
    c.battles[1]!.outcome = '测试威胁解除';
    c.battles[1]!.simulation.stop();
    enemy.position = const GamePoint(1600, 900);
    enemy.camp();
    final resumed = planFor(c, tasks: [standby]);
    final task = resumed.groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == hero.id)
        .single;
    expect(task.role, 'regroup', reason: resumed.toJson().toString());
    expect(task.city, 1);
  });

  test('过期入城预约不能从实际占用里减掉一人而放行满员城', () {
    final c = nationalScenario(ai: false, level: 1, guards: [0, 18], gold: 500);
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    c.dispatchTo(hero, const GamePoint(400, 500), countryId: 1)!.camp();
    final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    final routes = AiRoutes(
      c.aiMapForTesting(),
      rules,
      AiWorkBudget(rules.tuning),
    );
    final task = ArmyTask(
      hero: hero.id,
      role: 'regroup',
      city: 1,
      deadlineTick: -1,
      committedUntil: -1,
      arrivalSlot: true,
      points: [view.city(1)!.center],
    );
    final request = AiRequest(
      session: 'expired-slot',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: routes.map.version,
      observation: view,
      deadlineTick: 600,
    );
    final city = view.city(1)!, h = view.hero(hero.id)!;
    final result = OperationPlanner(request, rules, routes).send(
      AiLedger(view, rules, routes, tasks: [task]),
      h,
      routes.to(h, city.center, view, target: city),
      role: 'regroup',
      reason: '检查过期预约',
      target: city,
      arrival: true,
      emergency: true,
    );
    expect(result, isNull);
  });

  test('无任务野外将领不能回满员战城时，改攻有能力攻取的敌城', () {
    final c = nationalScenario(ai: false, level: 1, guards: [0, 18], gold: 500);
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    final march = c.dispatchTo(hero, const GamePoint(400, 500), countryId: 1)!;
    march.position = const GamePoint(400, 500);
    march.camp();
    final enemy = approaching(c, distance: 0);
    enemy.position = c.cityBounds(c.world.cities[1]).center;
    c.advance(1 / 60);
    expect(c.battles[1]?.isActive, isTrue);
    final plan = planFor(c);
    final task = plan.groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == hero.id)
        .singleOrNull;
    expect(task?.role, 'expedition', reason: plan.toJson().toString());
    expect(task?.city, 2);
    expect(
      plan.groups
          .expand((g) => g.actions)
          .where((a) => a.hero == hero.id)
          .single
          .kind,
      AiActionKind.move,
    );
  });

  test('已在敌城接触轮廓内直接开战，不在贴墙与城池拦截间死循环', () {
    final c = nationalScenario(ai: false);
    addTearDown(c.dispose);
    final city = c.world.cities[2], hero = c.garrisonAt(1).first;
    final march = c.dispatch(hero, city, countryId: 1)!;
    final rect = c.cityBounds(city);
    final contact = CityContact.forAppearance(
      city.appearanceAt(c.cities[2]!.level),
    );
    final inside = rect.center;
    expect(contact.contains(inside - rect.topLeft), isTrue);
    expect(
      (contact.nearest(inside - rect.topLeft) - (inside - rect.topLeft))
          .distance,
      greaterThan(1),
    );
    march.position = inside;
    march.moveTo(inside, city: city);
    c.advance(1 / 60);
    expect(c.battles[2]?.attacker, same(hero));
    expect(march.phase, MarchPhase.fighting);
  });

  test('已在友城接触轮廓内直接入城，不要求额外向外走一段', () {
    final c = nationalScenario(ai: false, friendly: true);
    addTearDown(c.dispose);
    final city = c.world.cities[3], hero = c.garrisonAt(1).first;
    final march = c.dispatch(hero, city, countryId: 1)!;
    march.position = c.cityBounds(city).center;
    march.moveTo(march.position, city: city);
    c.advance(1 / 60);
    expect(c.marches.containsKey(hero.id), isFalse);
    expect(c.garrisonAt(3), contains(hero));
  });

  test('第三国占领目标后保留在途远征，不能直接扎营删除任务', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(
      workerFactory: () => worker,
      guards: [0, 18],
      level: 2,
    );
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    _assign(
      c,
      worker,
      AiCommandGroup(
        reason: '远征测试',
        actions: [AiAction(AiActionKind.dispatch, hero: hero.id, city: 2)],
        tasks: [
          ArmyTask(
            hero: hero.id,
            role: 'expedition',
            city: 2,
            targetCountry: 2,
            deadlineTick: 6000,
            committedUntil: 600,
            points: [c.aiObservationFor(1).city(2)!.center],
          ),
        ],
      ),
    );
    final march = c.marches[hero.id]!;
    c.cities[2]!.ownerCountryId = 0;
    c.advance(.1);
    expect(c.aiTasks[hero.id]?.role, 'expedition');
    expect(march.phase, MarchPhase.marching);
    expect(march.target?.id, 2);
  });

  for (final threatened in [false, true]) {
    test('调防临时名额到达时${threatened ? '出现威胁则拒绝超员' : '无威胁则兑现入城'}', () {
      final worker = ManualAiWorker();
      final c = nationalScenario(
        workerFactory: () => worker,
        guards: [0, 18],
        level: 2,
        friendly: true,
        friendlyLevel: 1,
        friendHeroes: [19],
      );
      addTearDown(c.dispose);
      final operation = _transfer(c)!;
      final task = operation.group.tasks.single;
      expect(task.rearStaging, isTrue);
      expect(
        ArmyTask.fromJson(task.toJson()).withLeg(0, 123).rearStaging,
        isTrue,
      );
      _assign(c, worker, operation.group);
      final march = c.marches[task.hero]!;
      if (threatened) approaching(c, city: 3, distance: 120);
      march.position = march.destination;
      c.advance(.1);
      expect(c.garrisonAt(3).contains(march.hero), !threatened);
      if (threatened) {
        expect(march.phase, MarchPhase.camped);
        expect(c.aiTasks.containsKey(task.hero), isFalse);
      }
    });
  }

  test('临时整备容量已经用满时不能继续派调防部队', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 18],
      level: 2,
      friendly: true,
      friendlyLevel: 1,
      friendHeroes: [19, 20, 21],
    );
    addTearDown(c.dispose);
    expect(_transfer(c), isNull);
  });

  test('中间路点长期被占用会继续下一段，保留远征终点且不穿过队友', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(workerFactory: () => worker, gold: 1000);
    addTearDown(c.dispose);
    final guards = c.garrisonAt(1).toList();
    final blocker = c.dispatchTo(
      guards[1],
      const GamePoint(400, 500),
      countryId: 1,
    )!;
    blocker.position = const GamePoint(400, 500);
    blocker.camp();
    final hero = guards.first;
    _assign(
      c,
      worker,
      AiCommandGroup(
        reason: '分段远征',
        actions: [
          AiAction(
            AiActionKind.dispatch,
            hero: hero.id,
            point: const AiPoint(400, 500),
          ),
        ],
        tasks: [
          ArmyTask(
            hero: hero.id,
            role: 'expedition',
            city: 2,
            targetCountry: 2,
            deadlineTick: 6000,
            committedUntil: 600,
            points: [
              const AiPoint(400, 500),
              c.aiObservationFor(1).city(2)!.center,
            ],
          ),
        ],
      ),
    );
    final march = c.marches[hero.id]!;
    march.position = const GamePoint(360, 500);
    advanceAi(c, GameConfig.nationalAi.stagnationSeconds + 4);
    expect(_recoveries(c, hero.id), hasLength(1));
    expect(c.aiTasks[hero.id]?.leg, 1);
    expect(march.target?.id, 2);
    expect(
      (march.position - const GamePoint(360, 500)).distance,
      greaterThan(1),
    );
    expect(
      (march.position.dx - blocker.position.dx).abs() >= 16 ||
          (march.position.dy - blocker.position.dy).abs() >= 16,
      isTrue,
    );
  });

  test('局部重试仍无路可走时交回规划，不能永久卡在避让状态', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(workerFactory: () => worker, gold: 1000);
    addTearDown(c.dispose);
    final guards = c.garrisonAt(1).toList();
    final blocker = c.dispatchTo(
      guards[1],
      const GamePoint(400, 500),
      countryId: 1,
    )!;
    blocker.position = const GamePoint(400, 500);
    blocker.camp();
    final march = c.dispatchTo(
      guards.first,
      const GamePoint(400, 500),
      countryId: 1,
    )!;
    march.position = const GamePoint(360, 500);
    advanceAi(c, GameConfig.nationalAi.stagnationSeconds * 2 + 5);
    expect(_recoveries(c, march.hero.id), hasLength(2));
    expect(march.waitingForTraffic, isFalse);
    expect(march.phase, MarchPhase.camped);
    final plan = planFor(c);
    expect(
      plan.groups.expand((g) => g.tasks).any((t) => t.hero == march.hero.id),
      isTrue,
      reason: plan.toJson().toString(),
    );
  });

  test('正常行军、主动扎营与低资金不会触发卡死恢复', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(workerFactory: () => worker, gold: 1000);
    addTearDown(c.dispose);
    final hero = c.garrisonAt(1).first;
    final march = c.dispatchTo(hero, const GamePoint(1800, 900), countryId: 1)!;
    advanceAi(c, GameConfig.nationalAi.stagnationSeconds + 3);
    expect(_recoveries(c, hero.id), isEmpty);
    c.camp(hero.id, countryId: 1);
    final position = march.position;
    advanceAi(c, GameConfig.nationalAi.stagnationSeconds + 3);
    expect(march.position, position);
    expect(_recoveries(c, hero.id), isEmpty);
    final poor = nationalScenario(workerFactory: ManualAiWorker.new, gold: 1);
    addTearDown(poor.dispose);
    final starving = poor.dispatchTo(
      poor.garrisonAt(1).first,
      const GamePoint(1800, 900),
      countryId: 1,
    )!;
    advanceAi(poor, 35);
    expect(starving.supplyHalted, isFalse);
    expect(poor.goldFor(1), 1);
    expect(_recoveries(poor, starving.hero.id), isEmpty);
  });

  test('已在城内交战和正常攻城排队不会被停滞恢复改令', () {
    final c = nationalScenario(
      workerFactory: ManualAiWorker.new,
      gold: 1000,
      overrides: {
        for (final id in [0, 18, 2]) id: {'maxHp': 255, 'combat': 1},
      },
    );
    addTearDown(c.dispose);
    final city = c.world.cities[2], guards = c.garrisonAt(1).toList();
    final first = c.dispatch(guards.first, city, countryId: 1)!;
    first.position = c.cityBounds(city).center;
    first.moveTo(first.position, city: city);
    c.advance(.1);
    expect(first.phase, MarchPhase.fighting);
    final second = c.dispatch(guards[1], city, countryId: 1)!;
    second.position = first.position;
    second.moveTo(second.position, city: city);
    advanceAi(c, GameConfig.nationalAi.stagnationSeconds + 3);
    expect(first.phase, MarchPhase.fighting);
    expect(second.phase, MarchPhase.awaitingBattle);
    expect(_recoveries(c, first.hero.id), isEmpty);
    expect(_recoveries(c, second.hero.id), isEmpty);
  });

  for (final choice in ['原目标', '附近敌城', '回城']) {
    test('目标易主后重新评估：$choice', () {
      final c = nationalScenario(
        ai: false,
        gold: 1000,
        level: 2,
        guards: [0, 18],
        friendly: true,
        friendHeroes: [19],

        overrides: {
          0: {'combat': 8},
          40: {'combat': 63},
        },
      );
      addTearDown(c.dispose);
      final hero = c.garrisonAt(1).first;
      c.dispatch(hero, c.world.cities[2], countryId: 1);
      final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
      final view = AiObservation.fromJson({
        ...original.toJson(),
        'cities': [
          for (final city in original.cities)
            {
              ...city.toJson(),
              if (city.id == 2) 'c': 0,
              if (city.id == 3 && choice == '附近敌城') 'c': 2,
            },
        ],
        'heroes': [
          for (final h in original.heroes)
            if (!(h.city == 2 && choice == '原目标'))
              {
                ...h.toJson(),
                if (h.city == 2) ...{'c': 0, 'a': 63},
              },
        ],
      });
      final brain = CountryBrain(
        rules,
        c.aiMapForTesting(),
        AiRequest(
          session: 'changed-owner',
          id: 1,
          rulesVersion: rules.version,
          mapVersion: c.aiMapForTesting().version,
          observation: view,
          deadlineTick: 6000,
          stage: AiDecisionStage.defense,
          tasks: [
            ArmyTask(
              hero: hero.id,
              role: 'expedition',
              city: 2,
              targetCountry: 2,
              deadlineTick: 6000,
              committedUntil: 600,
              points: [view.city(2)!.center],
              expectedOrderRevision: view.hero(hero.id)!.orderRevision,
            ),
          ],
        ),
      );
      for (final _ in brain.steps()) {}
      final result = brain.result!;
      final task = result.groups
          .expand((g) => g.tasks)
          .where((t) => t.hero == hero.id)
          .single;
      expect(
        task.role,
        choice == '回城' ? 'regroup' : 'expedition',
        reason: result.toJson().toString(),
      );
      if (choice != '回城') {
        expect(task.city, choice == '原目标' ? 2 : 3);
        expect(task.targetCountry, choice == '原目标' ? 0 : 2);
      } else {
        expect(view.city(task.city)!.country, 1);
      }
    });
  }
}
