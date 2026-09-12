import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/battle/domain/field_terrain.dart';
import 'package:pixel_world/core/config/game_config.dart';

/// 同水平将领的攻城胜率测量：双方属性、兵数、士气完全一致，
/// 唯一变量是守方所在城池的等级。攻城方无城防加成。
///
/// 这不是回归测试，是平衡测量；用 `--plain-name 同水平` 单独运行。
BattleArmy _army(
  String id, {
  required int combat,
  int hp = 95,
  int soldiers = 4,
  int morale = 70,
}) => BattleArmy(
  id: id,
  name: id,
  general: BattleHealth(hp, hp: hp),
  attack: combat,
  soldiers: List.generate(soldiers, (_) => BattleHealth(20, hp: 20)),
  morale: morale,
);

/// 跑完一场并返回结果；超过步数上限视为僵局。
///
/// 双方将领使用同一 morale 基准，守方再加城防士气加成（内部会 clamp 到 100），
/// 因此不同城防士气配置不再被同一个固定值压住。
({BattleResult? result, int ticks}) _fight({
  required int attackerCombat,
  required int defenderCombat,
  required int cityLevel,
  required int seed,
  int soldiers = 4,
  int morale = 70,
  int maxSeconds = 120,
}) {
  final sim = BattleSimulation(
    attacker: _army(
      '攻',
      combat: attackerCombat,
      soldiers: soldiers,
      morale: morale,
    ),
    defender: _army(
      '守',
      combat: defenderCombat,
      soldiers: soldiers,
      morale: morale,
    ),
    seed: seed,
    defenderCityLevel: cityLevel,
  );
  final maxTicks = (maxSeconds * 60);
  var ticks = 0;
  while (!sim.finished && ticks < maxTicks) {
    sim.advance(BattleSimulation.fixedStep);
    ticks++;
  }
  return (result: sim.result, ticks: ticks);
}

void main() {
  const trials = 300;

  test('同水平将领：城防等级对攻城胜率的影响', () {
    stdout.writeln(
      '\n城防加成 ${GameConfig.cityDefenseAttackBonuses}  '
      '士气加成 ${GameConfig.cityDefenseMoraleBonuses}\n',
    );
    stdout.writeln(
      '${'城等级'.padRight(8)}${'攻方胜'.padLeft(8)}${'守方胜'.padLeft(8)}'
      '${'僵局'.padLeft(8)}${'攻胜率'.padLeft(9)}${'平均秒'.padLeft(9)}',
    );
    for (var level = 1; level <= 5; level++) {
      var attackWins = 0, defendWins = 0, draws = 0, totalTicks = 0;
      for (var seed = 1; seed <= trials; seed++) {
        final r = _fight(
          attackerCombat: 15,
          defenderCombat: 15,
          cityLevel: level,
          seed: seed,
        );
        totalTicks += r.ticks;
        switch (r.result) {
          case BattleResult.attackerWon:
            attackWins++;
          case BattleResult.defenderWon:
            defendWins++;
          case BattleResult.draw:
            draws++;
          case null:
            draws++;
        }
      }
      stdout.writeln(
        '${'$level 级'.padRight(8)}'
        '${'$attackWins'.padLeft(8)}${'$defendWins'.padLeft(8)}'
        '${'$draws'.padLeft(8)}'
        '${'${(100 * attackWins / trials).toStringAsFixed(1)}%'.padLeft(9)}'
        '${(totalTicks / trials / 60).toStringAsFixed(1).padLeft(9)}',
      );
    }
  });

  test('同水平将领：不同战斗属性下的攻城胜率（3 级城）', () {
    stdout.writeln(
      '\n3 级城（加成 ${GameConfig.cityDefenseAttackBonuses[2]}、'
      '士气 +${GameConfig.cityDefenseMoraleBonuses[2]}）\n',
    );
    stdout.writeln(
      '${'攻方战力'.padRight(10)}${'攻方胜'.padLeft(8)}${'守方胜'.padLeft(8)}'
      '${'攻胜率'.padLeft(9)}',
    );
    for (final combat in [10, 12, 14, 15, 16, 18]) {
      var attackWins = 0, defendWins = 0;
      for (var seed = 1; seed <= trials; seed++) {
        final r = _fight(
          attackerCombat: combat,
          defenderCombat: 15,
          cityLevel: 3,
          seed: seed,
        );
        if (r.result == BattleResult.attackerWon) {
          attackWins++;
        } else if (r.result == BattleResult.defenderWon) {
          defendWins++;
        }
      }
      stdout.writeln(
        '${'$combat'.padRight(10)}${'$attackWins'.padLeft(8)}'
        '${'$defendWins'.padLeft(8)}'
        '${'${(100 * attackWins / trials).toStringAsFixed(1)}%'.padLeft(9)}',
      );
    }
  });

  test('野战基准：无城防时同水平将领的胜率', () {
    stdout.writeln('\n野战（defenderCityLevel 不生效，terrain 由调用方决定）\n');
    var attackWins = 0, defendWins = 0, draws = 0;
    for (var seed = 1; seed <= trials; seed++) {
      final sim = BattleSimulation(
        attacker: _army('攻', combat: 15),
        defender: _army('守', combat: 15),
        seed: seed,
        fieldTerrain: FieldTerrain.grass,
      );
      var ticks = 0;
      while (!sim.finished && ticks < 120 * 60) {
        sim.advance(BattleSimulation.fixedStep);
        ticks++;
      }
      switch (sim.result) {
        case BattleResult.attackerWon:
          attackWins++;
        case BattleResult.defenderWon:
          defendWins++;
        default:
          draws++;
      }
    }
    stdout.writeln('草地野战：攻方胜 $attackWins，守方胜 $defendWins，僵局 $draws');
  });

  test('士气基准敏感性：不同将领士气下 3 级城的攻方胜率', () {
    stdout.writeln(
      '\n3 级城（攻击加成 ${GameConfig.cityDefenseAttackBonuses[2]}、'
      '士气加成 ${GameConfig.cityDefenseMoraleBonuses[2]}）',
    );
    stdout.writeln('守方实际开场士气 = clamp(基准 + 加成, 0, 100)\n');
    stdout.writeln(
      '${'基准士气'.padRight(10)}${'守方士气'.padLeft(10)}'
      '${'攻方胜'.padLeft(8)}${'攻胜率'.padLeft(9)}',
    );
    for (final base in [50, 60, 70, 80, 90, 100]) {
      var wins = 0;
      for (var seed = 1; seed <= trials; seed++) {
        final r = _fight(
          attackerCombat: 15,
          defenderCombat: 15,
          cityLevel: 3,
          seed: seed,
          morale: base,
        );
        if (r.result == BattleResult.attackerWon) wins++;
      }
      final effective = (base + GameConfig.cityDefenseMoraleBonuses[2]).clamp(
        0,
        100,
      );
      stdout.writeln(
        '${'$base'.padRight(10)}${'$effective'.padLeft(10)}'
        '${'$wins'.padLeft(8)}'
        '${'${(100 * wins / trials).toStringAsFixed(1)}%'.padLeft(9)}',
      );
    }
  });
}
