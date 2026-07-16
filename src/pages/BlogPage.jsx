import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BookOpen, SearchCheck } from 'lucide-react';
import BlogPostCard from '@/components/BlogPostCard.jsx';
import { BlogFooter, BlogHeader } from '@/components/BlogChrome.jsx';
import { AUTHOR_NAME, AUTHOR_URL, BLOG_POSTS, SITE_URL, getBlogPostUrl } from '@/data/blogPosts.js';
import { mergePublishedBlogPosts, readPublishedBlogPosts } from '@/lib/adminBlogStore.js';

const getAbsoluteImageUrl = (image) => {
  if (!image) return `${SITE_URL}/images/rivere/Design%201/1.png`;
  if (/^(https?:|data:|blob:)/.test(image)) return image;
  return `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
};

const createBlogSchema = (posts) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Rivere Kostaycation IPB',
    description: 'Panduan investasi kost, properti dekat IPB, pengelolaan hospitality, yield, dan ROI untuk calon investor.',
    url: `${SITE_URL}/blog/`,
    '@id': `${SITE_URL}/blog/#blog`,
    inLanguage: 'id-ID',
    publisher: {
      '@type': 'Organization',
      name: 'PT Kinara Land Indonesia',
      url: SITE_URL
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: getBlogPostUrl(post),
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      description: post.description,
      image: getAbsoluteImageUrl(post.image),
      author: {
        '@type': 'Organization',
        name: AUTHOR_NAME,
        url: AUTHOR_URL
      }
    }))
  };
};

const BlogPage = () => {
  const [publishedPosts] = useState(() => readPublishedBlogPosts());
  const posts = useMemo(() => mergePublishedBlogPosts(BLOG_POSTS, publishedPosts), [publishedPosts]);
  const blogSchema = useMemo(() => createBlogSchema(posts), [posts]);
  const [featuredPost, ...otherPosts] = posts;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Blog Investasi Properti Dekat IPB | Rivere Kostaycation</title>
        <meta name="description" content="Panduan investasi kost dekat IPB, cara menghitung yield dan ROI properti, serta wawasan kost resort dari Rivere Kostaycation IPB." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={`${SITE_URL}/blog/`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Rivere Kostaycation IPB" />
        <meta property="og:title" content="Blog Investasi Properti Dekat IPB | Rivere Kostaycation" />
        <meta property="og:description" content="Panduan investasi kost, analisis yield dan ROI, serta wawasan properti hospitality di kawasan IPB." />
        <meta property="og:url" content={`${SITE_URL}/blog/`} />
        <meta property="og:image" content={`${SITE_URL}/images/rivere/Design%201/1.png`} />
        <meta property="og:image:alt" content="Blog investasi properti Rivere Kostaycation IPB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog Investasi Properti Dekat IPB | Rivere Kostaycation" />
        <meta name="twitter:description" content="Panduan investasi kost, analisis yield dan ROI, serta wawasan properti hospitality di kawasan IPB." />
        <meta name="twitter:image" content={`${SITE_URL}/images/rivere/Design%201/1.png`} />
        <meta name="twitter:image:alt" content="Blog investasi properti Rivere Kostaycation IPB" />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>

      <BlogHeader />

      <main>
        <section className="border-b border-border bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Blog Rivere
            </div>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              Wawasan Investasi Properti Dekat IPB
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
              Analisis praktis tentang investasi kost, lokasi kampus, pengelolaan hospitality, yield, dan nilai aset untuk membantu Anda mengambil keputusan secara terukur.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center gap-3 border-b border-border pb-4">
              <SearchCheck className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="text-lg font-bold text-primary">Artikel Pilihan</h2>
            </div>
            <BlogPostCard post={featuredPost} featured />
          </div>
        </section>

        <section className="border-y border-border bg-secondary/45 py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">Artikel Terbaru</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">Pelajari aspek finansial dan operasional yang memengaruhi performa investasi properti kost.</p>
            <div className="mt-9 grid gap-10 md:grid-cols-2">
              {otherPosts.map((post) => <BlogPostCard key={post.slug} post={post} />)}
            </div>
          </div>
        </section>

        <section id="tentang-tim-rivere" className="scroll-mt-24 py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">Tentang Blog Rivere</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
              <p>Blog Rivere membahas investasi properti di kawasan kampus IPB dengan fokus pada faktor yang dapat diperiksa: akses, captive market, legalitas, desain unit, kualitas fasilitas, sistem pengelolaan, dan proyeksi finansial.</p>
              <p>Konten disusun oleh {AUTHOR_NAME} berdasarkan informasi proyek dan prinsip evaluasi properti yang dapat diperiksa calon investor.</p>
              <p>Setiap proyeksi investasi bersifat estimasi dan bukan jaminan hasil. Calon investor tetap perlu memeriksa dokumen, kontrak pengelolaan, kondisi pasar, serta kesesuaian investasi dengan tujuan keuangan pribadi.</p>
            </div>
          </div>
        </section>
      </main>

      <BlogFooter />
    </div>
  );
};

export default BlogPage;
