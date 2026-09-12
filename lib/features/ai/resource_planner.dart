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

/// 全国资源整理只在独立周期执行，预算包含全部存活将领的月俸。
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
    final recruitmentFronts = initial.recruitmentFronts(objectives);
    final coalition = objective == null
        ? null
        : CoalitionPolicy(objective.country, view, rules);
    final earmarked = !protectProtagonist && coalition?.dangerous == true
        ? math.min(
            coalition!.extraGold,
            math.max(0, initial.gold - initial.cash().reserve),
          )
        : 0;
    bool affordable(AiLedger next, {bool civilian = false}) =>
        next.gold >=
        math.max(next.cash().reserve, rules.tuning.resourceCashBuffer) +
            (civilian ? earmarked : 0);
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
          ? supplied.stockUpSoldiers()
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
          minimumGold: emergency
              ? next.cash(emergency: true).reserve
              : math.max(next.cash().reserve, rules.tuning.resourceCashBuffer),
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
      final count = next.stockUpSoldiers();
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
          '优先补满全国兵员容量，资金不足时买得起多少补多少，不透支',
          cities.first,
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
          '防御策略发现来敌，优先提高必要城防，升级后仍保留余额',
          city,
          hero: governor,
          emergency: true,
        );
      }
    }

    bool recruit(AiCity city, {required bool defense}) {
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
      final soldiers = needed > 0 ? next.stockUpSoldiers() : 0;
      if (soldiers < needed) return false;
      if (!next.recruit(
            city,
            emergency: defense || reports[city.id]?.threatened == true,
            offensiveCountry: objective?.country,
          ) ||
          !affordable(next)) {
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
        defense ? '优先补充本国守城缺口，并备齐新将兵员与月俸' : '守城缺口已优先处理，再补前线进攻将领及其兵员',
        city,
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
      if (missingGuard || weakDefense) recruit(city, defense: true);
    }
    for (final city in cities) {
      if (groups.length >= rules.tuning.maxCommands - 2) break;
      final desiredAssault = operations.desiredAssaultHeroes(ledger);
      final strongest = view.heroes
          .where((h) => h.country == view.country && !h.marked)
          .fold<int>(0, (n, h) => math.max(n, h.combat));
      final strongThreshold = math.max(12, strongest * .8);
      final readyAssault = view.heroes
          .where(
            (h) =>
                h.country == view.country &&
                !h.marked &&
                !ledger.removed.contains(h.id) &&
                h.hp >= h.maxHp * .65 &&
                h.combat >= strongThreshold &&
                (!h.stationed || ledger.canSpareForOffense(h)),
          )
          .length;
      final needQuality =
          desiredAssault >= 2 &&
          readyAssault + ledger.recruited.length < desiredAssault &&
          view.cities.any((c) => c.country != view.country);
      if (needQuality &&
          reports[city.id]?.threatened != true &&
          ledger.garrison(city.id).length >= city.rearStagingCapacity) {
        final redundant =
            ledger
                .garrison(city.id)
                .where(
                  (h) =>
                      h.canDismiss &&
                      h.combat <= rules.tuning.attritionCombatCeiling &&
                      h.politics <= rules.integer('drawCost') &&
                      !valuableGovernor(h) &&
                      ledger.canSpareForOffense(h),
                )
                .toList()
              ..sort(
                (a, b) =>
                    heroStrategicValue(a).compareTo(heroStrategicValue(b)),
              );
        if (redundant.isNotEmpty) {
          final next = ledger.copy(), hero = redundant.first;
          if (next.dismiss(hero)) {
            accept(
              next,
              [AiAction(AiActionKind.dismiss, hero: hero.id)],
              '安全后方清理低价值冗余编制，保留实际守将和内政将领，为强攻主力补员',
              city,
              hero: hero,
            );
          }
        }
      }
      final local = ledger.garrison(city.id);
      final governors = local.where((h) => h.canUpgrade).toList()
        ..sort((a, b) => b.politics.compareTo(a.politics));
      var extraHeroes = 1;
      if (local.isNotEmpty) {
        final lead = local.reduce(
          (a, b) => heroDeploymentValue(a) > heroDeploymentValue(b) ? a : b,
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
                      operations.canRaidFrom(lead, c),
                )
                .toList()
              ..sort(
                (a, b) => targetPriority(
                  b,
                  lead,
                  view,
                  rules,
                  request.seed,
                ).compareTo(targetPriority(a, lead, view, rules, request.seed)),
              );
        var team = targets.isEmpty ? 0 : 2;
        for (final target in targets.take(3)) {
          final readiness = assessRaid(lead, target, view, rules, assessor);
          if (readiness.teamSize > 0) {
            if (coalition?.dangerous == true &&
                target.country == objective?.country) {
              team = operations.raidTeamSize(
                readiness.teamSize,
                target,
                ledger,
                lead: lead,
              );
              break;
            }
            team = operations.raidTeamSize(
              readiness.teamSize,
              target,
              ledger,
              lead: lead,
            );
            break;
          }
        }
        // 需要轮番进攻时补齐队伍，不能永远停在“留守人数 + 一名远征军”。
        extraHeroes = team;
      }
      final needHero =
          (!protectProtagonist ||
              reports[city.id]?.protagonistInDanger == true) &&
          (recruitmentFronts.contains(city.id) ||
              reports[city.id]?.threatened == true) &&
          view.cities.any((c) => c.country != view.country) &&
          (needQuality ||
              local.isEmpty ||
              extraHeroes > 0 &&
                  ledger.assignedHeroCount(city.id) <
                      ledger.defendersToKeep(city) + extraHeroes);
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
      if (needHero && !defenseRecruitmentPending) {
        recruit(city, defense: reports[city.id]?.threatened == true);
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
            '按目标城防与守将配齐$teamSize名进攻将领的随军兵员，保留月俸预算',
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
        if (next.upgrade(city, governor) && affordable(next, civilian: true)) {
          accept(
            next,
            [AiAction(AiActionKind.upgrade, city: city.id, hero: governor.id)],
            '完成军需安排后用余钱升级城防，仍保留月俸与周转余额',
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
