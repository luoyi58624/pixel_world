import 'package:sembast/sembast_memory.dart';

import 'archive_database.dart';
import 'state_delta.dart';

/// 主页面一条自动存档或手动保存的回放。
class ArchiveEntry {
  /// 从版本化数据库记录读取概要，实际帧按需加载。
  ArchiveEntry(this.id, this.data);

  /// 记录的唯一编号。
  final String id;

  /// 冻结的展示信息和帧范围。
  final Map<String, dynamic> data;

  /// 所属游戏记录编号。
  String get run => data['run'] as String;

  /// 所选地图。
  int get mapIndex => data['map'] as int;

  /// 记录包含的最后帧编号。
  int get lastFrame => data['frame'] as int;

  /// 实际操作时间轴秒数，暂停也保留操作顺序。
  double get duration => (data['duration'] as num).toDouble();

  /// 最后保存时间。
  DateTime get updated => DateTime.parse(data['updated'] as String).toLocal();

  /// 保存时的游戏年月。
  String get dateLabel => data['date'] as String;

  /// 该局是否已经结束。
  bool get ended => data['ended'] == true;
}

/// 自动存档与手动回放共用帧数据，但拥有独立目录和不可变的回放终点。
class GameArchive {
  /// 默认使用平台持久化数据库，测试显式提供内存数据库。
  GameArchive({Future<Database> Function()? open})
    : _open = open ?? openArchiveDatabase;

  /// 隔离测试所用的内存存储，不影响玩家存档。
  factory GameArchive.memory() => GameArchive(
    open: () => databaseFactoryMemory.openDatabase('test-${_serial++}'),
  );
  static int _serial = 0;
  final Future<Database> Function() _open;
  Future<Database>? _database;
  final _runs = stringMapStoreFactory.store('runs');
  final _replays = stringMapStoreFactory.store('replays');
  final _chunks = stringMapStoreFactory.store('chunks');
  Future<Database> get _db => _database ??= _open().catchError((Object e) {
    _database = null;
    throw e;
  });

  /// 读取最近的历史记录，不加载所有回放帧。
  Future<List<ArchiveEntry>> list({bool replays = false}) async {
    final values = await (replays ? _replays : _runs).find(
      await _db,
      finder: Finder(sortOrders: [SortOrder('updated', false)]),
    );
    return [
      for (final v in values)
        ArchiveEntry(v.key, Map<String, dynamic>.from(v.value)),
    ];
  }

  /// 存档概要与新增帧同一事务提交，任何写入失败都不会推进存档终点。
  Future<void> write(
    String id,
    Map<String, dynamic> meta,
    Map<int, Map<String, dynamic>> chunks,
  ) async {
    final db = await _db;
    await db.transaction((txn) async {
      for (final e in chunks.entries) {
        await _chunks.record('$id:${e.key}').put(txn, e.value);
      }
      await _runs.record(id).put(txn, meta);
    });
  }

  /// 手动冻结当前终点，后续继续游戏不会改写这条回放。
  Future<void> saveReplay(Map<String, dynamic> meta) async {
    final id =
        '${meta['run']}-${DateTime.now().microsecondsSinceEpoch}-${_serial++}';
    await _replays.record(id).put(await _db, meta);
  }

  /// 回放块包含一个完整关键帧与少量增量，拖动时无需从开局重演。
  Future<Map<String, dynamic>> chunk(String run, int number) async {
    final result = await _chunks.record('$run:$number').get(await _db);
    if (result == null) throw const FormatException('记录数据不完整');
    return Map<String, dynamic>.from(result);
  }

  /// 恢复最后一次成功提交的完整状态。
  Future<Map<String, dynamic>> resume(ArchiveEntry entry) async {
    final block = await chunk(
      entry.run,
      entry.lastFrame ~/ SessionRecording.framesPerChunk,
    );
    return decodeFrame(
      block,
      entry.lastFrame % SessionRecording.framesPerChunk,
    );
  }

  /// 从一个关键帧定位至指定槽位，返回独立的逻辑状态。
  static Map<String, dynamic> decodeFrame(
    Map<String, dynamic> block,
    int offset,
  ) {
    final frames = block['frames'] as List;
    if (offset < 0 || offset >= frames.length) {
      throw const FormatException('记录终点无效');
    }
    dynamic state = block['base'];
    for (var i = 1; i <= offset; i++) {
      state = applyStateDelta(
        state,
        Map<String, dynamic>.from(frames[i]['delta']),
      );
    }
    return Map<String, dynamic>.from(state);
  }

