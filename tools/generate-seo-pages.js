#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { AUTHOR_NAME, AUTHOR_URL, BLOG_POSTS, SITE_URL, getBlogPostUrl } from '../src/data/blogPosts.js';

const outputDir = path.resolve(process.cwd(), process.argv[2] || 'dist');
const sourceIndexPath = path.join(outputDir, 'index.html');

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

function formatDate(date) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta'
  }).format(new Date(`${date}T00:00:00+07:00`));
}

function renderHeader() {
  return `
    <header class="border-b border-border bg-background">
      <div class="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" class="font-bold text-primary">Rivere Kostaycation IPB</a>
        <nav aria-label="Navigasi utama" class="flex items-center gap-5 text-sm font-semibold">
          <a href="/" class="text-muted-foreground">Beranda</a>
          <a href="/blog/" class="text-primary">Blog</a>
        </nav>
      </div>
    </header>`;
}

function renderFooter() {
  return `
    <footer class="border-t border-border bg-primary py-10 text-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 lg:px-8">
        <p class="font-bold">Rivere Kostaycation IPB</p>
        <p class="text-sm text-white/70">Investasi properti premium di Ring 1 IPB</p>
      </div>
    </footer>`;
}

function renderBlogIndex() {
  const cards = BLOG_POSTS.map((post) => `
      <article>
        <a href="/blog/${escapeHtml(post.slug)}/" aria-label="Baca artikel ${escapeHtml(post.title)}">
          <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}" loading="lazy" class="aspect-[16/10] w-full rounded-lg object-cover" />
        </a>
        <p class="mt-5 text-sm font-semibold text-accent">${escapeHtml(post.category)}</p>
        <h2 class="mt-2 text-2xl font-bold text-primary"><a href="/blog/${escapeHtml(post.slug)}/">${escapeHtml(post.title)}</a></h2>
        <p class="mt-3 leading-7 text-muted-foreground">${escapeHtml(post.excerpt)}</p>
        <p class="mt-3 text-sm text-muted-foreground"><time datetime="${escapeHtml(post.datePublished)}">${escapeHtml(formatDate(post.datePublished))}</time> · ${escapeHtml(post.readTime)}</p>
      </article>`).join('');

  return `${renderHeader()}
    <main>
      <section class="bg-primary py-16 text-white sm:py-20">
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p class="font-semibold text-accent">Blog Rivere</p>
          <h1 class="mt-4 max-w-4xl text-4xl font-bold sm:text-5xl">Wawasan Investasi Properti Dekat IPB</h1>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-white/75">Analisis praktis tentang investasi kost, lokasi kampus, pengelolaan hospitality, yield, dan nilai aset.</p>
        </div>
      </section>
      <section class="py-14 sm:py-20">
        <div class="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-2 lg:grid-cols-3 sm:px-6 lg:px-8">${cards}</div>
      </section>
      <section id="tentang-tim-rivere" class="border-t border-border py-14">
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold text-primary">Tentang Blog Rivere</h2>
          <p class="mt-5 leading-8 text-muted-foreground">Blog Rivere membahas investasi properti di kawasan kampus IPB, termasuk akses, captive market, legalitas, desain unit, fasilitas, pengelolaan, dan proyeksi finansial. Setiap proyeksi bersifat estimasi dan bukan jaminan hasil.</p>
          <p class="mt-4 leading-8 text-muted-foreground">Konten disusun oleh ${escapeHtml(AUTHOR_NAME)} berdasarkan informasi proyek dan prinsip evaluasi properti yang dapat diperiksa calon investor.</p>
        </div>
      </section>
    </main>${renderFooter()}`;
}

