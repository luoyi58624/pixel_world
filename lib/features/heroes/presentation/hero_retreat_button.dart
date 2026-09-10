import 'package:flutter/material.dart';

import '../../../core/config/game_config.dart';
import '../../campaign/domain/campaign.dart';
import '../../world_map/presentation/world_controller.dart';

/// 观战与人物面板共用的撤退入口，直接展示失败风险并防止重复操作。
class HeroRetreatButton extends StatelessWidget {
  /// 指定出征将领；资格由战役状态重新验证。
  const HeroRetreatButton({
    super.key,
    required this.controller,
    required this.heroId,
    required this.onAction,
  });

  /// 当前地图的控制器。
  final WorldController controller;

  /// 要撤退的本国将领编号。
  final String heroId;

  /// 执行后归还地图键盘焦点。
  final void Function(VoidCallback) onAction;

  @override
  Widget build(BuildContext context) {
    final blocked = controller.campaign.retreatBlockReason(heroId);
    final percent = (GameConfig.retreatFailureChance * 100).round();
    return OutlinedButton.icon(
      onPressed: blocked == null
          ? () => onAction(() => controller.retreatHero(heroId))
          : null,
      style: OutlinedButton.styleFrom(
        foregroundColor: Theme.of(context).colorScheme.error,
        minimumSize: const Size(0, 40),
      ),
      icon: const Icon(Icons.keyboard_return, size: 16),
      label: Text('撤退 · $percent% 失败即阵亡', style: const TextStyle(fontSize: 12)),
    );
  }
}
