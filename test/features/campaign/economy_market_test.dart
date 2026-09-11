import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:io';
import 'dart:math' as math;

import '../../support/recruitment_fixture.dart';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/economy/domain/economy.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class _RandomValue implements math.Random {
  _RandomValue([this.value = 0]);
  int value;
  @override
  int nextInt(int max) => value % max;
  @override
  bool nextBool() => value.isEven;
  @override
  double nextDouble() => (value % 100) / 100;
}

CampaignState _campaign({
  int gold = 50,
  math.Random? economy,
  math.Random? recruitment,
  bool opening = false,
}) {
  final c = CampaignState.fromRom(
    aiEnabled: false,
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()).first,
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
    startingGold: gold,
    economyRandom: economy ?? _RandomValue(),
    recruitmentRandom: recruitment ?? _RandomValue(),
    siegeRandom: _RandomValue(),
  );
  if (!opening) {
    c.settledMonths = 1;
    for (final owner in c.countryTroops.keys.toList()) {
      c.countryTroops[owner] = CountryTroops();
    }
  }
  return c;
}

CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

void _choose(CampaignState c, _RandomValue random, HeroType type) {
  if (!c.recruitPool.any((hero) => hero.type == type)) {
    final available = c.heroes.firstWhere((hero) => hero.type == type);
    c.defeatHero(
      available.id,
      winnerCountryId: available.countryId == 0 ? 1 : 0,
    );
  }
  random.value = c.recruitPool.indexWhere((hero) => hero.type == type);
  expect(random.value, greaterThanOrEqualTo(0));
}

