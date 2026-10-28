import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '@/components/Seo';
import SectionHeading from '@/components/SectionHeading';
import { founderData } from '@/data/founder';
import { projects } from '@/data/projects';
import { updates } from '@/data/updates';
import { imageAssets } from '@/data/assets';

const Home = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language === 'zh-CN' ? 'zh-CN' : 'en-US';

  const founderOf = t(founderData.founderOfKey, { returnObjects: true }) as string[];
  const coFounderOf = t(founderData.coFounderOfKey, { returnObjects: true }) as string[];
  const communityOf = t(founderData.communityOfKey, { returnObjects: true }) as string[];
  const stacks = t(founderData.stacksKey, { returnObjects: true }) as string[];
  const pinned = t(founderData.pinnedKey, { returnObjects: true }) as string[];

  const coreCards = [
    {
      title: t('home.core.cards.agent.title'),
      description: t('home.core.cards.agent.description'),
    },
    {
      title: t('home.core.cards.web3.title'),
      description: t('home.core.cards.web3.description'),
    },
    {
      title: t('home.core.cards.dev.title'),
      description: t('home.core.cards.dev.description'),
    },
  ];

  return (
    <div>
      <Seo titleKey="seo.home.title" descriptionKey="seo.home.description" />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,0.8fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neon-cyan">
              {t('hero.kicker')}
            </p>
            <span className="mt-3 inline-flex rounded-full border border-neon-pink/40 bg-black/30 px-4 py-1 text-xs uppercase tracking-[0.3em] text-neon-pink/90">
              {t('hero.badge')}
            </span>
            <h1 className="mt-4 font-display text-4xl uppercase tracking-[0.2em] md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mt-3 text-lg text-white/70">{t('hero.subtitle')}</p>
            <p className="mt-6 max-w-xl text-sm text-white/60">{t('hero.description')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/aitoolbox"
                className="rounded-full border border-neon-cyan/50 bg-neon-cyan/10 px-6 py-3 text-xs uppercase tracking-[0.3em] text-neon-cyan transition hover:bg-neon-cyan/20"
              >
                {t('hero.ctaAi')}
              </Link>
              <Link
                to="/devtoolbox"
                className="rounded-full border border-neon-pink/50 bg-neon-pink/10 px-6 py-3 text-xs uppercase tracking-[0.3em] text-neon-pink transition hover:bg-neon-pink/20"
              >
                {t('hero.ctaDev')}
              </Link>
              <a
                href="https://github.com/carzygod"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-neon-lime/50 hover:text-neon-lime"
              >
                {t('hero.ctaProjects')}
              </a>
            </div>
          </div>
          <div className="grid gap-6">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="image-frame h-52 w-full"
            >
              <img
                src={imageAssets.banner.src}
                alt={t(imageAssets.banner.altKey)}
                loading="lazy"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-panel rounded-3xl p-6"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                {t('home.founder.title')}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <img
                  src={imageAssets.avatar.src}
                  alt={t(imageAssets.avatar.altKey)}
                  className="h-14 w-14 rounded-full border border-white/20 object-cover"
                  loading="lazy"
                />
                <h2 className="font-display text-2xl uppercase tracking-[0.2em]">
                  {t(founderData.titleKey)}
                </h2>
              </div>
              <p className="mt-3 text-sm text-white/70">{t(founderData.introKey)}</p>
              <a
                href={founderData.github}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-neon-cyan"
              >
                <Github className="h-4 w-4" />
                GitHub Signal
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeading title={t('home.core.title')} description={t('home.core.subtitle')} />
        <div className="grid gap-6 md:grid-cols-3">
          {coreCards.map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -8 }}
              className="glass-card rounded-3xl border border-white/10 p-6 shadow-soft"
            >
              <h3 className="font-display text-lg uppercase tracking-[0.15em] text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeading title={t('home.featured.title')} description={t('home.featured.subtitle')} />
        <div className="grid gap-6 md:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <motion.a
                key={project.id}
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6 }}
                className="group glass-panel rounded-3xl border border-white/10 p-6 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-lg text-white">
                      {t(project.nameKey)}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">{t(project.descriptionKey)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tagsKey.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neon-cyan/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neon-cyan/90"
                        >
                          {t(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition group-hover:text-neon-cyan" />
                </div>
              </motion.a>
            ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeading title={t('home.updates.title')} description={t('home.updates.subtitle')} />
        <div className="grid gap-4 md:grid-cols-3">
          {updates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-3xl border border-white/10 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                {new Intl.DateTimeFormat(locale, {
                  month: 'short',
                  day: '2-digit',
                  year: 'numeric',
                }).format(new Date(update.date))}
              </p>
              <h4 className="mt-3 font-display text-base text-white">{t(update.titleKey)}</h4>
              <p className="mt-2 text-sm text-white/70">{t(update.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex gap-6 overflow-x-auto pb-2">
          {imageAssets.gallery.map((visual) => (
            <motion.div
              key={visual.id}
              whileHover={{ y: -6 }}
              className="glass-panel relative h-80 w-56 flex-none overflow-hidden rounded-3xl border border-white/10 md:h-96 md:w-64"
            >
              <img
                className="h-full w-full object-cover"
                src={visual.src}
                alt={t(visual.altKey)}
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <SectionHeading title={t('home.founder.title')} description={t('home.founder.subtitle')} />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel rounded-3xl border border-white/10 p-6">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-neon-cyan" />
              <h3 className="font-display text-lg text-white">{t(founderData.titleKey)}</h3>
            </div>
            <p className="mt-3 text-sm text-white/70">{t(founderData.introKey)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {stacks.map((stack) => (
                <span
                  key={stack}
                  className="rounded-full border border-neon-pink/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neon-pink/90"
                >
                  {stack}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              { label: t('founder.labels.founderOf'), items: founderOf },
              { label: t('founder.labels.coFounderOf'), items: coFounderOf },
              { label: t('founder.labels.communityOf'), items: communityOf },
            ].map((group) => (
              <div key={group.label} className="glass-card rounded-3xl border border-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">{group.label}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neon-cyan/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neon-cyan/90"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel mt-6 rounded-3xl border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            {t('founder.labels.pinned')}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {pinned.map((item) => (
              <span
                key={item}
                className="rounded-full border border-neon-lime/30 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.2em] text-neon-lime/90"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
