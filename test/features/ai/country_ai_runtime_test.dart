import 'dart:async';
import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/runtime/worker.dart';
import 'package:pixel_world/features/ai/runtime/transport.dart';
import 'package:pixel_world/features/ai/runtime/build_stamp.dart';

import '../../support/national_ai_fixture.dart';

Future<void> until(
  bool Function() condition,
  AiWorker worker, {
  int tick = 0,
}) async {
  for (var i = 0; i < 500; i++) {
    if (condition()) return;
    worker.pump(tick);
    await Future<void>.delayed(const Duration(milliseconds: 4));
  }
  fail('后台未及时完成：${jsonEncode(worker.metrics.toJson())}');
}

class _ControlledTransport implements AiTransport {
  final events = StreamController<String>();
  final plans = <AiRequest>[];
  bool closed = false;
  @override
  String get name => 'test-controlled';
  @override
  Stream<String> get messages => events.stream;
  void emit(Map<String, Object?> data) => events.add(jsonEncode(data));
  @override
  Future<void> start() async => emit({
    'kind': 'hello',
    'protocol': aiProtocolVersion,
    'build': aiBuildStamp,
    'backend': name,
  });
  @override
  void send(String raw) {
    final d = jsonDecode(raw) as Map<String, dynamic>;
    if (d['kind'] == 'init') {
      emit({
        'kind': 'ready',
        'rules': d['rules']['version'],
        'map': d['map']['version'],
      });
    }
    if (d['kind'] == 'plan') {
      plans.add(AiRequest.fromJson(Map<String, dynamic>.from(d['request'])));
    }
  }

  void complete(AiRequest request) => emit({
    'kind': 'reply',
    'reply': AiReply.forRequest(request, CountryPlan()).toJson(),
  });
  @override
  void close() {
    closed = true;
    events.close();
  }
}

class _BrokenTransport implements AiTransport {
  final events = StreamController<String>();
  @override
  String get name => 'test-broken';
  @override
  Stream<String> get messages => events.stream;
  @override
  Future<void> start() async {
    events.add(
      jsonEncode({
        'kind': 'hello',
        'protocol': aiProtocolVersion,
        'build': 'wrong',
      }),
    );
  }

  @override
  void send(String message) {}
  @override
  void close() {
    events.close();
  }
}

