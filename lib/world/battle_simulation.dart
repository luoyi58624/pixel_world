import 'dart:math' as math;
import 'dart:ui';

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
  set hp(num value) => _hp = value.toDouble().clamp(0, maxHp.toDouble());

  /// 用于界面显示的血量，百分比伤害保留小数而不逐次取整。
  String get label => battleNumber(hp);

  /// 是否仍存活。
  bool get alive => hp > 0;
}

/// 血量与伤害使用紧凑数字，计算过程始终保留完整精度。
String battleNumber(num value) =>
    value.toStringAsFixed(2).replaceFirst(RegExp(r'\.?0+$'), '');

/// 每场战斗单独恢复的士气，初始值只取将领生命上限和存活小兵数。
class BattleMorale {
  /// 用参战队伍初始化，受伤不降低将领提供的士气。
  BattleMorale(BattleArmy army)
    : maximum =
          army.general.maxHp +
          army.soldiers.where((soldier) => soldier.alive).length {
    remaining = maximum;
  }

  /// 本场初始士气。
  final int maximum;

  /// 尚未消耗的士气。
  late int remaining;

  /// 本轮随机投入比例，范围为 0 到 25。
  int percent = 0;

  /// 本轮实际消耗点数。
  int spent = 0;

  /// 当前拼杀的伤害加成百分点。
  int bonus = 0;

