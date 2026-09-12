import 'dart:convert';
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

  test('高级将领签约即收首月月俸，同月不重复收费，下月照常结算', () {
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
    expect(game.gold, before - 5 - definition.salary);
    expect(hero.salary, definition.salary);
    final total = game.salaryCost;
    game.advance(60);
    expect(game.lastSettlementFor(0)!.salary, total - hero.salary);
    game.advance(60);
    expect(game.lastSettlementFor(0)!.salary, total);
  });

  test('资金不足无法签约，候选唯一锁定，放弃才返回公共池', () {
    final choice = _Choice();
    final game = _game(choice, gold: 5);
    addTearDown(game.dispose);
    choice.index = game.recruitPool.indexWhere((h) => h.id == 1);
    final offer = game.drawHero(0)!;
    expect(game.gold, 0);
    expect(game.canSignHero(offer), isFalse);
    expect(game.signHero(offer), isNull);
    expect(game.recruitPool.any((h) => h.id == 1), isFalse);
    expect(game.declineHero(offer), isTrue);
    expect(game.recruitPool.any((h) => h.id == 1), isTrue);
    expect(game.gold, 0);
  });

  test('本国专属将领重新聘用同样支付月俸，解雇仅返还内政', () {
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
    expect(c.gold, before + 15 - 5 - hero.salary);
  });

  test('关闭面板、切换城池与切换地图均释放候选，不退抽取费', () {
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
      expect(c.gold, gold);
      controller.dispose();
    }
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
