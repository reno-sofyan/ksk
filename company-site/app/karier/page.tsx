import type { Metadata } from "next";
import Image from "next/image";
import { InnerHero } from "@/components/InnerHero";
import { PillLink } from "@/components/PillLink";
export const metadata: Metadata = { title: "Karier" };
export default function CareerPage() { return <main><InnerHero eyebrow="KARIER" title="Tumbuh bersama ekosistem properti yang bergerak." intro="Informasi posisi dan proses rekrutmen akan ditampilkan setelah tersedia secara resmi." /><section className="split-content"><div><h2>Bangun pekerjaan yang berdampak.</h2><p>Jika Anda tertarik pada pengembangan properti, hospitality, dan pengelolaan aset, kirimkan perkenalan melalui tim Kinara Land.</p><PillLink href="/hubungi-kami">Hubungi Tim Kami</PillLink></div><div className="split-image"><Image src="/images/agent-3.jpeg" alt="Tim Kinara Land" fill sizes="50vw" /></div></section></main>; }
