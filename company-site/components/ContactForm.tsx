"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { company } from "@/data/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const valid = data.get("name") && data.get("whatsapp") && String(data.get("email")).includes("@") && data.get("need") && data.get("topic") && data.get("message") && data.get("consent");
    if (!valid) return setStatus("error");
    setStatus("loading");
    const message = [
      "Halo Kinara Land, saya ingin mengirim permintaan melalui website.",
      `Nama: ${data.get("name")}`,
      `WhatsApp: ${data.get("whatsapp")}`,
      `Email: ${data.get("email")}`,
      `Kebutuhan: ${data.get("need")}`,
      `Topik: ${data.get("topic")}`,
      `Pesan: ${data.get("message")}`,
    ].join("\n");
    window.setTimeout(() => {
      setStatus("success");
      window.open(`${company.whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    }, 750);
  };
  return <form className="contact-form" onSubmit={submit} noValidate>
    <label>Nama lengkap<input name="name" autoComplete="name" required /></label>
    <label>Nomor WhatsApp<input name="whatsapp" type="tel" autoComplete="tel" required /></label>
    <label>Email<input name="email" type="email" autoComplete="email" required /></label>
    <label>Kebutuhan<input name="need" required /></label>
    <label>Pilihan topik<select name="topic" defaultValue="" required><option value="" disabled>Pilih topik</option>{["Informasi proyek","Investasi properti","Kerja sama","Pengelolaan properti","Media","Karier","Lainnya"].map((item) => <option key={item}>{item}</option>)}</select></label>
    <label>Pesan<textarea name="message" rows={5} required /></label>
    <label className="consent"><input name="consent" type="checkbox" required /><span>Saya menyetujui pemrosesan data untuk menindaklanjuti permintaan ini.</span></label>
    <div className="form-actions"><button className="pill" disabled={status === "loading"}>{status === "loading" ? "Mengirim..." : "Kirim Permintaan"}<ArrowRight /></button><a className="text-link" href={company.whatsappUrl}>WhatsApp Langsung <ArrowRight /></a></div>
    <p role="status">{status === "error" ? "Lengkapi seluruh field wajib dan persetujuan pemrosesan data." : status === "success" ? "Permintaan diterima. Tim Kinara Land akan menindaklanjuti Anda." : ""}</p>
  </form>;
}
