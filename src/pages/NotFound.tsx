import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import { imageAssets } from '@/data/assets';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center">
      <Seo titleKey="seo.notFound.title" descriptionKey="seo.notFound.description" />
      <div className="glass-panel rounded-3xl border border-white/10 px-10 py-12">
        <img
          src={imageAssets.hero.src}
          alt={t(imageAssets.hero.altKey)}
          className="mb-6 h-40 w-full rounded-2xl object-cover"
          loading="lazy"
        />
        <p className="text-xs uppercase tracking-[0.3em] text-neon-pink">404</p>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.2em]">
          {t('notFound.title')}
        </h1>
        <p className="mt-3 text-sm text-white/70">{t('notFound.subtitle')}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 text-xs uppercase tracking-[0.3em] text-neon-cyan"
        >
          {t('notFound.action')}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
