part of 'campaign.dart';

/// 有界诊断保留真正执行的命令、过期原因及主环境成本。
class NationalAiDiagnostics {
  /// 最近帧的主环境 AI 用时，包含准备和提交，不包含后台计算。
  int frameMicros = 0, maxFrameMicros = 0, maxObservationAgeTicks = 0;
  final _frames = <int>[];
  int _receivedMicros = 0;
  AiWorkerMetrics? _worker;

  /// 开始记录一个实际显示帧对应的推进调用。
  void beginFrame() {
    final received = worker?.receiveMicros ?? 0;
    frameMicros = math.max(0, received - _receivedMicros);
    _receivedMicros = received;
  }

  /// 记录有界分位数样本。
  void endFrame() {
    if (frameMicros > maxFrameMicros) maxFrameMicros = frameMicros;
    _frames.add(frameMicros);
    if (_frames.length > 600) _frames.removeAt(0);
  }

  /// 获取主环境最近帧用时分位数。
  int percentile(double q) {
    if (_frames.isEmpty) return 0;
    final data = List<int>.of(_frames)..sort();
    return data[((data.length - 1) * q).round()];
  }

  /// 最大准备/提交微秒数及回复计数。
  int snapshotMicros = 0,
      commitMicros = 0,
      accepted = 0,
      rejected = 0,
      commands = 0,
      emergencyRepairs = 0;

  /// 近期解释，不逐帧堆积相同记录。
  final List<String> events = [];

  /// 当前请求和持续任务的有界资源数量。
  int snapshotBytes = 0, taskCount = 0;

  /// 后端测量由常驻工作服务提供。
  AiWorkerMetrics? get worker => _worker;
  set worker(AiWorkerMetrics? value) {
    _worker = value;
    _receivedMicros = 0;
  }

  /// 记录状态变化。
  void record(String text) {
    if (events.lastOrNull == text) return;
    events.add(text);
    if (events.length > 96) events.removeAt(0);
  }

  /// 导出当前测量和解释。
  Map<String, Object?> toJson() => {
    'mainFrameP50Micros': percentile(.5),
    'mainFrameP95Micros': percentile(.95),
    'mainFrameP99Micros': percentile(.99),
    'mainFrameMaxMicros': maxFrameMicros,
    'maxObservationAgeTicks': maxObservationAgeTicks,
    'snapshotMicros': snapshotMicros,
    'commitMicros': commitMicros,
    'accepted': accepted,
    'rejected': rejected,
    'commands': commands,
    'emergencyRepairs': emergencyRepairs,
    'snapshotBytes': snapshotBytes,
    'taskCount': taskCount,
    'worker': worker?.toJson(),
    'events': List.of(events),
  };
}

