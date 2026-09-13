part of '../campaign.dart';

/// 围城闭合状态按真实到位部队计算，不能把在途承诺当成已经包围。
extension SiegeFormation on CampaignState {
  /// 指定国家是否已实际占满敌城的第一圈，野战和撤退部队不计入。
  bool isCityEncircled(int cityId, {required int countryId}) {
    if (cities[cityId]?.ownerCountryId == countryId) return false;
    final city = world.cities.where((c) => c.id == cityId).firstOrNull;
    if (city == null) return false;
    final rings = _siegeRings(city);
    final occupied = <int>{};
    for (final m in marches.values) {
      if (m.target?.id != cityId ||
          m.hero.countryId != countryId ||
          !m.hero.health.alive ||
          !m.visibleOnMap ||
          m.returningFromRetreat ||
          activeBattleForHero(m.hero.id) != null ||
          m._siegeSlot?.ring != 0 ||
          !m._siegeWaiting) {
        continue;
      }
      final index = m._siegeSlot!.index;
      if (index >= 0 &&
          index < rings.slots(0) &&
          (m.position - _siegePoint(city, rings, 0, index)).distance < 2) {
        occupied.add(index);
      }
    }
    return occupied.length == rings.slots(0);
  }
}

extension _SiegeFormation on CampaignState {
  SiegeRings _siegeRings(CityDefinition city) {
    final bounds = cityBounds(city);
    return SiegeRings(
      _cityContact(city).outline.fold<double>(
        0,
        (r, p) => math.max(r, (bounds.topLeft + p - bounds.center).distance),
      ),
    );
  }

  GamePoint _siegePoint(
    CityDefinition city,
    SiegeRings rings,
    int ring,
    int index,
  ) {
    final offset = rings.offset(ring, index);
    return cityBounds(city).center + GamePoint(offset.x, offset.y);
  }

  bool _validSiegePoint(GamePoint p) =>
      _containsPoint(p) &&
      !world.cities.any(
        (c) => _cityContact(c).contains(p - cityBounds(c).topLeft),
      );

  // 保留已分配站位；先由紧邻外圈最近的将领向内补位，再安置新到部队。
  bool _arrangeSiegeRings(CityDefinition city, List<HeroMarch> queue) {
    if (queue.isEmpty) return false;
    final rings = _siegeRings(city);
    final occupied = <(int, int), HeroMarch>{};
    var changed = false;
    for (final m in queue) {
      final slot = m._siegeSlot;
      if (slot == null) continue;
      if (slot.ring < 0 ||
          slot.index < 0 ||
          slot.index >= rings.slots(slot.ring) ||
          !_validSiegePoint(_siegePoint(city, rings, slot.ring, slot.index)) ||
          occupied.containsKey((slot.ring, slot.index))) {
        m._siegeSlot = null;
      } else {
        occupied[(slot.ring, slot.index)] = m;
      }
    }
    var remaining = queue.length;
    // 每圈至少八位，圈数由实际部队数界定，不再硬截断为四圈。
    for (var ring = 0; ring <= queue.length && remaining > 0; ring++) {
      final vacancies = <int>[
        for (var slot = 0; slot < rings.slots(ring); slot++)
          if (!occupied.containsKey((ring, slot)) &&
              _validSiegePoint(_siegePoint(city, rings, ring, slot)))
            slot,
      ];
      for (final slot in vacancies) {
        final point = _siegePoint(city, rings, ring, slot);
        final candidates =
            queue
                .where((m) => m._siegeSlot == null || m._siegeSlot!.ring > ring)
                .toList()
              ..sort((a, b) {
                // 外圈逐层递补；同圈按真实路程就近，同距按先到顺序。
                final layerA = a._siegeSlot?.ring ?? 0x7fffffff;
                final layerB = b._siegeSlot?.ring ?? 0x7fffffff;
                if (layerA != layerB) return layerA.compareTo(layerB);
                final distance = (a.position - point).distanceSquared.compareTo(
                  (b.position - point).distanceSquared,
                );
                return distance != 0
                    ? distance
                    : a._siegeArrival!.order.compareTo(b._siegeArrival!.order);
              });
        if (candidates.isEmpty) break;
        final m = candidates.first;
        final old = m._siegeSlot;
        if (old != null) occupied.remove((old.ring, old.index));
        m._siegeSlot = (ring: ring, index: slot);
        occupied[(ring, slot)] = m;
        _record(
          '${m.hero.name}前往第${ring + 1}圈围城位置',
          kind: GameEventKind.heroMoved,
          hero: m.hero,
          source: GameEventSource.system,
          reason: old == null ? '先填满内圈，再逐圈向外布阵' : '外圈就近补充内圈缺口',
          data: {
            'siegeRing': ring,
            'siegeSlot': slot,
            'previousRing': old?.ring,
            'arrivalOrder': m._siegeArrival!.order,
          },
        );
        changed = true;
      }
      remaining -= occupied.keys.where((key) => key.$1 == ring).length;
    }
    for (final m in queue) {
      final slot = m._siegeSlot;
      if (slot == null) continue;
      final point = _siegePoint(city, rings, slot.ring, slot.index);
      if (!m._siegeWaiting || (m.destination - point).distanceSquared > 1e-8) {
        m._resumeToward(point, city: city);
        m._siegeWaiting = true;
        changed = true;
      }
    }
    return changed;
  }
}
