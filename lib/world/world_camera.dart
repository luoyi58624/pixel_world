import 'dart:math' as math;
import 'dart:ui';

/// 独立的地图镜头，负责坐标转换、缩放锚点与边界限制。
class WorldCamera {
  /// 创建使用原生地图像素的镜头。
  WorldCamera(this.worldSize);

  /// 世界尺寸。
  Size worldSize;

  /// 当前可见区域的逻辑尺寸。
  Size viewport = Size.zero;

  /// 世界中的镜头中心。
  Offset center = Offset.zero;

  /// 原生地图像素到逻辑像素的放大倍数。
  double scale = 3;

  /// 可完整查看地图的最小倍率。
  double get minScale => viewport.isEmpty
      ? 0.25
      : math
            .min(
              viewport.width / worldSize.width,
              viewport.height / worldSize.height,
            )
            .clamp(0.2, 3.0);

  /// 当前镜头在世界中覆盖的矩形。
  Rect get visibleWorld => Rect.fromCenter(
    center: center,
    width: viewport.width / scale,
    height: viewport.height / scale,
  );

  /// 将屏幕局部坐标转为世界坐标。
  Offset toWorld(Offset local) =>
      center + (local - viewport.center(Offset.zero)) / scale;

  /// 将世界坐标转为屏幕局部坐标。
  Offset toScreen(Offset world) =>
      (world - center) * scale + viewport.center(Offset.zero);

  /// 更新视口并保持镜头位于合法范围。
  void resize(Size value) {
    viewport = value;
    scale = scale.clamp(minScale, 6.0);
    constrain();
  }

  /// 将镜头限制在地图边界内，地图较小时居中显示。
  void constrain() {
    double axis(double value, double world, double screen) {
      final half = screen / scale / 2;
      return half * 2 >= world ? world / 2 : value.clamp(half, world - half);
    }

    center = Offset(
      axis(center.dx, worldSize.width, viewport.width),
      axis(center.dy, worldSize.height, viewport.height),
    );
  }

  /// 以指定屏幕位置为锚点设置缩放倍率。
  void zoomTo(double value, Offset local) {
    final anchor = toWorld(local);
    transform(anchor, value, local);
  }

  /// 应用一次同时包含平移与缩放的手势。
  void transform(Offset worldAnchor, double value, Offset local) {
    scale = value.clamp(minScale, 6.0);
    center = worldAnchor - (local - viewport.center(Offset.zero)) / scale;
    constrain();
  }

  /// 平移屏幕距离，适用于方向键或拖动。
  void pan(Offset screenDelta) {
    center -= screenDelta / scale;
    constrain();
  }

  /// 使整张地图居中可见。
  void overview() {
    scale = minScale;
    center = worldSize.center(Offset.zero);
    constrain();
  }
}