extension _AiCommands on CampaignState {
  bool _commitAiReply(AiReply reply, _AiCoordinator coordinator) {
    final watch = Stopwatch()..start();
    final tick = (_strategyTime * 60).round();
    final diagnostics = coordinator.diagnostics;
    bool reject(String why) {
      diagnostics.rejected++;
      diagnostics.record('国家 ${reply.country} 建议过期：$why');
      coordinator.urgent(reply.country);
      return false;
    }

    if (reply.session != coordinator.session ||
        reply.rulesVersion != coordinator.rules.version ||
        reply.mapVersion != coordinator.map.version ||
        coordinator.latest[reply.country] != reply.id ||
        coordinator.applied[reply.country] == reply.id ||
        reply.deadlineTick < tick ||
        tick - reply.observedTick >
            GameConfig.nationalAi.maximumRequestAge * 60 ||
        reply.error != null ||
        !_automatedCountry(reply.country)) {
      return reject(reply.error ?? '会话、规则、时限或请求身份不符');
    }
    final count = reply.plan.groups.fold(0, (n, g) => n + g.actions.length);
    if (count > GameConfig.nationalAi.maxCommands) return reject('命令组超过预算');
    // 整份回复进入同一固定命令阶段；前一组的合法变化不会误判后一组旧版本。
    final dependencies = <String, String>{};
    for (final group in reply.plan.groups) {
      dependencies.addAll(group.dependencies);
    }
    for (final entry in dependencies.entries) {
      String? now;
      if (entry.key.startsWith('h:')) {
        final hero = heroes
            .where((h) => h.id == entry.key.substring(2))
            .firstOrNull;
        if (hero != null) now = _aiHeroRevision(hero, reply.country);
      } else if (entry.key.startsWith('c:')) {
        final id = int.tryParse(entry.key.substring(2));
        if (cities.containsKey(id)) now = _aiCityRevision(id!);
      }
      if (now != entry.value) return reject('相关英雄或城池已变化');
    }
    coordinator.applied[reply.country] = reply.id;
    diagnostics.maxObservationAgeTicks = math.max(
      diagnostics.maxObservationAgeTicks,
      tick - reply.observedTick,
    );
    diagnostics.accepted++;
    final plan = _warPlans.putIfAbsent(reply.country, CountryWarPlan._);
    plan.targetCityId = reply.plan.targetCity;
    plan.targetCountryId = cities[plan.targetCityId]?.ownerCountryId;
    plan.phase = switch (reply.plan.phase) {
      'defending' => CountryWarPhase.defending,
      'saving' => CountryWarPhase.saving,
      'attacking' => CountryWarPhase.attacking,
      _ => CountryWarPhase.preparing,
    };
    plan.requiredGold = reply.plan.requiredGold;
    plan.requiredHeroes = reply.plan.requiredHeroes;
    for (final note in reply.plan.notes) {
      diagnostics.record('${world.countryName(reply.country)}国：$note');
    }
    var changed = false;
    for (final group in reply.plan.groups) {
      if (!_aiGroupBudget(group, reply.country)) {
        reject('当前资源不足以完成整组动作和预留');
        break;
      }
      var successful = true;
      for (final action in group.actions) {
        final hero = heroes.where((h) => h.id == action.hero).firstOrNull;
        final point =
            action.city != null &&
                (action.kind == AiActionKind.dispatch ||
                    action.kind == AiActionKind.move)
            ? cityBounds(world.cities.firstWhere((c) => c.id == action.city))
                  .center
            : action.point == null
            ? null
            : Offset(action.point!.x, action.point!.y);
        bool ok;
        switch (action.kind) {
          case AiActionKind.upgrade:
            ok =
                action.city != null &&
                hero != null &&
                upgradeCity(action.city!, hero: hero, countryId: reply.country);
          case AiActionKind.dismiss:
            ok =
                hero != null &&
                dismissHero(hero, countryId: reply.country) != null;
          case AiActionKind.recruit:
            ok = false;
            if (action.city != null && _aiSafeRecruitment(action.city!)) {
              final offer = drawHero(action.city!, countryId: reply.country);
              ok = offer != null;
              if (ok && reply.country == 0) {
                ok = signHero(offer, countryId: 0) != null;
              }
            }
          case AiActionKind.soldiers:
            ok =
                action.city != null &&
                buySoldiers(
                  action.city!,
                  action.amount,
                  countryId: reply.country,
                );
          case AiActionKind.buyWeapon:
            ok = buyWeapon(action.amount, countryId: reply.country);
          case AiActionKind.dispatch:
            ok =
                hero != null &&
                point != null &&
                dispatchTo(
                      hero,
                      point,
                      countryId: reply.country,
                      weaponSlots: {
                        for (var i = 0; i < action.weaponIds.length; i++)
                          i: action.weaponIds[i],
                      },
                    ) !=
                    null;
          case AiActionKind.move:
            ok =
                hero != null &&
                point != null &&
                moveTo(hero.id, point, countryId: reply.country);
          case AiActionKind.camp:
            ok = hero != null && camp(hero.id, countryId: reply.country);
          case AiActionKind.retreat:
            ok =
                hero != null &&
                retreatHero(hero.id, countryId: reply.country) != null;
        }
        if (!ok) {
          successful = false;
          diagnostics.record(
            '国家 ${reply.country} 的 ${action.kind.name} 已失效，停止后续依赖动作',
          );
          coordinator.urgent(reply.country);
          break;
        }
        changed = true;
        diagnostics.commands++;
      }
      if (!successful) break;
      for (final task in group.tasks) {
        final hero = heroes
            .where((h) => h.id == task.hero && h.countryId == reply.country)
            .firstOrNull;
        if (hero == null || _disbandAfterBattle.contains(hero.id)) continue;
        coordinator.tasks[task.hero] = task.withLeg(
          task.leg,
          _aiOrderVersions[task.hero] ?? 0,
        );
      }
      diagnostics.record(
        '${world.countryName(reply.country)}国：${group.reason}',
      );
    }
    coordinator.idleCycles[reply.country] = changed
        ? 0
        : (coordinator.idleCycles[reply.country] ?? 0) + 1;
    if (watch.elapsedMicroseconds > diagnostics.commitMicros) {
      diagnostics.commitMicros = watch.elapsedMicroseconds;
    }
    return changed;
  }

