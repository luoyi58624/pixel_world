import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/world/campaign.dart';
import 'package:pixel_world/world/rom_hero.dart';
import 'package:pixel_world/world/world_controller.dart';
import 'package:pixel_world/world/world_data.dart';

Map<String, dynamic> _config() =>
    jsonDecode(File('assets/data/rom_heroes.json').readAsStringSync());
List<RomHeroDefinition> _catalog() =>
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync());

class _Pick implements math.Random {
  int index = 0;
  @override
  int nextInt(int max) => index % max;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0;
}

WorldDefinition _world() => WorldDefinition.fromJson(
  {
    'id': 0,
    'width': 80,
    'height': 32,
    'tiles': List.filled(80 * 32, 0),
    'cities': [
      for (final (id, x, country, units) in [
        (0, 10, 0, [40, 0, 18]),
        (1, 45, 1, [1, 20]),
        (2, 70, 0, [2]),
      ])
        {
          'id': id,
          'name': '测试城',
          'x': x,
          'y': 15,
          'width': 2,
          'height': 2,
          'shape': [3, 3, 3, 3],
          'initialLevel': 3,
          'initialOwnerId': country,
          'unitIds': units,
        },
    ],
  },
  [0, 1, 2, 3],
);

CampaignState _campaign({Map<String, dynamic>? config, _Pick? pick}) =>
    CampaignState.fromRom(
      _world(),
      decodeRomHeroes(jsonEncode(config ?? _config())),
      aiEnabled: false,
      startingGold: 100,
      economyRandom: _Pick(),
      recruitmentRandom: pick ?? _Pick(),
      siegeRandom: _Pick(),
    );
CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

