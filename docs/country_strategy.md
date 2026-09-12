# 国家战略 AI

对应 `.claude/plan/national_ai_strategy.md`。国家规划已迁入纯 Dart 核心：原生平台使用一个常驻 Isolate，Web 使用一个常驻 Dedicated Worker；活动地图内所有电脑国家共用后台。切图、重开和页面生命周期变化会关闭旧会话，旧结果不能操作新世界。

AI 不创建战斗实例，不试打、不随机采样、不逐轮推算伤亡，也不读取敌方隐藏目的地。实际战斗继续使用原来的 NES 内核。静态属性余量只是风险指标，不能当作胜率或必胜承诺。

## 运行流程

1. 主环境每个实际推进帧最多准备一份国家观察；开局立即开始，普通间隔五秒，威胁和战斗变化会提前重评。
2. 后台合并同国待办，最多同时执行一个请求。优先级加等待时间调度，更新观察保留排队资历。后台在有限阶段间让出控制权处理取消。
3. 全国联合比较防御、回援、调防、武器截击、撤离、整备和扩张，共用国库、兵员、装备及入城预留。
4. 回复只是建议。主环境验证会话、构建、规则、地图、观察年龄、实体及指令版本，再调用与玩家相同的合法接口。完整动作组先验费用，前置操作失败就停止依赖动作。
5. 部队保存持续任务和合法路段。战斗、撤退锁定不能通过普通移动绕过；目标变化、死亡和失城会释放任务。

正式工厂从不回退到同步规划。`SynchronousAiWorker` 仅供测试显式注入，用于推进实际游戏做回归。后台故障最多重启两次，此后明确降级，仅保留有界守城保护。

## 守城、回援与撤离

`H` 为城内存活驻军，包含交战中的守将。战前 `B` 为建筑等级；本场攻城开始后，`B = initialCityLevel - victories`。战中升级不会增加本场名额。

明确威胁下优先修复 `H > B`，覆盖留守偏好和招募容量。比较高内政主持升级、最少解雇筹款、合法调防、在外核心回援和武器截击。守将沿实际名单反向出场；城内守军不能使用武器。主环境接敌和换守将前另有有限保护，只能合法升级或解雇，不能改血量、强移锁定英雄或增加金币。

`H <= B` 只说明能出场，不能证明守得住。战力评估与保全价值分开，内政和稀有度不能冒充伤害。打不过时比较保存核心、进驻安全友城或及时夺取空城据点。对仍有守军的新据点，不承诺能在失城时限内必然拿下。必须真正进城改变归属城，才能避免随原城被清除；仅走出城门不算获救。

援军共同占用兵员、资金和到达名额。一人足够时保留其他有效远征；前线满名额优先截击或先修复名额。和平后方允许短期接收“招募容量 + rearStagingExtra”位，默认额外一位；期限为普通承诺期的两倍，默认二十秒。到期仍超员时依法升级或清理可操作的低价值将领。玩家进城、招募的真实容量规则没有改变。

失城清除、战后清除标记和撤退返程照旧执行。锁定将领不能直接改道、扎营、解雇。无合法解时记录 `unsalvageableDefense`；搜索配额不足则明确记录“尚未找到”，不能混称无解。

## 扩张与后勤

目标结合城防、实际守军、产出、地形路费、占城规模和有限仇恨比较。明显更好的弱目标优先，接近同分才用独立种子打破平局。强城先准备全队装备、自动领取的兵员和排队粮草；无法供养整队就保留筹备状态，不零散送将。

路线沿真实地形边界积分，有限绕点会检查中途敌城和可见野外敌军。来敌只按位置、最近运动和公开交战状态推断，不读取隐藏命令、敌方库存或未来随机结果。

预算逐英雄保存粮草零头，覆盖去程、排队、交战余量、返程及月俸；检查每月到账前后的现金低点和欠收情况，长途自动扩展范围。未占领城池的未来收入不提前花。采购、最高可能签约费、新增月俸、解雇返款及容量裁兵均入同一本账。

