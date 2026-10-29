# 2026-10-29 · 测评批次文章 / Benchmark journals

[中文 README](../../README.zh-CN.md) · [English README](../../README.md) · [46 批次目录 / Batch index](../benchmark-batches.md)

## 简体中文

将 Benchmark 1.9.0 的所有测评按 `rounds` 转为独立博客文章。原有 24 篇文章增加为 70 篇，新增“测评日志”栏目；官网的 `main` 分支与测评站源码不变。

| 范围 | 结果 |
| --- | --- |
| 批次文章 | 46 篇，一批一篇 |
| 独立记录 | 681 条全部覆盖，每条只有一个归属批次 |
| 跨批次复核引用 | 89 次，单独标注，不当作新执行 |
| 文章总数 | 70（46 测评 + 18 Research + 6 Notes） |
| 快照 | 1.9.0 / 2026-10-29，公开 API 来源及 SHA-256 写入数据 |
| 日期 | 测评批次日期与整理日期分别显示 |
| 素材 | 原站 HTTPS 引用；本地可选目录联接，不复制归档影音 |

每篇包含问题与范围、过程变化、逐项证据、结论边界和原始来源。人工整理各批次导语、阅读方法与结论；数据部分直接保留公开记录中的状态、计时口径、指标、输入、参数、核验、输出和限制。纯复核、安装、准备、失败与资料调查均保留。

正文新增表格、图片、音频、视频、链接与可展开批次结果。完整证据延迟载入，关闭条目时不挂载详细正文；大素材按需访问。搜索覆盖案例 ID、名称、模型和摘要，保留原有栏目、标签、收藏及阅读控制。修复从测评/研究切换到 Notes 的栏目状态，补齐两篇已有 Research 缺失的封面。

数据由公开 API 导出后冻结，移除本机路径和内部设备地址。保留 681 个唯一条目，合计 770 次关联。执行标记不等于质量通过，历史观察不被后续状态倒写；没有重新测评或补造缺失结果。

验证包括 Lint、TypeScript/Vite 生产构建、批次覆盖、封面和内部文章链接检查，以及浏览器逐项展开全部关联。另检查搜索、70/46/18/6 栏目计数、收藏、字号、返回列表、代表素材加载和 320/390/768/1440px 布局。[验收报告](../media/benchmark-20261029/verification.json) 与 [截图/MP4/GIF](../media/README.md) 一同保存，生成后关闭浏览器和临时服务。该验证不等于重新运行所有模型或人工审看全部成品。

当前证据分块约 2.55 MB（gzip 约 304 KB），入口脚本约 929 KB（gzip 约 162 KB）；构建因此提示超过默认分块体积阈值。完整证据仅在访问批次文章时载入。后续数据显著增长时可再按批次拆分证据；未把原始影音打入这些脚本。

代码、双语说明和媒体同步 `origin/blog`。本次交付为文章整理与 Git 同步，不包含主动 Vercel 发布。后续要求上线时，单独发布 `blogs` 项目并检查生产地址，沿用独立账户配置，不修改默认全局账户。

## English

All Benchmark 1.9.0 rounds now have individual blog journals. The article count grows from 24 to **70: 46 Benchmark journals, 18 Research posts and six Notes**. All **681 unique records** have one owning batch; **89 additional cross-batch references** are labeled explicitly. Original batch dates and the separate 2026-10-29 publication date remain distinct.

Each article includes scope, observed changes, complete expandable evidence, interpretation, limitations and source/related-batch links. Every batch has a reviewed introduction, reading guide and conclusion. Preparation, installation, research, failure, history and review states remain visible. Recorded inputs, parameters, metrics, verification and timing scope are preserved; an execution flag does not imply a quality pass.

The frozen export comes from the public API, records its SHA-256 and removes local machine paths/internal device addresses. Covers and evidence are bundled with the blog. Large assets reuse public HTTPS URLs, while an optional ignored local directory junction supports archive browsing. The blog does not duplicate original media. Cross-project local filesystem links are not a cloud delivery mechanism.

Tables, images, audio, video, links and lazy result lists are supported. Search indexes record IDs, titles, models and summaries. Section switching and reader controls remain available; Notes navigation from the other sections is corrected. Two existing Research posts receive missing covers.

Validation includes lint, TypeScript/Vite compilation, full coverage/cover/internal-link checks and browser expansion of all **770 associations across 46 routes**. Search, section counts, bookmarks, reader controls, selected public media and 320/390/768/1440px layouts are checked. [Verification](../media/benchmark-20261029/verification.json), [screenshots, MP4s and GIFs](../media/README.md) are recorded, with browser/server cleanup. This does not claim fresh GPU execution or a subjective review of every output.

The detailed evidence chunk is approximately 2.55 MB (304 KB gzip) and the entry bundle 929 KB (162 KB gzip), exceeding the default bundle warning threshold. Detailed evidence loads only on batch article access. Further per-batch splitting can be considered as data grows; original audio/video is not bundled into JavaScript.

Source, bilingual documentation and media synchronize to `origin/blog`. This delivery does not initiate a Vercel production release. When publication is requested, deploy the separate `blogs` project with the isolated account and verify the production result.
