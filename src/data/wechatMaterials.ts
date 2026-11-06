import sources from './wechatSources.json';
import type { ContentBlock } from './posts';

export function sourceMaterial(slug: string, id: string): ContentBlock {
  const source = sources.articles.find((item) => item.slug === slug);
  const material = source?.materials.find((item) => item.id === id);
  if (!source || !material) throw new Error(`Missing attributed source material: ${slug}/${id}`);
  const text = `${material.caption} · 来源：${source.account}`;
  return material.kind === 'video-reference'
    ? { type: 'video-reference', poster: material.src, href: source.url, text }
    : {
        type: 'image', src: material.src, alt: material.caption, text,
        sourceUrl: material.originalUrl, sourcePage: source.url,
        width: material.width, height: material.height,
      };
}
