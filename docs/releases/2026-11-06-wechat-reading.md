# 2026-11-06 — WeChat reading library / 公众号精读

发布状态：已推送 `origin/blog`，通过独立账户发布并验证 [公众号精读](https://blog.sidcloud.cn/#/wechat)。

Publication status: pushed to `origin/blog`, deployed through the isolated account and verified on the production reading collection.

本批使用用户明确批准的 `gpt-image-2.5-flare`，通过同一 `sub2-image-gen` 技能和网关生成全部 11 张封面。原始 PNG 共 26,865,272 字节；22 张网页封面 WebP 共 1,264,398 字节。准确模型、实际尺寸及原图/提示词哈希保存在 [生成台账](../../output/imagegen/wechat-2026-11-06/manifest.json)。

All eleven covers use the explicitly approved `gpt-image-2.5-flare` model through the same requested skill and gateway. PNG originals total 26,865,272 bytes; the 22 web cover derivatives total 1,264,398 bytes. The generation manifest retains accurate model names, actual dimensions and source/prompt hashes.

已完成 Lint、类型/构建、11 篇精读/全部测评内容检查与 Markdown 一致性检查；浏览器核对全部 11 篇与 36 项原文素材、来源/表格搜索、四档宽度与返回栏目，22 项通过。现有测评另通过 109 项界面检查，覆盖 46 批与 770 次记录展开。截图、桌面/手机 MP4 和 GIF 已归档；脚本已关闭自己的浏览器和预览服务。

Lint, type/build, reading/benchmark content and Markdown consistency checks pass. Twenty-two reading-browser checks cover all eleven posts, 36 source figures, source/table search, four viewport widths and collection navigation. Another 109 checks cover the existing 46 journals and 770 expanded associations. Screenshots and desktop/mobile MP4/GIF demos are archived; owned browsers and preview servers are closed.

## 中文

- 新增 11 篇公众号精读，博客累计 81 篇：46 篇测评日志、29 篇 Research（含 11 篇精读）、6 篇 Blog。原文日期为 2026-09-17 至 2026-10-31，本站整理日期为 2026-11-06。
- 每篇提供独立标题、副标题、三点提要、主题分析、流程或对照表、适用条件、原文和关联资料。新增精读集合 `#/wechat`，搜索包含原文标题、账号、作者与表格单元格。
- 原文素材精选 36 项：24 项图示/动图和全部 12 段原视频的封面与观看入口。两张动图保留 27/232 帧时序，原文素材 WebP 合计约 3.30 MiB。
- 每篇以独立提示词生成主题插画，使用用户指定的 `sub2-image-gen` 技能和明确批准的 `gpt-image-2.5-flare`；准确模型、原图与哈希记录在生成台账，正文原素材与 AI 封面分别归属。
- 核对并明确：Audio8 各发布的语言与 ONNX 差异；Mixamo 项目默认流程更新；Pika 本地/托管功能与 H100 资源口径；三维白模案例只是作者粗比较；Qwen-FaceSwap 为第三方发布入口。
- 建立按批次追加、按源 URL 去重的采集和素材流程，原始 HTML/正文保留忽略缓存，公开仓库只维护整理稿与公开台账。

## English

Eleven source-attributed reading articles bring the blog to 81 posts: 46 batch journals, 29 Research articles (including these eleven) and six Blog notes. The original dates remain visible separately from the 2026-11-06 editorial date. The new `#/wechat` collection supports source-author/title and table-content search.

Thirty-six selected source figures include two timed animations and all twelve original video references; their derivatives total about 3.30 MiB. Videos use their actual posters and explicit original-article links. Each article has a distinct generated illustration through the requested Sub2 workflow and approved model, with accurate provenance retained in the generation ledger.

Editorial checks distinguish model versions, repository workflow changes, local/hosted capabilities, hardware measurement scopes and third-party packaging. New batch scripts append content and reject duplicate sources while keeping raw full text and HTML out of the public repository. Publication uses the existing isolated blog profile after content, build and visual verification.

[阅读与维护方案 / Reading and maintenance](../wechat-reading.md)

## 生产验收 / Production verification

- 应用源码 / Application source: `07cca8c0915b585e3a609288c7b2b8f7c61e61c3`。
- 部署 / Deployment: `dpl_AbJovBAVuj4N8R6e6RJy7dhRRkZs`，`READY` / `production`，正式域名 `blog.sidcloud.cn`。
- 核对全部 46 篇测评和 11 篇新精读；线上 283 个图片文件及构建入口文件与本地字节一致。/ All 46 journals and eleven readings are verified; all 283 visual files and entry build assets match the local bytes.
- 默认全局账户的 10 个配置文件哈希未变化；验收浏览器已关闭。/ All ten default-account file hashes remain unchanged; the owned verification browser is closed.
- [生产 JSON 验收 / Production proof](2026-11-06-wechat-production.json) · [GitHub 检查 / CI passed](https://github.com/wikigsroom/website/actions/runs/42195084404)。
- [正式域名栏目截图 / Production index](../media/wechat-20261106/production-reading-index-desktop.png) · [精读截图 / Reading article](../media/wechat-20261106/production-reading-article-desktop.png) · [测评回归截图 / Benchmark regression](../media/wechat-20261106/production-benchmark-article-desktop.png)。

后续证明提交仅补充文档、正式域名截图和验收工具的截图等待，不改变已部署的应用页面。/ The follow-up evidence commit contains documentation, production screenshots and image-wait refinements in the verifier; it does not change the deployed application UI.
