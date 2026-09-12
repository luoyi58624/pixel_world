import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

import '../../support/coalition_fixture.dart';
import '../../support/national_ai_fixture.dart';

AiLedger ledgerFor(CampaignState c) {
  final rules = c.aiRulesForTesting();
  return AiLedger(
    c.aiObservationFor(1),
    rules,
    AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
  );
}

void main() {
  test('在途将领仍占编制，阵亡后才补充该缺口', () {
    final c = nationalScenario(
      guards: [0, 18],
      ai: false,
      recruitment: true,
      gold: 1000,
      level: 3,
      overrides: {
        18: {'combat': 25, 'maxHp': 90},
      },
    );
    addTearDown(c.dispose);
    c.settledMonths = 0; // 此例只验既有编制，后期追加强攻补员由独立测试覆盖。
    final hero = c.garrisonAt(1).first;
    c.dispatch(hero, c.world.cities[2], countryId: 1);
    expect(ledgerFor(c).assignedHeroCount(1), 2);
    final before = coalitionPlan(c);
    expect(
      before.groups
          .expand((g) => g.actions)
          .where((a) => a.kind == AiActionKind.recruit),
      isEmpty,
    );
    c.defeatHero(hero.id, winnerCountryId: 2);
    expect(ledgerFor(c).assignedHeroCount(1), 1);
    final after = coalitionPlan(c);
    expect(
      after.groups
          .expand((g) => g.actions)
          .where((a) => a.kind == AiActionKind.recruit),
      isNotEmpty,
      reason: after.toJson().toString(),
    );
  });

  test('单将城不能远征或被解雇，入城预约不能当成已落地守军', () {
    final c = nationalScenario(guards: [18], ai: false);
    addTearDown(c.dispose);
    final ledger = ledgerFor(c), h = c.aiObservationFor(1).garrison(1).single;
    ledger.arrivals[1] = 1;
    ledger.recruited.add(1);
    expect(ledger.defendersToKeep(ledger.view.city(1)!), 1);
    expect(
      ledger.depart(
        h,
        ArmyTask(
          hero: h.id,
          role: 'expedition',
          deadlineTick: 99999,
          committedUntil: 0,
        ),
      ),
      isFalse,
    );
    expect(ledger.dismiss(h), isFalse);
    expect(ledger.removed, isEmpty);
    expect(ledger.departed, isEmpty);
    expect(
      planFor(c).groups
          .expand((g) => g.actions)
          .where((a) => a.kind == AiActionKind.dispatch),
      isEmpty,
    );
  });

  test('同组连续派遣不能把最后守将派走', () {
    final c = nationalScenario(guards: [0, 18], ai: false);
    addTearDown(c.dispose);
    final ledger = ledgerFor(c), guards = ledgerFor(c).view.garrison(1);
    expect(
      ledger.depart(
        guards.first,
        ArmyTask(
          hero: guards.first.id,
          role: 'expedition',
          deadlineTick: 99999,
          committedUntil: 0,
        ),
      ),
      isTrue,
    );
    expect(
      ledger.depart(
        guards.last,
        ArmyTask(
          hero: guards.last.id,
          role: 'expedition',
          deadlineTick: 99999,
          committedUntil: 0,
        ),
      ),
      isFalse,
    );
    expect(ledger.garrison(1).length, 1);
  });

  test('强将不能全部出击只留下低生命低攻击兵牌', () {
    final c = nationalScenario(
      guards: [0, 18, 19],
      ai: false,
      overrides: {
        18: {'maxHp': 20, 'combat': 1},
        19: {'maxHp': 20, 'combat': 1},
      },
    );
    addTearDown(c.dispose);
    final ledger = ledgerFor(c);
    expect(ledger.canSpareForOffense(ledger.view.hero('rom-0')!), isFalse);
    expect(ledger.canSpareForOffense(ledger.view.hero('rom-18')!), isTrue);
  });

  test('现有安全兵力优先给空城接防，供兵城保留守将', () {
    final c = coalitionCampaign();
    addTearDown(c.dispose);
    c.cities[3]!.ownerCountryId = 1;
    c.heroes.removeWhere((h) => h.countryId == 3);
    final plan = coalitionPlan(c, stage: AiDecisionStage.defense);
    final transfers = plan.groups
        .expand((g) => g.tasks)
        .where((t) => t.role == 'transfer' && t.city == 3);
    expect(transfers, isNotEmpty, reason: plan.toJson().toString());
    expect(transfers.length, lessThan(c.garrisonAt(1).length));
  });
}
