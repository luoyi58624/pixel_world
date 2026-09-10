import 'dart:js_interop';

import 'package:web/web.dart' as web;

/// 浏览器要求全屏请求来自用户点击，手机开始或继续游戏时再发起。
Future<void> requestMobileFullscreen() async {
  if (!web.window.matchMedia('(pointer: coarse)').matches) return;
  try {
    if (web.document.fullscreenElement == null &&
        web.document.fullscreenEnabled) {
      await web.document.documentElement!.requestFullscreen().toDart;
    }
    await web.window.screen.orientation.lock('landscape').toDart;
  } catch (_) {
    // 不支持方向锁定的浏览器仍可手动横屏；拒绝全屏不能中断存档恢复。
  }
}
