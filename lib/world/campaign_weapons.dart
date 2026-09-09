part of 'campaign.dart';

/// 国家仓库与随军武器分开管理，出征确认时取用，回城统一归还。
extension CampaignWeapons on CampaignState {
  /// 国家库存按类型合并的只读快照，数量为零的类型不占展示格。
  Map<int, int> weaponInventoryFor(int countryId) => Map.unmodifiable({
    for (final entry in (_weaponStock[countryId] ?? <int, int>{}).entries)
      if (entry.value > 0) entry.key: entry.value,
  });

  /// 全国仓库里的闲置武器数，不包含将领已经携带的武器。
  int weaponStockFor(int countryId, int weaponId) =>
      _weaponStock[countryId]?[weaponId] ?? 0;

  /// 国家仓库的总件数，无容量上限，不计英雄随身武器。
  int weaponStorageUsed(int countryId) =>
      _weaponStock[countryId]?.values.fold<int>(0, (a, b) => a + b) ?? 0;

  /// 达到原版城池数后解锁普通商店；事件武器只从既有库存取用。
  bool weaponUnlocked(int countryId, WeaponDefinition weapon) =>
      weapon.shopEnabled &&
      cities.values.where((city) => city.ownerCountryId == countryId).length >=
          weapon.minimumCities;

  /// 购买检查国家归属、解锁和金币，不需要选择英雄。
  String? weaponPurchaseBlockReason(int weaponId, {int countryId = 0}) {
    if (defeated || !cities.values.any((c) => c.ownerCountryId == countryId)) {
      return '国家不可用';
    }
    final weapon = weaponCatalog.weapons[weaponId];
    if (weapon == null) return '武器不存在';
    if (!weaponUnlocked(countryId, weapon)) {
      return weapon.shopEnabled ? '${weapon.minimumCities} 座城解锁' : '事件武器';
    }
    if (goldFor(countryId) < weapon.price) {
      return '金币不足';
    }
    return null;
  }

  /// 购买一件武器计入国家同类库存，不自动装备给英雄。
  bool buyWeapon(int weaponId, {int countryId = 0}) {
    if (weaponPurchaseBlockReason(weaponId, countryId: countryId) != null) {
      return false;
    }
    final stock = _weaponStock.putIfAbsent(countryId, () => {});
    stock.update(weaponId, (n) => n + 1, ifAbsent: () => 1);
    _countryGold[countryId] =
        goldFor(countryId) - weaponCatalog.weapons[weaponId]!.price;
    _record('购入${weaponCatalog.weapons[weaponId]!.name}');
    return true;
  }

  // 键是英雄槽位、值是武器编号；同类允许多选，但不能透支实际库存。
  bool _validWeaponSelection(CampaignHero hero, Map<int, int> selection) {
    if (selection.length > weaponCatalog.carryLimit) return false;
    final stock = Map<int, int>.of(_weaponStock[hero.countryId] ?? {});
    var length = hero._weaponIds.length;
    for (final slot in selection.keys.toList()..sort()) {
      final source = selection[slot]!;
      if (slot < 0 ||
          slot >= weaponCatalog.carryLimit ||
          slot > length ||
          (stock[source] ?? 0) <= 0) {
        return false;
      }
      stock[source] = stock[source]! - 1;
      if (slot == length) length++;
    }
    return true;
  }

  void _loadDispatchWeapons(CampaignHero hero, Map<int, int> selection) {
    if (selection.isEmpty) return;
    final stock = _weaponStock[hero.countryId]!;
    for (final id in selection.values) {
      stock[id] = stock[id]! - 1;
    }
    for (final slot in selection.keys.toList()..sort()) {
      final weapon = selection[slot]!;
      if (slot < hero._weaponIds.length) {
        stock.update(hero._weaponIds[slot], (n) => n + 1, ifAbsent: () => 1);
        hero._weaponIds[slot] = weapon;
      } else {
        hero._weaponIds.add(weapon);
      }
    }
  }

  /// 仅当前参战的本国将领可以使用携带的武器，命中和演出共用后台时钟。
  bool canUseWeapon(CampaignHero hero, int slot, {int countryId = 0}) {
    final battle = activeBattleForHero(hero.id);
    if (battle == null || battle is CityBattle && battle.defender == hero) {
      return false;
    }
    return !defeated &&
        heroes.contains(hero) &&
        hero.countryId == countryId &&
        slot >= 0 &&
        slot < hero._weaponIds.length &&
        battle.simulation.canUseWeaponFor(
          battle.attacker == hero ? BattleSide.attacker : BattleSide.defender,
        );
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
