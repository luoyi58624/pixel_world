import 'dart:convert';

/// 从原版切札表提取的一次性武器，金币与效果可在 JSON 中调整。
class WeaponDefinition {
  /// 读取并校验单件武器，伤害保持原版单字节范围。
  WeaponDefinition.fromJson(Map<String, dynamic> data)
    : id = _number(data, 'id', 0, 255),
      name = data['name'] as String,
      price = _number(data, 'price', 0, 9999),
      damage = _number(data, 'damage', 1, 255),
      selfDamage = _number(data, 'selfDamage', 0, 255),
      effectId = _number({'effectId': data['id'], ...data}, 'effectId', 0, 14),
      animationFrames = _number(
        {'animationFrames': 60, ...data},
        'animationFrames',
        1,
        3000,
      ),
      minimumCities = _number(data, 'minimumCities', 1, 16),
      shopEnabled = data['shopEnabled'] as bool {
    if (name.trim().isEmpty) throw const FormatException('武器名称不能为空');
  }

  /// 原武器编号，与英雄身份编号分开。
  final int id;

  /// 武器名称。
  final String name;

  /// 购买一件的金币数。
  final int price;

  /// 对敌方整队造成的直接伤害，优先由小兵吸收。
  final int damage;

  /// 使用后对己方整队造成的反噬，死枪原值为 255。
  final int selfDamage;

  /// 对应原 ROM 的动画脚本编号。
  final int effectId;

  /// 原动画从开始到结算伤害的帧数，不含回到阵位的准备动作。
  final int animationFrames;

  /// 商店解锁所需的本国城池数。
  final int minimumCities;

  /// 原版三种事件武器不在普通商店销售，可通过初始库存配置取得。
  final bool shopEnabled;

  /// 紧凑的武器作用说明。
  String get effectLabel => selfDamage == 0
      ? '伤害 $damage'
      : selfDamage == damage
      ? '双方 $damage 伤害'
      : '伤害 $damage，反噬 $selfDamage';
}

/// 各地图共享静态武器目录，实际库存由各自战役维护。
class WeaponCatalog {
  const WeaponCatalog._(
    this.weapons,
    this.carryLimit,
    this.initialCountryStock,
  );

  /// 简化测试地图可不启用武器系统。
  static const empty = WeaponCatalog._({}, 3, {});

  /// 读取配置，拒绝重复编号、非法库存及超出原版的携带上限。
  factory WeaponCatalog.decode(String source) {
    final data = jsonDecode(source) as Map<String, dynamic>;
    final limit = _number(data, 'carryLimit', 1, 3);
    final weapons = <int, WeaponDefinition>{};
    for (final row in data['weapons'] as List) {
      final weapon = WeaponDefinition.fromJson(row as Map<String, dynamic>);
      if (weapons.containsKey(weapon.id)) {
        throw FormatException('武器编号 ${weapon.id} 重复');
      }
      weapons[weapon.id] = weapon;
    }
    final stock = <int, Map<int, int>>{};
    for (final country
        in (data['initialCountryStock'] as Map<String, dynamic>? ?? {})
            .entries) {
      final id = int.tryParse(country.key);
      if (id == null || id < 0 || id > 15) {
        throw const FormatException('武器库存国家编号无效');
      }
      final values = <int, int>{};
      for (final item in (country.value as Map<String, dynamic>).entries) {
        final weaponId = int.tryParse(item.key);
        final amount = item.value;
        if (!weapons.containsKey(weaponId) || amount is! int || amount < 0) {
          throw const FormatException('初始武器库存无效');
        }
        values[weaponId!] = amount;
      }
      stock[id] = Map.unmodifiable(values);
    }
    return WeaponCatalog._(
      Map.unmodifiable(weapons),
      limit,
      Map.unmodifiable(stock),
    );
  }

  /// 按原编号查找武器。
  final Map<int, WeaponDefinition> weapons;

  /// 一位将领的携带上限，默认三件。
  final int carryLimit;

  /// 每张地图初始化时复制的国家库存，可配置原版事件武器。
  final Map<int, Map<int, int>> initialCountryStock;
}

int _number(Map<String, dynamic> data, String key, int min, int max) {
  final value = data[key];
  if (value is! int || value < min || value > max) {
    throw FormatException('武器 $key 必须为 $min 到 $max 的整数');
  }
  return value;
}

/// 单次武器动作，命令先消耗库存，后台在命中帧统一结算伤害。
class WeaponStrike {
  /// 记录动作所属一侧和开始时刻。
  WeaponStrike(
    this.weapon, {
    required this.attackingSide,
    required this.startedAt,
    required this.visibleActors,
  });

  /// 实际使用的武器定义。
  final WeaponDefinition weapon;

  /// 是否为画面右侧部队使用。
  final bool attackingSide;

  /// 战斗时钟中的开始秒数。
  final double startedAt;

  /// 开始演出时的存活槽位，避免原脚本把已经阵亡的小兵画回来。
  final int visibleActors;

  /// -1 表示双方正在退回阵位，非负值对应原动画时间线。
  int frame = -1;

  /// 是否已经结算，防止跨帧重复伤害。
  bool applied = false;
}
