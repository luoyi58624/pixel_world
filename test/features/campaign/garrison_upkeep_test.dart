import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/features/economy/domain/military_upkeep.dart';

import '../../support/coalition_fixture.dart';

void main() {
  test('额外驻军费取消，任意人数均不加收', () {
    expect(
      [
        for (final n in [0, 1, 2, 3, 6, 20, 100])
          MilitaryUpkeep.monthlyCost(n, freeHeroes: 2, factor: 0),
      ],
      [0, 0, 0, 0, 0, 0, 0],
    );
  });

  test('驻城及出征不累计额外军费，驻城工资与出征粮草独立', () {
    final c = coalitionCampaign(year: 1);
    addTearDown(c.dispose);
    expect(c.garrisonUpkeepFor(1), 0);
    c.advance(30);
    expect(c.garrisonUpkeepAccruedFor(1), 0);
    final h = c.garrisonAt(1).first;
    final home = c
        .cityBounds(c.world.cities.firstWhere((city) => city.id == 1))
        .center;
    expect(
      c.dispatchTo(h, home + const GamePoint(64, 0), countryId: 1),
      isNotNull,
    );
    c.camp(h.id, countryId: 1);
    expect(c.garrisonUpkeepFor(1), 0);
    c.advance(30);
    final bill = c.lastSettlementFor(1)!;
    expect(bill.salary, 0, reason: '此隔离场景把人物月俸显式配置为零');
    expect(bill.garrisonUpkeep, 0);
    expect(bill.netIncome, bill.baseIncome + bill.adjustment);
    expect(c.garrisonUpkeepAccruedFor(1), 0);
    c.advance(60);
    expect(c.lastSettlementFor(1)!.garrisonUpkeep, 0);
    expect(c.garrisonUpkeepAccruedFor(1), 0);
  });

  test('暂停不累计军费，观察只暴露本国账单', () {
    final c = coalitionCampaign(year: 1);
    addTearDown(c.dispose);
    c.advance(20);
    c.setPaused(true);
    c.advance(120);
    expect(c.garrisonUpkeepAccruedFor(1), 0);
    final observation = c.aiObservationFor(1);
    expect(observation.nation.garrisonAccrued, 0);
    expect(
      observation.countries
          .where((n) => n.id != 1)
          .every((n) => n.garrisonAccrued == 0),
      isTrue,
    );
    c.setPaused(false);
    c.advance(40);
    expect(c.lastSettlementFor(1)!.garrisonUpkeep, 0);
  });
}
