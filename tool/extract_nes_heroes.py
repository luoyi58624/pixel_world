"""只读提取已校验汉化 ROM 的英雄表，保留原始字节和文件偏移以便复核。"""

import argparse
import csv
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw


ROM_SHA256 = "c6dba3d22e2b27a804c9cb81d43d964a42bb6317e802224bfad07f37d5e3ee59"
# 汉化使用自定义字模而非 Unicode；此表按原字模逐字转写，导出图片可交叉核对。
NAMES = "泽拉斯 亚彭龙 威拉斯 波塞伊 赫拉克 代杜罗 盖亚 柏洛梅 培尔 蒂列洛 爱吉斯 塔洛诺 亚基 乌拉诺 开伦 巴卡 迪亚 卡斯 海伦 奥伊 拉伊奥 帕狄奥 杜洛斯 亚杜尼 尼列沃 伊 普亚金 笛沃卡 帕里斯 塔列安 赫尔梅 思笛沃 纳尔基 奥杜塞 埃庇梅 帕伊安 萨丁亚 库里奥 莫伊 流卡奥".split()


def glyph_tokens(encoded):
    """返回汉化字库页与字符码，忽略结束符及版面填充。"""
    page = None
    for value in encoded:
        if 0x30 <= value < 0x40:
            page = 14 + (value & 15)
        elif 0x40 <= value < 0xE0 and not 0x80 <= value <= 0x93:
            if page is None:
                raise ValueError("缺少汉化字库页")
            yield page, value


def _glyph(prg, page, code):
    index = code - (0x40 if code < 0xA0 else 0x60)
    data = prg[page * 8192 + index * 32 : page * 8192 + (index + 1) * 32]
    image = Image.new("RGB", (16, 16), "black")
    for y in range(16):
        for x in range(16):
            byte = (y // 8 * 2 + x // 8) * 8 + y % 8
            if data[byte] >> (7 - x % 8) & 1:
                image.putpixel((x, y), (255, 255, 255))
    return image


def extract(original):
    """提取 41 位正式英雄，拒绝对不同 ROM 版本套用偏移。"""
    if hashlib.sha256(original).hexdigest() != ROM_SHA256:
        raise ValueError("ROM 与已分析版本不一致，不能套用英雄表偏移")
    prg = original[16:]
    heroes = []
    transcription = {}
    for hero_id in range(41):
        name_offset = None
        encoded = []
        if hero_id < 40:
            name_offset = 0x182B5 + prg[0x1828C + hero_id]
            end = prg.index(0, name_offset)
            encoded = list(prg[name_offset : end + 1])
            tokens = list(glyph_tokens(encoded))
            assert len(tokens) == len(NAMES[hero_id])
            for token, character in zip(tokens, NAMES[hero_id]):
                assert transcription.setdefault(token, character) == character
        packed = prg[0x181DA + hero_id]
        egg_flags = prg[0x18203 + hero_id]
        egg_index = prg[0x1375D + hero_id]
        heroes.append({
            "id": hero_id,
            "name": NAMES[hero_id] if hero_id < 40 else None,
            "nameSource": "rom_glyph_transcription" if hero_id < 40 else "player_input_ram_6FB0",
            "encodedName": encoded,
            "maxHp": prg[0x1822C + hero_id],
            "combat": prg[0x181AC + hero_id],
            "politics": packed >> 4,
            "salary": packed & 15,
            "eggCapable": bool(egg_flags & 0x80),
            "rawEggFlags": egg_flags,
            "initialEggCharges": 3,
            "initialEggState": prg[0x13755 + egg_index],
            "initialStationedSoldiers": 0,
            "soldierLimit": 4,
            "initialAceIds": [],
            "sourceFileOffsets": {
                "name": name_offset + 16 if name_offset is not None else None,
                "maxHp": 0x1823C + hero_id,
                "combat": 0x181BC + hero_id,
                "packedPoliticsSalary": 0x181EA + hero_id,
                "eggFlags": 0x18213 + hero_id,
            },
        })
    return {
        "version": 1, "sourceSha256": ROM_SHA256, "heroes": heroes,
        "notes": {
            "names": "40 个姓名按原字模转写，ID 40 主角姓名来自玩家输入的 RAM，不存在固定 ROM 姓名。",
            "soldiers": "驻城单位的士兵 RAM 在开局清零，行军初始单位设为 4；兵力上限为 4，不是固定英雄属性。",
            "aces": "王牌库存属于 RAM 的动态物品槽，开局清为 FF；召唤蛋与王牌库存不是同一个字段。",
            "egg": "eggCapable 来自 CF77 对 8203+ID 最高位的检查；蛋的具体召唤结果依赖运行状态，未展开。",
            "specialSlots": "初始化循环还处理 41–45 特殊单位槽，内政/报酬表仅覆盖 0–40，不将越界字节解释为英雄属性。",
        },
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("rom", type=Path)
    parser.add_argument("--project", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    original = args.rom.read_bytes()
    result = extract(original)
    data_dir = args.project / "assets" / "data"
    docs_dir = args.project / "docs"
    data_dir.mkdir(parents=True, exist_ok=True)
    docs_dir.mkdir(parents=True, exist_ok=True)
    (data_dir / "rom_heroes.json").write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    with (docs_dir / "nes_heroes.csv").open("w", encoding="utf-8-sig", newline="") as output:
        writer = csv.writer(output)
        writer.writerow(["编号", "姓名", "HP", "战斗", "内政", "报酬", "可持蛋", "HP文件偏移"])
        for hero in result["heroes"]:
            writer.writerow([hero["id"], hero["name"] or "主角（玩家命名）", hero["maxHp"], hero["combat"],
                hero["politics"], hero["salary"], "是" if hero["eggCapable"] else "否", f'0x{hero["sourceFileOffsets"]["maxHp"]:06X}'])
    # 直接还原字模，供人工检查 Unicode 转写，不依赖系统字体绘制英雄姓名。
    chart = Image.new("RGB", (720, 21 * 44), (25, 28, 27))
    draw = ImageDraw.Draw(chart)
    for hero in result["heroes"]:
        column, row = divmod(hero["id"], 21)
        x, y = column * 360, row * 44
        draw.text((x + 5, y + 12), f'{hero["id"]:02}', fill="white")
        for index, (page, code) in enumerate(glyph_tokens(hero["encodedName"])):
            chart.paste(_glyph(original[16:], page, code).resize((32, 32), Image.NEAREST), (x + 35 + index * 32, y))
        if hero["id"] == 40:
            draw.text((x + 35, y + 12), "PLAYER-DEFINED NAME", fill="white")
    chart.save(docs_dir / "nes_hero_names.png")
    assert args.rom.read_bytes() == original
    print(f'已导出 {len(result["heroes"])} 位英雄及原字模核对图；原 ROM 未修改。')


if __name__ == "__main__":
    main()
