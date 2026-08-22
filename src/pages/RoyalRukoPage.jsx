import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  Menu,
  MessageCircle,
  Navigation,
  ShieldCheck,
  Store,
  X
} from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';

const ROYAL_SALES_PHONE_NUMBERS = {
  nur: '088293516558',
  melin: '081928719457',
  ge: '081958798799',
  andika: '085196480931'
};
const DEFAULT_ROYAL_SALES_KEY = 'nur';
const ROYAL_ANCHORS = [
  ['Keunggulan', '#keunggulan'],
  ['Lokasi', '#lokasi'],
  ['Potensi Pasar', '#potensi-pasar'],
  ['Desain', '#desain'],
  ['Investasi', '#investasi'],
  ['Galeri', '#galeri']
];

const MAROON = '#220306';

function getRoyalSalesKey() {
  const envSalesKey = import.meta.env.VITE_CS_KEY?.toLowerCase();
  const pathSalesKey = typeof window === 'undefined'
    ? ''
    : window.location.pathname.split('/').filter(Boolean)[0]?.toLowerCase();

  if (ROYAL_SALES_PHONE_NUMBERS[envSalesKey]) return envSalesKey;
  if (ROYAL_SALES_PHONE_NUMBERS[pathSalesKey]) return pathSalesKey;
  return DEFAULT_ROYAL_SALES_KEY;
}

function normalizeWhatsAppPhone(phoneNumber) {
  const digits = phoneNumber.replace(/\D/g, '');
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits;
}

const VISUAL_PLACEHOLDER = ({ label, className = '' }) => (
  <div className={`flex min-h-56 items-center justify-center border border-dashed border-[#D4AF56]/70 bg-[linear-gradient(135deg,#2B0508,#65131C)] p-8 text-center shadow-[inset_0_0_80px_rgba(212,175,86,0.08)] ${className}`}>
    <div>
      <Building2 className="mx-auto mb-4 h-10 w-10 text-[#E8CF8A]" aria-hidden="true" />
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#E8CF8A]">{label}</p>
      <p className="mt-2 text-xs text-[#D8C7AA]">Aset visual Royal Ruko CNN belum dikonfirmasi</p>
    </div>
  </div>
);

const RoyalImage = ({ fileName, alt, className = '', sizes = '100vw', loading = 'lazy', decoding = 'async', fetchPriority, ...props }) => (
  <ResponsiveImage src={imageUrl(`royalcnn/${fileName}`)} alt={alt} className={className} sizes={sizes} loading={loading} decoding={decoding} fetchPriority={fetchPriority} {...props} />
);

