import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/InnerHero";
import { articles } from "@/data/site";
export const metadata: Metadata = { title: "Wawasan Properti", description: "Perspektif Kinara Land mengenai pengembangan properti, aset produktif, kawasan pendidikan, dan hospitality." };
export default function InsightsPage() { return <main><InnerHero eyebrow="WAWASAN PROPERTI" title="Perspektif untuk keputusan yang lebih jernih." intro="Topik pengembangan properti, aset produktif, kawasan pendidikan, dan pengelolaan hospitality." /><section className="article-list inner-articles">{articles.map((article) => <article key={article.slug}><div className="article-label"><span>{article.category}</span><small>DRAFT</small></div><div className="article-image"><Image src={article.image} alt="" fill sizes="36vw" /></div><div><h3>{article.title}</h3><p>{article.excerpt}</p><Link href={`/wawasan/${article.slug}`}>Baca Selengkapnya <ArrowRight /></Link></div></article>)}</section></main>; }
