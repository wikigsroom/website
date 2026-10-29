# 截图、录屏与 GIF 复现

[README](../../README.zh-CN.md) · [English](../en/media.md) · [素材预览与下载](../media/README.md)

## 素材展示的实际内容

所有素材均来自本地 Vite **生产构建**的真实浏览器操作，不是页面设计稿或图片拼接视频。桌面演示包括首页、项目区、更新后的页脚、AI 搜索、分类筛选、My Box 搜索、开发工具页及语言切换；手机演示包括滚动、页脚和 AI 搜索。视频无音轨，GIF 约为原速的 1.54 倍。

仅在采集时屏蔽外部 `live2d-widgets` 脚本及 Google Fonts，使用 CSS 中的系统字体回退，以避免字体下载缓慢和已存在的装饰组件错误。该设置不修改网站源码。不同系统的本地字体可能不同，因此源码指纹保证输入版本匹配，不保证每台机器像素完全一致。

本地录屏不能证明 Vercel 的内部路由直接访问 404 或外部组件已经修复。素材包含中文首页；目录使用英文录制，因为现有 AI 中文简介存在损坏。

## 原生环境依赖

- 使用 Node 22/npm 执行 `npm ci`。
- 准备 Playwright Chromium 和录制所需的 FFmpeg，或者选择本机已安装的 Chrome。
- 安装支持 H.264 的原生 `ffmpeg`、`ffprobe`，加入 `PATH`，或使用下表环境变量。

```sh
npx playwright install chromium ffmpeg
npm run docs:media
npm run docs:check
```

Playwright 下载的录制 FFmpeg 与最终转码使用的原生 FFmpeg 是两套工具。本流程不需要 Docker/WSL。

Windows 使用已有 Chrome 的示例，环境变量仅作用于此 PowerShell 进程：

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run docs:media
Remove-Item Env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
```

| 环境变量 | 用途 |
| --- | --- |
| `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` | 可选浏览器路径，默认使用 Playwright Chromium |
| `FFMPEG_PATH` | 可选原生 FFmpeg 路径，默认 `ffmpeg` |
| `FFPROBE_PATH` | 可选原生 FFprobe 路径，默认 `ffprobe` |

## 采集与转码过程

[`capture-docs.mjs`](../../scripts/capture-docs.mjs) 按以下步骤执行：

1. 检查编解码工具，构建网站，选择空闲 loopback 端口，启动原生 Vite 预览子进程。
2. 创建独立浏览器 context，预先设置英文偏好；专门的中文首页截图通过语言按钮切换得到。
3. 以 1440×960 截取桌面页面，以 390×844 截取中文手机首页；完整首页截图前滚动全部内容，触发视口动画。
4. 验证 `codex` 搜索、无匹配查询和导航，记录实际卡片数量及手机是否横向溢出。
5. 以 1280×800 和 390×844 录制真实桌面、手机交互，临时文件为已忽略的 WebM。
6. 使用 CRF 24、`yuv420p`、`+faststart` 编码静音 H.264 MP4；使用调色板生成循环 GIF：10 fps、128 色、宽度 880/312、`setpts=0.65*PTS` 加速。
7. 探测文件并生成 [`manifest.json`](../media/manifest.json)，保存采集条件、源码指纹、实际检查结果、尺寸、时长、字节数和 SHA-256。
8. 在 `finally` 中关闭本次浏览器 context/进程并停止预览服务，失败时也执行清理。

原始 WebM 保留在已忽略的 `docs/media/.raw/` 便于排查；Git 只提交最终 PNG/MP4/GIF 和清单。首次最终媒体总计约 26 MB，每个文件均小于项目检查限制 25 MiB。

## 提交前检查

查看桌面和手机首页、过滤结果、完整页面及页脚，检查中文字形、图片加载、换行、卡片内容和新旧 GitHub 文案。播放两段 MP4 和两张 GIF。Probe 读取元数据，完整解码可以进一步发现损坏帧：

```sh
ffmpeg -v error -i docs/media/desktop-tour.mp4 -f null -
ffmpeg -v error -i docs/media/mobile-tour.mp4 -f null -
ffmpeg -v error -i docs/media/website-tour.gif -f null -
ffmpeg -v error -i docs/media/mobile-tour.gif -f null -
npm run release:check
```

`docs:check` 验证文档本地链接、文件存在性、大小和哈希，要求具备截图/视频/GIF，并比较规范化的源码指纹。`src/`、`public/`、`index.html`、`tailwind.config.ts`、`vite.config.ts` 内容变化要求重新采集；例外是 `public/` 根目录中符合 `<32 位十六进制字符>.txt` 的域名验证文件，它们不影响页面展示，因此不纳入视觉指纹，改用构建产物和线上 HTTP 正文的精确比对验证。依赖或工具修改也可能改变视觉输出，即使不触发指纹变化也应在输出变化时重录。CI 检查已提交材料，不会启动浏览器或重新录制。

采集失败时修复后重新运行，不能将部分刷新文件配合旧清单提交，哈希检查会拒绝不一致的材料。在脚本之外手动打开的检查浏览器，也需要在结束后关闭。
