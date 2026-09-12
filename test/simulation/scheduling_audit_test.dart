import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/simulation/scheduling_audit.dart';

import '../support/national_ai_fixture.dart';

void main() {
  test('持续行军无位移会保存异常现场，合法交战时间不算堵塞', () {
    final c = nationalScenario();
    addTearDown(c.dispose);
    final m = c.dispatch(
      c.garrisonAt(1).first,
      c.world.cities[2],
      countryId: 1,
    )!;
    final issues = <Map<String, Object?>>[];
    final audit = SchedulingAudit(onIssue: issues.add);
    audit.sample(c, 0);
    m.phase = MarchPhase.fighting;
    audit.sample(c, 120);
    m.phase = MarchPhase.marching;
    audit.sample(c, 121);
    expect(issues, isEmpty);
    audit.sample(c, 182);
    expect(issues.single['kind'], 'marchBlocked');
    expect(issues.single['hero'], m.hero.id);
    audit.sample(c, 200);
    expect(issues.length, 1);
  });

  test('实际位移会重置堵塞计时，健康行军不能误报', () {
    final c = nationalScenario();
    addTearDown(c.dispose);
    final m = c.dispatch(
      c.garrisonAt(1).first,
      c.world.cities[2],
      countryId: 1,
    )!;
    final audit = SchedulingAudit();
    for (var t = 0; t < 180; t++) {
      m.tick(c.world, 1 / 60);
      audit.sample(c, t.toDouble());
    }
    expect(audit.toJson()['counts'], isEmpty);
  });
}
