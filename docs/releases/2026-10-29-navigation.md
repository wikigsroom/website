# 2026-10-29 — Blog and Benchmark navigation / 博客与测评导航

[Changelog / 更新记录](../../CHANGELOG.md) · [English README](../../README.md) · [中文 README](../../README.zh-CN.md)

## English

Added BLOG and Benchmark immediately after Home in the shared desktop/mobile header. BLOG links to `https://blog.sidcloud.cn/`; Benchmark links to `https://benchmark.sidcloud.cn/`. Both are native links opening a new tab with `noopener noreferrer`. Their labels and order are retained in both languages. Navigation wraps below 1024 px and uses the desktop row on wider screens.

Bilingual README, architecture and media instructions describe the new navigation. The documentation capture checks six widths (320, 390, 768, 1024, 1280 and 1440 px) in both locales and refreshes the screenshots, desktop/mobile recordings, GIFs and source/media manifest.

## 简体中文

在桌面和手机公共导航的 HOME（首页）右侧依次加入 BLOG、Benchmark，分别指向 `https://blog.sidcloud.cn/` 和 `https://benchmark.sidcloud.cn/`。两项均使用原生链接，以新标签页打开并设置 `noopener noreferrer`；两种语言保留相同名称与顺序。1024 px 以下自动换行，较宽屏幕使用桌面导航行。

同步双语 README、架构与媒体文档；采集脚本在两种语言下检查 320、390、768、1024、1280、1440 px 六种宽度，并刷新截图、桌面/手机录屏、GIF 与源码/媒体清单。

## Validation and deployment / 验证与部署

`npm run release:check` passed locally and again in the isolated production deployment script: TypeScript, ESLint, catalog/asset checks, Vite production build, 20 documents, 262 local links and 14 media assets. Navigation passed all 12 locale/viewport combinations; both MP4 recordings and both GIFs fully decoded with native FFmpeg.

本地与独立账户正式部署脚本中的 `npm run release:check` 均已通过：TypeScript、ESLint、目录/静态资源检查、Vite 生产构建、20 份文档、262 个本地链接与 14 份媒体均检查成功。导航通过全部 12 组语言/屏宽组合，两段 MP4 和两张 GIF 均通过原生 FFmpeg 完整解码。

| Deployment / 部署 | Verified result / 核验结果 |
| --- | --- |
| Production / 正式站 | [www.sidcloud.cn](https://www.sidcloud.cn/) — READY |
| Source commit / 源码提交 | `fffc4acf1307138d975d74fad4124c530adeec70` |
| Deployment ID / 部署编号 | `dpl_GsobZr6evTM1Vk9PtjvhYBBRJtti` |
| Immutable URL / 固定部署地址 | [sidcloud-fyb6keca8](https://sidcloud-fyb6keca8-carzygodwu-2768s-projects.vercel.app) |
| Inspector / 部署详情 | [Vercel deployment](https://vercel.com/carzygodwu-2768s-projects/sidcloud/GsobZr6evTM1Vk9PtjvhYBBRJtti) |
| Verification date / 核验时间 | 2026-10-29 21:15–21:16 Asia/Taipei |

Public production verification passed all nine HTTP checks: the homepage serves the new build, JavaScript/CSS hashes match the local production output, both domain verification files retain their exact contents on the apex and www hosts, and both catalog files load successfully. Browser verification passed 12 bilingual viewport checks and three existing client navigation checks, with 18 My Box, 76 AI Toolbox and five Dev Toolbox cards. These checks cover the official website's navigation and link destinations; they do not assert availability of the external subdomains.

正式站通过全部九项 HTTP 检查：首页已提供新构建，JavaScript/CSS 哈希与本地生产产物一致；根域名与 www 域名下的两个域名验证文件均保留准确原文，两个目录数据文件可正常读取。浏览器通过 12 组双语屏宽检查及三项原有站内导航检查，分别显示 18 个 My Box、76 个 AI Toolbox 和五个 Dev Toolbox 条目。检查范围为官网导航与链接目标，不包含外部子域名的可用性。

Deployment used the existing isolated Vercel profile and verified the expected website account/project. All three default global CLI configuration/credential files matched their pre-deployment hashes. Capture and verification browser contexts/processes were closed, and the temporary preview server was stopped. Google Fonts and the external Live2D widget were blocked during browser verification, as recorded in the report.

部署复用原有独立 Vercel 配置，并核验官网账户与项目。三个默认全局 CLI 配置/凭证文件的哈希均与部署前一致。采集与核验创建的浏览器上下文、进程均已关闭，临时预览服务已停止。浏览器核验时屏蔽 Google Fonts 与外部 Live2D 组件，报告中已注明。

Evidence / 核验材料: [HTTP report / HTTP 报告](2026-10-29-navigation.http.json) · [Browser report / 浏览器报告](2026-10-29-navigation.browser.json) · [Account isolation / 账户隔离](2026-10-29-navigation.account-isolation.json) · [Desktop header / 线上桌面导航](2026-10-29-navigation-desktop.png) · [Mobile header / 线上手机导航](2026-10-29-navigation-mobile.png).
