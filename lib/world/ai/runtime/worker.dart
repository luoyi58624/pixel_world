import 'dart:async';
import 'dart:convert';

import '../protocol.dart';
import '../rules_data.dart';
import 'build_stamp.dart';
import 'transport.dart';
import 'transport_native.dart'
    if (dart.library.js_interop) 'transport_web.dart';

/// 明确区分后台启动、正常运行与失败降级。
enum AiWorkerStatus { idle, starting, ready, degraded, closed }

/// 工作后端的通信与耗时诊断，计数不影响任何游戏随机序列。
class AiWorkerMetrics {
  /// 记录后端名称。
  AiWorkerMetrics(this.backend);

  /// 实际后端身份。
  String backend;

  /// 有界累计计数。
  int sent = 0,
      received = 0,
      expired = 0,
      restarts = 0,
      bytesSent = 0,
      bytesReceived = 0;

  /// 主环境编码、后台规划、往返和排队的最大微秒数。
  int maxEncodeMicros = 0,
      maxPlanningMicros = 0,
      maxRoundTripMicros = 0,
      maxQueueMicros = 0,
      maxQueue = 0;

  /// 最近后端错误。
  String? error;

  /// 主环境接收、解码及由回复触发的下一条发送的累计耗时。
  int receiveMicros = 0;

  /// 主环境可订阅调度事实；观察者失败不能影响后台排队。
  void Function(String kind, Map<String, Object?> data)? onTrace;

  /// 输出消息身份，不把记录器带入工作 isolate。
  void trace(String kind, Map<String, Object?> data) {
    try {
      onTrace?.call(kind, data);
    } catch (_) {}
  }

  /// 导出实测数据。
  Map<String, Object?> toJson() => {
    'backend': backend,
    'sent': sent,
    'received': received,
    'expired': expired,
    'restarts': restarts,
    'bytesSent': bytesSent,
    'bytesReceived': bytesReceived,
    'maxEncodeMicros': maxEncodeMicros,
    'maxPlanningMicros': maxPlanningMicros,
    'maxRoundTripMicros': maxRoundTripMicros,
    'maxQueueMicros': maxQueueMicros,
    'maxQueue': maxQueue,
    'error': error,
  };
}

/// 常驻规划后端；测试可显式注入确定性驱动。
abstract interface class AiWorker {
  /// 后端状态及测量数据。
  AiWorkerStatus get status;
  AiWorkerMetrics get metrics;

  /// 是否为显式同步测试驱动。
  bool get synchronous;

  /// 等待或执行的请求数。
  int get pendingCount;

  /// 静态地图和规则仅初始化一次。
  void initialize(AiRules rules, AiMap map);

  /// 同国只保留最新待办。
  void submit(AiRequest request);

  /// 推进超时和逻辑期限检查，不在这里规划。
  void pump(int tick);

  /// 主环境在固定命令阶段读取结果。
  List<AiReply> takeReplies();

  /// 关闭工作环境，丢弃旧会话消息。
  void close();
}

/// 按平台创建正式的独立后台。
AiWorker createAiWorker() => MessageAiWorker(createAiTransport);

class _QueuedRequest {
  _QueuedRequest(this.request, this.queuedAt);
  final AiRequest request;
  final int queuedAt;
  int sentAt = 0;
}

/// 有上限、可重启的公平调度器，不同步等待后台结果。
class MessageAiWorker implements AiWorker {
  /// 传输工厂也可用于故障注入测试，不提供静默主线程回退。
  MessageAiWorker(this.transportFactory, {int Function()? nowMicros})
    : _now = nowMicros ?? _systemTime,
      metrics = AiWorkerMetrics('starting');

  static int _systemTime() => DateTime.now().microsecondsSinceEpoch;
  final int Function() _now;

  /// 常驻传输的创建入口。
  final AiTransport Function() transportFactory;
  @override
  final AiWorkerMetrics metrics;
  @override
  AiWorkerStatus status = AiWorkerStatus.idle;
  @override
  bool get synchronous => false;
  @override
  int get pendingCount => _pending.length + (_active == null ? 0 : 1);
  AiTransport? _transport;
  StreamSubscription<String>? _subscription;
  AiRules? _rules;
  AiMap? _map;
  final _pending = <int, _QueuedRequest>{}, _latest = <int, int>{};
  final _replies = <AiReply>[];
  _QueuedRequest? _active;
  int _generation = 0, _tick = 0, _startedAt = 0;
  @override
  void initialize(AiRules rules, AiMap map) {
    if (status == AiWorkerStatus.closed) return;
    _rules = rules;
    _map = map;
    _start();
  }

