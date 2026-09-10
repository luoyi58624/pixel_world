// 同库扩展拆分界面会话逻辑，setState 仍只操作当前 State。

part of 'world_screen.dart';

extension _WorldSession on _WorldScreenState {
  Future<void> _openSession(WorldController controller) async {
    final archive = widget.archive;
    if (archive == null) return;
    final sources = await Future.wait([
      for (final path in [
        'assets/maps/worlds.json',
        'assets/data/rom_heroes.json',
        'assets/data/campaign_config.json',
        'assets/data/rom_weapons.json',
      ])
        rootBundle.loadString(path, cache: false),
    ]);
    final signature = sha256
        .convert(utf8.encode(jsonEncode([aiBuildStamp, ...sources])))
        .toString();
    final entry = widget.entry;
    if (entry != null) {
      if (entry.data['version'] != 1 || entry.data['signature'] != signature) {
        throw const FormatException('这份记录的游戏版本或地图配置已改变，无法安全读取。原记录仍然保留。');
      }
      if (widget.replay) {
        _reader = ReplayReader(archive, entry);
        final state = await _reader!.seek(0);
        controller.restoreState(state, replay: true);
        _showMinimap = state['minimap'] as bool? ?? true;
        return;
      }
      final state = await archive.resume(entry);
      controller.restoreState(state);
      _showMinimap = state['minimap'] as bool? ?? true;
    }
    _recording = SessionRecording(
      archive,
      mapIndex: controller.index,
      signature: signature,
      previous: entry,
    );
    _recording!.capture({
      ...controller.saveState(replay: true),
      'minimap': _showMinimap,
    });
    _recording!.checkpoint({
      ...controller.saveState(),
      'minimap': _showMinimap,
    });
    await _recording!.flush();
    // 按真实时间每十秒保存，暂停时也保存最近的进度；退出另行等待保存完成。
    _saveTimer = Timer.periodic(
      const Duration(seconds: 10),
      (_) => unawaited(_flushSession()),
    );
  }

  bool _captureSession() {
    final c = _controller;
    if (_recording == null || c == null || widget.replay) return true;
    try {
      _recording!.capture({
        ...c.saveState(replay: true),
        'minimap': _showMinimap,
      });
      return true;
    } catch (error) {
      if (mounted) _sessionChanged(() => _saveError = error);
      c.setPaused(true);
      return false;
    }
  }

  void _tickRecording(double delta) {
    if (_recording == null || !delta.isFinite || delta < 0 || _leaving) return;
    _recording!.elapsed += delta;
    _recordFraction += delta;
    if (_recordFraction >= .1) {
      _recordFraction %= .1;
      _captureSession();
    }
  }

  Future<bool> _flushSession() async {
    if (_recording == null) return true;
    try {
      _captureSession();
      _recording!.checkpoint({
        ..._controller!.saveState(),
        'minimap': _showMinimap,
      });
      await _recording!.flush();
      if (mounted && _saveError != null) {
        _sessionChanged(() => _saveError = null);
      }
      return true;
    } catch (error) {
      if (mounted) _sessionChanged(() => _saveError = error);
      _controller?.setPaused(true);
      return false;
    }
  }

  Future<void> _saveReplay() async {
    if (_savingReplay || _recording == null) return;
    _sessionChanged(() => _savingReplay = true);
    if (!_captureSession()) {
      _sessionChanged(() => _savingReplay = false);
      return;
    }
    try {
      _recording!.checkpoint({
        ..._controller!.saveState(),
        'minimap': _showMinimap,
      });
      await _recording!.saveReplay();
      if (mounted) {
        ScaffoldMessenger.of(context)
            .showSnackBar(const SnackBar(content: Text('回放已保存，可返回主页面观看')));
      }
    } catch (error) {
      if (mounted) _sessionChanged(() => _saveError = error);
    } finally {
      if (mounted) _sessionChanged(() => _savingReplay = false);
    }
  }

