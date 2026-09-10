part of '../campaign.dart';

int _aiSessionSerial = 0;

class _AiCoordinator {
  _AiCoordinator(this.campaign, this.factory);
  final CampaignState campaign;
  final AiWorker Function() factory;
  final diagnostics = NationalAiDiagnostics();
  final tasks = <String, ArmyTask>{};
  final _taskOwners = <String, int>{};
  final _taskDecisions = <String, String>{};
  final _taskNames = <String, String>{};
  final latest = <int, int>{},
      applied = <int, int>{},
      idleCycles = <int, int>{};
  final _lastRequest = <int, double>{}, _urgent = <int>{};
  final _seeds = <int, int>{};
  final _knownThreats = <int, int>{};
  final _urgentReasons = <int, Set<String>>{};
  // 仅用于日志去重，不参与规划、预算或将领调度。
  final _lastDecisionLogState = <int, String>{};
  final _schedules = <int, CountryAiSchedule>{};
  AiWorker? worker;
  late AiRules rules;
  late AiMap map;
  String session = '';
  var _serial = 0;
  int _lastProfileTick = -60;
  void _ensure() {
    if (worker != null) return;
    session = '${campaign.world.id}:${++_aiSessionSerial}';
    rules = campaign._createAiRules();
    map = campaign._createAiMap();
    if (campaign.events.enabled && campaign.events.captureAiSnapshots) {
      campaign._emitEvent(
        GameEventKind.workerState,
        '保存决策复核所需的静态规则和地图',
        source: GameEventSource.system,
        data: {'rules': rules.toJson(), 'map': map.toJson()},
      );
    }
    worker = factory();
    diagnostics.worker = worker!.metrics;
    worker!.metrics.onTrace = _traceWorker;
    worker!.initialize(rules, map);
  }

  void urgent(int country, {String reason = '局势发生变化'}) {
    _urgent.add(country);
    _urgentReasons.putIfAbsent(country, () => {}).add(reason);
  }

  String decisionId(int country, int request, {String? workerSession}) =>
      '${workerSession ?? session}:country:$country:request:$request';

  void _traceWorker(String kind, Map<String, Object?> data) {
    final country = data['country'] as int?, id = data['id'] as int?;
    if (country != null &&
        id != null &&
        ['replyDropped', 'requestDropped', 'cancelled'].contains(kind)) {
      _schedules[country]?.finish(id, campaign._strategyTime, adopted: false);
    }
    final rejected = [
      'replyDropped',
      'requestDropped',
      'cancelled',
      'failure',
      'degraded',
    ].contains(kind);
    final label = switch (kind) {
      'queued' => '决策进入队列',
      'dispatched' => '后台开始计算',
      'cancelRequested' => '请求取消旧计算',
      'cancelled' => '旧计算已取消',
      'replyDropped' => '丢弃旧回复',
      'requestDropped' => '请求未执行',
      'starting' => '国家决策后台启动',
      'ready' => '国家决策后台就绪',
      'failure' => '后台发生故障',
      'degraded' => '后台降级',
      'closed' => '国家决策后台已关闭',
      _ => kind,
    };
    campaign._emitEvent(
      rejected
          ? GameEventKind.workerDropped
          : country == null
          ? GameEventKind.workerState
          : GameEventKind.workerQueue,
      label,
      countryId: country,
      source: GameEventSource.ai,
      phase: rejected
          ? GameEventPhase.rejected
          : kind == 'cancelRequested'
          ? GameEventPhase.planned
          : GameEventPhase.observed,
      decisionId: country == null || id == null
          ? null
          : decisionId(country, id, workerSession: data['session'] as String?),
      reason: data['reason'] as String?,
      data: {'state': kind, ...data},
    );
  }

  void pause() {
    worker?.close();
    worker = null;
    latest.clear();
    applied.clear();
    _lastRequest.clear();
    _urgent.clear();
    _urgentReasons.clear();
    for (final schedule in _schedules.values) {
      schedule.suspend();
    }
    session = 'closed';
  }

