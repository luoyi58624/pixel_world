part of 'campaign.dart';

Map<String, dynamic> _map(dynamic value) =>
    Map<String, dynamic>.from(value as Map);
double _double(dynamic value) => (value as num).toDouble();
List<double> _point(GamePoint p) => [p.dx, p.dy];
GamePoint _readPoint(dynamic p) => GamePoint(_double(p[0]), _double(p[1]));
Map<String, dynamic> _keys(Map<dynamic, dynamic> values) => {
  for (final e in values.entries) '${e.key}': e.value,
};
void _intMap<T>(Map<int, T> target, dynamic data, T Function(dynamic) read) {
  target
    ..clear()
    ..addAll({
      for (final e in (data as Map).entries) int.parse(e.key): read(e.value),
    });
}

/// 保存实际发生的战役状态，回放与继续游戏使用同一份快照。
extension CampaignSnapshots on CampaignState {
  /// 完整保留对象共享关系、经济零头、行军队列和正在进行的战斗。
  Map<String, dynamic> saveState({bool replay = false}) {
    final health = <BattleHealth>[];
    final healthIds = Map<BattleHealth, int>.identity();
    int healthId(BattleHealth h) => healthIds.putIfAbsent(h, () {
      health.add(h);
      return health.length - 1;
    });
    final people = <CampaignHero>[];
    final peopleIds = Map<CampaignHero, int>.identity();
    int heroId(CampaignHero h) => peopleIds.putIfAbsent(h, () {
      people.add(h);
      return people.length - 1;
    });
    final active = heroes.map(heroId).toList();
    if (_protagonist != null) heroId(_protagonist);
    final fights = [
      for (final b in allBattles)
        {
          'attacker': heroId(b.attacker),
          'defender': heroId(b.defender),
          'simulation': b.simulation.saveState(healthId),
          'outcome': b.outcome,
          'settled': b._settled,
          'notice': [
            b._aiNoticedClashes,
            b._aiNoticedTroops,
            b._aiNoticedAttackerHp,
            b._aiNoticedDefenderHp,
          ],
          'events': List.of(b.events),
          if (b is CityBattle) ...{
            'city': b.city.id,
            'initialLevel': b.initialCityLevel,
            'country': b.defendingCountryId,
            'victories': b.victories,
            'loss': b.defenseLoss,
            'damageSettled': b._damageSettled,
            'wave': b.wave,
            'nextWave': b.nextWaveIn,
            'seed': b._seed,
          },
          if (b is FieldBattle) ...{
            'field': b.id,
            'position': _point(b.position),
            'terrain': b.terrain.index,
            'camped': [b.attackerWasCamped, b.defenderWasCamped],
          },
        },
    ];
    final troops = [
      for (final m in marches.values)
        {
          'hero': heroId(m.hero),
          'departure': m.departureCityId,
          'position': _point(m.position),
          'destination': _point(m.destination),
          'target': m.target?.id,
          'direction': m.direction.index,
          'distance': m.walkDistance,
          'animation': m._walkAnimation.savedTime,
          'phase': m.phase.index,
          'outbound': m._outboundRoute.map(_point).toList(),
          'return': m._returnRoute.map(_point).toList(),
          'returning': m._returningFromRetreat,
          'provoked': m._provokedCountries.toList(),
          'pending': m._departurePending,
          'at': m._departureAt,
          'blocked': m._trafficBlocked,
          'arrivalWaitLogged': m._arrivalWaitLogged,
          'siegeWaiting': m._siegeWaiting,
          'siegeSlot': m._siegeSlot == null
              ? null
              : [m._siegeSlot!.ring, m._siegeSlot!.index],
          'traffic': m._trafficRoute.map(_point).toList(),
          'arrival': m._siegeArrival == null
              ? null
              : [m._siegeArrival!.cityId, m._siegeArrival!.order],
        },
    ];
    final persons = [
      for (final h in people)
        {
          'id': h.id,
          'order': h.rosterOrder,
          'source': h.sourceId,
          'name': h.name,
          'type': h.type.index,
          'appearance': h.appearance.index,
          'city': h.cityId,
          'country': h.countryId,
          'health': healthId(h.health),
          'combat': h.combat,
          'morale': h.morale,
          'politics': h.politics,
          'salary': h.salary,
          'paid': h._salaryPaidMonth,
          'squad': h.squad.map(healthId).toList(),
        },
    ];
    final ai = _ai;
    return {
      'version': 1,
      'payrollVersion': 2,
      'stateRevision': 2,
      'siegeFormationVersion': 2,
      'world': world.id,
      'aiEnabled': aiEnabled,
      'cities': {
        for (final e in cities.entries)
          '${e.key}': [
            e.value.ownerCountryId,
            e.value.defense,
            e.value.baseIncome,
            e.value.initialLevel,
            e.value.nativeCountryId,
            e.value.level,
          ],
      },
      'people': persons,
      'active': active,
      'health': [
        for (final h in health) [h.maxHp, h.hp],
      ],
      'marches': troops,
      'battles': fights,
      'gold': _keys(_countryGold),
      'countryConfigs': {
        for (final e in countryConfigs.entries)
          '${e.key}': [e.value.initialGold, e.value.monthlyBaseIncome],
      },
      'fixedIncomeVersion': 2,
      'cityIncomeVersion': 2,
      'cityRecruitmentMonths': _keys(_cityRecruitmentMonths),
      'soldierRecruitmentMonths': _keys(_soldierRecruitmentMonths),
      if (replay)
        'soldierRecruitmentWindows': [
          for (final window in _soldierRecruitmentWindows.values)
            if (isSoldierRecruitmentOpen(window)) window.countryId,
        ],
      'cityUpgradeMonths': _keys(_cityUpgradeMonths),
      'random': [
        for (final r in [
          _economyRandom,
          _recruitmentRandom,
          _aiRandom,
          _siegeRandom,
          _retreatRandom,
        ])
          if (r is StateRandom) r.state else throw StateError('测试随机源不能用于正式存档'),
      ],
      'pool': _heroPool.keys.toList(),
      'offers': [
        for (final o in _recruitmentOffers.values)
          [o.hero.id, o.cityId, o.countryId, o.initialSalary, o.drawnMonth],
      ],
      'separations': [
        for (final p in _retreatSeparations) [p.$1, p.$2],
      ],
      'arrivalSerial': _siegeArrivalSerial,
      'strategyTime': _strategyTime,
      'hatred': {
        for (final e in _countryHatred.entries) '${e.key}': _keys(e.value),
      },
      'plans': {
        for (final e in _warPlans.entries)
          '${e.key}': [
            e.value.targetCityId,
            e.value.targetCountryId,
            e.value.offensiveCountryId,
            e.value.offensiveCityId,
            e.value.phase.index,
            e.value.requiredHeroes,
            e.value.requiredGold,
          ],
      },
      'orderVersions': Map.of(_aiOrderVersions),
      'lifeVersions': Map.of(_aiLifeVersions),
      'velocity': {for (final e in _aiVelocity.entries) e.key: _point(e.value)},
      'rearDeadlines': _keys(_aiRearDeadlines),
      'nextDeparture': _keys(_nextAiDeparture),
      'disband': _disbandAfterBattle.toList(),
      'territoryOwner': Map.of(_lastTerritoryOwner),
      'territoryRegion': Map.of(_lastTerritoryRegion),
      'reserve': {
        for (final e in countryTroops.entries)
          '${e.key}': e.value.reserveSoldiers,
      },
      'capacity': _keys(_initialTroopCapacity),
      'garrisonBills': _keys(_garrisonBills),
      'settlements': {
        for (final e in _settlements.entries)
          '${e.key}': [
            e.value.year,
            e.value.month,
            e.value.harvest?.index,
            e.value.cityCount,
            e.value.baseIncome,
            e.value.adjustment,
            e.value.salary,
            e.value.garrisonUpkeep,
            e.value.goldBefore,
            e.value.goldAfter,
            e.value.fixedIncome,
            [for (final city in e.value.cityIncomes) city.toJson()],
          ],
      },
      'time': [
        settledMonths,
        _monthSeconds,
        _simulationFraction,
        _battleSerial,
      ],
      'paused': _paused,
      'dispatched': hasDispatched,
      'defeat': _defeatReason?.index,
      'message': lastEvent,
      'journal': List.of(journal),
      'eventLog': events.saveState(replay: replay),
      'ai': replay || ai == null
          ? null
          : {
              'tasks': {
                for (final e in ai.tasks.entries) e.key: e.value.toJson(),
              },
              'owners': Map.of(ai._taskOwners),
              'decisions': Map.of(ai._taskDecisions),
              'names': Map.of(ai._taskNames),
              'idle': _keys(ai.idleCycles),
              'seeds': _keys(ai._seeds),
              'threats': _keys(ai._knownThreats),
              'changedOwners': Map.of(ai._changedTargetOwners),
              'schedules': {
                for (final e in ai._schedules.entries)
                  '${e.key}': e.value.saveState(),
              },
            },
    };
  }

