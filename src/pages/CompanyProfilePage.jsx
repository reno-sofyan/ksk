import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users
} from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';
import { COMPANY_SITE_URL, RIVERE_SITE_URL } from '@/lib/site.js';

const WHATSAPP_URL = 'https://wa.me/6282111124005?text=Halo%2C%20saya%20ingin%20mengenal%20PT%20Kinara%20Land%20Indonesia';
const COMPANY_IMAGE = `${COMPANY_SITE_URL}/images/gerbang.jpeg`;

const COMPANY_NAVIGATION = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Fokus', href: '#fokus' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Kontak', href: '#kontak' }
];

const COMPANY_STATS = [
  {
    value: '10+',
    label: 'Portfolio properti',
    text: 'Residensial, kost produktif, dan hospitality asset di Bogor dan sekitarnya.'
  },
  {
    value: 'Bogor',
    label: 'Growth corridor',
    text: 'Fokus pada kawasan pendidikan, hunian, dan akses mobilitas harian.'
  },
  {
    value: 'End-to-end',
    label: 'Asset stewardship',
    text: 'Dari pengembangan, pemasaran, sampai pengelolaan operasional.'
  }
];

const BUSINESS_FOCUS = [
  {
    icon: Building2,
    title: 'Property Development',
    text: 'Mengembangkan hunian dan aset produktif dengan standar lokasi, legalitas, desain, dan kelayakan nilai jangka panjang.'
  },
  {
    icon: BriefcaseBusiness,
    title: 'Managed Investment Property',
    text: 'Merancang aset kost dan co-living yang dapat dikelola profesional untuk mendukung pendapatan berulang pemilik.'
  },
  {
    icon: Users,
    title: 'Hospitality Ecosystem',
    text: 'Menyatukan fasilitas, layanan penghuni, operasional harian, dan pengalaman tinggal yang lebih tertata.'
  }
];

const COMPANY_PRINCIPLES = [
  'Legalitas aset menjadi prioritas awal',
  'Desain diarahkan untuk fungsi dan nilai sewa',
  'Operasional didukung ekosistem pengelolaan',
  'Portfolio dikurasi pada kawasan dengan permintaan nyata'
];

const PORTFOLIO = [
  {
    project: 'Rivere Kostaycation IPB',
    category: 'Kost resort produktif',
    location: 'Ring 1 IPB Dramaga',
    highlight: true
  },
  {
    project: 'Rabbani Bintaro Residence',
    category: 'Residensial',
    location: 'Bintaro'
  },
  {
    project: 'Green Forest Cifor',
    category: 'Hunian hijau',
    location: 'Cifor Bogor'
  },
  {
    project: 'Villa Rabbani Padjajaran',
    category: 'Villa dan hunian',
    location: 'Padjajaran Bogor'
  },
  {
    project: 'Rabbani Townhouse Cimanggu',
    category: 'Townhouse',
    location: 'Cimanggu Bogor'
  },
  {
    project: 'Kikost Portfolio',
    category: 'Managed kost',
    location: 'Manunggal, Cifor, IPB, Cimanggu'
  }
];

const COMPANY_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${COMPANY_SITE_URL}/#organization`,
      name: 'PT Kinara Land Indonesia',
      url: `${COMPANY_SITE_URL}/`,
      brand: [
        { '@type': 'Brand', name: 'Rivere Kostaycation IPB' },
        { '@type': 'Brand', name: 'Kyra Stay' }
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${COMPANY_SITE_URL}/#website`,
      url: `${COMPANY_SITE_URL}/`,
      name: 'PT Kinara Land Indonesia',
      inLanguage: 'id-ID',
      publisher: { '@id': `${COMPANY_SITE_URL}/#organization` }
    },
    {
      '@type': 'WebPage',
      '@id': `${COMPANY_SITE_URL}/#webpage`,
      url: `${COMPANY_SITE_URL}/`,
      name: 'PT Kinara Land Indonesia | Developer Properti Bogor',
      description: 'Company profile PT Kinara Land Indonesia, developer dan pengelola ekosistem properti produktif di Bogor.',
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${COMPANY_SITE_URL}/#website` },
      about: { '@id': `${COMPANY_SITE_URL}/#organization` }
    }
  ]
};

const fadeIn = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 0.62, ease: 'easeOut' }
};

