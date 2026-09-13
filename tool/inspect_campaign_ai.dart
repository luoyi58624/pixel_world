import 'dart:convert';
import 'dart:io';

import 'package:pixel_world/core/time/game_clock.dart';
import 'package:pixel_world/core/config/game_config.dart';
import 'package:pixel_world/features/campaign/data/campaign_setup.dart';
import 'package:pixel_world/features/campaign/domain/campaign.dart';
import 'package:pixel_world/features/heroes/data/rom_hero.dart';
import 'package:pixel_world/features/world_map/domain/world_data.dart';
import 'package:pixel_world/features/ai/budget.dart';
import 'package:pixel_world/features/ai/country_brain.dart';
import 'package:pixel_world/features/ai/combat_assessment.dart';
import 'package:pixel_world/features/ai/protocol.dart';
import 'package:pixel_world/features/ai/raid_assessment.dart';
import 'package:pixel_world/features/ai/routes.dart';
import 'package:pixel_world/features/ai/work_budget.dart';
import 'package:pixel_world/features/ai/runtime/worker.dart';
import 'package:pixel_world/features/ai/runtime/testing_worker.dart';
import 'package:pixel_world/simulation/scheduling_audit.dart';

/// 读取存档副本审计各国调度；可按正式规则续跑，输出不会覆盖输入存档。
Future<void> main(List<String> args) async {
  if (args.length < 3 || args.contains('--help')) {
    stdout.writeln(
      '用法：dart run tool/inspect_campaign_ai.dart <checkpoint.json> <label> <游戏秒数> [native] [realtime]',
    );
    stdout.writeln(
      '秒数为 0 只检查各国状态；native 使用常驻后台，realtime 按真实 16 倍速推进。结果保存在 build/national_ai/<label>/。',
    );
    return;
  }
  final checkpointPath = args.first;
  args = args.sublist(1);

  final label = args[0],
      seconds = int.parse(args[1]),
      native = args.contains('native');
  if (!RegExp(r'^[a-zA-Z0-9_-]+$').hasMatch(label) || seconds < 0) {
    throw ArgumentError('label 只能包含字母、数字、下划线和横线，秒数不能为负');
  }
  final folder = Directory('build/national_ai/$label');
  if (folder.existsSync()) throw StateError('保留旧结果，请换目录');
  folder.createSync(recursive: true);
  GameConfig.loadJson(File('assets/data/game_config.json5').readAsStringSync());
  final checkpoint = jsonDecode(File(checkpointPath).readAsStringSync());
  final data = Map<String, dynamic>.from(checkpoint['campaign'] ?? checkpoint)
    ..['paused'] = false;
  final world = decodeWorlds(
    File('assets/maps/worlds.json').readAsStringSync(),
    setup: CampaignSetup.decode(
      File('assets/data/campaign_config.json5').readAsStringSync(),
    ),
  ).firstWhere((w) => w.id == data['world']);
  final c = CampaignSnapshots.restore(
    data,
    world,
    decodeRomHeroes(File('assets/data/heroes.json5').readAsStringSync()),
    aiWorkerFactory: native ? createAiWorker : SynchronousAiWorker.new,
  );
  final countries =
      c.cities.values.map((c) => c.ownerCountryId).toSet().toList()..sort();
  final sink = File('${folder.path}/events.jsonl').openWrite();
  final positions = File('${folder.path}/positions.jsonl').openWrite();
  final capturedFormations = <String>{};
  final peakFormations = <String, int>{};
  final counts = <String, int>{};
  var issueFiles = 0;
  final audit = SchedulingAudit(
    onIssue: (issue) {
      if (++issueFiles <= 12) {
        File('${folder.path}/issue$issueFiles.json').writeAsStringSync(
          jsonEncode({'issue': issue, 'campaign': c.saveState()}),
        );
      }
    },
  );
  for (final id in [null, ...countries]) {
    c.events.forCountry(id).listen((e) {
      audit.event(c, e);
      sink.writeln(e.toJsonLine());
      counts.update(
        '${e.countryId}:${e.kind.name}',
        (v) => v + 1,
        ifAbsent: () => 1,
      );
    });
  }
  Map<String, Object?> snapshot() => {
    'date': '${c.settledMonths ~/ 12 + 1}年${c.settledMonths % 12 + 1}月',
    'countries': [
      for (final id in countries)
        {
          'id': id,
          'gold': c.goldFor(id),
          'reserves': c.reserveSoldiersFor(id),
          'capacity': c.reserveCapacityFor(id),
          'cities': {
            for (final city in c.world.cities)
              if (c.cities[city.id]!.ownerCountryId == id)
                '${city.id}': [
                  for (final h in c.garrisonAt(city.id))
                    {
                      'id': h.id,
                      'name': h.name,
                      'combat': h.combat,
                      'hp': h.hp,
                    },
                ],
          },
          'marches': [
            for (final m in c.marches.values)
              if (m.hero.countryId == id)
                {
                  'id': m.hero.id,
                  'name': m.hero.name,
                  'home': m.hero.cityId,
                  'target': m.target?.id,
                  'phase': m.phase.name,
                  'pending': m.waitingForDeparture,
                  'blocked': m.waitingForTraffic,
                  'returning': m.returningFromRetreat,
                  'position': [m.position.dx, m.position.dy],
                  'destination': [m.destination.dx, m.destination.dy],
                  'siegeRing': m.siegeRing,
                  'siegeSlot': m.siegeSlotIndex,
                  'queueOrder': m.siegeQueueOrder,
                  'waitingForSiege': m.waitingForSiegePosition,
                },
          ],
          'tasks': [
            for (final t in c.aiTasks.values)
              if (c.heroes.any((h) => h.id == t.hero && h.countryId == id))
                t.toJson(),
          ],
        },
    ],
  };
  final initial = snapshot();
  final audits = <Object>[];
  for (final id in countries) {
    final view = c.aiObservationFor(id),
        rules = c.aiRulesForTesting(),
        map = c.aiMapForTesting();
    final tasks = c.aiTasks.values
        .where((t) => view.hero(t.hero)?.country == id)
        .toList();
    final ledger = AiLedger(
      view,
      rules,
      AiRoutes(map, rules, AiWorkBudget(rules.tuning)),
      tasks: tasks,
    );
    final cityRows = <Object>[];
    for (final city in view.owned) {
      final heroRows = <Object>[];
      for (final hero in view.garrison(city.id)) {
        final targets = <Object>[];
        for (final enemy in view.cities.where((x) => x.country != id)) {
          final work = AiWorkBudget(rules.tuning),
              route = AiRoutes(
                map,
                rules,
                AiWorkBudget(rules.tuning),
              ).to(hero, enemy.center, view, target: enemy);
          final raid = assessRaid(
            hero,
            enemy,
            view,
            rules,
            CombatAssessor(rules, work),
          );
          targets.add({
            'city': enemy.id,
            'team': raid.teamSize,
            'lower': raid.lower,
            'upper': raid.upper,
            'attrition': raid.breakthrough,
            'route': route.complete,
            'seconds': route.seconds.isFinite ? route.seconds : null,
          });
        }
        heroRows.add({
          'id': hero.id,
          'name': c.heroes.firstWhere((h) => h.id == hero.id).name,
          'combat': hero.combat,
          'politics': hero.politics,
          'hp': hero.hp,
          'canDispatch': hero.canDispatch,
          'dispatchBlockedBy': c.dispatchBlockReason(
            c.heroes.firstWhere((h) => h.id == hero.id),
            countryId: id,
          ),
          'canSpare': ledger.canSpareForOffense(hero),
          'targets': targets,
        });
      }
      cityRows.add({
        'city': city.id,
        'rear': ledger.safeRear(city),
        'keep': ledger.defendersToKeep(city),
        'heroes': heroRows,
      });
    }
    final plan = c.warPlanFor(id);
    final brain = CountryBrain(
      rules,
      map,
      AiRequest(
        session: 'audit',
        id: 1,
        rulesVersion: rules.version,
        mapVersion: map.version,
        observation: view,
        deadlineTick: view.tick + 9999,
        stage: AiDecisionStage.attack,
        tasks: tasks,
        offensiveCountry: plan?.offensiveCountryId,
        offensiveCity: plan?.offensiveCityId,
      ),
    );
    for (final _ in brain.steps()) {}
    audits.add({
      'country': id,
      'cities': cityRows,
      'field': [
        for (final h in view.heroes)
          if (h.country == id && !h.stationed)
            {
              'hero': h.toJson(),
              'moveProblem': c.moveBlockReason(h.id, countryId: id),
              'battle': c.activeBattleForHero(h.id)?.isActive,
            },
      ],
      'plan': brain.result!.toJson(),
    });
    stdout.writeln(
      jsonEncode({
        'auditCountry': id,
        'heroes': view.heroes.where((h) => h.country == id).length,
        'plan': brain.result!.toJson(),
      }),
    );
  }
  File('${folder.path}/audit.json').writeAsStringSync(jsonEncode(audits));
  File('${folder.path}/initial.json').writeAsStringSync(jsonEncode(initial));
  final watch = Stopwatch()..start();
  var nextSample = 0;
  final realtime = args.contains('realtime'), clock = GameClock()..speed = 16;
  for (var tick = 0; tick < seconds * 60 && !c.defeated; tick += 16) {
    if (realtime) {
      clock.advance(1 / 60, c.advance);
    } else {
      c.advance(16 / 60);
    }
    if (tick >= nextSample) {
      positions.writeln(
        jsonEncode({
          'second': (data['strategyTime'] as num).toDouble() + (tick + 16) / 60,
          'cities': [
            for (final city in c.world.cities)
              {
                'id': city.id,
                'owner': c.cities[city.id]!.ownerCountryId,
                'level': c.cities[city.id]!.level,
                'center': [
                  c.cityBounds(city).center.dx,
                  c.cityBounds(city).center.dy,
                ],
                'attacker': c.battles[city.id]?.isActive == true
                    ? c.battles[city.id]!.attacker.id
                    : null,
              },
          ],
          'marches': [
            for (final m in c.marches.values)
              {
                'hero': m.hero.id,
                'country': m.hero.countryId,
                'target': m.target?.id,
                'position': [m.position.dx, m.position.dy],
                'destination': [m.destination.dx, m.destination.dy],
                'phase': m.phase.name,
                'ring': m.siegeRing,
                'slot': m.siegeSlotIndex,
                'queue': m.siegeQueueOrder,
                'pending': m.waitingForDeparture,
                'returning': m.returningFromRetreat,
              },
          ],
        }),
      );
      audit.sample(
        c,
        (data['strategyTime'] as num).toDouble() + (tick + 16) / 60,
      );
      // 保存首次实际闭合的原始状态，供正式地图绘制器复核贴格效果。
      for (final city in c.world.cities) {
        for (final country in countries) {
          final key = '${city.id}_$country';
          final arrived = c.marches.values
              .where(
                (m) =>
                    m.hero.countryId == country &&
                    m.target?.id == city.id &&
                    m.waitingForSiegePosition &&
                    m.visibleOnMap &&
                    (m.position - m.destination).distance < 1e-5,
              )
              .length;
          if (arrived >= 2 && arrived > (peakFormations[key] ?? 0)) {
            peakFormations[key] = arrived;
            File('${folder.path}/formation_peak_$key.json')
                .writeAsStringSync(jsonEncode(c.saveState()));
          }
          if (!capturedFormations.contains(key) &&
              c.isCityEncircled(city.id, countryId: country)) {
            capturedFormations.add(key);
            File('${folder.path}/encircled_$key.json')
                .writeAsStringSync(jsonEncode(c.saveState()));
          }
        }
      }
      nextSample += 60;
    }
    if (realtime) {
      await Future<void>.delayed(const Duration(microseconds: 16667));
    }
    if (native && !realtime) {
      for (var w = 0; c.pendingAiRequests > 0 && w < 200; w++) {
        await Future<void>.delayed(const Duration(milliseconds: 1));
        c.advance(0);
      }
      await Future<void>.delayed(Duration.zero);
    }
    if (tick % 3600 == 0) {
      stdout.writeln(
        jsonEncode({
          'second': tick ~/ 60,
          'events': counts,
          'marches': c.marches.length,
        }),
      );
    }
  }
  final finalState = c.saveState();
  final actualSeconds =
      (finalState['strategyTime'] as num) - (data['strategyTime'] as num);
  final result = {
    'requestedSeconds': seconds,
    'seconds': actualSeconds,
    'wallMs': watch.elapsedMilliseconds,
    'counts': counts,
    'final': snapshot(),
    'diagnostics': c.aiDiagnostics.toJson(),
    'schedulingAudit': audit.toJson(),
  };
  File('${folder.path}/result.json').writeAsStringSync(jsonEncode(result));
  File('${folder.path}/final_checkpoint.json')
      .writeAsStringSync(jsonEncode(finalState));
  stdout.writeln(
    jsonEncode({
      'done': label,
      'seconds': actualSeconds,
      'counts': counts,
      'wallMs': watch.elapsedMilliseconds,
    }),
  );
  c.dispose();
  await sink.close();
  await positions.close();
}
