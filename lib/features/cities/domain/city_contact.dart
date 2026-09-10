import 'dart:math' as math;

import '../../../core/geometry/geometry.dart';

import 'city_appearance.dart';
import '../data/nes_city_contacts.dart';

/// 城堡实体扩张一个人物半径后的轮廓，出城、进城和途经拦截共用。
class CityContact {
  CityContact._(this._outline) {
    bounds = GameRect.fromLTRB(
      _outline.map((p) => p.dx).reduce(math.min),
      _outline.map((p) => p.dy).reduce(math.min),
      _outline.map((p) => p.dx).reduce(math.max),
      _outline.map((p) => p.dy).reduce(math.max),
    );
  }

  /// 每种外观仅构建一次；自定义建筑仍使用其声明的实体范围。
  factory CityContact.forAppearance(CityAppearance appearance) =>
      _cache.putIfAbsent(appearance, () {
        for (final entry in cityAppearances.entries) {
          if (identical(appearance, entry.value)) {
            return CityContact._(nesCityContactOutlines[entry.key]!);
          }
        }
        final right = appearance.width * 16.0 + 8;
        final bottom = appearance.height * 16.0 + 8;
        return CityContact._([
          const GamePoint(-8, -8),
          GamePoint(right, -8),
          GamePoint(right, bottom),
          GamePoint(-8, bottom),
        ]);
      });

  static final _cache = <CityAppearance, CityContact>{};
  static const _epsilon = 1e-7;
  final List<GamePoint> _outline;

  /// 接触轮廓外框，用于快速排除远处线段，不代替实体接触判定。
  late final GameRect bounds;

  /// 提供只读轮廓，供后台路线估时复用真实接触几何。
  List<GamePoint> get outline => List.unmodifiable(_outline);

  /// 判断人物中心是否已进入实体接触区域，轮廓边界也算接触。
  bool contains(GamePoint point) {
    if (!bounds.inflate(_epsilon).contains(point)) return false;
    if ((nearest(point) - point).distanceSquared < _epsilon * _epsilon) {
      return true;
    }
    var inside = false;
    for (var i = 0; i < _outline.length; i++) {
      final a = _outline[i], b = _outline[(i + 1) % _outline.length];
      if ((a.dy > point.dy) != (b.dy > point.dy) &&
          point.dx < (b.dx - a.dx) * (point.dy - a.dy) / (b.dy - a.dy) + a.dx) {
        inside = !inside;
      }
    }
    return inside;
  }

  /// 将人物投影到最近的真实墙体接触位置，跳过图块中的草地和旗杆。
  GamePoint nearest(GamePoint point) {
    var best = _outline.first;
    var distance = double.infinity;
    for (var i = 0; i < _outline.length; i++) {
      final a = _outline[i], b = _outline[(i + 1) % _outline.length];
      final edge = b - a;
      final t =
          (((point.dx - a.dx) * edge.dx + (point.dy - a.dy) * edge.dy) /
                  edge.distanceSquared)
              .clamp(0.0, 1.0);
      final candidate = a + edge * t;
      final next = (point - candidate).distanceSquared;
      if (next < distance) {
        distance = next;
        best = candidate;
      }
    }
    return best;
  }

  /// 沿目标方向出城，不使用固定门口或图块外框上的空白点。
  GamePoint departure(GamePoint center, GamePoint toward) {
    var direction = toward - center;
    if (direction.distanceSquared < _epsilon) direction = const GamePoint(1, 0);
    final end =
        center + direction / direction.distance * (bounds.longestSide * 4);
    final crossings = _crossings(center, end);
    if (crossings.isEmpty) return nearest(toward);
    return center + (end - center) * crossings.reduce(math.max);
  }

  /// 沿指令直线找到首次贴城位置，点击空白角时改为最近的有效墙体。
  GamePoint approach(GamePoint from, GamePoint aim) {
    if (contains(from)) return nearest(from);
    final t = entryFraction(from, aim);
    return t == null ? nearest(from) : from + (aim - from) * t;
  }

  /// 只拦截从城外进入的移动线段，已经贴城的部队仍能向外撤离。
  double? entryFraction(GamePoint from, GamePoint to) {
    if (!GameRect.fromPoints(from, to).inflate(_epsilon).overlaps(bounds) ||
        contains(from)) {
      return null;
    }
    final crossings = _crossings(from, to);
    return crossings.isEmpty ? null : crossings.reduce(math.min);
  }

  List<double> _crossings(GamePoint from, GamePoint to) {
    final delta = to - from;
    final result = <double>[];
    for (var i = 0; i < _outline.length; i++) {
      final a = _outline[i], edge = _outline[(i + 1) % _outline.length] - a;
      final denominator = _cross(delta, edge);
      if (denominator.abs() < _epsilon) continue;
      final t = _cross(a - from, edge) / denominator;
      final u = _cross(a - from, delta) / denominator;
      if (t >= -_epsilon &&
          t <= 1 + _epsilon &&
          u >= -_epsilon &&
          u <= 1 + _epsilon) {
        result.add(t.clamp(0.0, 1.0));
      }
    }
    return result;
  }

  double _cross(GamePoint a, GamePoint b) => a.dx * b.dy - a.dy * b.dx;
}
