"""只读提取指定 NES 的战斗角色、城内背景和阵营配色，保留来源偏移。"""

import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image
from extract_nes_map import _tile

SHA256 = 'c6dba3d22e2b27a804c9cb81d43d964a42bb6317e802224bfad07f37d5e3ee59'
# 当前 Mesen 的 RGB 配色，ROM 仍负责选择原始 NES 调色板索引。
RGB = [int(s, 16) for s in '''666666 002a88 1412a7 3b00a4 5c007e 6e0040 6c0600 561d00
333500 0b4800 005200 004f08 00404d 000000 000000 000000
adadad 155fd9 4240ff 7527fe a01acc b71e7b b53120 994e00
6b6d00 388700 0c9300 008f32 007c8d 000000 000000 000000
fffeff 64b0ff 9290ff c676ff f36aff fe6ecc fe8170 ea9e22
bcbe00 88d800 5ce430 45e082 48cdde 4f4f4f 000000 000000
fffeff c0dfff d3d2ff e8c8ff fbc2ff fec4ea feccc5 f7d8a5
e4e594 cfef96 bdf4ab b3f3cc b5ebf2 b8b8b8 000000 000000'''.split()]


def rgba(index):
    """将 NES 颜色索引映射到参考模拟器的 RGB。"""
    color = RGB[index & 63]
    return ((color >> 16) & 255, (color >> 8) & 255, color & 255, 255)


