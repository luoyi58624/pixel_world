import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/game_config.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/campaign_setup.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';

class _Pick implements math.Random {
  int value = 0;
  @override
  int nextInt(int max) => value % max;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0;
}

List<WorldDefinition> _worlds() =>
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync());

List<RomHeroDefinition> _catalog() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());

final _configuredCountries = CampaignSetup.decode(
  File('assets/data/campaign_config.json').readAsStringSync(),
).countries;

Map<int, CountryConfig> _quietCountries() => {
  for (var id = 0; id < 16; id++)
    id: CountryConfig(initialGold: id == 0 ? 50 : 0, garrisonHeroes: 99),
};

CampaignState _campaign({
  bool ai = false,
  int? gold,
  Map<int, CountryConfig>? countries,
  math.Random? random,
  math.Random? recruit,
}) => CampaignState.fromRom(
  _worlds().first,
  _catalog(),
  aiEnabled: ai,
  startingGold: gold,
  countryConfigs:
      countries ??
      CampaignSetup.decode(
        File('assets/data/campaign_config.json').readAsStringSync(),
      ).countries,
  economyRandom: _Pick(),
  recruitmentRandom: recruit ?? _Pick(),
  aiRandom: random ?? math.Random(7),
);

int _strength(CampaignHero a, CampaignHero b) {
  final combat = b.combat.compareTo(a.combat);
  return combat != 0 ? combat : b.maxHp.compareTo(a.maxHp);
}

