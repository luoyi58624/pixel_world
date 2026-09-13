part of '../campaign.dart';

extension _HeroPayroll on CampaignState {
  ({int due, int paid, int departed, int income}) _payHeroSalaries(
    int country,
    Set<WorldBattle> interruptedBattles,
  ) {
    if (!GameConfig.chargeHeroSalary) {
      return (due: 0, paid: 0, departed: 0, income: 0);
    }
    final roster =
        heroes
            .where(
              (hero) =>
                  hero.countryId == country &&
                  hero.health.alive &&
                  hero._salaryPaidMonth != settledMonths,
            )
            .toList()
          ..sort((a, b) {
            final combat = b.combat.compareTo(a.combat);
            if (combat != 0) return combat;
            final health = b.maxHp.compareTo(a.maxHp);
            if (health != 0) return health;
            final morale = b.morale.compareTo(a.morale);
            return morale != 0 ? morale : CampaignHero.compareRosterOrder(a, b);
          });
    var due = 0, paid = 0, departed = 0, income = 0;
    for (final hero in roster) {
      final salary = hero.type == HeroType.protagonist ? 0 : hero.salary;
      due += salary;
      // 零月俸角色不因旧债或欠收而离职；有月俸者必须能一次付清。
      if (salary == 0 || goldFor(country) >= salary) {
        _countryGold[country] = goldFor(country) - salary;
        hero._salaryPaidMonth = settledMonths;
        paid += salary;
      } else {
        income += _departUnpaidHero(hero, interruptedBattles);
        departed++;
      }
    }
    return (due: due, paid: paid, departed: departed, income: income);
  }

  int _departUnpaidHero(
    CampaignHero hero,
    Set<WorldBattle> interruptedBattles,
  ) {
    final country = hero.countryId;
    final before = _eventResources(country);
    final battle = activeBattleForHero(hero.id);
    if (battle != null) interruptedBattles.add(battle);
    final task = _ai?.tasks.remove(hero.id);
    if (task != null) _ai!._taskEnded(task, hero, '月俸不足，将领离职');
    // 与主动解雇一致：驻城兵归库，野外随军离队，不生成战败奖励。
    if (!marches.containsKey(hero.id)) _returnSoldiers(hero);
    marches.remove(hero.id);
    heroes.remove(hero);
    hero.hp = 0;
    _clearSquad(hero);
    _trimCountryTroops(country);
    _recycleHero(hero, dismissed: true);
    _countryGold[country] = goldFor(country) + hero.politics;
    _ai?.urgent(country, reason: '将领欠薪离职，重新分配兵力');
    _record(
      '${hero.name}因付不起 ${hero.salary} 金币月俸离职，内政收入 ${hero.politics} 金币',
      kind: GameEventKind.heroDeparted,
      countryId: country,
      hero: hero,
      cityId: hero.cityId,
      source: GameEventSource.system,
      reason: '国库不足以支付本将领月俸',
      data: {
        'salary': hero.salary,
        'reward': hero.politics,
        'before': before,
        'after': _eventResources(country),
        'settledIn': 'monthSettled',
      },
    );
    return hero.politics;
  }

  void _resolvePayrollBattles(Set<WorldBattle> battles) {
    for (final battle in battles) {
      battle.simulation.stop();
      battle._settled = true;
      if (battle is CityBattle && battle.attacker.health.alive) {
        // 守将离职不算击败守将，保留真实战果，下个逻辑帧开始接替或占领。
        battle.nextWaveIn = BattleSimulation.fixedStep;
        battle.record('${battle.defender.name}欠薪离职，等待下一名守将');
        _battleEvent(
          GameEventKind.battleWaveEnded,
          battle,
          '${battle.defender.name}欠薪离职，攻城继续',
          data: {'reason': 'unpaidSalary', 'victories': battle.victories},
        );
      } else {
        battle.outcome = '将领欠薪离职，本场交战结束';
        if (battle is CityBattle) {
          battle.nextWaveIn = 0;
          _releaseDefender(battle);
          _settleSiegeDamage(battle);
        } else if (battle is FieldBattle) {
          _resumeFieldArmy(
            battle.attacker,
            wasCamped: battle.attackerWasCamped,
          );
          _resumeFieldArmy(
            battle.defender,
            wasCamped: battle.defenderWasCamped,
          );
        }
        battle.record(battle.outcome!);
        _battleEvent(
          GameEventKind.battleEnded,
          battle,
          battle.outcome!,
          data: {'reason': 'unpaidSalary'},
        );
      }
      _disbandFinishedArmies(battle);
    }
  }
}
