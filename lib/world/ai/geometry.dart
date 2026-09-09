import 'dart:math' as math;

/// 可跨工作环境传递的原生地图坐标，不依赖绘图库。
class AiPoint {
  /// 创建坐标。
  const AiPoint(this.x, this.y);

  /// 解码坐标对。
  factory AiPoint.fromJson(List<dynamic> v) =>
      AiPoint((v[0] as num).toDouble(), (v[1] as num).toDouble());

  /// 地图横纵坐标。
  final double x, y;

  /// 序列化为坐标对。
  List<double> toJson() => [x, y];

  /// 两点距离。
  double distance(AiPoint b) =>
      math.sqrt((x - b.x) * (x - b.x) + (y - b.y) * (y - b.y));

  /// 沿线段插值。
  AiPoint lerp(AiPoint b, double t) =>
      AiPoint(x + (b.x - x) * t, y + (b.y - y) * t);

  /// 平移坐标。
  AiPoint translated(double dx, double dy) => AiPoint(x + dx, y + dy);
}

/// 与真实城池接触一致的多边形；只作路线几何计算。
class AiOutline {
  /// 读取世界坐标下的轮廓。
  AiOutline(this.points);

  /// 轮廓顶点。
  final List<AiPoint> points;

  /// 最近边界位置。
  AiPoint nearest(AiPoint p) {
    var best = points.first, distance = double.infinity;
    for (var i = 0; i < points.length; i++) {
      final a = points[i], b = points[(i + 1) % points.length];
      final dx = b.x - a.x, dy = b.y - a.y;
      final t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy);
      final q = a.lerp(b, t.clamp(0.0, 1.0));
      final d = q.distance(p);
      if (d < distance) {
        best = q;
        distance = d;
      }
    }
    return best;
  }

  /// 边界也视为已经接触。
  bool contains(AiPoint p) {
    if (nearest(p).distance(p) < 1e-7) return true;
    var inside = false;
    for (var i = 0; i < points.length; i++) {
      final a = points[i], b = points[(i + 1) % points.length];
      if ((a.y > p.y) != (b.y > p.y) &&
          p.x < (b.x - a.x) * (p.y - a.y) / (b.y - a.y) + a.x) {
        inside = !inside;
      }
    }
    return inside;
  }

  /// 首次进入轮廓的位置；起点已经在城内时不再次触发。
  double? entry(AiPoint a, AiPoint b) {
    if (contains(a)) return null;
    final hits = crossings(a, b);
    return hits.isEmpty ? null : hits.reduce(math.min);
  }

  /// 线段与轮廓交点参数，用于复用真实出城方向。
  List<double> crossings(AiPoint a, AiPoint b) {
    final dx = b.x - a.x, dy = b.y - a.y, result = <double>[];
    for (var i = 0; i < points.length; i++) {
      final p = points[i], q = points[(i + 1) % points.length];
      final ex = q.x - p.x, ey = q.y - p.y, den = dx * ey - dy * ex;
      if (den.abs() < 1e-7) continue;
      final t = ((p.x - a.x) * ey - (p.y - a.y) * ex) / den;
      final u = ((p.x - a.x) * dy - (p.y - a.y) * dx) / den;
      if (t >= -1e-7 && t <= 1 + 1e-7 && u >= -1e-7 && u <= 1 + 1e-7) {
        result.add(t.clamp(0.0, 1.0));
      }
    }
    return result;
  }

  /// 找到进城的实际接触点。
  AiPoint approach(AiPoint from, AiPoint aim) {
    if (contains(from)) return nearest(from);
    final t = entry(from, aim);
    return t == null ? nearest(from) : from.lerp(aim, t);
  }

  /// 沿指令方向从轮廓出发。
  AiPoint departure(AiPoint center, AiPoint target) {
    final distance = center.distance(target);
    final end = distance < 1e-7
        ? center.translated(4096, 0)
        : center.lerp(target, 4096 / distance);
    final hits = crossings(center, end);
    return hits.isEmpty
        ? nearest(target)
        : center.lerp(end, hits.reduce(math.max));
  }
}
