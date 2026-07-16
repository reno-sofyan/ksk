#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { BLOG_POSTS, SITE_URL, getBlogPostUrl } from '../src/data/blogPosts.js';

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

  const entries = [
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
    ...BLOG_POSTS.map((post) => ({
      location: getBlogPostUrl(post),
      lastModified: post.dateModified,
      changeFrequency: 'monthly',
      priority: '0.8'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(renderUrl).join('\n')}
</urlset>
`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, sitemap, 'utf8');
  console.log(`Generated sitemap with ${entries.length} URLs`);
}

main();
