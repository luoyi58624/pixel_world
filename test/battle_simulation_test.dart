import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_simulation.dart';

BattleArmy _army(String id, {int hp = 95, int attack = 15, int soldiers = 4}) =>
    BattleArmy(
      id: id,
      name: id,
      general: BattleHealth(hp),
      attack: attack,
      soldiers: List.generate(soldiers, (_) => BattleHealth(25)),
    );

BattleSimulation _battle({int hp = 95, int soldiers = 4, int seed = 1}) =>
    BattleSimulation(
      attacker: _army('a', hp: hp, soldiers: soldiers),
      defender: _army('d', hp: hp, soldiers: soldiers),
      seed: seed,
    );

void _contact(BattleSimulation battle, {double left = 100}) {
  for (final unit in battle.units) {
    if (unit.isGeneral) {
      unit.cooldown = 1000;
    } else {
      unit.position = Offset(
        left + (unit.side == BattleSide.attacker ? 18 : 0),
        86 + unit.slot * 32,
      );
    }
  }
}

void main() {
  test('小兵各自25血1攻击，接触前不扣血，双方第二十五次拼杀同时阵亡', () {
    final sim = _battle(hp: 1, soldiers: 1);
    _contact(sim);
    sim.advance(0.7);
    expect(sim.clashes, 0);
    expect(
      sim.units
          .where((unit) => !unit.isGeneral)
          .every((unit) => unit.health.hp == 25),
      isTrue,
    );
    sim.advance(0.12);
    expect(sim.clashes, 1);
    expect(
      sim.units
          .where((unit) => !unit.isGeneral)
          .every((unit) => unit.health.hp == 24),
      isTrue,
    );
    sim.advance(24);
    expect(sim.clashes, 25);
    expect(sim.survivors(BattleSide.attacker), 0);
    expect(sim.survivors(BattleSide.defender), 0);
    expect(sim.attacker.general.hp, 1);
    expect(sim.defender.general.hp, 1);
    expect(sim.result, isNull);
  });

  test('小兵优先对位，对位阵亡后选择按实际距离最近的存活士兵', () {
    final sim = _battle();
    for (final unit in sim.units) {
      unit.cooldown = 1000;
    }
    final unit = sim.unitById('a-soldier-1')!;
    unit.position = const Offset(100, 120);
    sim.unitById('d-soldier-1')!.position = const Offset(200, 120);
    sim.unitById('d-soldier-3')!.position = const Offset(105, 120);
    sim.advance(0.82);
    expect(unit.targetId, 'd-soldier-1');
    sim.unitById('d-soldier-1')!.health.hp = 0;
    sim.advance(0.02);
    expect(unit.targetId, 'd-soldier-3');
    expect(sim.unitById('d-soldier-1')!.lastAttackAt, -100);
  });

  test('将领按自身战斗属性随机攻击小兵，不越过存活小兵直接打将领', () {
    final sim = _battle();
    for (final unit in sim.units) {
      unit.position = Offset(unit.side == BattleSide.attacker ? 118 : 100, 120);
      if (unit.id != 'a') unit.cooldown = 1000;
    }
    final selected = <String>{};
    for (var i = 0; i < 1000 && sim.survivors(BattleSide.defender) > 0; i++) {
      sim.advance(1 / 60);
      for (final hit in sim.hits.where((hit) => hit.sourceId == 'a')) {
        selected.add(hit.targetId);
        expect(hit.targetId, startsWith('d-soldier-'));
        expect(hit.damage, greaterThanOrEqualTo(15));
      }
    }
    expect(selected.length, greaterThan(1));
    expect(sim.defender.general.hp, 95);
  });

  test('敌方小兵全灭后转攻将领，将领归零才决定胜败', () {
    final attacker = _army('a', hp: 99, attack: 30, soldiers: 1);
    final defender = _army('d', hp: 25, attack: 1, soldiers: 0);
    final sim = BattleSimulation(
      attacker: attacker,
      defender: defender,
      seed: 2,
    );
    expect(sim.result, isNull);
    sim.advance(60);
    expect(sim.result, BattleResult.attackerWon);
    expect(defender.general.hp, 0);
    expect(
      sim.units
          .where((unit) => unit.side == BattleSide.attacker)
          .any((unit) => unit.targetId == 'd'),
      isTrue,
    );
  });

  test('士气用最大生命加存活小兵重新初始化，重伤和上一场消耗都不影响新场上限', () {
    final attacker = _army('a')..general.hp = 20;
    final defender = _army('d');
    final first = BattleSimulation(
      attacker: attacker,
      defender: defender,
      seed: 3,
    );
    expect(first.attackerMorale.maximum, 99);
    expect(first.attackerMorale.remaining, 99);
    _contact(first);
    first.advance(1);
    attacker.soldiers[0].hp = 0;
    final second = BattleSimulation(
      attacker: attacker,
      defender: defender,
      seed: 4,
    );
    expect(second.attackerMorale.maximum, 98);
    expect(second.attackerMorale.remaining, 98);
    expect(second.attacker.general.hp, 20);
    expect(second.attacker.soldiers[0].hp, 0);
  });

  test('每轮只比拼一次士气，按当前余量的0至25%取整消耗，胜方加实际差值百分点', () {
    final sim = _battle();
    _contact(sim);
    sim.advance(0.82);
    final a = sim.attackerMorale;
    final d = sim.defenderMorale;
    expect(sim.clashes, 1);
    expect(a.percent, inInclusiveRange(0, 25));
    expect(d.percent, inInclusiveRange(0, 25));
    expect(a.spent, 99 * a.percent ~/ 100);
    expect(d.spent, 99 * d.percent ~/ 100);
    expect(a.remaining, 99 - a.spent);
    expect(d.remaining, 99 - d.spent);
    expect(a.bonus, a.spent > d.spent ? a.spent - d.spent : 0);
    expect(d.bonus, d.spent > a.spent ? d.spent - a.spent : 0);
    for (final hit in sim.hits) {
      final source = sim.unitById(hit.sourceId)!;
      expect(
        hit.damage,
        closeTo(1 * (1 + sim.morale(source.side).bonus / 100), 1e-9),
      );
    }
    final oldA = a.remaining;
    final oldD = d.remaining;
    sim.advance(0.3);
    expect(sim.clashes, 1);
    expect(a.remaining, oldA);
    expect(d.remaining, oldD);
    while (sim.clashes < 2) {
      sim.advance(1 / 60);
    }
    expect(a.spent, oldA * a.percent ~/ 100);
    expect(d.spent, oldD * d.percent ~/ 100);
  });

  test('士气低于4点仍能继续攻击，消耗不为负也不超过25%的上限', () {
    final sim = _battle(hp: 1, soldiers: 1);
    _contact(sim);
    sim.advance(3);
    expect(sim.clashes, 3);
    expect(sim.attackerMorale.remaining, 2);
    expect(sim.defenderMorale.remaining, 2);
    expect(sim.attackerMorale.spent, 0);
    expect(sim.defenderMorale.spent, 0);
  });

  test('士气落败一方逐帧后退，平手不产生击退目标', () {
    var pushed = false;
    for (var seed = 1; seed < 20 && !pushed; seed++) {
      final sim = _battle(seed: seed);
      _contact(sim);
      sim.advance(0.8);
      final side = sim.pushedSide;
      if (side == null) {
        expect(sim.units.every((unit) => unit.recoilTarget == null), isTrue);
        continue;
      }
      pushed = true;
      expect(
        side,
        sim.attackerMorale.spent > sim.defenderMorale.spent
            ? BattleSide.defender
            : BattleSide.attacker,
      );
      final unit = sim.units.firstWhere(
        (unit) => unit.side == side && !unit.isGeneral,
      );
      final before = unit.position;
      final destination = unit.recoilTarget!;
      expect(
        destination.dx,
        side == BattleSide.defender
            ? lessThan(before.dx)
            : greaterThan(before.dx),
      );
      sim.advance(0.1);
      expect(unit.position, isNot(before));
      expect(
        (unit.position - before).distance,
        lessThan((destination - before).distance),
      );
    }
    expect(pushed, isTrue);
  });

  test('靠墙惩罚只乘在受击单位身上，1点攻击变1.5，不给攻击者和全队一起加成', () {
    final sim = _battle(hp: 1, soldiers: 2);
    _contact(sim);
    sim.unitById('d-soldier-0')!.position = const Offset(12, 86);
    sim.unitById('a-soldier-0')!.position = const Offset(30, 86);
    sim.advance(0.82);
    final defender = sim.unitById('d-soldier-0')!;
    final attacker = sim.unitById('a-soldier-0')!;
    expect(sim.atWall(defender), isTrue);
    expect(sim.atWall(attacker), isFalse);
    expect(defender.health.hp, 23.5);
    expect(attacker.health.hp, 24);
    expect(sim.unitById('d-soldier-1')!.health.hp, 24);
    expect(
      sim.hits.firstWhere((hit) => hit.targetId == defender.id).damage,
      1.5,
    );
    expect(sim.defender.general.hp, 1);
  });

  test('大时间步和高帧率的结果、随机士气、兵损与位置一致', () {
    final single = _battle(seed: 81);
    final frequent = _battle(seed: 81);
    single.advance(45);
    for (var i = 0; i < 4500; i++) {
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

  test('撤离停止伤害和士气消耗，受伤生命不会因观看时间继续恢复或减少', () {
    final sim = _battle();
    sim.advance(5);
    final health = sim.units.map((unit) => unit.health.hp).toList();
    final morale = sim.attackerMorale.remaining;
    sim.stop();
    sim.advance(60);
    expect(sim.units.map((unit) => unit.health.hp), health);
    expect(sim.attackerMorale.remaining, morale);
  });
}
