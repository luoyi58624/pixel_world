# 野外决战与场景素材

敌对部队行军、扎营或城下待战时，中心距离到达 16 个地图原生像素便触发一对一野战。同国部队不交战，已经参与城战或野战的部队不重复进入另一场交战。检测使用每个固定时间步的相对移动线段，双方同时停在相遇处；第三支部队继续自己的行动，城内正在进行的攻城也继续推进。

地形取相遇点，不取出发城或目的地。山地、河流、草地/树林及普通地面都使用完整将领攻击，野战环境不施加战斗属性削弱；当前桥梁等结构地形沿用草地场景与规则。每名存活小兵提供 1 点碰撞强度、20 点兵力，阵亡立即扣除强度。野战没有城池攻击和士气加成，红条上限为 100；双方使用同一套普通拼杀规则，AI评估同步使用完整将领攻击，详见 [内核接入说明](nes_battle_rebuild.md)。

野战期间不能改道或扎营，但双方将领均可尝试 [撤退](battle_retreat.md)：六成失败并阵亡，成功保留伤势及残兵、原路回城，对方恢复原指令。正常胜方保留血量及兵损，继续原来的目的地；原来驻扎者获胜后继续驻扎。败方英雄按既定回收规则处理，出发城不降级、不易主。主角阵亡仍会结束游戏。野战在后台运行，可以点击地图刀剑标记或角色面板的“进入观战”，返回地图不停止战斗。

原来排队攻城的胜者继续原目标、保留抵达顺序；交战期间暂时让出入城资格，其他等待者可以先接战。已经被其他友军占领的目标按友城进驻，已经易主为另一敌国的目标按新驻军接战。等待队列详见 [攻城队列](siege_queue.md)。

## 素材

以下三张 PNG 使用内置 image_gen 工具（imagegen 技能的内置模式）生成，未使用 CLI。生成文件复制到项目，原始输出保留。游戏加载时以最近邻采样缓存成 256×144，仅加载一次，三张缓存约占 432 KiB RGBA 内存；绘制时复用缓存。

- [草地背景](../assets/images/battle/field_grass.png)：D:/project/my-project/my_games/pixel_world/assets/images/battle/field_grass.png
- [河流背景](../assets/images/battle/field_river.png)：D:/project/my-project/my_games/pixel_world/assets/images/battle/field_river.png
- [山地背景](../assets/images/battle/field_mountain.png)：D:/project/my-project/my_games/pixel_world/assets/images/battle/field_mountain.png

这些背景是新游戏制作素材，不是原 NES 背景的提取结果；城内战场继续使用原有城池素材。

## 实际使用的提示词

### grass

Use case: stylized-concept. Asset type: final background texture for a 2D NES-style pixel strategy battle. Create ONE landscape 16:9 background, no characters, no interface, no text, no frames. Emulate a native 256x144 pixel canvas enlarged with nearest-neighbor: chunky crisp square pixels, very limited 8-bit palette, flat color clusters, no smooth gradients, no antialiasing, no modern painted detail. Fixed side-facing battle camera with a slightly elevated view of the ground, like an old console RPG battlefield. Horizon and scenery occupy only top 25%, the lower 75% is a spacious continuous flat fighting floor with subtle repeated tiny pixel texture. Do not obstruct the fighting zone. No castles, walls, curtains, buildings, roads leading into the distance, foreground objects, units, swords or UI. Uniform readable lighting, dark muted terrain so small bright sprites remain readable. Scene: a grassland clearing. Low dark-green woodland silhouettes and distant rounded hills at the upper edge. Broad deep green grassy ground across the lower three quarters, sparse olive and moss-green grass tufts as tiny pixel clusters. Calm clear blue sky confined to top strip. Palette: forest green, moss, muted olive, dark teal. Match the coarse pixel density of a Famicom game.

### mountain

Use case: stylized-concept. Asset type: final background texture for a 2D NES-style pixel strategy battle. Create ONE landscape 16:9 background, no characters, no interface, no text, no frames. Emulate a native 256x144 pixel canvas enlarged with nearest-neighbor: chunky crisp square pixels, very limited 8-bit palette, flat color clusters, no smooth gradients, no antialiasing, no modern painted detail. Fixed side-facing battle camera with a slightly elevated view of the ground, like an old console RPG battlefield. Horizon and scenery occupy only top 25%, the lower 75% is a spacious continuous flat fighting floor with subtle repeated tiny pixel texture. Do not obstruct the fighting zone. No castles, walls, curtains, buildings, roads leading into the distance, foreground objects, units, swords or UI. Uniform readable lighting, dark muted terrain so small bright sprites remain readable. Scene: a rocky mountain pass. Jagged ochre and charcoal peaks only in upper quarter, distant slate-blue silhouettes, narrow blue-gray sky strip. Broad level dark brown and muted ochre rocky earth across lower three quarters, sparse tiny stone pixel clusters. No large boulders in fighting zone. Palette: charcoal, bronze, muted gold, dark olive, slate blue. Match the coarse pixel density of a Famicom game.

### river

Use case: stylized-concept. Asset type: final background texture for a 2D NES-style pixel strategy battle. Create ONE landscape 16:9 background, no characters, no interface, no text, no frames. Emulate a native 256x144 pixel canvas enlarged with nearest-neighbor: chunky crisp square pixels, very limited 8-bit palette, flat color clusters, no smooth gradients, no antialiasing, no modern painted detail. Fixed side-facing battle camera with a slightly elevated view of the ground, like an old console RPG battlefield. Horizon and scenery occupy only top 25%, the lower 75% is a spacious continuous flat fighting floor with subtle repeated tiny pixel texture. Do not obstruct the fighting zone. No castles, walls, curtains, buildings, roads leading into the distance, foreground objects, units, swords or UI. Uniform readable lighting, dark muted terrain so small bright sprites remain readable. Scene: a shallow river ford, the entire lower three quarters is open flat water, with sparse small horizontal pale-blue ripple pixel clusters over dark teal and deep blue. Far bank with low green trees and gray stones confined to the upper quarter, narrow muted blue sky strip. No bridge, no stepping stones or islands obstructing the fighting space. Quiet shallow-water battlefield. Palette: deep teal, navy, desaturated blue, pale cyan, forest green. Match the coarse pixel density of a Famicom game.
