import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/events/domain/game_events.dart';
import 'package:pixel_world/simulation/defensive_commander.dart';

import '../support/national_ai_fixture.dart';

void main() {
  test('纯防守玩家正常补兵补将，不出城且不采购武器', () {
    final c = nationalScenario(ai: false, recruitment: true);
    addTearDown(c.dispose);
    c.countryTroops[0] = CountryTroops(reserveSoldiers: 0);
    final commander = DefensiveCommander();
    for (var second = 0; second < 20; second++) {
      commander.decide(c, second);
    }
    expect(c.garrisonAt(0).length, greaterThan(1));
    expect(c.garrisonAt(0).length, lessThanOrEqualTo(c.cities[0]!.level));
    expect(c.reserveSoldiersFor(0), greaterThan(0));
    expect(c.marches.values.where((m) => m.hero.isPlayer), isEmpty);
    expect(c.gold, greaterThanOrEqualTo(0));
    expect(
      c.events
          .forCountry(0)
          .query()
          .where(
            (e) => [
              GameEventKind.heroDispatched,
              GameEventKind.heroMoved,
              GameEventKind.weaponPurchased,
              GameEventKind.retreatRequested,
            ].contains(e.kind),
          ),
      isEmpty,
    );
    expect(commander.commands.any((m) => m['action'] == '签约守城将领'), isTrue);
    final draws = commander.commands
        .where((m) => m['action'] == '抽取守城将领')
        .length;
    commander.decide(c, 30);
    expect(
      commander.commands.where((m) => m['action'] == '抽取守城将领').length,
      draws,
    );
  });

  test('守将已阵亡但胜轮尚未结算，不用补将挤占已经耗尽的名额', () {
    final c = nationalScenario(ai: false, recruitment: true);
    addTearDown(c.dispose);
    c.cities[0] = CitySituation(
      ownerCountryId: 0,
      defense: 100,
      baseIncome: 10,
      initialLevel: 1,
    );
    final enemy = approaching(c, city: 0, distance: 0);
    c.advance(1 / 60);
    final battle = c.battles[0]!;
    expect(battle.attacker, enemy.hero);
    battle.defender.hp = 0;
    final commander = DefensiveCommander()..decide(c, 1);
    expect(commander.commands.any((m) => m['action'] == '抽取守城将领'), isFalse);
  });
}
