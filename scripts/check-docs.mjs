import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sources = JSON.parse(await fs.readFile(path.join(root, 'src/data/wechatSources.json'), 'utf8'));
const directory = path.join(root, 'docs/media/benchmark-20261029');
const report = JSON.parse(await fs.readFile(path.join(directory, 'verification.json'), 'utf8'));
assert(
  report.passed && report.browserClosed && report.previewClosed,
  'Browser verification must pass and release its resources',
);
const batches = report.checks.filter(
  (check) => check.check === 'batch article and all expanded records',
);
assert.equal(batches.length, 46);
assert.equal(
  batches.reduce((sum, check) => sum + check.records, 0),
  770,
);
async function verifyEvidence(item, mediaDirectory) {
  assert(item.passed && item.browserClosed && item.previewClosed,
    'Browser verification must pass and release its resources');
  const digest = crypto.createHash('sha256');
  for (const filename of item.evidenceFiles)
    digest.update(filename).update(filename.endsWith('.webp')
      ? await fs.readFile(path.join(root, filename))
      : (await fs.readFile(path.join(root, filename), 'utf8')).replaceAll('\r\n', '\n'));
  assert.equal(digest.digest('hex'), item.implementationSha256,
    'Content/UI changed: refresh documentation media and verification');
  for (const filename of item.assets)
    assert((await fs.stat(path.join(mediaDirectory, filename))).size > 0, `Missing media ${filename}`);
}
await verifyEvidence(report, directory);
const readingDirectory = path.join(root, 'docs/media', `wechat-${sources.latestBatch.replaceAll('-', '')}`);
const readingReport = JSON.parse(await fs.readFile(path.join(readingDirectory, 'verification.json'), 'utf8'));
await verifyEvidence(readingReport, readingDirectory);
const readingChecks = readingReport.checks.filter((item) => item.check === 'article, cover, attribution and all source figures');
const currentSources = sources.articles.filter((item) => item.batch === sources.latestBatch);
assert.equal(readingReport.batch, sources.latestBatch);
assert.deepEqual(readingChecks.map((item) => item.slug).sort(), currentSources.map((item) => item.slug).sort());
assert.equal(readingChecks.reduce((sum, item) => sum + item.figures, 0),
  currentSources.reduce((sum, item) => sum + item.materials.length, 0));
for (const filename of [
  'README.md',
  'README.zh-CN.md',
  'docs/benchmark-batches.md',
  'docs/benchmark-materials.md',
  'docs/benchmark-visuals.md',
  'output/imagegen/README.md',
  'docs/releases/2026-10-29-benchmark-batches.md',
  'docs/releases/2026-10-29-editorial-refresh.md',
  'docs/releases/2026-10-30-visual-refresh.md',
  'docs/wechat-reading.md',
  `docs/releases/${sources.latestBatch}-wechat-reading.md`,
  ...sources.articles.map((item) => `docs/readings/${item.slug}.md`),
  'docs/media/README.md',
]) {
  const text = await fs.readFile(path.join(root, filename), 'utf8');
  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^\s)]+)\)/g)) {
    const target = match[1];
    if (target.startsWith('https:') || target.startsWith('#')) continue;
    await fs.access(
      path.resolve(root, path.dirname(filename), decodeURIComponent(target.split('#')[0])),
    );
  }
}
console.log(
  `Documentation passed: ${report.assets.length + readingReport.assets.length} media files, 46 batch journals and ${readingChecks.length} current readings; implementation digests and local links match.`,
);
