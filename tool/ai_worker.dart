import 'dart:js_interop';

import 'package:pixel_world/world/ai/runtime/worker_server.dart';

@JS()
extension type _WorkerScope._(JSObject _) implements JSObject {
  external set onmessage(JSFunction callback);
  external void postMessage(JSAny? value);
}

@JS()
extension type _Message._(JSObject _) implements JSObject {
  external JSAny? get data;
}

@JS('self')
external _WorkerScope get _scope;
@JS('self.constructor.name')
external JSString get _scopeName;

/// 单独编译的 Dedicated Worker 入口，与 Flutter JS/Wasm UI 通过 JSON 通信。
void main() {
  final server = AiWorkerServer(
    (message) => _scope.postMessage(message.toJS),
    'web-worker:${_scopeName.toDart}',
  );
  _scope.onmessage = ((_Message event) => server.receive(
    (event.data as JSString).toDart,
  )).toJS;
  server.hello();
}
