import React from 'react';
import UnitCard from '@/components/UnitCard.jsx';
import { imageUrl } from '@/lib/assets.js';

const UnitCardsSection = () => (
  <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
    <UnitCard
      type="Type 62/31"
      description="Unit 4 kamar dengan konsep smart spatial mezzanine untuk investor yang mencari aset kost resort efisien di Ring 1 IPB."
      price="Rp 1 M"
      cashPrice="Rp 925 Jt"
      payment="Skema pembayaran 6 bulan atau 1 tahun"
      image={imageUrl('COZ-2-edit.jpg')}
      features={['4 Kamar', 'Luas 62/31', 'Smart Spatial Mezzanine', 'Potensi passive income hingga Rp 126 juta/tahun/unit', 'Legalitas SHM']}
      index={0}
    />
    <UnitCard
      type="Type 94/31"
      description="Unit premium lebih besar untuk investor yang ingin memperkuat portofolio properti hospitality dengan pengelolaan profesional."
      price="Rp 1,6 M"
      cashPrice="Rp 1,45 M"
      payment="Skema pembayaran 6 bulan atau 1 tahun"
      image={imageUrl('COZ-3-edit.jpg')}
      features={['Luas 94/31', 'Konsep Kost Resort', 'Yield 6%-9% dan capital gain 5%-8%', 'Total ROI 8%-14%', 'Bagi hasil 80% investor / 20% pengelola']}
      index={1}
    />
  </div>
);

export default UnitCardsSection;
