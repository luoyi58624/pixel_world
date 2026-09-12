import '../../../core/config/game_config.dart';
import '../data/rom_hero.dart';

/// 已付抽取费、尚未签收的唯一英雄；放弃按内政返还金币但不恢复月度机会。
class RecruitmentOffer {
  /// 锁定本次抽取的英雄、招募城池和月俸报价。
  const RecruitmentOffer({
    required this.hero,
    required this.cityId,
    required this.countryId,
    required this.initialSalary,
    required this.drawnMonth,
  });

  /// 从回收池中暂时取出的静态英雄资料。
  final RomHeroDefinition hero;

  /// 签约后进驻的城池。
  final int cityId;

  /// 拥有本次招募机会的国家。
  final int countryId;

  /// 候选英雄的月俸报价，签收时不预付。
  final int initialSalary;

  /// 抽取时已结算的月份数，跨年不延长有效期，关闭面板会提前放弃。
  final int drawnMonth;

  /// 从此月份开始失效，使用战役累计月数而非一年内的月份。
  int get expiresAtMonth => drawnMonth + GameConfig.heroOfferValidMonths;

  /// 检查当前累计月份是否已超过保留期限。
  bool isExpired(int currentMonth) => currentMonth >= expiresAtMonth;

  /// 玩家可签约的最后月份，包含抽取的当月和次月。
  String get retentionLabel {
    final lastMonth = GameConfig.initialMonth - 1 + expiresAtMonth - 1;
    final year = GameConfig.initialYear + lastMonth ~/ 12;
    return '保留至 $year年${lastMonth % 12 + 1}月末';
  }
}
