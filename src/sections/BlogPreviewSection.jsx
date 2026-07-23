import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlogPostCard from '@/components/BlogPostCard.jsx';
import { BLOG_POSTS } from '@/data/blogPosts.js';
import { fetchServerPublishedBlogPosts, mergePublishedBlogPosts, readPublishedBlogPosts } from '@/lib/adminBlogStore.js';

const BlogPreviewSection = () => {
  const [localPublishedPosts] = useState(() => readPublishedBlogPosts());
  const [serverPublishedPosts, setServerPublishedPosts] = useState(null);
  const publishedPosts = serverPublishedPosts || localPublishedPosts;
  const posts = useMemo(() => mergePublishedBlogPosts(BLOG_POSTS, publishedPosts).slice(0, 3), [publishedPosts]);

  useEffect(() => {
    let isMounted = true;

    fetchServerPublishedBlogPosts().then((items) => {
      if (isMounted && items) {
        setServerPublishedPosts(items);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="border-b border-border bg-secondary/45 py-16 sm:py-20 lg:py-24" aria-labelledby="blog-preview-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-border pb-7 md:flex-row md:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
              Blog Rivere
            </div>
            <h2 id="blog-preview-heading" className="text-3xl font-bold text-primary sm:text-4xl">Wawasan Investasi Properti</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Panduan praktis untuk menilai lokasi, pengelolaan, yield, dan potensi aset kost di kawasan IPB.
            </p>
          </div>
          <Link to="/blog/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent">
            Lihat semua artikel
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-9 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <BlogPostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
