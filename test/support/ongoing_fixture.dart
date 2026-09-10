import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';

/// 将单项交互测试放在首月之后的空库存场景，开局满编另由 monthly_rules_test 验收。
CampaignState ongoingCampaign(CampaignState c, {int stock = 0, int year = 1}) {
  c.settledMonths = year == 1 ? 1 : (year - 1) * 12;
  for (final country in c.countryTroops.keys.toList()) {
    c.countryTroops[country] = CountryTroops(reserveSoldiers: stock);
  }
  return c;
}

/// 地图交互测试从经营期和空库存起步，便于核对单次操作的兵员变化。
WorldController ongoingController(WorldController c) {
  for (final campaign in c.campaigns) {
    ongoingCampaign(campaign);
  }
  return c;
}
