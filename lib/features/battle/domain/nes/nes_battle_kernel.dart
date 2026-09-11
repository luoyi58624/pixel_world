import 'dart:typed_data';

import 'nes_battle_bytes.dart';

/// 执行从 ROM 提取的普通拼杀片段；不模拟整台 NES，也不依赖外部模拟器。
class NesBattleKernel {
  static final _romImage = () {
    final bytes = Uint8List(65536);
    for (final entry in nesBattleBlocks.entries) {
      for (var i = 0; i < entry.value.length; i += 2) {
        bytes[entry.key + i ~/ 2] = int.parse(
          entry.value.substring(i, i + 2),
          radix: 16,
        );
      }
    }
    return bytes;
  }();

  /// 只记录可变内存与寄存器，不在每个回放帧中重复保存 ROM。
  Map<String, dynamic>? _frozenSnapshot;

  /// 已结束的战斗内核不会再变化，不再每次扫描整段内存。
  Map<String, dynamic> saveState({bool frozen = false}) {
    if (frozen && _frozenSnapshot != null) return _frozenSnapshot!;
    final value = <String, dynamic>{
      'ram': {
        for (var i = 0; i < ram.length; i++)
          if (ram[i] != _romImage[i]) '$i': ram[i],
      },
      'registers': [
        frames,
        clashes,
        ...wallHits,
        ...committed,
        _attackerChargePhase,
        _attackerChargeClock,
        _a,
        _x,
        _y,
        _p,
        _pc,
        _sp,
      ],
    };
    if (frozen) _frozenSnapshot = value;
    return value;
  }

  /// 原位恢复战斗内核，单位继续引用同一个内存对象。
  void restoreState(Map<String, dynamic> data) {
    _frozenSnapshot = null;
    ram.setAll(0, _romImage);
    (data['ram'] as Map).forEach((key, value) {
      ram[int.parse(key as String)] = value as int;
    });
    final r = (data['registers'] as List).cast<int>();
    frames = r[0];
    clashes = r[1];
    wallHits.setAll(0, r.sublist(2, 4));
    committed.setAll(0, r.sublist(4, 6));
    _attackerChargePhase = r[6];
    _attackerChargeClock = r[7];
    _a = r[8];
    _x = r[9];
    _y = r[10];
    _p = r[11];
    _pc = r[12];
    _sp = r[13];
    _refreshSoldierPower();
  }

  /// ROM 固定的每兵共享生命，对应 E4B5 减员阈值。
  static const soldierHp = 20;

  /// 每名存活士兵提供一点碰撞强度，阵亡立即扣除。
  static const soldierPower = 1;

  /// 双方开场阵形锚点，顺序为右军、左军。
  static const initialFormationX = [200, 16];

