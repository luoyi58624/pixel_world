import '../country_brain.dart';
import '../protocol.dart';
import '../rules_data.dart';
import 'worker.dart';

/// 仅供显式注入的确定性测试驱动；正式工厂绝不选择此后端。
class SynchronousAiWorker implements AiWorker {
  /// 测试可在布置真实交战初态时临时暂停提交，正式后端没有此开关。
  bool paused = false;
  @override
  final metrics = AiWorkerMetrics('test-inline');
  @override
  AiWorkerStatus status = AiWorkerStatus.idle;
  @override
  bool get synchronous => true;
  @override
  int get pendingCount => 0;
  late AiRules _rules;
  late AiMap _map;
  final _replies = <AiReply>[];
  @override
  void initialize(AiRules rules, AiMap map) {
    _rules = rules;
    _map = map;
    status = AiWorkerStatus.ready;
  }

  @override
  void submit(AiRequest request) {
    if (status != AiWorkerStatus.ready || paused) return;
    final watch = Stopwatch()..start();
    final brain = CountryBrain(_rules, _map, request);
    for (final _ in brain.steps()) {}
    metrics.sent++;
    metrics.received++;
    _replies.add(
      AiReply.forRequest(
        request,
        brain.result!,
        planningMicros: watch.elapsedMicroseconds,
      ),
    );
  }

  @override
  void pump(int tick) {}
  @override
  List<AiReply> takeReplies() {
    final result = List<AiReply>.of(_replies);
    _replies.clear();
    return result;
  }

  @override
  void close() {
    status = AiWorkerStatus.closed;
    _replies.clear();
  }
}
