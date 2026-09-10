/// 独立实验参数，不改变正式游戏规则或给 AI 提供未来信息。
class SimulationScenario {
  /// 每组固定地图、随机种子、游戏时长和倍速。
  const SimulationScenario({
    required this.worldId,
    required this.seed,
    this.seconds = 600,
    this.speed = 16,
    this.deterministic = true,
  });

  /// 地图与可复现种子。
  final int worldId, seed;

  /// 最长游戏秒数。
  final int seconds;

  /// 通过同一游戏时钟推进的倍速。
  final int speed;

  /// 测试显式选择确定性后端；正式界面仍使用常驻后台。
  final bool deterministic;
}
