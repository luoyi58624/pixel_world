# 像素远征 · 世界地图

基于 Flutter 的像素地图探索原型，按参考视频还原地形和城堡。包含三张 64×60 格地图、城池信息、两种英雄、直线行军、水面动画、镜头控制及小地图。

## 运行

```powershell
flutter pub get
flutter run -d windows
```

浏览器运行：`flutter run -d chrome`。

Windows 发布构建：`flutter build windows --release`。输出在 `build/windows/x64/runner/Release/`，分发时保留整个目录。

## 操作

| 操作 | 功能 |
|---|---|
| 拖动地图 / WASD / 方向键 | 平移镜头 |
| Shift + 方向键 | 加速镜头 |
| 滚轮 / 双指缩放 / 加减按钮 | 缩放地图 |
| 点击地面 | 角色直线行军，支持任意角度斜走 |
| 右侧人物按钮 | 切换进阶英雄和普通英雄 |
| 点击城堡 | 查看位置、驻留单位数、前往城门 |
| 点击或拖动小地图 | 快速定位 |
| 空格 | 回到初始据点 |
| F | 查看全图 |
| G | 显示网格 |
| M | 显示小地图 |
| 1 / 2 / 3 | 切换地图 |
| Esc | 关闭城池信息 |

## 数据与显示

- `assets/maps/worlds.json`：基础地形编号、城堡模板、位置、单位编号。
- `assets/images/terrain.png`：128 个 16×16 组合图块。
- `assets/images/hero/advanced.png`、`normal.png`：每位英雄一张 96×16 图集，六帧固定为正面 A/B、背面 A/B、左侧面 A/B。
- `lib/world/hero_sprite.dart`：八方向判定、角色外观及六帧动画选择。
- `lib/world/world_data.dart`：地图定义、城池定义、直线路线和地形速度。
- `lib/world/world_camera.dart`：与屏幕无关的镜头坐标和缩放约束。
- `lib/world/world_controller.dart`：探索、选中、行军及场景切换状态。
- `lib/world/world_assets.dart`：按图块数据生成地图绘制缓存。
- `lib/world/world_painter.dart`：静态地图与动态精灵绘制。
- `lib/ui/world_screen.dart`：输入、工具栏、小地图和城池面板。

地图的事实来源是 JSON 与图块集。启动时将静态地形和建筑拼接成图像缓存，每帧只更新角色、选框、路线、水面及镜头，不为每个格子创建 Widget。像素绘制关闭纹理平滑。人物和镜头保留连续坐标，合成到屏幕位置后才按设备物理像素对齐；地图与水面共用对齐原点，避免斜走、镜头跟随及 175% 屏幕缩放时产生额外抖动。英雄帧按当前物理尺寸缓存，移动时只平移缓存图像；改变显示尺寸时释放旧缓存，同一尺寸最多缓存两位英雄的 12 张帧图。

## 素材来源与原型范围

地形位平面、组合表、地图布局、城堡模板和角色图块，从用户提供的《半熟英雄中文版》ROM 只读提取。源文件 SHA-256 为 `c6dba3d22e2b27a804c9cb81d43d964a42bb6317e802224bfad07f37d5e3ee59`。工程不包含原始 ROM，运行也不依赖模拟器。

地形 RGB 配色按参考视频校准。角色从 ROM 的部件组合表和翻转属性表重建六帧动画，配色按用户截图核对，普通英雄下装使用独立的浅色调色板。左侧面素材在向右时镜像，斜向复用左右侧面；动画步频随实际行军速度变化，静止保留朝向。原 `assets/images/hero.png` 保留给已有 3D 美术文件作参考，游戏改为加载 hero 子目录下的两张完整动画图集。

按用户指定规则，地图内所有地形均可通行，始终沿当前位置到目标的最短直线移动，不绕山、不绕河；平地速度为 44 原生像素/秒，山地 60%、水面 50%，桥梁和建筑保持正常速度。跨格边界时分段计算速度，斜走不会额外加速，途中改点立即从当前像素位置转向。地形分类仍按图块调色板分组，城池未知字段保存在 `sourceRecord` 中，没有据此编造经济、战斗或招募数值。当前实现地图探索，不包含攻城、战斗、招募或存档。

三张地图的压缩数据分别位于 ROM 文件偏移 `0x010BC7`、`0x01146B`、`0x011D2D`，包含 10、11、12 条初始城池记录。

需要重新提取时，先安装 Python Pillow，再运行：

```powershell
python tool/extract_nes_map.py "你的 ROM 路径"
```

提取器校验指定 ROM 版本的哈希，不修改输入文件。日常运行和修改 Flutter 代码无需执行提取器。

## 检查

```powershell
flutter analyze
flutter test test/navigation_test.dart test/hero_sprite_test.dart test/map_render_test.dart
```
