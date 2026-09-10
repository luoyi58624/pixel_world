import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import '../../campaign/domain/campaign.dart';
import '../../heroes/data/rom_hero.dart';
import '../../world_map/data/world_assets.dart';
import '../../world_map/presentation/world_controller.dart';
import '../../countries/presentation/country_flag.dart';
import 'city_services.dart';
import 'city_panel_style.dart';
import '../../weapons/presentation/weapon_loadout.dart';
import '../../heroes/presentation/hero_dismiss_button.dart';
import '../../countries/presentation/country_event_log.dart';

const _ink = Color(0xff141b17);
const _cream = CityPanelStyle.ink;
const _gold = CityPanelStyle.gold;
const _muted = CityPanelStyle.muted;
const _line = Color(0xff43513e);

/// 城池单层详情，我方可直接选英雄出击，底部操作固定。
class CityPanel extends StatefulWidget {
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
  State<CityPanel> createState() => _CityPanelState();
}

class _CityPanelState extends State<CityPanel> {
  WorldController get controller => widget.controller;
  WorldAssets get assets => widget.assets;
  double get maxHeight => widget.maxHeight;
  void Function(VoidCallback) get onAction => widget.onAction;
  bool _showEvents = false;

  @override
  Widget build(BuildContext context) {
    final c = controller;
    final city = c.selectedCity!;
    final situation = c.campaign.cities[city.id]!;
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
                CountryFlag(
                  key: const ValueKey('city-country-flag'),
                  image: assets.flags,
                  countryId: situation.ownerCountryId,
                  countryName: c.world.countryName(situation.ownerCountryId),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Wrap(
                    spacing: 16,
                    runSpacing: 4,
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      Text(
                        '${c.campaign.cityName(city.id)}国',
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                          color: _cream,
                        ),
                      ),
                      Text(
                        '金币 ${c.campaign.goldFor(situation.ownerCountryId)}',
                        key: const ValueKey('city-treasury'),
                        style: const TextStyle(
                          fontSize: 14,
                          color: _gold,
                          fontWeight: FontWeight.w600,
                          fontFeatures: [ui.FontFeature.tabularFigures()],
                        ),
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
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 4, 12, 4),
            child: Row(
              children: [
                for (final entry in [
                  (false, '国家情况', 'country-info-tab'),
                  (true, '事件日志', 'country-events-tab'),
                ])
                  Expanded(
                    child: TextButton(
                      key: ValueKey(entry.$3),
                      onPressed: () => setState(() => _showEvents = entry.$1),
                      style: TextButton.styleFrom(
                        foregroundColor: _showEvents == entry.$1
                            ? _gold
                            : _muted,
                        backgroundColor: _showEvents == entry.$1
                            ? const Color(0xff263025)
                            : Colors.transparent,
                      ),
                      child: Text(
                        entry.$2,
                        style: const TextStyle(fontSize: 12),
                      ),
                    ),
                  ),
              ],
            ),
          ),
          Flexible(
            child: _showEvents
                ? CountryEventLogView(
                    key: ValueKey('country-log-${situation.ownerCountryId}'),
                    log: c.campaign.events.forCountry(situation.ownerCountryId),
                  )
                : SingleChildScrollView(
                    key: const ValueKey('city-panel-scroll'),
                    padding: const EdgeInsets.all(16),
                    child: _information(situation),
                  ),
          ),
          if (!_showEvents) _footer(situation.isPlayer),
        ],
      ),
    );
  }

  Widget _information(CitySituation situation) {
    final c = controller;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (c.campaign.battles[c.selectedCity!.id] case final battle?
            when battle.isActive) ...[
          SizedBox(
            width: double.infinity,
            child: FilledButton.tonalIcon(
              key: const ValueKey('city-watch-battle'),
              onPressed: () => onAction(() => c.watchBattle(battle)),
              icon: const Icon(Icons.bolt, size: 18),
              label: const Text('正在交战 · 进入观战'),
            ),
          ),
          const SizedBox(height: 12),
        ],
        _section('城池情况'),
        const SizedBox(height: CityPanelStyle.headingGap),
        CityServices(controller: c, assets: assets, onAction: onAction),
        const SizedBox(height: CityPanelStyle.sectionGap),
        _heroSelection(),
        if (situation.isPlayer &&
            c.campaign.weaponCatalog.weapons.isNotEmpty) ...[
          const SizedBox(height: CityPanelStyle.sectionGap),
          WeaponLibrary(controller: c, onAction: onAction),
        ],
        const SizedBox(height: CityPanelStyle.sectionGap),
        _economy(situation),
      ],
    );
  }

  Widget _heroSelection() {
    final c = controller;
    final heroes = c.campaign.garrisonAt(c.selectedCity!.id);
    final hero = c.selectedHero;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _section('驻守英雄'),
        const SizedBox(height: CityPanelStyle.headingGap),
        LayoutBuilder(
          builder: (context, constraints) {
            final columns = constraints.maxWidth < 260 ? 2 : 3;
            return Wrap(
              spacing: CityPanelStyle.gap,
              runSpacing: CityPanelStyle.gap,
              children: [
                for (final hero in heroes)
                  SizedBox(
                    width:
                        (constraints.maxWidth -
                            (columns - 1) * CityPanelStyle.gap) /
                        columns,
                    child: _heroChoice(hero),
                  ),
              ],
            );
          },
        ),
        if (heroes.isEmpty)
          const Text('城中暂无驻守英雄', style: TextStyle(color: _muted)),
        if (hero != null) ...[
          const SizedBox(height: CityPanelStyle.sectionGap),
          Row(
            children: [
              Text(
                hero.type == HeroType.protagonist
                    ? hero.name
                    : '${hero.name} · ${hero.type.label}',
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
                '${hero.health.label} / ${hero.maxHp}',
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
            ('月俸', '${hero.salary}'),
          ], columns: 3),
          if (hero.isPlayer && !c.campaign.canDispatch(hero))
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
      style: CityPanelStyle.button(selected: selected),
      child: Row(
        children: [
          _portrait(hero, 20),
          const SizedBox(width: 5),
          Expanded(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  hero.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: CityPanelStyle.value,
                ),
                const SizedBox(height: CityPanelStyle.textGap),
                Text(
                  _heroStatus(hero),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: CityPanelStyle.label,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  String _heroStatus(CampaignHero hero) =>
      switch (controller.campaign.marches[hero.id]?.phase) {
        MarchPhase.camped => '扎营中',
        MarchPhase.marching => '出征中',
        MarchPhase.awaitingBattle => '城下待战',
        MarchPhase.fighting => '交战中',
        MarchPhase.dueling => '野战中',
        null => '驻守中',
      };

  Widget _economy(CitySituation situation) {
    final c = controller;
    final cityId = c.selectedCity!.id;
    final report = c.campaign.lastSettlementFor(situation.ownerCountryId);
    return Column(
      key: const ValueKey('city-economy'),
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            _section('经济情况'),
            const Spacer(),
            Text(
              c.campaign.dateLabel,
              style: const TextStyle(fontSize: 11, color: _muted),
            ),
          ],
        ),
        const SizedBox(height: CityPanelStyle.headingGap),
        _stats([
          ('月收入', '${situation.income}'),
          ('本城月俸', '${c.campaign.salaryAt(cityId)}'),
          ('正常净收入', '${situation.income - c.campaign.salaryAt(cityId)}'),
        ], columns: 3),
        if (report != null) ...[
          const SizedBox(height: CityPanelStyle.headingGap),
          Text(
            '${report.year}年${report.month}月 · ${report.harvest.label}\n城池收入 ${report.baseIncome}，收成 ${report.adjustment >= 0 ? '+' : ''}${report.adjustment}，月俸 −${report.salary}\n国库 ${report.actualChange >= 0 ? '+' : ''}${report.actualChange} 金币',
            key: const ValueKey('city-monthly-report'),
            style: const TextStyle(fontSize: 11, height: 1.5, color: _muted),
          ),
        ],
      ],
    );
  }

  Widget _footer(bool isPlayer) {
    final c = controller;
    final hero = c.selectedHero;
    return Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
      decoration: const BoxDecoration(
        border: Border(top: BorderSide(color: _line)),
      ),
      child: Row(
        children: [
          Expanded(
            child: isPlayer
                ? HeroDismissButton(
                    key: const ValueKey('city-dismiss'),
                    controller: c,
                    hero: hero,
                    onAction: onAction,
                  )
                : OutlinedButton(
                    key: const ValueKey('city-cancel'),
                    onPressed: () => onAction(c.cancelCityAction),
                    style: _secondaryStyle,
                    child: const Text('取消'),
                  ),
          ),
          if (isPlayer) ...[
            const SizedBox(width: 10),
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
          ],
        ],
      ),
    );
  }

  Widget _portrait(CampaignHero hero, double size) => CustomPaint(
    size: Size.square(size),
    painter: _PortraitPainter(
      assets.heroImage(hero.appearance, friendly: hero.isPlayer),
    ),
  );

  Widget _section(String text) => Text(text, style: CityPanelStyle.heading);

  Widget _stats(List<(String, String)> entries, {required int columns}) =>
      LayoutBuilder(
        builder: (context, constraints) {
          final count = columns;
          return Wrap(
            spacing: CityPanelStyle.gap,
            runSpacing: CityPanelStyle.gap,
            children: [
              for (final entry in entries)
                Container(
                  key: ValueKey('city-stat-${entry.$1}'),
                  constraints: const BoxConstraints(
                    minHeight: CityPanelStyle.cardHeight,
                  ),
                  width:
                      (constraints.maxWidth -
                          (count - 1) * CityPanelStyle.gap) /
                      count,
                  padding: CityPanelStyle.padding,
                  alignment: Alignment.centerLeft,
                  decoration: CityPanelStyle.decoration,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(entry.$1, style: CityPanelStyle.label),
                      const SizedBox(height: CityPanelStyle.textGap),
                      Text(
                        entry.$2,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: CityPanelStyle.value,
                      ),
                    ],
                  ),
                ),
            ],
          );
        },
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
