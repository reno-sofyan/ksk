import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage.jsx';
import { imageUrl } from '@/lib/assets.js';

const mainFacilities = [
  {
    label: 'Kolam Renang',
    category: 'Lifestyle & Wellness',
    image: imageUrl('pool.jpeg'),
    note: 'Visual hanya ilustrasi.'
  },
  {
    label: 'Gym / Ruang Olahraga',
    category: 'Lifestyle & Wellness',
    image: imageUrl('gym.png'),
    note: 'Visual hanya ilustrasi.'
  },
  { label: 'Cafe / Coffee Lounge', category: 'Lifestyle & Wellness', image: imageUrl('Gambar 3d 4.png') },
  { label: 'Basket 3 on 3', category: 'Lifestyle & Wellness', image: imageUrl('basket.png') },
  {
    label: 'Mini Garden',
    category: 'Lifestyle & Wellness',
    description: 'Area taman kecil untuk memberi suasana lebih hijau dan nyaman.'
  },
  { label: 'Clubhouse', category: 'Productivity & Community', image: imageUrl('clubhouse.png') },
  { label: 'Ruang Komunal', category: 'Productivity & Community', image: imageUrl('Gambar 3d 1.png') },
  { label: 'Mushola / Masjid', category: 'Productivity & Community', image: imageUrl('mushola.jpg') },
  {
    label: 'Area Hijau',
    category: 'Productivity & Community',
    description: 'Ruang terbuka hijau yang mendukung kenyamanan lingkungan hunian.'
  },
  { label: 'Keamanan 24 Jam', category: 'Security & Convenience', image: imageUrl('satpam.jpeg') },
  { label: 'CCTV Area Publik', category: 'Security & Convenience', image: imageUrl('cctv.jpeg') },
  {
    label: 'Akses Gerbang Terintegrasi',
    category: 'Security & Convenience',
    description: 'Akses masuk kawasan dirancang tertata untuk mendukung sirkulasi penghuni.'
  },
  { label: 'Mini Market', category: 'Security & Convenience', image: imageUrl('minimarket.jpg') },
  { label: 'Laundry', category: 'Security & Convenience', image: imageUrl('laundry.jpeg') },
  { label: 'Area Parkir Luas', category: 'Security & Convenience', image: imageUrl('parkir.jpeg') },
  { label: 'Akses Mobil', category: 'Security & Convenience', image: imageUrl('mobil.jpeg') }
];

const photoFacilities = mainFacilities.filter((facility) => facility.image);
const textFacilities = mainFacilities.filter((facility) => !facility.image);

const MainFacilitiesSection = () => (
  <div className="space-y-5 sm:space-y-6">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {photoFacilities.map((facility, index) => (
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
            {facility.note ? (
              <span className="absolute bottom-3 left-3 rounded-full border border-white/25 bg-primary/82 px-3 py-1 text-[10px] font-bold uppercase tracking-normal text-accent backdrop-blur-sm">
                {facility.note}
              </span>
            ) : null}
          </div>
          <figcaption className="relative flex min-h-20 flex-col justify-center border-t border-primary/10 px-4 py-3 text-left">
            <span className="absolute left-4 top-0 h-px w-10 bg-accent" aria-hidden="true" />
            <span className="text-[10px] font-semibold uppercase leading-tight text-accent sm:text-xs">{facility.category}</span>
            <span className="mt-1 text-sm font-bold leading-snug text-primary sm:text-base">{facility.label}</span>
            {facility.note ? <span className="mt-1 text-xs font-semibold text-muted-foreground">{facility.note}</span> : null}
          </figcaption>
        </motion.figure>
      ))}
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {textFacilities.map((facility, index) => (
        <motion.div
          key={facility.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: (photoFacilities.length + index) * 0.035 }}
          className="group flex min-h-28 items-start gap-3 rounded-lg border border-primary/15 bg-card px-4 py-4 text-left shadow-[0_10px_30px_rgba(7,39,29,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_16px_34px_rgba(7,39,29,0.11)]"
        >
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase leading-tight text-accent">{facility.category}</span>
            <span className="mt-1 block text-sm font-bold leading-snug text-primary sm:text-base">{facility.label}</span>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">{facility.description}</span>
          </span>
        </motion.div>
      ))}
    </div>
  </div>
);

export default MainFacilitiesSection;
