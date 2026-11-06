# 公众号精读 / WeChat reading library

[中文 README](../README.zh-CN.md) · [English README](../README.md) · [阅读入口](https://blog.sidcloud.cn/#/wechat)

## 目的与阅读方式

用户后续提供的公众号链接按批次整理成可持续查阅的博客：逐篇阅读、核对主题、重写标题和正文，保留作者、原文日期、原链接及关键配套素材。文章采用本站整理日期排序，原文发布时间另列，避免把旧案例写成今天刚发布的消息。

`#/wechat` 是精读集合，同时收录在 Research 中。搜索覆盖整理稿、原文标题、公众号、作者及表格单元格；分类和标签用于按动画、图像、语音、游戏、视频和写作等主题查找。文章的返回按钮回到精读集合。读者可以用现有收藏和大字阅读功能保存、查看内容。

正文建议采用：场景引入 → 三点提要 → 概念/流程表格 → 配套图示 → 适用条件与验收方法 → 原文/官方资料/关联文章。来源中宣传式结论改为具体且带条件的说明；原作者观察、官方核对与本站建议分开表达。来源无法读取时记录缺口，不从标题推测完整正文，不把资料精读记为新的本地测评。

## 首批 11 篇

| 本站文章 | 原文账号 / 作者 | 原文日期（UTC+8） | 原文 |
| --- | --- | --- | --- |
| [一句话，角色动起来：prompt2rig 的动作生产线](readings/prompt2rig-text-to-motion.md) | 晴天的码场 | 2026-10-29 | [来源](https://mp.weixin.qq.com/s/QcDpAx5wlUJ9TFf_O1cpLQ) |
| [图片越改越乱时：把结构和风格拆开重做](readings/ai-image-repair-structure-style.md) | 火玉的田野 / 火玉 | 2026-10-12 | [来源](https://mp.weixin.qq.com/s/-8iEwwOuAP4Aj4zXq5tWQw) |
| [视频变成角色动画：Mixamo 动捕里的可检查闭环](readings/mixamo-mocap-agent-animation.md) | AI for Frontend / 前端设计大神 | 2026-09-17 | [来源](https://mp.weixin.qq.com/s/Rk5UTyMM6d2EpTAFZxKo0A) |
| [小模型也能好好说话：Audio8 的语音部署选择](readings/audio8-compact-tts.md) | AI for Frontend / 前端设计大神 | 2026-10-30 | [来源](https://mp.weixin.qq.com/s/NfutJY9UGy6tozL37wMysQ) |
| [从一段视频长出小游戏：让画面先定义玩法](readings/video-to-game-playable-prototype.md) | AI for Frontend / 前端设计大神 | 2026-10-29 | [来源](https://mp.weixin.qq.com/s/1ECp10_o9BA1I3HPBWkAUA) |
| [先给图纸，再让 AI 建模：八视角白模实验](readings/eight-view-ai-3d-blockout.md) | 亦暖筑序 | 2026-10-27 | [来源](https://mp.weixin.qq.com/s/4Cq7hM92Bk8tug1OLhihyw) |
| [换角色，保留场景：读懂 Qwen-FaceSwap 的输入边界](readings/qwen-faceswap-identity-transfer.md) | 前沿AI资讯技术 | 2026-10-31 | [来源](https://mp.weixin.qq.com/s/PIm1Q_CHKajtWQTsvejErw) |
| [让插画成为会回应的角色：Mesh Avatar Studio](readings/mesh-avatar-studio-living-illustration.md) | 产品经理逛世界 / JimmyMo | 2026-10-28 | [来源](https://mp.weixin.qq.com/s/uWMdTmCBFuD_iFrOdf2uEA) |
| [六步生成之后：Pika H3 Flex 的速度与边界](readings/pika-h3-flex-speed-and-limits.md) | 动画大丸家 / 精选干货 | 2026-10-31 | [来源](https://mp.weixin.qq.com/s/OlcDdYndokBqKGhzourXBw) |
| [让读者愿意读下去：Humanizer 的改稿清单](readings/humanizer-clearer-ai-writing.md) | 极客AI开源圈 / Bite | 2026-10-31 | [来源](https://mp.weixin.qq.com/s/iAGWmQOcAz1nZt3fsaouGQ) |
| [字幕就是时间轴：把讲解做成白板手绘动画](readings/srt-whiteboard-animation-storytelling.md) | 极客之家 / 丛林 | 2026-09-30 | [来源](https://mp.weixin.qq.com/s/I3up8jG30FRFoYakYBz8Kw) |

首批整理日期为 2026-11-06。选择 **36 项原文素材：24 项图示/动图和 12 项原视频封面**，其中两项保留动画，分别为 27 帧和 232 帧。筛选掉广告图、二维码及重复宣传图；五组白模结果与参考板完整对应，原文全部 12 段视频均保留入口。36 个 WebP 衍生文件共 3,462,548 字节，约 3.30 MiB。11 张封面通过指定技能与明确批准的 `gpt-image-2.5-flare` 生成，保留原始 PNG 和实际提示词；22 张封面 WebP 共 1,264,398 字节。新网页素材合计约 4.51 MiB。

## 来源与媒体规则

- 原文 HTML、正文和下载临时文件仅在 `.vercel/wechat-import/<batch>/`，不进入 Git 或部署。公开来源台账保存标题、账号/作者、原文/抓取时间、正文哈希、来源 URL 与素材对应关系。
- 博客是独立撰写的精读与分析，保留出处；原文章和图像权利仍归各自作者。只选择说明方法所需的关键图示，不整篇镜像原站、不抓评论或私人账号信息。
- 正文图示和动图存小型 WebP，标注原作者并链接原素材与原文；动画保留逐帧时序。
- 微信内嵌视频的可用性受平台播放环境影响。本次保存每段视频 ID、原播放页、预览封面与文章入口，页面明确“在原文查看视频”，不伪装成本站可播放视频，不下载受限原视频。
- 封面与原文素材分开归档、分别标注。封面必须调用已安装的 `sub2-image-gen`，保留准确模型名、提示词、PNG、实际尺寸和 SHA-256。原图在 `output/imagegen/wechat-<batch>/`，网页只用 1120×700 / 640×400 的 WebP。主题插画不当作模型效果或实测证据。
- 凭证由本机技能管理，不打印、复制或提交；批次记录不包含 API Key。模型失败时报告网关错误，未经用户明确授权不更换模型。

## 后续批次的维护流程

1. 在 `operations/wechat-batches/<date>.json` 增加链接、稳定 slug、主题与封面创意；先按 URL 检查重复来源。
2. 使用原生 Python 抓取公开原文；确认标题、作者和正文可读。对视频、付费或访问受限内容保留真实状态。
3. 阅读正文并选出必要素材，在 `<date>-media.json` 标注文件序号与具体说明；核对项目上游、版本变化和关键参数。
4. 在 `wechatEditorial.ts` 写独立整理稿，按文字内容插入对应素材；沿用统一的来源信息与标题/日期规则。
5. 用用户指定技能实际生成封面，再生成衍生图和来源台账。准备脚本按批次追加，禁止覆盖其他批次或重复导入同一来源。
6. 执行内容检查、构建、页面截图和录屏；更新双语 README、CHANGELOG、插画/媒体台账与发布说明。
7. 提交并推送 `origin/blog`；用户已要求后续精读更新上线，继续用固定独立账户发布博客项目，检查生产图文与资源，再同步发布记录。

```powershell
python -m pip install requests beautifulsoup4 Pillow
python scripts/import-wechat.py --batch 2026-11-06
python scripts/generate-wechat-covers.py --batch 2026-11-06 --skill "<installed sub2-image-gen>/scripts/sub2_image_gen.py"
python scripts/prepare-wechat-media.py --batch 2026-11-06
npm run wechat:export
npm run lint
npm run build
npm run check:wechat
npm run docs:wechat
npm run docs:media
npm run release:check
# 核对并提交、推送 origin/blog 后：
pwsh -File scripts/vercel.ps1 Production
npm run verify:production -- "<deployment-hostname>"
```

封面脚本并发最多两张，保留已验证图像；已存在的提示词文件为视觉审查后的实际输入，不由通用模板覆盖，模型与路由以批次及生成台账为准。`--skip-covers` 只用于等待封面时准备原文素材，不能绕过发布检查。临时浏览器、context、tab 和预览服务由录制脚本在 `finally` 中关闭；不使用 Docker、WSL 或其他虚拟化环境，不操作用户无关窗口。

## English

The reading library turns user-provided public WeChat links into original, structured blog articles. Each post keeps the original title, account/byline, publication date, source URL and selected supporting material. The blog date is the editorial publication date; the source date is displayed separately. Search also indexes source titles, authors and table cells. `#/wechat` is a collection within Research, not a separate copy of the posts.

The first batch contains eleven articles, 36 attributed source figures (24 illustrations/animations and twelve video references) and eleven distinct generated covers. The approved gpt-image-2.5-flare model was used through the requested skill; exact prompts and PNG originals are archived. Source derivatives and the 22 web cover derivatives total about 4.51 MiB. Two animated WebP files retain the original timing. Every source video is represented by its actual poster and a clearly labeled link to its original WeChat article. A poster is not presented as playable video. Advertisements, QR codes and duplicate promotion graphics are omitted.

`operations/wechat-batches/` contains reviewed inputs and media selections. `wechatEditorial.ts` is the authoritative editorial text; `wechatSources.json` binds public metadata, figures and generated-cover provenance. Raw source HTML/text stays in the ignored local cache. Preparing another batch appends to previous records and rejects duplicate slugs or source URLs.

Generate covers with the installed **sub2-image-gen** CLI, using the recorded model. Retain exact prompts, original PNGs, actual dimensions and hashes under `output/imagegen/`; serve only compact WebP derivatives. Do not copy the installed skill or its credentials. Report gateway failures; a model change needs explicit user authorization. Generated artwork is labeled separately from source illustrations and performance evidence.

After editorial review, run lint/build, content checks, both media capture scripts and the complete release checks. Sync both READMEs, the changelog and media/release ledgers, then commit and push `origin/blog`. The user has requested publication of subsequent reading-library updates: deploy through the existing isolated profile, verify the production domain and exact asset bytes, and record the result. The `main` website branch and the default Vercel account are independent. All local tooling is native; capture scripts close only their own temporary browser and preview resources.
