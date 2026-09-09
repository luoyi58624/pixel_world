import 'dart:convert';
import 'dart:io';
import 'dart:ui';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/battle_painter.dart';
import 'package:pixel_world/world/battle_simulation.dart';
import 'package:pixel_world/world/hero_sprite.dart';
import 'package:pixel_world/world/world_assets.dart';
import 'package:pixel_world/world/world_controller.dart';

void main() {
  testWidgets('战场隐藏小兵血量和伤害飘字，英雄血条仍随生命变化', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final c = WorldController(assets.worlds, heroCatalog: assets.heroCatalog);
      final march = c.campaign.dispatch(c.previewHero!, c.world.cities[1])!;
      march.position = march.destination;
      c.tick(0.02);
      final battle = c.campaign.battles[1]!;
      c.watchBattle(battle);
      c.battleCamera.resize(const Size(768, 432));
      c.battleCamera.overview();
      final art = BattleArt(assets);
      Future<List<int>> render() async {
        final recorder = PictureRecorder();
        BattlePainter(
          c,
          assets,
          art,
          devicePixelRatio: 1,
        ).paint(Canvas(recorder), const Size(768, 432));
        final picture = recorder.endRecording();
        final image = await picture.toImage(768, 432);
        final bytes = (await image.toByteData())!.buffer.asUint8List().toList();
        image.dispose();
        picture.dispose();
        return bytes;
      }

      final baseline = await render();
      final sim = battle.simulation;
      final soldier = sim.units.firstWhere((unit) => !unit.isGeneral);
      soldier.health.hp = 1;
      sim.hits.add((
        sourceId: 'source',
        targetId: soldier.id,
        damage: 12345.67,
        position: soldier.position,
        at: sim.elapsed,
      ));
      expect(await render(), baseline);
      sim.units.firstWhere((unit) => unit.isGeneral).health.hp = 1;
      expect(await render(), isNot(baseline));
      art.dispose();
      c.dispose();
      assets.dispose();
    });
  });

  test('固定队形与提取的 OAM 站位表、背景尺寸一致', () {
    final data = jsonDecode(
      File('assets/data/rom_battle_art.json').readAsStringSync(),
    ) as Map<String, dynamic>;
    final layout = data['layout'] as Map<String, dynamic>;
    expect(layout['sourceY'], [55, 79, 103, 127, 93]);
    final formation = BattleFormation(BattleSide.defender);
    for (var slot = 0; slot < 4; slot++) {
      final expected =
          layout['sourceY'][slot] +
          layout['oamYOffset'] -
          layout['cropTop'] +
          layout['bodySize'] / 2;
      expect(formation.positionFor(slot).dy, expected);
    }
    expect(
      BattleSimulation.arenaSize,
      Size(
        (layout['arenaSize'][0] as int).toDouble(),
        (layout['arenaSize'][1] as int).toDouble(),
      ),
    );
    expect(layout['levelStages'], [5, 4, 4, 4, 3]);
    expect(data['frameOrder'], ['side_a', 'side_b', 'clash']);
  });

  testWidgets('我方高级和普通将领只替换蓝色主色，透明边界与全部六帧细节不变', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      for (final type in [HeroAppearance.advanced, HeroAppearance.normal]) {
        final blue = (await assets.heroImage(type).toByteData())!;
        final red = (await assets
            .heroImage(type, friendly: true)
            .toByteData())!;
        var replaced = 0;
        for (var i = 0; i < blue.lengthInBytes; i += 4) {
          if (blue.getUint8(i) == 66 &&
              blue.getUint8(i + 1) == 64 &&
              blue.getUint8(i + 2) == 255) {
            expect(
              [red.getUint8(i), red.getUint8(i + 1), red.getUint8(i + 2)],
              [181, 49, 32],
            );
            expect(red.getUint8(i + 3), blue.getUint8(i + 3));
            replaced++;
          } else {
            expect(red.getUint32(i), blue.getUint32(i));
          }
        }
        expect(replaced, greaterThan(0));
        final enemy = assets.heroFrame(type, 0, 32);
        final player = assets.heroFrame(type, 0, 32, friendly: true);
        expect(player, isNot(same(enemy)));
        expect(assets.heroFrame(type, 0, 32, friendly: true), same(player));
      }
      assets.dispose();
    });
  });

  testWidgets('原版战斗角色包含武器动作，背景和角色缓存能按阵营独立读取', (tester) async {
    await tester.runAsync(() async {
      final assets = await WorldAssets.load();
      final art = BattleArt(assets);
      expect(assets.battleSprites.length, 8);
      for (final image in assets.battleSprites.values) {
        expect(
          Size(image.width.toDouble(), image.height.toDouble()),
          const Size(96, 32),
        );
      }
      for (final image in assets.battleScenes.values) {
        expect(
          Size(image.width.toDouble(), image.height.toDouble()),
          const Size(256, 144),
        );
      }
      expect(art.background(1), same(assets.battleScenes[5]));
      expect(art.background(2), same(assets.battleScenes[4]));
      expect(art.background(5), same(assets.battleScenes[3]));
      final idle = art.sprite(null, true, 0, 32);
      final attack = art.sprite(null, true, 2, 32);
      expect(idle.width, 64);
      expect(art.sprite(null, true, 0, 32), same(idle));
      expect(
        (await idle.toByteData())!.buffer.asUint8List(),
        isNot((await attack.toByteData())!.buffer.asUint8List()),
      );
      final blue = art.sprite(null, false, 0, 32);
      expect(blue, isNot(same(idle)));
      art.dispose();
      assets.dispose();
    });
  });
}
