import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import '../world/campaign.dart';
import '../world/world_assets.dart';
import '../world/world_controller.dart';

const _ink = Color(0xff141b17);
const _cream = Color(0xffece7d1);
const _gold = Color(0xffd6bd7c);
const _muted = Color(0xffa7b5a4);
const _line = Color(0xff43513e);

/// 城池选项与单页英雄详情，底部操作固定，较小窗口中只滚动内容。
class CityPanel extends StatelessWidget {
  /// 根据当前城池选择构建面板。
  const CityPanel({
    super.key,
    required this.controller,
    required this.assets,
    required this.maxHeight,
    required this.onAction,
  });

  /// 城池选择及出征状态。
  final WorldController controller;

  /// 角色图集。
  final WorldAssets assets;

  /// 当前地图内允许的最大面板高度。
  final double maxHeight;

  /// 完成操作后将键盘焦点交回地图。
  final void Function(VoidCallback) onAction;

  @override
  Widget build(BuildContext context) {
    final c = controller;
    final city = c.selectedCity!;
    final situation = c.campaign.cities[city.id]!;
    final isMenu = c.cityPage == CityPanelPage.actions;
    return Container(
      key: const ValueKey('city-panel'),
      constraints: BoxConstraints(maxHeight: maxHeight),
      decoration: BoxDecoration(
        color: _ink,
        border: Border.all(color: const Color(0xff7d896b)),
        borderRadius: BorderRadius.circular(5),
        boxShadow: const [
          BoxShadow(
            color: Color(0x66000000),
            blurRadius: 18,
            offset: Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 10, 8, 8),
            child: Row(
              children: [
                Icon(
                  Icons.fort_outlined,
                  size: 23,
                  color: situation.isPlayer ? _gold : const Color(0xffdd9585),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        city.label,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: _cream,
                        ),
                      ),
                      const SizedBox(height: 3),
                      Text(
                        '${situation.isPlayer ? '我方城池' : '敌方城池'} · Lv.${situation.level}',
                        style: const TextStyle(fontSize: 11, color: _muted),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  tooltip: '关闭城池信息',
                  onPressed: () => onAction(c.closeCity),
                  icon: const Icon(Icons.close, size: 18, color: _muted),
                ),
              ],
            ),
          ),
          const Divider(height: 1, color: _line),
          Flexible(
            child: SingleChildScrollView(
              key: const ValueKey('city-panel-scroll'),
              padding: const EdgeInsets.all(16),
              child: isMenu
                  ? _options(situation)
                  : c.cityPage == CityPanelPage.information
                  ? _information(situation)
                  : _dispatch(situation),
            ),
          ),
          if (!isMenu) _footer(),
        ],
      ),
    );
  }

  Widget _options(CitySituation situation) => Column(
    mainAxisSize: MainAxisSize.min,
    children: [
      SizedBox(
        width: double.infinity,
        child: FilledButton.icon(
          key: const ValueKey('city-sortie'),
          onPressed: situation.isPlayer
              ? () => onAction(
                  () => controller.showCityPage(CityPanelPage.dispatch),
                )
              : null,
          icon: const Icon(Icons.flag_outlined, size: 18),
          label: const Text('出击'),
          style: _primaryStyle,
        ),
      ),
      const SizedBox(height: 8),
      SizedBox(
        width: double.infinity,
        child: OutlinedButton.icon(
          key: const ValueKey('city-information'),
          onPressed: () => onAction(
            () => controller.showCityPage(CityPanelPage.information),
          ),
          icon: const Icon(Icons.info_outline, size: 18),
          label: const Text('情况'),
          style: _secondaryStyle,
        ),
      ),
      if (!situation.isPlayer)
        const Padding(
          padding: EdgeInsets.only(top: 10),
          child: Text(
            '从我方城池派遣英雄进攻此城',
            style: TextStyle(fontSize: 11, color: _muted),
          ),
        ),
    ],
  );

  Widget _cityStats(CitySituation situation) => _stats([
    ('城防', '${situation.defense}'),
    ('收入 / 回合', '${situation.income}'),
    ('驻守士兵', '${controller.campaign.soldiersAt(controller.selectedCity!.id)}'),
  ], columns: 3);

  Widget _information(CitySituation situation) {
    final heroes = controller.campaign.heroesAt(controller.selectedCity!.id);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _section('城池情况'),
        const SizedBox(height: 12),
        _cityStats(situation),
        const SizedBox(height: 12),
        _economy(situation),
        const SizedBox(height: 20),
        _section(situation.isPlayer ? '所属英雄' : '守城部队'),
        const SizedBox(height: 10),
        if (!situation.isPlayer)
          Text(
            '守军 ${controller.campaign.soldiersAt(controller.selectedCity!.id)} 人',
            style: const TextStyle(color: _cream, fontSize: 13),
          ),
        for (final hero in heroes)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 6),
            child: Row(
              children: [
                _portrait(hero, 36),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    hero.name,
                    style: const TextStyle(color: _cream, fontSize: 14),
                  ),
                ),
                Text(
                  '${hero.hp}/${hero.maxHp} HP · ${_heroStatus(hero)}',
                  style: const TextStyle(color: _muted, fontSize: 12),
                ),
              ],
            ),
          ),
      ],
    );
  }

  Widget _dispatch(CitySituation situation) {
    final c = controller;
    final heroes = c.campaign.heroesAt(c.selectedCity!.id);
    final hero = c.selectedHero;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _cityStats(situation),
        const SizedBox(height: 18),
        _section('选择英雄'),
        const SizedBox(height: 10),
        LayoutBuilder(
          builder: (context, constraints) {
            final columns = constraints.maxWidth < 260 ? 2 : 3;
            return Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                for (final hero in heroes)
                  SizedBox(
                    width: (constraints.maxWidth - (columns - 1) * 8) / columns,
                    child: _heroChoice(hero),
                  ),
              ],
            );
          },
        ),
        if (heroes.isEmpty)
          const Text('城中暂无可派遣的英雄', style: TextStyle(color: _muted)),
        if (hero != null) ...[
          const SizedBox(height: 18),
          Row(
            children: [
              Text(
                '${hero.name} · 将军',
                style: const TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.w600,
                  color: _cream,
                ),
              ),
              const Spacer(),
              Text(
                _heroStatus(hero),
                style: const TextStyle(fontSize: 11, color: _gold),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              const Text('HP', style: TextStyle(fontSize: 11, color: _muted)),
              const Spacer(),
              Text(
                '${hero.hp} / ${hero.maxHp}',
                key: const ValueKey('hero-hp'),
                style: const TextStyle(
                  fontSize: 12,
                  color: _cream,
                  fontFeatures: [ui.FontFeature.tabularFigures()],
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          LinearProgressIndicator(
            value: hero.hp / hero.maxHp,
            minHeight: 4,
            color: Color(0xffa3be85),
            backgroundColor: _line,
          ),
          const SizedBox(height: 14),
          _stats([
            ('战斗', '${hero.combat}'),
            ('内政', '${hero.politics}'),
            ('报酬', '${hero.salary} / 回合'),
          ], columns: 3),
          const SizedBox(height: 10),
          _stats([('士兵', '${hero.soldiers} 人'), ('王牌', hero.ace)], columns: 2),
          const SizedBox(height: 10),
          Text(
            '召唤蛋：${hero.hasEgg ? '可使用' : '不可使用'}',
            style: const TextStyle(fontSize: 11, color: _muted),
          ),
          if (!c.campaign.canDispatch(hero))
            Padding(
              padding: const EdgeInsets.only(top: 10),
              child: Text(
                c.campaign.dispatchBlockReason(hero)!,
                style: const TextStyle(fontSize: 12, color: _muted),
              ),
            ),
        ],
      ],
    );
  }

  Widget _heroChoice(CampaignHero hero) {
    final selected = controller.selectedHeroId == hero.id;
    return OutlinedButton(
      key: ValueKey('dispatch-hero-${hero.id}'),
      onPressed: () => onAction(() => controller.selectHero(hero.id)),
      style: OutlinedButton.styleFrom(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 9),
        backgroundColor: selected
            ? const Color(0xff303b2b)
            : const Color(0xff0d150f),
        foregroundColor: selected ? _cream : _muted,
        side: BorderSide(color: selected ? _gold : _line),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
      ),
      child: Row(
        children: [
          _portrait(hero, 24),
          const SizedBox(width: 7),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  hero.name,
                  style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 3),
                Text(_heroStatus(hero), style: const TextStyle(fontSize: 10)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _heroStatus(CampaignHero hero) =>
      switch (controller.campaign.marches[hero.id]?.phase) {
        MarchPhase.marching => '出征中',
        MarchPhase.awaitingBattle => '城下待战',
        MarchPhase.fighting => '交战中',
        null => '驻守中',
      };

  Widget _economy(CitySituation situation) {
    final c = controller;
    final cityId = c.selectedCity!.id;
    final cost = situation.upgradeCost;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _section('经济情况'),
        const SizedBox(height: 10),
        _stats([
          ('英雄报酬 / 回合', '${c.campaign.salaryAt(cityId)}'),
          ('本城净产出', '${situation.income - c.campaign.salaryAt(cityId)}'),
        ], columns: 2),
        const SizedBox(height: 10),
        if (situation.isPlayer) ...[
          Text(
            '国库 ${c.campaign.gold} 金币 · 每 30 秒结算',
            style: const TextStyle(fontSize: 12, color: _cream),
          ),
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            child: FilledButton.icon(
              key: const ValueKey('city-upgrade'),
              onPressed: cost != null && c.campaign.gold >= cost
                  ? () => onAction(c.upgradeSelectedCity)
                  : null,
              icon: const Icon(Icons.upgrade, size: 18),
              label: Text(
                cost == null
                    ? '已满级 · 5 级城市'
                    : '升级至 ${situation.level + 1} 级 · $cost 金币',
              ),
              style: _primaryStyle,
            ),
          ),
          if (cost != null)
            Text(
              '升级后每回合产出 ${situation.income + situation.baseIncome}',
              style: const TextStyle(fontSize: 11, color: _muted),
            ),
          if (cost != null && c.campaign.gold < cost)
            const Text(
              '金币不足，等待下一次结算',
              style: TextStyle(fontSize: 11, color: _muted),
            ),
        ],
        const SizedBox(height: 10),
        const Text(
          '英雄每战败一位，所属城池降一级；一级城战败即失守，未出战英雄一并消失。',
          style: TextStyle(fontSize: 11, height: 1.5, color: _muted),
        ),
        if (c.campaign.journal.isNotEmpty) ...[
          const SizedBox(height: 12),
          _section('最近记录'),
          const SizedBox(height: 6),
          for (final event in c.campaign.journal.reversed.take(3))
            Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Text(
                event,
                style: const TextStyle(fontSize: 11, color: _muted),
              ),
            ),
        ],
      ],
    );
  }

  Widget _footer() {
    final c = controller;
    final hero = c.selectedHero;
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: _line)),
      ),
      child: Row(
        children: [
          if (c.cityPage == CityPanelPage.dispatch) ...[
            Expanded(
              child: FilledButton.icon(
                key: const ValueKey('dispatch-confirm'),
                onPressed: hero != null && c.campaign.canDispatch(hero)
                    ? () => onAction(c.prepareDispatch)
                    : null,
                icon: const Icon(Icons.flag_outlined, size: 16),
                label: const Text('出击'),
                style: _primaryStyle,
              ),
            ),
            const SizedBox(width: 10),
          ],
          Expanded(
            child: OutlinedButton(
              key: const ValueKey('city-cancel'),
              onPressed: () => onAction(c.cancelCityAction),
              style: _secondaryStyle,
              child: const Text('取消'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _portrait(CampaignHero hero, double size) => CustomPaint(
    size: Size.square(size),
    painter: _PortraitPainter(assets.heroes[hero.appearance]!),
  );

  Widget _section(String text) => Text(
    text,
    style: const TextStyle(
      color: _gold,
      fontSize: 12,
      fontWeight: FontWeight.w600,
    ),
  );

  Widget _stats(List<(String, String)> entries, {required int columns}) =>
      LayoutBuilder(
        builder: (context, constraints) => Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            for (final entry in entries)
              Container(
                width: (constraints.maxWidth - (columns - 1) * 8) / columns,
                padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 8),
                decoration: BoxDecoration(
                  color: const Color(0xff1e291e),
                  borderRadius: BorderRadius.circular(3),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      entry.$1,
                      style: const TextStyle(fontSize: 10, color: _muted),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      entry.$2,
                      style: const TextStyle(
                        fontSize: 13,
                        color: _cream,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
          ],
        ),
      );

  ButtonStyle get _primaryStyle => FilledButton.styleFrom(
    backgroundColor: _gold,
    foregroundColor: _ink,
    minimumSize: const Size(0, 40),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
  );

  ButtonStyle get _secondaryStyle => OutlinedButton.styleFrom(
    foregroundColor: _cream,
    minimumSize: const Size(0, 40),
    side: const BorderSide(color: _line),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
  );
}

class _PortraitPainter extends CustomPainter {
  _PortraitPainter(this.image);
  final ui.Image image;

  @override
  void paint(Canvas canvas, Size size) => canvas.drawImageRect(
    image,
    const Rect.fromLTWH(0, 0, 16, 16),
    Offset.zero & size,
    Paint()
      ..filterQuality = FilterQuality.none
      ..isAntiAlias = false,
  );

  @override
  bool shouldRepaint(_PortraitPainter oldDelegate) =>
      image != oldDelegate.image;
}
