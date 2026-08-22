import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { MapPin, Building2, Users, CheckCircle2, ChevronRight, Menu, X } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import AnimatedBadge from '@/components/AnimatedBadge.jsx';
import SectionDivider from '@/components/SectionDivider.jsx';
import IconCircle from '@/components/IconCircle.jsx';
import ChunkErrorBoundary from '@/components/ChunkErrorBoundary.jsx';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton.jsx';
import WhatsAppCtaButton from '@/components/WhatsAppCtaButton.jsx';
import { WhatsAppConsultationForm } from '@/components/WhatsAppLeadGate.jsx';
import { imageUrl } from '@/lib/assets.js';
import { RIVERE_SITE_URL } from '@/lib/site.js';
import BlogPreviewSection from '@/sections/BlogPreviewSection.jsx';
import { RIVERE_DESIGN_IMAGES } from '@/data/rivereImages.js';

const ImageCarousel = lazy(() => import('@/components/ImageCarousel.jsx'));
const ProjectShowcaseSection = lazy(() => import('@/sections/ProjectShowcaseSection.jsx'));
const MainFacilitiesSection = lazy(() => import('@/sections/MainFacilitiesSection.jsx'));
const NearbyFacilitiesSection = lazy(() => import('@/sections/NearbyFacilitiesSection.jsx'));
const UnitCardsSection = lazy(() => import('@/sections/UnitCardsSection.jsx'));

const CS_PHONE_NUMBERS = {
  cs1: '082111124005',
  cs2: '082246526316',
  cs3: '081412184272',
  cs4: '085860233469',
  nur: '088293516558',
  melin: '081928719457',
  ge: '081958798799',
  andika: '085196480931',
  novan: '087797000003'
};

const DEFAULT_CS_KEY = 'cs1';
const CTWA_MESSAGES = {
  floating: 'Halo Kinara Land, saya tertarik ingin tahu lebih lanjut tentang proyek Rivere.',
  simulation: 'Halo Kinara Land, saya ingin konsultasi simulasi cicilan dan promo Rivere.'
};

const KYRA_STAY_IMAGES = [
  imageUrl('K1.png'),
  imageUrl('K2.png'),
  imageUrl('K3.png')
];

const INVESTMENT_HIGHLIGHTS = [
  {
    title: 'Lokasi Super Strategis',
    text: 'Berada di Ring 1 IPB University, hanya 2 menit dari gerbang utama dan bebas macet.'
  },
  {
    title: 'Kepemilikan SHM',
    text: 'Sertifikat Hak Milik langsung atas nama Anda sebagai dasar kepemilikan aset.'
  },
  {
    title: 'Dikelola Profesional',
    text: 'Management Estate Profesional Kyra Stay menangani operasional agar investasi berjalan tanpa ribet.'
  }
];

const BUILDING_SPECS = [
  'Listrik 1.300 W per kamar dan utama',
  'Pondasi cakar ayam',
  'Dinding Hebel 10 cm',
  'Rangka atap baja ringan',
  'Kusen alumunium',
  'Penutup atap Alderon',
  'PDAM + toren 1000L',
  'Pintu Baja Fortress / setara',
  'Lantai granit tile 60x60',
  'Plafon PVC',
  'Sanitair TOTO / setara'
];

const RIVERE_PILLARS = [
  {
    title: 'Lokasi Ring 1 IPB',
    text: 'Hanya 2 menit dari gerbang utama IPB dengan akses bebas macet.'
  },
  {
    title: 'Legalitas SHM',
    text: 'Sertifikat Hak Milik langsung atas nama investor.'
  },
  {
    title: 'Kyra Stay Management',
    text: 'Pengelolaan profesional untuk operasional investasi tanpa ribet.'
  },
  {
    title: 'Integrated Resort Facilities',
    text: 'Fasilitas terintegrasi untuk kenyamanan dan stabilitas okupansi.'
  },
  {
    title: 'Smart Spatial Design',
    text: 'Konsep mezzanine untuk optimalisasi ruang istirahat dan produktivitas.'
  },
  {
    title: 'Financial Perspective',
    text: 'Potensi passive income, yield, capital gain, dan ROI yang terukur.'
  },
  {
    title: 'Developer Portfolio',
    text: 'Didukung portofolio PT Kinara Land Indonesia di berbagai proyek properti.'
  }
];

const PUBLIC_NAVIGATION_ANCHORS = [
  { sectionId: 'hero', label: 'Overview', href: '#hero' },
  { sectionId: 'konsep', label: 'Konsep', href: '#konsep' },
  { sectionId: 'fasilitas', label: 'Fasilitas', href: '#fasilitas' },
  { sectionId: 'unit', label: 'Unit', href: '#unit' },
  { sectionId: 'konsultasi', label: 'Hubungi', href: '#konsultasi' },
  { sectionId: 'blog', label: 'Blog', href: '#blog' }
];

