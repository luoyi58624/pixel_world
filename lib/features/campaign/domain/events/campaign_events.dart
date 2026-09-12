part of '../campaign.dart';

extension _CampaignEventRecording on CampaignState {
  // 入城拦截和紧急城防保护直接执行，最终结果同样需要可见。
  void _finalizeAiIntervention(
    int country,
    int city,
    String summary, {
    required String reason,
    required Map<String, Object?> data,
  }) {
    _emitEvent(
      GameEventKind.decisionFinalized,
      summary,
      countryId: country,
      cityId: city,
      source: GameEventSource.ai,
      decisionId:
          '${_ai?.session}:country:$country:guard:${events.forCountry(country).decisionCount + 1}',
      reason: reason,
      data: {'result': 'applied', 'strategy': 'emergency', ...data},
    );
  }

  String _finalActionSummary(
    AiAction action,
    CampaignHero? hero,
    AiCommandGroup group,
  ) {
    final name = hero?.name ?? '将领';
    final target = action.city == null ? null : '${cityName(action.city!)}国城池';
    final task = group.tasks.where((t) => t.hero == action.hero).firstOrNull;
    final mission = task == null ? '行军' : _eventTaskLabel(task.role);
    return switch (action.kind) {
      AiActionKind.upgrade => '$name将$target城防升至${cities[action.city]!.level}级',
      AiActionKind.recruit => '在$target招募将领',
      AiActionKind.dismiss => '解雇$name',
      AiActionKind.soldiers => '征募${action.amount}名士兵',
      AiActionKind.dispatch =>
        '派$name${target == null ? mission : '前往$target$mission'}',
      AiActionKind.move =>
        '命$name${target == null ? mission : '转向$target$mission'}',
      AiActionKind.camp => '命$name就地扎营',
      AiActionKind.retreat => '命$name发起撤退',
    };
  }

  // 同一份已采纳计划只生成一条结果，实际执行的反复改派仍保留以便发现冲突。
  void _finalizeAiDecision(
    AiReply reply,
    _AiCoordinator coordinator, {
    required String decisionId,
    required Map<String, Object?> before,
    required List<Map<String, Object?>> actions,
    required List<Map<String, Object?>> tasks,
    required Set<String> reasons,
    String? failure,
  }) {
    if (!events.enabled) return;
    final plan = reply.plan;
    final stage = coordinator._schedules[reply.country]?.pending?.stage;
    final standby =
        tasks
            .where((t) => (t['newTask'] as Map?)?['role'] == 'standby')
            .map((t) => '${t['heroName']}')
            .toList()
          ..sort();
    final state =
        '${plan.phase}:${plan.targetCity}:${failure ?? ''}:${standby.join(',')}';
    final previousState = coordinator._lastDecisionLogState[reply.country];
    if (actions.isEmpty) {
      if (previousState == state) return;
      if (failure == null &&
          standby.isEmpty &&
          plan.phase != 'saving' &&
          plan.phase != 'defending') {
        return;
      }
    }
    coordinator._lastDecisionLogState[reply.country] = state;
    final target = plan.targetCity == null
        ? ''
        : '，目标${cityName(plan.targetCity!)}国城池';
    final result = actions.isEmpty
        ? (failure == null ? 'waiting' : 'rejected')
        : (failure == null ? 'applied' : 'partial');
    final summary = actions.isNotEmpty
        ? '${actions.map((a) => a['summary']).join('；')}${failure == null ? '' : '；后续行动已停止'}'
        : failure != null
        ? '本轮行动未执行：$failure'
        : standby.isNotEmpty
        ? '命${standby.join('、')}暂时待命，继续复查目标与入城名额'
        : plan.phase == 'saving'
        ? '决定积蓄资金、暂缓出兵$target'
        : '决定维持防守、暂缓出兵$target';
    _emitEvent(
      GameEventKind.decisionFinalized,
      summary,
      countryId: reply.country,
      targetCountryId: cities[plan.targetCity]?.ownerCountryId,
      cityId: plan.targetCity,
      source: GameEventSource.ai,
      phase: result == 'rejected'
          ? GameEventPhase.rejected
          : GameEventPhase.applied,
      decisionId: decisionId,
      reason: {...reasons, ...plan.notes}.where((r) => r.isNotEmpty).join('；'),
      data: {
        'result': result,
        'strategy': plan.phase,
        'stage': stage?.name,
        'targetCityId': plan.targetCity,
        'offensiveCountryId': _warPlans[reply.country]?.offensiveCountryId,
        'before': before,
        'after': _eventResources(reply.country),
        'actions': actions,
        'tasks': tasks,
        'requiredGold': plan.requiredGold,
        'requiredHeroes': plan.requiredHeroes,
        'failure': failure,
      },
    );
  }

