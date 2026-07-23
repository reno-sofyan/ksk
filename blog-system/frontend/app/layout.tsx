import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'),
  title: {
    default: 'Kinara Blog',
    template: '%s | Kinara Blog'
  },
  description: 'Artikel properti, investasi, dan hospitality management dari Kinara Land.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <header className="topbar">
          <div className="container topbar-inner">
            <a href="/blog" className="brand">Kinara Blog</a>
            <nav className="nav" aria-label="Navigasi utama">
              <a href="/blog">Blog</a>
              <a href="/admin/blog">Admin</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
