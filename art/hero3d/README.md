# 蓝黄冒险者 · 3D 人物原型

依据 `assets/images/hero.png` 的蓝黄配色制作的卡通人物。原图每帧只有 16×16 像素，头盔冠脊、护甲、五官与短披风是本次补充的立体设计。

## 文件

| 文件 | 用途 |
| --- | --- |
| `hero.blend` | 可编辑的 Blender 人物、骨骼、材质、动作及预览摄影棚 |
| `hero.glb` | 单人物网格、材质、骨骼和三套动作，排除了摄影棚与灯光 |
| `hero_preview.png` / `hero_back.png` | 正面与背面预览 |
| `hero_actions.mp4` | 待机、行走、跑步并排演示 |
| `idle.mp4` / `walk.mp4` / `run.mp4` | 各动作的独立循环视频 |
| `model_info.json` | 网格规模、骨骼数和动作时长 |
| `validation.json` | 权重、循环首尾、脚底高度与 GLB 回读验证结果 |

## 在 Blender 中查看

1. 打开 `hero.blend`，文件默认显示行走姿态。
2. 鼠标放在视图区，按空格播放或暂停。按鼠标中键拖动旋转视角，滚轮缩放。
3. 切换动作时，在右侧 Outliner 选择 `Hero_Rig`，将下方编辑器切为 **Dope Sheet → Action Editor**，从动作下拉框选择 `Idle`、`Walk` 或 `Run`。
4. 对应设置时间轴范围：待机 1–48，行走 1–32，跑步 1–24；帧率均为 24 fps。
5. 如要编辑骨骼，打开视图区的 Overlays，选中 `Hero_Rig` 后进入 Pose Mode。文件内的“请先阅读 · 动作与文件”文本也保存了操作说明。

动作末尾另外保存了一帧与首帧相同的关键帧，用于导出时闭合循环；时间轴播放范围排除这张重复帧。

## 模型与动作

- 5,526 个顶点、10,752 个三角面、22 根骨骼、11 种材质，已生成 UV。
- 盔甲与身体分段采用刚性权重，呈现卡通装甲人物的活动方式；披风使用两段骨骼和混合权重。
- `Idle`：呼吸与轻微摆动；`Walk`：交替落脚；`Run`：加大摆臂、前倾并包含腾空阶段。
- 三套动作均为原地循环，游戏中的移动速度由游戏逻辑控制。
- 当前未制作手指或表情动作，也未把模型接入 Flutter 游戏。现有二维画布仍使用原来的角色 PNG。

## 重新生成与验证

在 `pixel_world` 目录执行以下命令，替换 Blender 路径即可：

```powershell
& 'D:\app\blender\blender.exe' --background --factory-startup --python tool/build_hero_3d.py -- --render all
& 'D:\app\blender\blender.exe' --background --factory-startup --python tool/validate_hero_3d.py
python tool/package_hero_previews.py
```

生成器在独立 Blender 进程中工作，输出到本目录；渲染中间帧位于被 Git 忽略的 `build/hero3d/`。打包视频需要可在命令行运行的 FFmpeg。
