import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/app/data/game_archive.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';

void main() {
  const source = String.fromEnvironment('ARCHIVE_BENCHMARK_FILE');
  test('真实状态的回放快照避免后台日志与重复 JSON 对象', () async {
    Map<String, dynamic>? last;
    for (final line in File(source).readAsLinesSync()) {
      final record = jsonDecode(line) as Map;
      if (record['store'] == 'chunks') {
        last = Map<String, dynamic>.from(record['value']);
      }
    }
    final state = GameArchive.decodeFrame(
      last!,
      (last['frames'] as List).length - 1,
    );
    final heroes = decodeRomHeroes(
      File('assets/data/heroes.json5').readAsStringSync(),
    );
    final worlds = decodeWorlds(
      File('assets/maps/worlds.json').readAsStringSync(),
      setup: CampaignSetup.decode(
        File('assets/data/campaign_config.json5').readAsStringSync(),
      ),
    );

    final c = CampaignSnapshots.restore(
      Map<String, dynamic>.from(state['campaign']),
      worlds[state['index']],
      heroes,
    );
    addTearDown(c.dispose);
    final full = c.saveState(), replay = c.saveState(replay: true);
    final fullBytes = utf8.encode(jsonEncode(full)).length,
        replayBytes = utf8.encode(jsonEncode(replay)).length;
    expect(replayBytes, lessThan(fullBytes ~/ 3));
    expect(
      identical(
        c.events.saveState(replay: true),
        c.events.saveState(replay: true),
      ),
      isTrue,
    );
    final times = <int>[];
    final recording = SessionRecording(
      GameArchive.memory(),
      mapIndex: 0,
      signature: 'profile',
    );
    for (var i = 0; i < 120; i++) {
      c.events.record(
        tick: i,
        year: 1,
        month: 1,
        kind: GameEventKind.workerQueue,
        source: GameEventSource.ai,
        phase: GameEventPhase.observed,
        summary: '诊断采样',
        countryId: 0,
      );
      final watch = Stopwatch()..start();
      recording.capture({...state, 'campaign': c.saveState(replay: true)});
      watch.stop();
      if (i >= 20) times.add(watch.elapsedMicroseconds);
    }
    times.sort();
    await recording.flush();
    final base = (await recording.archive.chunk(recording.run, 0))['base'];
    final baseBytes = utf8.encode(jsonEncode(base)).length;
    expect(baseBytes, lessThan(fullBytes ~/ 10));
    // ignore: avoid_print
    print(
      jsonEncode({
        'fullBytes': fullBytes,
        'replayBytes': replayBytes,
        'storedKeyframeBytes': baseBytes,
        'captureMedianUs': times[times.length ~/ 2],
        'captureP95Us': times[(times.length * .95).floor()],
      }),
    );
    await recording.archive.close();
  }, skip: source.isEmpty);
}
