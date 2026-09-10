import 'dart:io';
import 'dart:typed_data';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/weapons/data/weapon_animation.dart';

import '../../support/weapon_strategy_fixture.dart';

void main() {
  test('十五种原武器时间线完整，帧数与伤害时刻一致，图集和角色变体引用有效', () {
    final bytes = File('assets/data/weapon_animations.bin').readAsBytesSync();
    final metadata = File('assets/data/weapon_animations.json')
        .readAsStringSync();
    final data = WeaponAnimations.decode(metadata, bytes);
    final png = ByteData.sublistView(
      File('assets/images/battle/weapon_effects.png').readAsBytesSync(),
    );
    final width = png.getUint32(16), height = png.getUint32(20);
    expect(data.clips.length, 15);
    final lengths = <int>{};
    for (final weapon in testWeaponCatalog(original: true).weapons.values) {
      final frames = data.clips[weapon.effectId]!;
      expect(frames.length, weapon.animationFrames);
      lengths.add(frames.length);
      expect(frames.any((f) => f.isNotEmpty), isTrue);
      for (final actor in frames.expand((f) => f)) {
        expect(actor.actor, anyOf(inInclusiveRange(0, 15), 255));
        final pose = data.poses[actor.pose];
        expect(pose.variants.length, anyOf(1, 2, 6));
        for (final id in pose.variants) {
          final sprite = data.sprites[id];
          expect(sprite.source.left, greaterThanOrEqualTo(0));
          expect(sprite.source.top, greaterThanOrEqualTo(0));
          expect(sprite.source.right, lessThanOrEqualTo(width));
          expect(sprite.source.bottom, lessThanOrEqualTo(height));
        }
      }
    }
    expect(lengths.length, greaterThan(10));
    expect(
      () =>
          WeaponAnimations.decode(metadata, bytes.sublist(0, bytes.length - 1)),
      throwsFormatException,
    );
  });
}
