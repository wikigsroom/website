/* global document, window */
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright-core';
import { preview as vitePreview } from 'vite';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ledger = JSON.parse(await fs.readFile(path.join(root, 'src/data/wechatSources.json'), 'utf8'));
const { posts } = readContentModule(path.join(root, 'src/data/posts.ts'));
const batch = process.argv[2] || ledger.latestBatch;
const sources = ledger.articles.filter((item) => item.batch === batch);
assert(sources.length > 0, 'Unknown batch');
const directory = path.join(root, 'docs/media', `wechat-${batch.replaceAll('-', '')}`);
const raw = path.join(root, 'docs/media/.raw', `wechat-${batch}`);
await fs.mkdir(directory, { recursive: true });
await fs.mkdir(raw, { recursive: true });
const evidenceFiles = ['src/App.tsx', 'src/styles.css', 'src/components/ArticleMedia.tsx',
  'src/data/posts.ts', 'src/data/wechatPosts.ts', 'src/data/wechatEditorial.ts',
  'src/data/wechatMaterials.ts', 'src/data/wechatSources.json',
  ...sources.flatMap((source) => [source.cover.hero, source.cover.card,
    ...source.materials.map((item) => item.src)]).map((src) => `public${src}`)];
const digest = crypto.createHash('sha256');
for (const filename of evidenceFiles)
  digest.update(filename).update(filename.endsWith('.webp')
    ? await fs.readFile(path.join(root, filename))
    : (await fs.readFile(path.join(root, filename), 'utf8')).replaceAll('\r\n', '\n'));
const report = { batch, checkedAt: new Date().toISOString(), implementationSha256: digest.digest('hex'),
  evidenceFiles, checks: [], assets: [], browserClosed: false, previewClosed: false };
let preview, browser;
const errors = [];
let origin;

async function open(page, hash) {
  await page.goto(`${origin}/${hash}`, { waitUntil: 'domcontentloaded' });
  await page.locator('main').waitFor();
  if (hash.startsWith('#/post/')) {
    const source = sources.find((item) => hash === `#/post/${item.slug}`);
    if (source) await page.getByRole('heading', { name: posts.find((item) => item.slug === source.slug).title, exact: true }).waitFor();
    await page.locator('.article-cover img').evaluate((item) => item.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
}

async function shot(page, filename, selector) {
  await page.evaluate(() => document.fonts.ready);
  await delay(150);
  await (selector ? page.locator(selector) : page).screenshot({ path: path.join(directory, filename) });
  report.assets.push(filename);
}

async function layout(page, width, label) {
  assert(await page.evaluate((w) => document.documentElement.scrollWidth <= w + 1, width), `${label}: overflow at ${width}px`);
  report.checks.push({ check: 'responsive layout', label, width, passed: true });
}

function encode(video, name, width) {
  const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', video, '-an', '-c:v', 'libx264',
    '-crf', '26', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(directory, `${name}.mp4`)],
  { windowsHide: true, stdio: 'pipe' });
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', path.join(directory, `${name}.mp4`),
    '-filter_complex', `fps=7,scale=${width}:-2:flags=lanczos,split[a][b];[a]palettegen=max_colors=80[p];[b][p]paletteuse=dither=bayer`,
    '-loop', '0', path.join(directory, `${name}.gif`)], { windowsHide: true, stdio: 'pipe' });
  report.assets.push(`${name}.mp4`, `${name}.gif`);
}

