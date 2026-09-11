import 'dart:math' as math;

import 'combat_rules.dart';

import '../../../core/geometry/geometry.dart';

import '../../../core/config/game_config.dart';
import 'field_terrain.dart';
import 'nes/nes_battle_ending.dart';
import 'nes/nes_battle_kernel.dart';
import '../../weapons/domain/weapon.dart';

part 'battle_snapshot.dart';

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

  /// 地图和战斗共用的紧凑生命数字。
  String get label => battleNumber(hp);

  /// 是否仍存活。
  bool get alive => hp > 0;
}

/// 血量与伤害使用紧凑数字，计算过程始终保留完整精度。
String battleNumber(num value) =>
    value.toStringAsFixed(2).replaceFirst(RegExp(r'\.?0+$'), '');

/// 原版红条资源，来自独立的 AE/AF 数值而非将领生命。
class BattleMorale {
  /// 用本场原版初始值创建显示快照。
  BattleMorale(this.initial) : remaining = initial;

  /// 全体将领使用统一的士气上限。
  int get maximum => 100;

  /// 此英雄配置的开场士气。
  final int initial;

  /// 剩余红条。
  int remaining;

  /// 本轮累积的冲锋增益。
  int accumulated = 0;

  /// 上次碰撞投入的积累。
  int committed = 0;

  /// 额外碰撞强度，上限 4 点，并非百分比。
  int get bonus => accumulated == 0 ? 0 : math.min(4, (accumulated >> 2) + 1);
}

/// 将领与随行小兵的共享战役资料。
class BattleArmy {
  /// 引用已有生命，不复制或治疗将领。
  BattleArmy({
    required this.id,
    required this.name,
    required this.general,
    required this.attack,
    required this.soldiers,
    this.morale = 50,
  });

  /// 将领编号。
  final String id;

  /// 将领姓名。
  final String name;

  /// 将领生命。
  final BattleHealth general;

  /// 原始战斗属性。
  final int attack;

  /// 英雄独立配置的初始士气。
  final int morale;

  /// 四个固定槽位的小兵生命。
  final List<BattleHealth> soldiers;
}

/// 守军在左、进攻军在右。
enum BattleSide { defender, attacker }

/// 动画完成后交给战役的结果。
enum BattleResult { attackerWon, defenderWon, draw }

/// 反弹减速到零后自然回冲，不插入人造冷却。
enum BattleMotion { preparing, charging, recoiling, halted }

/// 开场、拼杀、阵亡、胜方走场和结果停留均由后台时钟推进。
enum BattleStage {
  introduction,
  fighting,
  falling,
  victory,
  weapon,
  retreating,
  ending,
  complete,
}

/// 本场唯一一次撤退判定，动画与战役结算共用，不重复掷骰。
typedef BattleRetreat = ({BattleSide side, bool succeeded});

/// 一支纵队共用横坐标，减员后不挪动其他槽位。
class BattleFormation {
  /// 原版开场身体中心分别为 48 和 208。
  BattleFormation(this.side) : frontX = side == BattleSide.defender ? 48 : 208;

  /// 所在一侧。
  final BattleSide side;

  /// 士兵中心横坐标。
  double frontX;

  /// 有符号冲锋速度，单位为像素每秒。
  double velocity = 0;

  /// 当前动作。
  BattleMotion motion = BattleMotion.preparing;

  /// 本帧是否移动。
  bool moving = false;

  /// 累计移动距离。
  double walkDistance = 0;

  /// 最近碰撞时刻。
  double impactAt = -100;

  /// 最近撞墙时刻。
  double wallHitAt = -100;

  /// 原版固定纵向站位，将领在后排。
  GamePoint positionFor(int slot, {double? front}) => GamePoint(
    (front ?? frontX) +
        (slot < 0 ? (side == BattleSide.defender ? -24 : 24) : 0),
    slot < 0 ? 86 : 48 + slot * 24,
  );
}