装备低价优先，最多三件；开场首件按实际规则考虑，后续武器仅列入可能兑现上界，自伤和先手致命风险单独处理。AI 不额外释放武器或修改概率。消耗截击要有实际防线收益，并计入牺牲将领、装备和兵员代价。

普通任务有十秒承诺期；同一截击目标的小幅变化不反复下令。低粮草、低生命、任务失效或拦截结束后返城整备，危险解除后继续评估扩张。停滞诊断记录缺钱、风险、名额或配额原因。

## 配置与模块

策略入口为 `GameConfig.nationalAi`，类型 `AiTuning`。默认每请求最多 96 个候选、160 次静态评估、6000 次地形步、24 条命令；单队最多四将、目标粗筛最多六城。保留国家候选最多四份且不超过 `maxPlans`。真实规则仍由 `GameConfig` 和资源 JSON 适配；初始金币和逐城留守数继续读 `campaign_config.json5`。旧的 `countryAiInitialDelay`、`countryAiInterval` 等遗留字段不再驱动新规划器。

| 文件 | 职责 |
|---|---|
| `ai/country_brain.dart` | 全国比较、经营、任务和扩张 |
| `ai/defense_planner.dart` | 修复、回援、截击、撤离 |
| `ai/combat_assessment.dart` | 无模拟的静态风险区间 |
| `ai/budget.dart`、`ai/routes.dart` | 资源与路线 |
| `ai/runtime/` | 后端、协议、排队、取消、重启 |
| `ai_observation_bridge.dart` | 公平观察和规则适配 |
| `ai_executor.dart` | 过期验证及实际命令 |
| `ai_runtime_bridge.dart` | 帧调度、任务推进、轻量保护 |

以上路径均位于 `lib/world/`。

## 开发和发布

修改 AI 核心、共享战斗规则、GameConfig 或 Worker 入口后，先生成后台，再启动或构建 Flutter：

```powershell
dart run tool/build_ai_worker.dart
dart run tool/build_ai_worker.dart --check
flutter run -d windows
# 浏览器开发同样先生成 Worker
flutter run -d chrome
```

`web/ai/worker.js` 与版本指纹一起提交。构建指纹统一换行符以兼容 Windows Git；`--check` 是只读校验，过期返回非零。热重载不自动编译独立入口，改后台后须重新生成并热重启。旧 Worker 与新 UI 混用会明确报版本不符。

```powershell
flutter build windows --release
flutter build web --release --no-web-resources-cdn
flutter build web --release --wasm --no-web-resources-cdn
```

Worker URL 按文档 baseURI 解析，支持子目录，并带构建指纹。服务端把 `.js`、`.mjs` 配为 JavaScript，把 `.wasm` 配为 `application/wasm`；安全策略允许同源 `worker-src 'self'`。发布应整体更新网页和 Worker。

## 验证

```powershell
flutter test test/features/ai/country_ai_runtime_test.dart test/features/ai/country_defense_safety_test.dart test/features/ai/country_reinforcement_test.dart test/features/ai/country_evacuation_test.dart test/features/ai/country_ai_routes_test.dart
flutter test test/features/ai/country_ai_worker_fixture_test.dart
node tool/verify_ai_worker.mjs
flutter test test/features/ai/country_ai_campaign_test.dart --dart-define=AI_CAMPAIGN_SECONDS=300 --dart-define=AI_CAMPAIGN_SEEDS=101,223,337 --dart-define=AI_CAMPAIGN_LABEL=heldout_new
```

页面性能验收用 `--dart-define=AI_PROFILE=true --base-href=/strategy/` 构建，再运行 `node tool/verify_ai_worker.mjs --mode debug-js --web-root build/ai_debug_js --seconds 15`。工具使用专用无头 Chrome，记录实际页面拖拽、后台身份、通信和主环境耗时，正式构建默认不打印诊断。实测结果与局限见 [验收记录](national_ai_validation.md)。
