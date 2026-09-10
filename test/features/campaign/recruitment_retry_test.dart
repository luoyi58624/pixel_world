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
  for (final attempt in [1, 2, 3]) {
    test('第 $attempt 次签约后当月停止，重复签约与第四次点击不扣钱或复制英雄', () {
      final c = _campaign();
      final initialPool = c.recruitPool.length;
      for (var i = 1; i < attempt; i++) {
        final offer = c.drawHero(0)!;
        expect(c.drawHero(0), isNull);
        expect(c.declineHero(offer), isTrue);
        expect(c.recruitPool.length, initialPool);
        expect(c.remainingHeroDraws(0), 3 - i);
        expect(c.signHero(offer), isNull);
      }
      final offer = c.drawHero(0)!;
      final hero = c.signHero(offer)!;
      final gold = c.gold;
      expect(gold, 500 - attempt * 5 - offer.signingFee);
      expect(c.remainingHeroDraws(0), 0);
      expect(c.recruitmentBlockReason(0), contains('已签约'));
      expect(c.drawHero(0), isNull);
      expect(c.signHero(offer), isNull);
      expect(c.gold, gold);
      expect(c.recruitPool.length, initialPool - 1);
      expect(c.heroes.where((h) => h.sourceId == hero.sourceId).length, 1);
      c.advance(60);
      expect(c.remainingHeroDraws(0), 3);
      expect(c.drawHero(0), isNotNull);
    });
  }

  test('放弃三次后只扣十五金币，池中不重复，次月恢复三次', () {
    final c = _campaign();
    final pool = c.recruitPool.map((hero) => hero.id).toSet();
    for (var i = 0; i < 3; i++) {
      final offer = c.drawHero(0)!;
      c.declineHero(offer);
      expect(c.declineHero(offer), isFalse);
      expect(c.recruitPool.map((hero) => hero.id).toSet(), pool);
      expect(c.recruitPool.length, pool.length);
    }
    expect(c.remainingHeroDraws(0), 0);
    expect(c.drawHero(0), isNull);
    expect(c.gold, 485);
    c.advance(60);
    expect(c.remainingHeroDraws(0), 3);
  });

  test('签约失败不占名额，放弃后有足够金币就能继续抽', () {
    final pick = _Pick();
    final c = _campaign(gold: 10, random: pick);
    pick.index = c.recruitPool.indexWhere(
      (hero) => hero.type == HeroType.advanced,
    );
    expect(pick.index, greaterThanOrEqualTo(0));
    final offer = c.drawHero(0)!;
    expect(c.signHero(offer), isNull);
    expect(c.remainingHeroDraws(0), 2);
    expect(c.recruitmentOffer, same(offer));
    c.declineHero(offer);
    expect(c.drawHero(0), isNotNull);
    expect(c.gold, 0);
    expect(c.remainingHeroDraws(0), 1);
  });

  test('签约限制属于城池，易主或签约英雄阵亡都不能在当月重新招募', () {
    final c = _campaign();
    c.cities[2]!.ownerCountryId = 0;
    c.heroes.firstWhere((hero) => hero.sourceId == 40).cityId = 2;
    final hero = c.signHero(c.drawHero(0)!)!;
    c.defeatHero(hero.id, winnerCountryId: 1);
    expect(c.remainingHeroDraws(0), 0);
    expect(c.drawHero(2), isNotNull);
    c.declineHero(c.recruitmentOffer!);
    c.cities[0]!.ownerCountryId = 1;
    expect(c.remainingHeroDraws(0), 0);
    expect(c.drawHero(0, countryId: 1), isNull);
    c.advance(60);
    expect(c.drawHero(0, countryId: 1), isNotNull);
    expect(c.remainingHeroDraws(0), 0);
  });
}