/// 位置和动作直接读取原版槽位，不叠加旋转和淡出。
class BattleUnit {
  BattleUnit._({
    required this.id,
    required this.name,
    required this.side,
    required this.slot,
    required this.health,
    required this.attack,
    required this._formation,
    required this._kernel,
  });
  final BattleFormation _formation;
  final NesBattleKernel _kernel;
  bool _retreating = false;
  int get _index =>
      (side == BattleSide.attacker ? 0 : 5) + (slot < 0 ? 4 : slot);

  /// 单位编号。
  final String id;

  /// 单位姓名。
  final String name;

  /// 所在一侧。
  final BattleSide side;

  /// 士兵槽位，将领为 -1。
  final int slot;

  /// 共享生命。
  final BattleHealth health;

  /// 将领战斗属性或小兵对碰撞强度的贡献。
  final num attack;

  /// 是否为将领。
  bool get isGeneral => slot < 0;

  /// 是否仍需绘制，包含弹地退场中的角色。
  bool get visible => _kernel.ram[0x570 + _index] != 0;

  /// 身体中心，阵亡角色可飞出地板范围。
  GamePoint get position => GamePoint(
    _kernel.ram[0x5c0 + _index] + 8.0,
    _kernel.ram[0x5d0 + _index] - 7.0,
  );

  /// 读取当前逻辑帧位置。
  GamePoint renderPosition(double time) => position;

  /// 近身时举剑，远离时按横坐标的第 3 位切换步态。
  int animationFrame(double time) {
    if (_retreating) return (position.dx.floor() >> 3) & 1;
    if (!health.alive) return (_kernel.ram[0x600 + _index] >> 1) & 1;
    return _kernel.ram[0x0e] & 128 == 0
        ? 2
        : (_kernel.ram[0x5c0 + _index] >> 3) & 1;
  }

  /// 左军镜像朝右。
  bool get facingRight =>
      _retreating ? side == BattleSide.attacker : side == BattleSide.defender;

  /// 当前是否行走。
  bool get moving => health.alive && _formation.moving;

  /// 累计行走距离。
  double get walkDistance => _formation.walkDistance;

  /// 最近攻击时刻。
  double lastAttackAt = -100;

  /// 最近受击时刻，不触发变色。
  double lastHitAt = -100;

  /// 阵亡动作开始时刻。
  double? diedAt;
}

/// 实际受击记录，画面不显示伤害数字。
typedef BattleHit = ({
  String sourceId,
  String targetId,
  double damage,
  GamePoint position,
  double at,
});

/// 最近一轮双方造成的整队伤害。
typedef BattleClash = ({double attackerDamage, double defenderDamage});

/// 原版普通拼杀与战役共享生命的适配；观战读取后台同一场战斗。
class BattleSimulation {
  /// 固定种子驱动原随机源，双方自动采用原版电脑的士气节奏。
  BattleSimulation({
    required this.attacker,
    required this.defender,
    required int seed,
    this.defenderCityLevel = 1,
    this.cityAppearanceLevel,
    this.fieldTerrain,
    this.autoCharge = true,
    this.resultPerspective = BattleSide.attacker,
  }) {
    _kernel = NesBattleKernel(
      attack: [
        _combat(attacker),
        (_combat(defender) + defenderAttackBonus).clamp(0, 63),
      ],
      moraleAttack: [_combat(attacker), _combat(defender)],
      initialMorale: [attacker.morale, defender.morale],
      hp: [attacker.general.hp.round(), defender.general.hp.round()],
      slots: [
        for (final army in [attacker, defender])
          [
            for (var i = 0; i < army.soldiers.length; i++)
              if (army.soldiers[i].alive) i,
          ],
      ],
      seed: seed,
      recoilDifferenceScale: GameConfig.battleRecoilDifferenceScale,
      wallDamageScale: GameConfig.battleWallDamageScale,
    );
    attackerMorale = BattleMorale(_kernel.ram[0xae]);
    defenderMorale = BattleMorale(_kernel.ram[0xaf]);
    _addArmy(defender, BattleSide.defender);
    _addArmy(attacker, BattleSide.attacker);
    _syncHealth();
  }

