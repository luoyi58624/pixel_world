import 'dart:io';
import 'dart:math' as math;

import '../../support/recruitment_fixture.dart';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class _Pick implements math.Random {
  int index = 0;
  @override
  int nextInt(int max) => index % max;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0;
}

CampaignState _campaign({int gold = 500, _Pick? random}) {
  final campaign = CampaignState.fromRom(
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()).first,
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
    startingGold: gold,
    aiEnabled: false,
    economyRandom: _Pick(),
    recruitmentRandom: random ?? _Pick(),
  );
  prepareRecruitmentCity(campaign, 0);
  return campaign;
}

void main() {
  test('连续放弃超过三次仍可抽取，不能重复签约或重复退还英雄', () {
    final c = _campaign();
    addTearDown(c.dispose);
    final pool = c.recruitPool.map((h) => h.id).toSet();
    for (var n = 0; n < 5; n++) {
      final offer = c.drawHero(0)!;
      expect(c.drawHero(0), isNull);
      expect(c.declineHero(offer), isTrue);
      expect(c.declineHero(offer), isFalse);
      expect(c.signHero(offer), isNull);
      expect(c.recruitPool.map((h) => h.id).toSet(), pool);
    }
    expect(c.gold, 475);
    final offer = c.drawHero(0)!;
    final hero = c.signHero(offer)!;
    expect(c.signHero(offer), isNull);
    expect(c.heroes.where((h) => h.sourceId == hero.sourceId).length, 1);
    final next = c.drawHero(0)!;
    expect(next.hero.id, isNot(hero.sourceId));
    expect(c.signHero(next), isNotNull);
    expect(c.gold, 465 - offer.initialSalary - next.initialSalary);
  });

  test('不足首月月俸无法签约，候选锁定直到放弃，抽取费不退', () {
    final c = _campaign(gold: 10);
    addTearDown(c.dispose);
    // 目录第一位可招募外将的工资高于剩余五金币。
    final offer = c.drawHero(0)!;
    expect(offer.initialSalary, greaterThan(5));
    expect(c.signHero(offer), isNull);
    expect(c.recruitmentOffer, same(offer));
    expect(c.declineHero(offer), isTrue);
    expect(c.drawHero(0), isNotNull);
    expect(c.gold, 0);
    c.declineHero(c.recruitmentOffer!);
    expect(c.drawHero(0), isNull);
  });

  test('电脑国家也能同月连续招募，所有候选保持全局唯一', () {
    final c = _campaign();
    addTearDown(c.dispose);
    final month = c.settledMonths;
    for (var n = 0; n < 3; n++) {
      final offer = c.drawHero(0, countryId: 0)!;
      expect(c.signHero(offer), isNotNull);
    }
    final first = c.drawHero(1, countryId: 1);
    expect(first, isNotNull);
    expect(c.recruitmentOfferFor(1), isNull);
    expect(c.drawHero(1, countryId: 1), isNotNull);
    expect(c.heroes.map((h) => h.sourceId).toSet().length, c.heroes.length);
    expect(c.settledMonths, month);
  });
}
