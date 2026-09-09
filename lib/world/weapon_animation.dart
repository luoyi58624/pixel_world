import 'dart:convert';
import 'dart:typed_data';
import 'dart:ui';

/// 一幅原版拼接精灵在图集中的位置，以及相对脚本坐标的偏移。
class WeaponSprite {
  /// 图集矩形与原生像素偏移。
  const WeaponSprite(this.source, this.offset);

  /// 图集中的像素矩形。
  final Rect source;

  /// 相对脚本演员坐标的偏移，包含 NES 顶部裁切。
  final Offset offset;
}

/// 原动画的一个姿势，可按实际将领外观和阵营取对应原版图块。
class WeaponPose {
  /// 绑定脚本角色组和图集变体。
  const WeaponPose(this.group, this.variants);

  /// 0/1 为释放方士兵/将领，2/3 为对手，其他为独立特效。
  final int group;

  /// 士兵按红/蓝排列，将领按红色三职业、蓝色三职业排列。
  final List<int> variants;
}

/// 一帧内一个脚本演员的位置和姿势。
class WeaponActorFrame {
  /// 原演员槽、姿势与位置。
  const WeaponActorFrame(this.actor, this.pose, this.position);

  /// 原版 0–9 槽关联双方单位，10 及以上属于额外特效。
  final int actor;

  /// 姿势目录索引。
  final int pose;

  /// 脚本中的原生像素坐标。
  final Offset position;
}

/// 原脚本离线执行后的精灵目录和六十帧时间线，不在绘制时解释 6502。
class WeaponAnimations {
  WeaponAnimations._(this.sprites, this.poses, this.clips);

  /// 解码目录及紧凑的逐帧二进制数据，拒绝无效引用或截断文件。
  factory WeaponAnimations.decode(String metadata, Uint8List bytes) {
    final data = jsonDecode(metadata) as Map<String, dynamic>;
    if (data['version'] != 1 ||
        data['fps'] != 60 ||
        bytes.length < 6 ||
        ascii.decode(bytes.sublist(0, 5)) != 'NWFX1') {
      throw const FormatException('武器动画版本或文件头无效');
    }
    final sprites = [
      for (final row in data['sprites'] as List)
        WeaponSprite(
          Rect.fromLTWH(
            (row[0] as num).toDouble(),
            (row[1] as num).toDouble(),
            (row[2] as num).toDouble(),
            (row[3] as num).toDouble(),
          ),
          Offset((row[4] as num).toDouble(), (row[5] as num).toDouble()),
        ),
    ];
    final poses = [
      for (final row in data['poses'] as List)
        WeaponPose(row[0] as int, List<int>.unmodifiable(row[1] as List)),
    ];
    if (poses.any(
      (p) =>
          p.variants.isEmpty ||
          p.variants.any((i) => i < 0 || i >= sprites.length),
    )) {
      throw const FormatException('武器姿势引用无效');
    }
    var offset = 6;
    int read() {
      if (offset >= bytes.length) throw const FormatException('武器动画数据不完整');
      return bytes[offset++];
    }

    int word() => read() | read() << 8;
    final clips = <int, List<List<WeaponActorFrame>>>{};
    for (var clip = 0; clip < bytes[5]; clip++) {
      final id = read(), count = word();
      if (clips.containsKey(id) || count == 0) {
        throw const FormatException('武器时间线无效');
      }
      clips[id] = List.unmodifiable([
        for (var frame = 0; frame < count; frame++)
          List<WeaponActorFrame>.unmodifiable([
            for (var item = read(); item > 0; item--)
              WeaponActorFrame(
                read(),
                word(),
                Offset(read().toDouble(), read().toDouble()),
              ),
          ]),
      ]);
    }
    if (offset != bytes.length ||
        clips.values
            .expand((c) => c)
            .expand((f) => f)
            .any((a) => a.pose >= poses.length)) {
      throw const FormatException('武器时间线引用无效');
    }
    return WeaponAnimations._(
      List.unmodifiable(sprites),
      List.unmodifiable(poses),
      Map.unmodifiable(clips),
    );
  }

  /// 共用的原版精灵图集目录。
  final List<WeaponSprite> sprites;

  /// 不同职业与阵营的姿势变体。
  final List<WeaponPose> poses;

  /// 按效果编号查询完整动画帧，每帧严格按原绘制顺序排列。
  final Map<int, List<List<WeaponActorFrame>>> clips;
}
