import 'dart:math' as math;

import 'observation.dart';
import 'protocol.dart';
import 'routes.dart';
import 'rules_data.dart';
import 'coalition_policy.dart';
import 'combat_assessment.dart';
import 'rear_safety.dart';
import '../economy/domain/military_upkeep.dart';

/// 国家现金低点，不预支尚未发生的收入。
class CashRequirement {
  /// 保存维持现金与检查范围。
  const CashRequirement(
    this.reserve,
    this.horizon,
    this.salary,
    this.poorIncome,
  );

  /// 所需最低现金、预测时长、月俸和欠收收入。
  final int reserve, salary, poorIncome;
  final double horizon;
}

/// 只在规划账本上扣除确定资源，不修改真实英雄、城市或国库。
class AiLedger {
  /// 以当前国库建立全国共用账本。
  AiLedger(
    this.view,
    this.rules,
    this.routes, {
    List<ArmyTask> tasks = const [],
  }) : gold = view.nation.gold,
       reserves = view.nation.reserves,
       capacity = view.nation.capacity,
       levels = {for (final c in view.owned) c.id: c.level},
       tasks = {for (final t in tasks) t.hero: t};

  /// 冻结观察与纯规则。
  final AiObservation view;
  final AiRules rules;
  final AiRoutes routes;

  /// 当前候选的剩余资源。
  int gold, reserves, capacity, extraSalary = 0;
  final Map<int, int> levels;

  /// 已选择的任务、移出/解雇英雄及入城名额。
  final Map<String, ArmyTask> tasks;
  final Set<String> removed = {}, departed = {}, reservedHeroes = {};

  /// 根据持续任务重建预约，跨调度周期仍占名额，改派后自动释放旧城名额。
  Map<int, int> get arrivals {
    final result = <int, int>{};
    for (final task in tasks.values) {
      final hero = view.hero(task.hero);
      if (!task.arrivalSlot ||
          task.city == null ||
          hero == null ||
          hero.marked ||
          hero.hp <= 0 ||
          removed.contains(hero.id) ||
          (hero.stationed && !departed.contains(hero.id)) ||
          task.deadlineTick < view.tick ||
          view.city(task.city)?.country != view.country) {
        continue;
      }
      result.update(task.city!, (n) => n + 1, ifAbsent: () => 1);
    }
    return result;
  }

  final Set<int> recruited = {}, abandoned = {};
  // 同一轮候选规划也必须消耗本城的月度升级次数。
  final Set<int> _upgraded = {};
  final Map<int, bool> _rearSafety = {};

  /// 复制候选账本，用于比较有限复合方案。
  AiLedger copy() {
    final next = AiLedger(view, rules, routes, tasks: tasks.values.toList());
    next.gold = gold;
    next.reserves = reserves;
    next.capacity = capacity;
    next.extraSalary = extraSalary;
    next.levels
      ..clear()
      ..addAll(levels);
    next.removed.addAll(removed);
    next.departed.addAll(departed);
    next.reservedHeroes.addAll(reservedHeroes);
    next.recruited.addAll(recruited);
    next._upgraded.addAll(_upgraded);
    next.abandoned.addAll(abandoned);
    next._rearSafety.addAll(_rearSafety);
    return next;
  }

  /// 当前计划下的驻军。
  List<AiHero> garrison(int city) => view
      .garrison(city)
      .where((h) => !removed.contains(h.id) && !departed.contains(h.id))
      .toList();

  /// 战中按开场名额，战前按候选升级后的等级。
  int slots(AiCity city) => city.initialBattleLevel == null
      ? (levels[city.id] ?? city.level)
      : city.safeSlots;

  /// 未来入城名额也占用战时容量。
  int occupancy(int city) =>
      garrison(city).length +
      (arrivals[city] ?? 0) +
      (recruited.contains(city) ? 1 : 0);

  /// 仍归属本城的在途与交战将领也计入编制，只有战损才形成替补缺口。
  int assignedHeroCount(int city) =>
      view.heroes
          .where(
            (h) =>
                h.country == view.country &&
                h.city == city &&
                h.hp > 0 &&
                !h.marked &&
                !removed.contains(h.id),
          )
          .length +
      (arrivals[city] ?? 0) +
      (recruited.contains(city) ? 1 : 0);

  /// 安全后方允许空城，边境、受威胁城市和小国仍需要实际守将。
  int defendersToKeep(AiCity city) {
    if (garrison(city.id).any((h) => h.type == 2)) return 2;
    return abandoned.contains(city.id) || safeRear(city) ? 0 : 1;
  }

