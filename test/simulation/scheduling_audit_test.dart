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
    expect(issues.where((e) => e['kind'] == 'marchBlocked'), isEmpty);
    audit.sample(c, 182);
    expect(
      issues.where((e) => e['kind'] == 'marchBlocked').single['hero'],
      m.hero.id,
    );
    audit.sample(c, 200);
    expect(issues.where((e) => e['kind'] == 'marchBlocked').length, 1);
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
    expect(
      (audit.toJson()['counts'] as Map).containsKey('marchBlocked'),
      isFalse,
    );
  });

  test('有钱且补兵窗口开放却一直不采购，必须报告实际等待', () {
    final c = nationalScenario(reserves: 0);
    addTearDown(c.dispose);
    final audit = SchedulingAudit();
    audit.sample(c, 0);
    audit.sample(c, c.aiRulesForTesting().tuning.resourceIntervalSeconds + 13);
    expect(
      (audit.toJson()['counts'] as Map)['suppliesNotPurchased'],
      greaterThan(0),
    );
  });

  test('正常十金币周转不报漏补兵，但实际敌军入境后必须动用余额', () {
    final c = nationalScenario(gold: 10, reserves: 0);
    addTearDown(c.dispose);
    final audit = SchedulingAudit();
    Iterable<dynamic> missingPurchases() => (audit.toJson()['issues'] as List)
        .where((e) => e['kind'] == 'suppliesNotPurchased' && e['country'] == 1);
    audit.sample(c, 0);
    audit.sample(c, 30);
    expect(missingPurchases(), isEmpty);
    approaching(c, distance: 100);
    audit.sample(c, 31);
    audit.sample(c, 61);
    expect(missingPurchases(), hasLength(1));
  });

  test('无来敌的前线有多名健康将领和足够兵员却不动员，必须报告囤积', () {
    final c = nationalScenario();
    addTearDown(c.dispose);
    final audit = SchedulingAudit();
    audit.sample(c, 0);
    audit.sample(c, 91);
    expect((audit.toJson()['counts'] as Map)['frontNotMobilized'], 1);
  });
}
