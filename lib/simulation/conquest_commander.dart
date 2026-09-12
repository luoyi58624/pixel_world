import 'dart:math' as math;

import '../core/config/game_config.dart';
import '../core/geometry/geometry.dart';
import '../features/ai/geometry.dart';
import '../features/ai/routes.dart';
import '../features/ai/work_budget.dart';
import '../features/campaign/domain/campaign.dart';
import '../features/heroes/data/rom_hero.dart';
import '../features/world_map/domain/world_data.dart';
import 'player_commander.dart';

/// 仅用于独立验收的玩家策略：筛选将领、集中轮攻，所有动作调用真实玩法接口。
class ConquestCommander implements PlayerCommander {
  final _paths = <String, List<AiPoint>>{};
  int? _target;

  @override
  /// 经真实玩法接口执行成功的玩家操作记录。
  final List<Map<String, Object?>> commands = [];

  void _log(int second, String action, Map<String, Object?> data) =>
      commands.add({'second': second, 'action': action, ...data});

  double _strength(CampaignHero h) => (h.hp + 80) * (h.combat + 4);

  List<CityDefinition> _owned(CampaignState c) =>
      c.world.cities.where((city) => c.cities[city.id]!.isPlayer).toList();

  bool _danger(CampaignState c, int city) {
    if (c.battles[city]?.isActive == true) return true;
    final center = c
        .cityBounds(c.world.cities.firstWhere((d) => d.id == city))
        .center;
    return c.marches.values.any(
      (m) => !m.hero.isPlayer && (m.position - center).distance < 150,
    );
  }

  @override
  /// 每五秒根据当前公开战况安排补给、守军和进攻。
  void decide(CampaignState c, int second) {
    if (c.defeated || c.isPaused) return;
    final owned = _owned(c);
    if (owned.isEmpty) return;
    _paths.removeWhere((id, _) => !c.marches.containsKey(id));
    if (c.cities[_target]?.isPlayer == true) _target = null;
    _recover(c, second, owned);
    _manage(c, second, owned);
    _attack(c, second, owned);
  }

  void _recover(CampaignState c, int second, List<CityDefinition> owned) {
    for (final march
        in c.marches.values.where((m) => m.hero.isPlayer).toList()) {
      final h = march.hero;
      final battle = c.activeBattleForHero(h.id);
      if (battle != null && c.retreatBlockReason(h.id) == null) {
        final opponent = battle.attacker == h
            ? battle.defender
            : battle.attacker;
        // 仅在尚有兵员、且敌方明显占优时撤退，避免残兵低成功率撤退白送主力。
        if (h.soldiers >= 2 &&
            opponent.soldiers >= h.soldiers + 2 &&
            h.combat < opponent.combat) {
          final result = c.retreatHero(h.id);
          if (result != null) {
            _log(second, '不利战况申请撤退', {
              'hero': h.name,
              'succeeded': result,
              'soldiers': h.soldiers,
            });
          }
        }
        continue;
      }
      if (c.moveBlockReason(h.id) != null || march.returningFromRetreat) {
        continue;
      }
      final path = _paths[h.id];
      if (march.phase == MarchPhase.camped && path != null && path.isNotEmpty) {
        final next = path.removeAt(0);
        c.moveTo(h.id, GamePoint(next.x, next.y));
        continue;
      }
      if (march.target != null && c.cities[march.target!.id]!.isPlayer) {
        continue;
      }
      final target = march.target;
      final spent =
          target != null &&
          c.garrisonAt(target.id).isNotEmpty &&
          h.soldiers < 2;
      if (h.hp >= h.maxHp * .8 && !spent && march.phase != MarchPhase.camped) {
        continue;
      }
      final homes = owned.where((d) => !_danger(c, d.id)).toList()
        ..sort(
          (a, b) => (c.cityBounds(a).center - march.position).distance
              .compareTo((c.cityBounds(b).center - march.position).distance),
        );
      if (homes.isNotEmpty &&
          c.moveTo(h.id, c.cityBounds(homes.first).center)) {
        _paths.remove(h.id);
        _log(second, '回城补兵整备', {'hero': h.name, 'city': homes.first.id});
      }
    }
  }