void main() {
  test('调整英雄JSON顺序后驻军与迎战顺序同步改变，主角仍排首位', () {
    final data = _config();
    data['heroes'] = (data['heroes'] as List).reversed.toList();
    final c = _campaign(config: data);
    expect(decodeRomHeroes(jsonEncode(data)).first.id, 40);
    expect(c.garrisonAt(0).map((hero) => hero.sourceId), [40, 18, 0]);
    final march = c.dispatch(_hero(c, 1), c.world.cities[0], countryId: 1)!;
    march.position = march.destination;
    c.advance(1 / 60);
    expect(c.battles[0]!.defender.sourceId, 0);
  });

  test('JSON按非主角顺序逐位配置3/2/1/0月俸，主角免月俸且不占名额', () {
    final c = _campaign();
    final order = _catalog()
        .where((hero) => hero.id != 40)
        .map((hero) => hero.id)
        .toList();
    expect(_catalog().length, 41);
    expect(_catalog().first.id, 40);
    for (var rank = 0; rank < order.length; rank++) {
      final expected = rank < 5
          ? 3
          : rank < 10
          ? 2
          : rank < 15
          ? 1
          : 0;
      expect(
        c.salaryFor(_catalog().firstWhere((hero) => hero.id == order[rank])),
        expected,
      );
    }
    expect(_hero(c, 40).salary, 0);
    expect(_catalog().firstWhere((hero) => hero.id == 0).romSalary, 8);
    expect(() => _catalog().clear(), throwsUnsupportedError);
  });

  test('修改JSON影响初始驻军、预览、签约与月结，不再计算原ROM报酬', () {
    final data = _config();
    for (final row in data['heroes'] as List) {
      if (row['id'] == 0) row['salary'] = 7;
      if (row['id'] == 3) row['salary'] = 11;
    }
    final pick = _Pick();
    final c = _campaign(config: data, pick: pick);
    expect(_hero(c, 0).salary, 7);
    pick.index = c.recruitPool.indexWhere((hero) => hero.id == 3);
    final offer = c.drawHero(0)!;
    expect(c.salaryFor(offer.hero), 11);
    expect(c.signHero(offer)!.salary, 11);
    final before = c.gold;
    c.advance(60);
    expect(c.lastSettlementFor(0)!.salary, 21); // 7 + 11 + 友城威拉斯3。
    expect(c.gold, before + 40 - 21);
    expect(c.lastSettlementFor(1)!.salary, 3);
  });

  test('月俸配置拒绝负数、重复与不存在编号，主角不能配置非零报酬', () {
    for (final edit in <void Function(Map<String, dynamic>)>[
      (data) => data['heroes'][1]['salary'] = -1,
      (data) => data['heroes'][1]['salary'] = 1.5,
      (data) => data['heroes'][1]['salary'] = '3',
      (data) => data['heroes'][1]['id'] = 41,
      (data) => data['heroes'][0]['salary'] = 1,
      (data) => data['heroes'].add(data['heroes'][1]),
    ]) {
      final data = _config();
      edit(data);
      expect(() => decodeRomHeroes(jsonEncode(data)), throwsFormatException);
    }
    final data = _config();
    for (final row in data['heroes'] as List) {
      row['salary'] = 0;
    }
    expect(
      decodeRomHeroes(jsonEncode(data)).every((hero) => hero.salary == 0),
      isTrue,
    );
  });

  for (final (id, base) in [(0, 10), (18, 5)]) {
    test('解雇$id按类型返还基础金币加内政，移出驻军并回收，城防不降级', () {
      final c = _campaign();
      final hero = _hero(c, id);
      c.buySoldiers(0, 8);
      final before = c.gold, pool = c.recruitPool.length;
      expect(c.dismissHero(hero), base + hero.politics);
      expect(c.gold, before + base + hero.politics);
      expect(c.cities[0]!.level, 3);
      expect(c.cities[0]!.ownerCountryId, 0);
      expect(c.soldiersAt(0), 8);
      expect(c.heroes, isNot(contains(hero)));
      expect(c.recruitPool.length, pool + 1);
      expect(
        c.recruitPool.where((entry) => entry.id == hero.sourceId).length,
        1,
      );
      expect(c.dismissHero(hero), isNull);
      expect(c.gold, before + base + hero.politics);
      expect(c.defeated, isFalse);
    });
  }

  test('野外解雇移除随军，不远程归还士兵且停止后续粮草和月俸', () {
    final c = _campaign();
    final hero = _hero(c, 0);
    c.buySoldiers(0, 8);
    final march = c.dispatchTo(hero, const Offset(1000, 40))!;
    march.camp();
    c.advance(5);
    final before = c.gold;
    c.dismissHero(hero);
    expect(c.gold, before + 25);
    expect(c.marches, isEmpty);
    expect(hero.soldiers, 0);
    expect(c.soldiersAt(0), 4);
    expect(c.salaryAt(0), 0);
    c.advance(30);
    expect(c.gold, before + 25);
  });

  test('解雇后的储备遵守减少后的容量，已签约的本月招募机会不会重置', () {
    final c = _campaign();
    c.buySoldiers(0, c.soldierCapacityAt(0));
    final hero = _hero(c, 18);
    c.dismissHero(hero);
    expect(c.soldierCapacityAt(0), 36);
    expect(c.soldiersAt(0), 36);
    final recruited = c.signHero(c.drawHero(0)!)!;
    c.dismissHero(recruited);
    expect(c.remainingHeroDraws(0), 0);
    expect(c.drawHero(0), isNull);
  });

  test('主角、敌国及正在交战的将领不能解雇，失败不返款或影响交战', () {
    final c = _campaign();
    final main = _hero(c, 40), enemy = _hero(c, 1);
    expect(c.dismissHero(main), isNull);
    expect(c.dismissHero(enemy), isNull);
    final attacker = _hero(c, 0);
    final march = c.dispatch(attacker, c.world.cities[1])!;
    march.position = march.destination;
    c.advance(1 / 60);
    final battle = c.battles[1]!;
    final before = c.gold;
    expect(c.dismissHero(attacker), isNull);
    expect(c.dismissHero(battle.defender, countryId: 1), isNull);
    expect(c.gold, before);
    expect(battle.isActive, isTrue);
    expect(c.marches[attacker.id], same(march));
  });

  test('已解雇将领可由其他国家重新签约，旧对象不能解雇新身份', () {
    final pick = _Pick();
    final c = _campaign(pick: pick);
    final old = _hero(c, 0);
    c.dismissHero(old);
    pick.index = c.recruitPool.indexWhere((hero) => hero.id == old.sourceId);
    final offer = c.drawHero(1, countryId: 1)!;
    final signed = _hero(c, old.sourceId);
    expect(signed, isNot(same(old)));
    expect(signed.countryId, 1);
    expect(signed.salary, 3);
    expect(c.recruitPool.any((hero) => hero.id == old.sourceId), isFalse);
    expect(c.signHero(offer, countryId: 1), isNull);
    final before = c.goldFor(1);
    expect(c.dismissHero(old, countryId: 1), isNull);
    expect(c.goldFor(1), before);
    expect(c.dismissHero(signed, countryId: 1), 25);
    expect(c.goldFor(1), before + 25);
  });

  test('控制器解雇清理选点和英雄面板，解雇最后守将仍保留我方城市', () {
    final c = WorldController(
      [_world()],
      heroCatalog: _catalog(),
      aiEnabled: false,
    );
    addTearDown(c.dispose);
    final hero = _hero(c.campaign, 0);
    c.openCity(c.world.cities[0]);
    c.selectedHeroId = hero.id;
    c.prepareDispatch();
    expect(c.pendingHero, same(hero));
    c.dismissHero(hero);
    expect(c.pendingHero, isNull);
    expect(c.choosingTarget, isFalse);
    expect(c.selectedHeroId, isNull);
    c.openCity(c.world.cities[0]);
    final normal = _hero(c.campaign, 18);
    c.selectedHeroId = normal.id;
    c.dismissHero(normal);
    expect(c.selectedHeroId, 'rom-40');
    final sole = _hero(c.campaign, 2);
    c.openCity(c.world.cities[2]);
    c.selectedHeroId = sole.id;
    c.dismissHero(sole);
    expect(c.selectedHero, isNull);
    expect(c.campaign.cities[2]!.ownerCountryId, 0);
    expect(c.campaign.cities[2]!.level, 3);
    expect(c.campaign.defeated, isFalse);
  });
}
