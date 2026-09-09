import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/ai/budget.dart';
import 'package:pixel_world/world/ai/routes.dart';
import 'package:pixel_world/world/ai/work_budget.dart';

import 'support/national_ai_fixture.dart';

void main() {
  test('R09/T02 规划扣除真实自动领取的兵员，不能把同一批兵重复分配', () {
    final c = nationalScenario(ai: false, level: 2, reserves: 4);
    final hero = c.garrisonAt(1).first;
    final before = c.reserveSoldiersFor(1);
    c.dispatchTo(hero, const Offset(400, 500), countryId: 1);
    expect(c.reserveSoldiersFor(1), before - 4);
    final view = c.aiObservationFor(1);
    expect(view.hero(hero.id)!.soldierCount, 4);
    expect(view.nation.reserves, 0);
  });
  test('R12 解雇后的返款与容量裁剪与真实操作一致', () {
    final c = nationalScenario(ai: false, level: 1, reserves: 16);
    final rules = c.aiRulesForTesting(),
        view = c.aiObservationFor(1),
        routes = AiRoutes(
          c.aiMapForTesting(),
          rules,
          AiWorkBudget(rules.tuning),
        );
    final ledger = AiLedger(view, rules, routes), hero = c.garrisonAt(1).last;
    expect(ledger.dismiss(view.hero(hero.id)!), isTrue);
    c.dismissHero(hero, countryId: 1);
    expect(ledger.gold, c.goldFor(1));
    expect(ledger.capacity, c.reserveCapacityFor(1));
    expect(ledger.reserves, c.reserveSoldiersFor(1));
  });
  test('R11 月结之前不能预花收入，返城停止消耗仍计入已有粮草零头', () {
    const field = SupplyCommitment(.9, .1, 8);
    expect(field.cost(.5), 0);
    expect(field.cost(1), 1);
    expect(field.cost(20), 1);
    final c = nationalScenario(ai: false, level: 1, guards: [0], reserves: 4);
    final hero = c.garrisonAt(1).first;
    c.dispatchTo(hero, const Offset(1000, 800), countryId: 1);
    final rules = c.aiRulesForTesting(), view = c.aiObservationFor(1);
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
    );
    expect(ledger.cash().reserve, greaterThanOrEqualTo(11));
    expect(ledger.gold, c.goldFor(1));
  });
  test('T04/R09 在外英雄只能使用随身武器，不能读取其他国家库存', () {
    final c = nationalScenario(
      ai: false,
      stock: {
        '1': {'0': 3},
        '2': {'7': 3},
      },
    );
    final hero = c.garrisonAt(1).first;
    c.dispatchTo(
      hero,
      const Offset(300, 500),
      countryId: 1,
      weaponSlots: {0: 0},
    );
    final view = c.aiObservationFor(1);
    expect(view.hero(hero.id)!.weapons, [0]);
    expect(view.nation.stock[0], 2);
    expect(view.countries.firstWhere((v) => v.id == 2).stock, isEmpty);
    final guards = view.garrison(1);
    expect(guards.every((h) => h.weapons.isEmpty), isTrue);
  });
}
