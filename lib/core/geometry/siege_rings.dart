import 'dart:math' as math;

/// 围城固定圆环的纯数值布局，规划器与实际行军共用同一套站位。
class SiegeRings {
  /// 用真实城堡轮廓距中心的最大半径留出城墙外侧通路。
  const SiegeRings(this.cityRadius);

  /// 城堡轮廓的外接半径。
  final double cityRadius;

  /// 从零开始的圆环半径，环间留出人物通行间距。
  double radius(int ring) => cityRadius + 28 + ring * 40;

  /// 每圈随周长增加站位，约四十像素间距保证接战者能通过自家队列。
  int slots(int ring) => math.max(8, (2 * math.pi * radius(ring) / 40).floor());

  /// 固定从正东方向起算的站位偏移，不随将领来向旋转。
  ({double x, double y}) offset(int ring, int slot) {
    final angle = 2 * math.pi * slot / slots(ring);
    return (
      x: math.cos(angle) * radius(ring),
      y: math.sin(angle) * radius(ring),
    );
  }
}
