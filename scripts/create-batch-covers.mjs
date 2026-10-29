import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshot = JSON.parse(
  await fs.readFile(path.join(root, 'src/data/benchmarkIndex.json'), 'utf8'),
);
const directory = path.join(root, 'public/assets/batch-covers');
await fs.mkdir(directory, { recursive: true });
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char],
  );
const cover = (title, date, device, count, subtitle) => {
  const chars = Array.from(title);
  const lines = Array.from({ length: Math.min(3, Math.ceil(chars.length / 22)) }, (_, i) =>
    chars.slice(i * 22, (i + 1) * 22).join(''),
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="700" viewBox="0 0 1120 700"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#101c2c"/><stop offset="1" stop-color="#171326"/></linearGradient><pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#78d4ff" stroke-opacity=".07"/></pattern></defs><rect width="1120" height="700" fill="url(#bg)"/><rect width="1120" height="700" fill="url(#grid)"/><path d="M64 76h72" stroke="#78d4ff" stroke-width="5"/><text x="64" y="120" fill="#78d4ff" font-size="18" letter-spacing="5" font-family="system-ui,sans-serif">SIDCLOUD NOTES / ${escape(device)}</text>${lines.map((line, i) => `<text x="64" y="${220 + i * 66}" fill="#f2f4fb" font-size="42" font-weight="600" font-family="system-ui,'Microsoft YaHei',sans-serif">${escape(line)}</text>`).join('')}<path d="M64 470h992" stroke="#ffffff" stroke-opacity=".14"/><text x="64" y="532" fill="#f7a2d3" font-size="22" font-family="system-ui,sans-serif">${escape(date)}</text><text x="64" y="585" fill="#b2b9cb" font-size="20" font-family="system-ui,'Microsoft YaHei',sans-serif">${escape(subtitle)}</text><text x="1056" y="550" text-anchor="end" fill="#d7f9a7" font-size="58" font-family="system-ui,sans-serif">${escape(count)}</text><text x="1056" y="592" text-anchor="end" fill="#b2b9cb" font-size="18" font-family="system-ui,sans-serif">RECORDS / NOTES</text></svg>\n`;
};
for (const round of snapshot.rounds)
  await fs.writeFile(
    path.join(directory, `${round.id}.svg`),
    cover(
      round.title,
      round.date,
      `BATCH · ${round.device}`,
      round.caseIds.length,
      `${round.type} · Benchmark ${snapshot.version}`,
    ),
  );
const { researchPosts } = readContentModule(path.join(root, 'src/data/researchPosts.ts'));
for (const slug of [
  'wechat-image-generation-world-models',
  'subforge-subtitle-research-pipeline',
]) {
  const post = researchPosts.find((item) => item.slug === slug);
  await fs.writeFile(
    path.join(directory, `${slug}.svg`),
    cover(post.title, post.date, 'RESEARCH', 'R', post.category),
  );
}
console.log(
  `Created ${snapshot.rounds.length} batch covers and 2 missing research covers as local SVG assets.`,
);
