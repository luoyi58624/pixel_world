import 'package:pixel_world/core/geometry/geometry.dart';
import 'dart:io';
import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/cities/domain/city_appearance.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

final _directions = [
  for (final (x, y) in [
    (1, 0),
    (-1, 0),
    (0, 1),
    (0, -1),
    (1, 1),
    (-1, 1),
    (1, -1),
    (-1, -1),
  ])
    GamePoint(x.toDouble(), y.toDouble()),
];
final _pixels = <int, List<GameRect>>{};

CampaignState _campaign(int level) {
  final appearance = cityAppearances[level]!;
  final world = WorldDefinition.fromJson({
    'id': 0,
    'width': 80,
    'height': 40,
    'tiles': List.filled(80 * 40, 0),
    'cities': [
      for (final (id, x, heroes) in [
        (0, 10, [40, 0, 2]),
        (1, 45, [3, 4]),
      ])
        {
          'id': id,
          'name': '测试城',
          'x': x,
          'y': 15,
          'width': appearance.width,
          'height': appearance.height,
          'shape': appearance.tiles,
          'initialLevel': level,
          'initialOwnerId': id,
          'unitIds': heroes,
        },
    ],
  }, List.filled(128, 0));
  return CampaignState.fromRom(
    world,
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
    aiEnabled: false,
  );
}

