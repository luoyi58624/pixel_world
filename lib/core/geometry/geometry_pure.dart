import 'dart:math' as math;

/// 无绘制依赖的二维坐标，运算与 Flutter 数值几何保持一致。
class GamePoint {
  /// 创建坐标。
  const GamePoint(this.dx, this.dy);

  /// 原点。
  static const zero = GamePoint(0, 0);

  /// 横纵坐标。
  final double dx, dy;

  /// 向量长度平方。
  double get distanceSquared => dx * dx + dy * dy;

  /// 向量长度。
  double get distance => math.sqrt(distanceSquared);

  /// 是否为有限坐标。
  bool get isFinite => dx.isFinite && dy.isFinite;

  /// 向量相加。
  GamePoint operator +(GamePoint other) =>
      GamePoint(dx + other.dx, dy + other.dy);

  /// 向量相减。
  GamePoint operator -(GamePoint other) =>
      GamePoint(dx - other.dx, dy - other.dy);

  /// 反向向量。
  GamePoint operator -() => GamePoint(-dx, -dy);

  /// 缩放向量。
  GamePoint operator *(double factor) => GamePoint(dx * factor, dy * factor);

  /// 除以比例。
  GamePoint operator /(double factor) => GamePoint(dx / factor, dy / factor);

  /// 以坐标作为左上角创建矩形。
  GameRect operator &(GameSize size) =>
      GameRect.fromLTWH(dx, dy, size.width, size.height);

  /// 平移坐标。
  GamePoint translate(double x, double y) => GamePoint(dx + x, dy + y);

  /// 按轴缩放。
  GamePoint scale(double x, double y) => GamePoint(dx * x, dy * y);
  @override
  bool operator ==(Object other) =>
      other is GamePoint && dx == other.dx && dy == other.dy;
  @override
  int get hashCode => Object.hash(dx, dy);
  @override
  String toString() => 'GamePoint($dx, $dy)';
}

/// 独立于窗口和像素密度的尺寸。
class GameSize {
  /// 创建尺寸。
  const GameSize(this.width, this.height);

  /// 零尺寸。
  static const zero = GameSize(0, 0);

  /// 宽高。
  final double width, height;

  /// 最长边。
  double get longestSide => math.max(width.abs(), height.abs());

  /// 最短边。
  double get shortestSide => math.min(width.abs(), height.abs());

  /// 是否为空。
  bool get isEmpty => width <= 0 || height <= 0;

  /// 是否为有限尺寸。
  bool get isFinite => width.isFinite && height.isFinite;

  /// 相对给定原点的中心。
  GamePoint center(GamePoint origin) =>
      origin + GamePoint(width / 2, height / 2);
  @override
  bool operator ==(Object other) =>
      other is GameSize && width == other.width && height == other.height;
  @override
  int get hashCode => Object.hash(width, height);
}

/// 游戏碰撞和接触区域，右边界与下边界不包含在内部。
class GameRect {
  /// 由边界创建矩形。
  const GameRect.fromLTRB(this.left, this.top, this.right, this.bottom);

  /// 由起点和尺寸创建矩形。
  const GameRect.fromLTWH(double x, double y, double width, double height)
    : left = x,
      top = y,
      right = x + width,
      bottom = y + height;

  /// 包含两点的包围矩形。
  factory GameRect.fromPoints(GamePoint a, GamePoint b) => GameRect.fromLTRB(
    math.min(a.dx, b.dx),
    math.min(a.dy, b.dy),
    math.max(a.dx, b.dx),
    math.max(a.dy, b.dy),
  );

  /// 根据中心和尺寸创建矩形。
  factory GameRect.fromCenter({
    required GamePoint center,
    required double width,
    required double height,
  }) => GameRect.fromLTWH(
    center.dx - width / 2,
    center.dy - height / 2,
    width,
    height,
  );

  /// 矩形四边。
  final double left, top, right, bottom;

  /// 矩形宽度。
  double get width => right - left;

  /// 矩形高度。
  double get height => bottom - top;

  /// 矩形尺寸。
  GameSize get size => GameSize(width, height);

  /// 是否没有正面积。
  bool get isEmpty => width <= 0 || height <= 0;

  /// 最长边。
  double get longestSide => math.max(width.abs(), height.abs());

  /// 左上角。
  GamePoint get topLeft => GamePoint(left, top);

  /// 右上角。
  GamePoint get topRight => GamePoint(right, top);

  /// 左下角。
  GamePoint get bottomLeft => GamePoint(left, bottom);

  /// 右下角。
  GamePoint get bottomRight => GamePoint(right, bottom);

  /// 矩形中心。
  GamePoint get center => GamePoint((left + right) / 2, (top + bottom) / 2);

  /// 上边中心。
  GamePoint get topCenter => GamePoint((left + right) / 2, top);

  /// 下边中心。
  GamePoint get bottomCenter => GamePoint((left + right) / 2, bottom);

  /// 左边中心。
  GamePoint get centerLeft => GamePoint(left, (top + bottom) / 2);

  /// 右边中心。
  GamePoint get centerRight => GamePoint(right, (top + bottom) / 2);

  /// 点是否处于半开矩形内。
  bool contains(GamePoint p) =>
      p.dx >= left && p.dx < right && p.dy >= top && p.dy < bottom;

  /// 是否有非空交集。
  bool overlaps(GameRect r) =>
      left < r.right && right > r.left && top < r.bottom && bottom > r.top;

  /// 扩大边界。
  GameRect inflate(double amount) => GameRect.fromLTRB(
    left - amount,
    top - amount,
    right + amount,
    bottom + amount,
  );

  /// 收缩边界。
  GameRect deflate(double amount) => inflate(-amount);

  /// 返回两个区域的交集。
  GameRect intersect(GameRect other) => GameRect.fromLTRB(
    math.max(left, other.left),
    math.max(top, other.top),
    math.min(right, other.right),
    math.min(bottom, other.bottom),
  );

  /// 平移矩形。
  GameRect shift(GamePoint p) =>
      GameRect.fromLTRB(left + p.dx, top + p.dy, right + p.dx, bottom + p.dy);
  @override
  bool operator ==(Object other) =>
      other is GameRect &&
      left == other.left &&
      top == other.top &&
      right == other.right &&
      bottom == other.bottom;
  @override
  int get hashCode => Object.hash(left, top, right, bottom);
}
