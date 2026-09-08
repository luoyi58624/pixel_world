import 'dart:math' as math;

import 'package:flutter/material.dart';

import 'campaign.dart';
import 'hero_sprite.dart';
import 'world_assets.dart';
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
      size.center(Offset.zero) - camera.center * camera.scale,
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
        if (c.world.displayTiles[y * c.world.width + x] == 32) {
          canvas.drawImageRect(
            assets.water,
            waterSource,
            Rect.fromLTWH(x * 16, y * 16, 16, 16),
            paint,
          );
        }
      }
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

    for (final city in c.world.cities) {
      final player = c.campaign.cities[city.id]!.isPlayer;
      final color = player ? const Color(0xffd6bd7c) : const Color(0xffe77d70);
      if (c.pendingHero != null && !player) {
        _brackets(
          canvas,
          city.bounds.inflate(2),
          color,
          1 / camera.scale + 0.5,
        );
      }
    }

    for (final march in c.campaign.marches.values) {
      if (march.phase != MarchPhase.marching) continue;
      canvas.drawLine(
        march.position,
        march.destination,
        Paint()
          ..color = const Color(0xbbe4bd7c)
          ..strokeWidth = 1,
      );
      canvas.drawRect(
        Rect.fromCenter(center: march.destination, width: 5, height: 5),
        Paint()..color = const Color(0xffe77d70),
      );
    }

    if (c.walking && !c.campaign.hasDispatched) {
      final path = Path()..moveTo(c.heroPosition.dx, c.heroPosition.dy);
      for (var n = c.routeStep; n < c.route.length; n++) {
        final point = c.route[n].center;
        path.lineTo(point.dx, point.dy);
      }
      canvas.drawPath(
        path,
        Paint()
          ..color = const Color(0xaaffefab)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 1,
      );
      final destination = c.route.last.center;
      canvas.drawRect(
        Rect.fromCenter(center: destination, width: 5, height: 5),
        Paint()..color = const Color(0xffffedbc),
      );
    }

    if (c.selectedCity case final city?) {
      _brackets(
        canvas,
        city.bounds.inflate(2),
        const Color(0xffffe5a3),
        1 / camera.scale + 0.5,
      );
    }
    if (c.cursor case final cell?) {
      final cursor = Rect.fromLTWH(cell.x * 16, cell.y * 16, 16, 16);
      final color = c.world.isWalkable(cell)
          ? const Color(0xffe6d5ff)
          : const Color(0xffed9c84);
      _brackets(canvas, cursor, color, 1);
    }

    canvas.restore();
    if (!c.campaign.hasDispatched) {
      _drawHero(
        canvas,
        size,
        c.heroPosition,
        c.direction,
        c.appearance,
        c.animationStep,
      );
    } else {
      final marches = c.campaign.marches.values.toList()
        ..sort((a, b) => a.position.dy.compareTo(b.position.dy));
      for (final march in marches) {
        _drawHero(
          canvas,
          size,
          march.position,
          march.direction,
          march.hero.appearance,
          march.animationStep,
        );
      }
    }
    canvas.restore();
  }

  void _drawHero(
    Canvas canvas,
    Size size,
    Offset position,
    HeroDirection direction,
    HeroAppearance appearance,
    int animationStep,
  ) {
    final camera = controller.camera;
    final frame = HeroAnimation.frameIndex(direction, animationStep);
    // 先合成镜头与角色的精确位置，再对齐最终屏幕像素；世界坐标取整会放大跳动。
    final heroTopLeft = _snapToPhysicalPixel(
      size.center(Offset.zero) +
          (position - camera.center + const Offset(-8, -11)) * camera.scale,
    );
    final spriteScale = camera.scale * devicePixelRatio;
    final heroImage = assets.heroFrame(
      appearance,
      frame,
      math.max(1, (16 * spriteScale).round()),
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

  void _brackets(Canvas canvas, Rect rect, Color color, double width) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = width
      ..isAntiAlias = false;
    final edge = math.min(5.0, rect.width / 3);
    for (final corner in [
      rect.topLeft,
      rect.topRight,
      rect.bottomLeft,
      rect.bottomRight,
    ]) {
      final dx = corner.dx == rect.left ? edge : -edge;
      final dy = corner.dy == rect.top ? edge : -edge;
      canvas.drawPath(
        Path()
          ..moveTo(corner.dx + dx, corner.dy)
          ..lineTo(corner.dx, corner.dy)
          ..lineTo(corner.dx, corner.dy + dy),
        paint,
      );
    }
  }

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
    final image = assets.minimaps[c.index];
    canvas.drawImageRect(
      image,
      Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble()),
      Offset.zero & size,
      Paint()..filterQuality = FilterQuality.none,
    );
    final sx = size.width / c.world.pixelSize.width;
    final sy = size.height / c.world.pixelSize.height;
    final view = c.camera.visibleWorld.intersect(
      Offset.zero & c.world.pixelSize,
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
      final point = city.bounds.center;
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
    final positions = !c.campaign.hasDispatched
        ? [c.heroPosition]
        : c.campaign.marches.values.map((march) => march.position);
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
