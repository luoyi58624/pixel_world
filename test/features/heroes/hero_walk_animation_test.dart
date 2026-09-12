import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/domain/hero_sprite.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

WorldDefinition _world(int terrain, {bool mixed = false}) =>
    WorldDefinition.fromJson(
      {
        'id': 0,
        'width': 80,
        'height': 20,
        'tiles': List.generate(
          1600,
          (n) => mixed && n % 80 >= 12 ? 1 : terrain,
        ),
        'cities': [
          {
            'id': 0,
            'x': 0,
            'y': 0,
            'width': 1,
            'height': 1,
            'shape': [terrain],
            'unitIds': [0],
          },
        ],
      },
      [0, 1, 2, 3],
    );

HeroMarch _march({int country = 0, GamePoint start = const GamePoint(160, 160)}) {
  final hero = CampaignHero.fromRom(
    RomHeroDefinition.fromJson({
      'id': 0,
      'name': '测试将领',
      'type': 'advanced',
      'maxHp': 95,
      'combat': 15,
      'politics': 15,
      'salary': 8,
    }),
    cityId: 0,
    countryId: country,
  );
  final march = HeroMarch(
    hero: hero,
    position: start,
    destination: const GamePoint(1000, 160),
  );
  march.moveTo(march.destination);
  return march;
}

void main() {
  for (final country in [0, 1]) {
    test('国家 $country 在草地、河流、山地和建筑上步态同频，位移仍按地形减速', () {
      for (final entry in {0: 0.75, 1: 0.4, 2: 0.2, 3: 1.0}.entries) {
        final world = _world(entry.key);
        final march = _march(country: country);
        final start = march.position;
        final steps = [march.animationStep];
        for (var i = 0; i < 6; i++) {
          march.tick(world, 0.1);
          steps.add(march.animationStep);
        }
        expect(steps, [0, 0, 1, 1, 0, 0, 1]);
        expect(march.phase, MarchPhase.marching);
        expect(
          (march.position - start).distance,
          closeTo(22 * entry.value * 0.6, 1e-7),
        );
      }
    });
  }

  test('帧长改变不改变换帧时刻，行军距离数据不再驱动动画', () {
    final world = _world(2);
    for (final chunks in [1, 2, 12, 24, 60]) {
      final march = _march();
      for (final step in [1, 0, 1, 0]) {
        for (var i = 0; i < chunks; i++) {
          march.tick(world, 0.2 / chunks);
        }
        expect(march.animationStep, step);
      }
      march.walkDistance = 999999;
      expect(march.animationStep, 0);
      march.tick(world, 0.2);
      expect(march.animationStep, 1);
    }
  });

  test('跨越河岸和途中改道保持时钟连续，不随速度切换而重置', () {
    final mixed = _world(0, mixed: true), grass = _world(0);
    final a = _march(start: const GamePoint(180, 160));
    final b = _march(start: const GamePoint(180, 160));
    for (var i = 0; i < 13; i++) {
      a.tick(mixed, 0.1);
      b.tick(grass, 0.1);
      expect(a.animationStep, b.animationStep);
    }
    expect(a.position.dx, greaterThan(192));
    expect(a.position.dx, lessThan(b.position.dx));
    a.moveTo(const GamePoint(100, 160));
    a.tick(mixed, 0.1);
    expect(a.direction, HeroDirection.west);
    expect(a.animationStep, 1);
  });

  test('停止、到达、待战和交战不播放步态，再出发从第一帧开始', () {
    final world = _world(0);
    final march = _march();
    march.tick(world, 0.3);
    expect(march.animationStep, 1);
    march.camp();
    march.tick(world, 20);
    expect(march.animationStep, 0);
    march.moveTo(const GamePoint(1000, 160));
    march.tick(world, 0.1);
    expect(march.animationStep, 0);
    march.tick(world, 0.1);
    expect(march.animationStep, 1);
    march.moveTo(march.position + const GamePoint(0.1, 0));
    march.tick(world, 3);
    expect(march.phase, MarchPhase.camped);
    expect(march.animationStep, 0);
    for (final phase in [
      MarchPhase.awaitingBattle,
      MarchPhase.fighting,
      MarchPhase.dueling,
    ]) {
      march.phase = phase;
      march.tick(world, 10);
      expect(march.animationStep, 0);
      march.moveTo(const GamePoint(1000, 160));
      march.tick(world, 0.2);
      expect(march.animationStep, 1);
    }
  });

  test('探索预览同样按时间换帧，重新行走和切图会重置步态', () {
    for (var terrain = 0; terrain < 4; terrain++) {
      final c = WorldController([_world(terrain)], aiEnabled: false);
      addTearDown(c.dispose);
      c.walkTo(const TileCoord(60, 1));
      for (final step in [0, 1, 1, 0, 0, 1]) {
        c.tick(0.1);
        expect(c.animationStep, step);
      }
      c.walkTo(const TileCoord(50, 1));
      expect(c.animationStep, 1);
      c.switchWorld(0);
      expect(c.animationStep, 0);
      c.walkTo(const TileCoord(60, 1));
      c.tick(0.1);
      expect(c.animationStep, 0);
      c.tick(0.1);
      expect(c.animationStep, 1);
    }
  });

  test('无效帧间隔不破坏动画时钟', () {
    final clock = HeroWalkAnimation()..advance(0.2);
    for (final dt in [0.0, -1.0, double.nan, double.infinity]) {
      clock.advance(dt);
      expect(clock.step, 1);
    }
    clock.reset();
    expect(clock.step, 0);
  });
}
