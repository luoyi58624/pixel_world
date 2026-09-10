part of '../campaign.dart';

extension TerritoryDefense on CampaignState {
  /// 查询当前位置归属的国家，越过地图范围或没有城市时返回空。
  int? territoryOwnerAt(GamePoint point) =>
      cities[territories.regionAt(point)]?.ownerCountryId;

  void _scanTerritoryEntries() {
    _lastTerritoryOwner.removeWhere((id, _) => !marches.containsKey(id));
    for (final march in marches.values) {
      if (!march.hero.health.alive ||
          _disbandAfterBattle.contains(march.hero.id)) {
        continue;
      }
      final region = territories.regionAt(march.position),
          owner = cities[region]?.ownerCountryId;
      if (owner == null) continue;
      final previous = _lastTerritoryOwner[march.hero.id];
      _lastTerritoryOwner[march.hero.id] = owner;
      if (owner == previous || owner == march.hero.countryId) continue;
      final reason = '${march.hero.name}进入${world.countryName(owner)}国境';
      _emitEvent(
        GameEventKind.territoryEntered,
        reason,
        countryId: owner,
        hero: march.hero,
        cityId: region,
        targetCountryId: march.hero.countryId,
        source: GameEventSource.system,
        data: {'previousOwner': previous, 'regionCity': region},
      );
      _ai?.urgent(owner, reason: '敌军越过国土边界，立即评估防御', defenseNow: true);
    }
  }
}
