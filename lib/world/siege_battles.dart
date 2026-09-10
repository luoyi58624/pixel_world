part of 'campaign.dart';

extension _CitySieges on CampaignState {
  void _markSiegeArrivals() {
    final arrived =
        marches.values
            .where(
              (march) =>
                  march.phase == MarchPhase.awaitingBattle &&
                  march.target != null &&
                  march.hero.health.alive &&
                  cities[march.target!.id]!.ownerCountryId !=
                      march.hero.countryId &&
                  march._siegeArrival?.cityId != march.target!.id,
            )
            .toList()
          ..sort((a, b) => a.hero.id.compareTo(b.hero.id));
    // 跨帧按实际抵达先后，同帧并列时按编号稳定排序，不按派兵顺序插队。
    for (final march in arrived) {
      _noticeSiege(march);
      march._siegeArrival = (
        cityId: march.target!.id,
        order: ++_siegeArrivalSerial,
      );
      _emitEvent(
        GameEventKind.battleQueued,
        '${march.hero.name}抵达城下，按到达顺序等待攻城',
        hero: march.hero,
        cityId: march.target!.id,
        targetCountryId: cities[march.target!.id]!.ownerCountryId,
        source: GameEventSource.system,
        data: {'arrivalOrder': march._siegeArrival!.order},
      );
    }
  }

  bool _resolveArrivals() {
    final arrived =
        marches.values
            .where(
              (march) =>
                  march.target != null &&
                  (march.phase == MarchPhase.awaitingBattle ||
                      march.phase == MarchPhase.fighting ||
                      march.phase == MarchPhase.marching &&
                          march._siegeArrival?.cityId == march.target!.id),
            )
            .toList()
          ..sort((a, b) {
            final order = (a._siegeArrival?.order ?? 0x7fffffff).compareTo(
              b._siegeArrival?.order ?? 0x7fffffff,
            );
            return order != 0 ? order : a.hero.id.compareTo(b.hero.id);
          });
    var changed = false;
    final admittedCities = <int>{};
    for (final march in arrived) {
      if (!marches.containsKey(march.hero.id) || !march.hero.health.alive) {
        continue;
      }
      final city = march.target!;
      if (cities[city.id]!.ownerCountryId == march.hero.countryId) {
        if (march.phase == MarchPhase.marching) continue;
        if (_atCityContact(march) && _aiAllowArrival(march)) _station(march);
        changed = true;
        continue;
      }
      // 整场攻城（含换守将）都占用名额，不能中途换将或提前夺城。
      if (battles[city.id]?.isActive == true || !admittedCities.add(city.id)) {
        continue;
      }
      // 城堡缩小或扩建后，队首到轮次再重新贴城，其余部队继续原地等待。
      if (march.phase == MarchPhase.marching) continue;
      if (!_atCityContact(march)) {
        changed = true;
        continue;
      }
      if (_beginBattle(march) != null) {
        changed = true;
      } else if (!garrisonAt(city.id).any((hero) => hero.health.alive)) {
        _captureCity(city.id, march.hero.countryId);
        _station(march);
        changed = true;
        if (defeated) break;
      }
    }
    return changed;
  }

  bool _atCityContact(HeroMarch march) {
    final city = march.target!;
    final point = _contactPoint(march.position, cityBounds(city).center, city);
    if ((point - march.position).distanceSquared <= 1e-8) return true;
    march._resumeToward(point, city: city);
    return false;
  }

  CampaignHero? _pickDefender(int cityId) {
    final candidates = garrisonAt(cityId).where(
      (hero) =>
          hero.health.alive &&
          !allBattles.any(
            (battle) =>
                battle.isActive &&
                (identical(battle.attacker, hero) ||
                    identical(battle.defender, hero)),
          ),
    );
    // 驻军界面从高到低展示，迎战从队尾开始，主角最后上场。
    return candidates.lastOrNull;
  }

  CityBattle? _beginBattle(HeroMarch march) {
    final city = march.target;
    if (city == null ||
        cities[city.id]!.ownerCountryId == march.hero.countryId) {
      return null;
    }
    final existing = battles[city.id];
    if (existing?.isActive == true) {
      return existing!.attacker == march.hero ? existing : null;
    }
    _protectAiCity(city.id, force: true);
    final defender = _pickDefender(city.id);
    if (defender == null) return null;
    reinforceHero(defender, countryId: defender.countryId);
    march._siegeArrival = null;
    march.phase = MarchPhase.fighting;
    final battle = battles[city.id] = CityBattle(
      city,
      march.hero,
      defender,
      cityLevel: cities[city.id]!.level,
      locationName: () => cityName(city.id),
      seed: (++_battleSerial * 1009) + city.id * 41 + march.hero.sourceId,
    );
    _battleEvent(
      GameEventKind.battleStarted,
      battle,
      '${march.hero.name}进攻，${defender.name}出城迎战',
      data: {'initialCityLevel': battle.initialCityLevel},
    );
    return battle;
  }

  void _finishOccupation(CityBattle battle) {
    final march = marches[battle.attacker.id];
    if (march == null || !battle.attacker.health.alive) {
      battle.outcome = '进攻部队已离开';
      battle.simulation.stop();
      return;
    }
    final previousName = cityName(battle.city.id);
    _captureCity(battle.city.id, battle.attacker.countryId);
    if (march.supplyHalted || goldFor(march.hero.countryId) == 0) {
      _endBattle(march, '${march.hero.name}攻下$previousName，断粮扎营');
      march.hero.cityId = battle.city.id;
      march.hero.hp = march.hero.maxHp;
      _campForSupply(march);
    } else {
      _station(march);
    }
  }
}
