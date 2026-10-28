# Contribution and maintenance / 维护与协作

[English README](README.md) · [中文 README](README.zh-CN.md)

## English

1. Work in this repository and keep the change focused on the user's requested behavior.
2. Edit the authoritative data source from the README content table. Keep both UI locales when introducing translated text.
3. Add a dated English/Chinese explanation to [CHANGELOG.md](CHANGELOG.md): what changed, why, and validation performed. Record deployment information in a release note when applicable.
4. Update both versions of affected documentation. For UI/content changes, run `npm run docs:media`; commit the final images, videos, GIFs and manifest together.
5. Run `npm run release:check`. Review `git diff`, `git diff --check` and the staged file list. Generated `dist/`, temporary recordings and credentials are excluded.
6. Commit with a specific message, then `git push origin main`. If the remote advanced, integrate the remote changes; do not overwrite them with a force push.
7. For a requested live release, use `pwsh -File scripts/vercel.ps1 Production`, verify the production domain and synchronize the resulting release notes to GitHub.

Local work uses native Node.js, PowerShell, Chromium and FFmpeg. Docker/WSL are not used. Shut down the browser and local server after media capture or QA. The CI workflow checks committed code, links and media freshness; it does not hold production credentials.

## 简体中文

1. 在此仓库维护源码，修改范围应对应用户要求的具体行为。
2. 按 README 的内容表编辑真正生效的数据源，增加翻译文本时维护两种语言。
3. 在 [CHANGELOG.md](CHANGELOG.md) 中补充有日期的中英说明，写明改动、原因与验证；涉及线上部署时增加对应发布说明。
4. 同步相关文档的两种版本。界面或展示内容变化后执行 `npm run docs:media`，将截图、视频、GIF 和清单一起提交。
5. 执行 `npm run release:check`，检查 `git diff`、`git diff --check` 和暂存文件清单；不提交 `dist/`、临时录屏或凭证。
6. 编写具体的提交说明，再执行 `git push origin main`。远程有新提交时先整合，不使用强制推送覆盖。
7. 用户要求更新线上官网时，使用 `pwsh -File scripts/vercel.ps1 Production`，验证正式域名，并把部署结果与发布说明同步回 GitHub。

本地使用原生 Node.js、PowerShell、Chromium 和 FFmpeg，不运行 Docker/WSL。媒体录制与检查结束后关闭浏览器和本地服务。CI 检查代码、链接和媒体是否同步，不保存生产凭证。
