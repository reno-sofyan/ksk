import React from 'react';
import FacilityGrid from '@/components/FacilityGrid.jsx';
import { imageUrl } from '@/lib/assets.js';

const mainFacilities = [
  {
    icon: 'Waves',
    label: 'Kolam Renang',
    image: imageUrl('COZ-8-edit.jpg')
  },
  {
    icon: 'Dumbbell',
    label: 'Gym',
    image: imageUrl('interior 1.jpg')
  },
  {
    icon: 'Coffee',
    label: 'Cafe',
    image: imageUrl('interior 4.jpg')
  },
  {
    icon: 'Building2',
    label: 'Clubhouse',
    image: imageUrl('COZ-6-edit.jpg')
  },
  {
    icon: 'Users',
    label: 'Ruang Komunal',
    image: imageUrl('COZ-7-edit.jpg')
  },
  {
    icon: 'ShoppingCart',
    label: 'Mini Market',
    image: imageUrl('minimarket.jpg')
  },
  {
    icon: 'Shirt',
    label: 'Laundry',
    image: imageUrl('interior 3.jpg')
  },
  {
    icon: 'Leaf',
    label: 'Area Hijau',
    image: imageUrl('COZ-7-edit.jpg')
  },
  {
    icon: 'ShieldCheck',
    label: 'Keamanan 24 Jam',
    image: imageUrl('pintu-ipb.jpg')
  },
  {
    icon: 'Cctv',
    label: 'CCTV',
    image: imageUrl('COZ-2-edit.jpg')
  },
  {
    icon: 'KeyRound',
    label: 'Akses Gerbang Terintegrasi',
    image: imageUrl('COZ-3-edit.jpg')
  },
  {
    icon: 'Proportions',
    label: 'Smart Spatial Mezzanine',
    image: imageUrl('denah2lt.jpg')
  }
];

const MainFacilitiesSection = () => (
  <FacilityGrid facilities={mainFacilities} columns={4} showImages={true} />
);

export default MainFacilitiesSection;
