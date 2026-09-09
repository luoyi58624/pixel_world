import 'dart:math' as math;
import 'dart:ui';

import '../game_config.dart';
import 'field_terrain.dart';

/// 跨战斗保留的生命值，退出观战、撤离和换守将都不重置。
class BattleHealth {
  /// 创建满血单位，或恢复已有生命值。
  BattleHealth(this.maxHp, {num? hp})
    : _hp = (hp ?? maxHp).toDouble().clamp(0, maxHp.toDouble());

  /// 生命上限。
  final int maxHp;
  double _hp;

  /// 当前生命值，赋值时限制在合法范围。
  double get hp => _hp;
  set hp(num value) {
    final next = value.toDouble().clamp(0.0, maxHp.toDouble());
    _hp = next < 1e-9 ? 0.0 : next;
  }

  /// 用于界面显示的血量，百分比伤害保留小数而不逐次取整。
  String get label => battleNumber(hp);

  /// 是否仍存活。
  bool get alive => hp > 0;
}

/// 血量与伤害使用紧凑数字，计算过程始终保留完整精度。
String battleNumber(num value) =>
    value.toStringAsFixed(2).replaceFirst(RegExp(r'\.?0+$'), '');

/// 每场恢复的士气，合计英雄生命上限、存活兵数和城防加成后封顶。
class BattleMorale {
  /// 用参战队伍初始化，受伤不降低将领提供的士气。
  BattleMorale(BattleArmy army, {int bonus = 0})
    : maximum =
          (army.general.maxHp +
                  army.soldiers.where((soldier) => soldier.alive).length +
                  bonus)
              .clamp(0, GameConfig.moraleLimit) {
    remaining = maximum;
  }

  /// 本场初始士气。
  final int maximum;

  /// 尚未消耗的士气。
  late int remaining;

  /// 本次随机消耗比例，范围为 5 到 10，每半秒重新抽取。
  int percent = 0;

  /// 最近半秒消耗的点数，用于提升冲锋速度。
  int spent = 0;

  /// 上次碰撞后累计消耗的士气，在下次碰撞时投入比拼。
  int accumulated = 0;

  /// 最近一次碰撞实际投入的累计士气。
  int committed = 0;

  /// 当前拼杀的伤害加成百分点。
  int bonus = 0;

  void _roll(math.Random random) {
    percent =
        GameConfig.moraleMinPercent +
        random.nextInt(
          GameConfig.moraleMaxPercent - GameConfig.moraleMinPercent + 1,
        );
    spent = remaining * percent ~/ 100;
    remaining -= spent;
    accumulated += spent;
  }
}

/// 一位将领与其随行小兵的持久资料，位置由每场战斗单独管理。
class BattleArmy {
  /// 使用已有生命对象创建参战队伍，不复制或恢复血量。
  BattleArmy({
    required this.id,
    required this.name,
    required this.general,
    required this.attack,
    required this.soldiers,
  });

  /// 将领唯一编号。
  final String id;

  /// 将领显示名称。
  final String name;

  /// 将领生命。
  final BattleHealth general;

  /// 将领每次攻击伤害。
  final int attack;

  /// 按原始对位槽保存的小兵生命，阵亡槽不挪动。
  final List<BattleHealth> soldiers;
}

/// 战场左右双方，守军在左，进攻部队在右。
enum BattleSide {
  /// 城内守军，初始位于左侧。
  defender,

  /// 进攻部队，初始位于右侧。
  attacker,
}

/// 本轮将领交战的结局，双方同时阵亡时单独处理。
enum BattleResult {
  /// 守将阵亡，进攻将领仍存活。
  attackerWon,

  /// 进攻将领阵亡，守将仍存活。
  defenderWon,

  /// 同一次伤害结算中双方将领均阵亡。
  draw,
}

/// 整队动作阶段，退到终点后必须经过准备再重新冲锋。
enum BattleMotion {
  /// 收势、蓄力，队伍暂留原地。
  preparing,

  /// 朝对方加速前进。
  charging,

  /// 碰撞后的短暂停顿。
  impact,

  /// 按承受伤害反弹并逐渐减速。
  recoiling,

