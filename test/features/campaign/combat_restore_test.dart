import 'dart:convert';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';

// 固定样本区分原版角色的旧+3属性和自定义角色，样本不携带重复ROM字段。
List<RomHeroDefinition> _catalog(int combat) => [
  for (final id in [40, 0, 1, 100])
    RomHeroDefinition.fromJson({
      'id': id,
      'name': id == 40 ? null : '将领$id',
      'type': id == 40 ? 'protagonist' : 'advanced',
      'maxHp': 95,
      'combat': id == 100 ? 18 : combat,
      'morale': 80,
      'politics': 10,
      'salary': 3,
      'eggCapable': false,
      'soldierLimit': 4,
    }),
];

WorldDefinition _world() => WorldDefinition.fromJson(
  {
    'id': 0,
    'width': 40,
    'height': 20,
    'tiles': List.filled(800, 0),
    'cities': [
      for (final (id, x, country, units) in [
        (0, 2, 0, [40, 0, 100]),
        (1, 30, 1, [1]),
      ])
        {
          'id': id,
          'name': '城$id',
          'x': x,
          'y': 8,
          'width': 2,
          'height': 2,
          'shape': [3, 3, 3, 3],
          'initialLevel': 2,
          'initialOwnerId': country,
          'unitIds': units,
        },
    ],
  },
  [0, 1, 2, 3],
);

CampaignState _game(int combat) {
  final game = CampaignState.fromRom(
    _world(),
    _catalog(combat),
    aiEnabled: false,
    startingGold: 1000,
  )..settledMonths = 1;
  addTearDown(game.dispose);
  return game;
}

Map<String, dynamic> _state(CampaignState game) =>
    jsonDecode(jsonEncode(game.saveState())) as Map<String, dynamic>;

CampaignState _restore(Map<String, dynamic> state, {bool replay = false}) {
  final game = CampaignSnapshots.restore(
    state,
    _world(),
    _catalog(15),
    replay: replay,
  );
  addTearDown(game.dispose);
  return game;
}

void _startBattle(CampaignState game) {
  final hero = game.heroes.firstWhere((h) => h.isPlayer);
  final march = game.dispatch(hero, game.world.cities[1])!;
  march.position = march.destination;
  for (var i = 0; i < 300 && game.battles.isEmpty; i++) {
    game.advance(1 / 60);
  }
  expect(game.battles, isNotEmpty);
}

void main() {
  test('新局使用还原后的原版战斗力，自定义将领没有ROM值也可正常读取', () {
    final game = _game(15);
    for (final hero in game.heroes) {
      expect(hero.combat, hero.sourceId == 100 ? 18 : 15);
      expect(hero.battleArmy.attack, hero.combat);
    }
  });

  test('旧档统一+3属性在续玩时纠正，血量、金币与原快照不受影响', () {
    final old = _game(18);
    old.heroes.firstWhere((h) => h.isPlayer).hp = 72;
    final data = _state(old);
    final before = jsonEncode(data);
    final game = _restore(data);
    for (final hero in game.heroes) {
      expect(hero.combat, hero.sourceId == 100 ? 18 : 15);
    }
    expect(_state(game)['health'], data['health']);
    expect(game.gold, old.gold);
    expect(game.settledMonths, old.settledMonths);
    expect(jsonEncode(data), before);
    final again = _restore(_state(game));
    expect(_state(again), _state(game));
  });

  test('正在攻城的旧档同步双方基础攻击，续玩不再使用18点的旧战斗内存', () {
    final old = _game(18);
    _startBattle(old);
    final data = _state(old);
    final before = jsonEncode(data);
    final game = _restore(data);
    final battle = game.battles.values.single;
    final sim = battle.simulation;
    expect(battle.attacker.combat, 15);
    expect(battle.defender.combat, 15);
    expect(sim.attacker.attack, 15);
    expect(sim.defender.attack, 15);
    expect(sim.basePower(BattleSide.attacker), 15 + battle.attacker.soldiers);
    expect(
      sim.basePower(BattleSide.defender),
      15 + battle.defender.soldiers + sim.defenderAttackBonus,
    );
    expect(_state(game)['health'], data['health']);
    expect(sim.elapsed, old.battles.values.single.simulation.elapsed);
    expect(jsonEncode(data), before);
  });

  test('回放保留历史18点战斗力，不改写当时将领或战斗属性', () {
    final old = _game(18);
    _startBattle(old);
    final replay = _restore(_state(old), replay: true);
    expect(replay.heroes.every((h) => h.combat == 18), isTrue);
    final sim = replay.battles.values.single.simulation;
    expect(sim.attacker.attack, 18);
    expect(sim.defender.attack, 18);
  });

  test('已经完成的战斗保留历史攻击，非统一+3的自定义存档值不会被误改', () {
    final old = _game(18);
    _startBattle(old);
    final battle = old.battles.values.single;
    battle.defender.hp = 0;
    for (var i = 0; i < 1200 && battle.isActive; i++) {
      old.advance(1 / 60);
    }
    expect(battle.isActive, isFalse);
    final data = _state(old);
    final player = (data['people'] as List).firstWhere(
      (h) => h['source'] == 40,
    );
    player['combat'] = 20;
    final game = _restore(data);
    expect(game.heroes.firstWhere((h) => h.isPlayer).combat, 20);
    expect(game.battles.values.single.simulation.attacker.attack, 18);
  });
}
