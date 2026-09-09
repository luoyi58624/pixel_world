"""只读执行原版士气随机前段，生成双方自动控制的逐帧对照记录。"""

import argparse
import hashlib
import json
import sys
from pathlib import Path

from extract_nes_battle_kernel import BLOCKS, SHA256


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom', type=Path)
    parser.add_argument('--py65-path', type=Path, required=True)
    args = parser.parse_args()
    sys.path.insert(0, str(args.py65_path))
    from py65.devices.mpu6502 import MPU
    raw = args.rom.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == SHA256
    prg = raw[16:]
    cases = [
        dict(name='both_auto', attack=[15, 15], hp=[95, 95], soldiers=[4, 4], seed=12345),
        dict(name='limited_morale', attack=[1, 3], hp=[58, 71], soldiers=[2, 4], seed=789),
    ]
    result = []
    for case in cases:
        cpu = MPU()
        for start, end in BLOCKS:
            cpu.memory[start:end] = prg[start + 0x30000:end + 0x30000]
        cpu.memory[0x81], cpu.memory[0x83], cpu.memory[0x0E] = 200, 16, 255
        for i in range(3):
            cpu.memory[0xD0 + i] = case['seed'] >> (8 * i) & 255
        clashes, walls = 0, [0, 0]

        def call(address, x=None, p=None, stop=None):
            nonlocal clashes
            if x is not None: cpu.x = x
            if p is not None: cpu.p = p
            cpu.pc, cpu.sp = address, 255
            cpu.stPushWord(0x5FFF)
            for _ in range(40000):
                if cpu.pc in (0x6000, stop): return
                if cpu.pc == 0xE3B8: clashes += 1
                if cpu.pc == 0xE54B: walls[0] += 1
                if cpu.pc == 0xE5E4: walls[1] += 1
                if cpu.pc in (0xCF49, 0xE8F3):
                    cpu.pc = cpu.stPopWord() + 1
                else:
                    cpu.step()
            raise AssertionError(hex(cpu.pc))

        for side in range(2):
            cpu.memory[0x244 + side] = side
            cpu.memory[0x81AC + side] = case['attack'][side]
            cpu.memory[0x7451 + side] = case['hp'][side]
            count = case['soldiers'][side]
            cpu.memory[0x702F + side] = count
            cpu.memory[0x12 + side] = count * 20
            for slot in [*range(count), 4]: cpu.memory[0x570 + side * 5 + slot] = 128
            call(0xE1D8, x=side)
            call(0xE1C6, x=side)
            call(0xE758, x=side)
        phase, clock = 0, 0
        frames = []
        for frame in range(700):
            cpu.memory[0x42] = 0
            if cpu.memory[0x574] & cpu.memory[0x579] & 128:
                saved = [cpu.memory[a] for a in (0x17, 0x18, 0x19, 0xAF)]
                cpu.memory[0x17:0x1A] = [phase, clock, cpu.memory[0x0F]]
                cpu.memory[0xAF] = cpu.memory[0xAE]
                # 只复用原电脑士气逻辑，不执行其随后的左军移动代码。
                call(0xE55C, p=0x30 if frame == 0 else 0x31, stop=0xE587)
                phase, clock = cpu.memory[0x17:0x19]
                cpu.memory[0x0F], cpu.memory[0xAE] = cpu.memory[0x19], cpu.memory[0xAF]
                for address, value in zip((0x17, 0x18, 0x19, 0xAF), saved): cpu.memory[address] = value
                call(0xE4C4)
                call(0xE55C)
            call(0xDC21)
            call(0xE758, x=0)
            call(0xE758, x=1)
            values = cpu.memory[0x80:0x88] + cpu.memory[0x12:0x1A] + cpu.memory[0xAE:0xB0]
            values += cpu.memory[0x7451:0x7453] + cpu.memory[0xD0:0xD3]
            values += [cpu.memory[0x0E], cpu.memory[0x0F], clashes, *walls]
            for base in (0x570, 0x590, 0x5C0, 0x5D0, 0x5E0, 0x5F0, 0x600, 0x610):
                values += cpu.memory[base:base + 10]
            frames.append(values)
        result.append(dict(**case, frames=frames))
    Path('test/fixtures/nes_auto_charge_frames.json').write_text(json.dumps(dict(
        sourceSha256=SHA256,
        scope='原 E55C-E586 士气逻辑映射到右军，双方原指令执行；这项自动控制扩展不声称是原手动玩家输入',
        cases=result), ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    assert args.rom.read_bytes() == raw
    print('Generated', sum(len(c['frames']) for c in result), 'native automatic-morale oracle frames')


if __name__ == '__main__':
    main()
