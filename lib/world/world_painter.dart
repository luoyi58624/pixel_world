import 'dart:math' as math;

import 'package:flutter/material.dart';

import 'world_assets.dart';
import 'world_controller.dart';

/// 使用地图缓存与少量动态精灵绘制世界，不为每个格子创建组件。
class WorldPainter extends CustomPainter {
  /// 创建由探索状态驱动的绘制层。
  WorldPainter(this.controller, this.assets) : super(repaint: controller);

  /// 当前探索状态。
  final WorldController controller;

  /// 共享图像资源。
  final WorldAssets assets;

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
    canvas.translate(
      size.width / 2 - camera.center.dx * camera.scale,
      size.height / 2 - camera.center.dy * camera.scale,
    );
    canvas.scale(camera.scale);
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

    if (c.walking) {
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

    final step = c.walking ? (c.time * 7).floor() % 2 : 0;
    final frame =
        (c.direction == 1
            ? 2
            : c.direction == 2
            ? 4
            : 0) +
        step;
    final hero = c.heroPosition;
    canvas.drawOval(
      Rect.fromCenter(center: hero + const Offset(0, 4), width: 12, height: 4),
      Paint()..color = const Color(0x55000000),
    );
    canvas.save();
    canvas.translate(hero.dx.roundToDouble(), hero.dy.roundToDouble() - 3);
    if (c.direction == 3) canvas.scale(-1, 1);
    canvas.drawImageRect(
      assets.hero,
      Rect.fromLTWH(frame * 16, 0, 16, 16),
      const Rect.fromLTWH(-8, -8, 16, 16),
      paint,
    );
    canvas.restore();
    canvas.restore();
  }

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
      oldDelegate.controller != controller || oldDelegate.assets != assets;
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
    final hero = Offset(c.heroPosition.dx * sx, c.heroPosition.dy * sy);
    canvas.drawCircle(hero, 3, Paint()..color = const Color(0xff111018));
    canvas.drawCircle(hero, 2, Paint()..color = Colors.white);
  }

  @override
  bool shouldRepaint(covariant MinimapPainter oldDelegate) =>
      oldDelegate.controller != controller || oldDelegate.assets != assets;
}
