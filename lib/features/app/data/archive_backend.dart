import 'package:sembast/sembast.dart';

/// 存储命令接口，原生实现通过常驻 Isolate 执行。
abstract interface class ArchiveBackend {
  /// 执行原子写入、按需读取或删除。
  Future<dynamic> call(String command, Map<String, dynamic> arguments);

  /// 完成写入后释放连接。
  Future<void> close();
}

/// 数据库只缓存压缩内容，完整历史仅在读取时解码。
class PackedArchiveBackend implements ArchiveBackend {
  /// 测试可注入原样编码，正式端使用后台压缩。
  PackedArchiveBackend(this.db, {required this.pack, required this.unpack});

  /// 数据库连接。
  final Database db;

  /// 编码存储块。
  final Future<Map<String, dynamic>> Function(Map<String, dynamic>) pack;

  /// 兼容读取旧版未压缩块。
  final Future<Map<String, dynamic>> Function(Map<String, dynamic>) unpack;
  StoreRef<String, Map<String, Object?>> _store(String name) =>
      stringMapStoreFactory.store(name);

  @override
  Future<dynamic> call(String command, Map<String, dynamic> a) async {
    final run = a['run'] as String?;
    switch (command) {
      case 'list':
        final values = await _store(
          a['replays'] == true ? 'replays' : 'runs',
        ).find(db, finder: Finder(sortOrders: [SortOrder('updated', false)]));
        return [
          for (final v in values) {'id': v.key, 'data': v.value},
        ];
      case 'write':
        final eventRecords = <String, Map<String, dynamic>>{};
        for (final e in (a['events'] as Map? ?? {}).entries) {
          eventRecords['$run:${e.key}'] = await pack(
            Map<String, dynamic>.from(e.value),
          );
        }
        final chunks = Map<String, dynamic>.from(a['chunks']);
        final bases = <String, Map<String, dynamic>>{},
            frames = <String, Map<String, dynamic>>{};
        final heads = <String, int>{};
        for (final e in chunks.entries) {
          final key = '$run:${e.key}', block = e.value;
          final old = await _store('heads').record(key).get(db);
          final count = old?['count'] as int? ?? 0;
          if (old == null) {
            bases[key] = await pack(Map<String, dynamic>.from(block['base']));
          }
          final values = block['frames'] as List;
          for (var i = count; i < values.length; i++) {
            frames['$key:$i'] = await pack(
              Map<String, dynamic>.from(values[i]),
            );
          }
          heads[key] = values.length;
        }
        final checkpoint = a['checkpoint'] == null
            ? null
            : await pack(Map<String, dynamic>.from(a['checkpoint']));
        await db.transaction((txn) async {
          for (final e in eventRecords.entries) {
            await _store('events').record(e.key).put(txn, e.value);
          }
          for (final e in bases.entries) {
            await _store('bases').record(e.key).put(txn, e.value);
          }
          for (final e in frames.entries) {
            await _store('frames').record(e.key).put(txn, e.value);
          }
          for (final e in heads.entries) {
            await _store('heads').record(e.key).put(txn, {'count': e.value});
          }
          if (checkpoint != null) {
            await _store('checkpoints').record(run!).put(txn, checkpoint);
          }
          await _store('runs')
              .record(run!)
              .put(txn, Map<String, dynamic>.from(a['meta']));
        });
        return null;
      case 'events':
        final values = <String, dynamic>{};
        for (final id in a['ids'] as List) {
          final data = await _store('events').record('$run:$id').get(db);
          if (data == null) throw const FormatException('回放日志丢失');
          values[id as String] = await unpack(Map<String, dynamic>.from(data));
        }
        return values;
      case 'checkpoint':
        final saved = await _store('checkpoints').record(run!).get(db);
        return saved == null ? null : unpack(Map<String, dynamic>.from(saved));
      case 'chunk':
        final key = '$run:${a['number']}';
        final head = await _store('heads').record(key).get(db);
        if (head == null) {
          final old = await _store('chunks').record(key).get(db);
          if (old == null) throw const FormatException('记录数据不完整');
          return unpack(Map<String, dynamic>.from(old));
        }
        final base = await _store('bases').record(key).get(db);
        if (base == null) throw const FormatException('记录缺少关键帧');
        final values = <Map<String, dynamic>>[];
        for (var i = 0; i < (head['count'] as int); i++) {
          final frame = await _store('frames').record('$key:$i').get(db);
          if (frame == null) throw const FormatException('回放帧不完整');
          values.add(await unpack(Map<String, dynamic>.from(frame)));
        }
        return {
          'base': await unpack(Map<String, dynamic>.from(base)),
          'frames': values,
        };
      case 'replay':
        await _store('replays')
            .record(a['id'])
            .put(db, Map<String, dynamic>.from(a['meta']));
        return null;
      case 'delete':
        await db.transaction((txn) async {
          final target = a['replay'] == true ? 'replays' : 'runs';
          final entry = await _store(target).record(a['id']).get(txn);
          if (entry == null) return;
          final id = entry['run'] as String;
          await _store(target).record(a['id']).delete(txn);
          final retained = await _store('replays')
              .count(txn, filter: Filter.equals('run', id));
          final active = await _store('runs').record(id).exists(txn);
          // 仍被回放引用的帧不能随着进度删除。
          if (!active) await _store('checkpoints').record(id).delete(txn);
          if (!active && retained == 0) {
            for (final name in [
              'chunks',
              'bases',
              'heads',
              'frames',
              'events',
            ]) {
              await _store(name).delete(
                txn,
                finder: Finder(
                  filter: Filter.custom(
                    (record) => (record.key as String).startsWith('$id:'),
                  ),
                ),
              );
            }
          }
        });
        return null;
      case 'compactLegacy':
        var changed = false;
        final keys = await _store('chunks').findKeys(db);
        for (final key in keys) {
          final value = await _store('chunks').record(key).get(db);
          if (value != null && !value.containsKey('gzip')) {
            await _store('chunks')
                .record(key)
                .put(db, await pack(Map<String, dynamic>.from(value)));
            changed = true;
          }
        }
        if (changed) await db.compact();
        return null;
      default:
        throw UnsupportedError(command);
    }
  }

  @override
  Future<void> close() => db.close();
}
