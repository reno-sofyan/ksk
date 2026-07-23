import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import { getPublishedPosts } from '@/lib/api';

type BlogPageProps = {
  searchParams?: {
    page?: string;
    search?: string;
  };
};

export const dynamic = 'force-dynamic';

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams?.page || 1);
  const search = searchParams?.search || '';
  const result = await getPublishedPosts({ page, limit: 9, search });
  const totalPages = result.meta.totalPages || 1;

  return (
    <main>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Blog Kinara Land</p>
          <h1 className="title">Insight properti, investasi, dan pengelolaan aset.</h1>
          <p className="lead">
            Artikel terbaru ditampilkan berdasarkan tanggal publish, lengkap dengan pencarian dan pagination.
          </p>
          <form action="/blog" style={{ marginTop: 24, maxWidth: 520 }}>
            <input
              type="search"
              name="search"
              placeholder="Cari artikel berdasarkan judul..."
              defaultValue={search}
            />
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {result.items.length ? (
            <div className="grid">
              {result.items.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="card card-body">
              <h2>Belum ada artikel.</h2>
              <p className="meta">Artikel published akan tampil di halaman ini.</p>
            </div>
          )}

          <div className="pagination">
            {page > 1 ? (
              <Link className="button secondary" href={`/blog?page=${page - 1}&search=${encodeURIComponent(search)}`}>
                Sebelumnya
              </Link>
            ) : null}
            <span className="meta">Halaman {page} dari {totalPages}</span>
            {page < totalPages ? (
              <Link className="button secondary" href={`/blog?page=${page + 1}&search=${encodeURIComponent(search)}`}>
                Berikutnya
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
