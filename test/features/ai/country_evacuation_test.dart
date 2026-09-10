import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/ai/protocol.dart';

import '../../support/national_ai_fixture.dart';

// 先提交真实资源结果，再取新观察下的防守建议，避免用资源阶段验证调兵。
AiReply _defenseReply(CampaignState c, ManualAiWorker worker) {
  final completed = <int>{};
  for (var i = 0; i < 180; i++) {
    for (final request in worker.requests.where((r) => r.country == 1)) {
      if (request.stage == AiDecisionStage.defense) {
        return worker.solve(request);
      }
      if (completed.add(request.id)) worker.replies.add(worker.solve(request));
    }
    c.advance(1 / 60);
  }
  throw StateError('防守调度未接续资源阶段');
}

(CampaignState, ManualAiWorker) _evacuation() {
  final worker = ManualAiWorker();
  final c = nationalScenario(
    gold: 10,
    level: 1,
    friendly: true,
    friendlyLevel: 3,
    attackerCombat: 63,
    overrides: {
      2: {'maxHp': 200},
    },
    workerFactory: () => worker,
  );
  approaching(c, distance: 200);
  c.advance(1 / 60);
  final reply = _defenseReply(c, worker);
  expect(
    reply.plan.groups
        .expand((g) => g.tasks)
        .any(
          (t) => t.hero == 'rom-0' && ['transfer', 'evacuate'].contains(t.role),
        ),
    isTrue,
    reason: reply.plan.toJson().toString(),
  );
  worker.replies.add(reply);
  c.advance(1 / 60);
  return (c, worker);
}

void main() {
  test('T10 无友城时及时占领空城作为新据点，真正进驻后改变归属', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(
      gold: 100,
      level: 2,
      guards: [0, 18],
      reserves: 12,
      friendly: true,
      attackerCombat: 63,
      overrides: {
        2: {'maxHp': 250},
      },
      workerFactory: () => worker,
    );
    addTearDown(c.dispose);
    c.cities[3]!.ownerCountryId = 2;
    approaching(c, distance: 210);
    c.advance(1 / 60);
    final reply = _defenseReply(c, worker);
    final task = reply.plan.groups
        .expand((g) => g.tasks)
        .where((t) => t.role == 'newBase')
        .firstOrNull;
    expect(task, isNotNull, reason: reply.plan.toJson().toString());
    worker.replies.add(reply);
    c.advance(1 / 60);
    final hero = c.heroes.firstWhere((h) => h.id == task!.hero);
    for (
      var i = 0;
      i < 1200 && hero.cityId != 3 && c.heroes.contains(hero);
      i++
    ) {
      c.advance(1 / 60);
    }
    expect(hero.cityId, 3);
    expect(c.cities[3]!.ownerCountryId, 1);
    expect(c.marches.containsKey(hero.id), isFalse);
  });
  test('T08 转移必须真正进驻友城才保住英雄，原城随后失守也不清除新驻军', () {
    final (c, _) = _evacuation();
    addTearDown(c.dispose);
    final core = c.heroes.firstWhere((h) => h.sourceId == 0);
    for (var i = 0; i < 650 && core.cityId != 3; i++) {
      c.advance(1 / 60);
    }
    expect(core.cityId, 3);
    expect(c.marches.containsKey(core.id), isFalse);
    expect(core.hp, core.maxHp);
    final remaining = c.garrisonAt(1).first;
    c.defeatHero(remaining.id, winnerCountryId: 2, defendedCityId: 1);
    expect(c.cities[1]!.ownerCountryId, 2);
    expect(c.heroes.contains(core), isTrue);
  });
  test('T07 只走出城门仍依赖旧城，旧城在途中失守就按原规则清除', () {
    final (c, _) = _evacuation();
    addTearDown(c.dispose);
    final core = c.heroes.firstWhere((h) => h.sourceId == 0);
    expect(c.marches.containsKey(core.id), isTrue);
    expect(core.cityId, 1);
    final remaining = c.garrisonAt(1).first;
    c.defeatHero(remaining.id, winnerCountryId: 2, defendedCityId: 1);
    expect(c.heroes.contains(core), isFalse);
    expect(c.marches.containsKey(core.id), isFalse);
  });
  test('D10/D11 换守将之前修复剩余名额，只处理未锁定的挡位英雄', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(level: 3, workerFactory: () => worker);
    addTearDown(c.dispose);
    final march = approaching(c), defender = c.garrisonAt(1).last;
    defender.hp = 0;
    c.heroes.remove(defender);
    final battle =
        CityBattle(
            c.world.cities[1],
            march.hero,
            defender,
            cityLevel: 3,
            seed: 17,
          )
          ..victories = 2
          ..nextWaveIn = .001;
    c.battles[1] = battle;
    march.phase = MarchPhase.fighting;
    c.advance(1 / 60);
    expect(battle.defender.sourceId, 0);
    expect(battle.initialCityLevel, 3);
    expect(battle.effectiveDefenseLevel, 1);
    expect(c.garrisonAt(1).where((h) => h.health.alive).length, 1);
  });
  test('T01/T05 可兑现的武器消耗确实改变防线余量，允许计入代价的自伤截击', () {
    final c = nationalScenario(
      originalWeapons: true,
      ai: false,
      level: 2,
      gold: 50,
      attackerCombat: 63,
      overrides: {
        2: {'maxHp': 200},
      },
      stock: {
        '1': {'8': 1},
      },
    );
    approaching(c, distance: 140);
    c.advance(1 / 60);
    final plan = planFor(c);
    final strikes = plan.groups
        .expand((g) => g.actions)
        .where(
          (a) => a.kind == AiActionKind.dispatch && a.weaponIds.contains(8),
        )
        .toList();
    expect(strikes, isNotEmpty, reason: plan.toJson().toString());
    expect(strikes.every((a) => a.hero != 'rom-0'), isTrue);
    expect(c.weaponStockFor(1, 8), 1); // 评估不会提前消耗装备。
  });
}
