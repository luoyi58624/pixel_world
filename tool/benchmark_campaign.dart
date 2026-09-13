import 'dart:convert';
import 'dart:developer';
import 'dart:io';
import 'dart:isolate';

import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/core/time/game_clock.dart';
import 'package:pixel_world/features/ai/runtime/worker.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

/// 用存档副本测量倍速下主线程每帧耗时，可通过 --observe 附加 CPU 采样。
Future<void> main(List<String> args) async {
  if (args.length < 2) {
    stdout.writeln(
      '用法：dart [--observe=0] run tool/benchmark_campaign.dart <存档> <标签> [游戏秒数=60] [倍速=16]',
    );
    return;
  }
  final seconds = args.length > 2 ? int.parse(args[2]) : 60;
  final speed = args.length > 3 ? int.parse(args[3]) : 16;
  final label = args[1];
  if (!RegExp(r'^[a-zA-Z0-9_-]+$').hasMatch(label) ||
      seconds <= 0 ||
      !GameClock.speeds.contains(speed)) {
    throw ArgumentError('标签只能使用字母、数字、下划线；时间必须为正，倍速为 1、2、4、8、16');
  }
  final directory = Directory('build/national_ai/$label');
  if (directory.existsSync()) throw StateError('保留旧数据，请换一个标签');
  directory.createSync(recursive: true);
  GameConfig.loadJson(File('assets/data/game_config.json5').readAsStringSync());
  final input = jsonDecode(File(args[0]).readAsStringSync());
  final data = Map<String, dynamic>.from(input['campaign'] ?? input)
    ..['paused'] = false;
  final world = decodeWorlds(
    File('assets/maps/worlds.json').readAsStringSync(),
    setup: CampaignSetup.decode(
      File('assets/data/campaign_config.json5').readAsStringSync(),
    ),
  ).firstWhere((w) => w.id == data['world']);
  final campaign = CampaignSnapshots.restore(
    data,
    world,
    decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
    aiWorkerFactory: createAiWorker,
  );
  final service = (await Service.getInfo()).serverUri;
  final client = HttpClient();
  final isolate = Service.getIsolateId(Isolate.current);
  Future<dynamic> rpc(String method, Map<String, String> params) async {
    final uri = service!.resolve(method).replace(queryParameters: params);
    final response = await (await client.getUrl(uri)).close();
    final result = jsonDecode(await utf8.decoder.bind(response).join());
    if (result['error'] != null) throw StateError('${result['error']}');
    return result['result'];
  }

  final frames = <int>[], snapshots = <int>[];
  final events = <String, int>{};
  final subscriptions = [
    for (final country
        in campaign.cities.values.map((c) => c.ownerCountryId).toSet())
      campaign.events
          .forCountry(country)
          .listen(
            (e) => events.update(e.kind.name, (n) => n + 1, ifAbsent: () => 1),
          ),
  ];
  if (service != null && isolate != null) {
    await rpc('clearCpuSamples', {'isolateId': isolate});
  }
  final wall = Stopwatch()..start();
  final clock = GameClock()..speed = speed;
  for (
    var frame = 0;
    frame < seconds * 60 / speed && !campaign.defeated;
    frame++
  ) {
    final watch = Stopwatch()..start();
    clock.advance(1 / 60, campaign.advance);
    frames.add(watch.elapsedMicroseconds);
    // 与游戏录制一样每六帧生成回放状态，单独记录，避免混入行军耗时。
    if (frame % 6 == 0) {
      watch.reset();
      campaign.saveState(replay: true);
      snapshots.add(watch.elapsedMicroseconds);
    }
    for (var wait = 0; campaign.pendingAiRequests > 0 && wait < 200; wait++) {
      await Future<void>.delayed(const Duration(milliseconds: 1));
      campaign.advance(0);
    }
    await Future<void>.delayed(Duration.zero);
  }
  wall.stop();
  if (service != null && isolate != null) {
    final profile = await rpc('getCpuSamples', {
      'isolateId': isolate,
      'timeOriginMicros': '0',
      'timeExtentMicros': '${1 << 62}',
    });
    File('${directory.path}/cpu.json').writeAsStringSync(jsonEncode(profile));
  }
  Map<String, num> timings(List<int> values) {
    final ordered = values.toList()..sort();
    num percentile(double p) => ordered.isEmpty
        ? 0
        : ordered[((ordered.length - 1) * p).round()] / 1000;
    return {
      'count': values.length,
      'totalMs': values.fold(0, (a, b) => a + b) / 1000,
      'p50Ms': percentile(.5),
      'p95Ms': percentile(.95),
      'p99Ms': percentile(.99),
      'maxMs': percentile(1),
      'over16ms': values.where((n) => n > 16667).length,
    };
  }

  final result = {
    'speed': speed,
    'seconds': seconds,
    'wallMs': wall.elapsedMilliseconds,
    'frames': timings(frames),
    'replaySnapshots': timings(snapshots),
    'events': events,
    'marches': campaign.marches.length,
  };
  File('${directory.path}/result.json').writeAsStringSync(jsonEncode(result));
  File('${directory.path}/final.json')
      .writeAsStringSync(jsonEncode(campaign.saveState()));
  stdout.writeln(jsonEncode(result));
  for (final unsubscribe in subscriptions) {
    unsubscribe();
  }
  campaign.dispose();
  client.close();
}
