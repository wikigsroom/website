import { execFile } from 'node:child_process';
import { mkdir, readdir, stat } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const sourceDir = join(rootDir, 'public', 'assets', 'generated-covers');
const outputRoot = join(sourceDir, 'optimized');

const targets = [
  { name: 'card', width: 640, quality: 74 },
  { name: 'hero', width: 1120, quality: 78 },
];

const sourceFiles = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && ['.png', '.jpg', '.jpeg'].includes(extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

if (!sourceFiles.length) {
  console.log('No generated cover images found.');
  process.exit(0);
}

for (const target of targets) {
  const outputDir = join(outputRoot, target.name);
  await mkdir(outputDir, { recursive: true });

  for (const sourceFile of sourceFiles) {
    const sourcePath = join(sourceDir, sourceFile);
    const outputPath = join(outputDir, `${basename(sourceFile, extname(sourceFile))}.webp`);

    await execFileAsync('ffmpeg', [
      '-hide_banner',
      '-loglevel',
      'error',
      '-nostdin',
      '-y',
      '-i',
      sourcePath,
      '-vf',
      `scale='min(${target.width},iw)':-2`,
      '-c:v',
      'libwebp',
      '-quality',
      String(target.quality),
      '-compression_level',
      '6',
      outputPath,
    ]);
  }
}

const summaries = await Promise.all(
  targets.map(async (target) => {
    const outputDir = join(outputRoot, target.name);
    const files = await readdir(outputDir);
    const bytes = (
      await Promise.all(files.filter((file) => file.endsWith('.webp')).map((file) => stat(join(outputDir, file))))
    ).reduce((sum, fileStat) => sum + fileStat.size, 0);

    return `${target.name}: ${files.length} files, ${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }),
);

console.log(`Optimized ${sourceFiles.length} cover images.`);
console.log(summaries.join('\n'));
