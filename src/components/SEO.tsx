import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const SITE_NAME = 'DATA Xalqaro Maktabi';
const DEFAULT_DESC = "DATA Xalqaro Maktabi — Urganch shahridagi zamonaviy xalqaro maktab. Sifatli ta'lim, ingliz tili, sport va ijodiy rivojlanish.";
const DOMAIN = 'https://datamaktab.uz';

export default function SEO({ title, description, url, image }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const desc = description || DEFAULT_DESC;
  const canonical = url ? `${DOMAIN}${url}` : DOMAIN;
  const ogImage = image || `${DOMAIN}/students-hero.webp`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="uz_UZ" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Misc */}
      <meta name="robots" content="index, follow" />
      <meta name="theme-color" content="#062bad" />
    </Helmet>
  );
}
