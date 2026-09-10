part of 'game_events.dart';

Map<String, dynamic> _saveEvents(CampaignEvents log) => {
  'world': log.worldId,
  'run': log.runId,
  'sequence': log._sequence,
  'capacity': log.capacityPerCountry,
  'enabled': log.enabled,
  'countries': {
    for (final e in log._countries.entries)
      '${e.key}': {
        'counts': [
          e.value._total,
          e.value._dropped,
          e.value._decisionTotal,
          e.value._decisionDropped,
          e.value._timelineTotal,
        ],
        'events': {
          for (final v in {
            ...e.value._events,
            ...e.value._decisions,
            ...e.value._timeline,
          })
            '${v.sequence}': v.toJson(),
        },
        'recent': e.value._events.map((v) => v.sequence).toList(),
        'decisions': e.value._decisions.map((v) => v.sequence).toList(),
        'timeline': e.value._timeline.map((v) => v.sequence).toList(),
      },
  },
};

CampaignEvents _restoreEvents(Map<String, dynamic> d) {
  final log = CampaignEvents(
    worldId: d['world'],
    runId: d['run'],
    capacityPerCountry: d['capacity'],
    enabled: d['enabled'],
  ).._sequence = d['sequence'];
  for (final entry in (d['countries'] as Map).entries) {
    final id = int.parse(entry.key), v = entry.value;
    final country = log.forCountry(id == -1 ? null : id);
    final events = <int, GameEvent>{};
    for (final e in (v['events'] as Map).values) {
      final event = GameEvent._(
        runId: e['runId'],
        worldId: e['worldId'],
        sequence: e['sequence'],
        countrySequence: e['countrySequence'],
        decisionSequence: e['decisionSequence'],
        tick: e['tick'],
        year: e['year'],
        month: e['month'],
        kind: GameEventKind.values.byName(e['kind']),
        source: GameEventSource.values.byName(e['source']),
        phase: GameEventPhase.values.byName(e['phase']),
        summary: e['summary'],
        countryId: e['countryId'],
        countryName: e['countryName'],
        targetCountryId: e['targetCountryId'],
        heroId: e['heroId'],
        heroName: e['heroName'],
        cityId: e['cityId'],
        cityName: e['cityName'],
        decisionId: e['decisionId'],
        reason: e['reason'],
        data: Map<String, Object?>.from(e['data']),
      );
      events[event.sequence] = event;
    }
    country._events.addAll([for (final i in v['recent']) events[i]!]);
    country._decisions.addAll([for (final i in v['decisions']) events[i]!]);
    country._timeline.addAll([for (final i in v['timeline']) events[i]!]);
    country._total = v['counts'][0];
    country._dropped = v['counts'][1];
    country._decisionTotal = v['counts'][2];
    country._decisionDropped = v['counts'][3];
    country._timelineTotal = v['counts'][4];
  }
  return log;
}
