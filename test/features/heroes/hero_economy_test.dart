import '../../support/ongoing_fixture.dart';

import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:convert';
import 'dart:io';
import 'dart:math' as math;
import 'package:json5/json5.dart';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

Map<String, dynamic> _config() =>
    json5Decode(File('assets/data/heroes.json5').readAsStringSync());
List<RomHeroDefinition> _catalog() =>
    decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync());

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
    ongoingCampaign(
      CampaignState.fromRom(
        _world(),
        decodeRomHeroes(jsonEncode(config ?? _config())),
        aiEnabled: false,
        startingGold: 100,
        economyRandom: _Pick(),
        recruitmentRandom: pick ?? _Pick(),
        siegeRandom: _Pick(),
      ),
    );
CampaignHero _hero(CampaignState c, int id) =>
    c.heroes.firstWhere((hero) => hero.sourceId == id);

void main() {
  test('主角免月俸，其他将领按JSON月俸且不因国籍减免', () {
    final catalog = _catalog();
    for (final hero in catalog) {
      expect(
        hero.salary,
        hero.type == HeroType.protagonist ? equals(0) : inInclusiveRange(1, 8),
        reason: hero.name ?? '主角',
      );
      for (var country = 0; country < 16; country++) {
        expect(hero.salaryFor(country), hero.salary);
      }
    }
    for (final entry in {40: 0, 0: 8, 2: 7, 1: 8}.entries) {
      expect(catalog.firstWhere((h) => h.id == entry.key).salary, entry.value);
    }
    final c = _campaign();
    addTearDown(c.dispose);
    expect(_hero(c, 40).salary, 0);
    expect(c.aiObservationFor(0).nation.salary, c.salaryCost);
    final before = c.gold, salary = c.salaryCost;
    c.advance(60);
    expect(c.lastSettlementFor(0)!.salary, salary);
    expect(c.gold, before + c.lastSettlementFor(0)!.baseIncome - salary);
  });

  test('调整英雄JSON顺序不改变属性守城排序，属性最低者先迎战', () {
    final data = _config();
    data['heroes'] = (data['heroes'] as List).reversed.toList();
    final c = _campaign(config: data);
    expect(decodeRomHeroes(jsonEncode(data)).first.id, 40);
    expect(c.garrisonAt(0).map((hero) => hero.sourceId), [40, 0, 18]);
    final march = c.dispatch(_hero(c, 1), c.world.cities[0], countryId: 1)!;
    march.position = march.destination;
    c.advance(1 / 60);
    expect(c.battles[0]!.defender.sourceId, 18);
  });

  test('JSON按文件顺序配置月俸，不因本国身份免薪且主角仍排首位', () {
    final c = _campaign();
    final order = _catalog()
        .where((hero) => hero.id != 40)
        .map((hero) => hero.id)
        .toList();
    expect(
      _catalog().map((h) => h.id),
      containsAll([0, 40, 100, 101, 102, 103, 104, 105]),
    );
    expect(_catalog().first.id, 40);
    for (var rank = 0; rank < order.length; rank++) {
      final definition = _catalog().firstWhere((h) => h.id == order[rank]);
      final expected = definition.salary;
      expect(
        c.salaryFor(_catalog().firstWhere((hero) => hero.id == order[rank])),
        expected,
      );
    }
    expect(_hero(c, 40).salary, 0);
    expect(() => _catalog().clear(), throwsUnsupportedError);
  });

  test('修改JSON影响初始驻军、预览、签约与月结，不再计算原ROM报酬', () {
    final data = _config();
    for (final row in data['heroes'] as List) {
      row['salary'] = 0;
      if (row['id'] == 0) {
        row['salary'] = 7;
        row['nativeCountryId'] = 1;
      }
      if (row['id'] == 3) {
        row['salary'] = 11;
        row['nativeCountryId'] = null;
      }
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
    expect(c.lastSettlementFor(0)!.salary, 7); // 新签约将领已预付本月。
    expect(c.gold, before + 80 - 7);
    expect(c.lastSettlementFor(1)!.salary, 0);
  });

  test('月俸配置拒绝负数、重复与不存在编号，专属归属与士气必须有效', () {
    for (final edit in <void Function(Map<String, dynamic>)>[
      (data) => data['heroes'][1]['salary'] = -1,
      (data) => data['heroes'][1]['salary'] = 1.5,
      (data) => data['heroes'][1]['salary'] = '3',
      (data) => data['heroes'][1]['id'] = 41,
      (data) => data['heroes'][0]['nativeCountryId'] = -1,
      (data) => data['heroes'][0]['morale'] = 101,
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

  for (final (id, base) in [(0, 0), (18, 0)]) {
    test('解雇$id仅返还内政，移出驻军并回收，城防不降级', () {
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
    final march = c.dispatchTo(hero, const GamePoint(1000, 40))!;
    march.camp();
    c.advance(5);
    final before = c.gold;
    c.dismissHero(hero);
    expect(c.gold, before + 15);
    expect(c.marches, isEmpty);
    expect(hero.soldiers, 0);
    expect(c.soldiersAt(0), 4);
    expect(c.salaryAt(0), _hero(c, 18).salary + _hero(c, 40).salary);
    c.advance(30);
    expect(c.gold, before + 15);
  });

  test('解雇不改变开局兵力基数，签约后可继续招募', () {
    final c = _campaign();
    c.buySoldiers(0, c.soldierCapacityAt(0));
    final hero = _hero(c, 18);
    c.dismissHero(hero);
    expect(c.soldierCapacityAt(0), 40);
    expect(c.soldiersAt(0), 40);
    final recruited = c.signHero(c.drawHero(0)!)!;
    c.dismissHero(recruited);
    expect(c.remainingHeroDraws(0), isNull);
    expect(c.drawHero(0), isNotNull);
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
    expect(signed.salary, offer.hero.salaryFor(1));
    expect(c.recruitPool.any((hero) => hero.id == old.sourceId), isFalse);
    expect(c.signHero(offer, countryId: 1), isNull);
    final before = c.goldFor(1);
    expect(c.dismissHero(old, countryId: 1), isNull);
    expect(c.goldFor(1), before);
    expect(c.dismissHero(signed, countryId: 1), 15);
    expect(c.goldFor(1), before + 15);
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
