import 'dart:math' as math;

import '../core/config/game_config.dart';
import '../core/geometry/geometry.dart';
import '../features/campaign/domain/campaign.dart';
import '../features/events/domain/game_events.dart';
import '../features/battle/domain/battle_simulation.dart';
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
      double power(CampaignHero h) =>
          h.combat * h.hp / h.maxHp +
          h.soldiers * BattleSimulation.soldierAttack;
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
        if (power(m.hero) > power(chosen) + 1e-8) {
          _issue('weakerAttackerSelected', '${e.sequence}', now, {
            'country': chosen.countryId,
            'city': e.cityId,
            'selected': chosen.id,
            'stronger': m.hero.id,
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
    }
    _streaks.removeWhere((key, _) => !_checked.contains(key));
  }

  /// 输出覆盖情况、最长等待与需要复查的异常，不宣称等待一定是不合法动作。
  Map<String, Object?> toJson() => {
    'coverage': _coverage,
    'counts': _counts,
    'maxWaitSeconds': _maxWait,
    'issues': _issues,
  };
}
