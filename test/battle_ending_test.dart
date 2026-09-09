import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';

BattleArmy _army(String id, bool strong) => BattleArmy(
  id: id,
  name: id,
  general: BattleHealth(strong ? 95 : 1),
  attack: strong ? 50 : 1,
  soldiers: [],
);

BattleSimulation _battle({
  bool attackerWins = true,
  bool draw = false,
  BattleSide perspective = BattleSide.attacker,
}) => BattleSimulation(
  attacker: _army('a', !draw && attackerWins),
  defender: _army('d', !draw && !attackerWins),
  seed: 7,
  resultPerspective: perspective,
);

void _until(BattleSimulation sim, BattleStage stage) {
  for (var i = 0; i < 5000 && sim.stage != stage && !sim.finished; i++) {
    sim.advance(BattleSimulation.fixedStep);
  }
  expect(sim.stage, stage);
}

void main() {
  for (final rightWins in [true, false]) {
    for (final perspective in BattleSide.values) {
      test('胜者${rightWins ? '右行至左' : '左行至右'}，$perspective 视角保留举剑与原结果时长', () {
        final sim = _battle(attackerWins: rightWins, perspective: perspective);
        _until(sim, BattleStage.falling);
        expect(sim.announcedResult, isNull);
        _until(sim, BattleStage.victory);
        final cueStarted = sim.elapsed;
        expect(sim.result, isNull);
        expect(sim.announcedResult, isNull);
        final positions = sim.units.map((u) => u.position).toList();
        _until(sim, BattleStage.ending);
        expect(sim.units.map((u) => u.position), isNot(positions));
        final won = rightWins == (perspective == BattleSide.attacker);
        expect(sim.announcementIndex, won ? 0 : 1);
        expect(sim.endingMessage, won ? '胜利！' : '失败！');
        expect(
          sim.announcedResult,
          rightWins ? BattleResult.attackerWon : BattleResult.defenderWon,
        );
        expect(sim.finished, isFalse);
        final marchedFrames = ((sim.elapsed - cueStarted) * 60).round();
        // 独立以原驱动测量的 194/223 帧校验，走场已占用其中一段时间。
        final cueFrames = won ? 194 : 223;
        final remainingFrames = cueFrames - marchedFrames + 9;
        expect(remainingFrames, greaterThan(60));
        expect(remainingFrames, lessThan(cueFrames));
        final stoppedPositions = sim.units.map((u) => u.position).toList();
        final health = sim.units.map((u) => u.health.hp).toList();
        final clashes = sim.clashes;
        for (var frame = 0; frame < remainingFrames - 1; frame++) {
          sim.advance(BattleSimulation.fixedStep);
          expect(sim.stage, BattleStage.ending);
          expect(sim.result, isNull);
          expect(sim.units.map((u) => u.position), stoppedPositions);
          expect(sim.units.map((u) => u.health.hp), health);
          expect(sim.clashes, clashes);
          expect(sim.formations.values.every((f) => !f.moving), isTrue);
          for (final unit in sim.units.where((u) => u.health.alive)) {
            expect(unit.animationFrame(sim.elapsed), 2);
          }
        }
        sim.advance(BattleSimulation.fixedStep);
        expect(sim.finished, isTrue);
        expect(sim.result, sim.announcedResult);
        expect(sim.stage, BattleStage.complete);
      });
    }
  }

  test('互刺无胜军走场，双方退场完成后保留原失败曲与九帧尾声', () {
    final sim = _battle(draw: true);
    _until(sim, BattleStage.ending);
    expect(sim.announcedResult, BattleResult.draw);
    expect(sim.announcementIndex, 2);
    expect(sim.units.every((u) => !u.visible), isTrue);
    sim.advance(231 / 60);
    expect(sim.finished, isFalse);
    sim.advance(1 / 60);
    expect(sim.result, BattleResult.draw);
  });

  test('后台大步进与逐帧观战的收尾、阵亡和站位一致，停止后不补发结果', () {
    final watched = _battle(), hidden = _battle();
    _until(watched, BattleStage.ending);
    hidden.advance(watched.elapsed);
    expect(hidden.stage, watched.stage);
    expect(hidden.endingMessage, watched.endingMessage);
    watched.advance(60);
    for (var i = 0; i < 3600; i++) {
      hidden.advance(1 / 60);
    }
    expect(hidden.result, watched.result);
    expect(
      hidden.units.map((u) => u.position),
      watched.units.map((u) => u.position),
    );
    final stopped = _battle();
    _until(stopped, BattleStage.ending);
    stopped.stop();
    stopped.advance(60);
    expect(stopped.result, isNull);
  });

  for (final protagonist in [false, true]) {
    test('${protagonist ? '主角' : '普通将领'}战败，举剑提示期间不提前退观战或结算阵亡', () {
      final worlds = decodeWorlds(
        File('assets/maps/worlds.json').readAsStringSync(),
      );
      final catalog = decodeRomHeroes(
        File('assets/data/rom_heroes.json').readAsStringSync(),
      );
      final c = WorldController(worlds, heroCatalog: catalog, aiEnabled: false);
      addTearDown(c.dispose);
      final hero = c.campaign.heroes.firstWhere(
        (h) => h.sourceId == (protagonist ? 40 : 0),
      );
      hero.hp = 1;
      final march = c.campaign.dispatch(hero, c.world.cities[1])!;
      for (final soldier in hero.squad) {
        soldier.hp = 0;
      }
      march.position = march.destination;
      c.tick(0.02);
      final battle = c.campaign.battles[1]!;
      c.watchBattle(battle);
      for (
        var i = 0;
        i < 5000 && battle.simulation.stage != BattleStage.ending;
        i++
      ) {
        c.tick(1 / 60);
      }
      expect(battle.simulation.endingMessage, '失败！');
      final homeLevel = c.campaign.cities[0]!.level;
      c.tick(0.5);
      expect(c.watchedBattle, same(battle));
      expect(c.campaign.heroes, contains(hero));
      expect(c.campaign.defeated, isFalse);
      expect(battle.isActive, isTrue);
      for (var i = 0; i < 1000 && battle.isActive; i++) {
        c.tick(1 / 60);
      }
      expect(battle.isActive, isFalse);
      expect(c.watchedBattle, isNull);
      expect(c.campaign.heroes, isNot(contains(hero)));
      expect(c.campaign.defeated, protagonist);
      expect(c.campaign.cities[0]!.level, homeLevel);
    });
  }
}
