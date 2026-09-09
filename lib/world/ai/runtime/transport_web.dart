import 'dart:async';
import 'dart:js_interop';

import 'transport.dart';
import 'build_stamp.dart';

@JS('Worker')
extension type _BrowserWorker._(JSObject _) implements JSObject {
  external factory _BrowserWorker(JSString url);
  external set onmessage(JSFunction callback);
  external set onerror(JSFunction callback);
  external void postMessage(JSAny? message);
  external void terminate();
}

@JS()
extension type _MessageEvent._(JSObject _) implements JSObject {
  external JSAny? get data;
}

@JS('document.baseURI')
external JSString get _baseUri;

/// Web 始终使用真实 Dedicated Worker，不以 compute 退回主线程。
AiTransport createAiTransport() => _WebTransport();

class _WebTransport implements AiTransport {
  final _messages = StreamController<String>();
  _BrowserWorker? _worker;
  bool _closed = false;
  @override
  String get name => 'web-worker';
  @override
  Stream<String> get messages => _messages.stream;
  @override
  Future<void> start() async {
    final url = Uri.parse(_baseUri.toDart)
        .resolve('ai/worker.js?v=$aiBuildStamp');
    final worker = _BrowserWorker(url.toString().toJS);
    _worker = worker;
    worker.onmessage = ((_MessageEvent event) {
      if (!_closed) _messages.add((event.data as JSString).toDart);
    }).toJS;
    worker.onerror = ((JSAny? event) {
      if (!_closed) _messages.addError(StateError('国家 AI Worker 加载或执行失败'));
    }).toJS;
  }

  @override
  void send(String message) => _worker?.postMessage(message.toJS);
  @override
  void close() {
    if (_closed) return;
    _closed = true;
    _worker?.terminate();
    unawaited(_messages.close());
  }
}
