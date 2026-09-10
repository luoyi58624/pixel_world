import 'dart:math' as math;

import 'budget.dart';
import 'observation.dart';
import 'rules_data.dart';
import 'coalition_policy.dart';

/// 只识别本国公开指令，敌城已变友城后不再属于进攻任务。
AiCity? assaultTarget(AiHero hero, AiObservation view, AiLedger ledger) {
  if (hero.stationed || hero.state == AiArmyState.retreating) return null;
  final task = ledger.tasks[hero.id];
  final target = view.city(
    task?.role == 'expedition' ? task?.city : hero.targetCity,
  );
  return target != null && target.country != hero.country ? target : null;
}

/// 临城、排队或正在进攻的将领不能被普通整备判断打断。
bool assaultIsCommitted(
  AiHero hero,
  AiObservation view,
  AiLedger ledger,
  AiRules rules,
) {
  final target = assaultTarget(hero, view, ledger);
  if (target == null) return false;
  return hero.state == AiArmyState.queue ||
      hero.state == AiArmyState.attacking ||
      target.outline.nearest(hero.position).distance(hero.position) <=
          rules.tuning.assaultCommitDistance;
}

/// 全国进攻战线的公开战力快照，采购和出兵共用，避免各将领分别另选目标。
class OffensiveFocus {
  /// 汇总仍然有效的在途、排队和交战部队；撤退者不算可用攻城力量。
  OffensiveFocus(
    this.view,
    this.ledger,
    this.rules, {
    int? targetCountry,
    int? targetCity,
  }) : _previousCountry =
           view.cities.any(
             (c) => c.country == targetCountry && c.country != view.country,
           )
           ? targetCountry
           : null,
       _preferredCity = targetCity {
    for (final task in ledger.tasks.values) {
      final hero = view.hero(task.hero), city = view.city(task.city);
      if (task.role != 'expedition' ||
          hero == null ||
          city == null ||
          city.country == view.country ||
          hero.country != view.country ||
          hero.marked ||
          hero.hp <= 0 ||
          ledger.removed.contains(hero.id) ||
          hero.state == AiArmyState.retreating ||
          (hero.stationed && !ledger.departed.contains(hero.id))) {
        continue;
      }
      armies.putIfAbsent(city.id, () => []).add(hero);
    }
  }

  /// 同一次规划的观察、账本与策略参数。
  final AiObservation view;
  final AiLedger ledger;
  final AiRules rules;

  /// 原目标仍有领土时持续推进，灭国后自动解除。
  final int? _previousCountry;

  /// 尚未出发时可改为应对新出现的危险国家，已经在途的部队保持原战线。
  int? get objectiveCountry {
    final previous = _previousCountry;
    if (previous == null || armies.isNotEmpty) return previous;
    bool reachable(int country) => view.cities
        .where((c) => c.country == country)
        .any(
          (target) => view.owned.any(
            (home) =>
                ledger.routes.seconds(
                  home.center,
                  target.outline.nearest(home.center),
                ) <=
                rules.tuning.coalitionMaxTravelSeconds,
          ),
        );
    if (CoalitionPolicy(previous, view, rules).dangerous) {
      return reachable(previous) ? previous : null;
    }
    final others = view.cities.map((c) => c.country).toSet();
    return others.any(
          (id) => CoalitionPolicy(id, view, rules).dangerous && reachable(id),
        )
        ? null
        : previous;
  }

  final int? _preferredCity;

  /// 尚未攻下的具体目标优先；已易主时重新选择该敌国的剩余城市。
  int? get preferredCity =>
      objectiveCountry != null &&
          view.city(_preferredCity)?.country == objectiveCountry
      ? _preferredCity
      : null;

  /// 目标城到已经承诺的部队，包含本次规划中尚待执行的出征。
  final Map<int, List<AiHero>> armies = {};

  /// 兵力最多的现有战线优先，平局按城池编号保持稳定。
  int? get primary {
    final ids = armies.keys.toList()
      ..sort((a, b) {
        final count = armies[b]!.length.compareTo(armies[a]!.length);
        return count != 0 ? count : a.compareTo(b);
      });
    return ids.firstOrNull;
  }

  /// 已承诺的有效将领数，防止跨扫描周期重复叠加同一编队。
  int assignedTo(int city) => armies[city]?.length ?? 0;

  /// 只有主战线明显占优且没有达到战线数上限，才考虑另开一路。
  bool get mayOpenFront {
    final id = primary;
    return id == null ||
        view.monthIndex >= rules.tuning.singleFrontMonths &&
            armies.length < rules.tuning.maxOffensiveFronts &&
            coverage(id) >= rules.tuning.splitForceRatio;
  }

  /// 新目标必须取得主战线许可；已经在打的其他战线保留原指令。
  bool allows(AiCity city) {
    // 尚无实际出征时，旧目标只影响偏好，不能封死所有其他可进攻城市。
    if (primary == null) return true;
    if (objectiveCountry != null &&
        city.country != objectiveCountry &&
        (primary == null || !mayOpenFront)) {
      return false;
    }
    final main = primary ?? preferredCity;
    return main == null ||
        city.id == main ||
        primary != null && !armies.containsKey(city.id) && mayOpenFront;
  }

  /// 静态攻防承伤资源比，不扣未来生命、不预演碰撞或假定武器全部兑现。
  double coverage(int cityId) {
    final city = view.city(cityId)!;
    var own = 0.0;
    for (final h in armies[cityId] ?? <AiHero>[]) {
      final count = ledger.departed.contains(h.id)
          ? rules.integer('soldierLimit')
          : h.soldierCount;
      own += _strength(h, count, 0);
    }
    var reserve = view.countries
        .firstWhere((c) => c.id == city.country)
        .reserves;
    var defense = 0.0, wave = 0;
    for (final h in view.garrison(cityId).reversed.take(city.safeSlots)) {
      final count = math.min(
        rules.integer('soldierLimit'),
        h.soldierCount + reserve,
      );
      reserve -= count - h.soldierCount;
      defense += _strength(h, count, math.max(1, city.safeSlots - wave));
      wave++;
    }
    return defense == 0 ? double.infinity : own / defense;
  }

  double _strength(AiHero h, int soldiers, int level) {
    final power =
        rules.attack(h.combat, field: false, defenseLevel: level) +
        soldiers * rules.integer('soldierPower');
    final hp = h.hp + soldiers * rules.integer('soldierHp');
    return hp * (((power + 2) ~/ 4) + 1) * (1 + h.morale / 1000);
  }
}
