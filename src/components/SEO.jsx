import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = "Segun Salako | AI Systems Architect & Vibe Coder";
  const defaultDescription = "Segun Salako is an AI Systems Architect and Vibe Coder specializing in AI automation, n8n workflows, generative AI development, and scalable cloud solutions.";
  const defaultKeywords = "Vibe Coding, AI Automation Specialist, AI Engineer, Generative AI Developer, Prompt Engineering, System Architect, Cloud Architect, Scalable Solutions, PostgreSQL Optimization, Supabase Expert, n8n Workflow Automation, Zapier Integration, Python Developer, React, Vite";
  const defaultImage = "/og-image.png"; // Helper to be created or added later
  const defaultUrl = window.location.href;

  const siteTitle = title ? `${title} | Segun Salako` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaImage = image || defaultImage;
  const metaUrl = url || defaultUrl;

  return (
    <Helmet>
      {/* Visual Identity */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content="Segun Salako" />

      {/* Robots */}
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
    </Helmet>
  );
};

export default SEO;
