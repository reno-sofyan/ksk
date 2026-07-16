import React from 'react';
import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';

const nearbyFacilities = [
  { label: 'Gerbang Utama IPB', image: imageUrl('pintu-ipb.jpg') },
  { label: 'RS Medika Dramaga', image: imageUrl('rs.png') },
  { label: 'Klinik 24 Jam Dramaga', image: imageUrl('klinik.png') },
  { label: 'Indomart & Alfamart', image: imageUrl('minimarket.jpg') },
  { label: 'Yogya Grand Dramaga', image: imageUrl('yogya.jpg') },
  { label: 'Heroes Fitnes, Home Fitnes, Hilzastro Gym', image: imageUrl('rivere/Design 3/4.png') },
  { label: 'Golden Sport Bogor, Dramaga Futsal, Vinci Mini Soccer', image: imageUrl('basket.jpg') },
  { label: 'Spot Kuliner Bogor', image: imageUrl('mie gacoan.webp') },
  { label: 'Terminal Bubulak & Terminal Laladon', image: imageUrl('rivere/Design 2/1.png') }
];

const NearbyFacilitiesSection = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
    {nearbyFacilities.map((facility, index) => (
      <motion.figure
        key={facility.label}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: index * 0.05 }}
        className="group overflow-hidden rounded-lg border border-primary/15 bg-card shadow-[0_10px_30px_rgba(7,39,29,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(7,39,29,0.13)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
          <ResponsiveImage
            src={facility.image}
            alt={facility.label}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover contrast-[1.02] saturate-[0.94] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
        </div>
        <figcaption className="relative flex min-h-16 items-center border-t border-primary/10 px-4 py-3 text-left text-sm font-bold leading-snug text-primary sm:text-base">
          <span className="absolute left-4 top-0 h-px w-10 bg-accent" aria-hidden="true" />
          {facility.label}
        </figcaption>
      </motion.figure>
    ))}
  </div>
);

export default NearbyFacilitiesSection;
