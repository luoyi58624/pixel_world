part of '../campaign.dart';

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
        '${march.hero.name}抵达城下，同国部队按战力优先等待攻城',
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
    for (final entry in arrived) {
      var march = entry;
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
      if (battles[city.id]?.isActive == true) {
        changed = _positionSiegeQueue(march) || changed;
        continue;
      }
      if (!admittedCities.add(city.id)) {
        continue;
      }
      // 国家之间保留到达顺序，同国已抵达的候战部队优先派出当前战力最强者。
      final ownQueue =
          arrived
              .where(
                (m) =>
                    m.target?.id == city.id &&
                    m.hero.countryId == march.hero.countryId &&
                    m.hero.health.alive &&
                    !m.returningFromRetreat &&
                    activeBattleForHero(m.hero.id) == null &&
                    m._siegeArrival != null,
              )
              .toList()
            ..sort((a, b) {
              double strength(CampaignHero h) =>
                  h.combat * h.hp / h.maxHp +
                  h.soldiers * BattleSimulation.soldierAttack;
              final power = strength(b.hero).compareTo(strength(a.hero));
              return power != 0
                  ? power
                  : a._siegeArrival!.order.compareTo(b._siegeArrival!.order);
            });
      if (ownQueue.isNotEmpty) march = ownQueue.first;
      if (march._siegeWaiting) {
        march._siegeWaiting = false;
        if (!_atCityContact(march)) {
          changed = true;
          continue;
        }
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

  // 候战部队围在城外的分散空位，保持真实行走和队列身份，为出城撤退留下间隙。
  bool _positionSiegeQueue(HeroMarch march, {GamePoint? avoid}) {
    if (march._siegeWaiting && avoid == null ||
        march.returningFromRetreat ||
        march.target == null ||
        activeBattleForHero(march.hero.id) != null) {
      return false;
    }
    final city = march.target!, bounds = cityBounds(march.target!);
    final radius =
        _cityContact(city).outline.fold<double>(
          0,
          (r, p) => math.max(r, (bounds.topLeft + p - bounds.center).distance),
        ) +
        36;
    final angle = math.atan2(
      march.position.dy - bounds.center.dy,
      march.position.dx - bounds.center.dx,
    );
    for (var ring = 0; ring < 4; ring++) {
      for (var slot = 0; slot < 8; slot++) {
        final turn = angle + slot * math.pi / 4;
        final point =
            bounds.center +
            GamePoint(math.cos(turn), math.sin(turn)) * (radius + ring * 40);
        final outward = march.position - bounds.center,
            movement = point - march.position;
        // 外围换位只能沿当前墙面向外走，不能借候战标记穿过正在交战的城堡。
        if (outward.dx * movement.dx + outward.dy * movement.dy < 0) continue;
        if (!_containsPoint(point) ||
            avoid != null && (point - avoid).distance < 64 ||
            world.cities.any(
              (c) => _cityContact(c).contains(point - cityBounds(c).topLeft),
            ) ||
            marches.values.any(
              (other) =>
                  other != march &&
                  other.visibleOnMap &&
                  ((other.position - point).distance < 34 ||
                      other._siegeWaiting &&
                          (other.destination - point).distance < 34),
            )) {
          continue;
        }
        march._resumeToward(point, city: city);
        march._siegeWaiting = true;
        _record(
          '${march.hero.name}移往城外围攻位置',
          kind: GameEventKind.heroMoved,
          hero: march.hero,
          source: GameEventSource.system,
          reason: '城内已有部队交战，外围分散候战，保留撤退通路',
        );
        return true;
      }
    }
    return false;
  }

  bool _atCityContact(HeroMarch march) {
    final city = march.target!;
    final origin = cityBounds(city).topLeft;
    // 城堡扩建或在途拦截后可能已在轮廓内，不能要求向外走再被逐帧拦回。
    if (_cityContact(city).contains(march.position - origin)) return true;
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
    // 驻军界面按内政、攻击力从高到低展示，迎战从队尾开始。
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
    _captureCity(battle.city.id, battle.attacker.countryId);
    _station(march);
  }
}