  void requestLatest() {
    final cost = Stopwatch()..start();
    try {
      _ensure();
      final tick = (campaign._strategyTime * 60).round();
      worker!.pump(tick);
      if (worker!.status == AiWorkerStatus.degraded) {
        diagnostics.record('后台不可用：${worker!.metrics.error}；仅执行有界守城安全保护');
        return;
      }
      final countries =
          campaign.cities.values
              .map((c) => c.ownerCountryId)
              .where(campaign._automatedCountry)
              .toSet()
              .toList()
            ..sort();
      final due = <int, AiDecisionStage>{};
      for (final id in countries) {
        final schedule = _schedules.putIfAbsent(
          id,
          () => CountryAiSchedule(rules.tuning),
        );
        final pending = schedule.pending;
        if (pending != null && pending.deadlineTick < tick) {
          schedule.finish(pending.id, campaign._strategyTime, adopted: false);
        }
        final stage = schedule.due(campaign._strategyTime);
        if (stage != null) due[id] = stage;
      }
      if (due.isEmpty) return;
      final waiting = due.keys.toList()
        ..sort((a, b) {
          // 排队资历优先，紧急标记不再让某国每半秒插队重算。
          final age = (_lastRequest[a] ?? -100).compareTo(
            _lastRequest[b] ?? -100,
          );
          return age != 0 ? age : a.compareTo(b);
        });
      final country = waiting.first;
      final stage = due[country]!;
      // 仅在该国调度到期时扫描，避免每一帧遍历所有城池和部队。
      final threats = <int, int>{};
      for (final city in campaign.world.cities) {
        final owner = campaign.cities[city.id]!.ownerCountryId;
        if (owner == country && campaign._aiThreatened(city.id)) {
          threats[city.id] = owner;
        }
      }
      for (final entry in threats.entries) {
        if (_knownThreats[entry.key] == entry.value) continue;
        final battle = campaign.battles[entry.key];
        campaign._emitEvent(
          GameEventKind.threatDetected,
          '${campaign.cityName(entry.key)}国城池出现威胁，准备判断守城、回援或撤离',
          countryId: entry.value,
          cityId: entry.key,
          targetCountryId: battle?.isActive == true
              ? battle!.attacker.countryId
              : null,
          source: GameEventSource.ai,
          phase: GameEventPhase.observed,
          reason: battle?.isActive == true ? '已经发生攻城' : '根据可见敌军的位置和运动判断',
          data: {
            'garrison': [for (final h in campaign.garrisonAt(entry.key)) h.id],
            'safeSlots': campaign._aiSafetySlots(entry.key),
            'resources': campaign._eventResources(entry.value),
          },
        );
      }
      for (final entry in _knownThreats.entries) {
        if (entry.value != country) continue;
        if (threats[entry.key] == entry.value) continue;
        campaign._emitEvent(
          GameEventKind.threatCleared,
          '重新检查城池威胁状态',
          countryId: entry.value,
          cityId: entry.key,
          source: GameEventSource.ai,
          phase: GameEventPhase.observed,
          reason: campaign.cities[entry.key]?.ownerCountryId == entry.value
              ? '当前不再观察到接近中的威胁'
              : '城池归属已经改变',
        );
      }
      _knownThreats
        ..removeWhere((key, value) => value == country)
        ..addAll(threats);
      final requestPriority = _urgent.contains(country) || threats.isNotEmpty
          ? 2
          : 0;
      final trigger = [
        if (!_lastRequest.containsKey(country)) '开局或恢复决策',
        if (threats.containsValue(country)) '家里有危险，重新判断防守',
        ...?_urgentReasons.remove(country),
      ];
      _urgent.remove(country);
      final watch = Stopwatch()..start();
      final observation = campaign._observeAi(country);
      final request = AiRequest(
        session: session,
        id: ++_serial,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: observation,
        deadlineTick: tick + (rules.tuning.maximumRequestAge * 60).round(),
        priority: requestPriority,
        tasks: tasks.values
            .where((t) => observation.hero(t.hero)?.country == country)
            .toList(),
        seed: _seeds.putIfAbsent(
          country,
          () => campaign._aiRandom.nextInt(1 << 30),
        ),
        idleCycles: idleCycles[country] ?? 0,
        stage: stage,
      );
      _schedules[country]!.submitted(request);
      latest[country] = request.id;
      _lastRequest[country] = campaign._strategyTime;
      campaign._aiStrategicDecisions++;
      campaign._emitEvent(
        GameEventKind.decisionRequested,
        '开始判断本国局势和将领任务',
        countryId: country,
        source: GameEventSource.ai,
        phase: GameEventPhase.planned,
        decisionId: decisionId(country, request.id),
        reason: trigger.isEmpty ? '定期复查任务与资源' : trigger.join('；'),
        data: {
          'requestId': request.id,
          'stage': stage.name,
          'rulesVersion': rules.version,
          'mapVersion': map.version,
          'preferenceSeed': request.seed,
          'idleCycles': request.idleCycles,
          'priority': requestPriority,
          'observedTick': tick,
          'deadlineTick': request.deadlineTick,
          'resources': campaign._eventResources(country),
          'tasks': request.tasks.map((t) => t.toJson()).toList(),
          if (campaign.events.captureAiSnapshots)
            'observation': observation.toJson(),
        },
      );
      diagnostics.snapshotBytes = utf8
          .encode(jsonEncode(request.toJson()))
          .length;
      if (watch.elapsedMicroseconds > diagnostics.snapshotMicros) {
        diagnostics.snapshotMicros = watch.elapsedMicroseconds;
      }
      worker!.submit(request);
      if (const bool.fromEnvironment('AI_PROFILE') &&
          tick - _lastProfileTick >= 60) {
        _lastProfileTick = tick;
        final data = diagnostics.toJson()..remove('events');
        data['tick'] = tick;
        data['armies'] = campaign.marches.length;
        data['queue'] = worker!.pendingCount;
        // 本地性能验收输出，正式构建默认移除此分支。
        // ignore: avoid_print
        print('AI_PROFILE:${jsonEncode(data)}');
      }
    } finally {
      diagnostics.frameMicros += cost.elapsedMicroseconds;
    }
  }