function renderArticle(post) {
  const tableOfContents = post.sections.map((section, index) => `
        <li><a href="#bagian-${index + 1}" class="text-muted-foreground">${escapeHtml(section.heading)}</a></li>`).join('');

  const intro = post.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
  const sections = post.sections.map((section, index) => {
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
    const bullets = section.bullets
      ? `<ul class="space-y-3 border-l-2 border-accent pl-5">${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>`
      : '';

    return `
      <section id="bagian-${index + 1}" class="pt-11">
        <h2 class="text-2xl font-bold text-primary sm:text-3xl">${escapeHtml(section.heading)}</h2>
        <div class="mt-5 space-y-5 text-lg leading-8 text-foreground/80">${paragraphs}${bullets}</div>
      </section>`;
  }).join('');

  const faq = post.faq.map((item) => `
        <details class="border-t border-border py-5">
          <summary class="font-semibold text-primary">${escapeHtml(item.question)}</summary>
          <p class="mt-3 leading-7 text-muted-foreground">${escapeHtml(item.answer)}</p>
        </details>`).join('');

  return `${renderHeader()}
    <main>
      <article>
        <header class="border-b border-border bg-secondary/45 py-14">
          <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" class="mb-7 text-sm text-muted-foreground"><a href="/">Beranda</a> / <a href="/blog/">Blog</a> / ${escapeHtml(post.category)}</nav>
            <p class="font-semibold text-accent">${escapeHtml(post.category)}</p>
            <h1 class="mt-4 text-4xl font-bold leading-tight text-primary sm:text-5xl">${escapeHtml(post.title)}</h1>
            <p class="mt-6 text-lg leading-8 text-muted-foreground">${escapeHtml(post.excerpt)}</p>
            <p class="mt-6 text-sm text-muted-foreground"><time datetime="${escapeHtml(post.datePublished)}">${escapeHtml(formatDate(post.datePublished))}</time> · ${escapeHtml(post.readTime)} · <a href="/blog/#tentang-tim-rivere">${escapeHtml(AUTHOR_NAME)}</a></p>
          </div>
        </header>
        <div class="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8">
          <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}" class="aspect-[16/8] w-full rounded-lg object-cover" fetchpriority="high" />
        </div>
        <div class="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8">
          <aside>
            <p class="font-bold text-primary">Daftar isi</p>
            <ol class="mt-4 space-y-3 border-l border-border pl-4 text-sm">${tableOfContents}</ol>
          </aside>
          <div class="max-w-3xl">
            <div class="space-y-5 text-lg leading-8 text-foreground/80">${intro}</div>
            ${sections}
            <section id="pertanyaan-umum" class="pt-12">
              <h2 class="text-2xl font-bold text-primary sm:text-3xl">Pertanyaan Umum</h2>
              <div class="mt-6 border-b border-border">${faq}</div>
            </section>
            <p class="mt-12 border-l-4 border-accent bg-secondary/60 p-5 text-sm leading-7 text-muted-foreground"><strong class="text-primary">Catatan:</strong> Informasi dan proyeksi dalam artikel ini bersifat edukatif, bukan jaminan hasil investasi. Verifikasi dokumen, kontrak, biaya, dan asumsi finansial sebelum mengambil keputusan.</p>
          </div>
        </div>
      </article>
    </main>${renderFooter()}`;
}

function articleSchema(post) {
  const url = getBlogPostUrl(post);
  const articleText = [
    ...post.intro,
    ...post.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets || [])])
  ].join(' ');
  const wordCount = articleText.trim().split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: { '@type': 'ImageObject', url: `${SITE_URL}${post.image}` },
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: 'id-ID',
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: post.category,
        isAccessibleForFree: true,
        wordCount,
        keywords: post.keywords.join(', '),
        author: { '@type': 'Organization', name: AUTHOR_NAME, url: AUTHOR_URL },
        publisher: { '@type': 'Organization', name: 'PT Kinara Land Indonesia', url: SITE_URL }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer }
        }))
      }
    ]
  };
}

function blogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/blog/#blog`,
    name: 'Blog Rivere Kostaycation IPB',
    url: `${SITE_URL}/blog/`,
    inLanguage: 'id-ID',
    publisher: { '@type': 'Organization', name: 'PT Kinara Land Indonesia', url: SITE_URL },
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: getBlogPostUrl(post),
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: { '@type': 'Organization', name: AUTHOR_NAME, url: AUTHOR_URL }
    }))
  };
}

