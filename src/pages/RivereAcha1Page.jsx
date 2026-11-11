import React from 'react';
import { Helmet } from 'react-helmet';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';
import { RIVERE_SITE_URL } from '@/lib/site.js';
import LandingHeader from '@/components/rivere-landing/LandingHeader.jsx';
import LandingFooterCta from '@/components/rivere-landing/LandingFooterCta.jsx';
import WhyCard from '@/components/rivere-landing/WhyCard.jsx';
import DocPhotoCard from '@/components/rivere-landing/DocPhotoCard.jsx';
import PriceCard from '@/components/rivere-landing/PriceCard.jsx';
import MapCard from '@/components/rivere-landing/MapCard.jsx';

const WHATSAPP_PHONE = '6282146477964';
const CTA_LABEL = 'Konsultasi Sekarang';
const WHATSAPP_MESSAGE = 'Halo Tim Rivere, saya ingin konsultasi soal Rivere Kostaycation IPB.';
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const WHY_ITEMS = [
  {
    number: 1,
    eyebrow: 'Pengelolaan',
    title: 'Investor tidak perlu repot urus sendiri',
    description:
      'Promosi unit, seleksi penyewa, hingga perawatan bangunan dipegang penuh oleh tim pengelola sejak hari pertama. Investor hanya menerima laporan hasil secara berkala.'
  },
  {
    number: 2,
    eyebrow: 'Lokasi & Skala',
    title: 'Bukan Satuan, tapi Kawasan dengan Fasilitas Lengkap',
    description:
      'Rivere dirancang sebagai kawasan, bukan proyek tunggal. Setiap unit menjadi bagian dari satu ekosistem yang saling menopang permintaan sewa, bukan bersaing sendirian di tengah kawasan yang sama.'
  },
  {
    number: 3,
    eyebrow: 'Rekam Jejak',
    title: 'Terbukti terbangun dan tersewakan',
    description:
      'Rivere adalah proyek keenam dari developer yang sama. Lima proyek sebelumnya telah berjalan dan terbukti menghasilkan.'
  }
];

const AREA_POINTS = [
  {
    number: '01',
    title: 'Zona keempat di kawasan',
    description: 'Zona Hunian A, B, dan C sudah terbangun dan beroperasi.'
  },
  {
    number: '02',
    title: 'Fasilitas sudah tersedia',
    description: 'Masjid, kolam renang, kantin, gym, dan parkiran — bukan rencana.'
  },
  {
    number: '03',
    title: 'Posisi di sisi timur',
    description: 'Bersebelahan dengan masjid dan kolam renang, menghadap area hijau.'
  },
  {
    number: '04',
    title: 'Akses jalan utama',
    description: 'Terhubung langsung ke jalan utama menuju Gerbang IPB Dramaga.'
  }
];

const DOC_ITEMS = [
  { file: 'doc-konstruksi.jpg', title: 'Progres konstruksi', description: 'Pengerjaan lantai dua' },
  { file: 'doc-fasad.jpg', title: 'Fasad bangunan', description: 'Unit tampak depan' },
  { file: 'doc-akad.jpg', title: 'Proses Akad', description: 'Serah terima unit ke investor' },
  { file: 'doc-cleaning.jpg', title: 'Tim Cleaning Service', description: 'Perawatan harian' }
];

const RivereAcha1Page = () => (
  <div className="min-h-screen overflow-x-hidden bg-white text-[#1E2B20]">
    <Helmet>
      <title>Rivere Kostaycation IPB | Aset Kost Terkelola Gerbang IPB Dramaga</title>
      <meta
        name="description"
        content="Aset kost terkelola di kawasan Gerbang IPB Dramaga. Sisa 1 unit terakhir sebelum harga naik, konsultasi gratis via WhatsApp."
      />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={`${RIVERE_SITE_URL}/acha1/`} />
    </Helmet>

    <LandingHeader ctaLabel={CTA_LABEL} whatsappHref={WHATSAPP_HREF} />

    <main className="pt-16 lg:pt-20">
      <section id="hero" className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[#1E2B20] sm:min-h-[640px]">
        <ResponsiveImage
          src={imageUrl('rivere/landing/Header.png')}
          alt="Fasad Rivere Kostaycation di Gerbang IPB Dramaga"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E2B20]/75 via-[#1E2B20]/15 to-[#1E2B20]/65" />
        <h1 className="relative max-w-3xl px-4 text-center text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Aset kost terkelola di kawasan Gerbang IPB Dramaga.
        </h1>
      </section>

      <section id="tentang" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Kenapa Investor Memilih <span className="text-[#7E735C]">Rivere Kostaycation?</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#1E2B20]/65 sm:text-base">
          Sistem kelola dan kawasan yang dirancang khusus untuk memastikan aset Anda terus menghasilkan tanpa repot urus operasional.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {WHY_ITEMS.map((item) => (
            <WhyCard key={item.number} {...item} />
          ))}
        </div>
      </section>

      <section id="produk" className="scroll-mt-20 mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="rounded-3xl bg-[#F3F7F2] p-4 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1E2B20]/45">
            &mdash; Kawasan Terintegrasi Gerbang IPB
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Aset yang berada di Ekosistem yang Saling Menopang.</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
            <MapCard />
            <div className="grid gap-4 rounded-2xl bg-[#335138] p-6 text-white sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
              {AREA_POINTS.map((point, index) => (
                <div
                  key={point.number}
                  className={index < AREA_POINTS.length - 1 ? 'border-b border-white/15 pb-4 lg:pb-5' : ''}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-bold text-white/60">{point.number}</span>
                    <div>
                      <p className="text-sm font-bold">{point.title}</p>
                      <p className="mt-1 text-sm text-white/70">{point.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">Dokumentasi progres &amp; kegiatan</h2>
        <p className="mt-2 text-sm text-[#1E2B20]/65 sm:text-base">Foto dan video terbaru dari lokasi Rivere.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {DOC_ITEMS.map((item) => (
            <DocPhotoCard
              key={item.file}
              src={imageUrl(`rivere/landing/${item.file}`)}
              alt={item.title}
              title={item.title}
              description={item.description}
              imgClassName="aspect-[3/4] sm:aspect-square"
            />
          ))}
        </div>
      </section>

      <section id="harga" className="scroll-mt-20 mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <PriceCard cardBg="#F3F7F2" ctaLabel={CTA_LABEL} whatsappHref={WHATSAPP_HREF} />
      </section>
    </main>

    <LandingFooterCta ctaLabel={CTA_LABEL} whatsappHref={WHATSAPP_HREF} />
  </div>
);

export default RivereAcha1Page;
