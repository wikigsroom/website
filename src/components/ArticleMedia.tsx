import { useState } from 'react';
import type { ContentBlock } from '../data/posts';

type MediaBlock = Extract<ContentBlock, { type: 'image' | 'video' | 'audio' }>;

export default function ArticleMedia({ block }: { block: MediaBlock }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="article-media">
      {failed ? (
        <p role="status">素材暂未加载，可通过下方原素材链接查看。</p>
      ) : block.type === 'image' ? (
        <img src={block.src} alt={block.alt} loading="lazy" onError={() => setFailed(true)} />
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
        <a href={block.src} target="_blank" rel="noopener noreferrer">
          打开原素材 ↗
        </a>
      </figcaption>
    </figure>
  );
}
