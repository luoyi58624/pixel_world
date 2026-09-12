import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

void main() {
  test('命令行每个独立对局加载正式配置，并保留已有实验记录', () async {
    final label = 'cli_rules_${DateTime.now().microsecondsSinceEpoch}';
    final args = [
      'run',
      'tool/simulate.dart',
      '--backend',
      'deterministic',
      '--commander',
      '--commander-strategy',
      'conquest',
      '--worlds',
      '0',
      '--seeds',
      '101,223',
      '--seconds',
      '1',
      '--label',
      label,
    ];
    final run = await Process.run('dart', args, runInShell: Platform.isWindows);
    expect(run.exitCode, 0, reason: '${run.stdout}\n${run.stderr}');
    final folder = Directory('build/national_ai/$label');
    final inputs = jsonDecode(
      File('${folder.path}/inputs.json').readAsStringSync(),
    ) as Map<String, dynamic>;
    final resultFile = File('${folder.path}/results.json');
    final saved = resultFile.readAsStringSync();
    final results = jsonDecode(saved) as List;
    expect(results, hasLength(2));
    for (final result in results) {
      // 比较冻结的输入与子 Isolate 实际规则，避免只测到主线程里的静态配置。
      expect(
        result['rules'],
        containsPair(
          'cityDefenseAttackBonuses',
          inputs['gameConfig']['cityDefenseAttackBonuses'],
        ),
      );
      for (final entry in (inputs['gameConfig'] as Map).entries) {
        if (entry.value is! Map) {
          expect(
            result['rules'][entry.key],
            entry.value,
            reason: '${entry.key}',
          );
        }
      }
      expect(result['player'], 'command-api-conquest');
      expect(result['duplicateHeroSamples'], 0);
      expect(result['invalidResourceSamples'], 0);
      final cities = (result['final'] as List).expand(
        (row) => row['cityDetails'] as List,
      );
      expect(cities.length, result['totalCities']);
    }
    final retry = await Process.run(
      'dart',
      args,
      runInShell: Platform.isWindows,
    );
    expect(retry.exitCode, isNot(0));
    expect(resultFile.readAsStringSync(), saved);
  }, timeout: const Timeout(Duration(minutes: 2)));
}
