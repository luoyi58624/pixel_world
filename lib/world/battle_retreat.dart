part of 'campaign.dart';

/// 玩家与电脑共用撤退判定、伤亡结算及原路返城规则。
extension BattleRetreatCommands on CampaignState {
  /// 不允许守城将领撤退，也不能在胜败过场中改判或重复掷骰。
  String? retreatBlockReason(String heroId, {int countryId = 0}) {
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

  /// 返回成功或失败；非法指令返回空且不消耗随机数，失败将领直接阵亡。
  bool? retreatHero(String heroId, {int countryId = 0}) {
    if (retreatBlockReason(heroId, countryId: countryId) != null) return null;
    final battle = activeBattleForHero(heroId)!;
    final side = battle.attacker.id == heroId
        ? BattleSide.attacker
        : BattleSide.defender;
    final succeeded =
        _retreatRandom.nextDouble() >= GameConfig.retreatFailureChance;
    battle.simulation.beginRetreat(side, succeeded: succeeded);
    final message = battle.simulation.retreatMessage!;
    battle.record(message);
    _record(message);
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

  bool _tryAiRetreat(WorldBattle battle) {
    final sim = battle.simulation;
    if (!sim.canRetreat ||
        sim.lastClash == null ||
        sim.clashes < GameConfig.aiRetreatMinimumClashes ||
        sim.clashes <= battle._lastAiRetreatClash) {
      return false;
    }
    battle._lastAiRetreatClash = sim.clashes;
    for (final side in BattleSide.values) {
      final hero = side == BattleSide.attacker
          ? battle.attacker
          : battle.defender;
      if (hero.isPlayer ||
          hero.type != HeroType.advanced ||
          retreatBlockReason(hero.id, countryId: hero.countryId) != null) {
        continue;
      }
      // 已备好的安全武器先用完，不能刚发现劣势就带着整包武器逃走。
      if (hero._weaponIds.any(
        (id) => weaponCatalog.weapons[id]?.selfDamage == 0,
      )) {
        continue;
      }
      final other = side == BattleSide.attacker
          ? battle.defender
          : battle.attacker;
      final hit = sim.lastClash!;
      final received = side == BattleSide.attacker
          ? hit.defenderDamage
          : hit.attackerDamage;
      final dealt = side == BattleSide.attacker
          ? hit.attackerDamage
          : hit.defenderDamage;
      if (received <= 0) continue;
      final ownHealth =
          hero.hp + hero.squad.fold<double>(0, (sum, s) => sum + s.hp);
      final enemyHealth =
          other.hp + other.squad.fold<double>(0, (sum, s) => sum + s.hp);
      final losing =
          ownHealth / received <
          enemyHealth / math.max(1, dealt) * GameConfig.aiRetreatSurvivalRatio;
      if (losing &&
          (hero.hp <= hero.maxHp * GameConfig.aiRetreatHealthRatio ||
              hero.soldiers < other.soldiers)) {
        // 明显劣势才冒六成阵亡风险，每次新碰撞观察一次，不逐帧抽签。
        retreatHero(hero.id, countryId: hero.countryId);
        return true;
      }
    }
    return false;
  }
}
