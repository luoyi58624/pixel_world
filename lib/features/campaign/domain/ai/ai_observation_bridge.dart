part of '../campaign.dart';

extension _AiObservationBridge on CampaignState {
  AiRules _createAiRules() {
    final values = <String, num>{
      'soldierHp': BattleSimulation.soldierHp,
      'soldierPower': BattleSimulation.soldierAttack,
      'soldierLimit': GameConfig.heroSoldierLimit,
      'carryLimit': weaponCatalog.carryLimit,
      'defenseBase': GameConfig.cityDefenseBaseAttack,
      'defenseStep': GameConfig.cityDefenseAttackPerLevel,
      'marchSpeed': GameConfig.baseMarchSpeed,
      'encounterDistance': GameConfig.fieldEncounterDistance,
      'monthSeconds': GameConfig.secondsPerMonth,
      'supplySeconds': GameConfig.fieldSupplySecondsPerGold,
      'campRate': GameConfig.campSupplyRate,
      'supplySafety': GameConfig.countryAiSupplySafetySeconds,
      'emergencyGold': GameConfig.countryAiEmergencyGold,
      'battleBudget': GameConfig.countryAiBattleBudgetSeconds,
      'incomeStep': GameConfig.cityIncomePerLevel,
      'countryIncome': GameConfig.countryMonthlyIncome,
      'garrisonFree': GameConfig.freeGarrisonHeroes,
      'garrisonFactor': GameConfig.garrisonUpkeepFactor,
      'poorPenalty': GameConfig.poorHarvestPenalty,
      'foreignYield': GameConfig.foreignCityYieldFactor,
      'maxLevel': GameConfig.maxCityLevel,
      'firstYearCityLevel': GameConfig.firstYearCityUpgradeLimit,
      'cityLevelsPerYear': GameConfig.cityUpgradeLevelsPerYear,
      'initialYear': GameConfig.initialYear,
      'capacityPerLevel': GameConfig.cityReserveCapacityPerLevel,
      'soldierCost': GameConfig.soldierRecruitCost,
      'soldierBatch': GameConfig.soldierRecruitBatchSize,
      'drawCost': GameConfig.heroDrawCost,
      'retreatSurvivalRatio': GameConfig.aiRetreatSurvivalRatio,
      'retreatFailure': 1 - GameConfig.retreatBaseSuccessChance,
      'weaponChance': 0,
    };
    final weapons = [
      for (final w in weaponCatalog.weapons.values)
        AiWeapon(
          w.id,
          w.price,
          w.damage,
          w.selfDamage,
          w.unlockYear,
          w.shopEnabled,
          w.animationFrames / 60,
        ),
    ];
    final stamp = _aiHash(
      jsonEncode([
        values,
        GameConfig.cityUpgradeCosts,
        GameConfig.nationalAi.toJson(),
        [for (final w in weapons) w.toJson()],
      ]).codeUnits,
    );
    return AiRules(
      version: '$aiBuildStamp:$stamp',
      values: values,
      upgradeCosts: GameConfig.cityUpgradeCosts,
      movementFactors: MovementTerrain.values
          .map((t) => t.speedFactor)
          .toList(),
      fieldFactors: [
        GameConfig.grassHeroAttackFactor,
        GameConfig.riverHeroAttackFactor,
        GameConfig.mountainHeroAttackFactor,
        GameConfig.grassHeroAttackFactor,
      ],
      weapons: weapons,
      tuning: GameConfig.nationalAi,
    );
  }

  AiMap _createAiMap() {
    final terrain = [
      for (final tile in world.displayTiles)
        switch (world.paletteIds[tile]) {
          1 => 1,
          2 => 2,
          3 => 3,
          _ => 0,
        },
    ];
    return AiMap(
      '${world.id}:${world.width}:${world.height}:${_aiHash(terrain)}',
      world.width,
      world.height,
      terrain,
    );
  }

  AiArmyState _aiArmyState(CampaignHero hero) {
    final march = marches[hero.id], battle = activeBattleForHero(hero.id);
    if (march == null) {
      return battle == null ? AiArmyState.garrison : AiArmyState.defending;
    }
    if (march.returningFromRetreat) return AiArmyState.retreating;
    return switch (march.phase) {
      MarchPhase.marching => AiArmyState.marching,
      MarchPhase.camped => AiArmyState.camped,
      MarchPhase.awaitingBattle => AiArmyState.queue,
      MarchPhase.fighting => AiArmyState.attacking,
      MarchPhase.dueling => AiArmyState.field,
    };
  }

