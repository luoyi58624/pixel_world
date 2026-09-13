import 'dart:math' as math;

import 'budget.dart';
import 'observation.dart';
import 'protocol.dart';
import 'routes.dart';
import 'rules_data.dart';
import 'coalition_policy.dart';

/// 一组已经核算资源的调动候选。
class PlannedOperation {
  /// 保存候选账本与命令组。
  const PlannedOperation(this.ledger, this.group);

  /// 执行后的确定资源及合法操作。
  final AiLedger ledger;
  final AiCommandGroup group;
}

/// 共用调兵与路线编排，所有产物仍只是命令建议。
class OperationPlanner {
  /// 绑定本次请求。
  OperationPlanner(this.request, this.rules, this.routes);

  /// 观察、规则与路线服务。
  final AiRequest request;
  final AiRules rules;
  final AiRoutes routes;
  AiObservation get _view => request.observation;
  bool get _canPurchase => request.stage != AiDecisionStage.attack;

  /// 小国优先近程围攻；多城国家可以直接远征，路线只限制到达时间。
  bool hasCoalitionFront(AiCity target) =>
      !CoalitionPolicy(target.country, _view, rules).dangerous ||
      _view.owned.length >= 3 ||
      _view.owned.any(
        (city) =>
            routes.seconds(city.center, target.outline.nearest(city.center)) <=
            rules.tuning.coalitionMaxTravelSeconds,
      );

  /// 全国具备参战条件后允许后方主力直达，不为每名英雄重复设置前沿距离门槛。
  bool canRaidFrom(AiHero hero, AiCity target) => hasCoalitionFront(target);

  /// 按现有强攻将领与资金准备轮攻，开局也可组队，不因凑不齐满队而永远停战。
  int raidTeamSize(
    int minimum,
    AiCity target,
    AiLedger ledger, {
    AiHero? lead,
  }) {
    if (minimum == 0 ||
        target.safeSlots < 3 ||
        _view.garrison(target.id).length < 2) {
      return minimum;
    }
    final strongest = _view.heroes
        .where((h) => h.country == _view.country && !h.marked)
        .fold<int>(0, (n, h) => math.max(n, h.combat));
    final leadSeconds = lead == null
        ? null
        : routes.seconds(lead.position, target.outline.nearest(lead.position));
    final available = _view.heroes
        .where(
          (h) =>
              h.country == _view.country &&
              !h.marked &&
              h.hp >= h.maxHp * .65 &&
              h.combat >= strongest * .8 &&
              (h.canDispatch &&
                      (leadSeconds == null ||
                          (routes.seconds(
                                        h.position,
                                        target.outline.nearest(h.position),
                                      ) -
                                      leadSeconds)
                                  .abs() <=
                              rules.tuning.raidArrivalSpread) &&
                      ledger.canSpareForOffense(h) &&
                      !ledger.reservedHeroes.contains(h.id) ||
                  ledger.tasks[h.id]?.role == 'expedition' &&
                      ledger.tasks[h.id]?.city == target.id),
        )
        .length;
    final spendable = math.max(0, ledger.gold - ledger.cash().reserve - 20);
    final funded = spendable ~/ math.max(1, rules.integer('soldierLimit'));
    final team = math.min(rules.tuning.maxTeam, math.min(available, funded));
    return math.max(minimum, team);
  }

  /// 资金充足时补充二至四名可出战主力，不把普通留守人数误当作攻城队伍已经备齐。
  int desiredAssaultHeroes(AiLedger ledger) {
    if (_view.year < 3) return 1;
    final funded =
        math.max(
          0,
          ledger.gold - ledger.cash().reserve - rules.tuning.resourceCashBuffer,
        ) ~/
        math.max(
          1,
          rules.integer('drawCost') +
              _view.maximumSalary +
              rules.integer('soldierLimit'),
        );
    return math.max(1, math.min(rules.tuning.maxTeam, funded));
  }

  /// 依赖版本只绑定真正会使用的实体，不随无关国家移动失效。
  Map<String, String> dependencies(
    Iterable<AiHero> heroes,
    Iterable<AiCity> cities,
  ) => {
    for (final h in heroes) 'h:${h.id}': h.revision,
    for (final c in cities) 'c:${c.id}': c.revision,
  };

