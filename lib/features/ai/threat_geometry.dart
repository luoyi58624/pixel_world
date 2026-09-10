import 'dart:math' as math;

import 'geometry.dart';

/// 规划与执行共用的可见来敌窗口，按真实地形估时，不能把基础速度当实际到达时间。
double? incomingSeconds({
  required AiPoint position,
  required AiPoint velocity,
  required AiPoint center,
  required AiOutline outline,
  required double marchSpeed,
  required double horizon,
  required double Function(AiPoint, AiPoint) travelSeconds,
  bool invaded = false,
}) {
  final distance = position.distance(center);
  if (!invaded && distance > marchSpeed * horizon + 80) return null;
  final speed = math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
  final toward = speed < .01
      ? 0.0
      : ((center.x - position.x) * velocity.x +
                (center.y - position.y) * velocity.y) /
            (math.max(1.0, distance) * speed);
  if (!invaded && distance > 72) {
    if (toward < .45) return null;
    final along = math.max(0.0, distance * toward);
    final projected = position.translated(
      velocity.x / speed * along,
      velocity.y / speed * along,
    );
    if (outline.nearest(projected).distance(projected) > 48) return null;
  }
  final eta = travelSeconds(position, outline.approach(position, center));
  return eta.isFinite && (invaded || eta <= horizon) ? eta : null;
}
