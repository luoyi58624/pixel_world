// 由 tool/extract_nes_battle_ending.py 从已校验 ROM 只读生成。
import 'dart:ui';

/// 结束曲从胜方走场开始计时，依次为胜利、失败与双方阵亡。
const nesBattleEndingCueFrames = [194, 223, 223];

/// DE53 在结束曲播完、结果窗口绘制后再等待的帧数。
const nesBattleEndingTailFrames = 9;

/// 原窗口 22 的位置，已减去战场裁切的顶部 16 像素。
const nesBattleResultWindow = Rect.fromLTWH(80, 16, 96, 32);

/// 结果字模在战斗画布上的起点。
const nesBattleResultTextOrigin = Offset(96, 24);

/// 三行原版字模的有效宽度，每行高 16 像素。
const nesBattleResultWidths = [48.0, 48.0, 64.0];

/// 原字模对应的可访问文本，互刺为双方将领同时阵亡。
const nesBattleResultLabels = ['胜利！', '失败！', '互刺··'];
