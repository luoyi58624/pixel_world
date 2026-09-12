import 'package:pixel_world/core/geometry/geometry.dart';

import '../../support/national_ai_fixture.dart' show advanceAi;

import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/foundation.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/weapon_strategy_fixture.dart';

const _balancedSiege = <int, Map<String, Object>>{
  0: {'combat': 20, 'maxHp': 140, 'salary': 0},
  2: {'combat': 20, 'maxHp': 140, 'salary': 0},
  6: {'combat': 20, 'maxHp': 140, 'salary': 0},
  7: {'combat': 20, 'maxHp': 140, 'salary': 0},
  3: {'combat': 25, 'maxHp': 95},
  4: {'combat': 25, 'maxHp': 95},
};

void main() {
  test('开局立即扩张弱城，单军足够时不把多余将领全部堆向同一目标', () {
    final c = weaponStrategyCampaign(ai: true);
    advanceAi(c, .5);
    final marches = c.marches.values
        .where((m) => m.hero.countryId == 1)
        .toList();
    expect(marches.length, 1);
    expect(marches.first.hero.sourceId, 2);
    expect(marches.every((m) => m.target!.id == 2), isTrue);
    expect(marches.every((m) => m.hero.weaponIds.length <= 3), isTrue);
    expect(c.garrisonAt(1).length, 3);
    expect(c.warPlanFor(1)!.phase, CountryWarPhase.attacking);
    c.advance(5);
    expect(c.marches.values.where((m) => m.hero.countryId == 1).length, 1);
  });

  test('高城防高级守将：同时备齐武器、士兵与粮草，多将锁定同一目标', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      fortifiedCapital: true,
      targetHeroes: [3, 4],
      enemyStock: 8,
      sourceHeroes: [0, 2, 6, 18],
      heroOverrides: _balancedSiege,
    );
    advanceAi(c, .5);
    final raid = c.marches.values.where((m) => m.hero.countryId == 1).toList();
    expect(raid.length, 2);
    expect(raid.map((m) => m.target!.id).toSet(), {2});
    expect(
      raid.every((m) => m.hero.weaponIds.isNotEmpty && m.hero.soldiers == 4),
      isTrue,
    );
    expect(c.garrisonAt(1).length, 2);
    expect(c.goldFor(1), greaterThanOrEqualTo(c.aiBudgetFor(1).reserveGold));
    // 等错峰出城完成再放到城边，避免传送夹具被待出城状态覆盖。
    c.advance(2);
    for (final march in raid) {
      march.position = march.destination;
    }
    c.advance(.2);
    expect(c.battles[2]!.isActive, isTrue);
    expect(raid.where((m) => m.phase == MarchPhase.fighting).length, 1);
    expect(raid.where((m) => m.phase == MarchPhase.awaitingBattle).length, 1);
  });

  test('武器与后勤不足时等待，月结能支付有效出击后行动，不提前花空国库', () {
    final c = weaponStrategyCampaign(
      ai: true,
      gold: 5,
      targetLevel: 5,
      fortifiedCapital: true,
      targetHeroes: [3, 4],
      sourceHeroes: [0, 2, 6, 18],
      heroOverrides: _balancedSiege,
    );
    advanceAi(c, .5);
    final plan = c.warPlanFor(1)!;
    expect(plan.phase, CountryWarPhase.saving);
    expect(plan.requiredGold, greaterThan(1));
    expect(c.marches, isEmpty);
    expect(c.goldFor(1), 5, reason: '初始现金低于新军费准备金时不额外花钱');
    expect(
      c.heroes.where((h) => h.countryId == 1).every((h) => h.weaponIds.isEmpty),
      isTrue,
    );
    final target = plan.targetCityId;
    for (
      var i = 0;
      i < 36000 && c.marches.values.every((m) => m.hero.countryId != 1);
      i++
    ) {
      c.advance(1 / 60);
    }
    expect(plan.targetCityId, target);
    expect(plan.phase, CountryWarPhase.attacking);
    final funded = c.marches.values
        .where((m) => m.hero.countryId == 1)
        .toList();
    expect(funded.length, inInclusiveRange(1, 2));
    expect(
      funded.every((m) => m.hero.weaponIds.length == 1 && m.hero.soldiers == 4),
      isTrue,
    );
    expect(c.goldFor(1), greaterThan(0));
  });

  test('附近出现容易占领的城池时优先拿下，不先撞五级重兵城', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      fortifiedCapital: true,
      targetHeroes: [3, 4, 5],
      enemyStock: 12,
      easyNeighbor: true,
    );
    advanceAi(c, .5);
    expect(c.warPlanFor(1)!.targetCityId, 3);
    expect(
      c.marches.values
          .where((m) => m.hero.countryId == 1)
          .every((m) => m.target!.id == 3),
      isTrue,
    );
  });

  test('强城可先以装备齐全的优势编队突破前排，不能无装备送死', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      fortifiedCapital: true,
      targetHeroes: [3, 4, 5],
      enemyStock: 12,
      recruitment: true,
      sourceHeroes: [0, 2, 6, 7, 18],
      sourceLevel: 5,
      heroOverrides: _balancedSiege,
    );
    for (
      var n = 0;
      n < 1200 && c.marches.values.every((m) => m.hero.countryId != 1);
      n++
    ) {
      c.advance(1 / 60);
    }
    expect(
      c.warPlanFor(1)!.phase,
      CountryWarPhase.attacking,
      reason: c.aiDiagnostics.events.toString(),
    );
    final raids = c.marches.values.where((m) => m.hero.countryId == 1).toList();
    expect(raids.length, greaterThanOrEqualTo(2));
    expect(
      raids.every((m) => m.hero.weaponIds.isNotEmpty && m.hero.soldiers == 4),
      isTrue,
    );
    expect(raids.map((m) => m.target!.id).toSet(), {2});
    expect(c.goldFor(1), greaterThanOrEqualTo(c.aiBudgetFor(1).reserveGold));
  });

  test('侦测可见来敌后修复迎战名额，不在危险满员城继续招募', () {
    final c = weaponStrategyCampaign(ai: true, gold: 300, recruitment: true);
    final attacker = weaponHero(c, 40);
    final march = c.dispatch(attacker, c.world.cities[1])!;
    march.position =
        c.cityBounds(c.world.cities[1]).center + const GamePoint(260, 0);
    advanceAi(c, .5);
    expect(c.warPlanFor(1)!.phase, CountryWarPhase.defending);
    expect(c.weaponStorageUsed(1), 0);
    expect(c.garrisonAt(1).every((hero) => hero.weaponIds.isEmpty), isTrue);
    expect(c.cities[1]!.level, inInclusiveRange(4, 5));
    expect(c.marches.values.where((m) => m.hero.countryId == 1), isEmpty);
    c.advance(5);
    expect(c.cities[1]!.level, inInclusiveRange(4, 5));
    expect(c.garrisonAt(1).length, lessThanOrEqualTo(c.cities[1]!.level));
    expect(c.marches.values.where((m) => m.hero.countryId == 1), isEmpty);
    expect(c.goldFor(1), greaterThanOrEqualTo(c.aiBudgetFor(1).reserveGold));
  });

  test('高级AI在拼杀前自动使用已备武器，尚有武器时不先空手撤退', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      fortifiedCapital: true,
      targetHeroes: [3],
    );
    final hero = weaponHero(c, 0);
    for (var i = 0; i < 3; i++) {
      c.buyWeapon(1, countryId: 1);
    }
    final march = c.dispatch(
      hero,
      c.world.cities[2],
      countryId: 1,
      weaponSlots: {0: 1},
    )!;
    march.position = march.destination;
    c.advance(.02);
    final battle = c.battles[2]!;
    c.advance(2.8);
    expect(battle.simulation.weaponStrike, isNotNull);
    expect(hero.weaponIds, isEmpty);
    expect(battle.simulation.retreat, isNull);
    while (battle.simulation.weaponStrike != null) {
      c.advance(1 / 60);
    }
    expect(
      battle.defender.squad.fold<double>(0, (n, s) => n + s.hp),
      80 - c.weaponCatalog.weapons[1]!.damage,
    );
  });

  test('按国家错峰决策、路线缓存复用，正式地图可经营并发动有准备的进攻', () {
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: CampaignSetup.decode(
        File('assets/data/campaign_config.json5').readAsStringSync(),
      ),
    );
    final heroes = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    var deployments = 0;
    final clock = Stopwatch()..start();
    for (final world in worlds) {
      final c = CampaignState.fromRom(
        world,
        heroes,
        weaponCatalog: testWeaponCatalog(),
        aiWorkerFactory: SynchronousAiWorker.new,
        aiRandom: math.Random(7),
        recruitmentRandom: math.Random(11),
        economyRandom: math.Random(17),
        retreatRandom: math.Random(31),
      );
      for (var frame = 0; frame < 10800 && !c.defeated; frame++) {
        final before = c.aiStrategicDecisions;
        c.advance(1 / 60);
        expect(c.aiStrategicDecisions - before, lessThanOrEqualTo(1));
        if (frame % 60 == 0) {
          deployments += c.marches.values.where((m) => !m.hero.isPlayer).length;
          expect(c.heroes.map((h) => h.id).toSet().length, c.heroes.length);
          for (final country in c.world.countries) {
            expect(c.goldFor(country.id), greaterThanOrEqualTo(0));
            expect(
              c.reserveSoldiersFor(country.id),
              lessThanOrEqualTo(c.reserveCapacityFor(country.id)),
            );
          }
        }
      }
      expect(
        c.aiRouteEstimates,
        lessThanOrEqualTo(c.aiStrategicDecisions * 6000),
      );
    }
    clock.stop();
    debugPrint(
      'Three maps / 180 simulated seconds: ${clock.elapsedMilliseconds} ms; observed deployments: $deployments',
    );
    expect(deployments, greaterThan(0));
  });
}
