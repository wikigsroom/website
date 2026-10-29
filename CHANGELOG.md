# Changelog / 更新记录

## 2026-10-29 — Editorial refresh / 标题与正文重写

- 中文：逐篇重写 46 篇测评标题、独立摘要与正文，新增三点提要与两个分析章节；日期单列，681 条证据与 89 次引用归属不变。
- English: Rewrote 46 headlines, decks and narratives, with three takeaways and two analysis chapters; dates and evidence associations remain intact.
- 中文：统一封面、主题分类、推荐与关联标题，调整字形、短句换行与手机间距，文章打开时直接回到顶部。
- English: Unified cover/card/related titles and topic categories; refined typography, phrase wrapping and responsive spacing.
- 中文：刷新截图、MP4/GIF 及浏览器验收，新增固定目标的博客独立账户部署入口。
- English: Refreshed screenshots, recordings and browser verification; added a guarded blog deployment wrapper.
- 中文：已通过独立账户发布到 [正式博客](https://blog.sidcloud.cn/#/benchmark)，线上 46 篇文章与本地构建文件全部核对通过，默认账户文件未变化。
- English: Published through the isolated account; all 46 production articles and exact build files are verified, with default account files unchanged.
- [更新详情 / Release details](docs/releases/2026-10-29-editorial-refresh.md) · [生产验收 / Production proof](docs/releases/2026-10-29-editorial-production.json)。

## 2026-10-29 — All benchmark batches as journals / 全部测评按批次成文

### English

- Added 46 batch journals from Benchmark 1.9.0, covering all 681 unique records and labeling 89 cross-batch references. The blog now has 70 articles.
- Added the Benchmark section, expandable evidence, inputs/parameters/metrics/limits, original asset links and selected media previews. Preserved failure, preparation, historical and review states, with distinct batch/publication dates.
- Reused Benchmark HTTPS media and added an optional ignored local directory junction; original benchmark media is not duplicated in Git or blog builds.
- Added 46 batch covers and repaired two missing Research covers. Corrected Notes section navigation and adjusted text-cover proportions.
- Added bilingual publishing/material documentation, the complete batch index, screenshots, desktop/mobile MP4s and GIFs, coverage/media verification scripts and CI checks.
- Validation: lint, TypeScript/Vite build, all-batch coverage, 46 browser routes/770 expansions, search/reader/bookmark/media checks and four responsive widths. Browsers and temporary servers are closed after capture.
- Source updates target `origin/blog`; this entry does not claim a Vercel production deployment. [Release details](docs/releases/2026-10-29-benchmark-batches.md).

### 简体中文

- 将 Benchmark 1.9.0 的全部 46 批测评整理为博客，覆盖 681 条独立记录，另标明 89 次跨批次引用，博客共 70 篇。
- 新增测评日志栏目、逐项展开的输入/参数/指标/限制、原始素材链接与代表样本预览，保留失败、准备、历史和复核状态，区分测评日期与整理日期。
- 线上复用 Benchmark HTTPS 素材，本地提供忽略目录内的可选目录联接，不复制测评影音到 Git 或博客构建。
- 增加 46 张批次封面，补齐两张缺失的 Research 封面，修复 Notes 栏目切换并调整文字封面比例。
- 同步双语方案说明、全批次目录、截图、桌面/手机 MP4 与 GIF、覆盖/媒体验收脚本和 CI 检查。
- 验证包括 Lint、类型/Vite 构建、全批次覆盖、46 个浏览器路由/770 次展开，以及搜索、阅读、收藏、素材和四种屏幕宽度；录制后关闭浏览器和临时服务。
- 源码推送 `origin/blog`；本条不代表已完成 Vercel 生产部署。[更新详情](docs/releases/2026-10-29-benchmark-batches.md)。

## 2026-10-29 — Blog branch migration / 博客分支迁移

### English

- Moved ongoing blog maintenance to the `blog` branch of `git@github.com:wikigsroom/website.git`, preserving the original history through `671d7ff` and the existing 24 articles and assets.
- Set `origin` and the default push destination to the website repository; retained the former remote as `legacy-blog` for reference.
- Added bilingual README files covering runtime/content logic, cover optimization, branch synchronization and isolated deployment credentials.
- Persisted future update/commit/push rules in `AGENTS.md`, added blog-specific lint/build CI, and excluded local environment files from Git.
- Validation: `npm run lint` and `npm run build` passed; the latter includes TypeScript checking and Vite production compilation.
- The official website remains on `main`. This is a Git/source synchronization; no Vercel deployment is included.

### 简体中文

- 将后续博客维护迁至 `git@github.com:wikigsroom/website.git` 的 `blog` 分支，保留截至 `671d7ff` 的原 Git 历史、已有 24 篇文章和素材。
- `origin` 和默认推送目标改为官网仓库，通过 `legacy-blog` 保留旧远程地址供追溯。
- 补充中英 README，说明运行/内容逻辑、封面优化、分支同步和独立部署凭证。
- 在 `AGENTS.md` 中保存后续更新、提交与推送规则，增加博客 Lint/构建 CI，并将本地环境文件排除在 Git 外。
- 验证：`npm run lint`、`npm run build` 通过；后者包含 TypeScript 检查和 Vite 生产构建。
- 官网继续维护在 `main`。本次只同步 Git/源码，不包含 Vercel 发布。
