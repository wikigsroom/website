import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readContentModule } from './content-module.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(await fs.readFile(path.join(root, 'src/data/benchmarkIndex.json'), 'utf8'));
const byId = new Map(data.cases.map((item) => [item.id, item]));
const { benchmarkEditorial } = readContentModule(path.join(root, 'src/data/benchmarkEditorial.ts'));
const rows = data.rounds.map((round) => {
  const own = round.caseIds.filter((id) => byId.get(id).round === round.id).length;
  return `| ${round.date} | ${round.device} | [${benchmarkEditorial[round.id].title.replaceAll('|', '\\|')}](https://blog.sidcloud.cn/#/post/benchmark-${round.id}) | ${own} | ${round.caseIds.length - own} | ${round.caseIds.length} |`;
});
const text = `# 测评批次目录 / Benchmark batch index

公开快照 / Public snapshot: **${data.version} · ${data.snapshotDate}**. [Benchmark](https://benchmark.sidcloud.cn/) · [公开目录 / Public catalog](${data.sourceUrl})

一批一篇，共 **${data.rounds.length} 篇**，覆盖 **${data.cases.length} 条独立记录**。下表中的 89 次复核引用不算新的实验。链接是上线后的目标地址；Git 提交本身不代表已部署。

One article per batch, covering **${data.cases.length} unique records**. The 89 cross-batch references do not count as new runs. Links below are publication targets; a Git commit does not confirm a deployment.

“本批 / Owned”指原始归属，不等于成功执行；准备、失败、历史记录和资料核查都保留。“引用 / Referenced”表示沿用其他批次证据。文章的逐项结果展示此冻结快照的状态，正文另述历史观察。

Owned records include preparation, failure, history and research states. Referenced records reuse evidence from another batch. Result tables show this frozen snapshot's status; article narratives distinguish the original observations.

| 日期 / Date | 设备 / Device | 文章 / Article | 本批 / Owned | 引用 / Referenced | 关联 / Total |
| --- | --- | --- | ---: | ---: | ---: |
${rows.join('\n')}

来源目录 SHA-256 / Source catalog SHA-256: \`${data.sourceSha256}\`.

刷新目录 / Regenerate: \`npm run benchmark:index\`.
`;
await fs.mkdir(path.join(root, 'docs'), { recursive: true });
await fs.writeFile(path.join(root, 'docs/benchmark-batches.md'), text);
console.log(`Wrote ${data.rounds.length} batch index entries.`);
