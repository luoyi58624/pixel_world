part of '../campaign.dart';

extension TerritoryDefense on CampaignState {
  /// 查询当前位置归属的国家，越过地图范围或没有城市时返回空。
  int? territoryOwnerAt(GamePoint point) =>
      cities[territories.regionAt(point)]?.ownerCountryId;

  void _scanTerritoryEntries() {
    _lastTerritoryOwner.removeWhere((id, _) => !marches.containsKey(id));
    _lastTerritoryRegion.removeWhere((id, _) => !marches.containsKey(id));
    for (final march in marches.values) {
      if (march.waitingForDeparture ||
          !march.hero.health.alive ||
          _disbandAfterBattle.contains(march.hero.id)) {
        continue;
      }
      final region = territories.regionAt(march.position),
          owner = cities[region]?.ownerCountryId;
      if (owner == null) continue;
      final previous = _lastTerritoryOwner[march.hero.id];
      final previousRegion = _lastTerritoryRegion[march.hero.id];
      _lastTerritoryOwner[march.hero.id] = owner;
      if (region != null) _lastTerritoryRegion[march.hero.id] = region;
      if (owner == march.hero.countryId ||
          owner == previous && region == previousRegion) {
        continue;
      }
      final reason = '${march.hero.name}进入${cityName(region!)}城池辖区，立即戒备并通知后方增援';
      final support = [
        for (final c in world.cities)
          if (c.id != region &&
              cities[c.id]!.ownerCountryId == owner &&
              _aiSafeRear(c.id))
            c.id,
      ];
      _emitEvent(
        GameEventKind.territoryEntered,
        reason,
        countryId: owner,
        hero: march.hero,
        cityId: region,
        targetCountryId: march.hero.countryId,
        source: GameEventSource.system,
        data: {
          'previousOwner': previous,
          'previousRegion': previousRegion,
          'regionCity': region,
          'supportCities': support,
        },
      );
      _emitEvent(
        GameEventKind.reinforcementsRequested,
        '${cityName(region)}城池进入戒备，通知后方准备增援',
        countryId: owner,
        cityId: region,
        targetCountryId: march.hero.countryId,
        source: GameEventSource.ai,
        phase: GameEventPhase.observed,
        reason: '优先调动现有兵力支援，仍有缺口时在前线及最近后方补募',
        data: {'enemyHeroId': march.hero.id, 'supportCities': support},
      );
      _ai?.urgent(owner, reason: '敌军进入城池辖区，立即戒备、通知后方调援并补募守军', defenseNow: true);
    }
  }
}