  void _roll(math.Random random) {
    percent = random.nextInt(26);
    spent = remaining * percent ~/ 100;
    remaining -= spent;
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

/// 战斗中的独立单位，包含位置、目标、冷却和受击动画状态。
class BattleUnit {
  BattleUnit._({
    required this.id,
    required this.name,
    required this.side,
    required this.slot,
    required this.health,
    required this.attack,
    required this.position,
  });

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
  final int attack;

  /// 是否是将领。
  bool get isGeneral => slot < 0;

  /// 连续战场位置。
  Offset position;

  /// 当前目标，目标阵亡后重新选择。
  String? targetId;

  /// 下一次攻击前的剩余冷却秒数。
  double cooldown = 0;

  /// 距离上次攻击的时间，驱动挥砍与前冲动画。
  double lastAttackAt = -100;

  /// 最近攻击方向，目标消失后仍保留出招方向。
  Offset strikeDirection = Offset.zero;

  /// 最近受击时间。
  double lastHitAt = -100;

  /// 阵亡时间，供短暂倒地动画使用。
  double? diedAt;

  /// 角色当前是否在行走。
  bool moving = false;

  /// 累计位移用于切换走路帧。
  double walkDistance = 0;

  /// 是否朝右，静止时保留方向。
  bool facingRight = true;

  /// 被击退时的真实目标位置，逐帧到达而不是瞬间传送。
  Offset? recoilTarget;
}

/// 一次实际命中的伤害与位置，绘制飘字和命中特效共用。
typedef BattleHit = ({
  String sourceId,
  String targetId,
  double damage,
  Offset position,
  double at,
});

/// 固定步长的自动拼杀模拟，观战只读取状态，不执行第二份战斗。
class BattleSimulation {
  /// 创建双方纵队；固定随机种子保证相同战斗不受帧率和观战影响。
  BattleSimulation({
    required this.attacker,
    required this.defender,
    required int seed,
  }) : _random = math.Random(seed),
       attackerMorale = BattleMorale(attacker),
       defenderMorale = BattleMorale(defender) {
    _addArmy(defender, BattleSide.defender);
    _addArmy(attacker, BattleSide.attacker);
  }

  /// 小兵的生命上限。
  static const soldierHp = 25;

  /// 小兵每次拼杀的攻击力。
  static const soldierAttack = 1;

  /// 战斗每秒模拟六十次，与绘制帧数无关。
  static const fixedStep = 1 / 60;

  /// 一秒一次攻击，接近目标后才触发。
  static const attackInterval = 1.0;

  /// 战场的原生像素尺寸。
  static const arenaSize = Size(384, 224);

  /// 单位进入近身距离后停步拼杀。
  static const attackRange = 18.0;

  /// 进攻队伍。
  final BattleArmy attacker;

  /// 守城队伍。
  final BattleArmy defender;

  /// 进攻方本场士气。
  final BattleMorale attackerMorale;

  /// 守城方本场士气。
  final BattleMorale defenderMorale;

  /// 所有本轮参战单位，阵亡后保留用于结果与倒地动画。
  final List<BattleUnit> units = [];

  /// 最近命中，保留一秒多用于飘字。
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
  final math.Random _random;

  /// 最近一轮被击退的阵营，平手时为空。
  BattleSide? pushedSide;

  /// 读取一方的士气与当前伤害加成。
  BattleMorale morale(BattleSide side) =>
      side == BattleSide.attacker ? attackerMorale : defenderMorale;

  /// 仅实际贴住左右城墙的受击单位承受额外 50% 伤害。
  bool atWall(BattleUnit unit) =>
      unit.position.dx <= 12.001 ||
      unit.position.dx >= arenaSize.width - 12.001;

  /// 当前是否停止战斗。
  bool get finished => result != null || stopped;

  /// 开场短暂列队后开始接近。
  bool get forming => elapsed < 0.8;

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
      unit.moving = false;
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
        attack: math.max(1, army.attack),
        position: Offset(left ? 52 : 332, 134),
      )..facingRight = left,
    );
    for (var slot = 0; slot < army.soldiers.length; slot++) {
      if (!army.soldiers[slot].alive) continue;
      units.add(
        BattleUnit._(
          id: '${army.id}-soldier-$slot',
          name: '${left ? '守军' : '攻方'}士兵${slot + 1}',
          side: side,
          slot: slot,
          health: army.soldiers[slot],
          attack: soldierAttack,
          position: Offset(left ? 96 : 288, 86 + slot * 32.0),
        )..facingRight = left,
      );
    }
  }

  BattleUnit? _targetFor(BattleUnit unit) {
    final current = unitById(unit.targetId);
    if (current != null && current.health.alive) return current;
    final enemies = units
        .where((enemy) => enemy.side != unit.side && enemy.health.alive)
        .toList();
    final soldiers = enemies.where((enemy) => !enemy.isGeneral).toList();
    BattleUnit? target;
    if (soldiers.isEmpty) {
      target = enemies.firstOrNull;
    } else if (unit.isGeneral) {
      target = soldiers[_random.nextInt(soldiers.length)];
    } else {
      target = soldiers.where((enemy) => enemy.slot == unit.slot).firstOrNull;
      if (target == null) {
        soldiers.sort((a, b) {
          final distance = (a.position - unit.position).distanceSquared
              .compareTo((b.position - unit.position).distanceSquared);
          return distance != 0 ? distance : a.slot.compareTo(b.slot);
        });
        target = soldiers.first;
      }
    }
    unit.targetId = target?.id;
    return target;
  }

  bool _step() {
    if (_finishIfNeeded()) return true;
    if (forming) return false;
    final positions = {for (final unit in units) unit.id: unit.position};
    final moves = <BattleUnit, Offset>{};
    for (final unit in units) {
      unit.moving = false;
      if (!unit.health.alive) continue;
      unit.cooldown = math.max(0, unit.cooldown - fixedStep);
      if (unit.recoilTarget case final destination?) {
        final delta = destination - unit.position;
        final distance = math.min(delta.distance, 120 * fixedStep);
        moves[unit] = delta.distance < 0.001
            ? destination
            : unit.position + delta / delta.distance * distance;
        if (distance >= delta.distance - 0.001) unit.recoilTarget = null;
        continue;
      }
      final target = _targetFor(unit);
      if (target == null) continue;
      final delta = positions[target.id]! - positions[unit.id]!;
      if (delta.dx.abs() > 0.1) unit.facingRight = delta.dx > 0;
      if (elapsed - unit.lastAttackAt < 0.32 || delta.distance <= attackRange) {
        continue;
      }
      final distance = math.min(
        delta.distance - attackRange,
        (unit.isGeneral ? 36.0 : 40.0) * fixedStep,
      );
      moves[unit] = unit.position + delta / delta.distance * distance;
      unit.walkDistance += distance;
      unit.moving = distance > 0.001;
    }
    for (final entry in moves.entries) {
      entry.key.position = entry.value;
    }
    if (elapsed < _nextClashAt - 1e-9) return false;
    // 先收集同一时刻的全部攻击，再统一扣血，避免遍历顺序让阵亡者失去本次反击。
    final strikes = <(BattleUnit, BattleUnit)>[];
    for (final unit in units) {
      if (!unit.health.alive ||
          unit.cooldown > 1e-9 ||
          unit.recoilTarget != null) {
        continue;
      }
      final target = unitById(unit.targetId);
      if (target == null ||
          !target.health.alive ||
          (target.position - unit.position).distance > attackRange + 0.001) {
        continue;
      }
      strikes.add((unit, target));
    }
    hits.removeWhere((hit) => elapsed - hit.at > 1.3);
    if (strikes.isEmpty) return false;
    clashes++;
    _nextClashAt = elapsed + attackInterval;
    attackerMorale._roll(_random);
    defenderMorale._roll(_random);
    final difference = attackerMorale.spent - defenderMorale.spent;
    attackerMorale.bonus = math.max(0, difference);
    defenderMorale.bonus = math.max(0, -difference);
    final damages = <BattleUnit, double>{};
    for (final (source, target) in strikes) {
      source.cooldown = attackInterval;
      source.lastAttackAt = elapsed;
      final delta = target.position - source.position;
      source.strikeDirection = delta.distance < 0.001
          ? Offset(source.facingRight ? 1 : -1, 0)
          : delta / delta.distance;
      final damage =
          source.attack *
          (1 + morale(source.side).bonus / 100) *
          (atWall(target) ? 1.5 : 1.0);
      damages[target] = (damages[target] ?? 0) + damage;
      hits.add((
        sourceId: source.id,
        targetId: target.id,
        damage: damage,
        position: target.position,
        at: elapsed,
      ));
      _record('${source.name} → ${target.name}  -${battleNumber(damage)}');
      if (source.isGeneral) source.targetId = null;
    }
    pushedSide = difference == 0
        ? null
        : difference > 0
        ? BattleSide.defender
        : BattleSide.attacker;
    if (pushedSide case final side?) {
      for (final unit in units.where(
        (unit) => unit.side == side && unit.health.alive,
      )) {
        final x = (unit.position.dx + (side == BattleSide.defender ? -32 : 32))
            .clamp(12.0, arenaSize.width - 12);
        unit.recoilTarget = Offset(x, unit.position.dy);
      }
    }
    for (final entry in damages.entries) {
      final target = entry.key;
      target.health.hp -= entry.value;
      target.lastHitAt = elapsed;
      if (!target.health.alive) {
        target.diedAt = elapsed;
        target.moving = false;
        _record('${target.name}阵亡');
      }
    }
    _finishIfNeeded();
    return true;
  }

  bool _finishIfNeeded() {
    if (attacker.general.alive && defender.general.alive) return false;
    result = !attacker.general.alive && !defender.general.alive
        ? BattleResult.draw
        : attacker.general.alive
        ? BattleResult.attackerWon
        : BattleResult.defenderWon;
    for (final unit in units) {
      unit.moving = false;
      if (!unit.health.alive) unit.diedAt ??= elapsed;
    }
    return true;
  }

  void _record(String message) {
    events.add(message);
    if (events.length > 6) events.removeAt(0);
  }
}
