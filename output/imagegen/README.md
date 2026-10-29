# Editorial illustrations / 主题插画

Thirteen illustrations were generated with the explicitly requested `sub2-image-gen` skill, using **gpt-image-2.5**, high quality and a requested size of 1536×1024. Original PNG files and exact prompts are retained here; the blog serves compressed WebP derivatives, not these PNGs. Actual output dimensions, file sizes and SHA-256 hashes are recorded in [manifest.json](manifest.json).

十三组插画通过用户指定的 `sub2-image-gen` 技能生成，模型为 **gpt-image-2.5**，质量为 high，请求尺寸为 1536×1024。这里保存原始 PNG 和完整提示词；网页仅发布压缩的 WebP 衍生图。实际返回尺寸、文件大小与 SHA-256 见 [manifest.json](manifest.json)。

| File / 文件 | Theme / 主题 | Prompt / 提示词 |
| --- | --- | --- |
| [voice-studio.png](voice-studio.png) | Voice casting, speech and podcasts / 声线、语音与播客 | [Prompt](prompts/voice-studio.txt) |
| [context-library.png](context-library.png) | Long context and reasoning / 长上下文与逻辑推理 | [Prompt](prompts/context-library.txt) |
| [workflow-lab.png](workflow-lab.png) | Workflow and input inspection / 工作流与输入检查 | [Prompt](prompts/workflow-lab.txt) |
| [model-archive.png](model-archive.png) | Source/version provenance / 模型来源与版本 | [Prompt](prompts/model-archive.txt) |
| [music-score.png](music-score.png) | Score planning and long songs / 谱面规划与长曲 | [Prompt](prompts/music-score.txt) |
| [video-story.png](video-story.png) | Video references and world models / 视频参考与世界模型 | [Prompt](prompts/video-story.txt) |
| [voice-casting.png](voice-casting.png) | Comparing and choosing voices / 声线比较与选角 | [Prompt](prompts/voice-casting.txt) |
| [repair-bench.png](repair-bench.png) | Signal diagnostics and recovery / 链路诊断与恢复 | [Prompt](prompts/repair-bench.txt) |
| [duo-podcast.png](duo-podcast.png) | Two-speaker dialogue / 双人对话 | [Prompt](prompts/duo-podcast.txt) |
| [music-stage.png](music-stage.png) | Vocal songs and arrangement / 演唱与编曲 | [Prompt](prompts/music-stage.txt) |
| [music-journey.png](music-journey.png) | Multiple music styles / 多种音乐风格 | [Prompt](prompts/music-journey.txt) |
| [context-puzzle.png](context-puzzle.png) | Step-by-step reasoning / 逐步逻辑推理 | [Prompt](prompts/context-puzzle.txt) |
| [world-portal.png](world-portal.png) | World models and spatial exploration / 世界模型与空间探索 | [Prompt](prompts/world-portal.txt) |

These are thematic illustrations, explicitly labeled on the site. Actual experiment video frames, image outputs, audio waveforms and record excerpts come from the frozen Benchmark source and are attributed separately. Illustration prompts do not contain API keys, credentials or private research files.

网页明确将这些图标为主题插画。实际视频抽帧、图像产物、音频波形和记录摘录由冻结的 Benchmark 素材另行生成并标明来源。提示词不包含 API 密钥、凭证或私人研究文件。

Reproduction / 复现（在已配置该技能的本机运行）：

```powershell
python "<installed sub2-image-gen>/scripts/sub2_image_gen.py" generate --model gpt-image-2.5 --size 1536x1024 --quality high --prompt-file output/imagegen/prompts/voice-studio.txt --out output/imagegen/voice-studio.png
npm run benchmark:covers
```

The installed skill owns the gateway configuration; do not copy its script or credentials into this repository. `output/` is excluded from Vercel uploads. The material pipeline reads originals from the ignored local archive junction when available, and keeps only small derivatives under `public/assets/benchmark-visuals/`.

网关配置由本机安装的技能管理，不应将技能脚本或凭证复制进仓库。`output/` 不上传至 Vercel。素材流水线优先读取忽略目录中的本地归档联接，仅将小型衍生图保存到 `public/assets/benchmark-visuals/`。
