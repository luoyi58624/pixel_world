import 'dart:collection';
import 'dart:convert';

part 'event_snapshot.dart';

/// 事件属于实际操作、国家决策、战况、经济还是运行状态。
enum GameEventCategory { action, decision, battle, economy, lifecycle }

/// 发起操作的是玩家、国家 AI 或自动结算规则。
enum GameEventSource { player, ai, system }

/// 意图、已发生事实和拒绝结果不能混为一谈。
enum GameEventPhase { observed, planned, applied, rejected }

/// 稳定的事件类型用于筛选与测试，中文标签用于阅读。
enum GameEventKind {
  sessionStarted('国家开局', GameEventCategory.lifecycle),
  gamePaused('游戏暂停', GameEventCategory.lifecycle),
  gameResumed('继续游戏', GameEventCategory.lifecycle),
  gameEnded('游戏结束', GameEventCategory.lifecycle),
  cityUpgraded('城防升级', GameEventCategory.action),
  cityDamaged('城防受损', GameEventCategory.battle),
  cityCaptured('占领城池', GameEventCategory.battle),
  cityLost('城池失守', GameEventCategory.battle),
  soldiersRecruited('征募士兵', GameEventCategory.action),
  soldiersAssigned('补充随军兵员', GameEventCategory.action),
  heroDrawn('抽取将领', GameEventCategory.action),
  heroSigned('签约将领', GameEventCategory.action),
  heroDeclined('放弃签约', GameEventCategory.action),
  heroOfferExpired('签约到期', GameEventCategory.lifecycle),
  heroDismissed('解雇将领', GameEventCategory.action),
  heroDispatched('将领出征', GameEventCategory.action),
  heroMoved('改变行军目标', GameEventCategory.action),
  heroCamped('将领扎营', GameEventCategory.action),
  heroStationed('将领进驻', GameEventCategory.action),
  heroDied('将领战败', GameEventCategory.battle),
  heroDisbanded('失城部队清除', GameEventCategory.battle),
  supplyPaid('粮草支出', GameEventCategory.economy),
  supplyHalted('粮草耗尽', GameEventCategory.economy),
  monthSettled('月度结算', GameEventCategory.economy),
  treasuryCaptured('灭国战利品', GameEventCategory.economy),
  battleQueued('城下等待', GameEventCategory.battle),
  battleStarted('开始交战', GameEventCategory.battle),
  battleWaveEnded('对阵结束', GameEventCategory.battle),
  battleEnded('战斗结束', GameEventCategory.battle),
  retreatRequested('申请撤退', GameEventCategory.action),
  retreatResolved('撤退结果', GameEventCategory.battle),
  threatDetected('发现城池威胁', GameEventCategory.decision),
  territoryEntered('敌军进入国境', GameEventCategory.decision),
  reinforcementsRequested('通知后方增援', GameEventCategory.decision),
  threatCleared('威胁状态变化', GameEventCategory.decision),
  hatredChanged('记下敌国侵袭', GameEventCategory.decision),
  decisionRequested('开始判断局势', GameEventCategory.decision),
  planProposed('提出国家计划', GameEventCategory.decision),
  planAccepted('计划通过校验', GameEventCategory.decision),
  planRejected('计划被拒绝', GameEventCategory.decision),
  decisionFinalized('最终决策', GameEventCategory.decision),
  commandApplied('执行决策指令', GameEventCategory.decision),
  commandRejected('决策指令失败', GameEventCategory.decision),
  taskAssigned('安排将领任务', GameEventCategory.decision),
  taskReplaced('改派将领任务', GameEventCategory.decision),
  taskEnded('结束将领任务', GameEventCategory.decision),
  taskAdvanced('推进任务路段', GameEventCategory.decision),
  guardIntervention('紧急守城处理', GameEventCategory.decision),
  workerQueue('决策排队', GameEventCategory.decision),
  workerDropped('丢弃旧决策', GameEventCategory.decision),
  workerState('决策后台状态', GameEventCategory.lifecycle),
  message('游戏记录', GameEventCategory.lifecycle);

  const GameEventKind(this.label, this.category);

  /// 阅读标签和筛选分类。
  final String label;
  final GameEventCategory category;
}

