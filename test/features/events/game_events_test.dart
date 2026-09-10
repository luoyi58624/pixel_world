import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';

GameEvent _emit(
  CampaignEvents events,
  int country, {
  Map<String, Object?> data = const {},
  String? decision,
  GameEventKind kind = GameEventKind.planProposed,
}) => events.record(
  tick: 120,
  year: 1,
  month: 2,
  kind: kind,
  source: GameEventSource.ai,
  phase: GameEventPhase.planned,
  summary: '规划进攻',
  countryId: country,
  countryName: '国家$country',
  decisionId: decision,
  data: data,
)!;

void main() {
  test('最终决策独立计数和导出，内部噪音不占编号也不挤掉最终历史', () {
    final events = CampaignEvents(worldId: 0, capacityPerCountry: 2);
    final log = events.forCountry(1);
    _emit(events, 1, kind: GameEventKind.decisionFinalized);
    for (var i = 0; i < 10; i++) {
      _emit(events, 1);
    }
    expect(log.decisionCount, 1);
    expect(log.finalDecisions().single.decisionSequence, 1);
    expect(log.droppedDecisionCount, 0);
    _emit(events, 2, kind: GameEventKind.decisionFinalized);
    _emit(events, 1, kind: GameEventKind.decisionFinalized);
    _emit(events, 1, kind: GameEventKind.decisionFinalized);
    expect(log.decisionCount, 3);
    expect(log.retainedDecisionCount, 2);
    expect(log.droppedDecisionCount, 1);
    expect(
      log.finalDecisions(newestFirst: true).map((e) => e.decisionSequence),
      [3, 2],
    );
    final rows = log
        .exportDecisionsJsonLines()
        .split('\n')
        .map(jsonDecode)
        .toList();
    expect(rows.first['totalCount'], 3);
    expect(rows.first['droppedCount'], 1);
    expect(
      rows
          .skip(1)
          .every(
            (r) => r['kind'] == 'decisionFinalized' && r['countryId'] == 1,
          ),
      isTrue,
    );
  });
  test('每国独立保留容量与序号，一个国家的频繁决策不挤掉其他国家记录', () {
    final complete = <GameEvent>[];
    final events = CampaignEvents(
      worldId: 0,
      capacityPerCountry: 2,
      onEvent: complete.add,
      runId: 'test',
    );
    _emit(events, 0);
    _emit(events, 1);
    _emit(events, 1);
    _emit(events, 1);
    expect(events.forCountry(0).retainedCount, 1);
    expect(events.forCountry(0).droppedCount, 0);
    expect(events.forCountry(1).retainedCount, 2);
    expect(events.forCountry(1).droppedCount, 1);
    expect(events.forCountry(1).query().map((e) => e.countrySequence), [2, 3]);
    expect(complete.map((e) => e.sequence), [1, 2, 3, 4]);
    expect(complete.length, 4, reason: '外部接收器可以保留完整历史');
    final export = events
        .forCountry(1)
        .exportJsonLines()
        .split('\n')
        .map(jsonDecode)
        .toList();
    expect(export.first['droppedCount'], 1);
    expect(export.skip(1).every((e) => e['countryId'] == 1), isTrue);
  });
  test('事件深度冻结，计划和库存后续变化不污染历史，关联编号不会串国', () {
    final events = CampaignEvents(worldId: 0, runId: 'immutable');
    final ids = <int>[1, 2];
    final details = <String, Object?>{'weapons': ids, 'gold': 20};
    final first = _emit(
      events,
      1,
      data: details,
      decision: 'country-1/request-1',
    );
    ids.clear();
    details['gold'] = 0;
    _emit(events, 2, decision: 'country-2/request-1');
    expect(first.data['gold'], 20);
    expect(first.data['weapons'], [1, 2]);
    expect(
      () => (first.data['weapons'] as List).add(4),
      throwsUnsupportedError,
    );
    expect(
      events.forCountry(1).query(decisionId: 'country-2/request-1'),
      isEmpty,
    );
    expect(jsonDecode(first.toJsonLine())['phase'], 'planned');
  });
  test('观察者只接收本国事件，解绑后停止，记录器错误不会打断游戏', () {
    final events = CampaignEvents(
      worldId: 0,
      onEvent: (_) => throw StateError('磁盘接收器失败'),
    );
    final received = <int>[];
    final unsubscribe = events
        .forCountry(1)
        .listen((e) => received.add(e.countryId!));
    events.forCountry(1).listen((e) => throw StateError('观察者失败'));
    _emit(events, 0);
    _emit(events, 1);
    unsubscribe();
    _emit(events, 1);
    expect(received, [1]);
    expect(events.sinkErrors, 3);
    expect(events.forCountry(1).listenerErrors, 2);
    expect(events.totalCount, 3);
  });
  test('关闭记录不会调用接收器或增加事件序号', () {
    final events = CampaignEvents(
      worldId: 0,
      enabled: false,
      onEvent: (_) => fail('不应记录'),
    );
    expect(
      events.record(
        tick: 0,
        year: 1,
        month: 1,
        kind: GameEventKind.heroMoved,
        source: GameEventSource.player,
        phase: GameEventPhase.applied,
        summary: '移动',
      ),
      isNull,
    );
    expect(events.totalCount, 0);
  });
}
