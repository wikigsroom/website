import fs from 'node:fs/promises';
import path from 'node:path';
import net from 'node:net';
import { spawn, execFileSync } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';
import { root, mediaDirectory, sha256, sourceDigest } from './lib.mjs';

const rawDirectory = path.join(mediaDirectory, '.raw');
await fs.mkdir(rawDirectory, { recursive: true });
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
const ffprobe = process.env.FFPROBE_PATH || 'ffprobe';
execFileSync(ffmpeg, ['-version'], { stdio: 'ignore' });
execFileSync(ffprobe, ['-version'], { stdio: 'ignore' });
execFileSync(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'build'], { cwd: root, stdio: 'inherit' });

const port = await new Promise((resolve, reject) => {
  const server = net.createServer();
  server.on('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const selected = server.address().port;
    server.close(() => resolve(selected));
  });
});
const preview = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
  cwd: root, windowsHide: true, stdio: 'ignore',
});
const baseUrl = `http://127.0.0.1:${port}`;
let browser;
const checks = [];
const assets = [];

async function contextFor(viewport, recordVideo = false) {
  const context = await browser.newContext({
    viewport,
    locale: 'en-US',
    ...(recordVideo ? { recordVideo: { dir: rawDirectory, size: viewport } } : {}),
  });
  await context.addInitScript(() => localStorage.setItem('sidcloud-lang', 'en-US'));
  // The external decorative widget is excluded from documentation captures only.
  await context.route('**/live2d-widgets@*/**', route => route.abort());
  // Use native fallback fonts so a delayed third-party font never stalls a capture.
  await context.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => route.abort());
  return context;
}

async function open(page, route = '/') {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
  if (!response?.ok()) throw new Error(`Local route failed: ${route}`);
  await page.locator('footer a[href="https://github.com/wikigsroom"]').waitFor();
  await page.locator('main').waitFor();
  if (route === '/aitoolbox' || route === '/mybox') {
    await page.waitForFunction(() => document.querySelectorAll('main .glass-card').length > 0);
  }
  await page.evaluate(() => document.fonts.ready);
  await delay(650);
}

async function navigate(page, route) {
  await page.locator(`header a[href="${route}"]:visible`).first().click();
  await page.waitForURL(`${baseUrl}${route}`);
  await delay(650);
}

async function screenshot(page, filename, options = {}) {
  await page.screenshot({ path: path.join(mediaDirectory, filename), ...options });
  assets.push(filename);
}

async function settleFullPage(page) {
  await page.evaluate(async () => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.7) {
      window.scrollTo(0, y);
      await wait(140);
    }
    window.scrollTo(0, 0);
  });
  await delay(700);
}

async function scroll(page, top) {
  await page.evaluate(top => window.scrollTo({ top, behavior: 'smooth' }), top);
  await delay(1000);
}

function convertRecording(input, filename, gifFilename, gifWidth) {
  const destination = path.join(mediaDirectory, filename);
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input, '-an', '-c:v', 'libx264', '-crf', '24', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', destination]);
  assets.push(filename);
  const filter = `setpts=0.65*PTS,fps=10,scale=${gifWidth}:-2:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3:diff_mode=rectangle`;
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', '-i', destination, '-filter_complex', filter, '-loop', '0', path.join(mediaDirectory, gifFilename)]);
  assets.push(gifFilename);
}

