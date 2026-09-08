"""从用户提供的 ROM 中只读提取地图、图块和角色，输出独立运行的 Flutter 素材。"""

import argparse
import hashlib
import json
from pathlib import Path

from PIL import Image
from extract_nes_countries import extract_country_metadata, flag_image


# 角色颜色编号由参考截图逐像素核对；编号 0 透明，不能与黑色轮廓混用。
_HERO_PALETTE = [(0, 0, 0, 0), (0, 0, 0, 255), (66, 64, 255, 255), (228, 229, 148, 255)]
_HERO_PALETTES = [_HERO_PALETTE, _HERO_PALETTE[:3] + [(255, 254, 255, 255)]]
# 主角上、下半身分别使用橙金和红褐调色板，RGB 按用户主角截图核对。
_PROTAGONIST_PALETTES = [
    [(0, 0, 0, 0), (0, 0, 0, 255), (181, 49, 32, 255), (228, 229, 148, 255)],
    [(0, 0, 0, 0), (0, 0, 0, 255), (234, 158, 34, 255), (228, 229, 148, 255)],
]


def _tile(data, palette):
    image = Image.new("RGBA", (8, 8))
    for y in range(8):
        for x in range(8):
            index = ((data[y] >> (7 - x)) & 1) | (((data[y + 8] >> (7 - x)) & 1) << 1)
            image.putpixel((x, y), palette[index])
    return image