  String _aiHeroRevision(CampaignHero hero, int observer) {
    if (!identical(_aiKnownHeroes[hero.id], hero)) {
      _aiKnownHeroes[hero.id] = hero;
      _aiLifeVersions.update(hero.id, (n) => n + 1, ifAbsent: () => 0);
    }
    return '${_aiLifeVersions[hero.id]}:${hero.countryId}:${hero.cityId}:${hero.hp}:${hero.squad.map((s) => s.hp).join(',')}:${hero._weaponIds.join(',')}:${_aiArmyState(hero).index}:${_disbandAfterBattle.contains(hero.id)}:${hero.countryId == observer ? (_aiOrderVersions[hero.id] ?? 0) : 0}';
  }

  String _aiCityRevision(int id) {
    final city = cities[id]!, battle = battles[id];
    final active = battle?.isActive == true ? battle : null;
    return '${city.ownerCountryId}:${city.level}:${garrisonAt(id).map((h) => h.id).join(',')}:${active?.attacker.id}:${active?.initialCityLevel}:${active?.victories}:${active?.defender.id}';
  }

  AiObservation _observeAi(int countryId) {
    final tick = (_strategyTime * 60).round();
    final cityViews = <AiCity>[];
    for (final definition in world.cities) {
      final city = cities[definition.id]!, rect = cityBounds(definition);
      final battle = battles[definition.id]?.isActive == true
          ? battles[definition.id]
          : null;
      cityViews.add(
        AiCity(
          id: definition.id,
          country: city.ownerCountryId,
          nativeCountry: city.nativeCountryId,
          level: city.level,
          center: AiPoint(rect.center.dx, rect.center.dy),
          outline: AiOutline([
            for (final p in _cityContact(definition).outline)
              AiPoint(rect.left + p.dx, rect.top + p.dy),
          ]),
          income: city.income,
          poorIncome: city.incomeFor(Harvest.poor),
          baseIncome: city.baseIncome,
          capacityContribution: city.reserveCapacity,
          rearStagingCapacity: city.rearStagingCapacity,
          recruitAllowed:
              city.ownerCountryId == countryId &&
              recruitmentBlockReason(definition.id, countryId: countryId) ==
                  null &&
              _aiSafeRecruitment(definition.id),
          revision: _aiCityRevision(definition.id),
          initialBattleLevel: battle?.initialCityLevel,
          victories: battle?.victories ?? 0,
          attacker: battle?.attacker.id,
          defender: battle?.defender.id,
          battleStage: battle?.simulation.stage.name ?? '',
          nextWaveSeconds: battle?.nextWaveIn ?? 0,
          defenderFallen:
              battle != null &&
              !battle._settled &&
              battle.nextWaveIn == 0 &&
              heroes.contains(battle.defender) &&
              !battle.defender.health.alive &&
              battle.attacker.health.alive,
          dangerSeconds: battle == null
              ? 0
              : battle.nextWaveIn > 0
              ? battle.nextWaveIn + GameConfig.battleFormationFrames / 60
              : battle.simulation.forming
              ? math.max(
                  0,
                  GameConfig.battleFormationFrames / 60 -
                      battle.simulation.elapsed,
                )
              : battle.simulation.weaponStrike != null
              ? math.max(
                      0,
                      battle.simulation.weaponStrike!.weapon.animationFrames -
                          math.max(0, battle.simulation.weaponStrike!.frame),
                    ) /
                    60
              : 0,
        ),
      );
    }
    final heroViews = <AiHero>[];
    for (final hero in heroes.where((h) => h.health.alive)) {
      final own = hero.countryId == countryId,
          march = marches[hero.id],
          battle = activeBattleForHero(hero.id);
      final city = cityViews.firstWhere((c) => c.id == hero.cityId);
      if (!own && march?.waitingForDeparture == true) continue;
      final position =
          march?.position ?? GamePoint(city.center.x, city.center.y);
      final velocity = march?.phase == MarchPhase.marching
          ? (_aiVelocity[hero.id] ?? GamePoint.zero)
          : GamePoint.zero;
      final attacking = battle?.attacker == hero;
      final other = battle == null
          ? null
          : attacking
          ? battle.defender
          : battle.attacker;
      final hit = battle?.simulation.lastClash;
      final returnPath = own && march?.returningFromRetreat == true
          ? [march!.destination, ...march._returnRoute.reversed]
          : <GamePoint>[];
      heroViews.add(
        AiHero(
          id: hero.id,
          country: hero.countryId,
          city: hero.cityId,
          order: hero.rosterOrder,
          type: switch (hero.type) {
            HeroType.normal => 0,
            HeroType.advanced => 1,
            HeroType.protagonist => 2,
          },
          hp: hero.hp,
          maxHp: hero.maxHp,
          combat: hero.combat,
          politics: hero.politics,
          salary: GameConfig.chargeHeroSalary ? hero.salary : 0,
          salaryPaidMonth: hero._salaryPaidMonth,
          position: AiPoint(position.dx, position.dy),
          regionCity: territories.regionAt(position),
          velocity: AiPoint(velocity.dx, velocity.dy),
          state: _aiArmyState(hero),
          soldiers: hero.squad.map((s) => s.hp).toList(),
          weapons: hero.weaponIds,
          morale: battle == null
              ? hero.morale.toDouble()
              : battle.simulation
                    .morale(
                      attacking ? BattleSide.attacker : BattleSide.defender,
                    )
                    .remaining
                    .toDouble(),
          supplyDue: own ? hero._supplyDue : 0,
          destination: own && march != null
              ? AiPoint(march.destination.dx, march.destination.dy)
              : null,
          targetCity: own ? march?.target?.id : null,
          returnSeconds: returnPath.length > 64 ? 600 : 0,
          returnPath: [
            for (final p in returnPath.take(64)) AiPoint(p.dx, p.dy),
          ],
          canDispatch:
              own &&
              _dispatchProblem(hero, countryId, requireGold: false) == null,
          canMove:
              own &&
              _moveProblem(hero.id, countryId, requireGold: false) == null,
          canDismiss:
              own && dismissalBlockReason(hero, countryId: countryId) == null,
          canUpgrade:
              own &&
              _upgradeParticipantProblem(hero.cityId, hero, countryId) ==
                  null &&
              upgradeWindowBlockReason(hero.cityId) == null,
          canRetreat:
              own && retreatBlockReason(hero.id, countryId: countryId) == null,
          marked: _disbandAfterBattle.contains(hero.id),
          revision: _aiHeroRevision(hero, countryId),
          orderRevision: own ? (_aiOrderVersions[hero.id] ?? 0) : 0,
          opponent: other?.id,
          clashes: battle?.simulation.clashes ?? 0,
          received: hit == null
              ? 0
              : attacking
              ? hit.defenderDamage
              : hit.attackerDamage,
          dealt: hit == null
              ? 0
              : attacking
              ? hit.attackerDamage
              : hit.defenderDamage,
          openingAvailable:
              battle == null || !battle._weaponOpeningDone.contains(hero.id),
          weaponReady:
              battle == null ||
              battle.simulation.canUseWeaponFor(
                attacking ? BattleSide.attacker : BattleSide.defender,
              ),
        ),
      );
    }
    final countryViews = <AiCountry>[];
    for (final id
        in cities.values.map((c) => c.ownerCountryId).toSet().toList()
          ..sort()) {
      countryViews.add(
        AiCountry(
          id,
          goldFor(id),
          reserveSoldiersFor(id),
          reserveCapacityFor(id),
          heroViews
              .where((h) => h.country == id)
              .fold(0, (n, h) => n + h.salary),
          cityViews
              .where((c) => c.country == id)
              .fold(0, (n, c) => n + c.poorIncome),
          stock: id == countryId ? (_weaponStock[id] ?? {}) : {},
          garrisonAccrued: id == countryId ? garrisonUpkeepAccruedFor(id) : 0,
          hatred: id == countryId ? (_countryHatred[id] ?? {}) : {},
        ),
      );
    }
    return AiObservation(
      country: countryId,
      tick: tick,
      monthRemaining: GameConfig.secondsPerMonth - _monthSeconds,
      year: year,
      monthIndex: settledMonths,
      cities: cityViews,
      heroes: heroViews,
      countries: countryViews,
      poolCount: _heroPool.length,
      maximumSalary: _catalog.values
          .map((h) => h.salaryFor(countryId))
          .fold(0, math.max),
    );
  }
}

String _aiHash(Iterable<int> values) {
  var hash = 0x811c9dc5;
  for (final value in values) {
    hash = ((hash ^ value) * 0x01000193) & 0xffffffff;
  }
  return hash.toRadixString(16);
}
