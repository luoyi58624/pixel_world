import 'dart:math' as math;

import '../../../core/geometry/geometry.dart';

import 'package:flutter/foundation.dart';

import '../../../core/config/game_config.dart';
import '../../../core/time/game_clock.dart';

import '../../battle/domain/battle_simulation.dart';
import '../../campaign/domain/campaign.dart';
import '../../heroes/domain/hero_sprite.dart';
import '../../heroes/data/rom_hero.dart';
import 'world_camera.dart';
import '../domain/world_data.dart';
import '../domain/world_movement.dart';
import '../../heroes/domain/recruitment.dart';
import '../../ai/runtime/worker.dart';

part 'world_snapshot.dart';

/// 管理探索状态；连续动画只触发绘制，界面文字仅在状态变化时更新。
class WorldController extends ChangeNotifier {
  /// 使用已加载地图创建探索会话。
  WorldController(
    this.worlds, {
    List<RomHeroDefinition> heroCatalog = const [],
    int? startingGold,
    Map<int, CountryConfig>? countryConfigs,
    bool? aiEnabled,
    AiWorker Function()? aiWorkerFactory,
  }) : _heroCatalog = List.unmodifiable(heroCatalog),
       _countryConfigs = countryConfigs == null
           ? null
           : Map.unmodifiable(countryConfigs),
       _aiEnabled = aiEnabled ?? GameConfig.countryAiEnabled,
       _aiWorkerFactory = aiWorkerFactory,
       camera = WorldCamera(worlds.first.pixelSize),
       campaigns = worlds
           .map(
             (world) => CampaignState.fromRom(
               world,
               heroCatalog,
               startingGold: startingGold,
               countryConfigs: countryConfigs,
               aiEnabled: aiEnabled ?? GameConfig.countryAiEnabled,
               aiWorkerFactory: aiWorkerFactory,
             ),
           )
           .toList() {
    switchWorld(0);
  }

  /// 可切换的场景。
  final List<WorldDefinition> worlds;

  /// 当前镜头。
  final WorldCamera camera;

  /// 观战使用独立镜头，拖动战场不会改变大地图位置。
  final WorldCamera battleCamera = WorldCamera(BattleSimulation.sceneSize);

  /// 键盘、拖拽及惯性操作当前正在显示的镜头。
  WorldCamera get activeCamera => watchedBattle == null ? camera : battleCamera;

  /// 各场景的独立玩法状态，切换地图不重置出征记录。
  final List<CampaignState> campaigns;
  final List<RomHeroDefinition> _heroCatalog;
  final Map<int, CountryConfig>? _countryConfigs;
  final bool _aiEnabled;
  final AiWorker Function()? _aiWorkerFactory;
  bool _gameOverShown = false;

  /// 当前场景的城池与部队状态。
  CampaignState get campaign => campaigns[index];

  /// 所有地图统一暂停，保持当前面板、选点和观战进度。
  bool get isPaused => campaign.isPaused;

  final _clock = GameClock();

  /// 当前逻辑倍速，不影响镜头拖拽和按钮交互。
  int get gameSpeed => _clock.speed;

  /// 修改倍率不重建战役，也不触发资源操作。
  void setGameSpeed(int value) {
    if (gameSpeed == value) return;
    _clock.speed = value;
    refreshUi();
  }

  /// 冻结全部战役及镜头惯性，暂停期间也禁止切图绕过。
  void setPaused(bool value) {
    if (isPaused == value || (value && campaign.defeated)) return;
    for (final state in campaigns) {
      state.setPaused(value);
    }
    _clock.clearPending();
    keyboardDirection = GamePoint.zero;
    fastPan = false;
    camera.cancelMotion();
    battleCamera.cancelMotion();
    _pointer = null;
    refreshUi();
  }

  /// 选择面板中的英雄编号。
  String? selectedHeroId;

  /// 已点出击、尚未在地图上确认位置的英雄。
  CampaignHero? pendingHero;

