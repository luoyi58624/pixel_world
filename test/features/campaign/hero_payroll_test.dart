import 'dart:io';
import 'dart:math';

import 'package:json5/json5.dart';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';

import '../../support/recruitment_fixture.dart';

class _Choice implements Random {
  int index = 0;
  @override
  int nextInt(int max) => index % max;
  @override
  double nextDouble() => 0;
  @override
  bool nextBool() => false;
}

final _catalog = decodeRomHeroes(
  File('assets/data/heroes.json5').readAsStringSync(),
);
final _worlds = decodeWorlds(
  File('assets/maps/worlds.json').readAsStringSync(),
);

CampaignState _game(_Choice choice, {int gold = 100}) {
  final c = CampaignState.fromRom(
    _worlds[2],
    _catalog,
    aiEnabled: false,
    startingGold: gold,
    economyRandom: _Choice(),
    recruitmentRandom: choice,
  );
  c.settledMonths = 1;
  prepareRecruitmentCity(c, 0);
  return c;
}

void main() {
  test('专属国家绑定第三地图实际开局归属，JSON 月俸保持可编辑', () {
    final c = CampaignState.fromRom(_worlds[2], _catalog, aiEnabled: false);
    addTearDown(c.dispose);
    for (final h in c.heroes) {
      final definition = _catalog.firstWhere((d) => d.id == h.sourceId);
      expect(definition.nativeCountryId, h.countryId, reason: h.name);
      expect(h.salary, definition.salary, reason: h.name);
      expect(definition.salaryFor((h.countryId + 1) % 16), definition.salary);
    }
    expect(_catalog.first.id, 40);
    expect(_catalog.first.salary, greaterThanOrEqualTo(0));
    expect(
      _catalog
          .where((h) => h.id < 100 && h.nativeCountryId == null)
          .map((h) => h.id)
          .toSet(),
      {1, 15, 36, 38, 39},
    );
  });

  test('抽取扣5金币，签收不重复收费，月俸从下次月结扣除', () {
    final choice = _Choice();
    final game = _game(choice);
    addTearDown(game.dispose);
    choice.index = game.recruitPool.indexWhere((h) => h.id == 1);
    final before = game.gold,
        definition = _catalog.firstWhere((h) => h.id == 1);
    final offer = game.drawHero(0)!;
    expect(game.gold, before - 5);
    expect(offer.initialSalary, definition.salary);
    final hero = game.signHero(offer)!;
    expect(game.gold, before - 5);
    expect(hero.salary, definition.salary);
    final total = game.salaryCost;
    game.advance(60);
    expect(game.lastSettlementFor(0)!.salary, total);
    game.advance(60);
    expect(game.lastSettlementFor(0)!.salary, total);
  });

  test('不足5金币不能抽取，已付抽取费后余额为零仍能签收', () {
    final choice = _Choice();
    final game = _game(choice, gold: 4);
    addTearDown(game.dispose);
    choice.index = game.recruitPool.indexWhere((h) => h.id == 1);
    expect(game.drawHero(0), isNull);
    expect(game.gold, 4);
    expect(game.remainingHeroDraws(0), 1);
    final exact = _game(_Choice(), gold: 5);
    addTearDown(exact.dispose);
    final offer = exact.drawHero(0)!;
    expect(exact.gold, 0);
    expect(exact.canSignHero(offer), isTrue);
    expect(exact.signHero(offer), isNotNull);
    expect(exact.gold, 0);
  });

  test('本国将领重新聘用只支付招募费，解雇仅返还内政', () {
    final choice = _Choice(), c = _game(choice);
    addTearDown(c.dispose);
    final hero = c.heroes.firstWhere((h) => h.sourceId == 0);
    final before = c.gold;
    expect(c.dismissHero(hero), 15);
    expect(c.gold, before + 15);
    choice.index = c.recruitPool.indexWhere((h) => h.id == 0);
    final offer = c.drawHero(0)!;
    expect(offer.initialSalary, hero.salary);
    final signed = c.signHero(offer)!;
    expect(signed.salary, hero.salary);
    expect(c.gold, before + 15 - 5);
  });

  test('关闭面板、切换城池与切换地图均按内政退款且只退一次', () {
    for (final close in <void Function(WorldController)>[
      (c) => c.cancelCityAction(),
      (c) => c.selectedCity = c.world.cities[1],
      (c) => c.switchWorld(1),
    ]) {
      final controller = WorldController(
        _worlds,
        heroCatalog: _catalog,
        aiEnabled: false,
      );
      final c = controller.campaign;
      c.settledMonths = 1;
      prepareRecruitmentCity(c, 0);
      controller.selectedCity = c.world.cities[0];
      final offer = c.drawHero(0)!;
      final gold = c.gold;
      close(controller);
      expect(c.recruitmentOffer, isNull);
      expect(c.recruitPool.any((h) => h.id == offer.hero.id), isTrue);
      expect(c.gold, gold + offer.hero.politics);
      expect(c.declineHero(offer), isFalse);
      expect(c.gold, gold + offer.hero.politics);
      controller.dispose();
    }
  });

  test('内政15的候选放弃时返还15金币，不以5金币抽取费封顶', () {
    final choice = _Choice();
    final c = _game(choice);
    addTearDown(c.dispose);
    choice.index = c.recruitPool.indexWhere((h) => h.politics == 15);
    expect(choice.index, greaterThanOrEqualTo(0));
    final before = c.gold;
    final offer = c.drawHero(0)!;
    expect(c.gold, before - 5);
    expect(c.declineHero(offer), isTrue);
    expect(c.gold, before + 10);
    expect(c.remainingHeroDraws(0), 0);
    expect(c.drawHero(0), isNull);
    expect(c.signHero(offer), isNull);
    expect(c.gold, before + 10);
  });

  test('暂停时关闭候选窗口仍退款，超时未签收也只结算一次返还', () {
    final controller = WorldController(
      _worlds,
      heroCatalog: _catalog,
      aiEnabled: false,
    );
    addTearDown(controller.dispose);
    controller.openCity(controller.world.cities.first);
    controller.drawCityHero();
    final c = controller.campaign,
        offer = controller.campaign.recruitmentOffer!;
    final before = c.gold;
    c.setPaused(true);
    controller.closeCity();
    expect(c.gold, before + offer.hero.politics);
    expect(c.recruitmentOffer, isNull);
    final pending = _game(_Choice());
    addTearDown(pending.dispose);
    final expired = pending.drawHero(0)!;
    pending.advance(120);
    expect(pending.recruitmentOffer, isNull);
    expect(
      pending.gold,
      pending.lastSettlementFor(0)!.goldAfter + expired.hero.politics,
    );
    final after = pending.gold;
    expect(pending.declineHero(expired), isFalse);
    expect(pending.gold, after);
  });

  test('士气独立读取 JSON，不随受伤和战斗属性重新推导', () {
    final h = _catalog.firstWhere((h) => h.id == 0);
    final hero = CampaignHero.fromRom(h, cityId: 0, countryId: 0)..hp = 1;
    expect(hero.morale, 100);
    expect(hero.battleArmy.morale, 100);
    final rows =
        (json5Decode(File('assets/data/heroes.json5').readAsStringSync())
                as Map)['heroes']
            as List;
    expect(rows.every((h) => h['morale'] is int && h['morale'] <= 100), isTrue);
    for (final id in [4, 5]) {
      expect(_catalog.firstWhere((h) => h.id == id).morale, 90);
    }
    for (final id in [6, 7, 8, 9, 10]) {
      expect(_catalog.firstWhere((h) => h.id == id).morale, 80);
    }
  });
}