  /// 输入顺序为右军、左军，属性必须处于原版单字节范围内。
  NesBattleKernel({
    required List<int> attack,
    required List<int> hp,
    required List<List<int>> slots,
    required int seed,
    List<int>? moraleAttack,
    List<int>? initialMorale,
    this.recoilDifferenceScale = 1,
    this.wallDamageScale = 1,
    this.originalSoldierRules = false,
  }) {
    if (!recoilDifferenceScale.isFinite ||
        recoilDifferenceScale < 0 ||
        !wallDamageScale.isFinite ||
        wallDamageScale < 0) {
      throw ArgumentError('击退与撞墙倍率必须是非负有限数');
    }
    for (final entry in nesBattleBlocks.entries) {
      final hex = entry.value;
      for (var i = 0; i < hex.length; i += 2) {
        ram[entry.key + i ~/ 2] = int.parse(hex.substring(i, i + 2), radix: 16);
      }
    }
    ram[0x81] = initialFormationX[0];
    ram[0x83] = initialFormationX[1];
    ram[0x0e] = 255;
    for (var i = 0; i < 3; i++) {
      ram[0xd0 + i] = seed >> (8 * i) & 255;
    }
    for (var side = 0; side < 2; side++) {
      if (attack[side] < 0 ||
          attack[side] > 63 ||
          hp[side] < 0 ||
          hp[side] > 255 ||
          slots[side].length > 4 ||
          slots[side].toSet().length != slots[side].length ||
          slots[side].any((slot) => slot < 0 || slot > 3)) {
        throw ArgumentError('战斗属性或槽位超出原版普通将领范围');
      }
      ram[0x244 + side] = side;
      ram[0x81ac + side] = attack[side];
      ram[0x7451 + side] = hp[side];
      ram[0x702f + side] = slots[side].length;
      ram[0x12 + side] = slots[side].length * soldierHp;
      for (final slot in [...slots[side], if (hp[side] > 0) 4]) {
        ram[0x570 + side * 5 + slot] = 128;
      }
      _call(0xe1d8, x: side);
      // 城防只修正碰撞强度；红条仍让原 E1C6 按独立的英雄属性初始化。
      final strength = ram[0x1a + side];
      if (moraleAttack != null) {
        if (moraleAttack.length != 2 ||
            moraleAttack[side] < 0 ||
            moraleAttack[side] > 63) {
          throw ArgumentError('士气属性超出原版范围');
        }
        ram[0x1a + side] = moraleAttack[side];
      }
      _call(0xe1c6, x: side);
      if (initialMorale != null) {
        if (initialMorale.length != 2 ||
            initialMorale[side] < 0 ||
            initialMorale[side] > 100) {
          throw ArgumentError('独立士气必须位于 0 到 100');
        }
        ram[0xae + side] = initialMorale[side];
      }
      ram[0x1a + side] = strength;
      _call(0xe758, x: side);
    }
    _refreshSoldierPower();
  }

  /// 仅供原 ROM 逐帧对照测试保留开场每兵两点且不随减员变化的旧规则。
  final bool originalSoldierRules;

  // 保留将领与城防基础值，只重算存活兵员；不能影响正在执行的寄存器和进位。
  void _refreshSoldierPower() {
    if (originalSoldierRules) return;
    for (var side = 0; side < 2; side++) {
      ram[0x1c + side] = ram[0x1a + side] + ram[0x702f + side] * soldierPower;
    }
  }

  /// 每场独立 RAM，状态不与其他城池的后台战斗混用。
  final Uint8List ram = Uint8List(65536);

  /// 强度差进入反弹查表前的倍率；1 保持原始 ROM，较小值平滑少量属性差。
  final double recoilDifferenceScale;

  /// 撞墙输入强度的倍率；1 保持原版双倍强度，0.5 等于一次普通接触强度。
  final double wallDamageScale;

  /// 已执行的逻辑帧数。
  int frames = 0;

  /// 累计接触次数。
  int clashes = 0;

  /// 双方累计撞墙次数，顺序为右、左。
  final wallHits = [0, 0];

  /// 最近碰撞投入的红条积累，顺序为右、左。
  final committed = [0, 0];

  int _attackerChargePhase = 0;
  int _attackerChargeClock = 0;

  /// 双方将领是否都存活，从而允许继续普通拼杀。
  bool get generalsAlive => ram[0x574] & ram[0x579] & 128 != 0;

  /// 阵亡角色还在飞出或弹地时，延后战役结算。
  bool get falling {
    for (var i = 0; i < 10; i++) {
      if (ram[0x570 + i] & 64 != 0) return true;
    }
    return false;
  }

  /// 按主循环 DCE5 的顺序更新双方运动、死亡动画及 OAM 位置。
  void step({bool chargeHeld = false, bool autoCharge = false}) {
    ram[0x42] = chargeHeld ? 128 : 0;
    if (generalsAlive) {
      // 首帧承接 E1C4 的 CLC；之后 DD08 的 ASL 将存活位移入进位。
      _p = frames == 0 ? 0x30 : 0x31;
      if (autoCharge) {
        _advanceAttackerCharge();
        ram[0x42] = 0;
      }
      _call(0xe4c4);
      _call(0xe55c);
    }
    _call(0xdc21);
    _call(0xe758, x: 0);
    _call(0xe758, x: 1);
    frames++;
  }

