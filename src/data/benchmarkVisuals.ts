import raw from './benchmarkVisuals.json';

export type VisualCover = {
  hero: string;
  card: string;
  kind: 'video-frame' | 'image-result' | 'audio-waveform' | 'illustration';
  caption: string;
  caseIds?: string[];
  illustration?: {
    name: string;
    model: string;
    prompt: string;
    sourceSha256: string;
  };
};
export type BenchmarkFigure = {
  kind: 'video-frames' | 'image-result' | 'audio-waveform' | 'record-graphic';
  src: string;
  alt: string;
  title: string;
  caption: string;
  sourceUrl: string;
  mediaLabel?: string;
  reference: boolean;
  originalRoundId: string;
  caseId: string;
  duration?: number;
  frames?: number[];
  playback?: { type: 'video' | 'audio'; src: string; poster?: string };
};
type VisualManifest = {
  snapshotSha256: string;
  rounds: Record<string, { cover: VisualCover; gallery: BenchmarkFigure[] }>;
  research: Record<string, VisualCover>;
};
export const benchmarkVisuals = raw as unknown as VisualManifest;
export const visualCoverLabel = (kind: VisualCover['kind']) =>
  ({
    'video-frame': '实测抽帧',
    'image-result': '实测图像',
    'audio-waveform': '音轨波形',
    illustration: '主题插画',
  })[kind];
