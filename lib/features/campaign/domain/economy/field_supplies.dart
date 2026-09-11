part of '../campaign.dart';

// 野外粮草持续计费，行军和扎营均允许透支，驻城仍只收月俸。
extension _FieldSupplies on CampaignState {
  bool _advanceSupplies(double dt) {
    var changed = false;
    final active = marches.values.where(
      (march) => march.hero.health.alive && !march.waitingForDeparture,
    );
    for (final march in active) {
      // 兼容曾因旧版断粮停营的状态，资金不再是继续行军的硬门槛。
      if (march.supplyHalted) {
        march._supplyHalted = false;
        if (!march.returningFromRetreat) march._trafficBlocked = true;
        changed = true;
      }
      final rate = march.phase == MarchPhase.camped
          ? GameConfig.campSupplyRate
          : 1.0;
      march.hero._supplyDue += dt * rate / GameConfig.fieldSupplySecondsPerGold;
    }
    // 先给所有部队计时，再逐笔扣除全额费用；不能因遍历顺序免除后续部队的军费。
    for (final march in active) {
      final hero = march.hero;
      final due = (hero._supplyDue + 1e-9).floor();
      if (due <= 0) continue;
      final before = goldFor(hero.countryId);
      hero._supplyDue = math.max(0, hero._supplyDue - due);
      _countryGold[hero.countryId] = before - due;
      _emitEvent(
        GameEventKind.supplyPaid,
        '${hero.name}消耗 $due 金币粮草',
        hero: hero,
        source: GameEventSource.system,
        data: {
          'cost': due,
          'goldBefore': before,
          'goldAfter': goldFor(hero.countryId),
          'phase': march.phase.name,
        },
      );
      changed = true;
    }
    return changed;
  }
}
