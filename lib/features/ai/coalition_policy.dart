import 'dart:math' as math;

import 'observation.dart';
import 'rules_data.dart';

/// 各国独立根据公开占城数量判断共同威胁，绝不共享国库或预演战果。
class CoalitionPolicy {
  /// 固定本次观察中的目标规模和本国收入，避免一次规划内预算漂移。
  CoalitionPolicy(
    this.targetCountry,
    this.view,
    this.rules, {
    Map<int, int>? levels,
  }) : cityCount = view.cities.where((c) => c.country == targetCountry).length,
       monthlyIncome = view.owned.fold<int>(
         view.owned.isEmpty ? 0 : rules.integer('countryIncome'),
         (n, c) =>
             n +
             c.baseIncome +
             ((levels?[c.id] ?? c.level) - 1) * rules.integer('incomeStep'),
       );

  /// 公开国家身份、城池数量和本国正常月收入。
  final int targetCountry, cityCount, monthlyIncome;
  final AiObservation view;
  final AiRules rules;

  /// 三城起列为危险国家，失城后实时退出；不把本国列为进攻对象。
  bool get dangerous =>
      targetCountry != view.country &&
      cityCount >= rules.tuning.dangerousCountryCityCount;

  int get _extraCities =>
      math.max(0, cityCount - rules.tuning.dangerousCountryCityCount);

  /// 追加预算相当于本国多少个月收入，不是凭空增加的金币。
  double get extraMonths => dangerous
      ? math.max(
          0,
          rules.tuning.coalitionBudgetBaseMonths +
              _extraCities * rules.tuning.coalitionBudgetStepMonths,
        )
      : 0;

  /// 可用于强化原有进攻方案的额外军费，实际采购仍受当前现金约束。
  int get extraGold => (monthlyIncome * extraMonths).ceil();

  /// 占城越多，其他国家在相同条件下越倾向共同攻击它。
  double get priorityBonus => dangerous
      ? rules.tuning.coalitionTargetBaseBonus +
            _extraCities * rules.tuning.coalitionTargetStepBonus
      : 0;

  /// 扩大战争招聘预算，收缩威胁后停止新增高额月俸承诺。
  double get payrollRatio => dangerous
      ? math.max(
          rules.tuning.maxPayrollIncomeRatio,
          math.min(
            rules.tuning.coalitionPayrollCeiling,
            rules.tuning.maxPayrollIncomeRatio + extraMonths * .2,
          ),
        )
      : rules.tuning.maxPayrollIncomeRatio;

  /// 强城增加轮攻后备队，空城或单守将不为凑数量额外排队。
  int teamSize(int minimum, int defenders) =>
      minimum == 0 || !dangerous || defenders <= 1
      ? minimum
      : math.min(rules.tuning.maxTeam, minimum + 1 + _extraCities ~/ 2);

  /// 最终决策解释沿用所在日志的目标国家名称，不输出内部身份编号。
  String get decisionNote =>
      '目标国占有 $cityCount 座城，列为危险国家；追加进攻预算 $extraGold 金币，准备强化武器和轮攻兵力';
}