  bool commitAndTasks() {
    final cost = Stopwatch()..start();
    try {
      var changed = false;
      worker?.pump((campaign._strategyTime * 60).round());
      for (final reply in worker?.takeReplies() ?? <AiReply>[]) {
        campaign._aiRouteEstimates += reply.plan.routeSteps;
        changed = campaign._commitAiReply(reply, this) || changed;
        if (reply.session == session) {
          _schedules[reply.country]?.finish(
            reply.id,
            campaign._strategyTime,
            adopted: applied[reply.country] == reply.id,
          );
        }
      }
      for (final entry in campaign._aiRearDeadlines.entries.toList()) {
        if (campaign.garrisonAt(entry.key).length <=
            campaign._aiSafetySlots(entry.key)) {
          campaign._aiRearDeadlines.remove(entry.key);
          continue;
        }
        if (campaign._strategyTime >= entry.value) {
          diagnostics.record('${entry.key} 城后方整备期限到达，处理尚未疏散的额外驻军');
          changed = campaign._protectAiCity(entry.key, force: true) || changed;
          campaign._aiRearDeadlines.remove(entry.key);
        }
      }
      for (final task in tasks.values.toList()) {
        final hero = campaign.heroes
            .where((h) => h.id == task.hero)
            .firstOrNull;
        final march = campaign.marches[task.hero];
        if (hero == null ||
            march == null ||
            campaign._disbandAfterBattle.contains(task.hero) ||
            !hero.health.alive) {
          tasks.remove(task.hero);
          _taskEnded(
            task,
            hero,
            hero == null
                ? '将领已经离队'
                : march == null
                ? '将领已经进驻城池'
                : '将领战败或被标记清除',
          );
          continue;
        }
        if (campaign.activeBattleForHero(task.hero) != null ||
            march.returningFromRetreat) {
          continue;
        }
        if (task.expectedOrderRevision !=
                (campaign._aiOrderVersions[task.hero] ?? 0) ||
            task.deadlineTick < campaign._strategyTime * 60) {
          tasks.remove(task.hero);
          _taskEnded(
            task,
            hero,
            task.deadlineTick < campaign._strategyTime * 60
                ? '任务已超过时限'
                : '将领收到其他指令',
          );
          urgent(hero.countryId);
          continue;
        }
        if (march.phase == MarchPhase.camped &&
            task.leg + 1 < task.points.length &&
            !march.supplyHalted) {
          final next = task.points[task.leg + 1];
          final endCity =
              task.leg + 2 == task.points.length && task.role != 'intercept'
              ? campaign.world.cities
                    .where((c) => c.id == task.city)
                    .firstOrNull
              : null;
          if (campaign.moveTo(
            hero.id,
            endCity == null
                ? GamePoint(next.x, next.y)
                : campaign.cityBounds(endCity).center,
            countryId: hero.countryId,
          )) {
            tasks[hero.id] = task.withLeg(
              task.leg + 1,
              campaign._aiOrderVersions[hero.id] ?? 0,
            );
            campaign._emitEvent(
              GameEventKind.taskAdvanced,
              '${hero.name}继续任务的下一段路线',
              hero: hero,
              cityId: task.city,
              source: GameEventSource.ai,
              reason: task.reason,
              decisionId: _taskDecisions[hero.id],
              data: {
                'before': task.toJson(),
                'after': tasks[hero.id]!.toJson(),
              },
            );
            changed = true;
          }
        }
      }
      diagnostics.taskCount = tasks.length;
      return changed;
    } finally {
      diagnostics.frameMicros += cost.elapsedMicroseconds;
    }
  }