  /// 正等待重新指定目的地的在外英雄。
  String? movingHeroId;

  /// 地图角色面板当前选择的英雄。
  String? selectedUnitId;

  /// 正在查看的实时交战记录，结束后仍保留结果。
  WorldBattle? watchedBattle;

  /// 是否处于选点模式，此时地图点击只用于提交目标。
  bool get choosingTarget => pendingHero != null || movingHeroId != null;

  /// 当前选点指令的英雄名称。
  String get commandHeroName =>
      pendingHero?.name ?? campaign.marches[movingHeroId]?.hero.name ?? '';

  /// 已选中的在外部队。
  HeroMarch? get selectedUnit => campaign.marches[selectedUnitId];

  /// 已选中地图人物的实际英雄资料。
  CampaignHero? get selectedMapHero =>
      campaign.heroes.where((hero) => hero.id == selectedUnitId).firstOrNull;

  /// 角色可以接收行军指令，已经在外的部队允许中途改道。
  bool get canMoveSelected =>
      !isPaused &&
      !campaign.defeated &&
      campaign.gold > 0 &&
      selectedMapHero?.isPlayer == true &&
      selectedUnit != null &&
      campaign.moveBlockReason(selectedUnitId!) == null;

  String? _targetReturnUnitId;
  GamePoint? _pointer;

  /// 鼠标所在位置是否可打开角色、城池或交战面板。
  bool get pointerInteractive {
    final local = _pointer;
    if (local == null) return false;
    final point = camera.toWorld(local);
    return _heroAt(point) != null ||
        campaign.cityAt(point) != null ||
        _battleAt(local) != null;
  }

  /// 当前选中的英雄详情。
  CampaignHero? get selectedHero =>
      (selectedCity == null
              ? campaign.heroes
              : campaign.garrisonAt(selectedCity!.id))
          .where((hero) => hero.id == selectedHeroId)
          .firstOrNull;

  /// 用于低频界面更新的版本号。
  final ValueNotifier<int> uiRevision = ValueNotifier(0);

  /// 当前场景索引。
  int index = 0;

  /// 当前地图。
  WorldDefinition get world => worlds[index];

  /// 当前选中的城池。
  CityDefinition? _selectedCity;
  SoldierRecruitmentWindow? _soldierRecruitmentWindow;

  SoldierRecruitmentWindow? get _activeSoldierWindow =>
      campaign.isSoldierRecruitmentOpen(_soldierRecruitmentWindow)
      ? _soldierRecruitmentWindow
      : null;

  /// 当前窗口可以继续补充的兵数，关闭窗口后全国共享本月限制。
  int get soldierPurchaseQuantity => selectedCity == null
      ? 0
      : campaign.soldierPurchaseBatch(
          selectedCity!.id,
          window: _activeSoldierWindow,
        );

  /// 面板显示本国本月的补兵状态。
  String get soldierRecruitmentHint =>
      campaign.soldierRecruitmentBlockReason(window: _activeSoldierWindow) ??
      (_activeSoldierWindow == null ? '全国每月一次补兵' : '关闭窗口后本月不再补兵');

  void _endSoldierRecruitment() {
    campaign.endSoldierRecruitment(_soldierRecruitmentWindow);
    _soldierRecruitmentWindow = null;
  }

  /// 当前城池面板；关闭或切换城池即放弃尚未签约的候选。
  CityDefinition? get selectedCity => _selectedCity;

  /// 切换面板时归还公共池锁定的候选将领。
  set selectedCity(CityDefinition? value) {
    if (_selectedCity?.id != value?.id) {
      _endSoldierRecruitment();
      final offer = campaign.recruitmentOffer;
      if (offer != null && offer.cityId == _selectedCity?.id) {
        campaign.declineHero(offer);
      }
    }
    _selectedCity = value;
  }