  /// 同一观察下缓存后方判断；敌情或领土变化后的新账本必须重新计算。
  bool safeRear(AiCity city) => _rearSafety.putIfAbsent(city.id, () {
    double radius(AiCity c) => c.outline.points.fold<double>(
      0,
      (n, p) => math.max(n, c.center.distance(p)),
    );
    return city.country == view.country &&
        safeRearArea(
          ownedCities: view.owned.length,
          fighting: city.initialBattleLevel != null,
          center: city.center,
          radius: radius(city),
          fastestSpeed:
              rules.number('marchSpeed') *
              rules.movementFactors.reduce(math.max),
          threatSeconds: rules.tuning.threatSeconds,
          enemyCities: view.cities
              .where((c) => c.country != view.country)
              .map((c) => (c.center, radius(c))),
          enemyArmies: view.heroes
              .where(
                (h) =>
                    h.country != view.country &&
                    !h.stationed &&
                    !h.marked &&
                    h.hp > 0,
              )
              .map((h) => (h.position, h.regionCity == city.id)),
        );
  });

  /// 每个进攻目标只在最近可达的友城补员，警报中的本地招募另走防守流程。
  Set<int> recruitmentFronts(Iterable<AiCity> targets) {
    final result = <int>{};
    for (final target in targets.take(rules.tuning.maxTargets)) {
      final candidates =
          view.owned
              .where(
                (c) =>
                    !abandoned.contains(c.id) &&
                    c.recruitAllowed &&
                    (c.initialBattleLevel == null ||
                        occupancy(c.id) < slots(c)),
              )
              .toList()
            ..sort(
              (a, b) => a.center
                  .distance(target.center)
                  .compareTo(b.center.distance(target.center)),
            );
      AiCity? best;
      var cost = double.infinity;
      for (final city in candidates.take(3)) {
        final seconds = routes.seconds(
          city.center,
          target.outline.nearest(city.center),
        );
        if (seconds < cost) {
          best = city;
          cost = seconds;
        }
      }
      if (best != null) result.add(best.id);
    }
    return result;
  }

  /// 前线保留有战力的守将，安全后方释放主力，但不将低攻击内政将领用于攻城。
  bool canSpareForOffense(AiHero hero) {
    final city = view.city(hero.city);
    if (city == null) return false;
    final guards = garrison(hero.city);
    final protagonist = guards.where((h) => h.type == 2).firstOrNull;
    if (protagonist != null) {
      if (guards.length <= 2 || hero.id == protagonist.id) return false;
      // 护卫必须能承接敌军开场，不能仅用一个低战力人头满足主角安全条件。
      final guardsBeforeProtagonist =
          guards.where((h) => h != protagonist).toList()..sort(
            (a, b) =>
                heroDefenseValue(
                  b,
                  rules,
                  slots(city),
                  rules.integer('soldierLimit'),
                ).compareTo(
                  heroDefenseValue(
                    a,
                    rules,
                    slots(city),
                    rules.integer('soldierLimit'),
                  ),
                ),
          );
      final strongest = heroDefenseValue(
        guardsBeforeProtagonist.first,
        rules,
        slots(city),
        rules.integer('soldierLimit'),
      );
      final guardian = guardsBeforeProtagonist
          .where(
            (h) =>
                heroDefenseValue(
                  h,
                  rules,
                  slots(city),
                  rules.integer('soldierLimit'),
                ) >=
                strongest * .6,
          )
          .last;
      return hero.id != guardian.id;
    }
    if (safeRear(city)) {
      return !(valuableGovernor(hero) && hero.combat < 12);
    }
    if (guards.length <= 1) return false;
    double strength(AiHero h) => heroDefenseValue(
      h,
      rules,
      slots(city),
      math.min(rules.integer('soldierLimit'), reserves),
    );
    guards.sort((a, b) => strength(b).compareTo(strength(a)));
    final governors = guards.where(valuableGovernor).toList()
      ..sort((a, b) {
        final politics = b.politics.compareTo(a.politics);
        return politics != 0 ? politics : a.combat.compareTo(b.combat);
      });
    if (governors.isNotEmpty) return hero.id != governors.first.id;
    // 留下达到本城最强守将六成战力的较弱者，让更强主力仍可出击。
    final threshold = strength(guards.first) * .6;
    final keeper = guards.where((h) => strength(h) >= threshold).last;
    return hero.id != keeper.id;
  }