  /// 原版小兵为共享兵力提供的生命。
  static const soldierHp = NesBattleKernel.soldierHp;

  /// 每名存活小兵对当前碰撞强度的贡献。
  static const soldierAttack = NesBattleKernel.soldierPower;

  /// 固定六十帧逻辑步长。
  static const fixedStep = 1 / 60;

  /// 地板与城墙尺寸。
  static const arenaSize = GameSize(256, 144);

  /// 包含下方血量面板的画布，给飞出动画保留空间。
  static const sceneSize = GameSize(256, 208);

  /// 进攻军。
  final BattleArmy attacker;

  /// 守军。
  final BattleArmy defender;

  /// 开场读取的城市等级。
  final int defenderCityLevel;

  /// 建筑背景使用的真实等级，连续攻城的临时加成变化不改变城堡外观。
  final int? cityAppearanceLevel;

  /// 野战环境，为空时表示城内。
  final FieldTerrain? fieldTerrain;

  /// 胜败提示以玩家所在一侧为准，无玩家参战时默认右军。
  final BattleSide resultPerspective;

  /// 是否为右军启用原版电脑士气节奏，关闭仅用于原 ROM 无按键对照。
  final bool autoCharge;

  /// 野战对英雄属性的倍率，小兵不受影响。
  double get heroAttackFactor => fieldTerrain?.heroAttackFactor ?? 1;
  int _combat(BattleArmy army) =>
      CombatRules.heroAttack(army.attack, heroAttackFactor);

  /// 城防只修正基础攻击，野战不享有加成。
  int get defenderAttackBonus => fieldTerrain == null
      ? CombatRules.defenseBonus(
          defenderCityLevel,
          GameConfig.cityDefenseAttackBonuses,
        )
      : 0;

  /// 城防不提供额外士气，初始红条仅按英雄有效战斗属性计算。
  int get defenderMoraleBonus => 0;

  /// 双方红条显示快照。
  late BattleMorale attackerMorale, defenderMorale;

  /// 两支队伍的横向状态。
  final formations = {
    for (final side in BattleSide.values) side: BattleFormation(side),
  };

  /// 全部单位，包含待退场角色。
  final List<BattleUnit> units = [];

  /// 最近受击记录。
  final List<BattleHit> hits = [];

  /// 最近六条记录。
  final List<String> events = [];

  /// 战斗时间，包含介绍与结束动作。
  double elapsed = 0;

  /// 碰撞次数。
  int get clashes => _kernel.clashes;

  /// 显示阶段。
  BattleStage stage = BattleStage.introduction;

  /// 动画完成后可结算的结果。
  BattleResult? result;

  /// 主动撤离是否停止模拟。
  bool stopped = false;

  /// 最近一轮伤害。
  BattleClash? lastClash;

  /// 最近一次反弹较强的一侧。
  BattleSide? pushedSide;
  late final NesBattleKernel _kernel;
  double _accumulator = 0;
  int _ticks = 0;
  BattleResult? _pendingResult;
  int _endingTicks = 0;
  int _endingCompleteAt = 0;
  final _syncedHp = <BattleSide, double>{};
  WeaponStrike? _weaponStrike;
  final _weaponUsers = <BattleSide>{};

  /// 当前武器演出，伤害只在命中时计算一次。
  WeaponStrike? get weaponStrike => _weaponStrike;

  /// 双方存活且在普通拼杀阶段时才能发动武器。
  bool get canUseWeapon =>
      !finished &&
      stage == BattleStage.fighting &&
      _retreat == null &&
      _weaponStrike == null &&
      attacker.general.alive &&
      defender.general.alive;

