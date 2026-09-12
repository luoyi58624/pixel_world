import 'dart:convert';
import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/observation.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/world_map/presentation/world_controller.dart';

import '../../support/national_ai_fixture.dart';

final _heroes = decodeRomHeroes(
  File('assets/data/heroes.json5').readAsStringSync(),
);

WorldDefinition _world() {
  final fixture = nationalScenario(
    ai: false,
    gold: 10000,
    friendly: true,
    friendlyLevel: 1,
    friendHeroes: [4],
    recruitment: true,
  );
  final world = fixture.world;
  fixture.dispose();
  return world;
}

CampaignState _game({ManualAiWorker? worker}) {
  final c = CampaignState.fromRom(
    _world(),
    _heroes,
    aiEnabled: worker != null,
    aiWorkerFactory: worker == null ? null : () => worker,
  );
  c.countryTroops[0] = CountryTroops();
  c.countryTroops[1] = CountryTroops();
  addTearDown(c.dispose);
  return c;
}

AiLedger _ledger(CampaignState c) {
  final view = AiObservation.fromJson(c.aiObservationFor(1).toJson());
  final rules = c.aiRulesForTesting();
  return AiLedger(
    view,
    rules,
    AiRoutes(c.aiMapForTesting(), rules, AiWorkBudget(rules.tuning)),
  );
}

WorldController _controller() {
  final c = WorldController([_world()], heroCatalog: _heroes, aiEnabled: false);
  c.campaign.countryTroops[0] = CountryTroops();
  c.campaign.cities[1]!.ownerCountryId = 0;
  addTearDown(c.dispose);
  return c;
}

