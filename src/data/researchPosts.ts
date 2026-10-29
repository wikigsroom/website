import type { Post } from './posts';

export const researchPosts: Post[] = [
  {
    slug: 'research-open-source-ai-radar-2026-05-28',
    title: '开源 AI 项目研究雷达：本地优先、多模态统一与 Agent 协议化',
    subtitle: '把 research/ 当前开源项目报告整理成一张可更新的技术判断图。',
    date: '2026-05-28',
    category: 'Research Radar',
    tags: ['Research', 'Open Source', 'AI', 'Local First', 'Agent'],
    cover: '/assets/generated-covers/research-open-source-ai-radar-2026-05-28.png',
    readMins: 11,
    pinned: true,
    section: 'Research',
    priority: 'P0',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-open-source-projects-index.md',
    excerpt:
      '这批项目共同指向一个方向：AI 工具链正在从单点模型评测，转向本地运行、工具协议、多模态输入输出和可组合工作流。',
    content: [
      {
        type: 'p',
        text: '这次整理的 research/ 内容不是普通项目收藏，而是一组围绕个人 AI 工程栈的技术观察。Qwen3.6-27B、Voicebox、SmallCode、Mesh-LLM、Lance、LongCat-Video-Avatar-1.5、WanGP / Wan2GP、LocateAnything、Aholo Viewer、Step 3.7 Flash、RealRestorer、Lyra 2.0、MiniCPM5-1B、Gemma 4 / Unsloth、Heretic、SoulX-FlashTalk、LongLive 2.0、SANA-WM、ERNIE-Image、HiDream-O1、NAVA、Qwen3.5-LiveTranslate、UniVidX、SubForge、World-R1、ERNIE-Image 8B、Ideogram 4、Lens、DreamLite、Sulphur-2-Base-GGUF 与 IDMVTON_CN 分别落在模型、语音、Coding Agent、分布式推理、多模态生成、音频驱动数字人、本地视频生产、视觉定位、浏览器 3DGS、高吞吐多模态 Agent、真实图像修复、3D 世界模型、端侧模型、本地运行、安全治理、实时数字人、长视频、世界模型、图像生成、音视频同步、实时翻译、可控视频编辑、字幕生产、本地视频资料入库、3D-aware reward、设计可控生图、训练效率、端侧生成、本地视频与虚拟试衣应用层。',
      },
      { type: 'h2', id: 'thesis', text: '主线判断' },
      {
        type: 'list',
        items: [
          'Local-first 从隐私口号变成工程约束：语音、代码、视频、图像生成都在把模型和工作流推回本地设备。',
          'Agent 生态正在协议化：OpenAI-compatible API、MCP、REST、CLI/TUI 和 ComfyUI workflow 都在降低工具接入成本。',
          '统一多模态还处在研究到 demo 的过渡期：Lance 和 DreamLite 展示方向，但生产稳定性仍需要任务级验证。',
          '许可边界会直接决定产品化空间：Apache-2.0、MIT、CC BY-NC、LTX-2 Community License 的商业含义完全不同。',
        ],
      },
      { type: 'h2', id: 'priority', text: '优先级结构' },
      {
        type: 'p',
        text: 'P0 应该放在会改变个人工作流入口的位置：Qwen3.6-27B 作为长上下文 Agentic Coding 基线，Voicebox 作为本地语音输入输出与 MCP 语音层。P1 是需要进入实验矩阵的基础设施和模型方向：SmallCode、Mesh-LLM、Lance、LongCat-Video-Avatar-1.5、WanGP / Wan2GP、LocateAnything、Step 3.7 Flash、RealRestorer、MiniCPM5-1B、Gemma 4 / Unsloth、ERNIE-Image / HiDream-O1、LongLive 2.0 / SANA-WM、SubForge、ERNIE-Image 8B 与 Ideogram 4。P2 是有明确实验价值但受许可、复现、硬件或生态成熟度约束影响的方向：Aholo Viewer、Lyra 2.0、SoulX-FlashTalk、NAVA、Qwen3.5-LiveTranslate、World-R1、Lens、DreamLite、Sulphur-2-Base-GGUF。P3 是低频索引、风险档案和历史基线：Heretic、UniVidX、受限微信来源、IDMVTON_CN。',
      },
      { type: 'h2', id: 'experiment-loop', text: '后续实验闭环' },
      {
        type: 'list',
        items: [
          '先测 Qwen3.6-27B、SmallCode、Voicebox：覆盖代码理解、文件编辑、语音输入、TTS 输出和 MCP 调用。',
          '再测 Mesh-LLM 私有 mesh：固定模型、固定任务、固定机器组合，记录延迟、吞吐、失败恢复和数据边界。',
          '多模态项目只做固定样例集：Lance 测理解/编辑/短视频，LongCat 与 SoulX 测音频驱动数字人，WanGP 测低显存视频生产，LocateAnything 测视觉定位，Aholo Viewer 与 Lyra 2.0 测浏览器 3DGS / 3D 世界生成，Step 3.7 Flash 测高吞吐 Agent/视觉任务，RealRestorer 测真实图像修复，MiniCPM5-1B 与 Gemma/Unsloth 测本地端侧任务，ERNIE-Image、ERNIE-Image 8B、Ideogram 4、Lens 与 HiDream-O1 测图像 prompt 套件，LongLive / SANA-WM / World-R1 / NAVA / UniVidX 测视频一致性与音视频同步，SubForge 测视频资料字幕入库，Heretic 和受限微信来源只进安全与来源观察档案，DreamLite 测端侧编辑，Sulphur 测 ComfyUI 中不同 GGUF 量化档位。',
          '每次实验都记录来源、环境、显存、耗时、失败率、许可限制和可复现步骤，形成下一轮 research/ 增量。',
        ],
      },
      {
        type: 'quote',
        text: '这批研究的核心不是追热点，而是筛出能进入个人 AI 工程栈的真实组件。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'research/ -> project report -> priority -> experiment card -> benchmark notes -> blog synthesis\n' +
          '              |                                           |\n' +
          '              |--------------- update loop ----------------|',
      },
    ],
  },
  {
    slug: 'wechat-image-generation-world-models',
    title: 'World-R1、ERNIE-Image 8B、Ideogram 4 与 Lens：生成模型正在转向结构可控',
    subtitle:
      '6/4 简报显示，图像和视频生成的竞争点正在从单张好看图，转向 3D 几何、文字渲染、版式控制和训练效率。',
    date: '2026-06-04',
    category: 'Image & World Model Briefing',
    tags: [
      'World-R1',
      'ERNIE-Image',
      'Ideogram 4',
      'Lens',
      'Image Generation',
      'World Model',
      'Training Efficiency',
    ],
    cover: '/assets/benchmark-visuals/hero/wechat-image-generation-world-models.webp',
    coverCaption: 'gpt-image-2.5 主题插画 · 视频与世界模型研究',
    coverLabel: '主题插画',
    readMins: 10,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/10_outputs/briefings/2026-06-04-wechat-image-generation-world-model-briefing.md',
    excerpt:
      'World-R1 把视频生成拉向 3D-aware reward，ERNIE-Image 8B 和 Ideogram 4 把图像生成拉向文字与版式控制，Lens 则把训练效率拆成可复用工程清单。',
    content: [
      {
        type: 'p',
        text: '这份 6/4 简报不是又一组“谁出图更好看”的模型新闻。它更像一条结构化生成的分水岭：World-R1 关心视频里的 3D 几何一致性，ERNIE-Image 8B 关心中文和长文本渲染，Ideogram 4 关心 structured JSON、bbox 与调色盘控制，Lens 关心怎样用更少训练算力得到可竞争的 T2I 基座。',
      },
      { type: 'h2', id: 'signals', text: '四条新信号' },
      {
        type: 'list',
        items: [
          'World-R1：用 Flow-GRPO、3D-aware rewards、相机感知 latent 和周期性解耦训练，让文本生成视频更接近 world simulation。',
          'ERNIE-Image 8B：百度 open text-to-image 模型家族，标准版重画质，Turbo 版面向 8-step 快速生成，核心卖点是中文理解、长文本渲染和 ComfyUI / Diffusers / SGLang 入口。',
          'Ideogram 4：9.3B open-weight 设计向图像模型，强调 structured JSON prompt、bounding-box layout、color palette、多语言文字和原生 2K 输出。',
          'Lens：微软 3.8B 文生图模型，把训练效率拆成 dense caption、混合分辨率、text encoder、semantic VAE、RL tuning 和 4-step Turbo 蒸馏。',
        ],
      },
      { type: 'h2', id: 'structure', text: '从好看图到结构控制' },
      {
        type: 'p',
        text: '这批项目共同说明，生成模型的评估对象正在换挡。下一阶段不只问图像是否漂亮，而要问文字能不能准、元素能不能落在指定区域、颜色能不能锁定、视频相机路径是否一致、世界几何是否自洽。这会直接改变个人图像工作流的评测方式。',
      },
      {
        type: 'list',
        items: [
          '图像 prompt 集需要加入中文长文本、英文长文本、UI mock、商品包装、海报版式、透明素材和 bbox 约束。',
          '视频 prompt 集需要加入相机运动、遮挡、长镜头、场景回看和多物体几何一致性。',
          '每次实验都要保存原始 prompt、改写后 prompt、seed、分辨率、推理框架、权重许可和输出图。',
        ],
      },
      { type: 'h2', id: 'license', text: '许可先于试用' },
      {
        type: 'p',
        text: 'Ideogram 4 是这批里最需要醒目标注的项目：代码仓库显示 Apache-2.0，但模型权重是 gated，README 口径为 Ideogram 4 Non-Commercial。对博客和实验来说，这不是阻止观察，而是要求把“代码许可”和“权重许可”分开写清楚。',
      },
      {
        type: 'list',
        items: [
          'ERNIE-Image 的 Apache-2.0 更适合进入中文视觉内容生产实验。',
          'Ideogram 4 可以进入设计可控能力观察，但商用边界必须置顶提醒。',
          'World-R1 和 Lens 的方法论价值高，短期更适合阅读 reward pipeline、训练清单和评估脚本，而不是急着完整复现训练。',
        ],
      },
      { type: 'h2', id: 'priority', text: '优先级判断' },
      {
        type: 'list',
        items: [
          'P1：ERNIE-Image 8B，原因是中文文字渲染、海报类任务和 ComfyUI / Diffusers 接入都能进入固定样例集。',
          'P1：Ideogram 4 license review，原因是设计可控能力强，但 Non-Commercial 权重边界必须先写进工具链规则。',
          'P2：Lens，原因是训练效率拆解可沉淀为模型训练报告模板。',
          'P2：World-R1，原因是 3D-aware reward 和 RL 后训练有方法论价值，但完整复现成本较高。',
          'P3：受限微信 image_detail 来源，先保留链接参数，等待截图或正文补录。',
        ],
      },
      { type: 'h2', id: 'next', text: '下一步实验' },
      {
        type: 'list',
        items: [
          '新建图像生成评测 prompt 集，覆盖中文长文本、版式约束、透明背景、bbox、UI 和商品包装。',
          '为 ERNIE-Image 做 ComfyUI、Diffusers、SGLang 三路实验记录，保存增强前后 prompt。',
          '为 Ideogram 4 写许可提醒片段，贴到任何试用记录顶部。',
          '把 Lens 拆成训练效率 checklist：caption、resolution、VAE、text encoder、RL、distillation。',
          '给 World-R1 另开阅读笔记，先拆 reward server、dataset 结构和评估脚本。',
        ],
      },
      {
        type: 'quote',
        text: '生成模型的下一轮竞争，不是“能不能生成”，而是“能不能在约束下稳定生成”。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'image prompt suite -> text / layout / palette / bbox metrics\n' +
          'video world model -> camera path / 3D reward / consistency notes\n' +
          'training report -> caption density / encoder / VAE / RL / distillation checklist',
      },
    ],
  },
  {
    slug: 'subforge-subtitle-research-pipeline',
    title: 'SubForge：把视频字幕生产变成个人研究系统的入口层',
    subtitle:
      '转录、分段、翻译、质检和字幕合成被收敛成 CLI 管线后，视频资料就能更稳定地进入知识库。',
    date: '2026-06-02',
    category: 'Creator Toolchain',
    tags: ['SubForge', 'Subtitle', 'Video Localization', 'CLI', 'Research Workflow', 'FFmpeg'],
    cover: '/assets/benchmark-visuals/hero/subforge-subtitle-research-pipeline.webp',
    coverCaption: 'gpt-image-2.5 主题插画 · 视频资料与字幕制作流程',
    coverLabel: '主题插画',
    readMins: 8,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/10_outputs/briefings/2026-06-02-wechat-subtitle-restricted-sources-briefing.md',
    excerpt:
      'SubForge 的价值不只是自动生成字幕，而是把视频资料先转成可检索、可翻译、可复核的文本层，让技术课程、访谈和播客进入长期 research/ 归档。',
    content: [
      {
        type: 'p',
        text: '这份 6/2 简报看起来很小：一篇 SubForge 文章，两个微信受限 image_detail 来源。但它指向一个非常实用的入口问题：技术视频、课程、访谈和播客如果不能先变成可靠字幕，就很难进入长期检索、引用和总结。',
      },
      { type: 'h2', id: 'pipeline', text: '字幕是视频资料的索引层' },
      {
        type: 'p',
        text: 'SubForge 用 Rust CLI 加 Python sidecar，把转录、分段、翻译、质量评估和硬字幕/软字幕输出串成可复跑流程。对个人研究系统来说，这意味着视频不再只是“看过的素材”，而能变成 SRT、双语文本、主题标签和来源卡片。',
      },
      {
        type: 'list',
        items: [
          '转录：本地 faster-whisper，可配置 CPU 或 CUDA。',
          '分段：用 SaT 改善字幕断句和可读性。',
          '翻译：支持 Google、Bing 与 OpenAI-compatible LLM 后端。',
          '质检：通过 GEMBA-MQM 定位低分片段并支持重翻。',
          '合成：通过 FFmpeg 输出硬字幕、软字幕或两者同时保留。',
        ],
      },
      { type: 'h2', id: 'research-workflow', text: '接入 research/ 的方式' },
      {
        type: 'p',
        text: '更有意思的不是 SubForge 自己，而是它能放在 research/ 的哪一层。我的建议是把它放在视频资料入库前：先跑小样，生成字幕和中间文件，再把视频路径、字幕路径、语言、转录模型、翻译后端、输出模式和校验状态写进来源卡。',
      },
      {
        type: 'list',
        items: [
          '课程和公开课：先生成双语 SRT，再做章节摘要和关键概念索引。',
          '技术访谈和播客：先做说话内容检索，再抽取项目、人物、时间线和观点。',
          '产品视频和 demo：先做字幕和镜头说明，再进入多模态 RAG 或资料库。',
          '跨语种材料：保留原文字幕、译文字幕和术语表，避免后续引用失真。',
        ],
      },
      { type: 'h2', id: 'restricted-sources', text: '受限来源的处理' },
      {
        type: 'p',
        text: '两个 image_detail 链接当前没有正文，只能保留参数、抓取状态和补录入口。这类来源不应该硬写成内容结论，但应该留在来源系统里，等截图、正文或普通文章页补齐后再升级卡片。',
      },
      { type: 'h2', id: 'priority', text: '优先级判断' },
      {
        type: 'list',
        items: [
          'P1：SubForge small-sample test，原因是 2 到 5 分钟视频就能验证转录、翻译、字体、软字幕和硬字幕输出。',
          'P1：Video-to-research pipeline，原因是字幕层能把视频资料接入检索、摘要、引用和多语言整理。',
          'P2：SubForge dependency matrix，原因是 Rust、Python、FFmpeg、CUDA、模型和 LLM API 都要记录。',
          'P2：Restricted source recovery，原因是需要截图、复制正文或普通文章页才能升级来源质量。',
        ],
      },
      { type: 'h2', id: 'next', text: '下一步实验' },
      {
        type: 'list',
        items: [
          '建立 `research/06_projects/experiments/subforge-subtitle-pipeline/`，记录安装、样片、命令、输出和问题。',
          '设计视频资料来源卡模板字段：视频路径、字幕路径、语言、转录模型、翻译后端、输出模式、校验状态。',
          '用 5 分钟中文技术视频和 5 分钟英文访谈各跑一次，记录时间轴质量、术语一致性和字幕烧制问题。',
          '等两个受限 image_detail 来源拿到截图或正文后，再升级 source card。',
        ],
      },
      {
        type: 'quote',
        text: '视频资料进入知识库的第一步，不是总结，而是先拥有一层可信字幕。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'video/audio -> transcript -> segmentation -> translation -> QA -> SRT/MP4\n' +
          '              |                                      |\n' +
          '              |---------- source card + research index ---|',
      },
    ],
  },
  {
    slug: 'wechat-ai-models-restoration-flash-agents',
    title: 'Step 3.7 Flash 与 RealRestorer：开源多模态从能力展示转向工程可用性',
    subtitle: '把 2 篇微信新信号整理成一篇简报：高吞吐多模态 Agent 与真实世界图像修复。',
    date: '2026-05-30',
    category: 'AI Model Briefing',
    tags: [
      'Step 3.7 Flash',
      'RealRestorer',
      'Multimodal',
      'Image Restoration',
      'Agent',
      'Open Source',
    ],
    cover: '/assets/generated-covers/wechat-ai-models-restoration-flash-agents.png',
    readMins: 8,
    section: 'Research',
    priority: 'P1',
    sourcePath: 'research/10_outputs/briefings/2026-05-30-wechat-ai-models-briefing.md',
    excerpt:
      'Step 3.7 Flash 和 RealRestorer 分别把高吞吐多模态 Agent 与真实图像修复推到工程可用边界，核心观察不再是单点模型能力，而是速度、评测、部署格式、许可和工作流接入。',
    content: [
      {
        type: 'p',
        text: '这轮新增材料只有两条，但指向同一个判断：开源多模态模型正在从“能力展示”转向“工程可用性”。Step 3.7 Flash 强调高吞吐、长上下文、视觉理解和 Agent workflow；RealRestorer 则把大规模图像编辑模型的先验迁移到真实世界图像修复任务，并补上 RealIR-Bench 这类真实退化评测。',
      },
      { type: 'h2', id: 'signals', text: '两条信号' },
      {
        type: 'list',
        items: [
          'Step 3.7 Flash：198B sparse MoE 视觉语言模型，每 token 约激活 11B 参数，官方强调最高 400 tokens/s、256K context、OpenAI/Anthropic 风格接口和 Agent 工作流。',
          'RealRestorer：基于 Step1X-Edit，把图像编辑模型迁移到去模糊、去噪、去雨雾、低光增强、老照片修复、压缩伪影和反光处理等真实退化场景。',
          '共同变化：两者都不只讲模型参数，而是把数据、benchmark、吞吐、部署格式、API 接口和社区实现放到了产品化边界里。',
        ],
      },
      { type: 'h2', id: 'step-37-flash', text: 'Step 3.7 Flash 的实验价值' },
      {
        type: 'p',
        text: '这类模型对个人 AI 工程栈的价值在于速度。Agent 场景经常被延迟、输出吞吐、上下文缓存命中率和工具循环成本卡住。如果 Step 3.7 Flash 的高吞吐可以在真实任务中稳定复现，它更适合进入网页视觉解释、票据抽取、GUI grounding、代码仓库问答、长文档摘要和多 Agent 编排的测试矩阵。',
      },
      {
        type: 'list',
        items: [
          '官方元信息记录 Apache-2.0、Hugging Face image-text-to-text、256K context、BF16/FP8/NVFP4/GGUF 多精度版本。',
          '部署入口覆盖 vLLM、SGLang、Transformers、llama.cpp 和 NVIDIA NIM，这会降低从 API 测试到自托管评估的迁移成本。',
          '需要重点验证 Visual Python Tool 在真实 GUI、票据、网页和图像局部 re-read 场景中的可靠性。',
        ],
      },
      { type: 'h2', id: 'realrestorer', text: 'RealRestorer 的实验价值' },
      {
        type: 'p',
        text: 'RealRestorer 的重点不是“生成一张更漂亮的图”，而是把真实退化问题变成可评测、可复现、可接入工具链的修复任务。它同时处理合成退化数据、真实退化数据、模型微调和 RealIR-Bench，说明图像修复正在从 demo 效果走向任务闭环。',
      },
      {
        type: 'list',
        items: [
          'RealIR-Bench 覆盖 9 类真实退化，共 464 张真实退化图像，评测同时看 restoration quality 和 content consistency。',
          '短期应优先测老照片、低光、雨雾、手机截图、压缩图和反光图，记录显存、速度、结构保持和细节幻觉。',
          '许可需要谨慎复核：元数据有 Apache-2.0 字段，但 README 同时提示模型和 benchmark assets 面向非商业学术研究。',
        ],
      },
      { type: 'h2', id: 'priority', text: '优先级判断' },
      {
        type: 'list',
        items: [
          'P1：Step 3.7 Flash，原因是高吞吐多模态与 Agent 工作流结合紧密，适合快速做 API 和量化版本实测。',
          'P1：RealRestorer，原因是真实图像修复需求明确，且能补齐个人图像编辑工具链里“修复”这一环。',
          '这两条都不是长期观望项，而是应该进入固定样例集，形成可重复的速度、质量、许可和部署记录。',
        ],
      },
      { type: 'h2', id: 'next', text: '下一步实验' },
      {
        type: 'list',
        items: [
          '给 Step 3.7 Flash 准备 10 个 Agent/视觉任务：网页视觉解释、票据抽取、GUI 指引、代码仓库问答和长文档摘要。',
          '记录 Step 3.7 Flash 的输出速度、缓存命中成本、工具调用稳定性和 256K 上下文下的退化点。',
          '给 RealRestorer 建立 20 张真实退化图片测试集，覆盖模糊、低光、压缩、雨雾、反光、老照片和手机截图。',
          '复核 RealRestorer 的模型权重、benchmark assets、Step1X-Edit 和第三方组件许可，再判断是否能进入公开服务或客户交付。',
        ],
      },
      {
        type: 'quote',
        text: '这轮新增内容的共同点是：模型是否值得跟，不只看能力上限，还要看它是否能被稳定放进真实工作流。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'high-throughput VLM -> agent task suite -> latency and tool-loop benchmark\n' +
          'real image restoration -> degradation set -> quality, consistency and license audit',
      },
    ],
  },
  {
    slug: 'wechat-3d-edge-ai-lyra-minicpm',
    title: 'Lyra 2.0 与 MiniCPM5-1B：3D 世界生成和端侧 AI 的两端收敛',
    subtitle: '一端把单张图扩展成可探索 3D 世界，另一端把 1B 模型推向本地设备。',
    date: '2026-05-31',
    category: '3D & Edge AI',
    tags: ['Lyra 2.0', 'MiniCPM5-1B', '3DGS', 'Edge AI', 'Local AI', 'World Model'],
    cover: '/assets/generated-covers/wechat-3d-edge-ai-lyra-minicpm.png',
    readMins: 7,
    section: 'Research',
    priority: 'P1',
    sourcePath: 'research/10_outputs/briefings/2026-05-31-wechat-3d-edge-ai-briefing.md',
    excerpt:
      'Lyra 2.0 和 MiniCPM5-1B 代表两个互补方向：空间内容从单张图走向可探索 3D 世界，端侧模型从参数规模走向真实设备里的可用 Agent。',
    content: [
      {
        type: 'p',
        text: '这份 5/31 简报把两个看似不相邻的项目放在一起：Lyra 2.0 关注 single image to 3D world，MiniCPM5-1B 关注 1B 级本地模型。它们共同说明，个人 AI 工程栈的边界正在向两端延伸：一端是空间场景生成，一端是低成本、本地化、可重复调用的端侧智能。',
      },
      { type: 'h2', id: 'signals', text: '两条信号' },
      {
        type: 'list',
        items: [
          'Lyra 2.0：从单张图生成可探索 3D Gaussian Scene，重点是长距离几何一致性和可浏览空间，而不是单帧视觉效果。',
          'MiniCPM5-1B：OpenBMB 推出的 1B 端侧模型，重点是本地推理、低资源设备、工具调用和轻量 Agent 任务。',
          '共同判断：一个项目把多模态输出推进到空间结构，另一个项目把模型能力压缩到个人设备；两者都要求从 demo 转入固定测试场景。',
        ],
      },
      { type: 'h2', id: 'lyra', text: 'Lyra 2.0 的价值' },
      {
        type: 'p',
        text: 'Lyra 2.0 更适合被放进 3D 内容与空间智能观察线。它的关键不是“生成一个 3D 物体”，而是把输入图像扩展成可探索场景，这会影响 3DGS 浏览器、虚拟空间预览、场景重建、游戏原型和视频生成前置布局。',
      },
      {
        type: 'list',
        items: [
          '需要优先验证 3DGS 输出格式、浏览器查看链路、相机路径、尺度感和几何断裂点。',
          '严格模型许可会影响商业化和公开服务边界，因此实验阶段要把 license audit 放在质量评估之前。',
          '可以和 Aholo Viewer 放在同一条空间内容链路里观察：一个负责生成，一个负责浏览与分发。',
        ],
      },
      { type: 'h2', id: 'minicpm', text: 'MiniCPM5-1B 的价值' },
      {
        type: 'p',
        text: 'MiniCPM5-1B 的优先级更直接。端侧模型如果能稳定运行在 llama.cpp、Ollama、MLX、Transformers 或浏览器环境里，就可以承担本地摘要、结构化抽取、轻量任务规划、隐私文本处理和桌面助手里的常驻模型角色。',
      },
      {
        type: 'list',
        items: [
          'Apache-2.0 和 GGUF / MLX 等生态入口降低实验门槛，适合先做本地推理矩阵。',
          '测试重点应放在长文本摘要、中文信息抽取、小工具调用、离线问答和本地 Agent 的失败恢复。',
          '它不该和大模型比上限，而应该比单位资源下的稳定性、延迟、内存占用和可集成性。',
        ],
      },
      { type: 'h2', id: 'priority', text: '优先级判断' },
      {
        type: 'list',
        items: [
          'P1：MiniCPM5-1B，原因是端侧模型和个人工作流入口绑定紧，且实验成本低。',
          'P2：Lyra 2.0，方向重要，但受许可、硬件、输出格式和 3D 生态成熟度影响，需要先做小规模复现。',
          '这篇文章整体按 P1 处理，因为 MiniCPM5-1B 可以立即进入本地模型测试矩阵。',
        ],
      },
      { type: 'h2', id: 'next', text: '下一步实验' },
      {
        type: 'list',
        items: [
          '给 MiniCPM5-1B 建本地运行矩阵：CPU、GPU、MLX、GGUF、Ollama、Transformers 和浏览器端入口。',
          '准备 10 个轻量 Agent 任务，覆盖中文摘要、表格抽取、任务拆解、本地搜索和小工具调用。',
          '给 Lyra 2.0 准备 6 张不同空间类型的输入图，记录 3DGS 质量、浏览器加载、几何一致性和显存成本。',
          '复核 Lyra 2.0 权重、数据和输出资产的许可，再决定是否进入公开展示链路。',
        ],
      },
      {
        type: 'quote',
        text: '3D 世界生成解决空间表达，端侧模型解决常驻入口；两条线合起来，才是个人 AI 工作流的下一层界面。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'single image -> 3DGS scene -> browser viewer -> spatial workflow\n' +
          '1B local model -> device matrix -> lightweight agent tasks -> daily assistant',
      },
    ],
  },
  {
    slug: 'wechat-local-ai-safety-avatar',
    title: 'Gemma 4、Heretic、SoulX-FlashTalk：本地 AI、约束可变性和实时数字人',
    subtitle: '本地模型入口、对齐移除风险和音频驱动数字人正在把 Agent 推出文本窗口。',
    date: '2026-05-31',
    category: 'Local AI & Safety',
    tags: ['Gemma', 'Unsloth', 'Heretic', 'SoulX-FlashTalk', 'AI Safety', 'Avatar'],
    cover: '/assets/generated-covers/wechat-local-ai-safety-avatar.png',
    readMins: 8,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/10_outputs/briefings/2026-05-31-wechat-local-ai-safety-avatar-briefing.md',
    excerpt:
      'Gemma 4 / Unsloth、Heretic 和 SoulX-FlashTalk 共同指出：本地 AI 的产品入口正在形成，但安全约束、可变行为和数字人输出都需要更严格的实验记录。',
    content: [
      {
        type: 'p',
        text: '这组材料更像一条本地 AI 产品化链路：Gemma 4 / Unsloth 提供低门槛本地运行入口，Heretic 暴露对齐约束被移除后的安全风险，SoulX-FlashTalk 则把实时音频驱动 avatar 拉进交互层。三者放在一起，说明本地 AI 不只是“模型能不能跑”，还包括行为边界、输出载体和合规观察。',
      },
      { type: 'h2', id: 'signals', text: '三条信号' },
      {
        type: 'list',
        items: [
          'Gemma 4 / Unsloth：代表本地模型产品化入口，重点在安装门槛、量化、微调、运行成本和开发者社区。',
          'Heretic：代表 safety constraints 可被重写或移除的风险面，适合进入风险档案，而不是进入生产实验。',
          'SoulX-FlashTalk：代表实时音频驱动数字人方向，重点是低延迟口型、表情同步、身份保持和硬件成本。',
        ],
      },
      { type: 'h2', id: 'local-ai', text: '本地 AI 入口' },
      {
        type: 'p',
        text: 'Gemma 4 / Unsloth 的优先级在于它靠近个人设备、桌面助手、私有知识库和轻量微调。对个人博客的 research 板块来说，这类项目应该被记录为“可执行入口”：能不能安装、能不能量化、能不能接工具、能不能在固定任务里保持输出稳定。',
      },
      {
        type: 'list',
        items: [
          '短期应建立本地运行基线：同一组任务、同一批设备、同一套日志记录。',
          '需要比较官方 Gemma 路径、Unsloth 优化路径和 GGUF / MLX 等社区路径的差异。',
          '指标不只看分数，还要记录内存、速度、安装复杂度、失败样式和工具调用可控性。',
        ],
      },
      { type: 'h2', id: 'safety', text: '安全约束观察' },
      {
        type: 'p',
        text: 'Heretic 不适合被包装成“可用工具”。它的价值在于提醒：当本地模型、开源权重、微调工具和约束移除方法同时存在时，安全边界会变成可变参数。这里的合理动作是建档、分类、观察风险传播路径，而不是复现危险能力。',
      },
      {
        type: 'list',
        items: [
          '只记录项目元信息、许可、传播渠道、声明边界和风险类型，不进入可操作的滥用流程。',
          '把它和本地 AI 产品化材料放在一起观察，可以帮助后续设计安全基线和拒绝策略测试。',
          'AGPL-3.0 / PyPI / GitHub 生态传播本身也需要纳入合规和供应链风险视角。',
        ],
      },
      { type: 'h2', id: 'avatar', text: '实时数字人链路' },
      {
        type: 'p',
        text: 'SoulX-FlashTalk 的价值在于把语音输入、角色形象和实时视频输出连起来。与 LongCat-Video-Avatar-1.5 相比，它更值得关注实时性和交互链路；与 Voicebox 相比，它把 voice I/O 推到了可见 avatar 层。',
      },
      {
        type: 'list',
        items: [
          '测试要覆盖中文音频、快慢语速、停顿、情绪变化、长句和多人素材边界。',
          '重点记录端到端延迟、口型同步、表情稳定性、身份漂移、显存和推理设备。',
          '它应和 Voicebox、LongCat、NAVA 一起进入数字人和音视频同步观察线。',
        ],
      },
      { type: 'h2', id: 'priority', text: '优先级判断' },
      {
        type: 'list',
        items: [
          'P1：Gemma 4 / Unsloth，本地 AI 入口明确，适合立刻做运行矩阵。',
          'P2：SoulX-FlashTalk，数字人方向重要，但需要先验证硬件、实时性和素材授权边界。',
          'P3：Heretic，只作为安全风险档案，不作为功能实验对象。',
        ],
      },
      {
        type: 'quote',
        text: '本地 AI 的真正问题不是能不能离线运行，而是能不能在可控边界内长期运行。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'local model -> device matrix -> tool behavior baseline\n' +
          'safety-risk project -> metadata archive -> policy and refusal tests\n' +
          'audio avatar -> latency and sync test -> interactive agent surface',
      },
    ],
  },
  {
    slug: 'wechat-video-image-audio-models',
    title: '视频、图像与音频模型同时加速：从长视频基础设施到实时同传',
    subtitle:
      'LongLive 2.0、SANA-WM、ERNIE-Image、HiDream-O1、NAVA、UniVidX 与 Qwen3.5-LiveTranslate 的多模态简报。',
    date: '2026-05-31',
    category: 'Multimodal Model Briefing',
    tags: [
      'Video Generation',
      'Image Generation',
      'Audio AI',
      'World Model',
      'Live Translation',
      'ComfyUI',
    ],
    cover: '/assets/generated-covers/wechat-video-image-audio-models.png',
    readMins: 10,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/10_outputs/briefings/2026-05-31-wechat-video-image-audio-models-briefing.md',
    excerpt:
      '5/31 的多模态材料显示，长视频、世界模型、开源图像生成、音视频同步、可控编辑和实时翻译正在同时推进，实验体系需要从单模型评测转向固定场景矩阵。',
    content: [
      {
        type: 'p',
        text: '这份简报覆盖的项目最多，也最容易被看成零散模型新闻。更合适的整理方式是按工作流拆分：LongLive 2.0 和 SANA-WM 指向长视频与世界模型基础设施；ERNIE-Image 和 HiDream-O1 指向开源图像生成工作流；NAVA 和 SoulX-FlashTalk 指向音视频同步；UniVidX 指向可控视频编辑；Qwen3.5-LiveTranslate 指向实时语音翻译服务。',
      },
      { type: 'h2', id: 'shifts', text: '四个变化' },
      {
        type: 'list',
        items: [
          '长视频不再只拼时长，而是在数据、训练、记忆、场景一致性和评测上重建基础设施。',
          '图像生成开源模型开始更重视 prompt 套件、ComfyUI 接入、推理速度和商业许可边界。',
          '音频与视频生成正在合流：口型、表情、声音、节奏和身份一致性会成为数字人评测核心。',
          '实时翻译和视频编辑提醒我们，多模态模型最终要进入交互链路，而不只是离线生成素材。',
        ],
      },
      { type: 'h2', id: 'video', text: '长视频与世界模型' },
      {
        type: 'p',
        text: 'LongLive 2.0 和 SANA-WM 的价值不在于某一个 demo，而在于它们把“长视频能不能稳定生成”转化为基础设施问题。个人 research 后续应该固定场景、固定镜头、固定时长，记录身份保持、背景漂移、动作重复、时间一致性和显存成本。',
      },
      {
        type: 'list',
        items: [
          'LongLive 2.0 更适合进入长视频训练与生成基础设施观察线，许可和权重边界需要单独复核。',
          'SANA-WM 代表较小参数世界模型尝试，适合做 minute-level 场景一致性和 720p 输出测试。',
          '这两者都应按 P1 topic 跟踪，但不应在没有硬件与许可记录前直接产品化。',
        ],
      },
      { type: 'h2', id: 'image', text: '图像生成矩阵' },
      {
        type: 'p',
        text: 'ERNIE-Image 和 HiDream-O1 应该被放进同一套图像 prompt 矩阵里。评价重点不是“哪张图更好看”，而是中文 prompt、角色一致性、文字渲染、局部编辑、风格迁移、细节控制、ComfyUI 兼容和许可条件。',
      },
      {
        type: 'list',
        items: [
          'ERNIE-Image 的关注点在中文生态、开源权重和实际工作流接入。',
          'HiDream-O1 的关注点在推理链式思考式图像生成、MIT 许可和社区扩展。',
          '两者都应该进入 P1 图像模型固定评测，和 DreamLite、Lance、RealRestorer 做横向对照。',
        ],
      },
      { type: 'h2', id: 'audio-video', text: '音视频与实时链路' },
      {
        type: 'p',
        text: 'NAVA、SoulX-FlashTalk 和 Qwen3.5-LiveTranslate 放在一起，构成了“说话、翻译、生成视频形象”的交互链路。它们的关键指标是延迟、同步、可控性、版权和误译风险，而不是单个样例的视觉冲击力。',
      },
      {
        type: 'list',
        items: [
          'NAVA 适合观察 joint audio-video generation，但依赖基础模型和开源生态成熟度。',
          'Qwen3.5-LiveTranslate 应优先测语种、延迟、专有名词、嘈杂环境和敏感场景合规。',
          'UniVidX 作为可控编辑和 decomposition 方向进入 P3 观察，先记录论文、代码和复现成本。',
        ],
      },
      { type: 'h2', id: 'priority', text: '优先级判断' },
      {
        type: 'list',
        items: [
          'P1：ERNIE-Image / HiDream-O1，原因是图像模型可以立即进入固定 prompt 矩阵，验证成本低且结果可横向比较。',
          'P1：LongLive 2.0 / SANA-WM，原因是长视频和世界模型会影响后续视频生产基础设施，但需要先记录许可、权重和硬件边界。',
          'P2：NAVA / SoulX-FlashTalk / Qwen3.5-LiveTranslate，原因是音视频与实时链路价值明确，但延迟、同步和合规成本更高。',
          'P3：UniVidX，原因是论文与可控编辑方向有研究价值，但短期先做索引和复现成本观察。',
        ],
      },
      { type: 'h2', id: 'next', text: '下一步实验' },
      {
        type: 'list',
        items: [
          '建立固定视频场景：口播、产品展示、室内移动、多人对话、长镜头和复杂背景。',
          '建立固定图像 prompt 套件：中文文字、人物一致性、产品图、复杂空间、局部编辑和风格控制。',
          '建立音视频同步测试：中文快慢语速、停顿、情绪变化、翻译延迟、唇形同步和身份漂移。',
          '每个模型都记录许可、权重来源、依赖基础模型、部署难度、显存、耗时和失败样式。',
        ],
      },
      {
        type: 'quote',
        text: '多模态模型的评估对象正在从单张样例，变成跨图像、视频、音频和实时交互的任务矩阵。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'long video -> fixed scene suite -> consistency and memory metrics\n' +
          'image model -> prompt matrix -> text, identity and edit controls\n' +
          'audio/video -> latency and sync suite -> realtime interaction boundary',
      },
    ],
  },
  {
    slug: 'longcat-video-avatar-1-5-audio-driven-digital-human',
    title: 'LongCat-Video-Avatar-1.5：音频驱动数字人的开源生产线信号',
    subtitle:
      '美团 LongCat 把长视频基础模型、Whisper-large-v3 音频编码、多路音频和 MIT 许可组合到数字人视频生成任务里。',
    date: '2026-05-29',
    category: 'Video Avatar',
    tags: ['LongCat', 'Avatar', 'Audio To Video', 'Video Generation'],
    cover: '/assets/generated-covers/longcat-video-avatar-1-5-audio-driven-digital-human.png',
    readMins: 9,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-29-longcat-video-avatar-1-5-report.md',
    sourceUrl: 'https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5',
    excerpt:
      'LongCat-Video-Avatar-1.5 的价值在于它不是泛化文生视频叙事，而是围绕唇形同步、身份一致性、多人对话和长视频稳定性这些数字人生产指标展开。',
    content: [
      {
        type: 'p',
        text: 'LongCat-Video-Avatar-1.5 是美团 LongCat 团队发布的音频驱动数字人视频生成模型，构建在 LongCat-Video 基础视频模型之上。它面向 Audio-Text-to-Video、Audio-Text-Image-to-Video 和 Video Continuation，并支持单路音频与多路音频输入。',
      },
      { type: 'h2', id: 'why-it-matters', text: '为什么是 P1' },
      {
        type: 'p',
        text: '它比通用文生视频模型更接近商业视频生产里的可衡量任务。数字人场景关心的不只是单帧画质，而是唇形同步、声音与表情协调、身份一致性、动作自然度、长视频稳定性、多人轮流讲话和推理成本。LongCat-Video-Avatar-1.5 正是围绕这些指标组织模型能力和评测叙事。',
      },
      {
        type: 'list',
        items: [
          'MIT 许可、公开代码、Hugging Face 权重和 ModelScope 资源降低实验门槛。',
          '基础项目 LongCat-Video 已有较强 GitHub 关注度，说明社区复现和二次开发需求存在。',
          '支持 480P/720P、单人/多人、单路/多路音频、视频续写，覆盖知识教育、电商口播、企业宣传和虚拟 IP 等实际场景。',
          'Whisper-large-v3 音频编码器和 DMD2 step distillation 指向更可控的音画同步与推理效率。',
        ],
      },
      { type: 'h2', id: 'runtime-cost', text: '工程成本' },
      {
        type: 'p',
        text: '报告显示实际部署并不轻：需要 LongCat-Video 与 LongCat-Video-Avatar-1.5 两套权重，推荐 Python 3.10、PyTorch 2.6.0 + CUDA 12.4、FlashAttention、ffmpeg、librosa，并通过 torchrun 双卡运行。INT8 量化路径有助于降低显存，但仍需要记录显存、速度和质量折损。',
      },
      { type: 'h2', id: 'risk', text: '合规风险' },
      {
        type: 'p',
        text: '音频驱动数字人天然涉及肖像权、声音授权、深度伪造、诈骗、平台审核和商业使用合规。MIT 许可只解决代码与模型使用边界的一部分，不能替代素材授权、个人信息保护和内容安全治理。',
      },
      { type: 'h2', id: 'experiment-plan', text: '实验计划' },
      {
        type: 'list',
        items: [
          '单人 AT2V 中文：测试中文口型、语速和表情协调。',
          '单人 ATI2V 英文：测试输入图身份保持和英文音频同步。',
          '多人 add/para 模式：测试轮流发言、静音间隔、双音频等长合成和互动稳定性。',
          '视频续写 5 段：测试长视频身份一致性、背景漂移和动作重复。',
          'INT8 vs base、480P vs 720P：测试显存、速度、画质和分辨率成本。',
          '风险样例集：测试肖像仿冒、敏感内容、水印和拒绝策略缺口。',
        ],
      },
      {
        type: 'quote',
        text: '对数字人模型的判断，应优先看任务稳定性和合规边界，而不是单个 demo 的视觉冲击力。',
      },
    ],
  },
  {
    slug: 'wechat-ai-tools-briefing-deployable-toolchains',
    title: 'AI 工具从模型展示走向可部署工具链：WanGP、LocateAnything、Aholo Viewer',
    subtitle: '把 3 篇微信新信号整理成一篇简报：低显存视频、视觉定位、浏览器 3DGS。',
    date: '2026-05-29',
    category: 'AI Toolchain Briefing',
    tags: ['WanGP', 'LocateAnything', 'Aholo Viewer', '3DGS', 'Video Generation', 'Local First'],
    cover: '/assets/generated-covers/wechat-ai-tools-briefing-deployable-toolchains.png',
    readMins: 8,
    section: 'Research',
    priority: 'P1',
    sourcePath: 'research/10_outputs/briefings/2026-05-29-wechat-ai-tools-briefing.md',
    excerpt:
      'WanGP、LocateAnything 和 Aholo Viewer 分别把低显存视频生成、视觉语言定位和浏览器 3DGS 浏览推进到可部署工具链的阶段，适合纳入个人 AI 应用工具链地图。',
    content: [
      {
        type: 'p',
        text: '这份简报把 3 篇新的微信材料合并成一条研究判断：AI 工具正在从“模型能力展示”转向“可部署、可交互、可生产”的工程阶段。WanGP 解决低显存本地视频生成，LocateAnything 解决视觉语言定位与 GUI grounding，Aholo Viewer 解决超大 3DGS 场景在浏览器中的流式浏览。它们分别落在视频生产、视觉感知和空间内容分发三条线。',
      },
      { type: 'h2', id: 'signals', text: '三条新信号' },
      {
        type: 'list',
        items: [
          'WanGP / Wan2GP：把视频生成、图像、音频和 TTS 组织成低显存本地工作台，目标是让普通显卡用户也能跑 AI 视频。',
          'LocateAnything：把开放词表检测、目标定位和 GUI grounding 统一到视觉语言模型里，并用并行框解码降低定位速度瓶颈。',
          'Aholo Viewer：把超大 3DGS 场景浏览带到浏览器端，核心是 Chunk-based LOD Tree、流式加载和多端访问。',
        ],
      },
      { type: 'h2', id: 'judgment', text: '判断依据' },
      {
        type: 'p',
        text: '这组资料的共同点，不是模型参数量，而是“能不能被真正装进工作流”。WanGP 讨论的是显存和队列，LocateAnything 讨论的是吞吐和场景定位，Aholo Viewer 讨论的是 Web 端承载和 3D 内容分发。它们都在把研究对象拉回到可部署边界，而不是停留在 demo 叙事。',
      },
      { type: 'h2', id: 'priority', text: '优先级' },
      {
        type: 'list',
        items: [
          'P1：WanGP / Wan2GP，低显存视频生产需求强，最值得先做本地硬件实验。',
          'P1：LocateAnything，视觉定位、巡检和 GUI grounding 对 Agent 和行业场景都直接有价值。',
          'P2：Aholo Viewer，空间智能和浏览器 3DGS 方向重要，但生态还早。',
        ],
      },
      { type: 'h2', id: 'follow-up', text: '下一步实验' },
      {
        type: 'list',
        items: [
          '建立 WanGP 显存矩阵，先看 6GB、8GB、12GB 和 24GB 下的可用模型和耗时。',
          '给 LocateAnything 准备行业巡检与 GUI 元素测试集，验证中文场景和密集目标定位。',
          '跟踪 Aholo Viewer 的 WebGPU、移动端和大规模 3DGS 兼容性。',
          '把这三条线并入一张 AI 多模态工具链地图，和语音、视频、数字人、Agent 工具一起观察。',
        ],
      },
      {
        type: 'quote',
        text: '现在值得追的，不是单个模型榜单，而是能否形成稳定、可部署、可维护的工具链。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'video workstation -> grounding benchmark -> browser 3D viewer\n' +
          '        |                  |                     |\n' +
          '        +------ toolchain map and deployment loop ------+',
      },
    ],
  },
  {
    slug: 'personal-research-system-operating-model',
    title: '个人 Research 系统：从捕捉、证据到可发布报告',
    subtitle:
      '把 research/ 的目录结构、质量等级、标签体系和 PDF 成对规则整理成长期可维护的知识生产流程。',
    date: '2026-05-28',
    category: 'Research System',
    tags: ['Research', 'Knowledge System', 'Workflow', 'PDF Export'],
    cover: '/assets/generated-covers/personal-research-system-operating-model.png',
    readMins: 8,
    section: 'Research',
    priority: 'P0',
    sourcePath: 'research/00_system/operating-model.md',
    excerpt:
      '这个 research/ 不是文件夹堆叠，而是一套从 raw capture 到 source card、domain map、market report、decision record 的研究流水线。',
    content: [
      {
        type: 'p',
        text: '这次更新后，research/ 已经具备清晰的系统层。它不只是存放开源项目报告的目录，而是一套面向 AI、Web3、互联网产品和交叉主题的个人研究操作系统：先捕捉，再入库，再沉淀领域结构，最后产出行研、项目实验和决策记录。',
      },
      { type: 'h2', id: 'layering', text: '内容分层' },
      {
        type: 'list',
        items: [
          'Capture：01_inbox/ 和 02_daily/ 承接临时灵感、链接、截图、摘录。',
          'Source：05_sources/ 保存可追溯来源，包括文章、论文、视频、播客、数据集、官方文档和社交信号。',
          'Domain：03_domains/ 沉淀长期知识结构，覆盖 AI、Web3、互联网产品和 cross-domain 主题。',
          'Research：04_market_research/ 输出市场报告、公司档案、产品拆解、趋势简报、竞争地图和 watchlist。',
          'Action：06_projects/ 与 07_decisions/ 把研究转成实验、构建、自动化和决策记录。',
        ],
      },
      { type: 'h2', id: 'quality-levels', text: '质量等级' },
      {
        type: 'p',
        text: '系统里最重要的约束是质量等级。L0 是 raw capture，L1 是整理过的 note，L2 是有结构和判断的 brief，L3 是可复用或可分享的 report，L4 是长期维护的系统文档。这个分层能避免把临时想法、证据材料和正式判断混在一起。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'L0 Raw -> L1 Note -> L2 Brief -> L3 Report\n' +
          '                      -> L4 System docs / indexes / standards',
      },
      { type: 'h2', id: 'evidence', text: '证据与判断分离' },
      {
        type: 'p',
        text: 'research-standards.md 要求每篇研究文档区分 Facts、Signals、Interpretation 和 Judgment。重要判断至少需要一个高可信来源，或两个互相独立的中可信来源，或一个可复现数据点加清晰推理链。这个规则能降低把官方叙事、社区热度和真实需求混为一谈的风险。',
      },
      { type: 'h2', id: 'workflow', text: '默认工作流' },
      {
        type: 'list',
        items: [
          '快速捕捉：看到新模型、新协议、新产品或新玩法，先进入 01_inbox/ 并记录来源、时间、链接、初步判断。',
          '来源入库：使用 source-card 模板，把事实、观点、数据和引用关系整理进 05_sources/。',
          '行研产出：明确研究问题，建立对象清单和资料清单，分离事实、推论、判断，再输出到 04_market_research/。',
          '周度整理：清理 inbox，更新领域 README，选出本周最值得关注的 3 到 5 条变化。',
          '月度复盘：更新赛道地图、过期判断、高价值资料源和主题判断。',
        ],
      },
      { type: 'h2', id: 'format-parity', text: 'Markdown 与 PDF 成对' },
      {
        type: 'p',
        text: 'format-parity.md 把发布纪律写成硬规则：所有面向阅读、研究、归档和交付的 Markdown 文档，都必须同时存在同名 PDF。新增、修改、移动或重命名 Markdown 后，都应运行导出工具，保证研究材料可阅读、可归档、可分享。',
      },
      {
        type: 'code',
        language: 'powershell',
        text: 'node research/00_system/tools/export-md-to-pdf.mjs',
      },
      {
        type: 'quote',
        text: '一个可持续的个人研究系统，关键不是收集更多材料，而是让材料能被复查、复用和转化为下一步行动。',
      },
    ],
  },
  {
    slug: 'qwen3-6-27b-agentic-coding-baseline',
    title: 'Qwen3.6-27B：长上下文 Agentic Coding 的开源基线',
    subtitle:
      '27B dense、Apache-2.0、262K 到 1M token 上下文，让它成为私有 AI 工程栈的优先实验对象。',
    date: '2026-05-28',
    category: 'Model Research',
    tags: ['Qwen', 'Agentic Coding', 'Long Context', 'Open Weight'],
    cover: '/assets/generated-covers/qwen3-6-27b-agentic-coding-baseline.png',
    readMins: 8,
    section: 'Research',
    priority: 'P0',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-qwen3-6-27b-report.md',
    sourceUrl: 'https://huggingface.co/Qwen/Qwen3.6-27B',
    excerpt:
      'Qwen3.6-27B 的价值不在单项跑分，而在长上下文、工具调用、多模态输入与开源商用许可组合成了可实验的 Coding Agent 基线。',
    content: [
      {
        type: 'p',
        text: 'Qwen3.6-27B 是这批研究里最应该先进入实验矩阵的模型。它是 27B dense open-weight model，许可为 Apache-2.0，支持 image-text-to-text，报告记录到 Hugging Face 下载量和关注度已经形成明确社区信号。',
      },
      { type: 'h2', id: 'why-it-matters', text: '为什么它是 P0' },
      {
        type: 'p',
        text: '个人 AI 工程栈真正需要的是能读仓库、看 UI、理解长上下文并稳定调用工具的基座模型。Qwen3.6-27B 提供 262,144 token 上下文，并可扩展到约 1,010,000 token；这使它适合做 repo-level reasoning、长文档理解、浏览器 Agent 和本地知识库任务。',
      },
      {
        type: 'list',
        items: [
          '长上下文能力可以减少代码仓库切片和摘要损耗。',
          'Apache-2.0 降低二次开发、私有部署和产品实验的许可摩擦。',
          '多模态输入让它可以进入前端截图、设计稿、页面状态分析等流程。',
          'SGLang、vLLM、KTransformers 等推理框架支持降低工程接入成本。',
        ],
      },
      { type: 'h2', id: 'engineering-risk', text: '工程风险' },
      {
        type: 'p',
        text: '官方 262K quickstart 建议 8 GPU tensor parallel，完整部署资源并不轻。长上下文同时带来 KV cache、延迟和成本压力。工具调用稳定性、多模态可靠性和真实代码任务表现都不能只看模型卡，需要用本地任务验证。',
      },
      { type: 'h2', id: 'experiment', text: '实验设计' },
      {
        type: 'list',
        items: [
          '用相同仓库任务比较 Qwen3.6-27B、较小 Qwen、本地 8B/14B/32B 与闭源模型。',
          '任务覆盖 bug 修复、跨文件重构、UI 截图诊断、长文档问答和工具调用。',
          '记录上下文长度、显存、首 token 延迟、总耗时、失败恢复和人工接管次数。',
        ],
      },
    ],
  },
  {
    slug: 'voicebox-local-voice-agent-interface',
    title: 'Voicebox：本地 AI 语音工作室正在变成 Agent 的 I/O 层',
    subtitle: 'Tauri + FastAPI + 多 TTS 引擎 + MCP，把语音从内容生产工具推进到可编程 Agent 接口。',
    date: '2026-05-28',
    category: 'Agent Interface',
    tags: ['Voicebox', 'Voice AI', 'MCP', 'Local First'],
    cover: '/assets/generated-covers/voicebox-local-voice-agent-interface.png',
    readMins: 8,
    section: 'Research',
    priority: 'P0',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-voicebox-report.md',
    sourceUrl: 'https://github.com/jamiepine/voicebox',
    excerpt:
      'Voicebox 不是单纯 TTS 前端。它的 MCP server、REST API、STT dictation 和本地运行路径，让语音可以进入 Agent 工作流。',
    content: [
      {
        type: 'p',
        text: 'Voicebox 是一个开源 AI voice studio，技术栈包括 Tauri/Rust、React、Tailwind、FastAPI、SQLite、MLX/PyTorch/CUDA/ROCm/XPU/CPU，并提供 MCP server。报告记录到它已经有较高 star、fork 和 issue 信号，说明它不只是实验仓库，而是正在产品化的本地语音工具。',
      },
      { type: 'h2', id: 'positioning', text: '产品定位' },
      {
        type: 'list',
        items: [
          'TTS 与 voice cloning 解决内容生产和长文本朗读。',
          '全局热键 dictation 和 STT 解决输入效率。',
          'REST API 与 MCP tools 让 Claude Code、Cursor、Cline、VS Code MCP 可以调用语音能力。',
          '多 TTS engine 结构降低单一模型路线失败的风险。',
        ],
      },
      { type: 'h2', id: 'why-it-matters', text: '为什么值得优先跟踪' },
      {
        type: 'p',
        text: 'Agent 的下一层入口不只是 chat box，而是语音、屏幕、浏览器和文件系统。Voicebox 把 speak 与 transcribe 暴露成可调用工具，意味着本地 Agent 可以把语音当成输入输出通道，而不是把语音功能封死在一个桌面应用里。',
      },
      { type: 'h2', id: 'risk', text: '风险边界' },
      {
        type: 'p',
        text: '多引擎依赖带来安装和运行时复杂度，413 个 issues 说明维护压力真实存在。Voice cloning 还天然涉及冒用、授权、合规和平台审核风险。Linux build 尚不完整，本地硬件差异也会影响质量和延迟。',
      },
      {
        type: 'quote',
        text: '短期实验重点不是音质炫技，而是验证语音能否稳定成为 Coding Agent 和浏览器 Agent 的可编程接口。',
      },
    ],
  },
  {
    slug: 'smallcode-small-model-coding-agent',
    title: 'SmallCode：为小模型重写 Coding Agent 的脚手架',
    subtitle:
      '当 8B 到 35B 本地模型不擅长稳定工具调用时，Agent 框架本身就要补上预算、解析和任务拆解能力。',
    date: '2026-05-28',
    category: 'Coding Agent',
    tags: ['SmallCode', 'Coding Agent', 'Local LLM', 'MCP'],
    cover: '/assets/generated-covers/smallcode-small-model-coding-agent.png',
    readMins: 7,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-smallcode-report.md',
    sourceUrl: 'https://github.com/Doorman11991/smallcode',
    excerpt:
      'SmallCode 的关键观点是：不要假设小模型拥有大模型级别的规划和工具调用能力，Agent scaffold 必须围绕小模型限制设计。',
    content: [
      {
        type: 'p',
        text: 'SmallCode 是一个面向 8B 到 35B local LLM 的 AI coding agent。它的研究价值在于目标非常清楚：小模型在上下文、工具调用、规划和文件编辑上不稳定，所以系统要通过预算管理、摘要、容错解析、TODO 文件分解和 search-and-replace patch 来降低失败率。',
      },
      { type: 'h2', id: 'architecture', text: '架构信号' },
      {
        type: 'list',
        items: [
          'Node 18+、npx/binary、OpenAI-compatible endpoints，便于接 LM Studio、Ollama 和本地服务。',
          '本地默认 + 云端 escalation，适合把成本和隐私控制放在前面，把困难任务上交更强模型。',
          'CLI/TUI、MCP bridge、plugin、session persistence 和可选 SQLite FTS5 memory，说明它目标不是单次 demo。',
        ],
      },
      { type: 'h2', id: 'market', text: '市场含义' },
      {
        type: 'p',
        text: '本地 Coding Agent 的需求来自隐私、成本、离线和消费级硬件。只要小模型继续存在能力上限，围绕它们设计的 Agent scaffold 就有独立价值。SmallCode 的方向不是和闭源旗舰模型硬拼，而是把小模型能稳定完成的任务边界做清楚。',
      },
      { type: 'h2', id: 'experiment', text: '实验方式' },
      {
        type: 'list',
        items: [
          '用 Qwen3.6-27B API、Qwen 8B/14B/32B local、Ollama 和 LM Studio 分别跑同一组代码任务。',
          '和 Aider、OpenCode、Cline 对照，记录 diff 正确率、命令安全性、恢复能力和上下文压缩质量。',
          '重点复核官方成功率主张，避免把早期项目的 README 叙述直接当成事实。',
        ],
      },
    ],
  },
  {
    slug: 'mesh-llm-private-distributed-inference',
    title: 'Mesh-LLM：把多台本地机器组织成私有推理网',
    subtitle:
      'OpenAI-compatible API、public/private mesh、stage split 与 Mixture-of-Agents gateway，让它成为本地算力网络的 P1 观察项。',
    date: '2026-05-28',
    category: 'AI Infra',
    tags: ['Mesh-LLM', 'Distributed Inference', 'OpenAI API', 'Local First'],
    cover: '/assets/generated-covers/mesh-llm-private-distributed-inference.png',
    readMins: 7,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-mesh-llm-report.md',
    sourceUrl: 'https://github.com/Mesh-LLM/mesh-llm',
    excerpt:
      'Mesh-LLM 的价值不是“免费算力”叙事，而是私有团队把多台工作站聚合为一个 OpenAI-compatible 推理端点的可能性。',
    content: [
      {
        type: 'p',
        text: 'Mesh-LLM 是 Rust 写的 distributed LLM inference network。它提供本地 OpenAI-compatible API，默认端口为 localhost:9337/v1，并提供 web console。它支持 public/private mesh、Nostr public discovery、Skippy stage split，以及实验性的 model: mesh Mixture-of-Agents gateway。',
      },
      { type: 'h2', id: 'infra-value', text: '基础设施价值' },
      {
        type: 'p',
        text: '很多个人或小团队并不是没有 GPU，而是 GPU 分散在不同机器上。Mesh-LLM 尝试把这些机器组织成统一模型端点。对本地 AI 工具链而言，这比“单机能不能跑最大模型”更接近真实工程问题。',
      },
      {
        type: 'list',
        items: [
          'OpenAI-compatible API 让 Goose、OpenCode、Claude Code、Pi 等工具更容易接入。',
          'private mesh 适合团队内网实验，降低 public mesh 的数据泄露和信任风险。',
          'stage split 可以探索单机放不下的大模型如何跨机器运行。',
        ],
      },
      { type: 'h2', id: 'risks', text: '主要风险' },
      {
        type: 'p',
        text: '分布式推理的失败面很大：网络延迟、节点质量、任务分配、恢复机制、数据泄露、资源公平和滥用治理都会影响可用性。public mesh 尤其不能默认可信。Mixture-of-Agents gateway 目前也应视为实验能力。',
      },
      { type: 'h2', id: 'next', text: '下一步' },
      {
        type: 'p',
        text: '更合适的验证方式是先做 private mesh：固定两到三台机器、固定模型、固定任务集，记录延迟、吞吐、失败恢复、日志透明度和数据边界。只有这些指标稳定后，才讨论更开放的算力网络。',
      },
    ],
  },
  {
    slug: 'lance-unified-multimodal-research',
    title: 'Lance：3B active 统一多模态模型的研究信号',
    subtitle:
      'ByteDance 把图像、视频、理解、生成和编辑放入一个 native unified multimodal model，方向值得跟踪，生产使用仍需谨慎。',
    date: '2026-05-28',
    category: 'Multimodal Research',
    tags: ['Lance', 'Multimodal', 'Video', 'Image Generation'],
    cover: '/assets/generated-covers/lance-unified-multimodal-research.png',
    readMins: 7,
    section: 'Research',
    priority: 'P1',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-lance-report.md',
    sourceUrl: 'https://github.com/bytedance/Lance',
    excerpt:
      'Lance 的研究价值在于统一多模态小模型路线：同一框架覆盖图像/视频理解、生成和编辑，但质量与推理成本还需要真实任务评估。',
    content: [
      {
        type: 'p',
        text: 'Lance 是 ByteDance 发布的 3B active-parameter native unified multimodal model，支持 image understanding、video understanding、image generation、video generation、image editing 和 video editing。报告记录到它有项目页、论文、Hugging Face 模型、Space 和 Gradio 支持。',
      },
      { type: 'h2', id: 'technical-line', text: '技术路线' },
      {
        type: 'list',
        items: [
          'Unified context modeling 与 decoupled capability pathways 是论文里的两条核心原则。',
          'Dual-stream mixture-of-experts、shared interleaved multimodal sequences、modality-aware RoPE 与 staged multi-task training 指向统一任务建模。',
          '发布 checkpoint 的训练使用 up to 128 A100 GPUs，说明社区复现成本并不低。',
        ],
      },
      { type: 'h2', id: 'market-context', text: '市场语境' },
      {
        type: 'p',
        text: '图像和视频生成正在从单任务模型走向统一多模态系统。Agent 需要同一个模型读取视觉输入、理解状态、生成视觉结果并完成编辑。Lance 可以作为这条路线的研究样本，但不应该直接被当成生产视觉生成默认基座。',
      },
      { type: 'h2', id: 'watch', text: '观察点' },
      {
        type: 'list',
        items: [
          'fine-tuning code 与 image-to-video generation code 是否按 roadmap 发布。',
          '社区复现的显存、速度、输出质量和 Gradio/HF Space 可用性。',
          '是否出现量化、ComfyUI、Diffusers 或更稳定的推理集成。',
        ],
      },
    ],
  },
  {
    slug: 'dreamlite-on-device-image-generation',
    title: 'DreamLite：端侧统一图像生成与编辑的许可分水岭',
    subtitle:
      '0.39B、4-step inference、统一生成编辑模型很有方向感，但权重可用性、非商业许可和端侧实测决定它能走多远。',
    date: '2026-05-28',
    category: 'Edge AI',
    tags: ['DreamLite', 'On Device AI', 'Image Editing', 'Diffusion'],
    cover: '/assets/generated-covers/dreamlite-on-device-image-generation.png',
    readMins: 7,
    section: 'Research',
    priority: 'P2',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-dreamlite-report.md',
    sourceUrl: 'https://github.com/ByteVisionLab/DreamLite',
    excerpt:
      'DreamLite 代表端侧生成式 AI 的前沿方向：同一 0.39B 扩散模型做 text-to-image 和 text-guided image editing。',
    content: [
      {
        type: 'p',
        text: 'DreamLite 是一个 0.39B 参数的端侧统一扩散模型，目标是在同一网络里同时支持 text-to-image generation 和 text-guided image editing。它围绕 mobile U-Net、In-Context Spatial Concatenation 和 progressive step distillation 设计，主打 4-step inference。',
      },
      { type: 'h2', id: 'product-value', text: '产品价值' },
      {
        type: 'list',
        items: [
          '隐私：用户图片不必上传云端。',
          '延迟：图像编辑反馈更接近交互式。',
          '成本：减少云推理开销。',
          '入口：相册、相机、短视频、社交头像和商品图工具都可能内置端侧编辑。',
        ],
      },
      { type: 'h2', id: 'constraints', text: '限制条件' },
      {
        type: 'p',
        text: '报告里最关键的限制不是模型规模，而是权重许可和复现状态。代码为 Apache-2.0，但权重许可为 CC BY-NC 4.0；同时 Hugging Face 模型 API 抓取返回 401，需要后续人工确认权重访问策略。端侧性能也强依赖设备、量化、runtime、VAE 和分辨率。',
      },
      { type: 'h2', id: 'judgment', text: '判断' },
      {
        type: 'p',
        text: 'DreamLite 当前适合作为 P2 观察对象。如果权重开放稳定、端侧性能可复现、移动端 demo 成熟，它可以进入端侧 AI 应用专题；如果权重继续受限，它更适合作为论文和架构材料。',
      },
    ],
  },
  {
    slug: 'sulphur-2-gguf-local-video-workflow',
    title: 'Sulphur-2-Base-GGUF：本地视频生成的 ComfyUI 量化路径',
    subtitle:
      '多档 GGUF 量化降低本地视频生成门槛，但 LTX-2 许可、内容安全和工作流复现必须先被记录清楚。',
    date: '2026-05-28',
    category: 'Video AI',
    tags: ['Sulphur', 'GGUF', 'ComfyUI', 'Video Generation'],
    cover: '/assets/generated-covers/sulphur-2-gguf-local-video-workflow.png',
    readMins: 8,
    section: 'Research',
    priority: 'P2',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-sulphur-2-base-gguf-report.md',
    sourceUrl: 'https://huggingface.co/vantagewithai/Sulphur-2-Base-GGUF',
    excerpt:
      '这个仓库的重点是把 Sulphur 2 量化成 GGUF 并接入 ComfyUI，适合作为本地视频生成实验卡，而不是商业基座。',
    content: [
      {
        type: 'p',
        text: 'vantagewithai/Sulphur-2-Base-GGUF 是 Sulphur 2 的 GGUF 量化模型仓库，面向 ComfyUI 用户。文件覆盖 Q3、Q4、Q5、Q6、Q8 多个量化档位，方便在显存、速度和画质之间做取舍。',
      },
      { type: 'h2', id: 'why-it-matters', text: '为什么值得记录' },
      {
        type: 'p',
        text: '本地视频生成正在成为创作者和 AI 工程实验的重要方向。ComfyUI 已经是图像/视频生成工作台，GGUF 量化则降低部署门槛。这个项目处在开源视频模型、ComfyUI workflow 和本地量化推理的交汇点。',
      },
      { type: 'h2', id: 'risk', text: '许可与安全风险' },
      {
        type: 'list',
        items: [
          '模型卡 license 指向 LTX-2 Community License，商业使用和衍生分发需要严格复核。',
          '原始模型描述包含 uncensored video generation，内容安全、肖像、成人内容和平台审核风险较高。',
          '公开模型卡缺少显存、速度、采样参数、训练数据和安全策略等关键工程信息。',
        ],
      },
      { type: 'h2', id: 'experiment-card', text: '实验卡' },
      {
        type: 'code',
        language: 'txt',
        text:
          'prompts: 5 text-to-video + 5 image-to-video + safety set\n' +
          'quant: Q4_K_M / Q5_K_M / Q6_K / Q8_0\n' +
          'metrics: VRAM, latency, failure rate, quality, identity consistency, safety behavior',
      },
    ],
  },
  {
    slug: 'idmvton-cn-virtual-try-on-baseline',
    title: 'IDMVTON_CN：中文虚拟试衣工具的历史基线',
    subtitle:
      '它的长期价值不在继续维护，而在记录 2024-2025 年中文 AI 换装工具的传播路径与应用形态。',
    date: '2026-05-28',
    category: 'Product Research',
    tags: ['VTON', 'ComfyUI', 'Chinese Localization', 'Product Baseline'],
    cover: '/assets/generated-covers/idmvton-cn-virtual-try-on-baseline.png',
    readMins: 6,
    section: 'Research',
    priority: 'P3',
    sourcePath:
      'research/04_market_research/reports/open_source_projects/2026-05-28-idmvton-cn-report.md',
    sourceUrl: 'https://github.com/MoJIeAIGC/IDMVTON_CN',
    excerpt:
      'IDMVTON_CN 是 IDM-VTON 的中文本地化和 Windows 一键安装封装，适合作为虚拟试衣专题里的早期对照组。',
    content: [
      {
        type: 'p',
        text: 'IDMVTON_CN 的定位不是基础模型创新，而是把 IDM-VTON 包装成更适合中文用户上手的 Windows 一键安装版。它提供汉化界面、内置模特和服装优化、安装/运行脚本、成衣类型、随机种子和生成数量配置。',
      },
      { type: 'h2', id: 'useful-for', text: '它现在还有什么用' },
      {
        type: 'list',
        items: [
          '作为中文 AI 换衣工具在 2024-2025 年的典型形态样本。',
          '作为虚拟试衣专题的早期 baseline，用来对比新一代商品图、视频换装和多模态编辑模型。',
          '作为本地化传播路径样本：论文模型、HF 权重、Gradio 界面、Windows 脚本、B 站教程共同降低门槛。',
        ],
      },
      { type: 'h2', id: 'why-low-priority', text: '为什么是 P3' },
      {
        type: 'p',
        text: 'README 已明确写明项目过时、将不再维护。仓库无正式 release，许可为 CC BY-NC-SA 4.0，商业使用空间受限。独立 VTON 模型也正在被更完整的商品图生成、人体一致性、视频生成和局部编辑工作流吸收。',
      },
      { type: 'h2', id: 'watch', text: '低频观察' },
      {
        type: 'p',
        text: '后续只需要低频记录是否出现维护分支、上游 IDM-VTON 替代项目、ComfyUI 相关节点变化，以及中文创作者对 AI 换衣工具的新迁移方向。',
      },
    ],
  },
];
