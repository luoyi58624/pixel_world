import 'package:flutter/material.dart';

import '../../campaign/domain/campaign.dart';
import '../../cities/presentation/city_panel_style.dart';
import '../../world_map/presentation/world_controller.dart';

/// 地图右下角打开的国家武器商店，购买和查看期间世界照常运行。
class WeaponShop extends StatelessWidget {
  /// 使用当前地图的玩家国库，无需预先选中城池。
  const WeaponShop({super.key, required this.controller});

  /// 当前地图控制器。
  final WorldController controller;

  @override
  Widget build(BuildContext context) => ValueListenableBuilder(
    valueListenable: controller.uiRevision,
    builder: (context, _, child) {
      final c = controller.campaign;
      return AlertDialog(
        backgroundColor: const Color(0xff141b17),
        title: Text('武器商店 · ${c.gold} 金币', style: CityPanelStyle.heading),
        content: SizedBox(
          width: 500,
          child: SingleChildScrollView(
            child: LayoutBuilder(
              builder: (context, constraints) => Wrap(
                spacing: CityPanelStyle.gap,
                runSpacing: CityPanelStyle.gap,
                children: [
                  for (final w in c.weaponCatalog.shopWeapons)
                    SizedBox(
                      width:
                          (constraints.maxWidth - CityPanelStyle.gap * 2) / 3,
                      child: OutlinedButton(
                        key: ValueKey('buy-weapon-${w.id}'),
                        style: CityPanelStyle.button(
                          actionable: c.weaponPurchaseBlockReason(w.id) == null,
                        ),
                        onPressed: c.weaponPurchaseBlockReason(w.id) == null
                            ? () => controller.buyCountryWeapon(w.id)
                            : null,
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(w.name, style: CityPanelStyle.value),
                            const SizedBox(height: CityPanelStyle.textGap),
                            Text(
                              c.year < w.unlockYear
                                  ? '第${w.unlockYear}年解锁'
                                  : '${w.price}金币',
                              style: CityPanelStyle.label,
                            ),
                            Text(w.effectLabel, style: CityPanelStyle.label),
                          ],
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('关闭'),
          ),
        ],
      );
    },
  );
}
