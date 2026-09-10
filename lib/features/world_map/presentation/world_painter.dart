import 'package:pixel_world/core/geometry/flutter_geometry.dart';

import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../campaign/domain/campaign.dart';
import '../../heroes/domain/hero_sprite.dart';
import '../data/world_assets.dart';
import 'world_controller.dart';

/// 使用地图缓存与少量动态精灵绘制世界，不为每个格子创建组件。
class WorldPainter extends CustomPainter {
  /// 创建由探索状态驱动的绘制层。
  WorldPainter(this.controller, this.assets, {this.devicePixelRatio = 1})
    : super(repaint: controller);

  /// 当前探索状态。
  final WorldController controller;

  /// 共享图像资源。
  final WorldAssets assets;

  /// 屏幕物理像素比例，仅用于最终绘制对齐，不改变世界坐标。
  final double devicePixelRatio;

  @override
  void paint(Canvas canvas, Size size) {
    final c = controller;
    final camera = c.camera;
    final paint = Paint()
      ..filterQuality = FilterQuality.none
      ..isAntiAlias = false;
    // 绘制范围必须限定在本控件内，避免清屏操作覆盖先绘制的工具栏。
    canvas.drawRect(
      Offset.zero & size,
      Paint()..color = const Color(0xff080d09),
    );
    canvas.save();
    canvas.clipRect(Offset.zero & size);
    // 在物理像素空间绘制，避免 DPR 往返换算使最近邻采样落在边界两侧。
    canvas.scale(1 / devicePixelRatio);
    canvas.save();
    // 地图与水面共用对齐后的屏幕原点，防止平移时纹理在子像素之间反复采样。
    final origin = _snapToPhysicalPixel(
      size.center(Offset.zero) - (camera.center * camera.scale).toUi,
    );
    canvas.translate(origin.dx, origin.dy);
    canvas.scale(camera.scale * devicePixelRatio);
    canvas.drawImage(assets.scenes[c.index], Offset.zero, paint);

    final visible = camera.visibleWorld;
    final left = math.max(0, (visible.left / 16).floor());
    final top = math.max(0, (visible.top / 16).floor());
    final right = math.min(c.world.width, (visible.right / 16).ceil());
    final bottom = math.min(c.world.height, (visible.bottom / 16).ceil());
    final waterFrame = (c.time * 3).floor() % 4;
    final waterSource = Rect.fromLTWH(waterFrame * 16, 0, 16, 16);
    for (var y = top; y < bottom; y++) {
      for (var x = left; x < right; x++) {
        if (c.world.terrain[y * c.world.width + x] == 32) {
          canvas.drawImageRect(
            assets.water,
            waterSource,
            Rect.fromLTWH(x * 16, y * 16, 16, 16),
            paint,
          );
        }
      }
    }

    for (final city in c.world.cities) {
      final bounds = c.campaign.cityBounds(city);
      if (!visible.overlaps(bounds)) continue;
      canvas.drawImage(
        assets.cityImage(city, c.campaign.cities[city.id]!.level),
        (bounds.topLeft).toUi,
        paint,
      );
    }

    if (c.showGrid) {
      final line = Paint()
        ..color = const Color(0x50000000)
        ..strokeWidth = 1 / camera.scale;
      for (var x = left; x <= right; x++) {
        canvas.drawLine(
          Offset(x * 16, top * 16),
          Offset(x * 16, bottom * 16),
          line,
        );
      }
      for (var y = top; y <= bottom; y++) {
        canvas.drawLine(
          Offset(left * 16, y * 16),
          Offset(right * 16, y * 16),
          line,
        );
      }
    }

    canvas.restore();
    {
      final marches = c.campaign.marches.values.toList()
        ..sort((a, b) => a.position.dy.compareTo(b.position.dy));
      for (final march in marches) {
        if (!march.visibleOnMap) continue;
        if (march.phase == MarchPhase.camped) {
          _drawCamp(canvas, size, (march.position).toUi);
        } else {
          _drawHero(
            canvas,
            size,
            (march.position).toUi,
            march.direction,
            march.hero.appearance,
            march.animationStep,
            friendly: march.hero.isPlayer,
          );
        }
      }
    }
    for (final battle in c.campaign.allBattles) {
      if (battle.isActive) _drawBattle(canvas, battle);
    }
    canvas.restore();
  }

