"""逐帧比较导出的图集时间线与原 ROM 的 OAM/PPU 输出，发现差异立即报错。"""
import argparse
import hashlib
import json
import struct
from pathlib import Path

from PIL import Image
import extract_nes_weapon_animation as fx


def verify(rom, project):
    """只读运行十五段原动画，验证默认红蓝高级将领的每帧像素与绘制优先级。"""
    original = rom.read_bytes()
    if hashlib.sha256(original).hexdigest() != fx.SHA256:
        raise ValueError('ROM 版本不匹配')
    fx.prg = original[16:]
    metadata = json.loads((project / 'assets/data/weapon_animations.json').read_text())
    atlas = Image.open(project / 'assets/images/battle/weapon_effects.png').convert('RGBA')
    data = (project / 'assets/data/weapon_animations.bin').read_bytes()
    assert data[:6] == b'NWFX1\x0f'
    position, clips = 6, {}
    for _ in range(data[5]):
        kind, count = struct.unpack_from('<BH', data, position)
        position += 3
        frames = []
        for _ in range(count):
            count = data[position]
            position += 1
            draws = []
            for _ in range(count):
                draws.append(struct.unpack_from('<BHBB', data, position))
                position += 5
            frames.append(draws)
        clips[kind] = frames
    assert position == len(data) and len(clips) == 15
    rows = []
    for kind, frames in clips.items():
        run = fx.Run(kind)
        run.stop_at_impact = True
        run.call(0xa901, a=kind)
        assert len(frames) == len(run.frames)
        same, bad, samples = 0, [], []
        for index, (draws, native) in enumerate(zip(frames, run.frames)):
            expected = Image.new('RGBA', (256, 224))
            actual = Image.new('RGBA', (256, 224))
            source = fx.oam_image(native, range(64))
            if source:
                expected.alpha_composite(source[0], (source[1], source[2]))
            for actor, pose, x, y in draws:
                group, variants = metadata['poses'][pose]
                variant = {0: 0, 1: 0, 2: 1, 3: 3}.get(group, 0)
                sx, sy, w, h, ox, oy = metadata['sprites'][variants[min(variant, len(variants) - 1)]]
                actual.alpha_composite(atlas.crop((sx, sy, sx + w, sy + h)), (x + ox, y + oy))
            if actual.tobytes() == expected.tobytes():
                same += 1
            else:
                bad.append(index)
            if index in [len(frames) // 4, len(frames) // 2, len(frames) * 3 // 4]:
                samples.append({'frame': index, 'rgbaSha256': hashlib.sha256(expected.tobytes()).hexdigest()})
        print(kind, same, '/', len(frames), 'bad', bad[:8], flush=True)
        rows.append({'id': kind, 'frames': len(frames), 'matching': same, 'bad': bad, 'samples': samples})
    assert rom.read_bytes() == original
    assert all(not row['bad'] for row in rows), '原动画逐帧像素不一致'
    (project / 'docs/nes_weapon_animation_verification.json').write_text(
        json.dumps({'sourceSha256': fx.SHA256, 'clips': rows}, indent=2) + '\n', encoding='utf8')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('rom', type=Path)
    parser.add_argument('--project', type=Path, default=Path('.'))
    args = parser.parse_args()
    verify(args.rom, args.project)