try {
  preview = await vitePreview({ root, logLevel: 'error', preview: { host: '127.0.0.1', port: 0 } });
  origin = `http://127.0.0.1:${preview.httpServer.address().port}`;
  browser = await chromium.launch({ headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : { channel: 'chrome' }) });
  const context = await browser.newContext({ viewport: { width: 1440, height: 960 }, locale: 'zh-CN' });
  await context.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  await open(page, '#/wechat');
  assert.equal((await page.locator('.section-head > p').innerText()).trim(), `${ledger.articles.length} 篇匹配`);
  const more = page.getByRole('button', { name: '加载更多', exact: false });
  while (await more.count()) await more.click();
  assert.equal(await page.locator('.post-card').count(), ledger.articles.length);
  for (const img of await page.locator('.post-card img').all())
    await img.evaluate((item) => item.decode());
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await shot(page, 'reading-index-desktop.png');
  for (const source of sources) {
    await open(page, `#/post/${source.slug}`);
    assert.equal(await page.locator('.reading-source > a').getAttribute('href'), source.url);
    assert.match(await page.locator('.reading-source').innerText(), new RegExp(source.sourcePublishedAt.slice(0, 10)));
    assert.match(await page.locator('.article-cover figcaption').innerText(), new RegExp(source.cover.model.replaceAll('.', '\\.')));
    assert.equal(await page.locator('.article-media').count(), source.materials.length);
    for (const img of await page.locator('.article-media img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate((item) => item.decode());
      assert(await img.evaluate((item) => item.naturalWidth > 300));
    }
    for (const a of await page.locator('.source-video-reference > a').all())
      assert.equal(await a.getAttribute('href'), source.url);
    report.checks.push({ check: 'article, cover, attribution and all source figures', slug: source.slug,
      figures: source.materials.length, videoReferences: source.videos.length, passed: true });
  }
  for (const [query, slug] of [['Bite', 'humanizer-clearer-ai-writing'], ['94 GiB', 'pika-h3-flex-speed-and-limits']]) {
    await open(page, '#/wechat');
    await page.getByRole('searchbox').fill(query);
    await page.waitForFunction(() => document.querySelectorAll('.post-card').length === 1);
    assert.equal(await page.locator('.post-card .open-link').getAttribute('href'), `#/post/${slug}`);
    report.checks.push({ check: 'search by original author or table contents', query, slug, passed: true });
  }
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 960 });
    await open(page, '#/wechat');
    await page.getByRole('searchbox').fill('');
    await layout(page, width, 'reading collection');
    await open(page, '#/post/eight-view-ai-3d-blockout');
    await layout(page, width, 'source attribution and comparison table');
  }
  await open(page, '#/post/prompt2rig-text-to-motion');
  await shot(page, 'reading-article-desktop.png');
  await page.locator('.article-media').first().scrollIntoViewIfNeeded();
  await shot(page, 'reading-animation-desktop.png', '.article-media:first-of-type');
  await open(page, '#/post/eight-view-ai-3d-blockout');
  await page.locator('#reference').scrollIntoViewIfNeeded();
  await shot(page, 'reading-reference-desktop.png');
  await open(page, '#/post/pika-h3-flex-speed-and-limits');
  await page.locator('#resources').scrollIntoViewIfNeeded();
  await shot(page, 'reading-table-desktop.png');
  await page.getByRole('button', { name: '返回列表', exact: false }).click();
  await page.waitForURL('**/#/wechat');
  report.checks.push({ check: 'return to the source collection', passed: true });
  await context.close();

  for (const [name, viewport, gifWidth] of [['reading-walkthrough', { width: 1280, height: 800 }, 800],
    ['reading-mobile', { width: 390, height: 844 }, 390]]) {
    const recording = await browser.newContext({ viewport, locale: 'zh-CN', recordVideo: { dir: raw, size: viewport } });
    await recording.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
    const recorded = await recording.newPage();
    recorded.on('pageerror', (error) => errors.push(error.message));
    await open(recorded, '#/wechat');
    await delay(1200);
    await open(recorded, '#/post/prompt2rig-text-to-motion');
    await delay(1400);
    if (name === 'reading-mobile') await shot(recorded, 'reading-article-mobile.png');
    await recorded.locator('.reading-source').scrollIntoViewIfNeeded();
    await delay(1300);
    await recorded.locator('.article-media').first().scrollIntoViewIfNeeded();
    await delay(2200);
    if (name === 'reading-mobile') await shot(recorded, 'reading-figure-mobile.png');
    await recorded.locator('#review').scrollIntoViewIfNeeded();
    await delay(1300);
    const video = recorded.video();
    await recording.close();
    encode(await video.path(), name, gifWidth);
  }
  assert.deepEqual(errors, []);
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.error = error.message;
  throw error;
} finally {
  if (browser) { await browser.close(); report.browserClosed = true; }
  if (preview) {
    await new Promise((resolve, reject) => preview.httpServer.close((error) => error ? reject(error) : resolve()));
    report.previewClosed = true;
  }
  await fs.writeFile(path.join(directory, 'verification.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(`Reading library verified: ${sources.length} articles, ${report.checks.length} checks; browser and preview closed.`);