  // 复用原左军 E55C–E586 的随机节奏与扣除指令，临时映射到右军独立状态。
  // 左军仍执行完整原代码；不改写 ROM，也不额外叠加按键带来的三点积累。
  void _advanceAttackerCharge() {
    final phase = ram[0x17], clock = ram[0x18];
    final accumulated = ram[0x19], remaining = ram[0xaf];
    ram[0x17] = _attackerChargePhase;
    ram[0x18] = _attackerChargeClock;
    ram[0x19] = ram[0x0f];
    ram[0xaf] = ram[0xae];
    _call(0xe55c, stopBefore: 0xe587);
    _attackerChargePhase = ram[0x17];
    _attackerChargeClock = ram[0x18];
    ram[0x0f] = ram[0x19];
    ram[0xae] = ram[0xaf];
    ram[0x17] = phase;
    ram[0x18] = clock;
    ram[0x19] = accumulated;
    ram[0xaf] = remaining;
  }

  /// 将原版速度字解释为有符号 8.8 定点数。
  int velocity(int side) {
    final raw = ram[0x84 + side * 2] | ram[0x85 + side * 2] << 8;
    return raw >= 32768 ? raw - 65536 : raw;
  }

  /// 撤退时只移动阵形并推进已有死亡动画，不再消耗士气或触发碰撞。
  void advanceWithdrawal(List<int> positions) {
    if (positions.length != 2 || positions.any((x) => x < 0 || x > 255)) {
      throw ArgumentError('撤退阵形坐标无效');
    }
    ram[0x0e] = 255;
    for (var side = 0; side < 2; side++) {
      ram[0x80 + side * 2] = 0;
      ram[0x81 + side * 2] = positions[side];
      ram[0x84 + side * 2] = 0;
      ram[0x85 + side * 2] = 0;
    }
    _call(0xdc21);
    _call(0xe758, x: 0);
    _call(0xe758, x: 1);
  }

  /// 战役修改将领生命时同步，并沿用原版阵亡状态初始化。
  void setHeroHp(int side, int hp) {
    ram[0x7451 + side] = hp.clamp(0, 255);
    if (hp <= 0 && ram[0x574 + side * 5] & 128 != 0) {
      ram[0x4a] = side;
      _y = side;
      _call(0xe488, x: side);
    }
  }

  /// 执行原版切札调用的 E40C，直接扣整队兵力并将溢出交给将领。
  void applyWeaponDamage(int side, int damage) {
    if (side < 0 || side > 1 || damage < 0 || damage > 255) {
      throw ArgumentError('武器伤害超出原版范围');
    }
    _a = damage;
    _call(0xe40c, x: side);
  }

  /// E6B2/E6C9 的胜方过场：整队每帧走一像素，抵达对侧后才显示结果。
  bool advanceVictory(int side) {
    ram[0x0e] = 255;
    final address = side == 0 ? 0x81 : 0x83;
    final done = side == 0 ? ram[address] < 17 : ram[address] >= 200;
    if (!done) ram[address] += side == 0 ? -1 : 1;
    _call(0xe758, x: side);
    if (done) ram[0x0e] = 0;
    return done;
  }

  /// 导出参与逐帧校验的计算状态，顺序与 py65 对照工具一致。
  List<int> snapshot() => [
    ...ram.sublist(0x80, 0x88),
    ...ram.sublist(0x12, 0x1a),
    ...ram.sublist(0xae, 0xb0),
    ...ram.sublist(0x7451, 0x7453),
    ...ram.sublist(0xd0, 0xd3),
    ram[0x0e],
    ram[0x0f],
    clashes,
    ...wallHits,
    for (final base in [0x570, 0x590, 0x5c0, 0x5d0, 0x5e0, 0x5f0, 0x600, 0x610])
      ...ram.sublist(base, base + 10),
  ];

  int _a = 0, _x = 0, _y = 0, _p = 0x30, _pc = 0, _sp = 255;
  int get _carry => _p & 1;
  void _setCarry(bool value) => _p = (_p & ~1) | (value ? 1 : 0);
  int _nz(int value) {
    value &= 255;
    _p = (_p & ~0x82) | (value & 128) | (value == 0 ? 2 : 0);
    return value;
  }

