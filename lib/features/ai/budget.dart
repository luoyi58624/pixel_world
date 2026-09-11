import 'dart:math' as math;

import 'observation.dart';
import 'protocol.dart';
import 'routes.dart';
import 'rules_data.dart';
import 'coalition_policy.dart';
import 'combat_assessment.dart';
import 'rear_safety.dart';
import '../economy/domain/military_upkeep.dart';

/// 一名部队的连续粮草承诺，返城时才停止计费。
class SupplyCommitment {
  /// 保存当前零头、消耗率和持续时间。
  const SupplyCommitment(this.due, this.rate, this.until);

  /// 零头、每秒金币及停止计费时刻。
  final double due, rate, until;

  /// 到给定时刻已经需要实际支付的金币。
  int cost(double seconds) =>
      (due + rate * math.min(seconds, until) + 1e-9).floor();
}

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

/// 只在规划账本上扣除确定资源，不修改真实英雄、城市或库存。
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
       stock = Map.of(view.nation.stock),
       levels = {for (final c in view.owned) c.id: c.level},
       tasks = {for (final t in tasks) t.hero: t};

  /// 冻结观察与纯规则。
  final AiObservation view;
  final AiRules rules;
  final AiRoutes routes;

  /// 当前候选的剩余资源。
  int gold, reserves, capacity, extraSalary = 0;
  final Map<int, int> stock, levels;

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
  final List<SupplyCommitment> newSupplies = [];
  final Map<int, bool> _rearSafety = {};

  /// 复制候选账本，用于比较有限复合方案。
  AiLedger copy() {
    final next = AiLedger(view, rules, routes, tasks: tasks.values.toList());
    next.gold = gold;
    next.reserves = reserves;
    next.capacity = capacity;
    next.extraSalary = extraSalary;
    next.stock
      ..clear()
      ..addAll(stock);
    next.levels
      ..clear()
      ..addAll(levels);
    next.removed.addAll(removed);
    next.departed.addAll(departed);
    next.reservedHeroes.addAll(reservedHeroes);
    next.recruited.addAll(recruited);
    next.abandoned.addAll(abandoned);
    next.newSupplies.addAll(newSupplies);
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
    if (safeRear(city)) {
      return hero.type != 2 && !(valuableGovernor(hero) && hero.combat < 12);
    }
    final guards = view
        .garrison(hero.city)
        .where((h) => !removed.contains(h.id))
        .toList();
    if (guards.length <= 1) return false;
    final protagonist = guards.where((h) => h.type == 2).firstOrNull;
    if (protagonist != null) return hero.id != protagonist.id;
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

  /// 核算已有部队、候选任务和月结前后现金低点。
  CashRequirement cash({bool emergency = false, double? horizon}) {
    var duration =
        horizon ?? rules.number('monthSeconds') + rules.number('supplySafety');
    final supplies = <SupplyCommitment>[...newSupplies];
    for (final hero in view.heroes.where(
      (h) =>
          h.country == view.country &&
          !h.stationed &&
          !h.marked &&
          !removed.contains(h.id),
    )) {
      final task = tasks[hero.id];
      var until = duration;
      final rate =
          (hero.state == AiArmyState.camped && task == null
              ? rules.number('campRate')
              : 1) /
          rules.number('supplySeconds');
      if (hero.state == AiArmyState.retreating && hero.returnPath.isNotEmpty) {
        var from = hero.position;
        until = hero.opponent != null ? rules.number('battleBudget') : 0;
        for (final p in hero.returnPath) {
          until += routes.seconds(from, p);
          from = p;
        }
      } else if (task != null && task.arrivalSlot) {
        var from = hero.position;
        until = rules.tuning.reactionMargin;
        for (final p in task.points.skip(task.leg)) {
          until += routes.seconds(from, p);
          from = p;
        }
      } else if (hero.targetCity != null &&
          view.city(hero.targetCity)?.country == hero.country &&
          hero.destination != null) {
        until =
            routes.seconds(hero.position, hero.destination!) +
            rules.tuning.reactionMargin;
      } else if (task != null && !task.arrivalSlot) {
        final created =
            task.committedUntil / 60 - rules.tuning.commitmentSeconds;
        until = math.max(
          0,
          created + task.gold * rules.number('supplySeconds') - view.tick / 60,
        );
        if (hero.destination != null) {
          until = math.max(
            until,
            routes.seconds(hero.position, hero.destination!),
          );
        }
      } else if (hero.destination != null && hero.state != AiArmyState.camped) {
        final travel = routes.seconds(hero.position, hero.destination!);
        final target = view.city(hero.targetCity);
        until = math.max(duration, travel);
        if (target != null && target.country != hero.country) {
          final ownAhead = view.heroes
              .where(
                (h) =>
                    h.id != hero.id &&
                    h.country == hero.country &&
                    h.targetCity == target.id &&
                    h.position.distance(target.center) <
                        hero.position.distance(target.center),
              )
              .length;
          final guards = math.max(
            1,
            math.min(target.safeSlots, view.garrison(target.id).length),
          );
          until =
              travel +
              guards * (1 + ownAhead) * rules.number('battleBudget') +
              rules.number('supplySafety');
        }
      }
      if (!until.isFinite) until = rules.tuning.maxExpeditionSeconds;
      duration = math.max(duration, until);
      final indefinite =
          (task == null || task.role == 'standby') &&
          hero.targetCity == null &&
          hero.state != AiArmyState.retreating;
      supplies.add(
        SupplyCommitment(
          hero.supplyDue,
          rate,
          indefinite ? double.infinity : until,
        ),
      );
    }
    for (final s in newSupplies) {
      duration = math.max(duration, s.until);
    }
    duration = math.min(rules.tuning.maxExpeditionSeconds, duration);
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
            : view.nation.baseIncome ?? rules.integer('countryIncome')) +
        earningCities
            .where((c) => !abandoned.contains(c.id))
            .fold<int>(
              0,
              (n, c) =>
                  n +
                  ((c.baseIncome +
                              (levels[c.id]! - 1) *
                                  rules.integer('incomeStep')) *
                          (c.country == c.nativeCountry
                              ? 1
                              : rules.number('foreignYield')))
                      .floor() -
                  rules.integer('poorPenalty'),
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
      final pay = supplies.fold(0, (n, s) => n + s.cost(at));
      final months = at + 1e-9 < view.monthRemaining
          ? 0
          : 1 +
                ((at - view.monthRemaining) / rules.number('monthSeconds'))
                    .floor();
      // 同时检查月结前现金低点，经营预算不能把未到账收入当成现有现金。
      if (monthEnds.any((month) => (month - at).abs() < 1e-7)) {
        peak = math.max(peak, pay + monthlyCost(math.max(0, months - 1)));
      }
      peak = math.max(peak, pay + monthlyCost(months));
    }
    return CashRequirement(
      // 军费允许透支，但常规经营仍预留小额现金，避免后续招将与武器采购被欠款阻断。
      math.max(0, peak) +
          (emergency
              ? (supplies.isEmpty ? 0 : 1)
              : rules.integer('emergencyGold')),
      duration,
      salary,
      income,
    );
  }

  /// 合法升级报价及容量变化，主持将领仍留在城内。
  bool upgrade(AiCity city, AiHero governor) {
    if (!governor.canUpgrade ||
        removed.contains(governor.id) ||
        departed.contains(governor.id)) {
      return false;
    }
    final level = levels[city.id]!,
        cost = rules.upgradeCost(level, governor.politics);
    if (level >= rules.cityUpgradeLimit(view.year) ||
        cost == null ||
        gold < cost) {
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
    if (hero.stationed) {
      for (final id in hero.weapons) {
        stock.update(id, (v) => v + 1, ifAbsent: () => 1);
      }
    }
    return true;
  }

  /// 征兵只补明确需求。
  bool buySoldiers(int count) {
    final cost = count * rules.integer('soldierCost');
    if (count < 0 || reserves + count > capacity) return false;
    gold -= cost;
    reserves += count;
    return true;
  }

  /// 商店已开放的武器只检查价格，不按城池数解锁。
  bool buyWeapon(int id) {
    final w = rules.weapons[id];
    if (w == null ||
        !w.shopEnabled ||
        view.year < w.unlockYear ||
        gold < w.price) {
      return false;
    }
    gold -= w.price;
    stock.update(id, (n) => n + 1, ifAbsent: () => 1);
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
        (view.year >= 3 || emergency) &&
        gold - cost >=
            cash(emergency: emergency).reserve +
                view.maximumSalary +
                math.max(0, futureUpkeep - monthlyGarrisonUpkeep);
    if (!city.recruitAllowed ||
        recruited.contains(city.id) ||
        view.poolCount <= recruited.length ||
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
  bool depart(AiHero hero, List<int> weapons, ArmyTask task, double seconds) {
    if (!hero.canDispatch ||
        reservedHeroes.contains(hero.id) ||
        removed.contains(hero.id) ||
        gold <= 0) {
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
    final stockCopy = Map<int, int>.of(stock);
    if (weapons.length > rules.integer('carryLimit')) return false;
    for (final id in weapons) {
      if ((stockCopy[id] ?? 0) == 0) return false;
      stockCopy[id] = stockCopy[id]! - 1;
    }
    stock
      ..clear()
      ..addAll(stockCopy);
    reserves -= math.min(
      reserves,
      rules.integer('soldierLimit') - hero.soldierCount,
    );
    departed.add(hero.id);
    reservedHeroes.add(hero.id);
    tasks[hero.id] = task;
    newSupplies.add(
      SupplyCommitment(
        hero.supplyDue,
        1 / rules.number('supplySeconds'),
        seconds,
      ),
    );
    return true;
  }

  /// 自由行军改令仍需要真实现金，并且不能重复分给两座城。
  bool redirect(AiHero hero, ArmyTask task) {
    if (!hero.canMove ||
        reservedHeroes.contains(hero.id) ||
        gold <= 0 ||
        hero.marked) {
      return false;
    }
    reservedHeroes.add(hero.id);
    tasks[hero.id] = task;
    return true;
  }
}
