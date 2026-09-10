import 'package:flutter/material.dart';

import '../../world_map/presentation/world_screen.dart';

const _gold = Color(0xffd6bd7c);
const _cream = Color(0xffece7d1);
const _names = ['燃烧的热情', '辽阔的土地', '抵上命也***'];

/// 选择远征地图，确认后才创建游戏会话。
class GameStartScreen extends StatefulWidget {
  /// 创建游戏开始界面。
  const GameStartScreen({super.key});

  @override
  State<GameStartScreen> createState() => _GameStartScreenState();
}

class _GameStartScreenState extends State<GameStartScreen> {
  int _selected = 0;
  bool _starting = false;

  void _start() {
    if (_starting) return;
    setState(() => _starting = true);
  }

  @override
  Widget build(BuildContext context) {
    if (_starting) return WorldScreen(initialWorldIndex: _selected);
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
                    const Icon(Icons.fort, size: 40, color: _gold),
                    const SizedBox(height: 12),
                    const Text(
                      '像素远征',
                      style: TextStyle(
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 6,
                        color: _cream,
                      ),
                    ),
                    const SizedBox(height: 10),
                    const Text(
                      '选择一片土地，开启你的征程',
                      style: TextStyle(color: Color(0xffa8b8a8)),
                    ),
                    const SizedBox(height: 32),
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
                                child: _mapCard(i, narrow),
                              ),
                          ],
                        );
                      },
                    ),
                    const SizedBox(height: 28),
                    FilledButton.icon(
                      key: const ValueKey('start-game'),
                      onPressed: _starting ? null : _start,
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
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _mapCard(int index, bool narrow) {
    final selected = index == _selected;
    final preview = Image.asset(
      'assets/images/minimap_$index.png',
      width: narrow ? 88 : double.infinity,
      height: narrow ? 72 : 170,
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
}
