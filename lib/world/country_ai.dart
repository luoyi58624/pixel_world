part of 'campaign.dart';

// 国家决策与地图共用一份战役状态和固定时钟，观战或打开面板不会暂停决策。
extension _CountryAutonomy on CampaignState {
  bool _runCountryDecisions() {
    if (defeated) return false;
    var changed = _manageAiFieldArmies();
    // 每轮打乱城池次序，避免共享英雄池总被编号较小的国家先抽空。
    final order =
        world.cities.where((city) => !cities[city.id]!.isPlayer).toList()
          ..shuffle(_aiRandom);
    for (final city in order) {
      final state = cities[city.id]!;
      final countryId = state.ownerCountryId;
      if (battles[city.id]?.isActive == true) continue;
      changed = _sendAiArmies(city, countryId) || changed;
      final pending = recruitmentOfferFor(countryId);
      if (pending != null) {
        // 热重载时兼容旧版本遗留的待签约结果，钱不够便释放锁定。
        final available = _planAiBudget(
          countryId,
          extraSalary: salaryFor(pending.hero),
        ).spendableGold;
        if (pending.signingFee > available ||
            signHero(pending, countryId: countryId) == null) {
          declineHero(pending, countryId: countryId);
        }
        changed = true;
      }
      if (recruitmentOfferFor(countryId) == null) {
        changed = _supplyAiCity(city.id, countryId) || changed;
        final signingBudget = _heroPool.isEmpty
            ? 0
            : _heroPool.values.map(_signingFee).reduce(math.max);
        final salaryBudget = _heroPool.isEmpty
            ? 0
            : _heroPool.values.map(salaryFor).reduce(math.max);
        final offer =
            _planAiBudget(countryId, extraSalary: salaryBudget).spendableGold >=
                GameConfig.heroDrawCost + signingBudget
            ? drawHero(city.id, countryId: countryId)
            : null;
        if (offer != null) {
          changed = true;
          changed = _supplyAiCity(city.id, countryId) || changed;
        }
        final governors =
            garrisonAt(city.id)
                .where(
                  (hero) =>
                      upgradeCostFor(city.id, hero, countryId: countryId) !=
                      null,
                )
                .toList()
              ..sort((a, b) => b.politics.compareTo(a.politics));
        if (recruitmentOfferFor(countryId) == null &&
            governors.isNotEmpty &&
            _planAiBudget(countryId).spendableGold >=
                upgradeCostFor(
                  city.id,
                  governors.first,
                  countryId: countryId,
                )!) {
          changed =
              upgradeCity(
                city.id,
                hero: governors.first,
                countryId: countryId,
              ) ||
              changed;
        }
      }
      changed = _sendAiArmies(city, countryId) || changed;
    }
    return changed;
  }

  bool _supplyAiCity(int cityId, int countryId) {
    // 驻军共用库存，不提前把士兵分给每位将领；真正离城或迎战时才领取。
    final desired = math.min(
      reserveCapacityFor(countryId),
      heroes
          .where(
            (hero) =>
                hero.countryId == countryId &&
                hero.health.alive &&
                !marches.containsKey(hero.id),
          )
          .fold<int>(0, (sum, hero) => sum + hero.squad.length - hero.soldiers),
    );
    final reserves = [
      maxSoldierPurchase(cityId, countryId: countryId),
      math.max(0, desired - soldiersAt(cityId)),
      GameConfig.soldierRecruitBatchSize,
      _planAiBudget(countryId).spendableGold ~/ GameConfig.soldierRecruitCost,
    ].reduce(math.min);
    return reserves > 0 && buySoldiers(cityId, reserves, countryId: countryId);
  }

  bool _sendAiArmies(CityDefinition source, int countryId) {
    var changed = false;
    final keep = cities[source.id]!.requiredGarrison;
    while (garrisonAt(source.id).where((hero) => hero.health.alive).length >
        keep) {
      final candidates =
          garrisonAt(source.id)
              .where(
                (hero) =>
                    canDispatch(hero, countryId: countryId) &&
                    hero.soldiers +
                            reinforcementCount(hero, countryId: countryId) >=
                        math.min(
                          hero.squad.length,
                          GameConfig.countryAiMinimumSoldiers,
                        ),
              )
              .toList()
            ..sort(_compareAiStrength);
      if (candidates.isEmpty) break;
      final hero = candidates.first;
      final targets = _fundedAiTargets(hero);
      if (targets.isEmpty) break;
      final target = _chooseAiTarget(hero, targets);
      if (dispatch(hero, target, countryId: countryId) == null) break;
      _record(
        '${world.countryName(countryId)}国派出${hero.name}进攻${cityName(target.id)}',
      );
      changed = true;
    }
    return changed;
  }

