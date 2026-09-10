"""从现有城堡图块只读生成接触轮廓，不把草地空白和装饰旗杆算作墙体。"""

import hashlib
import re
from pathlib import Path

from PIL import Image


def extract(root):
    """按城池模板拼合实体像素，生成供 16×16 英雄中心使用的外轮廓。"""
    source = root / 'assets/images/terrain.png'
    image = Image.open(source).convert('RGB')
    templates = re.findall(
        r'(\d): CityAppearance\((\d), (\d), \[([^]]+)\]\)',
        (root / 'lib/features/cities/domain/city_appearance.dart').read_text(encoding='utf-8'),
    )
    output = [
        '// 由 tool/extract_city_contacts.py 从城堡实体像素生成；不修改原图。',
        '// terrain.png SHA256: ' + hashlib.sha256(source.read_bytes()).hexdigest(),
        "import '../../../core/geometry/geometry.dart';", '',
        '/// 已包含英雄半宽、半高各八像素的接触轮廓，坐标相对建筑图块左上角。',
        'const nesCityContactOutlines = <int, List<GamePoint>>{',
    ]
    for level, width, height, values in templates:
        width, height = int(width), int(height)
        tiles = [int(v.strip()) for v in values.split(',')]
        body = set()
        for y in range(height * 16):
            for x in range(width * 16):
                tile = tiles[y // 16 * width + x // 16]
                rgb = image.getpixel((tile % 16 * 16 + x % 16, tile // 16 * 16 + y % 16))
                # 已提取城堡的黑、灰、白属于建筑，彩色像素属于底下的地形。
                if tile == 0 or not rgb[0] == rgb[1] == rgb[2]:
                    continue
                # 79/116 右上方是装饰旗面与旗杆，116 的墙体从第八行接入。
                flag_height = {79: 11, 116: 8}.get(tile, 0)
                if x % 16 >= 12 and y % 16 < flag_height:
                    continue
                body.add((x, y))
        assert body
        expanded = {(x + dx, y + dy) for x, y in body
                    for dx in range(-8, 9) for dy in range(-8, 9)}
        edges = {}
        for x, y in expanded:
            for neighbor, start, end in [
                ((x, y - 1), (x, y), (x + 1, y)),
                ((x + 1, y), (x + 1, y), (x + 1, y + 1)),
                ((x, y + 1), (x + 1, y + 1), (x, y + 1)),
                ((x - 1, y), (x, y + 1), (x, y)),
            ]:
                if neighbor not in expanded:
                    assert start not in edges
                    edges[start] = end
        start = min(edges)
        point = start
        contour = []
        while True:
            contour.append(point)
            point = edges.pop(point)
            if point == start:
                break
        assert not edges, '城堡轮廓应连通且没有内孔'
        corners = []
        for i, b in enumerate(contour):
            a, c = contour[i - 1], contour[(i + 1) % len(contour)]
            if (b[0] - a[0]) * (c[1] - b[1]) != (b[1] - a[1]) * (c[0] - b[0]):
                corners.append(b)
        output.append('  ' + level + ': [')
        output.extend('    GamePoint(%d, %d),' % corner for corner in corners)
        output.append('  ],')
        print('level %s: %d contour corners, body y=%d..%d' % (
            level, len(corners), min(y for x, y in body), max(y for x, y in body) + 1))
    assert len(templates) == 5
    output.append('};')
    (root / 'lib/features/cities/data/nes_city_contacts.dart').write_text('\n'.join(output) + '\n', encoding='utf-8')


if __name__ == '__main__':
    extract(Path(__file__).resolve().parents[1])
