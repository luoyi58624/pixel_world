part of '../campaign.dart';

/// 玩家与电脑共用撤退判定、伤亡结算及原路返城规则。
extension BattleRetreatCommands on CampaignState {
  /// 按此刻真实生命与存活士兵计算撤退成功率。
  double retreatSuccessChance(String heroId) {
    final hero = heroes.where((h) => h.id == heroId).firstOrNull;
    if (hero == null) return 0;
    return CombatRules.retreatSuccess(
      hero.hp,
      hero.maxHp,
      hero.soldiers,
      soldierLimit: GameConfig.heroSoldierLimit,
      base: GameConfig.retreatBaseSuccessChance,
      penalty: GameConfig.retreatConditionPenalty,
    );
  }

  /// 不允许守城将领撤退，也不能在胜败过场中改判或重复掷骰。
  String? retreatBlockReason(String heroId, {int countryId = 0}) {
    if (isPaused) return '游戏已暂停';
    if (defeated) return '游戏已结束';
    final hero = heroes.where((hero) => hero.id == heroId).firstOrNull;
    if (hero == null || !hero.health.alive) return '将领已阵亡';
    if (hero.countryId != countryId) return '只能指挥本国将领';
    final battle = activeBattleForHero(heroId);
    if (battle == null) return '当前没有交战';
    if (!marches.containsKey(heroId) ||
        battle is CityBattle && battle.defender == hero) {
      return '守城将领不能撤退';
    }
    if (_disbandAfterBattle.contains(heroId)) return '出发城已失守';
    if (!battle.simulation.canRetreat) return '战斗结果已确定';
    return null;
  }

  /// 锁定成功或失败，双方退回起点后再演出结果；非法指令不消耗随机数。
  bool? retreatHero(String heroId, {int countryId = 0}) {
    final problem = retreatBlockReason(heroId, countryId: countryId);
    if (problem != null) {
      _rejectEvent(
        GameEventKind.retreatRequested,
        problem,
        countryId: countryId,
        hero: heroes.where((h) => h.id == heroId).firstOrNull,
        data: {'heroId': heroId},
      );
      return null;
    }
    final battle = activeBattleForHero(heroId)!;
    final side = battle.attacker.id == heroId
        ? BattleSide.attacker
        : BattleSide.defender;
    final successChance = retreatSuccessChance(heroId);
    final succeeded = _retreatRandom.nextDouble() >= 1 - successChance;
    battle.simulation.beginRetreat(side, succeeded: succeeded);
    _aiOrderVersions.update(heroId, (n) => n + 1, ifAbsent: () => 1);
    final message = battle.simulation.retreatMessage!;
    battle.record(message);
    _record(
      message,
      kind: GameEventKind.retreatRequested,
      countryId: countryId,
      hero: heroes.firstWhere((h) => h.id == heroId),
      reason: '申请按真实撤退规则脱离当前战斗',
      data: {'successChance': successChance},
    );
    return succeeded;
  }

  void _settleSuccessfulRetreat(WorldBattle battle) {
    final attempt = battle.simulation.retreat!;
    final hero = attempt.side == BattleSide.attacker
        ? battle.attacker
        : battle.defender;
    battle.outcome = '${hero.name}撤退成功，沿原路返回';
    battle.simulation.stop();
    battle.record(battle.outcome!);
    _record(battle.outcome!);
    _battleEvent(
      GameEventKind.retreatResolved,
      battle,
      battle.outcome!,
      data: {'succeeded': true},
    );
    if (battle is CityBattle) {
      battle.nextWaveIn = 0;
      _releaseDefender(battle);
      _settleSiegeDamage(battle);
    } else if (battle is FieldBattle) {
      _retreatSeparations.add(
        _retreatPair(battle.attacker.id, battle.defender.id),
      );
      final other = attempt.side == BattleSide.attacker
          ? battle.defender
          : battle.attacker;
      _resumeFieldArmy(
        other,
        wasCamped: attempt.side == BattleSide.attacker
            ? battle.defenderWasCamped
            : battle.attackerWasCamped,
      );
    }
    if (_disbandAfterBattle.contains(hero.id)) return;
    final march = marches[hero.id];
    if (march == null || !hero.health.alive) return;
    if (!march.returningFromRetreat) {
      march._rememberPosition();
      march._returnRoute.addAll(march._outboundRoute);
      if (march._returnRoute.last == march.position) {
        march._returnRoute.removeLast();
      }
      march._returningFromRetreat = true;
      _nextRetreatLeg(march);
    } else {
      // 返程再次遭遇敌军时，胜出或逃脱后继续未完成的同一路段。
      march._resumeToward(march.destination, city: march.target);
    }
    if (goldFor(hero.countryId) == 0) _campForSupply(march);
  }

  void _nextRetreatLeg(HeroMarch march) {
    final finalLeg = march._returnRoute.length <= 1;
    final point = march._returnRoute.isEmpty
        ? march._outboundRoute.first
        : march._returnRoute.removeLast();
    final source = finalLeg
        ? world.cities.firstWhere((city) => city.id == march.departureCityId)
        : null;
    march.moveTo(
      source == null ? point : _contactPoint(march.position, point, source),
      city: source,
    );
  }

  bool _advanceRetreatReturns() {
    var changed = false;
    for (final march in marches.values.toList()) {
      if (!march.returningFromRetreat ||
          activeBattleForHero(march.hero.id) != null) {
        continue;
      }
      if (cities[march.departureCityId]?.ownerCountryId !=
          march.hero.countryId) {
        _disbandHero(march.hero);
        changed = true;
        continue;
      }
      if (goldFor(march.hero.countryId) == 0) continue;
      if (march.supplyHalted) {
        march._resumeToward(march.destination, city: march.target);
        changed = true;
      }
      if (march.phase == MarchPhase.camped && march.target == null) {
        _nextRetreatLeg(march);
        changed = true;
      }
    }
    return changed;
  }

  (String, String) _retreatPair(String a, String b) =>
      a.compareTo(b) < 0 ? (a, b) : (b, a);
}