  int _byte() => ram[_pc++];
  int _word() => _byte() | _byte() << 8;
  void _push(int value) {
    ram[0x100 + _sp] = value;
    _sp = (_sp - 1) & 255;
  }

  int _pop() {
    _sp = (_sp + 1) & 255;
    return ram[0x100 + _sp];
  }

  void _adc(int value) {
    final sum = _a + value + _carry;
    _p = (_p & ~0x40) | ((~(_a ^ value) & (_a ^ sum) & 128) >> 1);
    _setCarry(sum > 255);
    _a = _nz(sum);
  }

  void _cmp(int a, int b) {
    _setCarry(a >= b);
    _nz(a - b);
  }

  int _lsr(int value) {
    _setCarry(value & 1 != 0);
    return _nz(value >> 1);
  }

  int _asl(int value) {
    _setCarry(value & 128 != 0);
    return _nz(value << 1);
  }

  int _ror(int value) {
    final carry = _carry;
    _setCarry(value & 1 != 0);
    return _nz((value >> 1) | carry << 7);
  }

  int _rol(int value) {
    final carry = _carry;
    _setCarry(value & 128 != 0);
    return _nz((value << 1) | carry);
  }

  void _branch(bool condition) {
    final offset = _byte();
    if (condition) _pc = (_pc + (offset < 128 ? offset : offset - 256)) & 65535;
  }

  void _bit(int value) =>
      _p = (_p & ~0xc2) | (value & 0xc0) | (_a & value == 0 ? 2 : 0);

