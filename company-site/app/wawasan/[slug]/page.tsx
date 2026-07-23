import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerHero } from "@/components/InnerHero";
import { PillLink } from "@/components/PillLink";
import { articles } from "@/data/site";
export function generateStaticParams() { return articles.map((item) => ({ slug: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = articles.find((entry) => entry.slug === slug); return item ? { title: item.title, description: item.excerpt, robots: { index: false, follow: true } } : {}; }
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = articles.find((entry) => entry.slug === slug); if (!item) notFound(); return <main><InnerHero eyebrow={`${item.category} · DRAFT`} title={item.title} intro={item.excerpt} /><section className="placeholder-content"><h2>Konten sedang disiapkan.</h2><p>Artikel ini masih berstatus draft. Isi final, tanggal publikasi, dan structured data Article akan ditambahkan setelah melalui proses editorial dan persetujuan perusahaan.</p><PillLink href="/wawasan">Kembali ke Wawasan</PillLink></section></main>; }
