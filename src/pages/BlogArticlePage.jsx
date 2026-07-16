import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, CalendarDays, Clock, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import BlogPostCard from '@/components/BlogPostCard.jsx';
import { BlogFooter, BlogHeader, WHATSAPP_URL } from '@/components/BlogChrome.jsx';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { AUTHOR_NAME, AUTHOR_URL, BLOG_POSTS, SITE_URL, getBlogPost, getBlogPostUrl } from '@/data/blogPosts.js';

const formatDate = (date) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date(`${date}T00:00:00+07:00`));

function createArticleSchema(article) {
  const articleUrl = getBlogPostUrl(article);
  const articleText = [
    ...article.intro,
    ...article.sections.flatMap((section) => [...section.paragraphs, ...(section.bullets || [])])
  ].join(' ');
  const wordCount = articleText.trim().split(/\s+/).length;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${articleUrl}#article`,
        headline: article.title,
        description: article.description,
        image: {
          '@type': 'ImageObject',
          url: `${SITE_URL}${article.image}`
        },
        datePublished: article.datePublished,
        dateModified: article.dateModified,
        inLanguage: 'id-ID',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': articleUrl
        },
        articleSection: article.category,
        isAccessibleForFree: true,
        wordCount,
        keywords: article.keywords.join(', '),
        author: {
          '@type': 'Organization',
          name: AUTHOR_NAME,
          url: AUTHOR_URL
        },
        publisher: {
          '@type': 'Organization',
          name: 'PT Kinara Land Indonesia',
          url: SITE_URL
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog/` },
          { '@type': 'ListItem', position: 3, name: article.title, item: articleUrl }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    ]
  };
}

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = getBlogPost(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Artikel Tidak Ditemukan | Rivere Kostaycation IPB</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <BlogHeader />
        <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-20 sm:px-6">
          <p className="text-sm font-semibold text-accent">404</p>
          <h1 className="mt-3 text-3xl font-bold text-primary">Artikel tidak ditemukan</h1>
          <p className="mt-4 text-muted-foreground">Artikel yang Anda cari mungkin telah dipindahkan atau alamatnya tidak tepat.</p>
          <Link to="/blog/" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary hover:text-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke blog
          </Link>
        </main>
        <BlogFooter />
      </div>
    );
  }

  const canonicalUrl = getBlogPostUrl(article);
  const relatedPosts = BLOG_POSTS.filter((post) => post.slug !== article.slug).slice(0, 2);
  const schema = createArticleSchema(article);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{article.seoTitle}</title>
        <meta name="description" content={article.description} />
        <meta name="author" content={AUTHOR_NAME} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Rivere Kostaycation IPB" />
        <meta property="og:title" content={article.seoTitle} />
        <meta property="og:description" content={article.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}${article.image}`} />
        <meta property="og:image:alt" content={article.imageAlt} />
        <meta property="article:published_time" content={article.datePublished} />
        <meta property="article:modified_time" content={article.dateModified} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.seoTitle} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={`${SITE_URL}${article.image}`} />
        <meta name="twitter:image:alt" content={article.imageAlt} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <BlogHeader />

      <main>
        <article>
          <header className="border-b border-border bg-secondary/45 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary">Beranda</Link>
                <span aria-hidden="true">/</span>
                <Link to="/blog/" className="hover:text-primary">Blog</Link>
                <span aria-hidden="true">/</span>
                <span className="text-primary">{article.category}</span>
              </nav>
              <p className="text-sm font-semibold text-accent">{article.category}</p>
              <h1 className="mt-4 text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">{article.title}</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{article.excerpt}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {article.readTime}
                </span>
                <a href="/blog/#tentang-tim-rivere" className="transition-colors hover:text-primary">{AUTHOR_NAME}</a>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-14">
            <div className="aspect-[16/8] overflow-hidden rounded-lg bg-secondary">
              <ResponsiveImage
                src={article.image}
                alt={article.imageAlt}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(min-width: 1024px) 1152px, 100vw"
              />
            </div>
          </div>

          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-8 lg:py-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="font-bold text-primary">Daftar isi</p>
              <nav aria-label="Daftar isi artikel" className="mt-4 border-l border-border pl-4">
                {article.sections.map((section, index) => (
                  <a key={section.heading} href={`#bagian-${index + 1}`} className="mb-3 block text-sm leading-6 text-muted-foreground transition-colors hover:text-primary">
                    {section.heading}
                  </a>
                ))}
                <a href="#pertanyaan-umum" className="block text-sm leading-6 text-muted-foreground transition-colors hover:text-primary">Pertanyaan umum</a>
              </nav>
            </aside>

            <div className="min-w-0 max-w-3xl">
              <div className="space-y-5 text-base leading-8 text-foreground/80 sm:text-lg">
                {article.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>

              {article.sections.map((section, index) => (
                <section key={section.heading} id={`bagian-${index + 1}`} className="scroll-mt-28 pt-11">
                  <h2 className="text-2xl font-bold text-primary sm:text-3xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-foreground/80 sm:text-lg">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets && (
                      <ul className="space-y-3 border-l-2 border-accent pl-5">
                        {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                      </ul>
                    )}
                  </div>
                </section>
              ))}

              <section id="pertanyaan-umum" className="scroll-mt-28 pt-12">
                <h2 className="text-2xl font-bold text-primary sm:text-3xl">Pertanyaan Umum</h2>
                <div className="mt-6 divide-y divide-border border-y border-border">
                  {article.faq.map((item) => (
                    <details key={item.question} className="group py-5">
                      <summary className="cursor-pointer list-none pr-8 font-semibold text-primary marker:content-none">{item.question}</summary>
                      <p className="mt-3 text-base leading-7 text-muted-foreground">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <div className="mt-12 border-l-4 border-accent bg-secondary/60 p-5 text-sm leading-7 text-muted-foreground sm:p-6">
                <strong className="text-primary">Catatan:</strong> Informasi dan proyeksi dalam artikel ini bersifat edukatif, bukan jaminan hasil investasi. Verifikasi dokumen, kontrak, biaya, dan asumsi finansial sebelum mengambil keputusan.
              </div>
            </div>
          </div>
        </article>

        <section className="bg-primary py-12 text-primary-foreground sm:py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-7 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Pelajari Rivere langsung dari tim kami</h2>
              <p className="mt-3 max-w-2xl text-white/70">Diskusikan tipe unit, skema pembayaran, legalitas, dan proyeksi pengelolaan sesuai kebutuhan Anda.</p>
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent bg-accent px-6 py-3 font-semibold text-primary transition-colors hover:bg-white">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Konsultasi
            </a>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">Artikel Terkait</h2>
              <Link to="/blog/" className="text-sm font-semibold text-primary hover:text-accent">Lihat semua</Link>
            </div>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {relatedPosts.map((post) => <BlogPostCard key={post.slug} post={post} />)}
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default BlogArticlePage;
