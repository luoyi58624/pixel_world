import 'package:flutter/material.dart';

/// 城池服务、英雄选择和属性格共用的字号、间距及状态样式。
abstract final class CityPanelStyle {
  /// 普通文字颜色。
  static const ink = Color(0xffece7d1);

  /// 可操作或选中状态的强调颜色。
  static const gold = Color(0xffd6bd7c);

  /// 标签和禁用状态颜色。
  static const muted = Color(0xffa7b5a4);

  /// 所有方块统一背景。
  static const background = Color(0xff1e291e);

  /// 所有方块的最小高度，较大系统字号可自然撑高。
  static const cardHeight = 52.0;

  /// 所有方块统一内边距。
  static const padding = EdgeInsets.symmetric(horizontal: 9, vertical: 8);

  /// 方块之间的水平及换行间距。
  static const gap = 8.0;

  /// 方块内两行文字的间距。
  static const textGap = 5.0;

  /// 分组之间的间距。
  static const sectionGap = 18.0;

  /// 分组标题与内容的间距。
  static const headingGap = 10.0;

  /// 方块正文和价格使用相同字号、字重与行高。
  static const text = TextStyle(
    fontSize: 10,
    height: 1.4,
    fontWeight: FontWeight.w400,
  );

  /// 方块主内容文字。
  static final value = text.copyWith(color: ink);

  /// 方块标签与辅助文字。
  static final label = text.copyWith(color: muted);

  /// 三个分组标题共用的文字样式。
  static final heading = text.copyWith(
    fontSize: 12,
    fontWeight: FontWeight.w600,
    color: gold,
  );

  /// 只读属性格和按钮共用的外观及圆角。
  static const decoration = BoxDecoration(
    color: background,
    borderRadius: BorderRadius.all(Radius.circular(3)),
  );

  /// 按钮只随可用或选中状态改变强调色，几何和字号保持一致。
  static ButtonStyle button({bool selected = false, bool actionable = false}) =>
      OutlinedButton.styleFrom(
        alignment: Alignment.centerLeft,
        // 桌面默认 compact 会从上下 padding 再各减 8，导致文字贴住边框。
        visualDensity: VisualDensity.standard,
        padding: padding,
        minimumSize: const Size(0, cardHeight),
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
        backgroundColor: selected ? const Color(0xff303b2b) : background,
        foregroundColor: ink,
        disabledForegroundColor: muted,
        side: BorderSide(
          color: selected
              ? gold
              : actionable
              ? gold.withValues(alpha: 0.35)
              : const Color(0xff43513e),
        ),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(3)),
      );
}
