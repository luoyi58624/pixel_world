import 'dart:io';
import 'dart:math' as math;

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

import '../../support/recruitment_fixture.dart';

class _Pick implements math.Random {
  int index = 0;
  @override
  int nextInt(int max) => index % max;
  @override
  bool nextBool() => false;
  @override
  double nextDouble() => 0;
}

CampaignState _campaign({_Pick? pick}) {
  final c = CampaignState.fromRom(
    decodeWorlds(File('assets/maps/worlds.json').readAsStringSync()).first,
    decodeRomHeroes(File('assets/data/rom_heroes.json').readAsStringSync()),
    aiEnabled: false,
    startingGold: 1000,
    recruitmentRandom: pick ?? _Pick(),
    economyRandom: _Pick(),
  );
  prepareRecruitmentCity(c, 0);
  prepareRecruitmentCity(c, 1);
  return c;
}

void main() {
  test('月底抽取也保留完整次月，第三个月开始归池且不退费', () {
    final c = _campaign();
    c.advance(59);
    final pool = c.recruitPool.map((h) => h.id).toSet();
    final offer = c.drawHero(0)!;
    expect(offer.retentionLabel, '保留至 1年2月末');
    expect(c.gold, 995);
    expect(c.remainingHeroDraws(0), 2);
    c.advance(1);
    expect(c.dateLabel, '1年2月');
    expect(c.recruitmentOffer, same(offer));
    expect(c.canSignHero(offer), isTrue);
    expect(c.drawHero(0), isNull);
    expect(c.recruitPool.any((h) => h.id == offer.hero.id), isFalse);
    c.advance(59.98);
    expect(c.recruitmentOffer, same(offer));
    final gold = c.gold;
    c.advance(.02);
    expect(c.dateLabel, '1年3月');
    expect(c.recruitmentOffer, isNull);
    expect(c.recruitPool.map((h) => h.id).toSet(), pool);
    expect(c.recruitPool.length, pool.length);
    expect(c.gold, gold + c.lastSettlementFor(0)!.actualChange);
    expect(c.canSignHero(offer), isFalse);
    expect(c.signHero(offer), isNull);
    expect(c.declineHero(offer), isFalse);
    expect(c.remainingHeroDraws(0), 3);
  });

  test('跨年保留到次年一月末，已签约英雄不随期限消失', () {
    final c = _campaign();
    c.advance(660);
    expect(c.dateLabel, '1年12月');
    final offer = c.drawHero(0)!;
    expect(offer.retentionLabel, '保留至 2年1月末');
    c.advance(60);
    expect(c.recruitmentOffer, same(offer));
    final hero = c.signHero(offer)!;
    expect(c.remainingHeroDraws(0), 0);
    c.advance(120);
    expect(c.dateLabel, '2年3月');
    expect(c.heroes, contains(hero));
    expect(c.recruitPool.any((h) => h.id == hero.sourceId), isFalse);
    expect(c.remainingHeroDraws(0), 3);
  });

  test('跨年未签约按原期限到期，重新读取不会续期', () {
    final c = _campaign();
    c.advance(660);
    final offer = c.drawHero(0)!;
    c.advance(119);
    for (var i = 0; i < 10; i++) {
      expect(c.recruitmentOfferFor(0), same(offer));
      expect(offer.retentionLabel, '保留至 2年1月末');
    }
    c.advance(1);
    expect(c.dateLabel, '2年2月');
    expect(c.recruitmentOffer, isNull);
    expect(c.signHero(offer), isNull);
  });

  test('锁定期其他国家抽不到，到期可签约且旧操作不能夺回或复制', () {
    final pick = _Pick();
    final c = _campaign(pick: pick);
    final expired = c.drawHero(0)!;
    final other = c.drawHero(1, countryId: 1)!;
    expect(other.hero.id, isNot(expired.hero.id));
    c.advance(120);
    pick.index = c.recruitPool.indexWhere((h) => h.id == expired.hero.id);
    expect(pick.index, greaterThanOrEqualTo(0));
    final renewed = c.drawHero(1, countryId: 1)!;
    expect(renewed.hero.id, expired.hero.id);
    final gold = c.gold;
    expect(c.signHero(expired), isNull);
    expect(c.declineHero(expired), isFalse);
    expect(c.gold, gold);
    final recruited = c.heroes.where((h) => h.sourceId == expired.hero.id);
    expect(recruited.single.countryId, 1);
    expect(c.recruitPool.any((h) => h.id == expired.hero.id), isFalse);
    expect(c.recruitmentOfferFor(1), isNull);
  });

  test('驻军超员或跨多月步进均不会无限保留结果', () {
    final a = _campaign();
    final b = _campaign();
    final first = a.drawHero(0)!;
    final second = b.drawHero(0)!;
    prepareRecruitmentCity(a, 0, level: 1);
    prepareRecruitmentCity(b, 0, level: 1);
    expect(a.canSignHero(first), isFalse);
    a.advance(180);
    for (var i = 0; i < 1800; i++) {
      b.advance(.1);
    }
    expect(a.recruitmentOffer, isNull);
    expect(b.recruitmentOffer, isNull);
    expect(a.signHero(first), isNull);
    expect(b.signHero(second), isNull);
    expect(a.gold, b.gold);
    expect(a.recruitPool.map((h) => h.id), b.recruitPool.map((h) => h.id));
  });
}
