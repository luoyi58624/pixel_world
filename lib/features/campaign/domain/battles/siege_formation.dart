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
    final appearance = city.appearanceAt(cities[city.id]!.level);
    return SiegeRings(
      appearance.width,
      appearance.height,
      tiles: appearance.tiles,
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

  bool _validSiegePoint(GamePoint p, CityDefinition target) =>
      _containsPoint(p) &&
      !world.cities.any((c) {
        final local = p - cityBounds(c).topLeft, contact = _cityContact(c);
        // 相邻格的英雄恰好贴墙，只排除进入墙体的点，不排除边缘相接。
        return contact.contains(local) &&
            (c.id != target.id ||
                (contact.nearest(local) - local).distance > 1e-7);
      });

  // 保留已分配站位；先由紧邻外圈最近的将领向内补位，再安置新到部队。
  bool _arrangeSiegeRings(
    CityDefinition city,
    List<HeroMarch> queue, {
    HeroMarch? entering,
  }) {
    if (queue.isEmpty) return false;
    final rings = _siegeRings(city);
    final occupied = <(int, int), HeroMarch>{};
    // 队首尚未贴墙时，其当前位置和进场通道不是可补位的空格。
    bool available(int ring, int slot) {
      final point = _siegePoint(city, rings, ring, slot);
      return _validSiegePoint(point, city) &&
          (entering == null ||
              (!_trafficIntersects(point, point, entering.position) &&
                  !_trafficIntersects(
                    entering.position,
                    entering.destination,
                    point,
                  )));
    }

    var changed = false;
    for (final m in queue) {
      final slot = m._siegeSlot;
      if (slot == null) continue;
      if (slot.ring < 0 ||
          slot.index < 0 ||
          slot.index >= rings.slots(slot.ring) ||
          !available(slot.ring, slot.index) ||
          occupied.containsKey((slot.ring, slot.index))) {
        m._siegeSlot = null;
      } else {
        occupied[(slot.ring, slot.index)] = m;
      }
    }
    // 野战中的候战者保留原位，不能把它的站位再次交给别的军队。
    for (final m in marches.values) {
      final slot = m._siegeSlot;
      if (m.target?.id == city.id &&
          m.hero.health.alive &&
          activeBattleForHero(m.hero.id) != null &&
          slot != null) {
        occupied.putIfAbsent((slot.ring, slot.index), () => m);
      }
    }
    final countries = <int, List<HeroMarch>>{};
    for (final m in queue) {
      countries.putIfAbsent(m.hero.countryId, () => []).add(m);
    }
    // 先填内圈，同国自行补位；各国共享的只是物理空位，不能互算援军。
    final maxRing = queue.length + occupied.length;
    for (var ring = 0; ring <= maxRing; ring++) {
      final vacancies = <int>[
        for (var slot = 0; slot < rings.slots(ring); slot++)
          if (!occupied.containsKey((ring, slot)) && available(ring, slot))
            slot,
      ];
      for (final members in countries.values) {
        while (vacancies.isNotEmpty) {
          final candidates =
              members
                  .where(
                    (m) => m._siegeSlot == null || m._siegeSlot!.ring > ring,
                  )
                  .toList()
                ..sort((a, b) {
                  // 外圈逐层递补；同圈按真实路程就近，同距按先到顺序。
                  final layerA = a._siegeSlot?.ring ?? 0x7fffffff;
                  final layerB = b._siegeSlot?.ring ?? 0x7fffffff;
                  if (layerA != layerB) return layerA.compareTo(layerB);
                  return a._siegeArrival!.order.compareTo(
                    b._siegeArrival!.order,
                  );
                });
          if (candidates.isEmpty) break;
          var m = candidates.first;
          var slot = vacancies.first;
          var shortest = double.infinity;
          // 外圈补洞选最近者；新到者依次选择身边的空位，绝不固定绕去城东。
          final layer = m._siegeSlot?.ring;
          final movers = layer == null
              ? [m]
              : candidates.where((c) => c._siegeSlot?.ring == layer);
          for (final candidate in movers) {
            for (final vacancy in vacancies) {
              final distance =
                  (candidate.position - _siegePoint(city, rings, ring, vacancy))
                      .distanceSquared;
              if (distance < shortest) {
                shortest = distance;
                m = candidate;
                slot = vacancy;
              }
            }
          }
          vacancies.remove(slot);
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
      }
      if (queue.every(
        (m) => m._siegeSlot != null && m._siegeSlot!.ring <= ring,
      )) {
        break;
      }
    }
    // 凹角空格可能被同圈队员挡住：由相邻者先补洞，原补位者接它腾出的格子。
    // 只交换站位任务，不交换人物位置或抵达顺序，所有步行仍经过碰撞检查。
    final shifted = <HeroMarch>{};
    // 建筑换形可能把两人的目的格互换；已站在目标格的人就地接位，避免对穿。
    for (final m in queue) {
      final slot = m._siegeSlot;
      if (!m._trafficBlocked || slot == null || shifted.contains(m)) continue;
      final point = _siegePoint(city, rings, slot.ring, slot.index);
      final occupant = queue
          .where(
            (other) =>
                other != m &&
                other.hero.countryId == m.hero.countryId &&
                other._siegeSlot != null &&
                !shifted.contains(other) &&
                (other.position - point).distanceSquared < 1e-8,
          )
          .firstOrNull;
      if (occupant == null) continue;
      m._siegeSlot = occupant._siegeSlot;
      occupant._siegeSlot = slot;
      shifted.addAll([m, occupant]);
      changed = true;
    }
    final walls = _siegeWallCells(city), center = cityBounds(city).center;
    final visible = marches.values
        .where((m) => m.visibleOnMap && m.hero.health.alive)
        .toList();
    final walkingDistances = <(GamePoint, GamePoint), double>{};
    // 对面墙后的直线距离不可走，补位必须比较绕开建筑后的路程。
    double walkingDistance(GamePoint from, GamePoint to) =>
        walkingDistances.putIfAbsent((from, to), () {
          bool clear(GamePoint a, GamePoint b) =>
              _outsideSiegeWall(a, b, walls, center);
          final obstacles = <GamePoint>[if (entering != null) entering.position];
          if (clear(from, to) &&
              obstacles.every((p) => !_trafficIntersects(from, to, p))) {
            return (from - to).distance;
          }
          final path = _trafficPath(
            from,
            to,
            obstacles,
            around: city,
            wallClear: clear,
            gridTraffic: true,
          );
          if (path.isEmpty) return double.infinity;
          var distance = 0.0, previous = from;
          for (final point in path) {
            distance += (point - previous).distance;
            previous = point;
          }
          return distance;
        });
    for (final m in queue) {
      final slot = m._siegeSlot;
      if (!m._trafficBlocked || slot == null || shifted.contains(m)) continue;
      final hole = _siegePoint(city, rings, slot.ring, slot.index);
      final candidates =
          queue
              .where(
                (other) =>
                    other != m &&
                    other.hero.countryId == m.hero.countryId &&
                    other._siegeSlot != null &&
                    !shifted.contains(other),
              )
              .toList()
            ..sort(
              (a, b) => (a.position - hole).distanceSquared.compareTo(
                (b.position - hole).distanceSquared,
              ),
            );
      for (final other in candidates) {
        final otherSlot = other._siegeSlot!;
        final replacement = _siegePoint(
          city,
          rings,
          otherSlot.ring,
          otherSlot.index,
        );
        final before = walkingDistance(m.position, hole);
        final after = walkingDistance(m.position, replacement);
        if (after >= before - 1e-8 ||
            !_outsideSiegeWall(other.position, hole, walls, center) ||
            visible.any(
              (obstacle) =>
                  obstacle != other &&
                  _trafficIntersects(other.position, hole, obstacle.position),
            )) {
          continue;
        }
        m._siegeSlot = other._siegeSlot;
        other._siegeSlot = slot;
        shifted.addAll([m, other]);
        changed = true;
        break;
      }
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
