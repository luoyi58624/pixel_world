import 'package:flutter/material.dart';

import '../world/campaign.dart';

/// 本局结束后的阻断面板，显示失败原因并允许重新开始。
class GameOverPanel extends StatelessWidget {
  /// 使用已经确定的战役失败原因创建面板。
  const GameOverPanel({
    super.key,
    required this.reason,
    required this.onRestart,
  });

  /// 主角阵亡或全部城池失守。
  final CampaignDefeatReason reason;

  /// 丢弃当前失败进度并重开本地图。
  final VoidCallback onRestart;

  @override
  Widget build(BuildContext context) => Stack(
    key: const ValueKey('game-over-panel'),
    fit: StackFit.expand,
    children: [
      const ModalBarrier(dismissible: false, color: Color(0xb8000000)),
      Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 360),
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: const Color(0xff141b17),
                border: Border.all(color: const Color(0xffd6bd7c)),
                borderRadius: BorderRadius.circular(5),
              ),
              child: Padding(
                padding: const EdgeInsets.all(28),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(
                      Icons.flag_outlined,
                      color: Color(0xffd6bd7c),
                      size: 36,
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      '游戏结束',
                      style: TextStyle(
                        fontSize: 26,
                        fontWeight: FontWeight.w600,
                        color: Color(0xffece7d1),
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      reason.label,
                      key: const ValueKey('game-over-reason'),
                      style: const TextStyle(
                        fontSize: 16,
                        color: Color(0xffa7b5a4),
                      ),
                    ),
                    const SizedBox(height: 28),
                    SizedBox(
                      width: double.infinity,
                      child: FilledButton.icon(
                        key: const ValueKey('game-restart'),
                        autofocus: true,
                        onPressed: onRestart,
                        icon: const Icon(Icons.refresh),
                        label: const Text('重新开始'),
                        style: FilledButton.styleFrom(
                          backgroundColor: const Color(0xffd6bd7c),
                          foregroundColor: const Color(0xff141b17),
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
    ],
  );
}
