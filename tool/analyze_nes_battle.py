"""只读验证指定 ROM 的普通碰撞战斗，直接执行原 6502 子程序并导出证据。"""

import argparse
import hashlib
import json
import sys
from pathlib import Path


ROM_SHA256 = 'c6dba3d22e2b27a804c9cb81d43d964a42bb6317e802224bfad07f37d5e3ee59'


def main():
    """校验 ROM 后在隔离内存运行纯计算例程，不启动或改动用户的模拟器。"""
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom', type=Path)
    parser.add_argument('--py65-path', type=Path)
    parser.add_argument('--output', type=Path, default=Path('docs/nes_battle_evidence.json'))
    args = parser.parse_args()
    if args.py65_path:
        sys.path.insert(0, str(args.py65_path))
    from py65.devices.mpu6502 import MPU
    original = args.rom.read_bytes()
    assert hashlib.sha256(original).hexdigest() == ROM_SHA256, '不能对不同版本套用偏移'
    prg = original[16:]

    def machine():
        m = MPU()
        m.memory[0x8000:0xC000] = prg[0x18000:0x1C000]
        m.memory[0xC000:] = prg[0x3C000:]
        return m

    def call(m, address, a=0, x=0, random_byte=0):
        m.a, m.x, m.pc, m.sp = a, x, address, 0xFF
        m.p = 0x30
        m.stPushWord(0x5FFF)
        random_calls = 0
        for _ in range(20000):
            if m.pc == 0x6000:
                return random_calls
            if m.pc == 0xD102:
                # 只替换随机源；D0F1 的取模及其零页副作用仍执行原始指令。
                m.a = (random_byte + random_calls) & 0xFF
                random_calls += 1
                m.p = (m.p & ~0x82) | (m.a & 0x80) | (2 if m.a == 0 else 0)
                m.pc = (m.stPopWord() + 1) & 0xFFFF
            else:
                m.step()
        raise AssertionError(f'例程未结束: {address:04X}, PC={m.pc:04X}')

    def victim(m, pool=80, count=4):
        m.memory[0x0244] = 40
        m.memory[0x7451 + 40] = 95
        m.memory[0x702F + 40] = count
        m.memory[0x12] = pool
        for slot in range(count):
            m.memory[0x0570 + slot] = 0x80

    powers = []
    for hero_id in [0, 26, 27, 40]:
        m = machine()
        m.memory[0x244] = hero_id
        m.memory[0x702F + hero_id] = 4
        call(m, 0xE1D8)
        base, collision = m.memory[0x1A], m.memory[0x1C]
        call(m, 0xE1C6)
        stamina = m.memory[0xAE]
        call(m, 0xE4BA, x=hero_id)
        assert m.a == 80
        powers.append(dict(heroId=hero_id, combat=base, soldiers=4,
                           baseCollisionPower=collision, initialBar=stamina, armyPool=m.a))

    ranges = []
    for power in range(41):
        observed = set()
        for random_byte in range(256):
            m = machine()
            victim(m)
            m.memory[0x16] = power
            call(m, 0xE411, random_byte=random_byte)
            observed.add(80 - m.memory[0x12])
            assert m.memory[0x7451 + 40] == 95
        q = (power + 2) // 4
        assert observed == set(range(q + 1, q * 2 + 2))
        ranges.append(dict(power=power, min=min(observed), max=max(observed)))

    victims = []
    for random_byte in range(4):
        m = machine()
        victim(m)
        call(m, 0xE40C, a=20, random_byte=random_byte)
        dead = [i for i in range(4) if not m.memory[0x570 + i] & 0x80]
        assert dead == [random_byte]
        assert m.memory[0x12] == 60 and m.memory[0x702F + 40] == 3
        victims.append(dict(randomByte=random_byte, removedSlot=dead[0], armyPool=60, soldierCount=3))

    m = machine()
    victim(m, pool=5, count=1)
    m.memory[0x16] = 23
    call(m, 0xE411, random_byte=0)
    overflow = dict(damage=7, initialPool=5, remainingPool=m.memory[0x12],
                    initialHeroHp=95, remainingHeroHp=m.memory[0x7451 + 40])
    assert overflow['remainingPool'] == 0 and overflow['remainingHeroHp'] == 93

    impulses = []
    for own, opponent in [(23, 23), (23, 13), (13, 23)]:
        m = machine()
        call(m, 0xE649, a=own, x=opponent)
        raw = (m.a << 8) | m.y
        impulses.append(dict(own=own, opponent=opponent, signed8_8=raw - 65536 if raw & 32768 else raw))

    blocks = [(0xE1C6, 0xE1EC), (0xE3B8, 0xE40C), (0xE411, 0xE4C4),
              (0xE4C4, 0xE55C), (0xE55C, 0xE5F5), (0xE649, 0xE690),
              (0xE96E, 0xE9AD), (0xD0F1, 0xD120)]
    result = dict(sourceSha256=ROM_SHA256,
                  scope='普通将领碰撞；隔离运行纯计算例程，仅替换 D102 随机字节源，未模拟完整 PPU/音频/输入时序。',
                  initExamples=powers, damageRanges=ranges, randomCasualties=victims,
                  overflow=overflow, recoilExamples=impulses,
                  sourceBlocks=[dict(cpuStart=f'{start:04X}', fileOffset=f'{start + 0x30010:06X}',
                                     bytes=prg[start + 0x30000:end + 0x30000].hex()) for start, end in blocks])
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    assert args.rom.read_bytes() == original
    print(json.dumps({k: result[k] for k in ['initExamples', 'overflow', 'recoilExamples']}, ensure_ascii=False, indent=2))
    print('已执行并核对 41 组碰撞强度 × 256 个随机字节、伤害溢出和随机减员；原 ROM 未修改。')


if __name__ == '__main__':
    main()
