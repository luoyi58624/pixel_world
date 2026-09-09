import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import 'battle_simulation.dart';
import 'hero_sprite.dart';
import 'world_assets.dart';
import 'world_controller.dart';

/// 直接使用原 ROM 战斗图集，并缓存当前缩放下的动作帧。
class BattleArt {
  /// 引用共享资源，场景结束只释放自己生成的缩放缓存。
  BattleArt(this.assets);

  /// 已解码的原版角色和背景。
  final WorldAssets assets;
  final _frames = <(HeroAppearance?, bool, int), ui.Image>{};
  int? _size;

  /// 原版一级城用金色城墙，二至四级用青色城墙，五级用灰色城墙。
  ui.Image background(int cityLevel) =>
      assets.battleScenes[cityLevel == 1
          ? 5
          : cityLevel == 5
          ? 3
          : 4]!;

  /// 读取独立战斗图块；32 像素画布包含居中的 16 像素人物与原版武器部件。
  ui.Image sprite(
    HeroAppearance? appearance,
    bool friendly,
    int frame,
    int bodyPixelSize,
  ) {
    if (_size != bodyPixelSize) {
      for (final image in _frames.values) {
        image.dispose();
      }
      _frames.clear();
      _size = bodyPixelSize;
    }
    return _frames.putIfAbsent((appearance, friendly, frame), () {
      final role = appearance?.name ?? 'soldier';
      final sheet =
          assets.battleSprites['${role}_${friendly ? 'red' : 'blue'}']!;
      final side = bodyPixelSize * 2;
      final recorder = ui.PictureRecorder();
      Canvas(recorder).drawImageRect(
        sheet,
        Rect.fromLTWH(frame * 32, 0, 32, 32),
        Rect.fromLTWH(0, 0, side.toDouble(), side.toDouble()),
        Paint()
          ..filterQuality = FilterQuality.none
          ..isAntiAlias = false,
      );
      final picture = recorder.endRecording();
      final image = picture.toImageSync(side, side);
      picture.dispose();
      return image;
    });
  }

  /// 释放本场景的缩放帧，共享的原版图集仍由资源管理器持有。
  void dispose() {
    for (final image in _frames.values) {
      image.dispose();
    }
  }
}

/// 绘制正在后台运行的同一场战斗，包括行走、挥砍、受击与倒地。
class BattlePainter extends CustomPainter {
  /// 由地图时钟驱动绘制，面板文字另行低频更新。
  BattlePainter(
    this.controller,
    this.assets,
    this.art, {
    required this.devicePixelRatio,
    this.selectedUnitId,
  }) : super(repaint: controller);

  /// 共享游戏状态。
  final WorldController controller;

  /// 已加载的将领图集。
  final WorldAssets assets;

  /// 当前战斗场景的图形缓存。
  final BattleArt art;

  /// 屏幕像素比例。
  final double devicePixelRatio;

  /// 被点击查看的小兵或将领。
  final String? selectedUnitId;

