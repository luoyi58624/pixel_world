import 'dart:math' as math;

import 'observation.dart';
import 'rules_data.dart';
import 'combat_assessment.dart';

/// 采购与进攻共用目标优先级，综合弱点、路程、仇恨、土地和本土价值。
double targetPriority(
  AiCity city,
  AiHero hero,
  AiObservation view,
  AiRules rules,
  int seed,
) {
  final guards = view.garrison(city.id).reversed.take(city.safeSlots).toList();
  final strongest = guards.isEmpty
      ? 0.0
      : guards
            .map((h) => h.combat * 3 + h.hp * .35 + h.soldierCount * 8)
            .reduce(math.max);
  final territories = view.cities
      .where((c) => c.country == city.country)
      .length;
  final linked = view.heroes
      .where((h) => h.city == city.id && !h.stationed)
      .fold(
        0.0,
        (n, h) => n + heroStrategicValue(h) * (h.opponent == null ? .12 : .03),
      );
  final hatred = math.min(.5, (view.nation.hatred[city.country] ?? 0) * .005);
  final rivalry = territories >= 3
      ? math.min(40, territories * 6).toDouble()
      : 0.0;
  var tie = (seed ^ (city.id * 7919)) & 0xffffffff;
  tie = (tie ^ (tie << 13)) & 0xffffffff;
  tie = (tie ^ (tie >>> 17)) & 0xffffffff;
  tie = (tie ^ (tie << 5)) & 0xffffffff;
  return 160 +
      city.baseIncome *
          (city.nativeCountry == hero.country
              ? 1
              : rules.number('foreignYield')) *
          2 +
      linked +
      rivalry +
      hatred * 30 -
      strongest * .5 -
      city.level * 8 -
      hero.position.distance(city.center) * .03 +
      (tie & 0xffff) / 65536 * 0.000001;
}
