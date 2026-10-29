import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const mediaDirectory = path.join(root, 'docs', 'media');

export async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const groups = await Promise.all(entries.map(entry => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(target) : [target];
  }));
  return groups.flat().sort();
}

export async function sha256(file) {
  return createHash('sha256').update(await fs.readFile(file)).digest('hex');
}

export async function sourceDigest() {
  const publicDirectory = path.join(root, 'public');
  // Root-level hexadecimal .txt verification files do not affect the rendered UI.
  const publicFiles = (await filesIn(publicDirectory)).filter(file =>
    !/^[a-f0-9]{32}\.txt$/i.test(path.relative(publicDirectory, file)));
  const files = [
    ...await filesIn(path.join(root, 'src')),
    ...publicFiles,
    ...['index.html', 'tailwind.config.ts', 'vite.config.ts'].map(file => path.join(root, file)),
  ].sort();
  const hash = createHash('sha256');
  for (const file of files) {
    hash.update(path.relative(root, file).replaceAll(path.sep, '/'));
    hash.update('\0');
    const contents = await fs.readFile(file);
    const extension = path.extname(file);
    hash.update(['.ts', '.tsx', '.css', '.html', '.json'].includes(extension)
      ? contents.toString('utf8').replaceAll('\r\n', '\n') : contents);
    hash.update('\0');
  }
  return hash.digest('hex');
}
