# sidcloud Notes

[English](README.md) · [简体中文](README.zh-CN.md) · [Blog branch](https://github.com/wikigsroom/website/tree/blog) · [Official website source](https://github.com/wikigsroom/website/tree/main)

The sidcloud technical blog, built with React 18, TypeScript and Vite 6. This is the **`blog` branch of `wikigsroom/website`**. The studio website is maintained separately on `main`.

Current content includes 24 articles: six Blog posts and 18 Research posts. Features include full-text search, section/category/tag filters, latest/reading-time/title sorting, year archives, article navigation, a table of contents, reading progress, font-size controls, local bookmarks and link copying. Articles and images are bundled locally; no application backend or account login is required.

## Run locally

Use native Node.js 22 and npm:

```sh
git clone --branch blog --single-branch git@github.com:wikigsroom/website.git blogs
cd blogs
npm ci
npm run dev
```

Open Vite's printed address. To validate and preview production output:

```sh
npm run lint
npm run build
npm run preview
```

`build` checks TypeScript and writes `dist/`; `preview` serves that build. Stop temporary servers and close unused browser tabs after checking. Use native tools, without Docker or WSL.

## Content and runtime logic

| File or directory | Responsibility |
| --- | --- |
| [`src/App.tsx`](src/App.tsx) | Hash navigation, search/filter/sort state, reader, bookmarks and sharing |
| [`src/data/posts.ts`](src/data/posts.ts) | `Post`/`ContentBlock` types, six Blog entries and the combined article export |
| [`src/data/researchPosts.ts`](src/data/researchPosts.ts) | 18 curated Research entries, priorities and source references |
| [`src/styles.css`](src/styles.css) | Dark glass styling, neon accents and responsive layout |
| [`public/assets/`](public/assets/) | Local images, copied into the production build |
| [`scripts/optimize-covers.mjs`](scripts/optimize-covers.mjs) | Native FFmpeg conversion to card/hero WebP variants |

Hash routes are `#/` for the index, `#/research` for Research and `#/post/<slug>` for an article. The application reacts to hash changes, so article links share one static HTML entry point. `#archive` scrolls to the archive section.

Search trims and lowercases input, then matches a substring across title, subtitle, excerpt, category, section/priority/source metadata, tags and body text. Section, category, tag and query must all match. Default sorting is newest first; reading-time sorting is longest first. The index initially displays eight results and reveals six more per load-more action.

Bookmarks are stored only in the current browser's `localStorage` under `sidcloud-blog-bookmarks`, without cross-device synchronization. Sharing copies the current URL through the clipboard API.

New articles need a unique stable `slug`, title/subtitle, date, category, tags, cover, reading minutes, excerpt and typed content. Supported blocks are paragraph, heading, list, quote and code. Headings need stable IDs for the table of contents. Maintain curated Research exports rather than copying the private research workspace into Git.

For new PNG/JPEG covers in `public/assets/generated-covers/`, expose native `ffmpeg` on `PATH`, then run:

```sh
npm run optimize:covers
```

WebP variants are written to `optimized/card/` and `optimized/hero/`, at maximum widths 640/1120 pixels. Commit originals and variants together. Existing Vercel ignore rules exclude original generated PNG/JPEG covers from uploads, so the WebP variants must exist.

## Branch and update policy

| Checkout | Remote | Branch |
| --- | --- | --- |
| Blog (`blogs/` in the workspace) | `origin`: `git@github.com:wikigsroom/website.git` | `blog` |
| Official site (`website/` in the workspace) | Same repository | `main` |

Original blog history is preserved, including migration base `671d7ff`. The original checkout retains `git@github.com:carzygod/blog.git` as `legacy-blog` for reference. A fresh clone only needs `origin`; future updates go to `origin/blog`.

For each requested blog update:

1. Work on `blog` and update the relevant source/data/assets.
2. Synchronize both README languages and add a dated entry to [CHANGELOG.md](CHANGELOG.md). Refresh relevant screenshots/recordings when the UI changes.
3. Run `npm run lint` and `npm run build`, inspect the diff and verify the requested behavior when it affects the UI.
4. Stage reviewed files, commit a specific update message and push:

```sh
git switch blog
git add <reviewed-files>
git diff --cached --check
git commit -m "Describe the blog update"
git push origin blog
```

Do not overwrite the site's `main`, force push or send routine updates to the legacy repository. [AGENTS.md](AGENTS.md) persists this rule. CI runs lint/build for `blog` pushes and pull requests.

## Deployment and credentials

The existing Vercel blog project is `blogs`, separate from the studio project `sidcloud`. Git synchronization does not itself certify a Vercel release; when deployment is requested, independently verify production and record the result in the changelog.

The authorized Windows login stays isolated at `%LOCALAPPDATA%\sidcloud\vercel-profile`, outside Git. Use the workspace's isolated deployment tooling and verify the target blog project. Preserve the default global Vercel login. `.vercel/`, `.env*`, dependencies, build folders and credentials must not be committed.
