/* global document, window, localStorage */
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright-core';
import { preview as vitePreview } from 'vite';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'docs/media/benchmark-20261029');
const rawDirectory = path.join(root, 'docs/media/.raw/benchmark-20261029');
await fs.mkdir(directory, { recursive: true });
await fs.mkdir(rawDirectory, { recursive: true });
const data = JSON.parse(await fs.readFile(path.join(root, 'src/data/benchmarkIndex.json'), 'utf8'));
const visuals = JSON.parse(
  await fs.readFile(path.join(root, 'src/data/benchmarkVisuals.json'), 'utf8'),
);
const { benchmarkEditorial } = readContentModule(path.join(root, 'src/data/benchmarkEditorial.ts'));
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
const ffprobe = process.env.FFPROBE_PATH || 'ffprobe';
execFileSync(ffmpeg, ['-version'], { windowsHide: true, stdio: 'ignore' });
const evidenceFiles = [
  'src/App.tsx',
  'src/styles.css',
  'src/data/posts.ts',
  'src/data/researchPosts.ts',
  'src/data/benchmark.ts',
  'src/data/benchmarkPosts.ts',
  'src/data/benchmarkEditorial.ts',
  'src/data/benchmarkIndex.json',
  'src/data/benchmarkSnapshot.json',
  'src/components/BenchmarkResults.tsx',
  'src/components/ArticleMedia.tsx',
  'src/components/BenchmarkGallery.tsx',
  'src/data/benchmarkVisuals.ts',
  'src/data/benchmarkVisuals.json',
  ...Object.values(visuals.rounds)
    .flatMap((entry) => [
      entry.cover.hero,
      entry.cover.card,
      ...entry.gallery.map((figure) => figure.src),
      ...entry.gallery.filter((figure) => figure.poster).map((figure) => figure.poster),
    ])
    .map((src) => `public${src}`),
  ...Object.values(visuals.research)
    .flatMap((cover) => [cover.hero, cover.card])
    .map((src) => `public${src}`),
];
const digest = crypto.createHash('sha256');
for (const filename of evidenceFiles)
  digest
    .update(filename)
    .update(
      filename.endsWith('.webp')
        ? await fs.readFile(path.join(root, filename))
        : (await fs.readFile(path.join(root, filename), 'utf8')).replaceAll('\r\n', '\n'),
    );
const report = {
  checkedAt: new Date().toISOString(),
  snapshot: data.version,
  snapshotDate: data.snapshotDate,
  sourceCatalogSha256: data.sourceSha256,
  implementationSha256: digest.digest('hex'),
  evidenceFiles,
  checks: [],
  assets: [],
  browserClosed: false,
  previewClosed: false,
};
let preview, browser;
const pageErrors = [];

async function contextFor(viewport, recording = false) {
  const context = await browser.newContext({
    viewport,
    locale: 'zh-CN',
    ...(recording ? { recordVideo: { dir: rawDirectory, size: viewport } } : {}),
  });
  await context.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  context.on('page', (page) => page.on('pageerror', (error) => pageErrors.push(error.message)));
  return context;
}

async function open(page, hash) {
  await page.goto(`${report.localOrigin}${hash}`, {
    waitUntil: 'domcontentloaded',
  });
  await page.locator('main').waitFor();
  if (hash.startsWith('#/post/benchmark-'))
    await page
      .locator(`.batch-results[data-round-id="${hash.slice('#/post/benchmark-'.length)}"]`)
      .waitFor();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

async function shot(page, filename, locator) {
  await page.evaluate(() => document.fonts.ready);
  await delay(200);
  const target = locator || page;
  await target.screenshot({ path: path.join(directory, filename) });
  report.assets.push(filename);
}

async function checkLayout(page, description, width) {
  const layout = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    links: [...document.querySelectorAll('header.site-header a')].map((link) => {
      const box = link.getBoundingClientRect();
      return {
        href: link.getAttribute('href'),
        left: box.left,
        right: box.right,
      };
    }),
    content: [
      ...document.querySelectorAll(
        '.article-shell, .batch-results, .batch-case > summary, .batch-board, .control-panel, .experiment-figure, .article-cover',
      ),
    ].map((item) => {
      const box = item.getBoundingClientRect();
      return { left: box.left, right: box.right, width: box.width };
    }),
  }));
  assert(layout.documentWidth <= width + 1, `${description}: document overflow at ${width}`);
  for (const box of [...layout.links, ...layout.content])
    assert(
      box.left >= -1 && box.right <= width + 1,
      `${description}: element outside ${width}px viewport`,
    );
  report.checks.push({
    check: 'responsive layout',
    description,
    width,
    passed: true,
  });
}

