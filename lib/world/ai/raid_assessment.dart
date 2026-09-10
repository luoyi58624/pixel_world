import 'dart:math' as math;

import 'combat_assessment.dart';
import 'observation.dart';
import 'rules_data.dart';

/// 采购和出征共用单军/编队门槛，不预演战果；人数为零表示当前装备不足。
({double lower, double upper, int teamSize}) assessRaid(
  AiHero hero,
  AiCity city,
  AiObservation view,
  AiRules rules,
  CombatAssessor assessor,
  List<int> gear, {
  double slack = 0,
}) {
  final guards = view.garrison(city.id).reversed.take(city.safeSlots).toList();
  var lower = 1.0, upper = 1.0;
  var reserve = view.countries.firstWhere((c) => c.id == city.country).reserves;
  for (var i = 0; i < guards.length; i++) {
    final guard = guards[i];
    final soldiers = math.min(
      rules.integer('soldierLimit'),
      reserve + guard.soldierCount,
    );
    reserve = math.max(0, reserve - (soldiers - guard.soldierCount));
    final pair = assessor.compare(
      hero,
      guard,
      enemyDefense: math.max(1, city.safeSlots - i),
      ownSoldiers: rules.integer('soldierLimit'),
      enemySoldiers: soldiers,
      loadout: gear,
      ownOpening: true,
      enemyOpening: false,
    );
    lower = math.min(lower, pair.lower);
    upper = math.min(upper, pair.upper);
  }
  if (guards.isEmpty ||
      (guards.length == 1 &&
          city.level <= 2 &&
          hero.hp >= hero.maxHp * .8 &&
          lower > rules.tuning.expansionMargin) ||
      lower >
          rules.tuning.advantageMargin +
              math.max(0, guards.length - 1) * .025 -
              slack) {
    return (lower: lower, upper: upper, teamSize: 1);
  }
  return (
    lower: lower,
    upper: upper,
    teamSize:
        guards.length > 1 &&
            upper > rules.tuning.advantageMargin &&
            lower > -.08
        ? math.min(rules.tuning.maxTeam, guards.length)
        : 0,
  );
}