  /// 城战仅右侧进攻军可使用；野战双方均为在外出征部队。
  bool canUseWeaponFor(BattleSide side) =>
      canUseWeapon &&
      !_weaponUsers.contains(side) &&
      (fieldTerrain != null || side == BattleSide.attacker);

  /// 锁定一个武器动作，保留原版直接伤害及死枪反噬。
  bool useWeapon(BattleSide side, WeaponDefinition weapon) {
    if (!canUseWeaponFor(side)) return false;
    _weaponUsers.add(side);
    _kernel.ram[0x0d] = 0;
    _weaponStrike = WeaponStrike(
      weapon,
      attackingSide: side == BattleSide.attacker,
      startedAt: elapsed,
      visibleActors: [
        for (var actor = 0; actor < 10; actor++)
          if (_kernel.ram[0x570 +
                      (side == BattleSide.attacker
                          ? actor
                          : (actor + 5) % 10)] &
                  128 !=
              0)
            1 << actor,
      ].fold<int>(0, (a, b) => a | b),
    );
    if (_kernel.ram[0x81] == 200 &&
        _kernel.ram[0x83] == 16 &&
        !_kernel.falling) {
      _kernel.advanceWithdrawal([200, 16]);
      _syncMotion(_kernel.wallHits);
      _weaponStrike!.frame = 0;
    }
    stage = BattleStage.weapon;
    for (final formation in formations.values) {
      formation.moving = false;
      formation.motion = BattleMotion.halted;
    }
    return true;
  }

  BattleRetreat? _retreat;
  double _retreatElapsed = 0;
  late List<int> _retreatOrigins;

  /// 已锁定的撤退结果，普通拼杀时为空。
  BattleRetreat? get retreat => _retreat;

  /// 仅列阵或仍在拼杀时可以撤退，阵亡和结果过场不可改判。
  bool get canRetreat =>
      !finished &&
      _retreat == null &&
      (forming || stage == BattleStage.fighting) &&
      attacker.general.alive &&
      defender.general.alive;

  /// 锁定结果，双方先退回开场位置，抵达后才揭晓或开始原版死亡动画。
  bool beginRetreat(BattleSide side, {required bool succeeded}) {
    if (!canRetreat) return false;
    _retreat = (side: side, succeeded: succeeded);
    _retreatOrigins = [_kernel.ram[0x81], _kernel.ram[0x83]];
    stage = BattleStage.retreating;
    _pendingResult = side == BattleSide.attacker
        ? BattleResult.defenderWon
        : BattleResult.attackerWon;
    for (final formation in formations.values) {
      formation.moving = false;
      formation.velocity = 0;
      formation.motion = BattleMotion.preparing;
    }
    for (final unit in units) {
      unit._retreating = unit.health.alive;
    }
    return true;
  }

  /// 撤退状态文案，不把成功逃脱的将领描述为阵亡。
  String? get retreatMessage {
    final attempt = _retreat;
    if (attempt == null) return null;
    final name = attempt.side == BattleSide.attacker
        ? attacker.name
        : defender.name;
    if (stage == BattleStage.retreating) return '$name正在撤退 · 双方退回起点';
    return attempt.succeeded ? '$name撤退成功' : '$name撤退失败，阵亡';
  }

  /// 是否结束或撤离。
  bool get finished => result != null || stopped;

  /// 是否开场介绍。
  bool get forming => stage == BattleStage.introduction;

  /// 结果已经揭晓，但须等原版收尾时长结束才交给战役结算。
  BattleResult? get announcedResult =>
      _retreat?.succeeded != true &&
          (stage == BattleStage.ending || stage == BattleStage.complete)
      ? _pendingResult
      : null;

  /// 原结果图集的行号，胜利、失败、互刺分别为 0、1、2。
  int? get announcementIndex => announcedResult == null ? null : _resultIndex;