const SectionHeading = ({ eyebrow, title, description, light = false }) => (
  <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
    <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-[#E8CF8A]' : 'text-[#65131C]'}`}>{eyebrow}</p>
    <h2 className={`mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl ${light ? 'text-[#F8F3EA]' : 'text-[#220306]'}`}>{title}</h2>
    {description ? <p className={`mt-4 text-sm leading-7 sm:text-base ${light ? 'text-[#D8C7AA]' : 'text-[#5c4848]'}`}>{description}</p> : null}
  </div>
);

function scrollToLead() {
  document.getElementById('konsultasi')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const CTA = ({ children, label }) => (
  <a
    href="#konsultasi"
    data-ctwa-label={label}
    onClick={(event) => { event.preventDefault(); scrollToLead(); }}
    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF56] bg-[#D4AF56] px-5 py-3 text-center text-sm font-bold text-[#220306] shadow-[0_16px_34px_rgba(212,175,86,0.22)] transition-colors hover:bg-[#E8CF8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CF8A] sm:min-h-14 sm:px-7 sm:text-base"
  >
    {children}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
  </a>
);

const RoyalAnchorNavigation = ({ onMenuOpenChange }) => {
  const [activeId, setActiveId] = useState('keunggulan');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const sections = ROYAL_ANCHORS.map(([, href]) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
    }, { rootMargin: '-76px 0px -55% 0px', threshold: [0.1, 0.35, 0.65] });
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
    document.querySelector(href)?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    closeMenu();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#D4AF56]/25 bg-[#220306]/95 text-[#F8F3EA] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#hero" onClick={(event) => goTo(event, '#hero')} className="flex min-w-0 items-center gap-3" aria-label="Royal Ruko CNN"><RoyalImage fileName="logo.jpg" alt="Logo Royal Ruko CNN" className="h-10 w-14 rounded object-cover" loading="eager" /><span className="truncate font-serif text-base font-semibold sm:text-lg">Royal Ruko CNN</span></a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi Royal Ruko CNN desktop">{ROYAL_ANCHORS.map(([label, href]) => { const id = href.slice(1); const active = activeId === id; return <a key={href} href={href} onClick={(event) => goTo(event, href)} aria-current={active ? 'location' : undefined} className={`relative py-5 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-[#E8CF8A] after:transition-opacity ${active ? 'text-[#E8CF8A] after:opacity-100' : 'text-[#D8C7AA] after:opacity-0 hover:text-[#E8CF8A]'}`}>{label}</a>; })}</nav>
        <div className="flex items-center gap-2"><span className="hidden sm:inline-flex"><CTA label="Royal CNN - Navbar Konsultasi">Konsultasi Sekarang</CTA></span><button ref={menuButtonRef} type="button" onClick={() => setIsMobileOpen((current) => !current)} aria-expanded={isMobileOpen} aria-controls="royal-mobile-menu" aria-label={isMobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF56]/60 text-[#E8CF8A] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CF8A]">{isMobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}</button></div>
      </div>
      {isMobileOpen ? <><button type="button" aria-label="Tutup menu navigasi" className="fixed inset-0 top-16 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden" onClick={closeMenu} /><div id="royal-mobile-menu" className="absolute left-0 right-0 top-full z-50 border-b border-[#D4AF56]/35 bg-[#220306]/95 px-4 py-3 shadow-[0_20px_45px_rgba(34,3,6,0.35)] backdrop-blur-md lg:hidden"><nav aria-label="Navigasi Royal Ruko CNN mobile" className="grid">{ROYAL_ANCHORS.map(([label, href], index) => <a ref={index === 0 ? firstLinkRef : undefined} key={href} href={href} onClick={(event) => goTo(event, href)} className="flex min-h-12 items-center justify-between border-b border-[#D4AF56]/20 px-2 text-sm font-semibold text-[#F8F3EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CF8A]">{label}<ChevronRight className="h-4 w-4 text-[#E8CF8A]" aria-hidden="true" /></a>)}<a href="#konsultasi" onClick={(event) => goTo(event, '#konsultasi')} className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D4AF56] px-4 py-3 text-sm font-bold text-[#220306] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CF8A]">Konsultasi Sekarang</a></nav></div></> : null}
    </header>
  );
};

const RoyalLeadForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', domicile: '' });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isComplete = Object.values(form).every((value) => value.trim());
  const salesKey = getRoyalSalesKey();
  const whatsappNumber = normalizeWhatsAppPhone(ROYAL_SALES_PHONE_NUMBERS[salesKey]);

  useEffect(() => {
    const handleRequest = () => scrollToLead();
    window.addEventListener('rivere:consultation-request', handleRequest);
    return () => window.removeEventListener('rivere:consultation-request', handleRequest);
  }, []);

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setError('');
    setSubmitted(false);
  };

  const submit = (event) => {
    event.preventDefault();
    if (!isComplete) {
      setError('Lengkapi seluruh data sebelum melanjutkan.');
      return;
    }
    const message = [
      'Halo, saya tertarik dengan Royal Ruko CNN.',
      `Nama: ${form.name.trim()}`,
      `Nomor Telepon: ${form.phone.trim()}`,
      `Domisili: ${form.domicile.trim()}`,
      'Mohon informasi mengenai harga, spesifikasi, ketersediaan unit, dan skema pembayaran.',
      `(Ref:ROYAL-CNN-LP-CTWA-${salesKey.toUpperCase()})`
    ].join('\n');
    const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const eventId = `royal-ctwa-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const eventParameters = {
      content_name: 'Royal Ruko CNN WhatsApp Consultation',
      content_category: 'WhatsApp Lead',
      lead_source_code: 'ROYAL-CNN-LP-CTWA',
      lead_source_page: `${window.location.hostname}${window.location.pathname}${window.location.search}`,
      sales_key: salesKey,
      cta_label: 'Royal CNN - Form Lead',
      form_completed: true
    };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'ctwa_lead_submit', event_id: eventId, meta_event_name: 'Lead', ...eventParameters });
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', eventParameters, { eventID: eventId });
      window.fbq('trackCustom', 'WhatsAppConsultation', eventParameters, { eventID: eventId });
    }
    window.open(href, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-2xl rounded-3xl border border-[#D4AF56]/35 bg-[#F8F3EA] p-5 text-[#220306] shadow-[0_24px_70px_rgba(0,0,0,0.25)] sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-bold">Nama</span><input required value={form.name} onChange={update('name')} autoComplete="name" className="h-12 w-full rounded-xl border border-[#220306]/15 bg-white px-4 outline-none focus:border-[#D4AF56] focus:ring-2 focus:ring-[#D4AF56]/30" placeholder="Nama lengkap" /></label>
        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-bold">Nomor Telepon</span><input required type="tel" inputMode="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" className="h-12 w-full rounded-xl border border-[#220306]/15 bg-white px-4 outline-none focus:border-[#D4AF56] focus:ring-2 focus:ring-[#D4AF56]/30" placeholder="Contoh: 0812xxxxxxx" /></label>
        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-bold">Domisili</span><input required value={form.domicile} onChange={update('domicile')} autoComplete="address-level2" className="h-12 w-full rounded-xl border border-[#220306]/15 bg-white px-4 outline-none focus:border-[#D4AF56] focus:ring-2 focus:ring-[#D4AF56]/30" placeholder="Kota domisili" /></label>
      </div>
      <button type="submit" disabled={!isComplete} className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#220306] px-5 py-3 text-base font-bold text-[#E8CF8A] transition-colors hover:bg-[#65131C] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF56]"><MessageCircle className="h-5 w-5" aria-hidden="true" />Hubungi Konsultan Properti Hari Ini</button>
      <p className="mt-3 text-center text-xs text-[#5c4848]">Data Anda hanya digunakan untuk keperluan konsultasi Royal Ruko CNN.</p>
      {error ? <p role="alert" className="mt-3 text-center text-sm font-semibold text-[#8b1e2d]">{error}</p> : null}
      {submitted ? <p className="mt-3 text-center text-sm font-semibold text-[#2e6b45]">WhatsApp dibuka di tab baru.</p> : null}
    </form>
  );
};

const RoyalRukoContent = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const marketMix = useMemo(() => [['15%', 'Komuter dan pelintas harian'], ['35%', 'Masyarakat dan traffic akhir pekan'], ['20%', 'Penghuni empat kluster perumahan'], ['30%', 'Sivitas akademika IPB']], []);
  const faq = [
    ['Di mana lokasi Royal Ruko CNN?', 'Royal Ruko CNN berlokasi di Jl. Babengket No.6, Cihideung Udik, Kec. Ciampea, Kabupaten Bogor, Jawa Barat 16620.'],
    ['Berapa harga unit yang tersedia?', 'Hubungi konsultan untuk informasi terbaru.'],
    ['Apa saja spesifikasi bangunannya?', 'Hubungi konsultan untuk informasi terbaru.'],
    ['Apakah tersedia area parkir?', 'Hubungi konsultan untuk informasi terbaru.'],
    ['Jenis usaha apa yang cocok?', 'Hubungi konsultan untuk informasi terbaru.'],
    ['Bagaimana skema pembayarannya?', 'Hubungi konsultan untuk informasi terbaru.'],
    ['Kapan unit diserahterimakan?', 'Hubungi konsultan untuk informasi terbaru.']
  ];

  return (
    <div className="royal-content min-h-screen overflow-x-hidden bg-[#F8F3EA] pb-20 text-[#220306] md:pb-0" style={{ '--royal-maroon': MAROON }}>
      <RoyalAnchorNavigation onMenuOpenChange={setMobileMenuOpen} />
      <main className="pt-16">
        <section id="hero" className="scroll-mt-20 bg-[#220306] text-[#F8F3EA]"><div className="mx-auto grid max-w-7xl items-center gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-8 lg:py-16"><div className="order-2 lg:order-1"><p className="inline-flex rounded-full border border-[#D4AF56]/50 bg-[#4A0B12] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#E8CF8A]">Eksklusif Commercial Hub</p><h1 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">Investasi Ruko Produktif dengan Desain Luxury Classic Minimalist</h1><p className="mt-5 max-w-2xl text-base leading-7 text-[#D8C7AA] sm:text-lg">Berada di koridor strategis Babengket, Ciampea—dekat kawasan hunian dan akses menuju IPB University, menghadirkan visibilitas ideal untuk mengembangkan bisnis dan aset komersial.</p><ul className="mt-6 grid gap-3 text-sm font-semibold sm:grid-cols-3">{['0 km dari Jalan Cinangneng-Babengket', 'Sekitar 3 km menuju IPB University', 'Unit terbatas'].map((item) => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#E8CF8A]" />{item}</li>)}</ul><div className="mt-7 flex flex-col gap-3 sm:flex-row"><CTA label="Royal CNN - Hero Konsultasi">Konsultasi via WhatsApp</CTA><a href="#keunggulan" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8C7AA]/50 px-5 py-3 text-sm font-bold text-[#F8F3EA] hover:border-[#E8CF8A] hover:text-[#E8CF8A]">Lihat Keunggulan</a></div></div><div className="relative order-1 overflow-hidden rounded-3xl border border-[#D4AF56]/40 lg:order-2"><RoyalImage fileName="2.png" alt="Render fasad utama Royal Ruko CNN" className="h-full min-h-[340px] w-full object-cover sm:min-h-[440px]" sizes="(min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)" loading="eager" decoding="sync" fetchPriority="high" /><div className="absolute inset-0 bg-gradient-to-t from-[#220306]/45 via-transparent to-[#4A0B12]/15" aria-hidden="true" /></div></div></section>

        <section id="keunggulan" className="scroll-mt-20 bg-[#F8F3EA] py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Keunggulan" title="Aset Komersial di Fase Awal Pertumbuhan Kawasan" description="Royal Ruko CNN bukan sekadar tempat membuka usaha. Proyek ini diposisikan sebagai aset komersial di kawasan Babengket yang sedang bertumbuh, dengan suplai ruko yang masih terbatas dan basis pasar dari penghuni kawasan, komuter, serta sivitas akademika IPB." /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Kompetitor terbatas', 'Kompetitor di area sekitar masih terbatas.'], ['Populasi bertambah', 'Populasi penghuni kawasan terus bertambah.'], ['Potensi aset', 'Potensi capital gain dan pendapatan sewa.'], ['Peluang awal', 'Peluang menjadi bagian awal pusat bisnis Babengket.']].map(([title, text]) => <article key={title} className="rounded-2xl border border-[#D4AF56]/35 bg-white p-5 shadow-[0_12px_35px_rgba(34,3,6,0.07)]"><Store className="h-7 w-7 text-[#65131C]" /><h3 className="mt-4 font-serif text-xl font-semibold text-[#220306]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#5c4848]">{text}</p></article>)}</div></div></section>

        <section id="lokasi" className="scroll-mt-20 bg-[#4A0B12] py-14 text-[#F8F3EA] sm:py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div className="overflow-hidden rounded-2xl border border-[#D4AF56]/35"><RoyalImage fileName="location.jpg" alt="Visual lokasi Royal Ruko CNN di jalur Cinangneng-Babengket" className="aspect-[16/10] w-full object-cover" /></div><div><SectionHeading light eyebrow="Lokasi Strategis" title="Posisi Strategis di Radius Emas Penghubung Kawasan" /><ul className="grid gap-4">{[['0 km Jalan Cinangneng-Babengket', 'Berada langsung di tepi jalur alternatif utama untuk visibilitas maksimal.'], ['Sekitar 3 km ke IPB University', 'Dekat dengan salah satu pusat aktivitas pendidikan terbesar di Bogor.'], ['Terhubung dengan kawasan wisata', 'Memperoleh potensi traffic dari jalur alternatif menuju destinasi lokal.']].map(([title, text]) => <li key={title} className="flex gap-3"><Navigation className="mt-1 h-5 w-5 shrink-0 text-[#E8CF8A]" /><span><strong className="block text-[#E8CF8A]">{title}</strong><span className="text-sm leading-6 text-[#D8C7AA]">{text}</span></span></li>)}</ul></div></div></section>

        <section id="potensi-pasar" className="scroll-mt-20 bg-[#F8F3EA] py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Potensi Pasar" title="Ekosistem Pasar untuk Aktivitas Bisnis Sepanjang Minggu" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{marketMix.map(([value, label]) => <article key={label} className="rounded-2xl border border-[#D4AF56]/35 bg-white p-6 text-center"><p className="font-serif text-4xl font-semibold text-[#65131C]">{value}</p><p className="mt-2 text-sm font-semibold text-[#220306]">{label}</p></article>)}</div></div></section>

        <section className="bg-[#220306] py-14 text-[#F8F3EA] sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading light eyebrow="Peluang Akhir Pekan" title="Pola Konsumsi Akhir Pekan Membuka Peluang Usaha" description="Mayoritas penghuni kawasan disebut bekerja di Jakarta, Bekasi, dan Cibubur. Saat kembali ke kawasan pada akhir pekan, aktivitas belanja keluarga dan kebutuhan gaya hidup berpotensi meningkat." /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{['Kuliner dan coffee shop', 'Retail keluarga', 'Klinik dan layanan kesehatan', 'Salon dan kecantikan', 'Co-working space', 'Layanan jasa harian'].map((item) => <div key={item} className="flex items-center gap-3 border-b border-[#D4AF56]/25 py-3 text-sm text-[#D8C7AA]"><Check className="h-4 w-4 text-[#E8CF8A]" />{item}</div>)}</div></div></section>

        <section className="bg-[#F8F3EA] py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Demand & Supply" title="Kesenjangan Suplai Membuka Ruang bagi Bisnis Baru" /><div className="grid gap-5 lg:grid-cols-2"><article className="rounded-2xl border border-[#D4AF56]/40 bg-white p-6"><h3 className="font-serif text-2xl font-semibold text-[#65131C]">Demand</h3><p className="mt-3 text-sm leading-7 text-[#5c4848]">Ribuan aktivitas harian, 30.000+ mahasiswa, dan 3.000+ keluarga membutuhkan fasilitas belanja, kesehatan, kuliner, dan gaya hidup.</p></article><article className="rounded-2xl border border-[#D4AF56]/40 bg-white p-6"><h3 className="font-serif text-2xl font-semibold text-[#65131C]">Supply</h3><p className="mt-3 text-sm leading-7 text-[#5c4848]">Menurut materi proyek, saat ini baru terdapat satu kluster ruko besar dan satu kluster ruko kecil di area sekitar.</p></article></div><p className="mx-auto mt-7 max-w-3xl text-center font-serif text-xl font-semibold text-[#220306]">Royal Ruko CNN hadir untuk mengisi kebutuhan ruang usaha representatif di kawasan yang sedang bertumbuh.</p></div></section>

        <section className="bg-[#4A0B12] py-14 text-[#F8F3EA] sm:py-16"><div className="mx-auto max-w-5xl px-4 text-center sm:px-6"><SectionHeading light eyebrow="Rekam Jejak Kawasan/Pengembang" title="Pertumbuhan yang Didukung Rekam Jejak Penjualan" /><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-[#D4AF56]/35 bg-[#220306]/45 p-7"><p className="font-serif text-5xl font-semibold text-[#E8CF8A]">84</p><p className="mt-2 text-sm text-[#D8C7AA]">unit komersial telah terjual habis pada proyek sebelumnya</p></div><div className="rounded-2xl border border-[#D4AF56]/35 bg-[#220306]/45 p-7"><p className="font-serif text-5xl font-semibold text-[#E8CF8A]">400+</p><p className="mt-2 text-sm text-[#D8C7AA]">unit rumah telah terjual pada proyek lain dalam grup pengembang yang sama</p></div></div></div></section>

        <section id="desain" className="scroll-mt-20 bg-[#F8F3EA] py-14 sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="Showcase Arsitektur" title="Arsitektur Mewah, Tengara Baru Babengket" description="Fasad Luxury Classic Minimalist dirancang agar mudah dikenali, terlihat representatif, dan fleksibel untuk berbagai jenis usaha - mulai dari F&B, butik, salon, klinik, hingga kantor layanan." /><div id="galeri" className="grid gap-5 lg:gap-8">{[['1.png', 'Render unit ruko Royal Ruko CNN', 'portrait'], ['2.png', 'Render fasad utama Royal Ruko CNN', 'landscape']].map(([fileName, alt, orientation], index) => <button type="button" key={fileName} onClick={() => setActiveGallery({ fileName, alt })} className={`group relative overflow-hidden rounded-3xl border border-[#D4AF56]/45 bg-[#220306] text-left shadow-[0_18px_45px_rgba(34,3,6,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF56] ${orientation === 'portrait' ? 'mx-auto w-full lg:max-w-3xl' : 'w-full'}`}><div className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#E8CF8A]/70 bg-[#220306]/75 font-serif text-lg text-[#E8CF8A]">0{index + 1}</div><div className="m-3 overflow-hidden rounded-2xl"><RoyalImage fileName={fileName} alt={alt} className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] ${orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[16/9]'}`} /></div><span className="flex items-center justify-between gap-3 border-t border-[#D4AF56]/35 bg-[#220306] px-5 py-4 text-sm font-semibold text-[#F8F3EA]"><span>{alt}</span><span className="text-xs font-normal uppercase tracking-[0.14em] text-[#E8CF8A]">Lihat detail</span></span></button>)}</div></div></section>

        <section className="bg-[#220306] py-14 text-[#F8F3EA] sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading light eyebrow="Keunggulan Desain" title="Desain Tak Lekang Waktu yang Mendukung Nilai Komersial" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[['Estetika Premium', 'Fasad elegan menciptakan kesan high-value sejak pandangan pertama.'], ['Fleksibilitas Operasional', 'Tata ruang cocok untuk beragam jenis usaha.'], ['Daya Tarik Penyewa', 'Tampilan representatif untuk penyewa korporasi atau waralaba.'], ['Potensi Resale Value', 'Desain yang kuat dapat mendukung daya tarik jual kembali, tanpa menjanjikan kenaikan tertentu.']].map(([title, text]) => <article key={title} className="border-t border-[#D4AF56]/45 pt-5"><ShieldCheck className="h-6 w-6 text-[#E8CF8A]" /><h3 className="mt-3 font-serif text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#D8C7AA]">{text}</p></article>)}</div></div></section>

        <section className="bg-[#F8F3EA] py-14 sm:py-16"><div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8"><div className="overflow-hidden rounded-2xl border border-[#D4AF56]/35"><RoyalImage fileName="siteplan.png" alt="Site plan Royal Ruko CNN menghadap Jalan Cinangneng-Babengket" className="aspect-[16/10] w-full object-cover" /></div><div><SectionHeading eyebrow="Site Plan & Tata Letak" title="Tata Letak Eksklusif untuk Visibilitas dan Kenyamanan" /><ul className="grid gap-4">{[['Visibilitas langsung', 'Deret unit menghadap jalan utama tanpa halangan visual.'], ['Area parkir proporsional', 'Dirancang untuk mendukung kenyamanan pengunjung.'], ['Unit terbatas', 'Menjaga eksklusivitas dan mengurangi potensi kanibalisasi antar usaha.']].map(([title, text]) => <li key={title} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-[#65131C]" /><span><strong className="block">{title}</strong><span className="text-sm leading-6 text-[#5c4848]">{text}</span></span></li>)}</ul></div></div></section>

        <section id="investasi" className="scroll-mt-20 bg-[#4A0B12] py-14 text-[#F8F3EA] sm:py-16"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading light eyebrow="Pilar Investasi" title="Tiga Pilar Potensi Aset Produktif" /><div className="grid gap-4 md:grid-cols-3">{[['Capital Gain', 'Potensi kenaikan nilai properti seiring perkembangan infrastruktur kawasan Ciampea dan sekitarnya.'], ['Rental Yield', 'Peluang pendapatan sewa dari kebutuhan ruang usaha premium.'], ['Stable Cash Flow', 'Potensi pendapatan pasif dari penyewa usaha, korporasi, atau waralaba.']].map(([title, text]) => <article key={title} className="rounded-2xl border border-[#D4AF56]/40 bg-[#220306]/35 p-6"><p className="font-serif text-2xl font-semibold text-[#E8CF8A]">{title}</p><p className="mt-3 text-sm leading-6 text-[#D8C7AA]">{text}</p></article>)}</div></div></section>

        <section id="konsultasi" className="scroll-mt-20 bg-[#220306] py-14 text-[#F8F3EA] sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeading light eyebrow="Konsultasi Properti" title="Ambil Posisi Lebih Awal di Pusat Pertumbuhan Babengket" description="Royal Ruko CNN mempertemukan lokasi strategis, kebutuhan pasar yang berkembang, dan arsitektur premium. Dapatkan informasi harga, ketersediaan unit, spesifikasi, dan skema pembayaran langsung dari konsultan properti." /><RoyalLeadForm /></div></section>

        <section id="faq" className="scroll-mt-20 bg-[#F8F3EA] py-14 sm:py-16"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"><SectionHeading eyebrow="FAQ" title="Pertanyaan yang Sering Ditanyakan" />{faq.map(([question, answer]) => <details key={question} className="group border-b border-[#D4AF56]/35 py-4"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#220306] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF56]"><span>{question}</span><ChevronDown className="h-5 w-5 shrink-0 text-[#65131C] transition-transform group-open:rotate-180" /></summary><p className="mt-3 pr-8 text-sm leading-6 text-[#5c4848]">{answer}</p></details>)}</div></section>
      </main>

      <footer className="border-t border-[#D4AF56]/25 bg-[#220306] py-10 text-[#D8C7AA]"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><p className="font-serif text-2xl font-semibold text-[#F8F3EA]">Royal Ruko CNN</p><p className="mt-2 max-w-md text-sm">Commercial hub premium di Babengket, Ciampea, Kabupaten Bogor.</p><p className="mt-2 max-w-2xl text-xs leading-5 text-[#D8C7AA]/75">Jl. Babengket No.6, Cihideung Udik, Kec. Ciampea, Kabupaten Bogor, Jawa Barat 16620</p><p className="mt-1 text-xs font-semibold text-[#E8CF8A]">PT KINARA LAND INDONESIA</p></div><div className="text-left text-xs lg:text-right"><p>Informasi investasi bersifat potensi dan perlu diverifikasi.</p><p className="mt-2">© {new Date().getFullYear()} Royal Ruko CNN. Semua hak dilindungi.</p></div></div></footer>
      {activeGallery ? <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#220306]/95 p-4" role="dialog" aria-modal="true" aria-label={activeGallery.alt} onClick={() => setActiveGallery(null)}><button type="button" onClick={() => setActiveGallery(null)} className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF56] text-[#E8CF8A]" aria-label="Tutup galeri"><span className="text-2xl">×</span></button><div className="max-h-[90vh] max-w-6xl" onClick={(event) => event.stopPropagation()}><RoyalImage fileName={activeGallery.fileName} alt={activeGallery.alt} className="max-h-[82vh] w-auto rounded-xl object-contain" loading="eager" /><p className="mt-3 text-center text-sm text-[#D8C7AA]">{activeGallery.alt}</p></div></div> : null}
      {!mobileMenuOpen ? <a href="#konsultasi" onClick={(event) => { event.preventDefault(); scrollToLead(); }} className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF56] bg-[#220306] text-[#E8CF8A] shadow-[0_18px_42px_rgba(34,3,6,0.35)] sm:right-6" aria-label="Buka form konsultasi Royal Ruko CNN"><MessageCircle className="h-7 w-7" /></a> : null}
      {!mobileMenuOpen ? <a href="#konsultasi" onClick={(event) => { event.preventDefault(); scrollToLead(); }} className="fixed bottom-4 left-4 right-20 z-[60] inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#D4AF56] bg-[#D4AF56] px-4 py-3 text-sm font-bold text-[#220306] shadow-xl md:hidden"><MessageCircle className="h-5 w-5" />Konsultasi Sekarang</a> : null}
    </div>
  );
};

const RoyalRukoPage = () => <RoyalRukoContent />;

export default RoyalRukoPage;
