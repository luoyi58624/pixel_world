import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/rear_safety.dart';

void main() {
  test('相邻辖区全归本国时就是后方，不使用敌城直线距离', () {
    expect(
      safeRearArea(
        country: 2,
        neighborOwners: [2, 2, 2],
        fighting: false,
        enemyPresent: false,
      ),
      isTrue,
    );
    expect(
      safeRearArea(
        country: 2,
        neighborOwners: [2, 0, 2],
        fighting: false,
        enemyPresent: false,
      ),
      isFalse,
    );
    expect(
      safeRearArea(
        country: 2,
        neighborOwners: null,
        fighting: false,
        enemyPresent: false,
      ),
      isFalse,
    );
  });
  test('后方实际出现入侵或正在交战时立即恢复防守', () {
    expect(
      safeRearArea(
        country: 2,
        neighborOwners: [2, 2],
        fighting: false,
        enemyPresent: true,
      ),
      isFalse,
    );
    expect(
      safeRearArea(
        country: 2,
        neighborOwners: [2, 2],
        fighting: true,
        enemyPresent: false,
      ),
      isFalse,
    );
  });
}
