import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'src/data/benchmarkSnapshot.json'), 'utf8'),
);
const index = JSON.parse(fs.readFileSync(path.join(root, 'src/data/benchmarkIndex.json'), 'utf8'));
const { posts } = readContentModule(path.join(root, 'src/data/posts.ts'));
const batches = posts.filter((post) => post.section === 'Benchmark');
assert.equal(data.version, index.version);
assert.equal(data.sourceSha256, index.sourceSha256);
assert.equal(batches.length, data.rounds.length);
assert.equal(data.rounds.length, 46, 'Review expected batch count before accepting a new snapshot');
assert.equal(data.cases.length, 681, 'Review expected case count before accepting a new snapshot');
assert.equal(posts.length, 70);
assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length);
const byId = new Map(data.cases.map((item) => [item.id, item]));
assert.equal(byId.size, data.cases.length);
const assigned = new Set();
let references = 0,
  owned = 0;
for (const round of data.rounds) {
  const article = batches.find((post) => post.benchmarkRoundId === round.id);
  assert(article, `Missing batch article ${round.id}`);
  assert.equal(article.date, round.date);
  assert.equal(article.content.filter((block) => block.type === 'benchmark-results').length, 1);
  assert(
    article.content.some(
      (block) => block.type === 'benchmark-results' && block.roundId === round.id,
    ),
  );
  assert(
    article.content
      .filter((block) => block.type === 'p')
      .map((block) => block.text)
      .join('').length > 250,
    `Missing narrative ${round.id}`,
  );
  const headings = article.content.filter((block) => block.type === 'h2').map((block) => block.id);
  assert.equal(new Set(headings).size, headings.length);
  assert.equal(new Set(round.caseIds).size, round.caseIds.length);
  for (const id of round.caseIds) {
    const item = byId.get(id);
    assert(item, `Missing record ${id}`);
    assigned.add(id);
    if (item.round === round.id) owned++;
    else references++;
  }
}
assert.equal(assigned.size, 681, 'Batch articles must cover every unique record');
assert.equal(owned, 681, 'Every record must have exactly one owning round');
assert.equal(references, 89, 'Cross-batch reviews must not be counted as new executions');
for (const item of data.cases) {
  for (const key of ['inputs', 'metrics', 'media', 'links', 'limitations', 'reportIds'])
    assert(Array.isArray(item[key]), `Invalid ${key} in ${item.id}`);
  for (const asset of [
    ...item.media,
    ...item.links,
    ...item.inputs.filter((input) => input.media).map((input) => ({ url: input.media })),
  ]) {
    assert.equal(new URL(asset.url).origin, 'https://benchmark.sidcloud.cn');
    assert(!asset.url.includes('file:'));
  }
}
for (const post of posts) {
  const cover = post.cover.startsWith('/assets/generated-covers/')
    ? post.cover
        .replace('/generated-covers/', '/generated-covers/optimized/card/')
        .replace(/\.[^.]+$/, '.webp')
    : post.cover;
  assert(fs.existsSync(path.join(root, 'public', cover)), `Missing cover ${post.slug}`);
  for (const block of post.content)
    if (block.type === 'link' && block.href.startsWith('#/post/'))
      assert(
        posts.some((target) => `#/post/${target.slug}` === block.href),
        `Broken article link ${block.href}`,
      );
}
const snapshotText = fs.readFileSync(path.join(root, 'src/data/benchmarkSnapshot.json'), 'utf8');
assert(
  !/\b[A-Z]:\\\\|192\.168\.\d+\.\d+|Bearer\s+[A-Za-z0-9_-]{12}/i.test(snapshotText),
  'Private paths in exported evidence',
);
console.log(
  `Benchmark content passed: ${batches.length} batches, ${assigned.size} unique cases, ${references} explicit cross-batch references, ${posts.length} total articles, all covers and internal links present.`,
);
