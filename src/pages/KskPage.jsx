import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Building2, Check, ChevronDown, ChevronRight, MapPin, Menu, MessageCircle, ShieldCheck, Users, X } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';
import { KSK_SITE_URL } from '@/lib/site.js';

const KSK_WHATSAPP_NUMBER = '6282111124005';
const KSK_MESSAGE = 'Halo Kinara Land, saya ingin mendapatkan informasi terbaru mengenai Kinara Signature Kost.';
const KSK_SOLD_OUT = true;
const NAV_ITEMS = [
  ['Keunggulan', '#keunggulan'],
  ['Galeri', '#galeri'],
  ['Fasilitas', '#fasilitas'],
  ['Unit', '#unit'],
  ['Lokasi', '#lokasi'],
  ['FAQ', '#faq']
];

const KskImage = ({ fileName, alt, className = '', sizes = '100vw', loading = 'lazy' }) => (
  <ResponsiveImage src={imageUrl(`ksk/${fileName}`)} alt={alt} className={className} sizes={sizes} loading={loading} decoding="async" />
);

const KskSoldOutPage = () => (
  <div className="fixed inset-0 z-[9999] overflow-y-auto bg-primary text-white">
    <Helmet>
      <title>Kinara Signature Kost | Sold Out</title>
      <meta name="description" content="Seluruh unit Kinara Signature Kost telah terjual. Terima kasih atas kepercayaan para pemilik dan investor." />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={`${KSK_SITE_URL}/`} />
    </Helmet>
    <div className="absolute inset-0" aria-hidden="true">
      <KskImage fileName="COZ-1-edit.jpg" alt="" className="h-full w-full object-cover opacity-40" sizes="100vw" loading="eager" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(4,25,18,0.98)_0%,rgba(8,54,40,0.92)_48%,rgba(4,25,18,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(208,173,90,0.2),transparent_42%)]" />
    </div>
    <main className="relative flex min-h-full items-center justify-center px-5 py-10 sm:px-8">
      <section className="w-full max-w-3xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-accent/55 bg-white/10 text-xl font-extrabold text-accent shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:h-24 sm:w-24 sm:text-2xl">KSK</div>
        <p className="mx-auto mt-7 inline-flex min-h-10 items-center rounded-full border border-accent/60 bg-accent px-5 py-2 text-sm font-extrabold uppercase tracking-[0.24em] text-primary shadow-[0_14px_38px_rgba(208,173,90,0.22)]">Sold Out</p>
        <h1 className="mt-7 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">Seluruh Unit Telah Terjual</h1>
        <div className="mx-auto mt-6 h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">Terima kasih atas kepercayaan para pemilik dan investor kepada Kinara Signature Kost.</p>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-accent">Kinara Signature Kost · IPB Dramaga</p>
        <a href="https://kinaraland.com/" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full border border-accent/55 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">Lihat Proyek Kinara Land Lainnya</a>
      </section>
    </main>
  </div>
);

