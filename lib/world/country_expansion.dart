part of 'campaign.dart';

extension _CountryExpansion on CampaignState {
  // 每位多余将领独立选择可胜的目标，先分散进攻，再考虑对同一城排队。
  bool _launchExpansionAttacks(
    int countryId,
    _AiSnapshot snapshot,
    CountryWarPlan plan,
  ) {
    final hadCommitments = plan._committed.isNotEmpty;
    plan._committed.removeWhere((id) {
      final march = marches[id];
      return march == null ||
          march.returningFromRetreat ||
          march.target == null ||
          cities[march.target!.id]!.ownerCountryId == countryId;
    });
    if (hadCommitments && plan._committed.isEmpty) {
      plan._retryAt = _strategyTime + GameConfig.aiRaidRetrySeconds;
    }
    final spare = _spareHeroes(countryId, snapshot);
    final assigned = marches.values
        .where(
          (m) =>
              m.hero.countryId == countryId &&
              !m.returningFromRetreat &&
              m.target != null,
        )
        .map((m) => m.target!.id)
        .toSet();
    var changed = false;
    for (final hero in spare) {
      final options = <CityDefinition, List<int>>{};
      final reserveNeeded = math.min(
        reserveCapacityFor(countryId),
        GameConfig.heroSoldierLimit +
            snapshot.owned.fold<int>(
              0,
              (n, c) =>
                  n +
                  math.min(
                        cities[c.id]!.requiredGarrison,
                        (snapshot.garrisons[c.id]?.length ?? 0) -
                            (hero.cityId == c.id ? 1 : 0),
                      ) *
                      GameConfig.heroSoldierLimit,
            ),
      );
      final recruitCount = math.max(
        0,
        reserveNeeded - reserveSoldiersFor(countryId),
      );
      final equipmentOptions = [
        for (
          var slots = 0;
          slots <=
              (weaponCatalog.weapons.isEmpty ? 0 : weaponCatalog.carryLimit);
          slots++
        )
          _raidWeapons([hero], countryId, slots),
      ];
      for (final target in _targetShortlist(hero)) {
        List<int>? suitable;
        for (final gear in equipmentOptions) {
          final forecast = _projectRaid([hero], target, gear, snapshot);
          if (forecast.used == 1 && forecast.losses == 0) {
            suitable = gear[hero.id]!;
            break;
          }
        }
        if (suitable == null) continue;
        final budget = _planAiBudget(
          countryId,
          departing: hero,
          destination: target,
        );
        final cost = _raidEquipmentCost([hero], {hero.id: suitable}, countryId);
        if (goldFor(countryId) >=
            budget.reserveGold +
                cost +
                recruitCount * GameConfig.soldierRecruitCost) {
          options[target] = suitable;
        }
      }
      if (options.isEmpty) continue;
      final unassigned = options.keys
          .where((c) => !assigned.contains(c.id))
          .toList();
      final target = _chooseAiTarget(
        hero,
        unassigned.isNotEmpty ? unassigned : options.keys.toList(),
      );
      if (recruitCount > 0 &&
          !buySoldiers(hero.cityId, recruitCount, countryId: countryId)) {
        continue;
      }
      final selection = <int, int>{}, needed = <int, int>{};
      final gear = options[target]!;
      var ready = true;
      for (var slot = hero.weaponIds.length; slot < gear.length; slot++) {
        final id = gear[slot];
        needed.update(id, (n) => n + 1, ifAbsent: () => 1);
        if (weaponStockFor(countryId, id) < needed[id]! &&
            !buyWeapon(id, countryId: countryId)) {
          ready = false;
          break;
        }
        selection[slot] = id;
      }
      if (!ready ||
          dispatch(
                hero,
                target,
                countryId: countryId,
                weaponSlots: selection,
              ) ==
              null) {
        continue;
      }
      snapshot.garrisons[hero.cityId]?.remove(hero);
      if (plan._committed.isEmpty) {
        plan.targetCityId = target.id;
        plan.targetCountryId = cities[target.id]!.ownerCountryId;
      }
      plan._committed.add(hero.id);
      assigned.add(target.id);
      plan.phase = CountryWarPhase.attacking;
      plan.requiredHeroes = plan._committed.length;
      _record('${hero.name}出征，向${cityName(target.id)}扩张');
      changed = true;
    }
    return changed;
  }
}
