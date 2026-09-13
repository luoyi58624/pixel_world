import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/siege_rings.dart';
import 'package:pixel_world/features/cities/domain/city_appearance.dart';

void main() {
  test('二乘三建筑第一圈紧贴格子，第二圈只向外扩一格', () {
    final grid = SiegeRings(2, 3);
    expect(grid.slots(0), 14);
    expect(grid.slots(1), 22);
    final inner = [for (var i = 0; i < grid.slots(0); i++) grid.offset(0, i)];
    expect(inner.toSet().length, 14);
    expect(inner.map((p) => p.x).toSet(), {-24.0, -8.0, 8.0, 24.0});
    expect(inner.map((p) => p.y).toSet(), {-32.0, -16.0, 0.0, 16.0, 32.0});
  });

  test('全部五种原版建筑按非空图块排队，每格一人且第一圈与建筑格相邻', () {
    for (final appearance in cityAppearances.values) {
      final grid = SiegeRings(
        appearance.width,
        appearance.height,
        tiles: appearance.tiles,
      );
      final occupied = [
        for (var y = 0; y < appearance.height; y++)
          for (var x = 0; x < appearance.width; x++)
            if (appearance.tiles[y * appearance.width + x] != 0) (x: x, y: y),
      ];
      final seen = <(int, int)>{};
      for (var ring = 0; ring < 3; ring++) {
        for (var i = 0; i < grid.slots(ring); i++) {
          final p = grid.offset(ring, i);
          final x = p.x / 16 + appearance.width / 2 - .5;
          final y = p.y / 16 + appearance.height / 2 - .5;
          expect(x, x.roundToDouble());
          expect(y, y.roundToDouble());
          expect(seen.add((x.toInt(), y.toInt())), isTrue);
          final distance = occupied
              .map((c) => math.max((x - c.x).abs(), (y - c.y).abs()))
              .reduce(math.min);
          expect(distance, ring + 1, reason: '英雄必须站在对应相邻格，不能重新变成远处圆环');
        }
      }
    }
  });
}
