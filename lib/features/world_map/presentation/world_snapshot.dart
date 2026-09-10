part of 'world_controller.dart';

/// 视角和待确认操作与战役一起记录，回放能还原玩家当时看的画面。
extension WorldSnapshots on WorldController {
  /// 保存当前地图和界面，不保存其他尚未进入的地图。
  Map<String, dynamic> saveState({bool replay = false}) => {
    'version': 1,
    'index': index,
    'campaign': campaign.saveState(replay: replay),
    'clock': _clock.saveState(),
    'time': time,
    'camera': [camera.center.dx, camera.center.dy, camera.scale],
    'battleCamera': [
      battleCamera.center.dx,
      battleCamera.center.dy,
      battleCamera.scale,
    ],
    'selectedCity': _selectedCity?.id,
    'selectedHero': selectedHeroId,
    'unit': selectedUnitId,
    'pendingHero': pendingHero?.id,
    'movingHero': movingHeroId,
    'returnUnit': _targetReturnUnitId,
    'selectedWeapons': List.of(_selectedWeaponIds),
    'pendingWeapons': List.of(_pendingWeaponIds),
    'battle': watchedBattle is CityBattle
        ? ['city', (watchedBattle as CityBattle).city.id]
        : watchedBattle is FieldBattle
        ? ['field', (watchedBattle as FieldBattle).id]
        : null,
    'cursor': cursor == null ? null : [cursor!.x, cursor!.y],
    'heroPosition': [heroPosition.dx, heroPosition.dy],
    'heroCell': [heroCell.x, heroCell.y],
    'route': [
      for (final c in route) [c.x, c.y],
    ],
    'routeStep': routeStep,
    'direction': direction.index,
    'appearance': appearance.index,
    'walkDistance': walkDistance,
    'animation': _walkAnimation.savedTime,
    'grid': showGrid,
    'borders': showTerritoryBorders,
    'follow': followHero,
    'message': message,
    'gameOver': _gameOverShown,
  };

  /// 替换当前战役，回放读取快照且不启动 AI；恢复不会执行旧操作。
  void restoreState(Map<String, dynamic> d, {bool replay = false}) {
    if (d['version'] != 1) throw const FormatException('不支持此存档版本');
    final next = d['index'] as int;
    if (next < 0 || next >= worlds.length) {
      throw const FormatException('存档地图不存在');
    }
    final restored = CampaignSnapshots.restore(
      Map<String, dynamic>.from(d['campaign']),
      worlds[next],
      _heroCatalog,
      _weaponCatalog,
      replay: replay,
      aiWorkerFactory: _aiWorkerFactory,
    );
    campaign.dispose();
    index = next;
    campaigns[index].dispose();
    campaigns[index] = restored;
    camera.worldSize = world.pixelSize;
    void view(WorldCamera camera, dynamic v) {
      camera.cancelMotion();
      camera.center = GamePoint(
        (v[0] as num).toDouble(),
        (v[1] as num).toDouble(),
      );
      camera.scale = (v[2] as num).toDouble();
    }

    view(camera, d['camera']);
    view(battleCamera, d['battleCamera']);
    _clock.restoreState(d['clock']);
    time = (d['time'] as num).toDouble();
    _selectedCity = world.cities
        .where((c) => c.id == d['selectedCity'])
        .firstOrNull;
    selectedHeroId = d['selectedHero'];
    selectedUnitId = d['unit'];
    pendingHero = campaign.heroes
        .where((h) => h.id == d['pendingHero'])
        .firstOrNull;
    movingHeroId = d['movingHero'];
    _targetReturnUnitId = d['returnUnit'];
    _selectedWeaponIds
      ..clear()
      ..addAll((d['selectedWeapons'] as List).cast<int>());
    _pendingWeaponIds = (d['pendingWeapons'] as List).cast<int>().toList();
    final b = d['battle'];
    watchedBattle = b == null
        ? null
        : b[0] == 'city'
        ? campaign.battles[b[1]]
        : campaign.fieldBattles[b[1]];
    final cur = d['cursor'];
    cursor = cur == null ? null : TileCoord(cur[0], cur[1]);
    heroPosition = GamePoint(
      (d['heroPosition'][0] as num).toDouble(),
      (d['heroPosition'][1] as num).toDouble(),
    );
    heroCell = TileCoord(d['heroCell'][0], d['heroCell'][1]);
    route = [for (final p in d['route']) TileCoord(p[0], p[1])];
    routeStep = d['routeStep'];
    direction = HeroDirection.values[d['direction']];
    appearance = HeroAppearance.values[d['appearance']];
    walkDistance = (d['walkDistance'] as num).toDouble();
    _walkAnimation.restoreTime((d['animation'] as num).toDouble());
    showGrid = d['grid'];
    showTerritoryBorders = d['borders'];
    followHero = d['follow'];
    message = d['message'];
    _gameOverShown = d['gameOver'];
    keyboardDirection = GamePoint.zero;
    _pointer = null;
    refreshUi();
  }
}
