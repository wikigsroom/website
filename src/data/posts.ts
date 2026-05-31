import { researchPosts } from './researchPosts';

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'code'; language: string; text: string };

export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  category: string;
  tags: string[];
  cover: string;
  readMins: number;
  pinned?: boolean;
  section?: 'Blog' | 'Research';
  priority?: 'P0' | 'P1' | 'P2' | 'P3';
  sourcePath?: string;
  sourceUrl?: string;
  excerpt: string;
  content: ContentBlock[];
};

const blogPosts: Post[] = [
  {
    slug: 'agent-runtime-notes',
    title: 'Agent Runtime 的最小可靠闭环',
    subtitle: '从工具调用、记忆、回放和评测四个层面，整理一个可长期维护的 Agent 运行时。',
    date: '2026-05-20',
    category: 'AI Agent',
    tags: ['Agent', 'Runtime', 'Eval', 'Workflow'],
    cover: '/assets/generated-covers/agent-runtime-notes.png',
    readMins: 8,
    pinned: true,
    excerpt:
      'Agent 系统不是把模型接上工具就结束。可靠闭环需要可观测的状态、可回放的执行、可比较的评测，以及清晰的人类接管点。',
    content: [
      { type: 'p', text: '一个能上线的 Agent Runtime，核心不是复杂，而是每次行动都能解释、复现和修正。' },
      { type: 'h2', id: 'contract', text: '先定义运行契约' },
      {
        type: 'p',
        text: '运行契约需要回答四件事：模型能看见什么上下文、能调用哪些工具、工具结果如何进入下一轮推理、失败时谁接管。',
      },
      {
        type: 'list',
        items: [
          '上下文必须分层：任务目标、短期状态、长期记忆和外部证据分开管理。',
          '工具调用必须可审计：输入、输出、耗时、错误和重试次数都要留下记录。',
          '每个任务都要有停止条件：完成、放弃、等待人工、等待外部事件。',
        ],
      },
      { type: 'h2', id: 'memory', text: '记忆不是把所有内容塞回 Prompt' },
      {
        type: 'p',
        text: '长期记忆应该是可检索的事实、偏好和决策记录。短期上下文才是当前任务的执行状态。把两者混在一起，会让系统难以调试，也会放大幻觉。',
      },
      { type: 'quote', text: '可靠 Agent 的第一原则：少给模型隐式权力，多给系统显式边界。' },
      { type: 'h2', id: 'eval', text: '评测要跟任务形态对齐' },
      {
        type: 'p',
        text: '代码 Agent 看 diff、测试和日志；研究 Agent 看引用质量和结论可追溯性；运营 Agent 看动作是否符合规则。不要用一个泛化分数覆盖所有场景。',
      },
      {
        type: 'code',
        language: 'txt',
        text:
          'task -> plan -> tool calls -> state update -> checkpoint -> eval -> report\n' +
          '             ^                                      |\n' +
          '             |-------------- replay ----------------|',
      },
      { type: 'h2', id: 'handoff', text: '保留人工接管点' },
      {
        type: 'p',
        text: '涉及资金、账号、发布和不可逆操作时，Agent 应该停下来提交计划、风险和候选动作。系统设计的目标不是完全自动，而是让自动化在边界内稳定运行。',
      },
    ],
  },
  {
    slug: 'mpc-wallet-design',
    title: 'MPC 钱包产品的三层设计',
    subtitle: '把密钥安全、恢复路径和日常体验拆开，才能避免产品被安全流程拖垮。',
    date: '2026-05-16',
    category: 'Web3 Infra',
    tags: ['MPC', 'Wallet', 'Security', 'UX'],
    cover: '/assets/generated-covers/mpc-wallet-design.png',
    readMins: 7,
    excerpt:
      'MPC 钱包不是单纯的签名技术展示。产品需要把安全边界、恢复体验和交易确认拆成三个可验证层。',
    content: [
      { type: 'p', text: 'MPC 钱包的难点在于，用户感受到的是登录和转账，工程侧处理的是密钥份额、策略和恢复。' },
      { type: 'h2', id: 'security-layer', text: '安全层：不要把策略写死在界面里' },
      {
        type: 'p',
        text: '策略应该由服务端、设备端和合约端共同表达。前端只负责解释风险和收集确认，不应该成为安全判断的唯一来源。',
      },
      { type: 'h2', id: 'recovery-layer', text: '恢复层：比注册更重要' },
      {
        type: 'list',
        items: [
          '恢复流程要在用户还记得账户时提前演练。',
          '设备丢失、手机号失效、社交恢复失败，需要有不同路径。',
          '恢复完成后要触发风险窗口，而不是立刻开放全部权限。',
        ],
      },
      { type: 'h2', id: 'experience-layer', text: '体验层：降低签名前的认知成本' },
      {
        type: 'p',
        text: '用户不需要理解曲线、份额和阈值，但必须知道这次签名会改变什么。交易摘要、授权范围和可撤销性，比技术术语更重要。',
      },
    ],
  },
  {
    slug: 'nostr-product-loop',
    title: 'Nostr 客户端的产品循环',
    subtitle: '一个轻客户端要留住用户，需要把身份、内容、关系和同步状态做成可感知的循环。',
    date: '2026-05-11',
    category: 'Product',
    tags: ['Nostr', 'Social', 'Client', 'Community'],
    cover: '/assets/generated-covers/nostr-product-loop.png',
    readMins: 6,
    excerpt:
      '去中心化社交客户端不能只展示协议能力。用户真正需要的是稳定的身份感、可理解的关系流和可恢复的同步状态。',
    content: [
      { type: 'p', text: 'Nostr 的协议简洁，但产品复杂度会转移到客户端：密钥、Relay、内容发现和关系网络都需要被解释。' },
      { type: 'h2', id: 'identity', text: '身份先于内容' },
      {
        type: 'p',
        text: 'NSEC、NPUB、profile event 和本地存储必须被包装成清晰的身份状态。用户要知道自己现在用的是哪个身份，以及是否已经备份。',
      },
      { type: 'h2', id: 'relay', text: 'Relay 是产品状态，不只是配置项' },
      {
        type: 'p',
        text: '连接失败、延迟、写入拒绝和读取不完整都应该体现在 UI 中。否则用户会把协议同步问题理解成产品坏了。',
      },
      { type: 'quote', text: '去中心化产品不能把复杂度藏起来，只能把复杂度翻译成人能理解的状态。' },
      { type: 'h2', id: 'loop', text: '形成轻量循环' },
      {
        type: 'list',
        items: ['身份可见：当前身份、备份状态、权限边界。', '关系可见：关注、回复、收藏和引用。', '同步可见：Relay 健康、最后同步时间、失败重试。'],
      },
    ],
  },
  {
    slug: 'vite-static-deploy',
    title: 'Vite 静态站的发布清单',
    subtitle: '把一个视觉站点发布到静态托管前，应该检查路由、资源、SEO、缓存和回退策略。',
    date: '2026-05-06',
    category: 'Dev Notes',
    tags: ['Vite', 'Deploy', 'Frontend', 'Checklist'],
    cover: '/assets/generated-covers/vite-static-deploy.png',
    readMins: 5,
    excerpt:
      '静态站发布看起来简单，但资源路径、SPA 路由回退、图片尺寸和缓存头很容易在部署后暴露问题。',
    content: [
      { type: 'p', text: 'Vite 项目本地能跑，不代表部署就完整。静态托管最常见的问题来自资源路径和路由回退。' },
      { type: 'h2', id: 'routing', text: '先确认路由模式' },
      {
        type: 'p',
        text: '如果是 BrowserRouter，刷新子路径需要服务器回退到 index.html。如果部署环境没有回退规则，可以改用 hash 路由或配置 rewrite。',
      },
      { type: 'h2', id: 'assets', text: '资源要有稳定路径' },
      {
        type: 'list',
        items: ['public 目录资源用绝对路径时，要确认部署 base。', '大图需要压缩版本，首屏图片要控制尺寸。', '外部 CDN 脚本需要有失败降级，不要阻塞主内容。'],
      },
      { type: 'code', language: 'bash', text: 'npm run build\nnpm run preview\n# open /, /post/agent-runtime-notes' },
      { type: 'h2', id: 'seo', text: 'SEO 不只是一组 meta' },
      {
        type: 'p',
        text: '标题、描述、OG 图、favicon 和语言属性都要配齐。内容型页面还应该保证没有依赖客户端请求才能出现的关键文本。',
      },
    ],
  },
  {
    slug: 'extension-automation-flow',
    title: '浏览器扩展的自动化控制页',
    subtitle: '把扩展调试、任务编排和状态回放放进一个控制页，可以显著降低迭代成本。',
    date: '2026-04-29',
    category: 'Automation',
    tags: ['Extension', 'Automation', 'Chrome', 'Workflow'],
    cover: '/assets/generated-covers/extension-automation-flow.png',
    readMins: 6,
    excerpt:
      '扩展项目一旦涉及内容脚本、后台任务和页面注入，就需要一个统一控制面板来观察状态和复现实验。',
    content: [
      { type: 'p', text: '扩展自动化的复杂度来自多上下文通信：popup、background、content script 和目标网页都可能改变状态。' },
      { type: 'h2', id: 'control-page', text: '控制页是调试入口' },
      {
        type: 'p',
        text: '控制页应该展示当前 tab、注入状态、脚本版本、任务队列和最近日志。这样问题可以从可见状态开始定位。',
      },
      { type: 'h2', id: 'replay', text: '任务要能回放' },
      {
        type: 'list',
        items: ['每次自动点击、输入和读取都记录目标、时间和结果。', '失败步骤保留 DOM 线索和错误信息。', '危险动作默认进入人工确认。'],
      },
      { type: 'h2', id: 'privacy', text: '本地优先处理隐私数据' },
      {
        type: 'p',
        text: '扩展能接触很多页面数据。除非用户明确允许，分析和草稿生成应该优先在本地完成，上传前给出清晰说明。',
      },
    ],
  },
  {
    slug: 'ai-toolbox-taxonomy',
    title: 'AI 工具箱的信息架构',
    subtitle: '工具目录要能被搜索、被比较、被维护，分类语义比视觉卡片更重要。',
    date: '2026-04-23',
    category: 'Information',
    tags: ['AI Tools', 'Taxonomy', 'Content', 'Search'],
    cover: '/assets/generated-covers/ai-toolbox-taxonomy.png',
    readMins: 4,
    excerpt:
      '一个工具箱页面如果只堆卡片，很快会变成视觉噪音。维护分类、标签和来源，才能让目录长期有用。',
    content: [
      { type: 'p', text: '工具箱的价值不是收集数量，而是用户能否快速判断一个工具适不适合当前任务。' },
      { type: 'h2', id: 'schema', text: '先稳定数据结构' },
      {
        type: 'p',
        text: '每个条目至少需要名称、分类、来源、简介、标签、官网和证据来源。多语言站点还要把 label 和 id 分开。',
      },
      { type: 'h2', id: 'compare', text: '让搜索覆盖语义字段' },
      {
        type: 'p',
        text: '搜索不应该只匹配标题。分类、vendor、标签和描述都要进入索引，用户才可以用场景词找到结果。',
      },
      { type: 'h2', id: 'maintenance', text: '维护入口要简单' },
      {
        type: 'list',
        items: ['数据文件和页面组件解耦。', 'README 自动或半自动列出分类。', '失效链接和重复条目定期检查。'],
      },
    ],
  },
];

export const posts: Post[] = [...researchPosts, ...blogPosts];