  /// 供观战状态与读屏使用的原版结果文字。
  String? get endingMessage => announcementIndex == null
      ? null
      : nesBattleResultLabels[announcementIndex!];

  int get _resultIndex {
    if (_pendingResult == BattleResult.draw) return 2;
    final won = resultPerspective == BattleSide.attacker
        ? BattleResult.attackerWon
        : BattleResult.defenderWon;
    return _pendingResult == won ? 0 : 1;
  }

  /// 当前一侧红条。
  BattleMorale morale(BattleSide side) =>
      side == BattleSide.attacker ? attackerMorale : defenderMorale;

  /// 初始碰撞强度，原版减员后不重算 1C/1D。
  int basePower(BattleSide side) => _kernel.ram[0x1c + _side(side)];
  int _side(BattleSide side) => side == BattleSide.attacker ? 0 : 1;

  /// 当前速度，单位为像素每秒。
  double chargeSpeed(BattleSide side) =>
      _kernel.velocity(_side(side)) / 256 * 60;

  /// 离自身边界的原生像素距离。
  double distanceToWall(BattleSide side) => side == BattleSide.attacker
      ? 208.0 - _kernel.ram[0x81]
      : _kernel.ram[0x83] - 8.0;

  /// 存活小兵数。
  int survivors(BattleSide side) => _kernel.ram[0x702f + _side(side)];

  /// 按编号读取单位。
  BattleUnit? unitById(String? id) =>
      units.where((unit) => unit.id == id).firstOrNull;

  /// 固定步长推进，返回是否需要刷新面板。
  bool advance(double dt) {
    if (!dt.isFinite || dt <= 0) return false;
    if (finished) {
      elapsed += dt;
      return false;
    }
    var changed = false;
    _accumulator += dt;
    while (_accumulator >= fixedStep - 1e-9) {
      _accumulator = math.max(0, _accumulator - fixedStep);
      elapsed += fixedStep;
      _ticks++;
      if (_weaponStrike != null) {
        final strike = _weaponStrike!;
        if (strike.frame < 0) {
          // 原 E690 在切札前把双方每帧退一像素回阵位，已有阵亡动作继续完成。
          final next = [
            for (var side = 0; side < 2; side++)
              _kernel.ram[0x81 + side * 2] +
                  (NesBattleKernel.initialFormationX[side] -
                          _kernel.ram[0x81 + side * 2])
                      .sign,
          ];
          _kernel.advanceWithdrawal(next);
          _syncMotion(_kernel.wallHits);
          if (next[0] == 200 && next[1] == 16 && !_kernel.falling) {
            strike.frame = 0;
          }
          changed = changed || _ticks % 6 == 0;
          continue;
        }
        strike.frame++;
        if (!strike.applied && strike.frame >= strike.weapon.animationFrames) {
          strike.applied = true;
          _kernel.applyWeaponDamage(
            strike.attackingSide ? 1 : 0,
            strike.weapon.damage,
          );
          if (strike.weapon.selfDamage > 0) {
            _kernel.applyWeaponDamage(
              strike.attackingSide ? 0 : 1,
              strike.weapon.selfDamage,
            );
          }
          _syncHealth();
          _weaponStrike = null;
          stage = _kernel.generalsAlive
              ? BattleStage.fighting
              : BattleStage.falling;
          changed = true;
        }
        changed = _ticks % 6 == 0 || changed;
        continue;
      }
      if (_retreat != null &&
          (stage == BattleStage.retreating || _retreat!.succeeded)) {
        final previousStage = stage;
        _advanceRetreat();
        changed = changed || _ticks % 6 == 0 || previousStage != stage;
        if (finished) {
          _accumulator = 0;
          break;
        }
        continue;
      }
      if (_ticks <= GameConfig.battleFormationFrames) continue;
      if (forming) {
        stage = BattleStage.fighting;
        changed = true;
      }
      final before = clashes;
      final pools = [_totalHp(0), _totalHp(1)];
      final walls = List<int>.of(_kernel.wallHits);
      for (final side in BattleSide.values) {
        final health = side == BattleSide.attacker
            ? attacker.general
            : defender.general;
        if (health.hp != _syncedHp[side]) {
          _kernel.setHeroHp(_side(side), health.hp.round());
        }
      }
      if (stage == BattleStage.ending) {
        _endingTicks++;
        if (_endingTicks >= _endingCompleteAt) _complete();
      } else if (stage == BattleStage.victory) {
        _endingTicks++;
        if (_kernel.advanceVictory(
          _pendingResult == BattleResult.attackerWon ? 0 : 1,
        )) {
          stage = BattleStage.ending;
          // DE4F 等的是走场开始时已播放的结束曲，不能走完后重新计时。
          _endingCompleteAt =
              math.max(nesBattleEndingCueFrames[_resultIndex], _endingTicks) +
              nesBattleEndingTailFrames;
          changed = true;
        }
      } else {
        _kernel.step(autoCharge: autoCharge);
        if (!_kernel.generalsAlive) {
          if (_kernel.falling) {
            changed |= stage != BattleStage.falling;
            stage = BattleStage.falling;
          } else {
            _beginVictory();
            changed = true;
          }
        }
      }
      _syncHealth();
      _syncMotion(walls);
      if (clashes != before) {
        lastClash = (
          attackerDamage: (pools[1] - _totalHp(1)).toDouble(),
          defenderDamage: (pools[0] - _totalHp(0)).toDouble(),
        );
        pushedSide = _kernel.velocity(0) == _kernel.velocity(1)
            ? null
            : _kernel.velocity(0) < _kernel.velocity(1)
            ? BattleSide.attacker
            : BattleSide.defender;
        for (final formation in formations.values) {
          formation.impactAt = elapsed;
        }
        for (final unit in units) {
          unit.lastAttackAt = elapsed;
        }
        changed = true;
      }
      changed = _ticks % 6 == 0 || changed;
      if (finished) {
        elapsed += _accumulator;
        _accumulator = 0;
        break;
      }
    }
    return changed;
  }

