import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const directory = path.join(root, 'docs/readings');
const { posts } = readContentModule(path.join(root, 'src/data/posts.ts'));
const check = process.argv.includes('--check');
const link = (href) => href.startsWith('#/') ? `https://blog.sidcloud.cn/${href}` : href;
const image = (src) => src.startsWith('/assets/') ? `../../public${src}` : src;
const cell = (value) => value.replaceAll('|', '\\|').replaceAll('\n', '<br>');

function blockText(block) {
  switch (block.type) {
    case 'h2': return `## ${block.text}`;
    case 'p': return block.text;
    case 'list': return block.items.map((item) => `- ${item}`).join('\n');
    case 'takeaways': return `**${block.text}**\n\n${block.items.map((item) => `- ${item}`).join('\n')}`;
    case 'quote': return `> ${block.text}`;
    case 'code': return `\`\`\`${block.language}\n${block.text}\n\`\`\``;
    case 'link': return `[${block.text}](${link(block.href)})`;
    case 'table': return `**${block.text}**\n\n| ${block.headers.map(cell).join(' | ')} |\n| ${block.headers.map(() => '---').join(' | ')} |\n${block.rows.map((row) => `| ${row.map(cell).join(' | ')} |`).join('\n')}`;
    case 'image': return `![${block.alt}](${image(block.src)})\n\n${block.text} · [原素材](${block.sourceUrl || block.src}) · [原文](${block.sourcePage})`;
    case 'video-reference': return `[![原视频封面：${block.text}](${image(block.poster)})](${block.href})\n\n${block.text} · [在微信原文查看视频](${block.href})。此图为预览封面。`;
    default: throw new Error(`Unexpected reading block: ${block.type}`);
  }
}

fs.mkdirSync(directory, { recursive: true });
for (const post of posts.filter((item) => item.wechatSource)) {
  const source = post.wechatSource;
  const text = [`# ${post.title}`, post.subtitle,
    `原标题：${source.title}`,
    `原文：${source.account}${source.byline && source.byline !== source.account ? ` / ${source.byline}` : ''} · ${source.sourcePublishedAt.slice(0, 10)}\n\n本站整理：${post.publishedAt} · [阅读原文](${post.sourceUrl}) · [博客文章](https://blog.sidcloud.cn/#/post/${post.slug})`,
    ...(fs.existsSync(path.join(root, 'public', post.cover))
      ? [`![${post.title}](${image(post.cover)})\n\n${post.coverCaption}`] : []),
    ...post.content.map(blockText),
    `---\n\n基于公开原文独立整理。素材分别注明来源；原文日期与本站整理日期分列。\n\n[返回精读目录](../wechat-reading.md)`].join('\n\n') + '\n';
  const filename = path.join(directory, `${post.slug}.md`);
  if (check) assert.equal(fs.readFileSync(filename, 'utf8').replaceAll('\r\n', '\n'), text,
    `Reading export is stale: ${post.slug}; run npm run wechat:export`);
  else fs.writeFileSync(filename, text);
}
console.log(`Reading Markdown ${check ? 'verified' : 'exported'}: ${posts.filter((item) => item.wechatSource).length} articles.`);