const CompanyProfilePage = () => (
  <div className="min-h-screen bg-[#f6f0e5] text-[#1f241e] selection:bg-[#d3ad55]/30 selection:text-[#07150f]">
    <Helmet>
      <title>PT Kinara Land Indonesia | Developer Properti Bogor</title>
      <link rel="icon" href="/favicon.ico?v=kinara-20260721" sizes="any" />
      <link rel="icon" type="image/png" href="/favicon.png?v=kinara-20260721" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=kinara-20260721" />
      <meta
        name="description"
        content="Company profile PT Kinara Land Indonesia, developer properti dan pengelola ekosistem hunian produktif di Bogor."
      />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={`${COMPANY_SITE_URL}/`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="PT Kinara Land Indonesia" />
      <meta property="og:title" content="PT Kinara Land Indonesia | Developer Properti Bogor" />
      <meta property="og:description" content="Developer properti dan ekosistem hunian produktif dengan portfolio residensial, kost, dan hospitality management." />
      <meta property="og:url" content={`${COMPANY_SITE_URL}/`} />
      <meta property="og:image" content={COMPANY_IMAGE} />
      <meta property="og:image:alt" content="PT Kinara Land Indonesia company profile" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="PT Kinara Land Indonesia | Developer Properti Bogor" />
      <meta name="twitter:description" content="Developer properti dan ekosistem hunian produktif di Bogor." />
      <meta name="twitter:image" content={COMPANY_IMAGE} />
      <script type="application/ld+json">{JSON.stringify(COMPANY_SCHEMA)}</script>
    </Helmet>

    <section id="hero" className="relative min-h-[96svh] overflow-hidden bg-[#07150f] text-white">
      <div className="absolute inset-0">
        <ResponsiveImage
          src={imageUrl('gerbang.jpeg')}
          alt="Kawasan properti PT Kinara Land Indonesia"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,15,11,0.98)_0%,rgba(7,21,15,0.86)_42%,rgba(7,21,15,0.34)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(7,21,15,0.96)_0%,rgba(7,21,15,0)_100%)]" />
      </div>

      <header className="absolute left-0 right-0 top-0 z-20 border-b border-white/10 bg-[#07150f]/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <a href="#hero" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#d3ad55]/35 bg-white/95 p-2">
              <img src={imageUrl('logo.png')} alt="Logo Kinara Land" className="h-full w-full object-contain" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-base font-bold text-white sm:text-lg">PT Kinara Land Indonesia</span>
              <span className="block text-xs font-semibold uppercase tracking-normal text-[#d3ad55]">Property Developer</span>
            </span>
          </a>
          <nav aria-label="Navigasi company profile" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-white/78">
            {COMPANY_NAVIGATION.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-[#d3ad55]">
                {item.label}
              </a>
            ))}
            <a href={RIVERE_SITE_URL} className="inline-flex items-center gap-1 rounded-lg border border-[#d3ad55]/40 px-3 py-2 text-[#d3ad55] transition-colors hover:border-white hover:text-white">
              Rivere <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[96svh] max-w-7xl items-center px-4 pb-32 pt-36 sm:px-6 md:pt-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.76, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <p className="mb-6 inline-flex items-center gap-2 border-l-2 border-[#d3ad55] pl-4 text-sm font-semibold uppercase tracking-normal text-[#d3ad55]">
            <Landmark className="h-4 w-4" aria-hidden="true" />
            Developer Properti dan Hospitality Ecosystem
          </p>
          <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.02] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            PT Kinara Land Indonesia
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/82 sm:text-lg md:text-xl">
            Mengembangkan properti produktif dengan pendekatan kurasi aset: lokasi strategis, legalitas kuat, desain bernilai, dan pengelolaan profesional untuk performa jangka panjang.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={RIVERE_SITE_URL}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d3ad55] px-6 py-4 text-sm font-bold text-[#07150f] shadow-[0_22px_70px_rgba(211,173,85,0.24)] transition-colors hover:bg-white"
            >
              Lihat Portfolio Utama
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-md transition-colors hover:border-[#d3ad55] hover:text-[#d3ad55]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Hubungi Direksi
            </a>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/12 bg-[#07150f]/88 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl gap-px px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {COMPANY_STATS.map((item) => (
            <div key={item.label} className="border-white/10 py-6 sm:border-l sm:px-6 first:sm:border-l-0">
              <p className="font-serif text-4xl font-semibold leading-none text-[#d3ad55] sm:text-5xl">{item.value}</p>
              <p className="mt-3 text-sm font-bold uppercase tracking-normal text-white">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/66">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="tentang" className="relative overflow-hidden bg-[#f6f0e5] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <motion.div {...fadeIn}>
          <p className="text-sm font-bold uppercase tracking-normal text-[#9b7a2e]">Tentang Perusahaan</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-[#07150f] sm:text-5xl md:text-6xl">
            Properti yang dikembangkan sebagai aset yang bekerja.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-[#4d514c] sm:text-lg">
            <p>
              Kinara Land membangun properti dengan sudut pandang investor dan penghuni sekaligus. Setiap proyek diarahkan untuk memiliki alasan lokasi yang jelas, fungsi ruang yang kuat, serta nilai operasional yang dapat dikelola.
            </p>
            <p>
              Portfolio perusahaan mencakup hunian tapak, townhouse, kost, dan pengembangan berbasis hospitality seperti Rivere Kostaycation IPB.
            </p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {COMPANY_PRINCIPLES.map((item) => (
              <div key={item} className="flex items-start gap-3 border-l-2 border-[#d3ad55] bg-white/62 px-4 py-3 shadow-[0_18px_50px_rgba(44,31,13,0.06)]">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#9b7a2e]" aria-hidden="true" />
                <span className="text-sm font-semibold leading-6 text-[#1e2a22]">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.figure
          {...fadeIn}
          transition={{ duration: 0.62, delay: 0.08, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-lg border border-[#d3ad55]/28 bg-[#07150f] shadow-[0_30px_90px_rgba(7,21,15,0.22)]"
        >
          <div className="aspect-[4/3] overflow-hidden">
            <ResponsiveImage
              src={imageUrl('investor 1.jpeg')}
              alt="Tim dan investor PT Kinara Land Indonesia"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <figcaption className="border-t border-white/12 bg-[#07150f] p-6 text-white sm:p-8">
            <p className="text-sm font-bold uppercase tracking-normal text-[#d3ad55]">Trust and Governance</p>
            <p className="mt-3 max-w-xl text-2xl font-semibold leading-tight">
              Setiap pengembangan dijalankan dengan komunikasi, dokumentasi, dan standar pengelolaan yang lebih tertata.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>

    <section id="fokus" className="border-y border-[#d3ad55]/18 bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeIn} className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-normal text-[#9b7a2e]">Fokus Bisnis</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#07150f] sm:text-5xl">
              Dari akuisisi aset sampai pengalaman tinggal.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[#53534d] sm:text-lg lg:ml-auto">
            Kinara Land tidak hanya membangun bangunan. Kami merancang ekosistem properti yang punya fungsi jelas bagi pembeli, pemilik, penghuni, dan operator.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {BUSINESS_FOCUS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group rounded-lg border border-[#d3ad55]/24 bg-[#f6f0e5] p-7 shadow-[0_22px_70px_rgba(44,31,13,0.07)] transition-colors hover:border-[#9b7a2e]/55"
              >
                <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-lg border border-[#d3ad55]/40 bg-[#07150f] text-[#d3ad55]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-[#07150f]">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#53534d] sm:text-base">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>

    <section id="portfolio" className="relative overflow-hidden bg-[#07150f] py-16 text-white sm:py-20 lg:py-28">
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(211,173,85,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(211,173,85,0.5)_1px,transparent_1px)] [background-size:52px_52px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <motion.div {...fadeIn}>
            <p className="text-sm font-bold uppercase tracking-normal text-[#d3ad55]">Portfolio</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Jejak proyek dengan karakter aset yang jelas.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Portfolio Kinara Land dirancang dalam spektrum residensial, kost produktif, dan hospitality management. Rivere Kostaycation IPB menjadi representasi terbaru dari strategi aset produktif dekat kawasan pendidikan.
            </p>
            <a
              href={RIVERE_SITE_URL}
              className="mt-9 inline-flex items-center gap-2 rounded-lg border border-[#d3ad55] bg-[#d3ad55] px-5 py-3 text-sm font-bold text-[#07150f] transition-colors hover:bg-white"
            >
              Buka Rivere Kostaycation
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>

          <div className="grid gap-3">
            {PORTFOLIO.map((item, index) => (
              <motion.article
                key={item.project}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.035 }}
                className={`grid gap-4 rounded-lg border px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center ${
                  item.highlight
                    ? 'border-[#d3ad55]/70 bg-[#d3ad55]/12'
                    : 'border-white/10 bg-white/[0.045]'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                    item.highlight ? 'border-[#d3ad55]/70 bg-[#d3ad55] text-[#07150f]' : 'border-white/14 bg-white/[0.08] text-[#d3ad55]'
                  }`}>
                    {item.highlight ? (
                      <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-white">{item.project}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/62">{item.category}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#d3ad55] sm:text-right">{item.location}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f6f0e5] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <motion.figure
          {...fadeIn}
          className="overflow-hidden rounded-lg border border-[#d3ad55]/24 bg-white shadow-[0_28px_80px_rgba(44,31,13,0.12)]"
        >
          <ResponsiveImage
            src={imageUrl('investor 3.jpeg')}
            alt="Diskusi properti dan legalitas PT Kinara Land Indonesia"
            className="aspect-[16/10] w-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </motion.figure>

        <motion.div {...fadeIn} transition={{ duration: 0.62, delay: 0.08, ease: 'easeOut' }}>
          <p className="text-sm font-bold uppercase tracking-normal text-[#9b7a2e]">Cara Kerja</p>
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#07150f] sm:text-5xl">
            Transparansi sebelum transaksi, pengelolaan setelah serah terima.
          </h2>
          <div className="mt-8 grid gap-4">
            {[
              ['Kurasi lokasi', 'Kawasan dipilih berdasarkan akses, permintaan hunian, dan potensi produktivitas aset.'],
              ['Validasi aset', 'Legalitas, desain, dan kelayakan pengelolaan diperjelas sebelum proyek dipasarkan.'],
              ['Operasional rapi', 'Pemilik tidak hanya membeli bangunan, tetapi masuk ke sistem pengelolaan yang terukur.']
            ].map(([title, text]) => (
              <div key={title} className="border-b border-[#d3ad55]/20 pb-4">
                <p className="text-lg font-bold text-[#07150f]">{title}</p>
                <p className="mt-2 text-sm leading-7 text-[#53534d] sm:text-base">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <section id="kontak" className="relative overflow-hidden bg-[#fffaf0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.88fr] lg:items-center lg:px-8">
        <motion.div {...fadeIn}>
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-normal text-[#9b7a2e]">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Hubungi Kami
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-[#07150f] sm:text-5xl md:text-6xl">
            Diskusikan portfolio, kerjasama, dan informasi proyek berjalan.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#53534d] sm:text-lg">
            Tim Kinara Land dapat membantu menjelaskan company profile, arah pengembangan aset, dan detail Rivere Kostaycation IPB untuk calon investor maupun mitra strategis.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#07150f] px-6 py-4 text-sm font-bold text-[#d3ad55] transition-colors hover:bg-[#d3ad55] hover:text-[#07150f]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp Kinara Land
            </a>
            <a
              href={RIVERE_SITE_URL}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#07150f]/18 bg-white px-6 py-4 text-sm font-bold text-[#07150f] transition-colors hover:border-[#d3ad55] hover:text-[#9b7a2e]"
            >
              Landing Rivere
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          {...fadeIn}
          transition={{ duration: 0.62, delay: 0.08, ease: 'easeOut' }}
          className="rounded-lg border border-[#d3ad55]/30 bg-[#07150f] p-7 text-white shadow-[0_28px_80px_rgba(7,21,15,0.18)]"
        >
          <p className="text-sm font-bold uppercase tracking-normal text-[#d3ad55]">PT Kinara Land Indonesia</p>
          <div className="mt-7 space-y-5">
            {[
              ['Strategic focus', 'Developer properti, kost produktif, dan hospitality management.'],
              ['Primary market', 'Bogor, kawasan pendidikan, dan koridor hunian strategis.'],
              ['Featured project', 'Rivere Kostaycation IPB sebagai portfolio aset produktif dekat IPB.']
            ].map(([title, text]) => (
              <div key={title} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                <p className="font-bold text-white">{title}</p>
                <p className="mt-2 text-sm leading-7 text-white/66">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>

    <footer className="border-t border-[#d3ad55]/18 bg-[#07150f] py-9 text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 text-sm text-white/68 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-2">
            <img src={imageUrl('logo.png')} alt="Logo Kinara Land" className="h-full w-full object-contain" />
          </span>
          <div>
            <p className="text-base font-bold text-white">PT Kinara Land Indonesia</p>
            <p>Developer properti dan hospitality ecosystem.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <a href={RIVERE_SITE_URL} className="transition-colors hover:text-[#d3ad55]">Rivere Kostaycation IPB</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#d3ad55]">WhatsApp</a>
        </div>
      </div>
    </footer>
  </div>
);

export default CompanyProfilePage;
