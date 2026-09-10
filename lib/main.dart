import 'package:flutter/material.dart';

import 'features/app/presentation/game_start_screen.dart';

/// 启动像素世界地图。
void main() {
  runApp(const PixelWorldApp());
}

/// 世界地图原型的应用入口。
class PixelWorldApp extends StatelessWidget {
  /// 创建地图应用。
  const PixelWorldApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '像素远征 · 世界地图',
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
      home: const GameStartScreen(),
    );
  }
}
