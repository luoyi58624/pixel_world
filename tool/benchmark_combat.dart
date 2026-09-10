import 'dart:convert';
import 'dart:io';

import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';

/// 固定条件的批量拼杀实验，不向正式国家 AI 回传模拟结果。
void main(List<String> args) {
  final rows = <Map<String, Object?>>[];
  final recoil = args.length > 1 ? double.parse(args[1]) : 1.0;
  final wall = args.length > 2 ? double.parse(args[2]) : 1.0;
  for (final attack in [15, 18, 20, 22]) {
    for (final bonus in [0, 2, 4]) {
      for (final soldiers in [3, 4]) {
        var wins = 0, clashes = 0, walls = 0, frames = 0;
        var survivorHp = 0;
        for (var seed = 1; seed <= 80; seed++) {
          final k = NesBattleKernel(
            attack: [attack, 11 + bonus],
            moraleAttack: [attack, 11],
            hp: [95, 65],
            slots: [
              List.generate(soldiers, (i) => i),
              [0, 1, 2, 3],
            ],
            seed: seed * 1009,
            recoilDifferenceScale: recoil,
            wallDamageScale: wall,
          );
          while (k.generalsAlive && k.frames < 18000) {
            k.step(autoCharge: true);
          }
          if (k.ram[0x7451] > 0 && k.ram[0x7452] == 0) {
            wins++;
            survivorHp += k.ram[0x7451];
          }
          clashes += k.clashes;
          walls += k.wallHits[0];
          frames += k.frames;
        }
        rows.add({
          'attack': attack,
          'defenseBonus': bonus,
          'soldiers': soldiers,
          'recoilScale': recoil,
          'wallScale': wall,
          'wins': wins,
          'runs': 80,
          'meanClashes': clashes / 80,
          'attackerWallHits': walls / 80,
          'meanSeconds': frames / 4800,
          'meanWinnerHp': wins == 0 ? 0 : survivorHp / wins,
        });
      }
    }
  }
  final output = args.isEmpty
      ? 'build/simulations/combat_baseline.json'
      : args.first;
  File(output).parent.createSync(recursive: true);
  File(output)
      .writeAsStringSync(const JsonEncoder.withIndent('  ').convert(rows));
  for (final row in rows) {
    stdout.writeln(jsonEncode(row));
  }
}
