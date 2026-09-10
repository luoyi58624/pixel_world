import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/simulation/runner.dart';
import 'package:pixel_world/simulation/scenario.dart';

void main() {
  test('1倍与16倍纯数据推进一致，不跳过战斗、月结或调度', () async {
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: CampaignSetup.decode(
        File('assets/data/campaign_config.json').readAsStringSync(),
      ),
    );
    final runner = SimulationRunner(
      world: worlds.first,
      heroes: decodeRomHeroes(
        File('assets/data/rom_heroes.json').readAsStringSync(),
      ),
      weapons: WeaponCatalog.decode(
        File('assets/data/rom_weapons.json').readAsStringSync(),
      ),
      aiWorkerFactory: SynchronousAiWorker.new,
    );
    final a = await runner.run(
      const SimulationScenario(worldId: 0, seed: 503, seconds: 120, speed: 1),
    );
    final b = await runner.run(
      const SimulationScenario(worldId: 0, seed: 503, seconds: 120, speed: 16),
    );
    expect(a['signature'], b['signature']);
    for (final key in [
      'duplicateHeroSamples',
      'invalidResourceSamples',
      'unsafeSiegeSamples',
    ]) {
      expect(a[key], 0);
      expect(b[key], 0);
    }
  });
}
