# 2026-10-29 — Blog and Benchmark navigation / 博客与测评导航

[Changelog / 更新记录](../../CHANGELOG.md) · [English README](../../README.md) · [中文 README](../../README.zh-CN.md)

## English

Added BLOG and Benchmark immediately after Home in the shared desktop/mobile header. BLOG links to `https://blog.sidcloud.cn/`; Benchmark links to `https://benchmark.sidcloud.cn/`. Both are native links opening a new tab with `noopener noreferrer`. Their labels and order are retained in both languages. Navigation wraps below 1024 px and uses the desktop row on wider screens.

Bilingual README, architecture and media instructions describe the new navigation. The documentation capture checks six widths (320, 390, 768, 1024, 1280 and 1440 px) in both locales and refreshes the screenshots, desktop/mobile recordings, GIFs and source/media manifest.

## 简体中文

在桌面和手机公共导航的 HOME（首页）右侧依次加入 BLOG、Benchmark，分别指向 `https://blog.sidcloud.cn/` 和 `https://benchmark.sidcloud.cn/`。两项均使用原生链接，以新标签页打开并设置 `noopener noreferrer`；两种语言保留相同名称与顺序。1024 px 以下自动换行，较宽屏幕使用桌面导航行。

同步双语 README、架构与媒体文档；采集脚本在两种语言下检查 320、390、768、1024、1280、1440 px 六种宽度，并刷新截图、桌面/手机录屏、GIF 与源码/媒体清单。

## Validation and deployment / 验证与部署

Local `npm run release:check` passed: TypeScript, ESLint, catalog/asset checks, Vite production build, 20 documents, 262 local links and 14 media assets. Navigation passed all 12 locale/viewport combinations; both MP4 recordings and both GIFs fully decoded with native FFmpeg. Production publication is next; verified deployment details will be recorded here before the final synchronization push.

本地 `npm run release:check` 已通过：TypeScript、ESLint、目录/静态资源检查、Vite 生产构建、20 份文档、262 个本地链接与 14 份媒体均检查成功。导航通过全部 12 组语言/屏宽组合，两段 MP4 和两张 GIF 均通过原生 FFmpeg 完整解码。下一步使用独立账户正式发布，最终同步推送前补充实际部署结果。
