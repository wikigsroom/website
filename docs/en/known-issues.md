# Existing limitations and follow-up work

[README](../../README.md) · [简体中文](../zh-CN/known-issues.md)

These findings describe the website carried into this repository on 2026-10-28. Repository organization, footer deployment and documentation work did not repair the items below. Follow-up changes should be implemented, verified and recorded individually.

| Area | Observed behavior | Practical effect / next action |
| --- | --- | --- |
| Chinese AI descriptions | All 76 `description.zh-CN` values in `public/main.json` contain literal question marks | English remains readable. Restore Chinese editorially from reliable references; changing encoding cannot recover lost characters |
| Internal production routes | Direct HTTP requests to `/aitoolbox`, `/mybox` and `/devtoolbox` returned 404 on 2026-10-28; homepage returned 200 | Client navigation works, but direct links/refreshes fail. Add and deploy a reviewed SPA fallback, then verify direct requests and real static files separately |
| Developer tools | Five entries link to `https://example.com` | The interface/search is a demonstration; replace entries with actual tools before presenting it as a production directory |
| Featured project links | The earlier live audit received 404 for the configured TGWC and Lastpush URLs | Confirm the intended repository destinations with the owner before changing them; a new footer account does not migrate individual project links |
| Live2D widget | Existing external script produced `Invalid initWidget argument` and null `hitTest` errors during browser inspection | Align the integration with the widget API or remove it in a separate change; media capture excludes the widget |
| Font delivery | Google Fonts are requested at runtime and stalled a documentation screenshot while Chinese subsets loaded | System-font fallback exists; media capture blocks the external font service for repeatability |
| Catalog fetch failures | Failed requests/non-array JSON fall back to an empty array without an explicit error message | Loading, empty search and network failure are not distinguished; add clear states when requested |
| Semantic headings | `SectionHeading` renders the section title as a paragraph | Improve heading levels/accessibility in a focused UI update |
| Document language | `index.html` declares `lang="en"`; UI switching does not update it | Set document language along with i18n state for accessibility |
| Homepage freshness | Update entries are dated 2026-01-25/26 | These are authored dates, not a live activity feed; update them only alongside real content |
| Unused components | `CodeBlock` and `Toast` exist but are not wired into current catalog pages | Do not claim working copy-to-clipboard/code-example functionality from their presence alone |
| Search scope | Current-locale, case-insensitive literal substring only; no pagination | Cross-language/fuzzy search and loading performance for larger directories are future work |

The two configured project URLs observed in the earlier audit are:

- `https://github.com/carzygod/Tonspay/TGWC`
- `https://github.com/carzygod/lastpush/dashboard`

Outbound HTTP status can change, so this is dated evidence, not a guarantee about a destination's permanent availability. The content checker validates structure/URL syntax and reports damaged text; it does not prove an external service works. A passing build and local media check also do not prove that server routing, Live2D or every external link works in production.

The active footer requirement is complete: struck-through `Github(惨遭封禁)` plus the adjacent icon and `现任仓库` pointing to `wikigsroom`. The retained former-account link and separately configured builder/project links are intentionally independent fields.

See [release evidence](../releases/2026-10-28.md) and [operations](operations.md) for verification scope.
