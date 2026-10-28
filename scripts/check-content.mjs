import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { root } from './lib.mjs';

const warnings = [];
const locales = ['en-US', 'zh-CN'];

function text(value, location) {
  if (typeof value === 'string') {
    assert(value.trim(), `${location} must not be empty`);
    return;
  }
  assert(value && typeof value === 'object', `${location} must contain localized text`);
  for (const locale of locales) {
    assert(typeof value[locale] === 'string' && value[locale].trim(), `${location}.${locale} is missing`);
    if (/\?{3,}|\uFFFD/.test(value[locale])) warnings.push(`${location}.${locale}: inherited text needs editorial repair`);
  }
}

function httpUrl(value, location) {
  const url = new URL(value);
  assert(['https:', 'http:'].includes(url.protocol), `${location} must use HTTP(S)`);
}

for (const filename of ['main.json', 'myapp.json']) {
  const items = JSON.parse(await fs.readFile(path.join(root, 'public', filename), 'utf8'));
  assert(Array.isArray(items) && items.length, `${filename} must be a nonempty array`);
  const ids = new Set();
  const categories = new Set();
  for (const item of items) {
    const location = `${filename}:${item.id}`;
    assert(typeof item.id === 'string' && /^[a-z0-9-]+$/.test(item.id), `${location} has an invalid ID`);
    assert(!ids.has(item.id), `${location} duplicates an ID`);
    ids.add(item.id);
    for (const field of ['name', 'vendor', 'description']) text(item[field], `${location}.${field}`);
    assert(item.category, `${location}.category is missing`);
    if (typeof item.category === 'string') categories.add(item.category);
    else {
      assert(item.category.id, `${location}.category.id is missing`);
      categories.add(item.category.id);
      text(item.category.label, `${location}.category.label`);
    }
    httpUrl(item.website, `${location}.website`);
    assert(Array.isArray(item.tags), `${location}.tags must be an array`);
    for (const tag of item.tags) {
      if (typeof tag === 'string') text(tag, `${location}.tag`);
      else {
        assert(tag.id, `${location}.tag.id is missing`);
        text(tag.label, `${location}.tag.label`);
      }
    }
    for (const source of item.sources || []) httpUrl(source, `${location}.source`);
  }
  console.log(`${filename}: ${items.length} unique entries, ${categories.size} categories`);
}

const assetSource = await fs.readFile(path.join(root, 'src/data/assets.ts'), 'utf8');
for (const match of assetSource.matchAll(/src:\s*'\/([^']+)'/g)) {
  await fs.access(path.join(root, 'public', match[1]));
}
const site = await fs.readFile(path.join(root, 'src/data/site.ts'), 'utf8');
assert(site.includes('https://github.com/wikigsroom'), 'The current repository link is missing');
const configuration = JSON.parse(await fs.readFile(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(configuration.framework, 'vite');
assert.equal(configuration.outputDirectory, 'dist');
console.log(`Assets and Vercel output configuration are valid. ${warnings.length} inherited localization warnings.`);
if (warnings.length) console.log(`Known limitation, documented in docs: ${warnings.slice(0, 5).join('; ')}`);