void main() {
  test('各国独立开局资金，初始将领和城池等级仍取自地图记录', () {
    final c = _campaign();
    expect(c.gold, 50);
    expect(c.goldFor(1), 70);
    expect(c.goldFor(3), 80);
    expect(c.goldFor(6), 40);
    for (final city in c.world.cities) {
      expect(c.cities[city.id]!.level, city.initialLevel);
      expect(
        c.heroesAt(city.id).map((hero) => hero.sourceId).toSet(),
        city.unitIds.toSet(),
      );
    }
    final overrides = {
      1: const CountryConfig(initialGold: 123, garrisonHeroes: 3),
    };
    final custom = _campaign(countries: overrides);
    overrides.clear();
    expect(custom.goldFor(1), 123);
    expect(custom.configFor(1).garrisonHeroes, 3);
    expect(custom.gold, 50);
  });

  test('各国征兵补兵和内政升级只扣自己的钱，玩家接口不能操作别国', () {
    final c = _campaign(gold: 100);
    final governor = c.garrisonAt(1).first;
    governor.squad.first.hp = 0;
    expect(c.buySoldiers(1, 4), isFalse);
    expect(c.buySoldiers(1, 4, countryId: 1), isTrue);
    expect(c.goldFor(1), 96);
    expect(c.reinforceHero(governor), 0);
    expect(c.reinforceHero(governor, countryId: 1), 1);
    expect(c.cities[1]!.reserveSoldiers, 3);
    final price = c.upgradeCostFor(1, governor, countryId: 1)!;
    expect(price, 80 - governor.politics);
    expect(c.upgradeCity(1, hero: governor), isFalse);
    expect(c.upgradeCity(1, hero: governor, countryId: 1), isTrue);
    expect(c.goldFor(1), 96 - price);
    expect(c.gold, 100);
    expect(c.goldFor(2), 100);
    expect(c.dispatch(governor, c.world.cities[2]), isNull);
    expect(c.dispatch(governor, c.world.cities[2], countryId: 1), isNotNull);
    expect(c.hasDispatched, isFalse);
  });

  test('每城每月最多三次，放弃和易主不返次数，不同城市独立计算', () {
    final c = _campaign(gold: 100);
    for (var i = 0; i < 3; i++) {
      final offer = c.drawHero(0)!;
      expect(c.remainingHeroDraws(0), 2 - i);
      c.declineHero(offer);
    }
    final before = c.gold;
    expect(c.drawHero(0), isNull);
    expect(c.gold, before);
    expect(c.recruitmentBlockReason(0), contains('次数已用完'));
    c.cities[2]!.ownerCountryId = 0;
    c.heroes.firstWhere((hero) => hero.sourceId == 40).cityId = 2;
    final second = c.drawHero(2)!;
    c.declineHero(second);
    expect(c.remainingHeroDraws(2), 2);
    c.cities[0]!.ownerCountryId = 1;
    expect(c.remainingHeroDraws(0), 0);
    expect(c.drawHero(0, countryId: 1), isNull);
    c.advance(59.99);
    expect(c.remainingHeroDraws(0), 0);
    c.advance(0.01);
    expect(c.remainingHeroDraws(0), 3);
    expect(c.drawHero(0, countryId: 1), isNotNull);
    expect(c.remainingHeroDraws(0), 0); // NPC 签约成功后也不能继续抽。
  });

  test('玩家预留不被其他国家抽到，NPC抽取后立即签约且不能重复领取', () {
    final c = _campaign(gold: 100);
    final player = c.drawHero(0)!;
    final foreign = c.drawHero(1, countryId: 1)!;
    expect(player.hero.id, isNot(foreign.hero.id));
    expect(c.recruitmentOffer, same(player));
    expect(c.recruitmentOfferFor(1), isNull);
    expect(c.signHero(foreign), isNull);
    expect(c.declineHero(foreign), isFalse);
    expect(c.signHero(foreign, countryId: 1), isNull);
    final signed = c.heroes.firstWhere(
      (hero) => hero.sourceId == foreign.hero.id,
    );
    expect(signed.countryId, 1);
    expect(signed.cityId, 1);
    expect(signed.soldiers, 0);
    expect(c.goldFor(1), 95 - foreign.signingFee);
    expect(c.gold, 95);
    expect(c.recruitmentOffer, same(player));
    c.cities[0]!.ownerCountryId = 1;
    c.advance(0);
    expect(c.defeated, isTrue);
    expect(c.recruitmentOffer, isNull);
    expect(c.recruitPool.any((hero) => hero.id == player.hero.id), isTrue);
  });

  test('唯一候选被玩家锁定后所有国家都抽不到，放弃后可被NPC立即签走', () {
    final c = _campaign(gold: 10000);
    while (c.recruitPool.length > 1) {
      c.signHero(c.drawHero(0)!);
      c.advance(60);
    }
    final reserved = c.drawHero(0)!;
    final before = c.goldFor(1);
    expect(c.recruitPool, isEmpty);
    expect(c.drawHero(1, countryId: 1), isNull);
    expect(c.goldFor(1), before);
    expect(c.remainingHeroDraws(1), 3);
    expect(c.heroes.any((hero) => hero.sourceId == reserved.hero.id), isFalse);
    c.declineHero(reserved);
    final taken = c.drawHero(1, countryId: 1)!;
    expect(taken.hero.id, reserved.hero.id);
    expect(c.recruitmentOfferFor(1), isNull);
    expect(
      c.heroes
          .where((hero) => hero.sourceId == reserved.hero.id)
          .single
          .countryId,
      1,
    );
    expect(c.signHero(reserved), isNull);
    expect(c.recruitPool, isEmpty);
    expect(c.drawHero(2, countryId: 2), isNull);
  });

  test('NPC先备足抽取和可能的签约费用，钱不够不锁人、不扣钱、不占月次数', () {
    final c = _campaign(gold: 14);
    expect(c.recruitPool.any((hero) => hero.type == HeroType.advanced), isTrue);
    final before = c.recruitPool.map((hero) => hero.id).toList();
    expect(c.drawHero(1, countryId: 1), isNull);
    expect(c.recruitPool.map((hero) => hero.id), before);
    expect(c.goldFor(1), 14);
    expect(c.remainingHeroDraws(1), 3);
    expect(c.recruitmentOfferFor(1), isNull);
    // 玩家仍然可以只付抽取费，保留结果再选择是否签约。
    expect(c.drawHero(0), isNotNull);
    expect(c.gold, 9);
    expect(c.recruitmentOffer, isNotNull);
  });

  test('NPC高级将领立即扣10签约，普通将领不扣预备的高级签约费', () {
    for (final type in [HeroType.advanced, HeroType.normal]) {
      final pick = _Pick();
      final c = _campaign(gold: 15, recruit: pick);
      pick.value = c.recruitPool.indexWhere((hero) => hero.type == type);
      expect(pick.value, greaterThanOrEqualTo(0));
      final offer = c.drawHero(1, countryId: 1)!;
      expect(offer.hero.type, type);
      expect(c.goldFor(1), type == HeroType.advanced ? 0 : 10);
      expect(c.recruitmentOfferFor(1), isNull);
      expect(
        c.heroes
            .where((hero) => hero.sourceId == offer.hero.id)
            .single
            .countryId,
        1,
      );
      expect(c.recruitPool.any((hero) => hero.id == offer.hero.id), isFalse);
      expect(c.remainingHeroDraws(1), 0);
    }
  });

  test('签约跨月保留原结果，实际签约月份停止抽取，下一月恢复', () {
    final c = _campaign(gold: 4);
    expect(c.drawHero(0), isNull);
    expect(c.remainingHeroDraws(0), 3);
    c.advance(60);
    final offer = c.drawHero(0)!;
    c.advance(660);
    expect(c.dateLabel, '2年1月');
    expect(c.recruitmentOffer, same(offer));
    expect(c.signHero(offer), isNotNull);
    expect(c.drawHero(0), isNull);
    expect(c.remainingHeroDraws(0), 0);
    c.advance(60);
    expect(c.remainingHeroDraws(0), 3);
    expect(c.drawHero(0), isNotNull);
  });

  test('决策按固定时钟启动，派最强者随机攻打其他国家，每城留足人数', () {
    final countries = _quietCountries()
      ..[1] = const CountryConfig(initialGold: 0, garrisonHeroes: 2);
    final c = _campaign(ai: true, countries: countries);
    final initial = c.garrisonAt(1).toList()..sort(_strength);
    c.advance(GameConfig.countryAiInitialDelay - 0.01);
    expect(c.marches, isEmpty);
    c.advance(0.01);
    expect(c.marches.length, 1);
    final march = c.marches.values.single;
    expect(march.hero, same(initial.first));
    expect(c.garrisonAt(1).length, 2);
    expect(c.cities[march.target!.id]!.ownerCountryId, isNot(1));
    expect(c.hasDispatched, isFalse);
    expect(c.gold, 50);
    c.advance(GameConfig.countryAiInterval);
    expect(c.marches.length, 1);
  });

  test('新招将领配兵后由最强者出击，经营升级和兵员都真实扣款', () {
    final countries = _quietCountries()
      ..[1] = const CountryConfig(initialGold: 150, garrisonHeroes: 3);
    final pick = _Pick();
    final c = _campaign(ai: true, countries: countries, recruit: pick);
    final previous = c.garrisonAt(1).toList()..sort(_strength);
    final weakest = c.recruitPool.toList()
      ..sort((a, b) => a.combat.compareTo(b.combat));
    pick.value = c.recruitPool.indexOf(weakest.first);
    c.advance(GameConfig.countryAiInitialDelay);
    final newHero = c.heroes.firstWhere(
      (hero) => hero.sourceId == weakest.first.id,
    );
    expect(newHero.countryId, 1);
    expect(newHero.soldiers, 4);
    final ranked = [...previous, newHero]..sort(_strength);
    expect(c.marches.values.single.hero, same(ranked.first));
    expect(c.garrisonAt(1).length, 3);
    expect(c.cities[1]!.level, 3);
    expect(c.remainingHeroDraws(1), 0);
    expect(c.goldFor(1), lessThan(150 - GameConfig.heroDrawCost));
    expect(c.goldFor(1), greaterThanOrEqualTo(0));
    final count = c.heroes.length;
    c.advance(GameConfig.countryAiInterval);
    expect(c.heroes.length, count);
    expect(c.gold, 50);
  });

  test('部队未配足兵或留守不足时不出征，电脑经营不会偷用玩家金币', () {
    final countries = _quietCountries()
      ..[1] = const CountryConfig(initialGold: 0, garrisonHeroes: 1);
    final c = _campaign(ai: true, countries: countries);
    for (final hero in c.garrisonAt(1)) {
      for (final soldier in hero.squad) {
        soldier.hp = 0;
      }
    }
    c.advance(30);
    expect(c.marches, isEmpty);
    expect(c.goldFor(1), 0);
    expect(c.gold, 50);
    expect(c.remainingHeroDraws(1), 3);
  });

  test('同一国家拥有多座城时分别留守，而非把全国驻军集中一座城', () {
    final c = _campaign(
      ai: true,
      countries: _quietCountries()
        ..[1] = const CountryConfig(initialGold: 0, garrisonHeroes: 1),
    );
    c.cities[4]!.ownerCountryId = 1;
    final stationed = c.garrisonAt(1);
    stationed.last.cityId = 4;
    c.advance(GameConfig.countryAiInitialDelay);
    expect(c.garrisonAt(4).length, 1);
    expect(c.garrisonAt(1).length, 1);
    expect(c.marches.length, 1);
  });

  test('随机目标并非锁死玩家城池，相同随机种子不受帧长影响', () {
    final choices = <int>{};
    for (var seed = 0; seed < 12; seed++) {
      final c = _campaign(
        ai: true,
        random: math.Random(seed),
        countries: _quietCountries()
          ..[1] = const CountryConfig(initialGold: 0, garrisonHeroes: 2),
      );
      c.advance(8);
      choices.add(c.marches.values.single.target!.id);
    }
    expect(choices.length, greaterThan(1));
    expect(choices.any((id) => id != 0), isTrue);
    final a = _campaign(
      ai: true,
      random: math.Random(42),
      recruit: math.Random(10),
    );
    final b = _campaign(
      ai: true,
      random: math.Random(42),
      recruit: math.Random(10),
    );
    a.advance(20);
    for (var i = 0; i < 200; i++) {
      b.advance(0.1);
    }
    expect(a.marches.keys, b.marches.keys);
    for (final id in a.marches.keys) {
      expect(a.marches[id]!.target?.id, b.marches[id]!.target?.id);
      expect(a.marches[id]!.position, b.marches[id]!.position);
    }
    for (final id in _configuredCountries.keys) {
      expect(a.goldFor(id), b.goldFor(id));
    }
    expect(a.heroes.map((hero) => hero.id).toSet().length, a.heroes.length);
    expect(
      a.heroes.any(
        (hero) => a.recruitPool.any((pool) => pool.id == hero.sourceId),
      ),
      isFalse,
    );
  });

  test('NPC之间可真实攻城、易主归一级，玩家国库与主角不受影响', () {
    final c = _campaign();
    // 将目标重置一级，城中原有第二国英雄继续守城。
    c.cities[2]!.ownerCountryId = 1;
    c.cities[2]!.ownerCountryId = 2;
    final defender = c.garrisonAt(2).first..hp = 1;
    for (final soldier in defender.squad) {
      soldier.hp = 0;
    }
    final attacker = c.garrisonAt(1).first;
    final march = c.dispatch(attacker, c.world.cities[2], countryId: 1)!;
    march.position = march.destination;
    for (var n = 0; n < 2000 && c.cities[2]!.ownerCountryId == 2; n++) {
      c.advance(0.05);
    }
    expect(c.cities[2]!.ownerCountryId, 1);
    expect(c.cities[2]!.level, 1);
    expect(attacker.cityId, 2);
    expect(c.cities[1]!.level, 2);
    expect(c.gold, 50);
    expect(c.defeated, isFalse);
    expect(c.battles[2]!.attacker.countryId, 1);
    expect(c.battles[2]!.defender.countryId, 2);
  });

  test('一级城按留守配置派兵，留守为零允许全部将领出征', () {
    final c = _campaign(
      ai: true,
      countries: _quietCountries()
        ..[1] = const CountryConfig(initialGold: 0, garrisonHeroes: 0),
    );
    c.cities[1]!.ownerCountryId = 2;
    c.cities[1]!.ownerCountryId = 1;
    final count = c.garrisonAt(1).length;
    c.advance(8);
    expect(c.cities[1]!.level, 1);
    expect(
      c.marches.values.where((march) => march.hero.countryId == 1).length,
      count,
    );
    expect(c.garrisonAt(1), isEmpty);
  });

  test('三张地图多国经营交战持续模拟，英雄不重复、资金和储备不越界，结束后停止AI', () {
    for (final world in _worlds()) {
      final c = CampaignState.fromRom(
        world,
        _catalog(),
        aiRandom: math.Random(21),
        recruitmentRandom: math.Random(17),
        economyRandom: math.Random(12),
      );
      for (var second = 0; second < 300 && !c.defeated; second++) {
        c.advance(1);
        final active = c.heroes.map((hero) => hero.id).toSet();
        final reserved = <int>{};
        for (final id in _configuredCountries.keys) {
          expect(c.goldFor(id), greaterThanOrEqualTo(0));
          final offer = c.recruitmentOfferFor(id);
          if (id != 0) expect(offer, isNull);
          if (offer != null) expect(reserved.add(offer.hero.id), isTrue);
        }
        expect(active.length, c.heroes.length);
        expect(c.marches.keys.every(active.contains), isTrue);
        expect(
          c.recruitPool.any(
            (hero) =>
                active.contains('rom-${hero.id}') || reserved.contains(hero.id),
          ),
          isFalse,
        );
        for (final city in c.cities.values) {
          expect(city.level, inInclusiveRange(1, 5));
          expect(
            city.reserveSoldiers,
            inInclusiveRange(0, city.reserveCapacity),
          );
        }
      }
      if (!c.defeated) {
        c.heroes.firstWhere((hero) => hero.type == HeroType.protagonist).hp = 0;
        c.advance(0);
      }
      final funds = [for (final id in _configuredCountries.keys) c.goldFor(id)];
      final positions = [for (final march in c.marches.values) march.position];
      final month = c.settledMonths;
      c.advance(180);
      expect([
        for (final id in _configuredCountries.keys) c.goldFor(id),
      ], funds);
      expect([for (final march in c.marches.values) march.position], positions);
      expect(c.settledMonths, month);
    }
  });

  test('NPC部队可查看但不能操控，NPC出兵不改变我方城内驻军', () {
    final c = WorldController(
      _worlds(),
      heroCatalog: _catalog(),
      aiEnabled: false,
    );
    addTearDown(c.dispose);
    final original = c.campaign.garrisonAt(0).toList();
    final hero = c.campaign.garrisonAt(1).first;
    final march = c.campaign.dispatch(hero, c.world.cities[2], countryId: 1)!;
    c.openUnit(hero.id);
    expect(c.selectedMapHero, same(hero));
    expect(c.canMoveSelected, isFalse);
    c.prepareMove();
    c.campSelected();
    expect(c.choosingTarget, isFalse);
    expect(march.phase, MarchPhase.marching);
    expect(c.campaign.garrisonAt(0), original);
  });
}
