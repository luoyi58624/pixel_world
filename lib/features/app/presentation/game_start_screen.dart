import 'package:flutter/material.dart';

import 'dart:async';

import '../../world_map/presentation/world_screen.dart';
import '../data/game_archive.dart';
import 'mobile_display.dart';

const _gold = Color(0xffd6bd7c);
const _cream = Color(0xffece7d1);
const _names = ['燃烧的热情', '辽阔的土地', '抵上命也***'];

/// 选择远征地图，确认后才创建游戏会话。
class GameStartScreen extends StatefulWidget {
  /// 创建游戏开始界面。
  const GameStartScreen({
    super.key,
    this.archive,
    this.persistenceEnabled = true,
  });

  /// 主页面与当前游戏共用的历史存储。
  final GameArchive? archive;

  /// 独立界面测试可关闭持久化。
  final bool persistenceEnabled;

  @override
  State<GameStartScreen> createState() => _GameStartScreenState();
}

class _GameStartScreenState extends State<GameStartScreen> {
  int _selected = 0;
  bool _starting = false;
  late final GameArchive? _archive = widget.persistenceEnabled
      ? widget.archive ?? GameArchive()
      : null;
  List<ArchiveEntry> _saves = [], _replays = [];
  ArchiveEntry? _entry;
  bool _replay = false, _loadingHistory = true;
  Object? _historyError;
  final _deleting = <String>{};

