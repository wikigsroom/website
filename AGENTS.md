# 博客维护约定

- 当前目录为 sidcloud 博客源码。正式仓库是 `git@github.com:wikigsroom/website.git`，工作分支和推送目标均为 `blog`，默认远程为 `origin`。
- 同仓库 `main` 属于官网，由同级 `website/` checkout 维护。不要将博客内容覆盖、合并或推送到官网 `main`。
- `legacy-blog` 仅保留旧 `git@github.com:carzygod/blog.git` 供追溯。后续博客更新默认提交并推送 `origin/blog`，不得强制推送。
- 每次用户要求的博客更新，都要同步相关代码/数据、两种 README、`CHANGELOG.md` 及受影响的截图/录屏，不能只留在本地。
- 提交前执行 `npm run lint` 和 `npm run build`，核对暂存内容与 `git diff --cached --check`，编写具体更新说明后推送；远程有新提交时先检查整合，不覆盖历史。
- 禁止启动本地 Docker、WSL 或其他虚拟化环境，使用原生 Node.js、PowerShell 和 FFmpeg。
- 浏览器检查完成后关闭本次创建且不再使用的 tab/context/进程，停止临时预览服务，保留用户无关窗口。
- 禁止提交 `.vercel/`、`.env*`、Token、登录凭证、`node_modules/`、`dist/` 或私人研究原件。只维护已整理进博客的公开数据。
- GitHub 推送与 Vercel 发布是两个操作；用户要求更新线上博客时，再通过工作区独立部署工具发布 `blogs` 项目，验证生产结果，并同步更新记录。
- Vercel 固定复用已授权的 `%LOCALAPPDATA%\sidcloud\vercel-profile`，核验账户/团队/博客项目，不切换或修改默认全局登录，不继承其他业务 Token。
- 测评日志按 Benchmark `rounds` 一批一篇维护。`benchmark:sync` 只刷新公开快照；新增批次必须补充人工核对的 `benchmarkEditorial.ts`，同步覆盖检查预期、批次目录、封面和发布说明，不能把复核引用计成新执行。
- 测评影音使用 `https://benchmark.sidcloud.cn/` 原素材 URL；本地可通过 `benchmark:link` 在忽略目录 `.vercel/benchmark-source/` 建目录联接，不放入 `public/`，不复制或提交测评大素材。
- 测评更新运行 `npm run check:benchmark`；页面变化运行 `npm run docs:media`，核对报告与截图后再提交。录制脚本必须在结束或失败时释放自己的浏览器和预览服务。
