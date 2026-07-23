import BlogPostForm from '@/components/admin/BlogPostForm';

export const metadata = {
  title: 'Admin Blog'
};

export default function AdminBlogPage() {
  return (
    <main className="section">
      <div className="container">
        <p className="eyebrow">Admin Dashboard</p>
        <h1 className="title">Manajemen Blog</h1>
        <p className="lead">
          Buat, edit, hapus, publish, dan draft artikel melalui dashboard ini.
        </p>
        <BlogPostForm />
      </div>
    </main>
  );
}
