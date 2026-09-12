/// 辖区四周均为本国领土且没有实际敌军时属于安全后方。
bool safeRearArea({
  required int country,
  required Iterable<int?>? neighborOwners,
  required bool fighting,
  required bool enemyPresent,
}) =>
    !fighting &&
    !enemyPresent &&
    neighborOwners != null &&
    neighborOwners.every((owner) => owner == country);
