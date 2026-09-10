part of '../campaign.dart';

extension _WarSpoils on CampaignState {
  // 最后一城确认易主后接管实际剩余库存，先清空败国，避免重复结算。
  void _inheritWarSpoils(int defeatedCountry, int winnerCountry, int cityId) {
    if (defeatedCountry == winnerCountry ||
        cities.values.any((city) => city.ownerCountryId == defeatedCountry)) {
      return;
    }
    final gold = goldFor(defeatedCountry);
    final weapons = Map<int, int>.of(
      _weaponStock.remove(defeatedCountry) ?? {},
    );
    final before = goldFor(winnerCountry);
    _countryGold[defeatedCountry] = 0;
    _countryGold[winnerCountry] = before + gold;
    final destination = _weaponStock.putIfAbsent(winnerCountry, () => {});
    for (final entry in weapons.entries) {
      if (entry.value > 0) {
        destination.update(
          entry.key,
          (n) => n + entry.value,
          ifAbsent: () => entry.value,
        );
      }
    }
    final loot = [
      for (final e in weapons.entries.where((e) => e.value > 0))
        {
          'id': e.key,
          'name': weaponCatalog.weapons[e.key]?.name ?? '${e.key}',
          'quantity': e.value,
        },
    ];
    if (gold == 0 && loot.isEmpty) return;
    final weaponLabel = loot
        .map((w) => '${w['name']}×${w['quantity']}')
        .join('、');
    for (final country in [defeatedCountry, winnerCountry]) {
      _emitEvent(
        GameEventKind.treasuryCaptured,
        '${world.countryName(defeatedCountry)}国灭亡，${world.countryName(winnerCountry)}国获得 $gold 金币${loot.isEmpty ? '' : '，$weaponLabel'}',
        countryId: country,
        targetCountryId: country == defeatedCountry
            ? winnerCountry
            : defeatedCountry,
        cityId: cityId,
        source: GameEventSource.system,
        data: {
          'fromCountry': defeatedCountry,
          'toCountry': winnerCountry,
          'gold': gold,
          'weapons': loot,
          'fromBalance': 0,
          'toBalance': before + gold,
        },
      );
    }
  }
}
