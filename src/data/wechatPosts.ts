import type { Post } from './posts';
import { wechatEditorial } from './wechatEditorial';
import sources from './wechatSources.json';

export const wechatPosts: Post[] = sources.articles.map((source) => {
  const editorial = wechatEditorial[source.slug];
  if (!editorial) throw new Error(`Missing reviewed article: ${source.slug}`);
  const words = editorial.content.map((block) =>
    block.type === 'list' || block.type === 'takeaways' ? block.items.join('') : block.text,
  ).join('');
  return {
    ...editorial,
    slug: source.slug,
    date: source.publishedAt,
    publishedAt: source.publishedAt,
    section: 'Research',
    tags: ['公众号精读', ...editorial.tags],
    cover: source.cover.hero,
    coverCaption: `${source.cover.model} 主题插画 · 通过 sub2-image-gen 生成；正文另附原文素材`,
    coverLabel: 'AI 主题插画',
    readMins: Math.max(4, Math.ceil(words.length / 320)),
    sourceUrl: source.url,
    wechatSource: {
      title: source.title,
      account: source.account,
      byline: source.byline,
      sourcePublishedAt: source.sourcePublishedAt,
      retrievedAt: source.retrievedAt,
    },
  };
});