  @override
  void paint(Canvas canvas, Size size) {
    final battle = controller.watchedBattle;
    if (battle == null) return;
    final sim = battle.simulation;
    final camera = controller.battleCamera;
    canvas.save();
    canvas.clipRect(Offset.zero & size);
    canvas.drawRect(
      Offset.zero & size,
      Paint()..color = const Color(0xff080d0c),
    );
    canvas.save();
    final origin = camera.toScreen(Offset.zero);
    canvas.translate(
      (origin.dx * devicePixelRatio).round() / devicePixelRatio,
      (origin.dy * devicePixelRatio).round() / devicePixelRatio,
    );
    canvas.scale(camera.scale);
    canvas.drawImage(
      art.background(controller.campaign.cities[battle.city.id]!.level),
      Offset.zero,
      Paint()..filterQuality = FilterQuality.none,
    );
    canvas.restore();
    final units = sim.units.toList()
      ..sort((a, b) => a.position.dy.compareTo(b.position.dy));
    for (final unit in units) {
      final dead = unit.diedAt == null ? 0.0 : sim.elapsed - unit.diedAt!;
      if (!unit.health.alive && dead > 0.65) continue;
      final hurtAge = sim.elapsed - unit.lastHitAt;
      var point = unit.renderPosition(sim.elapsed);
      if (!unit.health.alive) {
        point += Offset(
          (unit.facingRight ? -1 : 1) * dead * 22,
          -math.sin(dead / 0.65 * math.pi) * 8 + dead * 8,
        );
        point = Offset(point.dx.clamp(8.0, 248.0), point.dy);
      }
      final center = camera.toScreen(point);
      final side = math.max(1, (16 * camera.scale * devicePixelRatio).round());
      final frame = unit.animationFrame(sim.elapsed);
      final appearance = unit.side == BattleSide.attacker
          ? battle.attacker.appearance
          : battle.defender.appearance;
      final friendly =
          (unit.side == BattleSide.attacker ? battle.attacker : battle.defender)
              .isPlayer;
      final image = art.sprite(
        unit.isGeneral ? appearance : null,
        friendly,
        frame,
        side,
      );
      final alpha = unit.health.alive ? 1.0 : (1 - dead / 0.65).clamp(0.0, 1.0);
      if (unit.health.alive) {
        canvas.drawOval(
          Rect.fromCenter(
            center: center + Offset(0, 7 * camera.scale),
            width: 12 * camera.scale,
            height: 3 * camera.scale,
          ),
          Paint()..color = const Color(0x70000000),
        );
      }
      canvas.save();
      canvas.translate(
        (center.dx * devicePixelRatio).round() / devicePixelRatio,
        (center.dy * devicePixelRatio).round() / devicePixelRatio,
      );
      if (!unit.health.alive) {
        canvas.rotate((unit.facingRight ? -1 : 1) * dead * 1.4);
      }
      final imageSize = side * 2 / devicePixelRatio;
      canvas.translate(-imageSize / 2, -imageSize / 2);
      // 原版战斗图集统一朝左，左侧队伍整体镜像后朝向右侧。
      if (unit.facingRight) {
        canvas.translate(imageSize, 0);
        canvas.scale(-1, 1);
      }
      final spritePaint = Paint()
        ..filterQuality = FilterQuality.none
        ..color = Colors.white.withValues(alpha: alpha);
      if (unit.health.alive && hurtAge < 0.12) {
        spritePaint.colorFilter = const ColorFilter.mode(
          Color(0xfffff2c2),
          BlendMode.srcATop,
        );
      }
      canvas.drawImageRect(
        image,
        Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble()),
        Rect.fromLTWH(0, 0, imageSize, imageSize),
        spritePaint,
      );
      canvas.restore();
      if (!unit.health.alive) continue;
      if (unit.id == selectedUnitId) {
        canvas.drawRect(
          Rect.fromCenter(
            center: center,
            width: 20 * camera.scale,
            height: 20 * camera.scale,
          ),
          Paint()
            ..style = PaintingStyle.stroke
            ..strokeWidth = 1.5
            ..color = const Color(0xffffe29a),
        );
      }
      if (!unit.isGeneral) continue;
      final bar = Rect.fromCenter(
        center: center - Offset(0, 11 * camera.scale),
        width: 18 * camera.scale,
        height: math.max(2, 1.5 * camera.scale),
      );
      canvas.drawRect(
        bar.inflate(1),
        Paint()
          ..color = sim.atWall(unit)
              ? const Color(0xfff17153)
              : const Color(0xee050806),
      );
      canvas.drawRect(
        Rect.fromLTWH(
          bar.left,
          bar.top,
          bar.width * unit.health.hp / unit.health.maxHp,
          bar.height,
        ),
        Paint()
          ..color = unit.side == BattleSide.attacker
              ? const Color(0xffe5b963)
              : const Color(0xff939dff),
      );
    }
    for (final formation in sim.formations.values) {
      final age = sim.elapsed - formation.wallHitAt;
      if (age < 0 || age > 0.28) continue;
      final inward = formation.side == BattleSide.defender ? 1.0 : -1.0;
      final wallX = inward > 0 ? 2.0 : 254.0;
      final paint = Paint()
        ..isAntiAlias = false
        ..color = const Color(0xffffd36b).withValues(alpha: 1 - age / 0.28);
      for (final unit in sim.units.where(
        (unit) => unit.side == formation.side && unit.health.alive,
      )) {
        for (var i = 0; i < 3; i++) {
          final point = camera.toScreen(
            Offset(
              wallX + inward * age * (18 + i * 14),
              unit.position.dy - 5 + i * 5 - age * 12,
            ),
          );
          canvas.drawRect(
            Rect.fromLTWH(
              (point.dx * devicePixelRatio).round() / devicePixelRatio,
              (point.dy * devicePixelRatio).round() / devicePixelRatio,
              camera.scale,
              camera.scale,
            ),
            paint,
          );
        }
      }
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(covariant BattlePainter oldDelegate) =>
      controller != oldDelegate.controller ||
      assets != oldDelegate.assets ||
      art != oldDelegate.art ||
      selectedUnitId != oldDelegate.selectedUnitId ||
      devicePixelRatio != oldDelegate.devicePixelRatio;
}
