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
import 'offensive_focus.dart';
import 'coalition_policy.dart';

/// 全国统一安排采购，常规保留周转金，受袭优先使用现有现金。
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

  /// 日常依次补兵、补守将与进攻将、余钱升级；紧急防御可优先升级。
  CountryPlan plan(AiLedger initial) {
    var ledger = initial;
    final view = request.observation;
    final protectProtagonist = reports.values.any((r) => r.protagonistInDanger);
    final groups = <AiCommandGroup>[];
    final routineUpgrades = <(AiCity, AiHero)>[];
    var recruitmentPending = false, defenseRecruitmentPending = false;
    int? savingTarget, preparedTarget;
    var requiredGold = 0, requiredHeroes = 1;
    final focusAtStart = OffensiveFocus(
      view,
      initial,
      rules,
      targetCountry: request.offensiveCountry,
      targetCity: request.offensiveCity,
    );
    final leaders =
        view.heroes
            .where((h) => h.country == view.country && h.hp > 0 && !h.marked)
            .toList()
          ..sort(
            (a, b) => heroDeploymentValue(b).compareTo(heroDeploymentValue(a)),
          );
    final objectives = view.cities
        .where(
          (c) =>
              c.country != view.country &&
              focusAtStart.allows(c) &&
              operations.hasCoalitionFront(c),
        )
        .toList();
    if (leaders.isNotEmpty) {
      objectives.sort(
        (a, b) => targetPriority(b, leaders.first, view, rules, request.seed)
            .compareTo(
              targetPriority(a, leaders.first, view, rules, request.seed),
            ),
      );
    }
    final objective = objectives.firstOrNull;
    final recruitmentCities = initial.recruitmentCities(objectives);
    final underAttack = reports.values.any((r) => r.threatened);
    final coalition = objective == null
        ? null
        : CoalitionPolicy(objective.country, view, rules);
    bool affordable(AiLedger next, {bool emergency = false}) =>
        next.gold >= next.cash(emergency: emergency).reserve;
    bool accept(
      AiLedger next,
      List<AiAction> actions,
      String reason,
      AiCity city, {
      AiHero? hero,
      bool emergency = false,
    }) {
      // 升级新增的容量必须在本次决策的补兵窗口关闭前补齐。
      final supplied = next.copy();
      final topUp = actions.any((a) => a.kind == AiActionKind.upgrade)
          ? supplied.stockUpSoldiers(emergency: emergency)
          : 0;
      final commandCount = groups.fold(0, (n, g) => n + g.actions.length);
      if (commandCount + actions.length + (topUp > 0 ? 1 : 0) >
          rules.tuning.maxCommands) {
        assessor.work.limited = true;
        return false;
      }
      ledger = supplied;
      groups.add(
        AiCommandGroup(
          reason: reason,
          actions: actions,
          dependencies: operations.dependencies([?hero], [city]),
          minimumGold: next.cash(emergency: emergency).reserve,
          emergency: emergency,
        ),
      );
      if (topUp > 0) {
        groups.add(
          AiCommandGroup(
            reason: '在同一次补兵窗口内补充升级新增的全国兵员容量，不透支国库',
            actions: [
              AiAction(AiActionKind.soldiers, city: city.id, amount: topUp),
            ],
            dependencies: operations.dependencies([], [city]),
            minimumGold: next.cash(emergency: emergency).reserve,
            emergency: emergency,
          ),
        );
      }
      return true;
    }

    final cities = view.owned.toList()
      ..sort((a, b) {
        final mainDanger = (reports[b.id]?.protagonistInDanger == true ? 1 : 0)
            .compareTo(reports[a.id]?.protagonistInDanger == true ? 1 : 0);
        if (mainDanger != 0) return mainDanger;
        final empty = (ledger.garrison(b.id).isEmpty ? 1 : 0).compareTo(
          ledger.garrison(a.id).isEmpty ? 1 : 0,
        );
        if (empty != 0) return empty;
        final danger = (reports[b.id]?.threatened == true ? 1 : 0).compareTo(
          reports[a.id]?.threatened == true ? 1 : 0,
        );
        return danger != 0 ? danger : a.id.compareTo(b.id);
      });
    final guardDemand = math.min(
      ledger.capacity,
      cities.fold(
        0,
        (n, city) =>
            n + ledger.garrison(city.id).length * rules.integer('soldierLimit'),
      ),
    );
    if (cities.isNotEmpty) {
      final next = ledger.copy();
      final count = next.stockUpSoldiers(emergency: underAttack);
      if (count > 0) {
        accept(
          next,
          [
            AiAction(
              AiActionKind.soldiers,
              city: cities.first.id,
              amount: count,
            ),
          ],
          underAttack ? '遭受攻击，动用全部可用现金补充全国兵员' : '优先补满全国兵员容量，保留少量周转现金',
          cities.first,
          emergency: underAttack,
        );
      }
    }
    // 明确来敌触发防御策略时，必要升级排在日常招将之前。
    for (final city in cities) {
      if (groups.length >= rules.tuning.maxCommands - 2) break;
      if (reports[city.id]?.threatened != true ||
          city.initialBattleLevel != null) {
        continue;
      }
      final local = ledger.garrison(city.id);
      if (local.length <= ledger.slots(city) &&
          reports[city.id]?.risk?.advantage != CombatAdvantage.unfavorable &&
          reports[city.id]?.protagonistInDanger != true) {
        continue;
      }
      final governors = local.where((h) => h.canUpgrade).toList()
        ..sort((a, b) => b.politics.compareTo(a.politics));
      if (governors.isEmpty) continue;
      final governor = governors.first, next = ledger.copy();
      if (next.upgrade(city, governor) &&
          next.gold >= next.cash(emergency: true).reserve) {
        accept(
          next,
          [AiAction(AiActionKind.upgrade, city: city.id, hero: governor.id)],
          '防御策略发现来敌，动用可用现金提高必要城防',
          city,
          hero: governor,
          emergency: true,
        );
      }
    }

    bool recruit(AiCity city, {required bool defense, bool emergency = false}) {
      if (ledger.recruited.contains(city.id) ||
          reports[city.id]?.threatened == true &&
              ledger.occupancy(city.id) >= city.safeSlots) {
        return false;
      }
      final next = ledger.copy();
      // 新将到位也需要随军兵，先计入补兵支出，不能把这笔钱重复用于其他采购。
      final troopTarget = math.min(
        next.capacity,
        guardDemand +
            (next.recruited.length + 1) * rules.integer('soldierLimit'),
      );
      final needed = math.max(0, troopTarget - next.reserves);
      final soldiers = needed > 0
          ? next.stockUpSoldiers(emergency: emergency)
          : 0;
      // 受袭时即使本月无法再补兵，新将本身也能提供抵抗，不能因此闲置现款。
      if (soldiers < needed && !emergency) return false;
      if (!next.recruit(city, emergency: emergency) ||
          !affordable(next, emergency: emergency)) {
        if (city.recruitAllowed && view.poolCount > ledger.recruited.length) {
          recruitmentPending = true;
          if (defense) defenseRecruitmentPending = true;
        }
        return false;
      }
      return accept(
        next,
        [
          if (soldiers > 0)
            AiAction(AiActionKind.soldiers, city: city.id, amount: soldiers),
          AiAction(AiActionKind.recruit, city: city.id),
        ],
        defense ? '优先补充防守缺口，受袭时动用全部可用现金' : '利用本城月度招募机会补充前线，后方新将到任后继续出征',
        city,
        emergency: emergency,
      );
    }

    // 跨城先补防守缺口，不能因遍历顺序先替另一座城招进攻将。
    for (final city in cities) {
      if (groups.length >= rules.tuning.maxCommands - 2) break;
      final local = ledger.garrison(city.id);
      final threatened = reports[city.id]?.threatened == true;
      final missingGuard =
          ledger.occupancy(city.id) < ledger.defendersToKeep(city);
      final weakDefense =
          threatened &&
          ledger.occupancy(city.id) < city.safeSlots &&
          (local.isEmpty ||
              reports[city.id]?.risk?.advantage != CombatAdvantage.favorable);
      if (missingGuard || weakDefense) {
        recruit(city, defense: true, emergency: threatened);
      }
    }
    // 前线警报优先动用已有后援；仍有缺口且没有在途援军时通知最近后方补募。
    for (final report in reports.values.where(
      (r) => r.threatened && r.risk?.advantage != CombatAdvantage.favorable,
    )) {
      if (ledger.tasks.values.any(
        (t) => t.role == 'rescue' && t.city == report.city.id,
      )) {
        continue;
      }
      final rear =
          cities
              .where(
                (c) =>
                    ledger.safeRear(c) &&
                    ledger.garrison(c.id).isEmpty &&
                    c.recruitAllowed,
              )
              .toList()
            ..sort(
              (a, b) => a.center
                  .distance(report.city.center)
                  .compareTo(b.center.distance(report.city.center)),
            );
      if (rear.isNotEmpty) recruit(rear.first, defense: true, emergency: true);
    }
    // 前线先招，后方接着用各自的月度额度；只按城内积压限制补员。
    for (final city in recruitmentCities) {
      if (groups.length >= rules.tuning.maxCommands - 2) break;
      if ((!protectProtagonist ||
              reports[city.id]?.protagonistInDanger == true) &&
          ledger.needsOffensiveRecruit(city) &&
          !defenseRecruitmentPending) {
        final threatened = reports[city.id]?.threatened == true;
        recruit(city, defense: threatened, emergency: threatened);
      }
    }
    for (final city in cities) {
      if (ledger.safeRear(city)) continue;
      final local = ledger.garrison(city.id);
      final governors =
          local
              .where(
                (h) => h.canUpgrade && !ledger.reservedHeroes.contains(h.id),
              )
              .toList()
            ..sort((a, b) => b.politics.compareTo(a.politics));
      final needHero =
          recruitmentCities.any((c) => c.id == city.id) &&
          ledger.needsOffensiveRecruit(city);
      if (governors.isNotEmpty &&
          city.initialBattleLevel == null &&
          (local.length > ledger.slots(city) ||
              local.any((h) => h.type == 2) ||
              needHero && local.length >= ledger.slots(city) ||
              reports[city.id]?.risk?.advantage ==
                  CombatAdvantage.unfavorable)) {
        if (reports[city.id]?.threatened != true) {
          routineUpgrades.add((city, governors.first));
        }
      }
    }
    final spare = <AiHero>[];
    for (final city in cities) {
      if (reports[city.id]?.threatened == true) continue;
      final local = ledger.garrison(city.id);
      final free =
          local
              .where((h) => h.canDispatch && ledger.canSpareForOffense(h))
              .toList()
            ..sort(
              (a, b) =>
                  heroDeploymentValue(b).compareTo(heroDeploymentValue(a)),
            );
      spare.addAll(
        free.take(math.max(0, local.length - ledger.defendersToKeep(city))),
      );
    }
    spare.sort(
      (a, b) => heroDeploymentValue(b).compareTo(heroDeploymentValue(a)),
    );
    if (spare.isNotEmpty && !recruitmentPending && !protectProtagonist) {
      final hero = spare.first;
      final focus = OffensiveFocus(
        view,
        ledger,
        rules,
        targetCountry: request.offensiveCountry,
        targetCity: request.offensiveCity,
      );
      final targets =
          view.cities
              .where(
                (c) =>
                    c.country != view.country &&
                    OffensiveFocus(
                      view,
                      ledger,
                      rules,
                      targetCountry: request.offensiveCountry,
                      targetCity: request.offensiveCity,
                    ).allows(c) &&
                    operations.hasCoalitionFront(c),
              )
              .toList()
            ..sort(
              (a, b) => targetPriority(
                b,
                hero,
                view,
                rules,
                request.seed,
              ).compareTo(targetPriority(a, hero, view, rules, request.seed)),
            );
      var prepared = false;
      for (final target in targets.take(rules.tuning.maxTargets)) {
        final nearby = spare
            .where((h) => operations.canRaidFrom(h, target))
            .toList();
        if (nearby.isEmpty) continue;
        final hero = nearby.first;

        final readiness = assessRaid(hero, target, view, rules, assessor);
        final queued = focus.assignedTo(target.id);
        final teamSize = operations.raidTeamSize(
          readiness.teamSize,
          target,
          ledger,
          lead: hero,
        );
        final needed = teamSize - queued;
        final secondary = focus.primary != null && focus.primary != target.id;
        if (readiness.teamSize == 0 ||
            needed <= 0 ||
            needed > nearby.length ||
            secondary &&
                (teamSize != 1 ||
                    readiness.lower < rules.tuning.splitAdvantageMargin)) {
          continue;
        }
        // 只求整队报价，虚拟资金不进入真实采购或回复中的命令。
        var quote = ledger.copy()..gold = 1000000;
        final purchases = <AiAction>[];
        var ready = true;
        var earliest = double.infinity, latest = 0.0;
        for (var i = 0; i < needed; i++) {
          final member = nearby[i];
          final memberRisk = assessRaid(member, target, view, rules, assessor);
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
          earliest = math.min(earliest, route.seconds);
          latest = math.max(latest, route.seconds);
          if (!route.complete ||
              latest - earliest > rules.tuning.raidArrivalSpread) {
            ready = false;
            break;
          }
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
                      quote.defendersToKeep(c),
                    ) *
                    rules.integer('soldierLimit'),
          );
          final option = operations.send(
            quote,
            member,
            route,
            role: 'expedition',
            reason: '按共同攻防门槛核算整队兵员',
            target: target,

            protectSoldiers: math.min(
              protection,
              math.max(0, quote.capacity - rules.integer('soldierLimit')),
            ),
            queueIndex: queued + i,
            attrition: readiness.breakthrough,
          );
          if (option == null) {
            ready = false;
            break;
          }
          quote = option.ledger;
          purchases.addAll(
            option.group.actions.where((a) => a.kind == AiActionKind.soldiers),
          );
        }
        if (!ready) continue;
        final neededGold = 1000000 - quote.gold + quote.cash().reserve;
        if (ledger.gold < neededGold) {
          if (requiredGold == 0 || neededGold < requiredGold) {
            requiredGold = neededGold;
            requiredHeroes = teamSize;
            savingTarget = target.id;
          }
          continue;
        }
        final next = ledger.copy();
        for (final action in purchases) {
          if (!next.buySoldiers(action.amount)) {
            ready = false;
            break;
          }
        }
        if (!ready || !affordable(next)) continue;
        if (purchases.isNotEmpty) {
          if (!accept(
            next,
            purchases,
            '按目标城防与守将配齐$teamSize名进攻将领的随军兵员，保留周转余额',
            view.city(hero.city)!,
          )) {
            continue;
          }
        }
        prepared = true;
        preparedTarget = target.id;
        requiredGold = 0;
        savingTarget = null;

        if (prepared) break;
      }
    }
    // 常规升级不能抢占补兵、补将和已确定远征军需的资金。
    if (savingTarget == null && !recruitmentPending) {
      for (final (city, governor) in routineUpgrades) {
        if (groups.fold(0, (n, g) => n + g.actions.length) >=
            rules.tuning.maxCommands) {
          break;
        }
        final next = ledger.copy();
        if (next.upgrade(city, governor) && affordable(next)) {
          accept(
            next,
            [AiAction(AiActionKind.upgrade, city: city.id, hero: governor.id)],
            '完成军需安排后用余钱升级城防，仍保留少量周转余额',
            city,
            hero: governor,
          );
        }
      }
    }
    final policyTarget = view.city(preparedTarget ?? savingTarget) ?? objective;
    final selectedPolicy = policyTarget == null
        ? null
        : CoalitionPolicy(
            policyTarget.country,
            view,
            rules,
            levels: ledger.levels,
          );
    final boundedGroups = <AiCommandGroup>[];
    var commandCount = 0;
    for (final group in groups) {
      if (commandCount + group.actions.length > rules.tuning.maxCommands) {
        assessor.work.limited = true;
        break;
      }
      commandCount += group.actions.length;
      boundedGroups.add(group);
    }
    return CountryPlan(
      phase: protectProtagonist
          ? 'defending'
          : savingTarget == null
          ? 'preparing'
          : 'saving',
      targetCity:
          preparedTarget ??
          savingTarget ??
          (coalition?.dangerous == true ? objective?.id : null),
      requiredGold: requiredGold,
      requiredHeroes: requiredHeroes,
      groups: boundedGroups,
      budgetLimited: assessor.work.limited,
      assessments: assessor.work.assessments,
      routeSteps: assessor.work.routeSteps,
      expansions: assessor.work.candidates,
      notes: [
        if (protectProtagonist) '主角所在城存在明确风险，军费优先用于守军与城防，暂停新增远征军需',
        if (groups.isEmpty) '本轮无必要且可支付的采购，保留国库',
        if (selectedPolicy?.dangerous == true) selectedPolicy!.decisionNote,
      ],
    );
  }
}
