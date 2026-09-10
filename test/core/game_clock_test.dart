import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/time/game_clock.dart';

void main() {
  for (final speed in GameClock.speeds) {
    test('$speed倍速保持固定步长，一秒实时时间对应$speed秒游戏', () {
      final clock = GameClock()..speed = speed;
      var steps = 0;
      for (var i = 0; i < 60; i++) {
        clock.advance(1 / 60, (dt) {
          expect(dt, GameClock.fixedStep);
          steps++;
        });
      }
      expect(steps, speed * 60);
      expect(clock.elapsed, closeTo(speed, 1e-8));
    });
  }
  test('卡顿补帧有预算，暂停丢弃待补时间，改倍速不额外推进', () {
    final clock = GameClock()..speed = 16;
    var steps = 0;
    clock.advance(1, (_) => steps++);
    expect(steps, 60);
    expect(clock.pending, closeTo(15, 1e-8));
    clock.clearPending();
    clock.speed = 2;
    clock.advance(0, (_) => steps++);
    expect(steps, 60);
    clock.advance(double.nan, (_) => fail('不能推进无效时间'));
    expect(() => clock.speed = 3, throwsArgumentError);
  });
}
