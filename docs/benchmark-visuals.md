# 可视化素材方案 / Visual material design

[中文 README](../README.zh-CN.md) · [English README](../README.md) · [素材复用](benchmark-materials.md) · [生成插画](../output/imagegen/README.md)

## 简体中文

测评文章使用与本批内容直接对应的栅格封面，正文另有可见的分镜、图片、波形或记录摘录。两篇此前只有文字封面的 Research 文章也补上主题插画，其他既有图像封面继续使用。

| 内容 | 封面 | 正文 | 来源标识 |
| --- | --- | --- | --- |
| 视频、数字人口型、世界模型实录 | 实际产物抽帧合成 | 同一片段的三个时间点与完整视频播放器 | 原视频 URL、记录 ID、秒数 |
| 图像编辑、3D | 保存图和预览截图的组合 | 保留完整长宽比的结果图 | 原图 URL 与记录 ID |
| 声音、播客、音乐 | 主题插画叠加实际波形 | 完整音轨振幅包络与原音频试听 | 原音轨、完整时长；波形不代表听感评分 |
| 研究、准备、文本推理 | gpt-image-2.5 主题插画 | 冻结状态分布与原记录摘要/响应节选 | 明确“记录摘录”，不伪装成软件截图 |
| 复核与更正 | 引用原归属批次的实际画面 | 图注显示原批次与原记录 | 不计为新的执行或产物 |

`operations/benchmark-visual-plan.json` 保存人工选择和插画主题。`scripts/prepare-benchmark-visuals.py` 优先用确切的公开 URL 路径读取 `.vercel/benchmark-source/archive` 联接；联接缺少文件时才从 Benchmark 同源下载到忽略缓存。不扫描归档目录，不向 Git 或网页复制完整影音。

视频按实际帧数和帧率选取约 18% / 50% / 82% 处的帧；帧数未知时按时长选择。正文时间点记录于 `benchmarkVisuals.json`。短片使用实际可用帧，避免把最后一帧之后的时间误当作画面。图片仅做缩放，正文保留比例；封面把多个产物组合，窄画幅周围使用模糊背景填充。

音频解码为单声道 4kHz PCM，再分成 580 段取绝对振幅峰值。包络覆盖整段音轨，按原振幅量级绘制，不额外按每条音轨独立拉满。封面中的概念声波属于插画，底部波形条和正文波形则由实际音轨计算。

WebP 封面输出为 1280px 的 hero 与 640px 的 card；正文图最多 1440px，视频另带小型 poster。`src/data/benchmarkVisuals.json` 记录类型、来源 URL、记录归属、时间点、图注、插画模型/提示词/原图哈希。完整冻结快照及 681 条记录、89 次引用不变。

### 更新步骤

1. 在冻结源中选取与文章对应的记录；必要时编辑人工选择清单。
2. 用指定技能生成或更新 `output/imagegen/` 中的主题插画，保留提示词与产物。
3. 原生 Python 安装 Pillow，确保 FFmpeg/FFprobe 可用，运行 `npm run benchmark:covers`。
4. 单批重建可执行 `python scripts/prepare-benchmark-visuals.py --round <round.id>`，它保留其他批次清单。
5. 检查素材、图注和引用归属，执行 `npm run check:benchmark`、`npm run lint`、`npm run build`。
6. `npm run docs:media` 刷新截图与 MP4/GIF，再运行 `npm run docs:check`，提交并推送 `origin/blog`。
7. 用户要求上线时通过独立账户部署；正式域名再次核验所有封面和正文图。

页面不自动播放影音。正文图片延迟加载；音频 `preload="none"`，视频在可展开播放器中按需播放。完整证据仍然展开后加载。浏览器检查和录制脚本退出时释放自己创建的浏览器及临时预览服务。

## English

Each batch now has a content-specific raster cover and visible inline figures. Video posts show sampled frames with timestamps and an optional original player; image/3D posts retain uncropped results; audio posts show full-track amplitude envelopes and playback controls. Research/preparation/text batches combine labeled thematic artwork with factual record graphics. Cross-batch review visuals keep their original ownership labels.

The curated plan is [`operations/benchmark-visual-plan.json`](../operations/benchmark-visual-plan.json). Native Python/Pillow and FFmpeg generate small WebP derivatives, using exact paths through the ignored archive junction or a same-origin download cache. Original benchmark binaries are not copied into Git or the blog build. The pipeline never scans the whole archive.

Video frames are selected near 18%, 50% and 82% of the available frames, using real frame counts and rates when present. Audio is decoded to mono 4kHz PCM and reduced to 580 absolute peak bins over the complete track without per-track peak normalization. Waveforms describe amplitude, not perceptual quality. Covers combine actual material; narrow source aspect ratios are preserved using blurred margins.

All thirteen illustrations were generated through the requested `sub2-image-gen` skill with **gpt-image-2.5**, high quality and requested size 1536×1024. The [illustration ledger](../output/imagegen/README.md) preserves prompts, originals and hashes. Artwork is labeled as illustration and is never attributed to the models under evaluation. Two previously textual Research covers also use these illustrations.

`benchmarkVisuals.json` records source URLs, owning records, cross-batch references, frame times, captions and illustration provenance. Hero/card images are 1280/640px wide; figures are at most 1440px. Source PNG illustrations are versioned for reproducibility but excluded from Vercel uploads. Only the WebP derivatives are deployed.

Run `npm run benchmark:covers` to rebuild everything, or `python scripts/prepare-benchmark-visuals.py --round <round.id>` for selected batches. Review visual/source associations, then run content/lint/build checks and `npm run docs:media`. Commit source, bilingual docs and media to `origin/blog`; deploy separately through the isolated blog account when requested. Public-domain verification checks the actual covers and figures after release. Browsers and temporary preview servers close even when a check fails.
