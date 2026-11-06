import { useState } from 'react';
import type { ContentBlock } from '../data/posts';

type MediaBlock = Extract<ContentBlock, { type: 'image' | 'video' | 'audio' | 'video-reference' }>;

export default function ArticleMedia({ block }: { block: MediaBlock }) {
  const [failed, setFailed] = useState(false);
  if (block.type === 'video-reference')
    return (
      <figure className="article-media source-video-reference">
        <a href={block.href} target="_blank" rel="noopener noreferrer">
          <img src={block.poster} alt={`${block.text}的视频预览封面`} loading="lazy" />
          <span className="source-video-action">在原文查看视频 ↗</span>
        </a>
        <figcaption>{block.text} · 此处为原视频封面，点击前往微信原文观看。</figcaption>
      </figure>
    );
  return (
    <figure className="article-media">
      {failed ? (
        <p role="status">素材暂未加载，可通过下方原素材链接查看。</p>
      ) : block.type === 'image' ? (
        <img src={block.src} alt={block.alt} width={block.width} height={block.height}
          loading="lazy" onError={() => setFailed(true)} />
      ) : block.type === 'video' ? (
        <video
          controls
          playsInline
          preload="metadata"
          src={block.src}
          poster={block.poster}
          onError={() => setFailed(true)}
        />
      ) : (
        <audio controls preload="metadata" src={block.src} onError={() => setFailed(true)} />
      )}
      <figcaption>
        {block.text}{' '}
        <a href={block.type === 'image' ? block.sourceUrl || block.src : block.src}
          target="_blank" rel="noopener noreferrer">
          打开原素材 ↗
        </a>
        {block.type === 'image' && block.sourcePage ? (
          <> · <a href={block.sourcePage} target="_blank" rel="noopener noreferrer">阅读原文 ↗</a></>
        ) : null}
      </figcaption>
    </figure>
  );
}
