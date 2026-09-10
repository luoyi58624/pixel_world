import 'dart:ui' as ui;

import 'geometry.dart';

/// 绘制与手势边界上的坐标转换，不做缩放或世界坐标变换。
extension FlutterPointConversion on ui.Offset {
  /// 把界面位置交给游戏控制器。
  GamePoint get toGame => GamePoint(dx, dy);
}

/// 游戏坐标交给绘制引擎。
extension GamePointConversion on GamePoint {
  /// 转成绘制坐标。
  ui.Offset get toUi => ui.Offset(dx, dy);
}

/// 界面视口转换。
extension FlutterSizeConversion on ui.Size {
  /// 转成游戏视口大小。
  GameSize get toGame => GameSize(width, height);
}

/// 游戏场景尺寸转换。
extension GameSizeConversion on GameSize {
  /// 转成界面尺寸。
  ui.Size get toUi => ui.Size(width, height);
}

/// 游戏接触区域交给绘制引擎。
extension GameRectConversion on GameRect {
  /// 转成绘制矩形。
  ui.Rect get toUi => ui.Rect.fromLTRB(left, top, right, bottom);
}

/// 界面选区转换。
extension FlutterRectConversion on ui.Rect {
  /// 转成游戏矩形。
  GameRect get toGame => GameRect.fromLTRB(left, top, right, bottom);
}
