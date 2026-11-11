import React from 'react';
import { Menu } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import WhatsAppCtaButton from '@/components/WhatsAppCtaButton.jsx';
import { imageUrl } from '@/lib/assets.js';

const NAV_LINKS = [
  ['Tentang', '#tentang'],
  ['Produk', '#produk'],
  ['Harga', '#harga']
];

const LandingHeader = ({ ctaLabel, whatsappHref }) => (
  <header className="fixed inset-x-0 top-0 z-50 bg-[#1E2B20]">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
      <a href="#hero" className="flex min-w-0 items-center" aria-label="Rivere Kostaycation">
        <ResponsiveImage
          src={imageUrl('rivere/landing/logo-rivere.png')}
          alt="Rivere Kostaycation"
          className="h-9 w-auto object-contain sm:h-10"
          loading="eager"
        />
      </a>
      <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi utama">
        {NAV_LINKS.map(([label, href]) => (
          <a key={href} href={href} className="text-sm font-medium text-white/85 transition-colors hover:text-white">
            {label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <WhatsAppCtaButton
          href={whatsappHref}
          ctaLabel="Rivere Landing - Header CTA"
          variant="light"
          className="hidden min-h-9 px-4 py-2 text-xs sm:inline-flex sm:text-sm"
          iconClassName="h-4 w-4"
        >
          {ctaLabel}
        </WhatsAppCtaButton>
        <details className="relative lg:hidden">
          <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-full border border-white/25 text-white" aria-label="Buka menu">
            <Menu className="h-5 w-5" />
          </summary>
          <nav className="absolute right-0 top-11 grid w-44 gap-1 rounded-xl border border-primary/10 bg-white p-2 shadow-xl">
            {NAV_LINKS.map(([label, href]) => (
              <a key={href} href={href} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#1E2B20] hover:bg-secondary">
                {label}
              </a>
            ))}
            <WhatsAppCtaButton
              href={whatsappHref}
              ctaLabel="Rivere Landing - Header Menu CTA"
              variant="dark"
              className="mt-1 min-h-10 px-4 py-2 text-xs"
              iconClassName="h-4 w-4"
            >
              {ctaLabel}
            </WhatsAppCtaButton>
          </nav>
        </details>
      </div>
    </div>
  </header>
);

export default LandingHeader;
