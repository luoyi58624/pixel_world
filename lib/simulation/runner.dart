import 'dart:convert';
import 'dart:math' as math;

import '../core/time/game_clock.dart';
import '../features/ai/runtime/worker.dart';
import '../features/campaign/domain/campaign.dart';
import '../features/events/domain/game_events.dart';
import '../features/heroes/data/rom_hero.dart';
import '../features/weapons/domain/weapon.dart';
import '../features/world_map/domain/world_data.dart';
import 'scenario.dart';

/// 纯数据战役验收器：运行真实规则，不创建 Widget、画布或窗口。
class SimulationRunner {
  /// 后端须显式注入；确定性测试后端由命令行测试入口选择。
  SimulationRunner({
    required this.world,
    required this.heroes,
    required this.weapons,
    required this.aiWorkerFactory,
  });

  /// 本组静态数据。
  final WorldDefinition world;
  final List<RomHeroDefinition> heroes;
  final WeaponCatalog weapons;

  /// AI 执行后端。
  final AiWorker Function() aiWorkerFactory;

  /// 在独立运行中记录国力、调度冲突、资源和战果，日志不反馈给决策器。
  Future<Map<String, Object?>> run(
    SimulationScenario scenario, {
    void Function(GameEvent)? onEvent,
  }) async {
    if (scenario.worldId != world.id || scenario.seconds <= 0) {
      throw ArgumentError('模拟地图必须匹配，时长必须大于零');
    }
    final stopwatch = Stopwatch()..start();
    var tick = 0, unsafe = 0, invalidResources = 0, duplicateHeroes = 0;
    var unified = false;
    int? protagonistFellAt;
    final protagonist = heroes
        .where((h) => h.type == HeroType.protagonist)
        .firstOrNull;
    var captures = 0, losses = 0, rapidRedirects = 0, haltedSeconds = 0;
    final lastRedirect = <String, int>{};
    final deployed = <int, Set<String>>{};
    final dispatched = <int, int>{},
        countryCaptures = <int, int>{},
        deaths = <int, int>{};
    final eliminatedAt = <int, int>{}, killedHeroes = <String>{};
    final samples = <Map<String, Object?>>[];
    final conflicts = <Map<String, Object?>>[];
    final rejectedPlans = <Map<String, Object?>>[];
    final eventLog = CampaignEvents(
      worldId: world.id,
      runId: 'simulation-${world.id}-${scenario.seed}',
      onEvent: (event) {
        onEvent?.call(event);
        final country = event.countryId;
        if (event.heroId == 'rom-${protagonist?.id}' &&
            [
              GameEventKind.heroDied,
              GameEventKind.heroDisbanded,
            ].contains(event.kind)) {
          protagonistFellAt ??= event.tick ~/ 60;
        }
        if (event.kind == GameEventKind.planRejected &&
            rejectedPlans.length < 20) {
          rejectedPlans.add({
            'tick': event.tick,
            'country': country,
            'reason': event.reason,
          });
        }
        if (event.kind == GameEventKind.heroDispatched && country != null) {
          deployed.putIfAbsent(country, () => {}).add(event.heroId!);
          dispatched.update(country, (n) => n + 1, ifAbsent: () => 1);
        }
        if (event.kind == GameEventKind.cityCaptured && country != null) {
          captures++;
          countryCaptures.update(country, (n) => n + 1, ifAbsent: () => 1);
        }
        if (event.kind == GameEventKind.heroDied && country != null) {
          losses++;
          deaths.update(country, (n) => n + 1, ifAbsent: () => 1);
          if (event.heroId != null) killedHeroes.add(event.heroId!);
        }
        if ((event.kind == GameEventKind.taskAssigned ||
                event.kind == GameEventKind.taskReplaced) &&
            event.heroId != null) {
          final previous = lastRedirect[event.heroId!];
          if (event.kind == GameEventKind.taskReplaced &&
              previous != null &&
              event.tick - previous < 7 * 60) {
            rapidRedirects++;
            if (conflicts.length < 40) {
              conflicts.add({
                'tick': event.tick,
                'country': country,
                'hero': event.heroName,
                'event': event.summary,
                'reason': event.reason,
              });
            }
          }
          lastRedirect[event.heroId!] = event.tick;
        }
      },
    );
    final c = CampaignState.fromRom(
      world,
      heroes,
      weaponCatalog: weapons,
      aiWorkerFactory: aiWorkerFactory,
      aiControlsPlayer: true,
      endOnPlayerDefeat: false,
      aiRandom: math.Random(scenario.seed),
      economyRandom: math.Random(scenario.seed + 10),
      recruitmentRandom: math.Random(scenario.seed + 20),
      siegeRandom: math.Random(scenario.seed + 30),
      retreatRandom: math.Random(scenario.seed + 40),
      weaponRandom: math.Random(scenario.seed + 50),
      eventLog: eventLog,
    );
    final countries =
        c.cities.values.map((city) => city.ownerCountryId).toSet().toList()
          ..sort();
    Map<String, Object?> state(int id) => {
      'country': id,
      'name': world.countryName(id),
      'gold': c.goldFor(id),
      'cities': c.cities.values
          .where((city) => city.ownerCountryId == id)
          .length,
      'levels': c.cities.values
          .where((city) => city.ownerCountryId == id)
          .fold<int>(0, (n, city) => n + city.level),
      'heroes': c.heroes.where((hero) => hero.countryId == id).length,
      'reserves': c.reserveSoldiersFor(id),
      'capacity': c.reserveCapacityFor(id),
      'heroStrength': c.heroes
          .where((h) => h.countryId == id)
          .fold<double>(
            0.0,
            (n, h) => n + h.maxHp * .5 + h.combat * 3 + h.politics,
          ),
    };
    final initial = [for (final id in countries) state(id)];
    final clock = GameClock()..speed = scenario.speed;
    final maxTicks = scenario.seconds * 60;
    try {
      while (tick < maxTicks && !unified) {
        final realStep = math.min(
          1 / 60,
          (maxTicks - tick) / 60 / scenario.speed,
        );
        clock.advance(realStep, (dt) {
          if (tick >= maxTicks || unified) return;
          c.advance(dt);
          tick++;
          unified =
              c.cities.values
                  .map((city) => city.ownerCountryId)
                  .toSet()
                  .length ==
              1;
          if (tick % 60 != 0) return;
          final ids = c.heroes.map((h) => h.id).toSet();
          if (ids.length != c.heroes.length) duplicateHeroes++;
          for (final country in countries) {
            if (c.goldFor(country) < 0 ||
                c.reserveSoldiersFor(country) < 0 ||
                c.reserveSoldiersFor(country) > c.reserveCapacityFor(country)) {
              invalidResources++;
            }
            if (!c.cities.values.any(
              (city) => city.ownerCountryId == country,
            )) {
              eliminatedAt.putIfAbsent(country, () => tick ~/ 60);
            }
          }
          for (final march in c.marches.values) {
            if (march.supplyHalted) haltedSeconds++;
          }
          for (final battle in c.battles.values.where((b) => b.isActive)) {
            final count = c
                .garrisonAt(battle.city.id)
                .where((h) => h.health.alive)
                .length;
            if (count > battle.initialCityLevel - battle.victories) unsafe++;
          }
          if (tick % (30 * 60) == 0) {
            samples.add({
              'second': tick ~/ 60,
              'countries': [for (final id in countries) state(id)],
            });
          }
        });
        if (!scenario.deterministic) {
          final wait = Stopwatch()..start();
          while (c.pendingAiRequests > 0 && wait.elapsedMilliseconds < 5000) {
            await Future<void>.delayed(const Duration(milliseconds: 1));
          }
        } else if (tick % (16 * 60) == 0) {
          await Future<void>.delayed(Duration.zero);
        }
      }
      final finalStates = [
        for (final id in countries)
          {
            ...state(id),
            'eliminatedAt': eliminatedAt[id],
            'uniqueDeployments': deployed[id]?.length ?? 0,
            'dispatches': dispatched[id] ?? 0,
            'captures': countryCaptures[id] ?? 0,
            'deaths': deaths[id] ?? 0,
          },
      ];
      final remaining = c.cities.values
          .map((city) => city.ownerCountryId)
          .toSet();
      final signature = jsonEncode({
        'tick': tick,
        'countries': finalStates,
        'cities': {
          for (final e in c.cities.entries)
            '${e.key}': [e.value.ownerCountryId, e.value.level],
        },
        'heroes': [
          for (final h in c.heroes)
            [
              h.id,
              h.countryId,
              h.cityId,
              h.hp,
              h.soldiers,
              h.weaponIds,
              if (c.marches[h.id] != null)
                [c.marches[h.id]!.position.dx, c.marches[h.id]!.position.dy],
            ],
        ],
      });
      return {
        'world': world.id,
        'seed': scenario.seed,
        'speed': scenario.speed,
        'backend': scenario.deterministic
            ? 'deterministic-test'
            : 'native-lockstep',
        'gameSeconds': tick / 60,
        'wallMilliseconds': stopwatch.elapsedMilliseconds,
        'winner': remaining.length == 1 ? remaining.single : null,
        'protagonistAlive':
            protagonist != null &&
            c.heroes.any((h) => h.sourceId == protagonist.id && h.health.alive),
        'protagonistFellAt': protagonistFellAt,
        'initial': initial,
        'final': finalStates,
        'captures': captures,
        'heroDeaths': losses,
        'duplicateHeroSamples': duplicateHeroes,
        'invalidResourceSamples': invalidResources,
        'unsafeSiegeSamples': unsafe,
        'haltedArmySeconds': haltedSeconds,
        'rapidTaskReplacements': rapidRedirects,
        'conflicts': conflicts,
        'rejectedPlans': rejectedPlans,
        'samples': samples,
        'signature': signature,
        'commands': c.aiDiagnostics.commands,
        'rejected': c.aiDiagnostics.rejected,
      };
    } finally {
      c.dispose();
    }
  }
}
