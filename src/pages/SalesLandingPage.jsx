import React from 'react';
import { Helmet } from 'react-helmet';
import {
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  MapPin,
  Menu,
  MessageCircle,
  ShieldCheck,
  Users,
  Wrench
} from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import WhatsAppCtaButton from '@/components/WhatsAppCtaButton.jsx';
import ViewportVideo from '@/components/ViewportVideo.jsx';
import { WhatsAppConsultationForm } from '@/components/WhatsAppLeadGate.jsx';
import { imageUrl } from '@/lib/assets.js';
import { RIVERE_SITE_URL } from '@/lib/site.js';
import { DENAH_PLANS } from '@/data/riverePlans.js';

const SALES_PHONE_NUMBERS = {
  ade: '6282111124005',
  nur: '6288293516558',
  melin: '6281928719457',
  ge: '6281958798799',
  andika: '6285196480931',
  novan: '6287797000003'
};

const PORTFOLIO = [
  'Rabbani Bintaro Residence',
  'Green Forest Cifor',
  'Villa Rabbani Padjajaran',
  'Rabbani Townhouse Cimanggu',
  'Kikost Manunggal',
  'Kikost Cifor'
];

const GALLERY = [
  ['rivere/Design 1/1.png', 'Fasad utama Rivere Kostaycation IPB'],
  ['rivere/Design 2/1.png', 'Alternatif fasad Rivere Kostaycation IPB'],
  ['rivere/Design 3/1.png', 'Visual kawasan Rivere Kostaycation IPB'],
  ['mezzanine.png', 'Konsep smart spatial mezzanine Rivere'],
  ['gym.png', 'Visual fasilitas gym Rivere Kostaycation IPB'],
  ['clubhouse.png', 'Visual fasilitas clubhouse Rivere Kostaycation IPB']
];

const FAQ_ITEMS = [
  ['Di mana lokasi Rivere?', 'Rivere berada di Ring 1 IPB, sekitar dua menit dari gerbang utama IPB menurut informasi proyek, dengan akses yang dirancang praktis dan bebas macet.'],
  ['Apa status legalitas unit?', 'Informasi proyek menyebutkan legalitas Sertifikat Hak Milik (SHM). Calon pembeli tetap disarankan memeriksa dokumen asli bersama notaris atau PPAT sebelum mengambil keputusan.'],
  ['Siapa yang mengelola Rivere?', 'Rivere dikelola secara profesional oleh Kyra Stay, mencakup pemasaran kamar, pelayanan penghuni, operasional, perawatan, dan pelaporan.'],
  ['Bagaimana skema bagi hasil?', 'Rivere menggunakan skema bagi hasil terkelola antara investor dan pengelola. Rincian pembagian mengikuti ketentuan perjanjian yang perlu diperiksa sebelum membeli.'],
  ['Apa yang terjadi ketika kamar belum terisi?', 'Risiko dan penanganan kamar kosong ditangani pengelola sesuai ketentuan perjanjian proyek. Pastikan cakupan dan batas ketentuannya dijelaskan secara tertulis.'],
  ['Biaya apa saja yang perlu diperhitungkan?', 'Periksa harga unit, biaya transaksi, struktur bagi hasil, biaya yang menjadi tanggung jawab pemilik, serta ketentuan operasional dalam dokumen resmi dan simulasi.'],
  ['Kapan estimasi serah terima?', 'Estimasi serah terima belum dicantumkan pada data landing page. Minta jadwal terbaru dan dasar tertulisnya langsung kepada tim Rivere.'],
  ['Bagaimana cara memperoleh harga dan simulasi?', 'Isi form konsultasi di halaman ini. Setelah lengkap, tombol WhatsApp akan aktif dan tim Rivere dapat mengirim harga, denah, ketersediaan, serta simulasi sesuai budget.']
];

function getSalesKey() {
  if (typeof window === 'undefined') return 'nur';
  return window.location.pathname.split('/').filter(Boolean)[0]?.toLowerCase() || 'nur';
}

