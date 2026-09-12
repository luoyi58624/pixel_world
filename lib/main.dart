import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';

import 'features/app/presentation/game_start_screen.dart';
import 'features/app/data/game_archive.dart';

/// 启动像素世界地图。
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (!kIsWeb &&
      (defaultTargetPlatform == TargetPlatform.android ||
          defaultTargetPlatform == TargetPlatform.iOS)) {
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.landscapeLeft,
      DeviceOrientation.landscapeRight,
    ]);
    if (defaultTargetPlatform == TargetPlatform.android) {
      await const MethodChannel('dragon_heroes/display')
          .invokeMethod<void>('fullscreen');
    } else {
      await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
    }
  }
  runApp(const PixelWorldApp());
}

/// 世界地图原型的应用入口。
class PixelWorldApp extends StatelessWidget {
  /// 创建地图应用。
  const PixelWorldApp({
    super.key,
    this.archive,
    this.persistenceEnabled = true,
  });

  /// 可注入隔离存储以验证退出与恢复。
  final GameArchive? archive;

  /// 独立界面测试可关闭存储，正式入口始终启用。
  final bool persistenceEnabled;

  @override
  Widget build(BuildContext context) {
    return ExcludeSemantics(
      child: MaterialApp(
        title: '龙珠英雄',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.dark,
          colorScheme: ColorScheme.fromSeed(
            seedColor: const Color(0xffd6bd7c),
            brightness: Brightness.dark,
          ),
          scaffoldBackgroundColor: const Color(0xff141b17),
          fontFamily: 'Microsoft YaHei',
          useMaterial3: true,
        ),
        home: GameStartScreen(
          archive: archive,
          persistenceEnabled: persistenceEnabled,
        ),
      ),
    );
  }
}