  /// 战斗结束或撤离。
  halted,
}

/// 原版固定纵队，横向位置由整支队伍共用，阵亡不会让其他人补位。
class BattleFormation {
  /// 原版开场前排中心分别在 48 和 208，后排将领再相隔 24 像素。
  BattleFormation(this.side) : frontX = side == BattleSide.defender ? 48 : 208;

  /// 队伍所在侧。
  final BattleSide side;

  /// 四名士兵共用的横坐标。
  double frontX;

  /// 整队击退到达的横坐标。
  double? recoilX;

  /// 本帧是否移动。
  bool moving = false;

  /// 整队累计行走距离。
  double walkDistance = 0;

  /// 当前冲锋速度，起步时逐渐加速。
  double velocity = 0;

  /// 当前动作，整排士兵和将领同时切换。
  BattleMotion motion = BattleMotion.preparing;

  /// 当前收势准备结束的时刻。
  double readyAt = GameConfig.battleFormationTime;

  double _prepareAt = 0;

  /// 最近碰撞时刻，整队共用一次短暂停顿与回身动作。
  double impactAt = -100;

  /// 最近真正抵达墙边的时刻，驱动回弹与碎屑。
  double wallHitAt = -100;

  double _recoilStart = 0;
  double _recoilDuration = 0;

  void _retreatTo(double goal, double time) {
    recoilX = goal;
    _recoilStart = frontX;
    // 二次减速的初速度为 2×距离/时间，按峰值限速保留原击退距离。
    _recoilDuration = math.max(
      GameConfig.battleRecoilMinimumTime,
      2 * (goal - frontX).abs() / GameConfig.battleRecoilPeakSpeed,
    );
    impactAt = time;
  }

  void _prepare(double time, {required double notBefore}) {
    motion = BattleMotion.preparing;
    velocity = 0;
    _prepareAt = time;
    readyAt = math.max(time + BattleSimulation.preparationTime, notBefore);
  }

  /// 撞墙轻弹只改变显示，整队实际后退由模拟坐标负责。
  double visualOffset(double time) {
    final inward = side == BattleSide.defender ? 1.0 : -1.0;
    final wallAge = time - wallHitAt;
    if (wallAge >= 0 && wallAge < 0.24) {
      return inward * math.sin(wallAge / 0.24 * math.pi) * 3;
    }
    if (motion == BattleMotion.preparing && _prepareAt > 0) {
      final t = ((time - _prepareAt) / (readyAt - _prepareAt)).clamp(0.0, 1.0);
      return -inward * math.sin(t * math.pi) * 1.5;
    }
    return 0;
  }

  /// E78A 的 OAM 纵坐标加一，减去画面顶部 16，再加人物中心 8。
  Offset positionFor(int slot, {double? front}) => Offset(
    ((front ?? frontX) +
            (slot < 0
                ? side == BattleSide.defender
                      ? -24
                      : 24
                : 0))
        .clamp(8.0, 248.0),
    slot < 0 ? 86 : 48 + slot * 24.0,
  );
}

/// 战斗中的独立生命与动画；站位由固定队形提供，不追逐目标上下跑动。
class BattleUnit {
  BattleUnit._({
    required this.id,
    required this.name,
    required this.side,
    required this.slot,
    required this.health,
    required this.attack,
    required this._formation,
  }); // 固定队形由模拟器共享，单位不另存可漂移坐标。
  final BattleFormation _formation;
  Offset? _deathPosition;

  /// 全战場唯一编号。
  final String id;

  /// 显示名称。
  final String name;

  /// 所在阵营。
  final BattleSide side;

  /// 对位槽，将领使用 -1。
  final int slot;

  /// 持久生命状态。
  final BattleHealth health;

  /// 单次伤害，小兵固定为 1。
  final num attack;

  /// 是否是将领。
  bool get isGeneral => slot < 0;

  /// 固定槽位与全队横移合成的位置，阵亡后保留倒地起点。
  Offset get position => _deathPosition ?? _formation.positionFor(slot);

