import 'dart:convert';

/// 将领类型是独立领域数据，不能以主角编号或图片文件名代替。
enum HeroType {
  /// 原版编号 0–9 的高级将领。
  advanced('高级将领'),

  /// 原版编号 10–39 的普通将领。
  normal('普通将领'),

  /// 有独立初始化类型位的玩家主角。
  protagonist('主角');

  const HeroType(this.label);

  /// 界面显示的类型名称。
  final String label;
}

/// ROM 提取的静态英雄属性，不包含战斗中的可变状态。
class RomHeroDefinition {
  /// 从提取记录读取属性。
  RomHeroDefinition.fromJson(Map<String, dynamic> json)
    : id = json['id'] as int,
      name = json['name'] as String?,
      type = HeroType.values.byName(json['type'] as String),
      maxHp = json['maxHp'] as int,
      combat = json['combat'] as int,
      politics = json['politics'] as int,
      salary = json['salary'] as int,
      eggCapable = json['eggCapable'] as bool,
      soldierLimit = json['soldierLimit'] as int;

  /// 原 ROM 编号，40 为主角。
  final int id;

  /// 字模转写的名字，主角的固定 ROM 名字为空。
  final String? name;

  /// 从原版类型初始化流程提取的将领类型。
  final HeroType type;

  /// 生命上限。
  final int maxHp;

  /// 战斗能力。
  final int combat;

  /// 内政能力。
  final int politics;

  /// 每回合报酬。
  final int salary;

  /// 是否具备召唤蛋能力。
  final bool eggCapable;

  /// 原版兵力上限，实际兵力另行管理。
  final int soldierLimit;
}

/// 读取 41 位正式英雄，拒绝重复编号和无效生命值。
List<RomHeroDefinition> decodeRomHeroes(String source) {
  final json = jsonDecode(source) as Map<String, dynamic>;
  final heroes = (json['heroes'] as List)
      .map((item) => RomHeroDefinition.fromJson(item as Map<String, dynamic>))
      .toList();
  if (heroes.length != 41 ||
      heroes.map((hero) => hero.id).toSet().length != 41 ||
      heroes.any((hero) => hero.id < 0 || hero.id > 40 || hero.maxHp <= 0)) {
    throw const FormatException('英雄目录应包含 41 个有效的唯一编号');
  }
  return List.unmodifiable(heroes);
}
