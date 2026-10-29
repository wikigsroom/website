import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const option = process.argv.indexOf('--publication');
const argument = option >= 0 ? process.argv[option + 1] : process.argv[2];
assert(
  argument && !argument.startsWith('--'),
  'Usage: npm run benchmark:link -- "<frozen release directory>"',
);
const publication = path.resolve(argument);
const source = path.join(publication, '.vercel/output/static/archive');
assert((await fs.stat(source)).isDirectory(), 'Publication archive not found');
const directory = path.join(root, '.vercel/benchmark-source');
await fs.mkdir(directory, { recursive: true });
const destination = path.join(directory, 'archive');
try {
  const existing = await fs.lstat(destination);
  assert(
    existing.isSymbolicLink(),
    'Existing destination is not a link; inspect it before changing anything',
  );
  assert.equal(
    await fs.realpath(destination),
    await fs.realpath(source),
    'Existing link points elsewhere; inspect it first',
  );
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  await fs.symlink(source, destination, process.platform === 'win32' ? 'junction' : 'dir');
}
await fs.writeFile(
  path.join(directory, 'profile.json'),
  JSON.stringify(
    {
      source,
      mode: process.platform === 'win32' ? 'junction' : 'symlink',
      publicBase: 'https://benchmark.sidcloud.cn/',
      purpose: 'Local browsing only; not in public/, Git or deployment.',
    },
    null,
    2,
  ) + '\n',
);
console.log(`Local ${process.platform === 'win32' ? 'junction' : 'symlink'} ready: ${destination}`);
console.log(
  'The blog continues to reference public HTTPS assets; this local link is excluded from Git and builds.',
);
