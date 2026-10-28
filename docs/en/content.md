# Content schema and editing

[README](../../README.md) · [简体中文](../zh-CN/content.md)

## Choose the active source

| Content | File | Editing rule |
| --- | --- | --- |
| Navigation and shared social links | [`site.ts`](../../src/data/site.ts) | Keep internal routes aligned with `App.tsx`; current footer GitHub is `socials.currentGithub` |
| Homepage featured projects | [`projects.ts`](../../src/data/projects.ts) | Keep a stable ID, valid translation keys and the intended external destination |
| Builder profile | [`founder.ts`](../../src/data/founder.ts) | Identity/social metadata and keys for translated arrays |
| Update dates | [`updates.ts`](../../src/data/updates.ts) | Dates are source content, not automatically refreshed timestamps |
| UI copy and homepage descriptions | [`translations.ts`](../../src/i18n/translations.ts) | Maintain corresponding English and Chinese keys |
| AI catalog | [`main.json`](../../public/main.json) | Active runtime source; currently 76 entries / 3 categories |
| Personal application catalog | [`myapp.json`](../../public/myapp.json) | Active runtime source; currently 18 entries / 10 categories |
| Developer catalog | [`toolbox.ts`](../../src/data/toolbox.ts) | Five demonstration entries; the older exported AI array is unused by `AiToolbox` |
| Image mapping | [`assets.ts`](../../src/data/assets.ts) and [`public/`](../../public/) | Add real image files and meaningful translation keys for their alt text |

Do not edit a separate AI-directory repository and assume the website will automatically fetch it. This website requests its own deployed `/main.json` and `/myapp.json`.

## JSON entry format

The following is a valid example for a new entry, rather than a claim that this example service is in the catalog:

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

| Field | Contract and behavior |
| --- | --- |
| `id` | Unique per file; stable lowercase letters, digits and hyphens, matching `^[a-z0-9-]+$` |
| `name`, `vendor`, `description` | Nonempty string, or object with nonempty `en-US` and `zh-CN`; localized objects are preferred |
| `category` | String, or object with stable `id` and localized `label`; reuse an existing ID to join its filter |
| `website` | HTTP(S) URL; the actual primary card destination |
| `tags` | Array of strings or objects with `id` and localized `label`; shown on cards and included in search |
| `sources` | Optional array of HTTP(S) references; fallback destination if a website is absent at runtime |

The TypeScript runtime type is deliberately permissive for legacy entries, while `npm run check:content` applies the maintenance requirements above. Category/tag IDs in existing data may use underscores; the stricter hyphen rule applies to entry IDs. Keep labels consistent for a shared category ID because the last encountered label is used when generating filter buttons.

The source links are provenance, not an automatic content crawler. The checker validates URL syntax, not whether a site is reachable, trustworthy or current. Review descriptions and outbound destinations manually against the referenced service before publishing.

## An editing workflow

1. Add or update an entry in the appropriate JSON array, keeping UTF-8 Chinese text intact and avoiding duplicate IDs.
2. Use matching category/tag labels across entries and provide both languages. Preserve the meaning of the English description when writing Chinese.
3. Run `npm run check:content`; resolve structural failures. Existing damaged translations are reported as warnings rather than silently rewritten.
4. Open the page in both languages. Search for the tool name and a tag, select its category, then clear the filter. Verify that the external icon targets the intended URL.
5. If the number of entries/categories changes, update both README tables and relevant guides/release notes. Regenerate media, run `npm run release:check`, commit and push source, docs and evidence together.

Currently all 76 Chinese AI descriptions contain literal replacement question marks. The original wording cannot be recovered by changing file encoding; it requires editorial restoration from reliable descriptions. See [known issues](known-issues.md).

## Homepage, assets and footer

Project, update and founder entries mostly reference translation keys. Add each referenced key to both language objects before using it in the data file. Edit the explicit update date when there is a real update; do not make an old entry appear new by merely changing its timestamp.

Place website images in `public/`, reference them through `assets.ts`, and verify sizing on desktop and phone. Documentation-only captures belong in `docs/media/`, which is excluded from Vercel uploads.

The footer's old account label is intentionally wrapped in `<s>`. The new `currentGithub` destination is independent of the old `github` destination, and the icon is from `lucide-react`. To change only the footer destination, edit `site.ts`; to change its visual order/label, edit `Layout.tsx`. The founder GitHub and project GitHub destinations are separate fields and are not changed by the footer update.

Publish using [operations](operations.md), and keep the [media](media.md) synchronized with displayed content.
