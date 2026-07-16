import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { getBlogPostPath } from '@/data/blogPosts.js';

const formatDate = (date) => new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(new Date(`${date}T00:00:00+07:00`));

const BlogPostCard = ({ post, featured = false }) => (
  <article className={featured ? 'grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10' : 'group'}>
    <Link
      to={getBlogPostPath(post)}
      className={`block overflow-hidden rounded-lg bg-secondary ${featured ? 'aspect-[16/10]' : 'aspect-[16/10]'}`}
      aria-label={`Baca artikel: ${post.title}`}
    >
      <ResponsiveImage
        src={post.image}
        alt={post.imageAlt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
        decoding="async"
        sizes={featured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
      />
    </Link>

    <div className={featured ? '' : 'pt-5'}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-muted-foreground">
        <span className="text-primary">{post.category}</span>
        <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {post.readTime}
        </span>
      </div>
      <h3 className={featured ? 'text-2xl font-bold text-primary sm:text-3xl' : 'text-xl font-bold text-primary'}>
        <Link to={getBlogPostPath(post)} className="transition-colors hover:text-accent">
          {post.title}
        </Link>
      </h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">{post.excerpt}</p>
      <Link
        to={getBlogPostPath(post)}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
      >
        Baca selengkapnya
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  </article>
);

export default BlogPostCard;
