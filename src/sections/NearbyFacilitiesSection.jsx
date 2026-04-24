import React from 'react';
import FacilityGrid from '@/components/FacilityGrid.jsx';
import { imageUrl } from '@/lib/assets.js';

const nearbyFacilities = [
  {
    icon: 'UtensilsCrossed',
    label: 'Mie Gacoan',
    description: '2 Menit',
    image: imageUrl('mie gacoan.webp')
  },
  {
    icon: 'Wrench',
    label: 'Mr DIY',
    description: '3 Menit',
    image: imageUrl('minimarket.jpg')
  },
  {
    icon: 'ShoppingBag',
    label: 'Yogya Supermarket',
    description: '5 Menit',
    image: imageUrl('yogya.jpg')
  },
  {
    icon: 'Hospital',
    label: 'RS Medika Dramaga',
    description: '10 Menit',
    image: imageUrl('rs.png'),
    imageClassName: 'object-[center_18%] brightness-110 contrast-125 saturate-110'
  },
  {
    icon: 'Dribbble',
    label: 'Lap. Futsal',
    description: 'Akses Mudah',
    image: imageUrl('basket.jpg')
  },
  {
    icon: 'Stethoscope',
    label: 'Klinik 24 jam',
    description: 'Terdekat',
    image: imageUrl('klinik.png'),
    imageClassName: 'object-[center_15%] brightness-110 contrast-125 saturate-110'
  }
];

const NearbyFacilitiesSection = () => (
  <FacilityGrid facilities={nearbyFacilities} columns={3} showImages={true} />
);

export default NearbyFacilitiesSection;
