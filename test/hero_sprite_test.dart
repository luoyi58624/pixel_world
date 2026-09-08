import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/hero_sprite.dart';

void main() {
  test('八个行军方向与屏幕坐标一致', () {
    const vectors = [
      Offset(1, 0),
      Offset(1, 1),
      Offset(0, 1),
      Offset(-1, 1),
      Offset(-1, 0),
      Offset(-1, -1),
      Offset(0, -1),
      Offset(1, -1),
    ];
    for (var n = 0; n < vectors.length; n++) {
      expect(HeroDirection.fromVector(vectors[n]), HeroDirection.values[n]);
    }
  });

  test('正背面分别播放自己的两帧，不交替切换朝向', () {
    expect(
      [
        for (var n = 0; n < 4; n++)
          HeroAnimation.frameIndex(HeroDirection.south, n),
      ],
      [0, 1, 0, 1],
    );
    expect(
      [
        for (var n = 0; n < 4; n++)
          HeroAnimation.frameIndex(HeroDirection.north, n),
      ],
      [2, 3, 2, 3],
    );
  });

  test('侧面原图朝左，向右及右斜向才整体镜像', () {
    for (final direction in [
      HeroDirection.west,
      HeroDirection.northWest,
      HeroDirection.southWest,
    ]) {
      expect(direction.mirrorHorizontally, isFalse);
      expect(HeroAnimation.frameIndex(direction, 0), 4);
      expect(HeroAnimation.frameIndex(direction, 1), 5);
    }
    for (final direction in [
      HeroDirection.east,
      HeroDirection.northEast,
      HeroDirection.southEast,
    ]) {
      expect(direction.mirrorHorizontally, isTrue);
      expect(HeroAnimation.frameIndex(direction, 0), 4);
    }
    expect(HeroDirection.north.mirrorHorizontally, isFalse);
    expect(HeroDirection.south.mirrorHorizontally, isFalse);
  });
}