  void _start() {
    status = AiWorkerStatus.starting;
    _startedAt = _now() ~/ 1000;
    final generation = ++_generation;
    final transport = transportFactory();
    _transport = transport;
    metrics.backend = transport.name;
    metrics.trace('starting', {
      'restarts': metrics.restarts,
      'backend': metrics.backend,
    });
    _subscription = transport.messages.listen(
      (raw) {
        if (generation == _generation) _receive(raw);
      },
      onError: (Object error) {
        if (generation == _generation) _fail(error.toString());
      },
    );
    unawaited(
      transport.start().catchError((Object error) {
        if (generation == _generation) _fail(error.toString());
      }),
    );
  }

  void _send(Map<String, Object?> data) {
    final watch = Stopwatch()..start();
    final raw = jsonEncode(data);
    metrics.bytesSent += utf8.encode(raw).length;
    if (watch.elapsedMicroseconds > metrics.maxEncodeMicros) {
      metrics.maxEncodeMicros = watch.elapsedMicroseconds;
    }
    _transport!.send(raw);
  }

  void _receive(String raw) {
    final cost = Stopwatch()..start();
    try {
      metrics.bytesReceived += utf8.encode(raw).length;
      final data = jsonDecode(raw) as Map<String, dynamic>;
      switch (data['kind']) {
        case 'hello':
          if (data['protocol'] != aiProtocolVersion ||
              data['build'] != aiBuildStamp) {
            _fail('Worker 与 UI 构建版本不匹配，请重新构建');
            return;
          }
          metrics.backend = data['backend'] as String;
          _send({
            'kind': 'init',
            'protocol': aiProtocolVersion,
            'build': aiBuildStamp,
            'rules': _rules!.toJson(),
            'map': _map!.toJson(),
          });
        case 'ready':
          if (data['rules'] != _rules!.version ||
              data['map'] != _map!.version) {
            _fail('AI 静态数据版本不匹配');
            return;
          }
          status = AiWorkerStatus.ready;
          metrics.trace('ready', {'backend': metrics.backend});
          _dispatch();
        case 'reply':
          final reply = AiReply.fromJson(
            Map<String, dynamic>.from(data['reply']),
          );
          final active = _active;
          if (active == null ||
              reply.id != active.request.id ||
              reply.session != active.request.session) {
            metrics.expired++;
            metrics.trace('replyDropped', {
              'country': reply.country,
              'id': reply.id,
              'session': reply.session,
              'reason': '回复不属于当前执行请求',
              'plan': reply.plan.toJson(),
            });
            return;
          }
          _active = null;
          metrics.received++;
          final age = _now() - active.sentAt;
          if (age > metrics.maxRoundTripMicros) {
            metrics.maxRoundTripMicros = age;
          }
          if (reply.planningMicros > metrics.maxPlanningMicros) {
            metrics.maxPlanningMicros = reply.planningMicros;
          }
          if (_latest[reply.country] == reply.id &&
              reply.deadlineTick >= _tick &&
              _replies.length < 32) {
            _replies.add(reply);
          } else {
            metrics.expired++;
            metrics.trace('replyDropped', {
              'country': reply.country,
              'id': reply.id,
              'session': reply.session,
              'reason': '请求已被替换、已过期或接收队列已满',
              'plan': reply.plan.toJson(),
            });
          }
          _dispatch();
        case 'cancelled':
          if (_active?.request.id == data['id']) {
            metrics.trace('cancelled', _requestTrace(_active!.request));
            _active = null;
            metrics.expired++;
            _dispatch();
          }
        case 'error':
          _fail(data['message'] as String);
      }
    } catch (error) {
      _fail(error.toString());
    } finally {
      metrics.receiveMicros += cost.elapsedMicroseconds;
    }
  }

  @override
  void submit(AiRequest request) {
    if (status == AiWorkerStatus.closed || status == AiWorkerStatus.degraded) {
      return;
    }
    if (_pending.length >= 32 && !_pending.containsKey(request.country)) {
      metrics.expired++;
      metrics.trace('requestDropped', {
        ..._requestTrace(request),
        'reason': '国家队列已满',
      });
      return;
    }
    _latest[request.country] = request.id;
    // 更新观察不能重置排队资历，否则持续有事件的普通国家会饿死。
    final queuedAt = _pending[request.country]?.queuedAt ?? _now();
    final replaced = _pending[request.country]?.request;
    _pending[request.country] = _QueuedRequest(request, queuedAt);
    if (replaced != null) {
      metrics.trace('requestDropped', {
        ..._requestTrace(replaced),
        'reason': '待处理观察被更新',
        'newRequestId': request.id,
      });
    }
    metrics.trace('queued', _requestTrace(request));
    if (pendingCount > metrics.maxQueue) metrics.maxQueue = pendingCount;
    if (_active?.request.country == request.country && request.priority >= 2) {
      metrics.trace('cancelRequested', {
        ..._requestTrace(_active!.request),
        'newRequestId': request.id,
      });
      _send({'kind': 'cancel', 'id': _active!.request.id});
    }
    _dispatch();
  }

