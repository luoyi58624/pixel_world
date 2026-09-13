import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('规划征兵必须付现，失败不改变余额与兵员，允许恰好花完余额', () {
    final c = nationalScenario(ai: false, gold: 3, reserves: 0);
    addTearDown(c.dispose);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
    );
    expect(ledger.affordableSoldiers, 3);
    expect(ledger.buySoldiers(4), isFalse);
    expect(ledger.gold, 3);
    expect(ledger.reserves, 0);
    expect(ledger.buySoldiers(3), isTrue);
    expect(ledger.gold, 0);
    expect(ledger.reserves, 3);
    for (final balance in [0, -5]) {
      ledger.gold = balance;
      expect(ledger.affordableSoldiers, 0);
      expect(ledger.buySoldiers(1), isFalse);

      expect(ledger.recruit(view.city(1)!), isFalse);
      expect(ledger.gold, balance);
      expect(ledger.reserves, 3);
    }
  });

  for (final gold in [0, 1, 2]) {
    test('提交时逐笔复核两次补兵，余额$gold不允许整组透支', () {
      final worker = ManualAiWorker();
      final c = nationalScenario(
        gold: gold,
        reserves: 0,
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
      final group = AiCommandGroup(
        reason: '核验组合采购现金',
        actions: [
          AiAction(AiActionKind.soldiers, city: 1, amount: 1),
          AiAction(AiActionKind.soldiers, city: 1, amount: 1),
        ],
        minimumGold: -100,
      );
      worker.replies.add(
        AiReply.forRequest(request, CountryPlan(groups: [group])),
      );
      c.advance(1 / 60);
      expect(c.goldFor(1), gold < 2 ? gold : 0);
      expect(c.reserveSoldiersFor(1), gold < 2 ? 0 : 2);
      expect(c.aiDiagnostics.rejected, gold < 2 ? greaterThan(0) : 0);
    });
  }

  test('等待AI回复时已花掉的现金不能被旧采购计划再次使用', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(
      gold: 3,
      reserves: 0,
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
    expect(c.buySoldiers(1, 1, countryId: 1), isTrue);
    worker.replies.add(
      AiReply.forRequest(
        request,
        CountryPlan(
          groups: [
            AiCommandGroup(
              reason: '旧余额采购',
              actions: [AiAction(AiActionKind.soldiers, city: 1, amount: 3)],
              minimumGold: 0,
            ),
          ],
        ),
      ),
    );
    c.advance(1 / 60);
    expect(c.goldFor(1), 2);
    expect(c.reserveSoldiersFor(1), 1);
    expect(c.aiDiagnostics.rejected, greaterThan(0));
  });

  test('真实AI受袭时用最后现金补兵，不等待满队也不透支', () {
    final c = nationalScenario(gold: 2, reserves: 0, recruitment: true);
    addTearDown(c.dispose);
    approaching(c, distance: 100);
    advanceAi(c, 6);
    expect(c.goldFor(1), 0);
    final purchases = c.events
        .forCountry(1)
        .query()
        .where((e) => e.kind.name == 'soldiersRecruited');
    expect(purchases, isNotEmpty, reason: c.aiDiagnostics.events.toString());
    expect(
      c.events.forCountry(1).query().where((e) => e.kind.name == 'heroSigned'),
      isEmpty,
    );
  });
}
