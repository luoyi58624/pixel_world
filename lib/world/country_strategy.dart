part of 'campaign.dart';

/// 国家战略阶段，筹备不等于已经向目标派兵。
enum CountryWarPhase { defending, preparing, saving, attacking }

/// 一个国家锁定的作战计划，各城共用，不分别向不同强城盲目出兵。
class CountryWarPlan {
  CountryWarPlan._();

  /// 当前目标，防御或没有可选目标时可能为空。
  int? targetCityId;

  /// 锁定时的目标归属，用于在易主后重新评估。
  int? targetCountryId;

  /// 当前正在守家、筹备、积蓄资金或执行进攻。
  CountryWarPhase phase = CountryWarPhase.preparing;

  /// 本次计划需要出征的将领数量。
  int requiredHeroes = 1;

  /// 配齐武器、兵力并预留粮草后的最低国库要求。
  int requiredGold = 0;
  final List<String> _committed = [];
  double _retryAt = 0;
}

class _AiSnapshot {
  _AiSnapshot(CampaignState c, int countryId) {
    owned.addAll(
      c.world.cities.where(
        (city) => c.cities[city.id]!.ownerCountryId == countryId,
      ),
    );
    for (final hero in c.heroes) {
      if (hero.health.alive &&
          !c.marches.containsKey(hero.id) &&
          c.cities[hero.cityId]?.ownerCountryId == hero.countryId) {
        garrisons.putIfAbsent(hero.cityId, () => []).add(hero);
      }
    }
    for (final heroes in garrisons.values) {
      heroes.sort(CampaignHero.compareRosterOrder);
    }
    for (final city in owned) {
      final center = c.cityBounds(city).center;
      var danger = c.battles[city.id]?.isActive == true ? 100.0 : 0.0;
      for (final march in c.marches.values) {
        if (!march.hero.health.alive ||
            march.hero.countryId == countryId ||
            march.returningFromRetreat) {
          continue;
        }
        final distance = (march.position - center).distance;
        if (distance > GameConfig.aiThreatDistance) continue;
        final delta = march.destination - march.position;
        final toCity = center - march.position;
        final along = delta.distanceSquared == 0
            ? 0.0
            : ((toCity.dx * delta.dx + toCity.dy * delta.dy) /
                      delta.distanceSquared)
                  .clamp(0.0, 1.0);
        final nearPath =
            (march.position + delta * along - center).distance < 56;
        if (march.target?.id == city.id || nearPath || distance < 72) {
          danger +=
              (march.hero.combat + march.hero.soldiers * 2 + 1) *
              (2 - distance / GameConfig.aiThreatDistance);
        }
      }
      if (danger > 0) threats[city.id] = danger;
    }
  }
  final List<CityDefinition> owned = [];
  final Map<int, List<CampaignHero>> garrisons = {};
  final Map<int, double> threats = {};
}

extension _CountryStrategy on CampaignState {
  double _targetDifficulty(CityDefinition target) {
    final guards = garrisonAt(target.id);
    if (guards.isEmpty) return 0;
    return cities[target.id]!.level * 8 +
        guards.fold<double>(
          0,
          (sum, h) =>
              sum + h.combat + h.hp / 10 + (h.type != HeroType.normal ? 12 : 0),
        ) +
        math.min(
              reserveSoldiersFor(cities[target.id]!.ownerCountryId),
              guards.length * 4,
            ) *
            2;
  }

