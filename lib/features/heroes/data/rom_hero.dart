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

/// 英雄 JSON 静态定义，salary 为可调月俸，romSalary 保留原版报酬。
class RomHeroDefinition {
  /// 读取英雄属性与文件顺序，直接构造时默认按身份编号排序。
  RomHeroDefinition.fromJson(Map<String, dynamic> json, {int? rosterOrder})
    : id = json['id'] as int,
      rosterOrder = rosterOrder ?? json['id'] as int,
      name = json['name'] as String?,
      type = HeroType.values.byName(json['type'] as String),
      maxHp = json['maxHp'] as int,
      combat = json['combat'] as int,
      morale = _readMorale(json),
      nativeCountryId = _readNativeCountry(json),
      politics = json['politics'] as int,
      salary = _readSalary(json),
      romSalary = json['romSalary'] as int? ?? json['salary'] as int,
      eggCapable = json['eggCapable'] as bool,
      soldierLimit = json['soldierLimit'] as int;

  /// 原 ROM 编号，40 为主角。
  final int id;

  /// 第三张地图开局确定的专属国家；未登场英雄可没有专属归属。
  final int? nativeCountryId;

  /// 独立配置的开场士气，范围 0 到 100。
  final int morale;

  /// 专属国任职免费，其他国家按 JSON 的月俸支付。
  int salaryFor(int countryId) => nativeCountryId == countryId ? 0 : salary;

  /// 文件数组中的位置，只用于展示和守将选择，不替代英雄身份编号。
  final int rosterOrder;

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

  /// 其他国家聘用时的月俸金币，专属国任职不收费。
  final int salary;

  /// 原版提取的报酬，仅作分析对照，不参与游戏月结。
  final int romSalary;

  /// 是否具备召唤蛋能力。
  final bool eggCapable;

  /// 原版兵力上限，实际兵力另行管理。
  final int soldierLimit;
}

int _readSalary(Map<String, dynamic> json) {
  final salary = json['salary'];
  if (salary is! int || salary < 0) {
    throw FormatException('英雄 ${json['id']} 的 salary 必须为非负整数');
  }
  return salary;
}

int? _readNativeCountry(Map<String, dynamic> json) {
  final value = json['nativeCountryId'];
  if (value != null && (value is! int || value < 0)) {
    throw FormatException('英雄 ${json['id']} 的 nativeCountryId 必须为非负整数或 null');
  }
  return value as int?;
}

int _readMorale(Map<String, dynamic> json) {
  final value = json['morale'] ?? 50;
  if (value is! int || value < 0 || value > 100) {
    throw FormatException('英雄 ${json['id']} 的 morale 必须在 0 到 100 之间');
  }
  return value;
}

/// 读取 41 位正式英雄，拒绝重复编号和无效生命值。
List<RomHeroDefinition> decodeRomHeroes(String source) {
  final json = jsonDecode(source) as Map<String, dynamic>;
  final rows = json['heroes'] as List;
  final heroes = [
    for (var index = 0; index < rows.length; index++)
      RomHeroDefinition.fromJson(
        rows[index] as Map<String, dynamic>,
        rosterOrder: index,
      ),
  ];
  if (heroes.length != 41 ||
      heroes.map((hero) => hero.id).toSet().length != 41 ||
      heroes.any((hero) => hero.id < 0 || hero.id > 40 || hero.maxHp <= 0)) {
    throw const FormatException('英雄目录应包含 41 个有效的唯一编号');
  }
  return List.unmodifiable([
    ...heroes.where((hero) => hero.type == HeroType.protagonist),
    ...heroes.where((hero) => hero.type != HeroType.protagonist),
  ]);
}