function encode(video, mp4, gif, width) {
  execFileSync(
    ffmpeg,
    [
      '-hide_banner',
      '-loglevel',
      'error',
      '-y',
      '-i',
      video,
      '-an',
      '-c:v',
      'libx264',
      '-crf',
      '25',
      '-preset',
      'medium',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      path.join(directory, mp4),
    ],
    { windowsHide: true, stdio: 'pipe' },
  );
  execFileSync(
    ffmpeg,
    [
      '-hide_banner',
      '-loglevel',
      'error',
      '-y',
      '-i',
      path.join(directory, mp4),
      '-filter_complex',
      `setpts=0.65*PTS,fps=8,scale=${width}:-2:flags=lanczos,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle`,
      '-loop',
      '0',
      path.join(directory, gif),
    ],
    { windowsHide: true, stdio: 'pipe' },
  );
  const probe = JSON.parse(
    execFileSync(
      ffprobe,
      [
        '-v',
        'error',
        '-show_entries',
        'format=duration:stream=width,height,codec_name',
        '-of',
        'json',
        path.join(directory, mp4),
      ],
      { windowsHide: true, encoding: 'utf8' },
    ),
  );
  assert(Number(probe.format.duration) > 5);
  report.assets.push(mp4, gif);
  report.checks.push({ check: 'recording encoded', filename: mp4, probe });
}

