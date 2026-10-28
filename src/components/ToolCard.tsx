import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type ToolCardProps = {
  name: string;
  summary: string;
  category?: string;
  vendor?: string;
  tags: string[];
  url: string;
};

const ToolCard = ({ name, summary, category, vendor, tags, url }: ToolCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="glass-card rounded-3xl border border-white/10 p-6 shadow-soft transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-neon-cyan" />
            <h3 className="font-display text-lg text-white">{name}</h3>
          </div>
          <p className="mt-2 text-sm text-white/70">{summary}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center rounded-full border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition hover:border-neon-pink/60 hover:text-neon-pink"
          aria-label={t('toolbox.visit')}
          title={t('toolbox.visit')}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neon-cyan/30 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neon-cyan/90"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-white/50">
        {category ? (
          <p>
            {t('toolbox.category')}: {category}
          </p>
        ) : null}
        {vendor ? (
          <p>
            {t('toolbox.vendor')}: {vendor}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ToolCard;
