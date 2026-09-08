import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import 'battle_simulation.dart';
import 'hero_sprite.dart';
import 'world_assets.dart';
import 'world_controller.dart';

/// 城内战场的静态背景与独立小兵帧缓存，离开场景后统一释放。
class BattleArt {
  /// 按参考视频制作砖地、城墙、窗帘与前景栏杆。
  BattleArt() {
    final recorder = ui.PictureRecorder();
    final canvas = Canvas(recorder);
    final paint = Paint()..isAntiAlias = false;
    void block(double x, double y, double w, double h, int color) =>
        canvas.drawRect(Rect.fromLTWH(x, y, w, h), paint..color = Color(color));
    block(0, 0, 384, 224, 0xff05090a);
    for (var y = 0; y < 64; y += 4) {
      for (var x = 0; x < 384; x += 8) {
        block(
          (x + (y % 8 == 0 ? 2 : 0)).toDouble(),
          y.toDouble(),
          5,
          2,
          (x + y) % 3 == 0 ? 0xff174449 : 0xff102a30,
        );
      }
    }
    for (var n = 0; n < 4; n++) {
      final x = n * 96.0;
      block(x + 14, 0, 3, 64, 0xff14343a);
      block(x + 18, 0, 1, 64, 0xff215459);
      block(x + 31, 0, 52, 40, 0xff9a912a);
      block(x + 33, 0, 48, 37, 0xffdfbafb);
      block(x + 32, 38, 50, 2, 0xffd4c74d);
      for (var j = 0; j < 12; j++) {
        block(x + 34 + j * 4, 36, 1, 3, 0xffead96e);
      }
      block(x + 3, 6, 2, 5, 0xffc5b943);
      block(x + 3, 5, 1, 3, 0xfffff0a1);
    }
    block(0, 64, 384, 144, 0xff0e230d);
    for (var row = 0; row < 18; row++) {
      for (var col = -1; col < 25; col++) {
        final x = col * 16.0 + (row.isOdd ? 8 : 0);
        final y = 64 + row * 8.0;
        block(x, y, 14, 5, (row + col) % 3 == 0 ? 0xff686c59 : 0xff535c4c);
        block(x + 1, y, 12, 1, 0xff858572);
        block(x, y + 5, 12, 2, 0xff18390f);
        block(x + 12, y + 2, 2, 3, 0xff142619);
      }
    }
    block(0, 208, 384, 16, 0xff030b06);
    for (var y = 64; y < 208; y += 8) {
      block(0, y.toDouble(), 8, 7, 0xff343e36);
      block(376, y.toDouble(), 8, 7, 0xff343e36);
      block(7, y.toDouble(), 1, 7, 0xff8a8d73);
      block(376, y.toDouble(), 1, 7, 0xff8a8d73);
    }
    for (var x = 0; x < 384; x += 16) {
      block(x.toDouble(), 208, 15, 2, 0xff81846d);
      block(x.toDouble(), 210, 2, 10, 0xff3a503c);
      block(x + 3.0, 217, 10, 2, 0xff2f5a29);
      for (var j = 4; j < 13; j += 3) {
        block(x + j.toDouble(), 211, 1, 5, 0xff263b2c);
      }
    }
    final picture = recorder.endRecording();
    background = picture.toImageSync(384, 224);
    picture.dispose();
  }

  /// 一次绘制的背景纹理。
  late final ui.Image background;
  final _soldiers = <(BattleSide, int, int), ui.Image>{};
  final _numbers = <double, TextPainter>{};
  int? _size;

  /// 小兵有独立头盔、制服和两帧步态，按物理尺寸缓存以保持像素稳定。
  ui.Image soldier(BattleSide side, int frame, int size) {
    if (_size != size) {
      for (final image in _soldiers.values) {
        image.dispose();
      }
      _soldiers.clear();
      _size = size;
    }
    return _soldiers.putIfAbsent((side, frame, size), () {
      final rows = [
        '................',
        '.....kkkk.......',
        '....khhhhk......',
        '....khhhhk......',
        '....khhhhfkk....',
        '....kkkffkk.....',
        '.....kfffk......',
        '.....kbbbk......',
        '....kbllbbk.....',
        '...ksbblbbfk....',
        '...kkkkbbkk.....',
        '.....kbkkbk.....',
        if (frame == 0) ...[
          '....kbbkkbk.....',
          '....kbb..kbk....',
          '...kkk...kkk....',
        ] else ...[
          '.....kbkkbbk....',
          '.....kbk.kbbk...',
          '.....kkk..kkk...',
        ],
        '................',
      ];
      final red = side == BattleSide.attacker;
      final palette = <String, Color>{
        'k': const Color(0xff090905),
        'h': Color(red ? 0xffea9e22 : 0xffa29b31),
        'f': const Color(0xffffddbb),
        'b': Color(red ? 0xffb53120 : 0xff4240ff),
        'l': Color(red ? 0xffec8663 : 0xffc5bfff),
        's': const Color(0xffc5d4d2),
      };
      final recorder = ui.PictureRecorder();
      final canvas = Canvas(recorder)..scale(size / 16);
      final paint = Paint()..isAntiAlias = false;
      for (var y = 0; y < rows.length; y++) {
        for (var x = 0; x < rows[y].length; x++) {
          final color = palette[rows[y][x]];
          if (color != null) {
            canvas.drawRect(
              Rect.fromLTWH(x.toDouble(), y.toDouble(), 1, 1),
              paint..color = color,
            );
          }
        }
      }
      final picture = recorder.endRecording();
      final image = picture.toImageSync(size, size);
      picture.dispose();
      return image;
    });
  }

