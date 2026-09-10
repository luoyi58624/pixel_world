import 'package:pixel_world/core/geometry/geometry.dart';

import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';

import '../../support/national_ai_fixture.dart';

void main() {
  test('改变敌军隐藏终点而可见位置相同，不改变观察与决策', () {
    final a = nationalScenario(ai: false), b = nationalScenario(ai: false);
    final ma = approaching(a), mb = approaching(b);
    mb.destination = ma.destination + const GamePoint(500, 120);
    mb.target = b.world.cities[0];
    expect(
      jsonEncode(a.aiObservationFor(1).toJson()),
      jsonEncode(b.aiObservationFor(1).toJson()),
    );
    expect(planFor(a).toJson(), planFor(b).toJson());
    final enemy = a.aiObservationFor(1).hero(ma.hero.id)!;
    expect(enemy.destination, isNull);
    expect(enemy.targetCity, isNull);
    expect(enemy.supplyDue, 0);
    expect(enemy.returnPath, isEmpty);
  });
  test('纯规划模块没有战斗执行器、Flutter、随机采样或旧逐轮试打依赖', () {
    final files = Directory('lib/features/ai')
        .listSync(recursive: true)
        .whereType<File>()
        .where((f) => f.path.endsWith('.dart') && !f.path.contains('runtime'));
    for (final file in files) {
      final source = file.readAsStringSync();
      expect(source, isNot(contains("dart:ui")), reason: file.path);
      expect(source, isNot(contains('package:flutter')), reason: file.path);
      expect(source, isNot(contains("campaign.dart'")), reason: file.path);
      expect(source, isNot(contains('NesBattleKernel')), reason: file.path);
      expect(source, isNot(contains('BattleSimulation')), reason: file.path);
      expect(source, isNot(contains('nextDouble(')), reason: file.path);
      expect(source, isNot(contains('nextInt(')), reason: file.path);
    }
    final old = File(
      'lib/features/campaign/domain/countries/country_strategy.dart',
    ).readAsStringSync();
    expect(old, isNot(contains('_projectRaid')));
    expect(File('lib/world/country_ai.dart').existsSync(), isFalse);
  });
}
