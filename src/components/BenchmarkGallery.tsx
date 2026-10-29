import { benchmarkVisuals } from '../data/benchmarkVisuals';
import { benchmarkCaseUrl, benchmarkRoundById } from '../data/benchmark';

const kindLabel = {
  'video-frames': '样片分镜',
  'image-result': '实际保存图',
  'audio-waveform': '音轨波形',
  'record-graphic': '记录摘录',
};

export default function BenchmarkGallery({ roundId }: { roundId: string }) {
  const figures = benchmarkVisuals.rounds[roundId].gallery;
  return (
    <div className="benchmark-gallery" data-visual-round={roundId}>
      {figures.map((figure) => (
        <figure className={`experiment-figure is-${figure.kind}`} key={figure.src}>
          <div className="experiment-figure-topline">
            <span>{kindLabel[figure.kind]}</span>
            {figure.reference ? <span className="reference-tag">引用原批次</span> : null}
          </div>
          <a href={figure.sourceUrl} target="_blank" rel="noopener noreferrer">
            <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
          </a>
          <figcaption>
            <strong>{figure.title}</strong>
            {figure.mediaLabel ? <p className="sample-description">{figure.mediaLabel}</p> : null}
            <p>{figure.caption}</p>
            {figure.frames ? (
              <p className="frame-times">
                {figure.frames.map((time) => `${time.toFixed(2)}s`).join(' / ')}
              </p>
            ) : null}
            {figure.reference ? (
              <p className="visual-reference">
                来源批次：
                {benchmarkRoundById.get(figure.originalRoundId)?.title}
              </p>
            ) : null}
            <a href={benchmarkCaseUrl(figure.caseId)} target="_blank" rel="noopener noreferrer">
              查看这条实验记录 ↗
            </a>
          </figcaption>
          {figure.playback?.type === 'audio' ? (
            <audio controls preload="none" src={figure.playback.src} aria-label={figure.title} />
          ) : figure.playback?.type === 'video' ? (
            <details className="sample-player">
              <summary>播放完整样片</summary>
              <video
                controls
                playsInline
                preload="none"
                src={figure.playback.src}
                poster={figure.playback.poster}
                aria-label={figure.title}
              />
            </details>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
