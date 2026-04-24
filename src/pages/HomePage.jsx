import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Users, MessageCircle } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import AnimatedBadge from '@/components/AnimatedBadge.jsx';
import GradientText from '@/components/GradientText.jsx';
import SectionDivider from '@/components/SectionDivider.jsx';
import IconCircle from '@/components/IconCircle.jsx';
import { imageUrl } from '@/lib/assets.js';

const ImageCarousel = lazy(() => import('@/components/ImageCarousel.jsx'));
const ProjectShowcaseSection = lazy(() => import('@/sections/ProjectShowcaseSection.jsx'));
const MainFacilitiesSection = lazy(() => import('@/sections/MainFacilitiesSection.jsx'));
const NearbyFacilitiesSection = lazy(() => import('@/sections/NearbyFacilitiesSection.jsx'));
const UnitCardsSection = lazy(() => import('@/sections/UnitCardsSection.jsx'));
const SocialProofSection = lazy(() => import('@/sections/SocialProofSection.jsx'));

const CS_PHONE_NUMBERS = {
  cs1: '082111124005',
  cs2: '082246526316',
  cs3: '081412184272',
  cs4: '085860233469'
};

const DEFAULT_CS_KEY = 'cs1';

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
  const [shouldEnhanceHero, setShouldEnhanceHero] = useState(false);
  
  const heroImageFiles = [
    'COZ-1-edit.jpg',
    'COZ-2-edit.jpg',
    'COZ-3-edit.jpg',
    'COZ-4-edit.jpg',
    'COZ-5-edit.jpg',
    'COZ-6-edit.jpg',
    'COZ-7-edit.jpg',
    'COZ-8-edit.jpg'
  ];

  const heroImages = heroImageFiles.map(imageUrl);

  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent('Halo, saya tertarik dengan KSK Co Living Resort')}`;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const activateHero = () => {
      setShouldEnhanceHero(true);
    };

    const idleId = 'requestIdleCallback' in window
      ? window.requestIdleCallback(activateHero, { timeout: 1600 })
      : null;
    const timeoutId = idleId === null ? window.setTimeout(activateHero, 1200) : null;

    window.addEventListener('pointerdown', activateHero, { once: true, passive: true });
    window.addEventListener('keydown', activateHero, { once: true });

    return () => {
      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }

      window.removeEventListener('pointerdown', activateHero);
      window.removeEventListener('keydown', activateHero);
    };
  }, []);

  const heroBackground = (
    <div className="absolute inset-0">
      <ResponsiveImage
        src={heroImages[0]}
        alt="Kinara Signature Kost hero"
        className="h-full w-full object-cover"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
    </div>
  );
  
  return <div className="min-h-screen bg-background selection:bg-accent/30 selection:text-primary">
        
        {/* HERO SECTION */}
        <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-primary sm:h-[100dvh] sm:min-h-[700px]">
          {shouldEnhanceHero ? (
            <Suspense fallback={heroBackground}>
              <motion.div className="absolute inset-0 h-[120%]">
                <ImageCarousel images={heroImages} />
              </motion.div>
            </Suspense>
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
                <div className="mx-auto inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-md sm:px-5 sm:py-3 sm:text-sm">
                  Kinara Signature Kost
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
                <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
                  Investasi Untuk <GradientText className="drop-shadow-lg" from="from-white" to="to-accent">Mereka yang Teliti</GradientText>
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
                Kami Memberikan Kenyamanan Penghuni Untuk Ketenangan Okupansi
              </motion.p>
            </div>
          </div>
          
          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-1">
            <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[120px] fill-background" preserveAspectRatio="none">
              <path d="M0,0 C240,100 480,100 720,50 C960,0 1200,0 1440,50 L1440,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        <section className="relative z-30 -mt-10 bg-background pb-8 pt-2 sm:-mt-16 sm:pb-10 sm:pt-6 md:-mt-20">
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
                Kenali <GradientText from="from-primary" to="to-accent">Suasana Proyek</GradientText> Lebih Dekat
              </h2>
            </motion.div>

            <DeferredRender
              fallback={<div className="aspect-[4/5] rounded-[1.5rem] bg-slate-100 sm:aspect-[16/10] md:aspect-[16/7]" />}
            >
              <Suspense fallback={<div className="aspect-[4/5] rounded-[1.5rem] bg-slate-100 sm:aspect-[16/10] md:aspect-[16/7]" />}>
                <ProjectShowcaseSection />
              </Suspense>
            </DeferredRender>
          </div>
        </section>

        {/* REDESIGNED SECTION DECK */}
        <section className="cv-auto relative z-30 bg-background py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
              
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
                    <ResponsiveImage src={imageUrl('pintu-ipb.jpg')} alt="Pintu depan IPB dekat Kinara Signature Kost" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/35 to-transparent" />
                    <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-md sm:left-5 sm:top-5 sm:gap-3 sm:px-4">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span className="text-sm font-semibold text-white/90">Pintu Depan IPB</span>
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-accent sm:text-2xl">Lokasi Strategis Premium</h3>
                  <p className="text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
                    Satu-satunya kawasan co-living resort mewah yang terletak tepat di pintu depan kampus IPB.
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
                    <ResponsiveImage src={imageUrl('COZ-8-edit.jpg')} alt="Suasana resort modern di Kinara Signature Kost" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/15 to-transparent" />
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <IconCircle icon={Building2} size="md" className="bg-white/90 shadow-lg backdrop-blur-sm" iconClassName="text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-foreground sm:text-2xl">Konsep Resort Modern</h3>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Co-living resort dengan ekosistem full fasilitas paling lengkap untuk menunjang gaya hidup mahasiswa.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Soft Background */}
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
              delay: 0.2
            }} className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-border bg-secondary p-6 shadow-md hover-lift sm:rounded-[2rem] sm:p-8 lg:p-10">
                <div className="absolute right-0 top-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-accent/10 blur-3xl sm:-mr-8 sm:-mt-8 sm:h-40 sm:w-40"></div>
                <div className="relative z-10">
                  <div className="relative mb-6 h-40 overflow-hidden rounded-[1.25rem] border border-white/70 shadow-xl sm:mb-8 sm:h-52 sm:rounded-[1.5rem]">
                    <ResponsiveImage src={imageUrl('tim-kyrastay.png')} alt="Tim Kyra Stay dan pengelolaan profesional" className="w-full h-full object-cover object-[center_12%] brightness-110 contrast-110 saturate-125 transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent" />
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <IconCircle icon={Users} size="md" className="bg-white/90 shadow-lg backdrop-blur-sm" iconClassName="text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-bold leading-tight text-foreground sm:text-2xl">Pengelolaan Profesional</h3>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Dikelola secara transparan dan profesional oleh Kyra Stay. Anda tinggal duduk manis menerima hasil.
                  </p>
                </div>
              </motion.div>
              
            </div>
          </div>
        </section>

        <SectionDivider type="straight" />

        {/* VALUE STATEMENT */}
        <section className="cv-auto relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
          <div className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-accent/5 blur-[90px] sm:h-96 sm:w-96 sm:blur-[100px]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
              Investasilah Pada Yang Memberikan <GradientText from="from-primary" to="to-accent">Okupansi Asli</GradientText>
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
              Angka okupansi bukanlah sekadar janji, melainkan hasil dari kenyamanan nyata yang dirasakan penghuni. 
              Berinvestasi di Kinara Signature Kost berarti memiliki aset dengan daya tarik permanen bagi mahasiswa.
            </motion.p>
          </div>
        </section>

        {/* FASILITAS UTAMA */}
        <section className="cv-auto border-y border-border/50 bg-secondary/50 py-16 sm:py-20 lg:py-24">
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
              <AnimatedBadge text="Fasilitas Premium" className="mb-4" />
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">
                Kawasan Eksklusif <GradientText from="from-primary" to="to-accent">6000 m²</GradientText>
              </h2>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
                Fasilitas untuk menunjang kenyamanan dan okupansi. Menciptakan ekosistem tempat tinggal yang memenuhi seluruh kebutuhan hidup mahasiswa.
              </p>
            </motion.div>

            <DeferredRender
              fallback={<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-48 rounded-2xl bg-slate-100" />)}</div>}
            >
              <Suspense fallback={<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }).map((_, index) => <div key={index} className="h-48 rounded-2xl bg-slate-100" />)}</div>}>
                <MainFacilitiesSection />
              </Suspense>
            </DeferredRender>
          </div>
        </section>

        {/* FASILITAS SEKITAR */}
        <section className="cv-auto bg-background py-16 sm:py-20 lg:py-24">
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
              <h2 className="mb-6 text-3xl font-bold text-primary sm:text-4xl">Kemudahan Akses Sekitar</h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">Langkah kaki menuju berbagai titik strategis.</p>
            </motion.div>

            <DeferredRender
              fallback={<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-48 rounded-2xl bg-slate-100" />)}</div>}
            >
              <Suspense fallback={<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-48 rounded-2xl bg-slate-100" />)}</div>}>
                <NearbyFacilitiesSection />
              </Suspense>
            </DeferredRender>
          </div>
        </section>

        {/* TIPE UNIT */}
        <section className="cv-auto bg-secondary/50 py-16 sm:py-20 lg:py-24">
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
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl md:text-5xl">Pilihan <GradientText from="from-primary" to="to-accent">Tipe Unit</GradientText></h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">
                Rancang portofolio investasi Anda dengan dua pilihan bangunan yang efisien.
              </p>
            </motion.div>

            <DeferredRender
              fallback={<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10"><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /></div>}
            >
              <Suspense fallback={<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10"><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /><div className="h-[32rem] rounded-[1.75rem] bg-slate-100" /></div>}>
                <UnitCardsSection />
              </Suspense>
            </DeferredRender>
          </div>
        </section>

        {/* DENAH KAMAR */}
        <section className="cv-auto relative bg-background py-16 sm:py-20 lg:py-24">
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
              <h2 className="mb-4 text-3xl font-bold text-primary sm:text-4xl">Denah Tata Ruang</h2>
              <p className="text-base text-muted-foreground sm:text-lg md:text-xl">Efisien, luas, dan memperhatikan sirkulasi udara.</p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8
            }} className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-4 shadow-2xl sm:rounded-[2rem] md:p-6">
                <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Denah Unit</p>
                    <h3 className="mt-2 text-xl font-bold text-primary sm:text-2xl">2 Lantai</h3>
                  </div>
                  <div className="rounded-full bg-accent/10 px-3 py-2 text-xs font-semibold text-primary sm:px-4 sm:text-sm">
                    Tipe 1
                  </div>
                </div>
                <ResponsiveImage src={imageUrl('denah2lt.jpg')} alt="Denah unit 2 lantai Kinara Signature Kost" className="w-full h-auto rounded-xl object-cover" loading="lazy" decoding="async" sizes="(min-width: 1024px) 50vw, 100vw" />
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              scale: 0.95
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.8,
              delay: 0.1
            }} className="overflow-hidden rounded-[1.5rem] border border-border bg-card p-4 shadow-2xl sm:rounded-[2rem] md:p-6">
                <div className="mb-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Denah Unit</p>
                    <h3 className="mt-2 text-xl font-bold text-primary sm:text-2xl">3 Lantai</h3>
                  </div>
                  <div className="rounded-full bg-accent/10 px-3 py-2 text-xs font-semibold text-primary sm:px-4 sm:text-sm">
                    Tipe 2
                  </div>
                </div>
                <ResponsiveImage src={imageUrl('denah3lt.jpg')} alt="Denah unit 3 lantai Kinara Signature Kost" className="w-full h-auto rounded-xl object-cover" loading="lazy" decoding="async" sizes="(min-width: 1024px) 50vw, 100vw" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="cv-auto relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:18px_18px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
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
            }} className="lg:col-span-4">
                <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                  Mari bergabung bersama puluhan investor bahagia lainnya
                </h2>
                <div className="mb-8 inline-flex max-w-full flex-col items-start rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md shadow-2xl shadow-black/10 sm:rounded-[1.75rem] sm:px-6 sm:py-5">
                  <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent/90 sm:text-xs sm:tracking-[0.35em]">
                    Undangan Eksklusif
                  </span>
                  <p className="text-left text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
                    <span className="text-accent">Datang.</span>{' '}
                    <span className="text-white">Buktikan.</span>
                    <br />
                    <GradientText className="drop-shadow-sm" from="from-white" to="to-accent">
                      Bergabunglah Bersama Kami
                    </GradientText>
                  </p>
                </div>
              </motion.div>
              
              <div className="lg:col-span-8">
                <DeferredRender
                  fallback={<div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="aspect-square rounded-2xl bg-white/10" />)}</div>}
                >
                  <Suspense fallback={<div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="aspect-square rounded-2xl bg-white/10" />)}</div>}>
                    <SocialProofSection />
                  </Suspense>
                </DeferredRender>
              </div>
            </div>
          </div>
        </section>

        {/* BOLD CTA */}
        <section className="cv-auto relative overflow-hidden bg-primary py-20 sm:py-24 lg:py-32">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent via-transparent to-transparent mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
          }} className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Klik Untuk Survey & Buktikan Sendiri
            </motion.h2>
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
            delay: 0.1
          }} className="mb-12 max-w-2xl mx-auto">
              <p className="text-base text-white/85 sm:text-lg md:text-xl">
                Kami Akan Berikan Harga Khusus, Untuk Booking Bulan Ini
              </p>
              <motion.p animate={{
              scale: [1, 1.04, 1],
              y: [0, -2, 0],
              opacity: [0.75, 1, 0.75],
              textShadow: ['0 0 0 rgba(212, 175, 55, 0)', '0 0 18px rgba(212, 175, 55, 0.45)', '0 0 0 rgba(212, 175, 55, 0)']
            }} transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut"
            }} className="mt-5 text-lg font-semibold uppercase tracking-[0.18em] text-accent sm:text-xl sm:tracking-[0.22em] md:text-2xl md:tracking-[0.28em]">
                Tersisa 6 Unit!
              </motion.p>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            y: 0,
            scale: 1
          }} viewport={{
            once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-auto items-center justify-center gap-2 rounded-full border-2 border-accent bg-primary px-6 py-5 text-base font-medium text-accent shadow-2xl transition-colors duration-300 hover:bg-accent hover:text-primary sm:px-8 sm:py-6 sm:text-lg md:px-12 md:py-8 md:text-xl"
              >
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                Jadwalkan Survey Sekarang
              </a>
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
                Belajarlah Berenang Sebelum Anda Tenggelam
              </blockquote>
              <span className="absolute -bottom-8 -right-4 text-6xl font-serif leading-none text-accent/20 sm:-bottom-12 sm:-right-8 sm:text-8xl">"</span>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cv-auto bg-background pb-10 pt-16 sm:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-12">
              <h3 className="mb-4 text-xl font-bold text-primary sm:text-2xl">Masih Ada Pertanyaan?</h3>
              <p className="mb-8 text-sm text-muted-foreground sm:text-base">Customer Service kami siap membantu Anda kapan saja.</p>
              <motion.div animate={{
              scale: [1, 1.05, 1]
            }} transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-auto max-w-xs items-center justify-center gap-2 whitespace-normal rounded-full border border-accent/30 bg-primary px-6 py-4 text-center text-sm leading-snug text-accent shadow-sm transition-colors duration-300 hover:bg-primary/90 sm:max-w-md sm:px-8 sm:py-6 sm:text-base"
                >
                  <MessageCircle className="h-5 w-5 text-accent" />
                  Klik ini untuk ngobrol dengan customer service
                </a>
              </motion.div>
            </div>
            
            <div className="border-t border-border pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
              <div>
                <p className="text-lg font-bold text-primary tracking-tight">Kinara Signature Kost</p>
                <p className="text-sm text-muted-foreground">Investasi Properti Premium IPB</p>
              </div>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
              </div>
              <p className="text-sm text-muted-foreground">© 2026 Kinara Signature Kost. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>;
};
export default HomePage;
