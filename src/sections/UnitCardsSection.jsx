import React from 'react';
import UnitCard from '@/components/UnitCard.jsx';
import { imageUrl } from '@/lib/assets.js';

const UnitCardsSection = () => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
    <UnitCard
      type="Tipe 1"
      description="Cocok untuk investor pemula dengan ROI optimal dan modal terjangkau."
      oldPrice="Rp 1,7 M"
      newPrice="Rp 1,5 M"
      image={imageUrl('COZ-2-edit.jpg')}
      features={['Bangunan 2 Lantai', '6 Kamar Tidur Full Furnished', 'Luas Bangunan 94 m²', 'Kamar Mandi Dalam', 'Smart Door Lock']}
      index={0}
    />
    <UnitCard
      type="Tipe 2"
      description="Investasi skala besar untuk passive income ganda setiap bulannya."
      oldPrice="Rp 2,5 M"
      newPrice="Rp 2,1 M"
      image={imageUrl('COZ-3-edit.jpg')}
      features={['Bangunan 3 Lantai', '10 Kamar Tidur Full Furnished', 'Luas Bangunan 140 m²', 'Kamar Mandi Dalam', 'Ruang Santai Khusus']}
      index={1}
    />
  </div>
);

export default UnitCardsSection;
