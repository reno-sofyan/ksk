"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { articles, businessFocus, company, ecosystem, portfolios, principles, values, workSteps } from "@/data/site";
import { PillLink } from "./PillLink";

export function HomePage() {
  const root = useRef<HTMLElement>(null);
  const [focus, setFocus] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(".hero-media", { scale: 1.13, xPercent: 3.5, scrollTrigger: { trigger: ".hero-scroll", start: "top top", end: "bottom bottom", scrub: 1 } });
      gsap.fromTo(".hero-word", { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .12, duration: 1.15, ease: "power4.out" });
      gsap.to(".hero-content", { xPercent: -7, opacity: .08, scrollTrigger: { trigger: ".hero-scroll", start: "12% top", end: "84% bottom", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>("[data-reveal-text]").forEach((element) => {
        gsap.fromTo(element, { color: "#d8d8d8" }, { color: "#151717", scrollTrigger: { trigger: element, start: "top 78%", end: "bottom 44%", scrub: true } });
      });
      gsap.to(".arrow-track", { xPercent: -13, scrollTrigger: { trigger: ".arrow-gallery", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.utils.toArray<HTMLElement>(".clip-reveal").forEach((element) => {
        gsap.fromTo(element, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", scrollTrigger: { trigger: element, start: "top 82%" }, duration: 1.15, ease: "power4.out" });
      });
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((element) => {
        gsap.fromTo(element, { yPercent: -8, scale: 1.08 }, { yPercent: 8, scale: 1.02, scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <main ref={root}>
      <section className="hero-scroll">
        <div className="hero-sticky">
          <Image className="hero-media" src="/images/gerbang.jpeg" alt="Properti modern PT Kinara Land Indonesia di Bogor" fill priority sizes="100vw" />
          <div className="hero-sky" />
          <div className="hero-content">
            <p className="hero-eyebrow">PT KINARA LAND INDONESIA</p>
            <h1><span className="hero-word">Properti Produktif.</span><span className="hero-word">Dibangun untuk Bertumbuh.</span></h1>
            <p className="hero-description">Kinara Land mengembangkan hunian dan aset produktif melalui pemilihan lokasi strategis, perhatian pada legalitas, desain yang bernilai, serta pengelolaan profesional untuk performa jangka panjang.</p>
            <div className="hero-actions"><PillLink href="/portofolio">Lihat Portofolio</PillLink><a href={company.whatsappUrl} className="text-link">Hubungi Direksi <ArrowRight /></a></div>
          </div>
          <div className="scroll-hint">GULIR UNTUK MENJELAJAH <span /></div>
        </div>
      </section>

      <section id="tentang" className="why section-light">
        <div className="eyebrow">TENTANG PERUSAHAAN</div>
        <div>
          <h2 data-reveal-text>Properti yang Dikembangkan sebagai Aset yang Bekerja.</h2>
          <p>Kinara Land membangun properti dari sudut pandang investor dan penghuni sekaligus. Setiap proyek dikembangkan dengan alasan lokasi yang jelas, fungsi ruang yang kuat, dan sistem pengelolaan yang dapat dijalankan secara profesional.</p>
          <div className="principle-grid">{principles.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="arrow-gallery section-light">
        <h2>Bukan Sekadar<br />Membangun Properti.</h2>
        <div className="arrow-track">
          {["/images/gerbang.jpeg", "/images/property-2.png", "/images/client-3.jpeg", "/images/agent-3.jpeg"].map((image, index) => (
            <div className="arrow-mask" key={image}><Image src={image} alt={["Proses pembangunan", "Arsitektur dan desain interior", "Kehidupan penghuni", "Pengelolaan properti"][index]} fill sizes="35vw" /></div>
          ))}
        </div>
        <p data-reveal-text>Kami membangun ekosistem yang menghubungkan aset, penghuni, pemilik, dan operator. Tujuannya adalah menciptakan properti yang memiliki fungsi jelas sejak dirancang hingga digunakan.</p>
      </section>

      <section id="fokus-bisnis" className="services" data-theme="dark">
        <div className="services-head"><span>FOKUS BISNIS</span><h2>Dari Pengembangan Aset<br />hingga Pengalaman Tinggal.</h2></div>
        <div className="service-list">
          {businessFocus.map((item, index) => (
            <article key={item.name} className={focus === index ? "active" : ""}>
              <button onClick={() => setFocus(index)} aria-expanded={focus === index}>
                <span className="service-number">{item.number}</span><div className="service-copy"><strong>{item.name}</strong><p>{item.description}</p></div><h3>{item.title}</h3><ChevronDown />
              </button>
              <motion.div className="service-detail" animate={{ height: focus === index ? 180 : 0, opacity: focus === index ? 1 : 0 }}>
                <Image src={item.image} alt="" fill sizes="100vw" /><Link href="/fokus-bisnis">Pelajari Fokus Bisnis <ArrowRight /></Link>
              </motion.div>
            </article>
          ))}
        </div>
      </section>

      <section id="portofolio" className="portfolio-home">
        <div className="portfolio-head"><span>PORTOFOLIO DEVELOPER</span><h2>Portofolio PT Kinara Land Indonesia.</h2><p>Portofolio Kinara Land mencakup residensial, townhouse, hunian hijau, dan berbagai pengembangan properti kost di Bogor dan sekitarnya.</p></div>
        <div className="portfolio-grid">
          {portfolios.slice(0, 4).map((item) => <article key={item.slug} className={item.featured ? "portfolio-featured" : ""}><div><Image src={item.image} alt={item.name} fill sizes={item.featured ? "65vw" : "35vw"} /></div><span>{item.category}</span><h3>{item.name}</h3><p>{item.location}</p><p>{item.description}</p><Link href={`/portofolio/${item.slug}`}>Lihat Detail <ArrowRight /></Link></article>)}
        </div>
        <PillLink href="/portofolio">Lihat Semua Portofolio</PillLink>
      </section>

      <section className="agents-feature section-light">
        <div className="agents-copy"><span>FEATURED PROJECT</span><h2>Rivere<br />Kostaycation IPB</h2><h3>Kost produktif dengan pengalaman tinggal bergaya resort.</h3><p>Rivere Kostaycation IPB merepresentasikan pendekatan Kinara Land dalam mengembangkan aset produktif di dekat kawasan pendidikan: lokasi yang relevan, ruang yang nyaman, dan operasional yang dirancang secara profesional.</p><ul>{["Ring 1 IPB Dramaga","Konsep kost resort","Ditujukan untuk pasar kawasan pendidikan","Mendukung pengelolaan properti profesional","Mengutamakan pengalaman tinggal penghuni"].map((item) => <li key={item}>{item}</li>)}</ul><div className="hero-actions"><PillLink href={company.rivereUrl}>Jelajahi Rivere</PillLink><a href={company.whatsappUrl} className="text-link">Konsultasi Proyek <ArrowRight /></a></div></div>
        <div className="agents-photo clip-reveal"><Image className="parallax-image" src="/images/gerbang.jpeg" alt="Rivere Kostaycation IPB" fill sizes="50vw" /></div>
      </section>

      <section id="cara-kerja" className="process section-light">
        <div className="process-sticky"><span>CARA KERJA</span><h2>Transparansi Sebelum Transaksi.<br />Pengelolaan Setelah Serah Terima.</h2><PillLink href="/tentang-kami#cara-kerja">Pelajari Cara Kami Bekerja</PillLink></div>
        <div className="process-steps">{workSteps.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="testimonials values-section">
        <div className="section-title"><span>NILAI KAMI</span><h2>Mengembangkan Properti dengan Perspektif yang Lebih Lengkap.</h2></div>
        <div className="value-grid">{values.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="support" data-theme="dark">
        <div className="support-head"><span>EKOSISTEM PENGELOLAAN</span><h2>Dukungan Melampaui Pembangunan.</h2><div><p>Pengembangan properti tidak berhenti ketika bangunan selesai. Kinara Land menghubungkan perencanaan aset, pengalaman penghuni, dan pengelolaan operasional.</p><PillLink href="/fokus-bisnis" light>Jelajahi Ekosistem Kami</PillLink></div></div>
        <div className="support-track" data-lenis-prevent>{ecosystem.map((item) => <article key={item.title}><div><Image src={item.image} alt={item.title} fill sizes="42vw" /></div><h3>{item.title}</h3><p>{item.text}</p><Link href="/fokus-bisnis">Pelajari Lebih Lanjut <ArrowRight /></Link></article>)}</div>
      </section>

      <section id="wawasan" className="blog-section">
        <div className="blog-head"><h2>Wawasan<br />Properti</h2><div><p>Perspektif Kinara Land mengenai pengembangan properti, aset produktif, kawasan pendidikan, dan pengelolaan hospitality.</p><PillLink href="/wawasan">Lihat Semua Wawasan</PillLink></div></div>
        <div className="article-list">{articles.slice(0, 3).map((article) => <article key={article.slug}><div className="article-label"><span>{article.category}</span><small>DRAFT</small></div><div className="article-image"><Image src={article.image} alt="" fill sizes="36vw" /></div><div><h3>{article.title}</h3><p>{article.excerpt}</p><Link href={`/wawasan/${article.slug}`}>Baca Selengkapnya <ArrowRight /></Link></div></article>)}</div>
      </section>

      <section className="final-cta" data-theme="dark">
        <Image className="parallax-image" src="/images/gerbang.jpeg" alt="Proyek unggulan Kinara Land" fill sizes="100vw" />
        <div><h2>Bangun Aset yang<br />Siap Bekerja.</h2><p>Diskusikan portofolio, kerja sama, atau informasi proyek berjalan bersama tim PT Kinara Land Indonesia.</p><div className="hero-actions"><PillLink href="/hubungi-kami" light>Hubungi Kinara Land</PillLink><Link href="/portofolio" className="text-link text-link-light">Lihat Portofolio <ArrowRight /></Link></div></div>
      </section>
    </main>
  );
}
