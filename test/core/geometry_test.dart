import 'dart:ui' as ui;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:pixel_world/core/geometry/flutter_geometry.dart';

void main() {
  test('数据几何与 Flutter 在城池边界、相交及视口转换上结果一致', () {
    for (final x in [-24.0, 0.0, 0.25, 100.0]) {
      final r = GameRect.fromLTWH(x, 5, 32, 48),
          u = ui.Rect.fromLTWH(x, 5, 32, 48);
      expect(r.toUi, u);
      expect(u.toGame, r);
      for (final p in [
        GamePoint(x, 5),
        GamePoint(x + 32, 5),
        GamePoint(x + 16, 53),
        GamePoint(x + 16, 25),
      ]) {
        expect(r.contains(p), u.contains(p.toUi));
        expect(p.toUi.toGame, p);
      }
      final b = GameRect.fromLTWH(x + 20, 20, 10, 60);
      expect(r.intersect(b).toUi, u.intersect(b.toUi));
      expect(r.inflate(8).toUi, u.inflate(8));
      expect(r.size.center(GamePoint.zero).toUi, u.size.center(ui.Offset.zero));
    }
  });
}