const SectionHeading = ({ eyebrow, title, description, dark = false }) => (
  <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
    {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</p> : null}
    <h2 className={`mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl ${dark ? 'text-white' : 'text-primary'}`}>{title}</h2>
    {description ? <p className={`mt-3 text-sm leading-6 sm:text-base ${dark ? 'text-white/70' : 'text-muted-foreground'}`}>{description}</p> : null}
  </div>
);

const SalesLandingPage = () => {
  const salesKey = getSalesKey();
  const phoneNumber = SALES_PHONE_NUMBERS[salesKey] || SALES_PHONE_NUMBERS.nur;
  const whatsappHref = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Halo Tim Rivere, saya ingin mendapatkan harga, denah, ketersediaan unit, dan simulasi investasi.')}`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background pb-20 text-foreground md:pb-0">
      <Helmet>
        <title>Rivere Kostaycation IPB | Aset Kost Premium Ring 1 IPB</title>
        <meta name="description" content="Miliki aset kost premium di Ring 1 IPB dengan legalitas SHM dan pengelolaan profesional Kyra Stay." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`${RIVERE_SITE_URL}/${salesKey}/`} />
      </Helmet>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-primary/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <a href="#hero" className="flex min-w-0 items-center gap-2.5" aria-label="Rivere Kostaycation IPB">
            <ResponsiveImage src={imageUrl('logo.png')} alt="Logo Kinara Land" className="h-9 w-9 rounded-full object-contain" width={36} height={36} loading="eager" />
            <span className="truncate text-sm font-bold text-primary sm:text-base">Rivere Kostaycation IPB</span>
          </a>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi landing sales">
            <a href="#keunggulan" className="text-sm font-semibold text-primary/75 hover:text-primary">Keunggulan</a>
            <a href="#video" className="text-sm font-semibold text-primary/75 hover:text-primary">Video</a>
            <a href="#unit" className="text-sm font-semibold text-primary/75 hover:text-primary">Unit</a>
            <a href="#pengelolaan" className="text-sm font-semibold text-primary/75 hover:text-primary">Pengelolaan</a>
            <a href="#faq" className="text-sm font-semibold text-primary/75 hover:text-primary">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="#konsultasi" className="inline-flex min-h-10 items-center rounded-full bg-accent px-4 text-sm font-bold text-primary hover:bg-primary hover:text-accent">Cek Unit</a>
            <details className="relative lg:hidden">
              <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-primary/15 text-primary" aria-label="Buka menu">
                <Menu className="h-5 w-5" />
              </summary>
              <nav className="absolute right-0 top-12 grid w-48 gap-1 rounded-xl border border-primary/10 bg-white p-2 shadow-xl">
                {[
                  ['Keunggulan', '#keunggulan'],
                  ['Video', '#video'],
                  ['Unit', '#unit'],
                  ['Pengelolaan', '#pengelolaan'],
                  ['FAQ', '#faq']
                ].map(([label, href]) => <a key={href} href={href} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-primary hover:bg-secondary">{label}</a>)}
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main className="pt-16">
        <section id="hero" className="scroll-mt-20 bg-primary text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 lg:px-8 lg:py-16">
            <div>
              <p className="inline-flex rounded-full border border-accent/35 bg-accent/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent">Ring 1 IPB • Aset Produktif</p>
              <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-5xl">Miliki Aset Kost Premium di Ring 1 IPB</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                Kost berkonsep resort hanya sekitar 2 menit dari gerbang utama IPB, berstatus SHM dan dikelola profesional. Dirancang untuk investor yang menginginkan aset produktif tanpa mengurus operasional harian.
              </p>
              <ul className="mt-6 grid gap-3 text-sm font-semibold sm:grid-cols-3">
                {['Legalitas SHM', 'Dikelola Kyra Stay', 'Captive market mahasiswa IPB'].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0 text-accent" />{benefit}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <WhatsAppCtaButton href={whatsappHref} ctaLabel="Sales LP - Hero Harga Denah Simulasi" variant="hero" className="w-full sm:w-auto">
                  Dapatkan Harga, Denah & Simulasi
                </WhatsAppCtaButton>
                <a href="#unit" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-white hover:border-accent hover:text-accent sm:min-h-14">Lihat Pilihan Unit</a>
              </div>
              <p className="mt-3 text-xs text-white/60">Dikirim melalui WhatsApp • Konsultasi tanpa biaya</p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <ResponsiveImage
                src={imageUrl('rivere/Design 1/1.png')}
                alt="Fasad Rivere Kostaycation IPB"
                className="aspect-[4/3] h-full w-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute bottom-3 left-3 rounded-xl border border-white/20 bg-primary/90 px-4 py-3 backdrop-blur">
                <p className="text-xs text-white/60">Akses proyek</p>
                <p className="mt-0.5 text-sm font-bold text-accent">± 2 Menit dari Gerbang Utama IPB</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Kepercayaan utama" className="border-b border-primary/10 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-primary/10 sm:grid-cols-4">
            {[
              [MapPin, 'Ring 1 IPB'],
              [ShieldCheck, 'Legalitas SHM'],
              [Wrench, 'Dikelola Kyra Stay'],
              [Building2, 'Developer berpengalaman']
            ].map(([Icon, label]) => (
              <div key={label} className="flex items-center gap-2 bg-white px-4 py-4 sm:justify-center">
                <Icon className="h-5 w-5 shrink-0 text-accent" />
                <span className="text-xs font-bold text-primary sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="keunggulan" className="scroll-mt-20 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Keunggulan Rivere" title="Aset Produktif Tanpa Beban Operasional Harian" />
            <div className="grid gap-4 md:grid-cols-3">
              {[
                [Users, 'Lokasi dengan Captive Market', 'Dekat kawasan IPB dan kebutuhan hunian mahasiswa yang berulang.'],
                [Wrench, 'Dikelola Profesional', 'Operasional, pelayanan penghuni, dan perawatan ditangani pengelola.'],
                [BarChart3, 'Performa Dapat Dipantau', 'Pemilik memperoleh laporan perkembangan dan performa unit.']
              ].map(([Icon, title, text]) => (
                <article key={title} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
                  <Icon className="h-7 w-7 text-accent" />
                  <h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary/60 py-14 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Simulasi Proyek" title="Lihat Potensi Aset Secara Terukur" />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Passive Income', 'Rp97 juta', 'per tahun per unit'],
                ['Estimasi Yield', '6–9%', 'berdasarkan simulasi'],
                ['Potensi Total ROI', '8–14%', 'berdasarkan simulasi']
              ].map(([label, value, helper]) => (
                <div key={label} className="rounded-2xl border border-primary/10 bg-white p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
                  <p className="mt-2 text-2xl font-black text-primary sm:text-3xl">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-muted-foreground">Berdasarkan simulasi proyek. Hasil aktual dapat berbeda tergantung okupansi, biaya operasional, dan kondisi pasar.</p>
            <div className="mt-6 text-center">
              <WhatsAppCtaButton href={whatsappHref} ctaLabel="Sales LP - Financial Simulation" className="w-full sm:w-auto">Minta Simulasi Sesuai Budget</WhatsAppCtaButton>
            </div>
          </div>
        </section>

        <section id="lokasi" className="scroll-mt-20 py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-secondary">
              <ResponsiveImage src={imageUrl('pintu-ipb.jpg')} alt="Pintu utama IPB dekat Rivere Kostaycation" className="aspect-[4/3] w-full object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Lokasi</p>
              <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">Lokasi Strategis di Ring 1 IPB</h2>
              <ul className="mt-6 grid gap-3">
                {[
                  'Sekitar 2 menit dari gerbang utama IPB.',
                  'Dekat captive market mahasiswa IPB.',
                  'Akses dirancang praktis dan bebas macet.',
                  'Terhubung dengan fasilitas kesehatan, kuliner, olahraga, dan kebutuhan harian.'
                ].map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-foreground/80 sm:text-base"><Check className="mt-1 h-4 w-4 shrink-0 text-accent" />{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="unit" className="scroll-mt-20 bg-primary py-14 text-white sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading dark eyebrow="Pilihan Unit" title="Pilih Unit Sesuai Target Investasi Anda" description="Bandingkan kapasitas, luas, dan denah sebelum meminta harga serta ketersediaan terbaru." />
            <div className="grid gap-5 lg:grid-cols-2">
              {DENAH_PLANS.map((plan, index) => (
                <article key={plan.id} className="overflow-hidden rounded-2xl bg-white text-primary">
                  <ResponsiveImage src={plan.image} alt={plan.imageAlt} className="aspect-[16/10] w-full bg-white object-contain p-3" sizes="(min-width: 1024px) 50vw, 100vw" />
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div><p className="text-xs font-bold uppercase text-accent">Rivere Kostaycation</p><h3 className="mt-1 text-2xl font-bold">{plan.title}</h3></div>
                      <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">{plan.rooms}</span>
                    </div>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                      <p><span className="block text-xs text-muted-foreground">Luas tanah</span><strong>{plan.landArea}</strong></p>
                      <p><span className="block text-xs text-muted-foreground">Luas bangunan</span><strong>{plan.buildingArea}</strong></p>
                      <p><span className="block text-xs text-muted-foreground">Jumlah kamar</span><strong>{plan.rooms}</strong></p>
                      <p><span className="block text-xs text-muted-foreground">Bangunan</span><strong>{plan.floors}</strong></p>
                    </div>
                    <ul className="mt-5 grid gap-2 text-sm text-foreground/75 sm:grid-cols-2">
                      {plan.facilities.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{item}</li>)}
                    </ul>
                    <p className="mt-5 text-xs font-semibold text-muted-foreground">Skema pembayaran: cash keras, 6 bulan, atau 1 tahun.</p>
                    <WhatsAppCtaButton href={whatsappHref} ctaLabel={`Sales LP - Unit ${index + 1} ${plan.title}`} className="mt-5 w-full">Cek Harga & Ketersediaan</WhatsAppCtaButton>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Galeri" title="Visual Rivere Kostaycation IPB" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {GALLERY.map(([file, alt], index) => (
                <div key={file} className={`overflow-hidden rounded-xl bg-secondary ${index === 0 ? 'col-span-2 sm:row-span-2' : ''}`}>
                  <ResponsiveImage src={imageUrl(file)} alt={alt} className="aspect-[4/3] h-full w-full object-cover" loading="lazy" sizes="(min-width: 768px) 33vw, 50vw" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="video" className="scroll-mt-20 bg-secondary/60 py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionHeading title="Kenali Rivere Lebih Dekat" description="Lihat progress pembangunan Rivere Kostaycation IPB dalam video berikut." />
            <div className="overflow-hidden rounded-2xl border border-primary/15 bg-primary shadow-[0_20px_55px_rgba(7,39,29,0.16)] sm:rounded-3xl">
              <ViewportVideo className="mx-auto block max-h-[80vh] w-full object-contain sm:max-w-md" poster={imageUrl('rivere/Design 1/1.png')} src={imageUrl('rivere/vid-rivere.mp4')} />
            </div>
          </div>
        </section>

        <section id="pengelolaan" className="scroll-mt-20 bg-secondary/60 py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Kyra Stay Management" title="Punya Kost Tanpa Harus Mengurus Kost" description="Pengelolaan menyatukan pemasaran, pelayanan, operasional, pelaporan, dan pembagian hasil sesuai perjanjian." />
            <div className="grid gap-3 sm:grid-cols-5">
              {[
                [Users, 'Pemasaran kamar'],
                [MessageCircle, 'Pelayanan penghuni'],
                [Wrench, 'Operasional & perawatan'],
                [FileText, 'Laporan pemilik'],
                [BarChart3, 'Pembagian hasil']
              ].map(([Icon, label], index) => (
                <div key={label} className="relative rounded-xl border border-primary/10 bg-white p-4 text-center">
                  <Icon className="mx-auto h-6 w-6 text-accent" />
                  <p className="mt-3 text-sm font-bold text-primary">{label}</p>
                  {index < 4 ? <span className="absolute -right-2 top-1/2 hidden text-accent sm:block">→</span> : null}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <WhatsAppCtaButton href={whatsappHref} ctaLabel="Sales LP - Kyra Stay Scheme" className="w-full sm:w-auto">Pelajari Skema Pengelolaan</WhatsAppCtaButton>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Legalitas & Transparansi</p>
              <h2 className="mt-2 text-2xl font-bold text-primary sm:text-3xl">Ketahui Aset dan Skemanya Sebelum Membeli</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Minta seluruh dokumen dan ketentuan tertulis untuk diverifikasi sebelum mengambil keputusan investasi.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Legalitas SHM', 'Ketentuan pengelolaan', 'Biaya operasional', 'Penanganan kamar kosong', 'Skema bagi hasil'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-primary/10 bg-white p-4">
                  <ClipboardCheck className="h-5 w-5 shrink-0 text-accent" /><span className="text-sm font-bold text-primary">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-white sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading dark eyebrow="Kinara Land" title="Didukung Rekam Jejak Kinara Land" description="Portofolio pengembangan yang telah tercantum dalam informasi proyek." />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {PORTFOLIO.map((project) => (
                <div key={project} className="flex min-h-24 items-center rounded-xl border border-white/10 bg-white/5 p-4">
                  <div><Building2 className="h-5 w-5 text-accent" /><p className="mt-3 text-sm font-bold text-white">{project}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <SectionHeading eyebrow="FAQ" title="Pertanyaan yang Sering Diajukan" />
            <div className="divide-y divide-primary/10 border-y border-primary/10">
              {FAQ_ITEMS.map(([question, answer]) => (
                <details key={question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-primary">
                    <span>{question}</span><ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 pr-8 text-sm leading-6 text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="konsultasi" className="scroll-mt-20 bg-secondary/60 py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <SectionHeading eyebrow="Konsultasi Rivere" title="Siap Menilai Potensi Rivere Lebih Lanjut?" description="Dapatkan harga, denah, ketersediaan unit, dan simulasi investasi melalui WhatsApp." />
            <WhatsAppConsultationForm whatsappHref={whatsappHref} ctaLabel={`Sales LP - Closing ${salesKey}`} />
            <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-muted-foreground">Tim Rivere akan membantu menjelaskan detail proyek tanpa kewajiban membeli.</p>
          </div>
        </section>
      </main>

      <footer className="bg-primary py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 md:items-center lg:px-8">
          <div><p className="font-bold">Rivere Kostaycation IPB</p><p className="mt-1 text-xs text-white/60">PT Kinara Land Indonesia</p></div>
          <div className="text-sm text-white/70 md:text-right"><a href="https://kinaraland.com/kebijakan-privasi" className="hover:text-accent">Kebijakan Privasi</a></div>
          <p className="text-xs leading-5 text-white/50 md:col-span-3">Seluruh proyeksi investasi merupakan simulasi, bukan jaminan hasil. Hasil aktual dipengaruhi okupansi, biaya operasional, kondisi pasar, dan ketentuan perjanjian.</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/10 bg-white/95 p-3 backdrop-blur md:hidden">
        <WhatsAppCtaButton href={whatsappHref} ctaLabel="Sales LP - Sticky Mobile" variant="dark" className="min-h-12 w-full py-2.5">
          Cek Harga & Simulasi
        </WhatsAppCtaButton>
      </div>
    </div>
  );
};

export default SalesLandingPage;