  /// 鼠标或触摸指示的格子。
  TileCoord? cursor;

  /// 无英雄目录时的地图路径预览位置；战役英雄位置只来自 marches。
  GamePoint heroPosition = GamePoint.zero;

  /// 角色当前所在的格子，行军过程中也持续更新。
  TileCoord heroCell = const TileCoord(0, 0);

  /// 正在行走的路径。
  List<TileCoord> route = [];

  /// 当前路径中的目标节点。
  int routeStep = 0;

  /// 是否在移动。
  bool get walking => routeStep < route.length;

  /// 累计动画时间，单位秒。
  double time = 0;

  /// 角色当前实际行军的八方向朝向。
  HeroDirection direction = HeroDirection.south;

  /// 当前使用的英雄图集。
  HeroAppearance appearance = HeroAppearance.protagonist;

  /// 当前行程实际走过的像素距离，与动画时钟独立。
  double walkDistance = 0;
  final _walkAnimation = HeroWalkAnimation();

  /// 角色脚下的行军地形。
  MovementTerrain get movementTerrain => world.movementTerrainAt(heroCell);

  /// 同一方向的两帧步行动画索引，静止时保持站立帧。
  int get animationStep => walking ? _walkAnimation.step : 0;

  /// 叠加地形倍率前的行军速度，单位为原生地图像素每秒。
  static double get baseMovementSpeed => baseMarchSpeed;

  /// 是否显示格子边界。
  bool showGrid = false;

  /// 仅控制国土边界辅助显示，不影响越境预警和国家调度。
  bool showTerritoryBorders = false;

  /// 修改边界显示后只请求一次界面刷新。
  void setTerritoryBorders(bool value) {
    if (showTerritoryBorders == value) return;
    showTerritoryBorders = value;
    refreshUi();
  }

  /// 是否让镜头跟随行走角色。
  bool followHero = false;

  /// 界面操作提示。
  String message = '点击地面行走，拖动地图探索';

  /// 由按键输入设置的镜头运动方向。
  GamePoint keyboardDirection = GamePoint.zero;

  /// 按下加速键时提高镜头移动速度。
  bool fastPan = false;

  /// 切换地图并重置探索位置。
  void switchWorld(int value) {
    if (isPaused || campaign.defeated) return;
    _clock.clearPending();
    if (value != index) campaign.pauseAi();
    _gameOverShown = false;
    camera.cancelMotion();
    battleCamera.cancelMotion();
    selectedCity = null;
    index = value;
    selectedHeroId = null;
    pendingHero = null;
    movingHeroId = null;
    selectedUnitId = null;
    watchedBattle = null;
    _targetReturnUnitId = null;
    _pointer = null;
    cursor = null;
    route = [];
    routeStep = 0;
    heroCell = world.nearestWalkable(world.cities.first.entrance);
    heroPosition = heroCell.center;
    direction = HeroDirection.south;
    walkDistance = 0;
    _walkAnimation.reset();
    camera.worldSize = world.pixelSize;
    camera.scale = 3;
    camera.center = campaign.cityBounds(world.cities.first).center;
    camera.constrain();
    message = '点击我方城池选择英雄出征，拖拽移动镜头';
    refreshUi();
  }

