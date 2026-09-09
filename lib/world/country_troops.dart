part of 'campaign.dart';

/// 一国所有城池共用的兵员储备，不包括已领走的随军士兵。
class CountryTroops {
  /// 创建开局兵员，容量由战役中全国城防和存活将领共同决定。
  CountryTroops({int reserveSoldiers = 0})
    : _reserveSoldiers = reserveSoldiers {
    if (reserveSoldiers < 0) {
      throw ArgumentError.value(reserveSoldiers, 'reserveSoldiers');
    }
  }

  int _reserveSoldiers;

  /// 全国当前可分配的库存，出征或迎战时扣除，回城时归还。
  int get reserveSoldiers => _reserveSoldiers;
}

extension _CountryTroopAccounting on CampaignState {
  void _trimCountryTroops(int countryId) {
    final reserves = countryTroops[countryId];
    if (reserves == null) return;
    reserves._reserveSoldiers = math.min(
      reserves._reserveSoldiers,
      reserveCapacityFor(countryId),
    );
  }
}
