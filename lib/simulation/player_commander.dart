import '../features/campaign/domain/campaign.dart';

/// 无界面玩家策略的公共接口，进攻与纯防守实验共用正式命令和可复核记录。
abstract class PlayerCommander {
  /// 依据当前可见状态下达一批合法命令。
  void decide(CampaignState campaign, int second);

  /// 已执行的命令，用于复核征服过程。
  List<Map<String, Object?>> get commands;
}
