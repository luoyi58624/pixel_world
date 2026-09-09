import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/world_camera.dart';

WorldCamera _camera([double scale = 3]) => WorldCamera(const Size(1024, 960))
  ..center = const Offset(512, 480)
  ..resize(const Size(800, 600))
  ..scale = scale;

void _fling(WorldCamera camera, Offset velocity) {
  camera.beginDrag();
  camera.endDrag(velocity);
}

void main() {
  test('松手延续拖动方向，高阻尼快速停住，额外位移不超过50屏幕像素', () {
    final camera = _camera();
    final start = camera.center;
    _fling(camera, const Offset(-10000, 0));
    camera.advanceInertia(0.02);
    final first = camera.center.dx - start.dx;
    expect(first, greaterThan(0));
    camera.advanceInertia(0.02);
    final second = camera.center.dx - start.dx - first;
    expect(second, inExclusiveRange(0, first));
    camera.advanceInertia(0.14);
    expect(camera.coasting, isFalse);
    expect((camera.center - start).distance * camera.scale, lessThan(50));
    final stopped = camera.center;
    camera.advanceInertia(10);
    expect(camera.center, stopped);
  });

  test('惯性总位移不依赖帧率，缩放后保持相同屏幕滑行距离', () {
    double? distance;
    for (final scale in [1.0, 3.0, 6.0]) {
      for (final frames in [1, 10, 60]) {
        final camera = _camera(scale);
        final start = camera.center;
        _fling(camera, const Offset(600, -800));
        for (var i = 0; i < frames; i++) {
          camera.advanceInertia(0.3 / frames);
        }
        final moved = (camera.center - start).distance * scale;
        distance ??= moved;
        expect(moved, closeTo(distance, 1e-8));
        expect(camera.coasting, isFalse);
      }
    }
  });

  test('碰到边缘停止对应方向，不越界；全图时不会晃动', () {
    final camera = _camera();
    camera.center = Offset(camera.visibleWorld.width / 2 + 1, 480);
    _fling(camera, const Offset(1200, 0));
    camera.advanceInertia(0.02);
    expect(camera.visibleWorld.left, closeTo(0, 1e-8));
    expect(camera.coasting, isFalse);
    camera.overview();
    final overview = camera.center;
    _fling(camera, const Offset(-1000, -500));
    camera.advanceInertia(0.3);
    expect(camera.center, overview);
    expect(camera.coasting, isFalse);
  });

  test('重新按住立即接管，取消后的迟到松手不重启惯性', () {
    final camera = _camera();
    _fling(camera, const Offset(-1000, 0));
    camera.advanceInertia(0.02);
    final held = camera.center;
    camera.beginDrag();
    camera.advanceInertia(0.3);
    expect(camera.center, held);
    camera.cancelMotion();
    camera.endDrag(const Offset(-1000, 0));
    expect(camera.coasting, isFalse);
  });

  test('慢放、缩放手势、无效速度均不惯性，缩放或键盘接管时截停旧惯性', () {
    final camera = _camera();
    for (final velocity in [
      Offset.zero,
      const Offset(30, 20),
      const Offset(double.nan, 0),
    ]) {
      _fling(camera, velocity);
      expect(camera.coasting, isFalse);
    }
    camera.beginDrag();
    camera.endDrag(const Offset(1000, 0), allowInertia: false);
    expect(camera.coasting, isFalse);
    _fling(camera, const Offset(1000, 0));
    camera.zoomTo(4, const Offset(400, 300));
    expect(camera.coasting, isFalse);
    _fling(camera, const Offset(1000, 0));
    camera.pan(const Offset(10, 0));
    expect(camera.coasting, isFalse);
  });
}
