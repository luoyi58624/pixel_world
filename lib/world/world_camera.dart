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

  Offset _inertiaVelocity = Offset.zero;
  double _inertiaRemaining = 0;
  bool _dragging = false;
  static const _damping = 28.0;

  /// 当前是否仍有松手后的镜头惯性。
  bool get coasting => _inertiaRemaining > 0;

  /// 接管拖拽时立即截停旧惯性，避免指针锚点漂移。
  void beginDrag() {
    _stopInertia();
    _dragging = true;
  }

  /// 单指或鼠标拖拽松手后短暂滑行；缩放手势不产生平移惯性。
  void endDrag(Offset screenVelocity, {bool allowInertia = true}) {
    if (!_dragging) return;
    _dragging = false;
    _stopInertia();
    if (!allowInertia ||
        !screenVelocity.dx.isFinite ||
        !screenVelocity.dy.isFinite) {
      return;
    }
    final speed = screenVelocity.distance;
    if (speed < 80) return;
    final cappedSpeed = math.min(speed, 1400.0);
    _inertiaVelocity = screenVelocity / speed * cappedSpeed;
    _inertiaRemaining = math.min(0.18, math.log(cappedSpeed / 12) / _damping);
  }

  /// 按指数衰减精确积分，额外滑行不随帧率变化，碰到边界停止对应轴。
  void advanceInertia(double dt) {
    if (!coasting || !dt.isFinite || dt <= 0) return;
    final step = math.min(dt, _inertiaRemaining);
    final decay = math.exp(-_damping * step);
    final target = center - _inertiaVelocity * ((1 - decay) / _damping / scale);
    center = target;
    constrain();
    _inertiaVelocity = Offset(
      (center.dx - target.dx).abs() > 1e-8 ? 0 : _inertiaVelocity.dx * decay,
      (center.dy - target.dy).abs() > 1e-8 ? 0 : _inertiaVelocity.dy * decay,
    );
    _inertiaRemaining -= step;
    if (_inertiaRemaining < 1e-9 || _inertiaVelocity == Offset.zero) {
      _stopInertia();
    }
  }

  /// 新指令、失焦或场景切换时取消拖拽及惯性，迟到的松手事件不会重启。
  void cancelMotion() {
    _dragging = false;
    _stopInertia();
  }

  void _stopInertia() {
    _inertiaVelocity = Offset.zero;
    _inertiaRemaining = 0;
  }

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
    cancelMotion();
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
    cancelMotion();
    final anchor = toWorld(local);
    transform(anchor, value, local);
  }

  /// 应用一次同时包含平移与缩放的手势。
  void transform(Offset worldAnchor, double value, Offset local) {
    _stopInertia();
    scale = value.clamp(minScale, 6.0);
    center = worldAnchor - (local - viewport.center(Offset.zero)) / scale;
    constrain();
  }

  /// 平移屏幕距离，适用于方向键或拖动。
  void pan(Offset screenDelta) {
    cancelMotion();
    center -= screenDelta / scale;
    constrain();
  }

  /// 使整张地图居中可见。
  void overview() {
    cancelMotion();
    scale = minScale;
    center = worldSize.center(Offset.zero);
    constrain();
  }
}
