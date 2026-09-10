import 'geometry.dart';

/// 用最快行军的距离下界识别安全后方，规划与出发复查共用，不能把路线计算失败当安全。
bool safeRearArea({
  required int ownedCities,
  required bool fighting,
  required AiPoint center,
  required double radius,
  required double fastestSpeed,
  required double threatSeconds,
  required Iterable<(AiPoint, double)> enemyCities,
  required Iterable<(AiPoint, bool)> enemyArmies,
}) {
  if (ownedCities < 3 || fighting) return false;
  // 额外距离覆盖观察与出发延迟；不依赖敌方隐藏目的地，也不假定地形会替我阻敌。
  final warningDistance = fastestSpeed * threatSeconds + 80 + radius;
  return enemyCities.every(
        (enemy) => center.distance(enemy.$1) > warningDistance + enemy.$2,
      ) &&
      enemyArmies.every(
        (enemy) => !enemy.$2 && center.distance(enemy.$1) > warningDistance,
      );
}
