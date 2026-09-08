import 'dart:collection';
import 'dart:convert';
import 'dart:ui';

/// 地图中的整数格子坐标，与屏幕缩放无关。
class TileCoord {
  /// 创建一个格子坐标。
  const TileCoord(this.x, this.y);

  /// 从左向右的列号。
  final int x;

  /// 从上向下的行号。
  final int y;

  /// 该格子在原生地图中的中心点。
  Offset get center => Offset(x * 16 + 8, y * 16 + 8);

  @override
  bool operator ==(Object other) =>
      other is TileCoord && x == other.x && y == other.y;

  @override
  int get hashCode => Object.hash(x, y);
}

/// 从 ROM 初始化记录中提取的城池，未知数值不参与玩法。
class CityDefinition {
  /// 从独立地图文件读取一条城池记录。
  CityDefinition.fromJson(Map<String, dynamic> json)
    : id = json['id'] as int,
      x = json['x'] as int,
      y = json['y'] as int,
      width = json['width'] as int,
      height = json['height'] as int,
      shape = List<int>.unmodifiable((json['shape'] as List).cast<int>()),
      unitIds = List<int>.unmodifiable((json['unitIds'] as List).cast<int>());

  /// 当前地图内的城池编号。
  final int id;

  /// 城池左上角所在的列。
  final int x;

  /// 城池左上角所在的行。
  final int y;

  /// 建筑占用的格子宽度。
  final int width;

  /// 建筑占用的格子高度。
  final int height;

  /// 按行排列的建筑组合图块。
  final List<int> shape;

  /// 初始化数据中关联的单位编号。
  final List<int> unitIds;

  /// 用于本原型的显示名称，不冒充原作城名。
  String get label => id == 0 ? '初始据点' : '城池 ${id.toString().padLeft(2, '0')}';

  /// 建筑在原生地图上的占用范围。
  Rect get bounds => Rect.fromLTWH(x * 16, y * 16, width * 16, height * 16);

  /// 建筑下方的行军目的地。
  TileCoord get entrance => TileCoord(x, y + height);
}

/// 地形与城池的静态定义，渲染缓存不作为地图事实来源。
class WorldDefinition {
  /// 读取一个经过校验的地图定义。
  WorldDefinition.fromJson(Map<String, dynamic> json, this.paletteIds)
    : id = json['id'] as int,
      width = json['width'] as int,
      height = json['height'] as int,
      terrain = List<int>.unmodifiable((json['tiles'] as List).cast<int>()),
      cities = List<CityDefinition>.unmodifiable(
        (json['cities'] as List).map(
          (item) => CityDefinition.fromJson(item as Map<String, dynamic>),
        ),
      ) {
    if (terrain.length != width * height ||
        terrain.any((tile) => tile < 0 || tile >= paletteIds.length)) {
      throw const FormatException('地图尺寸或图块编号无效');
    }
    final result = List<int>.of(terrain);
    for (final city in cities) {
      if (city.shape.length != city.width * city.height ||
          city.x < 0 ||
          city.y < 0 ||
          city.x + city.width > width ||
          city.y + city.height > height) {
        throw const FormatException('城池建筑超出地图边界');
      }
      for (var n = 0; n < city.shape.length; n++) {
        result[(city.y + n ~/ city.width) * width + city.x + n % city.width] =
            city.shape[n];
      }
    }
    displayTiles = List<int>.unmodifiable(result);
  }

  /// 地图索引。
  final int id;

  /// 地图的列数。
  final int width;

  /// 地图的行数。
  final int height;

  /// 未叠加城堡的基础地形编号。
  final List<int> terrain;

  /// 本地图的城池配置。
  final List<CityDefinition> cities;

  /// 各组合图块使用的调色板分组。
  final List<int> paletteIds;

  /// 叠加建筑模板后的可见图块。
  late final List<int> displayTiles;

  /// 原生地图的像素尺寸。
  Size get pixelSize => Size(width * 16, height * 16);

  /// 判断坐标是否位于地图内。
  bool contains(TileCoord cell) =>
      cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height;

  /// 演示通行规则：阻挡水域和山地，城池及其他地形可通过。
  bool isWalkable(TileCoord cell) {
    if (!contains(cell)) return false;
    final palette = paletteIds[displayTiles[cell.y * width + cell.x]];
    return palette != 1 && palette != 2;
  }

  /// 返回某个位置上的城池。
  CityDefinition? cityAt(Offset point) {
    for (final city in cities) {
      if (city.bounds.contains(point)) return city;
    }
    return null;
  }

  /// 在目标附近寻找可落脚的格子，用于出生点和城门位置。
  TileCoord nearestWalkable(TileCoord target) {
    for (var radius = 0; radius < width + height; radius++) {
      for (var y = target.y - radius; y <= target.y + radius; y++) {
        for (var x = target.x - radius; x <= target.x + radius; x++) {
          final candidate = TileCoord(x, y);
          if ((x - target.x).abs() + (y - target.y).abs() == radius &&
              isWalkable(candidate)) {
            return candidate;
          }
        }
      }
    }
    throw StateError('地图中没有可通行区域');
  }
}

/// 从独立资源解析地图包，运行游戏时无需加载 ROM。
List<WorldDefinition> decodeWorlds(String source) {
  final json = jsonDecode(source) as Map<String, dynamic>;
  final palettes = List<int>.unmodifiable(
    (json['paletteIds'] as List).cast<int>(),
  );
  return List<WorldDefinition>.unmodifiable(
    (json['worlds'] as List).map(
      (item) =>
          WorldDefinition.fromJson(item as Map<String, dynamic>, palettes),
    ),
  );
}

/// 使用四方向广度优先搜索，返回包含起点和终点的最短可行路线。
List<TileCoord>? findRoute(
  WorldDefinition world,
  TileCoord start,
  TileCoord end,
) {
  if (!world.isWalkable(start) || !world.isWalkable(end)) return null;
  final queue = Queue<TileCoord>()..add(start);
  final previous = <TileCoord, TileCoord?>{start: null};
  while (queue.isNotEmpty) {
    final cell = queue.removeFirst();
    if (cell == end) {
      final result = <TileCoord>[];
      TileCoord? step = end;
      while (step != null) {
        result.add(step);
        step = previous[step];
      }
      return result.reversed.toList(growable: false);
    }
    for (final next in [
      TileCoord(cell.x + 1, cell.y),
      TileCoord(cell.x - 1, cell.y),
      TileCoord(cell.x, cell.y + 1),
      TileCoord(cell.x, cell.y - 1),
    ]) {
      if (world.isWalkable(next) && !previous.containsKey(next)) {
        previous[next] = cell;
        queue.add(next);
      }
    }
  }
  return null;
}
