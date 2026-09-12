part of '../campaign.dart';

extension _DefeatedCountryEconomy on CampaignState {
  // 灭国后清空国库，胜方不继承金币或债务。
  void _clearDefeatedTreasury(int defeatedCountry) {
    if (cities.values.any((city) => city.ownerCountryId == defeatedCountry)) {
      return;
    }
    _countryGold[defeatedCountry] = 0;
  }
}
