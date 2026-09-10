import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'dart:isolate';

import 'package:path_provider/path_provider.dart';
import 'package:sembast/sembast_io.dart';

import 'archive_backend.dart';

/// 常驻存储线程负责 JSON、压缩及磁盘整理，测试可指定隔离路径。
Future<ArchiveBackend> openArchiveDatabase({String? path}) async {
  final directory = path == null
      ? await getApplicationSupportDirectory()
      : File(path).parent;
  await directory.create(recursive: true);
  final receive = ReceivePort();
  final worker = await Isolate.spawn(_archiveWorker, [
    receive.sendPort,
    path ?? '${directory.path}/dragon_heroes.db',
  ]);
  final backend = _RemoteArchiveBackend(worker, receive);
  try {
    await backend.ready.future;
  } catch (_) {
    await backend.close().catchError((_) {});
    rethrow;
  }
  return backend;
}

class _RemoteArchiveBackend implements ArchiveBackend {
  _RemoteArchiveBackend(this.worker, this.port) {
    subscription = port.listen((dynamic message) {
      if (message is SendPort) {
        send = message;
        ready.complete();
        return;
      }
      if (message == null) {
        _fail(StateError('存储后台已停止'));
        return;
      }
      if (message is List) {
        _fail(StateError('存储后台异常：${message.first}'));
        return;
      }
      final id = message['id'] as int?;
      if (id == null) {
        _fail(StateError('${message['error']}'));
        return;
      }
      final completer = pending.remove(id);
      if (message['error'] != null) {
        completer?.completeError(StateError(message['error']));
      } else {
        completer?.complete(message['result']);
      }
    });
    worker.addErrorListener(port.sendPort);
    worker.addOnExitListener(port.sendPort);
  }
  final Isolate worker;
  final ReceivePort port;
  late final StreamSubscription<dynamic> subscription;
  final ready = Completer<void>();
  final pending = <int, Completer<dynamic>>{};
  SendPort? send;
  int serial = 0;
  Object? failure;
  void _fail(Object error) {
    failure = error;
    if (!ready.isCompleted) ready.completeError(error);
    for (final c in pending.values) {
      c.completeError(error);
    }
    pending.clear();
  }

  @override
  Future<dynamic> call(String command, Map<String, dynamic> arguments) async {
    if (failure != null) throw failure!;
    await ready.future;
    final id = ++serial, completer = Completer<dynamic>();
    pending[id] = completer;
    send!.send({'id': id, 'command': command, 'arguments': arguments});
    return completer.future;
  }

  @override
  Future<void> close() async {
    try {
      await call('close', {});
    } finally {
      worker.kill();
      await subscription.cancel();
      port.close();
    }
  }
}

Future<void> _archiveWorker(List<dynamic> message) async {
  final reply = message[0] as SendPort;
  try {
    final path = message[1] as String;
    final file = File(path), backup = File('$path.before-performance-fix');
    if (await file.exists() && !await backup.exists()) {
      await file.copy(backup.path);
    }
    final db = await databaseFactoryIo.openDatabase(path);
    final backend = PackedArchiveBackend(
      db,
      pack: (value) async => {
        'gzip': base64Encode(gzip.encode(utf8.encode(jsonEncode(value)))),
      },
      unpack: (value) async => value['gzip'] == null
          ? value
          : Map<String, dynamic>.from(
              jsonDecode(
                utf8.decode(gzip.decode(base64Decode(value['gzip'] as String))),
              ),
            ),
    );
    await backend.call('compactLegacy', {});
    final port = ReceivePort();
    reply.send(port.sendPort);
    await for (final dynamic request in port) {
      try {
        final command = request['command'] as String;
        if (command == 'close') {
          await backend.close();
          reply.send({'id': request['id'], 'result': null});
          port.close();
          break;
        }
        final result = await backend.call(
          command,
          Map<String, dynamic>.from(request['arguments']),
        );
        reply.send({'id': request['id'], 'result': result});
      } catch (error) {
        reply.send({'id': request['id'], 'error': '$error'});
      }
    }
  } catch (error) {
    reply.send({'error': '$error'});
  }
}