  /// 核算月俸与月结前后现金低点；行军、扎营及路线长短均不增加费用。
  CashRequirement cash({bool emergency = false, double? horizon}) {
    final duration = math.min(
      rules.tuning.maxExpeditionSeconds,
      horizon ?? rules.number('monthSeconds') + rules.number('budgetSafety'),
    );
    final salary = view.heroes
        .where(
          (h) =>
              h.country == view.country && h.hp > 0 && !removed.contains(h.id),
        )
        .fold(extraSalary, (n, h) => n + h.salary);
    // 签约时已预付本月；只抵扣下一个月结，后续月份仍需保留全额月俸。
    final prepaid = view.heroes
        .where(
          (h) =>
              h.country == view.country &&
              h.hp > 0 &&
              !removed.contains(h.id) &&
              h.salaryPaidMonth == view.monthIndex,
        )
        .fold(extraSalary, (n, h) => n + h.salary);
    final earningCities = view.owned
        .where((c) => !abandoned.contains(c.id))
        .toList();
    final int income =
        (earningCities.isEmpty
            ? 0
            : (view.nation.baseIncome ?? rules.integer('countryIncome')) -
                  rules.integer('poorPenalty')) +
        earningCities.fold<int>(
          0,
          (n, c) =>
              n +
              ((c.baseIncome +
                          (levels[c.id]! - 1) * rules.integer('incomeStep')) *
                      (c.country == c.nativeCountry
                          ? 1
                          : rules.number('foreignYield')))
                  .floor(),
        );
    final upkeep = monthlyGarrisonUpkeep;
    int monthlyCost(int n) => n == 0
        ? 0
        : n * (salary - income) -
              prepaid +
              (view.nation.garrisonAccrued +
                      upkeep *
                          (view.monthRemaining / rules.number('monthSeconds') +
                              n -
                              1))
                  .ceil();
    final checkpoints = <double>{duration};
    final monthEnds = <double>[];
    for (
      var at = view.monthRemaining;
      at <= duration + 1e-9;
      at += rules.number('monthSeconds')
    ) {
      checkpoints.add(at);
      monthEnds.add(at);
    }
    var peak = 0;
    for (final at in checkpoints) {
      final months = at + 1e-9 < view.monthRemaining
          ? 0
          : 1 +
                ((at - view.monthRemaining) / rules.number('monthSeconds'))
                    .floor();
      // 同时检查月结前现金低点，经营预算不能把未到账收入当成现有现金。
      if (monthEnds.any((month) => (month - at).abs() < 1e-7)) {
        peak = math.max(peak, monthlyCost(math.max(0, months - 1)));
      }
      peak = math.max(peak, monthlyCost(months));
    }
    return CashRequirement(
      // 常规经营仍预留小额现金，免费调动不受此采购预算限制。
      math.max(0, peak) + (emergency ? 0 : rules.integer('emergencyGold')),
      duration,
      salary,
      income,
    );
  }

  /// 合法升级报价及容量变化，主持将领仍留在城内。
  bool upgrade(AiCity city, AiHero governor) {
    if (!city.upgradeAllowed ||
        _upgraded.contains(city.id) ||
        !governor.canUpgrade ||
        removed.contains(governor.id) ||
        departed.contains(governor.id)) {
      return false;
    }
    final level = levels[city.id]!,
        cost = rules.upgradeCost(level, governor.politics);
    if (level >= rules.cityUpgradeLimit(view.year) ||
        cost == null ||
        gold <= cost) {
      return false;
    }
    final factor = city.country == city.nativeCountry
        ? 1.0
        : rules.number('foreignYield');
    capacity +=
        ((level + 1) * rules.integer('capacityPerLevel') * factor).floor() -
        (level * rules.integer('capacityPerLevel') * factor).floor();
    gold -= cost;
    levels[city.id] = level + 1;
    _upgraded.add(city.id);
    return true;
  }

  /// 计入已招募、出发和预约入城的部队，防止预算只计算工资漏掉囤将军费。
  int get monthlyGarrisonUpkeep => view.owned.fold(
    0,
    (sum, city) =>
        sum +
        MilitaryUpkeep.monthlyCost(
          occupancy(city.id),
          freeHeroes: (rules.values['garrisonFree'] ?? 2).toInt(),
          factor: (rules.values['garrisonFactor'] ?? 0).toInt(),
        ),
  );

  /// 合法解雇的确定返款与全国容量裁剪。
  bool dismiss(AiHero hero) {
    if (!hero.canDismiss || hero.type == 2 || removed.contains(hero.id)) {
      return false;
    }
    if (hero.stationed &&
        !abandoned.contains(hero.city) &&
        garrison(hero.city).length <= 1) {
      return false;
    }
    removed.add(hero.id);
    tasks.remove(hero.id);
    reservedHeroes.add(hero.id);
    gold += hero.politics;

    reserves = math.min(
      capacity,
      reserves + (hero.stationed ? hero.soldierCount : 0),
    );
    return true;
  }

