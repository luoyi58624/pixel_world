import 'game_archive.dart';

/// 按关键帧索引随机访问回放，只缓存最近两个块。
class ReplayReader {
  /// 绑定手动保存时冻结的终点。
  ReplayReader(this.archive, this.entry);

  /// 回放存储。
  final GameArchive archive;

  /// 回放范围。
  final ArchiveEntry entry;
  final _cache = <int, Map<String, dynamic>>{};

  /// 二分查找目标时间，既支持向前快进，也支持向后拖动。
  Future<Map<String, dynamic>> seek(double seconds) async {
    final blocks = entry.data['blocks'] as List;
    if (blocks.isEmpty) throw const FormatException('回放没有帧');
    final at = seconds.clamp(0.0, entry.duration);
    var low = 0, high = blocks.length - 1;
    while (low < high) {
      final mid = (low + high + 1) ~/ 2;
      if ((blocks[mid][1] as num) <= at) {
        low = mid;
      } else {
        high = mid - 1;
      }
    }
    final number = blocks[low][0] as int;
    final block = _cache[number] ?? await archive.chunk(entry.run, number);
    _cache[number] = block;
    if (_cache.length > 2) _cache.remove(_cache.keys.first);
    final frames = block['frames'] as List;
    var offset = 0;
    for (
      var i = 1;
      i < frames.length &&
          number * SessionRecording.framesPerChunk + i <= entry.lastFrame;
      i++
    ) {
      if ((frames[i]['at'] as num) > at) break;
      offset = i;
    }
    return GameArchive.decodeFrame(block, offset);
  }
}