  /// 从实际位置编排调动；在外部队不能隔空补兵。
  PlannedOperation? send(
    AiLedger base,
    AiHero hero,
    AiRoute route, {
    required String role,
    required String reason,
    AiCity? target,
    AiHero? enemy,
    bool arrival = false,
    bool emergency = false,
    bool rearSafe = false,
    double deadline = double.infinity,
    int protectSoldiers = 0,
    int queueIndex = 0,
    bool attrition = false,
  }) {
    // 驻城将领只在城内迎敌；截击仅允许改派已经在野外的部队。
    if (role == 'intercept' && hero.stationed) return null;
    if (!route.complete ||
        !route.seconds.isFinite ||
        route.points.isEmpty ||
        hero.marked ||
        base.reservedHeroes.contains(hero.id)) {
      return null;
    }
    if (route.seconds + rules.tuning.reactionMargin >= deadline) return null;
    if (role == 'expedition' &&
        target != null &&
        (target.country == _view.country || !hasCoalitionFront(target))) {
      return null;
    }
    final previous = base.tasks[hero.id];
    if (previous != null) {
      if (previous.committedUntil > _view.tick && !emergency) return null;
      if (previous.role == role &&
          previous.city == target?.id &&
          (role != 'expedition' && role != 'staging' ||
              previous.targetCountry == target?.country) &&
          previous.enemy == enemy?.id &&
          previous.points.isNotEmpty &&
          previous.points.last.distance(route.points.last) < 32 &&
          hero.state != AiArmyState.camped) {
        return null;
      }
    }
    final ledger = base.copy(), actions = <AiAction>[];
    var duration = route.seconds + rules.tuning.reactionMargin;
    if (!arrival) {
      duration +=
          rules.number('battleBudget') *
              (queueIndex + 1) *
              math.max(
                1,
                target == null
                    ? 1
                    : math.min(
                        attrition ? 1 : target.safeSlots,
                        _view.garrison(target.id).length,
                      ),
              ) +
          route.seconds +
          rules.number('budgetSafety');
    }
    if (duration > rules.tuning.maxExpeditionSeconds) return null;
    final task = ArmyTask(
      hero: hero.id,
      role: role,
      city: target?.id,
      enemy: enemy?.id,
      deadlineTick:
          _view.tick +
          (deadline.isFinite
                  ? deadline * 60
                  : (math.max(duration, 60) +
                            rules.tuning.maximumRequestAge +
                            rules.tuning.reactionMargin) *
                        60)
              .ceil(),
      committedUntil:
          _view.tick + (rules.tuning.commitmentSeconds * 60).round(),
      points: route.points,
      arrivalSlot: arrival,
      rearStaging: arrival && rearSafe,
      reason: reason,
      expectedOrderRevision: hero.orderRevision + 1,
      targetCountry: role == 'expedition' || role == 'staging'
          ? target?.country
          : null,
      attrition: attrition,
    );
    if (arrival &&
        target != null &&
        ledger.occupancy(target.id) -
                (previous?.arrivalSlot == true &&
                        previous!.deadlineTick >= _view.tick &&
                        previous.city == target.id
                    ? 1
                    : 0) >=
            (rearSafe
                ? math.max(
                    ledger.slots(target),
                    target.rearStagingCapacity + rules.tuning.rearStagingExtra,
                  )
                : ledger.slots(target))) {
      return null;
    }
    if (hero.stationed) {
      final desired = math.min(
        ledger.capacity,
        protectSoldiers + rules.integer('soldierLimit') - hero.soldierCount,
      );
      final purchase = math.max(0, desired - ledger.reserves);
      if (purchase > 0) {
        if (!_canPurchase) return null;
        // 一次采购会消耗本月补兵机会，有余钱时不能只买本次出征的最低兵数。
        final count = ledger.stockUpSoldiers(emergency: emergency);
        if (count < purchase) return null;
        actions.add(
          AiAction(AiActionKind.soldiers, city: hero.city, amount: count),
        );
      }
      if (!ledger.depart(hero, task)) return null;
      if (ledger.reserves < protectSoldiers) return null;
      actions.add(
        AiAction(
          AiActionKind.dispatch,
          hero: hero.id,
          city:
              role == 'intercept' ||
                  role == 'staging' ||
                  route.points.length > 1
              ? null
              : target?.id,
          point: route.points.first,
        ),
      );
    } else {
      if (!ledger.redirect(hero, task)) return null;
      actions.add(
        AiAction(
          AiActionKind.move,
          hero: hero.id,
          city:
              role == 'intercept' ||
                  role == 'staging' ||
                  route.points.length > 1
              ? null
              : target?.id,
          point: route.points.first,
        ),
      );
    }
    return PlannedOperation(
      ledger,
      AiCommandGroup(
        reason: reason,
        actions: actions,
        dependencies: dependencies(
          [hero, ?enemy],
          [_view.city(hero.city)!, ?target],
        ),
        tasks: [task],
        minimumGold: ledger.gold,
        emergency: emergency,
      ),
    );
  }

  /// 用公开速度做少量定点迭代求截击点，不读取敌军最终目的地。
  AiRoute intercept(AiHero hero, AiHero enemy, AiLedger ledger) {
    if (enemy.opponent != null) {
      return const AiRoute([], double.infinity, complete: false);
    }
    final home = _view.city(hero.city)!;
    final origin = hero.stationed
        ? home.outline.departure(home.center, enemy.position)
        : hero.position;
    final rx = enemy.position.x - origin.x, ry = enemy.position.y - origin.y;
    final vx = enemy.velocity.x, vy = enemy.velocity.y;
    final speed =
        rules.number('marchSpeed') *
        rules.movementFactors[routes.map.at(origin)];
    final a = vx * vx + vy * vy - speed * speed,
        b = 2 * (rx * vx + ry * vy),
        c = rx * rx + ry * ry;
    var seconds = math.sqrt(c) / speed;
    if (a.abs() < 1e-7 && b < 0) {
      seconds = -c / b;
    } else if (a.abs() >= 1e-7 && b * b - 4 * a * c >= 0) {
      final root = math.sqrt(b * b - 4 * a * c);
      final roots = [
        (-b - root) / (2 * a),
        (-b + root) / (2 * a),
      ].where((v) => v >= 0).toList();
      if (roots.isNotEmpty) seconds = roots.reduce(math.min);
    }
    var route = const AiRoute([], double.infinity, complete: false);
    for (var i = 0; i < 3; i++) {
      final target = enemy.position.translated(
        enemy.velocity.x * seconds,
        enemy.velocity.y * seconds,
      );
      if (!routes.map.contains(target) ||
          _view.cities.any((city) => city.outline.contains(target))) {
        return const AiRoute([], double.infinity, complete: false);
      }
      route = routes.to(hero, target, _view);
      if (!route.complete) return route;
      if ((seconds - route.seconds).abs() < .1) break;
      seconds = (seconds + route.seconds) / 2;
    }
    return route;
  }
}