  /// 当前余额能支付的兵数，容量和实际缺口由采购时另行检查。
  int get affordableSoldiers =>
      math.max(0, gold ~/ rules.integer('soldierCost'));

  /// 征兵只补明确需求，不能透支国库。
  bool buySoldiers(int count) {
    final cost = count * rules.integer('soldierCost');
    if (count <= 0 || gold <= 0 || cost > gold || reserves + count > capacity) {
      return false;
    }
    gold -= cost;
    reserves += count;
    return true;
  }

  /// 抽签按最高费用和月俸预留，不能指定尚未抽到的英雄。
  bool recruit(AiCity city, {bool emergency = false, int? offensiveCountry}) {
    final cost = rules.integer('drawCost') + view.maximumSalary;
    final futureSalary = view.heroes
        .where(
          (h) =>
              h.country == view.country && h.hp > 0 && !removed.contains(h.id),
        )
        .fold(extraSalary + view.maximumSalary, (n, h) => n + h.salary);
    final monthlyIncome =
        (view.nation.baseIncome ?? rules.integer('countryIncome')) +
        view.owned
            .where((c) => !abandoned.contains(c.id))
            .fold<int>(
              0,
              (n, c) =>
                  n +
                  ((c.baseIncome +
                              ((levels[c.id] ?? c.level) - 1) *
                                  rules.integer('incomeStep')) *
                          (c.country == c.nativeCountry
                              ? 1
                              : rules.number('foreignYield')))
                      .floor(),
            );
    final free = (rules.values['garrisonFree'] ?? 2).toInt();
    final factor = (rules.values['garrisonFactor'] ?? 0).toInt();
    final count = occupancy(city.id);
    final futureUpkeep =
        monthlyGarrisonUpkeep +
        MilitaryUpkeep.monthlyCost(
          count + 1,
          freeHeroes: free,
          factor: factor,
        ) -
        MilitaryUpkeep.monthlyCost(count, freeHeroes: free, factor: factor);
    final withinIncome =
        futureSalary + futureUpkeep <=
            monthlyIncome * (emergency ? 1.3 : 1.1) &&
        futureSalary <=
            monthlyIncome *
                (emergency
                    ? 1
                    : offensiveCountry == null
                    ? rules.tuning.maxPayrollIncomeRatio
                    : CoalitionPolicy(
                        offensiveCountry,
                        view,
                        rules,
                      ).payrollRatio);
    // 后期或警报中允许用现有积蓄扩军；只额外覆盖新将近期工资与驻军费，不强留多年现金。
    final cashBacked =
        (view.year >= 3 ||
            emergency ||
            futureSalary + futureUpkeep <= monthlyIncome) &&
        gold - cost >=
            cash(emergency: emergency).reserve +
                view.maximumSalary +
                math.max(0, futureUpkeep - monthlyGarrisonUpkeep);
    if (!city.recruitAllowed ||
        recruited.contains(city.id) ||
        view.poolCount <= recruited.length ||
        gold <= rules.integer('drawCost') ||
        gold < cost ||
        !(withinIncome || cashBacked)) {
      return false;
    }
    gold -= cost;
    extraSalary += view.maximumSalary;

    recruited.add(city.id);
    return true;
  }

  /// 派兵必须扣除真实自动领取的兵员，再登记全国唯一任务。
  bool depart(AiHero hero, ArmyTask task) {
    if (!hero.canDispatch ||
        reservedHeroes.contains(hero.id) ||
        removed.contains(hero.id)) {
      return false;
    }
    // 入城预约与刚抽取但尚未落地的将领都不能替代真实留守。
    if (garrison(hero.city).length <= 1 &&
        !(view.city(hero.city) != null && safeRear(view.city(hero.city)!)) &&
        !(abandoned.contains(hero.city) &&
            task.role == 'evacuate' &&
            task.arrivalSlot)) {
      return false;
    }
    reserves -= math.min(
      reserves,
      rules.integer('soldierLimit') - hero.soldierCount,
    );
    departed.add(hero.id);
    reservedHeroes.add(hero.id);
    tasks[hero.id] = task;
    return true;
  }

  /// 自由行军改令不收费，但不能把同一将领重复分给两座城。
  bool redirect(AiHero hero, ArmyTask task) {
    if (!hero.canMove || reservedHeroes.contains(hero.id) || hero.marked) {
      return false;
    }
    reservedHeroes.add(hero.id);
    tasks[hero.id] = task;
    return true;
  }
}
