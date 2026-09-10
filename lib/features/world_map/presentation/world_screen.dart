import 'package:pixel_world/core/geometry/flutter_geometry.dart';
import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:math' as math;

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';

import '../../../core/config/game_config.dart';
import '../../../core/time/game_clock.dart';

import '../data/world_assets.dart';
import 'world_controller.dart';
import 'world_painter.dart';
import '../../cities/presentation/city_panel.dart';
import '../../battle/presentation/battle_scene.dart';
import '../../heroes/presentation/unit_panel.dart';
import '../../app/presentation/game_over_panel.dart';
import '../../app/presentation/game_pause_overlay.dart';

const _ink = Color(0xff141b17);
const _line = Color(0xff354138);
const _cream = Color(0xffece7d1);
const _gold = Color(0xffd6bd7c);

/// 可拖动、缩放、切换场景并指挥角色行走的地图界面。
class WorldScreen extends StatefulWidget {
  /// 创建地图探索界面。
  const WorldScreen({super.key});

  @override
  State<WorldScreen> createState() => _WorldScreenState();
}

class _WorldScreenState extends State<WorldScreen>
    with SingleTickerProviderStateMixin, WidgetsBindingObserver {
  final _focus = FocusNode(debugLabel: '地图键盘控制');
  final _pressed = <LogicalKeyboardKey>{};
  WorldAssets? _assets;
  WorldController? _controller;
  Ticker? _ticker;
  Duration _previousTick = Duration.zero;
  bool _skipFirstTick = true;
  Object? _error;
  bool _showMinimap = true;
  GamePoint _gestureAnchor = GamePoint.zero;
  double _gestureScale = 1;
  bool _gestureScaled = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _load();
  }

  Future<void> _load() async {
    setState(() => _error = null);
    try {
      final assets = await WorldAssets.load();
      if (!mounted) {
        assets.dispose();
        return;
      }
      final controller = WorldController(
        assets.worlds,
        heroCatalog: assets.heroCatalog,
        weaponCatalog: assets.weaponCatalog,
      );
      setState(() {
        _assets = assets;
        _controller = controller;
      });
      _ticker = createTicker((elapsed) {
        final delta = (elapsed - _previousTick).inMicroseconds / 1000000;
        _previousTick = elapsed;
        // 暂停后重新启动时，首帧只校准时间，不能补算停顿。
        if (_skipFirstTick) {
          _skipFirstTick = false;
          return;
        }
        controller.tick(delta);
      });
      _bindGameTicker();
      _focus.requestFocus();
    } catch (error) {
      if (mounted) setState(() => _error = error);
    }
  }

  void _bindGameTicker() {
    // 热重载保留旧 State，不会重跑 _load；重新绑定才能接管旧时钟，且不累积监听。
    final controller = _controller;
    if (controller == null) return;
    controller.uiRevision.removeListener(_syncTicker);
    controller.uiRevision.addListener(_syncTicker);
    _syncTicker();
  }

  void _syncTicker() {
    final ticker = _ticker;
    if (ticker == null) return;
    if (_controller?.isPaused == true) {
      ticker.stop();
    } else if (!ticker.isActive) {
      _previousTick = Duration.zero;
      _skipFirstTick = true;
      ticker.start();
    }
  }

  void _togglePause() {
    final controller = _controller;
    if (controller == null || controller.campaign.defeated) return;
    _clearKeys();
    controller.setPaused(!controller.isPaused);
    _focus.requestFocus();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.paused ||
        state == AppLifecycleState.hidden ||
        state == AppLifecycleState.detached ||
        state == AppLifecycleState.resumed) {
      _controller?.campaign.pauseAi();
    }
    // 失焦只清除输入；保留游戏时钟，系统恢复帧调度后按真实间隔推进。
    if (state != AppLifecycleState.resumed) _clearKeys();
  }

  @override
  void reassemble() {
    super.reassemble();
    _controller?.campaign.pauseAi();
    _bindGameTicker();
  }

  void _clearKeys() {
    _pressed.clear();
    _controller?.keyboardDirection = GamePoint.zero;
    _controller?.camera.cancelMotion();
    _controller?.battleCamera.cancelMotion();
    _controller?.leaveMap();
  }

  void _action(VoidCallback action) {
    if (_controller?.isPaused == true) return;
    _controller?.activeCamera.cancelMotion();
    action();
    _controller?.refreshUi();
    _focus.requestFocus();
  }

  KeyEventResult _key(FocusNode node, KeyEvent event) {
    final c = _controller;
    if (c == null) return KeyEventResult.ignored;
    if (c.campaign.defeated) return KeyEventResult.handled;
    final key = event.logicalKey;
    if (key == LogicalKeyboardKey.keyP) {
      if (event is KeyDownEvent) _togglePause();
      return KeyEventResult.handled;
    }
    if (c.isPaused) return KeyEventResult.handled;
    if (event is KeyUpEvent) {
      _pressed.remove(key);
    } else {
      _pressed.add(key);
    }
    bool held(LogicalKeyboardKey a, LogicalKeyboardKey b) =>
        _pressed.contains(a) || _pressed.contains(b);
    final x =
        (held(LogicalKeyboardKey.keyD, LogicalKeyboardKey.arrowRight)
            ? 1.0
            : 0.0) -
        (held(LogicalKeyboardKey.keyA, LogicalKeyboardKey.arrowLeft)
            ? 1.0
            : 0.0);
    final y =
        (held(LogicalKeyboardKey.keyS, LogicalKeyboardKey.arrowDown)
            ? 1.0
            : 0.0) -
        (held(LogicalKeyboardKey.keyW, LogicalKeyboardKey.arrowUp) ? 1.0 : 0.0);
    c.keyboardDirection = GamePoint(x, y);
    c.fastPan = held(
      LogicalKeyboardKey.shiftLeft,
      LogicalKeyboardKey.shiftRight,
    );
    if (event is KeyDownEvent) {
      if (key == LogicalKeyboardKey.space) {
        c.home();
      } else if (key == LogicalKeyboardKey.keyF) {
        _action(c.activeCamera.overview);
      } else if (key == LogicalKeyboardKey.keyG) {
        _action(() => c.showGrid = !c.showGrid);
      } else if (key == LogicalKeyboardKey.keyM) {
        setState(() => _showMinimap = !_showMinimap);
      } else if (key == LogicalKeyboardKey.escape) {
        _action(c.cancelCityAction);
      } else if (key == LogicalKeyboardKey.digit1 ||
          key == LogicalKeyboardKey.digit2 ||
          key == LogicalKeyboardKey.digit3) {
        c.switchWorld(
          key == LogicalKeyboardKey.digit1
              ? 0
              : key == LogicalKeyboardKey.digit2
              ? 1
              : 2,
        );
      }
    }
    final controls = {
      LogicalKeyboardKey.keyW,
      LogicalKeyboardKey.keyA,
      LogicalKeyboardKey.keyS,
      LogicalKeyboardKey.keyD,
      LogicalKeyboardKey.arrowUp,
      LogicalKeyboardKey.arrowDown,
      LogicalKeyboardKey.arrowLeft,
      LogicalKeyboardKey.arrowRight,
      LogicalKeyboardKey.space,
      LogicalKeyboardKey.keyF,
      LogicalKeyboardKey.keyG,
      LogicalKeyboardKey.keyM,
      LogicalKeyboardKey.escape,
      LogicalKeyboardKey.digit1,
      LogicalKeyboardKey.digit2,
      LogicalKeyboardKey.digit3,
    };
    return controls.contains(key)
        ? KeyEventResult.handled
        : KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    final c = _controller;
    final assets = _assets;
    if (c == null || assets == null) {
      return Scaffold(
        backgroundColor: _ink,
        body: Center(
          child: _error == null
              ? const Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    SizedBox(
                      width: 28,
                      height: 28,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: _gold,
                      ),
                    ),
                    SizedBox(height: 20),
                    Text('正在展开世界地图…', style: TextStyle(color: _cream)),
                  ],
                )
              : Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Text('地图加载失败'),
                    const SizedBox(height: 12),
                    Text('$_error'),
                    const SizedBox(height: 16),
                    FilledButton(onPressed: _load, child: const Text('重新加载')),
                  ],
                ),
        ),
      );
    }
    return Focus(
      focusNode: _focus,
      autofocus: true,
      onKeyEvent: _key,
      onFocusChange: (value) {
        if (!value) _clearKeys();
      },
      child: Scaffold(
        backgroundColor: _ink,
        body: SafeArea(
          child: ValueListenableBuilder(
            valueListenable: c.uiRevision,
            builder: (context, value, child) => Stack(
              fit: StackFit.expand,
              children: [
                ExcludeFocus(
                  excluding: c.campaign.defeated || c.isPaused,
                  child: AbsorbPointer(
                    absorbing: c.campaign.defeated || c.isPaused,
                    child: child,
                  ),
                ),
                if (c.isPaused)
                  GamePauseOverlay(
                    key: const ValueKey('game-paused'),
                    onResume: _togglePause,
                  ),
                if (c.campaign.defeated)
                  GameOverPanel(
                    reason: c.campaign.defeatReason!,
                    onRestart: () => _action(() {
                      _clearKeys();
                      c.restartCampaign();
                    }),
                  ),
              ],
            ),
            child: Column(
              children: [
                ValueListenableBuilder(
                  valueListenable: c.uiRevision,
                  builder: (context, value, child) => _toolbar(c),
                ),
                Expanded(
                  child: LayoutBuilder(
                    builder: (context, constraints) {
                      final size = constraints.biggest;
                      final compact = size.width < 700;
                      final minimapWidth = compact ? 126.0 : 192.0;
                      if (c.camera.viewport != size.toGame) {
                        c.camera.resize((size).toGame);
                      }
                      return ValueListenableBuilder(
                        valueListenable: c.uiRevision,
                        builder: (context, value, child) {
                          if (c.watchedBattle != null) {
                            return BattleScene(
                              controller: c,
                              assets: assets,
                              onAction: _action,
                            );
                          }
                          return Stack(
                            children: [
                              Positioned.fill(
                                child: ValueListenableBuilder(
                                  valueListenable: c.uiRevision,
                                  builder: (context, value, child) => Listener(
                                    onPointerDown: (_) {
                                      _focus.requestFocus();
                                      c.camera.beginDrag();
                                    },
                                    onPointerUp: (event) {
                                      if (event.kind ==
                                          PointerDeviceKind.mouse) {
                                        c.hover((event.localPosition).toGame);
                                      }
                                    },
                                    onPointerCancel: (_) {
                                      c.camera.cancelMotion();
                                      c.leaveMap();
                                    },
                                    onPointerSignal: (event) {
                                      if (event is PointerScrollEvent) {
                                        GestureBinding
                                            .instance
                                            .pointerSignalResolver
                                            .register(event, (_) {
                                              c.camera.zoomTo(
                                                c.camera.scale *
                                                    math.exp(
                                                      -event.scrollDelta.dy *
                                                          0.0015,
                                                    ),
                                                (event.localPosition).toGame,
                                              );
                                              c.refreshUi();
                                            });
                                      }
                                    },
                                    child: MouseRegion(
                                      cursor: c.choosingTarget
                                          ? SystemMouseCursors.precise
                                          : c.pointerInteractive
                                          ? SystemMouseCursors.click
                                          : SystemMouseCursors.basic,
                                      onEnter: (event) =>
                                          c.hover((event.localPosition).toGame),
                                      onHover: (event) =>
                                          c.hover((event.localPosition).toGame),
                                      onExit: (_) => c.leaveMap(),
                                      child: GestureDetector(
                                        behavior: HitTestBehavior.opaque,
                                        onTapUp: (details) => c.tap(
                                          (details.localPosition).toGame,
                                        ),
                                        onSecondaryTapUp: (_) =>
                                            _action(c.cancelCityAction),
                                        onScaleStart: (details) {
                                          c.camera.beginDrag();
                                          c.followHero = false;
                                          _gestureScaled =
                                              details.pointerCount > 1;
                                          _gestureAnchor = c.camera.toWorld(
                                            (details.localFocalPoint).toGame,
                                          );
                                          _gestureScale = c.camera.scale;
                                        },
                                        onScaleUpdate: (details) {
                                          _gestureScaled =
                                              _gestureScaled ||
                                              details.pointerCount > 1 ||
                                              (details.scale - 1).abs() > 0.01;
                                          c.followHero = false;
                                          c.camera.transform(
                                            _gestureAnchor,
                                            _gestureScale * details.scale,
                                            (details.localFocalPoint).toGame,
                                          );
                                        },
                                        onScaleEnd: (details) =>
                                            c.camera.endDrag(
                                              (details.velocity.pixelsPerSecond)
                                                  .toGame,
                                              allowInertia:
                                                  !_gestureScaled &&
                                                  details.pointerCount == 0,
                                            ),
                                        child: Semantics(
                                          label: '世界地图，拖拽移动，松手短暂惯性，点击角色下达指令，点击城堡查看信息',
                                          child: CustomPaint(
                                            key: const ValueKey('world-canvas'),
                                            painter: WorldPainter(
                                              c,
                                              assets,
                                              devicePixelRatio:
                                                  MediaQuery.devicePixelRatioOf(
                                                    context,
                                                  ),
                                            ),
                                            child: const SizedBox.expand(),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              if (_showMinimap)
                                Positioned(
                                  right: 16,
                                  top: 16,
                                  child: _mapOverlay(
                                    c,
                                    _minimap(c, assets, minimapWidth),
                                  ),
                                ),
                              if (!compact)
                                Positioned(
                                  left: 18,
                                  bottom: 18,
                                  child: IgnorePointer(
                                    child: _panel(
                                      child: const Padding(
                                        padding: EdgeInsets.symmetric(
                                          horizontal: 13,
                                          vertical: 10,
                                        ),
                                        child: Row(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            Icon(
                                              Icons.mouse_outlined,
                                              size: 15,
                                              color: _gold,
                                            ),
                                            SizedBox(width: 8),
                                            Text(
                                              '拖动探索',
                                              style: TextStyle(fontSize: 12),
                                            ),
                                            SizedBox(width: 16),
                                            Text(
                                              '松手轻滑  ·  点击城池出征',
                                              style: TextStyle(
                                                fontSize: 12,
                                                color: Color(0xffa8b2a6),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              Positioned(
                                left: compact ? 12 : 18,
                                top: compact ? 12 : 18,
                                right: compact ? 12 : null,
                                child: ValueListenableBuilder(
                                  valueListenable: c.uiRevision,
                                  builder: (context, value, child) =>
                                      c.selectedCity == null &&
                                          c.selectedUnitId == null &&
                                          c.watchedBattle == null
                                      ? const SizedBox.shrink()
                                      : _mapOverlay(
                                          c,
                                          SizedBox(
                                            width: compact ? null : 380,
                                            child: c.selectedCity != null
                                                ? CityPanel(
                                                    controller: c,
                                                    assets: assets,
                                                    maxHeight: math.max(
                                                      0,
                                                      size.height -
                                                          (compact ? 24 : 36),
                                                    ),
                                                    onAction: _action,
                                                  )
                                                : UnitPanel(
                                                    controller: c,
                                                    assets: assets,
                                                    maxHeight: math.max(
                                                      0,
                                                      size.height -
                                                          (compact ? 24 : 36),
                                                    ),
                                                    onAction: _action,
                                                  ),
                                          ),
                                        ),
                                ),
                              ),
                              Positioned(
                                left: compact ? 12 : 18,
                                right: compact
                                    ? 12
                                    : _showMinimap
                                    ? minimapWidth + 38
                                    : 18,
                                // 手机选点提示放到底部，桌面留出右上角小地图的宽度。
                                top: compact ? null : 18,
                                bottom: compact ? 12 : null,
                                child: ValueListenableBuilder(
                                  valueListenable: c.uiRevision,
                                  builder: (context, value, child) =>
                                      !c.choosingTarget
                                      ? const SizedBox.shrink()
                                      : _mapOverlay(
                                          c,
                                          _panel(
                                            child: Padding(
                                              padding:
                                                  const EdgeInsets.fromLTRB(
                                                    12,
                                                    8,
                                                    6,
                                                    8,
                                                  ),
                                              child: Row(
                                                children: [
                                                  const Icon(
                                                    Icons.my_location,
                                                    color: _gold,
                                                    size: 19,
                                                  ),
                                                  const SizedBox(width: 9),
                                                  Expanded(
                                                    child: Text(
                                                      '为${c.commandHeroName}选择目的地\n点击地图任意位置 · Esc 取消',
                                                      style: const TextStyle(
                                                        fontSize: 12,
                                                        color: _cream,
                                                        height: 1.6,
                                                      ),
                                                    ),
                                                  ),
                                                  TextButton(
                                                    key: const ValueKey(
                                                      'cancel-target',
                                                    ),
                                                    onPressed: () => _action(
                                                      c.cancelCityAction,
                                                    ),
                                                    child: const Text('取消'),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                ),
                              ),
                            ],
                          );
                        },
                      );
                    },
                  ),
                ),
                _statusBar(c),
              ],
            ),
          ),
        ),
      ),
    );
  }

  // 面板遮挡地图时清除底层角色与城池的指针命中状态。
  Widget _mapOverlay(WorldController c, Widget child) => MouseRegion(
    onEnter: (_) => c.leaveMap(),
    onHover: (_) => c.leaveMap(),
    child: child,
  );

  Widget _toolbar(WorldController c) => LayoutBuilder(
    builder: (context, constraints) {
      final compact = constraints.maxWidth < 620;
      return Container(
        height: compact ? 58 : 68,
        padding: EdgeInsets.symmetric(horizontal: compact ? 12 : 22),
        decoration: const BoxDecoration(
          color: _ink,
          border: Border(bottom: BorderSide(color: _line)),
        ),
        child: Row(
          children: [
            if (!compact) ...[
              const Icon(Icons.fort_outlined, color: _gold, size: 26),
              const SizedBox(width: 10),
            ],
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '像素远征',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: compact ? 16 : 19,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 2,
                      color: _cream,
                    ),
                  ),
                  Text(
                    '${c.campaign.dateLabel} · 金币 ${c.campaign.gold}',
                    key: const ValueKey('campaign-calendar'),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 9,
                      color: Color(0xff8f9d91),
                      letterSpacing: compact ? 0 : 1.4,
                    ),
                  ),
                ],
              ),
            ),
            if (constraints.maxWidth < 380)
              PopupMenuButton<int>(
                key: const ValueKey('compact-world-selector'),
                tooltip: '切换地图',
                onSelected: (index) => _action(() => c.switchWorld(index)),
                itemBuilder: (_) => [
                  for (var i = 0; i < 3; i++)
                    PopupMenuItem(
                      value: i,
                      child: Text('地图${['一', '二', '三'][i]}'),
                    ),
                ],
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 8,
                    vertical: 12,
                  ),
                  child: Text(
                    '地图${['Ⅰ', 'Ⅱ', 'Ⅲ'][c.index]}',
                    style: const TextStyle(color: _cream),
                  ),
                ),
              )
            else
              Container(
                decoration: BoxDecoration(
                  color: const Color(0xff0b110d),
                  borderRadius: BorderRadius.circular(5),
                  border: Border.all(color: _line),
                ),
                padding: const EdgeInsets.all(3),
                child: Row(
                  children: List.generate(
                    3,
                    (index) => Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 1),
                      child: TextButton(
                        key: ValueKey('map-$index'),
                        onPressed: () => _action(() => c.switchWorld(index)),
                        style: TextButton.styleFrom(
                          minimumSize: Size(compact ? 36 : 72, 32),
                          padding: const EdgeInsets.symmetric(horizontal: 10),
                          foregroundColor: index == c.index
                              ? _cream
                              : const Color(0xff899b8c),
                          backgroundColor: index == c.index
                              ? const Color(0xff344336)
                              : Colors.transparent,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(3),
                          ),
                        ),
                        child: Text(
                          compact
                              ? ['Ⅰ', 'Ⅱ', 'Ⅲ'][index]
                              : ['地图一', '地图二', '地图三'][index],
                          style: const TextStyle(fontSize: 12),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            SizedBox(width: compact ? 4 : 20),
            PopupMenuButton<int>(
              key: const ValueKey('game-speed'),
              tooltip: '游戏速度',
              initialValue: c.gameSpeed,
              onSelected: (speed) => _action(() => c.setGameSpeed(speed)),
              itemBuilder: (_) => [
                for (final speed in GameClock.speeds)
                  PopupMenuItem(
                    value: speed,
                    child: Row(
                      children: [
                        Text('$speed×${speed == 1 ? ' 正常' : ''}'),
                        const Spacer(),
                        if (c.gameSpeed == speed)
                          const Icon(Icons.check, size: 16, color: _gold),
                      ],
                    ),
                  ),
              ],
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 12,
                ),
                child: Text(
                  '${c.gameSpeed}×',
                  style: const TextStyle(
                    color: _gold,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
            IconButton(
              key: const ValueKey('game-pause'),
              tooltip: '暂停游戏（P）',
              onPressed: _togglePause,
              icon: const Icon(Icons.pause_rounded, size: 24, color: _gold),
            ),
            IconButton(
              key: const ValueKey('game-settings'),
              tooltip: '设置',
              onPressed: _settings,
              icon: const Icon(
                Icons.settings_outlined,
                size: 20,
                color: Color(0xffadb8ac),
              ),
            ),
          ],
        ),
      );
    },
  );

  Widget _minimap(WorldController c, WorldAssets assets, double width) =>
      _panel(
        child: Padding(
          padding: const EdgeInsets.all(5),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                width: width,
                height: 23,
                child: const Row(
                  children: [
                    SizedBox(width: 3),
                    Icon(Icons.explore_outlined, size: 12, color: _gold),
                    SizedBox(width: 6),
                    Text('世界一览', style: TextStyle(fontSize: 10, color: _cream)),
                    Spacer(),
                    Text(
                      '点击定位',
                      style: TextStyle(fontSize: 9, color: Color(0xff9baa98)),
                    ),
                    SizedBox(width: 3),
                  ],
                ),
              ),
              GestureDetector(
                key: const ValueKey('minimap'),
                onTapDown: (details) =>
                    _moveMinimap(c, details.localPosition, width),
                onPanUpdate: (details) =>
                    _moveMinimap(c, details.localPosition, width),
                child: MouseRegion(
                  cursor: SystemMouseCursors.click,
                  child: CustomPaint(
                    size: Size(width, width * 60 / 64),
                    painter: MinimapPainter(c, assets),
                  ),
                ),
              ),
            ],
          ),
        ),
      );

  void _moveMinimap(WorldController c, Offset point, double width) {
    c.camera.cancelMotion();
    c.camera.center = GamePoint(
      point.dx / width * c.world.pixelSize.width,
      point.dy / (width * 60 / 64) * c.world.pixelSize.height,
    );
    c.camera.constrain();
    c.followHero = false;
    c.refreshUi();
    _focus.requestFocus();
  }

  Widget _statusBar(WorldController c) => Container(
    height: 30,
    padding: const EdgeInsets.symmetric(horizontal: 16),
    decoration: const BoxDecoration(
      color: _ink,
      border: Border(top: BorderSide(color: _line)),
    ),
    child: Row(
      children: [
        Container(
          width: 5,
          height: 5,
          decoration: const BoxDecoration(
            color: Color(0xff93b688),
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: ValueListenableBuilder(
            valueListenable: c.uiRevision,
            builder: (context, value, child) => Text(
              c.statusMessage,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 10, color: Color(0xffb0bba8)),
            ),
          ),
        ),
        const SizedBox(width: 12),
        AnimatedBuilder(
          animation: c,
          builder: (context, child) => Text(
            '${c.activeCamera.scale.toStringAsFixed(1)}×',
            style: const TextStyle(
              fontSize: 11,
              color: _gold,
              fontFeatures: [FontFeature.tabularFigures()],
            ),
          ),
        ),
      ],
    ),
  );

  Widget _panel({required Widget child}) => DecoratedBox(
    decoration: BoxDecoration(
      color: const Color(0xf2141b17),
      border: Border.all(color: const Color(0xff65715a)),
      borderRadius: BorderRadius.circular(4),
      boxShadow: const [
        BoxShadow(
          color: Color(0x40000000),
          blurRadius: 10,
          offset: Offset(0, 3),
        ),
      ],
    ),
    child: child,
  );

  void _settings() {
    _clearKeys();
    final c = _controller!;
    showDialog<void>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          backgroundColor: _ink,
          title: const Text('设置', style: TextStyle(color: _cream)),
          content: SizedBox(
            width: 340,
            child: SwitchListTile.adaptive(
              key: const ValueKey('territory-border-switch'),
              contentPadding: EdgeInsets.zero,
              title: const Text(
                '显示国土边界',
                style: TextStyle(color: _cream, fontSize: 14),
              ),
              subtitle: const Text(
                '城池易主后，边界自动更新',
                style: TextStyle(color: Color(0xffadb8ac), fontSize: 12),
              ),
              value: c.showTerritoryBorders,
              onChanged: (value) =>
                  setDialogState(() => c.setTerritoryBorders(value)),
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(dialogContext);
                _help();
              },
              child: const Text('操作说明'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(dialogContext),
              child: const Text('关闭'),
            ),
          ],
        ),
      ),
    ).then((_) {
      if (mounted) _focus.requestFocus();
    });
  }

  void _help() {
    _clearKeys();
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: _ink,
        title: const Text('地图操作', style: TextStyle(color: _cream)),
        scrollable: true,
        content: Text(
          '拖动 / 双指手势　移动与缩放地图\n拖拽松手　短暂惯性，按住立即停下\n鼠标滚轮　以指针位置缩放\nW A S D / 方向键　移动镜头\nShift　加速移动镜头\n点击角色　直接查看属性，我方可移动和扎营\n移动 / 出击　切换光标后点击任意位置\n扎营　原地停止，其他部队继续行动\n草地速度 ${(GameConfig.grassSpeedFactor * 100).round()}%，山地 ${(GameConfig.mountainSpeedFactor * 100).round()}%，涉水 ${(GameConfig.waterSpeedFactor * 100).round()}%\n点击城池　查看城防、兵员、招募和国家日志\n我方城池　同页选英雄，右下角出击\n城防方块　点击升级，价格随选中将领内政变化，最高 ${GameConfig.maxCityLevel} 级；第一年限三级，之后每年解锁一级\n开局即可经营，有钱即可升级、补兵和招募\n抵达敌城　后台自动交战\n点击城上刀剑　查看实时战况\n城战结束　存活将领恢复满血，兵损保留\n进攻战败　损失出征英雄，出发城不降级\n连续攻城　临时城防等级逐轮降一级，加成为1/3/5/8/12，不加士气\n攻城结束　未占领时，每个非互刺胜轮必降一级，互刺不降级不占城\n占领城池　赢满初始城防等级轮数或清空守将\n一级城守城失败　失守并清除未出战英雄\n主角阵亡 / 无城可守　游戏结束\n每 ${GameConfig.secondsPerMonth.toInt()} 秒　进入下月，各国独立结算收成与月俸\n兵营　${GameConfig.soldierRecruitCost} 金币征一兵，整块点击最多招10人，离城自动补兵\n商店　抽取不限月度次数，每次 ${GameConfig.heroDrawCost} 金币，签约立即支付首月月俸，关闭窗口即放弃\n其他国家　弱城优先、强城备战，来敌时优先守家\n武器　城池武器库内购买、携带，最多一件出征，回城卸下归库；守城禁用，野外可用\n武器自动释放　每轮对阵最多一件；每年解锁一行\n专属将领在本国免薪，其他国家聘用按 JSON 月俸结算；解雇仅返还内政金币\n\nP　暂停 / 继续游戏（停止全部资源运行）\n空格　回到初始据点\nF　查看全图\nG　切换网格\nM　显示或隐藏小地图\n1 / 2 / 3　切换地图\nEsc / 鼠标右键　取消选点或关闭面板',
          style: const TextStyle(fontSize: 13, height: 1.8, color: _cream),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('开始探索'),
          ),
        ],
      ),
    ).then((_) {
      if (mounted) _focus.requestFocus();
    });
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    _controller?.uiRevision.removeListener(_syncTicker);
    _ticker?.dispose();
    _controller?.dispose();
    _assets?.dispose();
    _focus.dispose();
    super.dispose();
  }
}
