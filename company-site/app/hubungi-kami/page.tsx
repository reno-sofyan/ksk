import type { Metadata } from "next";
import { InnerHero } from "@/components/InnerHero";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/data/site";
export const metadata: Metadata = { title: "Hubungi Kami", description: "Diskusikan portofolio, kerja sama, atau informasi proyek bersama PT Kinara Land Indonesia." };
export default function ContactPage() { return <main><InnerHero eyebrow="HUBUNGI KAMI" title="Diskusikan langkah berikutnya bersama Kinara Land." intro="Tim kami dapat membantu menjelaskan company profile, arah pengembangan aset, dan informasi proyek yang telah tersedia." /><section className="contact-layout"><div><span>KONTAK TERVERIFIKASI</span><h2>WhatsApp<br />+62 821 1112 4005</h2><p>{company.officeAddress ?? "Alamat kantor akan diperbarui setelah data resmi tersedia."}<br />{company.email ?? "Email perusahaan akan diperbarui setelah data resmi tersedia."}</p></div><ContactForm /></section></main>; }
