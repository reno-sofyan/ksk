import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, CalendarDays, Clock, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import BlogPostCard from '@/components/BlogPostCard.jsx';
import { BlogFooter, BlogHeader, WHATSAPP_URL } from '@/components/BlogChrome.jsx';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { AUTHOR_NAME, AUTHOR_URL, BLOG_POSTS, SITE_URL, getBlogPostUrl } from '@/data/blogPosts.js';
import { fetchServerPublishedBlogPosts, findMergedBlogPost, mergePublishedBlogPosts, readPublishedBlogPosts, resolveBlogPostSeo } from '@/lib/adminBlogStore.js';
import { articlePlainText, legacyPostToHtml, sanitizeArticleHtml } from '@/lib/blogContent.js';

const formatDate = (date) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date(`${date}T00:00:00+07:00`));

const getAbsoluteImageUrl = (image) => {
  if (!image) return `${SITE_URL}/images/rivere/Design%201/1.png`;
  if (/^(https?:|data:|blob:)/.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
};

function createArticleSchema(article) {
  const seo = resolveBlogPostSeo(article);
  const articleUrl = seo.canonical;
  const articleText = articlePlainText(article);
  const wordCount = articleText.trim().split(/\s+/).length;

  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': `${articleUrl}#article`,
      headline: article.title,
      description: seo.description,
      image: {
        '@type': 'ImageObject',
        url: getAbsoluteImageUrl(article.image)
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
      keywords: (article.tags || article.keywords || []).join(', '),
      author: {
        '@type': 'Person',
        name: article.author || AUTHOR_NAME,
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
    }
  ];

  if (article.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: article.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph
  };
}

const BlogArticlePage = () => {
  const { slug } = useParams();
  const [localPublishedPosts] = useState(() => readPublishedBlogPosts());
  const [serverPublishedPosts, setServerPublishedPosts] = useState(null);
  const [serverChecked, setServerChecked] = useState(false);
  const publishedPosts = serverPublishedPosts || localPublishedPosts;
  const allPosts = useMemo(() => mergePublishedBlogPosts(BLOG_POSTS, publishedPosts), [publishedPosts]);
  const article = useMemo(() => findMergedBlogPost(BLOG_POSTS, slug, publishedPosts), [slug, publishedPosts]);

  useEffect(() => {
    let isMounted = true;

    fetchServerPublishedBlogPosts()
      .then((items) => {
        if (isMounted && items) {
          setServerPublishedPosts(items);
        }
      })
      .finally(() => {
        if (isMounted) {
          setServerChecked(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!article) {
    if (!serverChecked) {
      return (
        <div className="min-h-screen bg-background">
          <Helmet>
            <title>Memuat Artikel | Rivere Kostaycation IPB</title>
            <meta name="robots" content="noindex, follow" />
          </Helmet>
          <BlogHeader />
          <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-20 sm:px-6">
            <p className="text-sm font-semibold text-accent">Memuat</p>
            <h1 className="mt-3 text-3xl font-bold text-primary">Mengambil artikel dari server.</h1>
          </main>
          <BlogFooter />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Artikel Tidak Ditemukan | Rivere Kostaycation IPB</title>
          <link rel="icon" href="/favicon.ico?v=kinara-20260721" sizes="any" />
          <link rel="icon" type="image/png" href="/favicon.png?v=kinara-20260721" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=kinara-20260721" />
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

  const seo = resolveBlogPostSeo(article);
  const canonicalUrl = seo.canonical;
  const articleTags = article.tags || article.keywords || [];
  const relatedPosts = allPosts
    .filter((post) => post.slug !== article.slug)
    .map((post) => ({
      post,
      score: (post.category === article.category ? 3 : 0)
        + (post.tags || post.keywords || []).filter((tag) => articleTags.includes(tag)).length
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ post }) => post);
  const contentHtml = sanitizeArticleHtml(article.contentHtml || legacyPostToHtml(article));
  const schema = createArticleSchema(article);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{seo.seoTitle}</title>
        <link rel="icon" href="/favicon.ico?v=kinara-20260721" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png?v=kinara-20260721" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=kinara-20260721" />
        <meta name="description" content={seo.description} />
        <meta name="author" content={article.author || AUTHOR_NAME} />
        <meta name="robots" content={seo.robots} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Rivere Kostaycation IPB" />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={getAbsoluteImageUrl(seo.ogImage)} />
        <meta property="og:image:alt" content={article.imageAlt} />
        <meta property="article:published_time" content={article.datePublished} />
        <meta property="article:modified_time" content={article.dateModified} />
        <meta property="article:section" content={article.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.ogTitle} />
        <meta name="twitter:description" content={seo.ogDescription} />
        <meta name="twitter:image" content={getAbsoluteImageUrl(seo.ogImage)} />
        <meta name="twitter:image:alt" content={article.imageAlt} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <BlogHeader />

      <main>
        <article>
          <header className="border-b border-border bg-white py-10 sm:py-14">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary">Beranda</Link>
                <span aria-hidden="true">/</span>
                <Link to="/blog/" className="hover:text-primary">Blog</Link>
                <span aria-hidden="true">/</span>
                <span className="line-clamp-1 text-primary">{article.title}</span>
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
                <a href="/blog/#tentang-tim-rivere" className="transition-colors hover:text-primary">{article.author || AUTHOR_NAME}</a>
                {article.dateModified && article.dateModified !== article.datePublished ? (
                  <span>Diperbarui <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time></span>
                ) : null}
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 sm:pt-10">
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-secondary">
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

          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="min-w-0">
              <div
                className="space-y-5 text-base leading-8 text-foreground/85 sm:text-lg [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_blockquote]:my-7 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:bg-secondary/50 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-primary [&_h3]:mt-9 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-primary [&_img]:my-8 [&_img]:w-full [&_img]:rounded-lg [&_li]:pl-1 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_p]:my-5 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-2"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />

              {article.faq?.length ? (
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
              ) : null}

              {articleTags.length ? (
                <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6" aria-label="Tag artikel">
                  {articleTags.map((tag) => <span key={tag} className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-primary">#{tag}</span>)}
                </div>
              ) : null}

              <div className="mt-10 border-l-4 border-accent bg-secondary/60 p-5 text-sm leading-7 text-muted-foreground sm:p-6">
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
