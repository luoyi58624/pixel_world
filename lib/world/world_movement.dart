import 'dart:math' as math;
import 'dart:ui';

import 'world_data.dart';

/// 一次直线行军积分的结果，探索角色与出征部队共用。
typedef MovementResult = ({
  Offset position,
  double distance,
  double remainingTime,
});

/// 叠加地形倍率前的基础行军速度，单位为原生像素每秒。
const double baseMarchSpeed = 22;

/// 将世界坐标限制为地图内的当前格子。
TileCoord cellAt(WorldDefinition world, Offset position) => TileCoord(
  (position.dx / 16).floor().clamp(0, world.width - 1),
  (position.dy / 16).floor().clamp(0, world.height - 1),
);

/// 沿最短直线前进，在地形边界处分段计算速度和剩余时间。
MovementResult advanceToward(
  WorldDefinition world,
  Offset position,
  Offset target,
  double elapsed,
) {
  var remaining = elapsed.isFinite ? math.max(0.0, elapsed) : 0.0;
  var traveled = 0.0;
  while (remaining > 1e-9) {
    final delta = target - position;
    final distance = delta.distance;
    if (distance < 1e-8) {
      position = target;
      break;
    }
    final unit = delta / distance;
    final cell = cellAt(world, position + unit * 1e-7);
    final speed = baseMarchSpeed * world.movementTerrainAt(cell).speedFactor;
    final boundary = math.min(
      _boundaryDistance(position.dx, unit.dx, cell.x),
      _boundaryDistance(position.dy, unit.dy, cell.y),
    );
    final travel = math.min(distance, math.min(boundary, speed * remaining));
    position += unit * travel;
    traveled += travel;
    remaining = math.max(0, remaining - travel / speed);
    if (distance - travel < 1e-8) {
      position = target;
      break;
    }
  }
  return (position: position, distance: traveled, remainingTime: remaining);
}

double _boundaryDistance(double value, double velocity, int cell) {
  if (velocity.abs() < 1e-12) return double.infinity;
  final boundary = (velocity > 0 ? cell + 1 : cell) * 16.0;
  return math.max(1e-8, (boundary - value) / velocity);
}
