import 'dart:math' as math;

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

import '../world/battle_painter.dart';
import '../world/battle_simulation.dart';
import '../world/campaign.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';

const _ink = Color(0xff111916);
const _cream = Color(0xffece7d1);
const _gold = Color(0xffd6bd7c);

/// 与大地图共用后台战斗的可移动观战场景，双方将领状态固定在下方。
class BattleScene extends StatefulWidget {
  /// 显示当前观看的城池战斗。
  const BattleScene({
    super.key,
    required this.controller,
    required this.assets,
    required this.onAction,
  });

  /// 战役状态与持续运行的游戏时钟。
  final WorldController controller;

  /// 原有将领图集。
  final WorldAssets assets;

  /// 将键盘焦点返回游戏的入口。
  final void Function(VoidCallback) onAction;

  @override
  State<BattleScene> createState() => _BattleSceneState();
}

class _BattleSceneState extends State<BattleScene> {
  late final BattleArt _art = BattleArt();
  bool _fitted = false;
  String? _selectedId;
  Offset _anchor = Offset.zero;
  double _scale = 1;

  @override
  Widget build(BuildContext context) {
    final c = widget.controller;
    final battle = c.watchedBattle!;
    final sim = battle.simulation;
    return LayoutBuilder(
      builder: (context, constraints) {
        final tight = constraints.maxHeight < 390 || constraints.maxWidth < 620;
        final selected = sim.unitById(_selectedId);
        final status =
            battle.outcome ??
            (battle.nextWaveIn > 0
                ? '${battle.defender.name}战败 · 下一位守将即将入场'
                : sim.forming
                ? '双方列阵'
                : '第 ${battle.wave} 位守将 · 拼杀 ${sim.clashes}'
                      '${sim.clashes == 0 ? '' : ' · ${sim.pushedSide == null
                                ? '士气持平'
                                : sim.pushedSide == BattleSide.defender
                                ? '守军后退'
                                : '攻方后退'}'}');
        return ColoredBox(
          key: const ValueKey('battle-scene'),
          color: _ink,
          child: Column(
            children: [
              _overlay(
                Row(
                  children: [
                    const SizedBox(width: 12),
                    const Icon(Icons.sports_kabaddi, color: _gold, size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        '${battle.city.label}国 · 观战',
                        style: TextStyle(
                          color: _cream,
                          fontSize: tight ? 13 : 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                    TextButton.icon(
                      key: const ValueKey('battle-return'),
                      onPressed: () => widget.onAction(c.cancelCityAction),
                      icon: const Icon(Icons.arrow_back, size: 16),
                      label: const Text('返回地图'),
                    ),
                    const SizedBox(width: 8),
                  ],
                ),
              ),
              Expanded(
                child: LayoutBuilder(
                  builder: (context, viewport) {
                    final camera = c.battleCamera;
                    if (camera.viewport != viewport.biggest) {
                      camera.resize(viewport.biggest);
                    }
                    if (!_fitted) {
                      camera.overview();
                      _fitted = true;
                    }
                    return Stack(
                      children: [
                        Positioned.fill(
                          child: Listener(
                            onPointerDown: (_) {
                              c.dragging = true;
                            },
                            onPointerUp: (event) {
                              c.dragging = false;
                              if (event.kind == PointerDeviceKind.mouse) {
                                c.hoverBattle(event.localPosition);
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
                                      camera.zoomTo(
                                        camera.scale *
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
                              cursor: SystemMouseCursors.grab,
                              onEnter: (event) =>
                                  c.hoverBattle(event.localPosition),
                              onHover: (event) =>
                                  c.hoverBattle(event.localPosition),
                              onExit: (_) => c.leaveMap(),
                              child: GestureDetector(
                                behavior: HitTestBehavior.opaque,
                                onTapUp: (details) {
                                  final point = camera.toWorld(
                                    details.localPosition,
                                  );
                                  final radius = math.max(
                                    9.0,
                                    12 / camera.scale,
                                  );
                                  final units =
                                      sim.units
                                          .where(
                                            (unit) =>
                                                unit.health.alive &&
                                                (unit.position - point)
                                                        .distance <=
                                                    radius,
                                          )
                                          .toList()
                                        ..sort(
                                          (a, b) => (a.position - point)
                                              .distanceSquared
                                              .compareTo(
                                                (b.position - point)
                                                    .distanceSquared,
                                              ),
                                        );
                                  setState(
                                    () => _selectedId = units.firstOrNull?.id,
                                  );
                                },
                                onScaleStart: (details) {
                                  c.dragging = true;
                                  _anchor = camera.toWorld(
                                    details.localFocalPoint,
                                  );
                                  _scale = camera.scale;
                                },
                                onScaleUpdate: (details) {
                                  camera.transform(
                                    _anchor,
                                    _scale * details.scale,
                                    details.localFocalPoint,
                                  );
                                },
                                onScaleEnd: (_) => c.dragging = false,
                                child: CustomPaint(
                                  key: const ValueKey('battle-canvas'),
                                  painter: BattlePainter(
                                    c,
                                    widget.assets,
                                    _art,
                                    devicePixelRatio:
                                        MediaQuery.devicePixelRatioOf(context),
                                    selectedUnitId: _selectedId,
                                  ),
                                  child: const SizedBox.expand(),
                                ),
                              ),
                            ),
                          ),
                        ),
                        Positioned(
                          top: 8,
                          left: 12,
                          right: 58,
                          child: IgnorePointer(
                            child: Align(
                              alignment: Alignment.topCenter,
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 12,
                                  vertical: 6,
                                ),
                                decoration: BoxDecoration(
                                  color: const Color(0xe5111916),
                                  border: Border.all(
                                    color: const Color(0xff566047),
                                  ),
                                ),
                                child: Text(
                                  status,
                                  style: TextStyle(
                                    color: _gold,
                                    fontSize: tight ? 11 : 13,
                                  ),
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ),
                          ),
                        ),
                        Positioned(
                          top: 8,
                          right: 8,
                          child: _overlay(
                            Container(
                              decoration: BoxDecoration(
                                color: const Color(0xee111916),
                                border: Border.all(
                                  color: const Color(0xff566047),
                                ),
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: Column(
                                children: [
                                  _cameraButton(
                                    'battle-zoom-in',
                                    '放大战场',
                                    Icons.add,
                                    () => camera.zoomTo(
                                      camera.scale * 1.25,
                                      camera.viewport.center(Offset.zero),
                                    ),
                                  ),
                                  if (!tight)
                                    _cameraButton(
                                      'battle-zoom-out',
                                      '缩小战场',
                                      Icons.remove,
                                      () => camera.zoomTo(
                                        camera.scale / 1.25,
                                        camera.viewport.center(Offset.zero),
                                      ),
                                    ),
                                  _cameraButton(
                                    'battle-fit',
                                    '查看整个战场',
                                    Icons.fit_screen,
                                    camera.overview,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    );
                  },
                ),
              ),
              _overlay(
                Container(
                  padding: EdgeInsets.fromLTRB(
                    12,
                    tight ? 6 : 10,
                    12,
                    tight ? 6 : 10,
                  ),
                  decoration: const BoxDecoration(
                    color: _ink,
                    border: Border(top: BorderSide(color: Color(0xff43513e))),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: _army(
                          battle.defender,
                          BattleSide.defender,
                          tight,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        child: Text(
                          'VS',
                          style: TextStyle(
                            fontSize: tight ? 14 : 20,
                            color: _gold,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      Expanded(
                        child: _army(
                          battle.attacker,
                          BattleSide.attacker,
                          tight,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              if (!tight)
                _overlay(
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 7,
                    ),
                    color: const Color(0xff0c120e),
                    child: Text(
                      selected == null
                          ? '拖拽 / 边缘滚屏移动战场 · 滚轮缩放 · 点击单位查看血量'
                          : '${selected.name}  ${selected.health.label}/${selected.health.maxHp} HP · 攻击 ${selected.attack}'
                                ' · 目标 ${sim.unitById(selected.targetId)?.name ?? '等待接战'}'
                                '${sim.atWall(selected) ? ' · 靠墙：受到伤害 +50%' : ''}',
                      key: const ValueKey('battle-unit-information'),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 11,
                        color: Color(0xffa7b5a4),
                      ),
                    ),
                  ),
                ),
            ],
          ),
        );
      },
    );
  }

  Widget _army(CampaignHero hero, BattleSide side, bool tight) {
    final morale = widget.controller.watchedBattle!.simulation.morale(side);
    final color = side == BattleSide.attacker
        ? const Color(0xffe1ac58)
        : const Color(0xff979bff);
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            SizedBox(
              width: tight ? 28 : 40,
              height: tight ? 28 : 40,
              child: CustomPaint(
                painter: _CommanderPortrait(widget.assets, hero),
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${hero.name} · ${side == BattleSide.attacker ? '进攻' : '守城'}',
                    style: TextStyle(color: _cream, fontSize: tight ? 11 : 14),
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${hero.health.label} / ${hero.maxHp} HP  ·  士兵 ${hero.soldiers}',
                    key: ValueKey('battle-${side.name}-health'),
                    style: TextStyle(color: color, fontSize: tight ? 10 : 12),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 5),
        LinearProgressIndicator(
          value: hero.hp / hero.maxHp,
          minHeight: tight ? 3 : 5,
          color: color,
          backgroundColor: const Color(0xff30392c),
        ),
        const SizedBox(height: 6),
        Row(
          children: [
            Expanded(
              child: Text(
                '士气 ${morale.remaining}/${morale.maximum}',
                key: ValueKey('battle-${side.name}-morale'),
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(color: _gold, fontSize: tight ? 9 : 11),
              ),
            ),
            Text(
              '投入 ${morale.spent} · +${morale.bonus}%',
              style: TextStyle(color: color, fontSize: tight ? 9 : 11),
            ),
          ],
        ),
        const SizedBox(height: 5),
        LinearProgressIndicator(
          value: morale.remaining / morale.maximum,
          minHeight: tight ? 2 : 3,
          color: _gold,
          backgroundColor: const Color(0xff30392c),
        ),
        const SizedBox(height: 6),
        Row(
          children: [
            for (var i = 0; i < hero.squad.length; i++)
              Expanded(
                child: Padding(
                  padding: EdgeInsets.only(
                    right: i == hero.squad.length - 1 ? 0 : 4,
                  ),
                  child: Container(
                    padding: EdgeInsets.symmetric(vertical: tight ? 2 : 5),
                    decoration: BoxDecoration(
                      color: const Color(0xff1b261f),
                      border: Border.all(
                        color: hero.squad[i].alive
                            ? color.withValues(alpha: 0.45)
                            : const Color(0xff374036),
                      ),
                    ),
                    child: Text(
                      '${i + 1} · ${hero.squad[i].label}',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: hero.squad[i].alive
                            ? _cream
                            : const Color(0xff70806b),
                        fontSize: tight ? 9 : 11,
                      ),
                    ),
                  ),
                ),
              ),
          ],
        ),
      ],
    );
  }

  Widget _cameraButton(
    String key,
    String tooltip,
    IconData icon,
    VoidCallback action,
  ) => IconButton(
    key: ValueKey(key),
    tooltip: tooltip,
    iconSize: 18,
    constraints: const BoxConstraints.tightFor(width: 36, height: 32),
    padding: EdgeInsets.zero,
    onPressed: () => widget.onAction(action),
    icon: Icon(icon, color: _cream),
  );

  Widget _overlay(Widget child) => MouseRegion(
    onEnter: (_) => widget.controller.leaveMap(),
    onHover: (_) => widget.controller.leaveMap(),
    child: child,
  );

  @override
  void dispose() {
    _art.dispose();
    super.dispose();
  }
}

class _CommanderPortrait extends CustomPainter {
  _CommanderPortrait(this.assets, this.hero);
  final WorldAssets assets;
  final CampaignHero hero;

  @override
  void paint(Canvas canvas, Size size) => canvas.drawImageRect(
    assets.heroes[hero.appearance]!,
    const Rect.fromLTWH(0, 0, 16, 16),
    Offset.zero & size,
    Paint()..filterQuality = FilterQuality.none,
  );

  @override
  bool shouldRepaint(covariant _CommanderPortrait oldDelegate) =>
      hero != oldDelegate.hero || assets != oldDelegate.assets;
}
