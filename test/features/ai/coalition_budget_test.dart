import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/coalition_policy.dart';
import 'package:pixel_world/features/ai/config.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/offensive_focus.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/rules_data.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';

import '../../support/coalition_fixture.dart';

void main() {
  test('五城起追加半月收入，此后每多一城加四分之一月，预算与权重递增', () {
    var previous = 0, weight = 0.0;
    for (final cities in [1, 3, 4, 5, 6, 7]) {
      final c = coalitionCampaign(enemyCities: cities);
      addTearDown(c.dispose);
      final policy = CoalitionPolicy(
        2,
        c.aiObservationFor(1),
        c.aiRulesForTesting(),
      );
      expect(policy.dangerous, cities >= 5);
      expect(
        policy.extraGold,
        cities < 5 ? 0 : (30 * (.5 + (cities - 5) * .25)).ceil(),
      );
      if (cities < 5) {
        expect(policy.priorityBonus, 0);
        expect(policy.extraMonths, 0);
        expect(policy.teamSize(2, 2), 2);
      }
      if (cities >= 5) {
        expect(policy.extraGold, greaterThan(previous));
        expect(policy.priorityBonus, greaterThan(weight));
        expect(policy.payrollRatio, greaterThan(.5));
        expect(policy.payrollRatio, lessThanOrEqualTo(.8));
      }
      previous = policy.extraGold;
      weight = policy.priorityBonus;
    }
    final tuning = AiTuning.fromJson(
      const AiTuning(
        coalitionBudgetBaseMonths: .8,
        coalitionBudgetStepMonths: .3,
      ).toJson(),
    );
    expect(tuning.coalitionBudgetBaseMonths, .8);
    expect(tuning.coalitionBudgetStepMonths, .3);
  });

  test('占城门槛可配置并经后台规则序列化生效，旧消息缺字段使用统一默认值', () {
    final c = coalitionCampaign(enemyCities: 5);
    addTearDown(c.dispose);
    final original = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    expect(original.tuning.dangerousCountryCityCount, 5);
    for (final threshold in [3, 5, 7]) {
      final tuning = AiTuning(dangerousCountryCityCount: threshold);
      final rules = AiRules.fromJson({
        ...original.toJson(),
        'tuning': tuning.toJson(),
      });
      expect(rules.tuning.dangerousCountryCityCount, threshold);
      expect(CoalitionPolicy(2, view, rules).dangerous, threshold <= 5);
    }
    final old = (const AiTuning()).toJson()..remove('dangerousCountryCities');
    expect(AiTuning.fromJson(old).dangerousCountryCityCount, 5);
  });

  test('围攻可购买强武器但不强制加价，未来年份武器不进入采购', () {
    var oldCost = 0, oldDamage = 0;
    for (final cities in [4, 5, 6]) {
      final c = coalitionCampaign(enemyCities: cities);
      addTearDown(c.dispose);
      final plan = coalitionPlan(c, targetCountry: 2, targetCity: 2);
      final gear = plan.groups
          .expand((g) => g.actions)
          .where((a) => a.kind == AiActionKind.buyWeapon)
          .map((a) => c.weaponCatalog.weapons[a.amount]!)
          .toList();
      final cost = gear.fold(0, (n, w) => n + w.price),
          damage = gear.fold(0, (n, w) => n + w.damage);
      if (cities == 5) {
        expect(
          cost,
          greaterThanOrEqualTo(oldCost),
          reason: plan.toJson().toString(),
        );
        expect(damage, greaterThanOrEqualTo(oldDamage));
        expect(gear, isNotEmpty);
        expect(plan.notes.any((n) => n.contains('危险国家')), isTrue);
      }
      oldCost = cost;
      oldDamage = damage;
    }
    final early = coalitionCampaign(enemyCities: 5, year: 1);
    addTearDown(early.dispose);
    final plan = coalitionPlan(early, targetCountry: 2, targetCity: 2);
    for (final action
        in plan.groups
            .expand((g) => g.actions)
            .where((a) => a.kind == AiActionKind.buyWeapon)) {
      expect(early.weaponCatalog.weapons[action.amount]!.unlockYear, 1);
    }
  });

  test('危险国保留后备队估算，但可先用单将突破而不等待凑齐', () {
    final c = coalitionCampaign(enemyCities: 5, defenders: 2);
    addTearDown(c.dispose);
    final policy = CoalitionPolicy(
      2,
      c.aiObservationFor(1),
      c.aiRulesForTesting(),
    );
    expect(policy.teamSize(2, 2), 3);
    expect(policy.teamSize(4, 4), 4);
    expect(policy.teamSize(0, 5), 0);
    expect(policy.teamSize(1, 0), 1);
    final plan = coalitionPlan(
      c,
      stage: AiDecisionStage.full,
      targetCountry: 2,
      targetCity: 2,
    );
    expect(
      plan.groups
          .expand((g) => g.tasks)
          .where((t) => t.role == 'expedition')
          .length,
      greaterThanOrEqualTo(1),
      reason: plan.toJson().toString(),
    );
  });

  test('资金不足先积蓄，不会因为围攻而虚增金币或花光粮草', () {
    final c = coalitionCampaign(enemyCities: 5, gold: 1);
    addTearDown(c.dispose);
    final plan = coalitionPlan(c, targetCountry: 2, targetCity: 2);
    expect(plan.groups, isEmpty, reason: plan.toJson().toString());
    expect(c.goldFor(1), 1);
    expect(plan.requiredGold, greaterThan(1));
  });

  test('两国通过正式调度分别付钱、共同攻击危险国家，日志记录追加预算', () {
    final c = coalitionCampaign(enemyCities: 5, ai: true);
    addTearDown(c.dispose);
    for (var n = 0; n < 180; n++) {
      c.advance(1 / 60);
    }
    for (final country in [1, 3]) {
      final marches = c.marches.values
          .where((m) => m.hero.countryId == country)
          .toList();
      expect(
        marches,
        isNotEmpty,
        reason: c.events.forCountry(country).exportDecisionsJsonLines(),
      );
      expect(
        marches.every(
          (m) =>
              c
                  .cities[m.target?.id ?? c.aiTasks[m.hero.id]?.city]
                  ?.ownerCountryId ==
              2,
        ),
        isTrue,
      );
      for (final march in marches) {
        final cityId = march.target?.id ?? c.aiTasks[march.hero.id]?.city;
        if (cityId != null && c.garrisonAt(cityId).isNotEmpty) {
          expect(march.hero.weaponIds, isNotEmpty);
        }
      }
      expect(c.goldFor(country), lessThan(1000));
      expect(
        c.goldFor(country),
        greaterThanOrEqualTo(c.aiBudgetFor(country).reserveGold),
      );
      expect(
        c.events
            .forCountry(country)
            .query()
            .any(
              (e) =>
                  e.kind == GameEventKind.decisionFinalized &&
                  (e.reason?.contains('追加进攻预算') ?? false),
            ),
        isTrue,
      );
    }
    expect(c.goldFor(0), 0);
    expect(c.goldFor(2), 0);
  });

  test('先买进攻武器，余钱充足且不侵占围攻预算时才升级', () {
    for (final cities in [4, 5]) {
      for (final gold in [58, 83]) {
        final c = coalitionCampaign(
          enemyCities: cities,
          homeLevel: 2,
          gold: gold,
        );
        addTearDown(c.dispose);
        final plan = coalitionPlan(c, targetCountry: 2, targetCity: 2);
        expect(
          plan.groups
              .expand((g) => g.actions)
              .any((a) => a.kind == AiActionKind.upgrade),
          cities == 4 && gold == 83,
          reason: plan.toJson().toString(),
        );
        expect(
          plan.groups
              .expand((g) => g.actions)
              .any((a) => a.kind == AiActionKind.buyWeapon),
          isTrue,
        );
      }
    }
  });

  test('围攻提高招聘月俸预算，实际签约成本照常扣除，不修改资源', () {
    for (final cities in [4, 5]) {
      final c = coalitionCampaign(enemyCities: cities, year: 1);
      addTearDown(c.dispose);
      final original = c.aiObservationFor(1), rules = c.aiRulesForTesting();
      final view = AiObservation.fromJson({
        ...original.toJson(),
        'pool': 5,
        'salary': 6,
        'heroes': [
          for (final h in original.heroes)
            // 正常收入三十：三名现役工资十五，再招六金币将领跨过普通预算但符合围攻预算。
            if (h.id != 'rom-18')
              {...h.toJson(), 'pay': h.country == 1 ? 5 : 0},
        ],
        'cities': [
          for (final city in original.cities)
            {...city.toJson(), 'recruit': true},
        ],
      });
      final ledger = AiLedger(
        view,
        rules,
        AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      );
      expect(ledger.recruit(view.city(1)!, offensiveCountry: 2), cities == 5);
      expect(ledger.gold, cities == 5 ? 989 : 1000);
      expect(c.goldFor(1), 1000);
    }
  });

  test('没有出发的普通目标可重新选择，共同威胁不打断已有远征', () {
    final c = coalitionCampaign(enemyCities: 5, year: 1);
    addTearDown(c.dispose);
    final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
    );
    final idle = OffensiveFocus(
      view,
      ledger,
      rules,
      targetCountry: 0,
      targetCity: 0,
    );
    expect(idle.objectiveCountry, isNull);
    expect(idle.allows(view.city(2)!), isTrue);
    // 保持原远征装备齐全，排除正常回城补装对目标承诺测试的干扰。
    expect(c.buyWeapon(2, countryId: 1), isTrue);
    final march = c.dispatch(
      c.garrisonAt(1).first,
      c.world.cities[0],
      countryId: 1,
      weaponSlots: {0: 2},
    )!;
    final activeView = c.aiObservationFor(1);
    final task = ArmyTask(
      hero: march.hero.id,
      role: 'expedition',
      city: 0,
      targetCountry: 0,
      deadlineTick: 999999,
      committedUntil: 600,
      expectedOrderRevision: activeView.hero(march.hero.id)!.orderRevision,
    );
    final active = OffensiveFocus(
      activeView,
      AiLedger(activeView, rules, ledger.routes, tasks: [task]),
      rules,
      targetCountry: 0,
      targetCity: 0,
    );
    expect(active.objectiveCountry, 0);
    expect(active.allows(activeView.city(2)!), isFalse);
    final plan = coalitionPlan(
      c,
      country: 1,
      stage: AiDecisionStage.defense,
      targetCountry: 0,
      targetCity: 0,
      tasks: [task],
    );
    expect(
      plan.groups
          .expand((g) => g.actions)
          .where((a) => a.hero == march.hero.id),
      isEmpty,
      reason: plan.toJson().toString(),
    );
  });

  test('跌回四城后解除额外预算，对玩家大国也执行同一门槛', () {
    final c = coalitionCampaign(enemyCities: 5);
    addTearDown(c.dispose);
    final rules = c.aiRulesForTesting();
    expect(CoalitionPolicy(2, c.aiObservationFor(1), rules).dangerous, isTrue);
    c.cities[4]!.ownerCountryId = 0;
    expect(CoalitionPolicy(2, c.aiObservationFor(1), rules).extraGold, 0);
    for (final city in [5, 6, 7]) {
      c.cities[city]!.ownerCountryId = 0;
    }
    expect(CoalitionPolicy(0, c.aiObservationFor(1), rules).dangerous, isTrue);
    expect(CoalitionPolicy(1, c.aiObservationFor(1), rules).dangerous, isFalse);
    for (final city in [2, 4, 5, 6, 7]) {
      c.cities[city]!.ownerCountryId = 1;
    }
    expect(CoalitionPolicy(1, c.aiObservationFor(1), rules).dangerous, isFalse);
  });
}
