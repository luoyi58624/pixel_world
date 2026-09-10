import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter/services.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

// 资源解码涉及平台图像回调，与纯数据规则测试分开运行。
void main() {
  testWidgets('正式资源加载将玩法JSON接入控制器，未传额外参数也会生效', (tester) async {
    rootBundle.clear();
    await tester.pumpWidget(const PixelWorldApp());
    await tester.ensureVisible(find.byKey(const ValueKey('start-game')));
    await tester.tap(find.byKey(const ValueKey('start-game')));
    await tester.pump();
    final canvas = find.byKey(const ValueKey('world-canvas'));
    for (var i = 0; i < 200 && canvas.evaluate().isEmpty; i++) {
      await tester.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 25)),
      );
      await tester.pump();
    }
    expect(canvas, findsOneWidget);
    final controller =
        (tester.widget<CustomPaint>(canvas).painter! as WorldPainter)
            .controller;
    expect(controller.campaign.cities[1]!.baseIncome, 10);
    expect(controller.campaign.cities[1]!.income, 15);
    expect(controller.campaign.soldiersAt(0), 16);
    expect(controller.campaign.goldFor(3), 90);
    await tester.pumpWidget(const SizedBox.shrink());
  });
}
