import 'package:flutter/material.dart';

import '../world/campaign.dart';
import '../world/world_controller.dart';
import 'city_panel_style.dart';

/// 英雄详情中的紧凑配装区，军械库在原面板内展开，不暂停游戏。
class WeaponLoadout extends StatefulWidget {
  /// 绑定当前将领，敌军与在外将领只能查看武器。
  const WeaponLoadout({
    super.key,
    required this.controller,
    required this.hero,
    required this.onAction,
  });

  /// 当前地图控制器。
  final WorldController controller;

  /// 查看或配装的将领。
  final CampaignHero hero;

  /// 执行操作后归还地图焦点。
  final void Function(VoidCallback) onAction;
  @override
  State<WeaponLoadout> createState() => _WeaponLoadoutState();
}

class _WeaponLoadoutState extends State<WeaponLoadout> {
  bool _showShop = false;
  @override
  Widget build(BuildContext context) {
    final c = widget.controller, hero = widget.hero;
    final catalog = c.campaign.weaponCatalog;
    if (catalog.weapons.isEmpty) return const SizedBox.shrink();
    final editable =
        hero.isPlayer &&
        !c.campaign.marches.containsKey(hero.id) &&
        c.campaign.activeBattleForHero(hero.id) == null;
    return Padding(
      padding: const EdgeInsets.only(top: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              Text(
                '武器 ${hero.weaponIds.length}/${catalog.carryLimit}',
                style: CityPanelStyle.label,
              ),
              const Spacer(),
              if (editable)
                TextButton(
                  key: const ValueKey('weapon-shop-toggle'),
                  onPressed: () => setState(() => _showShop = !_showShop),
                  child: Text(
                    _showShop ? '收起军械库' : '军械库',
                    style: CityPanelStyle.value,
                  ),
                ),
            ],
          ),
          Row(
            children: [
              for (var slot = 0; slot < catalog.carryLimit; slot++) ...[
                if (slot > 0) const SizedBox(width: 8),
                Expanded(
                  child: OutlinedButton(
                    key: ValueKey('weapon-slot-$slot'),
                    style: CityPanelStyle.button(),
                    onPressed: editable && slot < hero.weaponIds.length
                        ? () => widget.onAction(
                            () => c.returnHeroWeapon(hero, slot),
                          )
                        : null,
                    child: Text(
                      slot < hero.weaponIds.length
                          ? '${catalog.weapons[hero.weaponIds[slot]]!.name}${editable ? ' ×' : ''}'
                          : '—',
                      style: CityPanelStyle.value,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ],
            ],
          ),
          if (_showShop && editable) ...[
            const SizedBox(height: 8),
            const Text(
              '点击购置或取用，点击已带武器可归还。',
              style: TextStyle(fontSize: 10, color: CityPanelStyle.muted),
            ),
            const SizedBox(height: 8),
            LayoutBuilder(
              builder: (context, constraints) {
                final weapons = catalog.weapons.values.toList()
                  ..sort((a, b) => a.price.compareTo(b.price));
                return Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    for (final weapon in weapons)
                      SizedBox(
                        width: (constraints.maxWidth - 16) / 3,
                        child: OutlinedButton(
                          key: ValueKey('equip-weapon-${weapon.id}'),
                          style: CityPanelStyle.button(
                            actionable:
                                c.campaign.weaponEquipBlockReason(
                                  hero,
                                  weapon.id,
                                ) ==
                                null,
                          ),
                          onPressed:
                              c.campaign.weaponEquipBlockReason(
                                    hero,
                                    weapon.id,
                                  ) ==
                                  null
                              ? () => widget.onAction(
                                  () => c.equipHeroWeapon(hero, weapon.id),
                                )
                              : null,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(weapon.name, style: CityPanelStyle.value),
                              const SizedBox(height: 5),
                              Text(
                                c.campaign.weaponStockFor(
                                          hero.countryId,
                                          weapon.id,
                                        ) >
                                        0
                                    ? '库存 ${c.campaign.weaponStockFor(hero.countryId, weapon.id)}'
                                    : !weapon.shopEnabled
                                    ? '事件武器'
                                    : !c.campaign.weaponUnlocked(
                                        hero.countryId,
                                        weapon,
                                      )
                                    ? '${weapon.minimumCities}城解锁'
                                    : '${weapon.price}金币',
                                style: CityPanelStyle.label,
                              ),
                              Text(
                                weapon.effectLabel,
                                style: CityPanelStyle.label,
                              ),
                            ],
                          ),
                        ),
                      ),
                  ],
                );
              },
            ),
          ],
        ],
      ),
    );
  }
}