  List<CityDefinition> _targetShortlist(CampaignHero hero, {Offset? from}) {
    final origin =
        from ??
        cityBounds(world.cities.firstWhere((c) => c.id == hero.cityId)).center;
    final targets = world.cities
        .where((c) => cities[c.id]!.ownerCountryId != hero.countryId)
        .toList();
    if (targets.isEmpty) return targets;
    final distances = {
      for (final target in targets)
        target.id: (cityBounds(target).center - origin).distance,
    };
    final difficulties = {
      for (final target in targets) target.id: _targetDifficulty(target),
    };
    final nearest = distances.values.reduce(math.min);
    final easy = targets
        .where(
          (t) =>
              distances[t.id]! <= nearest + GameConfig.aiThreatDistance &&
              (difficulties[t.id] == 0 ||
                  cities[t.id]!.level <= 2 &&
                      garrisonAt(t.id).every(
                        (h) => h.type == HeroType.normal && h.combat <= 10,
                      )),
        )
        .toList();
    final choices = easy.isNotEmpty
        ? targets
              .where(
                (t) =>
                    difficulties[t.id] == 0 ||
                    cities[t.id]!.level <= 2 &&
                        garrisonAt(t.id).every(
                          (h) => h.type == HeroType.normal && h.combat <= 10,
                        ),
              )
              .toList()
        : targets;
    final strengths = _countryStrengths();
    choices.sort(
      (a, b) =>
          ((distances[a.id]! + 32) *
                  (1 + difficulties[a.id]! / 40) /
                  _countryTargetWeight(
                    hero.countryId,
                    cities[a.id]!.ownerCountryId,
                    strengths,
                  ))
              .compareTo(
                (distances[b.id]! + 32) *
                    (1 + difficulties[b.id]! / 40) /
                    _countryTargetWeight(
                      hero.countryId,
                      cities[b.id]!.ownerCountryId,
                      strengths,
                    ),
              ),
    );
    return choices.take(GameConfig.aiTargetShortlist).toList();
  }

  List<CampaignHero> _spareHeroes(int countryId, _AiSnapshot snapshot) {
    final result = <CampaignHero>[];
    for (final city in snapshot.owned) {
      final guards = List<CampaignHero>.of(snapshot.garrisons[city.id] ?? [])
        ..sort(_compareAiStrength);
      final count = math.max(
        0,
        guards.length - cities[city.id]!.requiredGarrison,
      );
      result.addAll(
        guards.where((h) => canDispatch(h, countryId: countryId)).take(count),
      );
    }
    return result..sort(_compareAiStrength);
  }