  void _manage(CampaignState c, int second, List<CityDefinition> owned) {
    for (final city in owned) {
      if (c.gold >= 5 && c.recruitmentBlockReason(city.id) == null) {
        final offer = c.drawHero(city.id);
        if (offer != null) {
          final hero = offer.hero;
          final count = c.heroes.where((h) => h.isPlayer).length;
          final payroll = c.salaryCost + hero.salary;
          final affordable =
              payroll <= c.grossIncome + math.max(0, c.gold - 20) / 4;
          final worthwhile =
              hero.combat >= 8 && hero.maxHp >= 40 ||
              c.garrisonAt(city.id).length < 2;
          if (worthwhile && affordable && count < owned.length * 3 + 3) {
            final signed = c.signHero(offer);
            if (signed != null) {
              _log(second, '签收主力', {
                'hero': signed.name,
                'city': city.id,
                'combat': signed.combat,
                'salary': signed.salary,
              });
            }
          } else if (c.declineHero(offer)) {
            _log(second, '放弃候选并按内政退款', {
              'hero': hero.name,
              'city': city.id,
              'refund': hero.politics,
            });
          }
        }
      }
      var local = c.garrisonAt(city.id);
      if (local.isEmpty) continue;
      final governor = local.reduce((a, b) => a.politics >= b.politics ? a : b);
      final level = c.cities[city.id]!.level;
      final capital = local.any((h) => h.type == HeroType.protagonist);
      final cost = c.upgradeCostFor(city.id, governor);
      if (cost != null &&
          c.upgradeWindowBlockReason(city.id) == null &&
          c.gold - cost >=
              (level < 2 || capital && _danger(c, city.id) ? 4 : 20) &&
          (level < 2 || capital || _danger(c, city.id) || c.gold > 100)) {
        if (c.upgradeCity(city.id, hero: governor)) {
          _log(second, '维护城防', {
            'city': city.id,
            'level': c.cities[city.id]!.level,
            'cost': cost,
          });
        }
      }
      if (!_danger(c, city.id)) continue;
      local = c.garrisonAt(city.id);
      final excess = local.length - c.cities[city.id]!.level;
      final disposable =
          local
              .where(
                (h) =>
                    h.type != HeroType.protagonist &&
                    c.dismissalBlockReason(h) == null,
              )
              .toList()
            ..sort((a, b) => _strength(a).compareTo(_strength(b)));
      for (final h in disposable.take(math.max(0, excess))) {
        if (c.dismissHero(h) != null) {
          _log(second, '保留核心迎战名额', {'city': city.id, 'hero': h.name});
        }
      }
    }
    final buffer = math.max(4, c.salaryCost - c.grossIncome + 8);
    var wanted = math.min(
      c.reserveCapacityFor(0) - c.reserveSoldiersFor(0),
      math.max(0, (c.gold - buffer) ~/ GameConfig.soldierRecruitCost),
    );
    if (wanted <= 0) return;
    final window = c.beginSoldierRecruitment();
    if (window == null) return;
    var bought = 0;
    try {
      while (wanted > 0) {
        final count = math.min(wanted, GameConfig.soldierRecruitBatchSize);
        if (!c.buySoldiers(owned.first.id, count, window: window)) break;
        bought += count;
        wanted -= count;
      }
    } finally {
      c.endSoldierRecruitment(window);
    }
    if (bought > 0) _log(second, '本月集中补兵', {'count': bought});
  }

