part of '../campaign.dart';

extension _DefeatedCountryEconomy on CampaignState {
  // 灭国后清空国库，胜方不继承金币或债务。
  void _clearDefeatedTreasury(int defeatedCountry) {
    if (cities.values.any((city) => city.ownerCountryId == defeatedCountry)) {
      return;
    }
    final before = goldFor(defeatedCountry);
    _countryGold[defeatedCountry] = 0;
    if (before == 0) return;
    _emitEvent(
      GameEventKind.treasuryCleared,
      '国家已失去所有城池，国库 $before → 0',
      countryId: defeatedCountry,
      source: GameEventSource.system,
      data: {'goldBefore': before, 'goldAfter': 0},
    );
  }
}
