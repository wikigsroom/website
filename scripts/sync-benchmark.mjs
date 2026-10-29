import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceUrl = 'https://benchmark.sidcloud.cn/api/catalog';
const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(45000) });
assert(response.ok, `Benchmark returned HTTP ${response.status}`);
const bytes = Buffer.from(await response.arrayBuffer());
const catalog = JSON.parse(bytes.toString('utf8'));
const mediaUrl = (value) => {
  const url = new URL(value, sourceUrl);
  // Catalog assets are relative to the site root, not to /api/.
  const normalized = new URL(value, 'https://benchmark.sidcloud.cn/');
  assert.equal(normalized.origin, 'https://benchmark.sidcloud.cn');
  assert(url.protocol === 'https:');
  return normalized.href;
};
const pick = (value, keys) =>
  Object.fromEntries(
    keys.filter((key) => value[key] !== undefined).map((key) => [key, value[key]]),
  );
assert.equal(new Set(catalog.cases.map((item) => item.id)).size, catalog.cases.length);
const ids = new Set(catalog.cases.map((item) => item.id));
for (const round of catalog.rounds) {
  assert.equal(round.caseIds.length, new Set(round.caseIds).size, `Duplicate case in ${round.id}`);
  assert(
    round.caseIds.every((id) => ids.has(id)),
    `Unknown case in ${round.id}`,
  );
}
const covered = new Set(catalog.rounds.flatMap((round) => round.caseIds));
assert.equal(covered.size, catalog.cases.length, 'Every case must have a round');
const snapshot = {
  version: catalog.version,
  snapshotDate: catalog.snapshotDate,
  sourceUrl,
  sourceSha256: crypto.createHash('sha256').update(bytes).digest('hex'),
  categories: catalog.categories.map((item) => pick(item, ['id', 'title'])),
  rounds: catalog.rounds.map((item) =>
    pick(item, ['id', 'date', 'title', 'device', 'type', 'summary', 'changes', 'caseIds']),
  ),
  cases: catalog.cases.map((item) => ({
    ...pick(item, [
      'id',
      'title',
      'model',
      'mode',
      'category',
      'device',
      'round',
      'summary',
      'status',
      'generated',
      'measurementKind',
      'seconds',
      'duration',
      'timingScope',
      'limitations',
      'metrics',
      'verification',
      'textResult',
      'parameters',
      'reportIds',
    ]),
    inputs: item.inputs.map((input) => ({
      ...pick(input, ['label', 'description']),
      ...(input.media ? { media: mediaUrl(input.media) } : {}),
    })),
    media: item.media.map((media) => ({
      ...pick(media, ['type', 'label']),
      url: mediaUrl(media.url),
      ...(media.poster ? { poster: mediaUrl(media.poster) } : {}),
    })),
    links: item.links.map((link) => ({
      ...pick(link, ['label', 'kind']),
      url: mediaUrl(link.url),
    })),
  })),
  reports: catalog.reports.map((item) => pick(item, ['id', 'title', 'date', 'description'])),
};
const serialized =
  JSON.stringify(
    snapshot,
    (_key, value) =>
      typeof value === 'string'
        ? value
            .replace(/\b[A-Z]:[\\/][^\s"<>，。；、）)]*/gi, '[本机路径]')
            .replace(/192\.168\.\d+\.\d+/g, '[内部设备地址]')
        : value,
    2,
  ) + '\n';
assert(
  !/\b[A-Z]:\\\\|192\.168\.\d+\.\d+|Bearer\s+[A-Za-z0-9_-]{12}/i.test(serialized),
  'Private machine paths or credentials in public export',
);
const destination = path.join(root, 'src/data/benchmarkSnapshot.json');
await fs.writeFile(destination, serialized);
const index = JSON.parse(serialized);
index.cases = index.cases.map((item) =>
  pick(
    item,
    Object.keys(item).filter(
      (key) =>
        !['inputs', 'metrics', 'verification', 'textResult', 'parameters', 'links'].includes(key),
    ),
  ),
);
await fs.writeFile(
  path.join(root, 'src/data/benchmarkIndex.json'),
  JSON.stringify(index, null, 2) + '\n',
);
console.log(
  `Pinned Benchmark ${snapshot.version}: ${snapshot.rounds.length} batches, ${snapshot.cases.length} unique cases, ${Buffer.byteLength(serialized)} bytes.`,
);
