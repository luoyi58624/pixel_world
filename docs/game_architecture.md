# 游戏目录与运行方式

运行入口为 `lib/main.dart`。源文件和测试按功能对应归档，旧的 `lib/world`、`lib/ui` 平铺目录已迁移。

```text
lib/
  core/
    config/       全局玩法参数
    geometry/     纯数值坐标、区域，以及 Flutter 边界转换
    time/         固定步长与 1 / 2 / 4 / 8 / 16 倍速
  features/
    world_map/    地图数据、行军、镜头、地图绘制和主界面
    cities/       城堡形状、接触轮廓、城池面板
    heroes/       英雄资料、动画、招募、角色面板
    battle/       实际战斗、原版字节内核、战斗绘制
    weapons/      武器目录、动画资源、国家武器库
    campaign/     战役聚合状态；按 ai / battles / economy / countries / events 分组
    ai/           国家规划、资源账本、哨兵、后台通信
    economy/      月结规则
    countries/    国家旗帜与国家日志面板
    events/       分国事件模型
    app/          暂停与结束面板
  simulation/     无界面的战役实验与监测
test/
  core/           时钟与数值几何
  features/       与功能目录对应的测试
  simulation/     倍速一致性与模拟验证
  support/        显式测试场景和随机源
```

## 依赖边界

战役、英雄、城池接触和真实战斗只使用 `GamePoint / GameSize / GameRect`，不再依赖 `dart:ui`。绘制和手势通过 `flutter_geometry.dart` 的 `toGame / toUi` 转换数值；转换不做额外缩放，镜头仍负责屏幕与世界坐标变换。

`CampaignState` 保留全局资源与实体一致性，各玩法通过分类后的 `part` 文件共同提交变更。国家 AI 只读取公平观察，不能导入战役或战斗执行器。无界面实验调用同一个 `CampaignState` 和真实战斗内核，实验记录不会回灌 AI。

## 倍速

顶部倍率按钮选择 1、2、4、8、16 倍。`GameClock` 累积游戏时间并按 1/60 秒步进，行军、战斗、AI、粮草和月结同步加速。镜头拖拽、键盘平移与惯性使用实时时间。

单帧最多推进 60 个逻辑步，卡顿后的剩余时间保留到下一帧，避免阻塞界面。暂停与切图清除待补时间；继续时不会补算暂停时长。1 倍与 16 倍在相同种子下的纯数据终态一致。

## 无窗口模拟

在项目根目录运行：

```powershell
dart run tool/simulate.dart --speed 16 --seconds 600 --worlds 0,1,2 --seeds 101,223,337 --label trial
```

每组在独立 Isolate 中运行，不创建 Flutter 应用、Widget、Canvas 或图像。默认 `deterministic` 是测试入口显式注入的确定性后端，用来比较配置和倍率；正式游戏仍使用常驻后台。

验证真实后台通信可用：

```powershell
dart run tool/simulate.dart --backend native --speed 16 --seconds 120 --worlds 2 --seeds 503 --label native_trial
```

原生模式等待后台计算完成再推进下一批游戏步，避免离线高速循环让运算任务来不及返回。它用于合法性验收，不等于真实设备的帧率测量。离线模拟不等待显示器刷新，实际运行速度可能远高于所选的逻辑倍率。

输出位于 `build/simulations/<label>/`：`results.json` 包含逐国初末状态、30 秒采样、资源异常、守城名额、断粮、短间隔改派、统一结果和终态签名；每国还有独立的最终决策 JSONL。

需要排查异步计划被拒绝时，添加 `--trace` 保留分国原始事件，包括请求、回复、抽取和签约；游戏面板仍只展示最终决策。

修改 AI 或共享规则后运行 `dart run tool/build_ai_worker.dart`，发布前加 `--check`。目录迁移和几何类型调整后，开发中的旧实例需要热重启。

## 本次验收

已通过 212 项相关测试，覆盖 AI、战役、战斗、暂停、倍速、武器、城池接触、像素绘制与窄屏布局；并复验了最新的纯数据模拟和 Worker 对照数据。静态检查无问题，Web 与 Windows Release 构建成功。

真实浏览器中已操作 16 倍速和暂停：约 10 秒内从一月进入三月；运行时一个后台 Worker，暂停后为零。浏览器后台的 24 次决策回复与原生对照一致。这里未把无头浏览器的帧率作为玩家设备性能结论。
