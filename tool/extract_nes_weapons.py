"""从已校验的汉化 ROM 只读提取十五种切札、售价、解锁和直接伤害。"""
import argparse
import hashlib
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw
from extract_nes_heroes import ROM_SHA256, _glyph, glyph_tokens

NAMES = ['箭', '矛', '刀', '枪', '圣枪', '陆龙卷', '台风', '强击手', '死枪', '斧', '剑', '钩', '戟', '杖', '炮']


def extract(raw):
    """依据名称指针、价格掩码及效果分派表生成可调整的武器目录。"""
    if hashlib.sha256(raw).hexdigest() != ROM_SHA256:
        raise ValueError('ROM 版本不同，拒绝套用武器偏移')
    prg = raw[16:]
    weapons = []
    for i, name in enumerate(NAMES):
        offset = 0x180D6 + prg[0x180C7 + i]
        encoded = list(prg[offset:prg.index(0, offset)+1])
        packed = prg[0x180B8+i]
        effect, tier = packed >> 3, packed & 7
        weapons.append(dict(
            id=i, name=name, price=prg[0x180A9+i] & 31,
            damage=prg[0x16966+effect], selfDamage=255 if effect == 8 else 0,
            romPrice=prg[0x180A9+i] & 31, romDamage=prg[0x16966+effect],
            minimumCities=tier, shopEnabled=tier != 7,
            effectId=effect, encodedName=encoded,
            sourceFileOffsets=dict(name=offset+16, price=0x180B9+i,
                                   packedEffect=0x180C8+i, damage=0x16976+effect),
        ))
    return dict(version=1, sourceSha256=ROM_SHA256, carryLimit=3, weapons=weapons,
                initialCountryStock={},
                notes=dict(names='按 ROM 字模转写，名称不是 Unicode 搜索所得。',
                           price='bank6: 9BFE、9C31 读取 80A9+ID 并 AND 1F。',
                           unlock='9B89–9B94 取 80B8+ID 的低三位，以本国城数解锁；7 为事件专属。',
                           damage='DE8D–DE92 取高五位，bank5 A92A 读取 A966+效果ID，调用 E40C 直接伤害。',
                           selfDamage='bank5 A934–A93F：效果8追加对己方255点伤害。',
                           consume='DE82–DE8A：先读取705D+英雄ID×3+槽号，再以FF清空。'))


def verify_damage(raw, catalog):
    """隔离运行原 E40C，检查小兵吸收、将领溢出及死枪反噬。"""
    from py65.devices.mpu6502 import MPU
    prg = raw[16:]
    rows = []
    for weapon in catalog['weapons']:
        m = MPU()
        m.memory[0x8000:0xC000] = prg[0x14000:0x18000]
        m.memory[0xC000:] = prg[0x3C000:]
        for side in range(2):
            m.memory[0x244+side] = side
            m.memory[0x7451+side] = 95
            m.memory[0x702F+side] = 4
            m.memory[0x12+side] = 80
            for slot in range(5): m.memory[0x570+side*5+slot] = 128
        def call(damage, side):
            m.a, m.x, m.pc, m.sp, m.p = damage, side, 0xE40C, 255, 0x30
            m.stPushWord(0x5FFF)
            for _ in range(40000):
                if m.pc == 0x6000: return
                if m.pc in (0xCF49, 0xE8F3):
                    m.pc = m.stPopWord()+1
                else: m.step()
            raise AssertionError('伤害例程未退出')
        call(weapon['damage'], 1)
        if weapon['selfDamage']: call(weapon['selfDamage'], 0)
        expected = max(0, 175-weapon['damage'])
        assert m.memory[0x13]+m.memory[0x7452] == expected
        if weapon['selfDamage']: assert m.memory[0x12]+m.memory[0x7451] == 0
        rows.append(dict(id=weapon['id'], damage=weapon['damage'], enemyPool=m.memory[0x13],
                         enemyHp=m.memory[0x7452], ownHp=m.memory[0x7451]))
    return rows


def main():
    """导出玩法 JSON、原字模预览和独立计算证据，原文件始终只读。"""
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom',type=Path)
    parser.add_argument('--py65-path',type=Path, default=Path('build/nes_analysis/deps'))
    args=parser.parse_args()
    sys.path.insert(0,str(args.py65_path))
    raw=args.rom.read_bytes()
    catalog=extract(raw)
    evidence=verify_damage(raw,catalog)
    reference=Path('docs/reference/rom_weapons_original.json')
    reference.parent.mkdir(parents=True,exist_ok=True)
    if reference.exists():
        frames={w['id']:w.get('animationFrames',60) for w in json.loads(reference.read_text(encoding='utf8'))['weapons']}
        for weapon in catalog['weapons']:
            if weapon['id'] in frames: weapon['animationFrames']=frames[weapon['id']]
    reference.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    original_weapons=json.loads(json.dumps(catalog['weapons']))
    out=Path('assets/data/rom_weapons.json')
    old={}
    if out.exists():
        previous=json.loads(out.read_text(encoding='utf8'))
        old={w['id']:w for w in previous['weapons']}
        for weapon in catalog['weapons']:
            for key in ['price','damage','selfDamage','animationFrames']:
                if weapon['id'] in old and key in old[weapon['id']]: weapon[key]=old[weapon['id']][key]
        catalog['initialCountryStock']=previous.get('initialCountryStock',{})
    catalog['weapons']=[w for w in catalog['weapons'] if w['id'] not in (6,7,8)]
    catalog['carryLimit']=1
    for weapon in catalog['weapons']:
        order=[0,9,1,10,2,11,3,12,4,13,5,14].index(weapon['id'])
        # 重新提取保留用户调参；首次导出采用单件武器的新默认数值。
        weapon['price']=old.get(weapon['id'], {}).get('price', (order+1)*5)
        weapon['damage']=old.get(weapon['id'], {}).get('damage', weapon['romDamage']+5)
        weapon['romMinimumCities']=weapon['minimumCities']
        weapon.pop('minimumCities')
        weapon['unlockYear'] = old.get(weapon['id'], {}).get('unlockYear', [0,9,1,10,2,11,3,12,4,13,5,14].index(weapon['id']) // 3 + 1)
        weapon['shopEnabled']=True
    catalog['notes']['gameplay']='每名将领最多携带一件武器；默认伤害在原版基础上加5，售价按商店顺序从5递增5；商店每年解锁一行三种，每轮最多自动使用一件；移除台风、强击手、死枪。原始记录位于 docs/reference/rom_weapons_original.json。'
    out.write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    Path('docs/nes_weapons_evidence.json').write_text(json.dumps(
        dict(sourceSha256=ROM_SHA256, examples=evidence),ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    sheet=Image.new('RGB',(152,15*20),'black')
    draw=ImageDraw.Draw(sheet)
    for weapon in original_weapons:
        y=weapon['id']*20
        draw.text((0,y+3),str(weapon['id']),fill='white')
        for x,(page,code) in enumerate(glyph_tokens(weapon['encodedName'])):
            sheet.paste(_glyph(raw[16:],page,code),(20+x*16,y))
    sheet.resize((456,900),Image.NEAREST).save('docs/nes_weapon_names.png')
    assert args.rom.read_bytes()==raw
    print(json.dumps(evidence,ensure_ascii=False))


if __name__=='__main__': main()
