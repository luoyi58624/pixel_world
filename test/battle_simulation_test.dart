import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/battle_simulation.dart';

BattleArmy _army(String id, {int hp = 95, int attack = 15, int soldiers = 4}) =>
    BattleArmy(
      id: id,
      name: id,
      general: BattleHealth(hp),
      attack: attack,
      soldiers: List.generate(
        soldiers,
        (_) => BattleHealth(BattleSimulation.soldierHp),
      ),
    );

BattleSimulation _battle({
  int attack = 15,
  int defense = 15,
  int hp = 95,
  int soldiers = 4,
  int seed = 1,
}) => BattleSimulation(
  attacker: _army('a', hp: hp, attack: attack, soldiers: soldiers),
  defender: _army('d', hp: hp, attack: defense, soldiers: soldiers),
  seed: seed,
);

void _contact(BattleSimulation sim) {
  for (final side in BattleSide.values) {
    sim.formations[side]!.frontX = sim.initialContactX(side);
  }
}

void _withoutMorale(BattleSimulation sim) {
  sim.attackerMorale.remaining = 0;
  sim.defenderMorale.remaining = 0;
}

void _round(BattleSimulation sim, int count) {
  for (var i = 0; i < 12000 && sim.clashes < count && !sim.finished; i++) {
    sim.advance(1 / 60);
  }
  expect(sim.clashes, count);
}

