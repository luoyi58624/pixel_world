import 'dart:math' as math;

import 'observation.dart';
import 'rules_data.dart';
import 'work_budget.dart';

/// 属性比较类别，不表示随机战斗的确定胜负。
enum CombatAdvantage { favorable, close, unfavorable, unknown }

/// 静态承伤/输出余量与武器兑现边界，不模拟任何战斗步骤。
class CombatAssessment {
  /// 记录可解释的范围。
  const CombatAssessment(
    this.advantage,
    this.lower,
    this.upper, {
    this.ownWeaponLower = 0,
    this.ownWeaponUpper = 0,
    this.enemyWeaponUpper = 0,
    this.releaseRisk = false,
    this.reasons = const [],
  });

  /// 归一化相对优势和保守/有利余量。
  final CombatAdvantage advantage;
  final double lower, upper;

  /// 按当前释放规则估算的武器伤害界限。
  final double ownWeaponLower, ownWeaponUpper, enemyWeaponUpper;

  /// 双方可能先手致命时，不能把相减归零解释成平局。
  final bool releaseRisk;

  /// 主要假设和保守性原因。
  final List<String> reasons;
}

/// 只对冻结属性做有界算术，与真实生命、库存及随机源完全隔离。
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
    List<int>? loadout,
    List<int>? enemyLoadout,
    double enemyPressure = 0,
    bool ownOpening = true,
    bool enemyOpening = true,
  }) {
    final gear = loadout ?? own.weapons,
        enemyGear = enemyLoadout ?? enemy.weapons;
    final ownCount = ownSoldiers ?? own.soldierCount,
        enemyCount = enemySoldiers ?? enemy.soldierCount;
    final key =
        '${own.id}:${own.hp}:${own.combat}:${own.soldiers}:${own.morale}:${enemy.id}:${enemy.hp}:${enemy.combat}:${enemy.soldiers}:${enemy.morale}:$ownDefense:$enemyDefense:$terrain:$ownCount:$enemyCount:$gear:$enemyGear:$enemyPressure:$ownOpening:$enemyOpening';
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
    final soldierHp = rules.integer('soldierHp');
    // 截击后会补满存活小兵血量，只计武器确定消灭的整兵及溢出将领伤害。
    final removedByPressure = math.min(
      enemyCount,
      (enemyPressure / soldierHp).floor(),
    );
    final durablePressure =
        removedByPressure * soldierHp +
        math.max(0, enemyPressure - enemyCount * soldierHp);
    final enemyHp =
        enemy.hp +
        (enemySoldiers == null && enemyPressure == 0
            ? enemy.soldiers.fold(0.0, (a, b) => a + b)
            : enemyCount * rules.integer('soldierHp'));
    final a = _weapons(
      gear,
      enabled: ownDefense == 0 && own.hp > 0,
      opening: ownOpening,
    );
    final b = _weapons(
      enemyGear,
      enabled: enemyDefense == 0 && enemy.hp > 0,
      opening: enemyOpening,
    );
    final field = ownDefense == 0 && enemyDefense == 0;
    final ownPower = _power(own, ownCount, ownDefense, terrain, field),
        enemyPower = _power(
          enemy,
          enemyCount - removedByPressure,
          enemyDefense,
          terrain,
          field,
        );
    final releaseRisk =
        (a.high >= enemyHp && b.high >= ownHp) || (a.selfHigh >= ownHp);
    // 同一对属性只算上下两端的余量，不反复扣血、士气或制造假想战果。
    final lowOwn = math.max(0.0, ownHp - b.high - a.selfHigh);
    final lowEnemy = math.max(
      0.0,
      enemyHp - a.low - b.selfLow - durablePressure,
    );
    final highOwn = math.max(0.0, ownHp - b.low - a.selfLow);
    final highEnemy = math.max(
      0.0,
      enemyHp - a.high - b.selfHigh - durablePressure,
    );
    final scale = math.max(1.0, ownHp * ownPower + enemyHp * enemyPower);
    final lower =
        (lowOwn * ownPower * .9 - lowEnemy * enemyPower * 1.1) / scale;
    final upper =
        (highOwn * ownPower * 1.1 - highEnemy * enemyPower * .9) / scale;
    final threshold = rules.tuning.advantageMargin;
    final category = releaseRisk
        ? CombatAdvantage.unknown
        : lower > threshold
        ? CombatAdvantage.favorable
        : upper < -threshold
        ? CombatAdvantage.unfavorable
        : CombatAdvantage.close;
    final result = CombatAssessment(
      category,
      lower,
      upper,
      ownWeaponLower: a.low,
      ownWeaponUpper: a.high,
      enemyWeaponUpper: b.high,
      releaseRisk: releaseRisk,
      reasons: [
        if (ownDefense > 0 || enemyDefense > 0) '城防仅修正攻击，守方武器贡献为零',
        if (gear.length > 1) '本次对阵只计首件武器，其余留待下一位守将',
        if (releaseRisk) '存在先手致命或自伤风险',
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
    // 当前已显示红条仅影响有限偏好，不预扣未来随机士气。
    return (((power + 2) ~/ 4) + 1) *
        1.5 *
        (1 + (h.morale / 1000).clamp(0.0, .1));
  }

  ({double low, double high, double selfLow, double selfHigh}) _weapons(
    List<int> ids, {
    required bool enabled,
    required bool opening,
  }) {
    if (!enabled) return (low: 0, high: 0, selfLow: 0, selfHigh: 0);
    var low = 0.0, high = 0.0, selfLow = 0.0, selfHigh = 0.0;
    for (var i = 0; i < math.min(ids.length, 1); i++) {
      final w = rules.weapons[ids[i]];
      if (w == null) continue;
      if (i == 0 && opening) {
        low += w.damage;
        selfLow += w.selfDamage;
      }
      if (i == 0 && opening || rules.number('weaponChance') > 0) {
        high += w.damage;
        selfHigh += w.selfDamage;
      }
    }
    return (low: low, high: high, selfLow: selfLow, selfHigh: selfHigh);
  }
}

/// 战略保全价值包含属性、内政、替代性与月俸，不把高级类型视作必胜。
double heroStrategicValue(AiHero h) =>
    h.combat * 3 +
    h.maxHp * .35 +
    h.hp * .15 +
    h.politics * 1.5 -
    h.salary * 2 +
    (h.type == 2
        ? 1000
        : h.type == 1
        ? 30
        : 0);

/// 同等战力下优先派出低内政将领，让重要主持者继续在城中发挥作用。
double heroDeploymentValue(AiHero h, {bool preserveGovernor = true}) =>
    h.combat * 3 +
    h.maxHp * .35 +
    h.hp * .15 -
    h.salary * 2 -
    (preserveGovernor ? h.politics * .75 : 0) +
    (h.type == 1
        ? 30
        : h.type == 2
        ? -200
        : 0);

/// 仅用于选择需要细评的对手或守军，避免内政和稀有度冒充当前战力。
double heroCombatValue(AiHero h, AiRules rules) =>
    h.health * (h.combat + h.soldierCount * rules.integer('soldierPower')) +
    h.weapons.fold(
      0.0,
      (n, id) => n + (rules.weapons[id]?.damage ?? 0) * h.combat,
    );

/// 守城价值按实际攻防属性计算，普通将领的高攻击不会被类型标签压低。
double heroDefenseValue(AiHero h, AiRules rules, int level, int soldiers) =>
    (h.hp + soldiers * rules.integer('soldierHp')) *
    (rules.attack(h.combat, defenseLevel: level, field: false) +
        soldiers * rules.integer('soldierPower')) *
    (1 + h.morale / 1000);
