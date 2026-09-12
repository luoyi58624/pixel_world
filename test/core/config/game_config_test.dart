import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/core/config/game_config.dart';

void main() {
  final source = File('assets/data/game_config.json').readAsStringSync();

  test('从 JSON5 配置加载全局规则', () {
    GameConfig.loadJson(source);

    expect(GameConfig.initialGold, 50);
    expect(GameConfig.cityUpgradeCosts, [30, 40, 50, 60]);
    expect(GameConfig.cityDefenseAttackBonuses, [1, 3, 5, 8, 10]);
    expect(GameConfig.nationalAi.maxCandidates, 96);
    expect(GameConfig.cityUpgradeLimitForYear(2), 4);
  });

  test('非法城防数组会拒绝加载', () {
    final previous = GameConfig.toJson();

    expect(
      () => GameConfig.loadMap({
        ...previous,
        'cityDefenseAttackBonuses': [1],
      }),
      throwsA(isA<FormatException>()),
    );
    expect(GameConfig.cityDefenseAttackBonuses, [1, 3, 5, 8, 10]);
  });
}
