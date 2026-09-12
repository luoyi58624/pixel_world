import 'package:sembast/sembast_memory.dart';

import 'archive_database.dart';
import 'archive_backend.dart';
import 'state_delta.dart';

/// 主页面的最近游玩、手动存档或回放概要。
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

  /// 手动存档使用独立快照，不随最近游玩的进度更新。
  bool get manual => data['manual'] == true;
}

/// 最近游玩与回放共用帧数据，手动存档独立保存完整进度。
class GameArchive {
  final _eventCache = <String, Map<String, dynamic>>{};

  /// 正式运行使用平台后台，测试可注入隔离数据库或后台。
  GameArchive({
    Future<Database> Function()? open,
    Future<ArchiveBackend> Function()? backend,
  }) : _open =
           backend ??
           (open == null
               ? openArchiveDatabase
               : () async => PackedArchiveBackend(
                   await open(),
                   pack: (v) async => v,
                   unpack: (v) async => v,
                 ));

  /// 测试使用隔离的内存存储。
  factory GameArchive.memory() => GameArchive(
    open: () => databaseFactoryMemory.openDatabase('test-${_serial++}'),
  );
  static int _serial = 0;
  final Future<ArchiveBackend> Function() _open;
  Future<ArchiveBackend>? _database;
  Future<ArchiveBackend> get _db =>
      _database ??= _open().catchError((Object e) {
        _database = null;
        throw e;
      });

  /// 只读取概要，不将所有历史回放展开到主线程。
  Future<List<ArchiveEntry>> list({
    bool replays = false,
    bool manual = false,
  }) async {
    final values = await (await _db).call('list', {
      'replays': replays,
      'manual': manual,
    }) as List;
    return [
      for (final v in values)
        ArchiveEntry(v['id'], Map<String, dynamic>.from(v['data'])),
    ];
  }

  /// 检查点与新增回放帧一起提交，已写入的关键帧不会反复编码。
  Future<void> write(
    String id,
    Map<String, dynamic> meta,
    Map<int, Map<String, dynamic>> chunks, {
    Map<String, dynamic>? checkpoint,
    Map<String, Map<String, dynamic>> events = const {},
  }) async {
    await (await _db).call('write', {
      'run': id,
      'meta': meta,
      'checkpoint': checkpoint,
      'events': events,
      'chunks': {for (final e in chunks.entries) '${e.key}': e.value},
    });
  }

  /// 手动保存冻结终点。
  Future<void> saveReplay(Map<String, dynamic> meta) async {
    final id =
        '${meta['run']}-${DateTime.now().microsecondsSinceEpoch}-${_serial++}';
    await (await _db).call('replay', {'id': id, 'meta': meta});
  }

  /// 手动保存完整进度，与最近游玩及回放数据独立持久化。
  Future<void> saveGame(
    Map<String, dynamic> meta,
    Map<String, dynamic> state,
  ) async {
    final id = 'save-${DateTime.now().microsecondsSinceEpoch}-${_serial++}';
    await (await _db).call('save', {
      'id': id,
      'meta': meta,
      'checkpoint': state,
    });
  }

  /// 删除单条目录，仍被回放引用的底层数据会保留。
  Future<void> delete(ArchiveEntry entry, {bool replay = false}) async {
    await (await _db).call('delete', {
      'id': entry.id,
      'replay': replay,
      'manual': entry.manual,
    });
  }

  /// 回放日志按事件编号单独读取，只缓存最近的可见事件。
  Future<Map<String, dynamic>> hydrateReplay(
    String run,
    Map<String, dynamic> state,
  ) async {
    final campaign = state['campaign'] as Map?,
        log = (state['campaign'] as Map?)?['eventLog'] as Map?;
    if (log == null || log['external'] != true) return state;
    final countries = log['countries'] as Map;
    final ids = <String>{};
    for (final country in countries.values) {
      for (final key in ['recent', 'decisions', 'timeline']) {
        ids.addAll((country[key] as List).map((id) => '$id'));
      }
    }
    final missing = ids
        .where((id) => !_eventCache.containsKey('$run:$id'))
        .toList();
    if (missing.isNotEmpty) {
      final values =
          await (await _db).call('events', {'run': run, 'ids': missing}) as Map;
      for (final e in values.entries) {
        _eventCache['$run:${e.key}'] = Map<String, dynamic>.from(e.value);
      }
    }
    final expanded = <String, dynamic>{};
    for (final entry in countries.entries) {
      final value = Map<String, dynamic>.from(entry.value);
      final selected = <String>{};
      for (final key in ['recent', 'decisions', 'timeline']) {
        selected.addAll((value[key] as List).map((id) => '$id'));
      }
      value['events'] = {
        for (final id in selected)
          id:
              _eventCache['$run:$id'] ??
              (throw const FormatException('回放日志不完整')),
      };
      expanded[entry.key as String] = value;
    }
    while (_eventCache.length > 4096) {
      _eventCache.remove(_eventCache.keys.first);
    }
    return {
      ...state,
      'campaign': {
        ...campaign!,
        'eventLog': {...log, 'countries': expanded},
      },
    };
  }

