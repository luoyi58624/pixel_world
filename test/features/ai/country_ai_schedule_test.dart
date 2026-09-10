import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/config.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/geometry.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/schedule.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';

import '../../support/national_ai_fixture.dart';

AiRequest _request(CampaignState c, int id, AiDecisionStage stage) => AiRequest(
  session: 'schedule',
  id: id,
  rulesVersion: c.aiRulesForTesting().version,
  mapVersion: c.aiMapForTesting().version,
  observation: c.aiObservationFor(1),
  deadlineTick: 180,
  stage: stage,
);

void main() {
  test('敌军越境唤醒防守，旧请求结束前不并行指挥，处理警报后恢复周期', () {
    final c = nationalScenario(ai: false);
    addTearDown(c.dispose);
    final schedule = CountryAiSchedule(const AiTuning());
    for (final stage in [AiDecisionStage.resources, AiDecisionStage.defense]) {
      final request = _request(c, stage.index + 1, stage);
      schedule.submitted(request);
      schedule.finish(request.id, 0, adopted: true);
    }
    final old = _request(c, 100, AiDecisionStage.attack);
    schedule.submitted(old);
    schedule.requestDefense(1);
    expect(schedule.due(1), isNull);
    expect(schedule.defenseAlarmPending, isTrue);
    schedule.finish(old.id, 1, adopted: false);
    expect(schedule.due(1), AiDecisionStage.defense);
    c.advance(1);
    final defense = _request(c, 101, AiDecisionStage.defense);
    schedule.submitted(defense);
    schedule.finish(defense.id, 1, adopted: true);
    expect(schedule.defenseAlarmPending, isFalse);
    expect(schedule.due(1), AiDecisionStage.attack);
  });
  test('资源30秒、哨兵8秒，资源结果落地后才防守，最后进攻', () {
    final c = nationalScenario(ai: false);
    final schedule = CountryAiSchedule(const AiTuning());
    void complete(int id, double now, AiDecisionStage stage) {
      expect(schedule.due(now), stage);
      final request = _request(c, id, stage);
      expect(AiRequest.fromJson(request.toJson()).stage, stage);
      schedule.submitted(request);
      expect(schedule.due(now + 1), isNull);
      schedule.finish(id + 1, now, adopted: true);
      expect(schedule.pending, same(request), reason: '旧回复不能完成当前调度');
      schedule.finish(id, now, adopted: true);
    }

    complete(1, 0, AiDecisionStage.resources);
    complete(2, 0, AiDecisionStage.defense);
    complete(3, 0, AiDecisionStage.attack);
    expect(schedule.due(7.99), isNull);
    complete(4, 8, AiDecisionStage.defense);
    complete(5, 8, AiDecisionStage.attack);
    complete(6, 16, AiDecisionStage.defense);
    complete(7, 16, AiDecisionStage.attack);
    complete(8, 24, AiDecisionStage.defense);
    complete(9, 24, AiDecisionStage.attack);
    complete(10, 30, AiDecisionStage.resources);
    complete(11, 30, AiDecisionStage.defense);
    complete(12, 30, AiDecisionStage.attack);
    expect(schedule.due(37.99), isNull);
  });

  test('计划失败限频重试，暂停不会重新采购或累计后台时间', () {
    final c = nationalScenario(ai: false);
    final schedule = CountryAiSchedule(const AiTuning());
    schedule.submitted(_request(c, 1, AiDecisionStage.resources));
    schedule.finish(1, 1, adopted: false);
    expect(schedule.due(2.99), isNull);
    expect(schedule.due(3), AiDecisionStage.resources);
    schedule.submitted(_request(c, 2, AiDecisionStage.resources));
    schedule.finish(2, 3, adopted: true);
    schedule.submitted(_request(c, 3, AiDecisionStage.defense));
    schedule.suspend();
    expect(schedule.due(3), AiDecisionStage.defense);
  });

  test('持续威胁不会每半秒覆盖同国尚未完成的计划', () {
    final worker = ManualAiWorker();
    final c = nationalScenario(workerFactory: () => worker);
    addTearDown(c.dispose);
    approaching(c, distance: 100);
    advanceAi(c, 2);
    final requests = worker.requests.where((r) => r.country == 1).toList();
    expect(requests.length, 1);
    expect(requests.single.stage, AiDecisionStage.resources);
  });

  test('初始城防和守将占优时，不召回更强的在外将领', () {
    final c = nationalScenario(
      ai: false,
      level: 3,
      guards: [0, 18, 19],
      reserves: 16,
      attackerCombat: 5,
      overrides: {
        0: {'combat': 63},
        18: {'combat': 40, 'maxHp': 95},
      },
    );
    final hero = c.garrisonAt(1).first;
    final march = c.dispatchTo(hero, const GamePoint(600, 100), countryId: 1)!;
    march.position =
        c.cityBounds(c.world.cities[1]).center + const GamePoint(15, -60);
    approaching(c, distance: 140);
    c.advance(1 / 60);
    final plan = planFor(c);
    expect(
      plan.groups.expand((g) => g.tasks).where((t) => t.hero == hero.id),
      isEmpty,
      reason: plan.toJson().toString(),
    );
    expect(plan.notes.join(), contains('不召回'));
  });

  test('守将已阵亡但动画未结束时，不把待扣胜轮当成招募或回援空位', () {
    final c = nationalScenario(
      level: 2,
      guards: [0, 18],
      reserves: 12,
      recruitment: true,
    );
    addTearDown(c.dispose);
    final incoming = approaching(c);
    final defender = c.garrisonAt(1).last;
    c.battles[1] = CityBattle(
      c.world.cities[1],
      incoming.hero,
      defender,
      cityLevel: 2,
    );
    incoming.phase = MarchPhase.fighting;
    defender.hp = 0;
    final view = c.aiObservationFor(1);
    expect(c.battles[1]!.victories, 0);
    expect(view.city(1)!.defenderFallen, isTrue);
    expect(view.city(1)!.safeSlots, 1);
    expect(view.city(1)!.recruitAllowed, isFalse);
    expect(
      AiRequest.fromJson(_request(c, 1, AiDecisionStage.defense).toJson())
          .observation
          .city(1)!
          .safeSlots,
      1,
    );
    expect(
      planFor(c).groups
          .expand((g) => g.actions)
          .any((a) => a.kind == AiActionKind.recruit),
      isFalse,
    );
  });

  test('本地可升级改善防守时，先使用国库而非打断远征', () {
    final c = nationalScenario(
      gold: 600,
      ai: false,
      level: 1,
      guards: [0, 18],
      reserves: 12,
      attackerCombat: 20,
      overrides: {
        0: {'combat': 45},
        18: {'combat': 18, 'maxHp': 95},
      },
    );
    final hero = c.garrisonAt(1).first;
    final march = c.dispatchTo(hero, const GamePoint(600, 100), countryId: 1)!;
    march.position =
        c.cityBounds(c.world.cities[1]).center + const GamePoint(15, -60);
    approaching(c, distance: 140);
    c.advance(1 / 60);
    final plan = planFor(c);
    expect(
      plan.groups
          .expand((g) => g.actions)
          .any((a) => a.kind == AiActionKind.upgrade),
      isTrue,
    );
    expect(
      plan.groups.expand((g) => g.tasks).any((t) => t.hero == hero.id),
      isFalse,
    );
  });

  test('在途回援跨周期占用入城名额，复制与改派不会重复累计', () {
    final c = nationalScenario(
      ai: false,
      friendly: true,
      level: 2,
      guards: [0, 18],
      friendHeroes: [19],
    );
    final hero = c.garrisonAt(1).first;
    c.dispatchTo(hero, const GamePoint(600, 100), countryId: 1);
    final view = c.aiObservationFor(1), rules = c.aiRulesForTesting();
    ArmyTask task(int city) => ArmyTask(
      hero: hero.id,
      role: 'rescue',
      city: city,
      deadlineTick: 600,
      committedUntil: 600,
      arrivalSlot: true,
      points: [view.city(city)!.center],
      expectedOrderRevision: view.hero(hero.id)!.orderRevision,
    );
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
      tasks: [task(3)],
    );
    expect(ledger.occupancy(3), 2);
    expect(ledger.copy().occupancy(3), 2);
    expect(ledger.redirect(view.hero(hero.id)!, task(1)), isTrue);
    expect(ledger.occupancy(3), 1);
    expect(ledger.occupancy(1), 2);
  });

  test('已安排且能及时入城的强援军足够时，不再召回第二人', () {
    final c = nationalScenario(
      ai: false,
      level: 2,
      guards: [0, 3, 18],
      reserves: 16,
      attackerCombat: 20,
      overrides: {
        0: {'combat': 63},
        3: {'combat': 63},
        18: {'combat': 3},
      },
    );
    final home = c.cityBounds(c.world.cities[1]).center;
    final first = c.heroes.firstWhere((h) => h.sourceId == 0);
    final second = c.heroes.firstWhere((h) => h.sourceId == 3);
    final a = c.dispatchTo(first, const GamePoint(600, 100), countryId: 1)!;
    final b = c.dispatchTo(second, const GamePoint(600, 100), countryId: 1)!;
    a.position = home + const GamePoint(0, -65);
    b.position = home + const GamePoint(20, -80);
    approaching(c, distance: 140);
    c.advance(1 / 60);
    c.moveTo(first.id, home, countryId: 1);
    final task = ArmyTask(
      hero: first.id,
      role: 'rescue',
      city: 1,
      deadlineTick: 1200,
      committedUntil: 600,
      arrivalSlot: true,
      points: [AiPoint(a.destination.dx, a.destination.dy)],
      expectedOrderRevision: c
          .aiObservationFor(1)
          .hero(first.id)!
          .orderRevision,
    );
    final plan = planFor(c, tasks: [task]);
    expect(
      plan.groups.expand((g) => g.tasks).any((t) => t.hero == second.id),
      isFalse,
      reason: plan.toJson().toString(),
    );
  });

  test('真实开局按三阶段运行，资源门槛与进攻配装一致，不进入永久等待', () {
    final world = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: CampaignSetup.decode(
        File('assets/data/campaign_config.json').readAsStringSync(),
      ),
    ).first;
    final c = CampaignState.fromRom(
      world,
      decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
      weaponCatalog: WeaponCatalog.decode(
        File('assets/data/rom_weapons.json').readAsStringSync(),
      ),
      aiWorkerFactory: SynchronousAiWorker.new,
      aiRandom: math.Random(101),
      recruitmentRandom: math.Random(121),
      economyRandom: math.Random(111),
      siegeRandom: math.Random(131),
      retreatRandom: math.Random(141),
      weaponRandom: math.Random(151),
    );
    addTearDown(c.dispose);
    advanceAi(c, 31);
    final requests = c.events
        .forCountry(1)
        .query()
        .where((e) => e.kind == GameEventKind.decisionRequested)
        .toList();
    expect(requests.take(3).map((e) => e.data['stage']), [
      'resources',
      'defense',
      'attack',
    ]);
    expect(
      c.events
          .forCountry(1)
          .query()
          .any((e) => e.kind == GameEventKind.heroDispatched),
      isTrue,
    );
    final request = _request(c, 100, AiDecisionStage.attack);
    final brain = CountryBrain(
      c.aiRulesForTesting(),
      c.aiMapForTesting(),
      request,
    );
    for (final _ in brain.steps()) {}
    expect(
      brain.result!.groups
          .expand((g) => g.actions)
          .any(
            (a) => [
              AiActionKind.upgrade,
              AiActionKind.soldiers,
              AiActionKind.recruit,
              AiActionKind.buyWeapon,
            ].contains(a.kind),
          ),
      isFalse,
    );
  });
}
