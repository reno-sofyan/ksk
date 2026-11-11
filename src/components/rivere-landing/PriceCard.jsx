import React from 'react';
import { Check } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import WhatsAppCtaButton from '@/components/WhatsAppCtaButton.jsx';
import { imageUrl } from '@/lib/assets.js';
import { cn } from '@/lib/utils.js';

const PERKS = ['Bangunan + Mezanine', 'Free Fully Furnished', 'Free SHM & Balik Nama', 'Free AJB & Biaya Notaris'];

const PriceCard = ({ cardBg = '#F3F7F2', ctaLabel, whatsappHref }) => (
  <div className="rounded-3xl p-4 sm:p-6" style={{ backgroundColor: cardBg }}>
    <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-10">
      <div className="overflow-hidden rounded-2xl">
        <ResponsiveImage
          src={imageUrl('rivere/landing/price-building.jpg')}
          alt="Rivere Kostaycation - fasad bangunan"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1E2B20]/50">
          &mdash; Harga Khusus Pre-Launch
        </p>
        <h3 className="mt-2 text-2xl font-bold leading-snug text-[#1E2B20] sm:text-3xl">
          Sisa 1 unit terakhir sebelum naik harga.
        </h3>
        <div className="mt-6 rounded-2xl bg-[#335138] p-5 text-white">
          <div className="flex items-center justify-between pb-4">
            <span className="text-sm text-white/75">Harga Saat ini</span>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Sisa 1 Unit</span>
          </div>
          <p className="border-t border-white/15 pt-4 text-2xl font-bold sm:text-3xl">Rp 925 Juta</p>
          <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4">
            <span className="text-sm text-white/75">Harga Berikutnya</span>
            <span className="text-sm font-bold">Rp 1.3 Miliyar</span>
          </div>
        </div>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {PERKS.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-[#1E2B20]/80">
              <Check className="h-4 w-4 shrink-0 text-[#335138]" />
              {perk}
            </li>
          ))}
        </ul>
        <WhatsAppCtaButton
          href={whatsappHref}
          ctaLabel="Rivere Landing - Price CTA"
          variant="dark"
          className={cn('mt-6 w-full sm:w-auto')}
        >
          {ctaLabel}
        </WhatsAppCtaButton>
      </div>
    </div>
  </div>
);

export default PriceCard;
