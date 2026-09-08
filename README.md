# 像素远征 · 世界地图

基于 Flutter 的像素地图探索原型，按参考视频还原地形和城堡。包含三张 64×60 格地图、城池信息、角色行走、水面动画、镜头控制及小地图。

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
| 点击地面 | 角色寻路行走 |
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
- `lib/world/world_data.dart`：地图定义、城池定义和四方向寻路。
- `lib/world/world_camera.dart`：与屏幕无关的镜头坐标和缩放约束。
- `lib/world/world_controller.dart`：探索、选中、行军及场景切换状态。
- `lib/world/world_assets.dart`：按图块数据生成地图绘制缓存。
- `lib/world/world_painter.dart`：静态地图与动态精灵绘制。
- `lib/ui/world_screen.dart`：输入、工具栏、小地图和城池面板。

地图的事实来源是 JSON 与图块集。启动时将静态地形和建筑拼接成图像缓存，每帧只更新角色、选框、路线、水面及镜头，不为每个格子创建 Widget。像素绘制关闭纹理平滑。

## 素材来源与原型范围

地形位平面、组合表、地图布局、城堡模板和角色图块，从用户提供的《半熟英雄中文版》ROM 只读提取。源文件 SHA-256 为 `c6dba3d22e2b27a804c9cb81d43d964a42bb6317e802224bfad07f37d5e3ee59`。工程不包含原始 ROM，运行也不依赖模拟器。

RGB 配色按参考视频校准；水面动画、角色寻路、地图展示名、界面及通行规则是本原型的实现。通行规则使用调色板分组粗分水域和山地，不冒充原作完整地形逻辑。城池未知字段保存在 `sourceRecord` 中，没有据此编造经济、战斗或招募数值。当前实现地图探索，不包含攻城、战斗、招募或存档。

三张地图的压缩数据分别位于 ROM 文件偏移 `0x010BC7`、`0x01146B`、`0x011D2D`，包含 10、11、12 条初始城池记录。

需要重新提取时，先安装 Python Pillow，再运行：

```powershell
python tool/extract_nes_map.py "你的 ROM 路径"
```

提取器校验指定 ROM 版本的哈希，不修改输入文件。日常运行和修改 Flutter 代码无需执行提取器。

## 检查

```powershell
flutter analyze
flutter test test/navigation_test.dart test/map_render_test.dart
```
