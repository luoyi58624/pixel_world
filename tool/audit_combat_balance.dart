import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/battle/domain/combat_rules.dart';
import 'package:pixel_world/features/battle/domain/field_terrain.dart';
import 'package:pixel_world/features/battle/domain/nes/nes_battle_kernel.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';

/// 独立对照当前战斗规则，结果仅用于离线验收，不供运行时AI决策。
void main(List<String> args) {
  int option(String name, int fallback) {
    final i = args.indexOf(name);
    return i < 0 ? fallback : int.parse(args[i + 1]);
  }

  final count = option('--samples', 256);
  final seed = option('--seed', 20260911);
  final targets = args.contains('--targets');
  final cannon = WeaponCatalog.decode(
    File('assets/data/rom_weapons.json').readAsStringSync(),
  ).weapons[11]!;
  if (count < 1 || count > 4096) throw ArgumentError('样本数必须为1到4096');
  final random = math.Random(seed);
  final seeds = List.generate(count, (_) => random.nextInt(1 << 24));
  stdout.writeln(
    jsonEncode({
      'samples': count,
      'targets': targets,
      'seed': seed,
      'cityAttack': GameConfig.cityDefenseAttackBonuses,
      'cityMorale': GameConfig.cityDefenseMoraleBonuses,
      'cityRecoil': GameConfig.cityDefenseRecoilScale,
      'recoil': GameConfig.battleRecoilDifferenceScale,
      'moralePowerScale': GameConfig.battleMoralePowerScale,
      'chargeFrames': GameConfig.battleChargeIntervalFrames,
      'cannonDamage': cannon.damage,
      'cannonPrice': cannon.price,
    }),
  );
  final scenarios = <Map<String, int>>[
    if (targets) ...[
      for (final terrain in FieldTerrain.values) {'field': terrain.index},
      for (var level = 1; level <= 5; level++) {'level': level},
    ] else ...[
      for (final h in [
        [10, 50, 60],
        [12, 65, 75],
        [15, 95, 50],
        [18, 95, 100],
      ])
        for (var level = 0; level <= 5; level++)
          {'attack': h[0], 'hp': h[1], 'morale': h[2], 'level': level},
      for (final level in [1, 3, 5]) {'level': level, 'weapon': cannon.damage},
      {'attackerMorale': 100, 'defenderMorale': 50},
      {'attackerMorale': 50, 'defenderMorale': 100},
      {'attackerSoldiers': 4, 'defenderSoldiers': 3},
      {'attackerSoldiers': 3, 'defenderSoldiers': 4},
    ],
  ];
  for (final s in scenarios) {
    final terrain = s.containsKey('field')
        ? FieldTerrain.values[s['field']!]
        : null;
    final attack = CombatRules.heroAttack(
      s['attack'] ?? 15,
      terrain?.heroAttackFactor ?? 1,
    );
    final hp = s['hp'] ?? 95;
    final morale = s['morale'] ?? 50;
    final level = s['level'] ?? 0;
    final bonus = level == 0 ? 0 : GameConfig.cityDefenseAttackBonusFor(level);
    var wins = 0, losses = 0, draws = 0, timeouts = 0, frames = 0;
    for (final battleSeed in seeds) {
      final k = NesBattleKernel(
        attack: [attack, attack + bonus],
        hp: [hp, hp],
        initialMorale: [
          s['attackerMorale'] ?? morale,
          ((s['defenderMorale'] ?? morale) +
                  (level > 0 ? GameConfig.cityDefenseMoraleBonusFor(level) : 0))
              .clamp(0, 100),
        ],
        slots: [
          List.generate(s['attackerSoldiers'] ?? 4, (i) => i),
          List.generate(s['defenderSoldiers'] ?? 4, (i) => i),
        ],
        seed: battleSeed,
        recoilDifferenceScale: GameConfig.battleRecoilDifferenceScale,
        wallDamageScale: GameConfig.battleWallDamageScale,
        defenderCityAttackBonus: bonus,
        cityDefenseRecoilScale: GameConfig.cityDefenseRecoilScale,
        randomChargeEnabled: true,
        moralePowerScale: GameConfig.battleMoralePowerScale,
        chargeIntervalFrames: GameConfig.battleChargeIntervalFrames,
      );
      if (s.containsKey('weapon')) k.applyWeaponDamage(1, s['weapon']!);
      while (k.generalsAlive && k.frames < 18000) {
        k.step(autoCharge: true);
      }
      if (k.generalsAlive) {
        timeouts++;
      } else if (k.ram[0x7451] > 0) {
        wins++;
      } else if (k.ram[0x7452] > 0) {
        losses++;
      } else {
        draws++;
      }
      frames += k.frames;
    }
    stdout.writeln(
      jsonEncode({
        'case': s,
        'wins': wins,
        'losses': losses,
        'draws': draws,
        'timeouts': timeouts,
        'seconds': frames / count / 60,
      }),
    );
  }
}
