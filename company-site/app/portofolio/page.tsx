import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/InnerHero";
import { portfolios } from "@/data/site";
export const metadata: Metadata = { title: "Portofolio", description: "Portofolio residensial, townhouse, hunian hijau, dan kost produktif PT Kinara Land Indonesia." };
export default function PortfolioPage() { return <main><InnerHero eyebrow="PORTOFOLIO DEVELOPER" title="Portofolio PT Kinara Land Indonesia." intro="Residensial, townhouse, hunian hijau, dan berbagai pengembangan properti kost di Bogor dan sekitarnya." /><section className="listing-grid">{portfolios.map((item) => <article key={item.slug}><div><Image src={item.image} alt={item.name} fill sizes="50vw" /></div><span>{item.category}</span><h2>{item.name}</h2><p>{item.location}</p><p>{item.description}</p>{item.status && <small>{item.status}</small>}<Link className="detail-link" href={`/portofolio/${item.slug}`}>Lihat Detail <ArrowRight /></Link></article>)}</section></main>; }