  bool _decideCountry(
    int countryId,
    _AiSnapshot snapshot, {
    bool reconsidered = false,
  }) {
    if (snapshot.owned.isEmpty) return false;
    final plan = _warPlans.putIfAbsent(countryId, CountryWarPlan._);
    if (snapshot.threats.isNotEmpty) {
      plan.phase = CountryWarPhase.defending;
      final citiesByThreat =
          snapshot.owned
              .where((c) => snapshot.threats.containsKey(c.id))
              .toList()
            ..sort(
              (a, b) =>
                  snapshot.threats[b.id]!.compareTo(snapshot.threats[a.id]!),
            );
      var changed = false;
      for (final city in citiesByThreat.take(2)) {
        changed = _upgradeAiCity(city.id, countryId) || changed;
        changed = _hireAiHero(city.id, countryId) || changed;
        changed = _supplyAiCity(city.id, countryId) || changed;
      }
      return changed;
    }
    // 弱国扩张可同时使用全部多余将领，已在外的轮攻不阻止其余部队开辟新目标。
    if (_launchExpansionAttacks(countryId, snapshot, plan)) return true;
    if (plan._committed.any((id) {
      final march = marches[id];
      return march != null &&
          march.hero.countryId == countryId &&
          !march.returningFromRetreat &&
          march.target != null &&
          cities[march.target!.id]!.ownerCountryId != countryId;
    })) {
      plan.phase = CountryWarPhase.attacking;
      return false;
    }
    if (plan._committed.isNotEmpty) {
      plan._committed.clear();
      plan._retryAt = _strategyTime + GameConfig.aiRaidRetrySeconds;
      plan.phase = CountryWarPhase.preparing;
    }
    final spare = _spareHeroes(
      countryId,
      snapshot,
    ).take(GameConfig.aiMaximumRaidHeroes).toList();
    final candidates =
        snapshot.owned
            .expand((c) => snapshot.garrisons[c.id] ?? <CampaignHero>[])
            .toList()
          ..sort(_compareAiStrength);
    if (candidates.isEmpty) {
      return _hireAiHero(snapshot.owned.first.id, countryId);
    }
    final leader = spare.firstOrNull ?? candidates.first;
    final current = world.cities
        .where((c) => c.id == plan.targetCityId)
        .firstOrNull;
    final nearby = _targetShortlist(leader);
    if (current == null ||
        cities[current.id]!.ownerCountryId == countryId ||
        cities[current.id]!.ownerCountryId != plan.targetCountryId ||
        nearby.isNotEmpty &&
            _targetDifficulty(nearby.first) < _targetDifficulty(current) * .5) {
      var choices = _fundedAiTargets(leader);
      if (choices.isEmpty) choices = nearby;
      if (choices.isEmpty) return false;
      final selected = _chooseAiTarget(leader, choices);
      plan.targetCityId = selected.id;
      plan.targetCountryId = cities[selected.id]!.ownerCountryId;
    }
    final target = world.cities.firstWhere((c) => c.id == plan.targetCityId);
    if (_strategyTime < plan._retryAt) return false;
    var loadouts = {
      for (final hero in spare) hero.id: List<int>.of(hero._weaponIds),
    };
    var forecast = _projectRaid(spare, target, loadouts, snapshot);
    if ((forecast.used == 0 || forecast.losses > 0) &&
        weaponCatalog.weapons.isNotEmpty) {
      for (var count = 1; count <= weaponCatalog.carryLimit; count++) {
        final proposed = _raidWeapons(spare, countryId, count);
        final next = _projectRaid(spare, target, proposed, snapshot);
        if (next.used > 0 &&
            (forecast.used == 0 ||
                next.losses < forecast.losses ||
                next.losses == forecast.losses && next.used < forecast.used ||
                count == 1 &&
                    next.used == forecast.used &&
                    next.losses == forecast.losses &&
                    cities[target.id]!.level >= 3 &&
                    loadouts.values.every((ids) => ids.isEmpty))) {
          forecast = next;
          loadouts = proposed;
        }
        if (forecast.used == 1 && forecast.losses == 0) break;
      }
    }
    final used = forecast.used;
    if (used == 0) {
      plan.phase = CountryWarPhase.preparing;
      plan.requiredHeroes = math.min(
        GameConfig.aiMaximumRaidHeroes,
        spare.length + 1,
      );
      if (spare.length >= GameConfig.aiMaximumRaidHeroes) {
        // 当前最强编队也无法拿下时改找可攻目标，不为无法参战的第五人持续花钱。
        if (!reconsidered) {
          for (final alternative in nearby.where((c) => c.id != target.id)) {
            final gear = _raidWeapons(
              spare,
              countryId,
              weaponCatalog.carryLimit,
            );
            if (_projectRaid(spare, alternative, gear, snapshot).used == 0) {
              continue;
            }
            plan.targetCityId = alternative.id;
            plan.targetCountryId = cities[alternative.id]!.ownerCountryId;
            return _decideCountry(countryId, snapshot, reconsidered: true);
          }
        }
        return _supplyAiCity(snapshot.owned.first.id, countryId);
      }
      // 无法组成能打赢的队伍时先招将，只有名额不足才为招募升级城池。
      for (final city in snapshot.owned) {
        if (_hireAiHero(city.id, countryId)) return true;
        if (_heroPool.isNotEmpty &&
            recruitmentFull(city.id) &&
            _upgradeAiCity(city.id, countryId)) {
          return true;
        }
      }
      return _supplyAiCity(snapshot.owned.first.id, countryId);
    }
    final raid = spare.take(used).toList();
    final cost = _raidEquipmentCost(raid, loadouts, countryId);
    final stationed = snapshot.owned.fold<int>(
      0,
      (n, c) => n + (snapshot.garrisons[c.id]?.length ?? 0),
    );
    final desired = math.min(
      reserveCapacityFor(countryId),
      stationed * GameConfig.heroSoldierLimit,
    );
    final recruitCount = math.max(0, desired - reserveSoldiersFor(countryId));
    final budget = _planAiBudget(countryId, raid: raid, raidTarget: target);
    plan.requiredHeroes = used;
    plan.requiredGold =
        budget.reserveGold +
        cost +
        recruitCount * GameConfig.soldierRecruitCost;
    if (goldFor(countryId) < plan.requiredGold) {
      if (!reconsidered) {
        for (final alternative in nearby.where((c) => c.id != target.id)) {
          final alternate = _projectRaid(
            spare,
            alternative,
            loadouts,
            snapshot,
          );
          if (alternate.used == 0) continue;
          final team = spare.take(alternate.used).toList();
          final needed =
              _planAiBudget(
                countryId,
                raid: team,
                raidTarget: alternative,
              ).reserveGold +
              _raidEquipmentCost(team, loadouts, countryId) +
              recruitCount * GameConfig.soldierRecruitCost;
          if (goldFor(countryId) < needed) continue;
          plan.targetCityId = alternative.id;
          plan.targetCountryId = cities[alternative.id]!.ownerCountryId;
          return _decideCountry(countryId, snapshot, reconsidered: true);
        }
      }
      plan.phase = CountryWarPhase.saving;
      return false;
    }
    if (recruitCount > 0 &&
        !buySoldiers(
          snapshot.owned.first.id,
          recruitCount,
          countryId: countryId,
        )) {
      return false;
    }
    var changed = false;
    for (final hero in raid) {
      final selection = <int, int>{};
      final needed = <int, int>{};
      // 保留将领原装备，只补空槽；全队预算已通过才为出征队伍购买。
      final gear = loadouts[hero.id]!;
      for (var slot = hero._weaponIds.length; slot < gear.length; slot++) {
        final id = gear[slot];
        needed.update(id, (n) => n + 1, ifAbsent: () => 1);
        if (weaponStockFor(countryId, id) < needed[id]! &&
            !buyWeapon(id, countryId: countryId)) {
          return changed;
        }
        selection[slot] = id;
      }
      if (dispatch(
            hero,
            target,
            countryId: countryId,
            weaponSlots: selection,
          ) !=
          null) {
        plan._committed.add(hero.id);
        changed = true;
      }
    }
    if (changed) {
      plan.phase = CountryWarPhase.attacking;
      _record(
        '${world.countryName(countryId)}国派出${raid.map((h) => h.name).join('、')}进攻${cityName(target.id)}',
      );
    }
    return changed;
  }