  Future<void> _exitSession() async {
    if (_leaving || widget.onHome == null) return;
    if (_controller == null) {
      widget.onHome!();
      return;
    }
    _sessionChanged(() => _leaving = true);
    _ticker?.stop();
    // 不调用关闭面板，避免退出时顺带放弃待签约英雄或待确认命令。
    _pressed.clear();
    _controller?.keyboardDirection = GamePoint.zero;
    final captured = _captureSession();
    if (!widget.replay && (!captured || !await _flushSession())) {
      if (mounted) {
        _sessionChanged(() => _leaving = false);
        _syncTicker();
      }
      return;
    }
    if (!mounted) return;
    _saveTimer?.cancel();
    ScaffoldMessenger.of(context).hideCurrentSnackBar();
    _controller?.campaign.pauseAi();
    widget.onHome!();
  }

  Future<void> _restartSession() async {
    if (_leaving || widget.replay) return;
    if (_recording == null) {
      _action(() => _controller!.restartCampaign());
      return;
    }
    _sessionChanged(() => _leaving = true);
    _ticker?.stop();
    if (!_captureSession() || !await _flushSession()) {
      if (mounted) {
        _sessionChanged(() => _leaving = false);
        _syncTicker();
      }
      return;
    }
    if (!mounted) return;
    final previous = _recording!;
    _controller!.restartCampaign();
    _recording = SessionRecording(
      previous.archive,
      mapIndex: _controller!.index,
      signature: previous.signature,
    );
    _recordFraction = 0;
    _captureSession();
    await _flushSession();
    if (mounted) {
      _sessionChanged(() => _leaving = false);
      _syncTicker();
    }
  }

  void _tickReplay(double delta) {
    if (!_replayPlaying || _seeking || _leaving || !delta.isFinite) return;
    _playhead = (_playhead + delta * _replaySpeed).clamp(
      0.0,
      widget.entry!.duration,
    );
    _replayFraction += delta;
    if (_replayFraction >= .1 || _playhead == widget.entry!.duration) {
      _replayFraction = 0;
      unawaited(_seekReplay(_playhead));
    }
    if (_playhead >= widget.entry!.duration) _replayPlaying = false;
  }

  Future<void> _seekReplay(double seconds) async {
    final version = ++_seekVersion;
    _sessionChanged(() {
      _seeking = true;
      _playhead = seconds;
    });
    try {
      final snapshot = await _reader!.seek(seconds);
      if (!mounted || version != _seekVersion) return;
      _controller!.restoreState(snapshot, replay: true);
      _sessionChanged(() {
        _showMinimap = snapshot['minimap'] as bool? ?? true;
        _saveError = null;
      });
    } catch (error) {
      if (mounted && version == _seekVersion) {
        _sessionChanged(() {
          _saveError = error;
          _replayPlaying = false;
        });
      }
    } finally {
      if (mounted && version == _seekVersion) {
        _sessionChanged(() => _seeking = false);
      }
    }
  }