  void _taskEnded(ArmyTask task, CampaignHero? hero, String reason) {
    final country = _taskOwners.remove(task.hero) ?? hero?.countryId;
    final name = _taskNames.remove(task.hero) ?? hero?.name ?? task.hero;
    campaign._emitEvent(
      GameEventKind.taskEnded,
      '$name 的${campaign._eventTaskLabel(task.role)}任务结束',
      countryId: country,
      hero: hero,
      heroId: task.hero,
      heroName: name,
      cityId: task.city,
      source: GameEventSource.ai,
      decisionId: _taskDecisions.remove(task.hero),
      reason: reason,
      data: {'task': task.toJson()},
    );
  }
}

extension _AiSafety on CampaignState {
  bool _automatedCountry(int id) => aiEnabled && (id != 0 || aiControlsPlayer);

  int _aiSafetySlots(int id, {int? overrideLevel}) {
    final battle = battles[id];
    return battle?.isActive == true
        ? math.max(
            0,
            battle!.initialCityLevel -
                battle.victories -
                (!battle._settled &&
                        battle.nextWaveIn == 0 &&
                        heroes.contains(battle.defender) &&
                        !battle.defender.health.alive &&
                        battle.attacker.health.alive
                    ? 1
                    : 0),
          )
        : (overrideLevel ?? cities[id]!.level);
  }

  bool _aiThreatened(int id) {
    if (battles[id]?.isActive == true) return true;
    final definition = world.cities.firstWhere((c) => c.id == id),
        owner = cities[id]!.ownerCountryId;
    final center = cityBounds(definition).center;
    for (final march in marches.values) {
      if (march.hero.countryId == owner ||
          !march.hero.health.alive ||
          !march.visibleOnMap) {
        continue;
      }
      final delta = center - march.position, distance = delta.distance;
      if (distance < 72) return true;
      if (distance >
          GameConfig.baseMarchSpeed * GameConfig.nationalAi.threatSeconds +
              80) {
        continue;
      }
      final velocity = _aiVelocity[march.hero.id] ?? GamePoint.zero;
      if (velocity.distance < .01) continue;
      final alignment =
          (delta.dx * velocity.dx + delta.dy * velocity.dy) /
          (distance * velocity.distance);
      final perpendicular =
          distance * math.sqrt(math.max(0, 1 - alignment * alignment));
      if (alignment > .65 &&
          perpendicular < cityBounds(definition).longestSide / 2 + 48 &&
          distance / GameConfig.baseMarchSpeed <
              GameConfig.nationalAi.threatSeconds) {
        return true;
      }
    }
    return false;
  }

