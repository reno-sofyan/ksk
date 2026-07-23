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
      payment="Tersedia tenor 6 bulan atau 1 tahun."
      image={imageUrl('rivere/Design 1/2.png')}
      floorPlanImage={imageUrl('Denah 1.png')}
      floorPlanAlt="Denah unit Type 62/31 Rivere Kostaycation IPB"
      features={['4 Kamar', 'Luas 62/31', 'Smart Spatial Design', 'Legalitas SHM', 'Dikelola Kyra Stay']}
      index={0}
    />
    <UnitCard
      type="Type 94/31"
      description="Unit premium lebih besar untuk investor yang ingin memperkuat portofolio properti hospitality dengan pengelolaan profesional."
      price="Rp 1,6 M"
      cashPrice="Rp 1,35 M"
      payment="Tersedia tenor 6 bulan atau 1 tahun."
      image={imageUrl('rivere/Design 2/2.png')}
      floorPlanImage={imageUrl('Denah 2.png')}
      floorPlanAlt="Denah unit Type 94/31 Rivere Kostaycation IPB"
      features={['6 Kamar', 'Luas 94/31', 'Konsep Kost Resort', 'Smart Spatial Design', 'Legalitas SHM', 'Dikelola Kyra Stay']}
      index={1}
    />
  </div>
);

export default UnitCardsSection;
