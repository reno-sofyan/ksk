#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { BLOG_POSTS, SITE_URL, getBlogPostUrl } from '../src/data/blogPosts.js';
import { DENAH_PAGE } from '../src/data/riverePlans.js';

const COMPANY_SITE_URL = 'https://kinaraland.com';
const ROYAL_CNN_SITE_URL = 'https://royalcnn.kinaraland.com';
const KSK_SITE_URL = 'https://ksk.kinaraland.com';
const variant = (process.env.SITE_VARIANT || process.env.VITE_SITE_VARIANT || 'rivere').toLowerCase();

function renderUrl({ location, lastModified, changeFrequency, priority }) {
  return `  <url>
    <loc>${location}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function main() {
  const latestModified = BLOG_POSTS.reduce(
    (latest, post) => post.dateModified > latest ? post.dateModified : latest,
    '2026-07-14'
  );

  const entries = variant === 'company'
    ? [
        {
          location: `${COMPANY_SITE_URL}/`,
          lastModified: latestModified,
          changeFrequency: 'weekly',
          priority: '1.0'
        }
      ]
    : variant === 'ksk'
      ? [{
          location: `${KSK_SITE_URL}/`,
          lastModified: latestModified,
          changeFrequency: 'monthly',
          priority: '1.0'
        }]
    : variant === 'royal'
      ? [{
          location: `${ROYAL_CNN_SITE_URL}/`,
          lastModified: latestModified,
          changeFrequency: 'weekly',
          priority: '1.0'
        }]
      : [
        {
          location: `${SITE_URL}/`,
          lastModified: latestModified,
          changeFrequency: 'weekly',
          priority: '1.0'
        },
        {
          location: `${SITE_URL}/blog/`,
          lastModified: latestModified,
          changeFrequency: 'weekly',
          priority: '0.8'
        },
        {
          location: `${SITE_URL}${DENAH_PAGE.path}`,
          lastModified: latestModified,
          changeFrequency: 'monthly',
          priority: '0.8'
        },
        ...BLOG_POSTS.filter((post) => post.robotsIndex !== false && (post.status || 'published') === 'published').map((post) => ({
          location: getBlogPostUrl(post),
          lastModified: post.dateModified,
          changeFrequency: 'monthly',
          priority: '0.8'
        }))
      ];

  const sitemapUrl = variant === 'company'
    ? `${COMPANY_SITE_URL}/sitemap.xml`
    : variant === 'ksk'
      ? `${KSK_SITE_URL}/sitemap.xml`
    : variant === 'royal'
      ? `${ROYAL_CNN_SITE_URL}/sitemap.xml`
      : `${SITE_URL}/sitemap.xml`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(renderUrl).join('\n')}
</urlset>
`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
  fs.writeFileSync(outputPath, sitemap, 'utf8');
  fs.writeFileSync(robotsPath, `User-agent: *
Allow: /
Sitemap: ${sitemapUrl}
`, 'utf8');
  console.log(`Generated ${variant} sitemap with ${entries.length} URLs`);
}

main();
