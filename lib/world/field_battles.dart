part of 'campaign.dart';

/// 敌对将领在地图上相遇的一对一野战，无城池归属与等级影响。
class FieldBattle extends WorldBattle {
  /// 锁定相遇地点的地形，并记录交战前的行军或驻扎状态。
  FieldBattle({
    required this.id,
    required this.position,
    required this.terrain,
    required HeroMarch first,
    required HeroMarch second,
    required int seed,
  }) : attackerWasCamped = first.phase == MarchPhase.camped,
       defenderWasCamped = second.phase == MarchPhase.camped,
       super(
         first.hero,
         second.hero,
         simulation: BattleSimulation(
           attacker: first.hero.battleArmy,
           defender: second.hero.battleArmy,
           fieldTerrain: terrain,
           seed: seed,
         ),
       );

  /// 本局内唯一战斗编号。
  final int id;

  /// 双方相遇时的地图坐标，交战期间固定。
  final Offset position;

  /// 对双方将领生效的同一地形。
  final FieldTerrain terrain;

  /// 右侧部队交战前是否驻扎。
  final bool attackerWasCamped;

  /// 左侧部队交战前是否驻扎。
  final bool defenderWasCamped;

  @override
  String get locationLabel => '${terrain.label}野战';

  @override
  Offset markerPosition(CampaignState campaign) => position;
}

extension _FieldEncounters on CampaignState {
  bool _resolveFieldEncounters(Map<String, Offset> previous) {
    final available =
        marches.values
            .where(
              (march) =>
                  march.hero.health.alive &&
                  (march.phase == MarchPhase.marching ||
                      march.phase == MarchPhase.camped),
            )
            .toList()
          ..sort((a, b) => a.hero.id.compareTo(b.hero.id));
    final contacts = <({HeroMarch a, HeroMarch b, double fraction})>[];
    for (var i = 0; i < available.length; i++) {
      for (var j = i + 1; j < available.length; j++) {
        final a = available[i];
        final b = available[j];
        if (a.hero.countryId == b.hero.countryId) continue;
        final from = previous[a.hero.id]! - previous[b.hero.id]!;
        final relativeMove = (a.position - b.position) - from;
        final radius = GameConfig.fieldEncounterDistance;
        final c = from.distanceSquared - radius * radius;
        var fraction = 0.0;
        if (c > 0) {
          final length = relativeMove.distanceSquared;
          if (length < 1e-12) continue;
          final dot = from.dx * relativeMove.dx + from.dy * relativeMove.dy;
          if (dot >= 0) continue;
          final discriminant = dot * dot - length * c;
          if (discriminant < 0) continue;
          fraction = (-dot - math.sqrt(discriminant)) / length;
          if (fraction < 0 || fraction > 1) continue;
        }
        contacts.add((a: a, b: b, fraction: fraction));
      }
    }
    contacts.sort((a, b) {
      final time = a.fraction.compareTo(b.fraction);
      return time != 0
          ? time
          : '${a.a.hero.id}:${a.b.hero.id}'.compareTo(
              '${b.a.hero.id}:${b.b.hero.id}',
            );
    });
    var changed = false;
    for (final contact in contacts) {
      final a = contact.a;
      final b = contact.b;
      if (a.phase == MarchPhase.dueling || b.phase == MarchPhase.dueling) {
        continue;
      }
      for (final march in [a, b]) {
        final start = previous[march.hero.id]!;
        final point = start + (march.position - start) * contact.fraction;
        march.walkDistance = math.max(
          0,
          march.walkDistance - (march.position - point).distance,
        );
        march.position = point;
      }
      final point = (a.position + b.position) / 2;
      final id = ++_battleSerial;
      fieldBattles[id] = FieldBattle(
        id: id,
        position: point,
        terrain: FieldTerrain.fromMovement(
          world.movementTerrainAt(cellAt(world, point)),
        ),
        first: a,
        second: b,
        seed: id * 1009 + a.hero.sourceId * 41 + b.hero.sourceId,
      );
      a.phase = MarchPhase.dueling;
      b.phase = MarchPhase.dueling;
      _record(
        '${a.hero.name}与${b.hero.name}在${fieldBattles[id]!.terrain.label}遭遇，展开野外决战',
      );
      changed = true;
    }
    final ended = fieldBattles.values
        .where((battle) => !battle.isActive)
        .toList();
    for (final battle in ended.take(
      math.max(0, ended.length - GameConfig.fieldBattleHistoryLimit),
    )) {
      fieldBattles.remove(battle.id);
    }
    return changed;
  }

  void _settleFieldBattle(FieldBattle battle) {
    final first = battle.attacker;
    final second = battle.defender;
    final firstLost = !first.health.alive;
    final secondLost = !second.health.alive;
    if (firstLost) {
      _removeDefeatedHero(first.id, winnerCountryId: second.countryId);
    }
    if (secondLost) {
      _removeDefeatedHero(second.id, winnerCountryId: first.countryId);
    }
    battle.outcome = firstLost && secondLost
        ? '野战结束 · 双方将领阵亡'
        : '${firstLost ? second.name : first.name}赢得野外决战';
    battle.simulation.stop();
    battle.record(battle.outcome!);
    _record(battle.outcome!);
    if (defeated) return;
    _resumeFieldArmy(first, wasCamped: battle.attackerWasCamped);
    _resumeFieldArmy(second, wasCamped: battle.defenderWasCamped);
  }

  void _resumeFieldArmy(CampaignHero hero, {required bool wasCamped}) {
    final march = marches[hero.id];
    if (march == null || !hero.health.alive) return;
    if (wasCamped) {
      march.camp();
      return;
    }
    final target = march.target;
    march.moveTo(
      target == null
          ? march.destination
          : _contactPoint(march.position, cityBounds(target).center, target),
      city: target,
    );
  }
}
