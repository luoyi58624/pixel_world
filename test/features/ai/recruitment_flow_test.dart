import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
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

CountryPlan _plan(
  CampaignState c, [
  AiDecisionStage stage = AiDecisionStage.resources,
]) {
  final ledger = _ledger(c);
  final brain = CountryBrain(
    ledger.rules,
    ledger.routes.map,
    AiRequest(
      session: 'recruitment-flow',
      id: 1,
      rulesVersion: ledger.rules.version,
      mapVersion: ledger.routes.map.version,
      observation: ledger.view,
      deadlineTick: 999999,
      stage: stage,
    ),
  );
  for (final _ in brain.steps()) {}
  return brain.result!;
}

CampaignState _empire({int gold = 1000, List<int> guards = const []}) {
  final c = nationalScenario(
    ai: false,
    rearEmpire: true,
    guards: guards,
    friendHeroes: [18],
    level: 3,
    recruitment: true,
    gold: gold,
  );
  c.countryTroops[1] = CountryTroops(reserveSoldiers: c.reserveCapacityFor(1));
  return c;
}

List<int?> _recruits(CountryPlan plan) => plan.groups
    .expand((g) => g.actions)
    .where((a) => a.kind == AiActionKind.recruit)
    .map((a) => a.city)
    .toList();

void main() {
  test('没有敌方城池时停止进攻招募，后方不为花钱而积压人头', () {
    final c = _empire();
    addTearDown(c.dispose);
    for (final city in c.cities.values) {
      city.ownerCountryId = 1;
    }
    expect(_recruits(_plan(c)), isEmpty);
  });

  test('防御补员不因本月补兵窗口已用完而闲置最后现金', () {
    final c = nationalScenario(
      ai: false,
      gold: 6,
      guards: [],
      level: 3,
      reserves: 0,
      recruitment: true,
    );
    addTearDown(c.dispose);
    expect(c.buySoldiers(1, 1, countryId: 1), isTrue);
    approaching(c, distance: 100);
    final plan = _plan(c);
    expect(_recruits(plan), [1], reason: plan.toJson().toString());
    expect(
      plan.groups
          .where((g) => g.actions.any((a) => a.kind == AiActionKind.recruit))
          .single
          .minimumGold,
      0,
    );
  });

  test('三城共用现款，前线先招，余额恰好十金币便停止', () {
    for (final gold in [20, 25]) {
      final c = _empire(gold: gold);
      addTearDown(c.dispose);
      final plan = _plan(c);
      expect(
        _recruits(plan),
        gold == 20 ? [3, 4] : [3, 4, 1],
        reason: plan.toJson().toString(),
      );
      expect(gold - _recruits(plan).length * 5, 10);
      expect(plan.groups.every((g) => g.minimumGold == 10), isTrue);
    }
  });

  test('前线月度额度已用完，后方继续招募；次月各城恢复机会', () {
    final c = _empire();
    addTearDown(c.dispose);
    for (final city in [3, 4]) {
      expect(c.drawHero(city, countryId: 1), isNotNull);
      expect(c.remainingHeroDraws(city), 0);
    }
    expect(_recruits(_plan(c)), [1]);
    c.advance(60);
    expect(c.remainingHeroDraws(3), 1);
    expect(c.remainingHeroDraws(4), 1);
    expect(_recruits(_plan(c)).toSet(), {1, 3, 4});
  });

  test('后方已有待发积压先输送，释放后同城可以继续招募', () {
    final c = _empire(guards: [0, 19]);
    addTearDown(c.dispose);
    expect(_ledger(c).safeRear(_ledger(c).view.city(1)!), isTrue);
    expect(_recruits(_plan(c)), isNot(contains(1)));
    final plan = _plan(c, AiDecisionStage.full);
    final dispatched = plan.groups
        .expand((g) => g.tasks)
        .where((t) => ['rom-0', 'rom-19'].contains(t.hero))
        .toList();
    expect(dispatched.map((t) => t.hero).toSet(), {
      'rom-0',
      'rom-19',
    }, reason: plan.toJson().toString());
    expect(
      dispatched.every((t) => !t.arrivalSlot && t.targetCountry != 1),
      isTrue,
    );
    expect(_recruits(plan), contains(1));
  });

  test('普通补兵留下十金币，受袭补兵允许花至零', () {
    final c = nationalScenario(ai: false, gold: 14, reserves: 0);
    addTearDown(c.dispose);
    final normal = _ledger(c), emergency = _ledger(c);
    expect(normal.stockUpSoldiers(), 4);
    expect(normal.gold, 10);
    expect(emergency.stockUpSoldiers(emergency: true), 14);
    expect(emergency.gold, 0);
    expect(emergency.buySoldiers(1), isFalse);
  });

  test('受袭招将恰好付完五金币，正常同额不能动用周转金', () {
    final c = nationalScenario(
      ai: false,
      gold: 5,
      level: 3,
      guards: [],
      recruitment: true,
    );
    addTearDown(c.dispose);
    final normal = _ledger(c), emergency = _ledger(c);
    expect(normal.recruit(normal.view.city(1)!), isFalse);
    expect(emergency.recruit(emergency.view.city(1)!, emergency: true), isTrue);
    expect(emergency.gold, 0);
    expect(
      emergency.recruit(emergency.view.city(1)!, emergency: true),
      isFalse,
    );
  });

  test('真实受袭回复能用最后五金币招将，提交阶段不会重新卡余额', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(
      gold: 5,
      guards: [],
      level: 3,
      recruitment: true,
      workerFactory: () => worker,
    );
    addTearDown(c.dispose);
    c.countryTroops[1] = CountryTroops(
      reserveSoldiers: c.reserveCapacityFor(1),
    );
    approaching(c, distance: 100);
    for (
      var i = 0;
      i < 120 && !worker.requests.any((r) => r.country == 1);
      i++
    ) {
      c.advance(1 / 60);
    }
    final request = worker.requests.lastWhere((r) => r.country == 1);
    final reply = worker.solve(request);
    expect(_recruits(reply.plan), contains(1));
    worker.replies.add(reply);
    c.advance(1 / 60);
    expect(c.goldFor(1), 0, reason: c.aiDiagnostics.events.toString());
    expect(c.garrisonAt(1), hasLength(1));
    expect(c.aiDiagnostics.rejected, 0);
  });

  test('正常补兵回复遇到国库已被花用，保留十金币的条件仍须复核', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(
      gold: 20,
      reserves: 0,
      recruitment: true,
      workerFactory: () => worker,
    );
    addTearDown(c.dispose);
    for (
      var i = 0;
      i < 120 && !worker.requests.any((r) => r.country == 1);
      i++
    ) {
      c.advance(1 / 60);
    }
    final request = worker.requests.lastWhere((r) => r.country == 1);
    expect(c.drawHero(1, countryId: 1), isNotNull);
    expect(c.goldFor(1), 15);
    worker.replies.add(
      AiReply.forRequest(
        request,
        CountryPlan(
          groups: [
            AiCommandGroup(
              reason: '旧现金补兵计划',
              minimumGold: 10,
              actions: [AiAction(AiActionKind.soldiers, city: 1, amount: 10)],
            ),
          ],
        ),
      ),
    );
    c.advance(1 / 60);
    expect(c.goldFor(1), 15);
    expect(c.reserveSoldiersFor(1), 0);
    expect(c.aiDiagnostics.rejected, greaterThan(0));
  });
}
