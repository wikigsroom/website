# sidcloud Notes 博客

[English](README.md) · [简体中文](README.zh-CN.md) · [博客分支](https://github.com/wikigsroom/website/tree/blog) · [官网源码](https://github.com/wikigsroom/website/tree/main)

这是 sidcloud 技术博客，使用 React 18、TypeScript 和 Vite 6，正式维护于 **`wikigsroom/website` 仓库的 `blog` 分支**。工作室官网在同一仓库的 `main` 分支独立维护。

当前共有 **70 篇文章：46 篇测评批次日志、18 篇 Research、6 篇 Blog 笔记**。测评日志覆盖 Benchmark **1.9.0（2026-10-29）**的全部 **681 条独立记录**，包括失败、准备、历史和资料核查状态；另外 **89 次跨批次引用**单独标明，不算新增实验。

支持搜索、栏目/分类/标签筛选、排序、归档、目录、阅读进度、大字、收藏和复制链接。正文、证据数据与封面本地打包，影音等大素材复用 Benchmark 的公开地址，不需要应用后端或账户登录。

[全部 46 个批次](docs/benchmark-batches.md) · [素材复用方案](docs/benchmark-materials.md) · [本次更新详情](docs/releases/2026-10-29-benchmark-batches.md) · [截图、录屏与 GIF](docs/media/README.md)

## 本地运行

使用原生 Node.js 22 和 npm：

```sh
git clone --branch blog --single-branch git@github.com:wikigsroom/website.git blogs
cd blogs
npm ci
npm run dev
```

打开 Vite 输出的网址。检查并预览生产构建：

```sh
npm run lint
npm run build
npm run preview
```

`build` 执行 TypeScript 检查并生成 `dist/`，`preview` 提供该构建的本地预览。检查后停止临时服务，关闭不用的浏览器标签页。全程使用原生工具，不运行 Docker 或 WSL。

## 内容与使用逻辑

| 文件或目录 | 职责 |
| --- | --- |
| [`src/App.tsx`](src/App.tsx) | Hash 导航、搜索/筛选/排序状态、阅读器、收藏和分享 |
| [`src/data/posts.ts`](src/data/posts.ts) | `Post`/`ContentBlock` 类型、六篇 Blog 和合并后的文章导出 |
| [`src/data/researchPosts.ts`](src/data/researchPosts.ts) | 十八篇整理后的 Research 内容、优先级及来源引用 |
| [`src/data/benchmarkEditorial.ts`](src/data/benchmarkEditorial.ts) | 各批次人工核对的导语、阅读方法与结论 |
| [`src/data/benchmarkPosts.ts`](src/data/benchmarkPosts.ts) | 一批一篇的文章生成、统计、来源与关联批次链接 |
| [`src/data/benchmarkIndex.json`](src/data/benchmarkIndex.json) | 冻结的公开摘要索引，用于导航与搜索 |
| [`src/data/benchmarkSnapshot.json`](src/data/benchmarkSnapshot.json) | 完整证据、参数、输入、指标和公开素材引用 |
| [`src/components/BenchmarkResults.tsx`](src/components/BenchmarkResults.tsx) | 打开批次文章时载入，逐项展开结果并标明本批/引用 |
| [`src/components/ArticleMedia.tsx`](src/components/ArticleMedia.tsx) | 带控制条、说明和失败回退的原素材预览 |
| [`src/styles.css`](src/styles.css) | 暗色玻璃风格、霓虹高亮和响应式布局 |
| [`public/assets/`](public/assets/) | 本地图片，构建时复制到产物 |
| [`scripts/optimize-covers.mjs`](scripts/optimize-covers.mjs) | 使用原生 FFmpeg 生成卡片/头图 WebP 封面 |

Hash 路由：`#/` 为全部文章，`#/benchmark` 为测评日志，`#/research` 为研究栏目，`#/notes` 为六篇 Blog 笔记，`#/post/<slug>` 为具体文章。测评 slug 固定为 `benchmark-<round.id>`，所有路由共用静态 HTML 入口；`#archive` 滚动到归档区。测评文章的“返回列表”回到测评日志栏目。

搜索会去掉输入两端空格、转为小写，并在标题、副标题、摘要、分类、栏目/优先级/来源信息、标签和正文中匹配子串。栏目、分类、标签和查询条件必须同时满足。默认按日期倒序，阅读时长排序为长文优先。列表首次展示八篇，每次“加载更多”增加六篇。

收藏仅保存在当前浏览器的 `localStorage["sidcloud-blog-bookmarks"]`，不跨设备同步；分享功能使用剪贴板 API 复制当前链接。

新增文章需维护唯一且稳定的 `slug`、标题/副标题、日期、分类、标签、封面、阅读分钟数、摘要及类型化正文。正文支持段落、标题、列表、引用、代码、表格、图片、视频、音频、链接与批次结果；标题应提供稳定 ID 供目录跳转。只维护整理后的公开内容，不将私人工作区整体复制进 Git。

在 `public/assets/generated-covers/` 添加 PNG/JPEG 封面后，准备 `PATH` 上的原生 `ffmpeg` 并执行：

```sh
npm run optimize:covers
```

脚本在 `optimized/card/`、`optimized/hero/` 中生成 WebP，最大宽度分别为 640/1120。原图与优化结果一起提交。既有 Vercel 忽略规则不上传生成封面的 PNG/JPEG 原图，因此需要确保 WebP 优化版本齐全。

## 测评日志的发布逻辑

来源中每条 `rounds[]` 对应一篇文章，按 `caseIds` 原顺序提供全部记录，包括有 130 条记录的历史 TTS 批次。展开条目可读到已记录的执行标记、计时范围、成品时长、指标、输入、参数、核验、限制和原始证据。完整证据包在打开批次文章时载入，条目关闭时不挂载详细正文。搜索包含条目 ID、标题、模型名和摘要。

文章日期表示原测评批次日期，另列 2026-10-29 为整理日期。逐项表展示冻结快照的当前状态，正文保留历史观察；`generated=true` 表示已有执行，不代表质量通过。纯复核批次即使没有新增记录也保留独立文章；缺失结果不补造。

后续刷新公开快照：

```sh
npm run benchmark:sync
# 核对来源变化，为新增批次补充人工整理的正文。
npm run benchmark:covers
npm run benchmark:index
npm run lint
npm run build
npm run check:benchmark
npm run docs:media
npm run release:check
```

同步脚本读取 [公开目录](https://benchmark.sidcloud.cn/api/catalog)，核对关联、规范素材 URL、移除本机路径并保存来源 SHA-256，不覆盖人工正文。接纳新增批次时，主动更新 `scripts/check-benchmark.mjs` 的预期值；当前要求 46 个批次、681 条归属记录、89 次引用、70 篇文章。除数量外还需审核结论和状态变化。构建和 CI 使用已提交快照，不临时拉取变化的数据。

Windows 下可选的本地素材入口：

```powershell
npm run benchmark:link -- "E:\dev\sandbox\windows操控\模型测评发布包-无损优化版"
```

脚本在 `.vercel/benchmark-source/archive` 建立 **目录联接（Junction）**，其他系统使用目录软链接。当前 Windows 进程无法创建真正的 SymbolicLink，采用目录联接可以避免更改系统设置。该入口仅供本地浏览，位于忽略目录且不放入 `public/`。线上采用绝对 HTTPS 素材引用：本地文件系统链接无法跨两个 Vercel 项目使用，构建时复制联接内容也会重复上传素材。详见 [素材方案和边界](docs/benchmark-materials.md)。

![测评栏目概览](docs/media/benchmark-20261029/batch-overview-desktop.png)

![批次阅读演示](docs/media/benchmark-20261029/batch-walkthrough.gif)

演示展示文章导航与证据展开，不代表重新运行 GPU 测评或完成主观质量评审。[媒体目录](docs/media/README.md) 提供完整 MP4 和移动端截图。使用原生 Chrome，以及 `PATH` 上的 FFmpeg 复现；新机器需先执行一次 `npx playwright-core install ffmpeg` 安装 Playwright 的原生录制辅助程序：

```sh
npm run build
npm run docs:media
```

可用 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`、`FFMPEG_PATH`、`FFPROBE_PATH` 指定本机程序。脚本检查 46 个路由、展开全部 770 次关联，验证筛选、收藏、阅读控制和 320/390/768/1440px 布局；正常结束或失败时都会关闭自己的浏览器和预览服务。只提交最终媒体与验收报告，原始录屏留在忽略目录。

## 分支与更新约定

| 工作目录 | 远程 | 分支 |
| --- | --- | --- |
| 博客（原工作区 `blogs/`） | `origin`：`git@github.com:wikigsroom/website.git` | `blog` |
| 官网（原工作区 `website/`） | 同一个仓库 | `main` |

保留原博客 Git 历史，迁移基点为 `671d7ff`。原 checkout 中通过 `legacy-blog` 保留旧地址 `git@github.com:carzygod/blog.git` 供追溯。新 clone 只需 `origin`，后续更新均推送 `origin/blog`。

每次用户要求更新博客时：

1. 在 `blog` 分支修改相关源码、数据和素材。
2. 同步两种 README，在 [CHANGELOG.md](CHANGELOG.md) 中补充带日期的说明；界面变化时更新相关截图和录屏。
3. 内容/界面变化后刷新媒体，再执行 `npm run release:check`（Lint、类型/构建、覆盖和文档检查），核对差异与实际效果。
4. 暂存已检查的文件，编写具体提交说明并推送：

```sh
git switch blog
git add <reviewed-files>
git diff --cached --check
git commit -m "Describe the blog update"
git push origin blog
```

不要覆盖官网 `main`、强制推送或把常规更新发往旧仓库。[AGENTS.md](AGENTS.md) 保存了此规则。CI 对 `blog` 推送和 PR 执行 Lint/构建/覆盖/文档检查；文档媒体不上传 Vercel。

## 部署与凭证

已有 Vercel 博客项目名为 `blogs`，与官网项目 `sidcloud` 分离。Git 同步不代表已完成 Vercel 发布；用户要求部署时需独立验证生产结果，并在更新记录中保存结果。

已授权 Windows 登录继续隔离保存在 Git 外的 `%LOCALAPPDATA%\sidcloud\vercel-profile`。使用工作区的独立部署工具，并核验目标为博客项目；保留默认全局 Vercel 登录状态。不得提交 `.vercel/`、`.env*`、依赖/构建目录或账户凭证。
