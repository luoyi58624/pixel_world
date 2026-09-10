import 'dart:math' as math;

import 'budget.dart';
import 'observation.dart';
import 'protocol.dart';
import 'routes.dart';
import 'rules_data.dart';

/// 一组已经核算资源的调动候选。
class PlannedOperation {
  /// 保存候选账本与命令组。
  const PlannedOperation(this.ledger, this.group);

  /// 执行后的确定资源及合法操作。
  final AiLedger ledger;
  final AiCommandGroup group;
}

/// 共用调兵、武器和路线编排，所有产物仍只是命令建议。
class OperationPlanner {
  /// 绑定本次请求。
  OperationPlanner(this.request, this.rules, this.routes);

  /// 观察、规则与路线服务。
  final AiRequest request;
  final AiRules rules;
  final AiRoutes routes;
  AiObservation get _view => request.observation;
  bool get _canPurchase => request.stage != AiDecisionStage.attack;

  /// 有限的低价优先配装候选，不把后续三件全部当作必定释放。
  List<List<int>> loadouts(AiHero hero, AiLedger ledger) {
    if (!hero.stationed) return [hero.weapons];
    final available =
        rules.weapons.values
            .where(
              (w) =>
                  (ledger.stock[w.id] ?? 0) > 0 ||
                  _canPurchase && w.shopEnabled && _view.year >= w.unlockYear,
            )
            .toList()
          ..sort(
            (a, b) => a.price == b.price
                ? a.id.compareTo(b.id)
                : a.price.compareTo(b.price),
          );
    final result = <List<int>>[[]];
    for (final w in available.take(5)) {
      result.add([w.id]);
    }
    if (available.isNotEmpty) {
      final safe = available.where((w) => w.selfDamage < hero.health).toList();
      final strongest = (safe.isEmpty ? available : safe).reduce(
        (a, b) => a.damage - a.selfDamage > b.damage - b.selfDamage ? a : b,
      );
      if (!result.any((r) => r.length == 1 && r.first == strongest.id)) {
        result.add([strongest.id]);
      }
      result.add(
        List.filled(math.min(3, rules.integer('carryLimit')), strongest.id),
      );
      final sacrifice = available
          .where((w) => w.selfDamage > 0 && (ledger.stock[w.id] ?? 0) > 0)
          .firstOrNull;
      if (sacrifice != null &&
          !result.any((r) => r.length == 1 && r.first == sacrifice.id)) {
        result.add([sacrifice.id]);
      }
    }
    return result;
  }

  /// 依赖版本只绑定真正会使用的实体，不随无关国家移动失效。
  Map<String, String> dependencies(
    Iterable<AiHero> heroes,
    Iterable<AiCity> cities,
  ) => {
    for (final h in heroes) 'h:${h.id}': h.revision,
    for (final c in cities) 'c:${c.id}': c.revision,
  };

  /// 从实际位置编排调动；在外部队不能隔空补兵或从仓库拿武器。
  PlannedOperation? send(
    AiLedger base,
    AiHero hero,
    AiRoute route, {
    required String role,
    required String reason,
    AiCity? target,
    AiHero? enemy,
    List<int> gear = const [],
    bool arrival = false,
    bool emergency = false,
    bool rearSafe = false,
    double deadline = double.infinity,
    int protectSoldiers = 0,
    int queueIndex = 0,
    bool attrition = false,
  }) {
    if (!route.complete ||
        !route.seconds.isFinite ||
        route.points.isEmpty ||
        hero.marked ||
        base.reservedHeroes.contains(hero.id)) {
      return null;
    }
    if (route.seconds + rules.tuning.reactionMargin >= deadline) return null;
    final previous = base.tasks[hero.id];
    if (previous != null) {
      if (previous.committedUntil > _view.tick && !emergency) return null;
      if (previous.role == role &&
          previous.city == target?.id &&
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
                        target.safeSlots,
                        _view.garrison(target.id).length,
                      ),
              ) +
          route.seconds +
          rules.number('supplySafety');
    }
    if (duration > rules.tuning.maxExpeditionSeconds) return null;
    final task = ArmyTask(
      hero: hero.id,
      role: role,
      city: target?.id,
      enemy: enemy?.id,
      deadlineTick:
          _view.tick +
          (deadline.isFinite ? deadline * 60 : math.max(duration, 60) * 60)
              .ceil(),
      committedUntil:
          _view.tick + (rules.tuning.commitmentSeconds * 60).round(),
      points: route.points,
      gold: (duration / rules.number('supplySeconds')).ceil(),
      arrivalSlot: arrival,
      reason: reason,
      expectedOrderRevision: hero.orderRevision + 1,
      targetCountry: role == 'expedition' ? target?.country : null,
      attrition: attrition,
    );
    if (arrival &&
        target != null &&
        ledger.occupancy(target.id) -
                (previous?.arrivalSlot == true && previous?.city == target.id
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
        if (!ledger.buySoldiers(purchase)) return null;
        actions.add(
          AiAction(AiActionKind.soldiers, city: hero.city, amount: purchase),
        );
      }
      final needed = <int, int>{};
      for (final id in gear) {
        needed.update(id, (n) => n + 1, ifAbsent: () => 1);
        if ((ledger.stock[id] ?? 0) < needed[id]!) {
          if (!_canPurchase) return null;
          if (!ledger.buyWeapon(id)) return null;
          actions.add(AiAction(AiActionKind.buyWeapon, amount: id));
        }
      }
      if (!ledger.depart(hero, gear, task, duration)) return null;
      if (ledger.reserves < protectSoldiers) return null;
      actions.add(
        AiAction(
          AiActionKind.dispatch,
          hero: hero.id,
          city: role == 'intercept' || route.points.length > 1
              ? null
              : target?.id,
          point: route.points.first,
          weaponIds: gear,
        ),
      );
    } else {
      if (!ledger.redirect(hero, task)) return null;
      actions.add(
        AiAction(
          AiActionKind.move,
          hero: hero.id,
          city: role == 'intercept' || route.points.length > 1
              ? null
              : target?.id,
          point: route.points.first,
        ),
      );
    }
    final floor = ledger.cash(emergency: emergency).reserve;
    if (ledger.gold < floor || (!arrival && ledger.gold == 0)) return null;
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
        minimumGold: floor,
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
