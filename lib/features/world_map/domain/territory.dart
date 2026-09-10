import 'dart:typed_data';

import '../../../core/geometry/geometry.dart';
import 'world_data.dart';

/// 两国之间的一段地图网格边界。
typedef TerritoryEdge = ({GamePoint from, GamePoint to, int country});
typedef _Front = ({double cost, int city, int tile});

/// 从各城向外按地形扩展的固定辖区；易主只改变归属，不重新生成地理边界。
class TerritoryMap {
  TerritoryMap._(this.world)
    : _regions = Int32List(world.width * world.height) {
    _regions.fillRange(0, _regions.length, -1);
    final distance = Float64List(_regions.length)
      ..fillRange(0, _regions.length, double.infinity);
    final queue = _TerritoryQueue();
    for (final city in world.cities) {
      final x = (city.x + city.width ~/ 2).clamp(0, world.width - 1);
      final y = (city.y + city.height ~/ 2).clamp(0, world.height - 1);
      final tile = y * world.width + x;
      if (distance[tile] == 0 && _regions[tile] < city.id) continue;
      distance[tile] = 0;
      _regions[tile] = city.id;
      queue.add((cost: 0, city: city.id, tile: tile));
    }
    final costs = [
      for (var i = 0; i < _regions.length; i++)
        1 /
            world
                .movementTerrainAt(TileCoord(i % world.width, i ~/ world.width))
                .speedFactor,
    ];
    while (queue.isNotEmpty) {
      final node = queue.remove();
      if (node.cost != distance[node.tile] ||
          node.city != _regions[node.tile]) {
        continue;
      }
      final x = node.tile % world.width, y = node.tile ~/ world.width;
      for (var dy = -1; dy <= 1; dy++) {
        for (var dx = -1; dx <= 1; dx++) {
          if (dx == 0 && dy == 0) continue;
          final nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= world.width || ny >= world.height) {
            continue;
          }
          final next = ny * world.width + nx;
          final cost =
              node.cost +
              (costs[node.tile] + costs[next]) *
                  .5 *
                  (dx != 0 && dy != 0 ? 1.4142135623730951 : 1);
          if (cost > distance[next] + 1e-9 ||
              (cost - distance[next]).abs() < 1e-9 &&
                  node.city >= _regions[next]) {
            continue;
          }
          distance[next] = cost;
          _regions[next] = node.city;
          queue.add((cost: cost, city: node.city, tile: next));
        }
      }
    }
  }

  /// 同一静态地图只划分一次，不随显示开关、镜头或游戏倍率反复计算。
  factory TerritoryMap(WorldDefinition world) =>
      _cache[world] ??= TerritoryMap._(world);
  static final _cache = Expando<TerritoryMap>();

  /// 这份辖区依附的静态地图。
  final WorldDefinition world;
  final Int32List _regions;
  String _edgeKey = '';
  List<TerritoryEdge> _edges = const [];

  /// 常数时间查询位置所属城池辖区，地图外返回空。
  int? regionAt(GamePoint point) {
    final x = (point.dx / 16).floor(), y = (point.dy / 16).floor();
    if (x < 0 || y < 0 || x >= world.width || y >= world.height) return null;
    final id = _regions[y * world.width + x];
    return id < 0 ? null : id;
  }

  /// 根据当前城主合并国土；同国城池之间不画内部辖区线。
  List<TerritoryEdge> borders(Map<int, int> owners) {
    final key = world.cities.map((c) => '${c.id}:${owners[c.id]}').join(',');
    if (_edgeKey == key) return _edges;
    final result = <TerritoryEdge>[];
    for (var y = 0; y < world.height; y++) {
      for (var x = 0; x < world.width; x++) {
        final index = y * world.width + x;
        final country = owners[_regions[index]] ?? -1;
        if (x > 0 && country != owners[_regions[index - 1]]) {
          result.add((
            from: GamePoint(x * 16.0, y * 16.0),
            to: GamePoint(x * 16.0, (y + 1) * 16.0),
            country: country,
          ));
        }
        if (y > 0 && country != owners[_regions[index - world.width]]) {
          result.add((
            from: GamePoint(x * 16.0, y * 16.0),
            to: GamePoint((x + 1) * 16.0, y * 16.0),
            country: country,
          ));
        }
      }
    }
    _edgeKey = key;
    return _edges = List.unmodifiable(result);
  }
}

class _TerritoryQueue {
  final _nodes = <_Front>[];
  bool get isNotEmpty => _nodes.isNotEmpty;
  bool _before(_Front a, _Front b) =>
      a.cost == b.cost ? a.city < b.city : a.cost < b.cost;
  void add(_Front value) {
    var index = _nodes.length;
    _nodes.add(value);
    while (index > 0) {
      final parent = (index - 1) ~/ 2;
      if (!_before(value, _nodes[parent])) break;
      _nodes[index] = _nodes[parent];
      index = parent;
    }
    _nodes[index] = value;
  }

  _Front remove() {
    final first = _nodes.first, last = _nodes.removeLast();
    if (_nodes.isEmpty) return first;
    var index = 0;
    while (index * 2 + 1 < _nodes.length) {
      var child = index * 2 + 1;
      if (child + 1 < _nodes.length &&
          _before(_nodes[child + 1], _nodes[child])) {
        child++;
      }
      if (!_before(_nodes[child], last)) break;
      _nodes[index] = _nodes[child];
      index = child;
    }
    _nodes[index] = last;
    return first;
  }
}
