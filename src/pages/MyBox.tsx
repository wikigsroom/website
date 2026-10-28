import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import ToolCard from '@/components/ToolCard';
import { imageAssets } from '@/data/assets';
import {
  getCategoryId,
  getCategoryLabel,
  getLocalizedText,
  getTagLabel,
  type LocalizedTool,
} from '@/lib/localizedToolbox';

const MyBox = () => {
  const { t, i18n } = useTranslation();
  const [tools, setTools] = useState<LocalizedTool[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const local = await fetch('/myapp.json');
        if (local.ok) {
          const payload = (await local.json()) as LocalizedTool[];
          if (Array.isArray(payload)) {
            setTools(payload);
            return;
          }
        }
      } catch {
        // fall through to empty state
      }

      setTools([]);
    };

    load();
  }, []);

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    tools.forEach((tool) => {
      unique.set(getCategoryId(tool.category), getCategoryLabel(tool.category, i18n.language));
    });
    return Array.from(unique.entries()).map(([id, label]) => ({ id, label }));
  }, [i18n.language, tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const categoryId = getCategoryId(tool.category);
      const matchesCategory = activeCategory === 'all' || categoryId === activeCategory;
      const haystack = [
        getLocalizedText(tool.name, i18n.language),
        getLocalizedText(tool.description, i18n.language),
        getCategoryLabel(tool.category, i18n.language),
        getLocalizedText(tool.vendor, i18n.language),
        ...(tool.tags || []).map((tag) => getTagLabel(tag, i18n.language)),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesQuery = haystack.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, i18n.language, query, tools]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Seo titleKey="seo.mybox.title" descriptionKey="seo.mybox.description" />
      <SectionHeading title={t('toolbox.mybox.title')} description={t('toolbox.mybox.subtitle')} />

      <div className="glass-panel relative mb-8 overflow-hidden rounded-3xl border border-white/10">
        <img
          src={imageAssets.banner.src}
          alt={t(imageAssets.banner.altKey)}
          className="h-48 w-full object-cover md:h-56"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.3em] text-white/70">favorcoin</div>
      </div>

      <div className="glass-panel flex flex-col gap-4 rounded-3xl border border-white/10 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
              activeCategory === 'all'
                ? 'border-neon-cyan/60 text-neon-cyan'
                : 'border-white/20 text-white/60 hover:border-neon-cyan/40'
            }`}
          >
            {t('toolbox.filterAll')}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                activeCategory === category.id
                  ? 'border-neon-cyan/60 text-neon-cyan'
                  : 'border-white/20 text-white/60 hover:border-neon-cyan/40'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('toolbox.search')}
          className="w-full rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm text-white/80 outline-none transition focus:border-neon-pink/60 md:w-72"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            name={getLocalizedText(tool.name, i18n.language)}
            summary={getLocalizedText(tool.description, i18n.language)}
            category={getCategoryLabel(tool.category, i18n.language)}
            vendor={getLocalizedText(tool.vendor, i18n.language)}
            tags={(tool.tags || []).map((tag) => getTagLabel(tag, i18n.language))}
            url={tool.website || 'https://example.com'}
          />
        ))}
      </div>
    </section>
  );
};

export default MyBox;
