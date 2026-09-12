import 'dart:io';
import 'dart:convert';

/// 为开发和发布生成匹配的 AI Worker，不依赖 Flutter 自动编译独立入口。
Future<void> main(List<String> arguments) async {
  final root = Directory.current;
  final sources =
      Directory('lib/features/ai')
          .listSync(recursive: true)
          .whereType<File>()
          .where(
            (f) =>
                f.path.endsWith('.dart') &&
                !f.path.endsWith('build_stamp.dart'),
          )
          .toList()
        ..addAll([
          File('lib/features/battle/domain/combat_rules.dart'),
          File('lib/features/economy/domain/military_upkeep.dart'),
          File('lib/core/config/game_config.dart'),
          File('assets/data/game_config.json'),
          File('tool/ai_worker.dart'),
        ])
        ..sort((a, b) => a.path.compareTo(b.path));
  var hash = 0x811c9dc5;
  for (final file in sources) {
    for (final byte in utf8.encode(
      file.readAsStringSync().replaceAll('\r\n', '\n'),
    )) {
      hash = ((hash ^ byte) * 0x01000193) & 0xffffffff;
    }
  }
  final stamp = hash.toRadixString(16);
  if (arguments.contains('--check')) {
    final marker = File('lib/features/ai/runtime/build_stamp.dart'),
        asset = File('web/ai/worker.js');
    if (!marker.existsSync() ||
        !asset.existsSync() ||
        !marker.readAsStringSync().contains("'$stamp'") ||
        !asset.readAsStringSync().contains(stamp)) {
      stderr.writeln('AI Worker 已过期，请执行 dart run tool/build_ai_worker.dart');
      exit(1);
    }
    stdout.writeln('AI Worker 源码、版本与产物一致：$stamp');
    return;
  }
  File('lib/features/ai/runtime/build_stamp.dart').writeAsStringSync(
    "/// 由构建脚本更新，防止旧 Worker 与新 UI 混用。\nconst aiBuildStamp = '$stamp';\n",
  );
  Directory('web/ai').createSync(recursive: true);
  final result = await Process.run(Platform.resolvedExecutable, [
    'compile',
    'js',
    'tool/ai_worker.dart',
    '-O2',
    '--no-source-maps',
    '-o',
    'web/ai/worker.js',
  ], workingDirectory: root.path);
  stdout.write(result.stdout);
  stderr.write(result.stderr);
  if (result.exitCode != 0) exit(result.exitCode);
  for (final name in ['web/ai/worker.js.map', 'web/ai/worker.js.deps']) {
    final file = File(name);
    if (file.existsSync()) file.deleteSync();
  }
  stdout.writeln('AI Worker 已构建：${hash.toRadixString(16)}');
}
