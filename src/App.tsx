import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  CalendarDays,
  Clock3,
  Copy,
  RotateCcw,
  Search,
  Type,
} from 'lucide-react';
import { posts, type ContentBlock, type Post } from './data/posts';
import { benchmark } from './data/benchmark';
import ArticleMedia from './components/ArticleMedia';

const BenchmarkResults = lazy(() => import('./components/BenchmarkResults'));

const bookmarkKey = 'sidcloud-blog-bookmarks';
const allValue = 'all';
const initialVisiblePosts = 8;
const visiblePostStep = 6;
const generatedCoverRoot = '/assets/generated-covers/';
const optimizedCoverRoot = `${generatedCoverRoot}optimized/`;

type SortMode = 'latest' | 'reading' | 'title';
type SectionFilter = typeof allValue | 'Blog' | 'Research' | 'Benchmark';
type CoverVariant = 'card' | 'hero';

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));

const unique = (values: string[]) =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, 'zh-CN'));

const readBookmarks = () => {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(bookmarkKey) || '[]') as string[]);
  } catch {
    return new Set<string>();
  }
};

const writeBookmarks = (bookmarks: Set<string>) => {
  localStorage.setItem(bookmarkKey, JSON.stringify(Array.from(bookmarks)));
};

const postSearchText = (post: Post) =>
  [
    post.title,
    post.subtitle,
    post.excerpt,
    post.category,
    post.section || 'Blog',
    post.priority || '',
    post.sourcePath || '',
    ...post.tags,
    ...post.content.map((block) => {
      if (block.type === 'list') return block.items.join(' ');
      return block.text;
    }),
  ]
    .join(' ')
    .toLowerCase();

const getSlugFromHash = () => {
  const hash = window.location.hash || '#/';
  return hash.startsWith('#/post/') ? hash.replace('#/post/', '') : null;
};

const sectionRoutes: Record<string, SectionFilter> = {
  '#/research': 'Research',
  '#/benchmark': 'Benchmark',
  '#/notes': 'Blog',
};
const getSectionFromHash = (): SectionFilter => sectionRoutes[window.location.hash] || allValue;

const getPostSection = (post: Post) => post.section || 'Blog';

const getOptimizedCover = (cover: string, variant: CoverVariant) => {
  if (!cover.startsWith(generatedCoverRoot)) return cover;
  const fileName = cover.slice(generatedCoverRoot.length).replace(/\.[^.]+$/, '.webp');
  return `${optimizedCoverRoot}${variant}/${fileName}`;
};

const getArchive = (items: Post[]) => {
  const archive = items.reduce<Map<number, number>>((map, post) => {
    const year = new Date(post.date).getFullYear();
    map.set(year, (map.get(year) || 0) + 1);
    return map;
  }, new Map());

  return Array.from(archive.entries()).sort((a, b) => b[0] - a[0]);
};

