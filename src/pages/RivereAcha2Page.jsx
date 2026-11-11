import React from 'react';
import { Helmet } from 'react-helmet';
import { GraduationCap, Landmark, Waves, UtensilsCrossed, ParkingCircle } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';
import { RIVERE_SITE_URL } from '@/lib/site.js';
import LandingHeader from '@/components/rivere-landing/LandingHeader.jsx';
import LandingFooterCta from '@/components/rivere-landing/LandingFooterCta.jsx';
import WhyCard from '@/components/rivere-landing/WhyCard.jsx';
import DocPhotoCard from '@/components/rivere-landing/DocPhotoCard.jsx';
import PriceCard from '@/components/rivere-landing/PriceCard.jsx';
import MapCard from '@/components/rivere-landing/MapCard.jsx';
import FacilityIconCard from '@/components/rivere-landing/FacilityIconCard.jsx';

const WHATSAPP_PHONE = '6282146477964';
const CTA_LABEL = 'Konsultasi Disini';
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

const FACILITIES = [
  { icon: GraduationCap, value: '2 Menit', label: 'Gerbang IPB' },
  { icon: Landmark, value: '1 Menit', label: 'Masjid Terdekat' },
  { icon: Waves, value: 'Pool', label: 'Kolam berenang' },
  { icon: UtensilsCrossed, value: 'Canteen', label: 'Kantin & Gym' },
  { icon: ParkingCircle, value: 'Dalam', label: 'Parkiran Aman' }
];

const DOC_ITEMS = [
  { file: 'doc-fasad.jpg', title: 'Fasad bangunan', description: 'Unit tampak depan' },
  { file: 'doc-akad.jpg', title: 'Proses Akad', description: 'Serah terima unit ke investor' },
  { file: 'doc-cleaning.jpg', title: 'Tim Cleaning Service', description: 'Perawatan harian' }
];

const RivereAcha2Page = () => (
  <div className="min-h-screen overflow-x-hidden bg-white text-[#1E2B20]">
    <Helmet>
      <title>Rivere Kostaycation IPB | Aset Kost Terkelola Gerbang IPB Dramaga</title>
      <meta
        name="description"
        content="Aset kost terkelola di kawasan Gerbang IPB Dramaga. Sisa 1 unit terakhir sebelum harga naik, konsultasi gratis via WhatsApp."
      />
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href={`${RIVERE_SITE_URL}/acha2/`} />
    </Helmet>

    <LandingHeader ctaLabel={CTA_LABEL} whatsappHref={WHATSAPP_HREF} />

    <main className="pt-16 lg:pt-20">
      <section id="hero" className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-[#1E2B20] sm:min-h-[600px]">
        <ResponsiveImage
          src={imageUrl('rivere/landing/Header.png')}
          alt="Fasad Rivere Kostaycation di Gerbang IPB Dramaga"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[#1E2B20]/55" />
        <h1 className="relative max-w-3xl px-4 text-center font-serif text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
          Aset kost terkelola di kawasan Gerbang IPB Dramaga.
        </h1>
      </section>

      <section id="tentang" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Kenapa Investor Memilih <span className="text-[#7E735C]">Rivere Kostaycation?</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#1E2B20]/65 sm:text-base">
              Sistem kelola dan kawasan yang dirancang khusus untuk memastikan aset Anda terus menghasilkan tanpa repot urus operasional.
            </p>
            <div className="mt-8 grid gap-4">
              {WHY_ITEMS.map((item) => (
                <WhyCard key={item.number} {...item} />
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <ResponsiveImage
              src={imageUrl('rivere/landing/team-photo-2.jpg')}
              alt="Tim pengelola Rivere Kostaycation"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="bg-[#335138] p-5 text-white">
              <p className="text-sm font-bold">Satu tim yang pegang penuh operasional</p>
              <p className="mt-1 text-sm text-white/70">
                Marketing, housekeeping, maintenance, dan admin &mdash; semuanya in-house, bukan vendor lepas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="produk" className="scroll-mt-20 bg-[#335138] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">Kawasan Terintegrasi Gerbang IPB</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Aset yang berada di Ekosistem yang Saling Menopang.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            Setiap unit jadi bagian dari kawasan, bukan bangunan tunggal yang bersaing sendirian.
          </p>
          <div className="mt-8 grid gap-5 text-left lg:grid-cols-2">
            <MapCard />
            <div className="overflow-hidden rounded-2xl">
              <ResponsiveImage
                src={imageUrl('rivere/landing/aerial-photo-2.jpg')}
                alt="Foto udara kawasan Rivere Staycation"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {FACILITIES.map((facility) => (
              <FacilityIconCard key={facility.label} {...facility} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Dokumentasi progres &amp; kegiatan</h2>
            <p className="mt-2 text-sm text-[#1E2B20]/65 sm:text-base">Foto dan video terbaru dari lokasi Rivere.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <DocPhotoCard
              src={imageUrl('rivere/landing/doc-konstruksi.jpg')}
              alt="Progres konstruksi"
              title="Progres konstruksi"
              description="Pengerjaan lantai dua"
              className="sm:row-span-2"
              imgClassName="aspect-[3/4] sm:aspect-auto sm:h-full"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {DOC_ITEMS.map((item) => (
                <DocPhotoCard
                  key={item.file}
                  src={imageUrl(`rivere/landing/${item.file}`)}
                  alt={item.title}
                  title={item.title}
                  description={item.description}
                  imgClassName="aspect-square"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="harga" className="scroll-mt-20 mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <PriceCard cardBg="#F7F3ED" ctaLabel={CTA_LABEL} whatsappHref={WHATSAPP_HREF} />
      </section>
    </main>

    <LandingFooterCta ctaLabel={CTA_LABEL} whatsappHref={WHATSAPP_HREF} />
  </div>
);

export default RivereAcha2Page;