  /// 合并整队碰撞动作后的显示位置，身体始终留在战场内。
  Offset renderPosition(double time) {
    if (_deathPosition != null) return _deathPosition!;
    final point = position;
    return Offset(
      (point.dx + _formation.visualOffset(time)).clamp(8.0, 248.0),
      point.dy,
    );
  }

  /// 原版两帧步态和拼杀帧随整队动作衔接，蓄力末段举起武器。
  int animationFrame(double time) => switch (_formation.motion) {
    BattleMotion.impact || BattleMotion.recoiling => 2,
    BattleMotion.preparing =>
      _formation.readyAt - time < GameConfig.chargeRaiseTime ? 2 : 0,
    BattleMotion.charging => ((position.dx - 8) / 8).floor() % 2,
    BattleMotion.halted => time - lastAttackAt < 0.3 ? 2 : 0,
  };

  /// 距离上次攻击的时间，驱动挥砍与前冲动画。
  double lastAttackAt = -100;

  /// 最近攻击方向，目标消失后仍保留出招方向。
  Offset strikeDirection = Offset.zero;

  /// 最近受击时间。
  double lastHitAt = -100;

  /// 阵亡时间，供短暂倒地动画使用。
  double? diedAt;

  /// 角色当前是否在行走。
  bool get moving => health.alive && _formation.moving;

  /// 累计位移用于切换走路帧。
  double get walkDistance => _formation.walkDistance;

  /// 是否朝右，静止时保留方向。
  bool get facingRight => side == BattleSide.defender;

  /// 被击退时的真实目标位置，逐帧到达而不是瞬间传送。
  Offset? get recoilTarget => _formation.recoilX == null
      ? null
      : _formation.positionFor(slot, front: _formation.recoilX);

  void _fall(double time) {
    _deathPosition ??= renderPosition(time);
    diedAt ??= time;
  }
}

/// 一次实际命中的伤害与位置，供记录和命中特效使用。
typedef BattleHit = ({
  String sourceId,
  String targetId,
  double damage,
  Offset position,
  double at,
});

/// 一轮整队碰撞的结算，超出墙边的部分只给本轮胜方追加伤害。
typedef BattleClash = ({
  double attackerDamage,
  double defenderDamage,
  double difference,
  double retreatPoints,
  double attackerRetreat,
  double defenderRetreat,
  double overflowPercent,
});

/// 固定步长的自动拼杀模拟，观战只读取状态，不执行第二份战斗。
class BattleSimulation {
  /// 创建双方纵队；固定随机种子保证相同战斗不受帧率和观战影响。
  BattleSimulation({
    required this.attacker,
    required this.defender,
    required int seed,
    this.defenderCityLevel = 1,
    this.fieldTerrain,
  }) : assert(
         defenderCityLevel >= 1 && defenderCityLevel <= GameConfig.maxCityLevel,
       ),
       _random = math.Random(seed),
       attackerMorale = BattleMorale(attacker),
       defenderMorale = BattleMorale(
         defender,
         bonus: fieldTerrain == null
             ? (defenderCityLevel - 1) * GameConfig.cityDefenseMoralePerLevel
             : 0,
       ) {
    _addArmy(defender, BattleSide.defender);
    _addArmy(attacker, BattleSide.attacker);
  }

  /// 小兵的生命上限。
  static const soldierHp = GameConfig.soldierHp;

  /// 小兵每次拼杀的攻击力。
  static const soldierAttack = GameConfig.soldierAttack;

  /// 战斗每秒模拟六十次，与绘制帧数无关。
  static const fixedStep = 1 / 60;

  /// 上次碰撞后的最低整备间隔，冲锋和实际接触还需另外完成。
  static const attackInterval = GameConfig.clashInterval;

  /// 每半秒投入一次士气，碰撞前持续积累。
  static const moraleInterval = GameConfig.moraleInterval;

  /// 出剑接触时短停队形，游戏时钟与后台进度照常推进。
  static const impactHold = GameConfig.battleImpactHold;

  /// 退到终点后的收势与举剑准备时间。
  static const preparationTime = GameConfig.chargePreparationTime;

  /// 整个有效战场折算为五十点，首轮接触时两侧各余二十五点。
  static const arenaPoints = GameConfig.battlefieldPoints;

