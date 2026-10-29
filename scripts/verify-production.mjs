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
    { headers: { Authorization: `Bearer ${auth.token}` }, signal: AbortSignal.timeout(45000) },
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
    report.checks.push({ check: 'production asset matches verified build', asset, passed: true });
  }

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
  await page.goto(`${metadata.productionUrl}/#/benchmark`, { waitUntil: 'domcontentloaded' });
  assert.equal((await page.locator('.section-head > p').innerText()).trim(), '46 篇匹配');
  for (const round of snapshot.rounds) {
    await page.goto(`${metadata.productionUrl}/#/post/benchmark-${round.id}`, {
      waitUntil: 'domcontentloaded',
    });
    await page.locator(`.batch-results[data-round-id="${round.id}"]`).waitFor();
    assert.equal(await page.locator('h1').textContent(), benchmarkEditorial[round.id].title);
    assert.equal(await page.locator('.article-takeaways li').count(), 3);
    assert.equal(await page.locator('.batch-case').count(), round.caseIds.length);
    report.checks.push({
      check: 'published headline, narrative and evidence',
      roundId: round.id,
      records: round.caseIds.length,
      passed: true,
    });
  }
  await page.goto(`${metadata.productionUrl}/#/post/benchmark-r4090-community-complete-20261029`);
  await page
    .locator('h1')
    .filter({ hasText: benchmarkEditorial['r4090-community-complete-20261029'].title })
    .waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({
    path: path.join(root, 'docs/media/benchmark-20261029/production-article-desktop.png'),
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
    path.join(root, 'docs/releases/2026-10-29-editorial-production.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
}
console.log(
  `Production verified: ${report.deployment.id}, all 46 rewritten articles, exact build assets, browser closed; default account files unchanged.`,
);
