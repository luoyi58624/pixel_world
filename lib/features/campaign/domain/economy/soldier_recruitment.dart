part of '../campaign.dart';

/// 一次补兵窗口的凭据，关闭、跨月或读档后不能继续使用。
class SoldierRecruitmentWindow {
  SoldierRecruitmentWindow._(this.countryId, this.month);

  /// 本次窗口所属国家及开始月份。
  final int countryId, month;
  bool _closed = false;
}

/// 全国每月一次补兵机会，同一窗口可以分批购买，首次成功后占用本月次数。
extension CampaignSoldierRecruitment on CampaignState {
  /// 读取仍有效的窗口，回放用它还原当时的按钮状态。
  SoldierRecruitmentWindow? soldierRecruitmentWindowFor(int countryId) {
    final window = _soldierRecruitmentWindows[countryId];
    return isSoldierRecruitmentOpen(window) ? window : null;
  }

  /// 只判断补兵机会，金币、容量与城池归属由购买接口继续校验。
  String? soldierRecruitmentBlockReason({
    int countryId = 0,
    SoldierRecruitmentWindow? window,
  }) {
    final active = isSoldierRecruitmentOpen(window);
    if (_soldierRecruitmentMonths[countryId] == settledMonths &&
        !(active && window!.countryId == countryId)) {
      return '本国本月补兵已结束，下月再补';
    }
    if (window != null && (!active || window.countryId != countryId)) {
      return '本次补兵窗口已失效';
    }
    final existing = _soldierRecruitmentWindows[countryId];
    if (isSoldierRecruitmentOpen(existing) && !identical(existing, window)) {
      return '请在已开启的补兵窗口内继续';
    }
    return null;
  }

  /// 打开本月的一次补兵窗口；只查看或购买失败不会占用月度次数。
  SoldierRecruitmentWindow? beginSoldierRecruitment({int countryId = 0}) {
    if (isPaused ||
        defeated ||
        soldierRecruitmentBlockReason(countryId: countryId) != null) {
      return null;
    }
    final window = SoldierRecruitmentWindow._(countryId, settledMonths);
    _soldierRecruitmentWindows[countryId] = window;
    return window;
  }

  /// 判断凭据是否仍属于当前战役的本月窗口，不能跨战役复用。
  bool isSoldierRecruitmentOpen(SoldierRecruitmentWindow? window) =>
      window != null &&
      !window._closed &&
      window.month == settledMonths &&
      identical(_soldierRecruitmentWindows[window.countryId], window);

  /// 结束本次窗口，已经成功购买过的月份不会因此恢复次数。
  void endSoldierRecruitment(SoldierRecruitmentWindow? window) {
    if (window == null) return;
    window._closed = true;
    if (identical(_soldierRecruitmentWindows[window.countryId], window)) {
      _soldierRecruitmentWindows.remove(window.countryId);
    }
  }
}
