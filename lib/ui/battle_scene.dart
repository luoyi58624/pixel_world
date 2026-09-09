import 'dart:math' as math;

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

import '../world/battle_painter.dart';
import '../world/battle_simulation.dart';
import '../world/campaign.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';
import 'hero_retreat_button.dart';

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
  late final BattleArt _art = BattleArt(widget.assets);
  bool _fitted = false;
  String? _selectedId;
  Offset _anchor = Offset.zero;
  double _scale = 1;
  bool _gestureScaled = false;
  bool _hasWeaponBar = false;

  @override
  Widget build(BuildContext context) {
    final c = widget.controller;
    final battle = c.watchedBattle!;
    final sim = battle.simulation;
    final playerHero = battle.attacker.isPlayer
        ? battle.attacker
        : battle is FieldBattle && battle.defender.isPlayer
        ? battle.defender
        : null;
    _hasWeaponBar = _hasWeaponBar || playerHero?.weaponIds.isNotEmpty == true;
    final retreatHero = battle.attacker.isPlayer
        ? battle.attacker
        : battle is FieldBattle && battle.defender.isPlayer
        ? battle.defender
        : null;
    return LayoutBuilder(
      builder: (context, constraints) {
        final tight = constraints.maxHeight < 390 || constraints.maxWidth < 620;
        final selected = sim.unitById(_selectedId);
        final pressure = sim.pushedSide == null
            ? '势均力敌'
            : sim.pushedSide == BattleSide.defender
            ? (battle is FieldBattle ? '左军受压' : '守军受压')
            : (battle is FieldBattle ? '右军受压' : '攻方受压');
        final status =
            battle.outcome ??
            sim.retreatMessage ??
            (battle is CityBattle && battle.nextWaveIn > 0
                ? '${battle.defender.name}战败 · 下一位守将即将入场'
                : sim.endingMessage != null
                ? sim.endingMessage!
                : sim.stage == BattleStage.victory
                ? '胜方走场'
                : sim.stage == BattleStage.falling
                ? '败方退场'
                : sim.forming
                ? '双方列阵'
                : '${battle is CityBattle ? '第 ${battle.wave} 位守将' : '野外决战'} · 拼杀 ${sim.clashes}'
                      '${sim.clashes == 0 ? '' : ' · $pressure'}');
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
                        '${battle.locationLabel} · 观战',
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
                              camera.beginDrag();
                            },
                            onPointerCancel: (_) {
                              camera.cancelMotion();
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
                                                (unit.renderPosition(
                                                              sim.elapsed,
                                                            ) -
                                                            point)
                                                        .distance <=
                                                    radius,
                                          )
                                          .toList()
                                        ..sort(
                                          (a, b) =>
                                              (a.renderPosition(sim.elapsed) -
                                                      point)
                                                  .distanceSquared
                                                  .compareTo(
                                                    (b.renderPosition(
                                                              sim.elapsed,
                                                            ) -
                                                            point)
                                                        .distanceSquared,
                                                  ),
                                        );
                                  setState(
                                    () => _selectedId = units.firstOrNull?.id,
                                  );
                                },
                                onScaleStart: (details) {
                                  camera.beginDrag();
                                  _gestureScaled = details.pointerCount > 1;
                                  _anchor = camera.toWorld(
                                    details.localFocalPoint,
                                  );
                                  _scale = camera.scale;
                                },
                                onScaleUpdate: (details) {
                                  _gestureScaled =
                                      _gestureScaled ||
                                      details.pointerCount > 1 ||
                                      (details.scale - 1).abs() > 0.01;
                                  camera.transform(
                                    _anchor,
                                    _scale * details.scale,
                                    details.localFocalPoint,
                                  );
                                },
                                onScaleEnd: (details) => camera.endDrag(
                                  details.velocity.pixelsPerSecond,
                                  allowInertia:
                                      !_gestureScaled &&
                                      details.pointerCount == 0,
                                ),
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
              Semantics(
                label:
                    '$status。${battle.defender.name} HP ${battle.defender.hp}，${battle.attacker.name} HP ${battle.attacker.hp}',
                child: const SizedBox.shrink(),
              ),
              if (_hasWeaponBar && playerHero != null)
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 4,
                  ),
                  child: SizedBox(
                    height: 40,
                    child: Row(
                      key: const ValueKey('battle-weapons'),
                      children: [
                        if (playerHero.weaponIds.isEmpty)
                          const Expanded(
                            child: Text(
                              '无可用武器',
                              textAlign: TextAlign.center,
                              style: TextStyle(color: _gold, fontSize: 12),
                            ),
                          ),
                        for (
                          var slot = 0;
                          slot < playerHero.weaponIds.length;
                          slot++
                        ) ...[
                          if (slot > 0) const SizedBox(width: 8),
                          Expanded(
                            child: OutlinedButton(
                              key: ValueKey('battle-weapon-$slot'),
                              onPressed:
                                  c.campaign.canUseWeapon(playerHero, slot)
                                  ? () => widget.onAction(
                                      () => c.useHeroWeapon(playerHero, slot),
                                    )
                                  : null,
                              child: Text(
                                c
                                    .campaign
                                    .weaponCatalog
                                    .weapons[playerHero.weaponIds[slot]]!
                                    .name,
                                style: const TextStyle(fontSize: 12),
                              ),
                            ),
                          ),
                        ],
                      ],
                    ),
                  ),
                ),
              if (sim.retreatMessage != null)
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  child: SizedBox(
                    height: 48,
                    child: Center(
                      child: Text(
                        sim.retreatMessage!,
                        key: const ValueKey('battle-retreat-result'),
                        style: const TextStyle(color: _gold, fontSize: 13),
                      ),
                    ),
                  ),
                ),
              if (retreatHero != null && sim.retreat == null)
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  child: SizedBox(
                    width: double.infinity,
                    height: 48,
                    child: HeroRetreatButton(
                      key: const ValueKey('battle-retreat'),
                      controller: c,
                      heroId: retreatHero.id,
                      onAction: widget.onAction,
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
                          ? '拖拽移动战场 · 松手短暂惯性 · 滚轮缩放 · 点击单位查看情况'
                          : '${selected.name}'
                                '${selected.isGeneral ? '  ${selected.health.label}/${selected.health.maxHp} HP' : ''}'
                                ' · 距边界 ${battleNumber(sim.distanceToWall(selected.side))} 像素',
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
