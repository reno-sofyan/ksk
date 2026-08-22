#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { AUTHOR_NAME, AUTHOR_URL, BLOG_POSTS, SITE_URL, getBlogPostUrl } from '../src/data/blogPosts.js';
import { DENAH_PAGE, DENAH_PLANS } from '../src/data/riverePlans.js';

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
          <a href="/denah/" class="text-primary">Denah</a>
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
        <p class="text-sm text-white/70"><a href="/denah/">Denah</a> · <a href="/blog/">Blog</a></p>
      </div>
    </footer>`;
}

function renderDenahPage() {
  const cards = DENAH_PLANS.map((plan) => `
      <article id="${escapeHtml(plan.id)}" class="grid overflow-hidden border border-primary/15 bg-card shadow-[0_24px_70px_rgba(7,39,29,0.09)] lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <a href="${escapeHtml(plan.image)}" class="block bg-white p-5" aria-label="Buka gambar penuh ${escapeHtml(plan.title)}">
          <img src="${escapeHtml(plan.image)}" alt="${escapeHtml(plan.imageAlt)}" loading="lazy" class="h-full w-full object-contain" />
        </a>
        <div class="border-t border-primary/10 bg-secondary/45 p-6 lg:border-l lg:border-t-0 lg:p-8">
          <p class="text-sm font-semibold uppercase tracking-normal text-accent">Denah Lantai 1 & Lantai 2-3</p>
          <h2 class="mt-3 text-2xl font-bold leading-tight text-primary sm:text-3xl">${escapeHtml(plan.title)}</h2>
          <p class="mt-2 text-lg font-semibold text-foreground/80">${escapeHtml(plan.subtitle)}</p>
          <p class="mt-5 text-base leading-7 text-muted-foreground">${escapeHtml(plan.description)}</p>
          <dl class="mt-7 grid gap-3 sm:grid-cols-2">
            <div class="border border-primary/10 bg-white p-3"><dt class="text-xs font-semibold uppercase text-muted-foreground">Jumlah Kamar</dt><dd class="mt-1 font-bold text-primary">${escapeHtml(plan.rooms)}</dd></div>
            <div class="border border-primary/10 bg-white p-3"><dt class="text-xs font-semibold uppercase text-muted-foreground">Jumlah Lantai</dt><dd class="mt-1 font-bold text-primary">${escapeHtml(plan.floors)}</dd></div>
            <div class="border border-primary/10 bg-white p-3"><dt class="text-xs font-semibold uppercase text-muted-foreground">Luas Tanah</dt><dd class="mt-1 font-bold text-primary">${escapeHtml(plan.landArea)}</dd></div>
            <div class="border border-primary/10 bg-white p-3"><dt class="text-xs font-semibold uppercase text-muted-foreground">Luas Bangunan</dt><dd class="mt-1 font-bold text-primary">${escapeHtml(plan.buildingArea)}</dd></div>
          </dl>
          <p class="mt-7 text-sm font-semibold uppercase tracking-normal text-primary">Fasilitas pada denah</p>
          <div class="mt-3 flex flex-wrap gap-2">${plan.facilities.map((facility) => `<span class="border border-primary/10 bg-white px-3 py-2 text-xs font-semibold text-primary">${escapeHtml(facility)}</span>`).join('')}</div>
        </div>
      </article>`).join('');

  return `${renderHeader()}
    <main>
      <section class="bg-primary py-16 text-white sm:py-20">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p class="font-semibold uppercase tracking-normal text-accent">Denah Unit Rivere Kostaycation IPB</p>
          <h1 class="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">Denah Type 62/31 dan Type 94/31</h1>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-white/75">Dua pilihan denah menampilkan komposisi lantai 1 dan lantai 2-3, jumlah kamar, luas lahan, luas bangunan, serta fasilitas pendukung.</p>
        </div>
      </section>
      <section class="py-14 sm:py-20">
        <div class="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:px-8">${cards}</div>
      </section>
    </main>${renderFooter()}`;
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
  const intro = post.intro.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
  const sections = post.sections.map((section) => {
    const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
    const bullets = section.bullets
      ? `<ul class="space-y-3 border-l-2 border-accent pl-5">${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>`
      : '';

    return `
      <section class="pt-11">
        <h2 class="text-2xl font-bold text-primary sm:text-3xl">${escapeHtml(section.heading)}</h2>
        <div class="mt-5 space-y-5 text-lg leading-8 text-foreground/80">${paragraphs}${bullets}</div>
      </section>`;
  }).join('');

  const faq = (post.faq || []).map((item) => `
        <details class="border-t border-border py-5">
          <summary class="font-semibold text-primary">${escapeHtml(item.question)}</summary>
          <p class="mt-3 leading-7 text-muted-foreground">${escapeHtml(item.answer)}</p>
        </details>`).join('');

  return `${renderHeader()}
    <main>
      <article>
        <header class="border-b border-border bg-white py-14">
          <div class="mx-auto max-w-3xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" class="mb-7 text-sm text-muted-foreground"><a href="/">Beranda</a> / <a href="/blog/">Blog</a> / ${escapeHtml(post.title)}</nav>
            <p class="font-semibold text-accent">${escapeHtml(post.category)}</p>
            <h1 class="mt-4 text-4xl font-bold leading-tight text-primary sm:text-5xl">${escapeHtml(post.title)}</h1>
            <p class="mt-6 text-lg leading-8 text-muted-foreground">${escapeHtml(post.excerpt)}</p>
            <p class="mt-6 text-sm text-muted-foreground">${escapeHtml(post.author || AUTHOR_NAME)} · <time datetime="${escapeHtml(post.datePublished)}">${escapeHtml(formatDate(post.datePublished))}</time>${post.dateModified !== post.datePublished ? ` · Diperbarui ${escapeHtml(formatDate(post.dateModified))}` : ''} · ${escapeHtml(post.category)}</p>
          </div>
        </header>
        <div class="mx-auto max-w-4xl px-4 pt-10 sm:px-6">
          <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.imageAlt)}" class="aspect-[16/9] w-full rounded-lg object-cover" fetchpriority="high" />
        </div>
        <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div>
            <div class="space-y-5 text-lg leading-8 text-foreground/80">${intro}</div>
            ${sections}
            ${faq ? `<section id="pertanyaan-umum" class="pt-12">
              <h2 class="text-2xl font-bold text-primary sm:text-3xl">Pertanyaan Umum</h2>
              <div class="mt-6 border-b border-border">${faq}</div>
            </section>` : ''}
            ${(post.tags || post.keywords || []).length ? `<div class="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">${(post.tags || post.keywords).map((tag) => `<span class="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary">#${escapeHtml(tag)}</span>`).join('')}</div>` : ''}
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

function denahSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}${DENAH_PAGE.path}#webpage`,
    url: `${SITE_URL}${DENAH_PAGE.path}`,
    name: DENAH_PAGE.title,
    description: DENAH_PAGE.description,
    inLanguage: 'id-ID',
    isPartOf: { '@type': 'WebSite', name: 'Rivere Kostaycation IPB', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'PT Kinara Land Indonesia', url: SITE_URL },
    mainEntity: DENAH_PLANS.map((plan) => ({
      '@type': 'ImageObject',
      name: plan.title,
      description: `${plan.subtitle}, ${plan.rooms}, ${plan.floors}. ${plan.description}`,
      contentUrl: `${SITE_URL}${plan.image}`
    }))
  };
}

