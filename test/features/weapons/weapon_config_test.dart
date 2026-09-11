import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/weapons/data/weapon_animation.dart';

void main() {
  final config = jsonDecode(
    File('assets/data/rom_weapons.json').readAsStringSync(),
  ) as Map;
  final rows = (config['weapons'] as List).cast<Map>();

  test('武器配置只保留运行字段，按ID连续排列', () {
    expect(config.keys, unorderedEquals(['carryLimit', 'weapons']));
    expect(config['carryLimit'], 1);
    expect(rows.map((w) => w['id']), List.generate(15, (i) => i));
    for (final w in rows) {
      expect(
        w.keys,
        unorderedEquals([
          'id',
          'name',
          'price',
          'damage',
          'selfDamage',
          'unlockYear',
          'effectId',
          'animationFrames',
          'shopEnabled',
        ]),
      );
    }
  });

  test('移除取证字段后，十五种武器动画引用和帧数仍完整', () {
    final animations = WeaponAnimations.decode(
      File('assets/data/weapon_animations.json').readAsStringSync(),
      File('assets/data/weapon_animations.bin').readAsBytesSync(),
    );
    for (final w in rows) {
      final frames = animations.clips[w['effectId']];
      expect(frames, isNotNull, reason: w['name'] as String);
      expect(frames!.length, w['animationFrames']);
    }
  });
}