Object? _freeze(Object? value) {
  if (value is Map) {
    return Map<String, Object?>.unmodifiable(
      value.map((k, v) => MapEntry(k.toString(), _freeze(v))),
    );
  }
  if (value is Iterable) return List<Object?>.unmodifiable(value.map(_freeze));
  if (value is num && !value.isFinite) return value.toString();
  if (value == null || value is String || value is num || value is bool) {
    return value;
  }
  return value.toString();
}

/// 发生时即冻结的国家事件，历史不会随英雄离队或城池易主而变化。
class GameEvent {
  GameEvent._({
    required this.runId,
    required this.worldId,
    required this.sequence,
    required this.countrySequence,
    this.decisionSequence,
    required this.tick,
    required this.year,
    required this.month,
    required this.kind,
    required this.source,
    required this.phase,
    required this.summary,
    required this.countryId,
    required this.countryName,
    this.targetCountryId,
    this.heroId,
    this.heroName,
    this.cityId,
    this.cityName,
    this.decisionId,
    this.reason,
    required Map<String, Object?> data,
  }) : data = _freeze(data) as Map<String, Object?>;

  /// 一局身份、地图、全局序号及该国自己的序号。
  final String runId;
  final int worldId, sequence, countrySequence;

  /// 本国最终 AI 决策的连续编号，内部追踪事件不占用编号。
  final int? decisionSequence;

  /// 最终 AI 决策与内部调度事件分开统计。
  bool get isFinalDecision =>
      kind == GameEventKind.decisionFinalized && source == GameEventSource.ai;

  /// 国家面板保留最终决策、前线增援通知和月度收支，过滤调度过程噪音。
  bool get isVisibleInCountryLog =>
      isFinalDecision ||
      kind == GameEventKind.reinforcementsRequested ||
      kind == GameEventKind.monthSettled ||
      kind == GameEventKind.treasuryCaptured;

  /// 固定逻辑帧及游戏年月；暂停期间不会增加。
  final int tick, year, month;

  /// 类型、发起方及操作所处阶段。
  final GameEventKind kind;
  final GameEventSource source;
  final GameEventPhase phase;

  /// 事件归属国家和可选的相关敌国；相关敌国不会共享该国的决策日志。
  final int? countryId, targetCountryId;
  final String countryName;

  /// 发生时的对象身份和可读说明。
  final String summary;
  final String? heroId, heroName, cityName, decisionId, reason;
  final int? cityId;

  /// 冻结的资源变化、旧任务、新任务和校验依据。
  final Map<String, Object?> data;

  /// 事件时间供列表与文本导出使用。
  String get timeLabel =>
      '$year年$month月 ${(tick ~/ 60).toString().padLeft(4, '0')}.${((tick % 60) * 1000 ~/ 60).toString().padLeft(3, '0')}秒';

  /// 持久化格式保持稳定字段，不使用本地化文字充当类型标识。
  Map<String, Object?> toJson() => _jsonCache ??= Map.unmodifiable({
    'version': 1,
    'runId': runId,
    'worldId': worldId,
    'sequence': sequence,
    'countrySequence': countrySequence,
    'decisionSequence': decisionSequence,
    'tick': tick,
    'year': year,
    'month': month,
    'kind': kind.name,
    'category': kind.category.name,
    'source': source.name,
    'phase': phase.name,
    'countryId': countryId,
    'countryName': countryName,
    'targetCountryId': targetCountryId,
    'heroId': heroId,
    'heroName': heroName,
    'cityId': cityId,
    'cityName': cityName,
    'decisionId': decisionId,
    'summary': summary,
    'reason': reason,
    'data': data,
  });
  Map<String, Object?>? _jsonCache;

  /// 单行结构化日志，可直接逐行写入模拟记录。
  String toJsonLine() => jsonEncode(toJson());

  /// 不依赖界面即可阅读的记录。
  String toText() =>
      '[$timeLabel][$countryName][${kind.label}/${phase.name}] $summary${reason == null ? '' : '；原因：$reason'}${decisionId == null ? '' : '；决策：$decisionId'}';
}

/// 每个国家有独立容量、序号和监听，繁忙国家不会挤掉其他国家的历史。
class CountryEventLog {
  CountryEventLog._(this.countryId, this.capacity);

  /// 空值表示全局生命周期记录。
  final int? countryId;

