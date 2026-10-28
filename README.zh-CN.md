# sidcloud Notes 博客

[English](README.md) · [简体中文](README.zh-CN.md) · [博客分支](https://github.com/wikigsroom/website/tree/blog) · [官网源码](https://github.com/wikigsroom/website/tree/main)

这是 sidcloud 技术博客，使用 React 18、TypeScript 和 Vite 6，正式维护于 **`wikigsroom/website` 仓库的 `blog` 分支**。工作室官网在同一仓库的 `main` 分支独立维护。

当前共有 24 篇文章，其中 Blog 六篇、Research 十八篇。已实现全文搜索、栏目/分类/标签筛选、最新/阅读时长/标题排序、年份归档、文章阅读、目录、阅读进度、字号调整、本地收藏及复制链接。正文和图片均为本地打包内容，不需要应用后端或账户登录。

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
| [`src/styles.css`](src/styles.css) | 暗色玻璃风格、霓虹高亮和响应式布局 |
| [`public/assets/`](public/assets/) | 本地图片，构建时复制到产物 |
| [`scripts/optimize-covers.mjs`](scripts/optimize-covers.mjs) | 使用原生 FFmpeg 生成卡片/头图 WebP 封面 |

Hash 路由：`#/` 为文章列表，`#/research` 为研究栏目，`#/post/<slug>` 为具体文章。应用监听 hash 变化，文章链接共用静态 HTML 入口；`#archive` 滚动到归档区。

搜索会去掉输入两端空格、转为小写，并在标题、副标题、摘要、分类、栏目/优先级/来源信息、标签和正文中匹配子串。栏目、分类、标签和查询条件必须同时满足。默认按日期倒序，阅读时长排序为长文优先。列表首次展示八篇，每次“加载更多”增加六篇。

收藏仅保存在当前浏览器的 `localStorage["sidcloud-blog-bookmarks"]`，不跨设备同步；分享功能使用剪贴板 API 复制当前链接。

新增文章需维护唯一且稳定的 `slug`、标题/副标题、日期、分类、标签、封面、阅读分钟数、摘要及类型化正文。正文支持段落、标题、列表、引用和代码块；标题应提供稳定 ID 供目录跳转。只维护整理后的 Research 导出内容，不将私人研究工作区整体复制进 Git。

在 `public/assets/generated-covers/` 添加 PNG/JPEG 封面后，准备 `PATH` 上的原生 `ffmpeg` 并执行：

```sh
npm run optimize:covers
```

脚本在 `optimized/card/`、`optimized/hero/` 中生成 WebP，最大宽度分别为 640/1120。原图与优化结果一起提交。既有 Vercel 忽略规则不上传生成封面的 PNG/JPEG 原图，因此需要确保 WebP 优化版本齐全。

## 分支与更新约定

| 工作目录 | 远程 | 分支 |
| --- | --- | --- |
| 博客（原工作区 `blogs/`） | `origin`：`git@github.com:wikigsroom/website.git` | `blog` |
| 官网（原工作区 `website/`） | 同一个仓库 | `main` |

保留原博客 Git 历史，迁移基点为 `671d7ff`。原 checkout 中通过 `legacy-blog` 保留旧地址 `git@github.com:carzygod/blog.git` 供追溯。新 clone 只需 `origin`，后续更新均推送 `origin/blog`。

每次用户要求更新博客时：

1. 在 `blog` 分支修改相关源码、数据和素材。
2. 同步两种 README，在 [CHANGELOG.md](CHANGELOG.md) 中补充带日期的说明；界面变化时更新相关截图和录屏。
3. 执行 `npm run lint`、`npm run build`，检查差异；涉及界面行为时验证实际效果。
4. 暂存已检查的文件，编写具体提交说明并推送：

```sh
git switch blog
git add <reviewed-files>
git diff --cached --check
git commit -m "Describe the blog update"
git push origin blog
```

不要覆盖官网 `main`、强制推送或把常规更新发往旧仓库。[AGENTS.md](AGENTS.md) 保存了此规则。CI 对 `blog` 推送和 PR 执行 Lint/构建检查。

## 部署与凭证

已有 Vercel 博客项目名为 `blogs`，与官网项目 `sidcloud` 分离。Git 同步不代表已完成 Vercel 发布；用户要求部署时需独立验证生产结果，并在更新记录中保存结果。

已授权 Windows 登录继续隔离保存在 Git 外的 `%LOCALAPPDATA%\sidcloud\vercel-profile`。使用工作区的独立部署工具，并核验目标为博客项目；保留默认全局 Vercel 登录状态。不得提交 `.vercel/`、`.env*`、依赖/构建目录或账户凭证。
