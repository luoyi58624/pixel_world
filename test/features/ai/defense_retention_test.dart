import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/config.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/defense_planner.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/rules_data.dart';
import 'package:pixel_world/features/ai/threats.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

// 固定公开属性，只检验策略选择，不推进战斗或依赖游戏平衡参数。
class _Scenario {
  _Scenario({
    int level = 2,
    bool overwhelming = false,
    bool reinforcement = false,
  }) {
    rules = AiRules(
      version: 'defense-retention',
      values: {
        'soldierHp': 20,
        'soldierPower': 1,
        'soldierLimit': 4,
        'useMorale': 1,
        for (var i = 1; i <= 5; i++) 'cityMoraleBonus$i': i * 5,
        'marchSpeed': 16,
        'encounterDistance': 14,
        'monthSeconds': 60,
        'budgetSafety': 5,
        'emergencyGold': 0,
        'battleBudget': 20,
        'incomeStep': 0,
        'countryIncome': 10,
        'garrisonFree': 2,
        'garrisonFactor': 0,
        'poorPenalty': 10,
        'foreignYield': 1,
        'maxLevel': 5,
        'firstYearCityLevel': 3,
        'initialYear': 1,
        'capacityPerLevel': 12,
        'soldierCost': 1,
        'soldierBatch': 10,
        'drawCost': 5,
        'retreatSurvivalRatio': 1,
        'retreatFailure': .6,
      },
      upgradeCosts: [30, 60, 90, 120],
      defenseBonuses: [1, 3, 5, 8, 10],
      movementFactors: [1, 1, 1, 1],
      fieldFactors: [1, 1, 1, 1],
      tuning: const AiTuning(),
    );
    map = AiMap('flat', 64, 48, List.filled(64 * 48, 0));
    AiCity city(int id, int owner, AiPoint center, int level) => AiCity(
      id: id,
      country: owner,
      nativeCountry: id == 1 ? 0 : owner,
      level: level,
      center: center,
      outline: AiOutline([
        center.translated(-12, -12),
        center.translated(12, -12),
        center.translated(12, 12),
        center.translated(-12, 12),
      ]),
      income: 20,
      poorIncome: 10,
      capacityContribution: 24,
      rearStagingCapacity: 4,
      recruitAllowed: false,
      upgradeAllowed: false,
      revision: 'city-$id',
    );
    AiHero guard(String id, int order, int combat, int hp, int politics) =>
        AiHero(
          id: id,
          country: 1,
          city: 1,
          order: order,
          type: 1,
          hp: hp.toDouble(),
          maxHp: hp,
          combat: combat,
          politics: politics,
          salary: 0,
          position: const AiPoint(240, 240),
          morale: 100,
          canDispatch: true,
          canDismiss: true,
          revision: id,
        );
    view = AiObservation(
      country: 1,
      tick: 60,
      monthRemaining: 50,
      cities: [
        city(0, 0, const AiPoint(800, 240), 2),
        city(1, 1, const AiPoint(240, 240), level),
        city(3, 1, const AiPoint(160, 160), 3),
        city(4, 1, const AiPoint(160, 400), 3),
      ],
      heroes: [
        guard('strong', 0, 15, 100, 15),
        guard('weak', 1, 2, 40, 0),
        AiHero(
          id: 'invader',
          country: 0,
          city: 0,
          order: 0,
          type: 1,
          hp: overwhelming ? 180 : 100,
          maxHp: overwhelming ? 180 : 100,
          combat: overwhelming ? 40 : 15,
          politics: 0,
          salary: 0,
          position: const AiPoint(480, 240),
          velocity: const AiPoint(-16, 0),
          state: AiArmyState.marching,
          soldiers: [20, 20, 20, 20],
          morale: 100,
          regionCity: 1,
          revision: 'invader',
        ),
        if (reinforcement)
          AiHero(
            id: 'relief',
            country: 1,
            city: 3,
            order: 2,
            type: 1,
            hp: 255,
            maxHp: 255,
            combat: 63,
            politics: 0,
            salary: 0,
            position: const AiPoint(215, 210),
            state: AiArmyState.camped,
            soldiers: [20, 20, 20, 20],
            morale: 100,
            canMove: true,
            revision: 'relief',
          ),
      ],
      countries: [
        AiCountry(0, 0, 4, 64, 0, 20),
        AiCountry(1, 0, 32, 64, 0, 60),
      ],
    );
    request = AiRequest(
      session: 'retention',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: view,
      deadlineTick: 99999,
      stage: AiDecisionStage.defense,
    );
  }