  void _call(int address, {int? x, int? stopBefore}) {
    if (x != null) _x = x;
    _pc = address;
    _sp = 255;
    _push(0x5f);
    _push(0xff);
    for (var budget = 0; budget < 40000; budget++) {
      if (_pc == 0x6000 || _pc == stopBefore) return;
      if (_pc == 0xcf49 || _pc == 0xe8f3) {
        // 战役归属由 Campaign 管理；OAM 绘制由 Flutter 读取同一份槽位状态。
        _pc = (_pop() | _pop() << 8) + 1;
        continue;
      }
      if (_pc == 0xe3b8) {
        clashes++;
        committed[0] = ram[0x0f];
        committed[1] = ram[0x19];
      } else if (_pc == 0xe54b) {
        wallHits[0]++;
      } else if (_pc == 0xe5e4) {
        wallHits[1]++;
      }
      // 只调整新游戏的数值入口，保留反弹、减速、回冲与阵亡的原始指令。
      if (_pc == 0xe649 && recoilDifferenceScale != 1) {
        _a = (_x + (_a - _x) * recoilDifferenceScale).round().clamp(0, 255);
      }
      if ((_pc == 0xe54e || _pc == 0xe5e7) && wallDamageScale != 1) {
        _a = _nz((_a * wallDamageScale).round().clamp(0, 255));
      }
      final opcode = _byte();
      switch (opcode) {
        case 0x09:
          _a = _nz(_a | _byte());
        case 0x05:
          _a = _nz(_a | ram[_byte()]);
        case 0x0d:
          _a = _nz(_a | ram[_word()]);
        case 0x0a:
          _a = _asl(_a);
        case 0x06:
          final p = _byte();
          ram[p] = _asl(ram[p]);
        case 0x10:
          _branch(_p & 128 == 0);
        case 0x18:
          _setCarry(false);
        case 0x20:
          final p = _word();
          _push((_pc - 1) >> 8);
          _push(_pc - 1);
          _pc = p;
        case 0x24:
          _bit(ram[_byte()]);
        case 0x2c:
          _bit(ram[_word()]);
        case 0x29:
          _a = _nz(_a & _byte());
        case 0x2a:
          _a = _rol(_a);
        case 0x26:
          final p = _byte();
          ram[p] = _rol(ram[p]);
        case 0x30:
          _branch(_p & 128 != 0);
        case 0x38:
          _setCarry(true);
        case 0x45:
          _a = _nz(_a ^ ram[_byte()]);
        case 0x46:
          final p = _byte();
          ram[p] = _lsr(ram[p]);
        case 0x48:
          _push(_a);
        case 0x49:
          _a = _nz(_a ^ _byte());
        case 0x4a:
          _a = _lsr(_a);
        case 0x4c:
          _pc = _word();
        case 0x60:
          _pc = (_pop() | _pop() << 8) + 1;
        case 0x65:
          _adc(ram[_byte()]);
        case 0x66:
          final p = _byte();
          ram[p] = _ror(ram[p]);
        case 0x68:
          _a = _nz(_pop());
        case 0x69:
          _adc(_byte());
        case 0x6a:
          _a = _ror(_a);
        case 0x6d:
          _adc(ram[_word()]);
        case 0x75:
          _adc(ram[(_byte() + _x) & 255]);
        case 0x7d:
          _adc(ram[(_word() + _x) & 65535]);
        case 0x84:
          ram[_byte()] = _y;
        case 0x85:
          ram[_byte()] = _a;
        case 0x86:
          ram[_byte()] = _x;
        case 0x88:
          _y = _nz(_y - 1);
        case 0x8a:
          _a = _nz(_x);
        case 0x90:
          _branch(_carry == 0);
        case 0x94:
          ram[(_byte() + _x) & 255] = _y;
        case 0x95:
          ram[(_byte() + _x) & 255] = _a;
        case 0x98:
          _a = _nz(_y);
        case 0x99:
          ram[(_word() + _y) & 65535] = _a;
        case 0x9d:
          ram[(_word() + _x) & 65535] = _a;
        case 0xa0:
          _y = _nz(_byte());
        case 0xa2:
          _x = _nz(_byte());
        case 0xa4:
          _y = _nz(ram[_byte()]);
        case 0xa5:
          _a = _nz(ram[_byte()]);
        case 0xa6:
          _x = _nz(ram[_byte()]);
        case 0xa8:
          _y = _nz(_a);
        case 0xa9:
          _a = _nz(_byte());
        case 0xaa:
          _x = _nz(_a);
        case 0xad:
          _a = _nz(ram[_word()]);
        case 0xb0:
          _branch(_carry != 0);
        case 0xb5:
          _a = _nz(ram[(_byte() + _x) & 255]);
        case 0xb9:
          _a = _nz(ram[(_word() + _y) & 65535]);
        case 0xbc:
          _y = _nz(ram[(_word() + _x) & 65535]);
        case 0xbd:
          _a = _nz(ram[(_word() + _x) & 65535]);
        case 0xc0:
          _cmp(_y, _byte());
        case 0xc6:
          final p = _byte();
          ram[p] = _nz(ram[p] - 1);
        case 0xc9:
          _cmp(_a, _byte());
        case 0xca:
          _x = _nz(_x - 1);
        case 0xd0:
          _branch(_p & 2 == 0);
        case 0xd9:
          _cmp(_a, ram[(_word() + _y) & 65535]);
        case 0xdd:
          _cmp(_a, ram[(_word() + _x) & 65535]);
        case 0xde:
          final p = (_word() + _x) & 65535;
          ram[p] = _nz(ram[p] - 1);
          // 普通碰撞、撞墙和武器共用减员指令，同帧后续计算必须读到新强度。
          if (p == 0x702f || p == 0x7030) _refreshSoldierPower();
        case 0xe0:
          _cmp(_x, _byte());
        case 0xe5:
          _adc(ram[_byte()] ^ 255);
        case 0xe6:
          final p = _byte();
          ram[p] = _nz(ram[p] + 1);
        case 0xe8:
          _x = _nz(_x + 1);
        case 0xe9:
          _adc(_byte() ^ 255);
        case 0xf0:
          _branch(_p & 2 != 0);
        case 0xfd:
          _adc(ram[(_word() + _x) & 65535] ^ 255);
        case 0xfe:
          final p = (_word() + _x) & 65535;
          ram[p] = _nz(ram[p] + 1);
        default:
          throw StateError(
            '未提取的战斗指令 ${opcode.toRadixString(16)} @${(_pc - 1).toRadixString(16)}',
          );
      }
    }
    throw StateError('普通战斗指令执行超出预算');
  }
}
