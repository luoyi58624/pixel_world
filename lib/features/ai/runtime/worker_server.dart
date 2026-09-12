import 'dart:async';
import 'dart:convert';

import '../country_brain.dart';
import '../protocol.dart';
import '../rules_data.dart';
import '../../../core/config/game_config.dart';
import 'build_stamp.dart';

/// 在常驻后台执行的共享服务，不接触真实战役或界面。
class AiWorkerServer {
  /// 绑定纯消息出口与可核验的执行环境身份。
  AiWorkerServer(this.output, this.backend);

  /// 序列化输出和后端名称。
  final void Function(String) output;
  final String backend;
  AiRules? _rules;
  AiMap? _map;
  int? _active;
  var _generation = 0;
  final _cancelled = <int>{};

  /// 返回独立入口已启动的握手。
  void hello() => _send({
    'kind': 'hello',
    'protocol': aiProtocolVersion,
    'build': aiBuildStamp,
    'backend': backend,
  });
  void _send(Map<String, Object?> data) => output(jsonEncode(data));

  /// 接收初始化、取消或规划命令。
  void receive(String raw) {
    try {
      final data = jsonDecode(raw) as Map<String, dynamic>;
      switch (data['kind']) {
        case 'init':
          if (data['protocol'] != aiProtocolVersion ||
              data['build'] != aiBuildStamp) {
            throw const FormatException('AI 构建版本不匹配，请重新生成 Worker');
          }
          _generation++;
          _active = null;
          _cancelled.clear();
          final config = data['gameConfig'];
          if (config is! Map) {
            throw const FormatException('AI 初始化缺少 gameConfig');
          }
          GameConfig.loadMap(Map<String, dynamic>.from(config));
          _rules = AiRules.fromJson(Map<String, dynamic>.from(data['rules']));
          _map = AiMap.fromJson(Map<String, dynamic>.from(data['map']));
          _send({
            'kind': 'ready',
            'rules': _rules!.version,
            'map': _map!.version,
            'backend': backend,
          });
        case 'cancel':
          if (_active == data['id']) _cancelled.add(data['id'] as int);
        case 'plan':
          if (_rules == null || _map == null || _active != null) {
            throw StateError('AI 尚未就绪或已有请求执行中');
          }
          final request = AiRequest.fromJson(
            Map<String, dynamic>.from(data['request']),
          );
          _active = request.id;
          unawaited(_run(request, _generation));
        default:
          throw const FormatException('未知 AI 工作命令');
      }
    } catch (error) {
      _send({'kind': 'error', 'message': error.toString()});
    }
  }

  Future<void> _run(AiRequest request, int generation) async {
    final clock = Stopwatch()..start();
    try {
      final brain = CountryBrain(_rules!, _map!, request);
      var slice = 0;
      for (final _ in brain.steps()) {
        if (generation != _generation || _cancelled.contains(request.id)) {
          if (generation == _generation) {
            _active = null;
            _cancelled.remove(request.id);
            _send({'kind': 'cancelled', 'id': request.id});
          }
          return;
        }
        if (++slice >= _rules!.tuning.maxSliceSteps) {
          slice = 0;
          clock.stop();
          await Future<void>.delayed(Duration.zero);
          clock.start();
        }
      }
      if (generation != _generation) return;
      if (_cancelled.remove(request.id)) {
        _active = null;
        _send({'kind': 'cancelled', 'id': request.id});
        return;
      }
      _active = null;
      _send({
        'kind': 'reply',
        'reply': AiReply.forRequest(
          request,
          brain.result!,
          planningMicros: clock.elapsedMicroseconds,
        ).toJson(),
      });
    } catch (error) {
      if (generation != _generation) return;
      _active = null;
      _send({
        'kind': 'reply',
        'reply': AiReply.forRequest(
          request,
          CountryPlan(notes: ['规划失败，主环境保留有限安全保护']),
          planningMicros: clock.elapsedMicroseconds,
          error: error.toString(),
        ).toJson(),
      });
    }
  }
}