  bool _hireAiHero(int cityId, int countryId) {
    if (_heroPool.isEmpty ||
        recruitmentBlockReason(cityId, countryId: countryId) != null) {
      return false;
    }
    final fee = _heroPool.values.map(_signingFee).reduce(math.max);
    final salary = _heroPool.values.map(salaryFor).reduce(math.max);
    if (_planAiBudget(countryId, extraSalary: salary).spendableGold <
        GameConfig.heroDrawCost + fee) {
      return false;
    }
    return drawHero(cityId, countryId: countryId) != null;
  }

  bool _upgradeAiCity(int cityId, int countryId) {
    final governors =
        garrisonAt(cityId)
            .where(
              (h) => upgradeCostFor(cityId, h, countryId: countryId) != null,
            )
            .toList()
          ..sort((a, b) => b.politics.compareTo(a.politics));
    if (governors.isEmpty) return false;
    final cost = upgradeCostFor(cityId, governors.first, countryId: countryId)!;
    return _planAiBudget(countryId).spendableGold >= cost &&
        upgradeCity(cityId, hero: governors.first, countryId: countryId);
  }

  Map<String, List<int>> _raidWeapons(
    List<CampaignHero> raid,
    int countryId,
    int count,
  ) {
    final stock = Map<int, int>.of(_weaponStock[countryId] ?? {});
    final choices =
        weaponCatalog.weapons.values.where((w) => w.selfDamage == 0).toList()
          ..sort((a, b) => b.damage.compareTo(a.damage));
    final result = <String, List<int>>{};
    for (final hero in raid) {
      final ids = List<int>.of(hero._weaponIds);
      for (var slot = ids.length; slot < count; slot++) {
        final weapon = choices
            .where(
              (w) => (stock[w.id] ?? 0) > 0 || weaponUnlocked(countryId, w),
            )
            .firstOrNull;
        if (weapon == null) break;
        ids.add(weapon.id);
        if ((stock[weapon.id] ?? 0) > 0) {
          stock[weapon.id] = stock[weapon.id]! - 1;
        }
      }
      result[hero.id] = ids;
    }
    return result;
  }