function applySeo(sourceHtml, { title, description, canonical, image, imageAlt, type, schema, article, robots = 'index, follow, max-image-preview:large', ogTitle, ogDescription, ogImage }, rootMarkup) {
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
    <meta data-react-helmet="true" name="robots" content="${escapeHtml(robots)}" />
    <link data-react-helmet="true" rel="canonical" href="${escapeHtml(canonical)}" />
    <meta data-react-helmet="true" property="og:type" content="${escapeHtml(type)}" />
    <meta data-react-helmet="true" property="og:locale" content="id_ID" />
    <meta data-react-helmet="true" property="og:site_name" content="Rivere Kostaycation IPB" />
    <meta data-react-helmet="true" property="og:title" content="${escapeHtml(ogTitle || title)}" />
    <meta data-react-helmet="true" property="og:description" content="${escapeHtml(ogDescription || description)}" />
    <meta data-react-helmet="true" property="og:url" content="${escapeHtml(canonical)}" />
    <meta data-react-helmet="true" property="og:image" content="${escapeHtml(ogImage || image)}" />
    <meta data-react-helmet="true" property="og:image:alt" content="${escapeHtml(imageAlt)}" />${articleTags}
    <meta data-react-helmet="true" name="twitter:card" content="summary_large_image" />
    <meta data-react-helmet="true" name="twitter:title" content="${escapeHtml(ogTitle || title)}" />
    <meta data-react-helmet="true" name="twitter:description" content="${escapeHtml(ogDescription || description)}" />
    <meta data-react-helmet="true" name="twitter:image" content="${escapeHtml(ogImage || image)}" />
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

function spaRouteHtml(sourceHtml, { title, description }) {
  return sourceHtml
    .replace(/\s*<!-- SEO_DEFAULT_START -->[\s\S]*?<!-- SEO_DEFAULT_END -->/i, '')
    .replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta(?=[^>]*name="description")[^>]*>/i, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace('</head>', `
    <meta name="robots" content="noindex, nofollow" />
  </head>`);
}

function main() {
  if (!fs.existsSync(sourceIndexPath)) {
    throw new Error(`Built index.html not found at ${sourceIndexPath}`);
  }

  const sourceHtml = fs.readFileSync(sourceIndexPath, 'utf8');
  const blogDescription = 'Panduan investasi kost dekat IPB, cara menghitung yield dan ROI properti, serta wawasan kost resort dari Rivere Kostaycation IPB.';

  writePage('denah', applySeo(sourceHtml, {
    title: DENAH_PAGE.title,
    description: DENAH_PAGE.description,
    canonical: `${SITE_URL}${DENAH_PAGE.path}`,
    image: `${SITE_URL}${DENAH_PAGE.image}`,
    imageAlt: DENAH_PAGE.imageAlt,
    type: 'website',
    schema: denahSchema()
  }, renderDenahPage()));

  writePage('blog', applySeo(sourceHtml, {
    title: 'Blog Investasi Properti Dekat IPB | Rivere Kostaycation',
    description: blogDescription,
    canonical: `${SITE_URL}/blog/`,
    image: `${SITE_URL}/images/rivere/Design%201/1.png`,
    imageAlt: 'Blog investasi properti Rivere Kostaycation IPB',
    type: 'website',
    schema: blogSchema()
  }, renderBlogIndex()));

  for (const post of BLOG_POSTS) {
    const title = post.seoTitle || post.title;
    const description = post.description || post.excerpt;
    const canonical = post.canonicalUrl || getBlogPostUrl(post);
    const image = `${SITE_URL}${post.image}`;
    writePage(path.join('blog', post.slug), applySeo(sourceHtml, {
      title,
      description,
      canonical,
      image,
      imageAlt: post.imageAlt,
      type: 'article',
      schema: articleSchema(post),
      article: post,
      robots: `${post.robotsIndex === false ? 'noindex' : 'index'}, ${post.robotsFollow === false ? 'nofollow' : 'follow'}, max-image-preview:large`,
      ogTitle: post.ogTitle || title,
      ogDescription: post.ogDescription || description,
      ogImage: post.ogImage || image
    }, renderArticle(post)));
  }

  writePage('login', spaRouteHtml(sourceHtml, {
    title: 'Login Admin Rivere',
    description: 'Halaman login admin Rivere Kostaycation IPB.'
  }));

  writePage('dashboard', spaRouteHtml(sourceHtml, {
    title: 'Dashboard Admin Rivere',
    description: 'Dashboard admin Rivere Kostaycation IPB.'
  }));

  console.log(`Generated ${BLOG_POSTS.length + 4} static SEO pages in ${outputDir}`);
}

main();
