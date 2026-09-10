part of 'battle_simulation.dart';

/// 战斗的完整快照，包括内核、武器命中标记、撤退和结束动画。
extension BattleSnapshots on BattleSimulation {
  /// 生命对象通过编号共享，恢复后战役与战场不会各持一份血量。
  Map<String, dynamic> saveState(int Function(BattleHealth) healthId) {
    Map<String, dynamic> army(BattleArmy a) => {
      'id': a.id,
      'name': a.name,
      'hp': healthId(a.general),
      'attack': a.attack,
      'morale': a.morale,
      'soldiers': a.soldiers.map(healthId).toList(),
    };
    return {
      'attacker': army(attacker),
      'defender': army(defender),
      'cityLevel': defenderCityLevel,
      'appearance': cityAppearanceLevel,
      'terrain': fieldTerrain?.index,
      'perspective': resultPerspective.index,
      'auto': autoCharge,
      'kernel': _kernel.saveState(frozen: finished),
      'time': [elapsed, _accumulator, _ticks, _endingTicks, _endingCompleteAt],
      'stage': stage.index,
      'result': result?.index,
      'pendingResult': _pendingResult?.index,
      'stopped': stopped,
      'pushed': pushedSide?.index,
      'clash': lastClash == null
          ? null
          : [lastClash!.attackerDamage, lastClash!.defenderDamage],
      'morale': [
        for (final m in [attackerMorale, defenderMorale])
          [m.initial, m.remaining, m.accumulated, m.committed],
      ],
      'formations': [
        for (final f in formations.values)
          [
            f.frontX,
            f.velocity,
            f.motion.index,
            f.moving,
            f.walkDistance,
            f.impactAt,
            f.wallHitAt,
          ],
      ],
      'units': [
        for (final u in units)
          {
            'id': u.id,
            'name': u.name,
            'side': u.side.index,
            'slot': u.slot,
            'hp': healthId(u.health),
            'attack': u.attack,
            'retreating': u._retreating,
            'lastAttack': u.lastAttackAt,
            'lastHit': u.lastHitAt,
            'died': u.diedAt,
          },
      ],
      'hits': [
        for (final h in hits)
          [
            h.sourceId,
            h.targetId,
            h.damage,
            h.position.dx,
            h.position.dy,
            h.at,
          ],
      ],
      'events': List.of(events),
      'synced': {for (final e in _syncedHp.entries) '${e.key.index}': e.value},
      'weaponUsers': _weaponUsers.map((s) => s.index).toList(),
      'weapon': _weaponStrike == null
          ? null
          : {
              'id': _weaponStrike!.weapon.id,
              'attacking': _weaponStrike!.attackingSide,
              'at': _weaponStrike!.startedAt,
              'actors': _weaponStrike!.visibleActors,
              'frame': _weaponStrike!.frame,
              'applied': _weaponStrike!.applied,
            },
      'retreat': _retreat == null
          ? null
          : [
              _retreat!.side.index,
              _retreat!.succeeded,
              _retreatElapsed,
              List.of(_retreatOrigins),
            ],
    };
  }

