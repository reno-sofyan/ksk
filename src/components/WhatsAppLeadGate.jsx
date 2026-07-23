import React, { useEffect, useRef, useState } from 'react';
import { MapPin, MessageCircle, Phone, UserRound, X } from 'lucide-react';

const INITIAL_FORM = {
  name: '',
  phone: '',
  domicile: ''
};

const DEFAULT_MESSAGE = 'Halo, saya tertarik dengan Rivere Kostaycation IPB';
const LEAD_SOURCE_CODE = 'RIVERE-LP-CTWA';

function getCurrentPageSource() {
  if (typeof window === 'undefined') return 'Landing Page Rivere';

  return `${window.location.hostname}${window.location.pathname}${window.location.search}`;
}

function isWhatsAppHref(href) {
  if (!href || typeof window === 'undefined') return false;

  try {
    const url = new URL(href, window.location.origin);
    const hostname = url.hostname.replace(/^www\./, '');
    return hostname === 'wa.me' || hostname === 'api.whatsapp.com' || hostname === 'web.whatsapp.com';
  } catch {
    return false;
  }
}

function getWhatsAppPhone(url) {
  const hostname = url.hostname.replace(/^www\./, '');

  if (hostname === 'wa.me') {
    return url.pathname.replace(/\D/g, '');
  }

  return (url.searchParams.get('phone') || '').replace(/\D/g, '');
}

function buildWhatsAppUrl(originalHref, form, ctaLabel) {
  const originalUrl = new URL(originalHref, window.location.origin);
  const phoneNumber = getWhatsAppPhone(originalUrl);
  const originalMessage = originalUrl.searchParams.get('text') || DEFAULT_MESSAGE;
  const pageSource = getCurrentPageSource();
  const message = [
    originalMessage,
    '',
    `Kode Lead: ${LEAD_SOURCE_CODE}`,
    `Sumber: ${pageSource}`,
    `CTA: ${ctaLabel}`,
    '',
    'Data calon investor:',
    `Nama: ${form.name.trim()}`,
    `Nomor Telepon: ${form.phone.trim()}`,
    `Domisili: ${form.domicile.trim()}`
  ].join('\n');

  if (phoneNumber) {
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  }

  originalUrl.searchParams.set('text', message);
  return originalUrl.toString();
}

function validateForm(form) {
  const errors = {};
  const phoneDigits = form.phone.replace(/\D/g, '');

  if (!form.name.trim()) errors.name = 'Nama wajib diisi.';
  if (!form.phone.trim()) {
    errors.phone = 'Nomor telepon wajib diisi.';
  } else if (phoneDigits.length < 8) {
    errors.phone = 'Nomor telepon terlalu pendek.';
  }
  if (!form.domicile.trim()) errors.domicile = 'Domisili wajib diisi.';

  return errors;
}

function trackLeadSubmit(ctaLabel) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'ctwa_lead_submit',
    lead_source_code: LEAD_SOURCE_CODE,
    lead_source_page: getCurrentPageSource(),
    cta_label: ctaLabel,
    form_completed: true
  });
}

const WhatsAppLeadGate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [targetHref, setTargetHref] = useState('');
  const [targetCtaLabel, setTargetCtaLabel] = useState('WhatsApp CTA');
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const nameInputRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;
      const anchor = target instanceof Element ? target.closest('a[href]') : null;

      if (!anchor || !isWhatsAppHref(anchor.href)) return;

      event.preventDefault();
      event.stopPropagation();
      setTargetHref(anchor.href);
      setTargetCtaLabel(anchor.getAttribute('data-ctwa-label') || anchor.textContent?.trim() || 'WhatsApp CTA');
      setForm(INITIAL_FORM);
      setErrors({});
      setIsOpen(true);
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => nameInputRef.current?.focus(), 50);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const updateField = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const whatsappUrl = buildWhatsAppUrl(targetHref, form, targetCtaLabel);
    trackLeadSubmit(targetCtaLabel);
    setIsOpen(false);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-primary/70 px-4 pb-4 pt-8 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) closeModal();
      }}
    >
      <section
        aria-labelledby="whatsapp-lead-title"
        aria-modal="true"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-accent/30 bg-white text-primary shadow-2xl"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b border-primary/10 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-normal text-accent">Konsultasi Investor</p>
            <h2 id="whatsapp-lead-title" className="mt-1 text-xl font-bold leading-tight text-primary sm:text-2xl">
              Isi data sebelum lanjut ke WhatsApp
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/10 text-primary transition-colors hover:bg-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={closeModal}
            aria-label="Tutup form WhatsApp"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form className="space-y-4 px-5 py-5 sm:px-6 sm:py-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
              <UserRound className="h-4 w-4 text-accent" aria-hidden="true" />
              Nama
            </span>
            <input
              ref={nameInputRef}
              type="text"
              value={form.name}
              onChange={updateField('name')}
              className="h-12 w-full rounded-xl border border-primary/15 bg-white px-4 text-base font-medium text-primary outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/25"
              placeholder="Nama lengkap"
              autoComplete="name"
            />
            {errors.name ? <span className="mt-1 block text-xs font-semibold text-red-600">{errors.name}</span> : null}
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
              <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
              Nomor Telepon
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={updateField('phone')}
              className="h-12 w-full rounded-xl border border-primary/15 bg-white px-4 text-base font-medium text-primary outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/25"
              placeholder="Contoh: 0812xxxxxxx"
              autoComplete="tel"
              inputMode="tel"
            />
            {errors.phone ? <span className="mt-1 block text-xs font-semibold text-red-600">{errors.phone}</span> : null}
          </label>

          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              Domisili
            </span>
            <input
              type="text"
              value={form.domicile}
              onChange={updateField('domicile')}
              className="h-12 w-full rounded-xl border border-primary/15 bg-white px-4 text-base font-medium text-primary outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/25"
              placeholder="Kota domisili"
              autoComplete="address-level2"
            />
            {errors.domicile ? <span className="mt-1 block text-xs font-semibold text-red-600">{errors.domicile}</span> : null}
          </label>

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-base font-bold text-primary shadow-[0_14px_32px_rgba(208,173,90,0.28)] transition-colors hover:bg-primary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Lanjut Konsultasi via WhatsApp
          </button>
        </form>
      </section>
    </div>
  );
};

export default WhatsAppLeadGate;
