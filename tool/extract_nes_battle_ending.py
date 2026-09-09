"""只读提取原版结果字模，并执行原音频驱动测量战斗收尾时长。"""

import argparse
import hashlib
import json
import sys
from pathlib import Path

from PIL import Image
from extract_nes_heroes import ROM_SHA256, _glyph, glyph_tokens


def measure_cue(prg, command):
    """从战斗曲切入结束曲，每次驱动调用对应一帧，不合成音频。"""
    from py65.devices.mpu6502 import MPU

    cpu = MPU()
    cpu.memory[0x8000:0xC000] = prg[:0x4000]
    cpu.memory[0xC000:] = prg[0x3C000:]
    cpu.memory[0x103] = 0xFF

    def tick():
        cpu.pc, cpu.sp = 0x8000, 0xFF
        cpu.stPushWord(0x5FFF)
        for _ in range(100000):
            if cpu.pc == 0x6000:
                return
            cpu.step()
        raise RuntimeError("原音频驱动未返回")

    # DCDB 设置战斗曲 8C；NMI FE74 每帧切到 bank 0 调用 8000。
    cpu.memory[0xE0] = 0x8C
    for _ in range(300):
        tick()
    cpu.memory[0xE0] = command
    for frame in range(1, 1501):
        tick()
        if cpu.memory[0xE0] == 0:
            return frame
    raise RuntimeError("结束曲未在限定帧数内完成")


def extract(rom, output):
    """验证 ROM 后导出三行原字模、逐帧计时证据和 Dart 常量。"""
    original = rom.read_bytes()
    if hashlib.sha256(original).hexdigest() != ROM_SHA256:
        raise ValueError("ROM 与已分析版本不一致，不能套用偏移")
    prg = original[16:]
    cues = [measure_cue(prg, command) for command in (0x92, 0x93)]
    assert cues == [194, 223]
    assert prg[0x3DE53:0x3DE58] == bytes.fromhex('A9 09 4C 5C D1')
    window = list(prg[0x3CA3D:0x3CA41])
    assert window == [10, 4, 12, 4]
    labels = [('胜利！', 0xA62D), ('失败！', 0xA639), ('互刺··', 0xA642)]
    sheet = Image.new('RGB', (64, 48), 'black')
    records = []
    for row, (label, address) in enumerate(labels):
        start = 0x14000 + address - 0x8000
        encoded = prg[start:prg.index(0, start) + 1]
        tokens = list(glyph_tokens(encoded))
        assert len(tokens) == (4 if row == 2 else 3)
        for column, (page, code) in enumerate(tokens):
            sheet.paste(_glyph(prg, page, code), (column * 16, row * 16))
        records.append(dict(label=label, bank=5, cpuAddress=hex(address),
                            fileOffset=hex(start + 16), encoded=encoded.hex(),
                            glyphs=tokens, width=len(tokens) * 16))
    image_path = output / 'assets/images/battle/result_labels.png'
    image_path.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(image_path, optimize=True)
    evidence = dict(
        romSha256=ROM_SHA256,
        musicDriver=dict(bank=0, cpuAddress='0x8000', ticksPerSecond=60,
                         warmupCommand='0x8c', warmupFrames=300),
        cues=dict(victory=dict(command='0x92', frames=cues[0]),
                  defeat=dict(command='0x93', frames=cues[1])),
        flow=dict(victory='DD77 -> E6B2 -> DE3E',
                  defeat='DDED -> E6C9 -> DE3E',
                  draw='DDFC -> DE3E',
                  resultWait='DE4F waits for E0=0, then DE53 waits 9 frames',
                  cueStartsBeforeMarch=True, trailingFrames=9),
        window=dict(id='0x22', fileOffset='0x3ca4d', tiles=window,
                    sceneRect=[80, 16, 96, 32], textOrigin=[96, 24]),
        labels=records,
    )
    (output / 'docs/nes_battle_ending.json').write_text(
        json.dumps(evidence, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    dart = '''// 由 tool/extract_nes_battle_ending.py 从已校验 ROM 只读生成。
import 'dart:ui';

/// 结束曲从胜方走场开始计时，依次为胜利、失败与双方阵亡。
const nesBattleEndingCueFrames = [VICTORY, DEFEAT, DEFEAT];

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
'''.replace('VICTORY', str(cues[0])).replace('DEFEAT', str(cues[1]))
    (output / 'lib/world/nes_battle_ending.dart').write_text(dart, encoding='utf-8')
    print(json.dumps(dict(cueFrames=cues, tailFrames=9, image=str(image_path))))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom', type=Path)
    parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument('--py65-path', type=Path)
    args = parser.parse_args()
    if args.py65_path:
        sys.path.insert(0, str(args.py65_path))
    extract(args.rom, args.output)
