import 'package:flutter/material.dart';

import '../world/campaign.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';

const _cream = Color(0xffece7d1);
const _gold = Color(0xffd6bd7c);
const _muted = Color(0xffa7b5a4);

/// 角色指令与实时观战共用的非模态面板，不接管游戏时钟。
class UnitPanel extends StatelessWidget {
  /// 展示当前角色或正在查看的后台交战。
  const UnitPanel({
    super.key,
    required this.controller,
    required this.assets,
    required this.maxHeight,
    required this.onAction,
  });

  /// 地图指令与当前选择。
  final WorldController controller;

  /// 英雄图集资源。
  final WorldAssets assets;

  /// 可用高度，内容超出时滚动而底部按钮保留。
  final double maxHeight;

  /// 操作结束后把键盘焦点交回地图。
  final void Function(VoidCallback) onAction;

  @override
  Widget build(BuildContext context) {
    final c = controller;
    final battle = c.watchedBattle;
    final hero = c.selectedMapHero;
    if (battle == null && hero == null) return const SizedBox.shrink();
    return Container(
      key: ValueKey(battle == null ? 'unit-panel' : 'battle-panel'),
      constraints: BoxConstraints(maxHeight: maxHeight),
      decoration: BoxDecoration(
        color: const Color(0xff141b17),
        border: Border.all(color: const Color(0xff7d896b)),
        borderRadius: BorderRadius.circular(5),
        boxShadow: const [BoxShadow(color: Color(0x66000000), blurRadius: 18)],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 6, 8),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    battle == null ? hero!.name : '${battle.city.label}国 · 观战',
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                      color: _cream,
                    ),
                  ),
                ),
                IconButton(
                  tooltip: '关闭面板',
                  onPressed: () => onAction(c.cancelCityAction),
                  icon: const Icon(Icons.close, size: 18, color: _muted),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: Color(0xff43513e)),
          Flexible(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: battle == null ? _unit(hero!) : _battle(battle),
            ),
          ),
          const Divider(height: 1, color: Color(0xff43513e)),
          Padding(
            padding: const EdgeInsets.all(12),
            child: SizedBox(
              width: double.infinity,
              child: OutlinedButton(
                key: const ValueKey('unit-close'),
                onPressed: () => onAction(c.cancelCityAction),
                child: Text(battle == null ? '取消' : '返回地图'),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _unit(CampaignHero hero) {
    final c = controller;
    final unit = c.selectedUnit;
    final status = switch (unit?.phase) {
      MarchPhase.marching => '行军中',
      MarchPhase.camped => '扎营中',
      MarchPhase.awaitingBattle => '城下待战',
      MarchPhase.fighting => '交战中',
      null => '驻守中',
    };
    final battle = c.campaign.battles[unit?.target?.id];
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fighter(hero, '${hero.type.label} · $status'),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: _command(
                'unit-move',
                '移动',
                Icons.open_with,
                c.canMoveSelected ? c.prepareMove : null,
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: _command(
                'unit-camp',
                '扎营',
                Icons.terrain_outlined,
                unit != null && unit.phase != MarchPhase.camped
                    ? c.campSelected
                    : null,
              ),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: _command(
                'unit-info',
                '情况',
                Icons.info_outline,
                c.inspectUnit,
              ),
            ),
          ],
        ),
        if (unit?.phase == MarchPhase.marching) ...[
          const SizedBox(height: 14),
          Text(
            '目的地：${unit!.target?.label ?? '(${(unit.destination.dx / 16).floor()}, ${(unit.destination.dy / 16).floor()})'}',
            style: const TextStyle(color: _muted, fontSize: 12),
          ),
        ],
        if (battle?.isActive == true) ...[
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonal(
              onPressed: () => onAction(() => c.watchBattle(battle!)),
              child: const Text('进入观战'),
            ),
          ),
        ],
        if (c.showUnitDetails) ...[
          const SizedBox(height: 16),
          Wrap(
            spacing: 24,
            runSpacing: 12,
            children: [
              _stat('战斗', '${hero.combat}'),
              _stat('内政', '${hero.politics}'),
              _stat('报酬 / 回合', '${hero.salary}'),
              _stat('士兵', '${hero.soldiers} 人'),
              _stat('王牌', hero.ace),
              _stat('召唤蛋', hero.hasEgg ? '有' : '无'),
            ],
          ),
        ],
      ],
    );
  }

  Widget _battle(CityBattle battle) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Row(
        children: [
          Icon(
            battle.isActive ? Icons.bolt : Icons.flag_outlined,
            color: _gold,
            size: 18,
          ),
          const SizedBox(width: 6),
          Expanded(
            child: Text(
              battle.isActive ? '交战中 · 第 ${battle.rounds} 轮' : '战斗结束',
              style: const TextStyle(color: _gold, fontSize: 14),
            ),
          ),
        ],
      ),
      const SizedBox(height: 16),
      _fighter(battle.attacker, '进攻 · ${battle.attacker.type.label}'),
      const Padding(
        padding: EdgeInsets.symmetric(vertical: 12),
        child: Center(
          child: Text(
            'VS',
            style: TextStyle(color: _gold, fontWeight: FontWeight.bold),
          ),
        ),
      ),
      _fighter(battle.defender, '守城 · ${battle.defender.type.label}'),
      const SizedBox(height: 16),
      if (battle.outcome case final outcome?) ...[
        Text(outcome, style: const TextStyle(color: _gold, height: 1.5)),
        const SizedBox(height: 12),
      ],
      for (final event in battle.events.reversed)
        Padding(
          padding: const EdgeInsets.only(bottom: 6),
          child: Text(
            event,
            style: const TextStyle(color: _muted, fontSize: 12, height: 1.5),
          ),
        ),
    ],
  );

  Widget _command(
    String key,
    String label,
    IconData icon,
    VoidCallback? action,
  ) => OutlinedButton(
    key: ValueKey(key),
    style: OutlinedButton.styleFrom(
      padding: const EdgeInsets.symmetric(vertical: 12),
    ),
    onPressed: action == null ? null : () => onAction(action),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 18),
        const SizedBox(height: 6),
        Text(label, style: const TextStyle(fontSize: 13)),
      ],
    ),
  );

  Widget _stat(String title, String value) => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Text(title, style: const TextStyle(color: _muted, fontSize: 11)),
      const SizedBox(height: 4),
      Text(value, style: const TextStyle(color: _cream, fontSize: 14)),
    ],
  );

  Widget _fighter(CampaignHero hero, String label) => Row(
    children: [
      SizedBox(
        width: 48,
        height: 48,
        child: CustomPaint(painter: _HeroPortrait(assets, hero)),
      ),
      const SizedBox(width: 12),
      Expanded(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              hero.name,
              style: const TextStyle(color: _cream, fontSize: 15),
            ),
            const SizedBox(height: 4),
            Text(label, style: const TextStyle(color: _muted, fontSize: 11)),
            const SizedBox(height: 8),
            LinearProgressIndicator(
              value: hero.hp / hero.maxHp,
              minHeight: 4,
              color: hero.isPlayer
                  ? const Color(0xff9bbf77)
                  : const Color(0xffe77d70),
              backgroundColor: const Color(0xff30392c),
            ),
            const SizedBox(height: 5),
            Text(
              '${hero.hp} / ${hero.maxHp} HP · 士兵 ${hero.soldiers} 人',
              style: const TextStyle(color: _cream, fontSize: 12),
            ),
          ],
        ),
      ),
    ],
  );
}

class _HeroPortrait extends CustomPainter {
  _HeroPortrait(this.assets, this.hero);
  final WorldAssets assets;
  final CampaignHero hero;

  @override
  void paint(Canvas canvas, Size size) => canvas.drawImageRect(
    assets.heroes[hero.appearance]!,
    const Rect.fromLTWH(0, 0, 16, 16),
    Offset.zero & size,
    Paint()
      ..filterQuality = FilterQuality.none
      ..isAntiAlias = false,
  );

  @override
  bool shouldRepaint(covariant _HeroPortrait oldDelegate) =>
      assets != oldDelegate.assets ||
      hero.appearance != oldDelegate.hero.appearance;
}