void main() {
  test('同一窗口可以分批补兵，关闭后全国家的其他城也不能再次补兵', () {
    final c = _game();
    final window = c.beginSoldierRecruitment(countryId: 1)!;
    final gold = c.goldFor(1);
    expect(c.buySoldiers(1, 3, countryId: 1, window: window), isTrue);
    expect(c.buySoldiers(1, 4, countryId: 1, window: window), isTrue);
    expect(c.reserveSoldiersFor(1), 7);
    expect(c.goldFor(1), gold - 7);
    c.endSoldierRecruitment(window);
    expect(c.beginSoldierRecruitment(countryId: 1), isNull);
    expect(c.buySoldiers(3, 1, countryId: 1), isFalse);
    expect(c.buySoldiers(1, 1, countryId: 1, window: window), isFalse);
    expect(c.reserveSoldiersFor(1), 7);
  });

  test('未成功购买就关闭不扣机会，伪用其他国家的窗口不能补兵', () {
    final c = _game();
    final window = c.beginSoldierRecruitment(countryId: 1)!;
    expect(c.buySoldiers(1, 0, countryId: 1, window: window), isFalse);
    expect(c.buySoldiers(0, 1, window: window), isFalse);
    c.endSoldierRecruitment(window);
    expect(c.beginSoldierRecruitment(countryId: 1), isNotNull);
    expect(c.buySoldiers(0, 1), isTrue);
  });

  test('一次性调用也占用本国月度机会，各国互不影响', () {
    final c = _game();
    expect(c.buySoldiers(0, 2), isTrue);
    expect(c.buySoldiers(0, 2), isFalse);
    expect(c.buySoldiers(1, 2, countryId: 1), isTrue);
    expect(c.buySoldiers(3, 2, countryId: 1), isFalse);
  });

  test('实际跨月含跨年恢复机会，上一月窗口失效', () {
    final c = _game()..settledMonths = 11;
    final window = c.beginSoldierRecruitment(countryId: 1)!;
    c.buySoldiers(1, 2, countryId: 1, window: window);
    c.advance(60);
    expect(c.year, 2);
    expect(c.month, 1);
    expect(c.isSoldierRecruitmentOpen(window), isFalse);
    final next = c.beginSoldierRecruitment(countryId: 1)!;
    expect(c.buySoldiers(3, 2, countryId: 1, window: next), isTrue);
    expect(c.buySoldiers(1, 1, countryId: 1, window: window), isFalse);
  });

  test('存档保留全国已用月份，恢复不能复用旧窗口，旧档缺字段可读取', () {
    final c = _game();
    final window = c.beginSoldierRecruitment(countryId: 1)!;
    c.buySoldiers(1, 2, countryId: 1, window: window);
    final saved = jsonDecode(jsonEncode(c.saveState())) as Map<String, dynamic>;
    final restored = CampaignSnapshots.restore(saved, c.world, _heroes);
    addTearDown(restored.dispose);
    expect(restored.beginSoldierRecruitment(countryId: 1), isNull);
    expect(restored.buySoldiers(1, 1, countryId: 1, window: window), isFalse);
    saved.remove('soldierRecruitmentMonths');
    final legacy = CampaignSnapshots.restore(saved, c.world, _heroes);
    addTearDown(legacy.dispose);
    expect(legacy.beginSoldierRecruitment(countryId: 1), isNotNull);
  });

  test('AI 观察及复制账本读取本国月度限制，不再反复规划补兵', () {
    final c = _game();
    final initial = _ledger(c);
    expect(initial.buySoldiers(2), isTrue);
    expect(initial.buySoldiers(2), isTrue, reason: '同一份决策批内可连续补充');
    c.buySoldiers(1, 2, countryId: 1);
    final next = _ledger(c);
    expect(next.view.nation.soldierRecruitmentAllowed, isFalse);
    expect(next.affordableSoldiers, 0);
    expect(next.copy().buySoldiers(2), isFalse);
  });

  test('AI 一次回复内多组补兵共用机会，后续回复不能再次补兵', () {
    final worker = ManualAiWorker();
    final c = _game(worker: worker);
    AiRequest requestAfter(int previous) {
      for (var i = 0; i < 120; i++) {
        c.advance(1 / 60);
        final request = worker.requests
            .where((r) => r.country == 1 && r.id > previous)
            .firstOrNull;
        if (request != null) return request;
      }
      throw StateError('未收到后续决策');
    }

    final first = requestAfter(-1);
    worker.replies.add(
      AiReply.forRequest(
        first,
        CountryPlan(
          groups: [
            AiCommandGroup(
              reason: '本次补兵第一批',
              actions: [AiAction(AiActionKind.soldiers, city: 1, amount: 2)],
            ),
            AiCommandGroup(
              reason: '本次补兵第二批',
              actions: [AiAction(AiActionKind.soldiers, city: 3, amount: 3)],
            ),
          ],
        ),
      ),
    );
    final next = requestAfter(first.id);
    expect(c.reserveSoldiersFor(1), 5);
    worker.replies.add(
      AiReply.forRequest(
        next,
        CountryPlan(
          groups: [
            AiCommandGroup(
              reason: '再次补兵应被拒绝',
              actions: [AiAction(AiActionKind.soldiers, city: 3, amount: 1)],
            ),
          ],
        ),
      ),
    );
    c.advance(1 / 60);
    expect(c.reserveSoldiersFor(1), 5);
    expect(c.aiDiagnostics.rejected, greaterThan(0));
  });

  test('玩家同一面板连续补兵，关闭或切换友城后本月锁定', () {
    for (final close in [true, false]) {
      final c = _controller();
      final home = c.world.cities.first;
      c.openCity(home);
      c.closeCity();
      c.openCity(home);
      expect(c.soldierPurchaseQuantity, greaterThan(0), reason: '只查看不消耗机会');
      c.buyCitySoldiers();
      c.buyCitySoldiers();
      expect(c.campaign.reserveSoldiersFor(0), 20);
      if (close) {
        c.closeCity();
        c.openCity(home);
      } else {
        c.openCity(c.world.cities.firstWhere((city) => city.id == 1));
      }
      expect(c.soldierPurchaseQuantity, 0);
      expect(c.soldierRecruitmentHint, contains('本月'));
      c.buyCitySoldiers();
      expect(c.campaign.reserveSoldiersFor(0), 20);
      c.campaign.advance(60);
      expect(c.soldierPurchaseQuantity, greaterThan(0));
    }
  });

  test('每级城防增加4名容量，不赠兵也不刷新本月补兵次数', () {
    final c = _game();
    final before = c.reserveCapacityFor(1);
    c.buySoldiers(1, 1, countryId: 1);
    expect(c.upgradeCity(1, hero: c.garrisonAt(1).first, countryId: 1), isTrue);
    expect(c.reserveCapacityFor(1), before + 4);
    expect(c.reserveSoldiersFor(1), 1);
    expect(c.beginSoldierRecruitment(countryId: 1), isNull);
  });

  test('回放还原同窗续补状态，正常读档不能重新获得本月补兵权限', () {
    final original = _controller();
    original.openCity(original.world.cities.first);
    original.buyCitySoldiers();
    expect(original.soldierPurchaseQuantity, greaterThan(0));
    final replay = _controller();
    replay.restoreState(original.saveState(replay: true), replay: true);
    expect(replay.soldierPurchaseQuantity, original.soldierPurchaseQuantity);
    final resumed = _controller();
    resumed.restoreState(original.saveState());
    expect(resumed.soldierPurchaseQuantity, 0);
  });

  test('英雄抽取即扣本城机会，放弃不退；另一个城仍能招募', () {
    final c = _game();
    final offer = c.drawHero(0)!;
    expect(c.remainingHeroDraws(0), 0);
    expect(c.declineHero(offer), isTrue);
    expect(c.drawHero(0), isNull);
    c.cities[3]!.ownerCountryId = 0;
    final next = c.drawHero(3)!;
    expect(c.signHero(next), isNotNull);
    expect(c.drawHero(3), isNull);
  });

  test('英雄关闭面板不能重抽，未签约的旧档候选也占用抽取次数', () {
    final controller = _controller();
    controller.openCity(controller.world.cities.first);
    controller.drawCityHero();
    expect(controller.campaign.recruitmentOffer, isNotNull);
    controller.closeCity();
    controller.openCity(controller.world.cities.first);
    controller.drawCityHero();
    expect(controller.campaign.recruitmentOffer, isNull);
    final c = _game();
    c.drawHero(0);
    final saved = c.saveState()..remove('cityRecruitmentMonths');
    final restored = CampaignSnapshots.restore(saved, c.world, _heroes);
    addTearDown(restored.dispose);
    expect(restored.canSignHero(restored.recruitmentOffer!), isTrue);
    restored.declineHero(restored.recruitmentOffer!);
    expect(restored.drawHero(0), isNull);
  });
}
