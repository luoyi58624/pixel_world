import 'dart:ui' as ui;

import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/geometry/flutter_geometry.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/cities/domain/city_appearance.dart';
import 'package:pixel_world/features/world_map/data/world_assets.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

import '../../support/ongoing_fixture.dart';
import '../../support/fixed_siege_random.dart';

void main() {
  testWidgets('五级原版建筑各不相同，降级和易主还原画面且不残留旧城堡', (tester) async {
    await tester.runAsync(() async {
      rootBundle.evict('assets/data/rom_heroes.json');
      final assets = await WorldAssets.load();
      final c = WorldController(assets.worlds, heroCatalog: assets.heroCatalog);
      c.campaigns[0] = ongoingCampaign(
        CampaignState.fromRom(
          aiEnabled: false,
          siegeRandom: const FixedSiegeRandom(),
          c.world,
          assets.heroCatalog,
          startingGold: 10000,
        ),
        stock: 0,
        year: 3,
      )..hasDispatched = true;
      final city = c.world.cities.first;
      c.camera.resize((const ui.Size(240, 240)).toGame);
      c.camera.center =
          city.bounds.bottomLeft + (const ui.Offset(24, -32)).toGame;
      final terrain = assets.scenes[0];
      Future<List<int>> render() async {
        final recorder = ui.PictureRecorder();
        WorldPainter(
          c,
          assets,
        ).paint(ui.Canvas(recorder), const ui.Size(240, 240));
        final picture = recorder.endRecording();
        final image = picture.toImageSync(240, 240);
        final pixels = (await image.toByteData())!.buffer
            .asUint8List()
            .toList();
        image.dispose();
        picture.dispose();
        return pixels;
      }

      final frames = <List<int>>[];
      for (var level = 1; level <= 5; level++) {
        if (level > 1) {
          c.campaign.settledMonths++;
          c.campaign.upgradeCity(0, hero: c.campaign.garrisonAt(0).first);
        }
        final image = assets.cityImage(city, level);
        expect(image.width, cityAppearances[level]!.width * 16);
        expect(image.height, cityAppearances[level]!.height * 16);
        expect(assets.cityImage(c.world.cities[1], level), same(image));
        final pixels = await render();
        for (final previous in frames) {
          expect(pixels, isNot(previous));
        }
        frames.add(pixels);
        expect(assets.scenes[0], same(terrain));
      }
      c.campaign.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
      expect(c.campaign.cities[0]!.level, 4);
      expect(await render(), frames[3]);
      c.campaign.cities[0]!.ownerCountryId = 1;
      expect(c.campaign.cities[0]!.level, 1);
      expect(await render(), frames[0]);
      expect(
        c.campaign.cityAt(
          city.bounds.bottomRight + (const ui.Offset(8, -8)).toGame,
        ),
        isNull,
      );
      c.dispose();
      assets.dispose();
    });
  });
}