  /// 战场的原生像素尺寸。
  static const arenaSize = Size(256, 144);

  /// 单位进入近身距离后停步拼杀。
  static const attackRange = 16.0;

  /// 冲锋基础速度，士气追加由配置提供，实际起步仍受加速度约束。
  static const baseChargeSpeed = GameConfig.baseChargeSpeed;

  /// 进攻队伍。
  final BattleArmy attacker;

  /// 守城队伍。
  final BattleArmy defender;

  /// 野战环境，为空时表示城池战。
  final FieldTerrain? fieldTerrain;

  /// 当前地形对双方将领的统一倍率，小兵保持原攻击。
  double get heroAttackFactor => fieldTerrain?.heroAttackFactor ?? 1;

  /// 本位守将上场时的城池等级，中途升级不重填士气或更改本场加成。
  final int defenderCityLevel;

  /// 城防对整队基础伤害的额外贡献，只计算一次，不乘小兵人数。
  int get defenderAttackBonus => fieldTerrain == null
      ? (defenderCityLevel - 1) * GameConfig.cityDefenseAttackPerLevel
      : 0;

  /// 城防提供的初始士气，最终士气仍受统一上限约束。
  int get defenderMoraleBonus => fieldTerrain == null
      ? (defenderCityLevel - 1) * GameConfig.cityDefenseMoralePerLevel
      : 0;

  /// 进攻方本场士气。
  final BattleMorale attackerMorale;

  /// 守城方本场士气。
  final BattleMorale defenderMorale;

  /// 所有角色共用两条队伍横坐标，原始纵向槽位始终不变。
  final Map<BattleSide, BattleFormation> formations = {
    BattleSide.defender: BattleFormation(BattleSide.defender),
    BattleSide.attacker: BattleFormation(BattleSide.attacker),
  };

  /// 所有本轮参战单位，阵亡后保留用于结果与倒地动画。
  final List<BattleUnit> units = [];

  /// 最近命中，保留一秒多用于受击效果。
  final List<BattleHit> hits = [];

  /// 最近六条战斗记录。
  final List<String> events = [];

  /// 已发生伤害结算的拼杀批次数。
  int clashes = 0;

  /// 本轮已推进秒数。
  double elapsed = 0;

  /// 将领阵亡产生的结局。
  BattleResult? result;

  /// 主动撤离时停止这场模拟，不改变任何单位剩余生命。
  bool stopped = false;
  double _accumulator = 0;
  double _nextClashAt = 0;
  double _moraleSeconds = 0;
  final math.Random _random;

  /// 最近一轮双方伤害及后退结算。
  BattleClash? lastClash;

  /// 最近一轮被击退的阵营，平手时为空。
  BattleSide? pushedSide;

  /// 读取一方的士气与当前伤害加成。
  BattleMorale morale(BattleSide side) =>
      side == BattleSide.attacker ? attackerMorale : defenderMorale;

  /// 基础伤害由存活兵数、将领攻击和守方城防加成相加，再参与士气比拼。
  double baseDamage(BattleSide side) =>
      (survivors(side) * soldierAttack +
              (side == BattleSide.defender ? defenderAttackBonus : 0) +
              math.max(
                    0,
                    side == BattleSide.attacker
                        ? attacker.attack
                        : defender.attack,
                  ) *
                  heroAttackFactor)
          .toDouble();

  /// 根据最近半秒消耗的士气提高冲锋速度。
  double chargeSpeed(BattleSide side) =>
      baseChargeSpeed + morale(side).spent * GameConfig.chargeSpeedPerMorale;

  /// 当前队伍到自身墙边的真实退路；碰撞时两侧退路之和为五十点。
  double distanceToWall(BattleSide side) {
    final x = formations[side]!.frontX;
    return (side == BattleSide.defender ? x - 8 : 248 - x) /
        (arenaSize.width - 32) *
        arenaPoints;
  }

  /// 只限制开场在中央交锋，后续接触点由双方实际运动决定。
  double initialContactX(BattleSide side) =>
      arenaSize.width / 2 + (side == BattleSide.defender ? -8 : 8);