  bool _aiSafeRecruitment(int id) {
    final city = cities[id];
    if (city == null) return false;
    if (!_automatedCountry(city.ownerCountryId)) return true;
    // AI 自身保持安全名额，玩家仍使用原来的等级加一招募规则。
    return garrisonAt(id).where((h) => h.health.alive).length <
        _aiSafetySlots(id);
  }

  bool _aiAllowArrival(HeroMarch march) {
    if (!_automatedCountry(march.hero.countryId)) return true;
    final id = march.target!.id;
    if (garrisonAt(id).where((h) => h.health.alive).length <
        _aiSafetySlots(id)) {
      return true;
    }
    final rear =
        !_aiThreatened(id) &&
        (march.returningFromRetreat ||
            _ai?.tasks[march.hero.id]?.role == 'regroup');
    if (rear &&
        garrisonAt(id).length <
            cities[id]!.recruitCapacity +
                GameConfig.nationalAi.rearStagingExtra) {
      _aiRearDeadlines.putIfAbsent(
        id,
        () => _strategyTime + GameConfig.nationalAi.commitmentSeconds * 2,
      );
      _ai?.urgent(march.hero.countryId);
      return true;
    }
    if (march.returningFromRetreat) {
      _protectAiCity(id, force: true, expectedArrivals: 1);
      if (garrisonAt(id).length >= _aiSafetySlots(id)) {
        _ai?.diagnostics.record(
          'unsalvageableDefense：$id 城无法为已锁定返程的将领腾出名额，按原入城规则结算',
        );
      }
      return true;
    }
    if (camp(march.hero.id, countryId: march.hero.countryId)) {
      final originalDecision = _ai?._taskDecisions[march.hero.id];
      final ended = _ai?.tasks.remove(march.hero.id);
      if (ended != null) _ai?._taskEnded(ended, march.hero, '到达时城池没有安全入城名额');
      _ai?.urgent(march.hero.countryId);
      _ai?.diagnostics.record('${march.hero.name}暂缓入城，避免超过本场迎战名额');
      _emitEvent(
        GameEventKind.guardIntervention,
        '${march.hero.name}暂缓入城，现有驻军占满本场迎战名额',
        hero: march.hero,
        cityId: id,
        source: GameEventSource.ai,
        phase: GameEventPhase.rejected,
        decisionId: originalDecision,
        reason: '实际入城检查阻止了原计划',
        data: {
          'task': ended?.toJson(),
          'garrisonCount': garrisonAt(id).length,
          'safeSlots': _aiSafetySlots(id),
        },
      );
      _finalizeAiIntervention(
        march.hero.countryId,
        id,
        '命${march.hero.name}城外扎营，暂缓入城',
        reason: '现有驻军占满本场迎战名额',
        data: {
          'heroId': march.hero.id,
          'causedByDecisionId': originalDecision,
          'garrisonCount': garrisonAt(id).length,
          'safeSlots': _aiSafetySlots(id),
        },
      );
    }
    return false;
  }

