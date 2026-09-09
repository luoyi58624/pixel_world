import '../game_config.dart';
import 'rom_hero.dart';

/// 已支付抽取费、尚未签约的唯一英雄；关闭面板不会重复抽取或扣款。
class RecruitmentOffer {
  /// 锁定本次抽取的英雄、招募城池和签约价格。
  const RecruitmentOffer({
    required this.hero,
    required this.cityId,
    required this.countryId,
    required this.signingFee,
    required this.drawnMonth,
  });

  /// 从回收池中暂时取出的静态英雄资料。
  final RomHeroDefinition hero;

  /// 签约后进驻的城池。
  final int cityId;

  /// 支付抽取费的国家。
  final int countryId;

  /// 本次额外签约费。
  final int signingFee;

  /// 抽取时已结算的月份数，跨年及关闭面板都不延长有效期。
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
