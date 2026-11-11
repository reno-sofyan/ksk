import React from 'react';
import WhatsAppCtaButton from '@/components/WhatsAppCtaButton.jsx';

const LandingFooterCta = ({ ctaLabel, whatsappHref }) => (
  <footer id="harga-cta" className="bg-[#1E2B20]">
    <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
      <h2 className="text-2xl font-bold text-white sm:text-3xl">Jadikan Rivere prioritas investasi kost Anda</h2>
      <p className="mt-3 text-sm text-white/70 sm:text-base">tim kami siap bantu wujudkan pilihan terbaik Anda.</p>
      <div className="mt-8 flex justify-center">
        <WhatsAppCtaButton
          href={whatsappHref}
          ctaLabel="Rivere Landing - Footer CTA"
          variant="light"
          className="min-h-12 px-6 sm:min-h-14 sm:px-8"
        >
          {ctaLabel}
        </WhatsAppCtaButton>
      </div>
      <p className="mt-4 text-xs text-white/50">Respons rata-rata di bawah 10 menit &middot; Senin&ndash;Sabtu</p>
    </div>
    <div className="border-t border-white/10 px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <span>Rivere Staycation</span>
        <span>PT Kinara Land Indonesia &middot; Bogor</span>
      </div>
    </div>
  </footer>
);

export default LandingFooterCta;