  void _dispatch() {
    if (status != AiWorkerStatus.ready || _active != null) return;
    _pending.removeWhere((_, q) {
      if (q.request.deadlineTick < _tick) {
        metrics.expired++;
        metrics.trace('requestDropped', {
          ..._requestTrace(q.request),
          'reason': '排队期间已过期',
        });
        return true;
      }
      return false;
    });
    if (_pending.isEmpty) return;
    final now = _now();
    final queue = _pending.values.toList()
      ..sort((a, b) {
        final aAge = (now - a.queuedAt) / 1000000,
            bAge = (now - b.queuedAt) / 1000000;
        final ascore = a.request.priority + aAge * 2,
            bscore = b.request.priority + bAge * 2;
        return ascore == bscore
            ? a.queuedAt.compareTo(b.queuedAt)
            : bscore.compareTo(ascore);
      });
    final q = queue.first;
    _pending.remove(q.request.country);
    _active = q;
    q.sentAt = now;
    if (now - q.queuedAt > metrics.maxQueueMicros) {
      metrics.maxQueueMicros = now - q.queuedAt;
    }
    metrics.sent++;
    metrics.trace('dispatched', {
      ..._requestTrace(q.request),
      'queueMicros': now - q.queuedAt,
    });
    _send({'kind': 'plan', 'request': q.request.toJson()});
  }

  @override
  void pump(int tick) {
    _tick = tick;
    if (status == AiWorkerStatus.closed ||
        status == AiWorkerStatus.degraded ||
        status == AiWorkerStatus.idle) {
      return;
    }
    final now = _now() ~/ 1000;
    final started = _active == null ? _startedAt : _active!.sentAt ~/ 1000;
    if ((status == AiWorkerStatus.starting || _active != null) &&
        now - started > _rules!.tuning.workerTimeoutMs) {
      _fail('AI 后台响应超时');
      return;
    }
    _dispatch();
  }

  void _fail(String reason) {
    if (status == AiWorkerStatus.closed || status == AiWorkerStatus.degraded) {
      return;
    }
    metrics.error = reason;
    metrics.trace('failure', {
      'reason': reason,
      'restarts': metrics.restarts,
      if (_active != null) ..._requestTrace(_active!.request),
    });
    ++_generation;
    unawaited(_subscription?.cancel());
    _transport?.close();
    _active = null;
    if (metrics.restarts < _rules!.tuning.maxRestarts) {
      metrics.restarts++;
      _start();
    } else {
      status = AiWorkerStatus.degraded;
      metrics.trace('degraded', {'reason': reason});
      for (final q in _pending.values) {
        metrics.trace('requestDropped', {
          ..._requestTrace(q.request),
          'reason': '后台降级，清理待处理请求',
        });
      }
      _pending.clear();
    }
  }

  @override
  List<AiReply> takeReplies() {
    final result = List<AiReply>.of(_replies);
    _replies.clear();
    return result;
  }

  @override
  void close() {
    if (status == AiWorkerStatus.closed) return;
    status = AiWorkerStatus.closed;
    metrics.trace('closed', {'pendingCount': pendingCount});
    for (final q in [?_active, ..._pending.values]) {
      metrics.trace('requestDropped', {
        ..._requestTrace(q.request),
        'reason': '后台关闭，请求作废',
      });
    }
    for (final r in _replies) {
      metrics.trace('replyDropped', {
        'country': r.country,
        'id': r.id,
        'session': r.session,
        'reason': '后台关闭，尚未提交的回复作废',
      });
    }
    ++_generation;
    unawaited(_subscription?.cancel());
    _transport?.close();
    _pending.clear();
    _replies.clear();
    _active = null;
  }

  Map<String, Object?> _requestTrace(AiRequest r) => {
    'country': r.country,
    'id': r.id,
    'session': r.session,
    'observedTick': r.observation.tick,
    'deadlineTick': r.deadlineTick,
    'priority': r.priority,
  };
}
