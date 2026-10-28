# Screenshots and walkthroughs / 页面截图与操作演示

[English README](../../README.md) · [中文 README](../../README.zh-CN.md) · [Reproduce / 生成方法](../en/media.md) · [中文生成说明](../zh-CN/media.md)

Ten screenshots, two real browser recordings and two animated GIFs were generated on 2026-10-28. / 2026-10-28 生成：10 张页面截图、2 段真实浏览器录屏、2 张动态 GIF。

The source is a local production build. Live2D and Google Fonts requests are blocked only during capture; native fallback fonts are used. Videos are silent; GIFs are accelerated. / 来源为本地生产构建，仅采集时屏蔽 Live2D 与 Google Fonts 并使用系统字体；视频无音轨，GIF 已加速。

## Desktop / 桌面

![English desktop homepage / 英文桌面首页](home-desktop.png)

![Browser walkthrough / 实际操作 GIF](website-tour.gif)

[Play/download desktop MP4 / 桌面录屏](desktop-tour.mp4): 1280×800, 18.32 s. / GIF: 880×550, 11.90 s.

The tour covers the homepage, projects, updated footer, AI search/category filtering, My Box search, Dev Toolbox and switching to Chinese. / 演示包括首页、项目、新页脚、AI 搜索/分类、My Box 搜索、开发工具页及切换中文。

## Mobile / 手机

<img src="home-mobile.png" width="312" alt="Chinese mobile homepage / 中文手机首页" />
<img src="mobile-tour.gif" width="312" alt="Mobile browser walkthrough / 手机真实操作 GIF" />

[Play/download mobile MP4 / 手机录屏](mobile-tour.mp4): 390×844, 9.48 s. / GIF: 312×676, 6.20 s.

## Page inventory / 页面素材清单

| File / 文件 | Dimensions / 尺寸 | Content / 内容 |
| --- | --- | --- |
| [home-desktop.png](home-desktop.png) | 1440×960 | English homepage / 英文首页 |
| [home-zh-CN.png](home-zh-CN.png) | 1440×960 | Chinese homepage / 中文首页 |
| [home-full.png](home-full.png) | 1440×3364 | Full homepage after scrolling / 滚动触发动效后的完整首页 |
| [home-mobile.png](home-mobile.png) | 390×844 | Chinese phone homepage / 中文手机首页 |
| [ai-toolbox.png](ai-toolbox.png) | 1440×960 | AI directory / AI 工具目录 |
| [ai-search.png](ai-search.png) | 1440×960 | `codex` yields one Codex card / 搜索仅匹配一张 Codex 卡片 |
| [my-box.png](my-box.png) | 1440×960 | Personal app directory / 自研应用目录 |
| [dev-toolbox.png](dev-toolbox.png) | 1440×960 | Developer demonstration catalog / 开发工具演示目录 |
| [footer.png](footer.png) | 1440×86 | Struck-through former GitHub + current account / 旧 GitHub 删除线及现任仓库 |
| [not-found.png](not-found.png) | 1440×960 | Client-side unmatched route / 客户端未匹配页面 |
| [desktop-tour.mp4](desktop-tour.mp4) | 1280×800 | 18.32-second desktop recording / 桌面录屏 |
| [website-tour.gif](website-tour.gif) | 880×550 | 11.90-second desktop GIF / 桌面动图 |
| [mobile-tour.mp4](mobile-tour.mp4) | 390×844 | 9.48-second phone recording / 手机录屏 |
| [mobile-tour.gif](mobile-tour.gif) | 312×676 | 6.20-second phone GIF / 手机动图 |

![Updated footer / 更新后的页脚](footer.png)

## Provenance and checks / 来源与校验

[`manifest.json`](manifest.json) records the actual capture timestamp, normalized source fingerprint, per-file bytes/SHA-256, dimensions, durations and runtime observations. The recorded checks found 76 AI cards, 18 My Box cards, five developer cards, one result for `codex`, zero results for an unmatched query, and no horizontal overflow at 390 px. / 清单记录实际采集时间、源码指纹、每个文件的字节数/哈希、尺寸、时长和运行观察；实际检查为 76/18/5 张目录卡片，`codex` 匹配一项，无匹配查询为零项，390 px 下无横向溢出。

All MP4 and GIF outputs were fully decoded with native FFmpeg. Current local-link/media validation uses `npm run docs:check`. Raw WebM captures are intentionally ignored under `.raw/`. / 所有 MP4、GIF 均通过原生 FFmpeg 完整解码；文档链接及素材一致性使用 `npm run docs:check`，临时 WebM 位于已忽略的 `.raw/`。

These captures show local browser behavior. The production direct-route issue and other existing limitations are described in [English](../en/known-issues.md) / [中文](../zh-CN/known-issues.md).
