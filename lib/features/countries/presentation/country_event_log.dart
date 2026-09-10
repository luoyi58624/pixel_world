import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../../events/domain/game_events.dart';
import '../../cities/presentation/city_panel_style.dart';

/// 国家面板的事件页，仅订阅该国记录，不轮询，也不推进游戏。
class CountryEventLogView extends StatefulWidget {
  /// 同国多城共享同一个日志对象。
  const CountryEventLogView({super.key, required this.log});

  /// 当前国家独立日志。
  final CountryEventLog log;
  @override
  State<CountryEventLogView> createState() => _CountryEventLogViewState();
}

class _CountryEventLogViewState extends State<CountryEventLogView> {
  void Function()? _unsubscribe;
  @override
  void initState() {
    super.initState();
    _listen();
  }

  void _listen() {
    _unsubscribe?.call();
    _unsubscribe = widget.log.listen((event) {
      if (mounted && event.isFinalDecision) setState(() {});
    });
  }

  @override
  void didUpdateWidget(covariant CountryEventLogView oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (!identical(oldWidget.log, widget.log)) {
      _listen();
    }
  }

  @override
  void dispose() {
    _unsubscribe?.call();
    super.dispose();
  }

  Future<void> _copy() async {
    await Clipboard.setData(
      ClipboardData(text: widget.log.exportDecisionsJsonLines()),
    );
    if (mounted) {
      ScaffoldMessenger.of(context)
          .showSnackBar(const SnackBar(content: Text('已复制该国最终决策日志')));
    }
  }

  @override
  Widget build(BuildContext context) {
    final events = widget.log.finalDecisions(newestFirst: true, limit: 200);
    return Material(
      color: Colors.transparent,
      child: Column(
        key: const ValueKey('country-event-log'),
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 8, 8, 0),
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    '最终决策 ${widget.log.decisionCount} 条',
                    style: CityPanelStyle.label,
                  ),
                ),
                TextButton.icon(
                  key: const ValueKey('copy-country-events'),
                  onPressed: widget.log.retainedDecisionCount == 0
                      ? null
                      : _copy,
                  icon: const Icon(Icons.copy, size: 14),
                  label: const Text('复制日志', style: TextStyle(fontSize: 12)),
                ),
              ],
            ),
          ),
          if (widget.log.droppedDecisionCount > 0)
            Padding(
              padding: const EdgeInsets.fromLTRB(16, 6, 16, 0),
              child: Text(
                '较早的 ${widget.log.droppedDecisionCount} 条决策已移出内存',
                style: CityPanelStyle.label,
              ),
            ),
          const SizedBox(height: 8),
          Expanded(
            child: events.isEmpty
                ? Center(
                    child: Text('该国暂无最终 AI 决策', style: CityPanelStyle.label),
                  )
                : ListView.builder(
                    key: ValueKey('country-events-${widget.log.countryId}'),
                    padding: const EdgeInsets.fromLTRB(8, 0, 8, 12),
                    itemCount: events.length,
                    itemBuilder: (context, index) {
                      final event = events[index];
                      final color = event.phase == GameEventPhase.rejected
                          ? const Color(0xffef9993)
                          : CityPanelStyle.gold;
                      return ExpansionTile(
                        key: ValueKey('event-${event.runId}-${event.sequence}'),
                        tilePadding: const EdgeInsets.symmetric(horizontal: 8),
                        childrenPadding: const EdgeInsets.fromLTRB(8, 0, 8, 12),
                        iconColor: color,
                        collapsedIconColor: CityPanelStyle.muted,
                        title: Text(
                          event.summary,
                          style: const TextStyle(
                            color: CityPanelStyle.ink,
                            fontSize: 12,
                            height: 1.45,
                          ),
                        ),
                        subtitle: Padding(
                          padding: const EdgeInsets.only(top: 4),
                          child: Text(
                            '${event.timeLabel} · ${event.kind.label}${event.data['result'] == 'partial'
                                ? ' · 部分完成'
                                : event.phase == GameEventPhase.rejected
                                ? ' · 未执行'
                                : ''}',
                            style: TextStyle(color: color, fontSize: 10),
                          ),
                        ),
                        children: [
                          if (event.reason?.isNotEmpty == true)
                            Align(
                              alignment: Alignment.centerLeft,
                              child: Padding(
                                padding: const EdgeInsets.only(bottom: 8),
                                child: Text(
                                  '原因：${event.reason}',
                                  style: CityPanelStyle.label,
                                ),
                              ),
                            ),
                          Align(
                            alignment: Alignment.centerLeft,
                            child: SelectableText(
                              const JsonEncoder.withIndent('  ')
                                  .convert(event.toJson()),
                              style: const TextStyle(
                                color: CityPanelStyle.muted,
                                fontSize: 10,
                                height: 1.4,
                              ),
                            ),
                          ),
                        ],
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
