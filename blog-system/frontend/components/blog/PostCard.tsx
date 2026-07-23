import Link from 'next/link';
import type { BlogPost } from '@/lib/types';

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value));
}

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="card">
      {post.thumbnail_url ? (
        <img src={post.thumbnail_url} alt={post.title} className="thumb" />
      ) : (
        <div className="thumb" aria-hidden="true" />
      )}
      <div className="card-body">
        <p className="meta">{formatDate(post.created_at)}</p>
        <h2>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="meta">{post.excerpt}</p>
        <Link className="button secondary" href={`/blog/${post.slug}`}>
          Baca artikel
        </Link>
      </div>
    </article>
  );
}