try {
  preview = await vitePreview({
    root,
    logLevel: 'error',
    preview: { host: '127.0.0.1', port: 0, strictPort: false },
  });
  const address = preview.httpServer.address();
  report.localOrigin = `http://127.0.0.1:${address.port}/`;
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : { channel: 'chrome' }),
  });
  const desktop = await contextFor({ width: 1440, height: 960 });
  const page = await desktop.newPage();
  await open(page, '#/benchmark');
  assert.equal((await page.locator('.section-head > p').innerText()).trim(), '46 篇匹配');
  assert.match(await page.locator('.batch-board').innerText(), /681/);
  await shot(page, 'batch-index-desktop.png');
  await shot(page, 'batch-overview-desktop.png', page.locator('.batch-board'));

  for (const round of data.rounds) {
    await open(page, `#/post/benchmark-${round.id}`);
    assert.equal(await page.locator('h1').textContent(), benchmarkEditorial[round.id].title);
    assert.equal(await page.locator('.article-takeaways li').count(), 3);
    assert.match(await page.locator('.batch-date').innerText(), /整理日期 2026-10-29/);
    assert.deepEqual(
      await page
        .locator('.batch-case')
        .evaluateAll((items) => items.map((item) => item.dataset.caseId)),
      round.caseIds,
      `Coverage mismatch: ${round.id}`,
    );
    await page.locator('.batch-case').evaluateAll((items) =>
      items.forEach((item) => {
        item.open = true;
      }),
    );
    await page.waitForFunction(
      (count) => document.querySelectorAll('.batch-case-detail').length === count,
      round.caseIds.length,
    );
    assert.deepEqual(
      await page.locator('.batch-facts > div:first-child dd').allTextContents(),
      round.caseIds,
    );
    assert.equal(await page.locator('.batch-original').count(), round.caseIds.length);
    assert.equal(
      await page.locator('.batch-case > summary').filter({ hasText: '复核引用' }).count(),
      round.caseIds.filter((id) => data.cases.find((item) => item.id === id).round !== round.id)
        .length,
    );
    const cover = page.locator('.article-cover img');
    await cover.scrollIntoViewIfNeeded();
    await cover.evaluate((image) => image.decode());
    assert.equal(await cover.getAttribute('src'), visuals.rounds[round.id].cover.hero);
    const figures = page.locator('.benchmark-gallery .experiment-figure img');
    assert.equal(await figures.count(), visuals.rounds[round.id].gallery.length);
    for (const figure of await figures.all()) {
      await figure.scrollIntoViewIfNeeded();
      await figure.evaluate((image) => image.decode());
      assert(await figure.evaluate((image) => image.naturalWidth >= 300));
    }
    report.checks.push({
      check: 'raster cover and inline visual figures',
      roundId: round.id,
      figures: await figures.count(),
      passed: true,
    });
    report.checks.push({
      check: 'batch article and all expanded records',
      roundId: round.id,
      records: round.caseIds.length,
      passed: true,
    });
  }
  console.log('Verified all 46 batch routes and expanded 770 record references.');

  await open(page, '#/benchmark');
  await page.getByRole('searchbox').fill('community-default-02b');
  // Substring search must find the current run and its archived version.
  const expected = data.rounds.filter((round) =>
    round.caseIds.some((id) => id.includes('community-default-02b')),
  ).length;
  await page.waitForFunction(
    (count) => document.querySelector('.section-head > p').textContent.trim() === `${count} 篇匹配`,
    expected,
  );
  report.checks.push({
    check: 'search record ID across batches',
    query: 'community-default-02b',
    expected,
    passed: true,
  });
  await page.getByRole('button', { name: '清除筛选', exact: false }).click();
  assert.equal((await page.locator('.section-head > p').innerText()).trim(), '70 篇匹配');
  const more = page.getByRole('button', { name: '加载更多', exact: false });
  for (let i = 0; i < 12 && (await more.count()); i++) await more.click();
  assert.equal(await page.locator('.post-card').count(), 70);
  await page.locator('.post-card img').evaluateAll(async (images) => {
    images.forEach((image) => {
      image.loading = 'eager';
    });
    await Promise.all(images.map((image) => image.decode()));
  });
  assert(
    await page
      .locator('.post-card img')
      .evaluateAll((images) =>
        images.every((image) => image.naturalWidth >= 600 && !image.src.endsWith('.svg')),
      ),
  );
  report.checks.push({
    check: 'all 70 article covers decode as raster images',
    passed: true,
  });
  await page.getByRole('button', { name: 'Notes', exact: true }).click();
  await page.waitForURL('**/#/notes');
  assert.equal((await page.locator('.section-head > p').innerText()).trim(), '6 篇匹配');
  await page.getByRole('button', { name: 'Research', exact: true }).click();
  await page.waitForURL('**/#/research');
  assert.equal((await page.locator('.section-head > p').innerText()).trim(), '18 篇匹配');
  await page.getByRole('button', { name: '测评日志', exact: true }).click();
  await page.waitForURL('**/#/benchmark');
  await page.locator('.post-card .bookmark').first().click();
  assert.equal(
    await page.evaluate(() => JSON.parse(localStorage.getItem('sidcloud-blog-bookmarks')).length),
    1,
  );
  report.checks.push({
    check: '70 total / 46 Benchmark / 18 Research / 6 Notes; bookmarks persist',
    passed: true,
  });

  await open(page, '#/post/benchmark-r4090-community-complete-20261029');
  await shot(page, 'batch-article-desktop.png');
  await page.locator('#visuals').scrollIntoViewIfNeeded();
  await shot(page, 'batch-gallery-desktop.png', page.locator('.experiment-figure').first());
  await page.locator('.sample-player summary').first().click();
  const sampleVideo = page.locator('.sample-player video').first();
  await sampleVideo.evaluate(async (video) => {
    video.muted = true;
    await video.play();
  });
  await delay(500);
  assert(await sampleVideo.evaluate((video) => video.currentTime > 0 && video.videoWidth > 0));
  await sampleVideo.evaluate((video) => video.pause());
  report.checks.push({ check: 'original public video plays', passed: true });
  await page.locator('#results').scrollIntoViewIfNeeded();
  await page.locator('.batch-case > summary').first().click();
  await shot(page, 'batch-record-desktop.png');
  await page.getByRole('button', { name: '切换大字', exact: true }).click();
  assert.equal(await page.locator('.reader-large').count(), 1);
  await page.getByRole('button', { name: '返回列表', exact: false }).click();
  await page.waitForURL('**/#/benchmark');
  report.checks.push({
    check: 'reader controls and return to batch index',
    passed: true,
  });
  await open(page, '#/post/benchmark-r4090-quality');
  await page.locator('#scope').scrollIntoViewIfNeeded();
  await shot(page, 'review-batch-desktop.png');
  await open(page, '#/post/benchmark-r4090-tts');
  await page.locator('#visuals').scrollIntoViewIfNeeded();
  const sampleAudio = page.locator('.experiment-figure audio').first();
  await sampleAudio.evaluate(async (audio) => {
    audio.muted = true;
    await audio.play();
  });
  await delay(400);
  assert(await sampleAudio.evaluate((audio) => audio.currentTime > 0 && audio.duration > 0));
  await sampleAudio.evaluate((audio) => audio.pause());
  await shot(page, 'audio-gallery-desktop.png', page.locator('.experiment-figure').first());
  report.checks.push({ check: 'original public audio plays', passed: true });
  await open(page, '#/post/benchmark-r3080-3d');
  await page.locator('#visuals').scrollIntoViewIfNeeded();
  await shot(page, 'image-gallery-desktop.png', page.locator('.experiment-figure').first());
  await open(page, '#/post/benchmark-r4090-swift-20261022');
  await shot(page, 'illustrated-article-desktop.png');

  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await open(page, '#/benchmark');
    await checkLayout(page, 'batch index', width);
    await open(page, '#/post/benchmark-r4090-tts-earlier');
    await page.locator('.batch-case > summary').first().click();
    await page.locator('#results').scrollIntoViewIfNeeded();
    await checkLayout(page, '130-record historical TTS article, first record expanded', width);
    if (width === 390) await shot(page, 'batch-record-mobile.png');
  }
  await desktop.close();

  const recording = await contextFor({ width: 1280, height: 800 }, true);
  const recorded = await recording.newPage();
  await open(recorded, '#/benchmark');
  await delay(1500);
  await recorded.locator('.batch-board').scrollIntoViewIfNeeded();
  await delay(1600);
  await recorded.locator('.post-card .open-link').first().click();
  await recorded.locator('.batch-results').waitFor();
  await delay(1600);
  await recorded.locator('#visuals').scrollIntoViewIfNeeded();
  await delay(2000);
  await recorded.locator('.experiment-figure').nth(1).scrollIntoViewIfNeeded();
  await delay(1600);
  await recorded.locator('#results').scrollIntoViewIfNeeded();
  await delay(1200);
  await recorded.locator('.batch-case > summary').first().click();
  await delay(2200);
  await recorded.locator('.batch-case-detail').first().scrollIntoViewIfNeeded();
  await delay(1600);
  const desktopVideo = recorded.video();
  await recording.close();
  encode(await desktopVideo.path(), 'batch-walkthrough.mp4', 'batch-walkthrough.gif', 800);

  const mobile = await contextFor({ width: 390, height: 844 }, true);
  const phone = await mobile.newPage();
  await open(phone, '#/post/benchmark-r4090-quality');
  await delay(1800);
  await shot(phone, 'batch-article-mobile.png');
  await phone.locator('#visuals').scrollIntoViewIfNeeded();
  await delay(1800);
  await shot(phone, 'batch-gallery-mobile.png', phone.locator('.experiment-figure').first());
  await phone.locator('#scope').scrollIntoViewIfNeeded();
  await delay(1600);
  await phone.locator('#results').scrollIntoViewIfNeeded();
  await delay(1200);
  await phone.locator('.batch-case > summary').first().click();
  await delay(2000);
  await phone.locator('.batch-case-detail').first().scrollIntoViewIfNeeded();
  await delay(1800);
  const mobileVideo = phone.video();
  await mobile.close();
  encode(await mobileVideo.path(), 'batch-mobile.mp4', 'batch-mobile.gif', 390);
  assert.deepEqual(pageErrors, [], 'Browser runtime errors');
  report.checks.push({ check: 'no browser runtime errors', passed: true });
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.error = error.message;
  throw error;
} finally {
  if (browser) {
    await browser.close();
    report.browserClosed = true;
  }
  if (preview) {
    await new Promise((resolve, reject) =>
      preview.httpServer.close((error) => (error ? reject(error) : resolve())),
    );
    report.previewClosed = true;
  }
  delete report.localOrigin;
  await fs.writeFile(
    path.join(directory, 'verification.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
}
console.log(
  `Browser verification and media completed; ${report.checks.length} checks, browser and preview closed.`,
);
