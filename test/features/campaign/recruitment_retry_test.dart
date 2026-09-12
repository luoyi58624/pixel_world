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
    decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
    startingGold: gold,
    aiEnabled: false,
    economyRandom: _Pick(),
    recruitmentRandom: random ?? _Pick(),
  );
  prepareRecruitmentCity(campaign, 0);
  return campaign;
}

void main() {
  test('六位扩展将领可逐个抽取签约，使用配置姓名、类型和月俸', () {
    final random = _Pick();
    final c = _campaign(random: random);
    addTearDown(c.dispose);
    final added = c.recruitPool.where((hero) => hero.id >= 100).toList();
    expect(added.length, 6);
    expect(added.map((hero) => hero.name), [
      '哈梅耶',
      '扎克',
      '莫莫',
      '巴库',
      '基拉',
      '戈鲁格',
    ]);
    for (final definition in added) {
      c.settledMonths++;
      expect(definition.nativeCountryId, isNull);
      random.index = c.recruitPool.indexWhere(
        (hero) => hero.id == definition.id,
      );
      final offer = c.drawHero(0)!;
      expect(offer.hero.id, definition.id);
      final hero = c.signHero(offer)!;
      expect(hero.name, definition.name);
      expect(hero.type, definition.type);
      expect(hero.salary, definition.salary);
      expect(c.recruitPool.any((item) => item.id == definition.id), isFalse);
      expect(
        c.heroes.where((item) => item.sourceId == definition.id).length,
        1,
      );
    }
  });

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
    expect(c.drawHero(0), isNull);
    c.settledMonths++;
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

  test('玩家和电脑国家同城每月仅签约一次，所有候选保持全局唯一', () {
    final c = _campaign();
    addTearDown(c.dispose);
    final month = c.settledMonths;
    final offer = c.drawHero(0)!;
    expect(c.signHero(offer), isNotNull);
    expect(c.drawHero(0), isNull);
    final first = c.drawHero(1, countryId: 1);
    expect(first, isNotNull);
    expect(c.recruitmentOfferFor(1), isNull);
    expect(c.drawHero(1, countryId: 1), isNull);
    expect(c.heroes.map((h) => h.sourceId).toSet().length, c.heroes.length);
    expect(c.settledMonths, month);
  });
}
