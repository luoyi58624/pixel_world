import 'dart:math' as math;
import 'dart:ui';

import 'world_camera.dart';
import 'world_data.dart';

/// 国旗在城堡上方的屏幕区域，缩小地图时保留可辨认的尺寸，绘制和点击共用。
Rect cityFlagRect(WorldCamera camera, CityDefinition city) {
  final side = math.max(12.0, 8 * camera.scale);
  final anchor = camera.toScreen(city.bounds.topCenter);
  return Rect.fromLTWH(anchor.dx - side / 2, anchor.dy - side - 3, side, side);
}