  /// 撤离时停止当前战斗，保留生命和兵力。
  void stop() {
    stopped = true;
    for (final formation in formations.values) {
      formation.moving = false;
      formation.motion = BattleMotion.halted;
    }
  }

  void _advanceRetreat() {
    _retreatElapsed += fixedStep;
    final progress = (_retreatElapsed / GameConfig.retreatExitSeconds).clamp(
      0.0,
      1.0,
    );
    final eased = progress * progress * (3 - 2 * progress);
    _kernel.advanceWithdrawal([
      for (var side = 0; side < 2; side++)
        (_retreatOrigins[side] +
                (NesBattleKernel.initialFormationX[side] -
                        _retreatOrigins[side]) *
                    eased)
            .round(),
    ]);
    for (final side in BattleSide.values) {
      final index = _side(side), formation = formations[side]!;
      final x = _kernel.ram[0x81 + index * 2] + (index == 0 ? 8.0 : 32.0);
      final distance = x - formation.frontX;
      formation.frontX = x;
      formation.walkDistance += distance.abs();
      formation.velocity = distance / fixedStep;
      formation.moving = distance != 0;
      formation.motion = progress < 1
          ? BattleMotion.recoiling
          : BattleMotion.halted;
    }
    if (progress == 1 && stage == BattleStage.retreating) {
      for (final unit in units) {
        unit._retreating = false;
      }
      if (!_retreat!.succeeded) {
        // 撤退失败时残兵也全军覆没，先用原版整队伤害启动小兵的弹地退场。
        _kernel.applyWeaponDamage(_side(_retreat!.side), 255);
        _kernel.setHeroHp(_side(_retreat!.side), 0);
        _syncHealth();
        _ticks = math.max(_ticks, GameConfig.battleFormationFrames);
        stage = BattleStage.falling;
        return;
      }
      stage = BattleStage.ending;
    }
    if (_retreatElapsed + 1e-9 >=
        GameConfig.retreatExitSeconds + GameConfig.retreatResultSeconds) {
      _complete();
    }
  }