  /// 判断单位是否贴墙，增伤按整队后退空间的溢出比例另行计算。
  bool atWall(BattleUnit unit) => distanceToWall(unit.side) <= 0.001;

  /// 当前是否停止战斗。
  bool get finished => result != null || stopped;

  /// 开场短暂列队后开始接近。
  bool get forming => elapsed < GameConfig.battleFormationTime - 1e-9;

  /// 某一方仍存活的小兵数。
  int survivors(BattleSide side) => units
      .where(
        (unit) => unit.side == side && !unit.isGeneral && unit.health.alive,
      )
      .length;

  /// 按编号读取一个战场单位。
  BattleUnit? unitById(String? id) =>
      units.where((unit) => unit.id == id).firstOrNull;

  /// 推进状态，返回是否需要更新血量与说明文字。
  bool advance(double dt) {
    if (!dt.isFinite || dt <= 0) return false;
    if (finished) {
      elapsed += dt;
      return false;
    }
    var changed = false;
    final wasForming = forming;
    _accumulator += dt;
    while (_accumulator >= fixedStep - 1e-9) {
      _accumulator = math.max(0, _accumulator - fixedStep);
      elapsed += fixedStep;
      changed = _step() || changed;
      if (finished) {
        elapsed += _accumulator;
        _accumulator = 0;
        break;
      }
    }
    return changed || wasForming != forming;
  }

  /// 停止进攻，仍可播放已经发生的受击和倒地动画。
  void stop() {
    stopped = true;
    for (final unit in units) {
      if (!unit.health.alive) unit._fall(elapsed);
    }
    for (final formation in formations.values) {
      formation.moving = false;
      formation.motion = BattleMotion.halted;
    }
  }

  void _addArmy(BattleArmy army, BattleSide side) {
    final left = side == BattleSide.defender;
    units.add(
      BattleUnit._(
        id: army.id,
        name: army.name,
        side: side,
        slot: -1,
        health: army.general,
        attack: math.max(0, army.attack) * heroAttackFactor,
        formation: formations[side]!,
      ),
    );
    for (var slot = 0; slot < army.soldiers.length; slot++) {
      if (!army.soldiers[slot].alive) continue;
      units.add(
        BattleUnit._(
          id: '${army.id}-soldier-$slot',
          name:
              '${fieldTerrain != null ? (left ? '左军' : '右军') : (left ? '守军' : '攻方')}士兵${slot + 1}',
          side: side,
          slot: slot,
          health: army.soldiers[slot],
          attack: soldierAttack,
          formation: formations[side]!,
        ),
      );
    }
  }

