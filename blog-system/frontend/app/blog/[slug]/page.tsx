import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, postUrl, SITE_URL } from '@/lib/api';

type PostDetailProps = {
  params: {
    slug: string;
  };
};

export const dynamic = 'force-dynamic';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value));
}

export async function generateMetadata({ params }: PostDetailProps): Promise<Metadata> {
  try {
    const post = await getPostBySlug(params.slug);
    const title = post.meta_title || post.title;
    const description = post.meta_description || post.excerpt;
    const url = postUrl(post);

    return {
      title,
      description,
      alternates: {
        canonical: url
      },
      openGraph: {
        type: 'article',
        title,
        description,
        url,
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        images: post.thumbnail_url ? [{ url: post.thumbnail_url, alt: post.title }] : []
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: post.thumbnail_url ? [post.thumbnail_url] : []
      }
    };
  } catch {
    return {
      title: 'Artikel tidak ditemukan'
    };
  }
}

export default async function BlogDetailPage({ params }: PostDetailProps) {
  let post;

  try {
    post = await getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.thumbnail_url ? [post.thumbnail_url] : undefined,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: postUrl(post),
    author: {
      '@type': 'Organization',
      name: 'PT Kinara Land Indonesia',
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: 'PT Kinara Land Indonesia'
    }
  };

  return (
    <main>
      <article className="article section">
        <p className="eyebrow">{formatDate(post.created_at)}</p>
        <h1 className="title">{post.title}</h1>
        <p className="lead">{post.excerpt}</p>
        {post.thumbnail_url ? (
          <img src={post.thumbnail_url} alt={post.title} className="thumb" style={{ margin: '28px 0' }} />
        ) : null}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
      />
    </main>
  );
}
