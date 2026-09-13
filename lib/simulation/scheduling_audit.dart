import 'dart:math' as math;

import '../core/config/game_config.dart';
import '../core/geometry/geometry.dart';
import '../core/geometry/siege_rings.dart';
import '../features/campaign/domain/campaign.dart';
import '../features/events/domain/game_events.dart';
import '../features/heroes/data/rom_hero.dart';

/// 只观察实际状态和事件的验收器，检查结果不得反馈给运行时 AI。
class SchedulingAudit {
  /// 异常回调用于保存现场，不修改战役或随机源。
  SchedulingAudit({this.onIssue});

  /// 每种异常的首批现场接收器。
  final void Function(Map<String, Object?> issue)? onIssue;
  final _positions = <String, ({GamePoint point, double since})>{};
  final _states = <String, String>{};
  final _streaks = <String, double>{};
  final _reported = <String>{};
  final _checked = <String>{};
  final _alerts = <int, double>{};
  final _issues = <Map<String, Object?>>[];
  final _coverage = <String, int>{};
  final _counts = <String, int>{};
  final _maxWait = <String, double>{};
  final _encircled = <String>{};
  final _maxFormation = <String, int>{};

  bool _automated(CampaignState c, int id) =>
      c.aiEnabled && (id != 0 || c.aiControlsPlayer);

  void _cover(String key) =>
      _coverage.update(key, (n) => n + 1, ifAbsent: () => 1);

  void _issue(String kind, String key, double now, Map<String, Object?> data) {
    if (!_reported.add('$kind:$key')) return;
    _counts.update(kind, (n) => n + 1, ifAbsent: () => 1);
    final issue = <String, Object?>{'kind': kind, 'second': now, ...data};
    if (_issues.length < 100) _issues.add(issue);
    if ((_counts[kind] ?? 0) <= 3) onIssue?.call(issue);
  }

  void _wait(
    String kind,
    String key,
    bool waiting,
    double now,
    double limit,
    Map<String, Object?> data,
  ) {
    final id = '$kind:$key';
    _checked.add(id);
    if (!waiting) {
      _streaks.remove(id);
      return;
    }
    final since = _streaks.putIfAbsent(id, () => now), seconds = now - since;
    _maxWait.update(kind, (v) => math.max(v, seconds), ifAbsent: () => seconds);
    if (seconds >= limit) _issue(kind, key, now, {'waited': seconds, ...data});
  }

  /// 观察警报、调令和真实战斗开场，记录已覆盖的状态转换。
  void event(CampaignState c, GameEvent e) {
    final now = e.tick / 60;
    if (e.kind == GameEventKind.heroMoved && e.data['siegeRing'] is int) {
      _cover('siegeRing:${e.data['siegeRing']}');
      if (e.data['previousRing'] is int &&
          (e.data['previousRing'] as int) > (e.data['siegeRing'] as int)) {
        _cover('siegeRingRefilled');
      }
    }
    if (e.kind == GameEventKind.retreatRequested &&
        e.phase == GameEventPhase.applied &&
        e.heroId != null) {
      final battle = c.activeBattleForHero(e.heroId!);
      if (battle is CityBattle &&
          c.isCityEncircled(
            battle.city.id,
            countryId: battle.attacker.countryId,
          )) {
        _issue('encircledRetreat', e.heroId!, now, {'city': battle.city.id});
      }
    }
    if (e.kind == GameEventKind.territoryEntered &&
        e.countryId != null &&
        _automated(c, e.countryId!)) {
      _alerts.putIfAbsent(e.countryId!, () => now);
      _cover('frontAlert');
    }
    if (e.kind == GameEventKind.reinforcementsRequested) {
      _cover('supportNotice');
    }
    if (e.kind == GameEventKind.decisionRequested &&
        e.data['stage'] == 'defense') {
      final since = _alerts.remove(e.countryId);
      if (since != null) {
        _cover('alertToDefense');
        _maxWait.update(
          'alertResponse',
          (v) => math.max(v, now - since),
          ifAbsent: () => now - since,
        );
      }
    }
    if (e.kind == GameEventKind.taskAssigned ||
        e.kind == GameEventKind.taskReplaced) {
      _cover(e.kind.name);
      final previous = e.data['previousTask'], next = e.data['newTask'];
      if (previous is Map &&
          next is Map &&
          previous['role'] == 'staging' &&
          next['role'] == 'expedition') {
        _cover('stagingToAssault');
      }
    }
    if (e.kind == GameEventKind.retreatResolved &&
        e.data['succeeded'] == true) {
      _cover('successfulRetreat');
    }
    if (e.kind == GameEventKind.cityCaptured) _cover('capture');
    if (e.kind == GameEventKind.heroStationed) _cover('stationed');
    if (e.kind == GameEventKind.battleStarted &&
        e.data['side'] == 'attacker' &&
        e.cityId != null) {
      final battle = c.battles[e.cityId];
      // 同一支军队连胜后的下一波不重新选人，不能把合法连战当作抢队。
      if (battle == null || battle.wave != 1) return;
      final chosen = battle.attacker;
      final selectedOrder = e.data['arrivalOrder'] as int?;
      for (final m in c.marches.values) {
        if (m.hero.countryId != chosen.countryId ||
            m.hero == chosen ||
            !m.hero.health.alive ||
            m.target?.id != e.cityId ||
            m.siegeQueueOrder == null ||
            m.returningFromRetreat ||
            c.activeBattleForHero(m.hero.id) != null) {
          continue;
        }
        _cover('siegePriorityCompared');
        if (selectedOrder != null && m.siegeQueueOrder! < selectedOrder) {
          _issue('siegeQueueOvertaken', '${e.sequence}', now, {
            'country': chosen.countryId,
            'city': e.cityId,
            'selected': chosen.id,
            'earlier': m.hero.id,
          });
        }
      }
    }
  }

