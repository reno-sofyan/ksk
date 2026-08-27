import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Menu,
  MessageCircle,
  Store,
  X
} from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';

const ROYAL_SALES_PHONE_NUMBERS = {
  cs1: '082111124005',
  cs2: '082246526316',
  cs3: '081412184272',
  cs4: '085860233469',
  ade: '082111124005',
  nur: '088293516558',
  melin: '081928719457',
  ge: '081958798799',
  andika: '085196480931',
  novan: '087797000003'
};
const DEFAULT_ROYAL_SALES_KEY = 'cs1';
const ROYAL_ANCHORS = [
  ['Karier & Aset', '#karier-aset'],
  ['Mengapa Royal Kinara', '#keunggulan'],
  ['Royal Kinara', '#royal-kinara'],
  ['Untuk Siapa', '#untuk-siapa'],
  ['Lihat Lokasi', '#konsultasi']
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

const RoyalImage = ({ fileName, alt, className = '', sizes = '100vw', loading = 'lazy', decoding = 'async', fetchPriority, ...props }) => (
  <ResponsiveImage src={imageUrl(`royalkinara/${fileName}`)} alt={alt} className={className} sizes={sizes} loading={loading} decoding={decoding} fetchPriority={fetchPriority} {...props} />
);

const SectionHeading = ({ eyebrow, title, description, light = false }) => (
  <div className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
    {eyebrow ? <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-[#E8CF8A]' : 'text-[#65131C]'}`}>{eyebrow}</p> : null}
    <h2 className={`${eyebrow ? 'mt-3' : ''} font-serif text-3xl font-semibold leading-tight sm:text-4xl ${light ? 'text-[#F8F3EA]' : 'text-[#220306]'}`}>{title}</h2>
    {description ? <div className={`mt-4 text-sm leading-7 sm:text-base ${light ? 'text-[#D8C7AA]' : 'text-[#5c4848]'}`}>{description}</div> : null}
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
        <a href="#hero" onClick={(event) => goTo(event, '#hero')} className="flex min-w-0 items-center gap-3" aria-label="Royal Kinara"><RoyalImage fileName="logo-kinara.png" alt="Logo Royal Kinara" className="h-10 w-16 rounded object-cover" loading="eager" /><span className="truncate font-serif text-base font-semibold sm:text-lg">Royal Kinara</span></a>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi Royal Kinara desktop">{ROYAL_ANCHORS.map(([label, href]) => { const id = href.slice(1); const active = activeId === id; return <a key={href} href={href} onClick={(event) => goTo(event, href)} aria-current={active ? 'location' : undefined} className={`relative py-5 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-[#E8CF8A] after:transition-opacity ${active ? 'text-[#E8CF8A] after:opacity-100' : 'text-[#D8C7AA] after:opacity-0 hover:text-[#E8CF8A]'}`}>{label}</a>; })}</nav>
        <div className="flex items-center gap-2"><span className="hidden sm:inline-flex"><CTA label="Royal Kinara - Navbar Hubungi Kami">Hubungi Kami</CTA></span><button ref={menuButtonRef} type="button" onClick={() => setIsMobileOpen((current) => !current)} aria-expanded={isMobileOpen} aria-controls="royal-mobile-menu" aria-label={isMobileOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF56]/60 text-[#E8CF8A] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CF8A]">{isMobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}</button></div>
      </div>
      {isMobileOpen ? <><button type="button" aria-label="Tutup menu navigasi" className="fixed inset-0 top-16 z-40 bg-black/45 backdrop-blur-[2px] lg:hidden" onClick={closeMenu} /><div id="royal-mobile-menu" className="absolute left-0 right-0 top-full z-50 border-b border-[#D4AF56]/35 bg-[#220306]/95 px-4 py-3 shadow-[0_20px_45px_rgba(34,3,6,0.35)] backdrop-blur-md lg:hidden"><nav aria-label="Navigasi Royal Kinara mobile" className="grid">{ROYAL_ANCHORS.map(([label, href], index) => <a ref={index === 0 ? firstLinkRef : undefined} key={href} href={href} onClick={(event) => goTo(event, href)} className="flex min-h-12 items-center justify-between border-b border-[#D4AF56]/20 px-2 text-sm font-semibold text-[#F8F3EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CF8A]">{label}<ChevronRight className="h-4 w-4 text-[#E8CF8A]" aria-hidden="true" /></a>)}<a href="#konsultasi" onClick={(event) => goTo(event, '#konsultasi')} className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D4AF56] px-4 py-3 text-sm font-bold text-[#220306] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8CF8A]">Hubungi Kami</a></nav></div></> : null}
    </header>
  );
};

const RoyalLeadForm = () => {
  const [form, setForm] = useState({ name: '', phone: '' });
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
      '(LP) Halo, saya tertarik dengan Royal Kinara.',
      `Nama: ${form.name.trim()}`,
      `Nomor WhatsApp: ${form.phone.trim()}`,
      'Mohon Informasi mengenai harga, spesifikasi, ketersediaan unit, dan skema pembayaran.'
    ].join('\n');
    const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    const eventId = `royal-ctwa-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const eventParameters = {
      content_name: 'Royal Kinara WhatsApp Consultation',
      content_category: 'WhatsApp Lead',
      lead_source_code: 'ROYAL-KINARA-LP-CTWA',
      lead_source_page: `${window.location.hostname}${window.location.pathname}${window.location.search}`,
      sales_key: salesKey,
      cta_label: 'Royal Kinara - Form Lead',
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
        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-bold">Nama Lengkap</span><input required value={form.name} onChange={update('name')} autoComplete="name" className="h-12 w-full rounded-xl border border-[#220306]/15 bg-white px-4 outline-none focus:border-[#D4AF56] focus:ring-2 focus:ring-[#D4AF56]/30" placeholder="Nama lengkap" /></label>
        <label className="block sm:col-span-2"><span className="mb-2 block text-sm font-bold">Nomor WhatsApp</span><input required type="tel" inputMode="tel" value={form.phone} onChange={update('phone')} autoComplete="tel" className="h-12 w-full rounded-xl border border-[#220306]/15 bg-white px-4 outline-none focus:border-[#D4AF56] focus:ring-2 focus:ring-[#D4AF56]/30" placeholder="Contoh: 0812xxxxxxx" /></label>
      </div>
      <button type="submit" disabled={!isComplete} className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-[#220306] px-5 py-3 text-base font-bold text-[#E8CF8A] transition-colors hover:bg-[#65131C] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF56]"><MessageCircle className="h-5 w-5" aria-hidden="true" />Hubungi Kami</button>
      <p className="mt-3 text-center text-xs text-[#5c4848]">Data Anda hanya digunakan untuk keperluan konsultasi Royal Kinara.</p>
      {error ? <p role="alert" className="mt-3 text-center text-sm font-semibold text-[#8b1e2d]">{error}</p> : null}
      {submitted ? <p className="mt-3 text-center text-sm font-semibold text-[#2e6b45]">WhatsApp dibuka di tab baru.</p> : null}
    </form>
  );
};

const RoyalRukoContent = () => {
  const [activeGallery, setActiveGallery] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audienceProfiles = [
    'Sudah memiliki penghasilan relatif stabil',
    'Berada di posisi supervisor, manager, senior manager, profesional, atau business leader',
    'Mulai memikirkan masa pensiun / financial independence',
    'Ingin mengubah sebagian income menjadi aset',
    'Ingin memiliki properti yang dapat digunakan atau disewakan',
    'Tidak ingin menunggu sampai “nanti” untuk mulai membangun portfolio'
  ];

  return (
    <div className="royal-content min-h-screen overflow-x-hidden bg-[#F8F3EA] text-[#220306]" style={{ '--royal-maroon': MAROON }}>
      <RoyalAnchorNavigation onMenuOpenChange={setMobileMenuOpen} />
      <main className="pt-16">
        <section id="hero" className="scroll-mt-20 bg-[#220306] text-[#F8F3EA]">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#E8CF8A]">Royal Kinara</p>
            <h1 className="mt-5 max-w-4xl font-serif text-[2.45rem] font-semibold leading-[1.12] sm:text-5xl lg:text-[3.5rem]">
              Mau Sampai Kapan Jadi Karyawan <span className="text-[#E8CF8A]">Tanpa Aset Passive Income?</span>
            </h1>
            <div className="mt-8 max-w-3xl text-base leading-8 text-[#E9DED0] sm:text-lg">
              <p>Karier Anda mungkin sudah matang.</p>

              <ul className="mt-6 space-y-3 border-l-2 border-[#D4AF56] pl-5">
                {['Jabatan sudah tinggi.', 'Penghasilan sudah jauh lebih baik.', 'Pengalaman sudah bertahun-tahun.'].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-semibold text-[#F8F3EA]"><Check className="mt-1 h-5 w-5 shrink-0 text-[#E8CF8A]" aria-hidden="true" />{item}</li>
                ))}
              </ul>

              <p className="mt-8">Tetapi ada satu pertanyaan yang sering terlupakan:</p>
            </div>

            <div className="mt-5 max-w-4xl rounded-2xl border border-[#D4AF56]/35 bg-[#4A0B12] p-5 sm:p-7">
              <p className="font-serif text-2xl font-semibold leading-snug text-[#F8F3EA] sm:text-3xl">Kalau suatu hari Anda berhenti bekerja, apa yang tetap menghasilkan untuk Anda?</p>
            </div>

            <div className="mt-8 max-w-3xl text-base leading-8 text-[#E9DED0] sm:text-lg">
              <p>Karena selama ini...</p>
              <p className="mt-3">Anda menukar waktu dengan penghasilan.</p>
              <p className="mt-1 font-bold text-[#F8F3EA]">Anda harus tetap bekerja untuk mendapatkan penghasilan tersebut.</p>
            </div>
          </div>
        </section>

        <section id="karier-aset" className="scroll-mt-20 bg-[#F8F3EA] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#65131C]">Karier Anda Sudah Bekerja untuk Anda.</p>
              <h2 className="mt-4 max-w-3xl font-serif text-3xl font-semibold leading-tight text-[#220306] sm:text-4xl lg:text-5xl">Kapan Aset Anda Mulai Bekerja untuk Anda?</h2>
              <div className="mt-7 max-w-3xl space-y-4 text-base leading-8 text-[#5c4848] sm:text-lg">
                <p>Ini bukan tentang berhenti bekerja besok.</p>
                <p>Bukan juga tentang mengejar “cepat kaya”.</p>
                <p className="font-bold text-[#220306]">Justru sebaliknya.</p>
                <p>Semakin matang karier Anda, semakin penting mulai membangun aset yang tidak sepenuhnya bergantung pada waktu dan tenaga Anda.</p>
              </div>
            </div>
            <div className="mt-10 overflow-hidden rounded-2xl border border-[#D4AF56]/40 bg-[#220306] shadow-[0_18px_45px_rgba(34,3,6,0.14)]">
              <div className="relative">
                <RoyalImage fileName="2.png" alt="Gambar facade ruko" className="aspect-[16/9] w-full object-cover" sizes="(min-width: 1024px) 64rem, calc(100vw - 2rem)" loading="eager" />
                <p className="absolute bottom-5 left-5 rounded-full border border-[#E8CF8A]/50 bg-[#220306]/90 px-4 py-2 text-sm font-bold text-[#E8CF8A]">Tersedia 5 unit</p>
              </div>
            </div>
            <div className="mt-7"><CTA label="Royal Kinara - Section Karier Hubungi Kami">Hubungi Kami</CTA></div>
          </div>
        </section>

        <section id="keunggulan" className="scroll-mt-20 bg-[#220306] py-14 text-[#F8F3EA] sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading light title="Mengapa Ruko Royal Kinara?" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                'Kami mengelolanya untuk anda, GRATIS',
                'Kami mencarikan penyewanya untuk anda, GRATIS',
                'Ruko ditengah 5 kompleks perumahan',
                'Row jalan 2 arah',
                'Akses langsung ke jalan raya lintas provinsi',
                '5 menit dari kampus IPB'
              ].map((title) => <article key={title} className="flex min-h-44 flex-col rounded-2xl border border-[#D4AF56]/35 bg-[#4A0B12]/60 p-6"><Store className="h-7 w-7 text-[#E8CF8A]" /><h3 className="mt-auto pt-8 font-serif text-xl font-semibold leading-snug">{title}</h3></article>)}
            </div>
          </div>
        </section>

        <section id="royal-kinara" className="scroll-mt-20 bg-[#F8F3EA] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-serif text-4xl font-semibold text-[#220306] sm:text-5xl">Royal Kinara</h2>
              <p className="inline-flex w-fit rounded-full bg-[#65131C] px-5 py-2 text-sm font-bold text-[#F8F3EA]">Tersedia 5 unit</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
              {[
                ['2.png', 'Gambar facade ruko'],
                ['location.jpg', 'Lokasi ruko']
              ].map(([fileName, alt], index) => <button type="button" key={fileName} onClick={() => setActiveGallery({ fileName, alt })} className="group relative overflow-hidden rounded-3xl border border-[#D4AF56]/45 bg-[#220306] text-left shadow-[0_18px_45px_rgba(34,3,6,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF56]"><div className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#E8CF8A]/70 bg-[#220306]/75 font-serif text-lg text-[#E8CF8A]">0{index + 1}</div><div className="m-3 overflow-hidden rounded-2xl"><RoyalImage fileName={fileName} alt={alt} className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" /></div><span className="block border-t border-[#D4AF56]/35 bg-[#220306] px-5 py-4 font-serif text-xl font-semibold text-[#F8F3EA]">{alt}</span></button>)}
            </div>
          </div>
        </section>

        <section id="untuk-siapa" className="scroll-mt-20 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Siapa yang Paling Relevan dengan Royal Kinara?" description="Royal Kinara lebih cocok untuk Anda yang:" />
            <div className="grid gap-4 md:grid-cols-2">
              {audienceProfiles.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-[#D4AF56]/35 bg-[#F8F3EA] p-5 text-sm font-semibold leading-6 text-[#220306] shadow-[0_10px_30px_rgba(34,3,6,0.05)]"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#65131C]" aria-hidden="true" />{item}</div>)}
            </div>
          </div>
        </section>

        <section id="konsultasi" className="scroll-mt-20 bg-[#220306] py-14 text-[#F8F3EA] sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading light title="Mau Lihat Lokasinya Sekarang atau Nanti Saja Ketika Harga Sudah Naik?" description="Isi form dan klik tombol hubungi kami untuk berdiskusi mengenai kebutuhan anda sekarang." />
            <RoyalLeadForm />
            <div className="mx-auto mt-16 max-w-5xl border-t border-[#D4AF56]/30 pt-12 text-center sm:mt-20 sm:pt-16">
              <p className="font-serif text-3xl font-semibold leading-tight text-[#F8F3EA] sm:text-4xl">Gaji Membayar Kehidupan Anda.</p>
              <p className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#E8CF8A] sm:text-4xl">Aset Membangun Masa Depan Anda.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#D4AF56]/25 bg-[#220306] py-10 text-[#D8C7AA]"><div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8"><div><p className="font-serif text-2xl font-semibold text-[#F8F3EA]">Royal Kinara</p><p className="mt-2 max-w-2xl text-xs leading-5 text-[#D8C7AA]/75">Jl. Babengket No.6, Cihideung Udik, Kec. Ciampea, Kabupaten Bogor, Jawa Barat 16620</p><p className="mt-1 text-xs font-semibold text-[#E8CF8A]">PT KINARA LAND INDONESIA</p></div><div className="text-left text-xs lg:text-right"><p>Informasi harga, ketersediaan, dan manfaat layanan perlu dikonfirmasi kepada tim Royal Kinara.</p><p className="mt-2">© {new Date().getFullYear()} Royal Kinara. Semua hak dilindungi.</p></div></div></footer>
      {activeGallery ? <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#220306]/95 p-4" role="dialog" aria-modal="true" aria-label={activeGallery.alt} onClick={() => setActiveGallery(null)}><button type="button" onClick={() => setActiveGallery(null)} className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF56] text-[#E8CF8A]" aria-label="Tutup galeri"><span className="text-2xl">×</span></button><div className="max-h-[90vh] max-w-6xl" onClick={(event) => event.stopPropagation()}><RoyalImage fileName={activeGallery.fileName} alt={activeGallery.alt} className="max-h-[82vh] w-auto rounded-xl object-contain" loading="eager" /><p className="mt-3 text-center text-sm text-[#D8C7AA]">{activeGallery.alt}</p></div></div> : null}
      {!mobileMenuOpen ? <a href="#konsultasi" onClick={(event) => { event.preventDefault(); scrollToLead(); }} className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[70] hidden h-14 w-14 items-center justify-center rounded-full border border-[#D4AF56] bg-[#220306] text-[#E8CF8A] shadow-[0_18px_42px_rgba(34,3,6,0.35)] md:inline-flex md:right-6" aria-label="Buka form konsultasi Royal Kinara"><MessageCircle className="h-7 w-7" /></a> : null}
    </div>
  );
};

const RoyalRukoPage = () => <RoyalRukoContent />;

export default RoyalRukoPage;