  /// 本国内存保留上限；完整历史可使用外部事件接收器。
  final int capacity;
  final _events = ListQueue<GameEvent>();
  final _decisions = ListQueue<GameEvent>();
  final _timeline = ListQueue<GameEvent>();
  int _timelineTotal = 0;

  /// 可见日志的累计和截断数量。
  int get timelineCount => _timelineTotal;
  int get droppedTimelineCount => _timelineTotal - _timeline.length;
  final _listeners = <void Function(GameEvent)>{};
  int _total = 0, _dropped = 0, _listenerErrors = 0;
  int _decisionTotal = 0, _decisionDropped = 0;

  /// 最终决策独立计数和保留，内部调度噪音不会挤掉决策历史。
  int get decisionCount => _decisionTotal;
  int get retainedDecisionCount => _decisions.length;
  int get droppedDecisionCount => _decisionDropped;

  /// 本国累计、保留、截断和观察者错误数。
  int get totalCount => _total;
  int get retainedCount => _events.length;
  int get droppedCount => _dropped;
  int get listenerErrors => _listenerErrors;
  void _add(GameEvent event) {
    if (event.isVisibleInCountryLog) {
      _timelineTotal++;
      _timeline.addLast(event);
      if (_timeline.length > capacity) _timeline.removeFirst();
    }
    if (event.isFinalDecision) {
      _decisionTotal++;
      _decisions.addLast(event);
      if (_decisions.length > capacity) {
        _decisions.removeFirst();
        _decisionDropped++;
      }
    }
    _total++;
    _events.addLast(event);
    if (_events.length > capacity) {
      _events.removeFirst();
      _dropped++;
    }
    for (final listener in List.of(_listeners)) {
      try {
        listener(event);
      } catch (_) {
        _listenerErrors++;
      }
    }
  }

  /// 订阅本国记录；返回解绑方法，不使用轮询定时器。
  void Function() listen(void Function(GameEvent) listener) {
    _listeners.add(listener);
    return () => _listeners.remove(listener);
  }

  /// 按序读取冻结记录，可按分类、将领和关联决策过滤。
  List<GameEvent> query({
    GameEventCategory? category,
    String? heroId,
    String? decisionId,
    int afterSequence = 0,
    bool newestFirst = false,
    int? limit,
  }) {
    final source = newestFirst ? _events.toList().reversed : _events;
    final matches = source.where(
      (e) =>
          e.sequence > afterSequence &&
          (category == null || e.kind.category == category) &&
          (heroId == null || e.heroId == heroId) &&
          (decisionId == null || e.decisionId == decisionId),
    );
    return List.unmodifiable(limit == null ? matches : matches.take(limit));
  }

  /// 导出当前保留部分；首行明确标注截断情况，避免误认为是完整历史。
  String exportJsonLines() => [
    jsonEncode({
      'type': 'countryLog',
      'version': 1,
      'countryId': countryId,
      'totalCount': totalCount,
      'retainedCount': retainedCount,
      'droppedCount': droppedCount,
    }),
    ..._events.map((e) => e.toJsonLine()),
  ].join('\n');

  /// 按发生顺序读取最终决策，重复评估和内部执行步骤不会出现在这里。
  List<GameEvent> finalDecisions({bool newestFirst = false, int? limit}) {
    final source = newestFirst ? _decisions.toList().reversed : _decisions;
    return List.unmodifiable(limit == null ? source : source.take(limit));
  }

  /// 可见国家日志独立保留，内部高频事件不会挤掉月结与最终决策。
  List<GameEvent> timeline({bool newestFirst = false, int? limit}) {
    final source = newestFirst ? _timeline.toList().reversed : _timeline;
    return List.unmodifiable(limit == null ? source : source.take(limit));
  }

  /// 导出国家面板展示的决策与月结记录。
  String exportTimelineJsonLines() => [
    jsonEncode({
      'type': 'countryTimeline',
      'version': 1,
      'countryId': countryId,
      'totalCount': timelineCount,
      'retainedCount': _timeline.length,
      'droppedCount': droppedTimelineCount,
    }),
    ..._timeline.map((e) => e.toJsonLine()),
  ].join('\n');