  bool _step() {
    for (final unit in units) {
      if (!unit.health.alive) unit._fall(elapsed);
    }
    if (_finishIfNeeded()) return true;
    var changed = false;
    _moraleSeconds += fixedStep;
    if (_moraleSeconds >= moraleInterval - 1e-9) {
      _moraleSeconds -= moraleInterval;
      attackerMorale._roll(_random);
      defenderMorale._roll(_random);
      changed = true;
    }
    if (forming) return changed;
    _moveFormations();
    if (elapsed < _nextClashAt - 1e-9 ||
        formations.values.any(
          (formation) => formation.motion != BattleMotion.charging,
        ) ||
        formations[BattleSide.attacker]!.frontX -
                formations[BattleSide.defender]!.frontX >
            attackRange + 0.001) {
      return changed;
    }
    clashes++;
    _nextClashAt = elapsed + attackInterval;
    attackerMorale.committed = attackerMorale.accumulated;
    defenderMorale.committed = defenderMorale.accumulated;
    final chargeDifference =
        attackerMorale.committed - defenderMorale.committed;
    attackerMorale.bonus = math.max(0, chargeDifference);
    defenderMorale.bonus = math.max(0, -chargeDifference);
    attackerMorale.accumulated = 0;
    defenderMorale.accumulated = 0;

    // 双方伤害先按碰撞前的人数计算，扣血顺序不会剥夺同一轮的反击。
    var attackDamage =
        baseDamage(BattleSide.attacker) * (1 + attackerMorale.bonus / 100);
    var defendDamage =
        baseDamage(BattleSide.defender) * (1 + defenderMorale.bonus / 100);
    final difference = (attackDamage - defendDamage).abs();
    pushedSide = difference < 1e-9
        ? null
        : attackDamage > defendDamage
        ? BattleSide.defender
        : BattleSide.attacker;
    var overflow = 0.0;
    for (final formation in formations.values) {
      formation.impactAt = elapsed;
      formation.velocity = 0;
      formation.moving = false;
      formation.motion = BattleMotion.impact;
    }
    if (pushedSide case final side?) {
      final available = distanceToWall(side);
      overflow = math.max(0.0, difference - available);
      if (side == BattleSide.defender) {
        attackDamage *= 1 + overflow / 100;
      } else {
        defendDamage *= 1 + overflow / 100;
      }
    }
    // 双方按承受伤害后退，到各自终点收势后再冲锋，不预设下一次碰撞线。
    final defenderRetreat = _recoilFromDamage(
      BattleSide.defender,
      attackDamage,
    );
    final attackerRetreat = _recoilFromDamage(
      BattleSide.attacker,
      defendDamage,
    );
    lastClash = (
      attackerDamage: attackDamage,
      defenderDamage: defendDamage,
      difference: difference,
      retreatPoints: pushedSide == BattleSide.defender
          ? defenderRetreat
          : attackerRetreat,
      attackerRetreat: attackerRetreat,
      defenderRetreat: defenderRetreat,
      overflowPercent: overflow,
    );
    for (final unit in units.where((unit) => unit.health.alive)) {
      unit.lastAttackAt = elapsed;
      unit.strikeDirection = Offset(unit.facingRight ? 1 : -1, 0);
    }
    hits.removeWhere((hit) => elapsed - hit.at > 1.3);
    _applyArmyDamage(BattleSide.defender, attackDamage);
    _applyArmyDamage(BattleSide.attacker, defendDamage);
    _finishIfNeeded();
    return true;
  }

  double _recoilFromDamage(BattleSide side, double received) {
    if (received <= 1e-9) return 0;
    final formation = formations[side]!;
    final outward = side == BattleSide.defender ? -1.0 : 1.0;
    final goal =
        (formation.frontX +
                outward * received / arenaPoints * (arenaSize.width - 32))
            .clamp(8.0, 248.0);
    if ((goal - formation.frontX).abs() > 0.001) {
      formation._retreatTo(goal, elapsed);
    } else {
      formation.wallHitAt = elapsed + impactHold;
    }
    return (goal - formation.frontX).abs() /
        (arenaSize.width - 32) *
        arenaPoints;
  }

  void _applyArmyDamage(BattleSide side, double damage) {
    var remaining = damage;
    final enemy = side == BattleSide.attacker ? defender : attacker;
    while (remaining > 1e-9) {
      final soldiers = units
          .where(
            (unit) => unit.side == side && !unit.isGeneral && unit.health.alive,
          )
          .toList();
      if (soldiers.isEmpty) break;
      // 先消耗上轮已经受伤的那名士兵；轮到下一名时随机挑选，保持整队兵力连续。
      final wounded = soldiers
          .where((unit) => unit.health.hp < unit.health.maxHp - 1e-9)
          .toList();
      final candidates = wounded.isEmpty ? soldiers : wounded;
      final victim = candidates[_random.nextInt(candidates.length)];
      final amount = math.min(remaining, victim.health.hp);
      _hurt(victim, amount, enemy.id);
      remaining -= amount;
    }
    if (remaining > 1e-9) {
      final general = units.firstWhere(
        (unit) => unit.side == side && unit.isGeneral,
      );
      _hurt(general, math.min(remaining, general.health.hp), enemy.id);
    }
    _record('${enemy.name}部队造成 ${battleNumber(damage)} 点伤害');
  }

  void _hurt(BattleUnit unit, double damage, String sourceId) {
    if (damage <= 0) return;
    hits.add((
      sourceId: sourceId,
      targetId: unit.id,
      damage: damage,
      position: unit.position,
      at: elapsed,
    ));
    unit.health.hp -= damage;
    unit.lastHitAt = elapsed;
    if (!unit.health.alive) {
      unit._fall(elapsed);
      _record('${unit.name}阵亡');
    }
  }

