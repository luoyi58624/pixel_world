import 'dart:typed_data';

import 'config.dart';
import 'geometry.dart';
import '../battle/domain/combat_rules.dart';

/// 只含公开数值的武器定义。
class AiWeapon {
  /// 保存实际价格、伤害、自伤、门槛与演出时长。
  const AiWeapon(
    this.id,
    this.price,
    this.damage,
    this.selfDamage,
    this.unlockYear,
    this.shopEnabled,
    this.seconds,
  );

  /// 武器属性。
  final int id, price, damage, selfDamage, unlockYear;
  final bool shopEnabled;
  final double seconds;

  /// 简洁序列化。
  List<Object> toJson() => [
    id,
    price,
    damage,
    selfDamage,
    unlockYear,
    shopEnabled,
    seconds,
  ];

  /// 解码武器。
  factory AiWeapon.fromJson(List<dynamic> d) =>
      AiWeapon(d[0], d[1], d[2], d[3], d[4], d[5], (d[6] as num).toDouble());
}

/// 初始化时下发一次的实际规则，核心不读取 Flutter 资源或战斗内核。
class AiRules {
  /// 规则数值由主环境统一适配。
  AiRules({
    required this.version,
    required Map<String, num> values,
    required List<int> upgradeCosts,
    required List<int> defenseBonuses,
    required List<double> movementFactors,
    required List<double> fieldFactors,
    List<AiWeapon> weapons = const [],
    this.tuning = const AiTuning(),
  }) : values = Map.unmodifiable(values),
       upgradeCosts = List.unmodifiable(upgradeCosts),
       defenseBonuses = List.unmodifiable(defenseBonuses),
       movementFactors = List.unmodifiable(movementFactors),
       fieldFactors = List.unmodifiable(fieldFactors),
       weapons = Map.unmodifiable({for (final w in weapons) w.id: w});

  /// 解码规则。
  factory AiRules.fromJson(Map<String, dynamic> d) => AiRules(
    version: d['version'],
    values: Map<String, num>.from(d['values']),
    upgradeCosts: List<int>.from(d['upgrades']),
    defenseBonuses: List<int>.from(d['defenseBonuses']),
    movementFactors: [for (final v in d['movement']) (v as num).toDouble()],
    fieldFactors: [for (final v in d['field']) (v as num).toDouble()],
    weapons: [for (final v in d['weapons']) AiWeapon.fromJson(v)],
    tuning: AiTuning.fromJson(Map<String, dynamic>.from(d['tuning'])),
  );

  /// 规则指纹，不匹配的回复不能落地。
  final String version;

  /// 纯数值配置及升级价格。
  final Map<String, num> values;
  final List<int> upgradeCosts;

  /// 实际城防一至五级的攻击加成，随初始化消息传入后台。
  final List<int> defenseBonuses;

  /// 按平地、水、山、建筑排列的行军与野战倍率。
  final List<double> movementFactors, fieldFactors;

  /// 武器目录和策略预算。
  final Map<int, AiWeapon> weapons;
  final AiTuning tuning;

  /// 读取小数配置。
  double number(String key) => values[key]!.toDouble();

  /// 读取整数配置。
  int integer(String key) => values[key]!.toInt();

  /// 与真实开场一致的士气，城防仅作用于守方且总值不超过100。
  int morale(int base, {int defenseLevel = 0}) =>
      (base +
              (defenseLevel > 0
                  ? (values['cityMoraleBonus${defenseLevel.clamp(1, 5)}']
                            ?.toInt() ??
                        0)
                  : 0))
          .clamp(0, 100);

  /// 使用与实际战斗相同的纯属性规则。
  int attack(
    int combat, {
    int terrain = 0,
    int defenseLevel = 0,
    bool field = true,
  }) =>
      (CombatRules.heroAttack(combat, field ? fieldFactors[terrain] : 1) +
              (defenseLevel > 0
                  ? CombatRules.defenseBonus(defenseLevel, defenseBonuses)
                  : 0))
          .clamp(0, 63);

  /// 实际升级折扣，已经满级时无报价。
  int? upgradeCost(int level, int politics) => level > upgradeCosts.length
      ? null
      : (upgradeCosts[level - 1] - politics).clamp(0, 99999);

  /// 当前年份允许的新城防等级，按同一份初始化规则限制复合升级方案。
  int cityUpgradeLimit(int year) =>
      ((values['firstYearCityLevel'] ?? integer('maxLevel')).toInt() +
              (year - (values['initialYear'] ?? 1).toInt()).clamp(
                    0,
                    integer('maxLevel'),
                  ) *
                  (values['cityLevelsPerYear'] ?? 1).toInt())
          .clamp(1, integer('maxLevel'));

  /// 序列化初始化消息。
  Map<String, Object?> toJson() => {
    'version': version,
    'values': values,
    'upgrades': upgradeCosts,
    'defenseBonuses': defenseBonuses,
    'movement': movementFactors,
    'field': fieldFactors,
    'weapons': [for (final w in weapons.values) w.toJson()],
    'tuning': tuning.toJson(),
  };
}

/// 本地图的地形编号，后台只接收一次，不发送贴图或真实对象。
class AiMap {
  /// 创建地形快照。
  AiMap(this.version, this.width, this.height, List<int> terrain)
    : terrain = Uint8List.fromList(terrain) {
    if (width <= 0 || height <= 0 || terrain.length != width * height) {
      throw const FormatException('AI 地图尺寸无效');
    }
  }

  /// 解码地形。
  factory AiMap.fromJson(Map<String, dynamic> d) => AiMap(
    d['version'],
    d['width'],
    d['height'],
    List<int>.from(d['terrain']),
  );

  /// 地图指纹及格数。
  final String version;
  final int width, height;

  /// 地形索引，仅规划器持有这份复制的数据。
  final Uint8List terrain;

  /// 读取当前位置的地形。
  int at(AiPoint p) =>
      terrain[(p.y / 16).floor().clamp(0, height - 1) * width +
          (p.x / 16).floor().clamp(0, width - 1)];

  /// 判断位置可合法下令。
  bool contains(AiPoint p) =>
      p.x.isFinite &&
      p.y.isFinite &&
      p.x >= 0 &&
      p.y >= 0 &&
      p.x < width * 16 &&
      p.y < height * 16;

  /// 序列化一次性初始化数据。
  Map<String, Object?> toJson() => {
    'version': version,
    'width': width,
    'height': height,
    'terrain': terrain,
  };
}