  late final AiRules rules;
  late final AiMap map;
  late final AiObservation view;
  late final AiRequest request;

  CountryPlan plan() {
    final brain = CountryBrain(rules, map, request);
    for (final _ in brain.steps()) {}
    return brain.result!;
  }

  (CityDefenseReport, List<DefenseCandidate>) choices() {
    final work = AiWorkBudget(rules.tuning);
    final routes = AiRoutes(map, rules, work);
    final assessor = CombatAssessor(rules, work);
    final analyzer = ThreatAnalyzer(view, rules, routes, assessor);
    final reports = {
      for (final city in view.owned) city.id: analyzer.report(city),
    };
    final planner = DefensePlanner(
      request,
      rules,
      work,
      assessor,
      OperationPlanner(request, rules, routes),
      reports,
    );
    return (
      reports[1]!,
      planner.candidates(reports[1]!, AiLedger(view, rules, routes)).toList(),
    );
  }
}

void main() {
  test('三城国家的占领城受袭，局势接近时强将留城而非撤往主城', () {
    final scenario = _Scenario();
    expect(scenario.view.owned, hasLength(3));
    expect(scenario.choices().$1.risk!.advantage, CombatAdvantage.close);
    final plan = scenario.plan();
    expect(
      plan.groups.expand((g) => g.tasks).where((t) => t.hero == 'strong'),
      isEmpty,
      reason: plan.toJson().toString(),
    );
  });

  test('受袭城超员时转移弱将，为强将保留实际迎战名额', () {
    final plan = _Scenario(level: 1).plan();
    final tasks = plan.groups.expand((g) => g.tasks).toList();
    expect(
      tasks.any((t) => t.hero == 'weak' && t.role == 'transfer'),
      isTrue,
      reason: plan.toJson().toString(),
    );
    expect(tasks.where((t) => t.hero == 'strong'), isEmpty);
  });

  test('确实守不住时允许保全核心，但撤离不能冒充已经解决城防', () {
    final (_, choices) = _Scenario(overwhelming: true).choices();
    final evacuation = choices
        .where(
          (c) => c.groups.any(
            (g) =>
                g.tasks.any((t) => t.hero == 'strong' && t.role == 'evacuate'),
          ),
        )
        .toList();
    expect(evacuation, isNotEmpty);
    expect(evacuation.every((c) => c.unresolved), isTrue);
  });

  test('及时援军能守住受袭城时优先回援，不把城内核心撤回主城', () {
    final plan = _Scenario(
      level: 3,
      overwhelming: true,
      reinforcement: true,
    ).plan();
    final tasks = plan.groups.expand((g) => g.tasks).toList();
    expect(
      tasks.any((t) => t.hero == 'relief' && t.city == 1 && t.role == 'rescue'),
      isTrue,
      reason: plan.toJson().toString(),
    );
    expect(tasks.where((t) => t.hero == 'strong'), isEmpty);
  });

  test('AI 看到的守军顺序与真实游戏的内政、攻击力排序一致', () {
    final c = nationalScenario(
      ai: false,
      guards: [18, 19, 20],
      overrides: {
        18: {'combat': 5, 'politics': 0},
        19: {'combat': 20, 'politics': 15},
        20: {'combat': 10, 'politics': 15},
      },
    );
    addTearDown(c.dispose);
    expect(
      c.aiObservationFor(1).garrison(1).map((h) => h.id),
      c.garrisonAt(1).map((h) => h.id),
    );
  });
}
