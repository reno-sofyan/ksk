import React from 'react';
import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
};

const SocialProofCollage = ({ images }) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6"
    >
      {images.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`relative overflow-hidden rounded-2xl group ${
            index === 0 ? 'aspect-[4/5] md:col-span-2 md:row-span-2 md:aspect-auto' : 'aspect-square'
          }`}
        >
          <ResponsiveImage
            src={item.url}
            alt={`Dokumentasi investor KSK Co Living Resort ${index + 1}`}
            loading="lazy"
            decoding="async"
            sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          
          {/* Hover Text Reveal */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-100 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:p-6">
            <p className="text-base font-semibold text-white sm:text-lg">{item.title || "Akad Berhasil"}</p>
            <p className="text-xs text-white/80 sm:text-sm">{item.subtitle || "Investor Bahagia"}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialProofCollage;