  bool _finishIfNeeded() {
    if (attacker.general.alive && defender.general.alive) return false;
    result = !attacker.general.alive && !defender.general.alive
        ? BattleResult.draw
        : attacker.general.alive
        ? BattleResult.attackerWon
        : BattleResult.defenderWon;
    for (final formation in formations.values) {
      formation.moving = false;
      formation.motion = BattleMotion.halted;
    }
    for (final unit in units) {
      if (!unit.health.alive) unit._fall(elapsed);
    }
    return true;
  }

  void _moveFormations() {
    final proposed = <BattleSide, double>{};
    for (final formation in formations.values) {
      final before = formation.frontX;
      if (formation.motion == BattleMotion.impact &&
          elapsed >= formation.impactAt + impactHold - 1e-9) {
        if (formation.recoilX == null) {
          formation._prepare(elapsed, notBefore: _nextClashAt);
        } else {
          formation.motion = BattleMotion.recoiling;
        }
      }
      if (formation.motion == BattleMotion.preparing &&
          elapsed >= formation.readyAt - 1e-9) {
        formation.motion = BattleMotion.charging;
      }
      if (formation.motion == BattleMotion.recoiling) {
        final goal = formation.recoilX!;
        final t =
            ((elapsed - formation.impactAt - impactHold) /
                    formation._recoilDuration)
                .clamp(0.0, 1.0);
        final eased = 1 - (1 - t) * (1 - t);
        proposed[formation.side] =
            formation._recoilStart + (goal - formation._recoilStart) * eased;
        if (t >= 1) {
          if (goal <= 8.001 || goal >= 247.999) formation.wallHitAt = elapsed;
          formation.recoilX = null;
          formation._prepare(elapsed, notBefore: _nextClashAt);
        }
      } else if (formation.motion == BattleMotion.charging) {
        final targetSpeed = chargeSpeed(formation.side);
        formation.velocity += (targetSpeed - formation.velocity).clamp(
          -GameConfig.chargeAcceleration * fixedStep,
          GameConfig.chargeAcceleration * fixedStep,
        );
        final step = formation.velocity * fixedStep;
        final goal = clashes == 0
            ? initialContactX(formation.side)
            : formation.side == BattleSide.defender
            ? 232.0
            : 24.0;
        proposed[formation.side] = before + (goal - before).clamp(-step, step);
      } else {
        proposed[formation.side] = before;
      }
    }
    // 相交帧回推到真实接触点；准备或后退的一方不会被推着滑行。
    final left = formations[BattleSide.defender]!;
    final right = formations[BattleSide.attacker]!;
    if (proposed[BattleSide.attacker]! - proposed[BattleSide.defender]! <
        attackRange) {
      if (left.motion != BattleMotion.charging) {
        proposed[BattleSide.attacker] =
            proposed[BattleSide.defender]! + attackRange;
      } else if (right.motion != BattleMotion.charging) {
        proposed[BattleSide.defender] =
            proposed[BattleSide.attacker]! - attackRange;
      } else {
        final closing =
            (proposed[BattleSide.defender]! - left.frontX) +
            (right.frontX - proposed[BattleSide.attacker]!);
        final fraction = closing > 0
            ? ((right.frontX - left.frontX - attackRange) / closing).clamp(
                0.0,
                1.0,
              )
            : 0.0;
        proposed[BattleSide.defender] =
            left.frontX +
            (proposed[BattleSide.defender]! - left.frontX) * fraction;
        proposed[BattleSide.attacker] =
            proposed[BattleSide.defender]! + attackRange;
      }
    }
    for (final formation in formations.values) {
      final before = formation.frontX;
      formation.frontX = proposed[formation.side]!.clamp(
        8.0,
        arenaSize.width - 8,
      );
      final distance = (formation.frontX - before).abs();
      formation.moving = distance > 0.001;
      formation.walkDistance += distance;
    }
  }

  void _record(String message) {
    events.add(message);
    if (events.length > 6) events.removeAt(0);
  }
}
