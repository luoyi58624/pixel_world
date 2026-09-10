"""只读提取普通拼杀所需的原始指令，并用 py65 生成逐帧对照数据。"""

import argparse
import hashlib
import json
import sys
from pathlib import Path

SHA256 = 'c6dba3d22e2b27a804c9cb81d43d964a42bb6317e802224bfad07f37d5e3ee59'
BLOCKS = [(0xD0F1, 0xD120), (0xDAC6, 0xDAC8), (0xDC21, 0xDCA5),
          (0xE1C6, 0xE1EC), (0xE3B8, 0xE4BA), (0xE4C4, 0xE690),
          (0xE758, 0xE78F)]


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
    blocks = {start: prg[start + 0x30000:end + 0x30000] for start, end in BLOCKS}
    lines = ['// 由 tool/extract_nes_battle_kernel.py 从用户 ROM 只读提取，请勿手改。',
             '// 仅包含普通拼杀计算、原随机源及阵亡运动；没有整机、画面或音频仿真。',
             '// SHA-256: ' + SHA256,
             '/// 普通拼杀原始指令片段，键为 CPU 起始地址。',
             'const nesBattleBlocks = <int, String>{']
    for start, data in blocks.items():
        lines.append(f'  0x{start:04x}:')
        for offset in range(0, len(data), 48):
            lines.append("      '" + data[offset:offset + 48].hex() + "'")
        lines[-1] += ','
    lines.append('};\n')
    Path('lib/features/battle/domain/nes/nes_battle_bytes.dart').write_text('\n'.join(lines), encoding='utf-8')
    opcodes = set()
    records = []
    cases = [dict(name='equal', seed=12345, attack=[15, 15], hp=[99, 88], soldiers=[4, 4], input='none'),
             dict(name='wall', seed=287454, attack=[5, 19], hp=[99, 88], soldiers=[4, 4], input='none'),
             dict(name='charge', seed=654321, attack=[15, 15], hp=[99, 88], soldiers=[4, 4], input='pulse'),
             dict(name='generals', seed=777, attack=[9, 10], hp=[20, 19], soldiers=[0, 0], input='held')]
    for case in cases:
        m = MPU()
        for start, data in blocks.items():
            m.memory[start:start + len(data)] = data
        m.memory[0x81] = 200
        m.memory[0x83] = 16
        for i in range(3):
            m.memory[0xD0 + i] = case['seed'] >> (8 * i) & 255
        m.memory[0x0E] = 255
        clashes = 0
        walls = [0, 0]

        def call(address, x=None, p=None):
            nonlocal clashes
            if x is not None:
                m.x = x
            if p is not None:
                m.p = p
            m.pc, m.sp = address, 255
            m.stPushWord(0x5FFF)
            for _ in range(40000):
                if m.pc == 0x6000:
                    return
                if m.pc == 0xE3B8:
                    clashes += 1
                if m.pc == 0xE54B:
                    walls[0] += 1
                if m.pc == 0xE5E4:
                    walls[1] += 1
                if m.pc in (0xCF49, 0xE8F3):
                    # 战役死亡登记与精灵写 OAM 不参与此计算；下一轮的进位由主循环 ASL 确定。
                    m.pc = m.stPopWord() + 1
                else:
                    opcodes.add(m.memory[m.pc])
                    m.step()
            raise AssertionError(hex(m.pc))

        for side in range(2):
            count = case['soldiers'][side]
            m.memory[0x244 + side] = side
            m.memory[0x81AC + side] = case['attack'][side]
            m.memory[0x7451 + side] = case['hp'][side]
            m.memory[0x702F + side] = count
            m.memory[0x12 + side] = count * 20
            for slot in [*range(count), 4]:
                m.memory[0x570 + side * 5 + slot] = 128
            call(0xE1D8, x=side)
            call(0xE1C6, x=side)
            call(0xE758, x=side)
        frames = []
        for frame in range(1000):
            m.memory[0x42] = 128 if case['input'] == 'held' or (
                case['input'] == 'pulse' and frame % 5 == 0 and m.memory[0x85] & 128) else 0
            if m.memory[0x574] & m.memory[0x579] & 128:
                call(0xE4C4, p=0x30 if frame == 0 else 0x31)
                call(0xE55C)
            call(0xDC21)
            call(0xE758, x=0)
            call(0xE758, x=1)
            # RAM 快照保留定点小数、随机源、减员槽和阵亡运动，避免只对齐最终胜负。
            values = m.memory[0x80:0x88] + m.memory[0x12:0x1A] + m.memory[0xAE:0xB0]
            values += m.memory[0x7451:0x7453] + m.memory[0xD0:0xD3]
            values += [m.memory[0x0E], m.memory[0x0F], clashes, *walls]
            for base in (0x570, 0x590, 0x5C0, 0x5D0, 0x5E0, 0x5F0, 0x600, 0x610):
                values += m.memory[base:base + 10]
            frames.append(values)
        records.append(dict(**case, frames=frames))
    Path('test/fixtures').mkdir(exist_ok=True)
    Path('test/fixtures/nes_battle_frames.json').write_text(json.dumps(dict(
        sourceSha256=SHA256, scope='隔离普通战斗逐帧计算，不含 PPU、音频、主循环之外的随机调用及战役死亡登记',
        cases=records), separators=(',', ':')) + '\n', encoding='utf-8')
    assert args.rom.read_bytes() == raw
    print('Generated', sum(len(v) for v in blocks.values()), 'code bytes;', len(records) * 1000, 'oracle frames')
    print('Opcodes:', ' '.join(f'{op:02X}' for op in sorted(opcodes)))


if __name__ == '__main__':
    main()