function applySeo(sourceHtml, { title, description, canonical, image, imageAlt, type, schema, article }, rootMarkup) {
  let html = sourceHtml
    .replace(/\s*<!-- SEO_DEFAULT_START -->[\s\S]*?<!-- SEO_DEFAULT_END -->/i, '')
    .replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title data-react-helmet="true">${escapeHtml(title)}</title>`)
    .replace(/<meta(?=[^>]*name="description")[^>]*>/i, `<meta data-react-helmet="true" name="description" content="${escapeHtml(description)}" />`)
    .replace(/\s*<link\s+rel="preload"[\s\S]*?\/>/i, '');

  const articleTags = article ? `
    <meta data-react-helmet="true" property="article:published_time" content="${escapeHtml(article.datePublished)}" />
    <meta data-react-helmet="true" property="article:modified_time" content="${escapeHtml(article.dateModified)}" />
    <meta data-react-helmet="true" property="article:section" content="${escapeHtml(article.category)}" />` : '';

  const seoTags = `
    <meta data-react-helmet="true" name="robots" content="index, follow, max-image-preview:large" />
    <link data-react-helmet="true" rel="canonical" href="${escapeHtml(canonical)}" />
    <meta data-react-helmet="true" property="og:type" content="${escapeHtml(type)}" />
    <meta data-react-helmet="true" property="og:locale" content="id_ID" />
    <meta data-react-helmet="true" property="og:site_name" content="Rivere Kostaycation IPB" />
    <meta data-react-helmet="true" property="og:title" content="${escapeHtml(title)}" />
    <meta data-react-helmet="true" property="og:description" content="${escapeHtml(description)}" />
    <meta data-react-helmet="true" property="og:url" content="${escapeHtml(canonical)}" />
    <meta data-react-helmet="true" property="og:image" content="${escapeHtml(image)}" />
    <meta data-react-helmet="true" property="og:image:alt" content="${escapeHtml(imageAlt)}" />${articleTags}
    <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
    <meta data-react-helmet="true" name="twitter:title" content="${escapeHtml(title)}" />
    <meta data-react-helmet="true" name="twitter:description" content="${escapeHtml(description)}" />
    <meta data-react-helmet="true" name="twitter:image" content="${escapeHtml(image)}" />
    <meta data-react-helmet="true" name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />
    <script data-react-helmet="true" type="application/ld+json">${serializeSchema(schema)}</script>`;

  html = html.replace('</head>', `${seoTags}\n\t</head>`);

  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf('</body>', rootStart);

  if (rootStart === -1 || bodyEnd === -1) {
    throw new Error('Unable to find the app root in the built index.html');
  }

  return `${html.slice(0, rootStart)}<div id="root">${rootMarkup}\n\t\t</div>\n\t${html.slice(bodyEnd)}`;
}

function writePage(routePath, html) {
  const routeDir = path.join(outputDir, routePath);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
}

function main() {
  if (!fs.existsSync(sourceIndexPath)) {
    throw new Error(`Built index.html not found at ${sourceIndexPath}`);
  }

  const sourceHtml = fs.readFileSync(sourceIndexPath, 'utf8');
  const blogDescription = 'Panduan investasi kost dekat IPB, cara menghitung yield dan ROI properti, serta wawasan kost resort dari Rivere Kostaycation IPB.';

  writePage('blog', applySeo(sourceHtml, {
    title: 'Blog Investasi Properti Dekat IPB | Rivere Kostaycation',
    description: blogDescription,
    canonical: `${SITE_URL}/blog/`,
    image: `${SITE_URL}/images/COZ-8-edit.jpg`,
    imageAlt: 'Blog investasi properti Rivere Kostaycation IPB',
    type: 'website',
    schema: blogSchema()
  }, renderBlogIndex()));

  for (const post of BLOG_POSTS) {
    writePage(path.join('blog', post.slug), applySeo(sourceHtml, {
      title: post.seoTitle,
      description: post.description,
      canonical: getBlogPostUrl(post),
      image: `${SITE_URL}${post.image}`,
      imageAlt: post.imageAlt,
      type: 'article',
      schema: articleSchema(post),
      article: post
    }, renderArticle(post)));
  }

  console.log(`Generated ${BLOG_POSTS.length + 1} static SEO blog pages in ${outputDir}`);
}

main();
