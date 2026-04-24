import React from 'react';
import FacilityGrid from '@/components/FacilityGrid.jsx';
import { imageUrl } from '@/lib/assets.js';

const mainFacilities = [
  {
    icon: 'Mosque',
    label: 'Mushala',
    image: imageUrl('mushola.jpg')
  },
  {
    icon: 'Shirt',
    label: 'Laundry',
    image: imageUrl('interior 3.jpg')
  },
  {
    icon: 'ParkingCircle',
    label: 'Area Parkir Luas',
    image: imageUrl('COZ-5.1-edit.jpg')
  },
  {
    icon: 'Coffee',
    label: 'Cafe',
    image: imageUrl('interior 4.jpg')
  },
  {
    icon: 'UtensilsCrossed',
    label: 'Kantin',
    image: imageUrl('interior 5.jpg')
  },
  {
    icon: 'ShoppingCart',
    label: 'Mini Market',
    image: imageUrl('minimarket.jpg')
  },
  {
    icon: 'Basketball',
    label: 'Basket Court',
    image: imageUrl('basket.jpg')
  },
  {
    icon: 'Users',
    label: 'Communal Area',
    image: imageUrl('COZ-6-edit.jpg')
  },
  {
    icon: 'Leaf',
    label: 'Taman Hijau',
    image: imageUrl('COZ-7-edit.jpg')
  },
  {
    icon: 'Sofa',
    label: 'Full Furnished',
    image: imageUrl('interior 4.jpg')
  },
  {
    icon: 'Tv',
    label: 'TV Tiap Kamar',
    image: imageUrl('tv.jpg')
  },
  {
    icon: 'Wind',
    label: 'AC',
    image: imageUrl('interior 1.jpg')
  },
  {
    icon: 'Droplet',
    label: 'Water Heater',
    image: imageUrl('waterheater.jpg')
  },
  {
    icon: 'ChefHat',
    label: 'Dapur',
    image: imageUrl('interior 1.jpg')
  },
  {
    icon: 'Refrigerator',
    label: 'Kulkas',
    image: imageUrl('interior 2.jpg')
  },
  {
    icon: 'Wifi',
    label: 'Wifi',
    image: imageUrl('interior 2.jpg')
  }
];

const MainFacilitiesSection = () => (
  <FacilityGrid facilities={mainFacilities} columns={4} showImages={true} />
);

export default MainFacilitiesSection;
