import 'config.dart';
import 'protocol.dart';

/// 单国调度时钟，只使用游戏时间；一份结果落地后才能安排下一阶段。
class CountryAiSchedule {
  /// 各国有独立时钟，开局立即从资源阶段开始。
  CountryAiSchedule(this.tuning);

  /// 资源和哨兵的可配置周期。
  final AiTuning tuning;
  double _resourceAt = 0, _defenseAt = 0, _attackAt = 0, _retryAt = 0;
  AiRequest? _pending;

  /// 未完成请求阻止同国新观察覆盖旧任务。
  AiRequest? get pending => _pending;

  /// 选择到期的最高优先级阶段，不因每次战斗伤害重置周期。
  AiDecisionStage? due(double now) {
    if (_pending != null || now < _retryAt) return null;
    if (now >= _resourceAt) return AiDecisionStage.resources;
    if (now >= _defenseAt) return AiDecisionStage.defense;
    if (now >= _attackAt) return AiDecisionStage.attack;
    return null;
  }

  /// 提交后保留请求身份，拒绝并行指挥同一国家。
  void submitted(AiRequest request) {
    if (_pending != null) throw StateError('同一国家不能同时提交两份计划');
    _pending = request;
  }

  /// 只有相同身份的回复才能完成当前阶段，失败稍后重试而不忙循环。
  void finish(int id, double now, {required bool adopted}) {
    final request = _pending;
    if (request == null || request.id != id) return;
    _pending = null;
    if (!adopted) {
      _retryAt = now + 2;
      return;
    }
    _retryAt = now;
    switch (request.stage) {
      case AiDecisionStage.resources:
        _resourceAt = now + tuning.resourceIntervalSeconds;
        _defenseAt = now;
        _attackAt = now;
      case AiDecisionStage.defense:
        _defenseAt = now + tuning.intervalSeconds;
        _attackAt = now;
      case AiDecisionStage.attack:
        _attackAt = now + tuning.intervalSeconds;
      case AiDecisionStage.full:
        _resourceAt = now + tuning.resourceIntervalSeconds;
        _defenseAt = _attackAt = now + tuning.intervalSeconds;
    }
  }

  /// 暂停只撤销尚未完成的计算，已完成周期不会从头再跑。
  void suspend() => _pending = null;
}
