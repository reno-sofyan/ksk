import React from 'react';
import FacilityGrid from '@/components/FacilityGrid.jsx';
import { imageUrl } from '@/lib/assets.js';

const nearbyFacilities = [
  {
    icon: 'Building2',
    label: 'Gerbang Utama IPB',
    description: '2 Menit',
    image: imageUrl('pintu-ipb.jpg')
  },
  {
    icon: 'MapPin',
    label: 'Ring 1 IPB',
    description: 'Bebas Macet',
    image: imageUrl('COZ-1-edit.jpg')
  },
  {
    icon: 'ShoppingBag',
    label: 'Area Komersial Dramaga',
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
    icon: 'UtensilsCrossed',
    label: 'Kuliner & Retail',
    description: 'Akses Mudah',
    image: imageUrl('mie gacoan.webp')
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