  int _raidEquipmentCost(
    List<CampaignHero> raid,
    Map<String, List<int>> loadouts,
    int countryId,
  ) {
    final stock = Map<int, int>.of(_weaponStock[countryId] ?? {});
    var cost = 0;
    for (final hero in raid) {
      for (final id in loadouts[hero.id]!.skip(hero._weaponIds.length)) {
        if ((stock[id] ?? 0) > 0) {
          stock[id] = stock[id]! - 1;
        } else {
          cost += weaponCatalog.weapons[id]!.price;
        }
      }
    }
    return cost;
  }

  // 只估算碰撞轮数，不复制战斗内核做逐帧试打；城防降级按不命中保守预测。
  ({int used, int losses}) _projectRaid(
    List<CampaignHero> raid,
    CityDefinition target,
    Map<String, List<int>> loadouts,
    _AiSnapshot snapshot,
  ) {
    if (raid.isEmpty) return (used: 0, losses: 0);
    final guards = List<CampaignHero>.of(snapshot.garrisons[target.id] ?? [])
        .reversed
        .toList();
    if (guards.isEmpty) return (used: 1, losses: 0);
    var reserve = reserveSoldiersFor(cities[target.id]!.ownerCountryId);
    var guardIndex = 0;
    var losses = 0;
    for (var index = 0; index < raid.length; index++) {
      final hero = raid[index];
      var ownHp = hero.hp;
      var soldiers = GameConfig.heroSoldierLimit;
      var ownTotal = ownHp + soldiers * BattleSimulation.soldierHp;
      final cargo = List<int>.of(loadouts[hero.id] ?? hero._weaponIds);
      var victories = 0;
      while (guardIndex < guards.length) {
        final guard = guards[guardIndex];
        final defendingSoldiers = math.min(
          GameConfig.heroSoldierLimit,
          reserve,
        );
        reserve -= defendingSoldiers;
        var enemyTotal =
            guard.maxHp +
            defendingSoldiers * BattleSimulation.soldierHp.toDouble();
        if (ownTotal <= 0) {
          losses++;
          reserve += defendingSoldiers;
          break;
        }
        while (cargo.isNotEmpty && enemyTotal > 0) {
          enemyTotal -= weaponCatalog.weapons[cargo.removeAt(0)]!.damage;
        }
        final ownPower = hero.combat + 2 * soldiers;
        final defensePower =
            guard.combat +
            GameConfig.cityDefenseBaseAttack +
            GameConfig.cityDefenseAttackPerLevel *
                (math.max(1, cities[target.id]!.level - victories) - 1) +
            2 * defendingSoldiers;
        final incoming =
            (_expectedDamage(defensePower)) *
            (1 + ((defensePower - ownPower) / 40).clamp(0.0, 1.0));
        final outgoing =
            (_expectedDamage(ownPower)) *
            (1 + ((ownPower - defensePower) / 40).clamp(0.0, 1.0));
        final turns = math.max(0, (enemyTotal / outgoing).ceil());
        final loss = turns * incoming;
        if (loss >= ownTotal) {
          losses++;
          final remains = math.max(
            0.0,
            enemyTotal - (ownTotal / incoming).floor() * outgoing,
          );
          reserve += math.max(
            0,
            ((remains - guard.maxHp) / BattleSimulation.soldierHp).ceil(),
          );
          break;
        }
        ownTotal -= loss;
        soldiers = math.max(
          0,
          ((ownTotal - ownHp) / BattleSimulation.soldierHp).ceil(),
        );
        ownHp = math.min(ownHp, ownTotal);
        victories++;
        guardIndex++;
        if (victories >= cities[target.id]!.level ||
            guardIndex >= guards.length) {
          return (used: index + 1, losses: losses);
        }
      }
    }
    return (used: 0, losses: losses);
  }

  double _expectedDamage(num power) => (((power + 2) ~/ 4) + 1) * 1.5;
}
