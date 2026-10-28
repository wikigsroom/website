import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import ToolCard from '@/components/ToolCard';
import { devToolCategories, devTools } from '@/data/toolbox';
import { imageAssets } from '@/data/assets';

const DevToolbox = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [query, setQuery] = useState('');

  const filteredTools = useMemo(() => {
    return devTools.filter((tool) => {
      const matchesCategory =
        activeCategory === 'all' || tool.categoryKey === activeCategory;
      const content =
        [
          t(tool.nameKey),
          t(tool.summaryKey),
          t(tool.sceneKey),
          ...tool.tagKeys.map((tag) => t(tag)),
        ]
          .join(' ')
          .toLowerCase();
      const matchesQuery = content.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, t]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Seo titleKey="seo.dev.title" descriptionKey="seo.dev.description" />
      <SectionHeading title={t('toolbox.dev.title')} description={t('toolbox.dev.subtitle')} />

      <div className="glass-panel relative mb-8 overflow-hidden rounded-3xl border border-white/10">
        <img
          src={imageAssets.banner.src}
          alt={t(imageAssets.banner.altKey)}
          className="h-48 w-full object-cover md:h-56"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.3em] text-white/70">
          favorcoin
        </div>
      </div>

      <div className="glass-panel flex flex-col gap-4 rounded-3xl border border-white/10 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
              activeCategory === 'all'
                ? 'border-neon-pink/60 text-neon-pink'
                : 'border-white/20 text-white/60 hover:border-neon-pink/40'
            }`}
          >
            {t('toolbox.filterAll')}
          </button>
          {devToolCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                activeCategory === category
                  ? 'border-neon-pink/60 text-neon-pink'
                  : 'border-white/20 text-white/60 hover:border-neon-pink/40'
              }`}
            >
              {t(category)}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('toolbox.search')}
          className="w-full rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white/80 outline-none transition focus:border-neon-cyan/60 md:w-72"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            name={t(tool.nameKey)}
            summary={t(tool.summaryKey)}
            category={t(tool.sceneKey)}
            tags={tool.tagKeys.map((tag) => t(tag))}
            url={tool.url}
          />
        ))}
      </div>
    </section>
  );
};

export default DevToolbox;
