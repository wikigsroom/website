# Changelog / 更新记录

Changes are recorded in both languages, newest first. / 以下按时间倒序记录中英双语更新。

## 2026-10-29 — Additional domain verification file / 新增域名验证文件

### English

- Added `/b8261e943cb1290db1a42a32c0ee9566.txt` with the exact 40-byte body `ec8ff0c82edb079d74fc8fc19d6c709828a0650a` as a root-level static verification file.
- Listed both verification files in the English/Chinese READMEs and operations guides, preserving the previously published file. Existing UI screenshots and recordings remain applicable.
- Deployment and HTTP verification results are tracked in the [release note](docs/releases/2026-10-29-domain-verification-b8261e94.md).

### 简体中文

- 新增根路径静态验证文件 `/b8261e943cb1290db1a42a32c0ee9566.txt`，正文严格为 40 字节：`ec8ff0c82edb079d74fc8fc19d6c709828a0650a`。
- 中英 README 和部署文档列出两个验证文件，持续保留此前已发布的文件。现有界面截图和录屏继续适用。
- 部署与 HTTP 验证结果记录于[本次发布说明](docs/releases/2026-10-29-domain-verification-b8261e94.md)。

## 2026-10-29 — Domain verification / 域名验证

### English

- Added `/17df1b98016e4dce51cf8d4080665747.txt` with the exact public verification body `ce49460b29a0a3d3fbf87ef530c8954f96e0258c`, served from Vite's `public/` directory.
- Documented file retention and exact-body verification in both languages. Root-level hexadecimal `.txt` verification files are excluded from the visual-source digest; the existing screenshots and recordings remain applicable.
- Deployment and verification results are tracked in the [release note](docs/releases/2026-10-29-domain-verification.md).

### 简体中文

- 新增 `/17df1b98016e4dce51cf8d4080665747.txt`，正文严格为 `ce49460b29a0a3d3fbf87ef530c8954f96e0258c`，由 Vite 的 `public/` 目录提供根路径静态访问。
- 同步双语文件保留与精确正文检查说明。根目录十六进制文件名的 `.txt` 验证文件不纳入视觉源码指纹，现有截图和录屏继续适用。
- 部署与验证结果记录于[发布说明](docs/releases/2026-10-29-domain-verification.md)。

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
