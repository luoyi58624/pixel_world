import 'package:flutter/material.dart';

import '../game_config.dart';
import '../world/campaign.dart';
import '../world/hero_sprite.dart';
import '../world/rom_hero.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';

const _cream = Color(0xffece7d1);
const _gold = Color(0xffd6bd7c);
const _muted = Color(0xffa7b5a4);

/// 城池内的兵营与随机招募，签约结果直接放在当前面板。
class CityServices extends StatefulWidget {
  /// 当前城池变化时使用不同的 key，让购买数量独立重置。
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
  State<CityServices> createState() => _CityServicesState();
}

class _CityServicesState extends State<CityServices> {
  int _quantity = 1;

  @override
  Widget build(BuildContext context) {
    final c = widget.controller;
    final campaign = c.campaign;
    final cityId = c.selectedCity!.id;
    final city = campaign.cities[cityId]!;
    final maximum = campaign.maxSoldierPurchase(cityId);
    final quantity = maximum == 0 ? 0 : _quantity.clamp(1, maximum);
    final hero = c.selectedHero;
    final reinforcement = hero == null ? 0 : campaign.reinforcementCount(hero);
    final offer = campaign.recruitmentOffer;
    final localOffer = offer?.cityId == cityId ? offer : null;
    final blocked = campaign.recruitmentBlockReason(cityId);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _title('兵营'),
        const SizedBox(height: 10),
        Text(
          '储备兵员 ${city.reserveSoldiers} / ${city.reserveCapacity}',
          key: const ValueKey('city-reserves'),
          style: const TextStyle(color: _cream, fontSize: 13),
        ),
        const SizedBox(height: 6),
        const Text(
          '每位英雄最多带 ${GameConfig.heroSoldierLimit} 人，配兵消耗城池储备。',
          style: TextStyle(color: _muted, fontSize: 11),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            IconButton(
              key: const ValueKey('reserve-minus'),
              onPressed: quantity > 1
                  ? () => setState(() => _quantity = quantity - 1)
                  : null,
              icon: const Icon(Icons.remove, size: 18),
            ),
            Text(
              '$quantity 人',
              key: const ValueKey('reserve-quantity'),
              style: const TextStyle(color: _cream),
            ),
            IconButton(
              key: const ValueKey('reserve-plus'),
              onPressed: quantity < maximum
                  ? () => setState(() => _quantity = quantity + 1)
                  : null,
              icon: const Icon(Icons.add, size: 18),
            ),
            const Spacer(),
            TextButton(
              onPressed: maximum > 0
                  ? () => setState(() => _quantity = maximum)
                  : null,
              child: const Text('最大'),
            ),
          ],
        ),
        SizedBox(
          width: double.infinity,
          child: FilledButton.tonal(
            key: const ValueKey('buy-reserves'),
            onPressed: quantity > 0
                ? () => widget.onAction(() => c.buyCitySoldiers(quantity))
                : null,
            child: Text(
              '征兵 $quantity 人 · ${quantity * GameConfig.soldierRecruitCost} 金币',
            ),
          ),
        ),
        if (maximum == 0)
          Text(
            city.reserveSoldiers >= city.reserveCapacity
                ? '储备已满，升级城池可扩容'
                : '金币不足',
            style: const TextStyle(color: _muted, fontSize: 11),
          ),
        if (hero != null)
          SizedBox(
            width: double.infinity,
            child: OutlinedButton(
              key: const ValueKey('reinforce-hero'),
              onPressed: reinforcement > 0
                  ? () => widget.onAction(c.reinforceSelectedHero)
                  : null,
              child: Text(
                reinforcement > 0
                    ? '为${hero.name}补充 $reinforcement 人'
                    : '${hero.name} · ${hero.soldiers}/${hero.squad.length} 士兵',
              ),
            ),
          ),
        const SizedBox(height: 20),
        _title('英雄商店'),
        const SizedBox(height: 10),
        Text(
          '回收池 ${campaign.recruitPool.length} 位英雄',
          style: const TextStyle(color: _muted, fontSize: 11),
        ),
        const SizedBox(height: 8),
        if (localOffer == null) ...[
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonalIcon(
              key: const ValueKey('draw-hero'),
              onPressed: blocked == null
                  ? () => widget.onAction(c.drawCityHero)
                  : null,
              icon: const Icon(Icons.casino_outlined, size: 18),
              label: Text('抽取英雄 · ${GameConfig.heroDrawCost} 金币'),
            ),
          ),
          if (blocked != null)
            Text(blocked, style: const TextStyle(color: _muted, fontSize: 11)),
          if (offer != null)
            TextButton(
              onPressed: () => widget.onAction(
                () => c.openCity(
                  c.world.cities.firstWhere((city) => city.id == offer.cityId),
                ),
              ),
              child: const Text('前往处理待签约英雄'),
            ),
          Text(
            '普通将领免费签约，高级将领另付 ${GameConfig.advancedSigningFee} 金币。',
            style: const TextStyle(color: _muted, fontSize: 11),
          ),
        ] else ...[
          Row(
            children: [
              CustomPaint(
                size: const Size(40, 40),
                painter: _OfferPortrait(widget.assets, localOffer.hero.type),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      localOffer.hero.name!,
                      key: const ValueKey('recruit-offer-name'),
                      style: const TextStyle(
                        color: _cream,
                        fontSize: 15,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    Text(
                      localOffer.hero.type.label,
                      style: const TextStyle(color: _gold, fontSize: 11),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            'HP ${localOffer.hero.maxHp} · 战斗 ${localOffer.hero.combat} · 内政 ${localOffer.hero.politics} · 月俸 ${CampaignHero.salaryFor(localOffer.hero)}',
            style: const TextStyle(color: _cream, fontSize: 12),
          ),
          const SizedBox(height: 8),
          const Text(
            '签约后进驻本城，需从储备配兵。放弃不退抽取费。',
            style: TextStyle(color: _muted, fontSize: 11),
          ),
          const SizedBox(height: 10),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  key: const ValueKey('decline-recruit'),
                  onPressed: () =>
                      widget.onAction(() => c.declineRecruitment(localOffer)),
                  child: const Text('放弃'),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: FilledButton(
                  key: const ValueKey('sign-recruit'),
                  onPressed: campaign.gold >= localOffer.signingFee
                      ? () =>
                            widget.onAction(() => c.signRecruitment(localOffer))
                      : null,
                  child: Text(
                    localOffer.signingFee == 0
                        ? '免费签约'
                        : '签约 · ${localOffer.signingFee} 金币',
                  ),
                ),
              ),
            ],
          ),
          if (campaign.gold < localOffer.signingFee)
            const Text(
              '签约费不足，可保留结果等待下月。',
              style: TextStyle(color: _muted, fontSize: 11),
            ),
        ],
      ],
    );
  }

  Widget _title(String title) => Text(
    title,
    style: const TextStyle(
      color: _gold,
      fontSize: 12,
      fontWeight: FontWeight.w600,
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
