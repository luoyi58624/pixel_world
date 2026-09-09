import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_data.dart';

import 'support/fixed_siege_random.dart';

CampaignState _campaign({
  int gold = 100,
  int level = 1,
  bool ai = false,
  bool recruitment = true,
}) => CampaignState.fromRom(
  WorldDefinition.fromJson(
    {
      'id': 0,
      'width': 160,
      'height': 64,
      'tiles': List.filled(160 * 64, 0),
      'cities': [
        for (final (id, x, country, units) in [
          (0, 10, 0, [40, 0, 2]),
          (1, 70, 1, [18, 19, 20]),
          (2, 140, 0, [3, 4]),
        ])
          {
            'id': id,
            'name': '测试城',
            'x': x,
            'y': 30,
            'width': 2,
            'height': 2,
            'shape': [3, 3, 3, 3],
            'initialLevel': level,
            'initialOwnerId': country,
            'unitIds': units,
          },
      ],
    },
    [0, 1, 2, 3],
  ),
  decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync())
      .where(
        (hero) => recruitment || {40, 0, 2, 18, 19, 20, 3, 4}.contains(hero.id),
      )
      .toList(),
  aiEnabled: ai,
  startingGold: gold,
  economyRandom: const FixedSiegeRandom(),
  aiRandom: math.Random(7),
  recruitmentRandom: math.Random(3),
  siegeRandom: math.Random(8),
);

HeroMarch _leave(CampaignState c, int id, {int country = 0, double y = 40}) {
  final hero = c.heroes.firstWhere((hero) => hero.sourceId == id);
  final march = c.dispatchTo(hero, Offset(2000, y), countryId: country)!;
  march.position = Offset(200, y);
  return march;
}

void _return(CampaignState c, HeroMarch march, int id) {
  final city = c.world.cities[id];
  final point = c.cityBounds(city).centerLeft - const Offset(8, 0);
  march.position = point;
  march.moveTo(point, city: city);
  c.advance(1 / 60);
  expect(c.marches.containsKey(march.hero.id), isFalse);
}

void _until(CampaignState c, bool Function() done) {
  for (var i = 0; i < 12000 && !done(); i++) {
    c.advance(1 / 60);
  }
  expect(done(), isTrue);
}

