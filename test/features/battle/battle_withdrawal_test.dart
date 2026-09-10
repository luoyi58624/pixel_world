import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/battle/domain/field_terrain.dart';

BattleArmy _army(String id) => BattleArmy(
  id: id,
  name: id,
  general: BattleHealth(95),
  attack: 8,
  soldiers: List.generate(4, (_) => BattleHealth(20)),
);

void main() {
  for (final side in BattleSide.values) {
    for (final success in [false, true]) {
      test('$side 撤退成功=$success：双方连续退回原位，结果之前无伤害或瞬移', () {
        final sim = BattleSimulation(
          attacker: _army('a'),
          defender: _army('d'),
          seed: 17,
          fieldTerrain: FieldTerrain.grass,
        );
        final homes = {for (final unit in sim.units) unit.id: unit.position};
        for (var i = 0; i < 1200 && sim.clashes == 0; i++) {
          sim.advance(1 / 60);
        }
        expect(sim.clashes, 1);
        final starts = {for (final unit in sim.units) unit.id: unit.position};
        final hp = {for (final unit in sim.units) unit.id: unit.health.hp};
        final morale = [
          sim.attackerMorale.remaining,
          sim.defenderMorale.remaining,
        ];
        expect(sim.beginRetreat(side, succeeded: success), isTrue);
        expect(sim.beginRetreat(side, succeeded: success), isFalse);
        expect(sim.stage, BattleStage.retreating);
        expect(sim.retreatMessage, contains('双方退回起点'));
        var previous = starts;
        for (var frame = 0; frame < 71; frame++) {
          sim.advance(1 / 60);
          expect(sim.finished, isFalse);
          expect(sim.clashes, 1);
          for (final unit in sim.units) {
            expect(unit.visible, isTrue);
            expect(unit.health.hp, hp[unit.id]);
            expect(
              (unit.position - previous[unit.id]!).distance,
              lessThanOrEqualTo(3),
            );
            expect(
              (unit.position - homes[unit.id]!).distance,
              lessThanOrEqualTo(
                (previous[unit.id]! - homes[unit.id]!).distance,
              ),
            );
          }
          previous = {for (final unit in sim.units) unit.id: unit.position};
        }
        expect(sim.attackerMorale.remaining, morale[0]);
        expect(sim.defenderMorale.remaining, morale[1]);
        sim.advance(1 / 60);
        for (final unit in sim.units) {
          expect(unit.position, homes[unit.id]);
        }
        final general = sim.units.firstWhere(
          (unit) => unit.side == side && unit.isGeneral,
        );
        expect(general.visible, isTrue);
        expect(sim.finished, isFalse);
        if (success) {
          expect(sim.stage, BattleStage.ending);
          expect(general.health.hp, hp[general.id]);
          sim.advance(GameConfig.retreatResultSeconds);
          expect(sim.finished, isTrue);
        } else {
          expect(sim.stage, BattleStage.falling);
          expect(general.health.hp, 0);
          expect(
            sim.units
                .where((unit) => unit.side == side)
                .every((unit) => !unit.health.alive && unit.visible),
            isTrue,
          );
          expect(general.diedAt, closeTo(sim.elapsed, .0001));
          sim.advance(.1);
          expect(general.visible, isTrue);
          expect(general.position, isNot(homes[general.id]));
          for (var i = 0; i < 1200 && !sim.finished; i++) {
            sim.advance(1 / 60);
          }
          expect(sim.finished, isTrue);
        }
      });
    }
  }
}
