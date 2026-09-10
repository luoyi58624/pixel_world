import 'dart:convert';
import 'dart:js_interop';

import 'package:sembast_web/sembast_web.dart';
import 'package:web/web.dart' as web;

import 'archive_backend.dart';

Future<Map<String, dynamic>> _pack(Map<String, dynamic> value) async {
  final bytes = utf8.encode(jsonEncode(value));
  final codec = web.CompressionStream('gzip');
  final stream = web.Blob([bytes.toJS].toJS).stream().pipeThrough(
    web.ReadableWritablePair(
      readable: codec.readable,
      writable: codec.writable,
    ),
  );
  final result = await web.Response(stream).arrayBuffer().toDart;
  return {'gzip': base64Encode(result.toDart.asUint8List())};
}

Future<Map<String, dynamic>> _unpack(Map<String, dynamic> value) async {
  if (value['gzip'] == null) return value;
  final bytes = base64Decode(value['gzip'] as String);
  final codec = web.DecompressionStream('gzip');
  final stream = web.Blob([bytes.toJS].toJS).stream().pipeThrough(
    web.ReadableWritablePair(
      readable: codec.readable,
      writable: codec.writable,
    ),
  );
  final result = await web.Response(stream).arrayBuffer().toDart;
  return Map<String, dynamic>.from(
    jsonDecode(utf8.decode(result.toDart.asUint8List())),
  );
}

/// IndexedDB 只保留压缩块，由浏览器压缩流处理大数据。
Future<ArchiveBackend> openArchiveDatabase() async {
  final db = await databaseFactoryWeb.openDatabase('dragon_heroes');
  final backend = PackedArchiveBackend(db, pack: _pack, unpack: _unpack);
  await backend.call('compactLegacy', {});
  return backend;
}