  /// 读取历史事实，不执行任何一帧战斗或重新投掷撤退结果。
  static BattleSimulation restore(
    Map<String, dynamic> d,
    List<BattleHealth> health,
    WeaponCatalog weapons,
  ) {
    BattleArmy army(Map<String, dynamic> a) => BattleArmy(
      id: a['id'],
      name: a['name'],
      general: health[a['hp']],
      attack: a['attack'],
      morale: a['morale'],
      soldiers: [for (final id in a['soldiers']) health[id]],
    );
    // 构造器会同步开场血量，恢复快照后把共享生命还原到原值。
    final hp = health.map((h) => h.hp).toList();
    final s = BattleSimulation(
      attacker: army(Map<String, dynamic>.from(d['attacker'])),
      defender: army(Map<String, dynamic>.from(d['defender'])),
      seed: 1,
      defenderCityLevel: d['cityLevel'],
      cityAppearanceLevel: d['appearance'],
      fieldTerrain: d['terrain'] == null
          ? null
          : FieldTerrain.values[d['terrain']],
      resultPerspective: BattleSide.values[d['perspective']],
      autoCharge: d['auto'],
    );
    for (var i = 0; i < health.length; i++) {
      health[i].hp = hp[i];
    }
    s._kernel.restoreState(Map<String, dynamic>.from(d['kernel']));
    final t = d['time'] as List;
    s.elapsed = (t[0] as num).toDouble();
    s._accumulator = (t[1] as num).toDouble();
    s._ticks = t[2];
    s._endingTicks = t[3];
    s._endingCompleteAt = t[4];
    s.stage = BattleStage.values[d['stage']];
    s.stopped = d['stopped'];
    s.result = d['result'] == null ? null : BattleResult.values[d['result']];
    s._pendingResult = d['pendingResult'] == null
        ? null
        : BattleResult.values[d['pendingResult']];
    s.pushedSide = d['pushed'] == null ? null : BattleSide.values[d['pushed']];
    if (d['clash'] != null) {
      s.lastClash = (
        attackerDamage: (d['clash'][0] as num).toDouble(),
        defenderDamage: (d['clash'][1] as num).toDouble(),
      );
    }
    final morale = [
      for (final m in d['morale'])
        BattleMorale(m[0])
          ..remaining = m[1]
          ..accumulated = m[2]
          ..committed = m[3],
    ];
    s.attackerMorale = morale[0];
    s.defenderMorale = morale[1];
    for (var i = 0; i < 2; i++) {
      final a = d['formations'][i] as List,
          f = s.formations[BattleSide.values[i]]!;
      f.frontX = (a[0] as num).toDouble();
      f.velocity = (a[1] as num).toDouble();
      f.motion = BattleMotion.values[a[2]];
      f.moving = a[3];
      f.walkDistance = (a[4] as num).toDouble();
      f.impactAt = (a[5] as num).toDouble();
      f.wallHitAt = (a[6] as num).toDouble();
    }
    s.units.clear();
    for (final u in d['units']) {
      final side = BattleSide.values[u['side']];
      s.units.add(
        BattleUnit._(
            id: u['id'],
            name: u['name'],
            side: side,
            slot: u['slot'],
            health: health[u['hp']],
            attack: u['attack'],
            formation: s.formations[side]!,
            kernel: s._kernel,
          )
          .._retreating = u['retreating']
          ..lastAttackAt = (u['lastAttack'] as num).toDouble()
          ..lastHitAt = (u['lastHit'] as num).toDouble()
          ..diedAt = (u['died'] as num?)?.toDouble(),
      );
    }
    s.hits.addAll([
      for (final h in d['hits'])
        (
          sourceId: h[0] as String,
          targetId: h[1] as String,
          damage: (h[2] as num).toDouble(),
          position: GamePoint(
            (h[3] as num).toDouble(),
            (h[4] as num).toDouble(),
          ),
          at: (h[5] as num).toDouble(),
        ),
    ]);
    s.events
      ..clear()
      ..addAll((d['events'] as List).cast<String>());
    s._syncedHp
      ..clear()
      ..addAll({
        for (final e in (d['synced'] as Map).entries)
          BattleSide.values[int.parse(e.key)]: (e.value as num).toDouble(),
      });
    s._weaponUsers.addAll([
      for (final i in d['weaponUsers']) BattleSide.values[i],
    ]);
    final w = d['weapon'];
    if (w != null) {
      s._weaponStrike =
          WeaponStrike(
              weapons.weapons[w['id']]!,
              attackingSide: w['attacking'],
              startedAt: (w['at'] as num).toDouble(),
              visibleActors: w['actors'],
            )
            ..frame = w['frame']
            ..applied = w['applied'];
    }
    final r = d['retreat'];
    if (r != null) {
      s._retreat = (side: BattleSide.values[r[0]], succeeded: r[1] as bool);
      s._retreatElapsed = (r[2] as num).toDouble();
      s._retreatOrigins = (r[3] as List).cast<int>();
    }
    return s;
  }
}