  bool _aiGroupBudget(AiCommandGroup group, int countryId) {
    var gold = goldFor(countryId),
        reserve = reserveSoldiersFor(countryId),
        capacity = reserveCapacityFor(countryId);
    final levels = {for (final c in cities.entries) c.key: c.value.level},
        stock = Map<int, int>.of(_weaponStock[countryId] ?? {}),
        removed = <String>{};
    for (final action in group.actions) {
      if (action.city != null && !cities.containsKey(action.city)) return false;
      final hero = heroes.where((h) => h.id == action.hero).firstOrNull;
      final city = cities[action.city];
      switch (action.kind) {
        case AiActionKind.upgrade:
          if (hero == null ||
              city?.ownerCountryId != countryId ||
              _upgradeParticipantProblem(action.city!, hero, countryId) !=
                  null ||
              removed.contains(hero.id)) {
            return false;
          }
          final level = levels[action.city]!;
          if (level >= GameConfig.maxCityLevel) return false;
          gold -= math.max(
            0,
            GameConfig.cityUpgradeCosts[level - 1] - hero.politics,
          );
          levels[action.city!] = level + 1;
          capacity +=
              (GameConfig.cityReserveCapacityPerLevel *
                      (city!.isNative ? 1 : GameConfig.foreignCityYieldFactor))
                  .floor();
        case AiActionKind.dismiss:
          if (hero == null ||
              !removed.add(hero.id) ||
              dismissalBlockReason(hero, countryId: countryId) != null) {
            return false;
          }
          gold += dismissalGold(hero);
          capacity = math.max(
            0,
            capacity - GameConfig.cityReserveCapacityPerHero,
          );
          reserve = math.min(capacity, reserve);
        case AiActionKind.recruit:
          if (city?.ownerCountryId != countryId ||
              recruitmentBlockReason(action.city!, countryId: countryId) !=
                  null ||
              !_aiSafeRecruitment(action.city!)) {
            return false;
          }
          gold -=
              GameConfig.heroDrawCost +
              math.max(
                GameConfig.advancedSigningFee,
                GameConfig.normalSigningFee,
              );
          capacity += GameConfig.cityReserveCapacityPerHero;
        case AiActionKind.soldiers:
          if (city?.ownerCountryId != countryId ||
              action.amount < 1 ||
              reserve + action.amount > capacity) {
            return false;
          }
          gold -= action.amount * GameConfig.soldierRecruitCost;
          reserve += action.amount;
        case AiActionKind.buyWeapon:
          final weapon = weaponCatalog.weapons[action.amount];
          if (weapon == null || !weaponUnlocked(countryId, weapon)) {
            return false;
          }
          gold -= weapon.price;
          stock.update(weapon.id, (n) => n + 1, ifAbsent: () => 1);
        case AiActionKind.dispatch:
          if (hero == null ||
              removed.contains(hero.id) ||
              _dispatchProblem(hero, countryId, requireGold: false) != null ||
              gold <= 0) {
            return false;
          }
          reserve -= math.min(
            reserve,
            GameConfig.heroSoldierLimit - hero.soldiers,
          );
          if (action.weaponIds.length > weaponCatalog.carryLimit) return false;
          for (final id in action.weaponIds) {
            if ((stock[id] ?? 0) == 0) return false;
            stock[id] = stock[id]! - 1;
          }
        case AiActionKind.move:
          if (hero == null ||
              _moveProblem(hero.id, countryId, requireGold: false) != null ||
              gold <= 0) {
            return false;
          }
        case AiActionKind.camp:
          if (hero == null ||
              campBlockReason(hero.id, countryId: countryId) != null) {
            return false;
          }
        case AiActionKind.retreat:
          if (hero == null ||
              retreatBlockReason(hero.id, countryId: countryId) != null) {
            return false;
          }
      }
      if (gold < 0) return false;
    }
    if (gold < group.minimumGold) return false;
    for (final task in group.tasks) {
      final hero = heroes.where((h) => h.id == task.hero).firstOrNull;
      if (hero == null ||
          _disbandAfterBattle.contains(hero.id) ||
          task.deadlineTick <= _strategyTime * 60 ||
          task.points.isEmpty) {
        return false;
      }
      if (task.arrivalSlot && task.city != null) {
        if (cities[task.city]?.ownerCountryId != countryId) return false;
        final occupancy = garrisonAt(task.city!)
            .where((h) => h.health.alive && !removed.contains(h.id))
            .length;
        final slots = _aiSafetySlots(
          task.city!,
          overrideLevel: levels[task.city],
        );
        if (_aiThreatened(task.city!) && occupancy >= slots) return false;
      }
      final position =
          marches[hero.id]?.position ??
          _departurePoint(
            world.cities.firstWhere((c) => c.id == hero.cityId),
            Offset(task.points.first.x, task.points.first.y),
          );
      var from = position, travel = 0.0;
      for (final p in task.points.take(4)) {
        final point = Offset(p.x, p.y);
        if (!_containsPoint(point)) return false;
        travel += estimateMarchSeconds(world, from, point);
        from = point;
      }
      if (_strategyTime + travel + GameConfig.nationalAi.reactionMargin >=
          task.deadlineTick / 60) {
        return false;
      }
    }
    return true;
  }
}
