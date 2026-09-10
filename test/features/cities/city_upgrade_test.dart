import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

List<RomHeroDefinition> _catalog() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());

List<WorldDefinition> _worlds() =>
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync());

CampaignState _campaign({int gold = 50}) =>
    CampaignState.fromRom(_worlds().first, _catalog(), startingGold: gold);

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

void main() {
  test('驻城将领内政直接抵扣价格，升级不消耗将领或改变已有伤势兵力', () {
    final c = _campaign(gold: 27);
    final governor = _hero(c, 2)..hp = 20;
    governor.squad.first.hp = 5;
    final soldierHp = governor.squad.map((soldier) => soldier.hp).toList();
    expect(c.upgradeCostFor(0, _hero(c, 40)), 15);
    expect(c.upgradeCostFor(0, governor), 27);
    expect(c.upgradeCity(0, hero: governor), isTrue);
    expect(c.gold, 0);
    expect(c.cities[0]!.level, 2);
    expect(c.garrisonAt(0), contains(same(governor)));
    expect(governor.hp, 20);
    expect(governor.squad.map((soldier) => soldier.hp), soldierHp);
    expect(c.journal.last, contains(governor.name));
    expect(c.upgradeCostFor(0, governor), 77);
  });

  test('无选择、伪造同编号、外城、敌军和已阵亡将领不能升级且不扣款', () {
    final c = _campaign();
    final outsider = _hero(c, 0)..cityId = 2;
    final fallen = _hero(c, 2)..hp = 0;
    final duplicate = CampaignHero.fromRom(
      _catalog().firstWhere((hero) => hero.id == 40),
      cityId: 0,
      countryId: 0,
    );
    for (final hero in <CampaignHero?>[
      null,
      duplicate,
      outsider,
      fallen,
      c.heroes.firstWhere((hero) => !hero.isPlayer),
    ]) {
      expect(c.upgradeCostFor(0, hero), isNull);
      expect(c.upgradeBlockReason(0, hero), isNotNull);
      expect(c.upgradeCity(0, hero: hero), isFalse);
      expect(c.gold, 50);
      expect(c.cities[0]!.level, 1);
    }
    expect(c.upgradeCity(-1, hero: _hero(c, 40)), isFalse);
  });

  test('出征和扎营不能远程升级，一级城仍可用另一位驻城将领升级', () {
    final c = _campaign();
    final away = _hero(c, 40);
    final governor = _hero(c, 0);
    c.dispatch(away, c.world.cities[1]);
    expect(c.upgradeCity(0, hero: away), isFalse);
    expect(c.camp(away.id), isTrue);
    expect(c.upgradeCity(0, hero: away), isFalse);
    expect(c.gold, 50);
    expect(c.canDispatch(governor), isTrue);
    expect(c.upgradeCity(0, hero: governor), isTrue);
    expect(c.cities[0]!.level, 2);
    expect(c.canDispatch(governor), isTrue);
  });

  test('正在迎战的守将不能升级，空闲驻军可以且不重建战斗', () {
    final c = _campaign();
    final defender = _hero(c, 40);
    final battle = CityBattle(
      c.world.cities.first,
      c.garrisonAt(1).first,
      defender,
      cityLevel: c.cities[0]!.level,
    );
    c.battles[0] = battle;
    final simulation = battle.simulation;
    expect(c.upgradeBlockReason(0, defender), contains('交战'));
    expect(c.upgradeCity(0, hero: defender), isFalse);
    expect(c.upgradeCity(0, hero: _hero(c, 0)), isTrue);
    expect(c.battles[0], same(battle));
    expect(battle.simulation, same(simulation));
    expect(battle.isActive, isTrue);
  });

  test('配置高内政时费用最低为零，不会反向增加金币', () {
    final c = _campaign(gold: 0);
    final governor = CampaignHero.fromRom(
      RomHeroDefinition.fromJson({
        'id': 0,
        'name': '内政将领',
        'type': 'advanced',
        'maxHp': 95,
        'combat': 15,
        'politics': 300,
        'salary': 8,
        'eggCapable': true,
        'soldierLimit': 4,
      }),
      cityId: 0,
      countryId: 0,
    );
    c.heroes.removeWhere((hero) => hero.sourceId == 0);
    c.heroes.add(governor);
    for (final base in [30, 80, 150, 300]) {
      expect(c.cities[0]!.baseUpgradeCost, base);
      expect(c.upgradeCostFor(0, governor), 0);
      expect(c.upgradeCity(0, hero: governor), isTrue);
      expect(c.gold, 0);
    }
    expect(c.upgradeCity(0, hero: governor), isFalse);
    expect(c.cities[0]!.level, 5);
  });

  test('城池默认选可主持升级者，点击时重新验证已选择将领的驻城状态', () {
    final c = WorldController(_worlds(), heroCatalog: _catalog());
    addTearDown(c.dispose);
    final home = c.world.cities.first;
    c.openCity(home);
    final selected = c.selectedHero!;
    expect(selected.sourceId, 40);
    c.campaign.dispatch(selected, c.world.cities[1]);
    c.upgradeSelectedCity();
    expect(c.campaign.gold, 50);
    expect(c.campaign.cities[0]!.level, 1);
    expect(c.message, contains('选择一位城内将领'));
    c.openCity(home);
    expect(c.selectedHero!.sourceId, 0);
    c.upgradeSelectedCity();
    expect(c.campaign.gold, 35);
    expect(c.campaign.cities[0]!.level, 2);
  });
}