def decompress(data, offset, count):
    """还原 D16A 的半字节控制流：低三位为长度，高位选择逐字节或重复。"""
    cursor = offset * 2
    def nibble():
        nonlocal cursor
        value = data[cursor // 2]
        value = value & 15 if cursor & 1 else value >> 4
        cursor += 1
        return value
    def byte():
        return nibble() * 16 + nibble()
    output = []
    while len(output) < count:
        control = nibble()
        length = (control & 7) + 1
        if control & 8:
            output.extend(byte() for _ in range(length))
        else:
            output.extend([byte()] * length)
    return bytes(output[:count])


def battle_frames(prg, kind):
    """按 A0EA 指针、拼接编号、翻转属性及追加动作部件还原三个侧面动作。"""
    pointer = int.from_bytes(prg[0x160EA + kind * 2:0x160EC + kind * 2], 'little')
    attributes = pointer + 0xC000
    indices = attributes - 0x302
    palette_offset = 4 if kind >= 7 else 0
    palettes = []
    for group in range(2):
        pair = prg[0x146DA + palette_offset + group * 2:0x146DC + palette_offset + group * 2]
        palettes.append([(0, 0, 0, 0), rgba(0x0F), rgba(pair[0]), rgba(pair[1])])
    sheet = Image.new('RGBA', (96, 32))
    evidence = []
    for output_frame, source_frame in enumerate([0, 1, 6]):
        frame = Image.new('RGBA', (32, 32))
        parts = []
        for q in range(4):
            entry = source_frame * 4 + q
            parts.append((prg[indices + entry], prg[attributes + entry], q % 2 * 8, q // 2 * 8))
        if source_frame == 6:
            start, end = prg[0x163EC + kind:0x163EE + kind]
            # 普通人物执行 EA56 和 EA64 两次 LSR，只有四分之一是当前方向的动作部件。
            for i in range((end - start) // 4):
                entry = start + i
                x, y = prg[0x1649D + entry * 2:0x1649F + entry * 2]
                parts.append((prg[0x16405 + entry], prg[0x16451 + entry],
                              x - 256 if x >= 128 else x, y - 256 if y >= 128 else y))
        # OAM 编号较小的部件覆盖后面的部件，因此按逆序合成。
        for tile_id, attr, x, y in reversed(parts):
            tile_start = 0x146FA + tile_id * 16
            tile = _tile(prg[tile_start:tile_start + 16], palettes[attr & 1])
            if attr & 0x40:
                tile = tile.transpose(Image.FLIP_LEFT_RIGHT)
            if attr & 0x80:
                tile = tile.transpose(Image.FLIP_TOP_BOTTOM)
            frame.alpha_composite(tile, (x + 8, y + 8))
        sheet.alpha_composite(frame, (output_frame * 32, 0))
        evidence.append([{'tileFileOffset': f'{0x1470A + tile_id * 16:06X}',
                          'tileId': tile_id, 'attribute': attr, 'x': x, 'y': y}
                         for tile_id, attr, x, y in parts])
    return sheet, {'kind': kind, 'indicesFileOffset': f'{indices + 16:06X}',
                   'attributesFileOffset': f'{attributes + 16:06X}', 'frames': evidence}


def battlefield(prg, stage):
    """还原 ED55 构造的名表、属性表和 EEC7 解压的二十七个背景图块。"""
    pointer = int.from_bytes(prg[0xA67E + stage * 2:0xA680 + stage * 2], 'little')
    patterns = decompress(prg, pointer, 27 * 16)
    attributes = decompress(prg, 0x3EEA2, 64)
    colors = list(prg[0x14594 + stage * 8:0x1459C + stage * 8]) + list(prg[0x145DC:0x145E4])
    colors[9] = colors[5]
    name_table = [255] * (32 * 30)
    for column in range(4):
        for n, tile in enumerate(prg[0x3EE72:0x3EEA2]):
            name_table[(2 + n // 8) * 32 + column * 8 + n % 8] = tile
    name_table[8 * 32:18 * 32] = [0] * (10 * 32)
    name_table[18 * 32:19 * 32] = [12, 13] * 16
    name_table[19 * 32:20 * 32] = [22, 23] * 16
    image = Image.new('RGBA', (256, 144))
    for y in range(2, 20):
        for x in range(32):
            palette = (attributes[(y // 4) * 8 + x // 4] >> (((y % 4) // 2 * 2 + (x % 4) // 2) * 2)) & 3
            tile_id = name_table[y * 32 + x]
            tile = _tile(patterns[tile_id * 16:tile_id * 16 + 16],
                         [rgba(colors[0])] + [rgba(c) for c in colors[palette * 4 + 1:palette * 4 + 4]])
            image.paste(tile, (x * 8, (y - 2) * 8))
    return image, {'stage': stage, 'patternFileOffset': f'{pointer + 16:06X}',
                   'paletteFileOffset': f'{0x145A4 + stage * 8:06X}', 'palette': colors}


def world_friendly(prg, variant):
    """沿用原地图拼接表，只把普通和高级将领的阵营主色改为参考图红褐色。"""
    palettes = [[(0, 0, 0, 0), rgba(15), rgba(0x16), rgba(0x38)],
                [(0, 0, 0, 0), rgba(15), rgba(0x16), rgba(0x30)]]
    image = Image.new('RGBA', (96, 16))
    for f, original in enumerate([2, 3, 4, 5, 0, 1]):
        for q in range(4):
            entry = variant * 24 + original * 4 + q
            tile_id, attr = prg[0x18612 + entry], prg[0x18672 + entry]
            offset = 0x1306D + tile_id * 16
            tile = _tile(prg[offset:offset + 16], palettes[attr & 3])
            if attr & 0x40:
                tile = tile.transpose(Image.FLIP_LEFT_RIGHT)
            if attr & 0x80:
                tile = tile.transpose(Image.FLIP_TOP_BOTTOM)
            image.alpha_composite(tile, (f * 16 + q % 2 * 8, q // 2 * 8))
    return image


def main():
    """导出可独立运行的图片及来源记录，并验证输入 ROM 未改动。"""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom', type=Path)
    parser.add_argument('--output', type=Path, default=Path('assets'))
    args = parser.parse_args()
    original = args.rom.read_bytes()
    if hashlib.sha256(original).hexdigest() != SHA256:
        raise ValueError('ROM 版本与偏移记录不一致')
    prg = original[16:]
    root = args.output / 'images' / 'battle'
    root.mkdir(parents=True, exist_ok=True)
    (args.output / 'images' / 'hero').mkdir(parents=True, exist_ok=True)
    (args.output / 'data').mkdir(parents=True, exist_ok=True)
    records = {}
    for role, base in [('soldier', 0), ('advanced', 3), ('normal', 4), ('protagonist', 6)]:
        for faction, extra in [('red', 0), ('blue', 7)]:
            image, record = battle_frames(prg, base + extra)
            image.save(root / f'{role}_{faction}.png')
            records[f'{role}_{faction}'] = record
    stages = []
    for stage in [3, 4, 5]:
        image, record = battlefield(prg, stage)
        image.save(root / f'stage_{stage}.png')
        stages.append(record)
    for variant, name in [(0, 'advanced'), (1, 'normal')]:
        world_friendly(prg, variant).save(args.output / 'images' / 'hero' / f'{name}_red.png')
    data = {'sourceSha256': SHA256, 'frameSize': 32, 'bodyOrigin': [8, 8],
            'frameOrder': ['side_a', 'side_b', 'clash'], 'sprites': records, 'stages': stages,
            'layout': {'sourceYFileOffset': '03E79A', 'sourceY': list(prg[0x3E78A:0x3E78F]),
                       'cropTop': 16, 'oamYOffset': 1, 'bodySize': 16, 'arenaSize': [256, 144],
                       'sourceXFileOffset': '03E790', 'sourceXOffsets': list(prg[0x3E780:0x3E78A]),
                       'levelStages': list(prg[0x3ED64:0x3ED69])},
            'rgbPalette': [f'{c:06X}' for c in RGB]}
    (args.output / 'data' / 'rom_battle_art.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    assert args.rom.read_bytes() == original
    print('已导出 8 套战斗人物、3 种原版城内背景和 2 套我方地图配色；原 ROM 未修改。')


if __name__ == '__main__':
    main()