  /// 关闭存储，主要用于验证重新打开后的异常退出恢复。
  Future<void> close() async {
    if (_database != null) await (await _database!).close();
    _database = null;
  }
}

/// 当前局只保留一小块回放与待提交帧，长局不会无限堆积内存。
class SessionRecording {
  /// 新局创建独立记录，旧局继续时追加到新块，已有手动回放保持不变。
  SessionRecording(
    this.archive, {
    required this.mapIndex,
    required this.signature,
    ArchiveEntry? previous,
  }) : run =
           previous?.run ??
           '${DateTime.now().microsecondsSinceEpoch}-${_serial++}',
       elapsed = previous?.duration ?? 0,
       _blocks = [
         for (final b in previous?.data['blocks'] ?? []) List<dynamic>.of(b),
       ],
       _nextFrame = previous == null
           ? 0
           : ((previous.lastFrame ~/ framesPerChunk) + 1) * framesPerChunk;
  static int _serial = 0;

  /// 每块最多记录两秒，限制任意跳转的重建工作量。
  static const framesPerChunk = 20;

  /// 持久化目标。
  final GameArchive archive;

  /// 当前地图。
  final int mapIndex;

  /// 静态资源与规则指纹，拒绝错误版本静默恢复。
  final String signature;

  /// 当前对局身份。
  final String run;

  /// 从开局累计的实际操作时间。
  double elapsed;
  int _nextFrame;
  Map<String, dynamic>? _lastState, _meta;
  final List<List<dynamic>> _blocks;
  final _dirty = <int, Map<String, dynamic>>{};
  Map<String, dynamic>? _block;
  Future<void>? _writing;

  /// 获取最后捕获帧的信息，手动回放以此终点冻结。
  Map<String, dynamic> get metadata => Map<String, dynamic>.from(_meta!);

  /// 捕获一次完整状态，压缩为增量；不在这里执行磁盘操作。
  void capture(Map<String, dynamic> state) {
    final number = _nextFrame ~/ framesPerChunk,
        offset = _nextFrame % framesPerChunk;
    if (offset == 0) {
      _block = {'base': state, 'frames': <dynamic>[]};
    }
    final frames = List<dynamic>.of(_block!['frames'] as List);
    frames.add({
      'at': elapsed,
      'delta': offset == 0
          ? null
          : stateDelta(_lastState, state) ?? {'map': {}, 'remove': []},
    });
    _block = {'base': _block!['base'], 'frames': frames};
    _dirty[number] = _block!;
    _lastState = state;
    if (offset == 0) _blocks.add([number, elapsed, elapsed]);
    _blocks[_blocks.length - 1] = [number, _blocks.last[1], elapsed];
    final campaign = state['campaign'] as Map;
    _meta = {
      'version': 1,
      'run': run,
      'map': mapIndex,
      'signature': signature,
      'frame': _nextFrame++,
      'duration': elapsed,
      'updated': DateTime.now().toUtc().toIso8601String(),
      'date':
          '${campaign['time'][0] ~/ 12 + 1}年${campaign['time'][0] % 12 + 1}月',
      'ended': campaign['defeat'] != null,
      'blocks': [for (final b in _blocks) List<dynamic>.of(b)],
    };
  }

  /// 串行提交并合并期间产生的新帧，失败保留待写内容供重试。
  Future<void> flush() =>
      _writing ??= _drain().whenComplete(() => _writing = null);
  Future<void> _drain() async {
    while (_dirty.isNotEmpty) {
      final pending = Map<int, Map<String, dynamic>>.of(_dirty),
          meta = metadata;
      // 事务必须拿到冻结数据，后续 capture 只创建新块对象。
      await archive.write(run, meta, pending);
      for (final e in pending.entries) {
        if (identical(_dirty[e.key], e.value)) _dirty.remove(e.key);
      }
    }
  }

  /// 等自动存档落盘后才发布回放目录，失败时不显示虚假的已保存记录。
  Future<void> saveReplay() async {
    final endpoint = metadata;
    await flush();
    await archive.saveReplay(endpoint);
  }
}
