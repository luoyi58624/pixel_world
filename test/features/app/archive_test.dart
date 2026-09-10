import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:sembast/sembast_io.dart';
import 'package:sembast/sembast_memory.dart';
import 'package:pixel_world/features/app/data/game_archive.dart';
import 'package:pixel_world/features/app/data/archive_backend.dart';
import 'package:pixel_world/features/app/data/replay_reader.dart';
import 'package:pixel_world/features/app/data/state_delta.dart';

Map<String, dynamic> frame(int n) => {
  'campaign': {
    'time': [n],
    'defeat': null,
  },
  'counter': n,
  'objects': {
    'hero': [n, n * 2],
    if (n.isEven) 'weapon': 1,
  },
};

class FailingArchive extends GameArchive {
  bool fail = false;
  FailingArchive()
    : super(open: () => databaseFactoryMemory.openDatabase('failure-test'));
  @override
  Future<void> write(
    String id,
    Map<String, dynamic> meta,
    Map<int, Map<String, dynamic>> chunks, {
    Map<String, dynamic>? checkpoint,
    Map<String, Map<String, dynamic>> events = const {},
  }) {
    if (fail) throw const FileSystemException('模拟写入失败');
    return super.write(
      id,
      meta,
      chunks,
      checkpoint: checkpoint,
      events: events,
    );
  }
}

void main() {
  test('追加回放只编码新帧，关键帧在一个块中只写一次', () async {
    var bases = 0, frames = 0;
    final db = await databaseFactoryMemory.openDatabase('append-count');
    final archive = GameArchive(
      backend: () async => PackedArchiveBackend(
        db,
        pack: (value) async {
          if (value.containsKey('counter')) bases++;
          if (value.containsKey('delta')) frames++;
          return value;
        },
        unpack: (value) async => value,
      ),
    );
    addTearDown(archive.close);
    final recording = SessionRecording(archive, mapIndex: 0, signature: 'test');
    for (var i = 0; i < 25; i++) {
      recording.capture(frame(i));
      await recording.flush();
    }
    expect(bases, 2);
    expect(frames, 25);
  });
  test('增量覆盖删除、列表槽位与类型变化，不改写旧帧', () {
    final before = frame(0), after = frame(1), original = jsonEncode(before);
    expect(applyStateDelta(before, stateDelta(before, after)!), after);
    expect(jsonEncode(before), original);
    expect(applyStateDelta([1, 2], stateDelta([1, 2], [3])!), [3]);
  });

  test('自动记录跨块恢复，手动回放终点冻结且可向前向后拖动', () async {
    final archive = GameArchive.memory();
    addTearDown(archive.close);
    final recording = SessionRecording(archive, mapIndex: 0, signature: 'test');
    for (var i = 0; i < 25; i++) {
      recording.elapsed = i / 10;
      recording.capture(frame(i));
    }
    await recording.saveReplay();
    for (var i = 25; i < 55; i++) {
      recording.elapsed = i / 10;
      recording.capture(frame(i));
    }
    await recording.flush();
    final entry = (await archive.list()).single,
        replay = (await archive.list(replays: true)).single;
    expect((await archive.resume(entry))['counter'], 54);
    final reader = ReplayReader(archive, replay);
    expect((await reader.seek(999))['counter'], 24);
    expect((await reader.seek(.5))['counter'], 5);
    expect((await reader.seek(2.1))['counter'], 21);
    final resumed = SessionRecording(
      archive,
      mapIndex: 0,
      signature: 'test',
      previous: entry,
    );
    resumed.capture(frame(55));
    await resumed.flush();
    expect((await reader.seek(999))['counter'], 24);
    expect(
      (await archive.resume((await archive.list()).single))['counter'],
      55,
    );
  });

  test('没有执行退出流程也能从磁盘重开最后提交的进度', () async {
    final directory = await Directory.systemTemp.createTemp(
      'dragon-save-test-',
    );
    addTearDown(() => directory.delete(recursive: true));
    final path = '${directory.path}/game.db';
    final first = GameArchive(open: () => databaseFactoryIo.openDatabase(path));
    final recording = SessionRecording(first, mapIndex: 1, signature: 'test')
      ..capture(frame(7));
    await recording.flush();
    // 不执行保存回放和游戏退出逻辑，只关闭底层句柄模拟进程结束。
    await first.close();
    final second = GameArchive(
      open: () => databaseFactoryIo.openDatabase(path),
    );
    final saves = await second.list();
    expect((await second.resume(saves.single))['counter'], 7);
    expect(await second.list(replays: true), isEmpty);
    await second.close();
  });

  test('写入失败保留上一份进度且不会发布虚假回放，重试可恢复', () async {
    final archive = FailingArchive();
    addTearDown(archive.close);
    final recording = SessionRecording(archive, mapIndex: 0, signature: 'test')
      ..capture(frame(0));
    await recording.flush();
    archive.fail = true;
    recording.capture(frame(1));
    await expectLater(
      recording.saveReplay(),
      throwsA(isA<FileSystemException>()),
    );
    expect((await archive.resume((await archive.list()).single))['counter'], 0);
    expect(await archive.list(replays: true), isEmpty);
    archive.fail = false;
    await recording.flush();
    expect((await archive.resume((await archive.list()).single))['counter'], 1);
  });
}
