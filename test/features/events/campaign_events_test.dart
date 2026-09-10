import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:flutter_test/flutter_test.dart';

import 'dart:io';
import 'dart:math' as math;

import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';

import '../../support/national_ai_fixture.dart';
import '../../support/weapon_strategy_fixture.dart';

void main() {
  test('开启事件记录和接收器报错都不改变 AI 行为、月结或游戏随机流', () {
    final world = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
    ).first;
    final heroes = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    CampaignState make(bool enabled) => CampaignState.fromRom(
      world,
      heroes,
      aiWorkerFactory: SynchronousAiWorker.new,
      aiRandom: math.Random(17),
      economyRandom: math.Random(18),
      recruitmentRandom: math.Random(19),
      siegeRandom: math.Random(20),
      weaponRandom: math.Random(21),
      retreatRandom: math.Random(22),
      eventLog: CampaignEvents(
        worldId: world.id,
        enabled: enabled,
        onEvent: (_) => throw StateError('测试接收器错误'),
      ),
    );
    final recorded = make(true), silent = make(false);
    addTearDown(recorded.dispose);
    addTearDown(silent.dispose);
    for (var i = 0; i < 3900; i++) {
      recorded.advance(1 / 60);
      silent.advance(1 / 60);
    }
    expect(
      recorded.aiObservationFor(0).toJson(),
      silent.aiObservationFor(0).toJson(),
    );
    expect(
      recorded.aiObservationFor(1).toJson(),
      silent.aiObservationFor(1).toJson(),
    );
    expect(recorded.events.totalCount, greaterThan(0));
    expect(recorded.events.sinkErrors, recorded.events.totalCount);
    expect(silent.events.totalCount, 0);
  });
  test('玩家和各国操作归入自己的日志，记录真实扣费和不可变等级', () {
    final c = weaponStrategyCampaign(sourceLevel: 2);
    final player = c.garrisonAt(0).first;
    final general = c.garrisonAt(1).first;
    c.buyWeapon(0);
    final before = c.goldFor(1);
    expect(c.upgradeCity(1, hero: general, countryId: 1), isTrue);
    final record = c.events.forCountry(1).query().last;
    expect(record.kind, GameEventKind.cityUpgraded);
    expect(record.source, GameEventSource.ai);
    expect((record.data['before'] as Map)['gold'], before);
    expect((record.data['after'] as Map)['gold'], c.goldFor(1));
    expect(
      c.events
          .forCountry(0)
          .query()
          .any((e) => e.kind == GameEventKind.cityUpgraded),
      isFalse,
    );
    c.upgradeCity(1, hero: general, countryId: 1);
    expect(record.data['levelAfter'], 3);
    final troop = c.dispatchTo(player, const GamePoint(900, 600))!;
    c.moveTo(troop.hero.id, const GamePoint(880, 590));
    c.camp(troop.hero.id);
    final own = c.events.forCountry(0).query();
    expect(
      own.map((e) => e.kind),
      containsAll([
        GameEventKind.weaponPurchased,
        GameEventKind.heroDispatched,
        GameEventKind.heroMoved,
        GameEventKind.heroCamped,
      ]),
    );
    expect(own.last.source, GameEventSource.player);
    c.setPaused(true);
    final gold = c.gold;
    expect(c.buyWeapon(0), isFalse);
    expect(c.events.forCountry(0).query().last.phase, GameEventPhase.rejected);
    expect(c.gold, gold);
  });
  test('发现威胁到执行升级属于同一国家的决策链，过期回复不伪装成成功', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(workerFactory: () => worker);
    addTearDown(c.dispose);
    approaching(c);
    c.advance(1 / 60);
    final request = worker.requests.firstWhere((r) => r.country == 1);
    final requested = c.events
        .forCountry(1)
        .query()
        .lastWhere((e) => e.kind == GameEventKind.decisionRequested);
    expect(
      c.events
          .forCountry(1)
          .query()
          .any((e) => e.kind == GameEventKind.threatDetected),
      isTrue,
    );
    worker.replies.add(worker.solve(request));
    c.advance(1 / 60);
    final chain = c.events
        .forCountry(1)
        .query(decisionId: requested.decisionId);
    expect(
      chain.map((e) => e.kind),
      containsAll([
        GameEventKind.planProposed,
        GameEventKind.planAccepted,
        GameEventKind.cityUpgraded,
        GameEventKind.commandApplied,
        GameEventKind.decisionFinalized,
      ]),
    );
    expect(chain.every((e) => e.countryId == 1), isTrue);
    final finalDecision = chain.singleWhere((e) => e.isFinalDecision);
    expect(
      (finalDecision.data['actions'] as List).length,
      chain.where((e) => e.kind == GameEventKind.commandApplied).length,
    );
    expect(finalDecision.summary, contains('城防升至'));
    expect(
      c.events.forCountry(2).query(decisionId: requested.decisionId),
      isEmpty,
    );
    final gold = c.goldFor(1);
    worker.replies.add(worker.solve(request));
    c.advance(1 / 60);
    expect(
      c.events.forCountry(1).query(decisionId: requested.decisionId).last.kind,
      GameEventKind.planRejected,
    );
    expect(c.goldFor(1), gold);
    expect(c.events.forCountry(1).decisionCount, 1);
    for (var i = 0; i < 10; i++) {
      c.advance(1 / 60);
    }
    expect(
      c.events
          .forCountry(1)
          .query()
          .where((e) => e.kind == GameEventKind.threatDetected)
          .length,
      1,
    );
  });
  test('相同的空闲备战决定只记录一次，策略变化才新增', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(workerFactory: () => worker);
    addTearDown(c.dispose);
    void submit(String phase) {
      final previous = worker.requests
          .where((r) => r.country == 1)
          .lastOrNull
          ?.id;
      for (var i = 0; i < 1800; i++) {
        c.advance(1 / 60);
        if (worker.requests.where((r) => r.country == 1).lastOrNull?.id !=
            previous) {
          break;
        }
      }
      final request = worker.requests.lastWhere((r) => r.country == 1);
      expect(request.id, isNot(previous));
      worker.replies.add(
        AiReply.forRequest(request, CountryPlan(phase: phase)),
      );
      c.advance(1 / 60);
    }

    submit('saving');
    submit('saving');
    expect(c.events.forCountry(1).decisionCount, 1);
    submit('defending');
    expect(c.events.forCountry(1).decisionCount, 2);
    submit('preparing');
    expect(c.events.forCountry(1).decisionCount, 2);
  });
  test('多组动作只记一条最终决定，后续组失败保留部分执行结果', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(workerFactory: () => worker);
    addTearDown(c.dispose);
    c.advance(1 / 60);
    final request = worker.requests.firstWhere((r) => r.country == 1);
    final hero = c.garrisonAt(1).first;
    final goldBefore = c.goldFor(1);
    worker.replies.add(
      AiReply.forRequest(
        request,
        CountryPlan(
          groups: [
            AiCommandGroup(
              reason: '优先加强城防',
              actions: [AiAction(AiActionKind.upgrade, hero: hero.id, city: 1)],
            ),
            AiCommandGroup(
              reason: '补充兵力',
              actions: [
                const AiAction(AiActionKind.soldiers, city: 1, amount: 1),
              ],
            ),
            AiCommandGroup(
              reason: '后续资源不足',
              actions: [
                const AiAction(AiActionKind.soldiers, city: 1, amount: 999),
              ],
            ),
          ],
        ),
      ),
    );
    c.advance(1 / 60);
    final event = c.events.forCountry(1).finalDecisions().single;
    expect(event.data['result'], 'partial');
    expect((event.data['actions'] as List).length, 2);
    expect((event.data['before'] as Map)['gold'], goldBefore);
    expect((event.data['after'] as Map)['gold'], c.goldFor(1));
    expect(event.summary, contains('征募1名士兵'));
    expect(event.summary, isNot(contains('999')));
  });
  test('进攻双方各有战况记录，受袭国独立记仇且同次攻城不逐帧重复', () {
    final c = weaponStrategyCampaign();
    final hero = c.garrisonAt(1).first;
    final march = c.dispatch(hero, c.world.cities[2], countryId: 1)!;
    march.position = march.destination;
    c.advance(1 / 60);
    final victim = c.events.forCountry(2).query();
    expect(
      victim.any(
        (e) => e.kind == GameEventKind.hatredChanged && e.targetCountryId == 1,
      ),
      isTrue,
    );
    expect(
      c.events
          .forCountry(1)
          .query()
          .any((e) => e.kind == GameEventKind.battleStarted),
      isTrue,
    );
    expect(victim.any((e) => e.kind == GameEventKind.battleStarted), isTrue);
    c.advance(1);
    expect(
      c.events
          .forCountry(2)
          .query()
          .where((e) => e.kind == GameEventKind.hatredChanged)
          .length,
      1,
    );
    final count = c.events.totalCount;
    c.setPaused(true);
    final paused = c.events.totalCount;
    c.advance(600);
    expect(c.events.totalCount, paused);
    expect(paused, greaterThan(count));
  });
}
