
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsAppButton = ({ phoneNumber = '6281234567890', message = 'Halo, saya tertarik dengan KSK Co Living Resort' }) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-primary text-accent p-4 rounded-full shadow-lg hover:shadow-xl transition-colors duration-300 group border-2 border-accent/20"
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ 
        scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
        default: { duration: 0.3 }
      }}
      whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat via WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-primary text-accent border border-accent/20 text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none font-medium shadow-lg">
        Chat dengan kami
      </span>
    </motion.a>
  );
};

export default FloatingWhatsAppButton;
