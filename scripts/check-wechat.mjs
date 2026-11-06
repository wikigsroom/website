import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ledger = JSON.parse(fs.readFileSync(path.join(root, 'src/data/wechatSources.json'), 'utf8'));
const { posts } = readContentModule(path.join(root, 'src/data/posts.ts'));
const actual = posts.filter((post) => post.wechatSource);
assert.equal(actual.length, ledger.articles.length);
assert.equal(new Set(ledger.articles.map((item) => item.url)).size, actual.length);
const hash = (filename) => crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
let figures = 0, videoReferences = 0, animations = 0;
for (const source of ledger.articles) {
  const batch = JSON.parse(fs.readFileSync(path.join(root, 'operations/wechat-batches', `${source.batch}.json`), 'utf8'));
  const config = batch.articles.find((item) => item.slug === source.slug);
  assert(config, `Missing source in reviewed batch: ${source.slug}`);
  assert.equal(config.url, source.url);
  const post = actual.find((item) => item.slug === source.slug);
  assert.equal(post.sourceUrl, config.url);
  assert.equal(new URL(post.sourceUrl).hostname, 'mp.weixin.qq.com');
  assert(source.title && source.account && source.sourcePublishedAt && source.textSha256);
  assert.equal(post.publishedAt, source.publishedAt);
  assert.equal(post.cover, source.cover.hero);
  assert.equal(source.cover.model, batch.model);
  assert.equal(source.cover.skill, 'sub2-image-gen');
  for (const variant of ['hero', 'card'])
    assert.equal(hash(path.join(root, 'public', source.cover[variant])), source.cover[`${variant}Sha256`]);
  assert.equal(hash(path.join(root, source.cover.source)), source.cover.sourceSha256);
  assert.equal(hash(path.join(root, source.cover.prompt)), source.cover.promptSha256);
  assert(post.coverCaption.includes(batch.model));
  assert.equal(post.content.filter((block) => block.type === 'takeaways').length, 1);
  const headings = post.content.filter((block) => block.type === 'h2').map((block) => block.id);
  assert(headings.length >= 5 && new Set(headings).size === headings.length);
  assert(post.content.some((block) => block.type === 'table'));
  for (const block of post.content.filter((item) => item.type === 'link' && item.href.startsWith('#/post/')))
    assert(posts.some((item) => item.slug === block.href.slice('#/post/'.length)),
      `Missing related article: ${block.href}`);
  const narrative = post.content.filter((block) => block.type === 'p').map((block) => block.text).join('');
  assert(narrative.length >= 400, `Review narrative depth: ${post.slug}`);
  for (const material of source.materials) {
    assert.equal(hash(path.join(root, 'public', material.src)), material.sha256);
    assert(material.caption && material.width > 300 && material.height > 100);
    assert.equal(new URL(material.originalUrl).hostname, 'mmbiz.qpic.cn');
    const block = post.content.find((item) => item.type === 'video-reference'
      ? item.poster === material.src : item.type === 'image' && item.src === material.src);
    assert(block, `Source material not used in article: ${material.id}`);
    if (material.kind === 'video-reference') {
      assert.equal(block.href, source.url);
      assert(source.videos.some((item) => item.id === material.videoId));
      videoReferences++;
    } else {
      assert.equal(block.sourceUrl, material.originalUrl);
      assert.equal(block.sourcePage, source.url);
    }
    if (material.frames > 1) animations++;
    figures++;
  }
  assert.equal(source.videos.length, source.materials.filter((item) => item.kind === 'video-reference').length,
    `Retain a preview and original link for each source video: ${source.slug}`);
}
assert.equal(actual.length, Object.keys(readContentModule(path.join(root, 'src/data/wechatEditorial.ts')).wechatEditorial).length);
console.log(`WeChat content passed: ${actual.length} articles, ${figures} attributed figures, ${videoReferences} original video links, ${animations} animations, generated covers and prompts verified.`);