  Widget _mobileButton(
    String key,
    String label,
    Widget icon,
    VoidCallback? action,
  ) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 3),
    child: Material(
      color: _ink.withValues(alpha: .85),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
        side: const BorderSide(color: _line),
      ),
      child: SizedBox(
        width: 44,
        height: 44,
        child: IconButton(
          key: ValueKey(key),
          tooltip: label,
          onPressed: _leaving ? null : action,
          icon: icon,
          color: _gold,
          iconSize: 21,
        ),
      ),
    ),
  );

  Widget _mobileControls() => Column(
    key: const ValueKey('mobile-controls'),
    mainAxisSize: MainAxisSize.min,
    children: [
      if (_saveError != null)
        _mobileButton(
          'save-error',
          '保存失败，点击重试',
          const Icon(Icons.error_outline, color: Colors.orangeAccent),
          () {
            if (widget.replay) {
              _seekReplay(_playhead);
            } else {
              _flushSession();
            }
          },
        ),
      if (_controller != null)
        _mobileButton(
          'game-settings',
          '设置',
          const Icon(Icons.settings_outlined),
          _settings,
        ),
      if (widget.onHome != null)
        _mobileButton(
          'exit-game',
          '退出游戏',
          const Icon(Icons.home_outlined),
          _confirmExit,
        ),
    ],
  );

  Widget _sessionMenu() => PopupMenuButton<String>(
    key: const ValueKey('session-menu'),
    tooltip: '游戏菜单',
    enabled: !_leaving,
    popUpAnimationStyle: AnimationStyle.noAnimation,
    icon: const Icon(Icons.more_vert, color: _gold),
    onSelected: (value) {
      if (value == 'settings') {
        _settings();
      } else {
        _confirmExit();
      }
    },
    itemBuilder: (_) => [
      if (_controller != null)
        const PopupMenuItem(
          value: 'settings',
          key: ValueKey('game-settings'),
          child: Text('设置'),
        ),
      if (widget.onHome != null)
        const PopupMenuItem(
          value: 'exit',
          key: ValueKey('exit-game'),
          child: Text('退出游戏'),
        ),
    ],
  );

  Future<void> _confirmExit() async {
    if (_leaving || _confirmingExit) return;
    if (_controller == null) {
      await _exitSession();
      return;
    }
    _confirmingExit = true;
    _ticker?.stop();
    _clearKeys();
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('退出游戏？'),
        content: Text(
          widget.replay ? '返回主页面，已保存的回放不会改变。' : '当前进度会自动保存，之后可在主页面继续游戏。',
        ),
        actions: [
          TextButton(
            key: const ValueKey('cancel-exit'),
            onPressed: () => Navigator.pop(context, false),
            child: const Text('取消'),
          ),
          FilledButton(
            key: const ValueKey('confirm-exit'),
            onPressed: () => Navigator.pop(context, true),
            child: const Text('确认退出'),
          ),
        ],
      ),
    );
    if (!mounted) return;
    _confirmingExit = false;
    if (confirmed == true) {
      await _exitSession();
    } else {
      _syncTicker();
      _focus.requestFocus();
    }
  }

  void _openSettings() {
    _clearKeys();
    final c = _controller!;
    showDialog<void>(
      context: context,
      builder: (dialogContext) => StatefulBuilder(
        builder: (context, setDialogState) => AlertDialog(
          title: const Text('设置'),
          scrollable: true,
          content: SizedBox(
            width: 340,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Align(
                  alignment: Alignment.centerLeft,
                  child: Text(
                    '${c.campaign.dateLabel} · 金币 ${c.campaign.gold}',
                    style: const TextStyle(color: _gold),
                  ),
                ),
                SwitchListTile.adaptive(
                  key: const ValueKey('settings-pause'),
                  contentPadding: EdgeInsets.zero,
                  title: Text(widget.replay ? '暂停回放' : '暂停游戏'),
                  value: widget.replay ? !_replayPlaying : c.isPaused,
                  onChanged: c.campaign.defeated && !widget.replay
                      ? null
                      : (value) {
                          setDialogState(() {
                            if (widget.replay) {
                              _sessionChanged(() => _replayPlaying = !value);
                            } else {
                              c.setPaused(value);
                              _captureSession();
                            }
                          });
                        },
                ),
                Row(
                  children: [
                    Expanded(child: Text(widget.replay ? '回放速度' : '游戏速度')),
                    DropdownButton<int>(
                      key: const ValueKey('settings-speed'),
                      value: widget.replay ? _replaySpeed : c.gameSpeed,
                      items: [
                        for (final speed in GameClock.speeds)
                          DropdownMenuItem(
                            value: speed,
                            child: Text('$speed×'),
                          ),
                      ],
                      onChanged: (value) {
                        if (value == null) return;
                        setDialogState(() {
                          if (widget.replay) {
                            _sessionChanged(() => _replaySpeed = value);
                          } else {
                            c.setGameSpeed(value);
                            _captureSession();
                          }
                        });
                      },
                    ),
                  ],
                ),
                if (widget.replay)
                  SwitchListTile.adaptive(
                    key: const ValueKey('replay-controls'),
                    contentPadding: EdgeInsets.zero,
                    title: const Text('显示回放进度条'),
                    value: _showPlaybackControls,
                    onChanged: (value) => setDialogState(
                      () =>
                          _sessionChanged(() => _showPlaybackControls = value),
                    ),
                  )
                else ...[
                  SwitchListTile.adaptive(
                    key: const ValueKey('minimap-switch'),
                    contentPadding: EdgeInsets.zero,
                    title: const Text('显示小地图'),
                    value: _showMinimap,
                    onChanged: (value) {
                      setDialogState(
                        () => _sessionChanged(() => _showMinimap = value),
                      );
                      _captureSession();
                    },
                  ),
                  SwitchListTile.adaptive(
                    key: const ValueKey('territory-border-switch'),
                    contentPadding: EdgeInsets.zero,
                    title: const Text('显示国土边界'),
                    value: c.showTerritoryBorders,
                    onChanged: (value) {
                      setDialogState(() => c.setTerritoryBorders(value));
                      _captureSession();
                    },
                  ),
                  if (_recording != null) ...[
                    Text(
                      _saveError == null ? '自动存档已开启' : '保存失败：$_saveError',
                      style: TextStyle(
                        fontSize: 12,
                        color: _saveError == null
                            ? const Color(0xffa7b5a4)
                            : Colors.orangeAccent,
                      ),
                    ),
                    const SizedBox(height: 8),
                    OutlinedButton.icon(
                      key: const ValueKey('save-replay'),
                      onPressed: _savingReplay
                          ? null
                          : () {
                              Navigator.pop(dialogContext);
                              _saveReplay();
                            },
                      icon: const Icon(Icons.video_library_outlined),
                      label: Text(_savingReplay ? '保存中…' : '保存回放'),
                    ),
                  ],
                ],
              ],
            ),
          ),
          actions: [
            if (!widget.replay)
              TextButton(
                onPressed: () {
                  Navigator.pop(dialogContext);
                  _help();
                },
                child: const Text('操作说明'),
              ),
            TextButton(
              key: const ValueKey('settings-close'),
              onPressed: () => Navigator.pop(dialogContext),
              child: const Text('关闭'),
            ),
          ],
        ),
      ),
    ).then((_) {
      if (mounted) _focus.requestFocus();
    });
  }

  Widget _replayBar() => Material(
    color: _ink,
    child: SafeArea(
      top: false,
      child: SizedBox(
        height: 48,
        child: Row(
          children: [
            IconButton(
              key: const ValueKey('replay-play'),
              tooltip: _replayPlaying ? '暂停回放' : '播放回放',
              onPressed: () {
                _sessionChanged(() => _replayPlaying = !_replayPlaying);
                if (_playhead >= widget.entry!.duration) _seekReplay(0);
              },
              icon: Icon(_replayPlaying ? Icons.pause : Icons.play_arrow),
            ),
            Expanded(
              child: Slider(
                key: const ValueKey('replay-timeline'),
                min: 0,
                max: math.max(.001, widget.entry!.duration),
                value: _playhead,
                label: '${_playhead.toStringAsFixed(1)} 秒',
                onChanged: (value) {
                  _replayPlaying = false;
                  _seekReplay(value);
                },
              ),
            ),
            Text(
              '${_playhead.toStringAsFixed(1)} / ${widget.entry!.duration.toStringAsFixed(1)} 秒',
              style: const TextStyle(fontSize: 12),
            ),
            const SizedBox(width: 12),
            DropdownButton<int>(
              key: const ValueKey('replay-speed'),
              value: _replaySpeed,
              items: [
                for (final speed in GameClock.speeds)
                  DropdownMenuItem(value: speed, child: Text('$speed×')),
              ],
              onChanged: (value) =>
                  _sessionChanged(() => _replaySpeed = value!),
            ),
            const SizedBox(width: 12),
          ],
        ),
      ),
    ),
  );
}
