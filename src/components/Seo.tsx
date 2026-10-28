import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const Seo = ({ titleKey, descriptionKey }: { titleKey: string; descriptionKey: string }) => {
  const { t } = useTranslation();
  const title = t(titleKey);
  const description = t(descriptionKey);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default Seo;
