import 'package:flutter/material.dart';

import '../../campaign/domain/campaign.dart';
import '../../world_map/presentation/world_controller.dart';
import '../../cities/presentation/city_panel_style.dart';

/// 出征英雄的随身武器格，无武器时整行隐藏。
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

/// 城池内的国家共用武器库，购买入库与携带选择分别操作。
class WeaponLibrary extends StatelessWidget {
  /// 购买不依赖英雄，携带选择绑定当前驻城英雄且不暂停游戏。
  const WeaponLibrary({
    super.key,
    required this.controller,
    required this.onAction,
  });

  /// 当前地图、国库和出征选择。
  final WorldController controller;

  /// 操作后恢复地图焦点。
  final void Function(VoidCallback) onAction;

  @override
  Widget build(BuildContext context) {
    final c = controller, campaign = c.campaign;
    final catalog = campaign.weaponCatalog;
    if (catalog.weapons.isEmpty) return const SizedBox.shrink();
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
        const SizedBox(height: CityPanelStyle.headingGap),
        LayoutBuilder(
          builder: (context, constraints) {
            final columns = constraints.maxWidth < 260 ? 2 : 3;
            return Wrap(
              spacing: CityPanelStyle.gap,
              runSpacing: CityPanelStyle.gap,
              children: [
                for (final w in catalog.shopWeapons)
                  SizedBox(
                    width:
                        (constraints.maxWidth -
                            CityPanelStyle.gap * (columns - 1)) /
                        columns,
                    child: _card(w.id, canSelect),
                  ),
              ],
            );
          },
        ),
      ],
    );
  }

  Widget _card(int id, bool canSelect) {
    final c = controller, campaign = c.campaign;
    final w = campaign.weaponCatalog.weapons[id]!;
    final quantity = campaign.weaponStockFor(0, id);
    final selected = c.selectedWeaponCountFor(id) > 0;
    final buyProblem = campaign.weaponPurchaseBlockReason(id);
    final canCarry = canSelect && (selected || quantity > 0);
    return Container(
      key: ValueKey('warehouse-weapon-$id'),
      padding: CityPanelStyle.padding,
      decoration: CityPanelStyle.decoration.copyWith(
        border: Border.all(
          color: selected ? CityPanelStyle.gold : const Color(0xff43513b),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('${w.name} ×$quantity', style: CityPanelStyle.value),
                const SizedBox(height: CityPanelStyle.textGap),
                Text(w.effectLabel, style: CityPanelStyle.label),
                Text(
                  campaign.year < w.unlockYear
                      ? '第${w.unlockYear}年解锁'
                      : '${w.price}金币',
                  style: CityPanelStyle.label,
                ),
              ],
            ),
          ),
          const SizedBox(width: 4),
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              IconButton(
                key: ValueKey('buy-weapon-$id'),
                style: IconButton.styleFrom(
                  minimumSize: const Size(32, 32),
                  maximumSize: const Size(32, 32),
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                tooltip: buyProblem == null ? '购买${w.name}' : '购买：$buyProblem',
                constraints: const BoxConstraints.tightFor(
                  width: 32,
                  height: 32,
                ),
                padding: EdgeInsets.zero,
                iconSize: 18,
                onPressed: buyProblem == null
                    ? () => onAction(() => c.buyCountryWeapon(id))
                    : null,
                icon: const Icon(Icons.shopping_cart_outlined),
              ),
              IconButton(
                key: ValueKey('carry-weapon-$id'),
                style: IconButton.styleFrom(
                  minimumSize: const Size(32, 32),
                  maximumSize: const Size(32, 32),
                  tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                ),
                tooltip: selected ? '取消携带${w.name}' : '携带${w.name}',
                constraints: const BoxConstraints.tightFor(
                  width: 32,
                  height: 32,
                ),
                padding: EdgeInsets.zero,
                iconSize: 18,
                color: selected ? CityPanelStyle.gold : null,
                onPressed: canCarry
                    ? () => onAction(
                        () => selected
                            ? c.deselectWeapon(id)
                            : c.selectWeapon(id),
                      )
                    : null,
                icon: Icon(selected ? Icons.backpack : Icons.backpack_outlined),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
