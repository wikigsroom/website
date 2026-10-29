import type { ContentBlock, Post } from './posts';
import {
  benchmark,
  benchmarkSlug,
  benchmarkRoundUrl,
  benchmarkStatus,
  casesOfRound,
} from './benchmark';
import { benchmarkEditorial } from './benchmarkEditorial';

export const benchmarkPosts: Post[] = benchmark.rounds.map((round, index) => {
  const edit = benchmarkEditorial[round.id];
  if (!edit) throw new Error(`Missing editorial for benchmark batch ${round.id}`);
  const cases = casesOfRound(round);
  const primary = cases.filter((item) => item.round === round.id);
  const references = cases.length - primary.length;
  const statusText = Object.entries(benchmarkStatus)
    .map(([id, label]) => ({ label, count: cases.filter((item) => item.status === id).length }))
    .filter((item) => item.count > 0)
    .map((item) => `${item.label} ${item.count} 项`)
    .join('，');
  const reportIds = [...new Set(cases.flatMap((item) => item.reportIds))];
  const related = benchmark.rounds.filter(
    (other) => other.id !== round.id && other.caseIds.some((id) => round.caseIds.includes(id)),
  );
  const preview = primary.find(
    (item) =>
      item.generated &&
      [
        'lipsync-K01',
        'lipsync-K03',
        'tts-gpt-sovits-v2proplus',
        'music-church-classical',
        '3d-TRELLIS2',
        'community-default-01a',
      ].includes(item.id),
  );
  const media = preview?.media[0];
  const relatedLink = (id: string, label: string): ContentBlock => ({
    type: 'link',
    href: `#/post/${benchmarkSlug(id)}`,
    text: `${label}：${benchmarkEditorial[id].title}`,
  });
  const content: ContentBlock[] = [
    { type: 'p', text: edit.intro },
    { type: 'takeaways', text: '先读这三点', items: edit.takeaways },
    ...edit.sections.flatMap((section, i): ContentBlock[] => [
      { type: 'h2', id: `story-${i + 1}`, text: section.title },
      ...section.paragraphs.map((text): ContentBlock => ({ type: 'p', text })),
    ]),
    { type: 'h2', id: 'conclusion', text: '这轮实验，值得带走什么' },
    { type: 'p', text: edit.conclusion },
    ...(media
      ? [
          { type: 'h2' as const, id: 'sample', text: '回到实际样本' },
          media.type === 'image'
            ? {
                type: 'image' as const,
                src: media.url,
                alt: media.label,
                text: `${preview.title} · ${media.label}`,
              }
            : {
                type: media.type === 'video' ? ('video' as const) : ('audio' as const),
                src: media.url,
                poster: media.poster,
                text: `${preview.title} · ${media.label}。完整对照和原始输入可在下方记录中查看。`,
              },
        ]
      : []),
    { type: 'h2', id: 'scope', text: '实验范围与过程补记' },
    {
      type: 'p',
      text: `原始批次“${round.title}”于 ${round.date} 记录，设备为 ${round.device}。${round.summary}`,
    },
    {
      type: 'table',
      text: '本篇对应的实验记录',
      headers: ['范围', '记录'],
      rows: [
        ['关联条目', `${cases.length} 项`],
        ['原始归属本批', `${primary.length} 项，含准备、失败与资料核查`],
        ['引用其他批次', `${references} 项，沿用原执行，不计为新增`],
        ['本批执行标记', `${primary.filter((item) => item.generated).length} 项，质量状态另行核对`],
      ],
    },
    ...(round.changes.length ? [{ type: 'list' as const, items: round.changes }] : []),
    { type: 'h2', id: 'results', text: `逐项记录与原始证据（${cases.length} 项）` },
    {
      type: 'p',
      text: `展开可查输入、参数、指标、计时范围、限制与原素材。本页依据 ${benchmark.snapshotDate} 的 Benchmark ${benchmark.version} 快照展示状态：${statusText}。上文历史观察与后续验收分别保留，执行完成不等于质量通过。`,
    },
    {
      type: 'benchmark-results',
      roundId: round.id,
      text: cases.map((item) => `${item.id} ${item.title} ${item.model} ${item.summary}`).join(' '),
    },
    { type: 'h2', id: 'sources', text: '继续阅读与资料来源' },
    { type: 'link', href: benchmarkRoundUrl(round.id), text: '在 Benchmark 查看原始批次' },
    ...reportIds.map((id) => ({
      type: 'link' as const,
      href: `https://benchmark.sidcloud.cn/reports/${encodeURIComponent(id)}`,
      text: benchmark.reports.find((report) => report.id === id)?.title || id,
    })),
    ...related.map((other) => relatedLink(other.id, '关联实验')),
    ...(benchmark.rounds[index + 1]
      ? [relatedLink(benchmark.rounds[index + 1].id, '较早一批')]
      : []),
    ...(benchmark.rounds[index - 1]
      ? [relatedLink(benchmark.rounds[index - 1].id, '较新一批')]
      : []),
  ];
  const categories = [
    ...new Set(
      cases.map(
        (item) =>
          benchmark.categories.find((category) => category.id === item.category)?.title ||
          item.category,
      ),
    ),
  ];
  const narrative = [
    edit.intro,
    ...edit.sections.flatMap((section) => section.paragraphs),
    edit.conclusion,
  ].join('');
  return {
    slug: benchmarkSlug(round.id),
    title: edit.title,
    subtitle: edit.subtitle,
    date: round.date,
    publishedAt: '2026-10-29',
    category: edit.topic,
    section: 'Benchmark',
    benchmarkRoundId: round.id,
    tags: ['Benchmark', round.device, round.type, ...categories],
    cover: `/assets/batch-covers/${round.id}.svg`,
    // The estimate covers the narrative; the full evidence is optional reading.
    readMins: Math.max(3, Math.ceil(narrative.length / 300)),
    pinned: index === 0,
    sourceUrl: benchmarkRoundUrl(round.id),
    excerpt: edit.subtitle,
    content,
  };
});
