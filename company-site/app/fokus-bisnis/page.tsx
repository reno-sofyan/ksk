import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero } from "@/components/InnerHero";
import { businessFocus, ecosystem } from "@/data/site";
export const metadata: Metadata = { title: "Fokus Bisnis", description: "Property Development, Managed Investment Property, dan Hospitality Ecosystem dari PT Kinara Land Indonesia." };
export default function FocusPage() { return <main><InnerHero eyebrow="FOKUS BISNIS" title="Dari pengembangan aset hingga pengalaman tinggal." intro="Tiga kapabilitas yang bergerak sebagai satu ekosistem properti." /><section className="listing-grid">{businessFocus.map((item) => <article key={item.name}><div><Image src={item.image} alt={item.name} fill sizes="50vw" /></div><span>{item.number} · {item.title}</span><h2>{item.name}</h2><p>{item.description}</p></article>)}</section><section className="detail-section detail-dark" data-theme="dark"><h2>Dukungan Melampaui Pembangunan</h2><div className="value-grid">{ecosystem.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section></main>; }