void main() {
  test('开场冲锋和连续拼杀放慢，首击至少两秒、后续完整攻防周期至少两秒', () {
    final sim = _battle(hp: 1000);
    final times = <double>[];
    for (var frame = 0; frame < 2400 && times.length < 6; frame++) {
      sim.advance(1 / 60);
      if (sim.clashes > times.length) times.add(sim.elapsed);
    }
    expect(times.length, 6);
    expect(times.first, inInclusiveRange(2, 2.8));
    for (var i = 1; i < times.length; i++) {
      expect(times[i] - times[i - 1], inInclusiveRange(2, 3.5));
    }
  });

  test('短距离击退也在退步终点完成整备，不贴脸空转等待下次伤害', () {
    final sim = _battle(attack: 1, defense: 1, hp: 1000, soldiers: 0);
    _withoutMorale(sim);
    _round(sim, 1);
    final clashAt = sim.elapsed;
    while (sim.formations.values.any(
      (formation) => formation.recoilX != null,
    )) {
      sim.advance(1 / 60);
    }
    final positions = [
      for (final formation in sim.formations.values) formation.frontX,
    ];
    while (sim.elapsed + 1 / 60 < clashAt + GameConfig.clashInterval - 1e-9) {
      sim.advance(1 / 60);
      expect(
        sim.formations.values.every(
          (formation) => formation.motion == BattleMotion.preparing,
        ),
        isTrue,
      );
      expect([
        for (final formation in sim.formations.values) formation.frontX,
      ], positions);
      expect(sim.clashes, 1);
    }
    _round(sim, 2);
    expect(sim.elapsed - clashAt, greaterThan(GameConfig.clashInterval));
  });

  test('必须先退到终点，再收势举剑准备，之后才能加速开始下一轮', () {
    final sim = _battle(attack: 20, defense: 20, hp: 1000, soldiers: 0);
    _withoutMorale(sim);
    _round(sim, 1);
    final formation = sim.formations[BattleSide.defender]!;
    final destination = formation.recoilX!;
    while (formation.recoilX != null) {
      sim.advance(1 / 60);
    }
    expect(formation.frontX, closeTo(destination, 1e-8));
    expect(formation.motion, BattleMotion.preparing);
    final unit = sim.units.firstWhere(
      (unit) => unit.side == BattleSide.defender,
    );
    expect(unit.animationFrame(sim.elapsed), 0);
    sim.advance(0.1);
    expect(formation.frontX, closeTo(destination, 1e-8));
    expect(formation.velocity, 0);
    sim.advance(formation.readyAt - sim.elapsed - 0.1);
    expect(formation.motion, BattleMotion.preparing);
    expect(unit.animationFrame(sim.elapsed), 2);
    sim.advance(0.12);
    expect(formation.motion, BattleMotion.charging);
    expect(formation.frontX, greaterThan(destination));
    expect(sim.clashes, 1);
  });

  test('全场50点，双方受伤20和10时分别退20和10点，再按实际位置交锋', () {
    final sim = _battle(attack: 20, defense: 10, hp: 1000, soldiers: 0);
    _withoutMorale(sim);
    _round(sim, 1);
    final defender = sim.formations[BattleSide.defender]!;
    final attacker = sim.formations[BattleSide.attacker]!;
    expect(defender.recoilX, lessThan(defender.frontX));
    expect(attacker.recoilX, greaterThan(attacker.frontX));
    expect(defender.frontX - defender.recoilX!, closeTo(20 * 4.48, 1e-8));
    expect(attacker.recoilX! - attacker.frontX, closeTo(10 * 4.48, 1e-8));
    expect(sim.lastClash!.defenderRetreat, closeTo(20, 1e-8));
    expect(sim.lastClash!.attackerRetreat, closeTo(10, 1e-8));
    _round(sim, 2);
    expect(defender.frontX, lessThan(120));
    expect(attacker.frontX - defender.frontX, closeTo(16, 1e-8));
  });

  test('相同伤害也会让双方等距退步，再冲回中间，战线不偏移', () {
    final sim = _battle(attack: 20, defense: 20, hp: 1000, soldiers: 0);
    _withoutMorale(sim);
    _round(sim, 1);
    final defender = sim.formations[BattleSide.defender]!;
    final attacker = sim.formations[BattleSide.attacker]!;
    expect(
      defender.frontX - defender.recoilX!,
      closeTo(attacker.recoilX! - attacker.frontX, 1e-8),
    );
    expect(sim.distanceToWall(BattleSide.defender), 25);
    sim.advance(0.3);
    expect(defender.frontX, lessThan(120));
    expect(attacker.frontX, greaterThan(136));
    _round(sim, 2);
    expect(defender.frontX, closeTo(120, 1e-8));
    expect(attacker.frontX, closeTo(136, 1e-8));
  });

  test('冲锋逐步加速，出剑短停队形时游戏时钟继续推进', () {
    final sim = _battle(attack: 35, defense: 5, hp: 1000);
    _withoutMorale(sim);
    sim.advance(GameConfig.battleFormationTime);
    final formation = sim.formations[BattleSide.defender]!;
    final first = formation.velocity;
    sim.advance(1 / 60);
    expect(formation.velocity, greaterThan(first));
    expect(
      formation.velocity,
      lessThanOrEqualTo(sim.chargeSpeed(formation.side)),
    );
    _round(sim, 1);
    final x = formation.frontX;
    final time = sim.elapsed;
    sim.advance(BattleSimulation.impactHold - 1 / 60);
    expect(formation.frontX, x);
    expect(sim.elapsed, greaterThan(time));
    sim.advance(2 / 60);
    expect(formation.frontX, lessThan(x));
  });

  test('左右撞墙均减速停稳并向场内短弹，显示动作不追加扣血或改变站位', () {
    for (final weakSide in BattleSide.values) {
      final sim = _battle(
        attack: weakSide == BattleSide.defender ? 100 : 20,
        defense: weakSide == BattleSide.defender ? 20 : 100,
        hp: 1000,
        soldiers: 0,
      );
      _withoutMorale(sim);
      _round(sim, 1);
      final weak = sim.formations[weakSide]!;
      final initial = weak.frontX;
      var previous = initial;
      final steps = <double>[];
      for (var i = 0; i < 150 && weak.recoilX != null; i++) {
        sim.advance(1 / 60);
        final step = (weak.frontX - previous).abs();
        expect(
          step,
          lessThanOrEqualTo(GameConfig.battleRecoilPeakSpeed / 60 + 1e-8),
        );
        if (step > 0.001) steps.add(step);
        expect(
          weak.frontX,
          inInclusiveRange(
            weakSide == BattleSide.defender ? 8 : initial,
            weakSide == BattleSide.defender ? initial : 248,
          ),
        );
        previous = weak.frontX;
      }
      expect(weak.recoilX, isNull);
      expect(steps.last, lessThan(steps.first));
      expect(weak.wallHitAt, greaterThan(0));
      final general = sim.units.firstWhere((unit) => unit.side == weakSide);
      final hp = general.health.hp;
      final line = sim.distanceToWall(weakSide);
      final inward = weakSide == BattleSide.defender ? 1 : -1;
      expect(weak.visualOffset(weak.wallHitAt + 0.12) * inward, greaterThan(0));
      for (var i = 0; i < 40; i++) {
        final time = weak.wallHitAt + i / 60;
        final point = general.renderPosition(time);
        expect(point.dx, inInclusiveRange(8, 248));
        expect(point.dy, general.position.dy);
      }
      expect(general.renderPosition(weak.impactAt + 0.8), general.position);
      expect(general.health.hp, hp);
      expect(sim.distanceToWall(weakSide), line);
    }
  });

  test('整队25点伤害减掉一名20血小兵，下一名剩15血；40点正好减掉两名', () {
    for (final damage in [25, 40]) {
      final sim = _battle(attack: damage - 4, defense: damage - 4);
      _withoutMorale(sim);
      _contact(sim);
      _round(sim, 1);
      final hps = sim.defender.soldiers.map((soldier) => soldier.hp).toList()
        ..sort();
      expect(hps, damage == 25 ? [0, 15, 20, 20] : [0, 0, 20, 20]);
      expect(sim.defender.general.hp, 95);
      expect(sim.lastClash!.attackerDamage, damage);
    }
  });

  test('下一轮优先扣上一轮伤兵，整队兵力连续消耗且没有暗中回血', () {
    final sim = _battle(attack: 21, defense: 0);
    _withoutMorale(sim);
    _contact(sim);
    _round(sim, 1);
    final wounded = sim.defender.soldiers.singleWhere(
      (soldier) => soldier.hp == 15,
    );
    final next = BattleSimulation(
      attacker: sim.attacker,
      defender: sim.defender,
      seed: 1,
    );
    _withoutMorale(next);
    _contact(next);
    _round(next, 1);
    expect(wounded.hp, 0);
    final hps = sim.defender.soldiers.map((soldier) => soldier.hp).toList()
      ..sort();
    expect(hps, [0, 0, 10, 20]);
    expect(sim.defender.general.hp, 95);
  });

  test('兵力剩5时受到7点伤害，兵全灭后只有溢出的2点扣将领', () {
    final defender = _army('d', attack: 0, soldiers: 1);
    defender.soldiers.first.hp = 5;
    final sim = BattleSimulation(
      attacker: _army('a', attack: 3),
      defender: defender,
      seed: 1,
    );
    _withoutMorale(sim);
    _contact(sim);
    _round(sim, 1);
    expect(sim.lastClash!.attackerDamage, 7);
    expect(sim.survivors(BattleSide.defender), 0);
    expect(defender.general.hp, 93);
  });

  test('随机减员会选择不同站位，死者留空位而其他小兵不补位', () {
    final removed = <int>{};
    for (var seed = 1; seed < 16; seed++) {
      final sim = _battle(attack: 21, defense: 0, seed: seed);
      _withoutMorale(sim);
      _contact(sim);
      _round(sim, 1);
      final dead = sim.units.singleWhere(
        (unit) => unit.side == BattleSide.defender && !unit.health.alive,
      );
      removed.add(dead.slot);
      for (final unit in sim.units.where((unit) => !unit.isGeneral)) {
        expect(unit.position.dy, 48 + unit.slot * 24);
      }
    }
    expect(removed.length, greaterThan(1));
  });

  test('每500ms消耗剩余士气5至10%，消耗提升速度，碰撞时投入全部累计值', () {
    final sim = _battle();
    sim.advance(0.49);
    expect(sim.attackerMorale.spent, 0);
    expect(sim.clashes, 0);
    sim.advance(0.01);
    for (final side in BattleSide.values) {
      final morale = sim.morale(side);
      expect(morale.percent, inInclusiveRange(5, 10));
      expect(morale.spent, 99 * morale.percent ~/ 100);
      expect(morale.remaining, 99 - morale.spent);
      expect(morale.accumulated, morale.spent);
      expect(
        sim.chargeSpeed(side),
        BattleSimulation.baseChargeSpeed +
            morale.spent * GameConfig.chargeSpeedPerMorale,
      );
    }
    final before = sim.attackerMorale.remaining;
    sim.advance(0.49);
    expect(sim.attackerMorale.remaining, before);
    sim.advance(0.01);
    expect(
      sim.attackerMorale.spent,
      before * sim.attackerMorale.percent ~/ 100,
    );
    expect(sim.attackerMorale.remaining, before - sim.attackerMorale.spent);
    _round(sim, 1);
    expect(sim.attackerMorale.committed, 99 - sim.attackerMorale.remaining);
    expect(sim.defenderMorale.committed, 99 - sim.defenderMorale.remaining);
    expect(sim.attackerMorale.accumulated, 0);
    expect(sim.defenderMorale.accumulated, 0);
  });

  test('累计士气20对15时只有胜方整队伤害乘1.05，碰撞后清空累计量', () {
    final sim = _battle();
    _withoutMorale(sim);
    _contact(sim);
    sim.attackerMorale.accumulated = 20;
    sim.defenderMorale.accumulated = 15;
    _round(sim, 1);
    expect(sim.baseDamage(BattleSide.attacker), 19);
    expect(sim.lastClash!.attackerDamage, closeTo(19 * 1.05, 1e-9));
    expect(sim.lastClash!.defenderDamage, 19);
    expect(sim.attackerMorale.bonus, 5);
    expect(sim.defenderMorale.bonus, 0);
    expect(sim.attackerMorale.accumulated, 0);
    expect(sim.lastClash!.defenderRetreat, closeTo(19 * 1.05, 1e-9));
  });

  test('第一轮固定在中间碰撞，全场50点，碰撞时双方距墙各25点', () {
    final sim = _battle();
    expect(BattleSimulation.arenaPoints, 50);
    expect(BattleSimulation.baseChargeSpeed, greaterThan(40));
    _round(sim, 1);
    expect(sim.distanceToWall(BattleSide.defender), 25);
    expect(sim.distanceToWall(BattleSide.attacker), 25);
    expect(sim.formations[BattleSide.defender]!.frontX, closeTo(120, 1e-8));
    expect(sim.formations[BattleSide.attacker]!.frontX, closeTo(136, 1e-8));
  });

  test('墙边追加按实际碰撞位置计算：剩20点差30额外10%，贴墙额外30%', () {
    for (final space in [20.0, 0.0]) {
      final sim = _battle(attack: 30, defense: 0, hp: 1000, soldiers: 0);
      _withoutMorale(sim);
      sim.clashes = 1;
      sim.formations[BattleSide.defender]!.frontX = 8 + space * 4.48;
      sim.formations[BattleSide.attacker]!.frontX = 24 + space * 4.48;
      _round(sim, 2);
      expect(sim.lastClash!.difference, 30);
      expect(sim.lastClash!.retreatPoints, closeTo(space, 1e-8));
      expect(sim.lastClash!.overflowPercent, closeTo(30 - space, 1e-8));
      expect(
        sim.lastClash!.attackerDamage,
        closeTo(space == 20 ? 33 : 39, 1e-8),
      );
    }
  });

  test('中场伤害差80，25点退路外多出的55%只追加一次伤害', () {
    final sim = _battle(attack: 100, defense: 20, hp: 1000, soldiers: 0);
    _withoutMorale(sim);
    _contact(sim);
    _round(sim, 1);
    expect(sim.lastClash!.difference, 80);
    expect(sim.lastClash!.retreatPoints, 25);
    expect(sim.lastClash!.overflowPercent, 55);
    expect(sim.lastClash!.attackerDamage, 155);
    expect(sim.lastClash!.defenderDamage, 20);
  });

  test('双方伤害先计算，同一轮将领能同时阵亡', () {
    final sim = _battle(attack: 10, defense: 10, hp: 10, soldiers: 0);
    _withoutMorale(sim);
    _contact(sim);
    _round(sim, 1);
    expect(sim.result, BattleResult.draw);
    expect(sim.attacker.general.hp, 0);
    expect(sim.defender.general.hp, 0);
  });

  test('ROM纵向槽位固定，冲锋击退和随机减员都不产生上下追逐', () {
    final sim = _battle();
    final initial = {for (final unit in sim.units) unit.id: unit.position.dy};
    expect(
      sim.units
          .where((unit) => unit.side == BattleSide.defender)
          .map((unit) => unit.position.dy),
      [86, 48, 72, 96, 120],
    );
    for (var i = 0; i < 3600 && !sim.finished; i++) {
      sim.advance(1 / 60);
      expect(
        sim.formations[BattleSide.attacker]!.frontX -
            sim.formations[BattleSide.defender]!.frontX,
        greaterThanOrEqualTo(16 - 1e-8),
      );
      for (final unit in sim.units) {
        expect(unit.position.dy, initial[unit.id]);
      }
      for (final side in BattleSide.values) {
        final alive = sim.units.where(
          (unit) => unit.side == side && !unit.isGeneral && unit.health.alive,
        );
        expect(
          alive.map((unit) => unit.position.dx).toSet().length,
          lessThanOrEqualTo(1),
        );
      }
    }
    expect(sim.clashes, greaterThan(0));
  });

  test('士气按初始最大血量加存活小兵补充，伤势保留', () {
    final a = _army('a')..general.hp = 20;
    a.soldiers[0].hp = 0;
    a.soldiers[1].hp = 7;
    final sim = BattleSimulation(attacker: a, defender: _army('d'), seed: 1);
    expect(sim.attackerMorale.remaining, 98);
    expect(a.general.hp, 20);
    expect(a.soldiers[1].hp, 7);
  });

  test('大时间步与高帧率的士气、伤害、兵损及位置完全一致', () {
    final single = _battle(seed: 81);
    final frequent = _battle(seed: 81);
    single.advance(60);
    for (var i = 0; i < 6000; i++) {
      frequent.advance(0.01);
    }
    expect(single.result, frequent.result);
    expect(single.clashes, frequent.clashes);
    expect(single.attackerMorale.remaining, frequent.attackerMorale.remaining);
    expect(single.defenderMorale.remaining, frequent.defenderMorale.remaining);
    for (var i = 0; i < single.units.length; i++) {
      expect(
        single.units[i].health.hp,
        closeTo(frequent.units[i].health.hp, 1e-8),
      );
      expect(
        (single.units[i].position - frequent.units[i].position).distance,
        lessThan(1e-8),
      );
    }
  });

  test('退出进攻停止扣血及消耗，保留伤势和剩余士气', () {
    final sim = _battle()..advance(4);
    final hp = sim.units.map((unit) => unit.health.hp).toList();
    final morale = sim.attackerMorale.remaining;
    sim.stop();
    sim.advance(60);
    expect(sim.units.map((unit) => unit.health.hp), hp);
    expect(sim.attackerMorale.remaining, morale);
  });
}
