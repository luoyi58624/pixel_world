import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/battle_simulation.dart';

BattleArmy army(String id, {int attack = 15, int hp = 95, int soldiers = 4}) =>
    BattleArmy(
      id: id,
      name: id,
      general: BattleHealth(hp),
      attack: attack,
      soldiers: List.generate(soldiers, (_) => BattleHealth(20)),
    );
BattleSimulation battle({
  int attack = 15,
  int defense = 15,
  bool auto = false,
}) => BattleSimulation(
  attacker: army('a', attack: attack),
  defender: army('d', attack: defense - GameConfig.cityDefenseBaseAttack),
  seed: 12345,
  autoCharge: auto,
);
void round(BattleSimulation sim, int n) {
  for (var f = 0; f < 2000 && sim.clashes < n && !sim.finished; f++) {
    sim.advance(1 / 60);
  }
  expect(sim.clashes, n);
}

void main() {
  test('原版兵力20、每兵强度2，首轮碰撞7到13点而非全属性直接扣血', () {
    final sim = battle();
    expect(sim.basePower(BattleSide.attacker), 23);
    expect(sim.attackerMorale.maximum, 63);
    round(sim, 1);
    expect(sim.lastClash!.attackerDamage, inInclusiveRange(7, 13));
    expect(sim.lastClash!.defenderDamage, inInclusiveRange(7, 13));
    expect(sim.attacker.general.hp, 95);
    expect(sim.defender.general.hp, 95);
    expect(sim.survivors(BattleSide.attacker), 4);
    expect(sim.formations.values.every((f) => f.velocity < 0), isTrue);
  });
  test('原版开场后逐帧加速，接触后双向反弹，自然回冲而非固定两秒等待', () {
    final sim = battle();
    sim.advance(GameConfig.battleFormationFrames / 60);
    expect(sim.formations[BattleSide.attacker]!.frontX, 208);
    round(sim, 1);
    final first = sim.elapsed;
    expect(
      first - GameConfig.battleFormationFrames / 60,
      inInclusiveRange(0.7, 1.2),
    );
    final right = sim.formations[BattleSide.attacker]!.frontX;
    sim.advance(1 / 60);
    expect(
      sim.formations[BattleSide.attacker]!.frontX,
      greaterThanOrEqualTo(right),
    );
    round(sim, 2);
    expect(sim.elapsed - first, inInclusiveRange(0.5, 1.5));
  });
  test('红条由战斗属性初始化，受伤和兵数不改红条；下一场按兵数重建整队兵力', () {
    final a = army('a', attack: 5)..general.hp = 20;
    a.soldiers.first.hp = 3;
    final sim = BattleSimulation(attacker: a, defender: army('d'), seed: 3);
    expect(sim.attackerMorale.maximum, 23);
    expect(a.general.hp, 20);
    expect(a.soldiers.every((s) => s.hp == 20), isTrue);
    expect(sim.units.firstWhere((u) => u.id == 'a').health, same(a.general));
  });
  test('原版槽位随机减员、总兵力守恒、士兵不在纵向补位', () {
    final sim = battle();
    var aDamage = 0.0, dDamage = 0.0;
    for (var n = 1; n <= 2; n++) {
      round(sim, n);
      aDamage += sim.lastClash!.defenderDamage;
      dDamage += sim.lastClash!.attackerDamage;
      expect(
        sim.attacker.soldiers.fold<double>(0, (sum, s) => sum + s.hp),
        80 - aDamage,
      );
      expect(
        sim.defender.soldiers.fold<double>(0, (sum, s) => sum + s.hp),
        80 - dDamage,
      );
      for (final unit in sim.units.where(
        (u) => u.health.alive && !u.isGeneral,
      )) {
        expect(unit.position.dy, 48 + unit.slot * 24);
      }
    }
    expect(sim.units.any((u) => u.diedAt != null), isTrue);
  });
  test('士兵阵亡后保留原版飞出和弹地，能经过底部面板区域', () {
    final sim = battle(attack: 5, defense: 19);
    var passedFloor = false;
    for (var f = 0; f < 1800 && !sim.finished; f++) {
      sim.advance(1 / 60);
      passedFloor |= sim.units.any(
        (u) => !u.health.alive && u.visible && u.position.dy > 144,
      );
    }
    expect(passedFloor, isTrue);
    expect(sim.finished, isTrue);
    expect(sim.result, BattleResult.defenderWon);
  });
  test('将领归零后先飞出再播放胜军过场，期间不再制造普通伤害', () {
    final sim = BattleSimulation(
      attacker: army('a', attack: 5, hp: 1, soldiers: 0),
      defender: army('d'),
      seed: 7,
    );
    while (sim.attacker.general.alive) {
      sim.advance(1 / 60);
    }
    expect(sim.finished, isFalse);
    expect(sim.stage, BattleStage.falling);
    final clashes = sim.clashes;
    final hp = sim.defender.general.hp;
    var sawVictory = false;
    for (var f = 0; f < 1200 && !sim.finished; f++) {
      sim.advance(1 / 60);
      sawVictory |= sim.stage == BattleStage.victory;
    }
    expect(sawVictory, isTrue);
    expect(sim.result, BattleResult.defenderWon);
    expect(sim.clashes, clashes);
    expect(sim.defender.general.hp, hp);
  });
  test('不同刷新率和后台大步进得到同一场战斗，撤离停止计算', () {
    final a = battle(auto: true), b = battle(auto: true);
    a.advance(9);
    for (var i = 0; i < 540; i++) {
      b.advance(1 / 60);
    }
    expect(a.clashes, b.clashes);
    expect(a.attacker.general.hp, b.attacker.general.hp);
    expect(
      a.attacker.soldiers.map((s) => s.hp),
      b.attacker.soldiers.map((s) => s.hp),
    );
    expect(a.units.map((u) => u.position), b.units.map((u) => u.position));
    expect(a.attackerMorale.remaining, b.attackerMorale.remaining);
    a.stop();
    final positions = a.units.map((u) => u.position).toList();
    a.advance(100);
    expect(a.units.map((u) => u.position), positions);
  });
}