const SectionHeading = ({ eyebrow, title, description, light = false }) => (
  <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
    <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? 'text-accent' : 'text-accent'}`}>{eyebrow}</p>
    <h2 className={`mt-3 text-3xl font-bold leading-tight sm:text-4xl ${light ? 'text-white' : 'text-primary'}`}>{title}</h2>
    {description ? <p className={`mt-4 text-sm leading-7 sm:text-base ${light ? 'text-white/70' : 'text-muted-foreground'}`}>{description}</p> : null}
  </div>
);

const KskHeader = ({ onMenuOpenChange }) => {
  const [activeId, setActiveId] = useState('keunggulan');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map(([, href]) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
    }, { rootMargin: '-72px 0px -55% 0px', threshold: [0.1, 0.35, 0.65] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onMenuOpenChange(menuOpen);
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => firstLinkRef.current?.focus(), 0);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        window.setTimeout(() => menuButtonRef.current?.focus(), 0);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, onMenuOpenChange]);

  const goTo = (event, href) => {
    event.preventDefault();
    window.history.pushState({}, '', href);
    document.querySelector(href)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary/95 text-white shadow-[0_12px_34px_rgba(4,25,18,0.2)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#hero" onClick={(event) => goTo(event, '#hero')} className="flex min-w-0 items-center gap-3" aria-label="Kinara Signature Kost">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-white/10 text-xs font-extrabold text-accent">KSK</span>
          <span className="truncate text-sm font-bold sm:text-base">Kinara Signature Kost</span>
        </a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi Kinara Signature Kost desktop">
          {NAV_ITEMS.map(([label, href]) => { const active = activeId === href.slice(1); return <a key={href} href={href} onClick={(event) => goTo(event, href)} aria-current={active ? 'location' : undefined} className={`relative py-5 text-sm font-semibold after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-accent ${active ? 'text-accent after:opacity-100' : 'text-white/75 after:opacity-0 hover:text-accent'}`}>{label}</a>; })}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#konsultasi" onClick={(event) => goTo(event, '#konsultasi')} className="hidden min-h-11 items-center rounded-full bg-accent px-5 text-sm font-bold text-primary hover:bg-white sm:inline-flex">Konsultasi</a>
          <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-controls="ksk-mobile-menu" aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 text-accent lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {menuOpen ? <><button type="button" aria-label="Tutup menu navigasi" onClick={() => setMenuOpen(false)} className="fixed inset-0 top-16 z-40 bg-primary/50 backdrop-blur-[2px] lg:hidden" /><div id="ksk-mobile-menu" className="absolute left-0 right-0 top-full z-50 border-b border-accent/30 bg-primary/98 px-4 py-3 shadow-2xl lg:hidden"><nav className="grid" aria-label="Navigasi Kinara Signature Kost mobile">{NAV_ITEMS.map(([label, href], index) => <a ref={index === 0 ? firstLinkRef : undefined} key={href} href={href} onClick={(event) => goTo(event, href)} className="flex min-h-12 items-center justify-between border-b border-white/10 px-2 text-sm font-semibold text-white">{label}<ChevronRight className="h-4 w-4 text-accent" /></a>)}<a href="#konsultasi" onClick={(event) => goTo(event, '#konsultasi')} className="mt-3 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-4 text-sm font-bold text-primary">Konsultasi Sekarang</a></nav></div></> : null}
    </header>
  );
};

const KskContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${KSK_WHATSAPP_NUMBER}?text=${encodeURIComponent(KSK_MESSAGE)}`;
  const gallery = [
    ['COZ-1-edit.jpg', 'Fasad Kinara Signature Kost'],
    ['COZ-2-edit.jpg', 'Kawasan Kinara Signature Kost'],
    ['COZ-3-edit.jpg', 'Bangunan Kinara Signature Kost'],
    ['COZ-8-edit.jpg', 'Suasana kawasan Kinara Signature Kost'],
    ['interior 1.jpg', 'Interior Kinara Signature Kost'],
    ['interior 2.jpg', 'Fasilitas interior Kinara Signature Kost']
  ];
  const faqs = [
    ['Di mana lokasi Kinara Signature Kost?', 'Kinara Signature Kost berada di kawasan sekitar IPB Dramaga. Hubungi tim Kinara Land untuk alamat dan titik lokasi terbaru.'],
    ['Siapa yang mengelola operasional?', 'Materi proyek sebelumnya menyebutkan pengelolaan oleh Kyra Stay. Rincian skema pengelolaan perlu dikonfirmasi melalui dokumen terbaru.'],
    ['Apa saja tipe unitnya?', 'Materi lama memuat pilihan bangunan dua lantai dan tiga lantai. Spesifikasi, harga, dan ketersediaan terbaru perlu dikonfirmasi kembali.'],
    ['Bagaimana cara memperoleh informasi terbaru?', 'Hubungi Kinara Land melalui tombol konsultasi untuk meminta data proyek yang paling baru.']
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-20 text-foreground md:pb-0">
      <Helmet>
        <title>Kinara Signature Kost | Properti Kost Premium Dekat IPB</title>
        <meta name="description" content="Kenali Kinara Signature Kost, properti kost premium di kawasan IPB Dramaga dengan konsep hunian nyaman dan pengelolaan profesional." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${KSK_SITE_URL}/`} />
        <meta property="og:type" content="website" /><meta property="og:site_name" content="Kinara Signature Kost" /><meta property="og:url" content={`${KSK_SITE_URL}/`} />
        <meta property="og:title" content="Kinara Signature Kost | Properti Kost Premium Dekat IPB" /><meta property="og:description" content="Properti kost premium di kawasan IPB Dramaga dengan konsep hunian nyaman dan pengelolaan profesional." /><meta property="og:image" content={`${KSK_SITE_URL}/images/ksk/COZ-1-edit.jpg`} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="Kinara Signature Kost | Properti Kost Premium Dekat IPB" /><meta name="twitter:description" content="Properti kost premium di kawasan IPB Dramaga." />
      </Helmet>
      <KskHeader onMenuOpenChange={setMenuOpen} />
      <main className="pt-16">
        <section id="hero" className="relative scroll-mt-20 overflow-hidden bg-primary text-white">
          <div className="absolute inset-0"><KskImage fileName="COZ-1-edit.jpg" alt="" className="h-full w-full object-cover opacity-45" loading="eager" /><div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/35" /></div>
          <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div className="max-w-2xl"><p className="inline-flex rounded-full border border-accent/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">Properti Kost Premium Dekat IPB</p><h1 className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl">Investasi untuk Mereka yang Teliti</h1><p className="mt-5 text-base leading-7 text-white/80 sm:text-lg">Kinara Signature Kost menghadirkan hunian kost dengan perhatian pada kenyamanan penghuni, kualitas kawasan, dan pengelolaan operasional.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#konsultasi" className="inline-flex min-h-13 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-bold text-primary hover:bg-white">Dapatkan Informasi Terbaru</a><a href="#galeri" className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/35 px-6 py-3 text-sm font-bold text-white hover:border-accent hover:text-accent">Lihat Galeri</a></div></div>
            <div className="hidden overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl lg:block"><KskImage fileName="COZ-8-edit.jpg" alt="Suasana kawasan Kinara Signature Kost" className="aspect-[4/3] w-full object-cover" sizes="45vw" loading="eager" /></div>
          </div>
        </section>

        <section id="keunggulan" className="scroll-mt-20 py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Keunggulan" title="Hunian Nyaman, Aset yang Dikelola Profesional" description="Informasi berikut disusun dari materi Kinara Signature Kost sebelumnya dan perlu diselaraskan kembali dengan data proyek terbaru sebelum kampanye publik." /><div className="grid gap-4 md:grid-cols-3">{[[MapPin, 'Kawasan IPB Dramaga', 'Berada dekat ekosistem pendidikan dan kebutuhan hunian mahasiswa.'], [Building2, 'Konsep Hunian Premium', 'Fasad, interior, dan lingkungan dirancang untuk menciptakan pengalaman tinggal yang nyaman.'], [Users, 'Pengelolaan Profesional', 'Materi lama mencantumkan Kyra Stay sebagai pengelola operasional hunian.']].map(([Icon, title, text]) => <article key={title} className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"><Icon className="h-7 w-7 text-accent" /><h3 className="mt-4 text-xl font-bold text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div></div></section>

        <section id="galeri" className="scroll-mt-20 bg-secondary/55 py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Galeri Proyek" title="Kenali Suasana Proyek Lebih Dekat" /><div className="grid auto-rows-[190px] gap-4 sm:grid-cols-2 sm:auto-rows-[240px] lg:grid-cols-3">{gallery.map(([fileName, alt], index) => <figure key={fileName} className={`group relative overflow-hidden rounded-2xl border border-primary/10 bg-primary ${index === 0 ? 'sm:row-span-2 sm:auto-rows-auto' : ''}`}><KskImage fileName={fileName} alt={alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/90 to-transparent px-4 pb-4 pt-12 text-sm font-semibold text-white">{alt}</figcaption></figure>)}</div></div></section>

        <section id="fasilitas" className="scroll-mt-20 bg-primary py-14 text-white sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading light eyebrow="Fasilitas" title="Kenyamanan yang Mendukung Pengalaman Tinggal" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['mushola.jpg', 'Mushala'], ['basket.jpg', 'Area Olahraga'], ['tv.jpg', 'TV Kamar'], ['waterheater.jpg', 'Water Heater']].map(([fileName, label]) => <article key={label} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"><KskImage fileName={fileName} alt={`Fasilitas ${label} Kinara Signature Kost`} className="aspect-[4/3] w-full object-cover" /><p className="p-4 text-center text-sm font-bold text-accent">{label}</p></article>)}</div><p className="mt-5 text-center text-xs text-white/60">Daftar fasilitas mengacu pada materi lama dan perlu dikonfirmasi sebelum publikasi final.</p></div></section>

        <section id="unit" className="scroll-mt-20 py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Tipe Unit" title="Pilihan Bangunan dalam Materi KSK Sebelumnya" description="Harga dan ketersediaan tidak ditampilkan karena masih menunggu data terbaru." /><div className="grid gap-5 lg:grid-cols-2">{[['COZ-2-edit.jpg', 'Tipe Dua Lantai', ['Materi lama: 6 kamar', 'Materi lama: luas bangunan 94 m²', 'Kamar mandi dalam dan furnitur']], ['COZ-3-edit.jpg', 'Tipe Tiga Lantai', ['Materi lama: 10 kamar', 'Materi lama: luas bangunan 140 m²', 'Ruang santai dan furnitur']]].map(([fileName, title, features]) => <article key={title} className="overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-sm"><KskImage fileName={fileName} alt={`${title} Kinara Signature Kost`} className="aspect-[16/10] w-full object-cover" /><div className="p-6"><h3 className="text-2xl font-bold text-primary">{title}</h3><ul className="mt-4 grid gap-2">{features.map((feature) => <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{feature}</li>)}</ul></div></article>)}</div><div className="mt-8 grid gap-5 lg:grid-cols-2"><figure className="rounded-2xl border border-primary/10 bg-white p-4"><KskImage fileName="denah2lt.jpg" alt="Denah unit dua lantai Kinara Signature Kost" className="w-full rounded-xl object-contain" /><figcaption className="mt-3 text-center text-sm font-bold text-primary">Denah Dua Lantai</figcaption></figure><figure className="rounded-2xl border border-primary/10 bg-white p-4"><KskImage fileName="denah3lt.jpg" alt="Denah unit tiga lantai Kinara Signature Kost" className="w-full rounded-xl object-contain" /><figcaption className="mt-3 text-center text-sm font-bold text-primary">Denah Tiga Lantai</figcaption></figure></div></div></section>

        <section id="lokasi" className="scroll-mt-20 bg-secondary/55 py-14 sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div className="overflow-hidden rounded-3xl border border-primary/10"><KskImage fileName="pintu-ipb.jpg" alt="Kawasan IPB dekat Kinara Signature Kost" className="aspect-[16/10] w-full object-cover" /></div><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Lokasi</p><h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">Dekat Ekosistem IPB Dramaga</h2><p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">Akses menuju kampus dan fasilitas harian menjadi bagian penting dalam materi Kinara Signature Kost sebelumnya. Alamat dan jarak terbaru perlu dikonfirmasi sebelum dipublikasikan.</p><div className="mt-6 flex items-center gap-3 rounded-2xl border border-primary/10 bg-white p-4"><MapPin className="h-6 w-6 shrink-0 text-accent" /><p className="text-sm font-semibold text-primary">Titik Google Maps menunggu konfirmasi data proyek terbaru.</p></div></div></div></section>

        <section id="faq" className="scroll-mt-20 py-14 sm:py-20"><div className="mx-auto max-w-3xl px-4 sm:px-6"><SectionHeading eyebrow="FAQ" title="Pertanyaan yang Sering Ditanyakan" />{faqs.map(([question, answer]) => <details key={question} className="group border-b border-primary/15 py-4"><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-primary"><span>{question}</span><ChevronDown className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180" /></summary><p className="pb-2 pr-8 text-sm leading-6 text-muted-foreground">{answer}</p></details>)}</div></section>

        <section id="konsultasi" className="scroll-mt-20 bg-primary py-16 text-center text-white sm:py-20"><div className="mx-auto max-w-3xl px-4 sm:px-6"><ShieldCheck className="mx-auto h-10 w-10 text-accent" /><h2 className="mt-5 text-3xl font-bold sm:text-4xl">Dapatkan Informasi KSK Terbaru</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">Tanyakan harga, spesifikasi, legalitas, ketersediaan unit, dan jadwal survei langsung kepada tim Kinara Land.</p><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-primary hover:bg-white"><MessageCircle className="h-5 w-5" />Hubungi Kinara Land</a><p className="mt-3 text-xs text-white/55">Menggunakan nomor WhatsApp utama Kinara Land yang tersedia di website perusahaan.</p></div></section>
      </main>
      <footer className="border-t border-white/10 bg-primary px-4 py-8 text-center text-sm text-white/60"><p className="font-bold text-white">Kinara Signature Kost</p><p className="mt-2">© {new Date().getFullYear()} PT Kinara Land Indonesia. Seluruh informasi perlu dikonfirmasi melalui dokumen terbaru.</p></footer>
      {!menuOpen ? <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Konsultasi Kinara Signature Kost melalui WhatsApp" className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-primary text-accent shadow-xl md:right-6"><MessageCircle className="h-7 w-7" /></a> : null}
    </div>
  );
};

const KskPage = () => (KSK_SOLD_OUT ? <KskSoldOutPage /> : <KskContent />);

export default KskPage;
