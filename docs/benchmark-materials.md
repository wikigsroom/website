# 素材复用 / Material reuse

[中文 README](../README.zh-CN.md) · [English README](../README.md) · [批次目录 / Batch index](benchmark-batches.md)

## 简体中文

46 篇批次文章共用 Benchmark 已公开的素材。博客 Git 中保存正文、公开证据快照、封面和说明媒体，不再次保存测评影音原件。公开来源为 [Benchmark 目录](https://benchmark.sidcloud.cn/api/catalog)，当前冻结版本为 1.9.0，日期为 2026-10-29。

| 使用位置 | 实现 | 存储与行为 |
| --- | --- | --- |
| 本地查看归档 | `.vercel/benchmark-source/archive` 目录联接 | 指向已有冻结发布包，不复制素材；忽略目录，不参与打包 |
| 线上图片/影音 | `https://benchmark.sidcloud.cn/archive/...` 绝对 URL | 由测评站提供文件，博客预览或链接打开 |
| 工作流、输入、报告 | 原公开链接 | 条目展开后按需访问，保留来源 |
| 文章数据与封面/配图 | JSON、TypeScript、压缩 WebP | 随博客构建发布；小型抽帧/截图/波形另带来源清单 |
| 主题插画原图/提示词 | `output/imagegen/` | 提交 Git 便于复现，排除 Vercel 上传；网页标明“主题插画” |
| 文档截图/录屏/GIF | `docs/media/benchmark-20261029/` | 提交 Git，排除 Vercel 上传 |

### 本地关联

```powershell
npm run benchmark:link -- "E:\dev\sandbox\windows操控\模型测评发布包-无损优化版"
```

目录联接指向发布包的 `.vercel/output/static/archive`。脚本检查目标存在；已有入口必须仍指向同一归档，否则停止，避免覆盖。路径只写入忽略目录内的 `profile.json`，不写入公开文章数据。

当前 Windows 进程创建文件和目录 SymbolicLink 均返回 EPERM；目录联接已验证可用。因此这里实际创建的是 Junction，不冒称为真正的 SymbolicLink，也不修改 Windows 权限设置。其他平台使用目录符号链接。

不要把入口放入 `public/`。此前用一个图片验证：Vite 会将联接内文件复制为普通构建文件，内容 SHA-256 一致，仍会占用发布存储。独立 Vercel 项目之间也无法沿本机绝对路径读取文件。线上素材复用依靠 HTTP 地址实现。

### 页面加载与结果解释

- 46 篇均展示栅格封面与正文图，具体抽帧、截图、波形和资料图见 [可视化方案](benchmark-visuals.md)。选定音频直接提供控制条，视频提供可展开的播放器；均 `preload="none"`，不自动播放。完整证据条目内沿用按需元数据加载。
- 关闭条目时不挂载详细正文；展开后展示已记录的输入、参数、指标、核验与限制。浏览器不自动下载全部 681 项影音。
- 载入失败时展示文字回退和原素材入口。历史缺失素材保持缺失说明；有链接并不代表已重新验收画质、自然度或同步质量。
- 文章以来源快照冻结状态，明确区分测评日期和整理日期。复核批次的 89 次引用不作为新增运行。

### 验证与维护边界

浏览器检查覆盖每个文章路由和全部 770 次关联，核对封面和正文图解码，并播放代表音频/视频；完整结果见 [页面验收报告](media/benchmark-20261029/verification.json)。此前从真实博客域名完成的跨域检查另存为 [跨域素材验收](media/benchmark-20261029/cross-origin-proof.json)，其明确记录了检查范围和浏览器关闭状态。没有重新运行 GPU 测评，也没有宣称逐帧审核全部原片。

博客不重复上传原素材，但播放流量仍由 Benchmark 承担。原站下线、删除文件、改变路径或限制访问会影响预览；冻结 JSON 不等于另存全部二进制素材。后续更换来源地址时，应更新快照并重新验证图片、音频、视频和工作流链接，保留已发布 URL 的兼容性。Git 推送与 Vercel 部署分别记录。

## English

The 46 journals reuse media already published by Benchmark. Git stores article text, a public evidence snapshot, covers and documentation media; it does not duplicate benchmark originals. The [public catalog](https://benchmark.sidcloud.cn/api/catalog) is frozen at version 1.9.0, dated 2026-10-29.

| Location | Mechanism | Behavior |
| --- | --- | --- |
| Local archive access | `.vercel/benchmark-source/archive` directory junction | Points to the existing frozen release; outside the public/build tree and ignored by Git |
| Production media | Absolute `https://benchmark.sidcloud.cn/archive/...` references | Benchmark serves the files; the blog embeds selected samples or links to originals |
| Workflows, inputs and reports | Original public URLs | Available on demand from expanded entries |
| Article evidence, covers and figures | JSON, TypeScript and compressed WebP | Small attributed derivatives are built with the blog; detailed evidence loads separately |
| Illustration originals and prompts | `output/imagegen/` | Versioned for reproduction but excluded from Vercel; artwork is visibly labeled |
| Documentation media | `docs/media/benchmark-20261029/` | Tracked in Git and excluded from Vercel uploads |

`npm run benchmark:link -- "<frozen publication directory>"` links its `.vercel/output/static/archive` directory. The script verifies the source and refuses to replace an unrelated existing destination. Local paths stay in ignored configuration.

True file/directory SymbolicLink creation returned EPERM in the current Windows process; Junction creation worked. The script therefore uses a native Windows directory junction without changing system privileges, and a directory symlink on other platforms. This distinction is deliberate.

A link inside `public/` is unsuitable: a Vite proof copied the linked image into a normal output file with the same SHA-256, so it still consumes deployment storage. Separate Vercel projects cannot follow a local machine path. Production reuse consequently uses HTTP references.

All 46 articles have raster covers and visible figures, described in the [visual design](benchmark-visuals.md). Selected original audio has native controls; videos have expandable players, with `preload="none"` and no autoplay. Detailed evidence retains metadata preloading on expansion. The browser does not download all 681 records' media. Source links remain available; missing historical evidence stays documented, and the 89 cross-batch references do not count as fresh runs.

The [browser report](media/benchmark-20261029/verification.json) covers all 46 routes and 770 record associations, plus selected public media loading. An earlier [cross-origin proof](media/benchmark-20261029/cross-origin-proof.json) checked assets from the real blog origin and states its limited scope. These checks are not new GPU benchmarks or a frame-by-frame quality review.

Playback still consumes Benchmark bandwidth. Removing files, changing paths or restricting access can break previews; a frozen metadata snapshot is not a binary backup. Preserve published asset URLs, review snapshot changes and recheck media when the source changes. Record Git synchronization separately from production deployment.
