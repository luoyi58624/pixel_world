import 'package:flutter/material.dart';

import '../world/campaign.dart';
import '../world/world_controller.dart';

/// 城内与野外共用的解雇按钮，明确显示返还金币并使用错误色。
class HeroDismissButton extends StatelessWidget {
  /// 解雇当前选中的将领，不暂停世界时间。
  const HeroDismissButton({
    super.key,
    required this.controller,
    required this.hero,
    required this.onAction,
  });

  /// 当前战役与操作结果。
  final WorldController controller;

  /// 当前所选将领，未选择时禁用。
  final CampaignHero? hero;

  /// 操作后交回游戏输入焦点。
  final void Function(VoidCallback) onAction;

  @override
  Widget build(BuildContext context) {
    final campaign = controller.campaign;
    final problem = campaign.dismissalBlockReason(hero);
    final error = Theme.of(context).colorScheme.error;
    final reward = hero == null ? 0 : campaign.dismissalGold(hero!);
    return Tooltip(
      message: problem ?? '将领回到招募池，获得 $reward 金币',
      child: OutlinedButton(
        style: OutlinedButton.styleFrom(
          minimumSize: const Size(0, 40),
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
          foregroundColor: error,
          disabledForegroundColor: error.withValues(alpha: 0.4),
          side: BorderSide(
            color: error.withValues(alpha: problem == null ? 1 : 0.3),
          ),
          textStyle: Theme.of(context).textTheme.labelLarge
              ?.copyWith(fontSize: 12),
        ),
        onPressed: problem == null
            ? () => onAction(() => controller.dismissHero(hero!))
            : null,
        child: Text(reward > 0 ? '解雇 · +$reward金币' : '解雇'),
      ),
    );
  }
}
