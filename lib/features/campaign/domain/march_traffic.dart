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
            other.visibleOnMap &&
            other.hero.health.alive &&
            (other.position.dx - point.dx).abs() < _trafficSize &&
            (other.position.dy - point.dy).abs() < _trafficSize,
      );

  bool _advanceMarchTraffic(HeroMarch march, double dt) {
    if (march.waitingForDeparture) {
      if (_strategyTime + 1e-8 < march._departureAt) return false;
      if (_trafficOccupied(march.position, except: march) &&
          !_relocateDeparture(march)) {
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
    final obstacles = marches.values
        .where(
          (other) =>
              other != march &&
              other.visibleOnMap &&
              other.hero.health.alive &&
              (other.hero.countryId == march.hero.countryId ||
                  activeBattleForHero(other.hero.id) != null) &&
              (other.position - march.position).distance < 96,
        )
        .map((m) => m.position)
        .toList();
    // 城堡可以从任意墙面接触；同一入口被排队部队占住时改选邻近空位。
    if (march.target != null &&
        !march._siegeWaiting &&
        obstacles.any(
          (p) =>
              (p.dx - march.destination.dx).abs() < _trafficSize &&
              (p.dy - march.destination.dy).abs() < _trafficSize,
        )) {
      final city = march.target!, origin = cityBounds(march.target!).topLeft;
      final contact = _cityContact(city);
      final candidates =
          <GamePoint>[
            for (final point in contact.outline) origin + point,
            for (final offset in [
              const GamePoint(24, 0),
              const GamePoint(-24, 0),
              const GamePoint(0, 24),
              const GamePoint(0, -24),
            ])
              origin + contact.nearest(march.destination - origin + offset),
          ]..sort(
            (a, b) => (a - march.position).distanceSquared.compareTo(
              (b - march.position).distanceSquared,
            ),
          );
      final free = candidates
          .where(
            (p) =>
                _containsPoint(p) &&
                obstacles.every(
                  (other) =>
                      (other.dx - p.dx).abs() >= _trafficSize ||
                      (other.dy - p.dy).abs() >= _trafficSize,
                ),
          )
          .firstOrNull;
      if (free != null) {
        march.destination = free;
        march._trafficRoute.clear();
      }
    }
    final around = march._siegeWaiting ? march.target : null;
    bool clear(GamePoint from, GamePoint to) =>
        obstacles.every((p) => !_trafficIntersects(from, to, p)) &&
        (around == null || _outsideSiegeWall(from, to, around));
    if (march._trafficRoute.isNotEmpty &&
        !clear(march.position, march._trafficRoute.first)) {
      march._trafficRoute.clear();
    }
    if (march._trafficRoute.isEmpty) {
      if (clear(march.position, march.destination)) {
        march._trafficRoute.add(march.destination);
      } else {
        march._trafficRoute.addAll(
          _trafficPath(
            march.position,
            march.destination,
            obstacles,
            around: around,
          ),
        );
      }
    }
    if (march._trafficRoute.isEmpty) {
      if (march.returningFromRetreat) {
        _yieldRetreatPassage(march);
      }
      if (!march._trafficBlocked) {
        march._trafficBlocked = true;
        march.phase = march.returningFromRetreat
            ? MarchPhase.marching
            : MarchPhase.camped;
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

  // 集结营地也会占住原路拐点；沿返程两侧让出通道，不能只处理攻城候战者。
  void _yieldRetreatPassage(HeroMarch retreat) {
    final direction = retreat.destination - retreat.position;
    final angle = math.atan2(direction.dy, direction.dx);
    for (final other in marches.values) {
      if (other == retreat ||
          other.hero.countryId != retreat.hero.countryId ||
          !other.visibleOnMap ||
          !other.hero.health.alive ||
          other.returningFromRetreat ||
          activeBattleForHero(other.hero.id) != null ||
          !(other.phase == MarchPhase.camped ||
              other.phase == MarchPhase.awaitingBattle ||
              other._siegeWaiting) ||
          (other.position - retreat.position).distance > 96 ||
          !_trafficIntersects(
            retreat.position,
            retreat.destination,
            other.position,
          )) {
        continue;
      }
      // 已经向通道外移动的队员继续走，不逐帧改令和累积无用返程拐点。
      if (other.phase == MarchPhase.marching &&
          !_trafficIntersects(
            retreat.position,
            retreat.destination,
            other.destination,
          )) {
        continue;
      }
      final obstacles = marches.values
          .where((m) => m != other && m.visibleOnMap && m.hero.health.alive)
          .map((m) => m.position)
          .toList();
      GamePoint? free;
      for (final distance in [36.0, 54.0, 72.0]) {
        for (final turn in [math.pi / 2, -math.pi / 2, 0.0, math.pi]) {
          final point =
              other.position +
              GamePoint(math.cos(angle + turn), math.sin(angle + turn)) *
                  distance;
          final target = other.target;
          if (target != null) {
            final outward = other.position - cityBounds(target).center;
            final step = point - other.position;
            // 保持沿当前墙面向外让行，不能借避让标记穿过敌城。
            if (outward.dx * step.dx + outward.dy * step.dy < -1e-7) continue;
          }
          if (!_containsPoint(point) ||
              _trafficIntersects(
                retreat.position,
                retreat.destination,
                point,
              ) ||
              world.cities.any(
                (c) => _cityContact(c).contains(point - cityBounds(c).topLeft),
              ) ||
              obstacles.any(
                (p) => _trafficIntersects(other.position, point, p),
              )) {
            continue;
          }
          free = point;
          break;
        }
        if (free != null) break;
      }
      if (free == null) continue;
      final queued =
          other.target != null &&
          cities[other.target!.id]?.ownerCountryId != other.hero.countryId;
      other._resumeToward(free, city: other.target);
      other._siegeWaiting = queued;
      _record(
        '${other.hero.name}向侧方让出撤退通路',
        kind: GameEventKind.heroMoved,
        hero: other.hero,
        source: GameEventSource.system,
        reason: '自家部队正在撤退，集结和候战部队先让行',
      );
    }
  }

  // 候发部队仍在城内，原出口被返程或扎营部队占住时从其他空闲墙面出城。
  bool _relocateDeparture(HeroMarch march) {
    final city = world.cities.firstWhere((c) => c.id == march.departureCityId);
    if (cities[city.id]!.ownerCountryId != march.hero.countryId) return false;
    final origin = cityBounds(city).topLeft;
    final outline = _cityContact(city).outline;
    final candidates = <GamePoint>[];
    for (var i = 0; i < outline.length; i++) {
      final a = outline[i], b = outline[(i + 1) % outline.length];
      final steps = math.max(1, ((b - a).distance / _trafficMargin).ceil());
      for (var step = 0; step < steps; step++) {
        candidates.add(origin + a + (b - a) * (step / steps));
      }
    }
    candidates.sort(
      (a, b) => (a - march.position).distanceSquared.compareTo(
        (b - march.position).distanceSquared,
      ),
    );
    final free = candidates
        .where((p) => _containsPoint(p) && !_trafficOccupied(p, except: march))
        .firstOrNull;
    if (free == null) return false;
    final target = march.target;
    final destination = target == null
        ? march.destination
        : cityBounds(target).center;
    march.position = free;
    march.moveTo(
      target == null ? destination : _contactPoint(free, destination, target),
      city: target,
    );
    _record(
      '${march.hero.name}改从空闲墙面出城',
      kind: GameEventKind.heroMoved,
      hero: march.hero,
      source: GameEventSource.system,
      reason: '原出口被部队占用，保留进攻目标和离城间隔，避免出城与返城互相等待',
    );
    return true;
  }

  // 只围绕附近实际占位点构建可见性图，不推演战斗；最短绕行仍以原目标为终点。
  List<GamePoint> _trafficPath(
    GamePoint from,
    GamePoint goal,
    List<GamePoint> obstacles, {
    CityDefinition? around,
  }) {
    final nodes = <GamePoint>[from, goal];
    if (around != null) {
      final origin = cityBounds(around).topLeft;
      final bounds = _cityContact(around).bounds.inflate(12);
      nodes.addAll(
        [
          bounds.topLeft,
          bounds.topRight,
          bounds.bottomLeft,
          bounds.bottomRight,
        ].map((p) => origin + p).where(_containsPoint),
      );
    }
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
            around != null &&
                !_outsideSiegeWall(nodes[best], nodes[i], around) ||
            obstacles.any(
              (p) => _trafficIntersects(nodes[best], nodes[i], p),
            )) {
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

  // 圆环换位必须绕过城堡；旧存档贴墙者只允许先向外脱离。
  bool _outsideSiegeWall(GamePoint from, GamePoint to, CityDefinition city) {
    final origin = cityBounds(city).topLeft, contact = _cityContact(city);
    if (contact.contains(from - origin)) {
      final outward = from - cityBounds(city).center, movement = to - from;
      return outward.dx * movement.dx + outward.dy * movement.dy >= -1e-8;
    }
    return !contact.contains(to - origin) &&
        contact.entryFraction(from - origin, to - origin) == null;
  }
}

// 连续线段与人物扩张矩形相交检测，避免跨帧穿人；边缘接触不算重叠。
bool _trafficIntersects(GamePoint from, GamePoint to, GamePoint center) {
  var enter = 0.0, leave = 1.0;
  const radius = _trafficSize - 1e-6;
  final offset = from - center, movement = to - from;
  // 交战收尾或外观变更可能留下已有重叠，只允许向外脱离，不能向内穿人。
  if (offset.dx.abs() < radius &&
      offset.dy.abs() < radius &&
      offset.dx * movement.dx + offset.dy * movement.dy >= 0 &&
      math.max((to.dx - center.dx).abs(), (to.dy - center.dy).abs()) >
          math.max(offset.dx.abs(), offset.dy.abs())) {
    return false;
  }
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