// 独立读取正在绘制的 PNG 验证接触，不能只拿生成的轮廓再次验证自身。
void _expectTouch(CampaignState c, CityDefinition city, GamePoint center) {
  final origin = c.cityBounds(city).topLeft;
  final hero = GameRect.fromCenter(
    center: center - origin,
    width: 16,
    height: 16,
  );
  var gap = double.infinity;
  var overlap = 0.0;
  for (final pixel in _pixels[c.cities[city.id]!.level]!) {
    final dx = math.max(
      0.0,
      math.max(pixel.left - hero.right, hero.left - pixel.right),
    );
    final dy = math.max(
      0.0,
      math.max(pixel.top - hero.bottom, hero.top - pixel.bottom),
    );
    gap = math.min(gap, dx * dx + dy * dy);
    final intersection = hero.intersect(pixel);
    if (!intersection.isEmpty) {
      overlap += intersection.width * intersection.height;
    }
  }
  expect(gap, lessThan(1e-10), reason: '人物必须碰到可见墙体，不能停在草地空白处');
  expect(overlap, lessThan(1e-6), reason: '人物方格不能钻进建筑像素');
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUpAll(() async {
    final codec = await ui.instantiateImageCodec(
      File('assets/images/terrain.png').readAsBytesSync(),
    );
    final image = (await codec.getNextFrame()).image;
    final bytes = (await image.toByteData(format: ui.ImageByteFormat.rawRgba))!;
    for (final entry in cityAppearances.entries) {
      final appearance = entry.value;
      final pixels = <GameRect>[];
      for (var y = 0; y < appearance.height * 16; y++) {
        for (var x = 0; x < appearance.width * 16; x++) {
          final tile = appearance.tiles[y ~/ 16 * appearance.width + x ~/ 16];
          if (tile == 0 ||
              tile == 79 && x % 16 >= 12 && y % 16 < 11 ||
              tile == 116 && x % 16 >= 12 && y % 16 < 8) {
            continue;
          }
          final index =
              ((tile ~/ 16 * 16 + y % 16) * image.width +
                  tile % 16 * 16 +
                  x % 16) *
              4;
          final r = bytes.getUint8(index),
              g = bytes.getUint8(index + 1),
              b = bytes.getUint8(index + 2);
          if (r == g && g == b) {
            pixels.add(GameRect.fromLTWH(x.toDouble(), y.toDouble(), 1, 1));
          }
        }
      }
      _pixels[entry.key] = pixels;
    }
    image.dispose();
    codec.dispose();
  });

  for (var level = 1; level <= 5; level++) {
    test('$level 级城八方向出城从实体边缘开始，不固定下方也不落在空白外框', () {
      for (final direction in _directions) {
        final c = _campaign(level), city = c.world.cities.first;
        final bounds = c.cityBounds(city);
        final toward = bounds.center + direction * 100;
        final hero = c.garrisonAt(0).first;
        final march = c.dispatchTo(hero, toward)!;
        final offset = march.position - bounds.center;
        expect(
          offset.dx * direction.dy - offset.dy * direction.dx,
          closeTo(0, 1e-7),
        );
        expect(
          offset.dx * direction.dx + offset.dy * direction.dy,
          greaterThan(0),
        );
        _expectTouch(c, city, march.position);
      }
    });

    test('$level 级城八方向进攻直达墙体，首次接触才开始战斗且可撤离', () {
      for (final direction in _directions) {
        final c = _campaign(level), city = c.world.cities[1];
        final hero = c.garrisonAt(0).first;
        final march = c.dispatch(hero, city)!;
        march.position = c.cityBounds(city).center + direction * 100;
        c.moveTo(hero.id, c.cityBounds(city).center);
        final destination = march.destination;
        final start = march.position;
        for (var i = 0; i < 2000 && march.phase == MarchPhase.marching; i++) {
          c.advance(1 / 60);
          final offset = march.position - start;
          final delta = destination - start;
          expect(offset.dx * delta.dy - offset.dy * delta.dx, closeTo(0, 1e-6));
        }
        expect(march.phase, MarchPhase.fighting);
        expect((march.position - destination).distance, lessThan(1e-7));
        _expectTouch(c, city, march.position);
        final battle = c.battles[city.id]!;
        c.moveTo(hero.id, c.cityBounds(city).center);
        expect(c.battles[city.id], same(battle));
        expect(c.moveTo(hero.id, start), isFalse);
        c.advance(0.3);
        expect(march.phase, MarchPhase.fighting);
        expect(battle.isActive, isTrue);
        expect((march.position - destination).distance, lessThan(1e-7));
      }
    });
  }

  test('经过旗杆和图块顶部草地不会提前触发攻城，经过实际墙体仍会拦截', () {
    final c = _campaign(1), city = c.world.cities[1];
    final bounds = c.cityBounds(city);
    final hero = c.garrisonAt(0).first;
    final start = bounds.topLeft + const GamePoint(-50, -4);
    final end = bounds.topRight + const GamePoint(50, -4);
    final march = c.dispatchTo(hero, end)!;
    march.position = start;
    c.moveTo(hero.id, end);
    c.advance(15);
    expect(march.position, end);
    expect(march.phase, MarchPhase.camped);
    expect(c.battles, isEmpty);

    march.position = bounds.centerLeft - const GamePoint(50, 0);
    c.moveTo(hero.id, bounds.centerRight + const GamePoint(50, 0));
    for (var i = 0; i < 1000 && march.phase == MarchPhase.marching; i++) {
      c.advance(1 / 60);
    }
    expect(march.phase, MarchPhase.fighting);
    expect(march.target, city);
    _expectTouch(c, city, march.position);
  });

  test('点击城堡空白角仍抵达最近的有效墙体，途中不再二次修正停靠点', () {
    final c = _campaign(4), city = c.world.cities[1];
    final bounds = c.cityBounds(city);
    final hero = c.garrisonAt(0).first;
    final march = c.dispatch(hero, city)!;
    march.position = bounds.topRight + const GamePoint(80, -80);
    c.moveTo(hero.id, bounds.topRight + const GamePoint(-1, 1));
    final destination = march.destination;
    _expectTouch(c, city, destination);
    for (var i = 0; i < 2000 && march.phase == MarchPhase.marching; i++) {
      c.advance(1 / 60);
      expect(march.destination, destination);
    }
    expect(march.phase, MarchPhase.fighting);
    _expectTouch(c, city, march.position);
  });

  test('大步长和逐帧推进得到相同的贴城位置，不会穿过或提前卡住', () {
    final a = _campaign(3), b = _campaign(3);
    for (final c in [a, b]) {
      final city = c.world.cities[1];
      final march = c.dispatch(c.garrisonAt(0).first, city)!;
      march.position = c.cityBounds(city).center + const GamePoint(80, -80);
      c.moveTo(march.hero.id, c.cityBounds(city).center);
    }
    a.advance(10);
    for (var i = 0; i < 600; i++) {
      b.advance(1 / 60);
    }
    final am = a.marches.values.single, bm = b.marches.values.single;
    expect(am.phase, MarchPhase.fighting);
    expect(bm.phase, am.phase);
    expect(am.position, bm.position);
    _expectTouch(a, a.world.cities[1], am.position);
  });
}