def _hero_image(prg):
    # 旧图保留原始图块排列，供已有 3D 美术参考文件使用。
    image = Image.new("RGBA", (256, 16))
    for frame in range(16):
        for quadrant in range(4):
            start = 0x1306D + (frame * 4 + quadrant) * 16
            image.paste(_tile(prg[start : start + 16], _HERO_PALETTE), (frame * 16 + (quadrant % 2) * 8, (quadrant // 2) * 8))
    return image


def _hero_animation(prg, variant):
    image = Image.new("RGBA", (96, 16))
    palettes = _PROTAGONIST_PALETTES if variant == 3 else _HERO_PALETTES
    # 每种角色的 ROM 表含六帧；统一导出顺序为正面、背面、侧面，各两帧。
    for frame, original in enumerate([2, 3, 4, 5, 0, 1]):
        for quadrant in range(4):
            entry = variant * 24 + original * 4 + quadrant
            tile_id = prg[0x18612 + entry]
            attribute = prg[0x18672 + entry]
            start = 0x1306D + tile_id * 16
            tile = _tile(prg[start : start + 16], palettes[attribute & 3])
            if attribute & 0x40:
                tile = tile.transpose(Image.FLIP_LEFT_RIGHT)
            if attribute & 0x80:
                tile = tile.transpose(Image.FLIP_TOP_BOTTOM)
            image.paste(tile, (frame * 16 + quadrant % 2 * 8, quadrant // 2 * 8))
    return image


def _map(prg, offset):
    result = []
    while len(result) < 64 * 60:
        value = prg[offset]
        offset += 1
        count = 1
        if value & 128:
            value &= 127
            count = prg[offset] or 256
            offset += 1
        result.extend([value] * count)
    assert len(result) == 64 * 60
    return result


def _cities(prg, offset):
    # 前 16 字节是四个随机位置槽的范围参数，城池记录在它们之后。
    cursor = offset + 16
    cities = []
    countries = extract_country_metadata(prg)
    while prg[cursor] < 128:
        record = list(prg[cursor : cursor + 6])
        cursor += 6
        units = []
        while prg[cursor] < 128:
            units.append(list(prg[cursor : cursor + 3]))
            cursor += 3
        cursor += 1
        kind = record[0] - 1
        width = prg[0x3CBFF + kind]
        height = prg[0x3CC05 + kind]
        shape_offset = 0x3CC11 + prg[0x3CC0B + kind]
        cities.append({
            "id": len(cities), "x": record[4], "y": record[5],
            "name": countries[len(cities)]["name"], "initialOwnerId": len(cities),
            "sourceNameFileOffset": countries[len(cities)]["sourceFileOffsets"]["name"],
            "width": width, "height": height,
            "shape": list(prg[shape_offset : shape_offset + width * height]),
            "unitIds": [unit[0] for unit in units], "sourceRecord": record,
        })
    return cities


def _main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("rom", type=Path)
    parser.add_argument("--output", type=Path, default=Path(__file__).resolve().parents[1] / "assets")
    args = parser.parse_args()
    original = args.rom.read_bytes()
    digest = hashlib.sha256(original).hexdigest()
    if digest != "c6dba3d22e2b27a804c9cb81d43d964a42bb6317e802224bfad07f37d5e3ee59":
        raise ValueError("ROM 与已经分析的版本不同，不能直接复用其偏移表。")
    prg = original[16:]
    (args.output / "images").mkdir(parents=True, exist_ok=True)
    (args.output / "maps").mkdir(parents=True, exist_ok=True)
    # RGB 按参考视频校准；图形的位平面、组合关系和地图布局来自 ROM。
    palettes = [
        [(0, 0, 0, 255), (0, 82, 0, 255), (10, 145, 0, 255), (135, 213, 0, 255)],
        [(0, 0, 0, 255), (136, 137, 235, 255), (10, 145, 0, 255), (214, 224, 255, 255)],
        [(0, 0, 0, 255), (54, 56, 0, 255), (10, 145, 0, 255), (160, 166, 0, 255)],
        [(0, 0, 0, 255), (112, 112, 112, 255), (10, 145, 0, 255), (248, 248, 248, 255)],
    ]
    atlas = Image.new("RGBA", (256, 128))
    meta_images = []
    palette_ids = []
    for index in range(128):
        palette_id = prg[0x188D2 + index] & 3
        palette_ids.append(palette_id)
        meta = Image.new("RGBA", (16, 16))
        for quadrant in range(4):
            tile_id = prg[0x186D2 + quadrant * 128 + index]
            start = 0x12679 + tile_id * 16
            meta.paste(_tile(prg[start : start + 16], palettes[palette_id]), ((quadrant % 2) * 8, (quadrant // 2) * 8))
        meta_images.append(meta)
        atlas.paste(meta, ((index % 16) * 16, (index // 16) * 16))
    atlas.save(args.output / "images" / "terrain.png")

    waves = Image.new("RGBA", (64, 16))
    for frame in range(4):
        for y in range(16):
            for x in range(16):
                waves.putpixel((frame * 16 + x, y), meta_images[32].getpixel(((x + frame * 2) % 16, y)))
    waves.save(args.output / "images" / "water.png")

    _hero_image(prg).save(args.output / "images" / "hero.png")
    (args.output / "images" / "hero").mkdir(exist_ok=True)
    for variant, name in [(0, "advanced"), (1, "normal"), (3, "protagonist")]:
        _hero_animation(prg, variant).save(args.output / "images" / "hero" / f"{name}.png")
    flags = Image.new("RGBA", (128, 8))
    for country in extract_country_metadata(prg):
        flags.paste(flag_image(prg, country), (country['id'] * 8, 0))
    flags.save(args.output / "images" / "flags.png")

    worlds = []
    for index in range(3):
        map_pointer = int.from_bytes(prg[0x10BB1 + index * 2 : 0x10BB3 + index * 2], "little")
        city_pointer = int.from_bytes(prg[0x10911 + index * 2 : 0x10913 + index * 2], "little")
        cells = _map(prg, 0x10000 + map_pointer - 0x8000)
        cities = _cities(prg, 0x10000 + city_pointer - 0x8000)
        worlds.append({"id": index, "width": 64, "height": 60, "tiles": cells, "cities": cities})
        preview = Image.new("RGBA", (1024, 960))
        for cell, value in enumerate(cells):
            preview.paste(meta_images[value], ((cell % 64) * 16, (cell // 64) * 16))
        for city in cities:
            for cell, value in enumerate(city["shape"]):
                preview.paste(meta_images[value], ((city["x"] + cell % city["width"]) * 16, (city["y"] + cell // city["width"]) * 16))
        preview.resize((256, 240), Image.NEAREST).save(args.output / "images" / f"minimap_{index}.png")
    output = {"version": 1, "sourceSha256": digest, "tileSize": 16, "paletteIds": palette_ids, "worlds": worlds, "countries": extract_country_metadata(prg)}
    (args.output / "maps" / "worlds.json").write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    assert hashlib.sha256(args.rom.read_bytes()).hexdigest() == digest
    print("已提取三张地图、128 个组合图块、高级/普通/主角各六帧动画，以及地图预览；原 ROM 未变更。")


if __name__ == "__main__":
    _main()
