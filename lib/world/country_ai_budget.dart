part of 'campaign.dart';

/// 国家统一国库的现金预算，预留金额不能被多座城重复当作可用资金。
class CountryAiBudget {
  const CountryAiBudget._({
    required this.gold,
    required this.reserveGold,
    required this.planningSeconds,
    required this.monthlySalary,
    required this.minimumMonthlyIncome,
  });

  /// 计算时的国库余额。
  final int gold;

  /// 覆盖月结前后现金低点的预留金币，包含应急余额。
  final int reserveGold;

  /// 预测覆盖的未来秒数，长途攻城会延长预算周期。
  final double planningSeconds;

  /// 本国全部存活将领的月俸，含拟招募将领。
  final int monthlySalary;

  /// 只按目前拥有城市的欠收计算，未占领城市不预支收入。
  final int minimumMonthlyIncome;

  /// 扣除预留后真正可以花在征兵、招募和升级上的金币。
  int get spendableGold => math.max(0, gold - reserveGold);
}

extension _CountryCashPlanning on CampaignState {
  CountryAiBudget _planAiBudget(
    int countryId, {
    CampaignHero? departing,
    HeroMarch? redirecting,
    CityDefinition? destination,
    int extraSalary = 0,
    double? horizon,
  }) {
    final owned = cities.values.where(
      (city) => city.ownerCountryId == countryId,
    );
    final income = owned.fold<int>(
      0,
      (sum, city) => sum + city.incomeFor(Harvest.poor),
    );
    final salary = GameConfig.chargeHeroSalary
        ? heroes
              .where((hero) => hero.countryId == countryId && hero.health.alive)
              .fold<int>(extraSalary, (sum, hero) => sum + hero.salary)
        : 0;
    var duration =
        GameConfig.secondsPerMonth + GameConfig.countryAiSupplySafetySeconds;
    var outstanding = 0.0;
    final supplies = <({double rate, double until})>[];
    for (final march in marches.values) {
      if (march.hero.countryId != countryId || !march.hero.health.alive) {
        continue;
      }
      final redirected = identical(march, redirecting);
      final target = redirected ? destination : march.target;
      final camped = !redirected && march.phase == MarchPhase.camped;
      var travel = target == null || camped
          ? 0.0
          : _aiTravelTo(march.position, target);
      if (march.phase == MarchPhase.dueling) {
        travel += GameConfig.countryAiBattleBudgetSeconds;
      }
      final returning =
          target != null && cities[target.id]!.ownerCountryId == countryId;
      final battleTime = target == null || returning
          ? 0.0
          : _aiSiegeSeconds(target, march: march);
      duration = math.max(duration, travel + battleTime);
      supplies.add((
        rate:
            (camped ? GameConfig.campSupplyRate : 1) /
            GameConfig.fieldSupplySecondsPerGold,
        until: target == null ? double.infinity : travel + battleTime,
      ));
      outstanding += march.hero._supplyDue;
    }
    if (departing != null && destination != null) {
      final source = world.cities.firstWhere(
        (city) => city.id == departing.cityId,
      );
      final travel = _aiTravelTo(
        _departurePoint(source, cityBounds(destination).center),
        destination,
      );
      final commitment = travel + _aiSiegeSeconds(destination);
      duration = math.max(duration, commitment);
      supplies.add((
        rate: 1 / GameConfig.fieldSupplySecondsPerGold,
        until: commitment,
      ));
      outstanding += departing._supplyDue;
    }
    duration = horizon ?? duration;
    double costBetween(double from, double to) => supplies.fold(
      0.0,
      (sum, item) =>
          sum +
          item.rate *
              math.max(
                0,
                math.min(to, item.until) - math.min(from, item.until),
              ),
    );

    // 同时检查月结前和月结后的最低现金，不能先花掉尚未到账的收入。
    var spent = outstanding;
    var peak = outstanding;
    var previous = 0.0;
    for (
      var monthAt = GameConfig.secondsPerMonth - _monthSeconds;
      monthAt <= duration + 1e-9;
      monthAt += GameConfig.secondsPerMonth
    ) {
      spent += costBetween(previous, monthAt);
      peak = math.max(peak, spent);
      spent += salary - income;
      peak = math.max(peak, spent);
      previous = monthAt;
    }
    peak = math.max(peak, spent + costBetween(previous, duration));
    return CountryAiBudget._(
      gold: goldFor(countryId),
      reserveGold:
          GameConfig.countryAiEmergencyGold + math.max(0, (peak - 1e-9).ceil()),
      planningSeconds: duration,
      monthlySalary: salary,
      minimumMonthlyIncome: income,
    );
  }

  double _aiTravelTo(Offset from, CityDefinition city) => estimateMarchSeconds(
    world,
    from,
    _contactPoint(from, cityBounds(city).center, city),
  );

  double _aiSiegeSeconds(CityDefinition city, {HeroMarch? march}) {
    final ahead = marches.values
        .where(
          (other) =>
              !identical(other, march) &&
              other.target?.id == city.id &&
              (other.phase == MarchPhase.fighting ||
                  other.phase == MarchPhase.awaitingBattle &&
                      (march?._siegeArrival == null ||
                          (other._siegeArrival?.order ?? 0) <
                              march!._siegeArrival!.order)),
        )
        .length;
    return (1 + ahead) *
        cities[city.id]!.level *
        GameConfig.countryAiBattleBudgetSeconds;
  }

  bool _canFundAiSortie(
    CampaignHero hero,
    CityDefinition target, {
    HeroMarch? march,
  }) {
    final budget = _planAiBudget(
      hero.countryId,
      departing: march == null ? hero : null,
      redirecting: march,
      destination: target,
    );
    return budget.gold >= budget.reserveGold;
  }
}
