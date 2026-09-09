import 'package:flutter/material.dart';

import '../game_config.dart';
import 'city_panel_style.dart';
import '../world/hero_sprite.dart';
import '../world/rom_hero.dart';
import '../world/recruitment.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';

const _cream = CityPanelStyle.ink;
const _gold = CityPanelStyle.gold;
const _muted = CityPanelStyle.muted;

/// 城防、征兵和英雄招募使用整块点击，抽取结果直接在招募方块下展示。
class CityServices extends StatelessWidget {
  /// 敌城使用同一份摘要，只允许查看。
  const CityServices({
    super.key,
    required this.controller,
    required this.assets,
    required this.onAction,
  });

  /// 当前城池与业务指令。
  final WorldController controller;

  /// 英雄预览图集。
  final WorldAssets assets;

  /// 操作后返回游戏键盘焦点。
  final void Function(VoidCallback) onAction;

  @override
  Widget build(BuildContext context) {
    final c = controller;
    final campaign = c.campaign;
    final cityId = c.selectedCity!.id;
    final city = campaign.cities[cityId]!;
    final hero = c.selectedHero;
    final cost = campaign.upgradeCostFor(cityId, hero);
    final upgradeProblem = campaign.upgradeBlockReason(cityId, hero);
    final quantity = campaign.soldierPurchaseBatch(cityId);
    final offer = campaign.recruitmentOffer;
    final localOffer = city.isPlayer && offer?.cityId == cityId ? offer : null;
    final blocked = campaign.recruitmentBlockReason(cityId);
    final draws = campaign.remainingHeroDraws(cityId);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        IntrinsicHeight(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Expanded(
                child: _card(
                  key: 'city-upgrade',
                  title: '城防等级',
                  value: '${city.level} 级',
                  action: (cost ?? city.baseUpgradeCost) == null
                      ? '—'
                      : '${cost ?? city.baseUpgradeCost}金币',
                  actionKey: cost == null ? null : 'city-upgrade-quote',
                  hint:
                      city.isPlayer &&
                          upgradeProblem != null &&
                          city.baseUpgradeCost != null
                      ? upgradeProblem.contains('金币')
                            ? '金币不足'
                            : '请选择空闲将领'
                      : null,
                  onTap: city.isPlayer && upgradeProblem == null
                      ? () => onAction(c.upgradeSelectedCity)
                      : null,
                ),
              ),
              const SizedBox(width: CityPanelStyle.gap),
              Expanded(
                child: _card(
                  key: 'buy-reserves',
                  title: '士兵数量',
                  value:
                      '${campaign.soldiersAt(cityId)}/${campaign.soldierCapacityAt(cityId)}',
                  valueKey: 'city-reserves',
                  action:
                      campaign.soldiersAt(cityId) >=
                          campaign.soldierCapacityAt(cityId)
                      ? '已满'
                      : city.isPlayer
                      ? '${quantity * GameConfig.soldierRecruitCost}金币'
                      : '—',
                  onTap: city.isPlayer && quantity > 0
                      ? () => onAction(c.buyCitySoldiers)
                      : null,
                ),
              ),
              const SizedBox(width: CityPanelStyle.gap),
              Expanded(
                child: _card(
                  key: 'draw-hero',
                  title: '招募英雄',
                  value: '${campaign.recruitPool.length}位',
                  valueKey: 'city-recruit-pool',
                  action: '${GameConfig.heroDrawCost}金币',
                  actionKey: 'city-recruit-quota',
                  hint: city.isPlayer && localOffer == null && draws > 0
                      ? blocked
                      : null,
                  onTap: city.isPlayer && localOffer == null && blocked == null
                      ? () => onAction(c.drawCityHero)
                      : null,
                ),
              ),
            ],
          ),
        ),
        if (city.isPlayer && offer != null && localOffer == null)
          Align(
            alignment: Alignment.centerLeft,
            child: TextButton(
              onPressed: () => onAction(
                () => c.openCity(
                  c.world.cities.firstWhere((city) => city.id == offer.cityId),
                ),
              ),
              child: const Text('前往处理待签约英雄'),
            ),
          ),
        if (localOffer != null) ...[
          const SizedBox(height: 10),
          _offer(localOffer),
        ],
      ],
    );
  }

  Widget _card({
    required String key,
    required String title,
    required String value,
    required String action,
    String? valueKey,
    String? actionKey,
    String? hint,
    VoidCallback? onTap,
  }) => Tooltip(
    message: hint ?? '',
    child: OutlinedButton(
      key: ValueKey(key),
      onPressed: onTap,
      style: CityPanelStyle.button(actionable: onTap != null),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: CityPanelStyle.label),
          const SizedBox(height: CityPanelStyle.textGap),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      value,
                      key: valueKey == null ? null : ValueKey(valueKey),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: CityPanelStyle.value,
                    ),
                  ],
                ),
              ),
              if (action.isNotEmpty) ...[
                const SizedBox(width: 3),
                Text(
                  action,
                  key: actionKey == null ? null : ValueKey(actionKey),
                  textAlign: TextAlign.right,
                  style: CityPanelStyle.text.copyWith(
                    color: onTap == null ? _muted : _gold,
                  ),
                ),
              ],
            ],
          ),
        ],
      ),
    ),
  );

  Widget _offer(RecruitmentOffer offer) => Container(
    key: const ValueKey('city-recruit-offer'),
    padding: const EdgeInsets.all(12),
    decoration: BoxDecoration(
      color: const Color(0xff20291c),
      border: Border.all(color: const Color(0xff70663e)),
      borderRadius: BorderRadius.circular(4),
    ),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CustomPaint(
              size: const Size(40, 40),
              painter: _OfferPortrait(assets, offer.hero.type),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    offer.hero.name!,
                    key: const ValueKey('recruit-offer-name'),
                    style: const TextStyle(
                      color: _cream,
                      fontSize: 15,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    offer.hero.type.label,
                    style: const TextStyle(color: _gold, fontSize: 11),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Text(
          'HP ${offer.hero.maxHp} · 战斗 ${offer.hero.combat} · 内政 ${offer.hero.politics} · 月俸 ${controller.campaign.salaryFor(offer.hero)}',
          style: const TextStyle(color: _cream, fontSize: 12, height: 1.5),
        ),
        const SizedBox(height: 6),
        const Text(
          '出战时自动补兵，放弃不退抽取费。',
          style: TextStyle(color: _muted, fontSize: 11),
        ),
        const SizedBox(height: 10),
        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                key: const ValueKey('decline-recruit'),
                style: OutlinedButton.styleFrom(minimumSize: const Size(0, 44)),
                onPressed: () =>
                    onAction(() => controller.declineRecruitment(offer)),
                child: const Text('放弃'),
              ),
            ),
            const SizedBox(width: CityPanelStyle.gap),
            Expanded(
              child: FilledButton(
                key: const ValueKey('sign-recruit'),
                style: FilledButton.styleFrom(
                  minimumSize: const Size(0, 44),
                  disabledForegroundColor: _muted,
                ),
                onPressed: controller.campaign.canSignHero(offer)
                    ? () => onAction(() => controller.signRecruitment(offer))
                    : null,
                child: Text(
                  offer.signingFee == 0
                      ? '免费签约'
                      : '签约 · ${offer.signingFee} 金币',
                ),
              ),
            ),
          ],
        ),
        if (controller.campaign.recruitmentFull(offer.cityId))
          const Text(
            '驻城英雄已满，升级或派出英雄后可签约。',
            style: TextStyle(color: _muted, fontSize: 11),
          )
        else if (controller.campaign.gold < offer.signingFee)
          const Text(
            '签约费不足，可保留结果等待下月。',
            style: TextStyle(color: _muted, fontSize: 11),
          ),
      ],
    ),
  );
}

class _OfferPortrait extends CustomPainter {
  _OfferPortrait(this.assets, this.type);
  final WorldAssets assets;
  final HeroType type;
  @override
  void paint(Canvas canvas, Size size) => canvas.drawImageRect(
    assets.heroImage(
      type == HeroType.advanced
          ? HeroAppearance.advanced
          : HeroAppearance.normal,
      friendly: true,
    ),
    const Rect.fromLTWH(0, 0, 16, 16),
    Offset.zero & size,
    Paint()..filterQuality = FilterQuality.none,
  );
  @override
  bool shouldRepaint(covariant _OfferPortrait oldDelegate) =>
      oldDelegate.assets != assets || oldDelegate.type != type;
}