const RivereAnchorNavigation = ({ onMenuOpenChange }) => {
  const [activeId, setActiveId] = useState('hero');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const sections = PUBLIC_NAVIGATION_ANCHORS.map(({ sectionId }) => document.getElementById(sectionId)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
    }, { rootMargin: '-72px 0px -55% 0px', threshold: [0.1, 0.35, 0.65] });
    sections.forEach((section) => observer.observe(section));
    const hash = window.location.hash;
    if (hash) window.requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'auto', block: 'start' }));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onMenuOpenChange?.(isMobileOpen);
    if (!isMobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => firstLinkRef.current?.focus(), 0);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMobileOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); };
  }, [isMobileOpen, onMenuOpenChange]);

  const closeMenu = () => { setIsMobileOpen(false); window.setTimeout(() => menuButtonRef.current?.focus(), 0); };
  const goTo = (event, href) => {
    event.preventDefault();
    window.history.pushState({}, '', href);
    document.querySelector(href)?.scrollIntoView({ behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    closeMenu();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/15 bg-primary/95 text-white shadow-[0_12px_32px_rgba(4,25,18,0.18)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#hero" onClick={(event) => goTo(event, '#hero')} className="flex min-w-0 items-center gap-2.5" aria-label="Rivere Kostaycation IPB"><span className="truncate font-serif text-base font-semibold sm:text-lg">Rivere Kostaycation IPB</span></a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi Rivere desktop">{PUBLIC_NAVIGATION_ANCHORS.filter(({ sectionId }) => sectionId !== 'konsultasi').map((anchor) => { const active = activeId === anchor.sectionId; return <a key={anchor.sectionId} href={anchor.href} onClick={(event) => goTo(event, anchor.href)} aria-current={active ? 'location' : undefined} className={`relative py-5 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-accent after:transition-opacity ${active ? 'text-accent after:opacity-100' : 'text-white/75 after:opacity-0 hover:text-accent'}`}>{anchor.label}</a>; })}</nav>
        <div className="flex items-center gap-2"><span className="hidden sm:inline-flex"><a href="#konsultasi" onClick={(event) => goTo(event, '#konsultasi')} className="inline-flex min-h-11 items-center justify-center rounded-full border border-accent bg-accent px-5 py-2.5 text-sm font-bold text-primary shadow-[0_12px_28px_rgba(208,173,90,0.24)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Konsultasi Sekarang</a></span><button ref={menuButtonRef} type="button" onClick={() => setIsMobileOpen((current) => !current)} aria-expanded={isMobileOpen} aria-controls="rivere-mobile-menu" aria-label={isMobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/60 text-accent lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{isMobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}</button></div>
      </div>
      {isMobileOpen ? <><button type="button" aria-label="Tutup menu navigasi" className="fixed inset-0 top-16 z-40 bg-primary/45 backdrop-blur-[2px] lg:hidden" onClick={closeMenu} /><div id="rivere-mobile-menu" className="absolute left-0 right-0 top-full z-50 border-b border-accent/35 bg-primary/95 px-4 py-3 shadow-[0_20px_45px_rgba(4,25,18,0.3)] backdrop-blur-md lg:hidden"><nav aria-label="Navigasi Rivere mobile" className="grid">{PUBLIC_NAVIGATION_ANCHORS.map((anchor, index) => <a ref={index === 0 ? firstLinkRef : undefined} key={anchor.sectionId} href={anchor.href} onClick={(event) => goTo(event, anchor.href)} className="flex min-h-12 items-center justify-between border-b border-accent/20 px-2 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{anchor.label}<ChevronRight className="h-4 w-4 text-accent" aria-hidden="true" /></a>)}<a href="#konsultasi" onClick={(event) => goTo(event, '#konsultasi')} className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Konsultasi Sekarang</a></nav></div></> : null}
    </header>
  );
};

const DEVELOPER_PORTFOLIO = [
  'Rabbani Bintaro Residence',
  'Green Forest Cifor',
  'Villa Rabbani Padjajaran',
  'Rabbani Townhouse Cimanggu',
  'Kikost Manunggal',
  'Kikost Cifor',
  'Kikost Classic IPB',
  'Kikost Cozy IPB',
  'Bogor City Kost Cimanggu'
];

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${RIVERE_SITE_URL}/#organization`,
      name: 'PT Kinara Land Indonesia',
      url: 'https://kinaraland.com/',
      brand: {
        '@type': 'Brand',
        name: 'Rivere Kostaycation IPB'
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${RIVERE_SITE_URL}/#website`,
      url: `${RIVERE_SITE_URL}/`,
      name: 'Rivere Kostaycation IPB',
      inLanguage: 'id-ID',
      publisher: { '@id': `${RIVERE_SITE_URL}/#organization` }
    },
    {
      '@type': 'WebPage',
      '@id': `${RIVERE_SITE_URL}/#webpage`,
      url: `${RIVERE_SITE_URL}/`,
      name: 'Rivere Kostaycation IPB | Smart Property Investment Ring 1 IPB',
      description: 'Rivere Kostaycation IPB adalah investasi properti premium berkonsep resort di Ring 1 IPB, 2 menit dari gerbang utama IPB, legalitas SHM, dan dikelola profesional oleh Kyra Stay.',
      inLanguage: 'id-ID',
      isPartOf: { '@id': `${RIVERE_SITE_URL}/#website` },
      about: { '@id': `${RIVERE_SITE_URL}/#organization` }
    }
  ]
};

function normalizeWhatsAppPhone(phoneNumber) {
  const digits = phoneNumber.replace(/\D/g, '');

  if (digits.startsWith('62')) {
    return digits;
  }

  if (digits.startsWith('0')) {
    return `62${digits.slice(1)}`;
  }

  return digits;
}

function getCurrentCsKey(pathname) {
  const firstSegment = pathname.split('/').filter(Boolean)[0]?.toLowerCase();

  return CS_PHONE_NUMBERS[firstSegment] ? firstSegment : DEFAULT_CS_KEY;
}

const DeferredRender = ({ children, fallback, rootMargin = '320px', className }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (shouldRender || typeof window === 'undefined') {
      return undefined;
    }

    if (typeof window.IntersectionObserver === 'undefined') {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return <div ref={containerRef} className={className}>{shouldRender ? children : fallback}</div>;
};

const HomePage = () => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const envCsKey = import.meta.env.VITE_CS_KEY?.toLowerCase();
  const currentCsKey = CS_PHONE_NUMBERS[envCsKey] ? envCsKey : getCurrentCsKey(pathname);
  const currentPhoneNumber = CS_PHONE_NUMBERS[currentCsKey];
  const whatsappPhone = normalizeWhatsAppPhone(currentPhoneNumber);
  const shouldEnhanceHero = false;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroImages = RIVERE_DESIGN_IMAGES.map(({ file }) => imageUrl(file));
  const createWhatsAppUrl = (message) => `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  const ctaLinks = {
    simulation: createWhatsAppUrl(CTWA_MESSAGES.simulation)
  };

  const heroBackground = (
    <div className="absolute inset-0">
      <ResponsiveImage
        src={heroImages[0]}
        alt="Rivere Kostaycation IPB hero"
        className="h-full w-full object-cover"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041912]/95 via-[#082a1f]/60 to-[#082a1f]/25" />
    </div>
  );
  
  return <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary">
        <Helmet>
          <title>Rivere Kostaycation IPB | Smart Property Investment Ring 1 IPB</title>
          <link rel="icon" href="/favicon.ico?v=kinara-20260721" sizes="any" />
          <link rel="icon" type="image/png" href="/favicon.png?v=kinara-20260721" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=kinara-20260721" />
          <meta name="description" content="Rivere Kostaycation IPB adalah investasi properti premium berkonsep resort di Ring 1 IPB, 2 menit dari gerbang utama IPB, legalitas SHM, dan dikelola profesional oleh Kyra Stay." />
          <meta name="robots" content="index, follow, max-image-preview:large" />
          <link rel="canonical" href={`${RIVERE_SITE_URL}/`} />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="id_ID" />
          <meta property="og:site_name" content="Rivere Kostaycation IPB" />
          <meta property="og:title" content="Rivere Kostaycation IPB | Smart Property Investment Ring 1 IPB" />
          <meta property="og:description" content="Investasi properti premium berkonsep resort di Ring 1 IPB, legalitas SHM, dan pengelolaan Kyra Stay." />
          <meta property="og:url" content={`${RIVERE_SITE_URL}/`} />
          <meta property="og:image" content={`${RIVERE_SITE_URL}/images/rivere/Design%201/1.png`} />
          <meta property="og:image:alt" content="Rivere Kostaycation IPB, investasi kost resort premium dekat IPB" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Rivere Kostaycation IPB | Smart Property Investment Ring 1 IPB" />
          <meta name="twitter:description" content="Investasi properti premium berkonsep resort di Ring 1 IPB dengan legalitas SHM dan pengelolaan profesional." />
          <meta name="twitter:image" content={`${RIVERE_SITE_URL}/images/rivere/Design%201/1.png`} />
          <meta name="twitter:image:alt" content="Rivere Kostaycation IPB, investasi kost resort premium dekat IPB" />
          <script type="application/ld+json">{JSON.stringify(HOME_SCHEMA)}</script>
        </Helmet>
        {!mobileMenuOpen ? <FloatingWhatsAppButton phoneNumber={whatsappPhone} message={CTWA_MESSAGES.floating} /> : null}
        
        <RivereAnchorNavigation onMenuOpenChange={setMobileMenuOpen} />
        {/* HERO SECTION */}
        <section id="hero" className="relative h-[100svh] min-h-[620px] scroll-mt-24 overflow-hidden bg-primary sm:h-[100dvh] sm:min-h-[700px]">
          {shouldEnhanceHero ? (
            <ChunkErrorBoundary fallback={heroBackground}>
              <Suspense fallback={heroBackground}>
                <motion.div className="absolute inset-0 h-[120%]">
                  <ImageCarousel images={heroImages} />
                </motion.div>
              </Suspense>
            </ChunkErrorBoundary>
          ) : heroBackground}
          
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 text-center text-white sm:pt-20">
              
              <motion.div initial={{
              opacity: 0,
              y: -20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              ease: "easeOut"
            }} className="mb-8">
                <div className="mx-auto inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-accent backdrop-blur-md sm:px-5 sm:py-3 sm:text-sm">
                  Rivere Kostaycation IPB
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              scale: 0.9,
              y: 30
            }} animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut"
            }}>
                <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
                  Rivere Kostaycation IPB
                </h1>
              </motion.div>
              
              <motion.p initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.4
            }} className="mb-6 text-lg font-medium text-white/90 sm:text-xl md:text-3xl">
                Lebih dari investasi properti: kost berkonsep resort di Ring 1 IPB, hanya 2 menit dari gerbang utama dan bebas macet.
              </motion.p>
              <motion.p initial={{
              opacity: 0,
              y: 14
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.55
            }} className="mx-auto max-w-2xl text-sm font-semibold uppercase tracking-normal text-accent sm:text-base">
                The New Standard of Smart Property Investment
              </motion.p>
              <motion.div initial={{
              opacity: 0,
              y: 14
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.8,
              delay: 0.7
            }} className="mt-8 flex justify-center px-2">
                <WhatsAppCtaButton
                  href="#konsultasi"
                  ctaLabel="Above the Fold - Brosur Eksklusif"
                  variant="hero"
                  external={false}
                  className="w-full max-w-sm sm:w-auto sm:max-w-none"
                >
                  Kirim Brosur Eksklusif ke WhatsApp
                </WhatsAppCtaButton>
              </motion.div>
            </div>
          </div>
          
          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1">
            <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[120px] fill-background" preserveAspectRatio="none">
              <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        <section id="galeri" className="relative z-30 -mt-10 scroll-mt-28 bg-background pb-8 pt-2 sm:-mt-16 sm:pb-10 sm:pt-6 md:-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
            }} className="text-center mb-8 sm:mb-10">
              <AnimatedBadge text="Galeri Proyek" className="mb-4" />
              <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                Lebih dari Investasi Properti
              </h2>
              <p className="mx-auto max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Lihat potensi unit Rivere dari desain, lokasi, dan skema pengelolaan. Konsultasikan pilihan terbaik sebelum kuota prioritas berubah.
              </p>
            </motion.div>

            <DeferredRender
              fallback={<div className="aspect-[4/5] rounded-[1.5rem] bg-slate-100 sm:aspect-[16/10] md:aspect-[16/7]" />}
            >
              <ChunkErrorBoundary fallback={<div className="aspect-[4/5] rounded-[1.5rem] bg-slate-100 sm:aspect-[16/10] md:aspect-[16/7]" />}>
                <Suspense fallback={<div className="aspect-[4/5] rounded-[1.5rem] bg-slate-100 sm:aspect-[16/10] md:aspect-[16/7]" />}>
                  <ProjectShowcaseSection />
                </Suspense>
              </ChunkErrorBoundary>
            </DeferredRender>

            <motion.div initial={{
            opacity: 0,
            y: 18
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.12
          }} className="mt-12 flex justify-center px-2 sm:mt-14">
              <WhatsAppCtaButton
                href="#konsultasi"
                ctaLabel="Mid Page - Ketersediaan Unit dan Masterplan"
                variant="light"
                external={false}
                className="w-full max-w-sm sm:w-auto sm:max-w-none"
              >
                Cek Ketersediaan Unit & Masterplan
              </WhatsAppCtaButton>
            </motion.div>
          </div>
        </section>

        {/* REDESIGNED SECTION DECK */}
        <section id="konsep" className="cv-auto relative z-30 scroll-mt-28 bg-background py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              
              {/* Card 1: Gradient Premium */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6
            }} className="group flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-accent/20 bg-primary p-6 text-primary-foreground shadow-2xl shadow-primary/20 hover-lift sm:rounded-[2rem] sm:p-8 lg:p-10">
                <div>
                  <div className="relative mb-6 h-40 overflow-hidden rounded-[1.25rem] border border-white/10 shadow-2xl sm:mb-8 sm:h-52 sm:rounded-[1.5rem]">
                    <ResponsiveImage src={imageUrl('pintu-ipb.jpg')} alt="Pintu depan IPB dekat Rivere Kostaycation IPB" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/35 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-md sm:left-5 sm:top-5 sm:gap-3 sm:px-4">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-white/90">Ring 1 IPB</span>
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-accent sm:text-2xl">Lokasi Emas di Ring 1 IPB University</h3>
                  <p className="text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                    Satu-satunya kost berkonsep resort di depan gerbang utama IPB, dikelilingi captive market ribuan mahasiswa dalam kawasan Dramaga University Town.
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Solid Accent Border */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6,
              delay: 0.1
            }} className="group flex flex-col justify-between overflow-hidden rounded-[1.5rem] border-2 border-accent bg-card p-6 shadow-lg hover-lift sm:rounded-[2rem] sm:p-8 lg:p-10">
                <div>
                  <div className="relative mb-6 h-40 overflow-hidden rounded-[1.25rem] border border-border shadow-xl sm:mb-8 sm:h-52 sm:rounded-[1.5rem]">
                    <ResponsiveImage src={imageUrl('rivere/Design 1/1.png')} alt="Fasad Rivere Kostaycation IPB Design 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <IconCircle icon={Building2} size="md" className="bg-white/90 shadow-lg backdrop-blur-sm" iconClassName="text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-foreground sm:text-2xl">Hybrid Property Development & Hospitality Ecosystem</h3>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Hunian kost produktif yang elegan, tertata, dan dikelola profesional untuk menciptakan investasi yang stabil, terukur, dan nyaman dijalani.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* KYRA STAY MANAGEMENT */}
        <section id="kyra-stay" aria-labelledby="kyra-stay-title" className="cv-auto relative scroll-mt-28 overflow-hidden border-y border-white/10 bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,rgba(208,173,90,0.22)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true"></div>
          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 24
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-50px"
          }} transition={{
            duration: 0.6
          }} className="mx-auto max-w-4xl text-center">
              <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-accent">
                <Users className="h-4 w-4" aria-hidden="true" />
                Ekosistem Bebas Repot Bersama Kyra Stay
              </div>
              <h2 id="kyra-stay-title" className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Dikelola oleh Management Estate Profesional Kyra Stay
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                Kyra Stay menangani pengelolaan Rivere Kostaycation IPB secara profesional, mulai dari operasional hunian, layanan penghuni, perawatan, hingga sistem pelaporan, sehingga investor memiliki aset produktif tanpa beban operasional harian.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
              <motion.div initial={{
              opacity: 0,
              x: -24
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6,
              delay: 0.08
            }} className="rounded-lg border border-white/10 bg-white/[0.055] p-5 backdrop-blur-md sm:p-6">
                <div className="grid gap-3">
                  {[
                    ['Operasional terkelola', 'Kebutuhan operasional, pelayanan penghuni, dan perawatan ditangani oleh tim pengelola.'],
                    ['Kamar kosong ditangani pengelola', 'Biaya perawatan dan pengelolaan saat kamar belum terisi ditanggung oleh pengelola sesuai skema proyek.'],
                    ['Skema bagi hasil terkelola', 'Pembagian hasil dikelola secara profesional, dengan biaya operasional dibebankan kepada penghuni.']
                  ].map(([title, text], index) => (
                    <div key={title} className="group flex gap-4 border border-white/10 bg-primary/35 p-4 transition-colors duration-300 hover:border-accent/45 hover:bg-primary/55">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-sm font-bold text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="font-semibold text-white">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-white/65 sm:text-base">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              x: 24
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.6,
              delay: 0.12
            }} className="relative">
                <figure className="h-full overflow-hidden rounded-lg border border-white/15 bg-white/5 shadow-2xl shadow-black/25">
                  <div className="relative h-full min-h-[360px] overflow-hidden bg-[#06261b] sm:min-h-[430px]">
                    <ChunkErrorBoundary fallback={<ResponsiveImage src={KYRA_STAY_IMAGES[0]} alt="Tim profesional Kyra Stay" className="h-full w-full object-cover" sizes="(min-width: 1024px) 54vw, 100vw" />}>
                      <Suspense fallback={<ResponsiveImage src={KYRA_STAY_IMAGES[0]} alt="Tim profesional Kyra Stay" className="h-full w-full object-cover" sizes="(min-width: 1024px) 54vw, 100vw" />}>
                        <ImageCarousel
                          images={KYRA_STAY_IMAGES}
                          interval={4000}
                          altPrefix="Tim profesional Kyra Stay"
                          imageClassName="h-full w-full object-cover object-center brightness-[0.98] contrast-[1.04] saturate-[0.92]"
                          overlayClassName="bg-gradient-to-t from-[#041912]/28 via-transparent to-transparent"
                          sizes="(min-width: 1024px) 54vw, 100vw"
                        />
                      </Suspense>
                    </ChunkErrorBoundary>
                  </div>
                </figure>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionDivider type="straight" />

        {/* VALUE STATEMENT */}
        <section id="investasi" className="cv-auto relative scroll-mt-28 overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/5 blur-[90px] sm:h-96 sm:w-96 sm:blur-[100px]"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h2 initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="mb-8 text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Investasi Properti Premium & Tanpa Ribet
            </motion.h2>
            <motion.p initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} className="text-base font-light leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
              Rivere Kostaycation IPB menggabungkan pengembangan properti dan hospitality ecosystem profesional dengan legalitas SHM, captive market mahasiswa IPB, serta positioning sebagai aset wealth preservation yang stabil dan berkelanjutan.
            </motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.18
          }} className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {INVESTMENT_HIGHLIGHTS.map((item) => (
                <div key={item.title} className="rounded-lg border border-primary/15 bg-card p-5 text-left shadow-sm">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-accent">
                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold text-primary/60">Passive Income</p>
                <p className="mt-3 text-2xl font-black text-primary sm:text-3xl">Rp 97 Jt</p>
                <p className="mt-1 text-sm text-muted-foreground">Potensi per tahun per unit</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold text-primary/60">Yield</p>
                <p className="mt-3 text-2xl font-black text-primary sm:text-3xl">6%-9%</p>
                <p className="mt-1 text-sm text-muted-foreground">Dengan capital gain 5%-8%</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold text-primary/60">Total ROI</p>
                <p className="mt-3 text-2xl font-black text-primary sm:text-3xl">8%-14%</p>
                <p className="mt-1 text-sm text-muted-foreground">Dengan skema bagi hasil terkelola</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FASILITAS UTAMA */}
        <section id="fasilitas" className="cv-auto scroll-mt-28 border-y border-border/50 bg-secondary/50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12 sm:mb-16">
              <AnimatedBadge text="Concentric Circles of Comfort" className="mb-4" />
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
                Ekosistem Fasilitas Terintegrasi
              </h2>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
                Didesain secara spesifik untuk stabilitas okupansi dengan konsep Concentric Circles of Comfort.
              </p>
            </motion.div>

            <DeferredRender
              fallback={<div className="h-80 rounded-lg bg-white/60" />}
            >
              <ChunkErrorBoundary fallback={<div className="h-80 rounded-lg bg-white/60" />}>
                <Suspense fallback={<div className="h-80 rounded-lg bg-white/60" />}>
                  <MainFacilitiesSection />
                </Suspense>
              </ChunkErrorBoundary>
            </DeferredRender>
          </div>
        </section>

        {/* FASILITAS SEKITAR */}
        <section id="lokasi" className="cv-auto scroll-mt-28 bg-background py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12 sm:mb-16">
              <AnimatedBadge text="Fasilitas Sekitar" className="mb-4" />
              <h2 className="mb-6 text-3xl font-bold text-primary sm:text-4xl">Fasilitas Kawasan Sekitar Cluster</h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">Dikelilingi kebutuhan harian, layanan kesehatan, olahraga, kuliner, dan akses transportasi Dramaga.</p>
            </motion.div>

            <DeferredRender
              fallback={<div className="grid gap-8 md:grid-cols-2">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-44 border-t border-primary/10 bg-white/30" />)}</div>}
            >
              <ChunkErrorBoundary fallback={<div className="grid gap-8 md:grid-cols-2">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-44 border-t border-primary/10 bg-white/30" />)}</div>}>
                <Suspense fallback={<div className="grid gap-8 md:grid-cols-2">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-44 border-t border-primary/10 bg-white/30" />)}</div>}>
                  <NearbyFacilitiesSection />
                </Suspense>
              </ChunkErrorBoundary>
            </DeferredRender>
          </div>
        </section>

        {/* TIPE UNIT */}
        <section id="unit" className="cv-auto scroll-mt-28 bg-secondary/50 py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="text-center mb-12 sm:mb-16">
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">Pilihan Tipe Unit</h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
                Dua pilihan unit dengan skema pembayaran 6 bulan atau 1 tahun.
              </p>
            </motion.div>

            <div id="denah" className="scroll-mt-28">
              <DeferredRender
                fallback={<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10"><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /></div>}
              >
                <ChunkErrorBoundary fallback={<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10"><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /></div>}>
                  <Suspense fallback={<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10"><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /></div>}>
                    <UnitCardsSection />
                  </Suspense>
                </ChunkErrorBoundary>
              </DeferredRender>
            </div>
          </div>
        </section>

        {/* SMART SPATIAL DESIGN */}
        <section id="smart-spatial" className="cv-auto relative scroll-mt-28 overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              <motion.div initial={{
              opacity: 0,
              y: 24
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <AnimatedBadge text="Smart Spatial Design" className="mb-5" />
                <h2 className="text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
                  Smart Spatial Design: Optimalisasi Ruang Maksimal
                </h2>
                <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
                  Konsep mezzanine memisahkan area istirahat dan produktivitas dengan proporsi yang ergonomis. Setiap inci ruang dirancang untuk memberi kenyamanan resort dalam compact footprint.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Rest Area', 'Area istirahat terasa lebih privat dan tertata.'],
                    ['Productive Zone', 'Ruang belajar dan aktivitas harian lebih fungsional.'],
                    ['Compact Comfort', 'Kenyamanan resort dalam footprint yang efisien.']
                  ].map(([title, text]) => (
                    <div key={title} className="border-l-2 border-accent bg-white/70 px-4 py-4 shadow-sm">
                      <p className="text-sm font-bold text-primary">{title}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 24
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.1
            }} className="relative">
                <figure className="overflow-hidden rounded-lg border border-primary/15 bg-card shadow-[0_24px_70px_rgba(7,39,29,0.16)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
                    <ResponsiveImage src={imageUrl('mezzanine.png')} alt="Visual desain smart spatial Rivere Kostaycation IPB" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" decoding="async" sizes="(min-width: 1024px) 45vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 border border-white/15 bg-primary/75 p-5 text-white backdrop-blur-md">
                      <p className="text-xs font-semibold uppercase tracking-normal text-accent">Konsep Mezzanine</p>
                      <p className="mt-2 text-xl font-bold leading-tight">Memisahkan area istirahat dan produktivitas secara elegan.</p>
                    </div>
                  </div>
                </figure>
              </motion.div>
            </div>

            <motion.div initial={{
            opacity: 0,
            y: 24
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.12
          }} className="mx-auto mt-12 max-w-6xl border-t border-primary/15 pt-8">
              <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-normal text-accent">Spesifikasi Bangunan</p>
                  <h3 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">Dibangun untuk aset produktif jangka panjang</h3>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Spesifikasi inti dipilih untuk mendukung kenyamanan penghuni, kemudahan perawatan, dan daya tahan aset hospitality.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {BUILDING_SPECS.map((spec) => (
                  <div key={spec} className="flex items-start gap-3 rounded-lg border border-primary/10 bg-white/80 p-3 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm font-medium leading-6 text-foreground/80">{spec}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* RIVERE ADVANTAGE */}
        <section id="advantage" className="cv-auto relative scroll-mt-28 overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:42px_42px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{
            opacity: 0,
            y: 24
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="mx-auto max-w-4xl text-center">
              <AnimatedBadge text="The 7 Pillars of Rivere Advantage" className="mb-5" />
              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                Tujuh Pilar Keamanan Finansial Rivere
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                Rivere Kostaycation bukan sekadar properti, tetapi kendaraan wealth preservation yang dirancang dengan lokasi, legalitas, desain, fasilitas, pengelolaan, dan perspektif finansial yang terukur.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
              <motion.div initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }} className="lg:col-span-5">
                <figure className="h-full overflow-hidden rounded-lg border border-white/15 bg-white shadow-2xl shadow-black/20">
                  <div className="aspect-[4/3] overflow-hidden bg-primary/20">
                    <ResponsiveImage src={imageUrl('data.png')} alt="Visual pengembangan Rivere Kostaycation IPB oleh PT Kinara Land Indonesia" className="h-full w-full object-cover" loading="lazy" decoding="async" sizes="(min-width: 1024px) 40vw, 100vw" />
                  </div>
                  <figcaption className="border-t-4 border-accent bg-white p-6 text-primary sm:p-7">
                    <p className="text-sm font-bold uppercase tracking-normal text-accent">Dashboard Owner dan Laporan Profit</p>
                    <h3 className="mt-3 text-2xl font-black leading-tight sm:text-3xl">
                      Pemilik dapat memantau performa properti yang dimiliki.
                    </h3>
                    <div className="mt-5 grid gap-3 text-sm leading-6 text-primary/78">
                      <p><strong className="text-primary">Pantau keuntungan:</strong> owner dapat melihat estimasi pendapatan, bagi hasil, dan histori performa unit.</p>
                      <p><strong className="text-primary">Status properti:</strong> okupansi, aktivitas pengelolaan, dan kondisi unit dapat dipantau lebih transparan.</p>
                      <p><strong className="text-primary">Laporan terukur:</strong> data membantu pemilik memahami perkembangan aset tanpa harus mengurus operasional harian.</p>
                    </div>
                  </figcaption>
                </figure>
              </motion.div>
              
              <motion.div initial={{
              opacity: 0,
              y: 24
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.1
            }} className="grid gap-3 lg:col-span-7 sm:grid-cols-2">
                {RIVERE_PILLARS.map((pillar, index) => (
                  <div key={pillar.title} className={`${index === 6 ? 'sm:col-span-2' : ''} rounded-lg border border-white/10 bg-white/[0.055] p-4 backdrop-blur-md transition-colors duration-300 hover:border-accent/45 hover:bg-white/[0.08]`}>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-sm font-bold text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-base font-bold leading-tight text-white">{pillar.title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-white/68">{pillar.text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{
            opacity: 0,
            y: 24
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.14
          }} className="mt-10 border-t border-white/10 pt-8">
              <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-normal text-accent">Developer Track Record</p>
                  <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Portofolio Developer PT Kinara Land Indonesia</h3>
                </div>
                <p className="max-w-xl text-sm leading-6 text-white/65">
                  Portofolio pengembangan yang memperkuat kredibilitas Rivere sebagai aset properti premium.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {DEVELOPER_PORTFOLIO.map((project) => (
                  <div key={project} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-sm font-semibold leading-6 text-white/82">{project}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CLOSING QUOTE */}
        <section className="cv-auto relative border-b border-border bg-background py-20 sm:py-24 lg:py-32">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-border to-transparent"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.8
          }} className="relative">
              <span className="absolute -left-4 -top-8 text-6xl font-serif leading-none text-accent/20 sm:-left-8 sm:-top-12 sm:text-8xl">"</span>
              <blockquote className="text-2xl font-bold italic leading-tight text-primary/90 sm:text-3xl md:text-5xl">
                Rivere Kostaycation - The New Standard of Smart Property Investment.
              </blockquote>
              <span className="absolute -bottom-8 -right-4 text-6xl font-serif leading-none text-accent/20 sm:-bottom-12 sm:-right-8 sm:text-8xl">"</span>
            </motion.div>
          </div>
        </section>

        {/* BLOG SEO */}
        <div id="blog" className="scroll-mt-28">
          <BlogPreviewSection />
        </div>

        {/* BOTTOM CTWA */}
        <section id="konsultasi" className="cv-auto scroll-mt-28 bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div initial={{
            opacity: 0,
            y: 22
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }} className="border-y border-primary/15 py-12 sm:py-16">
              <AnimatedBadge text="Simulasi Pembayaran" className="mb-5" />
              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-primary sm:text-4xl md:text-5xl">
                Diskusikan skema cicilan dan promo unit Rivere
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Tim kami dapat membantu menyesuaikan pilihan Type 62/31 atau Type 94/31 dengan budget, jadwal pembayaran, dan prioritas investasi Anda.
              </p>
              <WhatsAppConsultationForm
                whatsappHref={ctaLinks.simulation}
                ctaLabel="Bottom Funnel - Simulasi Cicilan dan Promo"
              />
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cv-auto bg-primary pb-10 pt-16 text-primary-foreground sm:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center gap-6 border-t border-white/15 pt-10 text-center md:flex-row md:justify-between md:text-left">
              <div>
                <p className="text-lg font-bold text-white">Rivere Kostaycation IPB</p>
                <p className="text-sm text-white/65">The New Standard of Smart Property Investment</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-white/65 sm:gap-6">
                <a href="/#denah" className="hover:text-accent transition-colors">Denah</a>
                <a href="/blog/" className="hover:text-accent transition-colors">Blog</a>
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              </div>
              <p className="text-sm text-white/65">© 2026 Rivere Kostaycation IPB. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>;
};
export default HomePage;
