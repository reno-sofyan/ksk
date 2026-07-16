import React from 'react';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const WHATSAPP_URL = 'https://wa.me/6282111124005?text=Halo%2C%20saya%20tertarik%20dengan%20Rivere%20Kostaycation%20IPB';

export const BlogHeader = () => (
  <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md">
    <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
      <Link to="/" className="min-w-0">
        <span className="block truncate text-base font-bold text-primary sm:text-lg">Rivere Kostaycation IPB</span>
        <span className="hidden text-xs text-muted-foreground sm:block">Investasi Properti Premium</span>
      </Link>
      <nav aria-label="Navigasi utama" className="flex shrink-0 items-center gap-2 sm:gap-5">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Beranda</span>
        </Link>
        <Link to="/denah/" className="text-sm font-semibold text-primary transition-colors hover:text-accent">Denah</Link>
        <Link to="/blog/" className="text-sm font-semibold text-primary transition-colors hover:text-accent">Blog</Link>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-accent transition-colors hover:bg-accent hover:text-primary"
          aria-label="Konsultasi Rivere melalui WhatsApp"
          title="Konsultasi melalui WhatsApp"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  </header>
);

export const BlogFooter = () => (
  <footer className="border-t border-border bg-primary py-10 text-primary-foreground">
    <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 text-center sm:px-6 md:flex-row md:items-center md:justify-between md:text-left lg:px-8">
      <div>
        <p className="font-bold text-white">Rivere Kostaycation IPB</p>
        <p className="mt-1 text-sm text-white/65">Investasi properti premium di Ring 1 IPB</p>
      </div>
      <div className="flex flex-wrap justify-center gap-5 text-sm text-white/70 md:justify-end">
        <Link to="/" className="transition-colors hover:text-accent">Beranda</Link>
        <Link to="/denah/" className="transition-colors hover:text-accent">Denah</Link>
        <Link to="/blog/" className="transition-colors hover:text-accent">Blog</Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">Konsultasi</a>
      </div>
    </div>
  </footer>
);

export { WHATSAPP_URL };
