import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';

import '../../support/national_ai_fixture.dart';

(CampaignState, HeroMarch) _rescue({
  int level = 2,
  bool far = false,
  bool friendly = false,
  int gold = 20,
}) {
  final c = nationalScenario(
    ai: false,
    gold: gold,
    level: level,
    guards: [0, 18],
    reserves: 12,
    friendly: friendly,
    friendHeroes: friendly ? [19] : [],
    overrides: {
      0: {'combat': 45},
      18: {'combat': 3},
      19: {'combat': 3},
    },
    attackerCombat: 20,
  );
  final hero = c.heroes.firstWhere((h) => h.sourceId == 0);
  final march = c.dispatchTo(hero, const GamePoint(600, 100), countryId: 1)!;
  final home = c.cityBounds(c.world.cities[1]).center;
  march.position = far
      ? const GamePoint(900, 800)
      : home + const GamePoint(15, -60);
  approaching(c, distance: 140);
  c.advance(1 / 60);
  return (c, march);
}

void main() {
  test('R01/R04 老家受袭能召回已经在外的核心，有效一人足够时不全军改令', () {
    final (c, march) = _rescue();
    final plan = planFor(c);
    final tasks = plan.groups.expand((g) => g.tasks).toList();
    expect(
      tasks.where((t) => t.hero == march.hero.id && t.role == 'rescue'),
      isNotEmpty,
      reason: plan.toJson().toString(),
    );
    expect(tasks.map((t) => t.hero).toSet().length, tasks.length);
    expect(
      tasks.singleWhere((t) => t.hero == march.hero.id).arrivalSlot,
      isTrue,
    );
  });
  test('R02 太远的部队不会被承诺为能及时到达的援军', () {
    final (c, march) = _rescue(far: true);
    final tasks = planFor(c).groups.expand((g) => g.tasks);
    expect(
      tasks.any(
        (t) =>
            t.hero == march.hero.id && ['rescue', 'intercept'].contains(t.role),
      ),
      isFalse,
    );
  });
  test('R05 一级城已有守军时，强将通过野外截击回援，不直接挤进城', () {
    final (c, march) = _rescue(level: 1, gold: 20);
    final plan = planFor(c);
    final tasks = plan.groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == march.hero.id)
        .toList();
    expect(
      tasks.where((t) => t.role == 'intercept'),
      isNotEmpty,
      reason: plan.toJson().toString(),
    );
    expect(
      tasks.where((t) => t.role == 'intercept').every((t) => !t.arrivalSlot),
      isTrue,
    );
  });
  test('R03 两城争用同一援军，只产生一次调动并检查原属城时限', () {
    final (c, march) = _rescue(friendly: true);
    final second = c.heroes.firstWhere((h) => h.sourceId == 40);
    final invading = c.dispatch(second, c.world.cities[3])!;
    invading.position =
        c.cityBounds(c.world.cities[3]).center + const GamePoint(130, 0);
    c.advance(1 / 60);
    final tasks = planFor(c).groups
        .expand((g) => g.tasks)
        .where((t) => t.hero == march.hero.id)
        .toList();
    expect(tasks.length, lessThanOrEqualTo(1));
    expect(tasks, isNotEmpty);
  });
  test('R06/R07/R13 统一改令接口检查国家权限、战斗锁定与所属城存续', () {
    final c = nationalScenario(ai: false);
    final hero = c.garrisonAt(1).first;
    final march = c.dispatchTo(hero, const GamePoint(300, 500), countryId: 1)!;
    expect(c.moveTo(hero.id, const GamePoint(200, 600)), isFalse);
    expect(c.moveTo(hero.id, const GamePoint(200, 600), countryId: 2), isFalse);
    expect(c.moveTo(hero.id, const GamePoint(200, 600), countryId: 1), isTrue);
    expect(c.camp(hero.id, countryId: 1), isTrue);
    final enemy = approaching(c);
    c.battles[2] = CityBattle(
      c.world.cities[2],
      hero,
      enemy.hero,
      cityLevel: 2,
      seed: 2,
    );
    march.phase = MarchPhase.fighting;
    expect(c.moveTo(hero.id, const GamePoint(100, 100), countryId: 1), isFalse);
    expect(c.camp(hero.id, countryId: 1), isFalse);
    expect(c.dismissHero(hero, countryId: 1), isNull);
    c.battles.clear();
    c.cities[1]!.ownerCountryId = 2;
    expect(c.moveTo(hero.id, const GamePoint(100, 100), countryId: 1), isFalse);
  });
}
