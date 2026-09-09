part of 'campaign.dart';

/// 国家共用武器库存，驻城时可购置与归还，出征后仅能使用随身武器。
extension CampaignWeapons on CampaignState {
  /// 全国仓库里的闲置武器数，不包含将领已经携带的武器。
  int weaponStockFor(int countryId, int weaponId) =>
      _weaponStock[countryId]?[weaponId] ?? 0;

  /// 达到原版城池数后解锁普通商店；事件武器只从既有库存取用。
  bool weaponUnlocked(int countryId, WeaponDefinition weapon) =>
      weapon.shopEnabled &&
      cities.values.where((city) => city.ownerCountryId == countryId).length >=
          weapon.minimumCities;

  /// 取用库存免费，否则按该武器配置价格购置。
  int weaponEquipCost(int countryId, int weaponId) =>
      weaponStockFor(countryId, weaponId) > 0
      ? 0
      : weaponCatalog.weapons[weaponId]?.price ?? 0;

  /// 驻城配装资格及资金检查，野外和交战时不能远程补充武器。
  String? weaponEquipBlockReason(
    CampaignHero hero,
    int weaponId, {
    int countryId = 0,
  }) {
    if (defeated || !heroes.contains(hero) || !hero.health.alive) {
      return '将领不可用';
    }
    if (hero.countryId != countryId ||
        cities[hero.cityId]?.ownerCountryId != countryId) {
      return '只能为本国驻城将领配装';
    }
    if (marches.containsKey(hero.id) || activeBattleForHero(hero.id) != null) {
      return '回城后才能补充武器';
    }
    if (hero._weaponIds.length >= weaponCatalog.carryLimit) {
      return '最多携带 ${weaponCatalog.carryLimit} 件';
    }
    final weapon = weaponCatalog.weapons[weaponId];
    if (weapon == null) return '武器不存在';
    if (weaponStockFor(countryId, weaponId) == 0 &&
        !weaponUnlocked(countryId, weapon)) {
      return weapon.shopEnabled ? '${weapon.minimumCities} 座城解锁' : '事件武器';
    }
    if (goldFor(countryId) < weaponEquipCost(countryId, weaponId)) {
      return '金币不足';
    }
    return null;
  }

  /// 取用一件闲置武器或付费购买，成功后立即装到指定将领身上。
  bool equipWeapon(CampaignHero hero, int weaponId, {int countryId = 0}) {
    if (weaponEquipBlockReason(hero, weaponId, countryId: countryId) != null) {
      return false;
    }
    final stock = _weaponStock.putIfAbsent(countryId, () => {});
    if ((stock[weaponId] ?? 0) > 0) {
      stock[weaponId] = stock[weaponId]! - 1;
    } else {
      _countryGold[countryId] =
          goldFor(countryId) - weaponCatalog.weapons[weaponId]!.price;
    }
    hero._weaponIds.add(weaponId);
    _record('${hero.name}携带${weaponCatalog.weapons[weaponId]!.name}');
    return true;
  }

  /// 驻城时归还指定槽位的武器到国家仓库，不折算金币。
  bool unequipWeapon(CampaignHero hero, int slot, {int countryId = 0}) {
    if (defeated ||
        !heroes.contains(hero) ||
        !hero.health.alive ||
        hero.countryId != countryId ||
        cities[hero.cityId]?.ownerCountryId != countryId ||
        marches.containsKey(hero.id) ||
        activeBattleForHero(hero.id) != null ||
        slot < 0 ||
        slot >= hero._weaponIds.length) {
      return false;
    }
    final id = hero._weaponIds.removeAt(slot);
    _weaponStock
        .putIfAbsent(countryId, () => {})
        .update(id, (n) => n + 1, ifAbsent: () => 1);
    _record('${hero.name}归还${weaponCatalog.weapons[id]!.name}');
    return true;
  }

  /// 仅当前参战的本国将领可以使用携带的武器，命中和演出共用后台时钟。
  bool canUseWeapon(CampaignHero hero, int slot, {int countryId = 0}) {
    final battle = activeBattleForHero(hero.id);
    return !defeated &&
        heroes.contains(hero) &&
        hero.countryId == countryId &&
        slot >= 0 &&
        slot < hero._weaponIds.length &&
        battle != null &&
        battle.simulation.canUseWeapon;
  }

  /// 锁定动作后立即消耗一件武器，失败指令不会扣库存。
  bool useWeapon(CampaignHero hero, int slot, {int countryId = 0}) {
    if (!canUseWeapon(hero, slot, countryId: countryId)) return false;
    final battle = activeBattleForHero(hero.id)!;
    final weapon = weaponCatalog.weapons[hero._weaponIds[slot]]!;
    final side = battle.attacker == hero
        ? BattleSide.attacker
        : BattleSide.defender;
    if (!battle.simulation.useWeapon(side, weapon)) return false;
    hero._weaponIds.removeAt(slot);
    battle.record('${hero.name}使用${weapon.name}');
    _record('${hero.name}使用${weapon.name}');
    return true;
  }

  void _returnWeapons(CampaignHero hero) {
    final stock = _weaponStock.putIfAbsent(hero.countryId, () => {});
    for (final id in hero._weaponIds) {
      stock.update(id, (n) => n + 1, ifAbsent: () => 1);
    }
    hero._weaponIds.clear();
  }
}