  List<CityDefinition> _fundedAiTargets(
    CampaignHero hero, {
    HeroMarch? march,
  }) => world.cities
      .where(
        (city) =>
            cities[city.id]!.ownerCountryId != hero.countryId &&
            _canFundAiSortie(hero, city, march: march),
      )
      .toList();

  // 预算先筛选，再按行军成本与目标国实际领地加权；不改变各国的交战关系。
  CityDefinition _chooseAiTarget(
    CampaignHero hero,
    List<CityDefinition> targets, {
    HeroMarch? march,
  }) {
    if (targets.length == 1) return targets.single;
    final territory = <int, int>{};
    for (final city in cities.values) {
      territory.update(
        city.ownerCountryId,
        (count) => count + 1,
        ifAbsent: () => 1,
      );
    }
    final source = world.cities.firstWhere((city) => city.id == hero.cityId);
    final weights = [
      for (final target in targets)
        math.min(
              GameConfig.countryAiTerritoryWeightCap,
              1 +
                  (territory[cities[target.id]!.ownerCountryId]! - 1) *
                      GameConfig.countryAiTerritoryWeightPerCity,
            ) /
            math.pow(
              1 +
                  _aiTravelTo(
                        march?.position ??
                            _departurePoint(source, cityBounds(target).center),
                        target,
                      ) /
                      GameConfig.countryAiTargetTravelScale,
              GameConfig.countryAiTargetDistancePower,
            ),
    ];
    var roll =
        _aiRandom.nextDouble() *
        weights.fold(0.0, (sum, weight) => sum + weight);
    for (var index = 0; index < targets.length; index++) {
      if (roll < weights[index]) return targets[index];
      roll -= weights[index];
    }
    return targets.last;
  }

  // 先逐队核算旧部队，不能一有收入就让所有营地同时恢复全速耗粮。
  bool _manageAiFieldArmies() {
    var changed = false;
    for (final march in marches.values.toList()) {
      final countryId = march.hero.countryId;
      if (march.hero.isPlayer ||
          march.returningFromRetreat ||
          !march.hero.health.alive ||
          goldFor(countryId) == 0 ||
          march.phase == MarchPhase.fighting ||
          march.phase == MarchPhase.dueling) {
        continue;
      }
      if (march.target != null &&
          cities[march.target!.id]!.ownerCountryId == countryId) {
        continue;
      }
      final budget = _planAiBudget(countryId);
      if (budget.gold < budget.reserveGold) {
        if (_returnAiArmy(march)) {
          changed = true;
        } else if (march.phase != MarchPhase.camped || !march.supplyHalted) {
          march.camp();
          march._supplyHalted = true;
          _record('${march.hero.name}粮草预算不足，原地待命');
          changed = true;
        }
      } else if (march.supplyHalted && march.phase == MarchPhase.camped) {
        final targets = _fundedAiTargets(march.hero, march: march);
        if (targets.isEmpty) {
          changed = _returnAiArmy(march) || changed;
          continue;
        }
        final target = _chooseAiTarget(march.hero, targets, march: march);
        march.moveTo(
          _contactPoint(march.position, cityBounds(target).center, target),
          city: target,
        );
        changed = true;
      }
    }
    return changed;
  }

  bool _returnAiArmy(HeroMarch march) {
    final countryId = march.hero.countryId;
    final friendly =
        world.cities
            .where((city) => cities[city.id]!.ownerCountryId == countryId)
            .toList()
          ..sort(
            (a, b) => _aiTravelTo(
              march.position,
              a,
            ).compareTo(_aiTravelTo(march.position, b)),
          );
    if (friendly.isEmpty) return false;
    final target = friendly.first;
    final travel = _aiTravelTo(march.position, target);
    final budget = _planAiBudget(
      countryId,
      redirecting: march,
      destination: target,
      horizon: travel,
    );
    // 返程是缩减开支，不要求攒足下一次远征的钱，但全队必须付得起返程期间的粮草。
    if (budget.gold <
        budget.reserveGold - GameConfig.countryAiEmergencyGold + 1) {
      return false;
    }
    march.moveTo(
      _contactPoint(march.position, cityBounds(target).center, target),
      city: target,
    );
    _record('${march.hero.name}收缩兵力，返回${cityName(target.id)}');
    return true;
  }

  // “最厉害”按战斗属性优先，同值按生命上限、当前生命及原版编号稳定排序。
  int _compareAiStrength(CampaignHero a, CampaignHero b) {
    final combat = b.combat.compareTo(a.combat);
    if (combat != 0) return combat;
    final maximum = b.maxHp.compareTo(a.maxHp);
    if (maximum != 0) return maximum;
    final health = b.hp.compareTo(a.hp);
    return health != 0 ? health : a.sourceId.compareTo(b.sourceId);
  }
}
