import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/weapons/domain/weapon.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';

void main() {
  test('多地图独立真实战役回归：资源唯一、守城名额和持续行动', () async {
    const label = String.fromEnvironment(
      'AI_CAMPAIGN_LABEL',
      defaultValue: 'campaign_smoke',
    );
    Directory('build/national_ai').createSync(recursive: true);
    const seconds = int.fromEnvironment(
      'AI_CAMPAIGN_SECONDS',
      defaultValue: 30,
    );
    final seeds = const String.fromEnvironment(
      'AI_CAMPAIGN_SEEDS',
      defaultValue: '101,223',
    ).split(',').map(int.parse);
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: CampaignSetup.decode(
        File('assets/data/campaign_config.json5').readAsStringSync(),
      ),
    );
    final heroes = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    final weapons = WeaponCatalog.decode(
      File('assets/data/rom_weapons.json').readAsStringSync(),
    );
    final rows = <Map<String, Object?>>[];
    for (final seed in seeds) {
      for (final world in worlds) {
        final sinks = <int, IOSink>{};
        final paths = <int, String>{};
        var writtenEvents = 0;
        final eventLog = CampaignEvents(
          worldId: world.id,
          runId: '${label}_world${world.id}_seed$seed',
          captureAiSnapshots: const bool.fromEnvironment('AI_EVENT_SNAPSHOTS'),
          onEvent: (event) {
            const trace =
                bool.fromEnvironment('AI_EVENT_TRACE') ||
                bool.fromEnvironment('AI_EVENT_SNAPSHOTS');
            if (!trace && !event.isFinalDecision) return;
            writtenEvents++;
            final country = event.countryId ?? -1;
            final sink = sinks.putIfAbsent(country, () {
              final path =
                  'build/national_ai/${label}_world${world.id}_seed${seed}_country$country.jsonl';
              paths[country] = path;
              return File(path).openWrite();
            });
            sink.writeln(event.toJsonLine());
          },
        );
        final c = CampaignState.fromRom(
          world,
          heroes,
          weaponCatalog: weapons,
          aiWorkerFactory: SynchronousAiWorker.new,
          aiRandom: math.Random(seed),
          economyRandom: math.Random(seed + 10),
          recruitmentRandom: math.Random(seed + 20),
          siegeRandom: math.Random(seed + 30),
          retreatRandom: math.Random(seed + 40),
          weaponRandom: math.Random(seed + 50),
          eventLog: eventLog,
        );
        try {
          final fought = <String>{},
              deployed = <String>{},
              roles = <String>{},
              returned = <String>{};
          final previous = {for (final hero in c.heroes) hero.id: hero};
          final owners = {
            for (final entry in c.cities.entries)
              entry.key: entry.value.ownerCountryId,
          };
          var overflow = 0,
              captures = 0,
              lostUnfought = 0,
              removedUnfought = 0,
              halted = 0,
              ticks = 0;
          final unsafeExamples = <Map<String, Object?>>[];
          final timer = Stopwatch()..start();
          for (; ticks < seconds * 60 && !c.defeated; ticks++) {
            final fieldBefore = c.marches.keys.toSet();
            c.advance(1 / 60);
            for (final battle in c.allBattles) {
              fought.add(battle.attacker.id);
              fought.add(battle.defender.id);
            }
            for (final hero in previous.values.toList()) {
              if (!c.heroes.contains(hero)) {
                if (!hero.isPlayer &&
                    hero.type == HeroType.advanced &&
                    !fought.contains(hero.id)) {
                  removedUnfought++;
                  if (c.cities[hero.cityId]!.ownerCountryId !=
                      owners[hero.cityId]) {
                    lostUnfought++;
                  }
                }
                previous.remove(hero.id);
              }
            }
            for (final hero in c.heroes) {
              previous[hero.id] = hero;
            }
            for (final entry in c.cities.entries) {
              if (owners[entry.key] != entry.value.ownerCountryId) {
                captures++;
                owners[entry.key] = entry.value.ownerCountryId;
              }
            }
            for (final hero in c.heroes.where((h) => !h.isPlayer)) {
              if (fieldBefore.contains(hero.id) &&
                  !c.marches.containsKey(hero.id)) {
                returned.add(hero.id);
              }
            }
            roles.addAll(c.aiTasks.values.map((t) => t.role));
            if (ticks % 60 == 0) {
              expect(c.heroes.map((h) => h.id).toSet().length, c.heroes.length);
              for (final id
                  in c.cities.values.map((c) => c.ownerCountryId).toSet()) {
                expect(c.goldFor(id), greaterThanOrEqualTo(0));
                expect(
                  c.reserveSoldiersFor(id),
                  inInclusiveRange(0, c.reserveCapacityFor(id)),
                );
              }
              for (final battle in c.battles.values.where(
                (b) => b.isActive && !b.defender.isPlayer,
              )) {
                if (c
                        .garrisonAt(battle.city.id)
                        .where((h) => h.health.alive)
                        .length >
                    battle.initialCityLevel - battle.victories) {
                  overflow++;
                  if (unsafeExamples.length < 12) {
                    unsafeExamples.add({
                      'tick': ticks,
                      'city': battle.city.id,
                      'owner': c.cities[battle.city.id]!.ownerCountryId,
                      'defendingCountry': battle.defendingCountryId,
                      'level': c.cities[battle.city.id]!.level,
                      'initialLevel': battle.initialCityLevel,
                      'victories': battle.victories,
                      'nextWaveIn': battle.nextWaveIn,
                      'garrison': c
                          .garrisonAt(battle.city.id)
                          .map((h) => {'id': h.id, 'hp': h.hp})
                          .toList(),
                      'latestDecisions': c.events
                          .forCountry(battle.defendingCountryId)
                          .finalDecisions(newestFirst: true, limit: 2)
                          .map((e) => e.summary)
                          .toList(),
                    });
                  }
                }
              }
              for (final march in c.marches.values.where(
                (m) => !m.hero.isPlayer,
              )) {
                deployed.add(march.hero.id);
                if (march.supplyHalted) halted++;
              }
            }
          }
          expect(c.aiDiagnostics.commands, greaterThan(0));
          expect(overflow, 0, reason: '不得在已阵亡守将的结束动画期间错误补入新英雄：$unsafeExamples');
          rows.add({
            'world': world.id,
            'seed': seed,
            'ticks': ticks,
            'captures': captures,
            'deployedHeroes': deployed.length,
            'unsafeSiegeSamples': overflow,
            'unsafeSiegeExamples': unsafeExamples,
            'advancedLostBeforeFighting': removedUnfought,
            'advancedLostWithCityBeforeFighting': lostUnfought,
            'haltedArmySeconds': halted,
            'heroesStationedAfterField': returned.length,
            'taskRoles': roles.toList()..sort(),
            'millisecondsIncludingSynchronousPlanner':
                timer.elapsedMilliseconds,
            'territories': {
              for (final id in owners.values.toSet())
                '$id': owners.values.where((x) => x == id).length,
            },
            'commands': c.aiDiagnostics.commands,
            'rejected': c.aiDiagnostics.rejected,
            'diagnostics': c.aiDiagnostics.events,
            'eventCount': writtenEvents,
            'traceEventCount': c.events.totalCount,
            'eventFiles': {for (final e in paths.entries) '${e.key}': e.value},
          });
          expect(c.events.sinkErrors, 0);
        } finally {
          c.dispose();
          for (final sink in sinks.values) {
            await sink.flush();
            await sink.close();
          }
        }
      }
    }
    Directory('build/national_ai').createSync(recursive: true);
    File('build/national_ai/$label.json')
        .writeAsStringSync(const JsonEncoder.withIndent('  ').convert(rows));
    // 只独立运行实际游戏做回归，结果不进入运行时 AI。
    // ignore: avoid_print
    print(
      jsonEncode(rows.map((r) => Map.of(r)..remove('diagnostics')).toList()),
    );
  }, timeout: const Timeout(Duration(minutes: 5)));
}