void main() {
  test('原生常驻 Isolate 往返与同步核心一致，等待期间主循环继续运行', () async {
    final c = nationalScenario(ai: false);
    approaching(c);
    final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
    final request = AiRequest(
      session: 'native',
      id: 1,
      rulesVersion: rules.version,
      mapVersion: map.version,
      observation: c.aiObservationFor(1),
      deadlineTick: 300,
    );
    final worker = createAiWorker();
    final traces = <({String kind, Map<String, Object?> data})>[];
    worker.metrics.onTrace = (kind, data) =>
        traces.add((kind: kind, data: Map.of(data)));
    addTearDown(worker.close);
    worker.initialize(rules, map);
    await until(() => worker.status == AiWorkerStatus.ready, worker);
    expect(worker.metrics.backend, startsWith('isolate'));
    worker.submit(request);
    final replies = <AiReply>[];
    var mainTicks = 0;
    await until(() {
      mainTicks++;
      replies.addAll(worker.takeReplies());
      return replies.isNotEmpty;
    }, worker);
    expect(mainTicks, greaterThan(1));
    expect(replies.single.error, isNull);
    expect(replies.single.plan.toJson(), planFor(c).toJson());
    worker.submit(
      AiRequest(
        session: 'native',
        id: 2,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: c.aiObservationFor(1),
        deadlineTick: 300,
      ),
    );
    await until(() => worker.metrics.received == 2, worker);
    expect(worker.metrics.restarts, 0);
    expect(worker.metrics.sent, 2);
    expect(
      traces.map((t) => t.kind),
      containsAll(['starting', 'ready', 'queued', 'dispatched']),
    );
    expect(
      traces
          .where((t) => t.data['id'] == 1)
          .every(
            (t) => t.data['country'] == 1 && t.data['session'] == 'native',
          ),
      isTrue,
    );
  });
  test('不匹配的 Worker 构建只重启配置次数，然后显式降级', () async {
    final c = nationalScenario(ai: false),
        worker = MessageAiWorker(_BrokenTransport.new);
    addTearDown(worker.close);
    worker.initialize(c.aiRulesForTesting(), c.aiMapForTesting());
    await until(() => worker.status == AiWorkerStatus.degraded, worker);
    expect(worker.metrics.restarts, 2);
    expect(worker.metrics.error, contains('版本'));
    expect(worker.pendingCount, 0);
    expect(worker.synchronous, isFalse);
  });
  test('十国共用一个执行槽，更新观察保留排队资历，旧回复不冒充新建议', () async {
    var now = 1000000;
    final c = nationalScenario(ai: false), t = _ControlledTransport();
    final worker = MessageAiWorker(() => t, nowMicros: () => now);
    final audit = <({String kind, Map<String, Object?> data})>[];
    worker.metrics.onTrace = (kind, data) =>
        audit.add((kind: kind, data: Map.of(data)));
    addTearDown(worker.close);
    final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
    worker.initialize(rules, map);
    await until(() => worker.status == AiWorkerStatus.ready, worker);
    AiRequest request(int country, int id, {int priority = 0}) {
      final data = c.aiObservationFor(1).toJson()..['country'] = country;
      return AiRequest(
        session: 'fair',
        id: id,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: AiObservation.fromJson(data),
        deadlineTick: 10000,
        priority: priority,
      );
    }

    worker.submit(request(0, 1));
    for (var country = 1; country < 10; country++) {
      worker.submit(request(country, country + 1));
    }
    expect(t.plans.length, 1);
    expect(worker.pendingCount, 10);
    now += 2000000;
    worker.submit(request(1, 20));
    worker.submit(request(10, 21, priority: 2));
    worker.submit(request(0, 22));
    expect(
      audit
          .where((e) => e.kind == 'requestDropped' && e.data['country'] == 1)
          .single
          .data['id'],
      2,
    );
    expect(audit.any((e) => e.kind == 'queued' && e.data['id'] == 20), isTrue);
    expect(
      audit.any((e) => e.kind == 'requestDropped' && e.data['id'] == 20),
      isFalse,
      reason: '被替换的是旧请求，不能把新请求误记为失败',
    );
    t.complete(t.plans.first);
    await until(() => t.plans.length == 2, worker);
    expect(t.plans.last.country, 1, reason: '旧国家等待两秒，应优先于刚来的紧急请求');
    expect(t.plans.last.id, 20);
    expect(worker.takeReplies(), isEmpty, reason: '正在执行的旧观察已经被更新');
    final done = <int>{};
    for (var i = 0; i < 11; i++) {
      final active = t.plans.last;
      done.add(active.country);
      final count = t.plans.length;
      t.complete(active);
      await until(
        () => worker.pendingCount == 0 || t.plans.length > count,
        worker,
      );
      if (worker.pendingCount == 0) break;
    }
    expect(done, containsAll(List.generate(11, (i) => i)));
    expect(worker.pendingCount, 0);
    expect(worker.metrics.maxQueue, lessThanOrEqualTo(12));
  });
  test('执行超时和传输崩溃有限重启，耗尽后不回主线程规划', () async {
    var now = 1000000;
    final c = nationalScenario(ai: false),
        transports = <_ControlledTransport>[];
    final worker = MessageAiWorker(() {
      final t = _ControlledTransport();
      transports.add(t);
      return t;
    }, nowMicros: () => now);
    addTearDown(worker.close);
    final rules = c.aiRulesForTesting(), map = c.aiMapForTesting();
    worker.initialize(rules, map);
    await until(() => worker.status == AiWorkerStatus.ready, worker);
    worker.submit(
      AiRequest(
        session: 'timeout',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: c.aiObservationFor(1),
        deadlineTick: 10000,
      ),
    );
    now += (rules.tuning.workerTimeoutMs + 1) * 1000;
    worker.pump(0);
    await until(
      () => transports.length == 2 && worker.status == AiWorkerStatus.ready,
      worker,
    );
    expect(transports.first.closed, isTrue);
    transports.last.events.addError(StateError('后台崩溃'));
    await until(
      () => transports.length == 3 && worker.status == AiWorkerStatus.ready,
      worker,
    );
    transports.last.events.addError(StateError('持续故障'));
    await until(() => worker.status == AiWorkerStatus.degraded, worker);
    expect(worker.metrics.restarts, 2);
    expect(worker.synchronous, isFalse);
    expect(worker.pendingCount, 0);
  });
  test('同国消息合并且国家队列有界，过期请求不会执行', () async {
    final c = nationalScenario(ai: false),
        r = c.aiRulesForTesting(),
        m = c.aiMapForTesting();
    final worker = createAiWorker();
    addTearDown(worker.close);
    worker.initialize(r, m);
    for (var i = 1; i <= 200; i++) {
      worker.submit(
        AiRequest(
          session: 'queue',
          id: i,
          rulesVersion: r.version,
          mapVersion: m.version,
          observation: c.aiObservationFor(1),
          deadlineTick: 1,
          priority: 2,
        ),
      );
      expect(worker.pendingCount, lessThanOrEqualTo(2));
    }
    worker.pump(120);
    await until(
      () => worker.status == AiWorkerStatus.ready && worker.pendingCount == 0,
      worker,
      tick: 120,
    );
    expect(worker.takeReplies(), isEmpty);
    expect(worker.metrics.expired, greaterThan(0));
  });
  test('关闭或换地图使旧会话结果失效，不重复支付升级费用', () {
    final workers = <ManualAiWorker>[];
    final c = nationalScenario(
      workerFactory: () {
        final w = ManualAiWorker();
        workers.add(w);
        return w;
      },
    );
    addTearDown(c.dispose);
    approaching(c);
    c.advance(1 / 60);
    final old = workers.single, request = old.requests.first;
    final reply = old.solve(request);
    c.pauseAi();
    c.advance(1 / 60);
    final current = workers.last;
    current.replies.add(reply);
    final gold = c.goldFor(1);
    c.advance(1 / 60);
    expect(c.goldFor(1), gold);
    expect(c.aiDiagnostics.rejected, greaterThan(0));
    final newRequest = current.requests.first;
    final fresh = current.solve(newRequest);
    current.replies.addAll([fresh, fresh]);
    c.advance(1 / 60);
    final spent = c.goldFor(1);
    c.advance(1 / 60);
    expect(c.goldFor(1), spent);
    expect(c.cities[1]!.level, 2); // 资源阶段只升级一次，防守阶段尚未返回。
  });
  test('当前构建指纹已经由独立 Worker 编译步骤生成', () {
    expect(aiBuildStamp, isNot('development'));
  });
}