  /// 更新动画与键盘镜头移动。
  void tick(double elapsed) {
    if (isPaused) {
      // 暂停只冻结模拟；用户刚拖动产生的镜头惯性仍可完成。
      if (activeCamera.coasting) {
        activeCamera.advanceInertia(elapsed);
      }
      if (activeCamera.coasting) {
        refreshView();
      } else {
        refreshUi();
      }
      return;
    }
    if (campaign.defeated) {
      var changed = false;
      _clock.advance(
        elapsed,
        (step) => changed = campaign.advance(step) || changed,
      );
      _showDefeat();
      if (changed) refreshUi();
      return;
    }
    // 所有面板共用这一时钟；保留真实帧间隔，低帧率不让行军额外变慢。
    final dt = elapsed.isFinite ? math.max(0.0, elapsed) : 0.0;
    var changed = false;
    final gameDt = _clock.advance(
      dt,
      (step) => changed = campaign.advance(step) || changed,
    );
    time += gameDt;
    if (keyboardDirection != GamePoint.zero) {
      activeCamera.pan(
        -keyboardDirection /
            keyboardDirection.distance *
            dt *
            (fastPan ? 900 : 420),
      );
      followHero = false;
    } else {
      activeCamera.advanceInertia(dt);
    }
    if (walking && !campaign.hasDispatched) {
      _walkAnimation.advance(gameDt);
      final oldTerrain = movementTerrain;
      var remainingTime = gameDt;
      while (walking && remainingTime > 1e-9) {
        final target = route[routeStep].center;
        final delta = target - heroPosition;
        final distance = delta.distance;
        if (distance < 1e-8) {
          heroPosition = target;
          routeStep++;
          continue;
        }
        direction = HeroDirection.fromVector(delta);
        final result = advanceToward(
          world,
          heroPosition,
          target,
          remainingTime,
        );
        heroPosition = result.position;
        walkDistance += result.distance;
        remainingTime = result.remainingTime;
        if (heroPosition == target) {
          routeStep++;
        }
      }
      heroCell = cellAt(world, heroPosition);
      if (followHero && watchedBattle == null) {
        camera.center = heroPosition;
        camera.constrain();
      }
      if (!walking) {
        message = '已到达 (${heroCell.x}, ${heroCell.y})';
        refreshUi();
      } else if (movementTerrain != oldTerrain) {
        refreshUi();
      }
    }
    if (campaign.defeated) {
      _showDefeat();
      return;
    }
    if (changed) {
      if (campaign.lastEvent.isNotEmpty) message = campaign.lastEvent;
    }
    if (watchedBattle != null && !watchedBattle!.isActive) {
      // 整场交战结束才退出；连续守将的短暂换人仍属于同一场攻城。
      final outcome = watchedBattle!.outcome;
      watchedBattle = null;
      battleCamera.cancelMotion();
      if (outcome != null) message = outcome;
      changed = true;
    }
    if (pendingHero != null && !campaign.canDispatch(pendingHero!)) {
      pendingHero = null;
      _targetReturnUnitId = null;
      changed = true;
    }
    if (movingHeroId != null &&
        (!campaign.marches.containsKey(movingHeroId) ||
            campaign.activeBattleForHero(movingHeroId!) != null)) {
      movingHeroId = null;
      _targetReturnUnitId = null;
      message = '该英雄已结束行军，请重新选择';
      changed = true;
    }
    if (selectedUnitId != null && selectedUnit == null) {
      selectedUnitId = null;
      changed = true;
    }
    if (changed) refreshUi();
    if (followHero && watchedBattle == null && campaign.marches.isNotEmpty) {
      camera.center = focusPosition;
      camera.constrain();
    }
    if (_pointer != null && watchedBattle == null) _updateCursor(_pointer!);
    notifyListeners();
  }

  void _showDefeat() {
    if (_gameOverShown) return;
    _gameOverShown = true;
    watchedBattle = null;
    camera.cancelMotion();
    battleCamera.cancelMotion();
    keyboardDirection = GamePoint.zero;
    followHero = false;
    pendingHero = null;
    movingHeroId = null;
    selectedHeroId = null;
    selectedUnitId = null;
    selectedCity = null;
    _targetReturnUnitId = null;
    _pointer = null;
    cursor = null;
    route = [];
    routeStep = 0;
    message = '游戏结束 · ${campaign.defeatReason!.label}';
    refreshUi();
  }

