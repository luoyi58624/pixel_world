import 'dart:convert';

import '../../../core/config/game_config.dart';

/// 单座城池的开局经济与兵员配置，名称仅在 JSON 中用作阅读提示。
class CitySetup {
  const CitySetup._({required this.baseIncome, required this.initialLevel});

  /// 城市固定月产出，正式地图统一为十金币，升级不增加。
  final int baseIncome;

  /// 开局等级，影响建筑外观、储备容量和守城加成。
  final int initialLevel;
}

/// 独立于 ROM 地形数据的玩法配置，解析后不可变。
class CampaignSetup {
  const CampaignSetup._(this.countries, this.cities, this._worldIds);

  /// 未附带玩法配置的简化地图使用规则默认值。
  static const empty = CampaignSetup._({}, {}, {});

  /// 各国的初始国库，多座城共用国家国库。
  final Map<int, CountryConfig> countries;

  /// 使用地图编号与城池编号共同定位，避免三张地图串用等级。
  final Map<(int, int), CitySetup> cities;
  final Set<int> _worldIds;

  /// 读取并校验完整 JSON，报错包含具体配置位置。
  factory CampaignSetup.decode(String source) {
    final root = _object(jsonDecode(source), 'campaign_config');
    _keys(root, {
      'version',
      'description',
      'countries',
      'worlds',
    }, 'campaign_config');
    _integer(root, 'version', 'campaign_config', min: 1, max: 1);
    final countries = <int, CountryConfig>{};
    final cities = <(int, int), CitySetup>{};
    final worldIds = <int>{};
    final countryRows = _list(root['countries'], 'countries');
    for (var i = 0; i < countryRows.length; i++) {
      final path = 'countries[$i]';
      final row = _object(countryRows[i], path);
      _keys(row, {'id', 'name', 'initialGold'}, path);
      final id = _integer(row, 'id', path, max: 15);
      if (countries.containsKey(id)) throw FormatException('$path：国家编号 $id 重复');
      countries[id] = CountryConfig(
        initialGold: _integer(row, 'initialGold', path),
      );
    }
    final worldRows = _list(root['worlds'], 'worlds');
    for (var i = 0; i < worldRows.length; i++) {
      final path = 'worlds[$i]';
      final world = _object(worldRows[i], path);
      _keys(world, {'id', 'name', 'cities'}, path);
      final worldId = _integer(world, 'id', path);
      if (!worldIds.add(worldId)) {
        throw FormatException('$path：地图编号 $worldId 重复');
      }
      final rows = _list(world['cities'], '$path.cities');
      for (var j = 0; j < rows.length; j++) {
        final location = '$path.cities[$j]';
        final row = _object(rows[j], location);
        _keys(row, {
          'id',
          'name',
          'baseIncome',
          'initialReserveSoldiers',
          'initialLevel',
          'requiredGarrison',
        }, location);
        final cityId = _integer(row, 'id', location);
        final key = (worldId, cityId);
        if (cities.containsKey(key)) {
          throw FormatException('$location：城池编号 $cityId 重复');
        }
        final level = _integer(
          row,
          'initialLevel',
          location,
          min: 1,
          max: GameConfig.maxCityLevel,
        );
        cities[key] = CitySetup._(
          baseIncome: _integer(row, 'baseIncome', location),
          initialLevel: level,
        );
      }
    }
    return CampaignSetup._(
      Map.unmodifiable(countries),
      Map.unmodifiable(cities),
      Set.unmodifiable(worldIds),
    );
  }

  /// 确认配置指向真实地图、城池与国家，错写编号不会悄悄失效。
  void validateReferences(Map<int, Set<int>> worldCities, Set<int> countryIds) {
    for (final id in _worldIds) {
      if (!worldCities.containsKey(id)) {
        throw FormatException('campaign_config：不存在地图 $id');
      }
    }
    for (final id in countries.keys) {
      if (!countryIds.contains(id)) {
        throw FormatException('campaign_config：不存在国家 $id');
      }
    }
    for (final key in cities.keys) {
      if (!worldCities.containsKey(key.$1)) {
        throw FormatException('campaign_config：不存在地图 ${key.$1}');
      }
      if (!worldCities[key.$1]!.contains(key.$2)) {
        throw FormatException('campaign_config：地图 ${key.$1} 不存在城池 ${key.$2}');
      }
    }
  }
}

Map<String, dynamic> _object(Object? value, String path) {
  if (value is! Map<String, dynamic>) throw FormatException('$path 必须是对象');
  return value;
}

List<dynamic> _list(Object? value, String path) {
  if (value is! List) throw FormatException('$path 必须是数组');
  return value;
}

int _integer(
  Map<String, dynamic> row,
  String key,
  String path, {
  int min = 0,
  int? max,
}) {
  final value = row[key];
  if (value is! int || value < min || max != null && value > max) {
    throw FormatException(
      '$path.$key 必须是${max == null ? '不小于 $min' : '$min 到 $max'}的整数',
    );
  }
  return value;
}

void _keys(Map<String, dynamic> row, Set<String> allowed, String path) {
  for (final key in row.keys) {
    if (!allowed.contains(key)) throw FormatException('$path：未知配置项 $key');
  }
  if (row.containsKey('name') && row['name'] is! String) {
    throw FormatException('$path.name 必须是文字');
  }
}