const ContentRenderer = ({ block }: { block: ContentBlock }) => {
  if (block.type === 'benchmark-results')
    return (
      <Suspense fallback={<p role="status">正在读取本批测评记录…</p>}>
        <BenchmarkResults roundId={block.roundId} />
      </Suspense>
    );
  if (block.type === 'image' || block.type === 'video' || block.type === 'audio')
    return <ArticleMedia key={block.src} block={block} />;
  if (block.type === 'link')
    return (
      <p className="article-source-link">
        <a
          href={block.href}
          {...(block.href.startsWith('https://')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {block.text} ↗
        </a>
      </p>
    );
  if (block.type === 'table')
    return (
      <div className="article-table-wrap" tabIndex={0} aria-label={`${block.text}，横向滚动`}>
        <table>
          <caption>{block.text}</caption>
          <thead>
            <tr>
              {block.headers.map((label) => (
                <th key={label} scope="col">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th scope="row" key={j}>
                      {cell}
                    </th>
                  ) : (
                    <td key={j}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (block.type === 'h2') return <h2 id={block.id}>{block.text}</h2>;
  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (block.type === 'quote') return <blockquote>{block.text}</blockquote>;
  if (block.type === 'code') {
    return (
      <pre>
        <code>{block.text}</code>
      </pre>
    );
  }
  return <p>{block.text}</p>;
};

const Header = () => (
  <header className="site-header">
    <a className="brand" href="#/" aria-label="sidcloud Notes home">
      <img src="/assets/avata.webp" alt="sidcloud avatar" />
      <span>
        <strong>SID</strong>
        <small>notes</small>
      </span>
    </a>
    <nav className="header-nav" aria-label="Primary">
      <a href="#/">文章</a>
      <a href="#/benchmark">测评日志</a>
      <a href="https://www.sidcloud.cn/">关于</a>
      <a href="https://github.com/carzygod" target="_blank" rel="noreferrer">
        GitHub
      </a>
    </nav>
  </header>
);

const SiteFooter = () => (
  <footer className="site-footer">
    <nav aria-label="Footer">
      <a href="https://www.sidcloud.cn/">关于</a>
      <a href="https://github.com/carzygod" target="_blank" rel="noreferrer">
        Github
      </a>
    </nav>
    <p>power by Codex</p>
  </footer>
);

const Spotlight = ({ post }: { post: Post }) => (
  <section
    className={`spotlight-panel${post.benchmarkRoundId ? ' is-batch-spotlight' : ''}`}
    aria-label="Pinned article"
  >
    <div className="spotlight-copy">
      <div>
        <p className="kicker">Pinned Dispatch</p>
        <div className="meta-line">
          <span>{getPostSection(post)}</span>
          {post.priority ? <span>{post.priority}</span> : null}
          <span>{post.category}</span>
          <span>{formatDate(post.date)}</span>
          <span>{post.readMins} min read</span>
        </div>
        <h2>
          {post.benchmarkRoundId
            ? benchmark.rounds.find((round) => round.id === post.benchmarkRoundId)?.title
            : post.title}
        </h2>
        <p>{post.benchmarkRoundId ? post.subtitle : post.excerpt}</p>
      </div>
      <a className="open-link" href={`#/post/${post.slug}`}>
        阅读全文 <ArrowUpRight aria-hidden="true" />
      </a>
    </div>
    <div className="spotlight-image">
      <img
        src={getOptimizedCover(post.cover, 'hero')}
        alt={post.title}
        width={1120}
        height={700}
        decoding="async"
        fetchPriority="high"
        sizes="(max-width: 920px) 100vw, 600px"
      />
    </div>
  </section>
);

const PostCard = ({
  post,
  bookmarked,
  onBookmark,
  onTag,
}: {
  post: Post;
  bookmarked: boolean;
  onBookmark: (slug: string) => void;
  onTag: (tag: string) => void;
}) => (
  <article className="post-card">
    <figure className={post.cover.startsWith('/assets/batch-covers/') ? 'batch-cover' : undefined}>
      <img
        src={getOptimizedCover(post.cover, 'card')}
        alt={post.title}
        width={640}
        height={400}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 860px) 100vw, 380px"
      />
      <div className="card-badges">
        <span className="category-pill">{post.category}</span>
        {post.priority ? <span className="priority-pill">{post.priority}</span> : null}
      </div>
    </figure>
    <div className="post-body">
      <div className="meta-line">
        <span>{getPostSection(post)}</span>
        <span>
          <CalendarDays aria-hidden="true" /> {formatDate(post.date)}
        </span>
        <span>
          <Clock3 aria-hidden="true" /> {post.readMins} min read
        </span>
      </div>
      <h3>
        <a href={`#/post/${post.slug}`}>{post.title}</a>
      </h3>
      <p>{post.excerpt}</p>
      <div className="chip-list">
        {post.tags.map((tag) => (
          <button key={tag} className="tag" type="button" onClick={() => onTag(tag)}>
            {tag}
          </button>
        ))}
      </div>
      <div className="post-actions">
        <a className="open-link" href={`#/post/${post.slug}`}>
          阅读 <ArrowUpRight aria-hidden="true" />
        </a>
        <button
          className={`bookmark${bookmarked ? ' is-active' : ''}`}
          type="button"
          onClick={() => onBookmark(post.slug)}
          aria-label={`${bookmarked ? '取消收藏' : '收藏'} ${post.title}`}
        >
          <Bookmark aria-hidden="true" />
          收藏
        </button>
      </div>
    </div>
  </article>
);

const ResearchBrief = () => {
  const research = posts.filter((post) => getPostSection(post) === 'Research');
  const priorities = ['P0', 'P1', 'P2', 'P3'].map((priority) => ({
    priority,
    count: research.filter((post) => post.priority === priority).length,
  }));

  return (
    <section className="research-brief" id="research" aria-label="Research overview">
      <div className="research-brief-copy">
        <p className="kicker">Research Board</p>
        <h2>当前研究板块：开源 AI 项目雷达与研究系统</h2>
        <p>
          本轮内容来自 <code>research/</code>{' '}
          下的系统文档和开源项目报告，整理为可持续追加的技术博客。当前主线是研究工作流、
          本地优先、Agent 协议化、统一多模态、端侧生成与许可风险。
        </p>
      </div>
      <div className="research-metrics">
        {priorities.map((item) => (
          <div className="metric-card" key={item.priority}>
            <span>{item.priority}</span>
            <strong>{item.count}</strong>
            <small>tracked</small>
          </div>
        ))}
      </div>
    </section>
  );
};

const HomeView = ({
  category,
  tag,
  query,
  sort,
  section,
  result,
  bookmarks,
  onCategory,
  onTag,
  onQuery,
  onSort,
  onSection,
  onBookmark,
  onReset,
}: {
  category: string;
  tag: string;
  query: string;
  sort: SortMode;
  section: SectionFilter;
  result: Post[];
  bookmarks: Set<string>;
  onCategory: (value: string) => void;
  onTag: (value: string) => void;
  onQuery: (value: string) => void;
  onSort: (value: SortMode) => void;
  onSection: (value: SectionFilter) => void;
  onBookmark: (slug: string) => void;
  onReset: () => void;
}) => {
  const sectionPosts =
    section === allValue ? posts : posts.filter((post) => getPostSection(post) === section);
  const researchCount = posts.filter((post) => getPostSection(post) === 'Research').length;
  const blogCount = posts.filter((post) => getPostSection(post) === 'Blog').length;
  const categories = [allValue, ...unique(sectionPosts.map((post) => post.category))];
  const tags = [allValue, ...unique(sectionPosts.flatMap((post) => post.tags))];
  const pinned = sectionPosts.find((post) => post.pinned) || sectionPosts[0] || posts[0];
  const titleParts = [
    section !== allValue ? section : '',
    category !== allValue ? category : '',
    tag !== allValue ? `#${tag}` : '',
    query.trim() ? `"${query.trim()}"` : '',
  ].filter(Boolean);
  const [visibleCount, setVisibleCount] = useState(initialVisiblePosts);
  const visibleResult = result.slice(0, visibleCount);
  const hasMore = visibleCount < result.length;

  useEffect(() => {
    setVisibleCount(initialVisiblePosts);
  }, [category, query, section, sort, tag]);

  return (
    <main>
      <section className="hero-grid">
        <section className="intro-panel" aria-labelledby="blogTitle">
          <p className="kicker">Web3 x AI Agents Studio</p>
          <h1 id="blogTitle">sidcloud Notes</h1>
          <p className="intro-copy">
            记录协议基础设施、AI Agent 工作流、浏览器扩展、产品发布与工程复盘。
          </p>
          <div className="stats-strip" aria-label="Blog stats">
            <span>
              <strong>{posts.length}</strong> posts
            </span>
            <span>
              <strong>{researchCount}</strong> research
            </span>
            <span>
              <strong>{blogCount}</strong> notes
            </span>
            <span>
              <strong>{benchmark.rounds.length}</strong> batches
            </span>
            <span>
              <strong>{tags.length - 1}</strong> tags
            </span>
            <span>
              <strong>React</strong> Vite
            </span>
          </div>
        </section>
        <Spotlight post={pinned} />
      </section>

      <section className="control-panel" aria-label="Blog controls">
        <label className="search-box">
          <span>Search</span>
          <div className="input-wrap">
            <Search aria-hidden="true" />
            <input
              value={query}
              type="search"
              placeholder="搜索文章、标签、关键词"
              autoComplete="off"
              onChange={(event) => onQuery(event.target.value)}
            />
          </div>
        </label>
        <div className="select-row">
          <label>
            <span>Sort</span>
            <select value={sort} onChange={(event) => onSort(event.target.value as SortMode)}>
              <option value="latest">最新发布</option>
              <option value="reading">阅读时长</option>
              <option value="title">标题排序</option>
            </select>
          </label>
          <button className="ghost-button" type="button" onClick={onReset}>
            <RotateCcw aria-hidden="true" /> 清除筛选
          </button>
        </div>
      </section>

      {section === 'Research' ? <ResearchBrief /> : null}
      {section === 'Benchmark' ? (
        <section className="batch-board" aria-label="测评批次总览">
          <p className="kicker">Benchmark Journal</p>
          <h2>按批次读完整测评过程</h2>
          <p>
            {benchmark.rounds.length} 篇日志覆盖 {benchmark.cases.length}{' '}
            项独立记录，含生成、失败、准备、复核与更正。点击文章展开逐项证据，原素材继续由{' '}
            <a href="https://benchmark.sidcloud.cn/" target="_blank" rel="noopener noreferrer">
              Benchmark
            </a>{' '}
            提供。
          </p>
          <p>
            数据快照 {benchmark.version} · {benchmark.snapshotDate}
            ；文章日期为测评批次日期，整理日期另列。
          </p>
        </section>
      ) : null}

      <section className="content-grid">
        <aside className="side-rail" aria-label="Blog taxonomy">
          <section>
            <h2>板块</h2>
            <div className="chip-list">
              {[
                [allValue, '全部'],
                ['Research', 'Research'],
                ['Benchmark', '测评日志'],
                ['Blog', 'Notes'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  className="chip"
                  type="button"
                  aria-pressed={section === value}
                  onClick={() => onSection(value as SectionFilter)}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h2>分类</h2>
            <div className="chip-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className="chip"
                  type="button"
                  aria-pressed={category === item}
                  onClick={() => onCategory(item)}
                >
                  {item === allValue ? '全部' : item}
                </button>
              ))}
            </div>
          </section>
          <section>
            <h2>标签</h2>
            <div className="tag-cloud">
              {tags.map((item) => (
                <button
                  key={item}
                  className="tag"
                  type="button"
                  aria-pressed={tag === item}
                  onClick={() => onTag(item)}
                >
                  {item === allValue ? '全部标签' : item}
                </button>
              ))}
            </div>
          </section>
          <section id="archive">
            <h2>归档</h2>
            <div className="archive-list">
              {getArchive(sectionPosts).map(([year, count]) => (
                <div className="archive-item" key={year}>
                  <strong>{year}</strong>
                  <span>{count} posts</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section aria-live="polite">
          <div className="section-head">
            <div>
              <p className="kicker">Latest Signals</p>
              <h2>{titleParts.length ? titleParts.join(' / ') : '全部文章'}</h2>
            </div>
            <p>{result.length} 篇匹配</p>
          </div>
          {result.length ? (
            <>
              <div className="post-grid">
                {visibleResult.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={post}
                    bookmarked={bookmarks.has(post.slug)}
                    onBookmark={onBookmark}
                    onTag={onTag}
                  />
                ))}
              </div>
              {hasMore ? (
                <div className="load-more">
                  <button
                    className="ghost-button"
                    type="button"
                    onClick={() =>
                      setVisibleCount((count) => Math.min(count + visiblePostStep, result.length))
                    }
                  >
                    加载更多
                  </button>
                  <span>
                    已显示 {visibleResult.length} / {result.length}
                  </span>
                </div>
              ) : result.length > initialVisiblePosts ? (
                <div className="load-more is-complete">
                  <span>已显示全部 {result.length} 篇</span>
                </div>
              ) : null}
            </>
          ) : (
            <div className="empty-state">
              <p>没有找到匹配的文章。</p>
              <button className="ghost-button" type="button" onClick={onReset}>
                重置条件
              </button>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

const ArticleView = ({
  post,
  onBack,
  onCopy,
  onToggleReader,
}: {
  post: Post;
  onBack: () => void;
  onCopy: () => void;
  onToggleReader: () => void;
}) => {
  const toc = post.content.filter(
    (block): block is Extract<ContentBlock, { type: 'h2' }> => block.type === 'h2',
  );
  const related = posts
    .filter(
      (item) => item.slug !== post.slug && item.tags.some((itemTag) => post.tags.includes(itemTag)),
    )
    .slice(0, 3);

  return (
    <main className="article-view">
      <article className="article-shell">
        <div
          className={`article-cover${post.cover.startsWith('/assets/batch-covers/') ? ' batch-cover' : ''}`}
        >
          <img
            src={getOptimizedCover(post.cover, 'hero')}
            alt={post.title}
            width={1120}
            height={700}
            decoding="async"
            fetchPriority="high"
            sizes="(max-width: 920px) 100vw, 920px"
          />
        </div>
        <header className="article-header">
          <p className="kicker">{post.category}</p>
          <div className="meta-line">
            <span>{getPostSection(post)}</span>
            {post.priority ? <span>{post.priority}</span> : null}
            <span>{formatDate(post.date)}</span>
            <span>{post.readMins} min read</span>
            <span>{post.tags.map((item) => `#${item}`).join(' ')}</span>
          </div>
          <h1>{post.title}</h1>
          {post.benchmarkRoundId && (
            <p className="batch-date">
              测评日期 {post.date} · 整理日期 {post.publishedAt} · 来源快照 {benchmark.version}
            </p>
          )}
          <p>{post.subtitle}</p>
        </header>
        <section className="article-content">
          {post.content.map((block, index) => (
            <ContentRenderer block={block} key={`${block.type}-${index}`} />
          ))}
          {post.sourcePath || post.sourceUrl ? (
            <aside className="source-note" aria-label="Research source">
              <p className="kicker">Source</p>
              {post.sourcePath ? <p>{post.sourcePath}</p> : null}
              {post.sourceUrl ? (
                <a href={post.sourceUrl} target="_blank" rel="noreferrer">
                  查看原始来源 <ArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
            </aside>
          ) : null}
        </section>
      </article>
      <aside className="article-aside">
        <div className="article-tools">
          <button type="button" onClick={onBack}>
            <ArrowLeft aria-hidden="true" /> 返回列表
          </button>
          <button type="button" onClick={onCopy}>
            <Copy aria-hidden="true" /> 复制链接
          </button>
          <button type="button" onClick={onToggleReader}>
            <Type aria-hidden="true" /> 切换大字
          </button>
        </div>
        <section>
          <p className="kicker">Contents</p>
          <div className="toc">
            {toc.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              >
                {item.text}
              </button>
            ))}
          </div>
        </section>
        <section>
          <p className="kicker">Related</p>
          <div className="related-list">
            {related.length ? (
              related.map((item) => (
                <a href={`#/post/${item.slug}`} key={item.slug}>
                  {item.title}
                </a>
              ))
            ) : (
              <span>暂无相关文章</span>
            )}
          </div>
        </section>
      </aside>
    </main>
  );
};

const App = () => {
  const [category, setCategory] = useState(allValue);
  const [tag, setTag] = useState(allValue);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortMode>('latest');
  const [section, setSection] = useState<SectionFilter>(() => getSectionFromHash());
  const [activeSlug, setActiveSlug] = useState<string | null>(() => getSlugFromHash());
  const [bookmarks, setBookmarks] = useState<Set<string>>(() => readBookmarks());
  const [toast, setToast] = useState('');
  const [readerLarge, setReaderLarge] = useState(false);
  const [progress, setProgress] = useState(0);
  const searchIndex = useMemo(
    () => new Map(posts.map((post) => [post.slug, postSearchText(post)])),
    [],
  );

  const result = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = posts.filter((post) => {
      const matchesSection = section === allValue || getPostSection(post) === section;
      const matchesCategory = category === allValue || post.category === category;
      const matchesTag = tag === allValue || post.tags.includes(tag);
      const matchesQuery = !needle || (searchIndex.get(post.slug) || '').includes(needle);
      return matchesSection && matchesCategory && matchesTag && matchesQuery;
    });

    return filtered.sort((a, b) => {
      if (sort === 'reading') return b.readMins - a.readMins;
      if (sort === 'title') return a.title.localeCompare(b.title, 'zh-CN');
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [category, query, searchIndex, section, sort, tag]);

  const activePost = activeSlug ? posts.find((post) => post.slug === activeSlug) : undefined;

  useEffect(() => {
    const handleHash = () => {
      const nextSlug = getSlugFromHash();
      setActiveSlug(nextSlug);
      if (sectionRoutes[window.location.hash]) {
        setSection(getSectionFromHash());
        setCategory(allValue);
        setTag(allValue);
      }
      if (window.location.hash === '#/') {
        setSection(allValue);
      }
      if (!nextSlug && window.location.hash === '#archive') {
        window.setTimeout(() => {
          document
            .querySelector(window.location.hash)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    document.title = activePost ? `${activePost.title} - sidcloud Notes` : 'sidcloud Notes';
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [activePost]);

  useEffect(() => {
    const updateProgress = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const resetFilters = () => {
    setSection(allValue);
    setCategory(allValue);
    setTag(allValue);
    setQuery('');
    setSort('latest');
    if (window.location.hash !== '#/') window.location.hash = '#/';
  };

  const updateSection = (value: SectionFilter) => {
    setSection(value);
    setCategory(allValue);
    setTag(allValue);
    if (value !== allValue) {
      const next = Object.keys(sectionRoutes).find((route) => sectionRoutes[route] === value)!;
      if (window.location.hash !== next) window.location.hash = next;
      return;
    }
    if (window.location.hash !== '#/') window.location.hash = '#/';
  };

  const toggleBookmark = (slug: string) => {
    setBookmarks((current) => {
      const next = new Set(current);
      if (next.has(slug)) {
        next.delete(slug);
        setToast('已取消收藏');
      } else {
        next.add(slug);
        setToast('已加入收藏');
      }
      writeBookmarks(next);
      return next;
    });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setToast('链接已复制');
    } catch {
      setToast('当前浏览器不允许复制');
    }
  };

  return (
    <div className={readerLarge ? 'reader-large' : undefined}>
      <div className="reading-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <div className="site-shell">
        <Header />
        {activePost ? (
          <ArticleView
            post={activePost}
            onBack={() => {
              window.location.hash =
                Object.keys(sectionRoutes).find(
                  (route) => sectionRoutes[route] === getPostSection(activePost),
                ) || '#/';
            }}
            onCopy={copyLink}
            onToggleReader={() => setReaderLarge((value) => !value)}
          />
        ) : (
          <HomeView
            category={category}
            tag={tag}
            query={query}
            sort={sort}
            section={section}
            result={result}
            bookmarks={bookmarks}
            onCategory={setCategory}
            onTag={setTag}
            onQuery={setQuery}
            onSort={setSort}
            onSection={updateSection}
            onBookmark={toggleBookmark}
            onReset={resetFilters}
          />
        )}
        <SiteFooter />
      </div>
      <div className={`toast${toast ? ' is-visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
};

export default App;
