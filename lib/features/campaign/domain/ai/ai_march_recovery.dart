part of '../campaign.dart';

extension _AiMarchRecovery on _AiCoordinator {
  // 每秒只看真实位置；战斗、排队放行、撤退和断粮不是行军卡死。
  bool _recoverStalledMarches() {
    final now = campaign._strategyTime;
    if (now < _nextMarchCheck) return false;
    _nextMarchCheck = now + 1;
    _marchProgress.removeWhere((id, _) => !campaign.marches.containsKey(id));
    var changed = false;
    for (final march in campaign.marches.values) {
      final hero = march.hero, task = tasks[march.hero.id];
      if (!campaign._automatedCountry(hero.countryId) ||
          !hero.health.alive ||
          march.waitingForDeparture ||
          march.returningFromRetreat ||
          march.supplyHalted ||
          campaign.goldFor(hero.countryId) <= 0 ||
          campaign.activeBattleForHero(hero.id) != null ||
          march.phase == MarchPhase.awaitingBattle ||
          (march.phase != MarchPhase.marching && !march.waitingForTraffic)) {
        _marchProgress.remove(hero.id);
        continue;
      }
      final revision = campaign._aiOrderVersions[hero.id] ?? 0;
      final last = _marchProgress[hero.id];
      if (last == null ||
          last.revision != revision ||
          (march.position - last.position).distanceSquared >= 1) {
        _marchProgress[hero.id] = (
          position: march.position,
          time: now,
          revision: revision,
          retries: 0,
        );
        continue;
      }
      if (now - last.time < GameConfig.nationalAi.stagnationSeconds) continue;
      if (campaign.moveBlockReason(hero.id, countryId: hero.countryId) !=
          null) {
        _marchProgress.remove(hero.id);
        continue;
      }
      String reason;
      if (last.retries == 0) {
        // 中间路点长期被占用时跳向下一段，终点和任务不变，实际移动仍执行碰撞检查。
        if (task != null &&
            task.expectedOrderRevision == revision &&
            task.leg + 1 < task.points.length) {
          final leg = task.leg + 1, point = task.points[leg];
          final city = leg == task.points.length - 1 && task.role != 'intercept'
              ? campaign.world.cities
                    .where((c) => c.id == task.city)
                    .firstOrNull
              : null;
          if (!campaign.moveTo(
            hero.id,
            city == null
                ? GamePoint(point.x, point.y)
                : campaign.cityBounds(city).center,
            countryId: hero.countryId,
          )) {
            continue;
          }
          tasks[hero.id] = task.withLeg(
            leg,
            campaign._aiOrderVersions[hero.id]!,
          );
        } else {
          final city = march.target;
          march._resumeToward(
            city == null
                ? march.destination
                : campaign._contactPoint(
                    march.position,
                    campaign.cityBounds(city).center,
                    city,
                  ),
            city: city,
          );
        }
        reason = '行军长期没有位移，保留任务并重新寻找安全通路';
        _marchProgress[hero.id] = (
          position: march.position,
          time: now,
          revision: campaign._aiOrderVersions[hero.id] ?? 0,
          retries: 1,
        );
      } else {
        // 局部重试仍无进展时交回战略规划，不能被“仍在行军”的承诺期永久跳过。
        if (!campaign.camp(hero.id, countryId: hero.countryId)) continue;
        if (task != null && task.expectedOrderRevision == revision) {
          tasks[hero.id] = task.withLeg(
            task.leg,
            campaign._aiOrderVersions[hero.id]!,
          );
        }
        reason = '重新寻路后仍无位移，重新评估目标与入城名额';
        urgent(hero.countryId, reason: reason);
        _marchProgress.remove(hero.id);
      }
      diagnostics.record('${hero.name}：$reason');
      campaign._emitEvent(
        GameEventKind.heroMoved,
        '${hero.name}启动行军恢复',
        hero: hero,
        cityId: task?.city ?? march.target?.id,
        source: GameEventSource.system,
        reason: reason,
        data: {'stalledSeconds': now - last.time, 'retry': last.retries + 1},
      );
      changed = true;
    }
    return changed;
  }
}
