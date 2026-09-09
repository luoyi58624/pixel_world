import 'dart:async';
import 'dart:isolate';

import 'transport.dart';
import 'worker_server.dart';

/// 创建正式原生后台传输。
AiTransport createAiTransport() => _IsolateTransport();

class _IsolateTransport implements AiTransport {
  final _messages = StreamController<String>();
  final _inbox = ReceivePort(), _errors = ReceivePort(), _exit = ReceivePort();
  Isolate? _isolate;
  SendPort? _sendPort;
  Completer<void>? _startup;
  bool _closed = false;
  @override
  String get name => 'isolate';
  @override
  Stream<String> get messages => _messages.stream;
  @override
  Future<void> start() async {
    final ready = _startup = Completer<void>();
    _inbox.listen((message) {
      if (_closed) return;
      if (message is SendPort) {
        _sendPort = message;
        if (!ready.isCompleted) ready.complete();
      } else if (message is String) {
        _messages.add(message);
      }
    });
    _errors.listen((error) {
      if (!_closed) _messages.addError(StateError('AI Isolate 异常：$error'));
    });
    _exit.listen((_) {
      if (!_closed) _messages.addError(StateError('AI Isolate 意外退出'));
    });
    final isolate = await Isolate.spawn(
      _entry,
      _inbox.sendPort,
      onError: _errors.sendPort,
      onExit: _exit.sendPort,
      debugName: 'national-ai',
    );
    if (_closed) {
      isolate.kill(priority: Isolate.immediate);
      return;
    }
    _isolate = isolate;
    await ready.future;
  }

  @override
  void send(String message) => _sendPort?.send(message);
  @override
  void close() {
    if (_closed) return;
    _closed = true;
    if (_startup?.isCompleted == false) _startup!.complete();
    _isolate?.kill(priority: Isolate.immediate);
    _inbox.close();
    _errors.close();
    _exit.close();
    unawaited(_messages.close());
  }
}

void _entry(SendPort parent) {
  final input = ReceivePort();
  parent.send(input.sendPort);
  final service = AiWorkerServer(
    parent.send,
    'isolate:${Isolate.current.debugName}',
  );
  input.listen((message) {
    if (message is String) service.receive(message);
  });
  service.hello();
}
