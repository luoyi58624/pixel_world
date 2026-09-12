/// 玩家国使用的无界面策略，仅影响对比实验，不改变正式玩法。
enum CommanderStrategy {
  /// 基线策略，见 `commander.dart`。
  baseline,

  /// 容量优先、单将单城的对照策略，见 `commander_mine.dart`。
  capacityFirst,

  /// 正常征兵、补将和升级，只守城不出击。
  defenseOnly,

  /// 正式国家规划器指挥玩家国，仍在主角阵亡或无城时结束挑战。
  nationalAi,

  /// 筛选高战力候选、集中轮攻和合法止损的玩家征服策略。
  conquest,
}

/// 独立实验参数，不改变正式游戏规则或给 AI 提供未来信息。
class SimulationScenario {
  /// 每组固定地图、随机种子、游戏时长和倍速。
  const SimulationScenario({
    required this.worldId,
    required this.seed,
    this.seconds = 600,
    this.speed = 16,
    this.deterministic = true,
    this.playerCommander = false,
    this.commanderStrategy = CommanderStrategy.baseline,
  });

  /// 地图与可复现种子。
  final int worldId, seed;

  /// 最长游戏秒数。
  final int seconds;

  /// 通过同一游戏时钟推进的倍速。
  final int speed;

  /// 测试显式选择确定性后端；正式界面仍使用常驻后台。
  final bool deterministic;

  /// 通过正式游戏命令控制玩家，并启用主角阵亡与失城失败规则。
  final bool playerCommander;

  /// 玩家国使用的策略，仅用于无界面对照。
  final CommanderStrategy commanderStrategy;
}
