part of '../campaign.dart';

extension _CitySieges on CampaignState {
  void _markSiegeArrivals() {
    final completedStaging = <String>{};
    // 外围集结任务走完最后一段后直接纳入实际围城队列，避免另等单将胜算审批。
    for (final m in marches.values) {
      final task = aiTasks[m.hero.id];
      if (m.waitingForDeparture ||
          m.returningFromRetreat ||
          (m.phase != MarchPhase.camped &&
              m.phase != MarchPhase.awaitingBattle) ||
          m.waitingForTraffic ||
          task?.role != 'staging' ||
          task!.leg + 1 < task.points.length) {
        continue;
      }
      final city = world.cities.where((c) => c.id == task.city).firstOrNull;
      if (city != null &&
          (m.target == null || m.target!.id == city.id) &&
          cities[city.id]!.ownerCountryId != m.hero.countryId &&
          m.hero.health.alive) {
        m.target = city;
        completedStaging.add(m.hero.id);
      }
    }
    final outerRing = <int, int>{};
    for (final m in marches.values) {
      if (m.target != null && m._siegeSlot != null && m.hero.health.alive) {
        outerRing.update(
          m.target!.id,
          (r) => math.max(r, m._siegeSlot!.ring),
          ifAbsent: () => m._siegeSlot!.ring,
        );
      }
    }
    final arrived =
        marches.values
            .where(
              (m) =>
                  m.target != null &&
                  m.hero.health.alive &&
                  !m.waitingForDeparture &&
                  !m.returningFromRetreat &&
                  activeBattleForHero(m.hero.id) == null &&
                  cities[m.target!.id]!.ownerCountryId != m.hero.countryId &&
                  m._siegeArrival?.cityId != m.target!.id &&
                  (completedStaging.contains(m.hero.id) ||
                      m.phase == MarchPhase.awaitingBattle ||
                      (m.position - cityBounds(m.target!).center).distance <=
                          _siegeRings(m.target!)
                                  .radius(outerRing[m.target!.id] ?? 0) +
                              32),
            )
            .toList()
          ..sort((a, b) => a.hero.id.compareTo(b.hero.id));
    for (final m in arrived) {
      _noticeSiege(m);
      m._siegeArrival = (cityId: m.target!.id, order: ++_siegeArrivalSerial);
      _emitEvent(
        GameEventKind.battleQueued,
        '${m.hero.name}抵达围城队列，按到达顺序等待攻城',
        hero: m.hero,
        cityId: m.target!.id,
        targetCountryId: cities[m.target!.id]!.ownerCountryId,
        source: GameEventSource.system,
        data: {'arrivalOrder': m._siegeArrival!.order},
      );
    }
  }

  bool _resolveArrivals() {
    var changed = false;
    for (final city in world.cities) {
      final present = marches.values
          .where(
            (m) =>
                m.target?.id == city.id &&
                m.hero.health.alive &&
                !m.waitingForDeparture,
          )
          .toList();
      for (final m in present) {
        if (cities[city.id]!.ownerCountryId != m.hero.countryId) continue;
        m._siegeSlot = null;
        m._siegeWaiting = false;
        if (m.phase != MarchPhase.awaitingBattle) continue;
        if (_atCityContact(m) && _aiAllowArrival(m)) _station(m);
        changed = true;
      }
      final queue =
          present
              .where(
                (m) =>
                    marches.containsKey(m.hero.id) &&
                    cities[city.id]!.ownerCountryId != m.hero.countryId &&
                    !m.returningFromRetreat &&
                    m._siegeArrival?.cityId == city.id &&
                    activeBattleForHero(m.hero.id) == null,
              )
              .toList()
            ..sort(
              (a, b) =>
                  a._siegeArrival!.order.compareTo(b._siegeArrival!.order),
            );
      if (queue.isEmpty) continue;
      // 整场交战及换守将期间不换进攻者；下一支按实际抵达顺序接续。
      final busy = battles[city.id]?.isActive == true;
      final head = busy ? null : queue.first;
      if (head != null) {
        head._siegeSlot = null;
        head._siegeWaiting = false;
      }
      changed =
          _arrangeSiegeRings(city, queue.where((m) => m != head).toList()) ||
          changed;
      if (head == null) continue;
      if (!_atCityContact(head)) {
        changed = true;
        continue;
      }
      if (_beginBattle(head) != null) {
        changed = true;
      } else if (!garrisonAt(city.id).any((h) => h.health.alive)) {
        _captureCity(city.id, head.hero.countryId);
        _station(head);
        changed = true;
        if (defeated) break;
      }
    }
    return changed;
  }

  bool _atCityContact(HeroMarch march) {
    final city = march.target!;
    final origin = cityBounds(city).topLeft;
    // 城堡扩建或在途拦截后可能已在轮廓内，不能要求向外走再被逐帧拦回。
    if (_cityContact(city).contains(march.position - origin)) return true;
    // 正在走向有效墙面时沿用已有路线，反复改令会清空避让路线并把每帧位置写入返程。
    if ((march.phase == MarchPhase.marching || march.waitingForTraffic) &&
        (_cityContact(city).nearest(march.destination - origin) -
                    (march.destination - origin))
                .distanceSquared <
            1e-8) {
      return false;
    }
    // 贴格队首垂直贴向最近墙面；朝城心斜走会挤进上下相邻人物的占用格。
    final point = origin + _cityContact(city).nearest(march.position - origin);
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
    final arrivalOrder = march._siegeArrival?.order;
    march._siegeArrival = null;
    march._siegeSlot = null;
    march._siegeWaiting = false;
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
      data: {
        'initialCityLevel': battle.initialCityLevel,
        'arrivalOrder': arrivalOrder,
      },
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