  /// 缓存实际伤害数字的排版，不在每一帧重新生成文字。
  TextPainter damage(double value) => _numbers.putIfAbsent(
    value,
    () => TextPainter(
      text: TextSpan(
        text: '-${battleNumber(value)}',
        style: const TextStyle(
          fontSize: 12,
          fontFamily: 'Microsoft YaHei',
          fontWeight: FontWeight.bold,
          color: Color(0xffffefb1),
          shadows: [
            Shadow(color: Colors.black, offset: Offset(1, 1), blurRadius: 2),
          ],
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout(),
  );

  /// 释放背景、小兵帧与伤害文字缓存。
  void dispose() {
    background.dispose();
    for (final image in _soldiers.values) {
      image.dispose();
    }
    for (final text in _numbers.values) {
      text.dispose();
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
      art.background,
      Offset.zero,
      Paint()..filterQuality = FilterQuality.none,
    );
    canvas.restore();
    final units = sim.units.toList()
      ..sort((a, b) => a.position.dy.compareTo(b.position.dy));
    for (final unit in units) {
      final dead = unit.diedAt == null ? 0.0 : sim.elapsed - unit.diedAt!;
      if (!unit.health.alive && dead > 0.65) continue;
      final attackAge = sim.elapsed - unit.lastAttackAt;
      final hurtAge = sim.elapsed - unit.lastHitAt;
      var point = unit.position;
      if (attackAge < 0.36) {
        point +=
            unit.strikeDirection * math.sin(attackAge / 0.36 * math.pi) * 4;
      }
      if (hurtAge < 0.25) {
        point +=
            Offset(unit.facingRight ? -2 : 2, 0) *
            math.sin(hurtAge / 0.25 * math.pi);
      }
      if (!unit.health.alive) {
        point += Offset(
          (unit.facingRight ? -1 : 1) * dead * 22,
          -math.sin(dead / 0.65 * math.pi) * 8 + dead * 8,
        );
      }
      final center = camera.toScreen(point);
      final side = math.max(1, (16 * camera.scale * devicePixelRatio).round());
      final frame = unit.moving ? (unit.walkDistance / 5).floor() % 2 : 0;
      final facing = unit.facingRight ? HeroDirection.east : HeroDirection.west;
      final appearance = unit.side == BattleSide.attacker
          ? battle.attacker.appearance
          : battle.defender.appearance;
      final image = unit.isGeneral
          ? assets.heroFrame(
              appearance,
              HeroAnimation.frameIndex(facing, frame),
              side,
            )
          : art.soldier(unit.side, frame, side);
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
      final imageSize = side / devicePixelRatio;
      canvas.translate(-imageSize / 2, -imageSize / 2);
      // 原将领图集朝左，小兵图集朝右，二者使用各自的镜像规则。
      if (unit.isGeneral ? unit.facingRight : !unit.facingRight) {
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
        Rect.fromLTWH(0, 0, side.toDouble(), side.toDouble()),
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
      if (attackAge < 0.25) {
        final direction = unit.strikeDirection;
        final normal = Offset(-direction.dy, direction.dx);
        final hand = center + direction * 6 * camera.scale;
        final tip =
            hand +
            (direction * 10 + normal * (attackAge * 40 - 5)) * camera.scale;
        canvas.drawLine(
          hand,
          tip,
          Paint()
            ..strokeWidth = 2 * camera.scale
            ..color = const Color(0xffe4e6c9),
        );
        canvas.drawLine(
          hand - normal * 2 * camera.scale,
          hand + normal * 2 * camera.scale,
          Paint()
            ..strokeWidth = 2 * camera.scale
            ..color = const Color(0xffdca338),
        );
      }
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
    for (final hit in sim.hits) {
      final age = sim.elapsed - hit.at;
      if (age > 0.9) continue;
      final position =
          camera.toScreen(hit.position) -
          Offset(0, 18 * camera.scale + age * 24);
      final text = art.damage(hit.damage);
      text.paint(canvas, position - Offset(text.width / 2, 0));
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
