# 项目约定

## Git 提交

- 本目录是独立 Git 仓库，项目改动在本仓库中提交。
- 提交标题和正文统一使用简体中文，Flutter、Dart、NES 等技术名称及代码标识符保留原文。
- 提交说明准确描述本次改动，不使用无意义的占位标题。

## 国家 AI 开发

- 国家规划核心位于 `lib/world/ai/`，不得导入 Flutter、战役对象或战斗执行器，不得试打、随机采样或逐轮推算未来伤亡。
- 正式运行必须使用常驻 Isolate / Dedicated Worker；同步后端只允许测试显式注入。
- 修改 AI 核心、共享规则或 GameConfig 后，执行 `dart run tool/build_ai_worker.dart`，并将 Worker 和版本指纹一起提交；发布前运行该脚本的 `--check`。
- 只跑改动涉及的 AI、玩法和通信测试。性能日志、浏览器截图和批量对局输出放在忽略的 `build/national_ai/`，不能当作运行时决策数据。