  /// 重新创建当前地图的战役，恢复主角、城池和经济，不沿用失败进度。
  void restartCampaign() {
    if (isPaused || !campaign.defeated) return;
    campaign.dispose();
    campaigns[index] = CampaignState.fromRom(
      world,
      _heroCatalog,
      countryConfigs: _countryConfigs,
      aiEnabled: _aiEnabled,
      aiWorkerFactory: _aiWorkerFactory,
    );
    time = 0;
    appearance = HeroAppearance.protagonist;
    followHero = false;
    keyboardDirection = GamePoint.zero;
    switchWorld(index);
  }

  /// 选点指令优先，其余点击按交战标记、角色、城池依次命中。
  void tap(GamePoint local) {
    if (campaign.defeated) return;
    final point = camera.toWorld(local);
    final cell = TileCoord((point.dx / 16).floor(), (point.dy / 16).floor());
    final city = campaign.cityAt(point);
    if (choosingTarget && !isPaused) {
      if (!world.contains(cell)) return;
      confirmPosition(city == null ? cell.center : point);
      return;
    }
    if (isPaused && choosingTarget) cancelCityAction();
    final battle = _battleAt(local);
    if (battle != null) {
      watchBattle(battle);
      return;
    }
    if (!world.contains(cell) && city == null) return;
    cursor = world.contains(cell) ? cell : null;
    final hero = _heroAt(point);
    if (hero != null) {
      openUnit(hero.id);
    } else if (city != null) {
      openCity(city);
    } else {
      selectedCity = null;
      selectedUnitId = null;
      watchedBattle = null;
      if (!isPaused && _heroCatalog.isEmpty && !campaign.hasDispatched) {
        walkTo(cell);
      } else {
        refreshUi();
      }
    }
  }

  /// 为未加载英雄目录的地图预览计算路径，战役中必须从城池派出实际英雄。
  void walkTo(TileCoord destination) {
    if (campaign.defeated) return;
    if (_heroCatalog.isNotEmpty || campaign.hasDispatched) {
      message = '点击我方城池查看情况或派遣英雄';
      refreshUi();
      return;
    }
    final path = findRoute(world, heroCell, destination);
    if (path == null) {
      message = '目标超出地图范围';
      refreshUi();
      return;
    }
    if (!walking) {
      walkDistance = 0;
      _walkAnimation.reset();
    }
    final delta = destination.center - heroPosition;
    route = delta.distance < 1e-8 ? [] : [path.last];
    routeStep = 0;
    if (walking) direction = HeroDirection.fromVector(delta);
    message = walking
        ? '行军中 · 目的地 (${destination.x}, ${destination.y})'
        : '角色已经在这里';
    refreshUi();
  }

  /// 向选中城池附近行军。
  void visitCity() {
    final city = selectedCity;
    if (city != null) walkTo(world.nearestWalkable(city.entrance));
  }

  /// 直接展开城池详情，我方城池同时提供英雄选择。
  void openCity(CityDefinition city) {
    if (campaign.defeated) return;
    if (isPaused && choosingTarget) cancelCityAction();
    if (!world.cities.contains(city) || choosingTarget) return;
    selectedUnitId = null;
    watchedBattle = null;
    selectedCity = city;
    final heroes = campaign.garrisonAt(city.id);
    selectedHeroId =
        (heroes
                    .where(
                      (hero) =>
                          campaign.canDispatch(hero) ||
                          campaign.upgradeCostFor(city.id, hero) != null,
                    )
                    .firstOrNull ??
                heroes.firstOrNull)
            ?.id;
    message = '已选中${campaign.cityName(city.id)}';
    refreshUi();
  }

  /// 只切换详情，不提前改变驻军或地图上的角色。
  void selectHero(String id) {
    if (selectedCity == null ||
        !campaign.garrisonAt(selectedCity!.id).any((hero) => hero.id == id)) {
      return;
    }
    selectedHeroId = id;
    refreshUi();
  }

