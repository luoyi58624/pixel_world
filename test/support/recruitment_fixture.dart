import 'package:pixel_world/world/campaign.dart';

/// 为商店费用与锁定测试配置足够名额，人数门槛另由 recruitment_supply_test 覆盖。
void prepareRecruitmentCity(
  CampaignState campaign,
  int cityId, {
  int level = 5,
}) {
  final previous = campaign.cities[cityId]!;
  campaign.cities[cityId] = CitySituation(
    ownerCountryId: previous.ownerCountryId,
    defense: previous.defense,
    baseIncome: previous.baseIncome,
    initialLevel: level,
  );
}
