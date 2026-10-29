# 页面截图与演示 / Screenshots and demos

[中文 README](../../README.zh-CN.md) · [English README](../../README.md) · [最新更新 / Latest release](../releases/2026-10-29-editorial-refresh.md) · [批次归档 / Batch archive](../releases/2026-10-29-benchmark-batches.md)

2026-10-29 标题与正文重写后的实际本地生产构建截图与录制，已更新 46 篇人工标题、摘要、三点提要和分析章节。记录文章导航、结果展开和响应式页面，不是重新运行模型的录像。

Captured from the refreshed local production build, including all 46 editorial headlines, decks, takeaways and analysis chapters. These recordings demonstrate navigation, evidence expansion and responsive layouts, rather than fresh model execution.

| 文件 / File | 内容 / Content |
| --- | --- |
| [batch-index-desktop.png](benchmark-20261029/batch-index-desktop.png) | 桌面栏目入口 / Desktop batch index |
| [batch-overview-desktop.png](benchmark-20261029/batch-overview-desktop.png) | 46 批、681 项范围 / Batch coverage board |
| [batch-article-desktop.png](benchmark-20261029/batch-article-desktop.png) | 批次文章头部 / Article header |
| [batch-record-desktop.png](benchmark-20261029/batch-record-desktop.png) | 展开的逐项证据 / Expanded evidence |
| [review-batch-desktop.png](benchmark-20261029/review-batch-desktop.png) | 无新增执行的复核批次 / Review batch with no new executions |
| [batch-article-mobile.png](benchmark-20261029/batch-article-mobile.png) | 390px 手机阅读 / Mobile article |
| [batch-record-mobile.png](benchmark-20261029/batch-record-mobile.png) | 历史 TTS 记录 / Historical TTS entry on mobile |
| [batch-walkthrough.mp4](benchmark-20261029/batch-walkthrough.mp4) · [GIF](benchmark-20261029/batch-walkthrough.gif) | 桌面栏目到逐项记录 / Desktop navigation and expansion |
| [batch-mobile.mp4](benchmark-20261029/batch-mobile.mp4) · [GIF](benchmark-20261029/batch-mobile.gif) | 手机复核文章 / Mobile review article |
| [verification.json](benchmark-20261029/verification.json) | 46 路由、770 次展开、筛选、阅读和布局检查 / Route, coverage and interaction checks |
| [cross-origin-proof.json](benchmark-20261029/cross-origin-proof.json) | 真实博客域名下的原素材加载验证 / Original media loading from the real blog origin |
| [production-article-desktop.png](benchmark-20261029/production-article-desktop.png) | 本次正式域名上线截图 / Refreshed article on the production domain |
| [生产验收 / Production proof](../releases/2026-10-29-editorial-production.json) | 部署绑定、构建文件与 46 篇文章验收 / Deployment, build files and all 46 published articles |

![桌面栏目 / Desktop index](benchmark-20261029/batch-index-desktop.png)

![阅读演示 / Reading walkthrough](benchmark-20261029/batch-walkthrough.gif)

![移动端 / Mobile](benchmark-20261029/batch-mobile.gif)

复现 / Reproduce:

```sh
npm run build
npm run docs:media
npm run docs:check
```

需要原生 Chrome、FFmpeg、FFprobe；不使用 Docker/WSL。可用 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`、`FFMPEG_PATH`、`FFPROBE_PATH` 指定可执行文件。浏览器仅使用脚本自己的临时上下文，不复用个人登录。脚本退出时关闭自己创建的浏览器和预览服务，原始录屏保留在忽略目录 `docs/media/.raw/`。

Requires native Chrome, FFmpeg and FFprobe. On a fresh machine, run `npx playwright-core install ffmpeg` once to install Playwright's native recording helper. 新机器还需以该命令安装原生录制辅助程序。Executable paths can be selected with the environment variables above. The script owns a temporary browser context, closes its browser and preview server on exit, and keeps raw recordings in the ignored directory. Browser verification checks 320/390/768/1440px layouts; no third-party font dependency is needed for captures.

`docs:check` 核对媒体存在、验收通过、资源已关闭，并以规范化换行后的 SHA-256 绑定当前内容与界面，避免代码变了而截图仍旧。上表 `batch-*` 与 `review-*` 为本地构建捕获，`production-article-desktop.png` 则来自已部署的正式域名。

`docs:check` checks media presence, passing verification, resource cleanup and a newline-normalized SHA-256 of the content/UI files. The `batch-*` and `review-*` files are local build captures; `production-article-desktop.png` comes from the deployed production domain and is supported by the separate release proof.
