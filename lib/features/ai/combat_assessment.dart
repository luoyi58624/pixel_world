import 'dart:math' as math;

import 'observation.dart';
import 'rules_data.dart';
import 'work_budget.dart';

/// 属性比较类别，不表示随机战斗的确定胜负。
enum CombatAdvantage { favorable, close, unfavorable, unknown }

/// 静态承伤与输出余量，不模拟任何战斗步骤。
class CombatAssessment {
  /// 记录可解释的范围。
  const CombatAssessment(
    this.advantage,
    this.lower,
    this.upper, {
    this.reasons = const [],
  });

  /// 归一化相对优势和保守/有利余量。
  final CombatAdvantage advantage;
  final double lower, upper;

  /// 主要假设和保守性原因。
  final List<String> reasons;
}

/// 只对冻结属性做有界算术，与真实生命、资源及随机源完全隔离。
class CombatAssessor {
  /// 绑定公开规则与一次请求的预算。
  CombatAssessor(this.rules, this.work);

  /// 规则与配额。
  final AiRules rules;
  final AiWorkBudget work;
  final _cache = <String, CombatAssessment>{};

  /// 比较一对英雄；新守城对局按真实补兵名额传入，不虚构连续获胜后的生命。
  CombatAssessment compare(
    AiHero own,
    AiHero enemy, {
    int ownDefense = 0,
    int enemyDefense = 0,
    int terrain = 0,
    int? ownSoldiers,
    int? enemySoldiers,
  }) {
    final ownCount = ownSoldiers ?? own.soldierCount,
        enemyCount = enemySoldiers ?? enemy.soldierCount;
    final key =
        '${own.id}:${own.hp}:${own.combat}:${own.soldiers}:${own.morale}:${enemy.id}:${enemy.hp}:${enemy.combat}:${enemy.soldiers}:${enemy.morale}:$ownDefense:$enemyDefense:$terrain:$ownCount:$enemyCount';
    final cached = _cache[key];
    if (cached != null) return cached;
    if (!work.assessment()) {
      return const CombatAssessment(
        CombatAdvantage.unknown,
        -1,
        1,
        reasons: ['静态评估配额耗尽'],
      );
    }
    final ownHp =
        own.hp +
        (ownSoldiers == null
            ? own.soldiers.fold(0.0, (a, b) => a + b)
            : ownCount * rules.integer('soldierHp'));
    final enemyHp =
        enemy.hp +
        (enemySoldiers == null
            ? enemy.soldiers.fold(0.0, (a, b) => a + b)
            : enemyCount * rules.integer('soldierHp'));
    final field = ownDefense == 0 && enemyDefense == 0;
    final ownPower = _power(own, ownCount, ownDefense, terrain, field),
        enemyPower = _power(enemy, enemyCount, enemyDefense, terrain, field);
    final scale = math.max(1.0, ownHp * ownPower + enemyHp * enemyPower);
    final lower = (ownHp * ownPower * .9 - enemyHp * enemyPower * 1.1) / scale;
    final upper = (ownHp * ownPower * 1.1 - enemyHp * enemyPower * .9) / scale;
    final threshold = rules.tuning.advantageMargin;
    final category = lower > threshold
        ? CombatAdvantage.favorable
        : upper < -threshold
        ? CombatAdvantage.unfavorable
        : CombatAdvantage.close;
    final result = CombatAssessment(
      category,
      lower,
      upper,
      reasons: [
        if (ownDefense > 0 || enemyDefense > 0) '城防增加攻击与开场士气',
        '余量为静态风险指标，并非胜率',
      ],
    );
    if (_cache.length >= 256) _cache.remove(_cache.keys.first);
    return _cache[key] = result;
  }

  double _power(AiHero h, int soldiers, int defense, int terrain, bool field) {
    final attack = rules.attack(
      h.combat,
      terrain: terrain,
      defenseLevel: defense,
      field: field,
    );
    final power = attack + soldiers * rules.integer('soldierPower');
    final morale = rules.morale(
      h.morale.round(),
      defenseLevel: field ? 0 : defense,
    );
    // 当前已显示红条仅影响有限偏好，不预扣未来随机士气。
    return (((power + 2) ~/ 4) + 1) *
        1.5 *
        (1 + (morale / 1000).clamp(0.0, .1));
  }
}

/// 战略保全价值包含属性、内政、替代性与月俸，不把高级类型视作必胜。
double heroStrategicValue(AiHero h) =>
    h.combat * 3 +
    h.maxHp * .35 +
    h.hp * .15 +
    h.politics * 1.5 -
    h.salary * 2 +
    (valuableGovernor(h) ? 500 : 0) +
    (h.type == 2
        ? 1000
        : h.type == 1
        ? 30
        : 0);

/// 同等战力下优先派出低内政将领，让重要主持者继续在城中发挥作用。
double heroDeploymentValue(AiHero h, {bool preserveGovernor = true}) =>
    h.combat * 100 +
    h.maxHp * .35 +
    h.hp * .15 -
    h.salary * 2 -
    (preserveGovernor ? h.politics * .75 : 0) +
    (h.type == 1
        ? 30
        : h.type == 2
        ? -200
        : 0);

/// 高内政将领保留建设价值，不作为主动消耗敌军的牺牲人选。
bool valuableGovernor(AiHero hero) => hero.politics >= 15;

/// 仅用于选择需要细评的对手或守军，避免内政和稀有度冒充当前战力。
double heroCombatValue(AiHero h, AiRules rules) =>
    h.health * (h.combat + h.soldierCount * rules.integer('soldierPower'));

/// 守城价值按实际攻防属性计算，普通将领的高攻击不会被类型标签压低。
double heroDefenseValue(AiHero h, AiRules rules, int level, int soldiers) =>
    (h.hp + soldiers * rules.integer('soldierHp')) *
    (rules.attack(h.combat, defenseLevel: level, field: false) +
        soldiers * rules.integer('soldierPower')) *
    (1 + rules.morale(h.morale.round()) / 1000);
