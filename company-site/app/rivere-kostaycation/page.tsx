import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero } from "@/components/InnerHero";
import { PillLink } from "@/components/PillLink";
export const metadata: Metadata = { title: "Rivere Kostaycation IPB", description: "Featured project PT Kinara Land Indonesia di kawasan pendidikan IPB Dramaga." };
export default function RiverePage() { return <main><InnerHero eyebrow="FEATURED PROJECT" title="Rivere Kostaycation IPB" intro="Kost produktif dengan pengalaman tinggal bergaya resort di kawasan pendidikan IPB Dramaga." /><section className="project-detail"><div><Image src="/images/gerbang.jpeg" alt="Rivere Kostaycation IPB" fill sizes="60vw" /></div><aside><span>RING 1 IPB DRAMAGA</span><h2>Aset produktif di kawasan pendidikan.</h2><p>Rivere merepresentasikan pendekatan Kinara Land melalui lokasi yang relevan, ruang yang nyaman, dan operasional yang dirancang secara profesional.</p><PillLink href="/hubungi-kami">Konsultasi Proyek</PillLink></aside></section></main>; }
