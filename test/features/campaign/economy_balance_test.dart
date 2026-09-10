import 'dart:io';
import 'dart:math';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

class _Roll implements Random {
  _Roll(this.value);
  final int value;
  @override
  int nextInt(int max) => value % max;
  @override
  double nextDouble() => 0;
  @override
  bool nextBool() => false;
}

void main() {
  final heroes = decodeRomHeroes(
    File('assets/data/rom_heroes.json').readAsStringSync(),
  );
  final worlds = decodeWorlds(
    File('assets/maps/worlds.json').readAsStringSync(),
    setup: CampaignSetup.decode(
      File('assets/data/campaign_config.json').readAsStringSync(),
    ),
  );
  CampaignState game(int roll) {
    final c = CampaignState.fromRom(
      worlds.first,
      heroes,
      aiEnabled: false,
      startingGold: 10000,
      economyRandom: _Roll(roll),
      recruitmentRandom: _Roll(0),
    );
    addTearDown(c.dispose);
    return c;
  }

  for (final (roll, fixed) in [(0, 20), (1, 0), (2, 30)]) {
    test('基础收入 $fixed 只按国家结算一次，每城固定10，升级不增收', () {
      final c = game(roll)..settledMonths = 24;
      final governor = c.garrisonAt(0).first;
      while (c.upgradeCity(0, hero: governor)) {}
      expect(c.cities[0]!.level, 5);
      for (final city in c.cities.values) {
        expect(city.income, 10);
      }
      c.cities[1]!.ownerCountryId = 0;
      final before = c.gold,
          count = c.cities.values.where((v) => v.isPlayer).length;
      c.advance(60);
      final bill = c.lastSettlementFor(0)!;
      expect(bill.baseIncome + bill.adjustment, fixed + count * 10);
      expect(bill.garrisonUpkeep, 0);
      expect(c.gold, before + fixed + count * 10 - bill.salary);
      expect(c.aiBudgetFor(0).minimumMonthlyIncome, count * 10);
      expect(c.aiBudgetFor(0).monthlySalary, c.salaryCost);
    });
  }

  for (final country in [0, 1]) {
    test('国家$country可在一级城连续招十将，不设驻军上限但逐人支付月俸', () {
      final c = game(0);
      final city = c.world.cities.firstWhere(
        (d) => c.cities[d.id]!.ownerCountryId == country,
      );
      final initial = c.garrisonAt(city.id).length;
      final existingPay = c.heroes
          .where((h) => h.countryId == country)
          .fold(0, (n, h) => n + h.salary);
      var newPay = 0;
      for (var n = 0; n < 10; n++) {
        final before = c.goldFor(country);
        final offer = c.drawHero(city.id, countryId: country)!;
        final signed = country == 0
            ? c.signHero(offer)!
            : c.heroes.firstWhere((h) => h.sourceId == offer.hero.id);
        expect(signed.salary, offer.hero.salary);
        newPay += signed.salary;
        expect(c.goldFor(country), before - 5 - signed.salary);
      }
      expect(c.garrisonAt(city.id).length, initial + 10);
      expect(c.remainingHeroDraws(city.id), isNull);
      c.advance(60);
      expect(
        c.lastSettlementFor(country)!.salary,
        existingPay,
        reason: '新招将领当月已预付',
      );
      c.advance(60);
      expect(c.lastSettlementFor(country)!.salary, existingPay + newPay);
      expect(c.lastSettlementFor(country)!.garrisonUpkeep, 0);
      expect(c.aiObservationFor(country).nation.garrisonAccrued, 0);
    });
  }
}