  void _attack(CampaignState c, int second, List<CityDefinition> owned) {
    final available = <CampaignHero>[];
    for (final city in owned) {
      final danger = _danger(c, city.id);
      final local = c.garrisonAt(city.id);
      final main = local
          .where((h) => h.type == HeroType.protagonist)
          .firstOrNull;
      final fighters =
          local
              .where(
                (h) =>
                    h.type != HeroType.protagonist &&
                    c.canDispatch(h) &&
                    h.hp >= h.maxHp * .85,
              )
              .toList()
            ..sort((a, b) => _strength(b).compareTo(_strength(a)));
      if (fighters.isEmpty) continue;
      // 安全主城由主角留守；新城先留一名守军，前线多留一名以承接轮攻。
      final keep = <CampaignHero>{};
      if (main == null || danger) {
        keep.add(danger ? fighters.first : fighters.last);
      }
      if (danger && fighters.length > 1) keep.add(fighters[1]);
      available.addAll(fighters.where((h) => !keep.contains(h)));
    }
    available.sort((a, b) => _strength(b).compareTo(_strength(a)));
    if (available.isEmpty || c.gold <= 0) return;
    final view = c.aiObservationFor(0), rules = c.aiRulesForTesting();
    final routes = AiRoutes(
      c.aiMapForTesting(),
      rules,
      AiWorkBudget(rules.tuning),
    );
    final lead = available.first;
    CityDefinition? best;
    var bestScore = double.infinity, wanted = 1;
    for (final city in c.world.cities.where((d) => !c.cities[d.id]!.isPlayer)) {
      final level = c.cities[city.id]!.level;
      final guards = c.garrisonAt(city.id).reversed.take(level).toList();
      final queued = c.marches.values
          .where((m) => m.hero.isPlayer && m.target?.id == city.id)
          .length;
      final desired = math.min(4, math.max(1, guards.length + 1));
      if (queued >= desired) continue;
      final route = routes.to(
        view.hero(lead.id)!,
        view.city(city.id)!.center,
        view,
        target: view.city(city.id),
        safe: true,
      );
      if (!route.complete || route.seconds > 170) continue;
      var reserve = c.reserveSoldiersFor(c.cities[city.id]!.ownerCountryId);
      var total = 0.0, opening = 0.0;
      for (var i = 0; i < guards.length; i++) {
        final h = guards[i];
        final soldiers = math.min(4, reserve + h.soldiers);
        reserve = math.max(0, reserve - (soldiers - h.soldiers));
        final power =
            (h.hp + soldiers * 20) *
            (h.combat +
                soldiers +
                GameConfig.cityDefenseAttackBonusFor(math.max(1, level - i)));
        total += power;
        if (i == 0) opening = power;
      }
      final team = math.min(desired - queued, available.length);
      if (opening > _strength(lead) * (team + queued >= 2 ? 1.45 : 1.0)) {
        continue;
      }
      if (guards.length > 1 &&
          team + queued < 2 &&
          opening > _strength(lead) * .7) {
        continue;
      }
      if (guards.isNotEmpty && c.reserveSoldiersFor(0) < team * 4) continue;
      final score =
          route.seconds * .8 +
          total / _strength(lead) * 40 +
          level * 8 -
          (_target == city.id ? 15 : 0) -
          queued * 12;
      if (score < bestScore) {
        best = city;
        bestScore = score;
        wanted = team;
      }
    }
    if (best == null) return;
    var sent = 0;
    for (final h in available) {
      if (sent >= wanted) break;
      if (c.garrisonAt(h.cityId).length <= 1) continue;
      if (c.garrisonAt(best.id).isNotEmpty && c.reserveSoldiersFor(0) < 4) {
        break;
      }
      final route = routes.to(
        view.hero(h.id)!,
        view.city(best.id)!.center,
        view,
        target: view.city(best.id),
        safe: true,
      );
      if (!route.complete) continue;
      final path = [
        ...route.points.take(route.points.length - 1),
        view.city(best.id)!.center,
      ];
      if (c.dispatchTo(h, GamePoint(path.first.x, path.first.y)) != null) {
        _paths[h.id] = path.skip(1).toList();
        _target = best.id;
        sent++;
        _log(second, '集中攻城', {
          'hero': h.name,
          'city': best.id,
          'travelSeconds': route.seconds,
        });
      }
    }
  }
}