  /// 恢复一张地图，回放模式不创建 AI 后台或执行游戏规则。
  static CampaignState restore(
    Map<String, dynamic> d,
    WorldDefinition world,
    List<RomHeroDefinition> catalog, {
    bool replay = false,
    AiWorker Function()? aiWorkerFactory,
  }) {
    if (d['version'] != 1 || d['world'] != world.id) {
      throw const FormatException('存档版本或地图不匹配');
    }
    final definitions = {for (final h in catalog) h.id: h};
    int combat(int saved, int source) {
      final definition = definitions[source];
      // 历史1491dbe只给这批角色统一+3，兼容旧档无需把重复的ROM数值留在游戏JSON中。
      final original = switch (source) {
        40 || 0 || 1 || 2 || 3 || 4 || 5 => 15,
        6 || 7 => 14,
        8 || 9 => 13,
        _ => null,
      };
      return !replay &&
              original != null &&
              definition?.combat == original &&
              saved == original + 3
          ? original
          : saved;
    }

    int salary(int saved, int source, int typeIndex) {
      // 主角续玩一律免薪；回放仍显示当时的工资，不退还历史支出。
      if (!replay && typeIndex == HeroType.protagonist.index) return 0;
      final definition = definitions[source];
      // 续玩旧档采用新月俸并取消本国免薪；回放保留历史数值，不追扣已结算工资。
      return !replay &&
              (d['payrollVersion'] as int? ?? 0) < 2 &&
              definition != null
          ? definition.salary
          : saved;
    }

    final health = [for (final h in d['health']) BattleHealth(h[0], hp: h[1])];
    final people = <CampaignHero>[
      for (final h in d['people'])
        CampaignHero._saved(
          id: h['id'],
          rosterOrder: h['order'],
          sourceId: h['source'],
          name: h['name'],
          type: HeroType.values[h['type']],
          appearance: HeroAppearance.values[h['appearance']],
          cityId: h['city'],
          countryId: h['country'],
          health: health[h['health']],
          combat: combat(h['combat'], h['source']),
          morale: h['morale'],
          politics: h['politics'],
          salary: salary(h['salary'], h['source'], h['type']),
          squad: [for (final id in h['squad']) health[id]],
        ).._salaryPaidMonth = h['paid'],
    ];
    final random = [for (final value in d['random']) StateRandom(value)];
    final c = CampaignState._(
      world,
      {
        for (final e in (d['cities'] as Map).entries)
          int.parse(e.key): CitySituation(
            ownerCountryId: e.value[0],
            defense: e.value[1],
            baseIncome: !replay && (d['cityIncomeVersion'] as int? ?? 1) < 2
                ? world
                          .setup
                          .cities[(world.id, int.parse(e.key))]
                          ?.baseIncome ??
                      GameConfig.cityBaseIncome
                : e.value[2],
            initialLevel: e.value[3],
            nativeCountryId: e.value[4],
          ).._level = e.value[5],
      },
      [for (final i in d['active']) people[i]],
      {
        for (final e in (d['gold'] as Map).entries)
          int.parse(e.key): e.value as int,
      },
      {for (final h in catalog) h.id: h},
      random[0],
      random[1],
      random[2],
      random[3],
      random[4],
      !replay && d['aiEnabled'] == true,
      d['countryConfigs'] == null
          ? world.setup.countries
          : Map.unmodifiable({
              for (final e in (d['countryConfigs'] as Map).entries)
                int.parse(e.key): CountryConfig(
                  initialGold: e.value[0],
                  monthlyBaseIncome:
                      !replay &&
                          (d['fixedIncomeVersion'] as int? ?? 0) < 2 &&
                          int.parse(e.key) != 0
                      ? world
                                .setup
                                .countries[int.parse(e.key)]
                                ?.monthlyBaseIncome ??
                            GameConfig.countryMonthlyIncome
                      : e.value[1],
                ),
            }),
    );
    CityDefinition? city(dynamic id) =>
        id == null ? null : world.cities.firstWhere((v) => v.id == id);
    for (final m in d['marches']) {
      final march =
          HeroMarch._saved(
              hero: people[m['hero']],
              departureCityId: m['departure'],
              position: _readPoint(m['position']),
              destination: _readPoint(m['destination']),
              direction: HeroDirection.values[m['direction']],
            )
            ..target = city(m['target'])
            ..walkDistance = _double(m['distance'])
            ..phase = MarchPhase.values[m['phase']]
            .._returningFromRetreat = m['returning']
            .._departurePending = m['pending']
            .._departureAt = _double(m['at'])
            .._trafficBlocked = m['blocked']
            .._arrivalWaitLogged = m['arrivalWaitLogged'] as bool? ?? false
            .._siegeWaiting = m['siegeWaiting'] as bool? ?? false;
      // 旧存档的断粮营地重新进入避让检查；旧粮草零头不再补扣。
      if (m['halted'] == true && !march.returningFromRetreat) {
        march._trafficBlocked = true;
      }
      march._walkAnimation.restoreTime(_double(m['animation']));
      march._outboundRoute.addAll((m['outbound'] as List).map(_readPoint));
      march._returnRoute.addAll((m['return'] as List).map(_readPoint));
      march._trafficRoute.addAll((m['traffic'] as List).map(_readPoint));
      march._provokedCountries.addAll((m['provoked'] as List).cast<int>());
      if (m['arrival'] != null) {
        march._siegeArrival = (
          cityId: m['arrival'][0] as int,
          order: m['arrival'][1] as int,
        );
      }
      // 旧版固定从城东排位会把少量候战者赶远，续玩时保留先后顺序并就近重排。
      if (m['siegeSlot'] != null &&
          (replay || d['siegeFormationVersion'] == 2)) {
        march._siegeSlot = (
          ring: m['siegeSlot'][0] as int,
          index: m['siegeSlot'][1] as int,
        );
      }
      c.marches[march.hero.id] = march;
    }
    for (final b in d['battles']) {
      final a = people[b['attacker']], defender = people[b['defender']];
      final battleData = _map(b['simulation']);
      if (!replay && b['settled'] != true) {
        // 续玩中的战斗与还原后的将领同步，复制子对象以免改写原快照和历史回放。
        battleData['attacker'] = {
          ..._map(battleData['attacker']),
          'attack': a.combat,
        };
        battleData['defender'] = {
          ..._map(battleData['defender']),
          'attack': defender.combat,
        };
      }
      final simulation = BattleSnapshots.restore(battleData, health);
      final WorldBattle battle;
      if (b.containsKey('city')) {
        final v =
            CityBattle._saved(
                city(b['city'])!,
                a,
                defender,
                simulation: simulation,
                initialCityLevel: b['initialLevel'],
                defendingCountryId: b['country'],
                seed: b['seed'],
                locationName: () => c.cityName(b['city']),
              )
              ..victories = b['victories']
              ..defenseLoss = b['loss']
              .._damageSettled = b['damageSettled']
              ..wave = b['wave']
              ..nextWaveIn = _double(b['nextWave']);
        c.battles[v.city.id] = v;
        battle = v;
      } else {
        final v = FieldBattle._saved(
          a,
          defender,
          simulation: simulation,
          id: b['field'],
          position: _readPoint(b['position']),
          terrain: FieldTerrain.values[b['terrain']],
          attackerWasCamped: b['camped'][0],
          defenderWasCamped: b['camped'][1],
        );
        c.fieldBattles[v.id] = v;
        battle = v;
      }
      battle.outcome = b['outcome'];
      battle._settled = b['settled'];
      battle._aiNoticedClashes = b['notice'][0];
      battle._aiNoticedTroops = b['notice'][1];
      final notice = b['notice'] as List;
      final offset = (d['stateRevision'] as int? ?? 1) >= 2 ? 2 : 3;
      battle._aiNoticedAttackerHp = _double(notice[offset]);
      battle._aiNoticedDefenderHp = _double(notice[offset + 1]);
      battle.events.addAll((b['events'] as List).cast<String>());
    }
    c._heroPool.addAll({
      for (final id in d['pool']) id as int: c._catalog[id]!,
    });
    for (final o in d['offers']) {
      c._recruitmentOffers[o[2]] = RecruitmentOffer(
        hero: c._catalog[o[0]]!,
        cityId: o[1],
        countryId: o[2],
        initialSalary: salary(o[3], o[0], o[2]),
        drawnMonth: o[4],
      );
    }
    c._retreatSeparations.addAll([
      for (final p in d['separations']) (p[0] as String, p[1] as String),
    ]);
    c._siegeArrivalSerial = d['arrivalSerial'];
    c._strategyTime = _double(d['strategyTime']);
    _intMap(
      c._countryHatred,
      d['hatred'],
      (v) => {
        for (final e in (v as Map).entries) int.parse(e.key): e.value as int,
      },
    );
    _intMap(
      c._warPlans,
      d['plans'],
      (v) => CountryWarPlan._()
        ..targetCityId = v[0]
        ..targetCountryId = v[1]
        ..offensiveCountryId = v[2]
        ..offensiveCityId = v[3]
        ..phase = CountryWarPhase.values[v[4]]
        ..requiredHeroes = v[5]
        ..requiredGold = v[6],
    );
    c._aiOrderVersions.addAll(Map<String, int>.from(d['orderVersions']));
    c._aiLifeVersions.addAll(Map<String, int>.from(d['lifeVersions']));
    c._aiKnownHeroes.addAll({for (final h in c.heroes) h.id: h});
    c._aiVelocity.addAll({
      for (final e in (d['velocity'] as Map).entries)
        e.key as String: _readPoint(e.value),
    });
    _intMap(c._aiRearDeadlines, d['rearDeadlines'], _double);
    _intMap(c._nextAiDeparture, d['nextDeparture'], _double);
    c._disbandAfterBattle.addAll((d['disband'] as List).cast<String>());
    c._lastTerritoryOwner.addAll(Map<String, int>.from(d['territoryOwner']));
    c._lastTerritoryRegion.addAll(
      Map<String, int>.from(d['territoryRegion'] ?? {}),
    );
    _intMap(
      c.countryTroops,
      d['reserve'],
      (v) => CountryTroops(reserveSoldiers: v),
    );
    _intMap(c._initialTroopCapacity, d['capacity'], (v) => v as int);
    _intMap(c._garrisonBills, d['garrisonBills'], _double);
    if (!replay && GameConfig.garrisonUpkeepFactor == 0) {
      c._garrisonBills.clear();
    }
    _intMap(
      c._settlements,
      d['settlements'],
      (v) => MonthlySettlement(
        year: v[0],
        month: v[1],
        harvest: v[2] == null ? null : Harvest.values[v[2]],
        cityCount: v[3],
        baseIncome: v[4],
        adjustment: v[5],
        salary: v[6],
        garrisonUpkeep: v[7],
        goldBefore: v[8],
        goldAfter: v[9],
        fixedIncome: v.length > 10 ? v[10] : 0,
        cityIncomes: v.length > 11
            ? [
                for (final city in v[11])
                  CityIncomeSettlement.fromJson(_map(city)),
              ]
            : const [],
      ),
    );
    c.settledMonths = d['time'][0];
    _intMap(
      c._cityRecruitmentMonths,
      d['cityRecruitmentMonths'] ?? {},
      (v) => v as int,
    );
    // 旧档中的待签约候选也已占用抽取月份的机会，放弃后不能再刷。
    for (final offer in c._recruitmentOffers.values) {
      c._cityRecruitmentMonths.update(
        offer.cityId,
        (month) => math.max(month, offer.drawnMonth),
        ifAbsent: () => offer.drawnMonth,
      );
    }
    _intMap(
      c._soldierRecruitmentMonths,
      d['soldierRecruitmentMonths'] ?? {},
      (v) => v as int,
    );
    if (replay) {
      for (final country in d['soldierRecruitmentWindows'] ?? const []) {
        c._soldierRecruitmentWindows[country] = SoldierRecruitmentWindow._(
          country,
          c.settledMonths,
        );
      }
    }
    _intMap(
      c._cityUpgradeMonths,
      d['cityUpgradeMonths'] ?? {},
      (v) => v as int,
    );
    c._monthSeconds = _double(d['time'][1]);
    c._simulationFraction = _double(d['time'][2]);
    c._battleSerial = d['time'][3];
    c._paused = d['paused'];
    c.hasDispatched = d['dispatched'];
    c._defeatReason = d['defeat'] == null
        ? null
        : CampaignDefeatReason.values[d['defeat']];
    c.lastEvent = d['message'];
    c.journal.addAll((d['journal'] as List).cast<String>());
    c._eventLog = CampaignEvents.restoreState(_map(d['eventLog']));
    if (c.aiEnabled) {
      final ai = c._ai = _AiCoordinator(c, aiWorkerFactory ?? createAiWorker);
      final a = d['ai'];
      if (a != null) {
        ai.tasks.addAll({
          for (final e in (a['tasks'] as Map).entries)
            e.key as String: ArmyTask.fromJson(_map(e.value)),
        });
        ai._taskOwners.addAll(Map<String, int>.from(a['owners']));
        ai._taskDecisions.addAll(Map<String, String>.from(a['decisions']));
        ai._taskNames.addAll(Map<String, String>.from(a['names']));
        _intMap(ai.idleCycles, a['idle'], (v) => v as int);
        _intMap(ai._seeds, a['seeds'], (v) => v as int);
        _intMap(ai._knownThreats, a['threats'], (v) => v as int);
        ai._changedTargetOwners.addAll(
          Map<String, int>.from(a['changedOwners']),
        );
        _intMap(
          ai._schedules,
          a['schedules'],
          (v) => CountryAiSchedule(GameConfig.nationalAi)..restoreState(v),
        );
      }
    }
    return c;
  }
}