  Future<void> _deleteEntry(ArchiveEntry entry, bool replay) async {
    final key = '$replay:${entry.id}';
    if (_deleting.contains(key)) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(replay ? '删除回放？' : '删除存档？'),
        content: Text(
          replay ? '这条回放将被删除，不影响自动存档。' : '删除后无法从这条进度继续游戏。已手动保存的回放会保留。',
        ),
        actions: [
          TextButton(
            key: const ValueKey('cancel-delete'),
            onPressed: () => Navigator.pop(context, false),
            child: const Text('取消'),
          ),
          FilledButton(
            key: const ValueKey('confirm-delete'),
            onPressed: () => Navigator.pop(context, true),
            child: const Text('确认删除'),
          ),
        ],
      ),
    );
    if (!mounted || confirmed != true) return;
    setState(() => _deleting.add(key));
    try {
      await _archive!.delete(entry, replay: replay);
      await _loadHistory();
    } catch (error) {
      if (mounted) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text('删除失败：$error')));
      }
    } finally {
      if (mounted) setState(() => _deleting.remove(key));
    }
  }

  @override
  void initState() {
    super.initState();
    _loadHistory();
  }

  Future<void> _loadHistory() async {
    setState(() {
      _loadingHistory = true;
      _historyError = null;
    });
    try {
      final saves = await _archive?.list() ?? <ArchiveEntry>[];
      final replays = await _archive?.list(replays: true) ?? <ArchiveEntry>[];
      if (mounted) {
        setState(() {
          _saves = saves;
          _replays = replays;
          _loadingHistory = false;
        });
      }
    } catch (error) {
      if (mounted) {
        setState(() {
          _historyError = error;
          _loadingHistory = false;
        });
      }
    }
  }

  void _open(ArchiveEntry entry, {bool replay = false}) {
    unawaited(requestMobileFullscreen());
    setState(() {
      _entry = entry;
      _replay = replay;
      _selected = entry.mapIndex;
      _starting = true;
    });
  }

  void _home() {
    setState(() {
      _starting = false;
      _entry = null;
      _replay = false;
    });
    _loadHistory();
  }

  void _start() {
    if (_starting ||
        (_archive != null && (_loadingHistory || _historyError != null))) {
      return;
    }
    unawaited(requestMobileFullscreen());
    _entry = null;
    _replay = false;
    setState(() => _starting = true);
  }

  @override
  Widget build(BuildContext context) {
    final short = MediaQuery.sizeOf(context).height < 500;
    if (_starting) {
      return WorldScreen(
        initialWorldIndex: _selected,
        archive: _archive,
        entry: _entry,
        replay: _replay,
        onHome: _home,
      );
    }
    return Scaffold(
      body: DecoratedBox(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xff263b30), Color(0xff101812)],
          ),
        ),
        child: SafeArea(
          child: Center(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 1000),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    if (!short) const Icon(Icons.fort, size: 40, color: _gold),
                    if (!short) const SizedBox(height: 12),
                    Text(
                      '龙珠英雄',
                      style: TextStyle(
                        fontSize: short ? 26 : 36,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 6,
                        color: _cream,
                      ),
                    ),
                    if (!short) const SizedBox(height: 10),
                    if (!short)
                      const Text(
                        '选择一片土地，开启你的征程',
                        style: TextStyle(color: Color(0xffa8b8a8)),
                      ),
                    SizedBox(height: short ? 12 : 32),
                    LayoutBuilder(
                      builder: (context, constraints) {
                        final narrow = constraints.maxWidth < 660;
                        return Wrap(
                          spacing: 16,
                          runSpacing: 12,
                          children: [
                            for (var i = 0; i < _names.length; i++)
                              SizedBox(
                                width: narrow
                                    ? constraints.maxWidth
                                    : (constraints.maxWidth - 32) / 3,
                                child: _mapCard(i, narrow, short: short),
                              ),
                          ],
                        );
                      },
                    ),
                    SizedBox(height: short ? 12 : 28),
                    FilledButton.icon(
                      key: const ValueKey('start-game'),
                      onPressed:
                          _starting ||
                              (_archive != null &&
                                  (_loadingHistory || _historyError != null))
                          ? null
                          : _start,
                      style: FilledButton.styleFrom(
                        backgroundColor: _gold,
                        foregroundColor: const Color(0xff141b17),
                        minimumSize: const Size(240, 52),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                      icon: const Icon(Icons.play_arrow),
                      label: const Text(
                        '开始游戏',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    if (_archive != null) ...[
                      const SizedBox(height: 24),
                      if (_loadingHistory) const LinearProgressIndicator(),
                      if (_historyError != null) ...[
                        Text(
                          '历史记录读取失败：$_historyError',
                          style: const TextStyle(color: Colors.orangeAccent),
                        ),
                        TextButton(
                          onPressed: _loadHistory,
                          child: const Text('重试读取'),
                        ),
                      ],
                      _historySection('自动存档', _saves, false),
                      const SizedBox(height: 16),
                      _historySection('已保存的回放', _replays, true),
                    ],
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _mapCard(int index, bool narrow, {bool short = false}) {
    final selected = index == _selected;
    final preview = Image.asset(
      'assets/images/minimap_$index.png',
      width: narrow ? 88 : double.infinity,
      height: narrow
          ? 72
          : short
          ? 70
          : 170,
      fit: BoxFit.contain,
      filterQuality: FilterQuality.none,
      excludeFromSemantics: true,
    );
    final label = Row(
      children: [
        Expanded(
          child: Text(
            _names[index],
            style: const TextStyle(
              color: _cream,
              fontSize: 17,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        const SizedBox(width: 8),
        Icon(
          selected ? Icons.check_circle : Icons.radio_button_unchecked,
          color: selected ? _gold : const Color(0xff728472),
          size: 22,
        ),
      ],
    );
    return Semantics(
      selected: selected,
      child: Material(
        color: selected ? const Color(0xff344336) : const Color(0xff18251d),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4),
          side: BorderSide(
            color: selected ? _gold : const Color(0xff455748),
            width: 2,
          ),
        ),
        clipBehavior: Clip.antiAlias,
        child: InkWell(
          key: ValueKey('start-map-$index'),
          onTap: _starting ? null : () => setState(() => _selected = index),
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: narrow
                ? Row(
                    children: [
                      preview,
                      const SizedBox(width: 16),
                      Expanded(child: label),
                    ],
                  )
                : Column(
                    children: [preview, const SizedBox(height: 20), label],
                  ),
          ),
        ),
      ),
    );
  }

  Widget _historySection(
    String title,
    List<ArchiveEntry> entries,
    bool replay,
  ) => Column(
    crossAxisAlignment: CrossAxisAlignment.stretch,
    children: [
      Text(
        title,
        style: const TextStyle(
          color: _gold,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
      ),
      const SizedBox(height: 8),
      if (entries.isEmpty)
        Text(
          replay ? '在游戏内点击“保存回放”后，这里就会出现记录。' : '游戏进度会自动保存，退出后可在这里继续。',
          style: const TextStyle(color: Color(0xffa8b8a8)),
        ),
      for (final entry in entries)
        Card(
          child: ListTile(
            title: Text(_names[entry.mapIndex]),
            subtitle: Text(
              '${entry.dateLabel} · ${entry.updated.toString().split('.').first}${entry.ended ? ' · 已结束' : ''}',
            ),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextButton(
                  key: ValueKey('${replay ? 'replay' : 'resume'}-${entry.id}'),
                  onPressed: _deleting.contains('$replay:${entry.id}')
                      ? null
                      : () => _open(entry, replay: replay),
                  child: Text(
                    replay
                        ? '回放'
                        : entry.ended
                        ? '查看'
                        : '继续',
                  ),
                ),
                IconButton(
                  key: ValueKey(
                    'delete-${replay ? 'replay' : 'save'}-${entry.id}',
                  ),
                  tooltip: replay ? '删除回放' : '删除存档',
                  onPressed: _deleting.contains('$replay:${entry.id}')
                      ? null
                      : () => _deleteEntry(entry, replay),
                  icon: const Icon(Icons.delete_outline, size: 20),
                ),
              ],
            ),
          ),
        ),
    ],
  );
}
