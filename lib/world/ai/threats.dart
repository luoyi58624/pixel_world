import 'dart:math' as math;

import 'observation.dart';
import 'routes.dart';
import 'combat_assessment.dart';
import 'rules_data.dart';

/// 观察到的来敌与预计接触区间，终点是推断而非读取隐藏命令。
class IncomingArmy {
  /// 最早接触时间与入侵可信程度。
  const IncomingArmy(this.hero, this.seconds, this.confidence);

  /// 来敌、地形积分秒数与方向可信度。
  final AiHero hero;
  final double seconds, confidence;
}

/// 一座城的战时名额、全体可见来敌和关键将领风险。
class CityDefenseReport {
  /// 创建只读报告。
  const CityDefenseReport(
    this.city,
    this.garrison,
    this.incoming,
    this.eligible,
    this.soldiers,
    this.risk, {
    this.linkedValue = 0,
  });

  /// 城池、真实守军顺序、来敌与可出场英雄。
  final AiCity city;
  final List<AiHero> garrison, eligible;
  final List<IncomingArmy> incoming;

  /// 按真实顺序分配的储备下界。
  final Map<String, int> soldiers;

  /// 主要守将面对最强来敌的静态风险。
  final CombatAssessment? risk;

  /// 仍依赖此城的外出英雄价值。
  final double linkedValue;

  /// 已知威胁是否明确。
  bool get threatened => incoming.isNotEmpty || city.initialBattleLevel != null;

  /// 最早危险窗口不借用未经证实的交战拖延。
  double get deadline => city.initialBattleLevel != null
      ? city.dangerSeconds
      : incoming.isEmpty
      ? double.infinity
      : incoming.map((e) => e.seconds).reduce(math.min);

  /// 建筑面板之外的真实迎战名额。
  int get slots => city.safeSlots;

  /// 当前危险溢员数。
  int get overflow => math.max(0, garrison.length - slots);

  /// 主力是否会因迎战名额先耗尽而失去出场机会。
  List<AiHero> get blocked =>
      garrison.where((h) => !eligible.contains(h)).toList();
}

/// 仅凭位置、最近运动和公开对阵状态推断威胁。
class ThreatAnalyzer {
  /// 绑定同一请求的观察、路线和属性评估。
  ThreatAnalyzer(this.view, this.rules, this.routes, this.assessor);

  /// 只读依赖。
  final AiObservation view;
  final AiRules rules;
  final AiRoutes routes;
  final CombatAssessor assessor;

  /// 扫描一座城，不忽略排名靠后的危险城市。
  CityDefenseReport report(AiCity city) {
    final guards = view.garrison(city.id), incoming = <IncomingArmy>[];
    for (final hero in view.heroes) {
      if (hero.country == city.country || hero.stationed || hero.hp <= 0) {
        continue;
      }
      if (hero.id == city.attacker) {
        incoming.add(IncomingArmy(hero, 0, 1));
        continue;
      }
      if (hero.marked) continue;
      final distance = hero.position.distance(city.center);
      if (distance >
          rules.number('marchSpeed') * rules.tuning.threatSeconds + 80) {
        continue;
      }
      final speed = math.sqrt(
        hero.velocity.x * hero.velocity.x + hero.velocity.y * hero.velocity.y,
      );
      final toward = speed < .01
          ? 0.0
          : ((city.center.x - hero.position.x) * hero.velocity.x +
                    (city.center.y - hero.position.y) * hero.velocity.y) /
                (math.max(1.0, distance) * speed);
      if (toward < .45 && distance > 72) continue;
      if (distance > 72) {
        final along = math.max(0.0, distance * toward);
        final projected = hero.position.translated(
          hero.velocity.x / speed * along,
          hero.velocity.y / speed * along,
        );
        if (city.outline.nearest(projected).distance(projected) > 48) continue;
      }
      final end = city.outline.approach(hero.position, city.center);
      var eta = routes.seconds(hero.position, end);
      if (!eta.isFinite && routes.work.limited) {
        eta = hero.position.distance(end) / rules.number('marchSpeed');
      }
      if (eta > rules.tuning.threatSeconds || !eta.isFinite) continue;
      incoming.add(
        IncomingArmy(
          hero,
          eta,
          toward > .8
              ? 1.0
              : distance < 72
              ? .9
              : .55,
        ),
      );
    }
    incoming.sort(
      (a, b) => a.seconds == b.seconds
          ? a.hero.id.compareTo(b.hero.id)
          : a.seconds.compareTo(b.seconds),
    );
    final current = guards.where((h) => h.id == city.defender).firstOrNull;
    final order = [?current, ...guards.reversed.where((h) => h != current)];
    final eligible = order.take(city.safeSlots).toList(),
        allocated = <String, int>{};
    var reserve = view.countries
        .firstWhere((c) => c.id == city.country)
        .reserves;
    for (final h in eligible) {
      final add = h.state == AiArmyState.defending
          ? 0
          : math.min(reserve, rules.integer('soldierLimit') - h.soldierCount);
      reserve -= add;
      allocated[h.id] = h.soldierCount + add;
    }
    CombatAssessment? risk;
    if (incoming.isNotEmpty && eligible.isNotEmpty) {
      // 守城战力与内政、角色稀有度分开；对公开来敌做有配额的静态配对。
      for (var position = 0; position < eligible.length; position++) {
        final guard = eligible[position];
        CombatAssessment? worst;
        for (final army in incoming) {
          final pair = assessor.compare(
            guard,
            army.hero,
            ownDefense: math.max(1, city.safeSlots - position),
            ownSoldiers: allocated[guard.id],
            ownOpening: false,
            enemyOpening: army.hero.openingAvailable,
          );
          if (worst == null || pair.lower < worst.lower) worst = pair;
        }
        if (risk == null || worst!.lower > risk.lower) risk = worst;
      }
    }
    return CityDefenseReport(
      city,
      guards,
      incoming,
      eligible,
      allocated,
      risk,
      linkedValue: view.heroes
          .where(
            (h) =>
                h.country == city.country &&
                h.city == city.id &&
                !h.stationed &&
                !h.marked,
          )
          .fold(0.0, (n, h) => n + heroStrategicValue(h)),
    );
  }
}
