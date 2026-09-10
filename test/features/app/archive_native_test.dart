import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:sembast/sembast_io.dart';
import 'package:pixel_world/features/app/data/archive_database_native.dart';
import 'package:pixel_world/features/app/data/game_archive.dart';
import 'package:pixel_world/features/app/data/replay_reader.dart';

void main() {
  test('后台压缩旧存档不改变内容，删除进度保留回放，删除最后引用回收数据', () async {
    final dir = await Directory.systemTemp.createTemp('dragon-archive-native-');
    addTearDown(() => dir.delete(recursive: true));
    final path = '${dir.path}/game.db';
    final db = await databaseFactoryIo.openDatabase(path);
    final data = <String, dynamic>{
      'campaign': {
        'time': [0],
        'defeat': null,
      },
      'large': List.filled(3000, '旧记录保留原样'),
    };
    final meta = {
      'version': 1,
      'run': 'old',
      'map': 0,
      'signature': 'fixture',
      'frame': 0,
      'duration': 0.0,
      'date': '1年1月',
      'updated': DateTime.now().toUtc().toIso8601String(),
      'blocks': [
        [0, 0.0, 0.0],
      ],
    };
    await stringMapStoreFactory.store('chunks').record('old:0').put(db, {
      'base': data,
      'frames': [
        {'at': 0.0, 'delta': null},
      ],
    });
    await stringMapStoreFactory.store('runs').record('old').put(db, meta);
    await db.close();
    final original = await File(path).readAsBytes();
    final archive = GameArchive(backend: () => openArchiveDatabase(path: path));
    final save = (await archive.list()).single;
    expect(await archive.resume(save), data);
    expect(await File('$path.before-performance-fix').readAsBytes(), original);
    expect(await File(path).length(), lessThan(original.length ~/ 2));
    await archive.saveReplay(meta);
    final replay = (await archive.list(replays: true)).single;
    await archive.delete(save);
    expect(await archive.list(), isEmpty);
    expect(await ReplayReader(archive, replay).seek(0), data);
    await archive.delete(replay, replay: true);
    expect(await archive.list(replays: true), isEmpty);
    await expectLater(archive.chunk('old', 0), throwsStateError);
    await archive.close();
  });

  const source = String.fromEnvironment('ARCHIVE_BENCHMARK_FILE');
  test('真实旧记录副本的压缩与内容一致性诊断', () async {
    final dir = await Directory.systemTemp.createTemp(
      'dragon-archive-profile-',
    );
    addTearDown(() => dir.delete(recursive: true));
    final path = '${dir.path}/game.db';
    await File(source).copy(path);
    final before = await File(path).length();
    final watch = Stopwatch()..start();
    final archive = GameArchive(backend: () => openArchiveDatabase(path: path));
    final saves = await archive.list();
    for (final save in saves) {
      expect((await archive.resume(save))['campaign'], isA<Map>());
    }
    watch.stop();
    final after = await File(path).length();
    // 只输出大小与耗时，不把玩家的游戏内容写进测试日志。
    // ignore: avoid_print
    print(
      jsonEncode({
        'legacyBytes': before,
        'packedBytes': after,
        'migrationMs': watch.elapsedMilliseconds,
        'saves': saves.length,
      }),
    );
    await archive.close();
  }, skip: source.isEmpty);
}
