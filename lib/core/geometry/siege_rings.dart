import 'dart:math' as math;

/// 沿建筑占用格逐层外扩的围城站位，规划器与实际行军共用。
class SiegeRings {
  /// 图块为零的空白不占建筑格；未提供图块时按完整矩形建筑处理。
  SiegeRings(this.columns, this.rows, {List<int>? tiles})
    : occupied = List.unmodifiable([
        for (var y = 0; y < rows; y++)
          for (var x = 0; x < columns; x++)
            if (tiles == null || tiles[y * columns + x] != 0) (x: x, y: y),
      ]);

  /// 建筑与英雄共用的原版图块边长，不额外增加圈间距离。
  static const cellSize = 16.0;

  /// 当前建筑图块的列数与行数。
  final int columns, rows;

  /// 相对建筑左上角的实际占用格。
  final List<({int x, int y})> occupied;
  final _rings = <int, List<({int x, int y})>>{};

  List<({int x, int y})> _cells(int ring) => _rings.putIfAbsent(ring, () {
    final distance = ring + 1;
    return [
      for (var y = -distance; y < rows + distance; y++)
        for (var x = -distance; x < columns + distance; x++)
          if (occupied.isNotEmpty &&
              occupied
                      .map((p) => math.max((x - p.x).abs(), (y - p.y).abs()))
                      .reduce(math.min) ==
                  distance)
            (x: x, y: y),
    ];
  });

  /// 每圈包含的相邻空格数量，第一圈从零开始。
  int slots(int ring) => _cells(ring).length;

  /// 固定格子编号对应的人物中心偏移，人物边缘与相邻格恰好相接。
  ({double x, double y}) offset(int ring, int slot) {
    final cell = _cells(ring)[slot];
    return (
      x: (cell.x + .5 - columns / 2) * cellSize,
      y: (cell.y + .5 - rows / 2) * cellSize,
    );
  }

  /// 仅用于发现抵达部队的范围，实际站位始终来自格子而不是圆周。
  double radius(int ring) {
    final x = (columns / 2 + ring + .5) * cellSize;
    final y = (rows / 2 + ring + .5) * cellSize;
    return math.sqrt(x * x + y * y);
  }
}