  String _eventActionLabel(AiActionKind kind) => switch (kind) {
    AiActionKind.upgrade => '升级城防',
    AiActionKind.dismiss => '解雇将领',
    AiActionKind.recruit => '招募将领',
    AiActionKind.soldiers => '征募士兵',
    AiActionKind.dispatch => '派将出征',
    AiActionKind.move => '改变行军目标',
    AiActionKind.camp => '扎营',
    AiActionKind.retreat => '撤退',
  };
  String _eventTaskLabel(String role) => switch (role) {
    'expedition' => '远征',
    'rescue' => '回援',
    'intercept' => '野外截击',
    'evacuate' => '撤离',
    'transfer' => '调防',
    'regroup' => '回城整备',
    'standby' => '安全待命',
    'newBase' => '建立新据点',
    _ => role,
  };
  GameEventSource _eventSource(int? country) => country == null
      ? GameEventSource.system
      : country == 0 && !aiControlsPlayer
      ? GameEventSource.player
      : GameEventSource.ai;

  void _emitEvent(
    GameEventKind kind,
    String summary, {
    int? countryId,
    int? targetCountryId,
    CampaignHero? hero,
    String? heroId,
    String? heroName,
    int? cityId,
    GameEventSource? source,
    GameEventPhase phase = GameEventPhase.applied,
    String? decisionId,
    String? reason,
    Map<String, Object?> data = const {},
  }) {
    if (!events.enabled) return;
    final country = countryId ?? hero?.countryId ?? _eventContext?.countryId;
    final ownContext = country == _eventContext?.countryId
        ? _eventContext
        : null;
    events.record(
      tick: (_strategyTime * 60).round(),
      year: year,
      month: month,
      kind: kind,
      source:
          source ??
          (ownContext == null ? _eventSource(country) : GameEventSource.ai),
      phase: phase,
      summary: summary,
      countryId: country,
      countryName: country == null ? '全局' : '${world.countryName(country)}国',
      targetCountryId: targetCountryId,
      heroId: hero?.id ?? heroId,
      heroName: hero?.name ?? heroName,
      cityId: cityId,
      cityName: cityId != null && cities.containsKey(cityId)
          ? '${cityName(cityId)}国城池'
          : null,
      decisionId: decisionId ?? ownContext?.decisionId,
      reason: reason ?? ownContext?.reason,
      data: {
        if (_eventContext != null && ownContext == null)
          'causedByDecisionId': _eventContext!.decisionId,
        ...data,
      },
    );
  }

  Map<String, Object?> _eventResources(int country) => {
    'gold': goldFor(country),
    'reserveSoldiers': reserveSoldiersFor(country),
    'soldierCapacity': reserveCapacityFor(country),
  };

  Map<String, Object?> _eventHero(CampaignHero hero) {
    final march = marches[hero.id];
    return {
      'id': hero.id,
      'name': hero.name,
      'countryId': hero.countryId,
      'cityId': hero.cityId,
      'hp': hero.hp,
      'soldiers': hero.soldiers,
      'phase': march?.phase.name ?? 'garrison',
      'position': march == null ? null : [march.position.dx, march.position.dy],
      'destination': march == null
          ? null
          : [march.destination.dx, march.destination.dy],
      'targetCityId': march?.target?.id,
      'orderRevision': _aiOrderVersions[hero.id] ?? 0,
    };
  }

  void _rejectEvent(
    GameEventKind kind,
    String reason, {
    required int countryId,
    CampaignHero? hero,
    int? cityId,
    Map<String, Object?> data = const {},
  }) => _emitEvent(
    kind,
    '${kind.label}未执行：$reason',
    countryId: countryId,
    hero: hero,
    cityId: cityId,
    phase: GameEventPhase.rejected,
    reason: reason,
    data: data,
  );

  void _battleEvent(
    GameEventKind kind,
    WorldBattle battle,
    String summary, {
    Map<String, Object?> data = const {},
  }) {
    for (final hero in [battle.attacker, battle.defender]) {
      final other = hero == battle.attacker ? battle.defender : battle.attacker;
      _emitEvent(
        kind,
        summary,
        hero: hero,
        cityId: battle is CityBattle ? battle.city.id : null,
        targetCountryId: other.countryId,
        source: GameEventSource.system,
        data: {
          'side': hero == battle.attacker ? 'attacker' : 'defender',
          'opponentId': other.id,
          'opponentName': other.name,
          'wave': battle is CityBattle ? battle.wave : 1,
          'clashes': battle.rounds,
          'hero': _eventHero(hero),
          'opponent': _eventHero(other),
          ...data,
        },
      );
    }
  }
}
