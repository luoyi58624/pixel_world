import 'dart:math' as math;

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:flutter/services.dart';

import '../world/hero_sprite.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';
import '../world/world_painter.dart';
import 'city_panel.dart';
import 'unit_panel.dart';

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
  Object? _error;
  bool _showMinimap = true;
  Offset _gestureAnchor = Offset.zero;
  double _gestureScale = 1;

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
      );
      setState(() {
        _assets = assets;
        _controller = controller;
      });
      _ticker = createTicker((elapsed) {
        final delta = (elapsed - _previousTick).inMicroseconds / 1000000;
        _previousTick = elapsed;
        controller.tick(delta);
      })..start();
      _focus.requestFocus();
    } catch (error) {
      if (mounted) setState(() => _error = error);
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    // 失焦只清除输入；保留游戏时钟，系统恢复帧调度后按真实间隔推进。
    if (state != AppLifecycleState.resumed) _clearKeys();
  }

  void _clearKeys() {
    _pressed.clear();
    _controller?.keyboardDirection = Offset.zero;
    _controller?.dragging = false;
    _controller?.leaveMap();
  }

  void _action(VoidCallback action) {
    action();
    _controller?.refreshUi();
    _focus.requestFocus();
  }

  KeyEventResult _key(FocusNode node, KeyEvent event) {
    final c = _controller;
    if (c == null) return KeyEventResult.ignored;
    final key = event.logicalKey;
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
    c.keyboardDirection = Offset(x, y);
    c.fastPan = held(
      LogicalKeyboardKey.shiftLeft,
      LogicalKeyboardKey.shiftRight,
    );
    if (event is KeyDownEvent) {
      if (key == LogicalKeyboardKey.space) {
        c.home();
      } else if (key == LogicalKeyboardKey.keyF) {
        _action(c.camera.overview);
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
                    if (c.camera.viewport != size) c.camera.resize(size);
                    return Stack(
                      children: [
                        Positioned.fill(
                          child: ValueListenableBuilder(
                            valueListenable: c.uiRevision,
                            builder: (context, value, child) => Listener(
                              onPointerDown: (_) {
                                _focus.requestFocus();
                                c.dragging = true;
                              },
                              onPointerUp: (event) {
                                c.dragging = false;
                                if (event.kind == PointerDeviceKind.mouse) {
                                  c.hover(event.localPosition);
                                }
                              },
                              onPointerCancel: (_) {
                                c.dragging = false;
                                c.leaveMap();
                              },
                              onPointerSignal: (event) {
                                if (event is PointerScrollEvent) {
                                  GestureBinding.instance.pointerSignalResolver
                                      .register(event, (_) {
                                        c.camera.zoomTo(
                                          c.camera.scale *
                                              math.exp(
                                                -event.scrollDelta.dy * 0.0015,
                                              ),
                                          event.localPosition,
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
                                    c.hover(event.localPosition),
                                onHover: (event) =>
                                    c.hover(event.localPosition),
                                onExit: (_) => c.leaveMap(),
                                child: GestureDetector(
                                  behavior: HitTestBehavior.opaque,
                                  onTapUp: (details) =>
                                      c.tap(details.localPosition),
                                  onSecondaryTapUp: (_) =>
                                      _action(c.cancelCityAction),
                                  onScaleStart: (details) {
                                    c.dragging = true;
                                    _gestureAnchor = c.camera.toWorld(
                                      details.localFocalPoint,
                                    );
                                    _gestureScale = c.camera.scale;
                                  },
                                  onScaleUpdate: (details) {
                                    c.followHero = false;
                                    c.camera.transform(
                                      _gestureAnchor,
                                      _gestureScale * details.scale,
                                      details.localFocalPoint,
                                    );
                                  },
                                  onScaleEnd: (_) => c.dragging = false,
                                  child: Semantics(
                                    label: '世界地图，拖动或边缘滚屏，点击角色下达指令，点击城堡查看信息',
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
                        Positioned(
                          left: 18,
                          top: 18,
                          child: IgnorePointer(
                            child: ValueListenableBuilder(
                              valueListenable: c.uiRevision,
                              builder: (context, value, child) =>
                                  !c.choosingTarget
                                  ? _locationBadge(c)
                                  : const SizedBox.shrink(),
                            ),
                          ),
                        ),
                        Positioned(
                          right: 16,
                          top: 16,
                          child: ValueListenableBuilder(
                            valueListenable: c.uiRevision,
                            builder: (context, value, child) =>
                                _mapOverlay(c, _mapTools(c)),
                          ),
                        ),
                        if (_showMinimap)
                          Positioned(
                            right: 16,
                            bottom: 16,
                            child: _mapOverlay(
                              c,
                              _minimap(c, assets, compact ? 126 : 192),
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
                                        '边缘滚屏  ·  点击角色下令',
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
                          top: compact ? 12 : 88,
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
                                                    (compact ? 24 : 104),
                                              ),
                                              onAction: _action,
                                            )
                                          : UnitPanel(
                                              controller: c,
                                              assets: assets,
                                              maxHeight: math.max(
                                                0,
                                                size.height -
                                                    (compact ? 24 : 104),
                                              ),
                                              onAction: _action,
                                            ),
                                    ),
                                  ),
                          ),
                        ),
                        Positioned(
                          left: compact ? 12 : 180,
                          right: compact ? 64 : 80,
                          top: compact ? 12 : 18,
                          child: ValueListenableBuilder(
                            valueListenable: c.uiRevision,
                            builder: (context, value, child) =>
                                !c.choosingTarget
                                ? const SizedBox.shrink()
                                : _mapOverlay(
                                    c,
                                    _panel(
                                      child: Padding(
                                        padding: const EdgeInsets.fromLTRB(
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
                                              onPressed: () =>
                                                  _action(c.cancelCityAction),
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
                ),
              ),
              _statusBar(c),
            ],
          ),
        ),
      ),
    );
  }

  // 面板和小地图遮住边缘时，鼠标不能继续驱动底层大地图滚屏。
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
            const Icon(Icons.fort_outlined, color: _gold, size: 26),
            const SizedBox(width: 10),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '像素远征',
                  style: TextStyle(
                    fontSize: compact ? 16 : 19,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 2,
                    color: _cream,
                  ),
                ),
                Text(
                  compact
                      ? '金币 ${c.campaign.gold}'
                      : '金币 ${c.campaign.gold} · 第 ${c.campaign.settledTurns + 1} 回合',
                  style: TextStyle(
                    fontSize: 9,
                    color: Color(0xff8f9d91),
                    letterSpacing: 1.4,
                  ),
                ),
              ],
            ),
            const Spacer(),
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
            IconButton(
              tooltip: '操作说明',
              onPressed: _help,
              icon: const Icon(
                Icons.help_outline,
                size: 20,
                color: Color(0xffadb8ac),
              ),
            ),
          ],
        ),
      );
    },
  );

  Widget _locationBadge(WorldController c) => _panel(
    child: Padding(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            ['群岛之境', '长河之境', '山海之境'][c.index],
            style: const TextStyle(
              color: _cream,
              fontSize: 15,
              fontWeight: FontWeight.w600,
              letterSpacing: 1,
            ),
          ),
          const SizedBox(height: 3),
          Text(
            '${c.world.cities.length} 座城池  ·  点击城池指挥',
            style: const TextStyle(color: Color(0xffb2b9a8), fontSize: 10),
          ),
        ],
      ),
    ),
  );

  Widget _mapTools(WorldController c) => _panel(
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        _tool(
          '放大',
          Icons.add,
          () => c.camera.zoomTo(
            c.camera.scale * 1.25,
            c.camera.viewport.center(Offset.zero),
          ),
        ),
        _tool(
          '缩小',
          Icons.remove,
          () => c.camera.zoomTo(
            c.camera.scale / 1.25,
            c.camera.viewport.center(Offset.zero),
          ),
        ),
        Container(width: 22, height: 1, color: _line),
        _tool('查看全图 · F', Icons.map_outlined, c.camera.overview),
        _tool('回到据点 · 空格', Icons.home_outlined, c.home),
        _tool(
          '网格 · G',
          Icons.grid_4x4,
          () => c.showGrid = !c.showGrid,
          active: c.showGrid,
        ),
        _tool('跟随角色', Icons.person_pin_circle_outlined, () {
          c.followHero = !c.followHero;
          if (c.followHero) {
            c.camera.center = c.focusPosition;
            c.camera.constrain();
          }
        }, active: c.followHero),
        SizedBox(
          width: 40,
          height: 38,
          child: PopupMenuButton<HeroAppearance>(
            key: const ValueKey('hero-picker'),
            tooltip: '选择英雄：${c.appearance.label}',
            initialValue: c.appearance,
            icon: const Icon(Icons.person_outline, size: 19, color: _cream),
            enabled: !c.campaign.hasDispatched,
            onSelected: (hero) => _action(() => c.appearance = hero),
            itemBuilder: (_) => HeroAppearance.values
                .map(
                  (hero) => PopupMenuItem(value: hero, child: Text(hero.label)),
                )
                .toList(),
          ),
        ),
      ],
    ),
  );

  Widget _tool(
    String label,
    IconData icon,
    VoidCallback action, {
    bool active = false,
  }) => SizedBox(
    width: 40,
    height: 38,
    child: IconButton(
      tooltip: label,
      onPressed: () => _action(action),
      padding: EdgeInsets.zero,
      iconSize: 19,
      color: active ? _gold : _cream,
      icon: Icon(icon),
    ),
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
    c.camera.center = Offset(
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
            '${c.camera.scale.toStringAsFixed(1)}×',
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

  void _help() {
    _clearKeys();
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        backgroundColor: _ink,
        title: const Text('地图操作', style: TextStyle(color: _cream)),
        scrollable: true,
        content: const Text(
          '拖动 / 双指手势　移动与缩放地图\n鼠标靠近画面边缘　自动滚屏\n鼠标滚轮　以指针位置缩放\nW A S D / 方向键　移动镜头\nShift　加速移动镜头\n点击角色　移动、扎营、情况\n移动 / 出击　切换光标后点击任意位置\n扎营　原地停止，其他部队继续行动\n山地速度 60%，涉水速度 50%\n点击城池　直接查看情况与守军\n我方城池　同页选英雄，右下角出击\n经济区域　升级城池，最高五级\n抵达敌城　后台自动交战\n点击城上刀剑　查看实时战况\n英雄战败　所属城池降一级\n一级城战败　失守并清除未出战英雄\n每 30 秒　结算产出与英雄报酬\n\n空格　回到初始据点\nF　查看全图\nG　切换网格\nM　显示或隐藏小地图\n1 / 2 / 3　切换地图\nEsc / 鼠标右键　取消选点或关闭面板',
          style: TextStyle(fontSize: 13, height: 1.8, color: _cream),
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
    _ticker?.dispose();
    _controller?.dispose();
    _assets?.dispose();
    _focus.dispose();
    super.dispose();
  }
}
