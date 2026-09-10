import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../../campaign/domain/campaign.dart';
import '../../world_map/presentation/world_controller.dart';
import '../../cities/presentation/city_panel_style.dart';

/// 出征英雄信息中的三个随身武器格，无武器时整行隐藏。
class WeaponLoadout extends StatelessWidget {
  /// 野外和敌方角色详情共用只读展示，驻城面板不使用此行。
  const WeaponLoadout({
    super.key,
    required this.controller,
    required this.hero,
  });

  /// 提供武器名称和效果。
  final WorldController controller;

  /// 当前查看的将领。
  final CampaignHero hero;

  @override
  Widget build(BuildContext context) {
    if (hero.weaponIds.isEmpty) return const SizedBox.shrink();
    final catalog = controller.campaign.weaponCatalog;
    return Padding(
      key: const ValueKey('hero-weapons'),
      padding: const EdgeInsets.only(top: CityPanelStyle.gap),
      child: Row(
        children: [
          for (var slot = 0; slot < catalog.carryLimit; slot++) ...[
            if (slot > 0) const SizedBox(width: CityPanelStyle.gap),
            Expanded(
              child: Container(
                key: ValueKey('weapon-slot-$slot'),
                constraints: const BoxConstraints(
                  minHeight: CityPanelStyle.cardHeight,
                ),
                padding: CityPanelStyle.padding,
                alignment: Alignment.centerLeft,
                decoration: CityPanelStyle.decoration,
                child: slot >= hero.weaponIds.length
                    ? Text('—', style: CityPanelStyle.label)
                    : Column(
                        mainAxisSize: MainAxisSize.min,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            catalog.weapons[hero.weaponIds[slot]]!.name,
                            style: CityPanelStyle.value,
                          ),
                          const SizedBox(height: CityPanelStyle.textGap),
                          Text(
                            catalog.weapons[hero.weaponIds[slot]]!.effectLabel,
                            style: CityPanelStyle.label,
                          ),
                        ],
                      ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

/// 国家共用武器库，同类叠加、三列换行，选择出征装备，购买入口位于地图右下角。
class WeaponLibrary extends StatefulWidget {
  /// 购买不依赖英雄，携带选择绑定当前驻城英雄且不暂停游戏。
  const WeaponLibrary({
    super.key,
    required this.controller,
    required this.onAction,
  });

  /// 国家库存和当前出征选择。
  final WorldController controller;

  /// 操作后归还地图焦点。
  final void Function(VoidCallback) onAction;

  @override
  State<WeaponLibrary> createState() => _WeaponLibraryState();
}

class _WeaponLibraryState extends State<WeaponLibrary> {
  @override
  Widget build(BuildContext context) {
    final c = widget.controller, campaign = c.campaign;
    final catalog = campaign.weaponCatalog;
    if (catalog.weapons.isEmpty) return const SizedBox.shrink();
    final inventory = campaign.weaponInventoryFor(0);
    final ids = inventory.keys.toList()..sort();
    final count = math.max(3, ((ids.length + 2) ~/ 3) * 3);
    final hero = c.selectedHero;
    final canSelect = hero != null && campaign.canDispatch(hero);
    return Column(
      key: const ValueKey('weapon-library'),
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Row(
          children: [
            Text('武器库', style: CityPanelStyle.heading),
            const SizedBox(width: 10),
            Text(
              '已选 ${c.selectedWeaponCount}/${catalog.carryLimit}',
              style: CityPanelStyle.label,
            ),
          ],
        ),
        LayoutBuilder(
          builder: (context, constraints) => Wrap(
            spacing: CityPanelStyle.gap,
            runSpacing: CityPanelStyle.gap,
            children: [
              for (var slot = 0; slot < count; slot++)
                SizedBox(
                  width: (constraints.maxWidth - CityPanelStyle.gap * 2) / 3,
                  child: slot >= ids.length
                      ? OutlinedButton(
                          key: ValueKey('warehouse-empty-$slot'),
                          style: CityPanelStyle.button(),
                          onPressed: null,
                          child: Text('—', style: CityPanelStyle.label),
                        )
                      : _stockCard(ids[slot], inventory[ids[slot]]!, canSelect),
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _stockCard(int id, int quantity, bool canSelect) {
    final c = widget.controller;
    final selected = c.selectedWeaponCountFor(id);
    final enabled =
        canSelect &&
        (selected > 0 ||
            c.selectedWeaponCount < c.campaign.weaponCatalog.carryLimit);
    return Semantics(
      selected: selected > 0,
      child: OutlinedButton(
        key: ValueKey('warehouse-weapon-$id'),
        style: CityPanelStyle.button(
          selected: selected > 0,
          actionable: enabled,
        ),
        onPressed: enabled
            ? () => widget.onAction(() => c.selectWeapon(id))
            : null,
        child: Row(
          children: [
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '${c.campaign.weaponCatalog.weapons[id]!.name} ×$quantity',
                    style: CityPanelStyle.value,
                  ),
                  const SizedBox(height: CityPanelStyle.textGap),
                  Text(
                    selected > 0
                        ? '已选 $selected'
                        : c.campaign.weaponCatalog.weapons[id]!.effectLabel,
                    style: CityPanelStyle.label,
                  ),
                ],
              ),
            ),
            if (selected > 0)
              SizedBox(
                width: 24,
                height: 32,
                child: IconButton(
                  key: ValueKey('deselect-weapon-$id'),
                  tooltip: '少带一件',
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints.tightFor(
                    width: 24,
                    height: 32,
                  ),
                  visualDensity: VisualDensity.standard,
                  onPressed: () => widget.onAction(() => c.deselectWeapon(id)),
                  icon: const Icon(
                    Icons.remove,
                    size: 14,
                    color: CityPanelStyle.gold,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
