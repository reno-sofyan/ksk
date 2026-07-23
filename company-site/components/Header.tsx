"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { company, navigation } from "@/data/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const point = document.elementFromPoint(window.innerWidth / 2, 80);
      setDark(Boolean(point?.closest("[data-theme='dark']")));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${dark ? "on-dark" : ""}`}>
        <Link className="wordmark" href="/"><span className="brand-logo"><Image src="/images/logo.png" alt="" width={28} height={28} /></span>KINARA <b>LAND</b></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="sign-in" href="/hubungi-kami">Hubungi Kami</Link>
        <button className="menu-toggle" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-drawer" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: .55, ease: [.22, 1, .36, 1] }}>
            <div className="drawer-top"><span className="wordmark">KINARA <b>LAND</b></span><button onClick={() => setOpen(false)} aria-label="Tutup menu"><X /></button></div>
            <nav>
              {navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link>)}
              <a href={company.whatsappUrl} onClick={() => setOpen(false)}><span>08</span>WhatsApp</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
