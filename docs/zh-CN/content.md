# 内容字段与维护方法

[README](../../README.zh-CN.md) · [English](../en/content.md)

## 选择真正生效的数据源

| 内容 | 文件 | 修改规则 |
| --- | --- | --- |
| 导航和公共社交链接 | [`site.ts`](../../src/data/site.ts) | 内部路径需与 `App.tsx` 一致；新页脚 GitHub 为 `socials.currentGithub` |
| 首页精选项目 | [`projects.ts`](../../src/data/projects.ts) | 保留稳定 ID、有效翻译键和正确外链 |
| 开发者信息 | [`founder.ts`](../../src/data/founder.ts) | 包含身份/社交信息及翻译数组的键 |
| 动态日期 | [`updates.ts`](../../src/data/updates.ts) | 日期来自源码，不会自动滚动到最新 |
| 界面文案和首页说明 | [`translations.ts`](../../src/i18n/translations.ts) | 同时维护中英文对应键 |
| AI 目录 | [`main.json`](../../public/main.json) | 当前实际数据源，共 76 条、三个分类 |
| 自研应用目录 | [`myapp.json`](../../public/myapp.json) | 当前实际数据源，共 18 条、十个分类 |
| 开发工具目录 | [`toolbox.ts`](../../src/data/toolbox.ts) | 五个演示条目；其中旧 AI 数组不再被 `AiToolbox` 读取 |
| 图片映射 | [`assets.ts`](../../src/data/assets.ts) 和 [`public/`](../../public/) | 增加真实文件，并维护有意义的 alt 文本翻译键 |

修改另一个 AI 导航仓库不会自动更新官网。官网只请求自己部署目录中的 `/main.json` 和 `/myapp.json`。

## JSON 条目格式

下面给出新增条目的有效结构示例，并不表示示例服务已经被收录：

```json
{
  "id": "example-tool",
  "name": { "en-US": "Example Tool", "zh-CN": "示例工具" },
  "category": {
    "id": "assistant",
    "label": { "en-US": "AI Assistant", "zh-CN": "AI 助手" }
  },
  "vendor": { "en-US": "Example Team", "zh-CN": "示例团队" },
  "website": "https://example.com/",
  "description": {
    "en-US": "A concise description of what the tool does.",
    "zh-CN": "简要说明这个工具解决的问题。"
  },
  "tags": [
    { "id": "chat", "label": { "en-US": "Chat", "zh-CN": "对话" } }
  ],
  "sources": ["https://example.com/"]
}
```

| 字段 | 约定与用途 |
| --- | --- |
| `id` | 文件内唯一且稳定，使用小写字母、数字和短横线，符合 `^[a-z0-9-]+$` |
| `name`、`vendor`、`description` | 非空字符串，或包含非空 `en-US`、`zh-CN` 的对象；优先使用双语对象 |
| `category` | 字符串，或包含稳定 `id` 和双语 `label` 的对象；复用 ID 即加入已有分类 |
| `website` | HTTP(S) 地址，卡片优先访问此链接 |
| `tags` | 字符串数组或带 `id`、双语 `label` 的对象数组，展示在卡片上并参与搜索 |
| `sources` | 可选的 HTTP(S) 资料来源数组，运行时也作为网站链接的回退 |

为兼容旧数据，TypeScript 运行类型较宽松，而 `npm run check:content` 采用上表维护要求。已有分类和标签 ID 可以带下划线，短横线限制针对条目 ID。同一个分类 ID 的标签应保持一致，因为生成筛选按钮时最终使用最后遇到的标签文本。

`sources` 记录资料来源，不会自动抓取内容。检查脚本只验证 URL 格式，不验证网站是否在线、可信或内容是否最新。发布前需对照服务本身人工检查介绍及外链。

## 一次内容更新的流程

1. 修改对应 JSON 数组，使用 UTF-8 保存中文，并避免重复 ID。
2. 同一分类和标签保持名称一致，同时提供两种语言，中文简介应准确对应英文语义。
3. 执行 `npm run check:content` 并解决结构错误；存量损坏翻译会显示警告，不会被脚本自动重写。
4. 在两种语言下打开页面，分别用名称和标签搜索，选择所属分类后清空筛选，并确认外链图标的目标地址。
5. 条目/分类数量变化时同步两种 README、相关指南和发布说明。重新生成媒体，执行 `npm run release:check`，将源码、文档和材料一起提交推送。

目前 76 条 AI 中文简介均存在字面量问号损坏；更换文件编码无法还原原文，需要对照可靠资料人工补写，详见[已知问题](known-issues.md)。

## 首页、图片与页脚

精选项目、动态和开发者数据大量引用翻译键。新增数据键之前，先为两种语言补齐对应文本。只有实际内容发生更新时才修改动态日期，避免仅改日期让旧内容显得最新。

网站图片放入 `public/`，通过 `assets.ts` 引用，并检查桌面与手机显示。仅用于说明文档的素材放在 `docs/media/`，该目录不上传到 Vercel。

旧 GitHub 页脚文案按要求包裹在 `<s>` 内。新 `currentGithub` 与旧 `github` 独立，图标来自 `lucide-react`。只更改新链接目标时编辑 `site.ts`；修改顺序或文案时编辑 `Layout.tsx`。人物及项目 GitHub 地址是其他独立字段，不会因页脚变更自动更新。

发布时参考[部署与更新](operations.md)，同时维护与当前内容一致的[演示素材](media.md)。