void main() {
  test('每国初始50金币，60秒跨月，十二个月正确跨年', () {
    final c = _campaign(opening: true);
    for (final country in c.world.countries) {
      expect(c.goldFor(country.id), 50);
    }
    expect(c.dateLabel, '1年1月');
    c.advance(59.99);
    expect(c.dateLabel, '1年1月');
    expect(c.gold, 50);
    c.advance(0.01);
    expect(c.dateLabel, '1年2月');
    expect(c.gold, 50 + 40 - c.salaryCost);
    expect(c.lastSettlementFor(0)!.garrisonUpkeep, 0);
    expect(c.lastSettlementFor(0)!.month, 1);
    final foreign = c.lastSettlementFor(1)!;
    expect(
      c.goldFor(1),
      50 + foreign.baseIncome - foreign.salary - foreign.garrisonUpkeep,
    );
    c.advance(660);
    expect(c.dateLabel, '2年1月');
    expect(c.settledMonths, 12);
    expect(c.gold, 50 + 12 * (40 - c.salaryCost));
  });

  test('正常一半、丰欠收各四分之一', () {
    final counts = {for (final value in Harvest.values) value: 0};
    for (var i = 0; i < 300; i++) {
      counts.update(Harvest.draw(_RandomValue(i)), (value) => value + 1);
    }
    expect(counts, {
      Harvest.normal: 150,
      Harvest.poor: 75,
      Harvest.abundant: 75,
    });
  });

  test('城池逐级增加5收入，占领地全额，收成逐城结算', () {
    for (var level = 1; level <= 5; level++) {
      final city = CitySituation(
        ownerCountryId: 0,
        defense: 100,
        baseIncome: 10,
        initialLevel: level,
      );
      expect(city.income, 10 + (level - 1) * 5);
    }
    for (final entry in {0: 0, 2: -14, 3: 16}.entries) {
      final c = _campaign(gold: 10000, economy: _RandomValue(entry.key));
      c.cities[1]!.ownerCountryId = 0;
      final governor = _hero(c, 0)..cityId = 1;
      c.settledMonths = 24;
      c.upgradeCity(1, hero: governor);
      c.settledMonths = 24;
      c.upgradeCity(1, hero: governor);
      final before = c.gold;
      c.advance(60);
      final report = c.lastSettlementFor(0)!;
      expect(report.cityCount, 2);
      expect(report.baseIncome, 70);
      expect(report.adjustment, entry.value);
      expect(report.salary, c.salaryCost);
      expect(c.gold, before + 70 + entry.value - c.salaryCost);
    }
  });

  test('本国将领同样付薪，国库按实际工资和收成结算', () {
    final c = _campaign();
    final catalog = decodeRomHeroes(
      File('assets/data/rom_heroes.json').readAsStringSync(),
    );
    expect(_hero(c, 0).salary, catalog.firstWhere((h) => h.id == 0).salary);
    expect(_hero(c, 2).salary, catalog.firstWhere((h) => h.id == 2).salary);
    expect(_hero(c, 40).salary, 8);
    final definition = RomHeroDefinition.fromJson({
      'id': 40,
      'name': null,
      'type': 'protagonist',
      'maxHp': 99,
      'combat': 15,
      'politics': 15,
      'salary': 0,
      'eggCapable': true,
      'soldierLimit': 4,
    });
    expect(CampaignHero.fromRom(definition, cityId: 0, countryId: 0).salary, 0);
    final poor = _campaign(gold: 1, economy: _RandomValue(2));
    poor.advance(60);
    final net = 33 - poor.salaryCost;
    expect(poor.gold, 1 + net);
    expect(poor.lastSettlementFor(0)!.garrisonUpkeep, 0);
    expect(poor.lastSettlementFor(0)!.netIncome, net);
    expect(poor.lastSettlementFor(0)!.actualChange, net);
    expect(poor.defeated, isFalse);
  });

  test('大步进与逐帧月结一致，抽将不扰乱收成随机源', () {
    final a = _campaign(economy: math.Random(73));
    final b = _campaign(economy: math.Random(73));
    a.advance(180);
    for (var i = 0; i < 1800; i++) {
      b.advance(0.1);
    }
    expect(a.dateLabel, b.dateLabel);
    for (final country in a.world.countries) {
      expect(a.goldFor(country.id), b.goldFor(country.id));
      expect(
        a.lastSettlementFor(country.id)!.harvest,
        b.lastSettlementFor(country.id)!.harvest,
      );
    }
    final first = _campaign(economy: math.Random(6));
    final second = _campaign(economy: math.Random(6));
    prepareRecruitmentCity(first, 0);
    final offer = first.drawHero(0)!;
    first.declineHero(offer);
    first.advance(60);
    second.advance(60);
    expect(
      first.lastSettlementFor(0)!.harvest,
      second.lastSettlementFor(0)!.harvest,
    );
  });

  test('储备购买按人数收费，拒绝超额和负数，配兵不治疗已有伤势', () {
    final c = _campaign();
    expect(c.soldiersAt(0), 0);
    expect(c.soldierCapacityAt(0), 16);
    expect(c.buySoldiers(0, 17), isFalse);
    expect(c.buySoldiers(0, -1), isFalse);
    expect(c.buySoldiers(1, 1), isFalse);
    expect(c.gold, 50);
    expect(c.buySoldiers(0, 16), isTrue);
    expect(c.gold, 34);
    expect(c.buySoldiers(0, 1), isFalse);
    final hero = _hero(c, 0)..hp = 20;
    expect(c.reinforceHero(hero), 4);
    expect(c.soldiersAt(0), 12);
    hero.squad[0].hp = 0;
    hero.squad[1].hp = 0;
    hero.squad[2].hp = 5;
    final fallen = hero.squad[0];
    expect(c.reinforceHero(hero), 2);
    expect(hero.soldiers, 4);
    expect(hero.squad[2].hp, 5);
    expect(hero.hp, 20);
    expect(fallen.hp, 0);
    expect(c.soldiersAt(0), 10);
    expect(c.gold, 34);
    expect(c.reinforceHero(hero), 0);
    c.dispatch(hero, c.world.cities[1]);
    hero.squad[0].hp = 0;
    expect(c.reinforceHero(hero), 0);
  });

  test('城防和将领贡献容量，降级裁掉超额储备，易主不赠兵', () {
    final c = _campaign(gold: 10000);
    for (var level = 1; level <= 5; level++) {
      if (level > 1) {
        c.settledMonths = 24;
        c.upgradeCity(0, hero: c.garrisonAt(0).first);
      }
      expect(c.soldierCapacityAt(0), 4 * level + 12);
    }
    expect(c.buySoldiers(0, 32), isTrue);
    c.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
    expect(c.soldiersAt(0), 28);
    expect(c.soldierCapacityAt(0), 28);
    expect(c.maxSoldierPurchase(0), 0);
    c.cities[0]!.ownerCountryId = 2;
    expect(c.soldiersAt(0), 0);
    expect(c.soldierCapacityAt(0), 20);
  });

  test('池中没有在场英雄和主角，普通将领抽取扣5、签约按月俸且不赠兵', () {
    final random = _RandomValue();
    final c = _campaign(recruitment: random);
    prepareRecruitmentCity(c, 0);
    final active = c.heroes.map((hero) => hero.sourceId).toSet();
    expect(
      c.recruitPool.any(
        (hero) => active.contains(hero.id) || hero.type == HeroType.protagonist,
      ),
      isFalse,
    );
    _choose(c, random, HeroType.normal);
    final offer = c.drawHero(0)!;
    expect(c.gold, 45);
    expect(offer.initialSalary, offer.hero.salaryFor(0));
    expect(c.drawHero(0), isNull);
    expect(c.gold, 45);
    final hero = c.signHero(offer)!;
    expect(c.gold, 45 - offer.initialSalary);
    expect(hero.cityId, 0);
    expect(hero.soldiers, 0);
    expect(hero.hp, hero.maxHp);
    expect(c.signHero(offer), isNull);
    expect(c.heroes.where((h) => h.sourceId == hero.sourceId).length, 1);
    expect(c.recruitPool.any((h) => h.id == hero.sourceId), isFalse);
  });

  test('高级将领签约仅扣首月月俸，放弃不退抽取费并归还池子', () {
    final random = _RandomValue();
    final c = _campaign(recruitment: random);
    prepareRecruitmentCity(c, 0);
    _choose(c, random, HeroType.advanced);
    final offer = c.drawHero(0)!;
    expect(offer.initialSalary, offer.hero.salaryFor(0));
    expect(c.gold, 45);
    expect(c.signHero(offer), isNotNull);
    expect(c.gold, 45 - offer.initialSalary);
    c.cities[2]!.ownerCountryId = 0;
    final declined = c.drawHero(2)!;
    expect(c.gold, 40 - offer.initialSalary);
    expect(c.declineHero(declined), isTrue);
    expect(c.gold, 40 - offer.initialSalary);
    expect(
      c.recruitPool.where((hero) => hero.id == declined.hero.id).length,
      1,
    );
    expect(c.declineHero(declined), isFalse);
    expect(c.signHero(declined), isNull);
  });

  test('签约费不足时保留结果等待月结，不能绕过费用生成英雄', () {
    final random = _RandomValue();
    final c = _campaign(gold: 5, recruitment: random);
    prepareRecruitmentCity(c, 0);
    _choose(c, random, HeroType.advanced);
    final offer = c.drawHero(0)!;
    expect(c.gold, 0);
    expect(c.signHero(offer), isNull);
    expect(c.recruitmentOffer, same(offer));
    c.advance(60);
    expect(c.signHero(offer), isNotNull);
    expect(c.gold, greaterThanOrEqualTo(0));
  });

  test('阵亡及失城移除的非主角回池，已签约英雄死亡后可再次招募', () {
    final c = _campaign();
    c.cities[2]!.ownerCountryId = 0;
    _hero(c, 40).cityId = 2;
    c.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
    expect(c.recruitPool.map((hero) => hero.id), containsAll([0, 2]));
    expect(c.recruitPool.any((hero) => hero.id == 40), isFalse);
    final count = c.recruitPool.length;
    c.defeatHero('rom-0', winnerCountryId: 1);
    expect(c.recruitPool.length, count);
    final offer = c.drawHero(2)!;
    final hero = c.signHero(offer)!;
    c.defeatHero(hero.id, winnerCountryId: 1);
    expect(
      c.recruitPool.where((candidate) => candidate.id == hero.sourceId).length,
      1,
    );
  });

  test('抽取城池易主退回待签约英雄，旧签约按钮失效，主角不能回池', () {
    final c = _campaign();
    prepareRecruitmentCity(c, 0);
    c.cities[2]!.ownerCountryId = 0;
    _hero(c, 40).cityId = 2;
    final offer = c.drawHero(0)!;
    prepareRecruitmentCity(c, 0, level: 1);
    c.defeatHero('rom-0', winnerCountryId: 1, defendedCityId: 0);
    expect(c.recruitmentOffer, isNull);
    expect(c.recruitPool.any((hero) => hero.id == offer.hero.id), isTrue);
    expect(c.signHero(offer), isNull);
    c.defeatHero('rom-40', winnerCountryId: 1);
    expect(c.recruitPool.any((hero) => hero.id == 40), isFalse);
    expect(c.drawHero(2), isNull);
    expect(c.buySoldiers(2, 1), isFalse);
  });

  test('余额不足或没有候选人时不收抽取费', () {
    final poor = _campaign(gold: 4);
    expect(poor.drawHero(0), isNull);
    expect(poor.gold, 4);
    final c = _campaign(gold: 10000);
    prepareRecruitmentCity(c, 0);
    while (c.recruitPool.isNotEmpty) {
      final hero = c.signHero(c.drawHero(0)!)!;
      // 招募池测试将新将领送到野外，释放下一次招募的驻城名额。
      c.dispatchTo(hero, const GamePoint(8, 8))!.camp();
      c.advance(60);
    }
    final before = c.gold;
    expect(c.drawHero(0), isNull);
    expect(c.gold, before);
    expect(GameConfig.heroDrawCost, 5);
  });
}