  /// 只导出该国最终 AI 决策及其保留范围。
  String exportDecisionsJsonLines() => [
    jsonEncode({
      'type': 'countryDecisions',
      'version': 1,
      'countryId': countryId,
      'totalCount': decisionCount,
      'retainedCount': retainedDecisionCount,
      'droppedCount': droppedDecisionCount,
    }),
    ..._decisions.map((e) => e.toJsonLine()),
  ].join('\n');
}

/// 一张地图的国家事件目录；只做观察，绝不反馈给 AI 决策或消耗游戏随机数。
class CampaignEvents {
  /// 保存有界日志和连续编号，读档后月结与决策记录不断档。
  Map<String, dynamic> saveState({bool replay = false}) {
    if (!replay) return _saveEvents(this);
    if (_savedReplaySequence != _sequence) {
      _savedReplaySequence = _sequence;
      _replaySnapshot = _saveEvents(this, replay: true);
    }
    return _replaySnapshot!;
  }

  int _savedReplaySequence = -1;
  Map<String, dynamic>? _replaySnapshot;

  /// 恢复日志，不重新触发监听器或重复产生游戏事件。
  static CampaignEvents restoreState(Map<String, dynamic> data) =>
      _restoreEvents(data);

  /// 模拟可提供逐事件接收器写完整日志，正式游戏仅在内存保留有界记录。
  CampaignEvents({
    required this.worldId,
    this.capacityPerCountry = 1000,
    this.enabled = true,
    this.captureAiSnapshots = false,
    this.onEvent,
    String? runId,
  }) : assert(capacityPerCountry > 0),
       runId =
           runId ??
           'world-$worldId-${DateTime.now().microsecondsSinceEpoch}-${++_runSerial}';
  static int _runSerial = 0;

  /// 地图和一局身份。
  final int worldId;
  final String runId;

  /// 记录选项，详细观察快照仅在显式启用时生成。
  final int capacityPerCountry;
  final bool enabled, captureAiSnapshots;

  /// 接收所有国家的完整事件流，可按 countryId 分文件。
  final void Function(GameEvent)? onEvent;
  final _countries = <int, CountryEventLog>{};
  int _sequence = 0, _sinkErrors = 0;

  /// 外部接收器失败不会影响游戏，但会保留可检查的错误计数。
  int get sinkErrors => _sinkErrors;

  /// 全局已记录事件数。
  int get totalCount => _sequence;

  /// 本国独立日志；空值仅用于全局运行状态。
  CountryEventLog forCountry(int? countryId) => _countries.putIfAbsent(
    countryId ?? -1,
    () => CountryEventLog._(countryId, capacityPerCountry),
  );

  /// 按发生顺序合并当前仍保留的事件，适合调试跨国交战。
  List<GameEvent> get retainedEvents =>
      _countries.values.expand((l) => l.query()).toList()
        ..sort((a, b) => a.sequence.compareTo(b.sequence));

  /// 原子地记录不可变事实，同步观察者异常不会改变游戏控制流。
  GameEvent? record({
    required int tick,
    required int year,
    required int month,
    required GameEventKind kind,
    required GameEventSource source,
    required GameEventPhase phase,
    required String summary,
    int? countryId,
    String countryName = '全局',
    int? targetCountryId,
    String? heroId,
    String? heroName,
    int? cityId,
    String? cityName,
    String? decisionId,
    String? reason,
    Map<String, Object?> data = const {},
  }) {
    if (!enabled) return null;
    final log = forCountry(countryId);
    final event = GameEvent._(
      runId: runId,
      worldId: worldId,
      sequence: ++_sequence,
      countrySequence: log.totalCount + 1,
      decisionSequence:
          kind == GameEventKind.decisionFinalized &&
              source == GameEventSource.ai
          ? log.decisionCount + 1
          : null,
      tick: tick,
      year: year,
      month: month,
      kind: kind,
      source: source,
      phase: phase,
      summary: summary,
      countryId: countryId,
      countryName: countryName,
      targetCountryId: targetCountryId,
      heroId: heroId,
      heroName: heroName,
      cityId: cityId,
      cityName: cityName,
      decisionId: decisionId,
      reason: reason,
      data: data,
    );
    log._add(event);
    try {
      onEvent?.call(event);
    } catch (_) {
      _sinkErrors++;
    }
    return event;
  }
}
