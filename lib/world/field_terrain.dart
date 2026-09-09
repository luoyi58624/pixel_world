import '../game_config.dart';
import 'world_data.dart';

/// 野战环境对双方将领使用相同的攻击倍率，不影响小兵攻击。
enum FieldTerrain {
  /// 草地、树林与普通地面上的遭遇战。
  grass('草地', GameConfig.grassHeroAttackFactor),

  /// 河流中的遭遇战。
  river('河流', GameConfig.riverHeroAttackFactor),

  /// 山地中的遭遇战。
  mountain('山地', GameConfig.mountainHeroAttackFactor);

  const FieldTerrain(this.label, this.heroAttackFactor);

  /// 地形的显示名称。
  final String label;

  /// 双方将领攻击保留的比例。
  final double heroAttackFactor;

  /// 根据相遇位置的行军地形选择野战环境。
  static FieldTerrain fromMovement(MovementTerrain terrain) =>
      switch (terrain) {
        MovementTerrain.water => river,
        MovementTerrain.mountain => mountain,
        MovementTerrain.plain || MovementTerrain.structure => grass,
      };
}
