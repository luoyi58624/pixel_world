part of 'campaign.dart';

// 人物宽高均为16；多留两像素间隙，使绕行拐点不会因浮点误差反复碰撞。
const _trafficSize = 16.0;
const _trafficMargin = 18.0;

extension _MarchTraffic on CampaignState {
  void _scheduleDeparture(HeroMarch march) {
    final countryId = march.hero.countryId;
    march._departureAt = math.max(
      _strategyTime,
      _nextAiDeparture[countryId] ?? 0,
    );
    march._departurePending = true;
    _nextAiDeparture[countryId] =
        march._departureAt + GameConfig.aiDepartureInterval;
  }

  bool _trafficOccupied(GamePoint point, {required HeroMarch except}) =>
      marches.values.any(
        (other) =>
            other != except &&
            !other.waitingForDeparture &&
            other.hero.health.alive &&
            (other.position.dx - point.dx).abs() < _trafficSize &&
            (other.position.dy - point.dy).abs() < _trafficSize,
      );

  bool _advanceMarchTraffic(HeroMarch march, double dt) {
    if (march.waitingForDeparture) {
      if (_strategyTime + 1e-8 < march._departureAt ||
          goldFor(march.hero.countryId) <= 0 ||
          _trafficOccupied(march.position, except: march)) {
        return false;
      }
      // 门口阻塞延误后，后续队员也从本次实际放行时间重新保持间距。
      final pending =
          marches.values
              .where(
                (other) =>
                    other != march &&
                    other.hero.countryId == march.hero.countryId &&
                    other.waitingForDeparture,
              )
              .toList()
            ..sort((a, b) => a._departureAt.compareTo(b._departureAt));
      var next = _strategyTime + GameConfig.aiDepartureInterval;
      for (final other in pending) {
        other._departureAt = math.max(other._departureAt, next);
        next = other._departureAt + GameConfig.aiDepartureInterval;
      }
      _nextAiDeparture[march.hero.countryId] = next;
      march._departurePending = false;
    }
    if (march.phase != MarchPhase.marching && !march._trafficBlocked) {
      return false;
    }
    if (goldFor(march.hero.countryId) <= 0) return false;
    final obstacles = marches.values
        .where(
          (other) =>
              other != march &&
              !other.waitingForDeparture &&
              other.hero.health.alive &&
              (other.hero.countryId == march.hero.countryId ||
                  activeBattleForHero(other.hero.id) != null) &&
              (other.position - march.position).distance < 96,
        )
        .map((m) => m.position)
        .toList();
    bool clear(GamePoint from, GamePoint to) =>
        obstacles.every((p) => !_trafficIntersects(from, to, p));
    if (march._trafficRoute.isNotEmpty &&
        !clear(march.position, march._trafficRoute.first)) {
      march._trafficRoute.clear();
    }
    if (march._trafficRoute.isEmpty) {
      if (clear(march.position, march.destination)) {
        march._trafficRoute.add(march.destination);
      } else {
        march._trafficRoute.addAll(
          _trafficPath(march.position, march.destination, obstacles),
        );
      }
    }
    if (march._trafficRoute.isEmpty) {
      if (!march._trafficBlocked) {
        march._trafficBlocked = true;
        march.phase = MarchPhase.camped;
        _record(
          '${march.hero.name}前方被占用，保留目标等待安全通路',
          kind: GameEventKind.heroCamped,
          hero: march.hero,
          source: GameEventSource.system,
          reason: '同国将领或战斗占位阻塞',
        );
        return true;
      }
      return false;
    }
    // 只有周围存在安全路线才解除碰撞扎营，不能仅因有钱而重复撞回去。
    march._trafficBlocked = false;
    march._supplyHalted = false;
    march.phase = MarchPhase.marching;
    final waypoint = march._trafficRoute.first;
    final from = march.position;
    final movement = advanceToward(world, from, waypoint, dt);
    if (!clear(from, movement.position)) {
      march._trafficRoute.clear();
      return false;
    }
    if (movement.distance > 0) {
      march.direction = HeroDirection.fromVector(movement.position - from);
      march._walkAnimation.advance(dt);
      march.position = movement.position;
      march.walkDistance += movement.distance;
    }
    if ((march.position - waypoint).distance < 1e-7) {
      march._trafficRoute.removeAt(0);
    }
    if ((march.position - march.destination).distance < 1e-7) {
      march._trafficRoute.clear();
      march.phase = march.target == null
          ? MarchPhase.camped
          : MarchPhase.awaitingBattle;
      return true;
    }
    return movement.distance > 0;
  }

  // 只围绕附近实际占位点构建可见性图，不推演战斗；最短绕行仍以原目标为终点。
  List<GamePoint> _trafficPath(
    GamePoint from,
    GamePoint goal,
    List<GamePoint> obstacles,
  ) {
    final nodes = <GamePoint>[from, goal];
    for (final p in obstacles) {
      for (final dx in [-_trafficMargin, _trafficMargin]) {
        for (final dy in [-_trafficMargin, _trafficMargin]) {
          final corner = GamePoint(p.dx + dx, p.dy + dy);
          if (_containsPoint(corner)) nodes.add(corner);
        }
      }
    }
    final distance = List.filled(nodes.length, double.infinity)..[0] = 0;
    final previous = List.filled(nodes.length, -1);
    final visited = <int>{};
    while (visited.length < nodes.length) {
      var best = -1;
      for (var i = 0; i < nodes.length; i++) {
        if (!visited.contains(i) &&
            distance[i].isFinite &&
            (best < 0 || distance[i] < distance[best])) {
          best = i;
        }
      }
      if (best < 0) return [];
      if (best == 1) {
        final path = <GamePoint>[];
        for (var i = 1; i != 0; i = previous[i]) {
          path.add(nodes[i]);
        }
        return path.reversed.toList();
      }
      visited.add(best);
      for (var i = 0; i < nodes.length; i++) {
        if (visited.contains(i) ||
            obstacles.any((p) => _trafficIntersects(nodes[best], nodes[i], p))) {
          continue;
        }
        final candidate = distance[best] + (nodes[i] - nodes[best]).distance;
        if (candidate < distance[i]) {
          distance[i] = candidate;
          previous[i] = best;
        }
      }
    }
    return [];
  }
}

// 连续线段与人物扩张矩形相交检测，避免跨帧穿人；边缘接触不算重叠。
bool _trafficIntersects(GamePoint from, GamePoint to, GamePoint center) {
  var enter = 0.0, leave = 1.0;
  const radius = _trafficSize - 1e-6;
  for (final axis in [
    (from.dx, to.dx - from.dx, center.dx),
    (from.dy, to.dy - from.dy, center.dy),
  ]) {
    if (axis.$2.abs() < 1e-10) {
      if ((axis.$1 - axis.$3).abs() >= radius) return false;
    } else {
      final a = (axis.$3 - radius - axis.$1) / axis.$2;
      final b = (axis.$3 + radius - axis.$1) / axis.$2;
      enter = math.max(enter, math.min(a, b));
      leave = math.min(leave, math.max(a, b));
      if (enter > leave) return false;
    }
  }
  return enter <= leave;
}
