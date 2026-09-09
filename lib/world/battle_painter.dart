import 'dart:math' as math;
import 'dart:ui' as ui;

import 'package:flutter/material.dart';

import 'battle_simulation.dart';
import 'nes_battle_ending.dart';
import 'hero_sprite.dart';
import 'world_assets.dart';
import 'world_controller.dart';
import 'campaign.dart';

/// 直接使用原 ROM 战斗图集，并缓存当前缩放下的动作帧。
class BattleArt {
  /// 引用共享资源，场景结束只释放自己生成的缩放缓存。
  BattleArt(this.assets);

  /// 已解码的原版角色和背景。
  final WorldAssets assets;
  final _frames = <(HeroAppearance?, bool, int), ui.Image>{};
  int? _size;
  final _labels = <(String, double, double), TextPainter>{};
  final _weaponFrames = <int, ui.Image>{};
  int? _weaponSize;

  /// 按物理像素缓存原武器拼接帧，移动时不重复缩放采样。
  ui.Image weaponSprite(int id, int bodyPixelSize) {
    if (_weaponSize != bodyPixelSize) {
      for (final frame in _weaponFrames.values) {
        frame.dispose();
      }
      _weaponFrames.clear();
      _weaponSize = bodyPixelSize;
    }
    return _weaponFrames.putIfAbsent(id, () {
      final sprite = assets.weaponAnimations.sprites[id];
      final width = math.max(
        1,
        (sprite.source.width * bodyPixelSize / 16).round(),
      );
      final height = math.max(
        1,
        (sprite.source.height * bodyPixelSize / 16).round(),
      );
      final recorder = ui.PictureRecorder();
      Canvas(recorder).drawImageRect(
        assets.battleSprites['weapon_effects']!,
        sprite.source,
        Rect.fromLTWH(0, 0, width.toDouble(), height.toDouble()),
        Paint()
          ..filterQuality = FilterQuality.none
          ..isAntiAlias = false,
      );
      final picture = recorder.endRecording();
      final image = picture.toImageSync(width, height);
      picture.dispose();
      return image;
    });
  }

  /// 原版一级城用金色城墙，二至四级用青色城墙，五级用灰色城墙。
  ui.Image background(int cityLevel) =>
      assets.battleScenes[cityLevel == 1
          ? 5
          : cityLevel == 5
          ? 3
          : 4]!;

  /// 读取独立战斗图块；32 像素画布包含居中的 16 像素人物与原版武器部件。
  ui.Image sprite(
    HeroAppearance? appearance,
    bool friendly,
    int frame,
    int bodyPixelSize,
  ) {
    if (_size != bodyPixelSize) {
      for (final image in _frames.values) {
        image.dispose();
      }
      _frames.clear();
      _size = bodyPixelSize;
    }
    return _frames.putIfAbsent((appearance, friendly, frame), () {
      final role = appearance?.name ?? 'soldier';
      final sheet =
          assets.battleSprites['${role}_${friendly ? 'red' : 'blue'}']!;
      final side = bodyPixelSize * 2;
      final recorder = ui.PictureRecorder();
      Canvas(recorder).drawImageRect(
        sheet,
        Rect.fromLTWH(frame * 32, 0, 32, 32),
        Rect.fromLTWH(0, 0, side.toDouble(), side.toDouble()),
        Paint()
          ..filterQuality = FilterQuality.none
          ..isAntiAlias = false,
      );
      final picture = recorder.endRecording();
      final image = picture.toImageSync(side, side);
      picture.dispose();
      return image;
    });
  }

  /// 释放本场景的缩放帧，共享的原版图集仍由资源管理器持有。
  void dispose() {
    for (final image in _frames.values) {
      image.dispose();
    }
    for (final text in _labels.values) {
      text.dispose();
    }
    for (final image in _weaponFrames.values) {
      image.dispose();
    }
  }
}