  void _drawCamp(Canvas canvas, Size size, Offset position) {
    final camera = controller.camera;
    final topLeft = _snapToPhysicalPixel(
      size.center(Offset.zero) +
          (position - (camera.center).toUi - const Offset(8, 8)) * camera.scale,
    );
    canvas.save();
    canvas.translate(topLeft.dx, topLeft.dy);
    canvas.scale(camera.scale * devicePixelRatio);
    final paint = Paint()..isAntiAlias = false;
    // 按参考图的 16×16 格式画屋顶、墙体与门柱，营地沿用部队的中心和点击范围。
    canvas.drawRect(
      const Rect.fromLTWH(0, 0, 16, 16),
      paint..color = const Color(0xff000000),
    );
    canvas.drawRect(
      const Rect.fromLTWH(1, 1, 14, 7),
      paint..color = const Color(0xffea9e22),
    );
    canvas.drawRect(
      const Rect.fromLTWH(1, 9, 14, 6),
      paint..color = const Color(0xff333500),
    );
    canvas.drawRect(
      const Rect.fromLTWH(2, 10, 12, 3),
      paint..color = const Color(0xff000000),
    );
    for (final x in [4.0, 9.0]) {
      canvas.drawRect(
        Rect.fromLTWH(x, 11, 1, 4),
        paint..color = const Color(0xff000000),
      );
      canvas.drawRect(
        Rect.fromLTWH(x + 1, 11, 1, 4),
        paint..color = const Color(0xffea9e22),
      );
    }
    canvas.restore();
  }

  void _drawBattle(Canvas canvas, WorldBattle battle) {
    final center = controller.battleMarkerBounds(battle).center;
    canvas.save();
    canvas.translate(
      center.dx * devicePixelRatio,
      center.dy * devicePixelRatio,
    );
    canvas.scale(devicePixelRatio);
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        const Rect.fromLTWH(-20, -18, 40, 36),
        const Radius.circular(4),
      ),
      Paint()..color = const Color(0xeb141b17),
    );
    final swing = math.sin(controller.time * 10) * 0.25;
    for (final side in [-1.0, 1.0]) {
      canvas.save();
      canvas.rotate(side * (0.65 + swing));
      canvas.drawPath(
        Path()
          ..moveTo(0, -14)
          ..lineTo(3, -9)
          ..lineTo(3, 6)
          ..lineTo(-3, 6)
          ..lineTo(-3, -9)
          ..close(),
        Paint()
          ..color = side < 0
              ? const Color(0xffece7d1)
              : const Color(0xffb4c6d2),
      );
      canvas.drawRect(
        const Rect.fromLTWH(-6, 5, 12, 3),
        Paint()..color = const Color(0xffd6bd7c),
      );
      canvas.drawRect(
        const Rect.fromLTWH(-2, 8, 4, 7),
        Paint()..color = const Color(0xff9b7346),
      );
      canvas.restore();
    }
    if (swing > 0.12) {
      final spark = Paint()
        ..color = const Color(0xffffd763)
        ..strokeWidth = 2;
      canvas.drawLine(const Offset(-3, -16), const Offset(-5, -20), spark);
      canvas.drawLine(const Offset(3, -16), const Offset(5, -20), spark);
    }
    canvas.restore();
  }

  void _drawHero(
    Canvas canvas,
    Size size,
    Offset position,
    HeroDirection direction,
    HeroAppearance appearance,
    int animationStep, {
    bool friendly = false,
  }) {
    final camera = controller.camera;
    final frame = HeroAnimation.frameIndex(direction, animationStep);
    // 先合成镜头与角色的精确位置，再对齐最终屏幕像素；世界坐标取整会放大跳动。
    final heroTopLeft = _snapToPhysicalPixel(
      size.center(Offset.zero) +
          (position - (camera.center).toUi + const Offset(-8, -8)) *
              camera.scale,
    );
    final spriteScale = camera.scale * devicePixelRatio;
    final heroImage = assets.heroFrame(
      appearance,
      frame,
      math.max(1, (16 * spriteScale).round()),
      friendly: friendly,
    );
    canvas.drawOval(
      Rect.fromCenter(
        center: heroTopLeft + const Offset(8, 15) * spriteScale,
        width: 12 * spriteScale,
        height: 4 * spriteScale,
      ),
      Paint()..color = const Color(0x55000000),
    );
    canvas.save();
    canvas.translate(heroTopLeft.dx, heroTopLeft.dy);
    if (direction.mirrorHorizontally) {
      canvas.translate(heroImage.width.toDouble(), 0);
      canvas.scale(-1, 1);
    }
    canvas.drawImage(
      heroImage,
      Offset.zero,
      Paint()
        ..filterQuality = FilterQuality.none
        ..isAntiAlias = false,
    );
    canvas.restore();
  }

  Offset _snapToPhysicalPixel(Offset position) => Offset(
    (position.dx * devicePixelRatio).roundToDouble(),
    (position.dy * devicePixelRatio).roundToDouble(),
  );

  @override
  bool shouldRepaint(covariant WorldPainter oldDelegate) =>
      oldDelegate.controller != controller ||
      oldDelegate.assets != assets ||
      oldDelegate.devicePixelRatio != devicePixelRatio;
}

