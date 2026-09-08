"""只读提取汉化城名和国旗图块、调色板，补充地图元数据。"""

import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw
from extract_nes_heroes import ROM_SHA256, _glyph, glyph_tokens


CITY_NAMES = "阿尔马 奥尔梅 马易 鲍罗布 墨尔 托洛诺 列穆 迪麦 索朗 本塔 洛埃 贝尔 艾布林 格商尔 格林福 沃塔".split()
# NES 色号对应的 RGB 按用户世界地图截图校准；配色索引由 ROM 指定。
NES_COLORS = {0x0F: (0, 0, 0, 255), 0x27: (234, 158, 34, 255),
    0x06: (108, 6, 0, 255), 0x13: (117, 39, 254, 255),
    0x30: (255, 254, 255, 255), 0x3A: (189, 244, 171, 255), 0x1A: (12, 147, 0, 255)}


def extract_country_metadata(prg):
    """按 D027 城名读取和 AC3E 国旗绘制程序中的索引关系提取。"""
    entries = []
    transcription = {}
    for country_id, name in enumerate(CITY_NAMES):
        offset = 0x1814A + prg[0x1813A + country_id]
        end = prg.index(0, offset)
        encoded = list(prg[offset:end + 1])
        tokens = list(glyph_tokens(encoded))
        assert len(tokens) == len(name)
        for token, character in zip(tokens, name):
            assert transcription.setdefault(token, character) == character
        tile = prg[0x1AC7F + country_id]
        attribute = prg[0x1AC8F + country_id]
        entries.append({"id": country_id, "name": name, "flagIndex": country_id,
            "specialLocation": country_id >= 12, "encodedName": encoded,
            "sourceTile": tile, "sourceAttribute": attribute,
            "sourcePalette": list(prg[0x1AC2E + (attribute & 3) * 4 : 0x1AC32 + (attribute & 3) * 4]),
            "sourceFileOffsets": {"name": offset + 16, "flagTile": 0x1AC8F + country_id,
                "flagAttribute": 0x1AC9F + country_id, "tilePixels": 0x1307D + tile * 16}})
    return entries


def flag_image(prg, entry):
    """还原国旗的 8×8 NES 双位平面图块，零号颜色透明。"""
    tile = entry['sourceTile']
    data = prg[0x1306D + tile * 16 : 0x1306D + (tile + 1) * 16]
    palette = [(0, 0, 0, 0)] + [NES_COLORS[value] for value in entry['sourcePalette'][1:]]
    image = Image.new('RGBA', (8, 8))
    for y in range(8):
        for x in range(8):
            value = (data[y] >> (7 - x) & 1) | (data[y + 8] >> (7 - x) & 1) << 1
            image.putpixel((x, y), palette[value])
    return image


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom', type=Path)
    parser.add_argument('--project', type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    original = args.rom.read_bytes()
    if hashlib.sha256(original).hexdigest() != ROM_SHA256:
        raise ValueError('ROM 版本不一致，拒绝套用城名与国旗偏移')
    prg = original[16:]
    countries = extract_country_metadata(prg)
    metadata = {'version': 1, 'sourceSha256': ROM_SHA256, 'countries': countries,
        'notes': '0–11 是当前三张地图的城池国家，12–15 是特殊地点，共用三角形标记；城名固定，旗帜按当前占领方编号选择。'}
    data_dir = args.project / 'assets' / 'data'
    image_dir = args.project / 'assets' / 'images'
    docs_dir = args.project / 'docs'
    for folder in [data_dir, image_dir, docs_dir]: folder.mkdir(parents=True, exist_ok=True)
    (data_dir / 'rom_countries.json').write_text(json.dumps(metadata, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    atlas = Image.new('RGBA', (128, 8))
    audit = Image.new('RGB', (560, 16 * 48), (25, 28, 27))
    draw = ImageDraw.Draw(audit)
    for country in countries:
        index = country['id']
        flag = flag_image(prg, country)
        atlas.paste(flag, (index * 8, 0))
        audit.paste(flag.resize((32, 32), Image.NEAREST), (36, index * 48), flag.resize((32, 32), Image.NEAREST))
        draw.text((4, index * 48 + 12), str(index), fill='white')
        for column, (page, code) in enumerate(glyph_tokens(country['encodedName'])):
            audit.paste(_glyph(prg, page, code).resize((32, 32), Image.NEAREST), (84 + column * 32, index * 48))
    atlas.save(image_dir / 'flags.png')
    audit.save(docs_dir / 'nes_city_flags.png')
    world_path = args.project / 'assets' / 'maps' / 'worlds.json'
    worlds = json.loads(world_path.read_text(encoding='utf-8'))
    if worlds['sourceSha256'] != ROM_SHA256:
        raise ValueError('地图数据与原 ROM 不匹配')
    worlds['countries'] = countries
    for world in worlds['worlds']:
        for city in world['cities']:
            country = countries[city['id']]
            city.update(name=country['name'], initialOwnerId=country['id'],
                sourceNameFileOffset=country['sourceFileOffsets']['name'])
    world_path.write_text(json.dumps(worlds, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    assert args.rom.read_bytes() == original
    print('已提取 16 条城池/特殊地点名称与旗帜，三张地图的地形和建筑保持原样。')


if __name__ == '__main__': main()
