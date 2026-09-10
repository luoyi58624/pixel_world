/// 倍速只改变逻辑时间，固定步长避免高速跳过相遇、战斗和 AI 调度。
class GameClock {
  /// 单次调用限制补帧量，剩余时间留待后续帧，避免卡顿后阻塞界面。
  GameClock({this.maxStepsPerFrame = 60}) : assert(maxStepsPerFrame > 0);

  /// 可选游戏倍速。
  static const speeds = [1, 2, 4, 8, 16];

  /// 所有平台共用的逻辑步长。
  static const fixedStep = 1 / 60;

  /// 单次补帧预算。
  final int maxStepsPerFrame;
  int _speed = 1;
  double _pending = 0, _elapsed = 0;

  /// 当前倍速。
  int get speed => _speed;
  set speed(int value) {
    if (!speeds.contains(value)) {
      throw ArgumentError.value(value, 'speed', '仅支持1、2、4、8、16倍');
    }
    _speed = value;
  }

  /// 已真实推进的游戏秒数。
  double get elapsed => _elapsed;

  /// 尚待处理的游戏秒数。
  double get pending => _pending;

  /// 暂停或重开时清除尚未推进的时间，不补算暂停时长。
  void clearPending() => _pending = 0;

  /// 按倍速积累时间，每一步只调用一次真实规则；返回本次推进的游戏秒数。
  double advance(double realSeconds, void Function(double) step) {
    if (!realSeconds.isFinite || realSeconds < 0) return 0;
    _pending += realSeconds * _speed;
    var count = 0;
    while (_pending + 1e-9 >= fixedStep && count < maxStepsPerFrame) {
      _pending = (_pending - fixedStep).clamp(0.0, double.infinity);
      step(fixedStep);
      _elapsed += fixedStep;
      count++;
    }
    return count * fixedStep;
  }
}
