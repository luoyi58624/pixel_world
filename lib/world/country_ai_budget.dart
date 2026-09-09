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
  CountryAiBudget _planAiBudget(int countryId) {
    if (!cities.values.any((city) => city.ownerCountryId == countryId)) {
      return CountryAiBudget._(
        gold: goldFor(countryId),
        reserveGold: 0,
        planningSeconds: 0,
        monthlySalary: 0,
        minimumMonthlyIncome: 0,
      );
    }
    // 此只读查询用于诊断；正式规划在后台对同一纯规则账本执行。
    final rules = _ai?.worker != null ? _ai!.rules : _createAiRules();
    final map = _ai?.worker != null ? _ai!.map : _createAiMap();
    final view = _observeAi(countryId);
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(map, rules, AiWorkBudget(rules.tuning)),
      tasks:
          _ai?.tasks.values
              .where((task) => view.hero(task.hero)?.country == countryId)
              .toList() ??
          [],
    );
    final cash = ledger.cash();
    return CountryAiBudget._(
      gold: goldFor(countryId),
      reserveGold: cash.reserve,
      planningSeconds: cash.horizon,
      monthlySalary: cash.salary,
      minimumMonthlyIncome: cash.poorIncome,
    );
  }
}
