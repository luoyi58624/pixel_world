import 'package:flutter/material.dart';

import 'dart:io';
import 'dart:ui' as ui;

import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/main.dart';
import 'package:pixel_world/features/app/data/game_archive.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';
import 'package:pixel_world/features/world_map/presentation/world_painter.dart';

import 'archive_test.dart' show FailingArchive;

class CountingArchive extends FailingArchive {
  int writes = 0;
  @override
  Future<void> write(
    String id,
    Map<String, dynamic> meta,
    Map<int, Map<String, dynamic>> chunks, {
    Map<String, dynamic>? checkpoint,
    Map<String, Map<String, dynamic>> events = const {},
  }) {
    writes++;
    return super.write(
      id,
      meta,
      chunks,
      checkpoint: checkpoint,
      events: events,
    );
  }
}

Future<void> waitFor(WidgetTester tester, bool Function() ready) async {
  for (var i = 0; i < 250 && !ready(); i++) {
    await tester.runAsync(
      () => Future<void>.delayed(const Duration(milliseconds: 20)),
    );
    await tester.pump(const Duration(milliseconds: 20));
  }
  expect(
    ready(),
    isTrue,
    reason: tester
        .widgetList<Text>(find.byType(Text))
        .map((v) => v.data)
        .join(' | '),
  );
}

WorldController controller(WidgetTester tester) =>
    (tester
                .widget<CustomPaint>(find.byKey(const ValueKey('world-canvas')))
                .painter!
            as WorldPainter)
        .controller;

Future<void> tap(WidgetTester tester, String key) async {
  if (['save-replay', 'replay-controls'].contains(key) &&
      find.byKey(ValueKey(key)).evaluate().isEmpty) {
    await tap(tester, 'game-settings');
  }
  if (['game-settings', 'exit-game'].contains(key) &&
      find.byKey(ValueKey(key)).evaluate().isEmpty) {
    await tester.tap(find.byKey(const ValueKey('session-menu')));
    await tester.pump(const Duration(milliseconds: 250));
  }
  final finder = find.byKey(ValueKey(key));
  await tester.ensureVisible(finder);
  await tester.pump();
  await tester.tap(finder);
  await tester.pump();
  await tester.pump(const Duration(milliseconds: 300));
  if (key == 'exit-game' &&
      find.byKey(const ValueKey('confirm-exit')).evaluate().isNotEmpty) {
    await tap(tester, 'confirm-exit');
  }
  if (key == 'replay-controls') await tap(tester, 'settings-close');
}

Future<T> storage<T>(WidgetTester tester, Future<T> operation) async {
  var done = false;
  late T result;
  Object? error;
  operation.then(
    (value) {
      result = value;
      done = true;
    },
    onError: (Object e) {
      error = e;
      done = true;
    },
  );
  await waitFor(tester, () => done);
  if (error != null) throw error!;
  return result;
}