  // 仅在明确的入城/换将命令阶段做少量确定规则保护，不在主线程重跑战略规划。
  bool _protectAiCity(int id, {bool force = false, int expectedArrivals = 0}) {
    final country = cities[id]!.ownerCountryId;
    if (!_automatedCountry(country) || (!force && !_aiThreatened(id))) {
      return false;
    }
    final slots = _aiSafetySlots(id);
    var guards = garrisonAt(id).where((h) => h.health.alive).toList();
    if (guards.length + expectedArrivals <= slots) return false;
    _ai?.urgent(country);
    if (slots == 0) {
      _ai?.diagnostics.record('unsalvageableDefense：$id 城本场迎战名额已耗尽');
      return false;
    }
    final protectedGold =
        _ai?.tasks.values
            .where(
              (t) =>
                  heroes.any((h) => h.id == t.hero && h.countryId == country) &&
                  [
                    'rescue',
                    'evacuate',
                    'transfer',
                    'regroup',
                  ].contains(t.role),
            )
            .fold<int>(0, (n, t) => n + t.gold) ??
        0;
    var changed = false;
    final resourcesBefore = _eventResources(country);
    final finalActions = <String>[];
    // 战前有效升级优先；每次合法筹款后可重新报价，战中绝不增加本场 B。
    void upgradeIfFunded() {
      if (battles[id]?.isActive != true &&
          guards.length + expectedArrivals <= GameConfig.maxCityLevel) {
        final governors =
            guards
                .where(
                  (h) => _upgradeParticipantProblem(id, h, country) == null,
                )
                .toList()
              ..sort((a, b) => b.politics.compareTo(a.politics));
        if (governors.isNotEmpty) {
          final governor = governors.first;
          var needed = 0;
          for (
            var level = cities[id]!.level;
            level < guards.length + expectedArrivals;
            level++
          ) {
            needed += math.max(
              0,
              GameConfig.cityUpgradeCosts[level - 1] - governor.politics,
            );
          }
          if (goldFor(country) >= needed + protectedGold) {
            for (
              var n = 0;
              n < 4 && cities[id]!.level < guards.length + expectedArrivals;
              n++
            ) {
              if (!upgradeCity(id, hero: governor, countryId: country)) break;
              changed = true;
              finalActions.add('${governor.name}将城防升至${cities[id]!.level}级');
            }
          }
        }
      }
    }

    upgradeIfFunded();
    // 没有时间等待异步结果时，只清理会白白占用名额的最低价值合法英雄。
    for (
      var action = 0;
      action < 6 && guards.length + expectedArrivals > _aiSafetySlots(id);
      action++
    ) {
      final free =
          guards
              .where((h) => dismissalBlockReason(h, countryId: country) == null)
              .toList()
            ..sort((a, b) {
              double value(CampaignHero h) =>
                  h.combat * 3 +
                  h.maxHp * .35 +
                  h.politics * 1.5 +
                  (h.type == HeroType.advanced ? 30 : 0);
              return value(a).compareTo(value(b));
            });
      if (free.isEmpty) break;
      final loser = free.first;
      if (dismissHero(loser, countryId: country) == null) break;
      finalActions.add('解雇${loser.name}，为核心守将腾出名额');
      _ai?.diagnostics.record('$id 城紧急名额保护：合法解雇 ${loser.name}，避免其挡住未出场的核心守将');
      _ai?.diagnostics.emergencyRepairs++;
      _emitEvent(
        GameEventKind.guardIntervention,
        '紧急解雇${loser.name}，为核心守将腾出迎战名额',
        countryId: country,
        hero: loser,
        cityId: id,
        source: GameEventSource.ai,
        reason: '当前驻军超过真实迎战名额',
        data: {
          'safeSlots': _aiSafetySlots(id),
          'garrisonCount': garrisonAt(id).length,
        },
      );
      changed = true;
      guards = garrisonAt(id).where((h) => h.health.alive).toList();
      upgradeIfFunded();
    }
    if (guards.length + expectedArrivals > _aiSafetySlots(id)) {
      _ai?.diagnostics.record(
        guards.any((h) => dismissalBlockReason(h, countryId: country) == null)
            ? 'budgetLimited：$id 城紧急操作已达配额，继续请求修复'
            : 'unsalvageableDefense：$id 城剩余英雄已锁定或当前没有可执行名额修复',
      );
    }
    if (changed) {
      _finalizeAiIntervention(
        country,
        id,
        finalActions.join('；'),
        reason: '城池面临危险，紧急调整迎战名额',
        data: {
          'actions': finalActions,
          'before': resourcesBefore,
          'after': _eventResources(country),
          'garrisonCount': garrisonAt(id).length,
          'safeSlots': _aiSafetySlots(id),
        },
      );
    }
    return changed;
  }
}
