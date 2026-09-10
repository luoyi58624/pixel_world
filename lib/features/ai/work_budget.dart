import 'config.dart';

/// 每次请求的确定性工作配额，截断后仍可返回已完成的安全方案。
class AiWorkBudget {
  /// 从当前策略配置创建配额。
  AiWorkBudget(this.config);

  /// 配额配置。
  final AiTuning config;

  /// 已消耗的候选、属性评估和地形积分步。
  int candidates = 0, assessments = 0, routeSteps = 0;

  /// 是否有工作因配额被拒绝。
  bool limited = false;

  /// 消耗一次候选展开。
  bool candidate() {
    if (candidates >= config.maxCandidates) {
      limited = true;
      return false;
    }
    candidates++;
    return true;
  }

  /// 消耗一次静态属性比较。
  bool assessment() {
    if (assessments >= config.maxAssessments) {
      limited = true;
      return false;
    }
    assessments++;
    return true;
  }

  /// 消耗一段地形积分。
  bool routeStep() {
    if (routeSteps >= config.maxRouteSteps) {
      limited = true;
      return false;
    }
    routeSteps++;
    return true;
  }
}