void main() {
  testWidgets('普通操作不额外写盘，每十秒保存且确认退出立即保存', (tester) async {
    rootBundle.clear();
    final archive = CountingArchive();
    await tester.pumpWidget(PixelWorldApp(archive: archive));
    await waitFor(
      tester,
      () =>
          tester
              .widget<FilledButton>(find.byKey(const ValueKey('start-game')))
              .onPressed !=
          null,
    );
    await tap(tester, 'start-game');
    await waitFor(
      tester,
      () => find.byKey(const ValueKey('world-canvas')).evaluate().isNotEmpty,
    );
    final c = controller(tester);
    c.buyCountryWeapon(0);
    c.setPaused(true);
    expect(archive.writes, 1);
    await tester.pump(const Duration(seconds: 8));
    expect(archive.writes, 1);
    await tester.pump(const Duration(seconds: 2));
    await waitFor(tester, () => archive.writes == 2);
    await tap(tester, 'exit-game');
    await waitFor(tester, () => find.text('自动存档').evaluate().isNotEmpty);
    expect(archive.writes, 3);
    await tester.pumpWidget(const SizedBox.shrink());
    await storage(tester, archive.close());
  });
  testWidgets('写入失败时退出保留当前游戏，重试成功后才返回主页面', (tester) async {
    rootBundle.clear();
    final archive = FailingArchive();
    await tester.pumpWidget(PixelWorldApp(archive: archive));
    await waitFor(
      tester,
      () =>
          tester
              .widget<FilledButton>(find.byKey(const ValueKey('start-game')))
              .onPressed !=
          null,
    );
    await tap(tester, 'start-game');
    await waitFor(
      tester,
      () => find.byKey(const ValueKey('world-canvas')).evaluate().isNotEmpty,
    );
    archive.fail = true;
    await tap(tester, 'exit-game');
    await waitFor(
      tester,
      () => find.byKey(const ValueKey('save-error')).evaluate().isNotEmpty,
    );
    expect(find.byKey(const ValueKey('world-canvas')), findsOneWidget);
    expect(controller(tester).isPaused, isTrue);
    archive.fail = false;
    await tap(tester, 'exit-game');
    await waitFor(tester, () => find.text('自动存档').evaluate().isNotEmpty);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
    await storage(tester, archive.close());
  });

  testWidgets('退出自动保存、主页面继续原进度，手动回放支持拖动且不修改存档', (tester) async {
    tester.view.physicalSize = const Size(812, 375);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    rootBundle.clear();
    final archive = GameArchive.memory();
    await tester.pumpWidget(
      RepaintBoundary(
        key: const ValueKey('session-preview'),
        child: PixelWorldApp(archive: archive),
      ),
    );
    await waitFor(
      tester,
      () =>
          tester
              .widget<FilledButton>(find.byKey(const ValueKey('start-game')))
              .onPressed !=
          null,
    );
    await preview(tester, 'home');
    await tap(tester, 'start-game');
    await waitFor(
      tester,
      () => find.byKey(const ValueKey('world-canvas')).evaluate().isNotEmpty,
    );
    final original = controller(tester);
    await tester.tap(find.byKey(const ValueKey('exit-game')));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 300));
    expect(find.byKey(const ValueKey('confirm-exit')), findsOneWidget);
    final confirmationTime = original.time;
    await tester.pump(const Duration(seconds: 1));
    expect(original.time, confirmationTime);
    await tap(tester, 'cancel-exit');
    expect(find.byKey(const ValueKey('game-toolbar')), findsNothing);
    expect(
      tester.getSize(find.byKey(const ValueKey('world-canvas'))),
      const Size(812, 375),
    );
    expect(
      tester.getTopLeft(find.byKey(const ValueKey('world-canvas'))),
      Offset.zero,
    );
    final minimap = find.byKey(const ValueKey('minimap'));
    expect(tester.getSize(minimap).width, 88);
    expect(tester.getTopLeft(minimap).dx, lessThan(20));
    expect(tester.getTopLeft(minimap).dy, lessThan(20));
    expect(
      tester.getTopLeft(find.byKey(const ValueKey('mobile-controls'))).dx,
      greaterThan(740),
    );
    await preview(tester, 'game');
    original.buyCountryWeapon(0);
    final gold = original.campaign.gold;
    await tap(tester, 'game-settings');
    await tap(tester, 'settings-pause');
    await tap(tester, 'settings-close');
    expect(original.isPaused, isTrue);
    expect(find.byKey(const ValueKey('game-paused')), findsNothing);
    await tap(tester, 'save-replay');
    await waitFor(
      tester,
      () => find.text('回放已保存，可返回主页面观看').evaluate().isNotEmpty,
    );
    await tap(tester, 'exit-game');
    await waitFor(tester, () => find.text('自动存档').evaluate().isNotEmpty);
    List<ArchiveEntry> saves = [], replays = [];
    saves = await storage(tester, archive.list());
    replays = await storage(tester, archive.list(replays: true));
    expect(saves, hasLength(1));
    expect(replays, hasLength(1));
    await waitFor(
      tester,
      () => find
          .byKey(ValueKey('resume-${saves.single.id}'))
          .evaluate()
          .isNotEmpty,
    );
    await tap(tester, 'resume-${saves.single.id}');
    await waitFor(
      tester,
      () => find.byKey(const ValueKey('world-canvas')).evaluate().isNotEmpty,
    );
    expect(controller(tester).campaign.gold, gold);
    expect(controller(tester).campaign.weaponStockFor(0, 0), 1);
    expect(controller(tester).isPaused, isTrue);
    await tap(tester, 'exit-game');
    await waitFor(
      tester,
      () => find
          .byKey(ValueKey('replay-${replays.single.id}'))
          .evaluate()
          .isNotEmpty,
    );
    await tap(tester, 'replay-${replays.single.id}');
    await waitFor(
      tester,
      () => find.byKey(const ValueKey('world-canvas')).evaluate().isNotEmpty,
    );
    await tap(tester, 'replay-controls');
    await waitFor(
      tester,
      () => find.byKey(const ValueKey('replay-timeline')).evaluate().isNotEmpty,
    );
    final slider = tester.widget<Slider>(
      find.byKey(const ValueKey('replay-timeline')),
    );
    slider.onChanged!(replays.single.duration);
    await waitFor(tester, () => controller(tester).campaign.gold == gold);
    expect(controller(tester).campaign.aiEnabled, isFalse);
    await tester.pump();
    await preview(tester, 'replay');
    expect(find.byKey(const ValueKey('save-replay')), findsNothing);
    await tap(tester, 'exit-game');
    await waitFor(tester, () => find.text('自动存档').evaluate().isNotEmpty);
    await waitFor(
      tester,
      () => find
          .byKey(ValueKey('delete-save-${saves.single.id}'))
          .evaluate()
          .isNotEmpty,
    );
    await tap(tester, 'delete-save-${saves.single.id}');
    await tap(tester, 'cancel-delete');
    expect(find.byKey(ValueKey('resume-${saves.single.id}')), findsOneWidget);
    await tap(tester, 'delete-save-${saves.single.id}');
    await tap(tester, 'confirm-delete');
    await waitFor(
      tester,
      () =>
          find.byKey(ValueKey('resume-${saves.single.id}')).evaluate().isEmpty,
    );
    expect(await storage(tester, archive.list()), isEmpty);
    expect(await storage(tester, archive.list(replays: true)), hasLength(1));
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
    await storage(tester, archive.close());
  });
}

Future<void> preview(WidgetTester tester, String name) async {
  if (!const bool.fromEnvironment('SESSION_SCREENSHOTS')) return;
  await tester.pump();
  final boundary = tester.renderObject<RenderRepaintBoundary>(
    find.byKey(const ValueKey('session-preview')),
  );
  await tester.runAsync(() async {
    final image = await boundary.toImage();
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    await Directory('build/session_preview').create(recursive: true);
    await File('build/session_preview/$name.png')
        .writeAsBytes(bytes!.buffer.asUint8List());
    image.dispose();
  });
}
