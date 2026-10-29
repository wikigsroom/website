# 标题与正文重写 / Editorial refresh · 2026-10-29

[中文说明](../../README.zh-CN.md) · [English guide](../../README.md) · [文章目录 / Article index](../benchmark-batches.md) · [媒体 / Media](../media/README.md)

## 简体中文

此前文章以“原批次名＋日期＋测评日志”为标题，正文偏重档案查阅。本次逐篇重写 46 个标题、独立摘要与正文，把阅读重心改为具体问题、实际观察和下一步选择。

| 位置 | 新的阅读方式 |
| --- | --- |
| 标题 | 用问题或观察引入，日期和原批次名另列 |
| 摘要 | 简短说明值得读什么，不重复开场段落 |
| 正文 | 开场、三点提要、两个专题分析章节、结论 |
| 证据 | 范围、过程补记、全部输入/参数/指标/限制与原素材 |
| 关联 | 封面、卡片、推荐位、关联链接、目录共用人工标题 |
| 版式 | 标题置顶、宋体字形、短句换行、独立摘要与提要色条 |

正文约 1.9 万字符，围绕已有实验补充解释与使用方法。681 条独立记录与 89 次跨批次引用保持原归属；冻结证据来源 SHA-256 仍为 `81c20e4eece8e2280df46d76b8f09cab8eab7bdab3da2053e8700258438a7ed5`。没有重新运行模型，也没有将失败、准备或复核写成新成功。

标题示例：

- 《21 套 H3 工作流跑完之后，我们看到了什么》
- 《67 组中文 TTS 实测：第一声之外，还要听什么》
- 《同一个声音，三种模型：21 段声线选型实录》
- 《一张图变成 3D：四种模型交出的网格有什么不同》

验证包括 Lint、类型/Vite 构建、覆盖与链接检查、46 个文章路由、770 次记录展开、标题/提要、代表素材、栏目与阅读交互及 320/390/768/1440px 布局。截图、桌面/手机 MP4 和 GIF 已刷新，详见 [页面验收](../media/benchmark-20261029/verification.json)。浏览器和临时服务在结束时关闭。

新增博客专用 `scripts/vercel.ps1`，固定核验 `blogs` 项目并使用既有独立账户。

### 生产发布结果

已发布到 [blog.sidcloud.cn](https://blog.sidcloud.cn/#/benchmark)，Vercel 状态为 `READY` / `production`，部署为 `dpl_HijjCQZ3DJquVECk2RLQ4evzi8sH`，发布源码提交为 `d662306e789f7008d3a91c48be2fa4996e1f3cc6`。

2026-10-29 23:18（UTC+8）开始核验：正式域名已绑定该部署，JS/CSS 与本地验收构建哈希一致，全部 46 篇的标题、三点提要与记录数量匹配；默认账户目录的 10 个文件哈希未变化。验收浏览器已关闭。完整证据见 [生产记录](2026-10-29-editorial-production.json) 与 [线上截图](../media/benchmark-20261029/production-article-desktop.png)。后续文档提交只补充发布结果，不改变已部署的页面。

## English

All 46 journals have rewritten headlines, distinct decks and expanded narratives. Dates and original batch names move into metadata. Each article leads with its question, three takeaways, two focused analysis chapters and a conclusion, followed by complete scope and expandable evidence.

The refresh contains approximately 19,000 narrative characters, topic categories, consistent titles across covers/cards/related links, semantic phrase wrapping and responsive serif headlines. Reading estimates cover narrative text only. Article navigation starts at the top; a shortcut opens the evidence section.

All 681 unique records and 89 cross-batch references keep their original associations. The evidence snapshot is unchanged. This is an editorial revision, not new GPU execution or new subjective scoring.

Validation covers lint, TypeScript/Vite compilation, coverage, 46 routes and 770 expanded records, all headlines and takeaways, media, reader controls and four responsive widths. Screenshots and desktop/mobile MP4/GIF demos are refreshed; the [browser report](../media/benchmark-20261029/verification.json) records cleanup.

The deployment wrapper checks the isolated account and existing `blogs` project. The refresh is live at [blog.sidcloud.cn](https://blog.sidcloud.cn/#/benchmark), deployment `dpl_HijjCQZ3DJquVECk2RLQ4evzi8sH`, source commit `d662306e789f7008d3a91c48be2fa4996e1f3cc6`.

Production verification began at 2026-10-29 23:18 UTC+8 and passed: the custom domain points to this READY production deployment, published JS/CSS hashes match the verified local build, and all 46 headlines, takeaway blocks and evidence counts match. Ten default-account files remained unchanged and the verification browser was closed. See the [machine-readable proof](2026-10-29-editorial-production.json) and [production screenshot](../media/benchmark-20261029/production-article-desktop.png). A following documentation-only commit records this outcome without changing the deployed application.
