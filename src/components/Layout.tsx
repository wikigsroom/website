import { NavLink, Outlet } from 'react-router-dom';
import { Github, Languages, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { siteConfig } from '@/data/site';
import { imageAssets } from '@/data/assets';
import Live2DWidget from '@/components/Live2DWidget';

const Layout = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const next = i18n.language === 'zh-CN' ? 'en-US' : 'zh-CN';
    i18n.changeLanguage(next);
  };

  return (
    <div className="relative min-h-screen bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-orbs opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-soft-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-35" />

      <header className="glass-panel relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={imageAssets.avatar.src}
              alt="sidcloud avatar"
              className="h-10 w-10 rounded-xl border border-white/20 object-cover shadow-soft"
              loading="lazy"
            />
            <div>
              <p className="font-display text-lg tracking-[0.2em]">SID</p>
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">studio</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] lg:flex">
            {siteConfig.nav.map((item) =>
              item.external ? (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition hover:text-neon-cyan"
                >
                  {t(item.labelKey)}
                </a>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    clsx(
                      'transition hover:text-neon-cyan',
                      isActive ? 'text-neon-cyan' : 'text-white/70',
                    )
                  }
                >
                  {t(item.labelKey)}
                </NavLink>
              ),
            )}
          </nav>
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] transition hover:border-neon-cyan/60 hover:text-neon-cyan"
          >
            <Languages className="h-4 w-4" />
            {i18n.language === 'zh-CN' ? 'EN' : '中文'}
          </button>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-3 px-6 pb-4 text-xs uppercase tracking-[0.2em] text-white/60 lg:hidden">
          {siteConfig.nav.map((item) =>
            item.external ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-neon-cyan"
              >
                {t(item.labelKey)}
              </a>
            ) : (
              <NavLink key={item.path} to={item.path} className="transition hover:text-neon-cyan">
                {t(item.labelKey)}
              </NavLink>
            ),
          )}
        </div>
      </header>

      <main className="relative z-10">
        <Outlet />
      </main>

      <footer className="glass-panel relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em]">sidcloud Studio</p>
            <p className="text-xs text-white/60">{t('footer.tagline')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-white/70">
            <a
              className="flex items-center gap-2 normal-case transition hover:text-neon-cyan"
              href={siteConfig.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
              <s>Github(惨遭封禁)</s>
            </a>
            <a
              className="flex items-center gap-2 normal-case transition hover:text-neon-cyan"
              href={siteConfig.socials.currentGithub}
              target="_blank"
              rel="noreferrer"
            >
              <Github className="h-4 w-4" />
              现任仓库
            </a>
            <a
              className="flex items-center gap-2 transition hover:text-neon-pink"
              href={siteConfig.socials.telegram}
              target="_blank"
              rel="noreferrer"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>
          </div>
        </div>
      </footer>

      <Live2DWidget />
    </div>
  );
};

export default Layout;
