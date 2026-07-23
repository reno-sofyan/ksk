
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton = ({
  phoneNumber = '6282111124005',
  message = 'Halo Kinara Land, saya tertarik ingin tahu lebih lanjut tentang proyek Rivere.'
}) => {
  const [shouldPulse, setShouldPulse] = useState(false);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const timer = window.setTimeout(() => setShouldPulse(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ctwa-label="Floating WhatsApp Button"
      className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-primary text-accent shadow-[0_18px_42px_rgba(7,39,29,0.24)] transition-colors duration-300 hover:bg-accent hover:text-primary sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={shouldPulse ? { opacity: 1, y: 0, scale: [1, 1.07, 1] } : { opacity: 1, y: 0, scale: 1 }}
      transition={
        shouldPulse
          ? { scale: { repeat: Infinity, duration: 2.6, ease: 'easeInOut' }, opacity: { duration: 0.25 }, y: { duration: 0.25 } }
          : { duration: 0.25 }
      }
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      aria-label="Buka form konsultasi WhatsApp"
    >
      {shouldPulse ? (
        <span className="absolute inset-0 rounded-full border border-accent/50 animate-ping" aria-hidden="true" />
      ) : null}
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-accent/25 bg-primary px-4 py-2 text-sm font-semibold text-accent opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Konsultasi WhatsApp
      </span>
    </motion.a>
  );
};

export default FloatingWhatsAppButton;