  int _totalHp(int side) =>
      _kernel.ram[0x12 + side] + _kernel.ram[0x7451 + side];
  void _beginVictory() {
    _pendingResult = _kernel.ram[0x7451] == 0 && _kernel.ram[0x7452] == 0
        ? BattleResult.draw
        : _kernel.ram[0x7451] > 0
        ? BattleResult.attackerWon
        : BattleResult.defenderWon;
    _endingTicks = 0;
    _endingCompleteAt =
        nesBattleEndingCueFrames[_resultIndex] + nesBattleEndingTailFrames;
    stage = _pendingResult == BattleResult.draw
        ? BattleStage.ending
        : BattleStage.victory;
  }

  void _complete() {
    stage = BattleStage.complete;
    result = _pendingResult;
  }

  void _addArmy(BattleArmy army, BattleSide side) {
    units.add(
      BattleUnit._(
        id: army.id,
        name: army.name,
        side: side,
        slot: -1,
        health: army.general,
        attack: _combat(army),
        formation: formations[side]!,
        kernel: _kernel,
      ),
    );
    for (var i = 0; i < army.soldiers.length; i++) {
      if (!army.soldiers[i].alive) continue;
      units.add(
        BattleUnit._(
          id: '${army.id}-soldier-$i',
          name: '${army.name}部队士兵${i + 1}',
          side: side,
          slot: i,
          health: army.soldiers[i],
          attack: soldierAttack,
          formation: formations[side]!,
          kernel: _kernel,
        ),
      );
    }
  }

  void _syncHealth() {
    for (final side in BattleSide.values) {
      final index = _side(side);
      final army = side == BattleSide.attacker ? attacker : defender;
      army.general.hp = _kernel.ram[0x7451 + index];
      _syncedHp[side] = army.general.hp;
      var pool = _kernel.ram[0x12 + index];
      // 原版兵力属于整队，持久小兵生命只投影总量，下一场按兵数重建。
      for (var i = 0; i < army.soldiers.length; i++) {
        final alive = _kernel.ram[0x570 + index * 5 + i] & 128 != 0;
        final hp = alive ? math.min(soldierHp, pool) : 0;
        army.soldiers[i].hp = hp;
        pool -= hp;
      }
      final bar = morale(side);
      bar.remaining = _kernel.ram[0xae + index];
      bar.accumulated = _kernel.ram[index == 0 ? 0x0f : 0x19];
      bar.committed = _kernel.committed[index];
    }
    for (final unit in units) {
      if (!unit.health.alive && unit.diedAt == null) {
        unit.diedAt = elapsed;
        events.add('${unit.name}阵亡');
        if (events.length > 6) events.removeAt(0);
      }
    }
  }

  void _syncMotion(List<int> previousWalls) {
    for (final side in BattleSide.values) {
      final index = _side(side);
      final formation = formations[side]!;
      final x = _kernel.ram[0x81 + index * 2] + (index == 0 ? 8.0 : 32.0);
      final distance = (x - formation.frontX).abs();
      formation.frontX = x;
      formation.walkDistance += distance;
      formation.moving = distance > 0;
      formation.velocity = chargeSpeed(side);
      formation.motion =
          stage == BattleStage.complete ||
              stage == BattleStage.ending ||
              stage == BattleStage.falling
          ? BattleMotion.halted
          : formation.velocity < 0
          ? BattleMotion.recoiling
          : formation.velocity == 0
          ? BattleMotion.preparing
          : BattleMotion.charging;
      if (_kernel.wallHits[index] != previousWalls[index]) {
        formation.wallHitAt = elapsed;
      }
    }
  }
}
