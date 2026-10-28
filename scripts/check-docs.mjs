import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { root, mediaDirectory, filesIn, sha256, sourceDigest } from './lib.mjs';

const documentation = [
  ...['README.md', 'README.zh-CN.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'AGENTS.md'].map(file => path.join(root, file)),
  ...(await filesIn(path.join(root, 'docs'))).filter(file => file.endsWith('.md')),
];
let checkedLinks = 0;
for (const file of documentation) {
  const source = await fs.readFile(file, 'utf8');
  const matches = [...source.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g), ...source.matchAll(/(?:src|href)="([^"]+)"/g)];
  for (const match of matches) {
    const link = match[1].replace(/^<|>$/g, '').split(/\s+"/)[0];
    if (/^(https?:|mailto:|#)/.test(link)) continue;
    const pathname = decodeURIComponent(link.split('#')[0].split('?')[0]);
    if (!pathname) continue;
    const target = path.resolve(path.dirname(file), pathname);
    assert(target.startsWith(root + path.sep), `${file}: link escapes the repository: ${link}`);
    await fs.access(target).catch(() => { throw new Error(`${path.relative(root, file)}: missing local link ${link}`); });
    checkedLinks++;
  }
}

const manifest = JSON.parse(await fs.readFile(path.join(mediaDirectory, 'manifest.json'), 'utf8'));
assert.equal(manifest.sourceDigest, await sourceDigest(), 'UI source changed. Run npm run docs:media and commit refreshed media.');
assert(manifest.assets.some(asset => asset.file.endsWith('.gif')), 'An animated GIF is required');
assert(manifest.assets.some(asset => asset.file.endsWith('.mp4')), 'A walkthrough recording is required');
assert(manifest.assets.filter(asset => asset.file.endsWith('.png')).length >= 6, 'At least six page screenshots are required');
for (const asset of manifest.assets) {
  const file = path.resolve(mediaDirectory, asset.file);
  assert(file.startsWith(mediaDirectory + path.sep), 'Media path escapes docs/media');
  const stat = await fs.stat(file);
  assert(stat.size > 0 && stat.size < 25 * 1024 * 1024, `${asset.file} must be nonempty and smaller than 25 MiB`);
  assert.equal(stat.size, asset.bytes, `${asset.file}: size differs from the capture manifest`);
  assert.equal(await sha256(file), asset.sha256, `${asset.file}: content differs from the capture manifest`);
}
console.log(`Documentation passed: ${documentation.length} documents, ${checkedLinks} local links, ${manifest.assets.length} verified media assets.`);
