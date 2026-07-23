import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, BedDouble, ExternalLink, Home, Layers3, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogFooter, BlogHeader, WHATSAPP_URL } from '@/components/BlogChrome.jsx';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { DENAH_PAGE, DENAH_PLANS } from '@/data/riverePlans.js';
import { SITE_URL } from '@/data/blogPosts.js';

const pageUrl = `${SITE_URL}${DENAH_PAGE.path}`;
const pageImage = `${SITE_URL}${DENAH_PAGE.image}`;

const denahSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${pageUrl}#webpage`,
  url: pageUrl,
  name: DENAH_PAGE.title,
  description: DENAH_PAGE.description,
  inLanguage: 'id-ID',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Rivere Kostaycation IPB',
    url: SITE_URL
  },
  about: {
    '@type': 'RealEstateAgent',
    name: 'PT Kinara Land Indonesia'
  },
  mainEntity: DENAH_PLANS.map((plan) => ({
    '@type': 'ImageObject',
    name: plan.title,
    description: `${plan.subtitle}, ${plan.rooms}, ${plan.floors}. ${plan.description}`,
    contentUrl: `${SITE_URL}${plan.image}`
  }))
};

const statItems = [
  { label: 'Varian Denah', value: '2 Tipe' },
  { label: 'Jumlah Lantai', value: '3 Lantai' },
  { label: 'Pilihan Kamar', value: '4-6 Kamar' }
];

const PlanMetric = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 border border-primary/10 bg-white px-4 py-3 shadow-sm">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-accent">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <div>
      <p className="text-xs font-semibold uppercase tracking-normal text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-bold text-primary sm:text-base">{value}</p>
    </div>
  </div>
);

const DenahPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Helmet>
      <title>{DENAH_PAGE.title}</title>
      <link rel="icon" href="/favicon.ico?v=kinara-20260721" sizes="any" />
      <link rel="icon" type="image/png" href="/favicon.png?v=kinara-20260721" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=kinara-20260721" />
      <meta name="description" content={DENAH_PAGE.description} />
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={pageUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content="Rivere Kostaycation IPB" />
      <meta property="og:title" content={DENAH_PAGE.title} />
      <meta property="og:description" content={DENAH_PAGE.description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:alt" content={DENAH_PAGE.imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={DENAH_PAGE.title} />
      <meta name="twitter:description" content={DENAH_PAGE.description} />
      <meta name="twitter:image" content={pageImage} />
      <meta name="twitter:image:alt" content={DENAH_PAGE.imageAlt} />
      <script type="application/ld+json">{JSON.stringify(denahSchema)}</script>
    </Helmet>

    <BlogHeader />

    <main>
      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(90deg,rgba(208,173,90,0.22)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px]" aria-hidden="true"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition-colors hover:text-accent">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Kembali ke Beranda
          </Link>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-accent">Denah Unit Rivere Kostaycation IPB</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Denah Type 62/31 dan Type 94/31
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                Dua pilihan denah menampilkan komposisi lantai 1 dan lantai 2-3, jumlah kamar, luas lahan, luas bangunan, serta fasilitas pendukung seperti parkir motor, dapur umum, ruang jemur, dan akses tangga lebar.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {statItems.map((item) => (
                <div key={item.label} className="border border-white/10 bg-white/[0.055] px-5 py-4 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-normal text-accent">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10">
            {DENAH_PLANS.map((plan, index) => (
              <motion.article
                key={plan.id}
                id={plan.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className="grid overflow-hidden border border-primary/15 bg-card shadow-[0_24px_70px_rgba(7,39,29,0.09)] lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]"
              >
                <a href={plan.image} target="_blank" rel="noopener noreferrer" className="block bg-white p-3 sm:p-5" aria-label={`Buka gambar penuh ${plan.title}`}>
                  <ResponsiveImage
                    src={plan.image}
                    alt={plan.imageAlt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding={index === 0 ? 'sync' : 'async'}
                    fetchPriority={index === 0 ? 'high' : undefined}
                    sizes="(min-width: 1024px) 68vw, 100vw"
                    className="h-full w-full object-contain"
                  />
                </a>

                <div className="flex flex-col justify-between border-t border-primary/10 bg-secondary/45 p-6 lg:border-l lg:border-t-0 lg:p-8">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-normal text-accent">Denah Lantai 1 & Lantai 2-3</p>
                    <h2 className="mt-3 text-2xl font-bold leading-tight text-primary sm:text-3xl">{plan.title}</h2>
                    <p className="mt-2 text-lg font-semibold text-foreground/80">{plan.subtitle}</p>
                    <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">{plan.description}</p>

                    <div className="mt-7 grid gap-3">
                      <PlanMetric icon={BedDouble} label="Jumlah Kamar" value={plan.rooms} />
                      <PlanMetric icon={Layers3} label="Jumlah Lantai" value={plan.floors} />
                      <PlanMetric icon={Ruler} label="Luas Tanah" value={plan.landArea} />
                      <PlanMetric icon={Home} label="Luas Bangunan" value={plan.buildingArea} />
                    </div>

                    <div className="mt-7">
                      <p className="text-sm font-semibold uppercase tracking-normal text-primary">Fasilitas pada denah</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {plan.facilities.map((facility) => (
                          <span key={facility} className="border border-primary/10 bg-white px-3 py-2 text-xs font-semibold text-primary">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <a
                    href={plan.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-primary"
                  >
                    Buka gambar penuh
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/45 py-14 sm:py-16">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">Butuh rekomendasi tipe denah?</h2>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Konsultasikan kebutuhan investasi, target jumlah kamar, dan preferensi layout dengan tim Rivere Kostaycation IPB.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-accent bg-primary px-6 py-4 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-primary"
          >
            Konsultasi Denah via WhatsApp
          </a>
        </div>
      </section>
    </main>

    <BlogFooter />
  </div>
);

export default DenahPage;
