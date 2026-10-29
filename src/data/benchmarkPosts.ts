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
    .map(([id, label]) => `${label} ${cases.filter((item) => item.status === id).length} 项`)
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
  const content: ContentBlock[] = [
    { type: 'p', text: edit.intro },
    { type: 'h2', id: 'scope', text: '本批问题与实验范围' },
    {
      type: 'p',
      text: `${round.date}，设备 ${round.device}，批次类型为“${round.type}”。${round.summary}`,
    },
    {
      type: 'table',
      text: '批次范围与来源快照',
      headers: ['项目', '本批范围'],
      rows: [
        ['关联记录', `${cases.length} 项`],
        ['归属本批的独立记录', `${primary.length} 项（含准备、失败与资料状态）`],
        ['引用其他批次记录', `${references} 项，不重复计算执行`],
        [
          '本批已有执行标记',
          `${primary.filter((item) => item.generated).length} 项；执行不等于质量通过`,
        ],
        ['来源快照', `Benchmark ${benchmark.version} / ${benchmark.snapshotDate}`],
      ],
    },
    { type: 'h2', id: 'observations', text: '过程、变化与阅读方法' },
    { type: 'p', text: edit.reading },
    ...(round.changes.length ? [{ type: 'list' as const, items: round.changes }] : []),
    {
      type: 'p',
      text: `以下关联记录按当前冻结快照显示：${statusText}。历史批次的原始观察保留于上文与原报告；后续验收状态不应倒写成当时已通过。`,
    },
    ...(media
      ? [
          { type: 'h2' as const, id: 'sample', text: '样本与素材' },
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
                text: `${preview.title} · ${media.label}。素材由 Benchmark 原地址提供，完整对照见逐项记录。`,
              },
        ]
      : []),
    { type: 'h2', id: 'results', text: `逐项记录（${cases.length} 项）` },
    {
      type: 'p',
      text: '展开条目可查看计时口径、输入说明、指标、限制与原素材。复核引用会标注原批次；完整报告和工作流保留在 Benchmark。',
    },
    {
      type: 'benchmark-results',
      roundId: round.id,
      text: cases.map((item) => `${item.id} ${item.title} ${item.model} ${item.summary}`).join(' '),
    },
    { type: 'h2', id: 'conclusion', text: '这一批留下的结论与边界' },
    { type: 'p', text: edit.conclusion },
    {
      type: 'quote',
      text: '准备、资料核查、执行完成与质量通过分别记录。计时范围不同的数字不直接混排；未测内容与缺失素材不补造结果。',
    },
    { type: 'h2', id: 'sources', text: '来源、关联批次与完整资料' },
    { type: 'link', href: benchmarkRoundUrl(round.id), text: '在 Benchmark 查看本批全部记录' },
    ...reportIds.map((id) => ({
      type: 'link' as const,
      href: `https://benchmark.sidcloud.cn/reports/${encodeURIComponent(id)}`,
      text: benchmark.reports.find((report) => report.id === id)?.title || id,
    })),
    ...related.map((other) => ({
      type: 'link' as const,
      href: `#/post/${benchmarkSlug(other.id)}`,
      text: `关联批次：${other.date} · ${other.title}`,
    })),
    ...(benchmark.rounds[index + 1]
      ? [
          {
            type: 'link' as const,
            href: `#/post/${benchmarkSlug(benchmark.rounds[index + 1].id)}`,
            text: `较早一批：${benchmark.rounds[index + 1].title}`,
          },
        ]
      : []),
    ...(benchmark.rounds[index - 1]
      ? [
          {
            type: 'link' as const,
            href: `#/post/${benchmarkSlug(benchmark.rounds[index - 1].id)}`,
            text: `较新一批：${benchmark.rounds[index - 1].title}`,
          },
        ]
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
  return {
    slug: benchmarkSlug(round.id),
    title: `${round.title}｜${round.date} 测评日志`,
    subtitle: edit.intro,
    date: round.date,
    publishedAt: '2026-10-29',
    category: 'Benchmark Notes',
    section: 'Benchmark',
    benchmarkRoundId: round.id,
    tags: ['Benchmark', round.device, round.type, ...categories],
    cover: `/assets/batch-covers/${round.id}.svg`,
    readMins: Math.max(
      3,
      Math.ceil(
        (edit.intro.length +
          edit.reading.length +
          edit.conclusion.length +
          cases.reduce((sum, item) => sum + item.summary.length + 100, 0)) /
          450,
      ),
    ),
    pinned: index === 0,
    sourceUrl: benchmarkRoundUrl(round.id),
    excerpt: `${edit.intro} 本批关联 ${cases.length} 项记录，归属本批 ${primary.length} 项，复核引用 ${references} 项。`,
    content,
  };
});