  /// 确认英雄后进入地图选点模式，真正选定目标才扣除城内驻兵。
  void prepareDispatch() {
    final hero = selectedHero;
    if (selectedCity == null || hero == null || !campaign.canDispatch(hero)) {
      return;
    }
    pendingHero = hero;
    movingHeroId = null;
    _targetReturnUnitId = null;
    selectedUnitId = null;
    watchedBattle = null;
    selectedCity = null;
    message = '为${hero.name}选择目的地 · 点击地图任意位置';
    refreshUi();
  }

  /// 提交目标后从出发城门生成部队，不影响其他英雄的行军。
  void confirmTarget(CityDefinition target) {
    if (!world.cities.contains(target)) return;
    confirmPosition(campaign.cityBounds(target).center);
  }

  /// 将光标所指位置提交给指定英雄，不影响其他部队当前命令。
  void confirmPosition(GamePoint point) {
    if (!(GamePoint.zero & world.pixelSize).contains(point)) return;
    final hero = pendingHero ?? campaign.marches[movingHeroId]?.hero;
    if (hero == null) return;
    final accepted = pendingHero != null
        ? campaign.dispatchTo(hero, point) != null
        : campaign.moveTo(hero.id, point);
    if (!accepted) return;
    pendingHero = null;
    movingHeroId = null;
    _targetReturnUnitId = null;
    selectedCity = null;
    route = [];
    routeStep = 0;
    final city = campaign.cityAt(point);
    message =
        '${hero.name}率 ${hero.soldiers} 名士兵前往 '
        '${city == null ? '(${(point.dx / 16).floor()}, ${(point.dy / 16).floor()})' : campaign.cityName(city.id)}';
    refreshUi();
  }

  /// 取消选目标时回到原城池面板，面板内取消则直接关闭。
  void cancelCityAction() {
    if (watchedBattle != null) {
      leaveMap();
      battleCamera.cancelMotion();
      camera.cancelMotion();
      keyboardDirection = GamePoint.zero;
    }
    if (choosingTarget && _targetReturnUnitId != null) {
      selectedUnitId = _targetReturnUnitId;
      pendingHero = null;
      movingHeroId = null;
      _targetReturnUnitId = null;
      message = '已取消选点，原指令继续执行';
    } else if (pendingHero case final hero?) {
      pendingHero = null;
      selectedCity = world.cities.firstWhere((city) => city.id == hero.cityId);
      message = '已取消选择进攻目标';
    } else {
      selectedCity = null;
      selectedUnitId = null;
      watchedBattle = null;
    }
    refreshUi();
  }

  /// 关闭城池面板，不改变任何已出征部队。
  void closeCity() {
    selectedCity = null;
    refreshUi();
  }

  /// 让当前选中的驻城将领主持升级，使用该将领内政计算费用。
  void upgradeSelectedCity() {
    final city = selectedCity;
    if (city == null) return;
    if (campaign.upgradeCity(city.id, hero: selectedHero)) {
      message = campaign.lastEvent;
    } else {
      message = campaign.upgradeBlockReason(city.id, selectedHero)!;
    }
    refreshUi();
  }

  /// 按点击时的金币和剩余容量征募一批兵员，面板操作不暂停时间。
  void buyCitySoldiers() {
    final city = selectedCity;
    if (city == null || soldierPurchaseQuantity <= 0) return;
    if (_activeSoldierWindow == null) {
      _endSoldierRecruitment();
      _soldierRecruitmentWindow = campaign.beginSoldierRecruitment();
    }
    if (_soldierRecruitmentWindow != null &&
        campaign.buySoldiers(
          city.id,
          soldierPurchaseQuantity,
          window: _soldierRecruitmentWindow,
        )) {
      message = campaign.lastEvent;
      refreshUi();
    }
  }

  /// 在当前城池付费抽取一位可签约英雄。
  void drawCityHero() {
    final city = selectedCity;
    if (city != null && campaign.drawHero(city.id) != null) {
      message = campaign.lastEvent;
      refreshUi();
    }
  }

