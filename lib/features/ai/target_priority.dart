import 'dart:math' as math;

import 'observation.dart';
import 'rules_data.dart';
import 'combat_assessment.dart';
import 'coalition_policy.dart';

/// 采购与进攻共用目标优先级，综合弱点、路程、仇恨、土地和本土价值。
double targetPriority(
  AiCity city,
  AiHero hero,
  AiObservation view,
  AiRules rules,
  int seed, {
  double? travelSeconds,
}) {
  final guards = view.garrison(city.id).reversed.take(city.safeSlots).toList();
  final strongest = guards.isEmpty
      ? 0.0
      : guards
            .map((h) => h.combat * 3 + h.hp * .35 + h.soldierCount * 8)
            .reduce(math.max);
  final linked = view.heroes
      .where((h) => h.city == city.id && !h.stationed)
      .fold(
        0.0,
        (n, h) => n + heroStrategicValue(h) * (h.opponent == null ? .12 : .03),
      );
  final hatred = (view.nation.hatred[city.country] ?? 0).clamp(0, 100) / 100;
  final rivalry = CoalitionPolicy(city.country, view, rules).priorityBonus;
  var tie = (seed ^ (city.id * 7919)) & 0xffffffff;
  tie = (tie ^ (tie << 13)) & 0xffffffff;
  tie = (tie ^ (tie >>> 17)) & 0xffffffff;
  tie = (tie ^ (tie << 5)) & 0xffffffff;
  final travel =
      travelSeconds ??
      hero.position.distance(city.center) /
          (rules.number('marchSpeed') * rules.movementFactors[0]);
  final score =
      160 +
      city.baseIncome *
          (city.nativeCountry == hero.country
              ? 1
              : rules.number('foreignYield')) *
          2 +
      linked +
      rivalry +
      hatred * rules.tuning.hatredTargetBonus -
      strongest * .25 -
      city.level * 6;
  return math.max(1, score) /
          math.pow(1 + travel / rules.tuning.targetTravelScale, 1.5) +
      (tie & 0xffff) / 65536 * 0.000001;
}