try {
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    try { if ((await fetch(baseUrl)).ok) { ready = true; break; } } catch {}
    if (preview.exitCode !== null) throw new Error('The local preview process exited');
    await delay(250);
  }
  if (!ready) throw new Error('Local preview did not start');
  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}),
  });

  const desktop = await contextFor({ width: 1440, height: 960 });
  const page = await desktop.newPage();
  await open(page);
  await screenshot(page, 'home-desktop.png');
  await settleFullPage(page);
  await screenshot(page, 'home-full.png', { fullPage: true });
  await page.locator('footer').screenshot({ path: path.join(mediaDirectory, 'footer.png') });
  assets.push('footer.png');
  await page.getByRole('button', { name: '中文', exact: true }).click();
  await scroll(page, 0);
  await screenshot(page, 'home-zh-CN.png');
  await page.getByRole('button', { name: 'EN', exact: true }).click();

  for (const [route, filename] of [['/aitoolbox', 'ai-toolbox.png'], ['/mybox', 'my-box.png'], ['/devtoolbox', 'dev-toolbox.png']]) {
    await open(page, route);
    await screenshot(page, filename);
    checks.push({ route, cards: await page.locator('main .glass-card').count() });
  }
  await open(page, '/aitoolbox');
  await page.locator('input').fill('codex');
  await page.waitForFunction(() => document.querySelectorAll('main .glass-card').length === 1);
  await screenshot(page, 'ai-search.png');
  checks.push({ check: 'search codex', matches: await page.locator('main h3').allTextContents() });
  await page.locator('input').fill('no-such-tool-website-docs');
  await page.waitForFunction(() => document.querySelectorAll('main .glass-card').length === 0);
  checks.push({ check: 'unmatched search', cards: 0 });
  await open(page, '/route-not-found');
  await screenshot(page, 'not-found.png');
  await desktop.close();

  const mobile = await contextFor({ width: 390, height: 844 });
  const mobilePage = await mobile.newPage();
  await open(mobilePage);
  await mobilePage.getByRole('button', { name: '中文', exact: true }).click();
  await screenshot(mobilePage, 'home-mobile.png');
  checks.push({ check: 'mobile overflow', overflow: await mobilePage.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1) });
  await mobile.close();

  console.log('Screenshots captured. Recording the desktop walkthrough.');
  const recording = await contextFor({ width: 1280, height: 800 }, true);
  const tour = await recording.newPage();
  await open(tour);
  await delay(1100);
  await scroll(tour, 850);
  await delay(700);
  await tour.locator('footer').scrollIntoViewIfNeeded();
  await delay(1300);
  await navigate(tour, '/aitoolbox');
  await tour.locator('input').pressSequentially('codex', { delay: 110 });
  await delay(1400);
  await tour.locator('input').fill('');
  await tour.getByRole('button', { name: 'AI Assistant', exact: true }).click();
  await delay(1400);
  await tour.getByRole('button', { name: 'All', exact: true }).click();
  await navigate(tour, '/mybox');
  await tour.locator('input').pressSequentially('vmind', { delay: 110 });
  await delay(1300);
  await navigate(tour, '/devtoolbox');
  await delay(1100);
  await navigate(tour, '/');
  await tour.getByRole('button', { name: '中文', exact: true }).click();
  await delay(1600);
  const desktopRaw = await tour.video().path();
  await recording.close();
  convertRecording(desktopRaw, 'desktop-tour.mp4', 'website-tour.gif', 880);

  console.log('Desktop recording encoded. Recording the mobile walkthrough.');
  const mobileRecording = await contextFor({ width: 390, height: 844 }, true);
  const phone = await mobileRecording.newPage();
  await open(phone);
  await delay(1200);
  await scroll(phone, 950);
  await phone.locator('footer').scrollIntoViewIfNeeded();
  await delay(1600);
  await navigate(phone, '/aitoolbox');
  await phone.locator('input').pressSequentially('codex', { delay: 120 });
  await delay(1800);
  const mobileRaw = await phone.video().path();
  await mobileRecording.close();
  convertRecording(mobileRaw, 'mobile-tour.mp4', 'mobile-tour.gif', 312);

  const manifest = {
    capturedAt: new Date().toISOString(),
    sourceDigest: await sourceDigest(),
    capture: {
      source: 'local Vite production preview',
      desktopViewport: { width: 1440, height: 960 },
      mobileViewport: { width: 390, height: 844 },
      recording: 'real browser interactions; GIF playback accelerated to 0.65 of the original duration',
      externalLive2DWidget: 'blocked during documentation capture; application source unchanged',
      fonts: 'Google Fonts blocked during capture; CSS system-font fallback used',
      audio: 'none',
    },
    checks,
    assets: [],
  };
  for (const file of assets) {
    const target = path.join(mediaDirectory, file);
    const probe = JSON.parse(execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration:stream=codec_name,width,height', '-of', 'json', target], { encoding: 'utf8' }));
    manifest.assets.push({ file, bytes: (await fs.stat(target)).size, sha256: await sha256(target), width: probe.streams[0].width, height: probe.streams[0].height, ...(probe.format.duration ? { durationSeconds: Number(probe.format.duration) } : {}) });
  }
  await fs.writeFile(path.join(mediaDirectory, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ screenshots: assets.filter(file => file.endsWith('.png')).length, videos: 2, gifs: 2, assets: manifest.assets.map(({ file, bytes, durationSeconds }) => ({ file, bytes, durationSeconds })), checks }, null, 2));
} finally {
  try { await browser?.close(); } finally { preview.kill(); }
}