  /// 签收当前候选并选中新英雄，不重复收取抽取费。
  void signRecruitment(RecruitmentOffer offer) {
    final hero = campaign.signHero(offer);
    if (hero != null) {
      selectedHeroId = hero.id;
      message = campaign.lastEvent;
      refreshUi();
    }
  }

  /// 放弃这次抽取的英雄并按内政返还金币。
  void declineRecruitment(RecruitmentOffer offer) {
    if (campaign.declineHero(offer)) {
      message = campaign.lastEvent;
      refreshUi();
    }
  }

  /// 解雇当前本国将领并清理选点，城池面板继续展示其余驻军。
  void dismissHero(CampaignHero hero) {
    if (campaign.dismissHero(hero) == null) {
      message = campaign.dismissalBlockReason(hero) ?? '无法解雇该将领';
      refreshUi();
      return;
    }
    if (pendingHero == hero || movingHeroId == hero.id) {
      pendingHero = null;
      movingHeroId = null;
      _targetReturnUnitId = null;
    }
    if (selectedUnitId == hero.id) selectedUnitId = null;
    if (selectedHeroId == hero.id) {
      selectedHeroId = selectedCity == null
          ? null
          : campaign.garrisonAt(selectedCity!.id).firstOrNull?.id;
    }
    message = campaign.lastEvent;
    refreshUi();
  }

  /// 镜头跟随选中的或最近派出的部队，没有在外部队时回到据点。
  GamePoint get focusPosition =>
      selectedUnit?.position ??
      campaign.marches.values
          .where((march) => march.hero.isPlayer)
          .lastOrNull
          ?.position ??
      campaign.cityBounds(world.cities.first).center;

  /// 地图底部的行军说明，只在界面状态变化时重建。
  String get statusMessage {
    if (campaign.defeated) return '游戏结束 · ${campaign.defeatReason!.label}';
    final field = campaign.fieldBattles.values
        .where((battle) => battle.isActive)
        .firstOrNull;
    if (field != null &&
        !choosingTarget &&
        selectedCity == null &&
        selectedUnitId == null) {
      return '${field.attacker.name}与${field.defender.name}正在${field.locationLabel} · 点击刀剑观战';
    }
    final battle = campaign.marches.values
        .where((march) => march.phase == MarchPhase.fighting)
        .firstOrNull;
    if (battle != null && pendingHero == null && selectedCity == null) {
      return '${battle.hero.name}正在进攻${campaign.cityName(battle.target!.id)} · HP ${battle.hero.health.label}/${battle.hero.maxHp}';
    }
    final march = campaign.marches.values
        .where((march) => march.phase == MarchPhase.marching)
        .lastOrNull;
    if (choosingTarget || selectedCity != null || selectedUnitId != null) {
      return message;
    }
    if (march != null) {
      final terrain = world.movementTerrainAt(cellAt(world, march.position));
      return '${march.hero.name} → ${march.target == null ? '目的地' : campaign.cityName(march.target!.id)} · ${terrain.label} ${(terrain.speedFactor * 100).round()}%速度';
    }
    return walking
        ? '$message · ${movementTerrain.label} ${(movementTerrain.speedFactor * 100).round()}%速度'
        : message;
  }

  /// 更新地图指针位置和可交互光标。
  void hover(GamePoint local) {
    final interactive = pointerInteractive;
    _pointer = local;
    _updateCursor(local);
    if (interactive != pointerInteractive) uiRevision.value++;
  }

  /// 离开地图或进入面板时清除地图指针状态。
  void leaveMap() {
    _pointer = null;
    cursor = null;
    notifyListeners();
  }

  void _updateCursor(GamePoint local) {
    final point = camera.toWorld(local);
    final candidate = TileCoord(
      (point.dx / 16).floor(),
      (point.dy / 16).floor(),
    );
    final next = world.contains(candidate) ? candidate : null;
    if (cursor != next) {
      cursor = next;
      notifyListeners();
    }
  }

