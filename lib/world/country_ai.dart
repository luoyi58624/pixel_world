part of 'campaign.dart';

// 国家决策与地图共用一份战役状态和固定时钟，观战或打开面板不会暂停决策。
extension _CountryAutonomy on CampaignState {
  bool _runCountryDecisions() {
    if (defeated) return false;
    var changed = false;
    // 每轮打乱城池次序，避免共享英雄池总被编号较小的国家先抽空。
    final order =
        world.cities.where((city) => !cities[city.id]!.isPlayer).toList()
          ..shuffle(_aiRandom);
    for (final city in order) {
      final state = cities[city.id]!;
      final countryId = state.ownerCountryId;
      if (battles[city.id]?.isActive == true) continue;
      final pending = recruitmentOfferFor(countryId);
      if (pending != null) {
        // 热重载时兼容旧版本遗留的待签约结果，钱不够便释放锁定。
        if (signHero(pending, countryId: countryId) == null) {
          declineHero(pending, countryId: countryId);
        }
        changed = true;
      }
      if (recruitmentOfferFor(countryId) == null) {
        changed = _supplyAiCity(city.id, countryId) || changed;
        final offer = drawHero(city.id, countryId: countryId);
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
        if (recruitmentOfferFor(countryId) == null && governors.isNotEmpty) {
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
    final reserves = maxSoldierPurchase(cityId, countryId: countryId);
    return reserves > 0 && buySoldiers(cityId, reserves, countryId: countryId);
  }

  bool _sendAiArmies(CityDefinition source, int countryId) {
    var changed = false;
    final keep = math.max(0, configFor(countryId).garrisonHeroes);
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
      final targets = world.cities
          .where((city) => cities[city.id]!.ownerCountryId != countryId)
          .toList();
      if (targets.isEmpty) break;
      final hero = candidates.first;
      final target = targets[_aiRandom.nextInt(targets.length)];
      if (dispatch(hero, target, countryId: countryId) == null) break;
      _record(
        '${world.countryName(countryId)}国派出${hero.name}进攻${target.label}',
      );
      changed = true;
    }
    return changed;
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
