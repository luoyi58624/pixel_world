import 'dart:convert';
import 'dart:ui';

import 'city_appearance.dart';
import '../game_config.dart';

/// 行军地形只改变速度，地图内的格子均可通行。
enum MovementTerrain {
  /// 草地、树林和土路使用基础速度的四分之三。
  plain('平地', GameConfig.grassSpeedFactor),

  /// 涉水时使用基础速度的四成。
  water('涉水', GameConfig.waterSpeedFactor),

  /// 翻越山地时使用基础速度的两成。
  mountain('山地', GameConfig.mountainSpeedFactor),

  /// 桥梁和城堡图块保持基础速度。
  structure('桥梁/建筑', 1);

  const MovementTerrain(this.label, this.speedFactor);

  /// 用于行军状态显示的名称。
  final String label;

  /// 相对于基础行军速度的地形倍率。
  final double speedFactor;
}

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

/// 从 ROM 名称表和旗帜索引中提取的国家定义。
class CountryDefinition {
  /// 从城名、国旗目录读取国家标识。
  CountryDefinition.fromJson(Map<String, dynamic> json)
    : id = json['id'] as int,
      name = json['name'] as String,
      flagIndex = json['flagIndex'] as int;

  /// 原版国家编号，也是旗帜选择索引。
  final int id;

  /// 原版汉化国名。
  final String name;

  /// 8×8 国旗图集中的帧号。
  final int flagIndex;
}

/// 从 ROM 初始化记录和城名表提取的静态城池。
class CityDefinition {
  /// 从独立地图文件读取一条城池记录。
  CityDefinition.fromJson(Map<String, dynamic> json)
    : id = json['id'] as int,
      name = json['name'] as String? ?? '未命名城池',
      initialOwnerId = json['initialOwnerId'] as int? ?? json['id'] as int,
      initialLevel = _readInitialCityLevel(json),
      x = json['x'] as int,
      y = json['y'] as int,
      width = json['width'] as int,
      height = json['height'] as int,
      shape = List<int>.unmodifiable((json['shape'] as List).cast<int>()),
      unitIds = List<int>.unmodifiable((json['unitIds'] as List).cast<int>()) {
    _initialAppearance = CityAppearance(width, height, shape);
    final original = cityAppearances[initialLevel]!;
    _usesLevelAppearance =
        original.width == width &&
        original.height == height &&
        original.tiles.length == shape.length &&
        List.generate(
          shape.length,
          (i) => shape[i] == original.tiles[i],
        ).every((same) => same);
  }

  late final CityAppearance _initialAppearance;
  late final bool _usesLevelAppearance;

  /// 原版城池随等级切换模板，手工定义的特殊建筑保留其自定义形状。
  CityAppearance appearanceAt(int level) {
    if (!cityAppearances.containsKey(level)) {
      throw RangeError.range(level, 1, 5, 'level');
    }
    return _usesLevelAppearance ? cityAppearances[level]! : _initialAppearance;
  }

  /// 当前地图内的城池编号。
  final int id;

  /// 城池的固定汉化名称，占领后不改名。
  final String name;

  /// 开局时占有城池的国家编号。
  final int initialOwnerId;

  /// 原版初始化记录中的等级，与初始建筑样式使用同一来源。
  final int initialLevel;

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

  /// 对用户显示真实城名，编号仅用于内部关联。
  String get label => name;

  /// 建筑在原生地图上的占用范围。
  Rect get bounds => Rect.fromLTWH(x * 16, y * 16, width * 16, height * 16);

  /// 建筑下方的行军目的地。
  TileCoord get entrance => TileCoord(x, y + height);
}

int _readInitialCityLevel(Map<String, dynamic> json) {
  // 兼容已有的只含原始记录的数据，手写测试地图可以省略等级。
  final value =
      json['initialLevel'] ?? (json['sourceRecord'] as List?)?.firstOrNull ?? 1;
  if (value is! int || value < 1 || value > 5) {
    throw const FormatException('城池初始等级必须为 1 到 5');
  }
  return value;
}

/// 地形与城池的静态定义，渲染缓存不作为地图事实来源。
class WorldDefinition {
  /// 读取一个经过校验的地图定义。
  WorldDefinition.fromJson(
    Map<String, dynamic> json,
    this.paletteIds, {
    this.countries = const [],
  }) : id = json['id'] as int,
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

  /// 城名与国旗目录，由三张地图共享静态定义。
  final List<CountryDefinition> countries;

  /// 查询当前占领国家的名称；简化测试地图可只提供城名。
  String countryName(int ownerId) =>
      countries.where((country) => country.id == ownerId).firstOrNull?.name ??
      cities.where((city) => city.id == ownerId).firstOrNull?.name ??
      '未知国家';

  /// 各组合图块使用的调色板分组。
  final List<int> paletteIds;

  /// 叠加建筑模板后的可见图块。
  late final List<int> displayTiles;

  /// 原生地图的像素尺寸。
  Size get pixelSize => Size(width * 16, height * 16);

  /// 判断坐标是否位于地图内。
  bool contains(TileCoord cell) =>
      cell.x >= 0 && cell.y >= 0 && cell.x < width && cell.y < height;

  /// 地图内均可通行，山地和水域由速度规则处理。
  bool isWalkable(TileCoord cell) => contains(cell);

  /// 查询所在格子的行军地形，叠加后的桥梁和建筑按平地处理。
  MovementTerrain movementTerrainAt(TileCoord cell) {
    if (!contains(cell)) throw RangeError('行军位置超出地图');
    return switch (paletteIds[displayTiles[cell.y * width + cell.x]]) {
      1 => MovementTerrain.water,
      2 => MovementTerrain.mountain,
      3 => MovementTerrain.structure,
      _ => MovementTerrain.plain,
    };
  }

  /// 返回某个位置上的城池。
  CityDefinition? cityAt(Offset point) {
    for (final city in cities) {
      if (city.bounds.contains(point)) return city;
    }
    return null;
  }

  /// 将出生点或城门位置限制在地图内。
  TileCoord nearestWalkable(TileCoord target) =>
      TileCoord(target.x.clamp(0, width - 1), target.y.clamp(0, height - 1));
}

/// 从独立资源解析地图包，运行游戏时无需加载 ROM。
List<WorldDefinition> decodeWorlds(String source) {
  final json = jsonDecode(source) as Map<String, dynamic>;
  final palettes = List<int>.unmodifiable(
    (json['paletteIds'] as List).cast<int>(),
  );
  final countries = List<CountryDefinition>.unmodifiable(
    ((json['countries'] as List?) ?? []).map(
      (item) => CountryDefinition.fromJson(item as Map<String, dynamic>),
    ),
  );
  return List<WorldDefinition>.unmodifiable(
    (json['worlds'] as List).map(
      (item) => WorldDefinition.fromJson(
        item as Map<String, dynamic>,
        palettes,
        countries: countries,
      ),
    ),
  );
}

/// 返回几何距离最短的直线路线，途中地形影响速度而不改变路线。
List<TileCoord>? findRoute(
  WorldDefinition world,
  TileCoord start,
  TileCoord end,
) {
  if (!world.isWalkable(start) || !world.isWalkable(end)) return null;
  return start == end ? [start] : [start, end];
}
