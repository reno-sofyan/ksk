#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve(process.cwd(), process.argv[2] || 'dist');
const variant = (process.argv[3] || process.env.VITE_SITE_VARIANT || process.env.SITE_VARIANT || 'rivere').toLowerCase();
const indexPath = path.join(outputDir, 'index.html');

const variants = {
  company: {
    title: 'PT Kinara Land Indonesia | Developer Properti Bogor',
    description: 'Company profile PT Kinara Land Indonesia, developer properti dan pengelola ekosistem hunian produktif di Bogor.',
    canonical: 'https://kinaraland.com/',
    siteName: 'PT Kinara Land Indonesia',
    image: 'https://kinaraland.com/images/gerbang.jpeg',
    imageAlt: 'PT Kinara Land Indonesia company profile',
    preload: 'images/gerbang.jpeg',
    eyebrow: 'PT Kinara Land Indonesia',
    h1: 'PT Kinara Land Indonesia',
    subtitle: 'Developer properti dan ekosistem hunian produktif di Bogor.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://kinaraland.com/#organization',
          name: 'PT Kinara Land Indonesia',
          url: 'https://kinaraland.com/'
        },
        {
          '@type': 'WebSite',
          '@id': 'https://kinaraland.com/#website',
          url: 'https://kinaraland.com/',
          name: 'PT Kinara Land Indonesia',
          inLanguage: 'id-ID',
          publisher: { '@id': 'https://kinaraland.com/#organization' }
        },
        {
          '@type': 'WebPage',
          '@id': 'https://kinaraland.com/#webpage',
          url: 'https://kinaraland.com/',
          name: 'PT Kinara Land Indonesia | Developer Properti Bogor',
          description: 'Company profile PT Kinara Land Indonesia, developer properti dan pengelola ekosistem hunian produktif di Bogor.',
          inLanguage: 'id-ID',
          isPartOf: { '@id': 'https://kinaraland.com/#website' },
          about: { '@id': 'https://kinaraland.com/#organization' }
        }
      ]
    }
  },
  rivere: {
    title: 'Rivere Kostaycation IPB | Smart Property Investment Ring 1 IPB',
    description: 'Rivere Kostaycation IPB adalah investasi properti premium berkonsep resort di Ring 1 IPB, 2 menit dari gerbang utama IPB, legalitas SHM, dan dikelola profesional oleh Kyra Stay.',
    canonical: 'https://rivere.kinaraland.com/',
    siteName: 'Rivere Kostaycation IPB',
    image: 'https://rivere.kinaraland.com/images/rivere/Design%201/1.png',
    imageAlt: 'Rivere Kostaycation IPB, investasi kost resort premium dekat IPB',
    preload: 'images/rivere/Design%201/1.png',
    eyebrow: 'Rivere Kostaycation IPB',
    h1: 'Rivere Kostaycation IPB',
    subtitle: 'Lebih dari investasi properti: kost berkonsep resort di Ring 1 IPB, hanya 2 menit dari gerbang utama dan bebas macet.',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': 'https://rivere.kinaraland.com/#organization',
          name: 'PT Kinara Land Indonesia',
          url: 'https://kinaraland.com/',
          brand: {
            '@type': 'Brand',
            name: 'Rivere Kostaycation IPB'
          }
        },
        {
          '@type': 'WebSite',
          '@id': 'https://rivere.kinaraland.com/#website',
          url: 'https://rivere.kinaraland.com/',
          name: 'Rivere Kostaycation IPB',
          inLanguage: 'id-ID',
          publisher: { '@id': 'https://rivere.kinaraland.com/#organization' }
        },
        {
          '@type': 'WebPage',
          '@id': 'https://rivere.kinaraland.com/#webpage',
          url: 'https://rivere.kinaraland.com/',
          name: 'Rivere Kostaycation IPB | Smart Property Investment Ring 1 IPB',
          description: 'Rivere Kostaycation IPB adalah investasi properti premium berkonsep resort di Ring 1 IPB, 2 menit dari gerbang utama IPB, legalitas SHM, dan dikelola profesional oleh Kyra Stay.',
          inLanguage: 'id-ID',
          isPartOf: { '@id': 'https://rivere.kinaraland.com/#website' },
          about: { '@id': 'https://rivere.kinaraland.com/#organization' }
        }
      ]
    }
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function serializeSchema(schema) {
  return JSON.stringify(schema).replaceAll('<', '\\u003c');
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Unable to replace ${label} in ${indexPath}`);
  }

  const next = html.replace(pattern, replacement);

  return next;
}

function renderSeo(config) {
  return `<!-- SEO_DEFAULT_START -->
    <link rel="icon" href="/favicon.ico?v=kinara-20260721" sizes="any" />
    <link rel="icon" type="image/png" href="/favicon.png?v=kinara-20260721" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=kinara-20260721" />
    <meta data-react-helmet="true" name="robots" content="index, follow, max-image-preview:large" />
    <link data-react-helmet="true" rel="canonical" href="${escapeHtml(config.canonical)}" />
    <meta data-react-helmet="true" property="og:type" content="website" />
    <meta data-react-helmet="true" property="og:locale" content="id_ID" />
    <meta data-react-helmet="true" property="og:site_name" content="${escapeHtml(config.siteName)}" />
    <meta data-react-helmet="true" property="og:title" content="${escapeHtml(config.title)}" />
    <meta data-react-helmet="true" property="og:description" content="${escapeHtml(config.description)}" />
    <meta data-react-helmet="true" property="og:url" content="${escapeHtml(config.canonical)}" />
    <meta data-react-helmet="true" property="og:image" content="${escapeHtml(config.image)}" />
    <meta data-react-helmet="true" property="og:image:alt" content="${escapeHtml(config.imageAlt)}" />
    <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
    <meta data-react-helmet="true" name="twitter:title" content="${escapeHtml(config.title)}" />
    <meta data-react-helmet="true" name="twitter:description" content="${escapeHtml(config.description)}" />
    <meta data-react-helmet="true" name="twitter:image" content="${escapeHtml(config.image)}" />
    <meta data-react-helmet="true" name="twitter:image:alt" content="${escapeHtml(config.imageAlt)}" />
    <script data-react-helmet="true" type="application/ld+json">${serializeSchema(config.schema)}</script>
    <!-- SEO_DEFAULT_END -->`;
}

function renderShell(config) {
  return `
      <section class="boot-hero" aria-label="${escapeHtml(config.eyebrow)}">
        <div class="boot-media">
          <img
            src="${escapeHtml(config.preload)}"
            alt="${escapeHtml(config.eyebrow)} hero"
            width="1200"
            height="675"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
        </div>
        <div class="boot-overlay"></div>
        <div class="boot-content">
          <div class="boot-inner">
            <p class="boot-eyebrow">${escapeHtml(config.eyebrow)}</p>
            <h1 class="boot-heading">${config.h1}</h1>
            <p class="boot-subtitle">${escapeHtml(config.subtitle)}</p>
          </div>
        </div>
        <div class="boot-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>`;
}