  CampaignHero? _heroAt(GamePoint point) {
    final units = campaign.marches.values.toList()
      ..sort((a, b) => b.position.dy.compareTo(a.position.dy));
    final radius = math.max(8.0, 12 / camera.scale);
    for (final unit in units) {
      if (!unit.visibleOnMap) continue;
      if (GameRect.fromCenter(
        center: unit.position,
        width: radius * 2,
        height: radius * 2,
      ).contains(point)) {
        return unit.hero;
      }
    }
    return null;
  }

  /// 战斗标记的位置和点击区域共用屏幕坐标，不受地图缩放影响。
  GameRect battleMarkerBounds(WorldBattle battle) => GameRect.fromCenter(
    center:
        camera.toScreen(battle.markerPosition(campaign)) -
        const GamePoint(0, 22),
    width: 40,
    height: 36,
  );

  WorldBattle? _battleAt(GamePoint local) => campaign.allBattles
      .where(
        (battle) =>
            battle.isActive && battleMarkerBounds(battle).contains(local),
      )
      .firstOrNull;

  /// 打开角色操作面板，不停止正在执行的行军或交战。
  void openUnit(String id) {
    if (campaign.defeated) return;
    if (isPaused && choosingTarget) cancelCityAction();
    if (choosingTarget || !campaign.marches.containsKey(id)) {
      return;
    }
    selectedUnitId = id;
    selectedCity = null;
    watchedBattle = null;
    message = '已选中${selectedMapHero!.name}';
    refreshUi();
  }

  /// 等待新的位置，确认前继续执行原来的行军指令。
  void prepareMove() {
    final hero = selectedMapHero;
    if (hero == null || !canMoveSelected) return;
    _targetReturnUnitId = hero.id;
    movingHeroId = hero.id;
    selectedUnitId = null;
    message = '为${hero.name}选择目的地 · 点击地图任意位置';
    refreshUi();
  }

  /// 仅让当前角色原地扎营，地图时间与其他单位保持运行。
  void campSelected() {
    if (selectedUnitId == null || selectedMapHero?.isPlayer != true) return;
    if (selectedUnit == null || !campaign.camp(selectedUnitId!)) return;
    message = '${selectedMapHero?.name ?? '英雄'}已原地扎营';
    refreshUi();
  }

  /// 发起一次有阵亡风险的撤退，后台播完退场后自动返回地图。
  void retreatHero(String heroId) {
    final result = campaign.retreatHero(heroId);
    if (result == null) return;
    message = campaign.lastEvent;
    refreshUi();
  }

  /// 查看后台正在运行的战斗，不创建新战斗或暂停时间。
  void watchBattle(WorldBattle battle) {
    if (campaign.defeated) return;
    if (isPaused && choosingTarget) cancelCityAction();
    leaveMap();
    camera.cancelMotion();
    battleCamera.cancelMotion();
    keyboardDirection = GamePoint.zero;
    watchedBattle = battle;
    selectedUnitId = null;
    selectedCity = null;
    refreshUi();
  }

  /// 回到初始据点。
  void home() {
    activeCamera.cancelMotion();
    if (watchedBattle != null) {
      battleCamera.overview();
      refreshUi();
      return;
    }
    camera.scale = math.max(3, camera.minScale);
    camera.center = campaign.cityBounds(world.cities.first).center;
    camera.constrain();
    followHero = false;
    refreshUi();
  }

  /// 通知文字界面和绘制层读取新状态。
  void refreshUi() {
    uiRevision.value++;
    notifyListeners();
  }

  /// 只重绘镜头变化，不重建面板或推进游戏时钟。
  void refreshView() => notifyListeners();

  @override
  void dispose() {
    _endSoldierRecruitment();
    for (final campaign in campaigns) {
      campaign.dispose();
    }
    uiRevision.dispose();
    super.dispose();
  }
}
