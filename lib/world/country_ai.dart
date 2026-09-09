part of 'campaign.dart';

// 国家决策与地图共用一份战役状态和固定时钟，观战或打开面板不会暂停决策。
extension _CountryAutonomy on CampaignState {
  bool _runCountryDecisions() {
    if (defeated) return false;
    final countries =
        cities.values
            .map((city) => city.ownerCountryId)
            .where((id) => id != 0)
            .toSet()
            .toList()
          ..sort();
    if (countries.isEmpty) return false;
    final countryId = countries[_aiCountryCursor++ % countries.length];
    _aiStrategicDecisions++;
    // 将各国五秒一次的决策错开，只在本次轮到的国家内重建战略快照。
    var changed = _manageAiFieldArmies(countryId);
    changed =
        _decideCountry(countryId, _AiSnapshot(this, countryId)) || changed;
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

  List<CityDefinition> _fundedAiTargets(
    CampaignHero hero, {
    HeroMarch? march,
  }) => _targetShortlist(hero, from: march?.position)
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
            ) /
            (1 + _targetDifficulty(target) / 40),
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
  bool _manageAiFieldArmies(int planningCountryId) {
    var changed = false;
    for (final march in marches.values.toList()) {
      final countryId = march.hero.countryId;
      if (countryId != planningCountryId ||
          march.hero.isPlayer ||
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
        changed = _returnAiArmy(march) || changed;
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
    if (a.type != b.type) {
      if (a.type == HeroType.advanced) return -1;
      if (b.type == HeroType.advanced) return 1;
    }
    final combat = b.combat.compareTo(a.combat);
    if (combat != 0) return combat;
    final maximum = b.maxHp.compareTo(a.maxHp);
    if (maximum != 0) return maximum;
    final health = b.hp.compareTo(a.hp);
    return health != 0 ? health : a.sourceId.compareTo(b.sourceId);
  }
}