  /// 每秒检查一次真实位置和任务，不用是否有粮草代替是否有位移。
  void sample(CampaignState c, double now) {
    _checked.clear();
    final tasks = c.aiTasks;
    final live = c.marches.keys.toSet();
    _positions.removeWhere((id, _) => !live.contains(id));
    _states.removeWhere((id, _) => !live.contains(id));
    for (final m in c.marches.values) {
      final hero = m.hero, task = tasks[hero.id];
      if (!_automated(c, hero.countryId) || !hero.health.alive) continue;
      final state =
          '${m.phase.name}:${m.waitingForDeparture}:${m.waitingForTraffic}:${m.returningFromRetreat}:${task?.role}';
      if (_states[hero.id] != state) {
        _cover('state:$state');
        _states[hero.id] = state;
      }
      var position = _positions[hero.id];
      if (position == null || (position.point - m.position).distance >= 1) {
        position = (point: m.position, since: now);
        _positions[hero.id] = position;
      }
      final data = <String, Object?>{
        'hero': hero.id,
        'name': hero.name,
        'country': hero.countryId,
        'phase': m.phase.name,
        'task': task?.role,
        'city': m.target?.id,
        'position': [m.position.dx, m.position.dy],
        'destination': [m.destination.dx, m.destination.dy],
      };
      final fighting = c.activeBattleForHero(hero.id) != null;
      _wait(
        'stagingNotQueued',
        hero.id,
        !fighting &&
            !m.waitingForDeparture &&
            !m.waitingForTraffic &&
            !m.returningFromRetreat &&
            task?.role == 'staging' &&
            task!.leg + 1 >= task.points.length &&
            m.siegeQueueOrder == null &&
            m.phase == MarchPhase.camped &&
            c.cities[task.city]?.ownerCountryId != hero.countryId &&
            (m.position - m.destination).distance < 1,
        now,
        5,
        data,
      );
      final stationary = now - position.since;
      final pending =
          m.waitingForDeparture && now - m.scheduledDepartureTime > 60;
      if (pending) {
        _issue('departureBlocked', hero.id, now, {
          'waited': now - m.scheduledDepartureTime,
          ...data,
        });
      }
      final moving =
          !fighting &&
          !m.waitingForDeparture &&
          (m.phase == MarchPhase.marching || m.waitingForTraffic) &&
          (m.position - m.destination).distance > 1;
      // 交战、候发和排队的合法等待不能计入恢复行军后的堵塞时长。
      if (!moving) _positions[hero.id] = (point: m.position, since: now);
      if (moving && stationary > 60) {
        _issue(
          m.returningFromRetreat ? 'retreatBlocked' : 'marchBlocked',
          hero.id,
          now,
          {'waited': stationary, ...data},
        );
      }
      if (m.returningFromRetreat) {
        _cover('returning');
        _wait(
          'retreatCamping',
          hero.id,
          !fighting && m.phase == MarchPhase.camped,
          now,
          2,
          data,
        );
        _wait(
          'returnAdmissionWaiting',
          hero.id,
          !fighting &&
              m.phase == MarchPhase.awaitingBattle &&
              m.target != null &&
              c.cities[m.target!.id]?.ownerCountryId == hero.countryId,
          now,
          60,
          data,
        );
      }
      final changed =
          task?.needsTargetReview(
            c.cities[task.city]?.ownerCountryId,
            hero.countryId,
          ) ==
          true;
      _wait(
        'staleFriendlyTarget',
        hero.id,
        !fighting &&
            !m.waitingForDeparture &&
            !m.returningFromRetreat &&
            changed &&
            m.phase == MarchPhase.marching &&
            c.cities[task?.city]?.ownerCountryId == hero.countryId,
        now,
        5,
        data,
      );
    }
    final visible = c.marches.values
        .where((m) => m.visibleOnMap && m.hero.health.alive)
        .toList();
    for (var i = 0; i < visible.length; i++) {
      for (var j = i + 1; j < visible.length; j++) {
        final a = visible[i], b = visible[j];
        if (a.hero.countryId != b.hero.countryId ||
            !_automated(c, a.hero.countryId)) {
          continue;
        }
        final ids = [a.hero.id, b.hero.id]..sort();
        final overlap =
            (a.position.dx - b.position.dx).abs() < 15.9 &&
            (a.position.dy - b.position.dy).abs() < 15.9;
        _wait('friendlyOverlap', ids.join(':'), overlap, now, 3, {
          'country': a.hero.countryId,
          'heroes': ids,
          'returning': a.returningFromRetreat || b.returningFromRetreat,
        });
      }
    }
    final activeOwners = c.cities.values.map((v) => v.ownerCountryId).toSet();
    for (final country in activeOwners) {
      if (!_automated(c, country)) continue;
      final missing =
          c.reserveCapacityFor(country) - c.reserveSoldiersFor(country);
      final canBuy =
          missing > 0 &&
          c.goldFor(country) >= GameConfig.soldierRecruitCost &&
          c.soldierRecruitmentBlockReason(countryId: country) == null;
      _wait(
        'suppliesNotPurchased',
        '$country',
        canBuy,
        now,
        c.aiRulesForTesting().tuning.resourceIntervalSeconds + 12,
        {'country': country, 'gold': c.goldFor(country), 'missing': missing},
      );
    }
    for (final city in c.world.cities) {
      final bounds = c.cityBounds(city);
      final appearance = city.appearanceAt(c.cities[city.id]!.level);
      final rings = SiegeRings(
        appearance.width,
        appearance.height,
        tiles: appearance.tiles,
      );
      final queued = <int, List<HeroMarch>>{};
      for (final m in c.marches.values) {
        if (m.target?.id != city.id ||
            !m.hero.health.alive ||
            m.returningFromRetreat ||
            m.siegeQueueOrder == null ||
            c.activeBattleForHero(m.hero.id) != null ||
            c.cities[city.id]!.ownerCountryId == m.hero.countryId) {
          continue;
        }
        queued.putIfAbsent(m.hero.countryId, () => []).add(m);
        if (m.waitingForSiegePosition &&
            m.siegeRing != null &&
            (m.position - m.destination).distance < 1e-5) {
          // 独立从建筑格量实到距离，不能只检查是否走到了算法自己给出的错误目的地。
          final local = m.position - bounds.topLeft;
          var gap = double.infinity;
          for (var y = 0; y < appearance.height; y++) {
            for (var x = 0; x < appearance.width; x++) {
              if (appearance.tiles[y * appearance.width + x] == 0) continue;
              gap = math.min(
                gap,
                math.max(
                  (local.dx - (x + .5) * 16).abs(),
                  (local.dy - (y + .5) * 16).abs(),
                ),
              );
            }
          }
          if ((gap - (m.siegeRing! + 1) * 16).abs() > 1e-5 ||
              ((local.dx - 8) / 16 - ((local.dx - 8) / 16).round()).abs() >
                  1e-5 ||
              ((local.dy - 8) / 16 - ((local.dy - 8) / 16).round()).abs() >
                  1e-5) {
            _issue('siegeOffGrid', m.hero.id, now, {
              'city': city.id,
              'hero': m.hero.id,
              'ring': m.siegeRing,
              'gap': gap,
            });
          } else {
            _cover('siegeGridPositionReached');
          }
        }
      }
      for (final entry in queued.entries) {
        final key = '${entry.key}:${city.id}', members = entry.value;
        final arrived = members
            .where(
              (m) =>
                  m.waitingForSiegePosition &&
                  (m.position - m.destination).distance < 2,
            )
            .length;
        _maxFormation.update(
          key,
          (n) => math.max(n, arrived),
          ifAbsent: () => arrived,
        );
        final closed = c.isCityEncircled(city.id, countryId: entry.key);
        if (closed && _encircled.add(key)) _cover('actualEncirclement');
        if (!closed) _encircled.remove(key);
        if (!_automated(c, entry.key)) continue;
        _wait(
          'siegeFormationIncomplete',
          key,
          queued.length == 1 && members.length >= rings.slots(0) && !closed,
          now,
          120,
          {
            'country': entry.key,
            'city': city.id,
            'waiting': members.length,
            'arrived': arrived,
            'required': rings.slots(0),
          },
        );
        _wait(
          'siegeNotResumed',
          key,
          c.battles[city.id]?.isActive != true,
          now,
          60,
          {
            'country': entry.key,
            'city': city.id,
            'heroes': members.map((m) => m.hero.id).toList(),
          },
        );
        if (arrived > 0) _cover('siegePositionReached');
      }
    }
    _alerts.removeWhere((id, _) => !activeOwners.contains(id));
    for (final alert in _alerts.entries) {
      if (now - alert.value > 12) {
        _issue('alertNotHandled', '${alert.key}:${alert.value}', now, {
          'country': alert.key,
          'waited': now - alert.value,
        });
      }
    }
    if (activeOwners.length < 2) {
      _streaks.removeWhere((key, _) => !_checked.contains(key));
      return;
    }
    for (final city in c.world.cities) {
      final owner = c.cities[city.id]!.ownerCountryId;
      if (!_automated(c, owner)) continue;
      final rear =
          c.territories
              .neighborsOf(city.id)
              .every((id) => c.cities[id]!.ownerCountryId == owner) &&
          c.battles[city.id]?.isActive != true &&
          !visible.any(
            (m) =>
                m.hero.countryId != owner &&
                c.territories.regionAt(m.position) == city.id,
          );
      final guards = c
          .garrisonAt(city.id)
          .where((h) => h.type != HeroType.protagonist && h.health.alive)
          .toList();
      final funded =
          c.reserveSoldiersFor(owner) >=
          GameConfig.heroSoldierLimit *
              (1 +
                  c.world.cities
                      .where(
                        (own) =>
                            c.cities[own.id]!.ownerCountryId == owner &&
                            c.territories
                                .neighborsOf(own.id)
                                .any(
                                  (id) => c.cities[id]!.ownerCountryId != owner,
                                ),
                      )
                      .length);
      _wait(
        'rearNotMobilized',
        '$owner:${city.id}',
        rear && guards.isNotEmpty && funded,
        now,
        90,
        {
          'country': owner,
          'city': city.id,
          'heroes': guards.map((h) => h.id).toList(),
        },
      );
      final healthy = guards
          .where(
            (h) =>
                h.hp >= h.maxHp * .65 &&
                c.dispatchBlockReason(h, countryId: owner) == null,
          )
          .toList();
      final calm =
          c.battles[city.id]?.isActive != true &&
          !visible.any(
            (m) =>
                m.hero.countryId != owner &&
                (c.territories.regionAt(m.position) == city.id ||
                    (m.position - c.cityBounds(city).center).distance <=
                        GameConfig.aiThreatDistance),
          );
      final spareFront = !rear && calm && funded && healthy.length >= 3;
      if (spareFront) _cover('frontSpareObserved');
      _wait('frontNotMobilized', '$owner:${city.id}', spareFront, now, 90, {
        'country': owner,
        'city': city.id,
        'heroes': healthy.map((h) => h.id).toList(),
      });
    }
    _streaks.removeWhere((key, _) => !_checked.contains(key));
  }

  /// 输出覆盖情况、最长等待与需要复查的异常，不宣称等待一定是不合法动作。
  Map<String, Object?> toJson() => {
    'coverage': _coverage,
    'counts': _counts,
    'maxWaitSeconds': _maxWait,
    'maxArrivedSiegeTroops': _maxFormation,
    'issues': _issues,
  };
}
