part of 'campaign.dart';

// 在外时间与地图、战斗共用固定时钟，驻城免费，月俸仍单独结算。
extension _FieldSupplies on CampaignState {
  bool _advanceSupplies(double dt) {
    var changed = _haltUnfundedArmies();
    final active = marches.values.where((march) => march.hero.health.alive);
    for (final march in active) {
      if (goldFor(march.hero.countryId) == 0) continue;
      final rate = march.phase == MarchPhase.camped
          ? GameConfig.campSupplyRate
          : 1.0;
      march.hero._supplyDue += dt * rate / GameConfig.fieldSupplySecondsPerGold;
    }
    // 先为所有部队计时再扣款，最后一枚金币不会让同国后遍历的部队少计时间。
    for (final march in active) {
      final hero = march.hero;
      final due = (hero._supplyDue + 1e-9).floor();
      final paid = math.min(due, goldFor(hero.countryId));
      if (paid <= 0) continue;
      hero._supplyDue = math.max(0, hero._supplyDue - paid);
      _countryGold[hero.countryId] = goldFor(hero.countryId) - paid;
      changed = true;
    }
    return _haltUnfundedArmies() || changed;
  }

  bool _haltUnfundedArmies() {
    var changed = false;
    for (final march in marches.values) {
      if (goldFor(march.hero.countryId) > 0) continue;
      if (!march.supplyHalted) {
        march._supplyHalted = true;
        changed = true;
      }
      if (march.phase == MarchPhase.fighting ||
          march.phase == MarchPhase.dueling) {
        // 不打断当前拼杀与收尾动画，结算后再停营，不能开启下一场。
        final battle = battles[march.target?.id];
        if (battle?.attacker == march.hero && battle!.nextWaveIn > 0) {
          _endBattle(march, '${march.hero.name}粮草耗尽，停止进攻');
          _campForSupply(march);
          changed = true;
        }
      } else if (march.phase != MarchPhase.camped) {
        _campForSupply(march);
        changed = true;
      }
    }
    return changed;
  }

  void _campForSupply(HeroMarch march) {
    march.camp();
    march._supplyHalted = true;
    _record('${march.hero.name}粮草耗尽，原地扎营');
  }
}
