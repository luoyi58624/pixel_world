import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/foundation.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/campaign_setup.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

import 'support/weapon_strategy_fixture.dart';

void main() {
  test('近处弱城只派足够的高级将领，不把所有多余将领倾巢派出', () {
    final c = weaponStrategyCampaign(ai: true);
    c.advance(8);
    final marches = c.marches.values
        .where((m) => m.hero.countryId == 1)
        .toList();
    expect(marches.length, 1);
    expect(marches.single.hero.sourceId, 0);
    expect(marches.single.target!.id, 2);
    expect(marches.single.hero.weaponIds, isEmpty);
    expect(c.garrisonAt(1).length, 3);
    expect(c.warPlanFor(1)!.phase, CountryWarPhase.attacking);
    c.advance(5);
    expect(c.marches.values.where((m) => m.hero.countryId == 1).length, 1);
  });

  test('高城防高级守将：同时备齐武器、士兵与粮草，多将锁定同一目标', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      targetHeroes: [3, 4],
      enemyStock: 8,
    );
    c.advance(8);
    final raid = c.marches.values.where((m) => m.hero.countryId == 1).toList();
    expect(raid.length, 2);
    expect(raid.map((m) => m.target!.id).toSet(), {2});
    expect(
      raid.every((m) => m.hero.weaponIds.isNotEmpty && m.hero.soldiers == 4),
      isTrue,
    );
    expect(c.garrisonAt(1).length, 2);
    expect(c.goldFor(1), greaterThanOrEqualTo(c.aiBudgetFor(1).reserveGold));
    // 从不同接触点抵达，仍只有第一位交战，第二位排队。
    for (final march in raid) {
      march.position = march.destination;
    }
    c.advance(1 / 60);
    expect(c.battles[2]!.isActive, isTrue);
    expect(raid.where((m) => m.phase == MarchPhase.fighting).length, 1);
    expect(raid.where((m) => m.phase == MarchPhase.awaitingBattle).length, 1);
  });

  test('强城计划钱不够时整队等待，月结筹齐后再出兵，不提前花空国库', () {
    final c = weaponStrategyCampaign(
      ai: true,
      gold: 40,
      targetLevel: 5,
      targetHeroes: [3],
    );
    c.advance(8);
    final plan = c.warPlanFor(1)!;
    expect(plan.phase, CountryWarPhase.saving);
    expect(plan.requiredGold, greaterThan(40));
    expect(c.marches, isEmpty);
    expect(c.goldFor(1), 40);
    expect(
      c.heroes.where((h) => h.countryId == 1).every((h) => h.weaponIds.isEmpty),
      isTrue,
    );
    final target = plan.targetCityId;
    c.advance(60);
    expect(plan.targetCityId, target);
    expect(plan.phase, CountryWarPhase.attacking);
    expect(c.marches.values.where((m) => m.hero.countryId == 1).length, 1);
    expect(c.goldFor(1), greaterThan(0));
  });

  test('附近出现容易占领的城池时优先拿下，不先撞五级重兵城', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      targetHeroes: [3, 4, 5],
      enemyStock: 12,
      easyNeighbor: true,
    );
    c.advance(8);
    expect(c.warPlanFor(1)!.targetCityId, 3);
    expect(
      c.marches.values.where((m) => m.hero.countryId == 1).single.target!.id,
      3,
    );
  });

  test('实力不足的硬目标先扩充可招募名额，不无装备派弱将送死', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      targetHeroes: [3, 4, 5],
      enemyStock: 12,
      recruitment: true,
    );
    c.advance(8);
    expect(c.warPlanFor(1)!.phase, CountryWarPhase.preparing);
    expect(c.marches, isEmpty);
    expect(c.cities[1]!.level, 3);
    expect(c.goldFor(1), 935);
  });

  test('侦测来敌后优先升级、招将、补兵，守军不购买武器且停止新的攻势', () {
    final c = weaponStrategyCampaign(ai: true, gold: 300, recruitment: true);
    final attacker = weaponHero(c, 40);
    final march = c.dispatch(attacker, c.world.cities[1])!;
    march.position =
        c.cityBounds(c.world.cities[1]).center + const Offset(260, 0);
    c.advance(8);
    expect(c.warPlanFor(1)!.phase, CountryWarPhase.defending);
    expect(c.weaponStorageUsed(1), 0);
    expect(c.garrisonAt(1).every((hero) => hero.weaponIds.isEmpty), isTrue);
    expect(c.cities[1]!.level, 3);
    expect(c.marches.values.where((m) => m.hero.countryId == 1), isEmpty);
    c.advance(5);
    expect(c.cities[1]!.level, 4);
    expect(c.heroes.where((h) => h.countryId == 1).length, greaterThan(4));
    expect(c.marches.values.where((m) => m.hero.countryId == 1), isEmpty);
    expect(c.goldFor(1), greaterThanOrEqualTo(c.aiBudgetFor(1).reserveGold));
  });

  test('高级AI在拼杀前自动使用已备武器，尚有武器时不先空手撤退', () {
    final c = weaponStrategyCampaign(
      ai: true,
      targetLevel: 5,
      targetHeroes: [3],
    );
    final hero = weaponHero(c, 0);
    for (var i = 0; i < 3; i++) {
      c.buyWeapon(9, countryId: 1);
    }
    final march = c.dispatch(
      hero,
      c.world.cities[2],
      countryId: 1,
      weaponSlots: {0: 9, 1: 9, 2: 9},
    )!;
    march.position = march.destination;
    c.advance(.02);
    final battle = c.battles[2]!;
    c.advance(2.8);
    expect(battle.simulation.weaponStrike, isNotNull);
    expect(hero.weaponIds.length, 2);
    expect(battle.simulation.retreat, isNull);
    c.advance(.6);
    expect(battle.defender.squad.fold<double>(0, (n, s) => n + s.hp), 55);
  });

  test('按国家错峰决策、路线缓存复用，正式地图可经营并发动有准备的进攻', () {
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: CampaignSetup.decode(
        File('assets/data/campaign_config.json').readAsStringSync(),
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
      expect(c.aiRouteEstimates, lessThan(c.aiStrategicDecisions * 12 + 100));
    }
    clock.stop();
    debugPrint(
      'Three maps / 180 simulated seconds: ${clock.elapsedMilliseconds} ms; observed deployments: $deployments',
    );
    expect(deployments, greaterThan(0));
  });
}
