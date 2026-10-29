/* global document, window */
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const metadata = JSON.parse(
  await fs.readFile(path.join(root, 'operations/vercel-project.json'), 'utf8'),
);
const argument = process.argv.indexOf('--deployment');
const deploymentArgument = argument >= 0 ? process.argv[argument + 1] : process.argv[2];
assert(deploymentArgument, 'Pass a Vercel deployment hostname or URL');
const hostname = new URL(`https://${deploymentArgument.replace(/^https?:\/\//, '')}`).hostname;
const { benchmarkEditorial } = readContentModule(path.join(root, 'src/data/benchmarkEditorial.ts'));
const snapshot = JSON.parse(
  await fs.readFile(path.join(root, 'src/data/benchmarkIndex.json'), 'utf8'),
);
const visuals = JSON.parse(
  await fs.readFile(path.join(root, 'src/data/benchmarkVisuals.json'), 'utf8'),
);
const report = {
  url: metadata.productionUrl,
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
    windowsHide: true,
  }).trim(),
  snapshotSha256: snapshot.sourceSha256,
  checkedAt: new Date().toISOString(),
  checks: [],
  browserClosed: false,
};
let browser;

try {
  // Read the isolated credential only in memory. Never emit or persist its value.
  assert(process.env.LOCALAPPDATA, 'Run from the authorized native Windows workspace');
  const auth = JSON.parse(
    (
      await fs.readFile(
        path.join(process.env.LOCALAPPDATA, 'sidcloud/vercel-profile/auth.json'),
        'utf8',
      )
    ).replace(/^\uFEFF/, ''),
  );
  assert(typeof auth.token === 'string' && auth.token.length > 0, 'Isolated login missing');
  const deploymentResponse = await fetch(
    `https://api.vercel.com/v13/deployments/${encodeURIComponent(hostname)}?teamId=${metadata.teamId}`,
    {
      headers: { Authorization: `Bearer ${auth.token}` },
      signal: AbortSignal.timeout(45000),
    },
  );
  assert(deploymentResponse.ok, `Deployment metadata HTTP ${deploymentResponse.status}`);
  const deployment = await deploymentResponse.json();
  assert.equal(deployment.readyState, 'READY');
  assert.equal(deployment.target, 'production');
  assert.equal(deployment.projectId || deployment.project?.id, metadata.projectId);
  assert(
    deployment.alias.includes(new URL(metadata.productionUrl).hostname),
    'Custom blog domain is not assigned to this release',
  );
  report.deployment = {
    id: deployment.id,
    url: deployment.url,
    projectId: deployment.projectId || deployment.project.id,
    state: deployment.readyState,
    target: deployment.target,
    aliases: deployment.alias,
  };

  const response = await fetch(metadata.productionUrl, {
    cache: 'no-store',
    signal: AbortSignal.timeout(45000),
  });
  assert.equal(response.status, 200);
  const html = await response.text();
  const localHtml = await fs.readFile(path.join(root, 'dist/index.html'), 'utf8');
  const assets = (text) =>
    [...text.matchAll(/(?:src|href)="(\/assets\/[^"]+\.(?:js|css))"/g)]
      .map((match) => match[1])
      .sort();
  assert.deepEqual(assets(html), assets(localHtml), 'Production is serving a different build');
  for (const asset of assets(localHtml)) {
    const remote = await fetch(new URL(asset, metadata.productionUrl), {
      signal: AbortSignal.timeout(45000),
    });
    assert(remote.ok, `Production asset HTTP ${remote.status}`);
    const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');
    assert.equal(
      hash(Buffer.from(await remote.arrayBuffer())),
      hash(await fs.readFile(path.join(root, 'dist', asset))),
    );
    report.checks.push({
      check: 'production asset matches verified build',
      asset,
      passed: true,
    });
  }

  const visualPaths = new Set();
  for (const entry of Object.values(visuals.rounds)) {
    visualPaths.add(entry.cover.hero);
    visualPaths.add(entry.cover.card);
    for (const figure of entry.gallery) {
      visualPaths.add(figure.src);
      if (figure.poster) visualPaths.add(figure.poster);
    }
  }
  for (const cover of Object.values(visuals.research)) {
    visualPaths.add(cover.hero);
    visualPaths.add(cover.card);
  }
  const imagePaths = [...visualPaths].sort();
  const imageHash = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
  for (let offset = 0; offset < imagePaths.length; offset += 8) {
    await Promise.all(
      imagePaths.slice(offset, offset + 8).map(async (asset) => {
        const remote = await fetch(new URL(asset, metadata.productionUrl), {
          signal: AbortSignal.timeout(45000),
        });
        assert(remote.ok, `Production image HTTP ${remote.status}: ${asset}`);
        assert.equal(
          imageHash(Buffer.from(await remote.arrayBuffer())),
          imageHash(await fs.readFile(path.join(root, 'public', asset))),
          `Production image differs: ${asset}`,
        );
      }),
    );
  }
  report.visualAssetsChecked = imagePaths.length;
  report.checks.push({
    check: 'production image bytes match verified visual derivatives',
    files: imagePaths.length,
    passed: true,
  });

  browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : { channel: 'chrome' }),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 960 },
    locale: 'zh-CN',
  });
  await context.route(/https:\/\/fonts\.(googleapis|gstatic)\.com\//, (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${metadata.productionUrl}/#/benchmark`, {
    waitUntil: 'domcontentloaded',
  });
  assert.equal((await page.locator('.section-head > p').innerText()).trim(), '46 篇匹配');
  for (const round of snapshot.rounds) {
    await page.goto(`${metadata.productionUrl}/#/post/benchmark-${round.id}`, {
      waitUntil: 'domcontentloaded',
    });
    await page.locator(`.batch-results[data-round-id="${round.id}"]`).waitFor();
    assert.equal(await page.locator('h1').textContent(), benchmarkEditorial[round.id].title);
    assert.equal(await page.locator('.article-takeaways li').count(), 3);
    assert.equal(await page.locator('.batch-case').count(), round.caseIds.length);
    const cover = page.locator('.article-cover img');
    await cover.scrollIntoViewIfNeeded();
    await cover.evaluate((image) => image.decode());
    assert.equal(await cover.getAttribute('src'), visuals.rounds[round.id].cover.hero);
    const figures = page.locator('.benchmark-gallery .experiment-figure img');
    assert.equal(await figures.count(), visuals.rounds[round.id].gallery.length);
    for (const image of await figures.all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((item) => item.decode());
      assert(await image.evaluate((item) => item.naturalWidth >= 300));
    }
    report.checks.push({
      check: 'published headline, raster cover, figures and evidence',
      roundId: round.id,
      records: round.caseIds.length,
      figures: await figures.count(),
      passed: true,
    });
  }
  await page.goto(`${metadata.productionUrl}/#/post/benchmark-r4090-community-complete-20261029`);
  await page
    .locator('h1')
    .filter({
      hasText: benchmarkEditorial['r4090-community-complete-20261029'].title,
    })
    .waitFor();
  await page.locator('.article-cover img').evaluate((image) => image.decode());
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({
    path: path.join(root, 'docs/media/benchmark-20261029/production-visual-article-desktop.png'),
  });
  assert.deepEqual(errors, []);
  const baseline = JSON.parse(
    (
      await fs.readFile(path.join(root, '.vercel/default-account-before-deploy.json'), 'utf8')
    ).replace(/^\uFEFF/, ''),
  );
  for (const item of baseline)
    assert.equal(
      crypto
        .createHash('sha256')
        .update(await fs.readFile(item.path))
        .digest('hex')
        .toUpperCase(),
      item.hash,
      'Default account file changed',
    );
  report.defaultAccountFilesChecked = baseline.length;
  report.defaultAccountFilesUnchanged = true;
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
  await fs.writeFile(
    path.join(root, 'docs/releases/2026-10-30-visual-production.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
}
console.log(
  `Production verified: ${report.deployment.id}, all 46 illustrated articles, exact build assets, browser closed; default account files unchanged.`,
);
