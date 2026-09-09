part of 'campaign.dart';

int _aiSessionSerial = 0;

class _AiCoordinator {
  _AiCoordinator(this.campaign, this.factory);
  final CampaignState campaign;
  final AiWorker Function() factory;
  final diagnostics = NationalAiDiagnostics();
  final tasks = <String, ArmyTask>{};
  final latest = <int, int>{},
      applied = <int, int>{},
      idleCycles = <int, int>{};
  final _lastRequest = <int, double>{}, _urgent = <int>{};
  final _seeds = <int, int>{};
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
    worker = factory();
    diagnostics.worker = worker!.metrics;
    worker!.initialize(rules, map);
  }

  void urgent(int country) {
    _urgent.add(country);
  }

  void pause() {
    worker?.close();
    worker = null;
    latest.clear();
    applied.clear();
    _lastRequest.clear();
    _urgent.clear();
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
      final waiting = countries.where((id) {
        final age = campaign._strategyTime - (_lastRequest[id] ?? -100);
        final danger = campaign.world.cities.any(
          (c) =>
              campaign.cities[c.id]!.ownerCountryId == id &&
              campaign._aiThreatened(c.id),
        );
        return !_lastRequest.containsKey(id) ||
            age >= rules.tuning.intervalSeconds ||
            (age >= .5 && (_urgent.contains(id) || danger));
      }).toList();
      if (waiting.isEmpty) return;
      int priority(int country) {
        final age = campaign._strategyTime - (_lastRequest[country] ?? -100);
        if (_lastRequest.containsKey(country) &&
            age > rules.tuning.intervalSeconds * 2) {
          return 3;
        }
        if (_urgent.contains(country) ||
            campaign.world.cities.any(
              (c) =>
                  campaign.cities[c.id]!.ownerCountryId == country &&
                  campaign._aiThreatened(c.id),
            )) {
          return 2;
        }
        return 0;
      }

      waiting.sort((a, b) {
        final p = priority(b).compareTo(priority(a));
        return p != 0
            ? p
            : (_lastRequest[a] ?? -100).compareTo(_lastRequest[b] ?? -100);
      });
      final country = waiting.first;
      final requestPriority = priority(country);
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
      );
      latest[country] = request.id;
      _lastRequest[country] = campaign._strategyTime;
      campaign._aiStrategicDecisions++;
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
                ? Offset(next.x, next.y)
                : campaign.cityBounds(endCity).center,
            countryId: hero.countryId,
          )) {
            tasks[hero.id] = task.withLeg(
              task.leg + 1,
              campaign._aiOrderVersions[hero.id] ?? 0,
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
}

extension _AiSafety on CampaignState {
  bool _automatedCountry(int id) => aiEnabled && (id != 0 || aiControlsPlayer);

  int _aiSafetySlots(int id, {int? overrideLevel}) {
    final battle = battles[id];
    return battle?.isActive == true
        ? math.max(0, battle!.initialCityLevel - battle.victories)
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
      final velocity = _aiVelocity[march.hero.id] ?? Offset.zero;
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
      _ai?.tasks.remove(march.hero.id);
      _ai?.urgent(march.hero.countryId);
      _ai?.diagnostics.record('${march.hero.name}暂缓入城，避免超过本场迎战名额');
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
      _ai?.diagnostics.record('$id 城紧急名额保护：合法解雇 ${loser.name}，避免其挡住未出场的核心守将');
      _ai?.diagnostics.emergencyRepairs++;
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
    return changed;
  }
}
