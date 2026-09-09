import 'package:flutter/material.dart';

import '../world/campaign.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';
import 'hero_dismiss_button.dart';
import 'hero_retreat_button.dart';
import 'weapon_loadout.dart';

const _cream = Color(0xffece7d1);
const _muted = Color(0xffa7b5a4);

/// 地图角色的非模态指令面板，不接管游戏时钟。
class UnitPanel extends StatelessWidget {
  /// 展示当前角色并提供进入战场的入口。
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
    final hero = c.selectedMapHero;
    if (hero == null) return const SizedBox.shrink();
    return Container(
      key: const ValueKey('unit-panel'),
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
                    hero.name,
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
              child: _unit(hero),
            ),
          ),
          const Divider(height: 1, color: Color(0xff43513e)),
          Padding(
            padding: const EdgeInsets.all(12),
            child: SizedBox(
              width: double.infinity,
              child: hero.isPlayer
                  ? c.campaign.activeBattleForHero(hero.id) != null
                        ? HeroRetreatButton(
                            key: const ValueKey('unit-retreat'),
                            controller: c,
                            heroId: hero.id,
                            onAction: onAction,
                          )
                        : HeroDismissButton(
                            key: const ValueKey('unit-dismiss'),
                            controller: c,
                            hero: hero,
                            onAction: onAction,
                          )
                  : OutlinedButton(
                      key: const ValueKey('unit-close'),
                      onPressed: () => onAction(c.cancelCityAction),
                      child: const Text('取消'),
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
      MarchPhase.marching => unit!.returningFromRetreat ? '撤退返程中' : '行军中',
      MarchPhase.camped =>
        unit!.supplyHalted && c.campaign.goldFor(hero.countryId) == 0
            ? '断粮扎营'
            : '扎营中',
      MarchPhase.awaitingBattle => '城下待战',
      MarchPhase.fighting => '交战中',
      MarchPhase.dueling => '野战中',
      null => '驻守中',
    };
    final battle = c.campaign.activeBattleForHero(hero.id);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _fighter(
          hero,
          '${c.world.countryName(hero.countryId)}国 · ${hero.type.label} · $status',
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 24,
          runSpacing: 12,
          children: [
            _stat('战斗', '${hero.combat}'),
            _stat('内政', '${hero.politics}'),
            _stat('月俸', '${hero.salary}'),
            _stat('士兵', '${hero.soldiers} 人'),
          ],
        ),
        WeaponLoadout(controller: c, hero: hero, onAction: onAction),
        if (hero.isPlayer) ...[
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
                  hero.isPlayer &&
                          unit != null &&
                          !unit.returningFromRetreat &&
                          battle == null &&
                          unit.phase != MarchPhase.camped &&
                          unit.phase != MarchPhase.dueling
                      ? c.campSelected
                      : null,
                ),
              ),
            ],
          ),
        ],
        if (battle?.isActive == true) ...[
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonal(
              key: const ValueKey('unit-watch-battle'),
              onPressed: () => onAction(() => c.watchBattle(battle!)),
              child: const Text('进入观战'),
            ),
          ),
        ],
      ],
    );
  }

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
    child: Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, size: 18),
        const SizedBox(width: 8),
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
              '${hero.health.label} / ${hero.maxHp} HP · 士兵 ${hero.soldiers} 人',
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
    assets.heroImage(hero.appearance, friendly: hero.isPlayer),
    const Rect.fromLTWH(0, 0, 16, 16),
    Offset.zero & size,
    Paint()
      ..filterQuality = FilterQuality.none
      ..isAntiAlias = false,
  );

  @override
  bool shouldRepaint(covariant _HeroPortrait oldDelegate) =>
      assets != oldDelegate.assets ||
      hero.appearance != oldDelegate.hero.appearance ||
      hero.isPlayer != oldDelegate.hero.isPlayer;
}
