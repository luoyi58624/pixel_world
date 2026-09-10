import 'config.dart';
import 'protocol.dart';

/// 单国调度时钟，只使用游戏时间；一份结果落地后才能安排下一阶段。
class CountryAiSchedule {
  /// 各国有独立时钟，开局立即从资源阶段开始。
  CountryAiSchedule(this.tuning);

  /// 保存已完成阶段的期限，未完成的后台请求在读档后重新计算。
  List<num?> saveState() => [
    _resourceAt,
    _defenseAt,
    _attackAt,
    _retryAt,
    _defenseAlarmTick,
  ];

  /// 恢复调度期限并丢弃旧进程中的请求身份。
  void restoreState(List<dynamic> data) {
    _resourceAt = (data[0] as num).toDouble();
    _defenseAt = (data[1] as num).toDouble();
    _attackAt = (data[2] as num).toDouble();
    _retryAt = (data[3] as num).toDouble();
    _defenseAlarmTick = data[4] as int?;
    _pending = null;
  }

  /// 资源和哨兵的可配置周期。
  final AiTuning tuning;
  double _resourceAt = 0, _defenseAt = 0, _attackAt = 0, _retryAt = 0;
  AiRequest? _pending;
  int? _defenseAlarmTick;

  /// 国境变化尚未由新观察处理，阻止继续执行旧的进攻建议。
  bool get defenseAlarmPending => _defenseAlarmTick != null;

  /// 越境事件唤醒防守；正在计算的请求保持唯一，完成后立即处理新警报。
  void requestDefense(double now) {
    _defenseAlarmTick = (now * 60).round();
    _retryAt = now;
  }

  /// 未完成请求阻止同国新观察覆盖旧任务。
  AiRequest? get pending => _pending;

  /// 选择到期的最高优先级阶段，不因每次战斗伤害重置周期。
  AiDecisionStage? due(double now) {
    if (_pending != null || now < _retryAt) return null;
    if (now >= _resourceAt) return AiDecisionStage.resources;
    if (defenseAlarmPending) return AiDecisionStage.defense;
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
      _retryAt = defenseAlarmPending ? now : now + 2;
      return;
    }
    _retryAt = now;
    switch (request.stage) {
      case AiDecisionStage.resources:
        _resourceAt = now + tuning.resourceIntervalSeconds;
        _defenseAt = now;
        _attackAt = now;
      case AiDecisionStage.defense:
        if (_defenseAlarmTick != null &&
            request.observation.tick >= _defenseAlarmTick!) {
          _defenseAlarmTick = null;
        }
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
