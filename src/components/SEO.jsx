import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://segunautomate.vercel.app';
const PERSON_NAME = 'Segun Salako';
const TWITTER_HANDLE = '@segunexploresdata';
const LINKEDIN_URL = 'https://www.linkedin.com/in/segunexploresdata/';

const DEFAULT_TITLE = 'Segun Salako | No-Code Automation Engineer, Vibe Coder & AI Systems Architect';
const DEFAULT_DESCRIPTION =
  'Segun Salako is a No-Code Automation Engineer, Vibe Coder, and AI Systems Architect based in Lagos, Nigeria. Expert in n8n, Zapier, Make.com, AI agents, LLM integration, Generative AI, workflow automation, and scalable cloud systems. Available for freelance and remote work.';
const DEFAULT_KEYWORDS =
  'No-Code Automation Engineer, Vibe Coder, AI Systems Architect, Workflow Automation, n8n Expert, Zapier Specialist, Make.com, AI Automation, No-Code Developer, Generative AI Developer, LLM Integration, AI Agents, Prompt Engineering, System Architect, Cloud Architecture, Supabase, PostgreSQL, Python Automation, React Developer, Segun Salako, segunexploresdata, Automation Specialist Nigeria, Remote Automation Engineer, Business Process Automation, API Integration, Vibe Coding, AI-powered workflows, ETL Pipelines, Power BI, No-code tools, Low-code automation, Lagos Nigeria';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

/* ── JSON-LD Schemas ─────────────────────────────────────────────────── */

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSON_NAME,
  url: SITE_URL,
  image: DEFAULT_IMAGE,
  sameAs: [
    LINKEDIN_URL,
    'https://twitter.com/segunexploresdata',
    `${SITE_URL}`,
  ],
  jobTitle: 'No-Code Automation Engineer & AI Systems Architect',
  description: DEFAULT_DESCRIPTION,
  knowsAbout: [
    'No-Code Automation',
    'Workflow Automation',
    'n8n',
    'Zapier',
    'Make.com',
    'AI Agents',
    'Generative AI',
    'LLM Integration',
    'Prompt Engineering',
    'System Architecture',
    'Cloud Architecture',
    'Supabase',
    'PostgreSQL',
    'Python',
    'React',
    'Vibe Coding',
    'ETL Pipelines',
    'Power BI',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lagos',
    addressCountry: 'NG',
  },
  availableService: {
    '@type': 'Service',
    name: 'Freelance Automation & AI Development',
    description:
      'No-code automation, AI workflow design, system architecture, and AI agent development for businesses worldwide.',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${PERSON_NAME} – Portfolio`,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: { '@type': 'Person', name: PERSON_NAME },
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/?s={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: DEFAULT_TITLE,
  url: SITE_URL,
  mainEntity: personSchema,
};

/* ── Component ───────────────────────────────────────────────────────── */

const SEO = ({ title, description, keywords, image, url, noIndex = false }) => {
  const canonicalUrl = url || SITE_URL;
  const siteTitle = title ? `${title} | ${PERSON_NAME}` : DEFAULT_TITLE;
  const metaDescription = description || DEFAULT_DESCRIPTION;
  const metaKeywords = keywords || DEFAULT_KEYWORDS;
  const metaImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* ── Google Site Verification ──────────────────────────────── */}
      <meta name="google-site-verification" content="50UlGrPVqUh-bYmc61v7DGa-gdNfVzJKKBMFFhl6hEk" />

      {/* ── Core ──────────────────────────────────────────────────── */}
      <html lang="en" />
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={PERSON_NAME} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Geo / Language ────────────────────────────────────────── */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="NG-LA" />
      <meta name="geo.placename" content="Lagos, Nigeria" />

      {/* ── Open Graph ────────────────────────────────────────────── */}
      <meta property="og:type" content="profile" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={`${PERSON_NAME} – Portfolio`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${PERSON_NAME} – No-Code Automation Engineer & AI Systems Architect`} />
      <meta property="profile:first_name" content="Segun" />
      <meta property="profile:last_name" content="Salako" />
      <meta property="profile:username" content="segunexploresdata" />

      {/* ── Twitter / X ───────────────────────────────────────────── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={`${PERSON_NAME} – No-Code Automation Engineer & AI Systems Architect`} />

      {/* ── LinkedIn ──────────────────────────────────────────────── */}
      <meta property="og:see_also" content={LINKEDIN_URL} />

      {/* ── JSON-LD Structured Data ───────────────────────────────── */}
      <script type="application/ld+json">
        {JSON.stringify(profilePageSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