/// 显示整个世界、当前镜头范围和角色位置。
class MinimapPainter extends CustomPainter {
  /// 创建跟随探索状态更新的小地图。
  MinimapPainter(this.controller, this.assets) : super(repaint: controller);

  /// 当前探索状态。
  final WorldController controller;

  /// 小地图图像。
  final WorldAssets assets;

  @override
  void paint(Canvas canvas, Size size) {
    final c = controller;
    final image = assets.scenes[c.index];
    canvas.drawImageRect(
      image,
      Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble()),
      Offset.zero & size,
      Paint()..filterQuality = FilterQuality.none,
    );
    final sx = size.width / c.world.pixelSize.width;
    final sy = size.height / c.world.pixelSize.height;
    final view = c.camera.visibleWorld.toUi.intersect(
      Offset.zero & (c.world.pixelSize).toUi,
    );
    canvas.drawRect(
      Rect.fromLTRB(
        view.left * sx,
        view.top * sy,
        view.right * sx,
        view.bottom * sy,
      ),
      Paint()
        ..color = const Color(0xffffe5a3)
        ..strokeWidth = 1.5
        ..style = PaintingStyle.stroke,
    );
    for (final city in c.world.cities) {
      final point = c.campaign.cityBounds(city).center;
      canvas.drawImageRect(
        assets.flags,
        Rect.fromLTWH(c.campaign.cities[city.id]!.ownerCountryId * 8, 0, 8, 8),
        Rect.fromCenter(
          center: Offset(point.dx * sx, point.dy * sy),
          width: 12,
          height: 12,
        ),
        Paint()
          ..filterQuality = FilterQuality.none
          ..isAntiAlias = false,
      );
    }
    final positions = [
      ...c.campaign.marches.values
          .where((march) => march.visibleOnMap)
          .map((march) => march.position),
    ];
    for (final position in positions) {
      final hero = Offset(position.dx * sx, position.dy * sy);
      canvas.drawCircle(hero, 3, Paint()..color = const Color(0xff111018));
      canvas.drawCircle(hero, 2, Paint()..color = Colors.white);
    }
  }

  @override
  bool shouldRepaint(covariant MinimapPainter oldDelegate) =>
      oldDelegate.controller != controller || oldDelegate.assets != assets;
}