/// 绘制正在后台运行的同一场战斗，包括行走、挥砍、受击与倒地。
class BattlePainter extends CustomPainter {
  /// 由地图时钟驱动绘制，面板文字另行低频更新。
  BattlePainter(
    this.controller,
    this.assets,
    this.art, {
    required this.devicePixelRatio,
    this.selectedUnitId,
  }) : super(repaint: controller);

  /// 共享游戏状态。
  final WorldController controller;

  /// 已加载的将领图集。
  final WorldAssets assets;

  /// 当前战斗场景的图形缓存。
  final BattleArt art;

  /// 屏幕像素比例。
  final double devicePixelRatio;

  /// 被点击查看的小兵或将领。
  final String? selectedUnitId;

  @override
  void paint(Canvas canvas, Size size) {
    final battle = controller.watchedBattle;
    if (battle == null) return;
    final sim = battle.simulation;
    final camera = controller.battleCamera;
    canvas.save();
    canvas.clipRect(Offset.zero & size);
    canvas.drawRect(Offset.zero & size, Paint()..color = Colors.black);
    canvas.save();
    final origin = camera.toScreen(Offset.zero);
    canvas.translate(
      (origin.dx * devicePixelRatio).round() / devicePixelRatio,
      (origin.dy * devicePixelRatio).round() / devicePixelRatio,
    );
    canvas.scale(camera.scale);
    canvas.drawImage(
      battle is FieldBattle
          ? assets.fieldScenes[battle.terrain]!
          : art.background(sim.cityAppearanceLevel ?? sim.defenderCityLevel),
      Offset.zero,
      Paint()..filterQuality = FilterQuality.none,
    );
    canvas.restore();

    // HUD 与角色共用原生画布，阵亡角色可以像录像中一样经过面板上方。
    canvas.save();
    canvas.translate(origin.dx, origin.dy);
    canvas.scale(camera.scale);
    _hud(canvas, battle);
    canvas.restore();
    final playingWeapon =
        sim.weaponStrike != null && sim.weaponStrike!.frame >= 0;
    final units =
        sim.units.where((unit) => unit.visible && !playingWeapon).toList()
          ..sort((a, b) => a.position.dy.compareTo(b.position.dy));
    for (final unit in units) {
      final point = unit.renderPosition(sim.elapsed);
      final center = camera.toScreen(point);
      final side = math.max(1, (16 * camera.scale * devicePixelRatio).round());
      final hero = unit.side == BattleSide.attacker
          ? battle.attacker
          : battle.defender;
      final image = art.sprite(
        unit.isGeneral ? hero.appearance : null,
        hero.isPlayer,
        unit.animationFrame(sim.elapsed),
        side,
      );
      canvas.save();
      canvas.translate(
        (center.dx * devicePixelRatio).round() / devicePixelRatio,
        (center.dy * devicePixelRatio).round() / devicePixelRatio,
      );
      final imageSize = side * 2 / devicePixelRatio;
      canvas.translate(-imageSize / 2, -imageSize / 2);
      if (unit.facingRight) {
        canvas.translate(imageSize, 0);
        canvas.scale(-1, 1);
      }
      canvas.drawImageRect(
        image,
        Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble()),
        Rect.fromLTWH(0, 0, imageSize, imageSize),
        Paint()..filterQuality = FilterQuality.none,
      );
      canvas.restore();
    }
    final strike = sim.weaponStrike;
    if (strike != null && strike.frame >= 0) {
      final library = assets.weaponAnimations;
      final clip = library.clips[strike.weapon.effectId]!;
      final frame = clip[strike.frame.clamp(0, clip.length - 1)];
      final caster = strike.attackingSide ? battle.attacker : battle.defender;
      final opponent = strike.attackingSide ? battle.defender : battle.attacker;
      final bodyPixels = math.max(
        1,
        (16 * camera.scale * devicePixelRatio).round(),
      );
      for (final actor in frame) {
        if (actor.actor < 10 &&
            strike.visibleActors & (1 << actor.actor) == 0) {
          continue;
        }
        final pose = library.poses[actor.pose];
        final hero = pose.group < 2 ? caster : opponent;
        var variant = 0;
        if (pose.group == 0 || pose.group == 2) {
          variant = hero.isPlayer ? 0 : 1;
        } else if (pose.group == 1 || pose.group == 3) {
          variant =
              switch (hero.appearance) {
                HeroAppearance.advanced => 0,
                HeroAppearance.normal => 1,
                HeroAppearance.protagonist => 2,
              } +
              (hero.isPlayer ? 0 : 3);
        }
        final id = pose.variants[math.min(variant, pose.variants.length - 1)];
        final sprite = library.sprites[id];
        final image = art.weaponSprite(id, bodyPixels);
        final original = actor.position + sprite.offset;
        final position = strike.attackingSide
            ? original
            : Offset(256 - original.dx - sprite.source.width, original.dy);
        final screen = camera.toScreen(position);
        canvas.save();
        canvas.translate(
          (screen.dx * devicePixelRatio).round() / devicePixelRatio,
          (screen.dy * devicePixelRatio).round() / devicePixelRatio,
        );
        final width = image.width / devicePixelRatio,
            height = image.height / devicePixelRatio;
        if (!strike.attackingSide) {
          canvas.translate(width, 0);
          canvas.scale(-1, 1);
        }
        canvas.drawImageRect(
          image,
          Rect.fromLTWH(0, 0, image.width.toDouble(), image.height.toDouble()),
          Rect.fromLTWH(0, 0, width, height),
          Paint()
            ..filterQuality = FilterQuality.none
            ..isAntiAlias = false,
        );
        canvas.restore();
      }
    }
    canvas.restore();
  }

  void _frame(Canvas canvas, Rect rect) {
    canvas.drawRect(rect, Paint()..color = Colors.black);
    final paint = Paint()
      ..color = const Color(0xfffffeff)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1
      ..isAntiAlias = false;
    canvas.drawRect(rect.deflate(0.5), paint);
    canvas.drawRect(rect.deflate(2.5), paint);
  }

  void _text(
    Canvas canvas,
    String text,
    Offset point,
    double size, {
    double width = 200,
  }) {
    final painter = art._labels.putIfAbsent(
      (text, size, width),
      () => TextPainter(
        text: TextSpan(
          text: text,
          style: TextStyle(
            color: const Color(0xfffffeff),
            fontSize: size,
            height: 1,
            fontFamily: 'Microsoft YaHei',
          ),
        ),
        textDirection: TextDirection.ltr,
        maxLines: 1,
      )..layout(maxWidth: width),
    );
    painter.paint(canvas, point);
  }

  void _digits(Canvas canvas, String text, Offset point) {
    const glyphs = {
      '0': [
        '011110',
        '110011',
        '110011',
        '110011',
        '110011',
        '110011',
        '011110',
      ],
      '1': [
        '001100',
        '011100',
        '001100',
        '001100',
        '001100',
        '001100',
        '111111',
      ],
      '2': [
        '011110',
        '110011',
        '000011',
        '000110',
        '011000',
        '110000',
        '111111',
      ],
      '3': [
        '111110',
        '000011',
        '000011',
        '011110',
        '000011',
        '000011',
        '111110',
      ],
      '4': [
        '000110',
        '001110',
        '011110',
        '110110',
        '111111',
        '000110',
        '000110',
      ],
      '5': [
        '111111',
        '110000',
        '110000',
        '111110',
        '000011',
        '000011',
        '111110',
      ],
      '6': [
        '011110',
        '110000',
        '110000',
        '111110',
        '110011',
        '110011',
        '011110',
      ],
      '7': [
        '111111',
        '000011',
        '000110',
        '001100',
        '001100',
        '001100',
        '001100',
      ],
      '8': [
        '011110',
        '110011',
        '110011',
        '011110',
        '110011',
        '110011',
        '011110',
      ],
      '9': [
        '011110',
        '110011',
        '110011',
        '011111',
        '000011',
        '000011',
        '011110',
      ],
      'H': [
        '100001',
        '100001',
        '100001',
        '111111',
        '100001',
        '100001',
        '100001',
      ],
      'P': [
        '111110',
        '100001',
        '100001',
        '111110',
        '100000',
        '100000',
        '100000',
      ],
    };
    final paint = Paint()
      ..color = const Color(0xfffffeff)
      ..isAntiAlias = false;
    for (var c = 0; c < text.length; c++) {
      final rows = glyphs[text[c]];
      if (rows == null) continue;
      for (var y = 0; y < 7; y++) {
        for (var x = 0; x < 6; x++) {
          if (rows[y][x] == '1') {
            canvas.drawRect(
              Rect.fromLTWH(point.dx + c * 8 + x, point.dy + y, 1, 1),
              paint,
            );
          }
        }
      }
    }
  }

  void _hud(Canvas canvas, WorldBattle battle) {
    final sim = battle.simulation;
    if (sim.forming) {
      _frame(canvas, const Rect.fromLTWH(18, 148, 220, 44));
      _text(
        canvas,
        '${controller.world.countryName(battle.defender.countryId)}国',
        const Offset(30, 154),
        14,
        width: 90,
      );
      _text(
        canvas,
        '${controller.world.countryName(battle.attacker.countryId)}国',
        const Offset(142, 154),
        14,
        width: 90,
      );
      _text(
        canvas,
        '${battle.defender.name}部队',
        const Offset(30, 172),
        12,
        width: 90,
      );
      _text(
        canvas,
        '${battle.attacker.name}部队',
        const Offset(142, 172),
        12,
        width: 90,
      );
      return;
    }
    for (final side in BattleSide.values) {
      final x = side == BattleSide.defender ? 18.0 : 146.0;
      final hero = side == BattleSide.defender
          ? battle.defender
          : battle.attacker;
      _frame(canvas, Rect.fromLTWH(x, 148, 92, 56));
      if (hero.sourceId >= 0 && hero.sourceId < 40 && hero.sourceId != 9) {
        canvas.drawImageRect(
          assets.battleSprites['hero_names']!,
          Rect.fromLTWH(0, hero.sourceId * 16, 48, 16),
          Rect.fromLTWH(x + 14, 153, 48, 16),
          Paint()..filterQuality = FilterQuality.none,
        );
      } else {
        _text(canvas, hero.name, Offset(x + 14, 153), 16, width: 66);
      }
      _digits(canvas, 'HP', Offset(x + 14, 178));
      final hp = hero.health.hp.round().toString();
      _digits(canvas, hp, Offset(x + 78 - hp.length * 8, 178));
      canvas.drawRect(
        Rect.fromLTWH(x + 14, 193, sim.morale(side).remaining.toDouble(), 8),
        Paint()
          ..color = const Color(0xffb53120)
          ..isAntiAlias = false,
      );
    }
    final resultRow = sim.announcementIndex;
    if (resultRow != null) {
      _frame(canvas, nesBattleResultWindow.deflate(2));
      final width = nesBattleResultWidths[resultRow];
      canvas.drawImageRect(
        assets.battleSprites['result_labels']!,
        Rect.fromLTWH(0, resultRow * 16, width, 16),
        nesBattleResultTextOrigin & Size(width, 16),
        Paint()
          ..filterQuality = FilterQuality.none
          ..isAntiAlias = false,
      );
    }
  }

  @override
  bool shouldRepaint(covariant BattlePainter oldDelegate) =>
      controller != oldDelegate.controller ||
      assets != oldDelegate.assets ||
      art != oldDelegate.art ||
      selectedUnitId != oldDelegate.selectedUnitId ||
      devicePixelRatio != oldDelegate.devicePixelRatio;
}
