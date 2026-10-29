import raw from './benchmarkIndex.json';

export type BenchmarkMedia = { type: string; label: string; url: string; poster?: string };
export type BenchmarkCase = {
  id: string;
  title: string;
  model: string;
  mode: string;
  category: string;
  device: string;
  round: string;
  summary: string;
  status: 'passed' | 'limited' | 'failed' | 'archived' | 'review';
  generated: boolean;
  measurementKind?: string;
  seconds: number | null;
  duration: number | null;
  timingScope: string;
  limitations: string[];
  metrics: { label: string; value: unknown; unit: string; note: string }[];
  verification?: { label: string; result: string }[];
  textResult?: string;
  parameters?: Record<string, unknown>;
  reportIds: string[];
  inputs: { label: string; description: string; media?: string }[];
  media: BenchmarkMedia[];
  links: { label: string; kind: string; url: string }[];
};
export type BenchmarkRound = {
  id: string;
  title: string;
  date: string;
  device: string;
  type: string;
  summary: string;
  changes: string[];
  caseIds: string[];
};
export type BenchmarkCaseSummary = Omit<
  BenchmarkCase,
  'inputs' | 'metrics' | 'verification' | 'textResult' | 'parameters' | 'links'
>;
type BenchmarkSnapshot = {
  version: string;
  snapshotDate: string;
  sourceUrl: string;
  sourceSha256: string;
  categories: { id: string; title: string }[];
  rounds: BenchmarkRound[];
  cases: BenchmarkCaseSummary[];
  reports: { id: string; title: string; date: string; description: string }[];
};
export const benchmark = raw as unknown as BenchmarkSnapshot;
export const benchmarkCaseById = new Map(benchmark.cases.map((item) => [item.id, item]));
export const benchmarkRoundById = new Map(benchmark.rounds.map((item) => [item.id, item]));
export const benchmarkStatus = {
  passed: '通过',
  limited: '有限验证',
  failed: '未通过',
  archived: '历史记录',
  review: '资料核查',
};
export const benchmarkSlug = (id: string) => `benchmark-${id}`;
export const benchmarkCaseUrl = (id: string) =>
  `https://benchmark.sidcloud.cn/benchmarks/${encodeURIComponent(id)}`;
export const benchmarkRoundUrl = (id: string) =>
  `https://benchmark.sidcloud.cn/benchmarks?round=${encodeURIComponent(id)}`;
export const casesOfRound = (round: BenchmarkRound) =>
  round.caseIds.map((id) => benchmarkCaseById.get(id)!);
export const benchmarkNumber = (value: unknown) =>
  value === null || value === undefined
    ? '未记录'
    : typeof value === 'number'
      ? value.toLocaleString('zh-CN', { maximumFractionDigits: 3 })
      : typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);
