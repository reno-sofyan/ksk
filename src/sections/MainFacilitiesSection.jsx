import React from 'react';
import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';

const mainFacilities = [
  { label: 'Kolam Renang', category: 'Lifestyle & Wellness', image: imageUrl('rivere/Design 3/3.png') },
  { label: 'Gym / Ruang Olahraga', category: 'Lifestyle & Wellness', image: imageUrl('rivere/Design 3/4.png') },
  { label: 'Cafe / Coffee Lounge', category: 'Lifestyle & Wellness', image: imageUrl('Gambar 3d 4.png') },
  { label: 'Basket 3 on 3', category: 'Lifestyle & Wellness', image: imageUrl('basket.jpg') },
  { label: 'Mini Garden', category: 'Lifestyle & Wellness', image: imageUrl('rivere/Design 3/5.png') },
  { label: 'Clubhouse', category: 'Productivity & Community', image: imageUrl('Gambar 3d 5.png') },
  { label: 'Ruang Komunal', category: 'Productivity & Community', image: imageUrl('Gambar 3d 1.png') },
  { label: 'Mushola / Masjid', category: 'Productivity & Community', image: imageUrl('mushola.jpg') },
  { label: 'Area Hijau', category: 'Productivity & Community', image: imageUrl('rivere/Design 1/5.png') },
  { label: 'Keamanan 24 Jam', category: 'Security & Convenience', image: imageUrl('rivere/Design 1/4.png') },
  { label: 'CCTV Area Publik', category: 'Security & Convenience', image: imageUrl('rivere/Design 2/3.png') },
  { label: 'Akses Gerbang Terintegrasi', category: 'Security & Convenience', image: imageUrl('pintu-ipb.jpg') },
  { label: 'Mini Market', category: 'Security & Convenience', image: imageUrl('minimarket.jpg') },
  { label: 'Laundry', category: 'Security & Convenience', image: imageUrl('Gambar 3d 2.png') },
  { label: 'Area Parkir Luas', category: 'Security & Convenience', image: imageUrl('rivere/Design 1/1.png') },
  { label: 'Akses Mobil', category: 'Security & Convenience', image: imageUrl('rivere/Design 2/1.png') }
];

const MainFacilitiesSection = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
    {mainFacilities.map((facility, index) => (
      <motion.figure
        key={facility.label}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: index * 0.035 }}
        className="group overflow-hidden rounded-lg border border-primary/15 bg-card shadow-[0_10px_30px_rgba(7,39,29,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_rgba(7,39,29,0.13)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-primary/10">
          <ResponsiveImage
            src={facility.image}
            alt={facility.label}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover contrast-[1.02] saturate-[0.94] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
        </div>
        <figcaption className="relative flex min-h-20 flex-col justify-center border-t border-primary/10 px-4 py-3 text-left">
          <span className="absolute left-4 top-0 h-px w-10 bg-accent" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase leading-tight text-accent sm:text-xs">{facility.category}</span>
          <span className="mt-1 text-sm font-bold leading-snug text-primary sm:text-base">{facility.label}</span>
        </figcaption>
      </motion.figure>
    ))}
  </div>
);

export default MainFacilitiesSection;
