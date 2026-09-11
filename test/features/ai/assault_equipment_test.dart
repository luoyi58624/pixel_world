import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/operations.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/core/geometry/geometry.dart';

import '../../support/national_ai_fixture.dart';
import '../../support/weapon_strategy_fixture.dart';

void main() {
  for (final year in [1, 4]) {
    test('$year年资金与强将齐备时组织四人轮攻，缺资金时不强制满队', () {
      final c = weaponStrategyCampaign(
        gold: 1000,
        sourceLevel: 5,
        sourceHeroes: [0, 2, 3, 4, 5, 18],
        targetLevel: 5,
        targetHeroes: [24, 26],
      );
      addTearDown(c.dispose);
      c.settledMonths = (year - 1) * 12;
      final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
      final routes = AiRoutes(
        c.aiMapForTesting(),
        rules,
        AiWorkBudget(rules.tuning),
      );
      final ledger = AiLedger(view, rules, routes);
      final planner = OperationPlanner(
        AiRequest(
          session: 'team',
          id: 1,
          rulesVersion: rules.version,
          mapVersion: routes.map.version,
          observation: view,
          deadlineTick: 6000,
        ),
        rules,
        routes,
      );
      expect(planner.raidTeamSize(1, view.city(2)!, ledger), 4);
      expect(planner.desiredAssaultHeroes(ledger), year < 3 ? 1 : 4);
      ledger.gold = 1;
      expect(planner.raidTeamSize(1, view.city(2)!, ledger), 1);
      expect(planner.desiredAssaultHeroes(ledger), 1);
    });
  }

  test('同等高内政保留低攻击建设将领，释放强攻击主力', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 18],
      overrides: {
        0: {'combat': 18, 'politics': 15},
        18: {'combat': 5, 'politics': 15},
      },
    );
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
    );
    expect(ledger.canSpareForOffense(view.hero('rom-0')!), isTrue);
    expect(ledger.canSpareForOffense(view.hero('rom-18')!), isFalse);
  });

  test('首年真实经营后同组将领带齐武器出征，保留本城守军', () {
    final c = weaponStrategyCampaign(
      ai: true,
      gold: 1000,
      sourceLevel: 5,
      sourceHeroes: [0, 2, 3, 4, 5, 18],
      targetLevel: 3,
      targetHeroes: [24, 26],
      fortifiedCapital: true,
    );
    addTearDown(c.dispose);
    c.settledMonths = 0;
    advanceAi(c, 3);
    final armies = c.marches.values
        .where((m) => m.hero.countryId == 1 && m.target?.id == 2)
        .toList();
    expect(armies.length, greaterThan(1));
    expect(armies.every((m) => m.hero.weaponIds.length == 1), isTrue);
    expect(armies.every((m) => m.hero.soldiers == 4), isTrue);
    expect(c.garrisonAt(1), isNotEmpty);
    expect(c.goldFor(1), greaterThanOrEqualTo(0));
  });

  test('有钱但缺强攻将领时继续补员，不因普通守军人数够了而停止', () {
    final c = nationalScenario(
      ai: false,
      guards: [18, 19, 20],
      level: 3,
      gold: 1000,
      recruitment: true,
    );
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1),
        rules = c.aiRulesForTesting(),
        map = c.aiMapForTesting();
    final brain = CountryBrain(
      rules,
      map,
      AiRequest(
        session: 'quality',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: view,
        stage: AiDecisionStage.resources,
        deadlineTick: 6000,
      ),
    );
    for (final _ in brain.steps()) {}
    expect(
      brain.result!.groups
          .expand((g) => g.actions)
          .any((a) => a.kind == AiActionKind.recruit),
      isTrue,
      reason: brain.result!.toJson().toString(),
    );
  });

  test('没钱买武器时低价值将领可裸装吸收来敌武器，但不派走守城主力', () {
    final c = nationalScenario(
      ai: false,
      guards: [33, 34],
      level: 4,
      gold: 10,
      reserves: 12,
      attackerCombat: 32,
      stock: {
        '2': {'11': 1},
      },
      overrides: {
        33: {'combat': 2, 'maxHp': 35, 'morale': 30, 'politics': 0},
        34: {'combat': 14, 'maxHp': 60, 'morale': 100},
      },
    );
    addTearDown(c.dispose);
    final enemy = c.dispatch(
      c.garrisonAt(2).first,
      c.world.cities[1],
      countryId: 2,
      weaponSlots: {0: 11},
    )!;
    enemy.position =
        c.cityBounds(c.world.cities[1]).center + const GamePoint(140, 0);
    c.advance(1 / 60);
    final plan = planFor(c);
    final sorties = plan.groups
        .expand((g) => g.actions)
        .where((a) => a.kind == AiActionKind.dispatch)
        .toList();
    expect(sorties, isNotEmpty, reason: plan.toJson().toString());
    expect(sorties.single.hero, 'rom-33');
    expect(sorties.single.weaponIds, isEmpty);
    expect(
      plan.groups
          .expand((g) => g.tasks)
          .any((t) => t.hero == 'rom-33' && t.attrition),
      isTrue,
    );
  });

  for (final year in [1, 3, 5]) {
    test('$year年攻城统一使用已解锁高伤害武器，不因缺钱推荐裸装', () {
      final c = weaponStrategyCampaign(gold: 10, targetLevel: 3);
      addTearDown(c.dispose);
      c.settledMonths = (year - 1) * 12;
      final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
      final work = AiWorkBudget(rules.tuning),
          routes = AiRoutes(
            c.aiMapForTesting(),
            rules,
            AiWorkBudget(rules.tuning),
          );
      final ledger = AiLedger(view, rules, routes);
      final request = AiRequest(
        session: 'equipment',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: routes.map.version,
        observation: view,
        deadlineTick: 6000,
      );
      final hero = view.garrison(1).first;
      final gears = OperationPlanner(
        request,
        rules,
        routes,
      ).raidLoadouts(hero, ledger, view.city(2)!, CombatAssessor(rules, work));
      expect(gears.single, hasLength(1));
      final selected = rules.weapons[gears.single.single]!;
      final allowed = rules.weapons.values.where(
        (w) =>
            w.shopEnabled &&
            w.unlockYear <= year &&
            w.selfDamage <
                hero.hp +
                    rules.integer('soldierLimit') * rules.integer('soldierHp'),
      );
      expect(
        selected.damage - selected.selfDamage,
        allowed
            .map((w) => w.damage - w.selfDamage)
            .reduce((a, b) => a > b ? a : b),
      );
      expect(ledger.gold, 10, reason: '这里只制定装备目标，不能凭空买到武器');
    });
  }

  test('强攻击优先，稀有度与高生命不能把弱攻击将领排到强攻将领前', () {
    final c = nationalScenario(
      ai: false,
      guards: [0, 18],
      overrides: {
        0: {'combat': 5, 'maxHp': 150},
        18: {'combat': 18, 'maxHp': 68},
      },
    );
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1);
    expect(
      heroDeploymentValue(view.hero('rom-18')!),
      greaterThan(heroDeploymentValue(view.hero('rom-0')!)),
    );
  });

  test('高内政低攻击将领不参与消耗出击候选', () {
    final c = nationalScenario(
      ai: false,
      guards: [33, 34],
      level: 4,
      gold: 200,
      attackerCombat: 32,
      overrides: {
        33: {'combat': 2, 'maxHp': 35, 'morale': 30, 'politics': 20},
        34: {'combat': 14, 'maxHp': 60, 'morale': 100},
      },
    );
    addTearDown(c.dispose);
    approaching(c, distance: 140);
    c.advance(1 / 60);
    final plan = planFor(c);
    expect(
      plan.groups
          .expand((g) => g.tasks)
          .where((t) => t.hero == 'rom-33' && t.attrition),
      isEmpty,
    );
    expect(valuableGovernor(c.aiObservationFor(1).hero('rom-33')!), isTrue);
  });
}
