import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshot = JSON.parse(
  await fs.readFile(path.join(root, 'src/data/benchmarkIndex.json'), 'utf8'),
);
const { benchmarkEditorial } = readContentModule(path.join(root, 'src/data/benchmarkEditorial.ts'));
const directory = path.join(root, 'public/assets/batch-covers');
await fs.mkdir(directory, { recursive: true });
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char],
  );
const wrap = (text, width) => {
  const lines = [];
  let line = '',
    length = 0;
  for (const char of text) {
    const size = char.codePointAt(0) <= 127 ? 0.55 : 1;
    if (length + size > width && line) {
      lines.push(line.trim());
      line = '';
      length = 0;
    }
    line += char;
    length += size;
  }
  if (line) lines.push(line.trim());
  return lines;
};
const glyph = (topic) => {
  if (/语音|配音|音乐/.test(topic))
    return Array.from({ length: 26 }, (_, i) => {
      const h = 12 + (Math.sin(i * 1.7) + 1) * 33;
      return `<path d="M${785 + i * 10} ${148 - h / 2}v${h}"/>`;
    }).join('');
  if (/三维/.test(topic))
    return '<path d="M870 78l110 60v94l-110 60-110-60v-94zM760 138l110 60 110-60M870 198v94M870 78v120M815 108l110 61v93M925 108l-110 61v93"/>';
  if (/语言|方法/.test(topic))
    return '<path d="M780 106h240M780 136h160M780 166h210M780 196h120M780 226h180"/>';
  return '<rect x="785" y="92" width="245" height="150" rx="12"/><path d="M810 112h25m-25 0v25M1005 112h-25m25 0v25M810 222h25m-25 0v-25M1005 222h-25m25 0v-25M885 135l48 32-48 32z"/>';
};
const cover = (title, subtitle, topic, date, device, count) => {
  const titleLines = wrap(title, 18);
  if (titleLines.length > 3) throw new Error(`Cover title too long: ${title}`);
  const subtitleLines = wrap(subtitle, 34);
  const accent = /音乐|语音|配音/.test(topic) ? '#f7a2d3' : '#78d4ff';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1120" height="700" viewBox="0 0 1120 700"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#172839"/><stop offset="1" stop-color="#101622"/></linearGradient></defs><rect width="1120" height="700" fill="url(#bg)"/><g fill="none" stroke="${accent}" stroke-width="2" opacity=".18">${glyph(topic)}</g><path d="M72 112h40" stroke="${accent}" stroke-width="3"/><text x="130" y="119" fill="${accent}" font-size="23" font-family="system-ui,'Microsoft YaHei',sans-serif">${escape(topic)} / 实验手记</text>${titleLines.map((line, i) => `<text x="72" y="${216 + i * 76}" fill="#f2f4fb" font-size="52" font-weight="700" font-family="'Microsoft YaHei',system-ui,sans-serif">${escape(line)}</text>`).join('')}${subtitleLines.map((line, i) => `<text x="72" y="${456 + i * 40}" fill="#b7c4d4" font-size="25" font-family="'Microsoft YaHei',system-ui,sans-serif">${escape(line)}</text>`).join('')}<path d="M72 566h976" stroke="#b7c4d4" stroke-opacity=".22"/><text x="72" y="624" fill="#b7c4d4" font-size="21" font-family="system-ui,sans-serif">SIDCLOUD NOTES · ${escape(date)} · ${escape(device)}</text><text x="1048" y="624" text-anchor="end" fill="${accent}" font-size="21" font-family="system-ui,'Microsoft YaHei',sans-serif">${escape(count)} 条记录</text></svg>\n`;
};
for (const round of snapshot.rounds) {
  const edit = benchmarkEditorial[round.id];
  await fs.writeFile(
    path.join(directory, `${round.id}.svg`),
    cover(edit.title, edit.subtitle, edit.topic, round.date, round.device, round.caseIds.length),
  );
}
const { researchPosts } = readContentModule(path.join(root, 'src/data/researchPosts.ts'));
for (const slug of [
  'wechat-image-generation-world-models',
  'subforge-subtitle-research-pipeline',
]) {
  const post = researchPosts.find((item) => item.slug === slug);
  await fs.writeFile(
    path.join(directory, `${slug}.svg`),
    cover(post.title, '', '研究笔记', post.date, 'RESEARCH', 'R'),
  );
}
console.log(`Created ${snapshot.rounds.length} editorial batch covers and 2 research covers.`);
