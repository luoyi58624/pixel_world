import 'dart:io';
import 'dart:ui' show Rect;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

CampaignState _campaign() => CampaignState.fromRom(
  aiEnabled: false,
  decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()).first,
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
);

void main() {
  test('出城沿目标方向选择边缘，四个方向都不强制经过城池下方', () {
    for (final direction in [
      const Offset(1, 0),
      const Offset(-1, 0),
      const Offset(0, 1),
      const Offset(0, -1),
    ]) {
      final c = _campaign();
      final source = c.world.cities.first;
      final target = source.bounds.center + direction * 80;
      final march = c.dispatchTo(
        c.heroes.firstWhere((hero) => hero.sourceId == 40),
        target,
      )!;
      final offset = march.position - source.bounds.center;
      expect(
        offset.dx * direction.dy - offset.dy * direction.dx,
        closeTo(0, 1e-8),
      );
      expect(
        offset.dx * direction.dx + offset.dy * direction.dy,
        greaterThan(0),
      );
      expect(
        Rect.fromCenter(
          center: march.position,
          width: 16,
          height: 16,
        ).overlaps(source.bounds),
        isFalse,
      );
      final border = source.bounds.inflate(8);
      expect(
        march.position.dx == border.left ||
            march.position.dx == border.right ||
            march.position.dy == border.top ||
            march.position.dy == border.bottom,
        isTrue,
      );
    }
  });

  test('从上下左右抵达敌城都在身体接触城池时停下并开始后台交战', () {
    for (final direction in [
      const Offset(1, 0),
      const Offset(-1, 0),
      const Offset(0, 1),
      const Offset(0, -1),
    ]) {
      final c = _campaign();
      final city = c.world.cities[1];
      final hero = c.heroes.firstWhere((hero) => hero.sourceId == 40);
      final march = c.dispatch(hero, city)!;
      march.position = city.bounds.center + direction * 100;
      c.moveTo(hero.id, city.bounds.center);
      final expected = direction.dx > 0
          ? city.bounds.centerRight + const Offset(8, 0)
          : direction.dx < 0
          ? city.bounds.centerLeft - const Offset(8, 0)
          : direction.dy > 0
          ? city.bounds.bottomCenter + const Offset(0, 8)
          : city.bounds.topCenter - const Offset(0, 8);
      expect((march.destination - expected).distance, lessThan(1e-8));
      for (var i = 0; i < 600 && march.phase == MarchPhase.marching; i++) {
        c.advance(0.05);
      }
      expect((march.position - expected).distance, lessThan(1e-7));
      expect(march.phase, MarchPhase.fighting);
      expect(c.battles[city.id]!.isActive, isTrue);
      final battle = c.battles[city.id];
      c.moveTo(hero.id, city.bounds.center);
      expect(c.battles[city.id], same(battle));
    }
  });
}
