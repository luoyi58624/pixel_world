part of '../campaign.dart';

extension _GarrisonUpkeep on CampaignState {
  Map<int, int> _garrisonMonthlyCosts() {
    final counts = <int, int>{};
    for (final hero in heroes) {
      if (!hero.health.alive ||
          marches.containsKey(hero.id) ||
          cities[hero.cityId]?.ownerCountryId != hero.countryId) {
        continue;
      }
      counts.update(hero.cityId, (n) => n + 1, ifAbsent: () => 1);
    }
    final fees = <int, int>{};
    for (final entry in counts.entries) {
      final cost = MilitaryUpkeep.monthlyCost(
        entry.value,
        freeHeroes: GameConfig.freeGarrisonHeroes,
        factor: GameConfig.garrisonUpkeepFactor,
      );
      if (cost == 0) continue;
      final country = cities[entry.key]!.ownerCountryId;
      fees.update(country, (n) => n + cost, ifAbsent: () => cost);
    }
    return fees;
  }

  void _accrueGarrisonUpkeep(double dt) {
    for (final fee in _garrisonMonthlyCosts().entries) {
      final amount = fee.value * dt / GameConfig.secondsPerMonth;
      _garrisonBills.update(fee.key, (v) => v + amount, ifAbsent: () => amount);
    }
  }
}
