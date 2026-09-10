import 'dart:math' as math;

import '../../../core/geometry/geometry.dart';

import '../../../core/config/game_config.dart';

/// 根据实际行军向量区分八个朝向，图片朝向与镜头移动无关。
enum HeroDirection {
  /// 向右。
  east,

  /// 向右下。
  southEast,

  /// 向下。
  south,

  /// 向左下。
  southWest,

  /// 向左。
  west,

  /// 向左上。
  northWest,

  /// 向上。
  north,

  /// 向右上。
  northEast;

  /// 根据非零位移选取最接近的八方向朝向。
  static HeroDirection fromVector(GamePoint vector) {
    if (vector == GamePoint.zero) throw ArgumentError('静止时应保留上一次朝向');
    final sector = (math.atan2(vector.dy, vector.dx) / (math.pi / 4)).round();
    return values[(sector + 8) % 8];
  }

  /// 原侧面素材朝左，右向及右斜向行军时整体镜像。
  bool get mirrorHorizontally =>
      this == east || this == southEast || this == northEast;
}

/// 每种英雄独立使用一张六帧图集，切换外观不改变行军状态。
enum HeroAppearance {
  /// 高级将领使用的蓝黄配色。
  advanced('高级将领', 'advanced'),

  /// 浅色下装的普通英雄。
  normal('普通将领', 'normal'),

  /// 主角独有的橙金头部、红褐衣服及动作图块。
  protagonist('主角', 'protagonist');

  const HeroAppearance(this.label, this.assetName);

  /// 界面中的角色名称。
  final String label;

  /// hero 目录内的图集文件名，不含扩展名。
  final String assetName;
}

/// 六帧图集的统一顺序：正面两帧、背面两帧、左侧面两帧。
abstract final class HeroAnimation {
  /// 按移动方向选择动画帧，斜向复用侧面，局部翻转已在导出时处理。
  static int frameIndex(HeroDirection direction, int step) {
    final first = switch (direction) {
      HeroDirection.south => 0,
      HeroDirection.north => 2,
      _ => 4,
    };
    return first + step % 2;
  }

  /// 返回固定 16×16 图格的纹理区域。
  static GameRect sourceRect(HeroDirection direction, int step) =>
      GameRect.fromLTWH(frameIndex(direction, step) * 16, 0, 16, 16);
}

/// 地图行走的两帧时钟，只累计行走时间，不读取距离或地形。
class HeroWalkAnimation {
  double _time = 0;

  /// 当前步态时钟，存档与回放使用同一个时间位置。
  double get savedTime => _time;

  /// 恢复步态时钟，不推进角色位置。
  void restoreTime(double value) => _time = value;

  /// 当前步态；微小容差避免累加误差让整帧边界晚切换一次。
  int get step => (_time / GameConfig.heroWalkFrameSeconds + 1e-9).floor() % 2;

  /// 推进行走时间，忽略无效间隔并把累计值限制在一个循环内。
  void advance(double seconds) {
    if (!seconds.isFinite || seconds <= 0) return;
    _time = (_time + seconds) % (GameConfig.heroWalkFrameSeconds * 2);
  }

  /// 新一段行走从站立步态开始。
  void reset() => _time = 0;
}
