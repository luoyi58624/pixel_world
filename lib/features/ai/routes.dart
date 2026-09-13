import 'dart:math' as math;

import 'geometry.dart';
import 'observation.dart';
import 'rules_data.dart';
import 'work_budget.dart';

/// 有界路线结果；拒绝把穿过敌城或危险部队的路线算成平安抵达。
class AiRoute {
  /// 路段及预计时间。
  const AiRoute(
    this.points,
    this.seconds, {
    this.risky = false,
    this.complete = true,
  });

  /// 只能通过真实移动指令执行的分段终点。
  final List<AiPoint> points;

  /// 地形积分秒数。
  final double seconds;

  /// 已知接触危险或预算不完整。
  final bool risky, complete;
}

/// 共用静态地图并按真实地形边界积分，结果缓存不含战斗预测。
class AiRoutes {
  /// 绑定地图、规则及工作配额。
  AiRoutes(this.map, this.rules, this.work);

  /// 只读输入。
  final AiMap map;
  final AiRules rules;
  final AiWorkBudget work;
  final _cache = <String, double>{};

  /// 与真实直线行军相同的逐地形边界积分；预算耗尽返回无穷表示不可承诺。
  double seconds(AiPoint from, AiPoint to) {
    final key = '${from.x},${from.y}:${to.x},${to.y}';
    if (_cache.containsKey(key)) return _cache[key]!;
    var p = from, total = 0.0;
    for (var step = 0; step < map.width + map.height + 8; step++) {
      final distance = p.distance(to);
      if (distance < 1e-7) {
        if (_cache.length >= 256) _cache.remove(_cache.keys.first);
        return _cache[key] = total;
      }
      if (!work.routeStep()) return double.infinity;
      final dx = (to.x - p.x) / distance, dy = (to.y - p.y) / distance;
      final x = ((p.x + dx * 1e-7) / 16).floor().clamp(0, map.width - 1),
          y = ((p.y + dy * 1e-7) / 16).floor().clamp(0, map.height - 1);
      double edge(double v, double d, int cell) => d.abs() < 1e-12
          ? double.infinity
          : math.max(1e-8, ((d > 0 ? cell + 1 : cell) * 16 - v) / d);
      final travel = math.min(
        distance,
        math.min(edge(p.x, dx, x), edge(p.y, dy, y)),
      );
      total +=
          travel /
          (rules.number('marchSpeed') *
              rules.movementFactors[map.terrain[y * map.width + x]]);
      p = p.translated(dx * travel, dy * travel);
    }
    return double.infinity;
  }

  /// 在直达与有限绕行候选中选路，绝不把行军路径穿城当成安全捷径。
  AiRoute to(
    AiHero hero,
    AiPoint aim,
    AiObservation view, {
    AiCity? target,
    AiCity? stagingTarget,
    bool safe = false,
  }) {
    final home = view.city(hero.city);
    final from = hero.stationed && home != null
        ? home.outline.departure(home.center, aim)
        : hero.position;
    final end = target == null ? aim : target.outline.approach(from, aim);
    if (!map.contains(end)) {
      return const AiRoute([], double.infinity, complete: false);
    }
    bool blocked(AiPoint a, AiPoint b) => view.cities.any((c) {
      if (c.country == hero.country || c.id == target?.id) return false;
      final entry = c.outline.entry(a, b);
      // 集结终点可以恰好贴到目标墙面，途中穿城仍然禁止。
      return entry != null &&
          !(c.id == stagingTarget?.id &&
              b.distance(end) < 1e-7 &&
              entry >= 1 - 1e-7);
    });
    bool threatened(AiPoint a, AiPoint b) => view.heroes.any((h) {
      if (h.country == hero.country || h.stationed || h.marked || h.hp <= 0) {
        return false;
      }
      final dx = b.x - a.x, dy = b.y - a.y, len = dx * dx + dy * dy;
      final t = len == 0
          ? 0.0
          : (((h.position.x - a.x) * dx + (h.position.y - a.y) * dy) / len)
                .clamp(0.0, 1.0);
      return a.lerp(b, t).distance(h.position) <
          rules.number('encounterDistance') + 12;
    });
    final candidates = <List<AiPoint>>[
      [end],
    ];
    if (blocked(from, end) || (safe && threatened(from, end))) {
      // 少量横向绕点保留短路径，仍逐段验证实际敌城接触。
      final distance = from.distance(end),
          mx = (from.x + end.x) / 2,
          my = (from.y + end.y) / 2;
      if (distance > 0) {
        for (final offset in [-96.0, 96.0, -192.0, 192.0]) {
          final bend = AiPoint(
            mx - (end.y - from.y) / distance * offset,
            my + (end.x - from.x) / distance * offset,
          );
          if (map.contains(bend)) candidates.add([bend, end]);
        }
      }
    }
    AiRoute? best;
    for (final route in candidates) {
      var a = from, total = 0.0, risk = false, valid = true;
      for (final b in route) {
        if (blocked(a, b)) {
          valid = false;
          break;
        }
        risk = risk || threatened(a, b);
        total += seconds(a, b);
        a = b;
      }
      if (!valid || !total.isFinite || (safe && risk)) continue;
      if (best == null || total < best.seconds) {
        best = AiRoute(route, total, risky: risk);
      }
    }
    return best ??
        const AiRoute([], double.infinity, complete: false, risky: true);
  }
}
