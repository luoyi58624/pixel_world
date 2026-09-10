import 'package:flutter/material.dart';

import '../../../core/geometry/flutter_geometry.dart';
import '../domain/territory.dart';

/// 可关闭的边界辅助图层，路径只在城池归属改变时重建。
class TerritoryOverlay {
  TerritoryOverlay._();
  static final _cache = Expando<TerritoryOverlay>();
  List<TerritoryEdge>? _source;
  Path _path = Path();

  /// 同一地图缓存边界路径；显示开关不会参与任何游戏规则。
  static void draw(
    Canvas canvas,
    TerritoryMap map,
    Map<int, int> owners,
    double scale,
  ) {
    final overlay = _cache[map] ??= TerritoryOverlay._();
    final edges = map.borders(owners);
    if (!identical(overlay._source, edges)) {
      overlay._source = edges;
      overlay._path = Path();
      for (final edge in edges) {
        final from = edge.from.toUi, to = edge.to.toUi;
        overlay._path.moveTo(from.dx, from.dy);
        overlay._path.lineTo(to.dx, to.dy);
      }
    }
    final paint = Paint()
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3 / scale
      ..color = const Color(0xc0080d09);
    canvas.drawPath(overlay._path, paint);
    paint
      ..strokeWidth = 1.3 / scale
      ..color = const Color(0xfff2d78c);
    canvas.drawPath(overlay._path, paint);
  }
}
