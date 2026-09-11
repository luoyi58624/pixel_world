part of '../campaign.dart';

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
    final decisionId = coordinator.decisionId(
      reply.country,
      reply.id,
      workerSession: reply.session,
    );
    var appliedInReply = 0;
    _emitEvent(
      GameEventKind.planProposed,
      switch (reply.plan.phase) {
        'attacking' => '提出进攻计划',
        'defending' => '提出守城和回援计划',
        'saving' => '规划积蓄资金与备战',
        _ => '提出经营与将领调度计划',
      },
      countryId: reply.country,
      cityId: reply.plan.targetCity,
      source: GameEventSource.ai,
      phase: GameEventPhase.planned,
      decisionId: decisionId,
      reason: reply.plan.notes.join('；'),
      data: {
        'observedTick': reply.observedTick,
        'receivedTick': tick,
        'planningMicros': reply.planningMicros,
        'error': reply.error,
        'plan': reply.plan.toJson(),
      },
    );
    bool reject(String why) {
      diagnostics.rejected++;
      diagnostics.record('国家 ${reply.country} 建议过期：$why');
      coordinator.urgent(reply.country);
      _emitEvent(
        GameEventKind.planRejected,
        appliedInReply == 0 ? '计划未执行' : '计划只执行了部分指令，后续已停止',
        countryId: reply.country,
        source: GameEventSource.ai,
        phase: GameEventPhase.rejected,
        decisionId: decisionId,
        reason: why,
        data: {
          'observedTick': reply.observedTick,
          'currentTick': tick,
          'appliedCommandCount': appliedInReply,
        },
      );
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
    final schedule = coordinator._schedules[reply.country];
    if (schedule?.defenseAlarmPending == true &&
        schedule?.pending?.stage == AiDecisionStage.attack) {
      return reject('敌军越境，先重新评估防守');
    }
    if (count > GameConfig.nationalAi.maxCommands) return reject('命令组超过预算');
    final assignedHeroes = <String>{};
    for (final task in reply.plan.groups.expand((g) => g.tasks)) {
      if (!assignedHeroes.add(task.hero)) return reject('同一将领被重复分配任务');
    }
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
    _emitEvent(
      GameEventKind.planAccepted,
      reply.plan.targetCity != null && cities.containsKey(reply.plan.targetCity)
          ? '针对${cityName(reply.plan.targetCity!)}国的计划通过校验，开始依次执行'
          : '计划通过校验，开始依次执行',
      countryId: reply.country,
      source: GameEventSource.ai,
      phase: GameEventPhase.observed,
      decisionId: decisionId,
      data: {'groupCount': reply.plan.groups.length},
    );
    final plan = _warPlans.putIfAbsent(reply.country, CountryWarPlan._);
    if (!cities.values.any(
      (c) => c.ownerCountryId == plan.offensiveCountryId,
    )) {
      plan.offensiveCountryId = null;
      plan.offensiveCityId = null;
    }
    final candidateCountry = cities[reply.plan.targetCity]?.ownerCountryId;
    final expeditionInProgress = coordinator.tasks.values.any(
      (task) =>
          task.role == 'expedition' &&
          marches[task.hero]?.hero.countryId == reply.country,
    );
    final committingAttack =
        reply.plan.requiredGold > 0 ||
        reply.plan.groups.any(
          (g) =>
              g.actions.any(
                (a) =>
                    a.kind == AiActionKind.buyWeapon ||
                    a.kind == AiActionKind.dispatch,
              ) &&
              (reply.plan.phase == 'attacking' ||
                  reply.plan.phase == 'preparing' ||
                  reply.plan.phase == 'saving'),
        );
    if (committingAttack &&
        candidateCountry != null &&
        candidateCountry != reply.country &&
        (plan.offensiveCountryId == null ||
            plan.offensiveCountryId == candidateCountry ||
            !expeditionInProgress)) {
      plan.offensiveCountryId = candidateCountry;
      plan.offensiveCityId = reply.plan.targetCity;
    }
    final retainSaving =
        plan.phase == CountryWarPhase.saving &&
        reply.plan.phase == 'preparing' &&
        reply.plan.groups.isEmpty;
    if (!retainSaving) {
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
    }
    for (final note in reply.plan.notes) {
      diagnostics.record('${world.countryName(reply.country)}国：$note');
    }
    var changed = false;
    var groupIndex = 0;
    final decisionBefore = _eventResources(reply.country);
    final executedActions = <Map<String, Object?>>[];
    final assignedTasks = <Map<String, Object?>>[];
    final decisionReasons = <String>{};
    String? executionFailure;
    for (final group in reply.plan.groups) {
      if (!_aiGroupBudget(group, reply.country)) {
        executionFailure =
            group.actions
                .where((a) => a.kind == AiActionKind.recruit && a.city != null)
                .map(
                  (a) =>
                      recruitmentBlockReason(a.city!, countryId: reply.country),
                )
                .whereType<String>()
                .firstOrNull ??
            '当前资源、入城名额或抵达时限不满足整组计划';
        reject(executionFailure);
        break;
      }
      var successful = true;
      var actionIndex = 0;
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
            : GamePoint(action.point!.x, action.point!.y);
        bool ok;
        final before = _eventResources(reply.country);
        final previousContext = _eventContext;
        _eventContext = (
          countryId: reply.country,
          decisionId: decisionId,
          reason: group.reason,
        );
        try {
          switch (action.kind) {
            case AiActionKind.upgrade:
              ok =
                  action.city != null &&
                  hero != null &&
                  upgradeCity(
                    action.city!,
                    hero: hero,
                    countryId: reply.country,
                  );
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
                        staggerDeparture: true,
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
        } finally {
          _eventContext = previousContext;
        }
        _emitEvent(
          ok ? GameEventKind.commandApplied : GameEventKind.commandRejected,
          ok
              ? '已执行 ${_eventActionLabel(action.kind)}'
              : '${_eventActionLabel(action.kind)}未执行',
          countryId: reply.country,
          hero: hero,
          cityId: action.city,
          source: GameEventSource.ai,
          phase: ok ? GameEventPhase.applied : GameEventPhase.rejected,
          decisionId: decisionId,
          reason: group.reason,
          data: {
            'groupIndex': groupIndex,
            'actionIndex': actionIndex++,
            'action': action.toJson(),
            'before': before,
            'after': _eventResources(reply.country),
          },
        );
        if (!ok) {
          executionFailure = '${_eventActionLabel(action.kind)}未能执行，停止后续依赖动作';
          successful = false;
          diagnostics.record(
            '国家 ${reply.country} 的 ${action.kind.name} 已失效，停止后续依赖动作',
          );
          coordinator.urgent(reply.country);
          break;
        }
        changed = true;
        appliedInReply++;
        diagnostics.commands++;
        executedActions.add({
          'summary': _finalActionSummary(action, hero, group),
          'action': action.toJson(),
          'heroName': hero?.name,
          'before': before,
          'after': _eventResources(reply.country),
        });
        if (group.reason.isNotEmpty) decisionReasons.add(group.reason);
      }
      if (!successful) break;
      for (final task in group.tasks) {
        final hero = heroes
            .where((h) => h.id == task.hero && h.countryId == reply.country)
            .firstOrNull;
        if (hero == null || _disbandAfterBattle.contains(hero.id)) continue;
        final previousTask = coordinator.tasks[task.hero];
        coordinator.tasks[task.hero] = task.withLeg(
          task.leg,
          _aiOrderVersions[task.hero] ?? 0,
        );
        coordinator._taskOwners[task.hero] = reply.country;
        coordinator._taskDecisions[task.hero] = decisionId;
        coordinator._taskNames[task.hero] = hero.name;
        assignedTasks.add({
          'heroName': hero.name,
          'previousTask': previousTask?.toJson(),
          'newTask': coordinator.tasks[task.hero]!.toJson(),
        });
        _emitEvent(
          previousTask == null
              ? GameEventKind.taskAssigned
              : GameEventKind.taskReplaced,
          previousTask == null
              ? '安排${hero.name}执行${_eventTaskLabel(task.role)}${task.city != null && cities.containsKey(task.city) ? '，目标${cityName(task.city!)}国城池' : ''}'
              : '将${hero.name}从${_eventTaskLabel(previousTask.role)}改派为${_eventTaskLabel(task.role)}',
          countryId: reply.country,
          hero: hero,
          cityId: task.city,
          source: GameEventSource.ai,
          decisionId: decisionId,
          reason: task.reason,
          data: {
            'previousTask': previousTask?.toJson(),
            'newTask': coordinator.tasks[task.hero]!.toJson(),
          },
        );
      }
      diagnostics.record(
        '${world.countryName(reply.country)}国：${group.reason}',
      );
      groupIndex++;
    }
    _finalizeAiDecision(
      reply,
      coordinator,
      decisionId: decisionId,
      before: decisionBefore,
      actions: executedActions,
      tasks: assignedTasks,
      reasons: decisionReasons,
      failure: executionFailure,
    );
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
    final upgraded = <int>{}, recruited = <int>{};
    for (final action in group.actions) {
      if (action.city != null && !cities.containsKey(action.city)) return false;
      final hero = heroes.where((h) => h.id == action.hero).firstOrNull;
      final city = cities[action.city];
      final purchase = [
        AiActionKind.upgrade,
        AiActionKind.recruit,
        AiActionKind.soldiers,
        AiActionKind.buyWeapon,
      ].contains(action.kind);
      if (purchase && gold <= 0) return false;
      switch (action.kind) {
        case AiActionKind.upgrade:
          if (hero == null ||
              city?.ownerCountryId != countryId ||
              !upgraded.add(action.city!) ||
              upgradeWindowBlockReason(action.city!) != null ||
              _upgradeParticipantProblem(action.city!, hero, countryId) !=
                  null ||
              removed.contains(hero.id)) {
            return false;
          }
          final level = levels[action.city]!;
          if (level >= cityUpgradeLevelLimit) return false;
          gold -= math.max(
            0,
            GameConfig.cityUpgradeCosts[level - 1] - hero.politics,
          );
          if (gold <= 0) return false;
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

          reserve = math.min(capacity, reserve);
        case AiActionKind.recruit:
          if (city?.ownerCountryId != countryId ||
              !recruited.add(action.city!) ||
              recruitmentBlockReason(action.city!, countryId: countryId) !=
                  null ||
              !_aiSafeRecruitment(action.city!)) {
            return false;
          }
          gold -=
              GameConfig.heroDrawCost +
              _catalog.values
                  .map((h) => h.salaryFor(countryId))
                  .fold(0, math.max);

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
              _dispatchProblem(hero, countryId) != null) {
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
          if (hero == null || _moveProblem(hero.id, countryId) != null) {
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
      if (purchase && gold < 0) {
        return false;
      }
    }
    // 补兵可以花完现有余额；免费调动不受现金限制，其他采购仍保留经营底线。
    final militaryOnly = group.actions.every(
      (a) => ![
        AiActionKind.upgrade,
        AiActionKind.recruit,
        AiActionKind.buyWeapon,
      ].contains(a.kind),
    );
    if (!militaryOnly && gold < group.minimumGold) return false;
    final replacing = group.tasks.map((t) => t.hero).toSet();
    final departing = group.actions
        .where((a) => a.kind == AiActionKind.dispatch)
        .map((a) => a.hero)
        .toSet();
    // 执行前按整个复合动作重新核对，拦住旧快照或多动作合并后派空/解雇空城。
    for (final entry in cities.entries.where(
      (e) => e.value.ownerCountryId == countryId,
    )) {
      final guards = garrisonAt(entry.key)
          .where((h) => h.health.alive)
          .toList();
      if (guards.isEmpty ||
          guards.any(
            (h) => !removed.contains(h.id) && !departing.contains(h.id),
          )) {
        continue;
      }
      final evacuation =
          group.emergency &&
          cities.values.where((c) => c.ownerCountryId == countryId).length >
              1 &&
          _aiThreatened(entry.key) &&
          guards.every(
            (h) =>
                !removed.contains(h.id) &&
                group.tasks.any(
                  (t) =>
                      t.hero == h.id &&
                      t.role == 'evacuate' &&
                      t.arrivalSlot &&
                      t.city != entry.key &&
                      cities[t.city]?.ownerCountryId == countryId,
                ),
          );
      final mobilization =
          guards.every(
            (h) => !removed.contains(h.id) && departing.contains(h.id),
          ) &&
          _aiSafeRear(entry.key);
      if (!evacuation && !mobilization) return false;
    }
    final incoming = <int, int>{};
    for (final task in _ai?.tasks.values ?? <ArmyTask>[]) {
      final march = marches[task.hero];
      if (!task.arrivalSlot ||
          task.city == null ||
          replacing.contains(task.hero) ||
          march == null ||
          march.hero.countryId != countryId ||
          !march.hero.health.alive ||
          _disbandAfterBattle.contains(task.hero) ||
          task.deadlineTick < _strategyTime * 60 ||
          task.expectedOrderRevision != (_aiOrderVersions[task.hero] ?? 0) ||
          cities[task.city]?.ownerCountryId != countryId) {
        continue;
      }
      incoming.update(task.city!, (n) => n + 1, ifAbsent: () => 1);
    }
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
        final occupancy =
            garrisonAt(task.city!)
                .where(
                  (h) =>
                      h.health.alive &&
                      !removed.contains(h.id) &&
                      !departing.contains(h.id),
                )
                .length +
            (incoming[task.city] ?? 0);
        final slots = _aiSafetySlots(
          task.city!,
          overrideLevel: levels[task.city],
        );
        if (_aiThreatened(task.city!) && occupancy >= slots) return false;
        incoming.update(task.city!, (n) => n + 1, ifAbsent: () => 1);
      }
      final position =
          marches[hero.id]?.position ??
          _departurePoint(
            world.cities.firstWhere((c) => c.id == hero.cityId),
            GamePoint(task.points.first.x, task.points.first.y),
          );
      var from = position, travel = 0.0;
      for (final p in task.points.take(4)) {
        final point = GamePoint(p.x, p.y);
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
