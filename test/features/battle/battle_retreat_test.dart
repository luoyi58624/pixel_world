import 'package:pixel_world/core/geometry/geometry.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/battle/domain/battle_simulation.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/world_map/domain/world_movement.dart';

import '../../support/retreat_fixture.dart';

void main() {
  test('撤退过场后可手动改道，取消自动返城且保留伤势兵员', () {
    final c = retreatCampaign();
    addTearDown(c.dispose);
    final battle = startRetreatSiege(c);
    final hero = battle.attacker;
    expect(c.retreatHero(hero.id), isTrue);
    expect(c.moveTo(hero.id, const GamePoint(400, 300)), isFalse);
    advanceRetreatUntil(c, () => !battle.isActive);
    final march = c.marches[hero.id]!;
    final hp = hero.hp, soldiers = hero.soldiers, position = march.position;
    expect(march.returningFromRetreat, isTrue);
    expect(c.moveTo(hero.id, const GamePoint(-10, -10)), isFalse);
    expect(march.returningFromRetreat, isTrue);
    // 先离开城墙再改道，避免新目标与敌城接触造成合法的再次攻城。
    c.advance(1);
    final before = march.position;
    const target = GamePoint(400, 300);
    expect(c.moveTo(hero.id, target), isTrue);
    expect(march.position, before);
    expect(march.returningFromRetreat, isFalse);
    expect(march.destination, target);
    expect(hero.hp, hp);
    expect(hero.soldiers, soldiers);
    c.advance(.5);
    expect(march.destination, target);
    expect(march.position, isNot(before));
    expect(march.position, isNot(position));
  });

  for (final (roll, success) in [
    (0.0, false),
    (.099999, false),
    (.1, true),
    (.99999, true),
  ]) {
    test('撤退分位 $roll：满状态一成失败边界准确，同场重复操作只判定一次', () {
      final random = RetreatRoll(roll);
      final c = retreatCampaign(random: random);
      c.buySoldiers(0, 12);
      final battle = startRetreatSiege(c);
      final hero = battle.attacker;
      final gold = c.gold;
      final hp = hero.hp;
      expect(c.moveTo(hero.id, const GamePoint(220, 200)), isFalse);
      expect(c.camp(hero.id), isFalse);
      expect(c.retreatHero(hero.id), success);
      expect(c.retreatHero(hero.id), isNull);
      expect(random.calls, 1);
      expect(c.gold, gold);
      expect(hero.hp, hp);
      expect(battle.isActive, isTrue);
      advanceRetreatUntil(c, () => !battle.isActive);
      expect(c.cities[0]!.level, 3);
      expect(c.cities[1]!.level, 3);
      expect(c.cities[1]!.ownerCountryId, 1);
      expect(battle.defender.hp, battle.defender.maxHp);
      if (success) {
        expect(c.heroes, contains(hero));
        expect(c.marches[hero.id]!.returningFromRetreat, isTrue);
        expect(hero.soldiers, 4);
        expect(c.soldiersAt(0), 8);
      } else {
        expect(c.heroes, isNot(contains(hero)));
        expect(c.marches[hero.id], isNull);
        expect(hero.soldiers, 0);
        expect(c.recruitPool.where((h) => h.id == hero.sourceId).length, 1);
        expect(c.soldiersAt(0), 8);
      }
      expect(random.calls, 1);
    });
  }

  test('守城、敌国指令、非交战及胜败已定阶段不可撤退，不消费概率', () {
    final random = RetreatRoll(.9);
    final c = retreatCampaign(random: random);
    expect(c.retreatHero('rom-40'), isNull);
    final battle = startRetreatSiege(c);
    expect(c.retreatHero(battle.defender.id, countryId: 1), isNull);
    expect(c.retreatHero(battle.attacker.id, countryId: 1), isNull);
    battle.defender.hp = 0;
    c.advance(3);
    expect(c.retreatHero(battle.attacker.id), isNull);
    expect(random.calls, 0);
  });

  test('撤退沿实际折线路径反向移动，未到家不回血，回城归还生还兵员', () {
    final c = retreatCampaign();
    c.buySoldiers(0, 12);
    final hero = retreatHeroById(c, 0);
    const cornerA = GamePoint(260, 240), cornerB = GamePoint(600, 240);
    final march = c.dispatchTo(hero, cornerA)!;
    advanceRetreatUntil(c, () => march.phase == MarchPhase.camped);
    c.moveTo(hero.id, cornerB);
    advanceRetreatUntil(c, () => march.phase == MarchPhase.camped);
    c.moveTo(hero.id, c.cityBounds(c.world.cities[1]).center);
    advanceRetreatUntil(c, () => c.battles[1] != null);
    final battle = c.battles[1]!;
    hero.hp = 31;
    hero.squad[0].hp = 0;
    hero.squad[1].hp = 7;
    final position = march.position;
    expect(c.retreatHero(hero.id), isTrue);
    c.advance(.5);
    expect(march.position, position);
    final sprite = battle.simulation.units.firstWhere(
      (unit) => unit.isGeneral && unit.side == BattleSide.attacker,
    );
    expect(sprite.facingRight, isTrue);
    expect(sprite.animationFrame(.5), inInclusiveRange(0, 1));
    advanceRetreatUntil(c, () => !battle.isActive);
    expect(march.destination, cornerB);
    expect(hero.hp, 31);
    expect(hero.squad[1].hp, 7);
    expect(c.moveBlockReason(hero.id), isNull);
    advanceRetreatUntil(c, () => march.destination == cornerA);
    expect(march.position.dx, lessThanOrEqualTo(cornerB.dx));
    expect(march.position.dy, closeTo(240, .0001));
    expect(hero.hp, 31);
    advanceRetreatUntil(c, () => !c.marches.containsKey(hero.id));
    expect(hero.cityId, 0);
    expect(hero.hp, hero.maxHp);
    expect(hero.soldiers, 0);
    expect(c.soldiersAt(0), 11);
  });

  test('主角撤退失败先播阵亡结尾，完成后游戏结束且不降出发城等级', () {
    final c = retreatCampaign(random: RetreatRoll(0));
    final battle = startRetreatSiege(c, heroId: 40);
    c.retreatHero('rom-40');
    expect(c.defeated, isFalse);
    expect(battle.attacker.hp, battle.attacker.maxHp);
    advanceRetreatUntil(c, () => c.defeated);
    expect(c.defeatReason, CampaignDefeatReason.protagonistFallen);
    expect(c.cities[0]!.level, 3);
  });

  test('国家预算覆盖完整原路返程，不能只预留当前位置直线回城的粮草', () {
    final c = retreatCampaign();
    final hero = retreatHeroById(c, 0);
    const a = GamePoint(1000, 500), b = GamePoint(200, 500);
    final march = c.dispatchTo(hero, a)!;
    final origin = march.position;
    advanceRetreatUntil(c, () => march.phase == MarchPhase.camped);
    c.moveTo(hero.id, b);
    advanceRetreatUntil(c, () => march.phase == MarchPhase.camped);
    c.moveTo(hero.id, c.cityBounds(c.world.cities[1]).center);
    advanceRetreatUntil(c, () => c.battles[1] != null);
    final battle = c.battles[1]!;
    c.retreatHero(hero.id);
    advanceRetreatUntil(c, () => !battle.isActive);
    final expected =
        estimateMarchSeconds(c.world, march.position, b) +
        estimateMarchSeconds(c.world, b, a) +
        estimateMarchSeconds(c.world, a, origin);
    expect(expected, greaterThan(90));
    expect(c.aiBudgetFor(0).planningSeconds, closeTo(expected, .01));
  });

  test('野战任一方可撤退，同一对手未分离前不会立即再次交战', () {
    final c = retreatCampaign();
    final a = c.dispatchTo(retreatHeroById(c, 0), const GamePoint(500, 240))!;
    final b = c.dispatchTo(
      retreatHeroById(c, 3),
      const GamePoint(140, 240),
      countryId: 1,
    )!;
    a.position = const GamePoint(300, 240);
    b.position = const GamePoint(316, 240);
    c.advance(1 / 60);
    final battle = c.fieldBattles.values.single;
    expect(c.retreatHero(b.hero.id, countryId: 1), isTrue);
    advanceRetreatUntil(c, () => !battle.isActive);
    expect(b.returningFromRetreat, isTrue);
    expect(a.destination, const GamePoint(500, 240));
    c.advance(1);
    expect(c.fieldBattles.length, 1);
    expect(b.hero.health.alive, isTrue);
    expect(b.phase, MarchPhase.marching);
    expect(a.phase, MarchPhase.marching);
  });

  test('撤退途中出发城失守仍清除原部队，不能用撤退免除失城规则', () {
    final c = retreatCampaign();
    final battle = startRetreatSiege(c);
    final hero = battle.attacker;
    c.retreatHero(hero.id);
    advanceRetreatUntil(c, () => !battle.isActive);
    c.cities[2]!.ownerCountryId = 0;
    retreatHeroById(c, 40).cityId = 2;
    c.defeatHero('rom-2', winnerCountryId: 1, defendedCityId: 0);
    c.advance(1 / 60);
    expect(c.heroes, isNot(contains(hero)));
    expect(c.marches[hero.id], isNull);
  });

  test('返程粮草允许透支，零或负国库不会阻止继续返城', () {
    final c = retreatCampaign(gold: 1);
    final battle = startRetreatSiege(c);
    final hero = battle.attacker;
    c.retreatHero(hero.id);
    advanceRetreatUntil(c, () => !battle.isActive);
    final march = c.marches[hero.id]!;
    final target = march.target;
    c.advance(12);
    expect(c.gold, lessThanOrEqualTo(0));
    expect(march.supplyHalted, isFalse);
    expect(march.phase, MarchPhase.marching);
    final stopped = march.position;
    c.defeatHero('rom-2', winnerCountryId: 1, defendedCityId: 0);
    expect(c.cities[0]!.level, 2);
    expect(march.position, stopped);
    final destination = march.destination;
    c.advance(2);
    expect(march.position, isNot(stopped));
    expect(march.supplyHalted, isFalse);
    expect(march.target, target);
    expect(march.destination, destination);
    expect(march.position, isNot(stopped));
    advanceRetreatUntil(c, () => !c.marches.containsKey(hero.id));
    expect(hero.cityId, 0);
  });

  test('脱战不会对第三国无敌，返程遇敌再次脱身仍沿原路返回', () {
    final c = retreatCampaign();
    final a = c.dispatchTo(retreatHeroById(c, 0), const GamePoint(500, 240))!;
    final b = c.dispatchTo(
      retreatHeroById(c, 3),
      const GamePoint(140, 240),
      countryId: 1,
    )!;
    a.position = const GamePoint(300, 240);
    b.position = const GamePoint(316, 240);
    c.advance(1 / 60);
    final first = c.fieldBattles.values.single;
    c.retreatHero(a.hero.id);
    advanceRetreatUntil(c, () => !first.isActive);
    final destination = a.destination;
    final opponent = c.dispatchTo(
      retreatHeroById(c, 4),
      a.position,
      countryId: 2,
    )!;
    opponent.position = a.position;
    c.advance(1 / 60);
    final second = c.activeBattleForHero(a.hero.id)!;
    expect(second, isNot(same(first)));
    expect(second, isA<FieldBattle>());
    expect(a.returningFromRetreat, isTrue);
    expect(c.retreatHero(a.hero.id), isTrue);
    advanceRetreatUntil(c, () => !second.isActive);
    expect(a.destination, destination);
    expect(a.target!.id, 0);
  });

  test('普通AI将领不主动撤退，守城高级将领也不违反守城限制', () {
    final random = RetreatRoll(.9);
    final c = retreatCampaign(ai: true, random: random);
    final hero = retreatHeroById(c, 18);
    hero.hp = 10;
    c.buySoldiers(0, 12);
    final battle = startRetreatSiege(c, heroId: 18, target: 0);
    advanceRetreatUntil(c, () => !battle.isActive);
    expect(random.calls, 0);
    expect(battle.simulation.retreat, isNull);
  });

  test('高级将领即使兵少且胜算很低，生命未低于四分之一也不撤退', () {
    final random = RetreatRoll(.9);
    final c = retreatCampaign(ai: true, weakNpc: true, random: random);
    c.buySoldiers(0, 12);
    c.buySoldiers(1, 4, countryId: 1);
    final hero = retreatHeroById(c, 3)..hp = 60;
    final battle = startRetreatSiege(c, heroId: 3, target: 0);
    advanceRetreatUntil(c, () => battle.rounds >= 2);
    expect(hero.hp, greaterThanOrEqualTo(hero.maxHp / 4));
    expect(hero.soldiers, lessThan(battle.defender.soldiers));
    expect(random.calls, 0);
    expect(battle.simulation.retreat, isNull);
  });

  test('高级将领低于四分之一生命但部队仍有胜算时不会撤退', () {
    final random = RetreatRoll(.9);
    final c = retreatCampaign(ai: true, random: random);
    c.buySoldiers(1, 4, countryId: 1);
    final hero = retreatHeroById(c, 3);
    hero.hp = hero.maxHp / 4 - 1;
    final battle = startRetreatSiege(c, heroId: 3, target: 0);
    advanceRetreatUntil(c, () => battle.rounds >= 2);
    expect(hero.hp, lessThan(hero.maxHp / 4));
    expect(hero.soldiers, greaterThan(0));
    expect(random.calls, 0);
    expect(battle.simulation.retreat, isNull);
  });

  test('高级AI撤退失败与玩家同样阵亡，不降低AI出发城等级', () {
    final random = RetreatRoll(.2);
    final c = retreatCampaign(ai: true, weakNpc: true, random: random);
    c.buySoldiers(0, 12);
    final hero = retreatHeroById(c, 3);
    hero.hp = hero.maxHp / 4 - 1;
    c.buySoldiers(1, 4, countryId: 1);
    final battle = startRetreatSiege(c, heroId: 3, target: 0);
    advanceRetreatUntil(
      c,
      () => battle.simulation.retreat != null || !hero.health.alive,
    );
    expect(battle.simulation.retreat?.succeeded, isFalse);
    expect(hero.hp, greaterThan(0));
    expect(hero.hp, lessThan(hero.maxHp / 4));
    advanceRetreatUntil(c, () => !battle.isActive);
    expect(c.heroes, isNot(contains(hero)));
    expect(c.cities[1]!.level, greaterThanOrEqualTo(3));
    expect(random.calls, 1);
  });

  test('高级AI将领观察到明显劣势时尝试撤退，返程不被经营AI重定向', () {
    final random = RetreatRoll(.9);
    final c = retreatCampaign(ai: true, weakNpc: true, random: random);
    c.buySoldiers(0, 12);
    final hero = retreatHeroById(c, 3);
    hero.hp = hero.maxHp / 4 - 1;
    c.buySoldiers(1, 4, countryId: 1);
    final battle = startRetreatSiege(c, heroId: 3, target: 0);
    advanceRetreatUntil(
      c,
      () => battle.simulation.retreat != null || !hero.health.alive,
    );
    expect(battle.simulation.retreat?.succeeded, isTrue);
    expect(hero.hp, lessThan(hero.maxHp / 4));
    expect(random.calls, 1);
    expect(battle.rounds, greaterThanOrEqualTo(2));
    advanceRetreatUntil(c, () => !battle.isActive);
    final march = c.marches[hero.id]!;
    final target = march.target;
    c.advance(6);
    expect(march.returningFromRetreat, isTrue);
    expect(march.target, target);
    expect(random.calls, 1);
  });
}