function main() {
  const config = variants[variant];

  if (!config) {
    throw new Error(`Unknown site variant: ${variant}`);
  }

  if (!fs.existsSync(indexPath)) {
    throw new Error(`Built index.html not found at ${indexPath}`);
  }

  let html = fs.readFileSync(indexPath, 'utf8');

  html = replaceRequired(
    html,
    /<title[^>]*>[\s\S]*?<\/title>/i,
    `<title data-react-helmet="true">${escapeHtml(config.title)}</title>`,
    'title'
  );
  html = replaceRequired(
    html,
    /<meta(?=[^>]*name="description")[^>]*>/i,
    `<meta name="description" data-react-helmet="true" content="${escapeHtml(config.description)}" />`,
    'meta description'
  );

  if (/<!-- SEO_DEFAULT_START -->[\s\S]*?<!-- SEO_DEFAULT_END -->/i.test(html)) {
    html = html.replace(/<!-- SEO_DEFAULT_START -->[\s\S]*?<!-- SEO_DEFAULT_END -->/i, renderSeo(config));
  } else {
    html = html.replace('</head>', `${renderSeo(config)}\n\t</head>`);
  }

  html = replaceRequired(
    html,
    /<link\s+rel="preload"[\s\S]*?fetchpriority="high"[\s\S]*?\/>/i,
    `<link rel="preload" as="image" href="${escapeHtml(config.preload)}" fetchpriority="high" />`,
    'preload image'
  );

  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf('</body>', rootStart);

  if (rootStart === -1 || bodyEnd === -1) {
    throw new Error(`Unable to find app root in ${indexPath}`);
  }

  html = `${html.slice(0, rootStart)}<div id="root">${renderShell(config)}
    </div>
  ${html.slice(bodyEnd)}`;

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`Applied ${variant} homepage shell to ${indexPath}`);
}

main();
