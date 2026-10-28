# Changelog / 更新记录

Changes are recorded in both languages, newest first. / 以下按时间倒序记录中英双语更新。

## 2026-10-28 — Initial maintained repository / 首次规范化入库

### English

- Migrated the deployed website source into the independent `wikigsroom/website` repository, preserving the studio pages, 76 AI entries, 18 personal applications and shared visual assets.
- Included the deployed footer update: struck-through `Github(惨遭封禁)` and a GitHub icon plus `现任仓库` linking to `wikigsroom`.
- Included explicit Vite build/output settings and a repository-local Vercel wrapper with account/project verification and isolated credentials.
- Added bilingual README files and architecture, content, operations, media and known-issue guides, plus reproducible screenshots, desktop/mobile recordings, GIFs and a hashed media manifest.
- Added type, source lint, content, documentation and media-freshness checks, with CI. Lint now excludes generated bundles.
- Recorded existing data/localization, routing, placeholder-link and Live2D limitations instead of claiming those issues were repaired by the migration.
- Validation and release provenance: [2026-10-28 release note](docs/releases/2026-10-28.md).

### 简体中文

- 将当前线上官网源码迁入独立的 `wikigsroom/website` 仓库，保留官网页面、76 条 AI 工具、18 个自研应用及视觉素材。
- 纳入已上线页脚改动：为 `Github(惨遭封禁)` 添加删除线，并加入带 GitHub 图标、指向 `wikigsroom` 的 `现任仓库` 入口。
- 纳入明确的 Vite 构建输出配置，以及带账户/项目校验和独立凭证目录的仓库部署脚本。
- 新增中英 README、架构/内容/部署/媒体/已知问题文档，以及可复现的截图、桌面/手机录屏、GIF 和素材哈希清单。
- 增加类型、源码 Lint、内容、文档与媒体时效检查及 CI，避免 Lint 扫描生成产物。
- 如实记录存量翻译、路由、占位链接及 Live2D 问题，未将仓库整理表述为这些问题的修复。
- 验证和发布来源见[本次发布说明](docs/releases/2026-10-28.md)。
