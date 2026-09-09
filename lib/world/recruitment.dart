import 'rom_hero.dart';

/// 已支付抽取费、尚未签约的唯一英雄；关闭面板不会重复抽取或扣款。
class RecruitmentOffer {
  /// 锁定本次抽取的英雄、招募城池和签约价格。
  const RecruitmentOffer({
    required this.hero,
    required this.cityId,
    required this.countryId,
    required this.signingFee,
  });

  /// 从回收池中暂时取出的静态英雄资料。
  final RomHeroDefinition hero;

  /// 签约后进驻的城池。
  final int cityId;

  /// 支付抽取费的国家。
  final int countryId;

  /// 本次额外签约费。
  final int signingFee;
}
