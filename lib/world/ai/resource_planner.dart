import 'dart:math' as math;

import 'budget.dart';
import 'combat_assessment.dart';
import 'observation.dart';
import 'operations.dart';
import 'protocol.dart';
import 'rules_data.dart';
import 'threats.dart';
import 'target_priority.dart';
import 'raid_assessment.dart';

/// 全国资源整理只在独立周期执行，预算包含在途部队粮草与月俸。
class ResourcePlanner {
  /// 复用公平观察、国库账本和静态属性评估。
  ResourcePlanner(
    this.request,
    this.rules,
    this.operations,
    this.assessor,
    this.reports,
  );

  /// 只读服务与同一时刻的全国威胁报告。
  final AiRequest request;
  final AiRules rules;
  final OperationPlanner operations;
  final CombatAssessor assessor;
  final Map<int, CityDefenseReport> reports;

  /// 先补现有兵力，再按缺口扩建和招将，最后为明确难攻目标购买武器。
  CountryPlan plan(AiLedger initial) {
    var ledger = initial;
    final view = request.observation;
    final groups = <AiCommandGroup>[];
    int? savingTarget;
    var requiredGold = 0, requiredHeroes = 1;
    bool affordable(AiLedger next) =>
        next.gold >=
        math.max(next.cash().reserve, rules.tuning.resourceCashBuffer);
    void accept(
      AiLedger next,
      List<AiAction> actions,
      String reason,
      AiCity city, {
      AiHero? hero,
    }) {
      ledger = next;
      groups.add(
        AiCommandGroup(
          reason: reason,
          actions: actions,
          dependencies: operations.dependencies([?hero], [city]),
          minimumGold: math.max(
            next.cash().reserve,
            rules.tuning.resourceCashBuffer,
          ),
        ),
      );
    }

    final cities = view.owned.toList()
      ..sort((a, b) {
        final danger = (reports[b.id]?.threatened == true ? 1 : 0).compareTo(
          reports[a.id]?.threatened == true ? 1 : 0,
        );
        return danger != 0 ? danger : a.id.compareTo(b.id);
      });
    final desired = math.min(
      ledger.capacity,
      cities.fold(
        0,
        (n, city) =>
            n + ledger.garrison(city.id).length * rules.integer('soldierLimit'),
      ),
    );
    if (cities.isNotEmpty && desired > ledger.reserves) {
      final next = ledger.copy();
      final budget = math.max(
        0,
        next.gold -
            math.max(next.cash().reserve, rules.tuning.resourceCashBuffer),
      );
      final count = math.min(
        desired - next.reserves,
        budget ~/ rules.integer('soldierCost'),
      );
      if (count > 0 && next.buySoldiers(count) && affordable(next)) {
        accept(
          next,
          [
            AiAction(
              AiActionKind.soldiers,
              city: cities.first.id,
              amount: count,
            ),
          ],
          '按全国现有守将和待出征将领补兵，保留粮草、月俸和流动资金',
          cities.first,
        );
      }
    }
    for (final city in cities) {
      if (groups.length >= rules.tuning.maxCommands - 2) break;
      final local = ledger.garrison(city.id);
      final governors = local.where((h) => h.canUpgrade).toList()
        ..sort((a, b) => b.politics.compareTo(a.politics));
      final needHero =
          view.cities.any((c) => c.country != view.country) &&
          ledger.occupancy(city.id) < math.max(1, city.requiredGarrison) + 1;
      if (governors.isNotEmpty &&
          city.initialBattleLevel == null &&
          (local.length > ledger.slots(city) ||
              needHero && local.length >= ledger.slots(city) ||
              reports[city.id]?.risk?.advantage ==
                  CombatAdvantage.unfavorable)) {
        final next = ledger.copy();
        if (next.upgrade(city, governors.first) && affordable(next)) {
          accept(
            next,
            [
              AiAction(
                AiActionKind.upgrade,
                city: city.id,
                hero: governors.first.id,
              ),
            ],
            '提高必要城防与迎战名额，保留已出征部队的后勤资金',
            city,
            hero: governors.first,
          );
        }
      }
      // 新等级需要真实落地后才能使用新增招募名额，避免旧快照提前承诺。
      if (needHero && ledger.occupancy(city.id) < city.safeSlots) {
        final next = ledger.copy();
        if (next.recruit(city) && affordable(next)) {
          accept(
            next,
            [AiAction(AiActionKind.recruit, city: city.id)],
            '补充留守和后续扩张所需将领，签约与月俸按最高费用预留',
            city,
          );
        }
      }
    }
    final spare = <AiHero>[];
    for (final city in cities) {
      if (reports[city.id]?.threatened == true) continue;
      final local = ledger.garrison(city.id);
      final free = local.where((h) => h.canDispatch).toList()
        ..sort(
          (a, b) => heroDeploymentValue(b).compareTo(heroDeploymentValue(a)),
        );
      spare.addAll(
        free.take(
          math.max(0, local.length - math.max(1, city.requiredGarrison)),
        ),
      );
    }
    spare.sort(
      (a, b) => heroDeploymentValue(b).compareTo(heroDeploymentValue(a)),
    );
    if (spare.isNotEmpty) {
      final hero = spare.first;
      final targets =
          view.cities.where((c) => c.country != view.country).toList()..sort(
            (a, b) => targetPriority(
              b,
              hero,
              view,
              rules,
              request.seed,
            ).compareTo(targetPriority(a, hero, view, rules, request.seed)),
          );
      var equipped = false;
      for (final target in targets.take(rules.tuning.maxTargets)) {
        for (final gear in operations.loadouts(hero, ledger)) {
          final readiness = assessRaid(
            hero,
            target,
            view,
            rules,
            assessor,
            gear,
          );
          if (readiness.teamSize == 0 || readiness.teamSize > spare.length) {
            continue;
          }
          // 只求整队报价，虚拟资金不进入真实采购或回复中的命令。
          var quote = ledger.copy()..gold = 1000000;
          final purchases = <AiAction>[];
          var ready = true;
          for (var i = 0; i < readiness.teamSize; i++) {
            final member = spare[i];
            final memberRisk = assessRaid(
              member,
              target,
              view,
              rules,
              assessor,
              gear,
            );
            if (memberRisk.teamSize == 0) {
              ready = false;
              break;
            }
            final route = operations.routes.to(
              member,
              target.center,
              view,
              target: target,
            );
            final protection = cities.fold(
              0,
              (n, c) =>
                  n +
                  math.min(
                        math.max(
                          0,
                          quote.garrison(c.id).length -
                              (c.id == member.city ? 1 : 0),
                        ),
                        math.max(1, c.requiredGarrison),
                      ) *
                      rules.integer('soldierLimit'),
            );
            final option = operations.send(
              quote,
              member,
              route,
              role: 'expedition',
              reason: '按共同攻防门槛核算整队武器与路费',
              target: target,
              gear: gear,
              protectSoldiers: math.min(
                protection,
                math.max(0, quote.capacity - rules.integer('soldierLimit')),
              ),
              queueIndex: i,
            );
            if (option == null) {
              ready = false;
              break;
            }
            quote = option.ledger;
            purchases.addAll(
              option.group.actions.where(
                (a) => a.kind == AiActionKind.buyWeapon,
              ),
            );
          }
          if (!ready) continue;
          final neededGold = 1000000 - quote.gold + quote.cash().reserve;
          if (ledger.gold < neededGold) {
            if (requiredGold == 0 || neededGold < requiredGold) {
              requiredGold = neededGold;
              requiredHeroes = readiness.teamSize;
              savingTarget = target.id;
            }
            continue;
          }
          final next = ledger.copy();
          for (final action in purchases) {
            if (!next.buyWeapon(action.amount)) {
              ready = false;
              break;
            }
          }
          if (!ready || !affordable(next)) continue;
          if (purchases.isNotEmpty) {
            accept(
              next,
              purchases,
              '按目标城防与守将配齐${readiness.teamSize}名进攻将领的武器，预留整队粮草',
              view.city(hero.city)!,
            );
          }
          equipped = true;
          requiredGold = 0;
          savingTarget = null;
          break;
        }
        if (equipped) break;
      }
    }
    return CountryPlan(
      phase: savingTarget == null ? 'preparing' : 'saving',
      targetCity: savingTarget,
      requiredGold: requiredGold,
      requiredHeroes: requiredHeroes,
      groups: groups,
      budgetLimited: assessor.work.limited,
      assessments: assessor.work.assessments,
      routeSteps: assessor.work.routeSteps,
      expansions: assessor.work.candidates,
      notes: groups.isEmpty ? ['本轮无必要且可支付的采购，保留国库'] : const [],
    );
  }
}
