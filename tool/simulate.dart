import 'dart:convert';
import 'dart:io';
import 'dart:isolate';

import 'package:json5/json5.dart';
import 'package:pixel_world/features/ai/runtime/worker.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/simulation/runner.dart';
import 'package:pixel_world/simulation/scenario.dart';

/// 独立数据实验入口；不加载 Flutter，不打开游戏窗口。
Future<void> main(List<String> args) async {
  if (args.contains('--help')) {
    stdout.writeln(
      '无界面战役验收：dart run tool/simulate.dart --speed 16 --seconds 600 --worlds 0,1,2 --seeds 101,223,337 --label trial\n'
      '--backend deterministic 使用显式测试后端保证可复现；--backend native 使用真实常驻后台并等待其完成。\n'
      '--config 可选择资金配置，--heroes 可选择月俸实验目录；--trace 保留原始诊断事件，默认记录最终决策与月结。\n'
      '--commander 通过正式指令控制玩家国，主角死亡或全部失城立即判负。\n'
      '--commander-strategy baseline|capacity-first|defense-only 选择玩家策略；defense-only 正常补兵补将升级但不出击。\n'
      '输出位于 build/simulations/<label>/。',
    );
    return;
  }
  String option(String name, String fallback) {
    final index = args.indexOf('--$name');
    return index < 0 ? fallback : args[index + 1];
  }

  final label = option('label', 'simulation');
  if (!RegExp(r'^[a-zA-Z0-9_-]+$').hasMatch(label)) {
    throw ArgumentError('label仅允许字母、数字、下划线');
  }
  final seconds = int.parse(option('seconds', '600')),
      speed = int.parse(option('speed', '16'));
  if (seconds <= 0 || ![1, 2, 4, 8, 16].contains(speed)) {
    throw ArgumentError('时长必须大于零，倍速只能为1、2、4、8、16');
  }
  final seeds = option(
    'seeds',
    '101,223,337',
  ).split(',').map(int.parse).toList();
  final worldIds = option('worlds', '0,1,2').split(',').map(int.parse).toSet();
  final backend = option('backend', 'deterministic');
  if (!['native', 'deterministic'].contains(backend)) {
    throw ArgumentError('未知模拟后端：$backend');
  }
  final native = backend == 'native';
  final trace = args.contains('--trace');
  final strategy = option('commander-strategy', 'baseline');
  if (!['baseline', 'capacity-first', 'defense-only'].contains(strategy)) {
    throw ArgumentError('未知玩家策略：$strategy');
  }
  final commanderStrategy = switch (strategy) {
    'capacity-first' => CommanderStrategy.capacityFirst,
    'defense-only' => CommanderStrategy.defenseOnly,
    _ => CommanderStrategy.baseline,
  };
  final config = option('config', 'assets/data/campaign_config.json5');
  final heroPath = option('heroes', 'assets/data/heroes.json5');
  // 同一批实验固定输入，避免手动编辑配置让后几局悄悄改变条件。
  final setupSource = File(config).readAsStringSync();
  final worldSource = File('assets/maps/worlds.json').readAsStringSync();
  final heroSource = File(heroPath).readAsStringSync();
  final out = Directory('build/simulations/$label')
    ..createSync(recursive: true);
  File('${out.path}/inputs.json').writeAsStringSync(
    jsonEncode({
      'config': json5Decode(setupSource),
      'worlds': jsonDecode(worldSource),
      'heroes': json5Decode(heroSource),
      'commanderStrategy': strategy,
    }),
  );
  final rows = <Map<String, Object?>>[];
  for (final seed in seeds) {
    for (final worldId in worldIds) {
      final row = await Isolate.run(() async {
        final setup = CampaignSetup.decode(setupSource);
        final world = decodeWorlds(
          worldSource,
          setup: setup,
        ).firstWhere((w) => w.id == worldId);
        final catalog = decodeRomHeroes(heroSource);
        final streams = <int, IOSink>{};
        final runner = SimulationRunner(
          world: world,
          heroes: catalog,
          aiWorkerFactory: native ? createAiWorker : SynchronousAiWorker.new,
        );
        try {
          return await runner.run(
            SimulationScenario(
              worldId: worldId,
              seed: seed,
              seconds: seconds,
              speed: speed,
              deterministic: !native,
              playerCommander: args.contains('--commander'),
              commanderStrategy: commanderStrategy,
            ),
            onEvent: (event) {
              if (!trace && !event.isVisibleInCountryLog) return;
              final sink = streams.putIfAbsent(
                event.countryId ?? -1,
                () => File(
                  '${out.path}/world${worldId}_seed${seed}_country${event.countryId}.jsonl',
                ).openWrite(),
              );
              sink.writeln(event.toJsonLine());
            },
          );
        } finally {
          for (final sink in streams.values) {
            await sink.flush();
            await sink.close();
          }
        }
      });
      rows.add(row);
      stdout.writeln(
        jsonEncode(
          Map.of(row)
            ..remove('diagnostics')
            ..remove('playerCommands')
            ..remove('exposedCities')
            ..remove('samples')
            ..remove('signature')
            ..remove('initial')
            ..remove('final')
            ..remove('conflicts'),
        ),
      );
      File('${out.path}/results.json')
          .writeAsStringSync(const JsonEncoder.withIndent('  ').convert(rows));
    }
  }
  stdout.writeln('数据模拟完成：${out.path}/results.json');
}
