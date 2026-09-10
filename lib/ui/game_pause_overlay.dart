import 'package:flutter/material.dart';

/// 暂停时遮挡游戏操作，继续按钮不改变任何战役数据。
class GamePauseOverlay extends StatelessWidget {
  /// 由界面统一恢复游戏时钟和输入。
  const GamePauseOverlay({super.key, required this.onResume});

  /// 用户主动继续游戏。
  final VoidCallback onResume;

  @override
  Widget build(BuildContext context) => ColoredBox(
    color: const Color(0x99000000),
    child: Center(
      child: Container(
        width: 280,
        margin: const EdgeInsets.all(20),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: const Color(0xff141b17),
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: const Color(0xffd6bd7c)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.pause_rounded, color: Color(0xffd6bd7c), size: 32),
            const SizedBox(height: 12),
            const Text(
              '游戏已暂停',
              style: TextStyle(
                color: Color(0xffece7d1),
                fontSize: 20,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: 10),
            const Text(
              '行军、战斗和资源结算已停止',
              textAlign: TextAlign.center,
              style: TextStyle(color: Color(0xffadb8ac), fontSize: 12),
            ),
            const SizedBox(height: 22),
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                key: const ValueKey('game-resume'),
                onPressed: onResume,
                style: FilledButton.styleFrom(
                  backgroundColor: const Color(0xffd6bd7c),
                  foregroundColor: const Color(0xff141b17),
                  minimumSize: const Size(0, 44),
                ),
                icon: const Icon(Icons.play_arrow_rounded),
                label: const Text('继续游戏'),
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              '快捷键 P',
              style: TextStyle(color: Color(0xff8f9d91), fontSize: 11),
            ),
          ],
        ),
      ),
    ),
  );
}
