# GitHub Pages 部署

沿用旧 `element_ui` 项目的 Flutter Web 构建与 Pages 分支发布方式，发布产物存放在 `docs_web_page` 分支。工作流位于 [deploy_web.yml](../.github/workflows/deploy_web.yml)。

## 自动发布

- 每次推送到 `main` 分支自动构建并部署，包括合并 `dev` 后推送到 `main`。
- 也可以在 GitHub 的 Actions 页面选择“部署游戏到 GitHub Pages”，点击 **Run workflow** 手动执行。手动入口需要工作流已存在于仓库默认分支。
- 使用 Flutter `3.47.1` 和已提交的 `pubspec.lock`，不在发布时自动升级依赖。
- 构建前检查 AI Worker 指纹；源码与产物不一致时停止发布。修改 AI 后先在本地运行 `dart run tool/build_ai_worker.dart`，将生成文件和源码一起提交。
- 网页、绘制引擎资源与 AI Worker 一起发布，构建不依赖运行时从 Flutter CDN 加载绘制引擎。

## 新仓库首次设置

1. 将代码推送到新 GitHub 仓库的 `main` 分支，并将其设为默认分支。
2. 等待 Actions 构建完成，自动生成 `docs_web_page` 分支。
3. 打开 **Settings → Pages**，Source 选择 **Deploy from a branch**，Branch 选择 **docs_web_page**，目录选择 **/(root)**，保存。
4. 等待 GitHub 的 Pages 发布完成，使用设置页面显示的地址访问游戏。

工作流使用仓库自带的 `GITHUB_TOKEN`，已声明 `contents: write`，无需迁移旧项目的自定义 Token。组织或仓库策略需要允许 Actions 写入部署分支。产物包含 `.nojekyll`，作为静态文件直接发布；相关设置见 [GitHub Pages 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

## 目录与仓库命名

建议使用 `dragon_ball_heroes`，对应游戏名称“龙珠英雄”；想短一些可以用 `dragon_heroes`。

本地游戏目录名与 GitHub 仓库名可以保持一致。网页路径由 **GitHub 仓库名** 自动计算，本地目录改名不影响构建，也不需要修改 Dart 包名 `pixel_world` 或现有导入。

例如账号仍为 `luoyi58624`、新仓库命名为 `dragon_ball_heroes`，默认访问地址将是 `https://luoyi58624.github.io/dragon_ball_heroes/`。工作流自动使用 `/dragon_ball_heroes/` 作为网页前缀；以后仓库再次改名也会在下次构建时跟随调整。若是 `<账号>.github.io` 根站点仓库，则使用 `/`。

## 本地验证发布构建

将下例中的 `dragon_ball_heroes` 换成实际仓库名：

```powershell
flutter pub get --enforce-lockfile
dart run tool/build_ai_worker.dart --check
flutter build web --release --no-pub --base-href /dragon_ball_heroes/ --no-web-resources-cdn
```

部署目录是 `build/web/`。本地预览需要通过 HTTP 服务将该目录挂载到相同的网页前缀，不要直接双击 HTML 文件。
