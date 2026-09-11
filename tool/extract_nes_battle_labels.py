"""只读提取四十位原版将领的姓名字模，供战斗面板按原生像素显示。"""
import argparse
import hashlib
from pathlib import Path
from PIL import Image
from extract_nes_heroes import ROM_SHA256, _glyph, extract, glyph_tokens

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('rom', type=Path)
args = parser.parse_args()
raw = args.rom.read_bytes()
assert hashlib.sha256(raw).hexdigest() == ROM_SHA256
sheet = Image.new('RGB', (48, 40 * 16), 'black')
for hero in extract(raw)['heroes']:
    if hero['id'] == 40:
        continue
    for column, (page, code) in enumerate(glyph_tokens(hero['encodedName'])):
        sheet.paste(_glyph(raw[16:], page, code), (column * 16, hero['id'] * 16))
sheet.save('assets/images/battle/hero_names.png')
assert args.rom.read_bytes() == raw
