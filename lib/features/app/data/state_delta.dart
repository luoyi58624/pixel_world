/// 计算结构化增量；数组长度不变时只记录改变的槽位。
Map<String, dynamic>? stateDelta(dynamic before, dynamic after) {
  if (identical(before, after) || before == after) return null;
  if (before is Map && after is Map) {
    final changed = <String, dynamic>{};
    for (final key in after.keys) {
      final delta = before.containsKey(key)
          ? stateDelta(before[key], after[key])
          : {'value': after[key]};
      if (delta != null) changed[key as String] = delta;
    }
    final removed = before.keys
        .where((key) => !after.containsKey(key))
        .toList();
    return changed.isEmpty && removed.isEmpty
        ? null
        : {'map': changed, 'remove': removed};
  }
  if (before is List && after is List && before.length == after.length) {
    final changed = <String, dynamic>{};
    for (var i = 0; i < after.length; i++) {
      final delta = stateDelta(before[i], after[i]);
      if (delta != null) changed['$i'] = delta;
    }
    return changed.isEmpty ? null : {'list': changed};
  }
  return {'value': after};
}

/// 不修改已有帧，允许同一块数据同时用于继续游戏和已保存的回放。
dynamic applyStateDelta(dynamic previous, Map<String, dynamic> delta) {
  if (delta.containsKey('value')) return delta['value'];
  if (delta.containsKey('map')) {
    final result = Map<String, dynamic>.from(previous as Map);
    for (final key in delta['remove']) {
      result.remove(key);
    }
    for (final e in (delta['map'] as Map).entries) {
      result[e.key] = applyStateDelta(
        result[e.key],
        Map<String, dynamic>.from(e.value),
      );
    }
    return result;
  }
  final result = List<dynamic>.of(previous as List);
  for (final e in (delta['list'] as Map).entries) {
    final i = int.parse(e.key);
    result[i] = applyStateDelta(result[i], Map<String, dynamic>.from(e.value));
  }
  return result;
}
