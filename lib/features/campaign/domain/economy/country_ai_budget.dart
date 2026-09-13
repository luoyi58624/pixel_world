part of '../campaign.dart';

/// 国家统一国库的现金预算，预留金额不能被多座城重复当作可用资金。
class CountryAiBudget {
  const CountryAiBudget._({
    required this.gold,
    required this.reserveGold,
    required this.planningSeconds,
    required this.monthlySalary,
    required this.minimumMonthlyIncome,
    this.monthlyGarrisonUpkeep = 0,
  });

  /// 计算时的国库余额。
  final int gold;

  /// 常规采购保留的少量周转金币，防御采购不受此下限限制。
  final int reserveGold;

  /// 收支诊断的观察周期，不因长途行军提高采购预留。
  final double planningSeconds;

  /// 本国全部存活将领的月俸，含拟招募将领。
  final int monthlySalary;

  /// 当前驻军规模产生的月度维持费，仅供收支诊断。
  final int monthlyGarrisonUpkeep;

  /// 当前城池总收入扣一次国家欠收，未占领城市不预支收入。
  final int minimumMonthlyIncome;

  /// 扣除预留后可用于经营的金币；受袭时可花完余额，行军免费。
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
      monthlyGarrisonUpkeep: ledger.monthlyGarrisonUpkeep,
      minimumMonthlyIncome: cash.poorIncome,
    );
  }
}
