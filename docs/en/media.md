# Reproducing screenshots, recordings and GIFs

[README](../../README.md) · [简体中文](../zh-CN/media.md) · [Gallery and downloads](../media/README.md)

## What the media represents

Committed media comes from real browser interactions with a local Vite **production build**, not a mockup or a slideshow of screenshots. The desktop tour demonstrates the homepage, project section, updated footer, AI search, category filtering, My Box search, developer catalog and language switching. The mobile tour shows scrolling, the footer and AI search. Videos have no audio; GIFs run at about 1.54× speed.

During capture only, requests for the external `live2d-widgets` script and Google Fonts are aborted. The browser uses the CSS system-font fallback. This makes captures independent of slow font downloads and excludes an already failing decorative widget. No application source is modified by these capture conditions. Native fonts can vary across operating systems, so the source fingerprint guarantees matching inputs rather than pixel-identical rendering on every machine.

These local recordings do not demonstrate that Vercel's direct-route 404 issue or the external widget has been repaired. The Chinese homepage is shown; the catalogs are recorded in English because the inherited Chinese AI descriptions are damaged.

## Native prerequisites

- Run `npm ci` with Node 22/npm installed.
- Have Playwright's Chromium and recording FFmpeg available, or select an installed Chrome executable.
- Install native `ffmpeg` and `ffprobe` with H.264 support and expose them through `PATH` or the environment variables below.

```sh
npx playwright install chromium ffmpeg
npm run docs:media
npm run docs:check
```

The Playwright-downloaded FFmpeg used for browser recording is separate from the native FFmpeg used for final MP4/GIF conversion. Docker/WSL are not needed.

Example using the installed Chrome on Windows, with settings scoped to this PowerShell process:

```powershell
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run docs:media
Remove-Item Env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
```

| Environment variable | Meaning |
| --- | --- |
| `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` | Optional browser executable; otherwise use Playwright Chromium |
| `FFMPEG_PATH` | Optional native FFmpeg executable; default `ffmpeg` |
| `FFPROBE_PATH` | Optional native FFprobe executable; default `ffprobe` |

## Capture and conversion procedure

[`capture-docs.mjs`](../../scripts/capture-docs.mjs) performs the following:

1. Check codec executables, build the site, allocate a free loopback port and start a native Vite preview child process.
2. Open an isolated browser context with a deterministic English language preference; toggle Chinese for its dedicated homepage captures.
3. Capture desktop pages at 1440×960 and a Chinese mobile homepage at 390×844. Scroll all homepage sections into view before taking its full-page screenshot.
4. Verify navigation order, external-link attributes and header fit at 320/390/768/1024/1280/1440 px in both languages. Exercise `codex` search, unmatched search and route navigation; collect actual card counts and mobile overflow status.
5. Record real desktop interactions at 1280×800 and mobile interactions at 390×844 into ignored raw WebM files.
6. Encode silent H.264 MP4s using CRF 24, `yuv420p` and `+faststart`. Produce looping palette-based GIFs at 10 fps, 128 colors, widths 880/312, using `setpts=0.65*PTS`.
7. Probe outputs and write [`manifest.json`](../media/manifest.json) with capture conditions, source digest, verification observations, dimensions, durations, byte sizes and SHA-256 hashes.
8. Close all created browser contexts/processes and stop the preview server in `finally`, including on failures.

The script retains raw WebM files under ignored `docs/media/.raw/` for troubleshooting. Only final PNG/MP4/GIF files and the manifest belong in Git. The initial capture uses about 26 MB of final media, with every individual asset below the project's 25 MiB validation limit.

## Review before committing

Inspect the desktop and phone homepages, filtered results, full page and footer. Confirm Chinese glyphs, image loading, line wrapping, visible card content and the old/new GitHub labels. Play both MP4s and GIFs. A successful probe reads metadata; a full decode provides stronger evidence against corrupt frames:

```sh
ffmpeg -v error -i docs/media/desktop-tour.mp4 -f null -
ffmpeg -v error -i docs/media/mobile-tour.mp4 -f null -
ffmpeg -v error -i docs/media/website-tour.gif -f null -
ffmpeg -v error -i docs/media/mobile-tour.gif -f null -
npm run release:check
```

`docs:check` validates local documentation links, file existence, bytes and hashes, requires screenshots/video/GIF, and compares a normalized source digest. Changes in `src/`, `public/`, `index.html`, `tailwind.config.ts` or `vite.config.ts` require a new capture, except root-level `public/<32 hexadecimal characters>.txt` domain-verification files, which do not affect the rendered UI and are excluded from that digest. Verify those files through exact build-output and public HTTP body checks instead. Dependency-only or tooling changes may also affect rendering, so regenerate when their output changes even if the digest does not detect it. CI checks committed evidence without launching a browser or regenerating recordings.

If capture fails, resolve the cause and rerun it before committing. A partially refreshed directory should not be published with an old manifest; the hash checks will reject it. Close any browser created outside the script manually after inspection.
