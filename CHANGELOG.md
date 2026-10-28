# Changelog / 更新记录

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
