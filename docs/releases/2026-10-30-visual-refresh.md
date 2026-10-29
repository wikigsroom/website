# 图像与产物可视化 / Visual edition · 2026-10-30

[中文 README](../../README.zh-CN.md) · [English README](../../README.md) · [素材方案](../benchmark-visuals.md) · [页面媒体](../media/README.md)

## 简体中文

此前 46 篇测评文章使用文字 SVG 封面，正文主要通过展开条目查看证据。此次用真实产物与主题插画替换封面，在正文新增可见的分镜、结果截图、音轨波形和资料图。两篇此前只有文字封面的 Research 文章也已补图，博客全部 70 篇文章均使用图像封面。

- 46 篇测评文章均展示栅格封面与正文素材，共 103 张正文图；视频分镜带实际时间点，图片保留完整比例。
- 每条选定音轨均从完整音频计算振幅包络，配合原音频试听；波形没有转换为质量分数。
- 图注显示素材说明、原始记录与跨批次引用。复核内容仍指向原执行，不制造新的产物或成功记录。
- 通过指定的 `sub2-image-gen` 技能，用 `gpt-image-2.5` 生成 13 组主题插画，区分声线选角、播客、音乐、诊断、推理与研究等内容。原图、提示词和哈希记录于 [插画台账](../../output/imagegen/README.md)。
- 网页仅发布压缩 WebP；完整测评影音仍由 Benchmark 原 URL 提供。本地归档联接和下载/抽帧缓存不参与 Git 或 Vercel 上传。
- 文章顶部展示封面，正文无需展开证据即可观看静态样本，音频/视频均按需播放，不自动播放。

冻结源仍为 Benchmark 1.9.0，SHA-256 为 `81c20e4eece8e2280df46d76b8f09cab8eab7bdab3da2053e8700258438a7ed5`。681 条独立记录和 89 次跨批次引用保持原关联，没有重新运行测评模型。

### 检查与发布

Lint、TypeScript/Vite 构建及全部批次关联/素材来源检查已通过。浏览器验收共 109 项：全部 70 篇封面、46 篇文章的 103 张正文图可解码，代表原音视频可播放，770 次记录展开及 320/390/768/1440px 布局通过。已刷新 12 张页面截图、两段 MP4 与两段 GIF；浏览器与临时服务均已关闭，见 [验收记录](../media/benchmark-20261029/verification.json)。

225 个压缩 WebP 文件合计 11,311,356 字节（约 10.79 MiB），包含 48 组 hero/card 封面、103 张正文图和 26 张视频 poster。插画原 PNG 及完整测评影音不上传至博客项目。正式发布信息在域名验收后补入本节。

## English

The previous batch edition used textual SVG covers and kept most evidence inside expandable records. This release replaces those covers with visual material and adds 103 inline figures across all 46 journals. Two textual Research covers are replaced as well, so all 70 articles have raster image covers.

Video figures contain sampled frames and timestamps, image/3D figures retain complete result screenshots, and audio figures show full-track amplitude envelopes with original playback. Research/text batches use record distributions and actual response/summary excerpts. Original record ownership and review references remain visible.

Thirteen thematic illustrations were generated through the requested `sub2-image-gen` skill using **gpt-image-2.5**. The [illustration ledger](../../output/imagegen/README.md) retains originals, prompts, dimensions and hashes. Artwork is explicitly labeled; it is not presented as output from the evaluated models. Original PNGs stay in Git for reproduction, while Vercel serves only compact WebP derivatives.

The public Benchmark 1.9.0 snapshot remains unchanged, including all 681 unique records and 89 cross-batch references. Original media is reused through HTTPS; the local archive link and working cache remain ignored. No benchmark GPU runs were performed.

Lint, type/build and visual/source attribution checks passed. All 109 browser checks passed, including 70 raster covers, 103 figures across 46 articles, original audio/video playback, 770 evidence expansions and four responsive widths. Twelve screenshots, two MP4s and two GIFs record the new visual reading flow; the [report](../media/benchmark-20261029/verification.json) confirms browser and preview cleanup.

The 225 WebP files total 11,311,356 bytes (10.79 MiB): 48 hero/card cover pairs, 103 inline figures and 26 video posters. Illustration PNG originals and full benchmark media are excluded from blog uploads. Verified production details will be added after release.
