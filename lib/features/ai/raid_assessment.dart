import 'dart:math' as math;

import 'combat_assessment.dart';
import 'observation.dart';
import 'rules_data.dart';
import 'coalition_policy.dart';

/// 采购和出征共用单军/编队门槛，不预演战果；人数为零表示当前装备不足。
({double lower, double upper, int teamSize, bool breakthrough}) assessRaid(
  AiHero hero,
  AiCity city,
  AiObservation view,
  AiRules rules,
  CombatAssessor assessor,
  List<int> gear, {
  double slack = 0,
}) {
  final guards = view.garrison(city.id).reversed.take(city.safeSlots).toList();
  final coalition = CoalitionPolicy(city.country, view, rules);
  var lower = 1.0, upper = 1.0;
  var burden = 0.0;
  CombatAssessment? opening;
  final ownPower =
      rules.attack(hero.combat, field: false) +
      rules.integer('soldierLimit') * rules.integer('soldierPower');
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
      loadout: i < gear.length ? [gear[i]] : const [],
      ownOpening: true,
      enemyOpening: false,
    );
    lower = math.min(lower, pair.lower);
    if (i == 0) opening = pair;
    upper = math.min(upper, pair.upper);
    final enemyPower =
        rules.attack(
          guard.combat,
          field: false,
          defenseLevel: math.max(1, city.safeSlots - i),
        ) +
        soldiers * rules.integer('soldierPower');
    // 全城只有一份进攻军生命与背包；这里只累加静态攻防负担，不试打后续轮次。
    final ratio = enemyPower / math.max(1, ownPower);
    burden +=
        (guard.hp + soldiers * rules.integer('soldierHp')) * ratio * ratio;
  }
  var weaponCredit = 0.0;
  for (var i = 0; i < math.min(gear.length, guards.length); i++) {
    final w = rules.weapons[gear[i]];
    if (w != null) {
      weaponCredit +=
          math.max(0, w.damage - w.selfDamage) *
          (i == 0 ? 1 : rules.tuning.laterWeaponCredit);
    }
  }
  final endurance =
      hero.hp +
      rules.integer('soldierLimit') * rules.integer('soldierHp') +
      weaponCredit;
  final sustainedTeam = math.max(
    1,
    (burden / math.max(1, endurance * .85)).ceil(),
  );
  ({double lower, double upper, int teamSize, bool breakthrough})
  limitedObjective() {
    final first = opening;
    if (guards.isNotEmpty &&
        first != null &&
        !first.releaseRisk &&
        hero.hp >= hero.maxHp * .5 &&
        first.upper > 0 &&
        first.lower >= rules.tuning.breakthroughMargin) {
      return (
        lower: first.lower,
        upper: first.upper,
        teamSize: 1,
        breakthrough: true,
      );
    }
    return (lower: lower, upper: upper, teamSize: 0, breakthrough: false);
  }

  // 先核算全城攻势；单轮交换仅作为无法形成完整攻势时的备选。
  if (guards.isNotEmpty &&
      gear.isEmpty &&
      lower < rules.tuning.splitAdvantageMargin) {
    return (lower: lower, upper: upper, teamSize: 0, breakthrough: false);
  }
  // 高城不能把超出编队容量的消耗硬截成四将，从而误报“已备齐兵力”。
  if (sustainedTeam > rules.tuning.maxTeam) {
    return limitedObjective();
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
    return (
      lower: lower,
      upper: upper,
      breakthrough: false,
      teamSize: coalition.teamSize(
        lower >= rules.tuning.splitAdvantageMargin || guards.isEmpty
            ? sustainedTeam
            : math.max(2, sustainedTeam),
        guards.length,
      ),
    );
  }
  final team =
      guards.length > 1 && upper > rules.tuning.advantageMargin && lower > -.08
      ? math.min(rules.tuning.maxTeam, guards.length)
      : 0;
  if (team == 0) return limitedObjective();
  return (
    lower: lower,
    upper: upper,
    breakthrough: false,
    teamSize: coalition.teamSize(team, guards.length),
  );
}