  /// 按需展开一个回放块，同时兼容旧版整块记录。
  Future<Map<String, dynamic>> chunk(String run, int number) async =>
      Map<String, dynamic>.from(
        await (await _db).call('chunk', {'run': run, 'number': number}),
      );

  /// 续玩使用独立完整检查点，旧记录回退到原有关键帧恢复。
  Future<Map<String, dynamic>> resume(ArchiveEntry entry) async {
    final checkpoint = await (await _db).call('checkpoint', {
      'run': entry.manual ? entry.id : entry.run,
    });
    if (checkpoint != null) return Map<String, dynamic>.from(checkpoint);
    if (entry.manual) throw const FormatException('手动存档缺少完整进度');
    return decodeFrame(
      await chunk(
        entry.run,
        entry.lastFrame ~/ SessionRecording.framesPerChunk,
      ),
      entry.lastFrame % SessionRecording.framesPerChunk,
    );
  }

  /// 应用有界增量，不修改之前的帧。
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

  /// 等待后台关闭，测试或应用销毁时调用。
  Future<void> close() async {
    if (_database != null) await (await _database!).close();
    _database = null;
    _eventCache.clear();
  }
}

/// 当前局只保留一小块回放与待提交帧，长局不会无限堆积内存。
class SessionRecording {
  /// 新局首次落盘替换旧自动存档，续玩追加到新块，手动回放保持不变。
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
  Map<String, dynamic>? _checkpoint;
  final _pendingEvents = <String, Map<String, dynamic>>{};
  int _eventSequence = 0;
  Future<void>? _writing;

  /// 获取最后捕获帧的信息，手动回放以此终点冻结。
  Map<String, dynamic> get metadata => Map<String, dynamic>.from(_meta!);

  /// 完整续玩状态只在自动保存周期或明确保存时生成。
  void checkpoint(Map<String, dynamic> state) => _checkpoint = state;

  /// 捕获一次完整状态，压缩为增量；不在这里执行磁盘操作。
  void capture(Map<String, dynamic> state) {
    final log = (state['campaign'] as Map?)?['eventLog'] as Map?;
    if (log != null) {
      final countries = <String, dynamic>{};
      for (final e in (log['countries'] as Map).entries) {
        final data = Map<String, dynamic>.from(e.value);
        final events = data.remove('events') as Map;
        for (final event in events.entries) {
          if (int.parse(event.key) > _eventSequence) {
            _pendingEvents[event.key as String] = Map<String, dynamic>.from(
              event.value,
            );
          }
        }
        countries[e.key as String] = data;
      }
      _eventSequence = log['sequence'] as int;
      state = {
        ...state,
        'campaign': {
          ...(state['campaign'] as Map),
          'eventLog': {...log, 'external': true, 'countries': countries},
        },
      };
    }
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
  Future<void> flush() {
    final writing = _writing;
    if (writing != null) return writing.then((_) => flush());
    return _writing = _drain().whenComplete(() => _writing = null);
  }

  Future<void> _drain() async {
    if (_dirty.isNotEmpty || _checkpoint != null || _pendingEvents.isNotEmpty) {
      final pending = Map<int, Map<String, dynamic>>.of(_dirty),
          meta = metadata;
      final checkpoint = _checkpoint;
      final events = Map<String, Map<String, dynamic>>.of(_pendingEvents);
      // 事务必须拿到冻结数据，后续 capture 只创建新块对象。
      await archive.write(
        run,
        meta,
        pending,
        checkpoint: checkpoint,
        events: events,
      );
      for (final e in events.entries) {
        if (identical(_pendingEvents[e.key], e.value)) {
          _pendingEvents.remove(e.key);
        }
      }
      if (identical(_checkpoint, checkpoint)) _checkpoint = null;
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