void main() {
  test('各初始等级分别留守等级减一位，额外将领有兵有钱才自动出征', () {
    for (var level = 1; level <= 5; level++) {
      final c = _campaign(
        gold: 1000,
        level: level,
        ai: true,
        recruitment: false,
      );
      c.buySoldiers(1, 12, countryId: 1);
      final keep = math.min(3, level - 1);
      c.advance(8);
      expect(c.garrisonAt(1).length, keep);
      expect(c.marches.length, 3 - keep);
      expect(c.goldFor(1), greaterThanOrEqualTo(c.aiBudgetFor(1).reserveGold));
    }
  });

  test('电脑断粮后等待月收入，恢复资金再自动出征', () {
    final c = _campaign(gold: 1, ai: true);
    final march = _leave(c, 18, country: 1, y: 160);
    c.advance(10);
    expect(march.phase, MarchPhase.camped);
    final point = march.position;
    c.advance(40);
    expect(march.position, point);
    c.advance(13.1);
    expect(c.goldFor(1), greaterThan(0));
    expect(march.supplyHalted, isFalse);
    expect(march.position, isNot(point));
  });

  test('招募门槛为等级加一，开局超员不删人，升级才增加名额', () {
    for (var level = 1; level <= 5; level++) {
      final c = _campaign(level: level);
      expect(c.cities[0]!.recruitCapacity, level + 1);
      expect(c.cities[0]!.requiredGarrison, level - 1);
    }
    final c = _campaign(gold: 1000);
    expect(c.garrisonAt(0).length, 3);
    final pool = c.recruitPool.length;
    expect(c.drawHero(0), isNull);
    expect(c.gold, 1000);
    expect(c.remainingHeroDraws(0), 3);
    expect(c.recruitPool.length, pool);
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    expect(c.recruitmentFull(0), isTrue);
    c.upgradeCity(0, hero: c.garrisonAt(0).first);
    expect(c.cities[0]!.requiredGarrison, 0);
    expect(c.recruitmentFull(0), isFalse);
    expect(c.drawHero(0), isNotNull);
  });

  test('出城释放招募名额，回城允许超员，签约前再次检查人数并保留锁定', () {
    final c = _campaign();
    final first = _leave(c, 0), second = _leave(c, 2);
    expect(c.garrisonAt(0).length, 1);
    final offer = c.drawHero(0)!;
    final balance = c.gold;
    _return(c, first, 0);
    expect(c.canSignHero(offer), isFalse);
    expect(c.signHero(offer), isNull);
    expect(c.gold, balance);
    expect(c.recruitmentOffer, same(offer));
    expect(c.recruitPool.any((hero) => hero.id == offer.hero.id), isFalse);
    _return(c, second, 0);
    expect(c.garrisonAt(0).length, 3);
    _leave(c, 0);
    _leave(c, 2);
    expect(c.canSignHero(offer), isTrue);
    expect(c.signHero(offer), isNotNull);
    expect(c.garrisonAt(0).length, 2);
    expect(c.signHero(offer), isNull);
  });

  test('友城接收超员英雄并归还兵员，不受招募上限限制', () {
    final c = _campaign();
    c.buySoldiers(0, 8);
    final first = _leave(c, 0), second = _leave(c, 2);
    first.hero.squad.first.hp = 0;
    first.hero.hp = 5;
    _return(c, first, 2);
    _return(c, second, 2);
    expect(c.garrisonAt(2).length, 4);
    expect(first.hero.hp, first.hero.maxHp);
    expect(c.soldiersAt(2), 7);
    expect(c.recruitmentFull(2), isTrue);
    expect(c.drawHero(2), isNull);
  });

  test('行军10秒一金币，扎营20秒一金币，驻城不扣粮草', () {
    final home = _campaign();
    home.advance(40);
    expect(home.gold, 100);
    final c = _campaign();
    _leave(c, 0);
    c.advance(9.9);
    expect(c.gold, 100);
    c.advance(0.1);
    expect(c.gold, 99);
    c.camp('rom-0');
    c.advance(19.9);
    expect(c.gold, 99);
    c.advance(0.1);
    expect(c.gold, 98);
  });

  test('切换状态、改道与回城不抹去已累计的粮草费用', () {
    final c = _campaign();
    final march = _leave(c, 0);
    c.advance(5);
    c.camp(march.hero.id);
    c.advance(10);
    expect(c.gold, 99);
    c.moveTo(march.hero.id, const Offset(2000, 40));
    c.advance(5);
    _return(c, march, 0);
    c.advance(5);
    expect(c.gold, 99);
    _leave(c, 0);
    c.advance(5);
    expect(c.gold, 98);
  });

  test('多位英雄分别扣本国金币，固定步长不受输入帧长影响', () {
    final a = _campaign(), b = _campaign();
    for (final c in [a, b]) {
      _leave(c, 0);
      _leave(c, 2);
      _leave(c, 18, country: 1, y: 160);
    }
    a.advance(20);
    for (var i = 0; i < 200; i++) {
      b.advance(0.1);
    }
    expect(a.gold, 96);
    expect(a.goldFor(1), 98);
    expect(a.gold, b.gold);
    expect(a.goldFor(1), b.goldFor(1));
    for (final id in a.marches.keys) {
      expect(a.marches[id]!.position, b.marches[id]!.position);
    }
  });

  test('最后一金币耗尽全军扎营，不透支且无法出征或改道，有钱仍可正常扎营', () {
    final c = _campaign(gold: 1);
    final a = _leave(c, 0), b = _leave(c, 2);
    c.advance(10);
    expect(c.gold, 0);
    expect(a.phase, MarchPhase.camped);
    expect(b.phase, MarchPhase.camped);
    expect(a.supplyHalted, isTrue);
    final position = a.position;
    expect(c.moveTo(a.hero.id, const Offset(2000, 40)), isFalse);
    expect(c.dispatchTo(c.garrisonAt(0).first, const Offset(2000, 40)), isNull);
    c.advance(20);
    expect(a.position, position);
    expect(c.gold, 0);
    c.advance(30); // 月收入恢复后玩家仍停营，等待自己的下一条指令。
    expect(c.gold, greaterThan(0));
    expect(a.phase, MarchPhase.camped);
    expect(c.moveTo(a.hero.id, const Offset(2000, 40)), isTrue);
    expect(a.supplyHalted, isFalse);
  });

  for (final level in [1, 3]) {
    test('城战断粮保留收尾动作，等级$level的城不再开启下一位守将', () {
      final c = _campaign(gold: 1, level: level);
      final hero = c.heroes.firstWhere((hero) => hero.sourceId == 0);
      final march = c.dispatch(hero, c.world.cities[1])!;
      march.position = march.destination;
      c.advance(1 / 60);
      final battle = c.battles[1]!;
      c.buySoldiers(0, 1);
      c.advance(1 / 60);
      expect(march.phase, MarchPhase.fighting);
      expect(march.supplyHalted, isTrue);
      battle.defender.hp = 0;
      c.advance(0.1);
      expect(battle.isActive, isTrue);
      _until(c, () => !battle.isActive);
      expect(battle.wave, 1);
      expect(march.phase, MarchPhase.camped);
      expect(c.cities[1]!.ownerCountryId, level == 1 ? 0 : 1);
      expect(c.marches[hero.id], same(march));
    });
  }

  test('野战断粮仍可防守，当前战斗结束后生还者原地扎营', () {
    final c = _campaign(gold: 1);
    final a = _leave(c, 0), b = _leave(c, 18, country: 1);
    c.advance(1 / 60);
    final battle = c.fieldBattles.values.single;
    c.buySoldiers(0, 1);
    c.advance(1 / 60);
    expect(a.phase, MarchPhase.dueling);
    b.hero.hp = 0;
    _until(c, () => !battle.isActive);
    expect(a.phase, MarchPhase.camped);
    expect(a.supplyHalted, isTrue);
  });
}
