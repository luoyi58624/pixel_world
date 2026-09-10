part of '../campaign.dart';

/// 国家之间的受袭记忆，玩家与电脑使用同一份有方向的仇恨记录。
extension CountryRelations on CampaignState {
  /// victim 对 aggressor 的仇恨，不会因为对方受袭而自动对称增加。
  int hatredFor(int victim, int aggressor) =>
      _countryHatred[victim]?[aggressor] ?? 0;

  /// 当前国家军力估计，包含城防、所有存活将领及全国储备与随军兵员。
  double strengthFor(int countryId) => _countryStrengths()[countryId] ?? 0;

  /// 相同路程与城防下的国别目标权重，用于查看军力与仇恨如何影响决策。
  double targetPreferenceFor(int countryId, int targetCountry) =>
      _countryTargetWeight(countryId, targetCountry, _countryStrengths());

  Map<int, double> _countryStrengths() {
    final result = <int, double>{};
    for (final city in cities.values) {
      result.update(
        city.ownerCountryId,
        (n) => n + city.level * 8,
        ifAbsent: () => city.level * 8.0,
      );
    }
    for (final hero in heroes.where((h) => h.health.alive)) {
      final value =
          hero.combat +
          hero.hp / 10 +
          hero.soldiers * 2 +
          (hero.type == HeroType.normal ? 0 : 12);
      result.update(hero.countryId, (n) => n + value, ifAbsent: () => value);
    }
    for (final country in result.keys.toList()) {
      result[country] = result[country]! + reserveSoldiersFor(country) * 2;
    }
    return result;
  }

  double _countryTargetWeight(
    int countryId,
    int targetCountry,
    Map<int, double> strengths,
  ) =>
      (1 +
          hatredFor(countryId, targetCountry) *
              GameConfig.countryHatredWeightPerPoint) /
      math.pow(
        1 + (strengths[targetCountry] ?? 0) / GameConfig.countryAiStrengthScale,
        GameConfig.countryAiWeaknessPower,
      );

  void _recordAggression(int victim, int aggressor) {
    if (victim == aggressor) return;
    final before = hatredFor(victim, aggressor);
    final next = math.min(
      GameConfig.countryHatredMaximum,
      before + GameConfig.countryHatredPerAttack,
    );
    if (next == before) {
      _emitEvent(
        GameEventKind.hatredChanged,
        '再次遭到${world.countryName(aggressor)}国侵袭，仇恨已达上限 $before',
        countryId: victim,
        targetCountryId: aggressor,
        source: GameEventSource.system,
        phase: GameEventPhase.observed,
        data: {'before': before, 'after': next},
      );
      return;
    }
    _countryHatred.putIfAbsent(victim, () => {})[aggressor] = next;
    _record(
      '${world.countryName(victim)}国受袭，对${world.countryName(aggressor)}国仇恨升至 $next',
      kind: GameEventKind.hatredChanged,
      countryId: victim,
      targetCountryId: aggressor,
      source: GameEventSource.system,
      reason: '遭受实际进攻，这笔账记在该国名下',
      data: {'before': before, 'after': next},
    );
  }

  // 同一支出征军对同一国家只记一次，排队、换守将及逐帧更新不会重复累积。
  void _noticeSiege(HeroMarch march) {
    final city = march.target;
    if (city == null || march.returningFromRetreat) return;
    final victim = cities[city.id]!.ownerCountryId;
    if (victim != march.hero.countryId &&
        march._provokedCountries.add(victim)) {
      _recordAggression(victim, march.hero.countryId);
    }
  }
}
