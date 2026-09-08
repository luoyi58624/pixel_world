import 'dart:ui' as ui;

import 'package:flutter/material.dart';

/// 显示原版国旗图块，面板不使用地图缓存，避免不同显示尺寸互相清空缓存。
class CountryFlag extends StatelessWidget {
  /// 用国家编号从共享国旗图集中选择图案。
  const CountryFlag({
    super.key,
    required this.image,
    required this.countryId,
    required this.countryName,
    this.size = 28,
  });

  /// 全部国旗组成的横排图集。
  final ui.Image image;

  /// 当前占领国家的编号。
  final int countryId;

  /// 用于无障碍说明的国名。
  final String countryName;

  /// 显示尺寸，单位为逻辑像素。
  final double size;

  @override
  Widget build(BuildContext context) => Semantics(
    label: '$countryName国旗',
    image: true,
    child: CustomPaint(
      size: Size.square(size),
      painter: _FlagPainter(image, countryId),
    ),
  );
}

class _FlagPainter extends CustomPainter {
  _FlagPainter(this.image, this.countryId);
  final ui.Image image;
  final int countryId;
  @override
  void paint(Canvas canvas, Size size) => canvas.drawImageRect(
    image,
    Rect.fromLTWH(countryId * 8, 0, 8, 8),
    Offset.zero & size,
    Paint()
      ..filterQuality = FilterQuality.none
      ..isAntiAlias = false,
  );
  @override
  bool shouldRepaint(_FlagPainter oldDelegate) =>
      image != oldDelegate.image || countryId != oldDelegate.countryId;
}
