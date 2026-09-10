import 'dart:convert';
import 'dart:io';
import 'dart:ui' show Size;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/ai/runtime/worker.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';

import 'support/national_ai_fixture.dart';
import 'support/recruitment_fixture.dart';
import 'support/weapon_strategy_fixture.dart';

String _resources(CampaignState c) => jsonEncode({
  'month': c.settledMonths,
  'countries': [
    for (final id in c.cities.values.map((c) => c.ownerCountryId).toSet())
      [id, c.goldFor(id), c.reserveSoldiersFor(id), c.weaponInventoryFor(id)],
  ],
  'cities': [
    for (final e in c.cities.entries)
      [e.key, e.value.ownerCountryId, e.value.level],
  ],
  'heroes': [
    for (final h in c.heroes)
      [
        h.id,
        h.hp,
        h.cityId,
        h.countryId,
        h.squad.map((s) => s.hp).toList(),
        h.weaponIds,
      ],
  ],
  'marches': [
    for (final m in c.marches.values)
      [
        m.hero.id,
        m.position.dx,
        m.position.dy,
        m.phase.index,
        m.direction.index,
        m.animationStep,
        m.supplyHalted,
      ],
  ],
  'battles': [
    for (final b in c.allBattles)
      [
        b.rounds,
        b.simulation.elapsed,
        b.simulation.stage.index,
        b.simulation.weaponStrike?.frame,
        b.outcome,
      ],
  ],
  'pool': c.recruitPool.map((h) => h.id).toList(),
  'offer': c.recruitmentOffer?.hero.id,
  'journal': c.journal,
});

void main() {
  test('暂停冻结各国行军、粮草和月结，恢复只推进新传入的游戏时间', () {
    final c = weaponStrategyCampaign();
    addTearDown(c.dispose);
    final hero = weaponHero(c, 0);
    final march = c.dispatchTo(hero, const Offset(500, 650), countryId: 1)!;
    c.advance(9.5);
    c.setPaused(true);
    final snapshot = _resources(c), point = march.position, gold = c.goldFor(1);
    for (var i = 0; i < 10; i++) {
      expect(c.advance(3600), isFalse);
    }
    expect(_resources(c), snapshot);
    c.setPaused(false);
    c.advance(.5);
    expect(march.position, isNot(point));
    expect(c.goldFor(1), gold - 1);
    expect(c.settledMonths, 0);
    c.advance(49.9);
    c.setPaused(true);
    c.advance(600);
    c.setPaused(false);
    expect(c.settledMonths, 0);
    c.advance(.1);
    expect(c.settledMonths, 1);
  });

  test('暂停冻结真实战斗和武器动画，不能扣武器或触发撤退与战败结算', () {
    final c = weaponStrategyCampaign(
      catalog: testWeaponCatalog(
        stock: {
          '1': {'0': 3},
        },
      ),
    );
    addTearDown(c.dispose);
    final hero = weaponHero(c, 0);
    final march = c.dispatch(
      hero,
      c.world.cities[2],
      countryId: 1,
      weaponSlots: {0: 0, 1: 0, 2: 0},
    )!;
    march.position = march.destination;
    c.advance(1 / 60);
    final battle = c.battles[2]!;
    for (var i = 0; i < 300 && battle.simulation.weaponStrike == null; i++) {
      c.advance(1 / 60);
    }
    expect(battle.simulation.weaponStrike, isNotNull);
    c.setPaused(true);
    final snapshot = _resources(c), elapsed = battle.simulation.elapsed;
    c.advance(3600);
    expect(c.useWeapon(hero, 0, countryId: 1), isFalse);
    expect(c.retreatHero(hero.id, countryId: 1), isNull);
    expect(c.defeatHero(hero.id, winnerCountryId: 2), isNull);
    expect(_resources(c), snapshot);
    c.setPaused(false);
    c.advance(.1);
    expect(battle.simulation.elapsed, closeTo(elapsed + .1, 1e-8));
  });

  test('暂停时所有国家的采购、升级、补兵、抽取、签约和解雇都不生效', () {
    final c = weaponStrategyCampaign(recruitment: true);
    addTearDown(c.dispose);
    prepareRecruitmentCity(c, 0);
    final offer = c.drawHero(0)!;
    c.advance(59.9);
    c.setPaused(true);
    final snapshot = _resources(c);
    for (final country in [0, 1]) {
      final hero = c.garrisonAt(country).first;
      expect(c.buySoldiers(country, 1, countryId: country), isFalse);
      expect(c.buyWeapon(0, countryId: country), isFalse);
      expect(c.upgradeCity(country, hero: hero, countryId: country), isFalse);
      expect(c.reinforceHero(hero, countryId: country), 0);
      expect(c.drawHero(country, countryId: country), isNull);
      expect(c.dismissHero(hero, countryId: country), isNull);
      expect(
        c.dispatchTo(hero, const Offset(500, 650), countryId: country),
        isNull,
      );
    }
    expect(c.signHero(offer), isNull);
    expect(c.declineHero(offer), isFalse);
    c.advance(600);
    expect(c.recruitmentOffer, same(offer));
    expect(_resources(c), snapshot);
    c.setPaused(false);
    expect(c.canSignHero(offer), isTrue);
    expect(c.signHero(offer), isNotNull);
  });

  test('暂停关闭 AI，迟到建议不能在恢复后执行', () {
    final workers = <ManualAiWorker>[];
    final c = nationalScenario(
      workerFactory: () {
        final w = ManualAiWorker();
        workers.add(w);
        return w;
      },
    );
    addTearDown(c.dispose);
    approaching(c);
    c.advance(1 / 60);
    final old = workers.single,
        reply = old.solve(old.requests.first),
        gold = c.goldFor(1);
    c.setPaused(true);
    expect(old.status, AiWorkerStatus.closed);
    for (var i = 0; i < 20; i++) {
      c.advance(60);
    }
    expect(workers.length, 1);
    c.setPaused(false);
    c.advance(1 / 60);
    expect(workers.length, 2);
    workers.last.replies.add(reply);
    c.advance(1 / 60);
    expect(c.goldFor(1), gold);
    expect(c.aiDiagnostics.rejected, greaterThan(0));
  });

  test('暂停保留选点，取消镜头惯性，不能切图或通过其他战役推进资源', () {
    final c = WorldController(
      decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()),
      heroCatalog: decodeRomHeroes(
        File('assets/data/rom_heroes.json').readAsStringSync(),
      ),
      aiEnabled: false,
    );
    addTearDown(c.dispose);
    c.camera.resize(const Size(600, 400));
    c.camera.beginDrag();
    c.camera.endDrag(const Offset(1000, 200));
    final hero = c.campaign.garrisonAt(0).first;
    c.pendingHero = hero;
    c.tick(.1);
    c.setPaused(true);
    final time = c.time, center = c.camera.center;
    expect(c.camera.coasting, isFalse);
    final snapshots = c.campaigns.map(_resources).toList();
    c.tick(600);
    c.switchWorld(1);
    for (final campaign in c.campaigns) {
      expect(campaign.isPaused, isTrue);
      campaign.advance(600);
    }
    expect(c.campaigns.map(_resources).toList(), snapshots);
    expect(c.time, time);
    expect(c.camera.center, center);
    expect(c.index, 0);
    expect(c.pendingHero, same(hero));
    c.setPaused(false);
    c.tick(.25);
    expect(c.time, closeTo(time + .25, 1e-8));
    expect(c.campaigns.every((c) => !c.isPaused), isTrue);
  });
}
